/* eslint-disable react/prop-types */
import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Code,
  Eye,
  ArrowRight,
  Layers,
  X,
  Image as ImageIcon,
  MinusCircle,
  PlusCircle,
  LayoutGrid,
} from "lucide-react";
import * as Images from "./assets";
import "./Styles/projects.css";

// Import images moved to separate file for cleaner code
const projectsData = [
  {
    id: "jagjit-kaur-fashion",
    title: "Jagjit Kaur - Heritage Fashion Collection",
    shortDescription:
      "A premium e-commerce platform for handcrafted Indian traditional wear featuring elegant sarees, lehengas, and artisan-made garments.",
    githubLink: "https://github.com/SouravPaitandy/jagjitkaur-website", // Update with actual repo
    skills: [
      "React",
      "Next.js",
      "Firebase",
      "Firestore",
      "Firebase Auth",
      "Tailwind CSS",
      "Framer Motion",
      "React Context API",
      "Google Analytics",
      "Responsive Design",
      "Admin Dashboard",
      "E-commerce",
      "WhatsApp Integration",
    ],
    liveLink: "https://jkbyjagjitkaur.com",
    image: Images.jagjitkaur, // You'll need to add the main image
    additionalImages: [
      Images.jk1,
      Images.jk2,
      Images.jk3,
      Images.jk4,
    ],
    longDescription:
      "Developed a sophisticated e-commerce platform for Jagjit Kaur's heritage fashion collection, featuring handcrafted Indian traditional wear. The application includes a complete admin management system with product upload, analytics dashboard, and admin account management. Implemented real-time Firebase integration for product management, user authentication, and data storage. Features include advanced product filtering, cart and wishlist functionality, WhatsApp integration for customer communication, and comprehensive analytics tracking with Google Analytics and Hotjar. The platform showcases premium sarees, lehengas, and traditional Indian wear with elegant design aesthetics and smooth user experience.",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    projectType: "Full Stack E-commerce",
    color: "#8b5a2b", // Warm brown representing traditional/heritage theme
    shadowColor: "rgba(139, 90, 43, 0.5)",
    gradient: ["#8b5a2b", "#a0522d"],
  },
  {
    id: "collab-hub",
    title: "CollabHub",
    shortDescription:
      "A collaborative platform for developers to connect and share projects.",
    githubLink: "https://github.com/SouravPaitandy/collabhub",
    skills: [
      "React",
      "Next.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
      "REST API",
      "WebSockets",
    ],
    liveLink: "https://collab-hub.vercel.app/",
    image: Images.collabhub,
    additionalImages: [
      Images.addImage1,
      Images.addImage2,
      Images.addImage3,
      Images.addImage4,
    ],
    longDescription:
      "Developed a collaborative platform for developers to connect, share projects, and work together in real-time. Utilized Next.js for server-side rendering and Socket.io for real-time communication.",
    technologies: ["Next.js", "MongoDB", "Socket.io"],
    projectType: "Full Stack",
    color: "#0891b2", // Adjusted cyan-600 for better readability
    shadowColor: "rgba(8, 145, 178, 0.5)",
    gradient: ["#0891b2", "#0e7490"],
  },
  {
    id: "drawsync",
    title: "DrawSync",
    shortDescription:
      "A real-time collaborative drawing application built with Next.js that enables multiple users to create and edit drawings simultaneously.",
    githubLink: "https://github.com/SouravPaitandy/drawsync",
    skills: [
      "React",
      "Next.js",
      "Liveblocks",
      "Canvas API",
      "Tailwind CSS",
      "Real-time Collaboration",
      "Responsive Design",
      "Touch Support",
    ],
    liveLink: "https://drawsync.vercel.app",
    image: Images.drawsync,
    additionalImages: [Images.addImage6, Images.addImage7],
    longDescription:
      "DrawSync is a feature-rich collaborative drawing application that allows users to create, share, and collaborate on digital drawings in real-time. Implemented with Next.js and Canvas API, it features an infinite canvas with pan and zoom capabilities, multiple drawing tools including pen, line, rectangle, and ellipse, and an eraser tool. The app includes user presence indicators showing who's currently drawing, a real-time activity feed tracking changes, and touch screen support for mobile devices. Other features include canvas history with undo/redo functionality, dark/light theme support, and the ability to export drawings as PNG files.",
    technologies: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    projectType: "Full Stack",
    color: "#2563eb", // Blue-600 for a drawing app
    shadowColor: "rgba(37, 99, 235, 0.5)",
    gradient: ["#2563eb", "#4f46e5"], // Blue to indigo gradient
  },
  {
    id: "vox-ai",
    title: "VoxAI",
    shortDescription: "VoxAI Assistant - Voice-Activated AI Web Application",
    githubLink: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    skills: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Axios",
      "Google Gemini API",
      "Web Speech API",
      "Vite",
      "AI Integration",
      "Voice Recognition",
    ],
    liveLink: "https://voxai-project.vercel.app/",
    image: Images.image23,
    additionalImages: [Images.addImage5],
    longDescription:
      "Developed a cutting-edge voice-activated AI assistant web application leveraging advanced speech recognition, text-to-speech synthesis, and Google's Gemini API for natural language processing.",
    technologies: ["React", "Tailwind", "Vite", "AI"],
    projectType: "Full Stack",
    color: "#0d9488", // Adjusted teal-600 for better contrast
    shadowColor: "rgba(13, 148, 136, 0.5)",
    gradient: ["#0d9488", "#0f766e"],
  },
];

