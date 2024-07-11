import './Styles/App.css'
import Navbar from './Components/Navbar'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Contact from './Contact'
import { ThemeProvider } from './Contexts/theme'
import { useState, useEffect, useRef } from 'react'
import useLocalStorage from 'use-local-storage'

function App() {
  const [themeMode, setThemeMode] = useLocalStorage('dark')
  const darkTheme = ()=>{
    setThemeMode('dark')
  }
  const lightTheme=()=>{
    setThemeMode('light')
  }
  
  useEffect(()=>{
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode])

  const bodyRef = useRef(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection().toString();
      if (selection.length > 0 && isFirstSelection) {
        const newColor = prompt('Hey, you can now change the selection color to your desired color. Enter a selection color (hex code):');
        if (newColor) {
          changeSelectionColor(newColor);
        }
        setIsFirstSelection(false);
      }
    };

    const changeSelectionColor = (color) => {
      const rootElement = document.documentElement;
      rootElement.style.setProperty('--selection-bg-color', color);
    };

    const bodyElement = bodyRef.current;
    bodyElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      bodyElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isFirstSelection]);


  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
    <div className={`App ${themeMode}`} ref={bodyRef}>
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
