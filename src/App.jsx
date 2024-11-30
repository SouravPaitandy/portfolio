import './Styles/App.css'
import Navbar from './Components/Navbar'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import ColorPickerModal from './ColorPicker'
import { ThemeProvider } from './Contexts/theme'
import { useState, useEffect, useRef } from 'react'
import useLocalStorage from 'use-local-storage'

function App() {
  const [themeMode, setThemeMode] = useLocalStorage('dark', 'dark')
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const bodyRef = useRef(null);

  const darkTheme = () => setThemeMode('dark');
  const lightTheme = () => setThemeMode('light');

  // Theme mode effect
  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  // Selection color change logic
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection().toString();
      if (selection.length > 0 && isFirstSelection) {
        setIsColorPickerOpen(true);
        setIsFirstSelection(false);
      }
    };

    // const changeSelectionColor = (color) => {
    //   const rootElement = document.documentElement;
    //   rootElement.style.setProperty('--selection-bg-color', color);
    //   // Optionally, save to local storage
    //   localStorage.setItem('selectionColor', color);
    // };

    // Load previously saved color
    const savedColor = localStorage.getItem('selectionColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--selection-bg-color', savedColor);
    }

    const bodyElement = bodyRef.current;
    bodyElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      bodyElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isFirstSelection]);

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className={`App ${themeMode}`} ref={bodyRef}>
        <ColorPickerModal
          isOpen={isColorPickerOpen}
          onClose={() => setIsColorPickerOpen(false)}
          onColorChange={(color) => {
            const rootElement = document.documentElement;
            rootElement.style.setProperty('--selection-bg-color', color);
            localStorage.setItem('selectionColor', color);
          }}
        />
        <Navbar/>
        <Hero/>
        <About/>
        <Projects/>
        <Contact/>
      </div>
    </ThemeProvider>
  )
}

export default App