const ProjectCard = ({
  project,
  isActive,
  onClick,
  progress,
  toggleSkillsPopup,
  setIsInteracting,
  openGallery,
  toggleDetailsModal,
}) => {
  // More dynamic transform values
  const rotation = useTransform(progress, [0, 1], [8, 0]);
  const scale = useTransform(progress, [0, 1], [0.8, 1]);
  // const opacity = useTransform(progress, [0, 0.5, 1], [0.5, 0.8, 1]);
  const translateY = useTransform(progress, [0, 1], [20, 0]);

  // Generate complementary accent color for better contrast
  // const accentColor = project.color;
  const darkAccent = adjustColorBrightness(project.color, -30);
  const lightAccent = adjustColorBrightness(project.color, 30);

  return (
    <motion.div
      className={`project-card-wrapper ${isActive ? "active" : ""}`}
      style={{
        scale,
        opacity: 1,
        rotateY: rotation,
        y: translateY,
        x: isActive ? 0 : -20,
        "--card-shadow-color": `${project.color}50`,
      }}
      animate={{ scale: isActive ? 1 : 0.9 }}
      whileHover={{ scale: isActive ? 1.02 : 0.92 }}
      onClick={(e) => {
        onClick(e);
        if (isActive) setIsInteracting(true); // Set interacting when clicking active card
      }}
      onHoverStart={() => {
        if (isActive) setIsInteracting(true); // Set interacting when hovering active card
      }}
      onHoverEnd={() => {
        if (isActive) {
          // Add a small delay before allowing auto-rotation again
          setTimeout(() => setIsInteracting(false), 500);
        }
      }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }} // Improved easing
    >
      <motion.div
        className="absolute inset-0 bg-white dark:bg-gray-900 -z-10 rounded-2xl"
        animate={{ opacity: isActive ? 0.95 : 0.7 }}
        transition={{ duration: 0.5 }}
      />

      <div
        className="project-card-inner relative rounded-2xl overflow-hidden group"
        style={{
          backgroundColor: `${project.color}10`, // Increased from 08 to 10
          borderColor: `${project.color}40`, // Increased from 25 to 40
          boxShadow: isActive
            ? `0 15px 35px -15px ${project.color}80, 0 5px 15px -5px ${project.color}60` // Increased shadow opacity
            : `0 10px 20px -10px ${project.color}40`,
        }}
      >
        {/* Card Header with Project Type - Enhanced */}
        <div
          className="project-card-header p-4 md:p-6 flex justify-between items-center"
          style={{
            background: isActive
              ? `linear-gradient(to right, ${project.color}30, ${project.color}10)` // Increased from 15 to 30
              : "transparent",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="project-type text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
                boxShadow: `0 2px 8px -2px ${project.color}25`,
              }}
            >
              {project.projectType}
            </span>

            {/* New: Small icon indicating project type */}
            {project.projectType === "Full Stack" ? (
              <Layers
                size={16}
                style={{ color: project.color }}
                className="opacity-60"
              />
            ) : project.projectType === "Web" ? (
              <Code
                size={16}
                style={{ color: project.color }}
                className="opacity-60"
              />
            ) : (
              <Eye
                size={16}
                style={{ color: project.color }}
                className="opacity-60"
              />
            )}
          </div>

          <motion.div
            className="project-number text-6xl font-bold opacity-10 font-mono"
            style={{
              color: project.color,
              textShadow: `0 2px 10px ${project.color}40`,
            }}
            animate={{
              y: isActive ? 0 : 10,
              opacity: isActive ? 0.2 : 0.1,
              rotate: isActive ? 0 : -5,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {projectsData.findIndex((p) => p.id === project.id) + 1}
          </motion.div>
        </div>

        {/* Card Content - Enhanced */}
        <div className="project-card-content p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Left Column - Project Info */}
          <div className="project-info flex flex-col justify-between flex-1">
            <div>
              <h3
                className="project-title text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${project.color}, ${darkAccent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: `0 1px 3px ${project.color}30`, // Added text shadow for better visibility
                }}
              >
                {project.title}

                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex"
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full ml-1 animate-pulse"
                      style={{ backgroundColor: project.color }}
                    />
                  </motion.span>
                )}
              </h3>

              <p className="project-description text-gray-700 dark:text-gray-300 mb-4">
                {project.shortDescription}
              </p>

              <div className="project-skills flex flex-wrap gap-2 mb-6">
                {project.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag text-xs px-3 py-1 rounded-md hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: `${project.color}12`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 4 && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="skill-more-tag text-xs px-3 py-1 rounded-md cursor-pointer font-medium flex items-center gap-1"
                    style={{
                      backgroundColor: `${project.color}25`,
                      color: project.color,
                      boxShadow: `0 2px 8px -2px ${project.color}20`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkillsPopup();
                    }}
                    title={`View all ${project.skills.length} skills`}
                  >
                    +{project.skills.length - 4}
                  </motion.span>
                )}
              </div>
            </div>

            {isActive && (
              <motion.div
                className="project-links flex flex-wrap gap-3 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}20`,
                  }}
                  whileHover={{
                    backgroundColor: `${project.color}25`,
                    scale: 1.02,
                    boxShadow: `0 4px 12px -4px ${project.color}40`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  title="View code on GitHub"
                >
                  <Github size={16} />
                  <span className="hidden sm:inline">Code</span>
                </motion.a>

                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white"
                  style={{
                    background: `linear-gradient(to right, ${project.color}, ${darkAccent})`,
                    boxShadow: `0 4px 12px -4px ${project.color}60`,
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 6px 16px -4px ${project.color}70`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  title="View live work"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Live Demo</span>
                </motion.a>

                <motion.button
                  className="details-button ml-auto flex items-center gap-1 text-sm"
                  style={{ color: project.color }}
                  whileHover={{ x: 3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDetailsModal();
                  }}
                  title="View project details"
                >
                  <span className="hidden sm:inline">View Details</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Right Column - Project Image - Enhanced */}
          <div
            className="project-image-wrapper relative aspect-video md:w-1/2 overflow-hidden rounded-xl border"
            style={{ borderColor: `${project.color}30` }}
          >
            {/* Background gradient with more depth */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.color}30, transparent, ${lightAccent}10)`,
                opacity: 0.7,
              }}
              animate={{ opacity: isActive ? 1 : 0.4 }}
            />

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      i === 0 ? project.color : `${project.color}50`,
                  }}
                />
              ))}
            </div>

            {/* Add gallery indicator badge if project has additional images */}
            {project.additionalImages &&
              project.additionalImages.length > 0 && (
                <div
                  className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white flex items-center gap-1 z-10"
                  style={{ border: `1px solid ${project.color}40` }}
                >
                  <ImageIcon size={12} />
                  <span>{project.additionalImages.length + 1} images</span>
                </div>
              )}

            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg"
              animate={{
                scale: isActive ? 1 : 0.95,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Add a gallery button overlay if there are additional images */}
            {isActive &&
              project.additionalImages &&
              project.additionalImages.length > 0 && (
                <motion.button
                  className="absolute bottom-3 right-3 z-50 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(project);
                    setIsInteracting(true);
                  }}
                  whileHover={{
                    backgroundColor: `rgba(${parseInt(
                      project.color.slice(1, 3),
                      16
                    )}, ${parseInt(project.color.slice(3, 5), 16)}, ${parseInt(
                      project.color.slice(5, 7),
                      16
                    )}, 0.7)`,
                    scale: 1.05,
                  }}
                >
                  <ImageIcon size={16} />
                  View Gallery
                </motion.button>
              )}

            {/* Image Overlay with Tech Icons - Enhanced */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="tech-icons flex gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="tech-icon glass-effect px-3 py-2 rounded-lg"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      border: `1px solid ${project.color}40`,
                      background: `linear-gradient(to bottom right, ${project.color}30, ${project.color}10)`,
                    }}
                  >
                    <span className="text-white text-xs font-medium">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* New: Bottom accent bar */}
        <motion.div
          className="h-1 w-0 bg-gradient-to-r rounded-full mx-auto"
          style={{
            background: `linear-gradient(to right, ${project.color}, ${darkAccent})`,
          }}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(hex, percent) {
  // Convert hex to RGB first
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + percent * 2.55));
  g = Math.max(0, Math.min(255, g + percent * 2.55));
  b = Math.max(0, Math.min(255, b + percent * 2.55));

  // Convert RGB back to hex
  return (
    "#" +
    ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b))
      .toString(16)
      .slice(1)
  );
}

