/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-scroll";
import Toggler from "./Theme_btn";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, X as XIcon, Menu } from "lucide-react"; 
import "../Styles/navbar.css";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const [activeLink, setActiveLink] = useState("hero-section");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debounced scroll handler to improve performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHidden(currentScrollY < 50); // More gradual hiding
  }, []);

  // Optimized active section detection
  const handleActiveSection = useCallback(() => {
    const sections = document.querySelectorAll("section");
    const viewportMiddle = window.innerHeight / 2;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
        setActiveLink(section.id);
        break;
      }
    }
  }, []);

  // Memoized event listeners with debounce
  useEffect(() => {
    const debouncedScroll = window.requestAnimationFrame
      ? () => window.requestAnimationFrame(handleScroll)
      : handleScroll;

    const debouncedActiveSectionDetection = window.requestAnimationFrame
      ? () => window.requestAnimationFrame(handleActiveSection)
      : handleActiveSection;

    window.addEventListener("scroll", debouncedScroll);
    window.addEventListener("scroll", debouncedActiveSectionDetection);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      window.removeEventListener("scroll", debouncedActiveSectionDetection);
      document.body.style.overflow = 'unset';
    };
  }, [handleScroll, handleActiveSection, isMenuOpen]);

  // Desktop Navigation Links
  const NavLink = useMemo(
    () =>
      ({ to, children }) =>
        (
          <Link
            to={to}
            smooth={true}
            duration={1000}
            offset={-100}
            aria-current={activeLink === to ? "page" : undefined}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg
        transition-all duration-300 ease-in-out cursor-pointer 
        ${
          activeLink === to
            ? "text-electric-indigo bg-electric-indigo/10"
            : "text-gray-600 dark:text-gray-300 hover:text-electric-indigo dark:hover:text-electric-indigo hover:bg-gray-100 dark:hover:bg-white/5"
        }`}
            onClick={() => setActiveLink(to)}
          >
            {children}
          </Link>
        ),
    [activeLink]
  );
  
  // Mobile Full Screen Menu Links
  const MobileMenuLink = ({ to, children, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <Link
        to={to}
        smooth={true}
        duration={1000}
        offset={-70}
        onClick={() => setIsMenuOpen(false)}
        className="block text-5xl md:text-6xl font-bold text-gray-800 dark:text-white hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors cursor-pointer"
      >
        {children}
      </Link>
    </motion.div>
  );

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
          w-[90%] max-w-5xl h-16 rounded-2xl
          flex justify-between items-center px-6
          transition-all duration-500 ease-in-out
          ${
            !isHidden
              ? "bg-white/80 dark:bg-charcoal/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-white/10"
              : "bg-transparent border-transparent"
          }`}
        aria-label="Main Navigation"
      >
        <div className="logo cursor-pointer flex items-center z-50">
          <Link
            to="hero-section"
            smooth={true}
            duration={1000}
            className="flex items-center space-x-2 group"
            aria-label="Return to Home"
          >
            <div
              className="nav-img h-10 w-10 rounded-full border-2 
              border-electric-indigo transition-transform duration-300 group-hover:scale-110"
            ></div>
            <span className={`nav-name font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${isMenuOpen ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-100"}`}>
              Sourav<span className="text-electric-indigo">.dev</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="hero-section">Home</NavLink>
          <NavLink to="about-section">About</NavLink>
          <NavLink to="project-section">Projects</NavLink>
          <NavLink to="contact-section">Contact</NavLink>
          <div className="ml-4 pl-4 border-l border-gray-300 dark:border-white/10">
            <Toggler />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          {!isMenuOpen && <Toggler />} 
          <button
            className="text-gray-800 dark:text-white focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
             {isMenuOpen ? <XIcon size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white dark:bg-rich-black flex flex-col justify-center items-center md:hidden"
          >
             <div className="absolute top-28 left-0 w-full flex justify-center opacity-10">
                 <div className="w-64 h-64 rounded-full bg-electric-indigo blur-3xl"></div>
             </div>

             <nav className="flex flex-col items-center space-y-8 relative z-10 text-center">
                <MobileMenuLink to="hero-section" index={0}>Home</MobileMenuLink>
                <MobileMenuLink to="about-section" index={1}>About</MobileMenuLink>
                <MobileMenuLink to="project-section" index={2}>Projects</MobileMenuLink>
                <MobileMenuLink to="contact-section" index={3}>Contact</MobileMenuLink>
             </nav>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-16 flex flex-col items-center gap-6"
             >
                <div className="flex gap-8">
                    <a href="https://github.com/SouravPaitandy" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-electric-indigo transition-colors"><Github size={28} /></a>
                    <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-electric-indigo transition-colors"><Linkedin size={28} /></a>
                    <a href="https://www.instagram.com/paitandy_ji/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-electric-indigo transition-colors"><Instagram size={28} /></a>
                </div>
                
                <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-charcoal/50">
                   <span className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest font-mono">Theme</span>
                   <Toggler />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
