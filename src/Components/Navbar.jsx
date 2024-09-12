/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import "../Styles/navbar.css";
import { Link } from "react-scroll";
import Toggler from "./Theme_btn";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const [activeLink, setActiveLink] = useState(""); // New state for active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if the user has scrolled down at least two viewport heights
      if (currentScrollY >= 2) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    };
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // The dependency array is empty, meaning this effect runs once after the initial render

  useEffect(() => {
    const sections = document.querySelectorAll("section"); // Replace with your section class or tag

    const handleActiveSection = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = (rect.top + rect.bottom) / 2; // Calculate middle position
        if (sectionMiddle >= 0 && sectionMiddle <= window.innerHeight) {
          //&& rect. <= window.innerHeight) {
          const sectionId = section.getAttribute("id");
          console.log(sectionId);
          setActiveLink(sectionId); // Update active link
        }
      });
    };

    window.addEventListener("scroll", handleActiveSection);
    console.log(activeLink);
    return () => {
      window.removeEventListener("scroll", handleActiveSection);
    };
  });

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      smooth={true}
      duration={1000}
      className={`relative group px-5 py-3 text-xl font-extrabold uppercase transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
        activeLink === to
          ? "text-blue-600 dark:text-green-500 bg-blue-100 dark:bg-gray-800"
          : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-green-500"
      }`}
      onClick={() => setActiveLink(to)}
    >
      <span className="relative z-10">{children}</span>
      {activeLink !== to && (
        <>
          <span className="absolute inset-0 bg-blue-100 dark:bg-gray-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          <span className="absolute top-0 right-0 w-1 h-full bg-blue-600 dark:bg-green-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-bottom"></span>
        </>
      )}
      {activeLink === to && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-green-500"></span>
      )}
    </Link>
  );

  const MobileNavLink = ({ to, children }) => (
    <Link
      to={to}
      smooth={true}
      duration={1000}
      className={`block cursor-pointer w-full py-4 px-6 text-lg font-bold transition-all duration-300 ease-in-out ${
        activeLink === to
          ? "bg-blue-100 dark:bg-green-900 text-blue-600 dark:text-green-500"
          : "hover:bg-gray-100 dark:hover:bg-neutral-800"
      }`}
      onClick={() => {
        setActiveLink(to);
        setIsMenuOpen(false);
      }}
    >
      {children}
    </Link>
  );

  return (
    <>
    <nav
      className={`flex justify-between items-center dark:bg-neutral-900 dark:text-white
      bg-[#EEEEEE] text-black shadow-lg h-16 w-full fixed top-0 z-50 ${
        !isHidden ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-500 ease-in-out px-4 md:px-8`}
    >
      <div className="logo ml-4 cursor-pointer flex items-center space-x-4">
        <Link
          to="hero-section"
          smooth={true}
          duration={1000}
          className="flex items-center space-x-2"
        >
          <div className="nav-img h-12 w-12 rounded-full border-2 dark:border-green-500 border-blue-600"></div>
          <span className="nav-name font-bold text-xl md:text-3xl">
            <span className="text-blue-600 dark:text-green-500 roboto-regular font-extrabold">&lt;</span>
            DevShowcase
            <span className="text-blue-600 dark:text-green-500 roboto-regular font-extrabold">/&gt;</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-6 mr-4">
        <NavLink to="about-section">About</NavLink>
        <NavLink to="project-section">Projects</NavLink>
        <NavLink to="contact-section">Contact</NavLink>
        <Toggler />
      </div>
      {/* <Toggler /> */}
      <button
        className="md:hidden text-2xl focus:outline-none mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </nav>

<div
  className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
    isMenuOpen && !isHidden ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
  onClick={() => setIsMenuOpen(false)}
></div>

<div
  className={`fixed top-16 right-0 w-64 h-full bg-white dark:bg-neutral-900 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
    isMenuOpen && !isHidden ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col h-full">
    <div className="py-6">
      <MobileNavLink to="about-section" >About</MobileNavLink>
      <MobileNavLink to="project-section">Projects</MobileNavLink>
      <MobileNavLink to="contact-section">Contact</MobileNavLink>
    </div>
    {/* <div className="mt-auto pb-6 flex justify-center">
      <Toggler />
    </div> */}
    <div className="flex items-center ml-6"><Toggler /></div>
  </div>
</div>

</>
  );
}
