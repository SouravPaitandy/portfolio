/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-scroll";
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import useTheme from './Contexts/theme';
// Advanced WebGL Background Component with Enhanced Dynamics
const WebGLBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup with advanced configurations
    sceneRef.current = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer with enhanced performance settings
    rendererRef.current = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Advanced Bloom Effect
    composerRef.current = new EffectComposer(rendererRef.current);
    const renderPass = new RenderPass(sceneRef.current, camera);
    composerRef.current.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // Increased bloom strength
      0.6,  // Adjusted radius
      0.85  // Fine-tuned threshold
    );
    composerRef.current.addPass(bloomPass);

    // Custom Wave Shader Pass for Dynamic Background
    const waveShader = {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        amplitude: { value: 0.015 },
        frequency: { value: 2.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float amplitude;
        uniform float frequency;

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          float distanceFromCenter = length(uv - 0.5);
          
          // Complex wave distortion
          newPosition.z += amplitude * sin(
            distanceFromCenter * frequency + 
            time * 0.5
          ) * (1.0 - distanceFromCenter);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;

        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          gl_FragColor = texel;
        }
      `
    };

    const wavePass = new ShaderPass(waveShader);
    composerRef.current.addPass(wavePass);

    // Advanced Particle System with Dynamic Behavior
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;  // Increased particle count
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // More complex particle distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 50 * Math.pow(Math.random(), 1.5);  // Non-uniform distribution

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);

      // Random initial velocities
      velocityArray[i] = (Math.random() - 0.5) * 0.1;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.1;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

    // Gradient color particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x6366f1) },  // Indigo base
        color2: { value: new THREE.Color(0x3b82f6) }   // Blue accent
      },
      vertexShader: `
        uniform float time;
        attribute vec3 velocity;
        varying vec3 vColor;

        void main() {
          vec3 updatedPosition = position;
          
          // Dynamic particle movement
          updatedPosition += velocity * sin(time * 0.5) * 0.5;
          
          gl_PointSize = 1.5 + (sin(time + length(position)) * 0.5 + 0.5) * 1.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(updatedPosition, 1.0);
          vColor = mix(vec3(0.6, 0.4, 1.0), vec3(0.3, 0.5, 1.0), sin(time * 0.2));
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;

        void main() {
          float distanceFromCenter = length(gl_PointCoord - 0.5);
          float opacity = 1.0 - smoothstep(0.0, 0.5, distanceFromCenter);
          gl_FragColor = vec4(vColor, opacity * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesMesh);

    // Camera Positioning with Subtle Movement
    camera.position.z = 60;

    // Advanced Animation Loop
    let timeCounter = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      timeCounter += 0.01;

      // Dynamic particle rotation and shader time update
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.002;

      // Update wave and particle shaders
      if (composerRef.current.passes[2]) {
        const wavePass = composerRef.current.passes[2];
        if (wavePass instanceof ShaderPass) {
          wavePass.uniforms['time'].value = timeCounter;
        }
        wavePass.uniforms['time'].value = timeCounter;
      }

      if (particlesMaterial.uniforms) {
        particlesMaterial.uniforms['time'].value = timeCounter;
      }

      composerRef.current.render();
    };

    animate();

    // Responsive Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      rendererRef.current?.setSize(width, height);
      composerRef.current?.setSize(width, height);
    };

    const debouncedResize = debounce(handleResize, 100);
    window.addEventListener('resize', debouncedResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      rendererRef.current?.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none" 
    />
  );
});

