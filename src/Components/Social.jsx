import { Link } from "react-scroll";
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Heart } from 'lucide-react';

const Social = () => {

  return (
    <div className="footer-container w-full max-w-7xl mx-auto px-6 py-12 border-t border-white/5 mt-20">
      <motion.div 
        initial={{opacity:0, y: 50}}
        whileInView={{opacity:1, y: 0, transition:{duration:.4}}}
        className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12"
      >
        <div className="flex-1 max-w-md">
          <h3 className="font-bold text-2xl text-white mb-4 tracking-tight">SOURAV PAITANDY</h3>
          <p className="text-gray-400 leading-relaxed text-lg">
            Let&apos;s connect and explore how we can collaborate to create
            impactful solutions.
          </p>
        </div>
        
        <div className="flex-1">
           {/* Inspiration section removed or simplified to avoid distraction, or kept minimal */}
        </div>

        <div className="flex-1 md:text-right">
          <h3 className="font-bold text-lg text-white mb-6">Connect</h3>
          <ul className="flex gap-4 md:justify-end">
            <li className="transition-transform duration-200 hover:-translate-y-1">
              <a
                href="https://www.linkedin.com/in/sourav-paitandy/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-electric-indigo/20 text-gray-400 hover:text-electric-indigo transition-all"
              >
                <Linkedin size={20} />
              </a>
            </li>
            <li className="transition-transform duration-200 hover:-translate-y-1">
              <a
                href="https://github.com/SouravPaitandy"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-electric-indigo/20 text-gray-400 hover:text-electric-indigo transition-all"
              >
                <Github size={20} />
              </a>
            </li>
            <li className="transition-transform duration-200 hover:-translate-y-1">
              <a
                href="https://www.instagram.com/paitandy_ji/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-electric-indigo/20 text-gray-400 hover:text-electric-indigo transition-all"
              >
                <Instagram size={20} />
              </a>
            </li>
             <li className="transition-transform duration-200 hover:-translate-y-1">
              <a
                href="https://twitter.com/PaitandySourav"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-electric-indigo/20 text-gray-400 hover:text-electric-indigo transition-all"
              >
                <Twitter size={20} />
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-500 pt-8 border-t border-white/5">
        <div className="mb-4 md:mb-0 flex items-center gap-1">
          <span>Made with</span>
          <Heart size={14} className="text-electric-indigo fill-current mx-1" />
          <span>by Sourav Paitandy</span>
        </div>
        
        <Link 
          to="hero-section"
          smooth={true}
          duration={1000}
          className="cursor-pointer hover:text-electric-indigo transition-colors"
        >
            Back to Top
        </Link>
      </div>
    </div>
  );
};

export default Social;
