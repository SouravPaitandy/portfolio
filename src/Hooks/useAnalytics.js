import ReactGA from "react-ga4";

const useAnalytics = () => {
  
  const initGA = () => {
    // Replace 'G-YOUR-ID' with your actual Measurement ID
    // Check if we are in production or if a specific flag is set before initializing if you want to avoid local data
    ReactGA.initialize("G-BG8YWZK8ZD"); 
  };

  const trackPageView = (path) => {
    ReactGA.send({ hitType: "pageview", page: path });
  };

  const trackEvent = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

  return { initGA, trackPageView, trackEvent };
};

export default useAnalytics;
