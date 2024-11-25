import "./Styles/projects.css";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./Components/ProjectCard";
import * as Images from "./assets";
import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const projectsData = [
  {
    title: "Simon Says",
    shortDescription: "Online version of classic game of memory, Simon Says.",
    githubLink: "https://github.com/SouravPaitandy/SimonGame",
    skills: ["JavaScript", "HTML5", "CSS"],
    liveLink: "https://souravpaitandy.github.io/SimonGame/",
    image: Images.image19,
    longDescription: "Recreated the classic Simon game in HTML, CSS, and JavaScript to showcase my front-end skills. Real-time scoring and red flags for mistakes. Solo project. Please try it out."
  },
  {
    title: "VoxAI",
    shortDescription: "VoxAI Assistant - Voice-Activated AI Web Application",
    githubLink: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    skills: ["React", 'React Router', 'Tailwind CSS', 'Axios', 'Google Gemini API', 'Web Speech API', 'Vite'],
    liveLink: "https://voxai-project.vercel.app/",
    image: Images.image25,
    longDescription: "Developed a state-of-the-art voice-activated AI assistant web application that leverages speech recognition, text-to-speech synthesis, and Google's Gemini API for natural language processing."
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  const togglePopup = () => setShowPopup(!showPopup);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) {
      nextProject(); // Swipe left
    } else if (distance < -50) {
      prevProject(); // Swipe right
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <motion.div layout>
      <section id="project-section" className="section projects py-24 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between items-center overflow-hidden">
        <motion.h1
          initial={{opacity:0, x: -50}}
          whileInView={{opacity:1, x: 0, transition:{duration:0.6, ease: "easeOut"}}}
          className="about-h1 text-5xl font-bold text-center text-cyan-800 dark:text-cyan-200"
        >
          Projects
        </motion.h1>
        <motion.div 
          initial={{opacity:0, scaleX: 0}}
          whileInView={{opacity:1, scaleX: 1, transition:{duration:0.8, ease: "easeInOut"}}}
          className="underline bg-gradient-to-r from-cyan-500 to-teal-500 h-1.5 w-24 sm:w-32 border-none mt-6 mb-12 sm:mb-16 rounded-full mx-auto"
        ></motion.div>
        <div className="project-slider relative w-full max-w-4xl">
          <div className="flex items-center justify-between">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject} 
              className="mr-4 text-3xl text-cyan-600 hover:text-cyan-800 transition-colors z-10"
            >
              <FaChevronLeft />
            </motion.button>
            <div 
              className="project-holder flex-grow overflow-hidden rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* <AnimatePresence initial={false} custom={direction}> */}
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  <ProjectCard 
                    project={projectsData[currentIndex]} 
                    onShowSkills={togglePopup} // Pass down the function
                  />
                </motion.div>
              {/* </AnimatePresence> */}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject} 
              className="ml-4 text-3xl text-cyan-600 hover:text-cyan-800 transition-colors z-10"
            >
              <FaChevronRight />
            </motion.button>
          </div>
          <div className="flex justify-center mt-8">
            {projectsData.map((_, index) => (
              <motion.button
                key={index}
                className={`h-3 w-3 rounded-full mx-2 ${
                  index === currentIndex ? 'bg-cyan-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* Popup for skills */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="skills-popup bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-bold mb-4 text-center">All Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {projectsData[currentIndex].skills.map((skill, index) => (
                    <span key={index} className="skill bg-gray-200 dark:bg-gray-900 dark:text-neutral-400 px-3 py-1 rounded text-md">{skill}</span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
                    onClick={togglePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
