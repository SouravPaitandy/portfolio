import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

const FloatingSkills = () => {
  const skills = [
    { Icon: SiReact, name: "React" },
    { Icon: SiNextdotjs, name: "Next.js" },
    { Icon: SiTailwindcss, name: "Tailwind" },
    { Icon: SiNodedotjs, name: "Node.js" },
    { Icon: SiMongodb, name: "MongoDB" },
    { Icon: SiJavascript, name: "JavaScript" },
    { Icon: SiHtml5, name: "HTML5" },
    { Icon: SiCss3, name: "CSS3" },
  ];

  return (
    <section className="relative w-full py-10 mt-8 mb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Floating Layout - Centered Cluster */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {skills.map((skill, index) => {
            const floatDuration = 3 + Math.random() * 2;
            const floatY = 15 + Math.random() * 30;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={skill.name}
                className="relative flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl group hover:bg-white dark:hover:bg-white/10 hover:border-electric-indigo/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300"
                initial={{ y: 0 }}
                animate={{
                  y: [0, -floatY, 0],
                }}
                transition={{
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                }}
              >
                <div className="text-gray-600 dark:text-gray-400 group-hover:text-electric-indigo dark:group-hover:text-white transition-colors duration-300">
                  <skill.Icon size={40} className="md:w-12 md:h-12" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FloatingSkills;
