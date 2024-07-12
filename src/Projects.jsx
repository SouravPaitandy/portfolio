import "./Styles/projects.css";
import { motion } from "framer-motion";
import * as Images from "./assets"

export default function Projects() {
  
  return (
    <section id="project-section" className=" section projects py-24 px-40 flex  flex-col justify-between items-center">
      <motion.h1
      initial={{opacity:0, x: -50}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
       className="about-h1 text-5xl font-bold text-center">Projects</motion.h1>
      <motion.div 
      initial={{opacity:0, x: 50}}
      whileInView={{opacity:1, x: 0, transition:{duration:.4}}}
      className="underline dark:bg-green-600 bg-[#1E90FF] h-1 w-12 border-none mt-6 mb-10 rounded-lg"></motion.div>
      <div className="wrapper rounded-2xl shadow-lg shadow-gray-300 dark:shadow-gray-900">
        <div className="project flex gap-6 p-12 rounded-2xl dark:bg-slate-800 bg-slate-300">
            <div className="card-data max-w-80">
                <h3 className=" card-h3 font-bold text-2xl mb-5">Simon Says</h3>
                <div className="short-des flex flex-wrap roboto-regular mb-5">
                    Online version of classic game of memory, Simon Says.
                    <span className="github dark:text-green-600 text-[#4682B4] text-xl font-bold ml-4">
                <a href="https://github.com/SouravPaitandy/SimonGame" target="_blank">GitHub</a>
                </span>
                </div>
                <div className="tag-list flex gap-3 mb-5">
                   <span className="skill">JavaScript</span>
                   <span className="skill">HTML5</span>
                   <span className="skill">CSS</span>
                </div>
                <button className="project-btn w-36"> 
                <a href="https://souravpaitandy.github.io/SimonGame/" target="_blank" className="">Check It!</a>
                </button>
                
            </div>
          <div className="card">
            <img src={Images.image19} alt="SimonSays" />
            <div className="card__content">
              <p className="card__title roboto-regular">Simon Says</p>
              <p className="card__description roboto-regular">
              Recreated the classic Simon game in HTML, CSS, and JavaScript to showcase my front-end skills. Real-time scoring and red flags for mistakes. Solo project. Please try it out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
