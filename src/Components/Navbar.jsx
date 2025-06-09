/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-scroll';
import Toggler from './Theme_btn';
import "../Styles/navbar.css";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const [activeLink, setActiveLink] = useState('hero-section');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debounced scroll handler to improve performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHidden(currentScrollY < 50); // More gradual hiding
  }, []);

  // Optimized active section detection
  const handleActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section');
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
    const debouncedScroll = window.requestAnimationFrame ? 
      () => window.requestAnimationFrame(handleScroll) : 
      handleScroll;

    const debouncedActiveSectionDetection = window.requestAnimationFrame ? 
      () => window.requestAnimationFrame(handleActiveSection) : 
      handleActiveSection;

    window.addEventListener('scroll', debouncedScroll);
    window.addEventListener('scroll', debouncedActiveSectionDetection);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('scroll', debouncedActiveSectionDetection);
    };
  }, [handleScroll, handleActiveSection]);

  // Memoized navigation links
  const NavLink = useMemo(() => ({ to, children }) => (
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-70}
      aria-current={activeLink === to ? 'page' : undefined}
      className={`relative group px-5 py-3 text-xl font-extrabold uppercase 
        transition-all duration-300 ease-in-out overflow-hidden cursor-pointer 
        ${activeLink === to
          ? 'text-teal-700 dark:text-teal-400 bg-blue-50 dark:bg-neutral-800'
          : 'text-gray-700 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400'
        }`}
      onClick={() => {
        setActiveLink(to);
        setIsMenuOpen(false);
      }}
    >
      <span className="relative z-10">{children}</span>
      {activeLink !== to && (
        <>
          <span className="absolute inset-0 bg-blue-50 dark:bg-neutral-800 
            transform -translate-x-full group-hover:translate-x-0 
            transition-transform duration-300 ease-out"></span>
          <span className="absolute bottom-0 left-0 w-full h-1 
            bg-teal-700 dark:bg-teal-400 transform scale-x-0 
            group-hover:scale-x-100 transition-transform duration-300 
            ease-out origin-left"></span>
        </>
      )}
      {activeLink === to && (
        <span className="absolute bottom-0 left-0 w-full h-1 
          bg-teal-700 dark:bg-teal-400"></span>
      )}
    </Link>
  ), [activeLink]);

  // Memoized mobile navigation links
  const MobileNavLink = useMemo(() => ({ to, children }) => (
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-70}
      aria-current={activeLink === to ? 'page' : undefined}
      className={`block w-full py-4 px-6 text-lg font-bold 
        transition-all duration-300 ease-in-out 
        ${activeLink === to
          ? 'bg-blue-50 dark:bg-neutral-800 text-teal-700 dark:text-teal-400'
          : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
        }`}
      onClick={() => {
        setActiveLink(to);
        setIsMenuOpen(false);
      }}
    >
      {children}
    </Link>
  ), [activeLink]);

  return (
    <>
      <nav
        className={`flex justify-between items-center 
           dark:text-white
          text-black h-16 w-full fixed top-0 z-50 
          ${!isHidden ? 'bg-[#F5F5F5] dark:bg-neutral-900 shadow-lg' : 'bg-transparent'}
          transition-all duration-500 ease-in-out px-4 md:px-8`}
        aria-label="Main Navigation"
        // ${!isHidden ? 'translate-y-0' : '-translate-y-full'}
      >
        <div className="logo ml-4 cursor-pointer flex items-center space-x-4">
          <Link
            to="hero-section"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2"
            aria-label="Return to Home"
          >
            <div 
              className="nav-img h-12 w-12 rounded-full border-2 
              dark:border-teal-400 border-teal-700"
            >
            </div>
            <span className="nav-name font-bold dark:text-gray-300 text-gray-700 text-xl md:text-3xl">
              <span className="text-teal-700 dark:text-teal-400 roboto-regular font-extrabold">
                &lt;
              </span>
              DevShowcase
              <span className="text-teal-700 dark:text-teal-400 roboto-regular font-extrabold">
                /&gt;
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 mr-4">
          <NavLink to="hero-section">Home</NavLink>
          <NavLink to="about-section">About</NavLink>
          <NavLink to="project-section">Projects</NavLink>
          <NavLink to="contact-section">Contact</NavLink>
          <Toggler />
        </div>
        <div className="md:hidden items-center space-x-6 mr-4">
          <Toggler />
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 
          transition-opacity duration-300 
          ${isMenuOpen && !isHidden 
            ? 'opacity-100' 
            : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 w-64 h-full 
          bg-white dark:bg-neutral-900 shadow-lg z-40 
          transform transition-transform duration-300 ease-in-out 
          ${isMenuOpen && !isHidden 
            ? 'translate-x-0' 
            : 'translate-x-full'
          }`}
        role="menu"
      >
        <div className="flex flex-col h-full">
          <nav className="py-6">
            <MobileNavLink to="hero-section">Home</MobileNavLink>
            <MobileNavLink to="about-section">About</MobileNavLink>
            <MobileNavLink to="project-section">Projects</MobileNavLink>
            <MobileNavLink to="contact-section">Contact</MobileNavLink>
            {/* <div className="mt-4 pl-6 flex justify-start">
            <Toggler />
            </div> */}
          </nav>
        </div>
      </div>
    </>
  );
}