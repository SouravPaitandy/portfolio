import Navbar from "./Components/Navbar";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import ColorPickerModal from "./ColorPicker";
import WelcomeScreen from "./Components/WelcomeScreen";
import { ThemeProvider } from "./Contexts/theme";
import { useState, useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import { AnimatePresence } from "framer-motion";
import useAnalytics from "./Hooks/useAnalytics";
import ScrollManager from "./Components/ScrollManager";

function App() {
  const { initGA } = useAnalytics();
  const [themeMode, setThemeMode] = useLocalStorage("dark", "dark");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const bodyRef = useRef(null);

  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowWelcome(false);
    }
  }, []);

  useEffect(() => {
    initGA();
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem("hasVisited", "true");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection().toString();
      if (selection.length > 0 && isFirstSelection) {
        setIsColorPickerOpen(true);
        setIsFirstSelection(false);
      }
    };

    const savedColor = localStorage.getItem("selectionColor");
    if (savedColor) {
      document.documentElement.style.setProperty(
        "--selection-bg-color",
        savedColor
      );
    }

    const bodyElement = bodyRef.current;
    if (bodyElement) {
      bodyElement.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isFirstSelection]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className={`App ${themeMode}`} ref={bodyRef}>
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <WelcomeScreen key="welcome" onEnter={handleWelcomeComplete} />
          ) : (
            <>
              <ScrollManager />
              <ColorPickerModal
                isOpen={isColorPickerOpen}
                onClose={() => setIsColorPickerOpen(false)}
                onColorChange={(color) => {
                  const rootElement = document.documentElement;
                  rootElement.style.setProperty("--selection-bg-color", color);
                  localStorage.setItem("selectionColor", color);
                }}
              />
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
