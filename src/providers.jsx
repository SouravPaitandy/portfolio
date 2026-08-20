// ─── Providers — CLIENT BOUNDARY ────────────────────────────────────────────
// This is the ONLY place in the app that initialises theme state and i18n.
// It sits directly under RootLayout (Server Component) and provides context
// to the entire React tree below it.
//
// Why "use client" here?
//   - useLocalStorage reads/writes localStorage (browser-only)
//   - useEffect manipulates document.documentElement (browser-only)
//   - ThemeContext.Provider is a React Context (client-only)
//   - i18n LanguageDetector reads navigator.language (browser-only)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "./Contexts/theme";

/**
 * @param {{ children: import("react").ReactNode }} props
 */
export function Providers({ children }) {
  // Initialize to "dark" to match server render and prevent hydration mismatch
  const [themeMode, setThemeMode] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      let stored = localStorage.getItem("themeMode");
      if (stored) {
        stored = stored.replace(/"/g, "");
        if (stored === "light" || stored === "dark") {
          setThemeMode(stored);
        }
      }
    } catch (e) {
      /* empty */
    }
    setMounted(true);
  }, []);

  const darkTheme = () => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    setThemeMode("dark");
    try {
      localStorage.setItem("themeMode", '"dark"');
    } catch (e) {
      /* empty */
    }
  };

  const lightTheme = () => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    setThemeMode("light");
    try {
      localStorage.setItem("themeMode", '"light"');
    } catch (e) {
      /* empty */
    }
  };

  // Sync the <html> class to the stored themeMode on every change
  useEffect(() => {
    if (!mounted) return; // DO NOT overwrite the FOUC script on initial mount!
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(themeMode);
  }, [themeMode, mounted]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      {children}
    </ThemeProvider>
  );
}
