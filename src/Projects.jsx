/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, TrendingUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import * as Images from "./assets";
import ProjectDetailsModal from "./Components/ProjectDetailsModal";
import useAnalytics from "./Hooks/useAnalytics";
import { useTranslation } from "react-i18next";

const projectsList = [
  {
    id: "mirror-mind",
    year: 2024,
    category: "AI",
    githubLink: "https://github.com/SouravPaitandy/mirror-mind",
    skills: ["React", "FastAPI", "Tailwind v4", "Groq AI", "Framer Motion"],
    liveLink: "https://mirror-mind-xi.vercel.app",
    img: Images.MirrorMind,
    additionalImages: [Images.InAction, Images.ResponsiveView],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "FastAPI",
      "Python",
      "Groq API",
    ],
    links: {
      site: "https://mirror-mind-frontend.vercel.app", // Update this with your actual live link
      github: "https://github.com/SouravPaitandy/mirror-mind",
    },
  },
  {
    id: "hexode-ide",
    year: 2024,
    category: "AI",
    githubLink: "https://github.com/SouravPaitandy/hexode",
    skills: [
      "React",
      "Node.js",
      "Monaco Editor",
      "Yjs (CRDTs)",
      "WebSockets",
      "Google Gemini",
    ],
    liveLink: "https://hexode.vercel.app",
    img: Images.hexode,
    additionalImages: [
      Images.hexodeDashboard,
      Images.hexodeIDE,
      Images.hexodePlayground,
      Images.hexodeDocs,
    ],
    stack: [
      "React",
      "Node.js",
      "Monaco Editor",
      "Yjs (CRDTs)",
      "WebSockets",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    links: {
      site: "https://hexode.vercel.app",
      github: "https://github.com/SouravPaitandy/hexode",
    },
  },

  {
    id: "jagjit-kaur-fashion",
    year: 2024,
    category: "Full Stack",
    githubLink: "https://github.com/SouravPaitandy/jagjitkaur-website",
    skills: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://jkbyjagjitkaur.com",
    img: Images.jagjitkaur,
    additionalImages: [Images.jk1, Images.jk2, Images.jk3, Images.jk4],
    stack: [
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "Framer Motion",
      "Google Analytics",
    ],
    links: {
      site: "https://jkbyjagjitkaur.com",
      github: "https://github.com/SouravPaitandy/jagjitkaur-website",
    },
  },
  {
    id: "collab-hub",
    year: 2023,
    category: "Full Stack",
    githubLink: "https://github.com/SouravPaitandy/collabhub",
    skills: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveLink: "https://getcoordly.vercel.app/",
    img: Images.Coordly,
    additionalImages: [
      Images.CoordlyDashboard,
      Images.CoordlyCollabs,
      Images.CoordlyWorkspace,
      Images.CoordlyWorkspaceAllFeatures,
      Images.CoordlyTaskboard,
      Images.CoordlyVideocallInterface,
    ],
    stack: ["Next.js", "MongoDB", "Socket.io", "Real-time"],
    links: {
      site: "https://getcoordly.vercel.app/",
      github: "https://github.com/SouravPaitandy/collabhub",
    },
  },
  {
    id: "drawsync",
    year: 2023,
    category: "Full Stack",
    githubLink: "https://github.com/SouravPaitandy/drawsync",
    skills: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    liveLink: "https://drawsync.vercel.app",
    img: Images.drawsync,
    additionalImages: [Images.Dscreenshot1, Images.Dscreenshot2],
    stack: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    links: {
      site: "https://drawsync.vercel.app",
      github: "https://github.com/SouravPaitandy/drawsync",
    },
  },
  {
    id: "vox-ai",
    year: 2023,
    category: "Frontend",
    githubLink: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    skills: ["React", "Tailwind CSS", "Gemini API", "Web Speech API"],
    liveLink: "https://voxai-project.vercel.app/",
    img: Images.Voxai,
    additionalImages: [Images.voxaiApp],
    stack: ["React", "Tailwind", "Vite", "AI"],
    links: {
      site: "https://voxai-project.vercel.app/",
      github: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    },
  },
];

