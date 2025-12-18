/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, TrendingUp } from "lucide-react";
import * as Images from "./assets";
import ProjectDetailsModal from "./Components/ProjectDetailsModal";
import useAnalytics from "./Hooks/useAnalytics";
import "./Styles/projects.css";

const projectsData = [
  {
    id: "hexode-ide",
    title: "Hexode: The Next-Gen Collaborative Editor",
    shortDescription:
      "A high-performance cloud IDE for real-time pair programming.",
    impact: "Conflict-free data synchronization & sandboxed code execution.",
    githubLink: "https://github.com/SouravPaitandy/hexode",
    skills: ["React", "Vite", "WS", "Node.js", "Express", "MongoDB"],
    liveLink: "https://hexode.vercel.app",
    img: Images.hexode,
    additionalImages: [Images.hexode1, Images.hexode2],
    description:
      'Hexode bridges the gap between simple text editors and complex desktop IDEs. It provides a seamless environment for developers to collaborate, debug, and run code instantly without leaving the browser. The goal was to build a "Google Docs for Code" experience that feels native and responsive.',
    stack: [
      "React",
      "Node.js",
      "Express",
      "WS",
      "Y.js",
      "Tailwind CSS",
      "MongoDB",
    ],
    category: "Full Stack IDE",
    links: {
      site: "https://hexode.vercel.app",
      github: "https://github.com/SouravPaitandy/hexode",
    },
  },
  {
    id: "jagjit-kaur-fashion",
    title: "Jagjit Kaur - Heritage Fashion",
    shortDescription:
      "A premium e-commerce platform for handcrafted Indian traditional wear.",
    impact:
      "Boosted digital presence for a heritage brand with a custom admin dashboard.",
    githubLink: "https://github.com/SouravPaitandy/jagjitkaur-website",
    skills: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://jkbyjagjitkaur.com",
    img: Images.jagjitkaur,
    additionalImages: [Images.jk1, Images.jk2, Images.jk3, Images.jk4],
    description:
      "Developed a sophisticated e-commerce platform for Jagjit Kaur's heritage fashion collection, featuring handcrafted Indian traditional wear. The application includes a complete admin management system with product upload, analytics dashboard, and admin account management. Implemented real-time Firebase integration for product management, user authentication, and data storage.",
    stack: [
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "Framer Motion",
      "Google Analytics",
    ],
    category: "Full Stack E-commerce",
    links: {
      site: "https://jkbyjagjitkaur.com",
      github: "https://github.com/SouravPaitandy/jagjitkaur-website",
    },
  },
  {
    id: "collab-hub",
    title: "CollabHub",
    shortDescription:
      "A collaborative platform for developers to connect and share projects.",
    impact:
      "Enables real-time developer collaboration via optimized Socket.io connections.",
    githubLink: "https://github.com/SouravPaitandy/collabhub",
    skills: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveLink: "https://collab-hub.vercel.app/",
    img: Images.collabhub,
    additionalImages: [
      Images.addImage1,
      Images.addImage2,
      Images.addImage3,
      Images.addImage4,
    ],
    description:
      "Developed a collaborative platform for developers to connect, share projects, and work together in real-time. Utilized Next.js for server-side rendering and Socket.io for real-time communication.",
    stack: ["Next.js", "MongoDB", "Socket.io", "Real-time"],
    category: "Full Stack",
    links: {
      site: "https://collab-hub.vercel.app/",
      github: "https://github.com/SouravPaitandy/collabhub",
    },
  },
  {
    id: "drawsync",
    title: "DrawSync",
    shortDescription:
      "A real-time collaborative drawing application built with Next.js.",
    impact:
      "Supports low-latency multi-user drawing synchronization using Liveblocks.",
    githubLink: "https://github.com/SouravPaitandy/drawsync",
    skills: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    liveLink: "https://drawsync.vercel.app",
    img: Images.drawsync,
    additionalImages: [Images.addImage6, Images.addImage7],
    description:
      "DrawSync is a feature-rich collaborative drawing application that allows users to create, share, and collaborate on digital drawings in real-time. Implemented with Next.js and Canvas API, it features an infinite canvas with pan and zoom capabilities.",
    stack: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    category: "Full Stack",
    links: {
      site: "https://drawsync.vercel.app",
      github: "https://github.com/SouravPaitandy/drawsync",
    },
  },
  {
    id: "vox-ai",
    title: "VoxAI Assistant",
    shortDescription: "Voice-Activated AI Web Application",
    impact:
      "Integrates Google Gemini API for seamless voice-to-text AI interaction.",
    githubLink: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    skills: ["React", "Tailwind CSS", "Gemini API", "Web Speech API"],
    liveLink: "https://voxai-project.vercel.app/",
    img: Images.image23,
    additionalImages: [Images.addImage5],
    description:
      "Developed a cutting-edge voice-activated AI assistant web application leveraging advanced speech recognition, text-to-speech synthesis, and Google's Gemini API for natural language processing.",
    stack: ["React", "Tailwind", "Vite", "AI"],
    category: "AI Integration",
    links: {
      site: "https://voxai-project.vercel.app/",
      github: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    },
  },
];

const ProjectTextBlock = ({ project, index, onInView, onOpenModal }) => {
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
            {project.category}
          </span>
        </div>

        <h3
          className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors"
          onClick={() => onOpenModal(project)}
        >
          {project.title}
        </h3>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Impact Section */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-electric-indigo/5 border border-electric-indigo/10">
            <TrendingUp
              size={20}
              className="text-electric-indigo flex-shrink-0 mt-1"
            />
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
              {project.impact}
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
            View Details <ArrowRight size={16} />
          </button>
          <div className="flex gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github size={20} />
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

export default function Projects() {
  const { trackEvent } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpenModal = (project) => {
    trackEvent("Projects", "Modal Open", project.title);
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
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-electric-indigo"></div>
          <span className="text-electric-indigo font-mono uppercase tracking-widest text-xs">
            Selected Works
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
          Featured{" "}
          <span className="text-gray-400 dark:text-gray-600">Projects.</span>
        </h2>
      </div>

      <div className="mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Sticky Image Column (Left) - Desktop Only */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="sticky top-10 h-screen flex items-center justify-center py-12">
            <div
              className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 group cursor-pointer"
              onClick={() => handleOpenModal(projectsData[activeIndex])}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                <span className="bg-charcoal/90 text-white px-6 py-2 rounded-full font-medium">
                  Expand View
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={projectsData[activeIndex].id}
                  src={projectsData[activeIndex].img}
                  alt={projectsData[activeIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-transparent"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scrollable Text Column (Right) */}
        <div className="min-h-screen w-full lg:w-1/2 flex flex-col pb-24">
          {projectsData.map((project, index) => (
            <div key={project.id} id={project.id} className="relative">
              {/* Mobile Image (Visible only on mobile) */}
              <div
                className="lg:hidden mb-6 aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10"
                onClick={() => handleOpenModal(project)}
              >
                <img
                  src={project.img}
                  alt={project.title}
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
          ))}

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
              View Full Archive{" "}
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
