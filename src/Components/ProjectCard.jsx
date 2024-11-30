/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
// import "../Styles/Projects.css";

export default function ProjectCard({ project, onShowSkills }) {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize skill rendering to optimize performance
  const skillsDisplay = useMemo(() => {
    const visibleSkills = project.skills.slice(0, 2);
    return (
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {visibleSkills.map((skill, index) => (
          <span 
            key={index} 
            className=" bg-gray-200 dark:bg-gray-700 px-2 py-1.5 rounded-md text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 2 && (
          <button 
            onClick={onShowSkills}
            className="text-sm text-teal-800 dark:text-cyan-500 
              hover:text-teal-900 dark:hover:text-cyan-400 
              hover:underline transition-colors duration-300"
            aria-label={`Show all ${project.skills.length} skills for ${project.title}`}
          >
            +{project.skills.length - 2} More
          </button>
        )}
      </div>
    );
  }, [project.skills, onShowSkills, project.title]);

  return (
    <motion.div 
      className="project flex flex-col md:flex-row gap-8 p-6 md:p-12 
        rounded-2xl dark:bg-neutral-800 bg-slate-100 
        border border-gray-200 dark:border-neutral-700 
        shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-data md:max-w-80 flex flex-col justify-between">
        <div>
          <h3 className="card-h3 font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">
            {project.title}
          </h3>
          
          <div className="short-des flex flex-col roboto-regular mb-2">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {project.shortDescription}
            </p>
          </div>
          <div className="project-type flex items-center gap-2 mb-3">
           <span className="text-sm md:text-base font-medium text-teal-800 dark:text-teal-500">
             Project Type:
           </span>
           <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1.5 rounded-full text-sm md:text-base font-bold">
             {project.projectType}
           </span>
         </div>

          {skillsDisplay}
        </div>

        <div className="flex gap-4 items-center">
        <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 
                text-cyan-600 dark:text-teal-500 
                hover:text-teal-800 dark:hover:text-cyan-500 
                max-w-52 px-6 py-3 rounded-full transition-all duration-300 
                ease-in-out transform hover:-translate-y-1
                shadow-md hover:shadow-lg bg-transparent backdrop-blur-md"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 max-w-52 text-center px-6 py-3 
              text-sm uppercase tracking-wider font-semibold
              text-white bg-gradient-to-tr from-teal-700 to-cyan-700 dark:bg-gradient-to-tr dark:from-teal-600 dark:to-cyan-600
              rounded-full
              shadow-md hover:shadow-lg
              transition-all duration-300 ease-in-out
              transform hover:-translate-y-1
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
            aria-label={`View live project: ${project.title}`}
          >
            <ExternalLink size={16} />
            Live <span className='hidden md:inline'>link</span>
          </a>
        </div>
      </div>

      <div className="card md:max-w-96 w-full relative">
        <motion.div
          className="card-div overflow-hidden rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 0.7 : 1, 
            scale: isHovered ? 0.95 : 1 
          }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-teal-700/70 to-cyan-700/70 dark:bg-gradient-to-tr dark:from-teal-600/80 dark:to-cyan-600/80 
              bg-opacity-80 rounded-xl flex items-center justify-center 
              text-white p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="roboto-regular text-sm md:text-base">
              {project.longDescription}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}