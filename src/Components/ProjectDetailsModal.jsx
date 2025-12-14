/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import useAnalytics from "../Hooks/useAnalytics";

export default function ProjectDetailsModal({ project, isOpen, onClose }) {
  const { trackEvent } = useAnalytics();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when modal opens or project changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const allImages = [project.img, ...(project.additionalImages || [])];
  
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-charcoal border border-black/10 dark:border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl flex flex-col md:flex-row transition-colors duration-300 relative">
              
              {/* Close Button (Mobile) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white/70 hover:text-electric-indigo transition-colors md:hidden z-20"
              >
                <X size={20} />
              </button>

              {/* Image Section (Carousel) */}
              <div className="w-full md:w-1/2 bg-gray-100 dark:bg-rich-black relative group h-64 md:h-auto">
                 <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={allImages[currentImageIndex]}
                            alt={project.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-contain object-center"
                        />
                    </AnimatePresence>
                    
                    {/* Dark gradient for text readability on mobile if needed, or just aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                 </div>

                 {/* Carousel Controls */}
                 {allImages.length > 1 && (
                     <>
                        <button 
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Previous Image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Next Image"
                        >
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"}`}
                                />
                            ))}
                        </div>
                     </>
                 )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="pr-8 md:pr-0">
                    <h3 className="text-electric-indigo font-mono text-sm mb-2 uppercase tracking-wider">{project.category || "Development"}</h3>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h2>
                  </div>
                  {/* Close Button (Desktop) */}
                  <button
                    onClick={onClose}
                    className="text-gray-400 dark:text-white/50 hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors hidden md:block"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow text-sm md:text-base">
                  {project.description || "A detailed look into this project."}
                </p>

                <div className="space-y-6">
                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                            <Code2 size={18} className="text-electric-indigo"/>
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack?.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-xs md:text-sm text-gray-700 dark:text-gray-300"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/10">
                        {project.links?.site && (
                            <a
                            href={project.links.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("Project Modal", "Live Demo Click", project.title)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-electric-indigo text-white rounded-xl font-semibold hover:bg-electric-indigo/80 transition-colors text-sm md:text-base"
                            >
                            <ExternalLink size={18} />
                            Live Demo
                            </a>
                        )}
                        {project.links?.github && (
                            <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("Project Modal", "Source Code Click", project.title)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm md:text-base"
                            >
                            <Github size={18} />
                            Source Code
                            </a>
                        )}
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