const ProjectTextBlock = ({ project, index, onInView, onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50% 0px -50% 0px" }} // Trigger only when exact center
      transition={{ duration: 0.6 }}
      onViewportEnter={() => onInView(index)}
      className="min-h-[50vh] md:min-h-screen flex flex-col justify-center py-12 md:py-24 border-b border-black/5 dark:border-white/5 last:border-0"
    >
      <div className="space-y-6 max-w-xl">
        <div className="flex items-center gap-3">
          <span className="text-electric-indigo font-mono text-sm tracking-widest uppercase">
            0{index + 1}
          </span>
          <span className="h-[1px] w-12 bg-black/10 dark:bg-white/10"></span>
          <span className="text-gray-500 dark:text-gray-500 font-mono text-xs tracking-wider uppercase">
            {t(`projects.${project.id}.category`)}
          </span>
        </div>

        <h3
          className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors"
          onClick={() => onOpenModal(project)}
        >
          {t(`projects.${project.id}.title`)}
        </h3>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {t(`projects.${project.id}.shortDescription`)}
          </p>

          {/* Impact Section */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-electric-indigo/5 border border-electric-indigo/10">
            <TrendingUp
              size={20}
              className="text-electric-indigo flex-shrink-0 mt-1"
            />
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
              {t(`projects.${project.id}.impact`)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 pt-6">
          <button
            onClick={() => onOpenModal(project)}
            className="text-gray-900 dark:text-white border-b border-electric-indigo pb-1 hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors flex items-center gap-2"
          >
            {t("projects.view_details")} <ArrowRight size={16} />
          </button>
          <div className="flex gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={project.links.site}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSortBar = ({ sortMode, setSortMode, activeCategory, setActiveCategory }) => {
  const { t } = useTranslation();
  const sortOptions = [
    { id: "featured", label: t("projects.sort.featured") },
    { id: "latest", label: t("projects.sort.latest") },
    { id: "category", label: t("projects.sort.category") },
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
                {cat === "All" ? t("projects.sort.all") : cat}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Projects() {
  const { trackEvent } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sortMode, setSortMode] = useState("featured"); // "featured" | "latest" | "category"
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useTranslation();

  const displayedProjects = useMemo(() => {
    let list = [...projectsList];
    if (sortMode === "latest") return list.sort((a, b) => b.year - a.year);
    if (sortMode === "category" && activeCategory !== "All")
      return list.filter((p) => p.category === activeCategory);
    return list; // "featured" = default array order
  }, [sortMode, activeCategory]);

  useEffect(() => {
    setActiveIndex(0);
  }, [sortMode, activeCategory]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpenModal = (project) => {
    trackEvent("Projects", "Modal Open", t(`projects.${project.id}.title`));
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="project-section"
      className="relative bg-white dark:bg-rich-black transition-colors duration-300"
    >
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-electric-indigo"></div>
            <span className="text-electric-indigo font-mono uppercase tracking-widest text-xs">
              {t("projects.selected_works")}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {t("projects.section_title")}{" "}
            <span className="text-gray-400 dark:text-gray-600">
              {t("projects.section_title_highlight")}
            </span>
          </h2>
        </div>
        
        <ProjectSortBar
          sortMode={sortMode}
          setSortMode={setSortMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
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
                  {t("projects.expand_view")}
                </span>
              </div>
              <AnimatePresence mode="wait">
                {displayedProjects[activeIndex] && (
                  <motion.img
                    key={displayedProjects[activeIndex].id}
                    src={displayedProjects[activeIndex].img}
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
                displayedProjects.map((project, index) => (
                  <div key={project.id} id={project.id} className="relative">
                    {/* Mobile Image (Visible only on mobile) */}
                    <div
                      className="lg:hidden mb-6 aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10"
                      onClick={() => handleOpenModal(project)}
                    >
                      <img
                        src={project.img}
                        alt={project.id}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <ProjectTextBlock
                      project={project}
                      index={index}
                      onInView={setActiveIndex}
                      onOpenModal={handleOpenModal}
                    />
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Archive Link */}
          <div className="py-24">
            <a
              href="https://github.com/SouravPaitandy"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("Projects", "Archive Click", "GitHub Profile")
              }
              className="group inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors"
            >
              {t("projects.view_archive")}{" "}
              <ArrowRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
