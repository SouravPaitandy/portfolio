import "./Styles/about.css";
import { Link } from "react-scroll";
import { motion } from "framer-motion"; 
import * as Images from './assets';
import ResumeViewer from "./ResumeViewer";

export default function About() {
  return (
    <section
      id="about-section"
      className="about-bg about bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-slate-900 dark:to-cyan-900 py-24 sm:py-32 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{opacity:0, y: -30}}
          whileInView={{opacity:1, y: 0, transition:{duration:0.6}}}
          className="about-h1 text-4xl sm:text-5xl font-bold text-center mb-6 text-cyan-800 dark:text-cyan-200"
        >
          About Me
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
          Developing software for <span className="text-cyan-600 dark:text-cyan-400 font-bold">1+</span> years |
          Passionate about Building <span className="text-cyan-600 dark:text-cyan-400 font-bold">Dynamic</span>{" "}
          Web Applications
        </motion.h2>
        <div className="content-wrapper flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
          <motion.div 
            className="description flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">Get to know me!</h3>
            <div className="roboto-regular des-text space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                Hi there! I&apos;m a Computer Science Engineering student at NSHM
                Knowledge Campus, Durgapur, affiliated with MAKAUT, passionate
                about web development and problem-solving.
              </p>
              <p>
                Skilled in C, Java, Python, HTML5, CSS, JavaScript, React, Next.js, 
                Node, Express, SQL, and NoSQL databases.
              </p>
              <p>
                I&apos;m on the lookout for opportunities to apply my skills and
                contribute to innovative projects in the field of web development.
                Let&apos;s connect and explore how we can collaborate to create
                impactful solutions.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="project-section" smooth={true} duration={500}>
                <motion.button 
                  initial={{opacity:0, y: 20}}
                  whileInView={{opacity:1, y: 0, transition:{duration:0.4}}}
                  className="project-btn mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                 Projects
                </motion.button>
              </Link>
              <motion.button 
                initial={{opacity:0, y: 20}}
                whileInView={{opacity:1, y: 0, transition:{duration:0.4}}}
                className="project-btn mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <ResumeViewer heading="My Resume"/>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="skills flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">My Toolkit</h3>
            <div className="tech-lists grid grid-cols-3 sm:grid-cols-4 gap-6">
              {/* Existing skill icons */}
              {/* Add hover and focus effects to each icon container */}
              <div className="tooltip-container group">
                <span className="tooltip group-hover:opacity-100 group-hover:visible">Javascript</span>
                <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                  <img
                    src={Images.image3}
                    alt="Javascript"
                    className="project-img"
                  />
                </span>
              </div>
              {/* Repeat for other skills */}
              <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Express</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image10}   //{import.meta.env.BASE_URL + './assets/skills13.png'}
                  alt="Express"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">MongoDB</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image24}              
                  alt="MongoDB"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">React</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src= {Images.image6}
                  alt="React"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Next.js</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
              <img
                  src={Images.image8}
                  alt="Next.js"
                  className="project-img dark:filter-none invert"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">SQL</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src= {Images.image11}
                  alt="SQL"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">HTML5</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image1}
                  alt="HTML5"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">CSS3</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image2}
                  alt="CSS3"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Redux</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image7}
                  alt="Redux"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Bootstrap</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image4}
                  alt="Bootstrap"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Tailwind</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image5}
                  alt="Tailwind"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container group">
              <span className="tooltip group-hover:opacity-100 group-hover:visible">Node.js</span>
              <span className="text transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                <img
                  src={Images.image9}
                  alt="Node.js"
                  className="project-img"
                />
              </span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