// SkillsModal Component
const SkillsModal = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800/90 p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {project.title} <span className="text-cyan-600">Skills</span>
          </h3>
          <Layers size={24} className="text-cyan-600" />
        </div>

        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {project.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: `${project.color}15`,
                borderColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex justify-end">
          <motion.button
            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add this component inside your file before the export default function
const ProjectGalleryModal = ({ project, onClose, setIsInteracting }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = [project.image, ...(project.additionalImages || [])];

  useEffect(() => {
    setIsInteracting(true);
  }, [setIsInteracting]);

  // Go to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // Go to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl p-4 md:p-0"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Gallery Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div>
            <h3
              className="text-xl md:text-2xl font-bold text-white flex items-center"
              style={{ color: project.color }}
            >
              {project.title}{" "}
              <span className="ml-2 text-gray-300 text-sm">Gallery</span>
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {currentImageIndex + 1} of {allImages.length} images
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Zoom Control */}
            <motion.button
              className={`p-2 rounded-full ${
                isZoomed ? "bg-white/20" : "bg-transparent"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? (
                <MinusCircle size={20} className="text-white" />
              ) : (
                <PlusCircle size={20} className="text-white" />
              )}
            </motion.button>

            {/* Thumbnails Toggle - For future implementation */}
            <motion.button
              className="p-2 rounded-full bg-transparent hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View thumbnails"
            >
              <LayoutGrid size={20} className="text-white" />
            </motion.button>

            {/* Close Button */}
            <motion.button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              aria-label="Close gallery"
            >
              <X size={20} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative overflow-hidden rounded-lg bg-black/40 aspect-video">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className={`object-contain max-h-[70vh] transition-all duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={{
                filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={currentImageIndex}
              transition={{ type: "spring", damping: 25 }}
            />
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <motion.button
              className="bg-black/30 hover:bg-black/50 p-3 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={24} className="text-white" />
            </motion.button>

            <motion.button
              className="bg-black/30 hover:bg-black/50 p-3 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={24} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto py-2 px-4">
          {allImages.map((img, index) => (
            <motion.div
              key={index}
              className={`relative cursor-pointer rounded-md overflow-hidden ${
                index === currentImageIndex
                  ? "ring-2 ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{
                ringColor: project.color,
                minWidth: "80px",
                height: "50px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Project Info Footer */}
        <div className="mt-4 flex flex-wrap justify-between items-center">
          <div className="text-sm text-gray-400">
            <p className="font-medium" style={{ color: project.color }}>
              {project.projectType}
            </p>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span>Code</span>
            </motion.a>

            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-white text-sm"
              style={{
                background: `linear-gradient(to right, ${
                  project.color
                }, ${adjustColorBrightness(project.color, -30)})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add this component alongside your other modal components
const ProjectDetailsModal = ({ project, onClose, openGallery }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800/90 p-6 sm:p-8 rounded-xl shadow-2xl max-w-5xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <span
              className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.projectType}
            </span>
            <h3
              className="text-2xl font-bold mt-3"
              style={{
                color: project.color,
                textShadow: `0 1px 3px ${project.color}30`,
              }}
            >
              {project.title}
            </h3>
          </div>

          <motion.button
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                Project Overview
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {project.longDescription}
              </p>

              {/* Add more sections like challenges, solutions, etc. if needed */}
              <h4 className="text-lg font-medium mt-6 mb-2 text-gray-700 dark:text-gray-300">
                Key Features
              </h4>
              <ul className="list-disc text-xs pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {/* Generate some example features based on the project description and technologies */}
                {project.id === "collab-hub" ? (
                  <>
                    <li>
                      Real-time collaboration using WebSockets and Socket.io
                    </li>
                    <li>
                      User authentication and project permission management
                    </li>
                    <li>Dynamic project sharing and contributor invitations</li>
                    <li>Responsive design with Tailwind CSS</li>
                  </>
                ) : project.id === "vox-ai" ? (
                  <>
                    <li>Voice recognition with Web Speech API</li>
                    <li>Natural language processing via Google Gemini API</li>
                    <li>Voice response synthesis</li>
                    <li>Conversational memory and context retention</li>
                  </>
                ) : (
                  <>
                    <li>Interactive game mechanics with vanilla JavaScript</li>
                    <li>
                      Pattern memory challenges with increasing difficulty
                    </li>
                    <li>Score tracking and visual/audio feedback</li>
                    <li>Mobile-responsive gameplay</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1">
            <div
              className="rounded-lg overflow-hidden shadow-lg border"
              style={{ borderColor: `${project.color}30` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            </div>

            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-md"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex flex-col gap-2 mt-6">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full justify-center"
                  style={{
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <Github size={16} />
                  <span>View Code</span>
                </a>

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white w-full justify-center"
                  style={{
                    background: `linear-gradient(to right, ${
                      project.color
                    }, ${adjustColorBrightness(project.color, -30)})`,
                    boxShadow: `0 4px 12px -4px ${project.color}60`,
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Show gallery preview if there are additional images */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Project Gallery
              </h4>
              <button
                className="text-sm flex items-center gap-1"
                style={{ color: project.color }}
                onClick={() => {
                  onClose();
                  // Add a small delay before opening the gallery
                  setTimeout(() => openGallery(project), 100);
                }}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto py-2 px-1">
              <div className="min-w-[100px] aspect-video rounded-md overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>

              {project.additionalImages.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className="min-w-[100px] aspect-video rounded-md overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {project.additionalImages.length > 3 && (
                <div className="min-w-[100px] aspect-video rounded-md overflow-hidden relative">
                  <img
                    src={project.additionalImages[3]}
                    alt={`${project.title} thumbnail 4`}
                    className="w-full h-full object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                    +{project.additionalImages.length - 3}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <motion.button
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' or 'grid'
  const [isInteracting, setIsInteracting] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryProject, setGalleryProject] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const progress = useMotionValue(0);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const carouselRef = useRef(null);
  const autoRotateTimerRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  // Progress calculation for card animations
  const calculateProgress = useCallback(
    (index) => {
      const activeIndex = currentIndex;
      const distance = Math.abs(index - activeIndex);

      if (distance === 0) return 1;
      if (distance === 1) return 0.5;
      return 0;
    },
    [currentIndex]
  );

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === projectsData.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? projectsData.length - 1 : prev - 1
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

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      touchEndRef.current = e.changedTouches[0].clientX;
      handleSwipe();
      setIsDragging(false);
    },
    [handleSwipe]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!touchStartRef.current) return;
      const currentX = e.touches[0].clientX;
      const diff = touchStartRef.current - currentX;
      // Update progress for animation smoothness
      progress.set(diff / 100);
    },
    [progress]
  );

  // Auto-rotate carousel
  useEffect(() => {
    if (
      viewMode !== "carousel" ||
      isInteracting ||
      isDragging ||
      showSkillsPopup
    ) {
      // Clear any existing timer when user is interacting
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
      return;
    }

    autoRotateTimerRef.current = setTimeout(() => {
      nextProject();
    }, 8000);

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [
    nextProject,
    isDragging,
    viewMode,
    isInteracting,
    showSkillsPopup,
    currentIndex,
  ]);

  // Toggle skills popup
  const toggleSkillsPopup = useCallback(() => {
    const newState = !showSkillsPopup;
    setShowSkillsPopup(newState);
    setIsInteracting(newState); // Set interacting when skills popup is active
  }, [showSkillsPopup]);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"));
  }, []);

  const openGallery = useCallback((project) => {
    setGalleryProject(project);
    setShowGallery(true);
    setIsInteracting(true); // Pause auto-rotation when viewing gallery
  }, []);

  // Add function to close gallery
  const closeGallery = useCallback(() => {
    setShowGallery(false);

    // Add a small delay before allowing auto-rotation again
    setTimeout(() => setIsInteracting(false), 500);
  }, []);

  // Toggle details modal
  const toggleDetailsModal = useCallback(() => {
    const newState = !showDetailsModal;
    setShowDetailsModal(newState);
    setIsInteracting(newState); // Pause auto-rotation when showing details
  }, [showDetailsModal]);

  return (
    <motion.section
      id="project-section"
      className="projects-section py-20 md:py-32 px-4 sm:px-8 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-50/30 to-transparent dark:from-cyan-950/30 -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-50/30 to-transparent dark:from-cyan-950/30 -z-10" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="section-header text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3"
          >
            <span className="inline-block py-1 px-4 rounded-full text-xs font-semibold tracking-wider text-cyan-800 dark:text-cyan-200 bg-cyan-100 dark:bg-cyan-900/50">
              SHOWCASE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          >
            <span className="text-cyan-600 dark:text-cyan-400">Featured</span>{" "}
            Projects
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300"
          >
            Explore my latest works showcasing my skills in web development,
            from interactive user interfaces to complex full-stack applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`flex justify-center mt-8 ${isMobile ? "hidden" : ""}`}
          >
            <button
              onClick={toggleViewMode}
              className="view-toggle flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium text-cyan-800 dark:text-cyan-200 bg-cyan-100 dark:bg-cyan-900/50 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
            >
              <Eye size={16} />
              {viewMode === "carousel"
                ? "View All Projects"
                : "View as Carousel"}
            </button>
          </motion.div>
        </div>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {viewMode === "carousel" && !isMobile ? (
            <motion.div
              key="carousel"
              className="projects-carousel relative max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="carousel-cards px-4 relative"
                // style={{ minHeight: "650px" }}
              >
                {projectsData.map((project, index) => {
                  const isActive = index === currentIndex;
                  const projectProgress = calculateProgress(index);

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isActive ? 1 : projectProgress > 0 ? 0.5 : 0, // Reduced opacity of inactive cards
                        zIndex: isActive ? 10 : 0,
                        display: projectProgress > 0 ? "block" : "none",
                        x: isActive ? 0 : index < currentIndex ? -300 : 300, // Move inactive cards away from center
                        filter: isActive ? "none" : "blur(2px)", // Blur inactive cards
                      }}
                      className="carousel-card-container absolute inset-0 transition-all duration-500 ease-out"
                      style={{
                        pointerEvents: isActive ? "auto" : "none",
                        transform: `translateX(${
                          isActive ? 0 : index < currentIndex ? -30 : 30
                        }%)`, // Shift inactive cards
                        opacity: isActive ? 1 : projectProgress > 0 ? 0.5 : 0,
                      }}
                    >
                      <ProjectCard
                        project={project}
                        isActive={isActive}
                        onClick={() => {
                          setCurrentIndex(index);
                          // Set interacting when clicking on a project
                          if (isActive) setIsInteracting(true);
                        }}
                        progress={progress}
                        toggleSkillsPopup={toggleSkillsPopup}
                        setIsInteracting={setIsInteracting}
                        openGallery={openGallery}
                        toggleDetailsModal={toggleDetailsModal}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="absolute bottom-[-8] z-40 w-full carousel-controls flex justify-between items-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevProject}
                  className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <div className="carousel-indicators flex gap-2">
                  {projectsData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-10 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-cyan-600 w-12"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextProject}
                  className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Add carousel status indicator showing auto-rotation state */}
              {viewMode === "carousel" && (
                <div
                  className={`absolute bottom-[-6] z-40 left-4 text-xs flex items-center gap-1.5 ${
                    isInteracting || showSkillsPopup
                      ? "text-amber-500"
                      : "text-green-500"
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      isInteracting || showSkillsPopup
                        ? "bg-amber-500"
                        : "bg-green-500 animate-pulse"
                    }`}
                  />
                  <span>
                    {isInteracting || showSkillsPopup
                      ? "Auto-rotation paused"
                      : "Auto-rotating"}
                  </span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="grid-card relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-visible"
                  style={{
                    border: `1px solid ${project.color}20`,
                    boxShadow: `0 10px 30px -15px ${project.color}30`,
                  }}
                >
                  <motion.div
                    className="project-number text-transparent absolute -top-16 md:-top-10 -left-5 md:-left-8 z-30 text-[120px] font-bold font-mono"
                    style={{
                      backgroundImage: `linear-gradient(155deg, 
      ${project.color} 0%, 
      ${project.color} 35%,
      #ffffff 50%,
      ${project.color} 75%,
      ${project.color} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: `0 2px 10px ${project.color}40`,
                      // opacity: 0.85,
                      filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.15))",
                      pointerEvents: "none", // Ensures clicks pass through to the card
                    }}
                    animate={{
                      scale: isInteracting ? 0.8 : 1,
                      y: isInteracting ? -20 : 0,
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <div className="grid-card-image-container relative aspect-video overflow-hidden">
                    <div
                      className="absolute inset-0 z-0 bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${project.color}30, transparent)`,
                      }}
                    />

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />

                    <div className="absolute top-3 right-3">
                      <span
                        className="px-2 py-1 text-xs rounded-full backdrop-blur-xl uppercase font-bold"
                        style={{
                          backgroundColor: `${
                            project.title === "Simon Says"
                              ? `${project.color}40`
                              : `${project.color}90`
                          }`,
                          color: `${
                            project.title === "Simon Says"
                              ? project.color
                              : "white"
                          }`,
                        }}
                      >
                        {project.projectType}
                      </span>
                    </div>
                  </div>

                  <div className="grid-card-content p-6">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: project.color }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>

                    <div className="grid-card-skills flex items-center flex-wrap gap-2 mb-6">
                      {project.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${project.color}15`,
                            color: project.color,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span
                          className="text-sm font-semibold px-2 py-0.5 rounded cursor-pointer transition-transform duration-300 ease-in-out hover:translate-x-1"
                          style={{
                            backgroundColor: `${project.color}20`,
                            color: project.color,
                            border: `1px solid ${project.color}50`,
                          }}
                          onClick={() => {
                            setCurrentIndex(index);
                            toggleSkillsPopup();
                          }}
                          title={`+${project.skills.length - 3} more`}
                        >
                          +{project.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="grid-card-links flex justify-between items-center">
                      <div className="flex gap-2">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded"
                          title="See Code"
                          style={{ color: project.color }}
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded"
                          title="View live"
                          style={{ color: project.color }}
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>

                      <button
                        className="group text-xs flex items-center gap-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors"
                        style={{ color: project.color }}
                        title="View Project Details"
                        onClick={() => {
                          setCurrentIndex(index);
                          setShowDetailsModal(true);
                          setIsInteracting(true); // Pause auto-rotation when viewing details
                        }}
                      >
                        <span>View Project Details</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* More Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24"
        >
          <a
            href="https://github.com/SouravPaitandy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Code size={18} />
            See More on GitHub
          </a>
        </motion.div>
      </div>

      {/* Add gallery modal */}
      <AnimatePresence>
        {showGallery && galleryProject && (
          <ProjectGalleryModal
            project={galleryProject}
            onClose={closeGallery}
            setIsInteracting={setIsInteracting}
          />
        )}
      </AnimatePresence>

      {/* Skills popup modal remains the same */}
      <AnimatePresence>
        {showSkillsPopup && (
          <SkillsModal
            project={projectsData[currentIndex]}
            onClose={() => {
              setShowSkillsPopup(false);
              setTimeout(() => setIsInteracting(false), 500);
            }}
          />
        )}
      </AnimatePresence>

      {/* Add details modal */}
      <AnimatePresence>
        {showDetailsModal && (
          <ProjectDetailsModal
            project={projectsData[currentIndex]}
            onClose={() => {
              setShowDetailsModal(false);
              setTimeout(() => setIsInteracting(false), 500);
            }}
            openGallery={openGallery}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
