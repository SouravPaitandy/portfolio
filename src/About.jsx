/* eslint-disable react/display-name */
import { memo } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import ResumeViewer from "./ResumeViewer";
import useTheme from "./Contexts/theme";
import { Briefcase, Terminal, User } from "lucide-react";
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
} from "react-icons/si";
import FloatingSkills from "./Components/FloatingSkills";
import { useTranslation } from "react-i18next";

const About = memo(() => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const skillIcons = [
    { src: SiJavascript, alt: "Javascript", name: "Javascript" },
    { src: SiExpress, alt: "Express", name: "Express" },
    { src: SiMongodb, alt: "MongoDB", name: "MongoDB" },
    { src: SiReact, alt: "React", name: "React" },
    { src: SiNextdotjs, alt: "Next.js", name: "Next.js" },
    { src: SiMysql, alt: "SQL", name: "SQL" },
    { src: SiHtml5, alt: "HTML5", name: "HTML5" },
    { src: SiCss3, alt: "CSS3", name: "CSS3" },
    { src: SiRedux, alt: "Redux", name: "Redux" },
    { src: SiBootstrap, alt: "Bootstrap", name: "Bootstrap" },
    { src: SiTailwindcss, alt: "Tailwind", name: "Tailwind" },
    { src: SiNodedotjs, alt: "Node.js", name: "Node.js" },
  ];

  return (
    <section
      id="about-section"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-rich-black transition-colors duration-300"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-electric-indigo/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 md:w-72 md:h-72 bg-purple-600/20 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            {t("about.title")}{" "}
            <span className="text-electric-indigo">{t("about.me")}</span>
          </h2>
          <div className="w-24 h-1 bg-electric-indigo mx-auto rounded-full opacity-80" />
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t("about.subtitle_1")}{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              {t("about.subtitle_years")}
            </span>
            .{t("about.subtitle_2")}{" "}
            <span className="text-electric-indigo font-medium">
              {t("about.subtitle_dynamic")}
            </span>{" "}
            {t("about.subtitle_3")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Bio Column */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/60 dark:bg-charcoal/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl hover:border-electric-indigo/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-electric-indigo w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("about.who_i_am")}
                </h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                <p>
                  {t("about.bio_p1_1")}{" "}
                  <span className="text-gray-900 dark:text-white font-medium">
                    {t("about.bio_p1_name")}
                  </span>
                  {t("about.bio_p1_2")}
                </p>
                <p>{t("about.bio_p2")}</p>
                <p>
                  {t("about.bio_p3_1")}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t("about.bio_p3_highlight")}
                  </span>{" "}
                  {t("about.bio_p3_2")}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t("about.bio_p3_mern")}
                  </span>{" "}
                  {t("about.bio_p3_3")}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t("about.bio_p3_next")}
                  </span>{" "}
                  {t("about.bio_p3_4")}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-grow md:flex-grow-0 px-6 py-3 bg-transparent text-gray-700 dark:text-gray-300 font-bold transition-all cursor-pointer text-center"
                >
                  <ResumeViewer heading={t("about.resume_btn")} />
                </motion.button>

                <Link
                  to="project-section"
                  href="#project-section"
                  smooth={true}
                  duration={800}
                  className="flex-grow md:flex-grow-0"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99,102,241,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all cursor-pointer text-center"
                  >
                    {t("about.projects_btn")}
                  </motion.div>
                </Link>

                <a
                  href="https://www.linkedin.com/in/sourav-paitandy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow md:flex-grow-0"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99,102,241,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all text-sm md:text-base"
                  >
                    {t("about.linkedin_btn")}
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills Column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/60 dark:bg-charcoal/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl hover:border-electric-indigo/20 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-electric-indigo w-6 h-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("about.tech_arsenal")}
                </h3>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {skillIcons.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:border-electric-indigo/30 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 text-gray-600 group-hover:text-electric-indigo transition-colors">
                      <skill.src className="w-full h-full p-2" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Terminal className="w-4 h-4" />
                  <span>{t("about.always_learning")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Skills Bubbles Section */}
        <FloatingSkills />
      </div>
    </section>
  );
});

export default About;
