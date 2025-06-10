/* eslint-disable react/display-name */
import { memo, useState, useEffect, useRef } from 'react';
import { Link } from "react-scroll";
import { motion } from "framer-motion"; 
import * as Images from './assets';
import ResumeViewer from "./ResumeViewer";
import useTheme from './Contexts/theme';
import './Styles/about.css'

const About = memo(() => {
  const {themeMode} = useTheme();
  const skillIcons = [
    { src: Images.image3, alt: 'Javascript', name: 'Javascript' },
    { src: Images.image10, alt: 'Express', name: 'Express' },
    { src: Images.image24, alt: 'MongoDB', name: 'MongoDB' },
    { src: Images.image6, alt: 'React', name: 'React' },
    { src: Images.image8, alt: 'Next.js', name: 'Next.js' },
    { src: Images.image11, alt: 'SQL', name: 'SQL' },
    { src: Images.image1, alt: 'HTML5', name: 'HTML5' },
    { src: Images.image2, alt: 'CSS3', name: 'CSS3' },
    { src: Images.image7, alt: 'Redux', name: 'Redux' },
    { src: Images.image4, alt: 'Bootstrap', name: 'Bootstrap' },
    { src: Images.image5, alt: 'Tailwind', name: 'Tailwind' },
    { src: Images.image9, alt: 'Node.js', name: 'Node.js' }
  ];

  // Custom Parallax Hook with Performance Optimization
function useParallax(ref, rate = 0.03) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * rate;
        const y = (e.clientY - (top + height / 2)) * rate;
        setOffset({ x, y });
      }
    };

    const debouncedMove = debounce(handleMove, 10);
    window.addEventListener('mousemove', debouncedMove);
    return () => window.removeEventListener('mousemove', debouncedMove);
  }, [ref, rate]);

  return offset;
}

function debounce(func, wait) {
  let timeout = null;
  return function executedFunction(...args) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const aboutRef = useRef(null);
const { x: parallaxX, y: parallaxY } = useParallax(aboutRef);

  return (
    <section
      id="about-section"
      className="about-bg about bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-slate-900 dark:to-cyan-900 py-24 sm:py-32 px-6 sm:px-8 md:px-16 lg:px-24"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          id="about-title"
          initial={{opacity:0, y: -30}}
          whileInView={{opacity:1, y: 0, transition:{duration:0.6}}}
          className="about-h1 text-4xl sm:text-5xl font-bold text-center mb-6 text-cyan-800 dark:text-cyan-200"
        >
          About <span className="text-gray-800 dark:text-gray-100">Me</span>
        </motion.h1>
        <motion.div 
          initial={{opacity:0, scaleX: 0}}
          whileInView={{opacity:1, scaleX: 1, transition:{duration:0.6}}}
          className="underline bg-gradient-to-r from-cyan-500 to-teal-500 h-1.5 w-24 sm:w-32 border-none mb-12 sm:mb-16 rounded-full mx-auto"
        />
        <motion.h2 
          initial={{opacity:0, y: 30}}
          whileInView={{opacity:1, y: 0, transition:{duration:0.6}}}
          className="mb-16 sm:mb-20 text-slate-700 dark:text-cyan-100 text-lg sm:text-xl text-center max-w-2xl mx-auto roboto-regular-italic font-semibold leading-relaxed"
        >
          Developing software for <span className="text-cyan-600 dark:text-cyan-400 font-bold">2+</span> years |
          Building <span className="text-cyan-600 dark:text-cyan-400 font-bold">Dynamic</span>{" "}
          web apps with modern technologies
        </motion.h2>
        <div className="content-wrapper flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
          <div
            ref={document.body.clientWidth > 640 ? aboutRef : null} 
            style={document.body.clientWidth > 640 ? {
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.1s ease-out'
            } : {}}
            className="description flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">Get to know me!</h3>
            <div className="roboto-regular des-text space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Hi there! I&apos;m Sourav, a Computer Science Engineering student at NSHM Knowledge Campus, Durgapur (MAKAUT), with a strong passion for web development and problem-solving.
              </p>
              <p>
                I enjoy building clean, responsive, and dynamic applications — from crafting smooth frontends to designing efficient backends. My current stack includes C, Java, Python, HTML5, CSS, JavaScript, React, Next.js, Node.js, Express, and both SQL & NoSQL databases.
              </p>
              <p>
              I&apos;m actively seeking opportunities where I can apply my skills, grow through real-world challenges, and contribute to innovative, impactful projects in the tech space.
              </p>
              <p>
                🚀 Let&apos;s build something amazing together!
                👉 Explore my projects or get in touch to collaborate or just say hi!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <div className='flex gap-4'>
                <Link to="project-section" smooth={true} duration={500}>
                <motion.button 
                  aria-label="View Projects"
                  initial={{opacity:0, y: 20}}
                  whileInView={{opacity:1, y: 0, transition:{duration:0.4}}}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-700 dark:to-teal-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg dark:hover:shadow-slate-900 hover:shadow-slate-400 hover:scale-110 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                 Projects
                </motion.button>
              </Link>
              <motion.button 
                aria-label="View Resume"
                initial={{opacity:0, y: 20}}
                whileInView={{opacity:1, y: 0, transition:{duration:0.4}}}
                whileHover={{scale: 1.05, transition:{ease: 'easeInOut'}}}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-700 dark:to-cyan-800 hover:from-cyan-500 hover:to-teal-500 hover:dark:from-cyan-700 hover:dark:to-teal-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <ResumeViewer heading="My Resume"/>
              </motion.button>
              </div>
              <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  aria-label="Let's Connect on LinkedIn"
                  initial={{opacity:0, y: 20}}
                  whileInView={{opacity:1, y: 0, transition:{duration:0.4}}}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-700 dark:to-teal-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg dark:hover:shadow-slate-900 hover:shadow-slate-400 hover:scale-110 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  LinkedIn
                </motion.button>
              </a>
            </div>
          </div>
          
          <motion.div 
            className="skills flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-xl"
            ref={document.body.clientWidth > 640 ? aboutRef : null} 
            style={document.body.clientWidth > 640 ? {
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.1s ease-out'
            } : {}}
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">My Toolkit</h3>
            <div className="tech-lists grid grid-cols-3 sm:grid-cols-4 gap-6">
              {skillIcons.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="tooltip-container group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.05 
                  }}
                >
                  <span className="tooltip group-hover:opacity-100 group-hover:visible absolute z-10 bg-slate-800 dark:text-white text-gray-900  text-xs px-2 py-1 rounded-md bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 transition-opacity duration-300">
                    {skill.name}
                  </span>
                  <span className="text block transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                    <img
                      src={skill.src}
                      alt={skill.alt}
                      className={`project-img ${themeMode !== 'dark' && skill.name === 'Next.js' ? 'invert' : ''}`}
                      loading="lazy"
                    />
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;