/* eslint-disable react/display-name */
import { memo } from 'react';
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import * as Images from './assets';
import ResumeViewer from "./ResumeViewer";
import useTheme from './Contexts/theme';
import { Briefcase, Terminal, User } from 'lucide-react';
import FloatingSkills from './Components/FloatingSkills';
import './Styles/about.css'

const About = memo(() => {
  const { themeMode } = useTheme();
  
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

  return (
    <section
      id="about-section"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-rich-black transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-electric-indigo/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 md:w-72 md:h-72 bg-purple-600/20 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            About <span className="text-electric-indigo">Me</span>
          </h2>
          <div className="w-24 h-1 bg-electric-indigo mx-auto rounded-full opacity-80" />
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Developing software for <span className="text-gray-900 dark:text-white font-medium">2+ years</span>.
            Building <span className="text-electric-indigo font-medium">dynamic</span> digital experiences with modern technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Bio Column */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/60 dark:bg-charcoal/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl hover:border-electric-indigo/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-electric-indigo w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Who I Am</h3>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                <p>
                  Hi there! I'm <span className="text-gray-900 dark:text-white font-medium">Sourav</span>, a Computer Science Engineering student at NSHM Knowledge Campus, Durgapur.
                </p>
                <p>
                  I sit at the intersection of design and engineering, crafting applications that not only look great but perform flawlessly. My approach is detail-oriented, focusing on scalable clean code and intuitive user experiences.
                </p>
                <p>
                  Building performant <span className="text-electric-indigo font-medium">fullstack apps</span> with <span className="text-electric-indigo font-medium">MERN</span> and <span className="text-electric-indigo font-medium">Next.js</span> is where I thrive.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button 
                    whileHover={{scale:1.02}}
                    whileTap={{ scale: 0.98 }}
                    className="flex-grow md:flex-grow-0 px-6 py-3 bg-transparent text-gray-700 dark:text-gray-300 font-bold transition-all cursor-pointer text-center"
                  >
                    <ResumeViewer heading="Resume / CV" />
                </motion.button>
                
                <Link to="project-section" href='#project-section' smooth={true} duration={800} className="flex-grow md:flex-grow-0">
                  <motion.div 
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(99,102,241,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all cursor-pointer text-center"
                    >
                      View Projects
                  </motion.div>
                </Link>
                
                <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noopener noreferrer" className="flex-grow md:flex-grow-0">
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(99,102,241,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all text-sm md:text-base"
                  >
                    LinkedIn
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills Column - Simplified/Hidden Grid if Floating Bubbles replace it, but keeping it as requested to "augment" */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/60 dark:bg-charcoal/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl hover:border-electric-indigo/20 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-electric-indigo w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Arsenal</h3>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {skillIcons.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-electric-indigo/30 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                      <img
                        src={skill.src}
                        alt={skill.alt}
                        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Terminal className="w-4 h-4" />
                  <span>Always learning new technologies</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
        
        {/* Floating Skills Bubbles Section */}
        <FloatingSkills />
        
      </div>
    </section>
  );
});

export default About;