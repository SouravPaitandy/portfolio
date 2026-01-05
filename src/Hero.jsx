/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-scroll";
import * as THREE from "three";
import { ArrowRight, Sparkles } from "lucide-react";
import useTheme from "./Contexts/theme";
import useAnalytics from "./Hooks/useAnalytics";
import ResumeViewer from "./ResumeViewer";

// Antigravity physics particle system
const AntigravityParticles = React.memo(() => {
  const mountRef = useRef(null);
  const { themeMode } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Physics Configuration ---
    const PARTICLE_COUNT = window.innerWidth < 768 ? 150 : 300;
    const CONNECTION_DISTANCE = 4;
    const MOUSE_REPULSION_RADIUS = 8;
    const MOUSE_REPULSION_STRENGTH = 0.5;
    const SPRING_STRENGTH = 0.05;
    const DAMPING = 0.9;

    // --- Particle System Data ---
    const particles = [];
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    // Initialize Particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = 0;

      particles.push({
        x: x,
        y: y,
        z: z,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Material
    const material = new THREE.PointsMaterial({
      color: 0x6366f1, // Electric Indigo
      size: 0.2,
      transparent: true,
      opacity: themeMode === "dark" ? 1 : 0.8,
    });

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    // --- Lines Setup ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: themeMode === "dark" ? 0.5 : 0.1,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // --- Interaction ---
    const mouse = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (event) => {
      const ndcX = (event.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);

      if (target) {
        mouse.x = target.x;
        mouse.y = target.y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animationId;
    const animate = () => {
      const positionsAttribute = geometry.attributes.position;
      const linePositions = [];

      particles.forEach((p, i) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < MOUSE_REPULSION_RADIUS) {
          const force =
            (MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * MOUSE_REPULSION_STRENGTH;
          p.vy += Math.sin(angle) * force * MOUSE_REPULSION_STRENGTH;
        }

        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx += ox * SPRING_STRENGTH;
        p.vy += oy * SPRING_STRENGTH;

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        positionsAttribute.setXYZ(i, p.x, p.y, p.z);
      });

      positionsAttribute.needsUpdate = true;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;

          if (dx * dx + dy * dy < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup & Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [themeMode]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40"
    />
  );
});

const AnimatedSocialIcon = React.memo(({ path, color, href, ariaLabel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fromColor = color?.from || "#ffffff";
  const toColor = color?.to || "#ffffff";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 360 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <defs>
          <linearGradient
            id={`${ariaLabel}Gradient`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <motion.path
          d={path}
          className="fill-gray-600 dark:fill-white"
          animate={{
            stroke: isHovered ? `url(#${ariaLabel}Gradient)` : "none",
            strokeWidth: isHovered ? 1 : 0,
          }}
          style={{ fill: isHovered ? `url(#${ariaLabel}Gradient)` : undefined }}
        />
      </motion.svg>
    </motion.a>
  );
});

export default function Hero() {
  const { themeMode } = useTheme();
  const { trackEvent } = useAnalytics();

  const [text] = useTypewriter({
    words: [
      "Pixel Perfectionist",
      "Code Architect",
      "Digital Innovator",
      "UI/UX Enthusiast",
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/sourav-paitandy/",
      icon: "linkedin",
      color: { from: "#0077B5", to: "#00A0DC" },
      svgPath:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
    },
    {
      href: "https://github.com/SouravPaitandy",
      icon: "github",
      color: { from: "#333333", to: "#000000" },
      svgPath:
        "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    },
    {
      href: "https://www.instagram.com/paitandy_ji/",
      icon: "instagram",
      color: { from: "#E1306C", to: "#F77737" },
      svgPath:
        "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.385.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.719 2.126-1.385.666-.667 1.079-1.335 1.385-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.719-1.459-1.385-2.126-.667-.667-1.335-1.079-2.126-1.385-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.415 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.415-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.575-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.164-.42-.358-1.065-.418-2.235-.053-1.274-.068-1.649-.068-4.859 0-3.211.015-3.586.068-4.859.061-1.17.255-1.814.418-2.234.21-.574.479-.96.9-1.381.419-.419.804-.689 1.379-.898.42-.166 1.065-.36 2.236-.421 1.274-.057 1.649-.07 4.859-.07l.045.035zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      href: "https://x.com/PaitandySourav",
      icon: "x",
      color: { from: "#333333", to: "#000000" },
      svgPath:
        "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.81L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
    },
  ];

  return (
    <motion.section className="hero-section relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-rich-black text-gray-900 dark:text-white z-30 transition-colors duration-300">
      {/* Background */}
      <AntigravityParticles />

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center z-10 max-w-5xl px-4 md:px-6 text-center mt-20">
        {/* New Project CTA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-8"
        >
          <Link to="hexode-ide" smooth={true} duration={1200} offset={-100}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(99,102,241,0.1)",
                  "0 0 35px rgba(99,102,241,0.5)",
                  "0 0 20px rgba(99,102,241,0.1)",
                ],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => trackEvent("Hero", "Click", "Hexode CTA")}
              className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/5 border border-electric-indigo/30 hover:border-electric-indigo/60 transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] backdrop-blur-md"
            >
              <div className="absolute inset-0 rounded-full bg-electric-indigo/5 group-hover:bg-electric-indigo/10 transition-colors" />

              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-indigo opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-indigo"></span>
              </span>

              <span className="text-sm z-50 font-medium text-gray-600 dark:text-gray-300 group-hover:text-electric-indigo dark:group-hover:text-electric-indigo transition-colors flex items-center gap-2">
                New Project Onboard:{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Hexode v2.0
                </span>
                <span className="hidden sm:inline opacity-70">
                  - The Next-Gen AI IDE
                </span>
              </span>

              <ArrowRight
                size={14}
                className="text-electric-indigo group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-2 mb-4 md:mb-6"
        >
          <div className="px-4 py-1 w-fit-content rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-electric-indigo font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
            Full Stack Developer (MERN)
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide"
          >
            Open to SDE / Frontend roles in India / Remote
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, type: "spring", stiffness: 100 },
          }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight"
        >
          Sourav Paitandy
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 },
          }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-gray-500 dark:text-gray-400 mb-6 md:mb-8 h-8 md:h-12 flex items-center justify-center gap-2"
        >
          <span>A Passionate</span>
          <span className="text-electric-indigo font-semibold">{text}</span>
          <Cursor cursorColor="#6366f1" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 0.8 },
          }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
        >
          Crafting high-performance digital experiences with a focus on
          <span className="text-gray-900 dark:text-white font-medium">
            {" "}
            precision
          </span>
          ,
          <span className="text-gray-900 dark:text-white font-medium">
            {" "}
            aesthetics
          </span>
          , and
          <span className="text-gray-900 dark:text-white font-medium">
            {" "}
            scalability
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.8 },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="project-section"
            smooth={true}
            duration={500}
            href="#project-section"
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackEvent("Hero", "Click", "View Projects")}
              className="px-8 py-3 md:px-8 md:py-4 rounded-full bg-electric-indigo text-white font-bold text-base md:text-lg hover:bg-indigo-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] sm:w-auto"
            >
              View Projects
            </motion.button>
          </Link>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackEvent("Hero", "Click", "Resume View")}
            className="w-full sm:w-auto cursor-pointer"
          >
            <ResumeViewer
              heading="View Resume"
              className="px-8 py-3 md:px-8 md:py-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-gray-900 dark:text-white font-medium text-base md:text-lg hover:border-black dark:hover:border-white transition-colors w-full cursor-pointer flex justify-center items-center"
            />
          </motion.div>

          <Link
            to="contact-section"
            smooth={true}
            duration={500}
            href="#contact-section"
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackEvent("Hero", "Click", "Contact Me")}
              className="px-8 py-3 md:px-8 md:py-4 rounded-full border border-transparent text-gray-500 dark:text-gray-400 font-medium text-base md:text-lg hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors w-full sm:w-auto"
            >
              Contact Me
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.9, duration: 1 } }}
          className="mt-12 md:mt-16 flex justify-center space-x-4 md:space-x-8"
        >
          {socialLinks.map((link, index) => (
            <div
              key={index}
              onClick={() => trackEvent("Hero", "Social Click", link.icon)}
            >
              <AnimatedSocialIcon
                path={link.svgPath}
                color={link.color}
                href={link.href}
                ariaLabel={link.icon}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-500 to-transparent opacity-30">
          <motion.div
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/3 bg-electric-indigo"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
