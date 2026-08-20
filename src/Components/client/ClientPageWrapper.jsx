"use client";

import React, { useState, useEffect, useRef } from "react";
// import useTheme from "../../Contexts/theme";
import useAnalytics from "../../Hooks/useAnalytics";
import ScrollManager from "../../Components/ScrollManager";
import MirrorMindWidget from "../../Components/MirrorMindWidget";
import ColorPickerModal from "../../ColorPicker";

export default function ClientPageWrapper({ children }) {
  // const { themeMode } = useTheme();
  const { initGA } = useAnalytics();

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const bodyRef = useRef(null);

  useEffect(() => {
    initGA();
  }, [initGA]);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString() ?? "";
      if (selection.length > 0 && isFirstSelection) {
        setIsColorPickerOpen(true);
        setIsFirstSelection(false);
      }
    };

    const savedColor = localStorage.getItem("selectionColor");
    if (savedColor) {
      document.documentElement.style.setProperty(
        "--selection-bg-color",
        savedColor,
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
    <div className="App" ref={bodyRef}>
      <ScrollManager />
      <ColorPickerModal
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        onColorChange={(color) => {
          document.documentElement.style.setProperty(
            "--selection-bg-color",
            color,
          );
          localStorage.setItem("selectionColor", color);
        }}
      />

      {children}

      <MirrorMindWidget />
    </div>
  );
}
