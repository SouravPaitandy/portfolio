import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import ProjectCard from "./Components/ProjectCard";
import * as Images from "./assets";
import "./Styles/projects.css";

const projectsData = [
  {
    id: 'simon-says',
    title: "Simon Says",
    shortDescription: "Online version of classic game of memory, Simon Says.",
    githubLink: "https://github.com/SouravPaitandy/SimonGame",
    skills: ["JavaScript", "HTML5", "CSS", "Game Development", "DOM Manipulation"],
    liveLink: "https://souravpaitandy.github.io/SimonGame/",
    image: Images.image19,
    longDescription: "Recreated the classic Simon game in HTML, CSS, and JavaScript to showcase front-end skills. Features real-time scoring, error tracking, and responsive design for an engaging user experience.",
    technologies: ["Vanilla JS", "HTML5", "CSS3"],
    projectType: 'Web'
  },
  {
    id: 'vox-ai',
    title: "VoxAI",
    shortDescription: "VoxAI Assistant - Voice-Activated AI Web Application",
    githubLink: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    skills: [
      "React", 
      'React Router', 
      'Tailwind CSS', 
      'Axios', 
      'Google Gemini API', 
      'Web Speech API', 
      'Vite',
      'AI Integration',
      'Voice Recognition'
    ],
    liveLink: "https://voxai-project.vercel.app/",
    image: Images.image25,
    longDescription: "Developed a cutting-edge voice-activated AI assistant web application leveraging advanced speech recognition, text-to-speech synthesis, and Google's Gemini API for natural language processing.",
    technologies: ["React", "Tailwind", "Vite", "AI"],
    projectType: 'Full Stack'
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  }, []);

  const handleSwipe = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 50) {
      nextProject();
    } else if (distance < -50) {
      prevProject();
    }
    
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [nextProject, prevProject]);

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  }, [handleSwipe]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextProject]);

  const ProjectIndicators = useMemo(() => 
    projectsData.map((_, index) => (
      <motion.button
        key={index}
        aria-label={`Go to project ${index + 1}`}
        className={`h-3 w-3 rounded-full mx-2 ${
          index === currentIndex ? 'bg-cyan-600' : 'bg-gray-300'
        }`}
        onClick={() => setCurrentIndex(index)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      />
    )), 
    [currentIndex]
  );

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

  const toggleSkillsPopup = useCallback(() => {
    setShowSkillsPopup(prev => !prev);
  }, []);

  return (
    <motion.div 
      layout 
      aria-label="Project Showcase"
      className="projects-section"
    >
      <section 
        id="project-section" 
        className="section projects py-24 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between items-center overflow-hidden"
      >

        <motion.h1
          initial={{opacity: 0, x: -50}}
          whileInView={{
            opacity: 1, 
            x: 0, 
            transition: {
              duration: 0.6, 
              ease: "easeOut"
            }
          }}
          className="about-h1 text-4xl sm:text-5xl font-bold text-center text-cyan-800 dark:text-cyan-200"
        >
          My Projects
        </motion.h1>

        <motion.div 
          initial={{opacity: 0, scaleX: 0}}
          whileInView={{
            opacity: 1, 
            scaleX: 1, 
            transition: {
              duration: 0.8, 
              ease: "easeInOut"
            }
          }}
          className="underline bg-gradient-to-r from-cyan-500 to-teal-500 h-1.5 w-24 sm:w-32 border-none mt-6 mb-12 sm:mb-16 rounded-full mx-auto"
        ></motion.div>

        <div 
          className="project-slider relative w-full max-w-4xl"
          aria-roledescription="carousel"
          role="region"
        >
          <div className="flex items-center justify-between">
            <motion.button 
              aria-label="Previous Project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject} 
              className="mr-4 text-3xl text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-200 transition-colors z-10"
            >
              <ChevronLeft />
            </motion.button>

            <div 
              className="project-holder flex-grow overflow-hidden rounded-lg"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
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
                  onShowSkills={toggleSkillsPopup}
                />
              </motion.div>
            </div>

            <motion.button 
              aria-label="Next Project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject} 
              className="ml-4 text-3xl text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-200 transition-colors z-10"
            >
              <ChevronRight />
            </motion.button>
          </div>

          <div 
            className="flex justify-center mt-8"
            role="tablist"
            aria-label="Project navigation"
          >
            {ProjectIndicators}
          </div>
        </div>

        <AnimatePresence>
          {showSkillsPopup && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="skills-popup-title"
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h3 
                  id="skills-popup-title"
                  className="text-2xl font-bold mb-6 text-center text-cyan-800 dark:text-cyan-300"
                >
                  Project Skills
                </h3>
                <div className="flex flex-wrap gap-3 mb-6 justify-center">
                  {projectsData[currentIndex].skills.map((skill, index) => (
                    <motion.span 
                      key={skill} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className=" bg-teal-100 dark:bg-teal-700 dark:text-neutral-200 px-3 py-1.5 rounded-md text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <motion.button
                    aria-label="Close skills popup"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-cyan-600 dark:bg-cyan-900 dark:hover:bg-cyan-800 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out flex items-center gap-2"
                    onClick={toggleSkillsPopup}
                  >
                    <Maximize2 size={18} />
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
