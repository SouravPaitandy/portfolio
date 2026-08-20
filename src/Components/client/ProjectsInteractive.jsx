"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDetailsModal from "../../Components/ProjectDetailsModal";
import useAnalytics from "../../Hooks/useAnalytics";
import ClientReveal from "./ClientReveal";
import Image from "next/image";

const ProjectSortBar = ({
  sortMode,
  setSortMode,
  activeCategory,
  setActiveCategory,
  dict,
}) => {
  const t = dict.projects;
  const sortOptions = [
    { id: "featured", label: t.sort?.featured || "Featured" },
    { id: "latest", label: t.sort?.latest || "Latest" },
    { id: "category", label: t.sort?.category || "Category" },
  ];

  const categories = ["All", "AI", "Full Stack", "Frontend"];

  return (
    <div className="flex flex-col gap-3 mt-4 md:mt-0">
      <div className="flex flex-wrap items-center gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSortMode(option.id);
              if (option.id !== "category") setActiveCategory("All");
            }}
            className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
              sortMode === option.id
                ? "bg-electric-indigo/10 border-electric-indigo/30 text-electric-indigo"
                : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-500 hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {sortMode === "category" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="flex flex-wrap items-center gap-2 overflow-hidden"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                    : "bg-transparent border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-black/30 dark:hover:border-white/30"
                }`}
              >
                {cat === "All" ? (t.sort?.all || "All") : cat}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProjectsInteractive({ projectsData, textBlocks, dict }) {
  const { trackEvent } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortMode, setSortMode] = useState("featured");
  const [activeCategory, setActiveCategory] = useState("All");
  const t = dict.projects;

  const displayedProjects = useMemo(() => {
    let list = [...projectsData];
    if (sortMode === "latest")
      return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortMode === "category" && activeCategory !== "All")
      return list.filter((p) => p.category === activeCategory);
    return list;
  }, [sortMode, activeCategory, projectsData]);

  useEffect(() => {
    setActiveIndex(0);
  }, [sortMode, activeCategory]);

  const handleOpenModal = useCallback((project) => {
    trackEvent("Projects", "Modal Open", t[project.id]?.title || project.id);
    setSelectedProject(project);
    setIsModalOpen(true);
  }, [trackEvent, t]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Add event listener for static modal triggers
  useEffect(() => {
    const handleTrigger = (e) => {
      const trigger = e.target.closest('[data-modal-trigger]');
      if (trigger) {
        const projectId = trigger.getAttribute('data-modal-trigger');
        const proj = projectsData.find(p => p.id === projectId);
        if (proj) handleOpenModal(proj);
      }
    };
    document.addEventListener('click', handleTrigger);
    return () => document.removeEventListener('click', handleTrigger);
  }, [projectsData, t, handleOpenModal]);

  return (
    <>
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-electric-indigo"></div>
            <span className="text-electric-indigo font-mono uppercase tracking-widest text-xs">
              {t.selected_works || "Selected Works"}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {t.section_title || "Featured"}{" "}
            <span className="text-gray-400 dark:text-gray-600">
              {t.section_title_highlight || "Projects"}
            </span>
          </h2>
        </div>

        <ProjectSortBar
          sortMode={sortMode}
          setSortMode={setSortMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          dict={dict}
        />
      </div>

      <div className="mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Sticky Image Column (Left) - Desktop Only */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="sticky top-10 h-screen flex items-center justify-center py-12">
            <div
              className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 group cursor-pointer"
              onClick={() => {
                if (displayedProjects[activeIndex]) {
                  handleOpenModal(displayedProjects[activeIndex]);
                }
              }}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                <span className="bg-charcoal/90 text-white px-6 py-2 rounded-full font-medium">
                  {t.expand_view || "Expand"}
                </span>
              </div>
              <AnimatePresence mode="wait">
                {displayedProjects[activeIndex] && (
                  <motion.img
                    key={displayedProjects[activeIndex].id}
                    src={displayedProjects[activeIndex].img.src || displayedProjects[activeIndex].img} // Handle next/image src if needed
                    alt={displayedProjects[activeIndex].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-transparent"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scrollable Text Column (Right) */}
        <div className="min-h-screen w-full lg:w-1/2 flex flex-col pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sortMode}-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {displayedProjects.length === 0 ? (
                <div className="py-24 text-gray-500 font-mono text-sm text-center">
                  No projects found.
                </div>
              ) : (
                displayedProjects.map((project, index) => {
                  const originalIndex = projectsData.findIndex(p => p.id === project.id);
                  const textBlock = textBlocks[originalIndex];

                  return (
                    <div key={project.id} id={project.id} className="relative">
                      {/* Mobile Image */}
                      <div
                        className="lg:hidden mb-6 aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mt-12 relative"
                        onClick={() => handleOpenModal(project)}
                      >
                        <Image
                          src={project.img.src || project.img}
                          alt={project.id}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>

                      <ClientReveal
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50% 0px -50% 0px" }}
                        transition={{ duration: 0.6 }}
                        onViewportEnter={() => setActiveIndex(index)}
                        className="min-h-[50vh] md:min-h-screen flex flex-col justify-center py-12 md:py-24 border-b border-black/5 dark:border-white/5 last:border-0"
                      >
                        {textBlock}
                      </ClientReveal>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dict={dict}
      />
    </>
  );
}
