import { useEffect, useRef } from 'react';
import "./Styles/hero.css";
import "./index.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-scroll";
import {motion} from 'framer-motion';
import * as Images from './assets';

export default function Hero() {
  // const [isDark, setIsDark] = useState(false);
  const [text] = useTypewriter({
    words: [
      "Front-end Developer",
      "MERNstack Developer",
      "React Developer",
      "Fullstack Web Developer",
    ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 120,
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particlesArray = [];
    const numberOfParticles = 100;
    let hue = 0;
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.size;
          const directionY = forceDirectionY * force * this.size;

          this.speedX += directionX;
          this.speedY += directionY;
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      hue += 2;
      if (hue > 360) hue = 0;
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);


  return (
    <section
      id="hero-section"
      className="hero flex flex-col justify-center relative min-h-screen items-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6 md:px-8"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50 dark:opacity-30"></canvas>
      <div className="hero-content z-10 text-center max-w-4xl mx-auto relative overflow-hidden p-8 rounded-2xl shadow-lg glassmorphism">
        <motion.h1 
          initial={{opacity:0, y: -50}}
          whileInView={{opacity:1, y: 0, transition:{duration: .4}}}
          className="hero-name text-4xl sm:text-5xl md:text-6xl text-center mb-6 sm:mb-10 font-bold text-blue-800 dark:text-green-400 relative z-10"
        >
          Hey, I&apos;m Sourav
        </motion.h1>
        <h3 className="hero-h3 text-xl sm:text-2xl md:text-3xl text-center roboto-regular max-w-2xl mx-auto mb-4 text-gray-700 dark:text-gray-300">
          <span className="text-blue-600 dark:text-green-500">{text}</span>
          <span className="font-bold text-slate-900 dark:text-stone-300">
            <Cursor />
          </span>
        </h3>
        <motion.h3 
           initial={{ opacity: 0, scale: 0.3 }}
           whileInView={{ opacity: 1, scale: 1, transition:{duration: .4} }}
           className="text-lg sm:text-xl md:text-2xl text-center roboto-regular max-w-2xl mx-auto mb-8 sm:mb-14 text-gray-600 dark:text-gray-400">
          who <span className="text-blue-600 dark:text-green-500"> enjoys</span> building
          <span className="text-blue-600 dark:text-green-500"> fast</span> and
          <span className="text-blue-600 dark:text-green-500"> accessible</span> digital products.
        </motion.h3>
        <Link to="about-section" smooth={true} duration={500}>
          <button className="button bg-blue-600 hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-700 text-white text-lg sm:text-xl px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">About me</button>
        </Link>
      </div>
      <motion.div 
      initial={{opacity:0, x: -10}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
      className="hero-icons z-30 absolute left-0 top-1/3 hidden md:flex flex-col gap-2 p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-r-2xl border border-white border-opacity-30 shadow-lg"
      >
        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700 transition-colors duration-300"
        >
            <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noopener noreferrer">
               <img src={Images.image16} alt="LinkedIn" className="h-7 w-7" />
            </a>
        </motion.div>
        
        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://github.com/SouravPaitandy" target="_blank" rel="noopener noreferrer">
               <img src={Images.image13} alt="GitHub" className="h-7 w-7" />
            </a>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://www.instagram.com/paitandy_ji/" target="_blank" rel="noopener noreferrer">
                <img src= {Images.image14} alt="Instagram" className="h-7 w-7" />
            </a>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://twitter.com/PaitandySourav" target="_blank" rel="noopener noreferrer">
                <img src= {Images.image22} alt="Instagram" className="h-7 w-7" />
            </a>
        </motion.div>
      </motion.div>
      <div className="scrolling-mouse border-blue-600 dark:border-green-400 hidden sm:block">
        <div className="scrolling-mouse-dot ml-[.6rem] bg-blue-600 dark:bg-green-400"></div>
      </div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
    </section>
  );
}
