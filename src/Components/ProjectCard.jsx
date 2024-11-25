/* eslint-disable react/prop-types */
// import { motion } from "framer-motion";
// import { useState } from 'react';

export default function ProjectCard({ project, onShowSkills }) {
  // const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <div className="project flex gap-[6.2rem] p-12 rounded-2xl dark:bg-slate-800 bg-slate-300 border border-gray-300 dark:border-none">
      <div className="card-data max-w-80 flex flex-col">
        <h3 className="card-h3 font-bold text-2xl mb-3">{project.title}</h3>
        <div className="short-des flex flex-col flex-wrap roboto-regular mb-3">
          {project.shortDescription}
          <span className="github dark:text-green-600 text-[#4682B4] text-base font-bold">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          </span>
        </div>
        <div className="tag-list relative">
          <div className="flex flex-wrap gap-1 mb-3">
            {project.skills.slice(0, 2).map((skill, index) => (
              <span key={index} className="skill bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs mb-1 inline-block">{skill}</span>
            ))}
            {project.skills.length > 2 && (
              <button 
                className="text-base text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-400 hover:underline mt-1 ml-2"
                onClick={onShowSkills} // Call the function passed from the parent
              >
                More
              </button>
            )}
          </div>
        </div>
        <button className="max-w-52 px-12 py-2 
            text-xs uppercase tracking-widest font-medium
            text-white bg-blue-500 dark:bg-green-500
            dark:text-white
            rounded-full
            shadow-md hover:shadow-lg
            transition-all duration-300 ease-in-out
            cursor-pointer
            focus:outline-none
            hover:bg-[#2168f5] hover:text-white hover:-translate-y-2 hover:shadow-[0_15px_20px_rgba(46,229,157,0.4)]
            dark:hover:bg-[#23c483] dark:hover:text-white hover:-translate-y-2 hover:shadow-[0_15px_20px_rgba(46,229,157,0.4)]
            active:-translate-y-0.5"> 
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm">Check It!</a>
        </button>
      </div>
      <div className="card">
        <img src={project.image} alt={project.title} className="max-w-72" />
        <div className="card__content">
          <p className="card__title roboto-regular">{project.title}</p>
          <p className="card__description roboto-regular">{project.longDescription}</p>
        </div>
      </div>
    </div>
  );
}