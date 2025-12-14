import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from "react-ga4";
import App from './App.jsx'
import './index.css'

// Initialize Google Analytics with placeholder ID
ReactGA.initialize("G-BG8YWZK8ZD");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