// Debounce utility function
function debounce(func, wait) {
  let timeout = null;
  return function executedFunction(...args) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const AnimatedSocialIcon = React.memo(({ 
  path, 
  color, 
  href,
  ariaLabel
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="36"
        initial={{ scale: 1 }}
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 360 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 10 
        }}
      >
        <defs>
          <linearGradient id={`${ariaLabel}Gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </linearGradient>
        </defs>
        <motion.path
          d={path}
          fill={`url(#${ariaLabel}Gradient)`}
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: isHovered ? 1.1 : 1,
            stroke: isHovered ? `url(#${ariaLabel}Gradient)` : "none",
            strokeWidth: isHovered ? 2 : 0
          }}
          transition={{ 
            duration: 0.5, 
            type: "spring" 
          }}
        />
      </motion.svg>

      {/* Tooltip for Accessibility and UX */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-10 bg-gray-900 text-white
            dark:bg-gray-400 dark:text-gray-900 
            text-xs px-3 py-2 rounded-md shadow-lg 
            after:content-[''] after:absolute after:top-[-5px] 
            after:left-1/2 after:-translate-x-1/2 
            after:border-8 after:border-x-transparent 
            dark:after:border-b-gray-800 after:border-b-gray-300 after:border-t-transparent"
         >
           {ariaLabel}
         </motion.div>
        )}
    </motion.a>
  );
});
AnimatedSocialIcon.displayName = 'AnimatedSocialIcon';

// Custom Parallax Hook with Performance Optimization
function useParallax(ref, rate = 0.03) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * rate;
        const y = (e.clientY - (top + height / 2)) * rate;
        setOffset({ x, y });
      }
    };

    const debouncedMove = debounce(handleMove, 10);
    window.addEventListener('mousemove', debouncedMove);
    return () => window.removeEventListener('mousemove', debouncedMove);
  }, [ref, rate]);

  return offset;
}

