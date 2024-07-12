import "./Styles/about.css";
import { Link } from "react-scroll";
import { motion } from "framer-motion"; 
import * as Images from './assets';

export default function About() {
  return (
    <section
      id="about-section"
      className="about-bg about dark:bg-[#121415] bg-[#E0E0E0] py-24 pl-44 pr-36 flex  flex-col justify-between items-center"
    >
      <motion.h1 
      initial={{opacity:0, x: -50}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
      className="about-h1 text-5xl font-bold text-center">About Me</motion.h1>
      <motion.div 
      initial={{opacity:0, x: 50}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
      className="underline dark:bg-green-600 bg-[#1E90FF] h-1 w-12 border-none mt-6 mb-10 rounded-lg"></motion.div>
      <motion.h2 
       initial={{opacity:0, y: 50}}
       whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
      className="mb-20 dark:text-gray-600 text-slate-900 text-xl roboto-regular-italic font-bold">
        Developing software for <span className="text-color">1+</span> years |
        Passionate about Building <span className="text-color">Dynamic</span>{" "}
        Web Applications.
      </motion.h2>
      <div className="content-wrapper flex gap-40">
        <div className="description flex flex-col gap-3 max-w-xl">
          <div className="title2 text-2xl font-bold mb-5">Get to know me!</div>
          <motion.div 
          initial={{opacity:0, x: -50}}
          whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
          className="roboto-regular des-text">
            <p className="mb-4">
              Hi there! I&apos;m a Computer Science Engineering student at NSHM
              Knowledge Campus, Durgapur, affiliated with MAKAUT, passionate
              about web development and problem-solving. Skilled in C, Java,
              Python, HTML5, CSS, JavaScript, React, Vue, SQL, and NoSQL
              databases.
            </p>
            <p>
              I&apos;m on the lookout for opportunities to apply my skills and
              contribute to innovative projects in the field of web development.
              Let&apos;s connect and explore how we can collaborate to create
              impactful solutions.
            </p>
          </motion.div>
          <Link to="project-section" smooth={true} duration={500}>
            <motion.button 
             initial={{opacity:0, y: 50}}
             whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
            className="project-btn mt-3 w-min">Projects</motion.button>
          </Link>
        </div>
        <div className="skills flex flex-col gap-3">
          <div className="title2 text-2xl font-bold mb-5">My Toolkit</div>
          <motion.div 
          initial={{opacity:0, x: 50}}
          whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
          className="tech-lists flex flex-wrap gap-3">
            <div className="tooltip-container">
              <span className="tooltip">Javascript</span>
              <span className="text ">
                <img
                  src= {Images.image3}
                  alt="Javascript"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Node.js</span>
              <span className="text ">
                <img
                  src={Images.image9}
                  alt="Node.js"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Express</span>
              <span className="text ">
                <img
                  src={Images.image10}   //{import.meta.env.BASE_URL + './assets/skills13.png'}
                  alt="Express"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">MongoDB</span>
              <span className="text ">
                <img
                  src={Images.image24}              
                  alt="MongoDB"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">React</span>
              <span className="text ">
                <img
                  src= {Images.image6}
                  alt="React"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Next.js</span>
              <span className="text ">
              <img
                  src={Images.image8}
                  alt="Next.js"
                  className="project-img dark:filter-none invert"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">SQL</span>
              <span className="text ">
                <img
                  src= {Images.image11}
                  alt="SQL"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">HTML5</span>
              <span className="text ">
                <img
                  src={Images.image1}
                  alt="HTML5"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">CSS3</span>
              <span className="text ">
                <img
                  src={Images.image2}
                  alt="CSS3"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Redux</span>
              <span className="text ">
                <img
                  src={Images.image7}
                  alt="Redux"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Bootstrap</span>
              <span className="text ">
                <img
                  src={Images.image4}
                  alt="Bootstrap"
                  className="project-img"
                />
              </span>
            </div>
            <div className="tooltip-container">
              <span className="tooltip">Tailwind</span>
              <span className="text ">
                <img
                  src={Images.image5}
                  alt="Tailwind"
                  className="project-img"
                />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
