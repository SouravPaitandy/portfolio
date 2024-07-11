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

  return (
    <>
      <nav
        className={`flex justify-around items-center dark:bg-neutral-900 dark:text-white
        bg-[#EEEEEE] text-black  
        shadow-2xl h-16 w-full fixed top-0 z-10 ${
          !isHidden ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex logo pl-4 md:pl-8">
          <Link
            to="hero-section"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${
              activeLink === "hero-section" ? "active" : ""
            }`}
          >
            <div className="nav-img h-12 w-12 mr-4 p-4 rounded-full border dark:border-green-500 border-blue-800"></div>
          </Link>
          <Link
            to="hero-section"
            smooth={true}
            duration={500}
            className={`cursor-pointer ${
              activeLink === "hero-section" ? "active" : ""
            }`}
          >
            <p className="nav-name font-bold text-4xl">
              <span className="text-4xl dark:text-green-500 text-blue-700 roboto-regular">
                &lt;
              </span>
              Sourav Paitandy
              <span className="text-4xl dark:text-green-500 text-blue-700 roboto-regular">
                /&gt;
              </span>
            </p>
          </Link>
        </div>
        <div className="nav-links flex justify-evenly">
          <div className="hidden md:flex">
          <Link
            to="about-section"
            smooth={true}
            duration={500}
            className={`nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-6 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full  ${
              activeLink === "about-section" ? "active" : ""
            }`}
          >
            <div className="sliding-content h-1 rounded-md w-full -top-full left-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1]
             "></div>
            About
          </Link>
          <Link
            to="project-section"
            smooth={true}
            duration={500}
            className={`nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-6 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full ${
              activeLink === "project-section" ? "active" : ""
            }`}
          >
            <div className="sliding-content h-1 rounded-md w-full -top-full left-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1] "></div>
            Projects
          </Link>
          <Link
            to="contact-section"
            smooth={true}
            duration={500}
            className={`nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-8 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full ${
              activeLink === "contact-section" ? "active" : ""
            }`}
          >
            <div className="sliding-content h-1 rounded-md w-full -top-full left-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1] "></div>
            Contact
          </Link>
        </div>
        <div>
            <Toggler/>
        </div>
        </div>
       
        <div className="md:hidden flex items-center pr-4">
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            &#9776;
          </button>
          
        </div>

      </nav>

      <div
        className={`mobile-menu md:hidden fixed top-12 left-0 w-full bg-[#EEEEEE] dark:bg-neutral-900 text-black dark:text-white shadow-md transition-transform duration-300 ease-in-out ${
          isMenuOpen && !isHidden ? "translate-x-0 z-10" : "-translate-x-full" } `}>
          <div className="flex flex-col items-center py-4">
            {/* ... (navigation links remain the same but wrapped in a div) */}
            <Link
            to="about-section"
            smooth={true}
            duration={500}
            className= "nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-6 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full "
          >
            {/* <div className="sliding-content h-1 rounded-md w-full -left-full top-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1] */}
             {/* "></div> */}
            About
          </Link>
          <Link
            to="project-section"
            smooth={true}
            duration={500}
            className= "nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-6 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full "
          >
            {/* <div className="sliding-content h-1 rounded-md w-full -left-full top-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1] "></div> */}
            Projects
          </Link>
          <Link
            to="contact-section"
            smooth={true}
            duration={500}
            className= "nav-link relative bg-clip-text bg-[-100%] transition-full duration-300 ease-in-out mr-8 text-xl font-bold cursor-pointer hover:bg-[0] hover:before:w-full "
          >
            {/* <div className="sliding-content h-1 rounded-md w-full -left-full top-0 absolute transition-all duration-300 ease-in-out dark:bg-[#00FF00] bg-[#4169E1] "></div> */}
            Contact
          </Link>
          </div>
        </div>
    </>
  );
}
