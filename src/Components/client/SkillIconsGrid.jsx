"use client";

import {
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiMysql,
  SiRedux,
  SiBootstrap,
  SiPython,
  SiFastapi,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import ClientReveal from "./ClientReveal";

export default function SkillIconsGrid() {
  const skillIcons = [
    { src: SiJavascript, alt: "Javascript", name: "Javascript" },
    { src: SiTypescript, alt: "TypeScript", name: "TypeScript" },
    { src: SiReact, alt: "React", name: "React" },
    { src: SiNextdotjs, alt: "Next.js", name: "Next.js" },
    { src: SiNodedotjs, alt: "Node.js", name: "Node.js" },
    { src: SiExpress, alt: "Express", name: "Express" },
    { src: SiPython, alt: "Python", name: "Python" },
    { src: SiFastapi, alt: "FastAPI", name: "FastAPI" },
    { src: SiMongodb, alt: "MongoDB", name: "MongoDB" },
    { src: SiMysql, alt: "SQL", name: "SQL" },
    { src: FaJava, alt: "Java", name: "Java" },
    { src: SiHtml5, alt: "HTML5", name: "HTML5" },
    { src: SiCss3, alt: "CSS3", name: "CSS3" },
    { src: SiRedux, alt: "Redux", name: "Redux" },
    { src: SiBootstrap, alt: "Bootstrap", name: "Bootstrap" },
    { src: SiTailwindcss, alt: "Tailwind", name: "Tailwind" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {skillIcons.map((skill, index) => (
        <ClientReveal
          key={skill.name}
          className="group relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-electric-indigo/30 transition-all duration-300 cursor-default"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 text-gray-600 group-hover:text-electric-indigo transition-colors">
            <skill.src className="w-full h-full p-1" />
          </div>
          <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors text-center">
            {skill.name}
          </span>
        </ClientReveal>
      ))}
    </div>
  );
}
