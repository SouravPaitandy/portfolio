import "./Styles/hero.css";
import "./index.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-scroll";
import {motion} from 'framer-motion';

export default function Hero() {
  const [text] = useTypewriter({
    words: [
      "Front-end Developer",
      "MERNstack Developer",
      "React Developer",
      "Fullstack web Developer",
    ],
    loop: {},
    typeSpeed: 60,
    deleteSpeed: 120,
  });
  return (
    <section
      id="hero-section"
      className="hero flex flex-col justify-center relative min-h-lvh items-center"
    >
      <div className="hero-image"></div>
      <motion.h1 
      initial={{opacity:0, y: -50}}
      whileInView={{opacity:1, y: 0, transition:{duration: .4}}}
      className=" hero-name text-6xl text-center mb-14 font-bold">
        Hey, I&apos;m Sourav
      </motion.h1>
      <h3 className="text-3xl text-center roboto-regular max-w-2xl mb-4">
        <span className="dark:text-green-500 text-blue-600 ">{text}</span>
        <span className="font-bold text-3xl dark:text-stone-300 text-slate-900">
          <Cursor />
        </span>
      </h3>
      <motion.h3 
         initial={{ opacity: 0, scale: 0.3 }}
         whileInView={{ opacity: 1, scale: 1, transition:{duration: .4} }}
         className="text-2xl text-center roboto-regular max-w-2xl mb-14">
        who <span className="text-color"> enjoys</span> building
        <span className="text-color"> fast</span> and
        <span className="text-color"> accessible</span> digital products.
      </motion.h3>
      <Link to="about-section" smooth={true} duration={500}>
        <button className="button">About me</button>
      </Link>
      {/* Add the side navbar here */}
      <motion.div 
      initial={{opacity:0, x: -10}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
      className="hero-icons absolute left-0 top-1/3 flex flex-col gap-2 p-2">
        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noopener noreferrer">
               <img src={ import.meta.env.BASE_URL === "/"? "/src/assets/linkedin-dark.svg" : import.meta.env.BASE_URL + "/src/assets/linkedin-dark.svg"} alt="LinkedIn" className="h-7 w-7" />
            </a>
        </motion.div>
        
        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://github.com/SouravPaitandy" target="_blank" rel="noopener noreferrer">
               <img src={ import.meta.env.BASE_URL === "/"? "/src/assets/github-dark.svg" : import.meta.env.BASE_URL + "/src/assets/github-dark.svg"} alt="GitHub" className="h-7 w-7" />
            </a>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://www.instagram.com/paitandy_ji/" target="_blank" rel="noopener noreferrer">
                <img src={ import.meta.env.BASE_URL === "/"? "/src/assets/instagram-dark.svg" : import.meta.env.BASE_URL + "/src/assets/instagram-dark.svg"} alt="Instagram" className="h-7 w-7" />
            </a>
        </motion.div>

        <motion.div 
        initial={{opacity:0, y: 10}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="hero-icon w-10 h-10 flex justify-center items-center rounded-md hover:bg-blue-300 dark:hover:bg-green-700">
            <a href="https://twitter.com/PaitandySourav" target="_blank" rel="noopener noreferrer">
                <img src={ import.meta.env.BASE_URL === "/"? "/src/assets/x-dark.svg" : import.meta.env.BASE_URL + "/src/assets/x-dark.svg"} alt="Instagram" className="h-7 w-7" />
            </a>
        </motion.div>
      </motion.div>
      <div className="scrolling-mouse"></div>
    </section>
  );
}