export default function EnhancedHero() {
  const {themeMode} = useTheme();
  const heroRef = useRef(null);
  const { x: parallaxX, y: parallaxY } = useParallax(heroRef);
  // console.log(parallaxX, parallaxY);
  const [text] = useTypewriter({
    words: [
      "Pixel Perfectionist",
      "Code Architect",
      "Digital Innovator",
      "UI/UX Enthusiast"
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
  });

  // Memoized mouse tracking for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(99, 102, 241, 0.1),
      transparent 80%
    )
  `;

  // Enhanced Social Media Links with 3D Hover Effect
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/sourav-paitandy/",
      icon: "linkedin",
      color: {
        from: "#0077B5",
        to: "#0077B5"
      },
      svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
    },
    {
      href: "https://github.com/SouravPaitandy",
      icon: "github",
      color: {
        from: themeMode !== 'dark' ? "#181717" : '#fff',
        to: themeMode !== 'dark' ? "#181717" : '#fff',
      },
      svgPath: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    },
    {
      href: "https://www.instagram.com/paitandy_ji/",
      icon: "instagram",
      color: {
        from: "#E1306C",
        to: "#F77737",
        gradient: true
      },
      svgPath: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.385.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.719 2.126-1.385.666-.667 1.079-1.335 1.385-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.719-1.459-1.385-2.126-.667-.667-1.335-1.079-2.126-1.385-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.415 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.415-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.575-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.164-.42-.358-1.065-.418-2.235-.053-1.274-.068-1.649-.068-4.859 0-3.211.015-3.586.068-4.859.061-1.17.255-1.814.418-2.234.21-.574.479-.96.9-1.381.419-.419.804-.689 1.379-.898.42-.166 1.065-.36 2.236-.421 1.274-.057 1.649-.07 4.859-.07l.045.035zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    },
    {
      href: "https://x.com/PaitandySourav",
      icon: "x",
      color: {
        from: themeMode !== 'dark' ? "#000000" : '#fff',
        to: themeMode !== 'dark' ? "#000000" : '#fff',
      },
      svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.81L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
    }
  ];

  return (
    <motion.section
    className="hero-section relative min-h-screen flex flex-col justify-center items-center 
      overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-100
      dark:from-slate-900 dark:to-cyan-900 
      text-gray-900 dark:text-white z-30"
  >
       {/* Advanced WebGL Background */}
       {document.body.clientWidth > 640 && themeMode === 'dark' && <WebGLBackground />}

      {/* Interactive Background Gradient */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: backgroundGradient,
          opacity: .3
        }}
      />

      {/* Hero Content with Parallax Effect */}
      <div 
       ref={document.body.clientWidth > 640 ? heroRef : null}
        className="relative z-10 max-w-4xl px-6 text-center"
        style={document.body.clientWidth > 640 ? {
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: 'transform 0.1s ease-out'
        } : {}}
      >
        {/* <div className='bg-yellow-600/40 border-2 border-yellow-500 backdrop-blur-md rounded-full mb-6'> */}
        {/* Animated Name with 3D Text Effect */}
        <motion.h1
          initial={{ opacity: 0, rotateX: -90 }}
          whileInView={{ 
            opacity: 1, 
            rotateX: 0,
            transition: { 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }
          }}
          className="text-5xl  md:text-7xl font-extrabold 
            bg-clip-text text-transparent pb-4 mb-6 
            bg-gradient-to-r from-blue-700 via-indigo-500 to-sky-500 
            dark:from-cyan-600 dark:via-teal-300 dark:to-sky-600
            perspective-1000 transform-3d"
        >
          {/* dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 */}
          Hey, I&apos;m <br /> Sourav Paitandy
        </motion.h1>
        {/* </div> */}

        {/* Enhanced Typewriter with Morphing Animation */}
        <motion.h2
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            rotateY: 90 
          }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.3,
              type: "spring",
              stiffness: 120
            }
          }}
          className="!text-2xl md:!text-4xl !max-w-none !mb-8 !h-20 !flex !items-center !justify-center"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 
            dark:from-blue-400 dark:to-purple-500 
            text-transparent bg-clip-text font-bold">
            {text}
          </span>
          <Cursor />
        </motion.h2>

        {/* Descriptive Text with Subtle Reveal Animation */}
        <motion.p
          initial={{ 
            opacity: 0, 
            y: -40,
            filter: 'blur(20px)'
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)',
            transition: { 
              duration: 0.7, 
              delay: 0.5,
              type: "spring"
            }
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300"
        >
          Crafting digital experiences that blend 
          <span className="font-semibold text-blue-600 dark:text-blue-400"> innovation </span> 
          with elegant code, one pixel at a time.
        </motion.p>

        {/* Interaction Button with 3D Hover */}
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.6,
            rotateX: 90
          }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            rotateX: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.7,
              type: "spring",
              stiffness: 120
            }
          }}
        >
          <Link to="about-section" smooth={true} duration={500}>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                rotateX: 10,
                rotateY: -10,
                boxShadow: "0 15px 20px rgba(0,0,0,0.2)"
              }}
              whileTap={{ 
                scale: 0.95,
                rotateX: 0,
                rotateY: 0
              }}
              className="px-8 py-3 rounded-full 
                bg-gradient-to-r dark:from-teal-700 dark:to-cyan-800 
                dark:hover:from-teal-800 dark:hover:to-cyan-800
                from-blue-600 to-purple-600
                text-white font-bold text-lg 
                hover:from-blue-700 hover:to-purple-700 
                transition duration-300 
                shadow-lg perspective-1000 transform-3d"
            >
              Discover My World
            </motion.button>
          </Link>
        </motion.div>

        {/* Orbital Social Media Icons with 3D Hover */}
        <motion.div 
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            y: 50
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.9,
              type: "spring",
              stiffness: 120
            }
          }}
          whileInView={{
            scale: 1,
            transition: { duration: 0.3 }
          }
          }
          className="mt-12 flex justify-center space-x-6"
        >
          {socialLinks.map((link, index) => (
            <AnimatedSocialIcon  key={index} path={link.svgPath} color={link.color} href={link.href} ariaLabel={link.icon}/>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator with Particle-like Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          y: [20, 0, 20],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-8 left-[47%] md:left-1/2 transform -translate-x-1/2 
          w-9 h-12 md:w-7 md:h-10 border-2 border-blue-600 dark:border-purple-500 
          rounded-full flex justify-center items-center"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2 h-3 md:w-1.5 md:h-2 bg-blue-600 dark:bg-purple-500 rounded-full"
        />
      </motion.div>
    </motion.section>
  );
}