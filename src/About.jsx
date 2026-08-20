import { memo } from "react";
import ResumeViewer from "./ResumeViewer";
import { Briefcase, Terminal, User } from "lucide-react";
import FloatingSkills from "./Components/FloatingSkills";
import ClientReveal from "./Components/client/ClientReveal";
import SkillIconsGrid from "./Components/client/SkillIconsGrid";

const About = memo(function About({ dict }) {
  const t = dict.about;

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
        <ClientReveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            {t.title}{" "}
            <span className="text-electric-indigo">{t.me}</span>
          </h2>
          <div className="w-24 h-1 bg-electric-indigo mx-auto rounded-full opacity-80" />
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed wrap-break-word">
            {t.subtitle_1}
            {"  "}
            <span className="inline-block text-gray-900 dark:text-white font-medium">
              {t.subtitle_years}
            </span>
            {t.subtitle_2}{" "}
            <span className="text-electric-indigo font-medium">
              {t.subtitle_dynamic}
            </span>{" "}
            {t.subtitle_3}
          </p>
        </ClientReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Bio Column */}
          <ClientReveal
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
                  {t.who_i_am}
                </h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                <p>
                  {t.bio_p1_1}{" "}
                  <span className="text-gray-900 dark:text-white font-medium">
                    {t.bio_p1_name}
                  </span>
                  {t.bio_p1_2}
                </p>
                <p>{t.bio_p2}</p>
                <p>
                  {t.bio_p3_1}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t.bio_p3_highlight}
                  </span>{" "}
                  {t.bio_p3_2}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t.bio_p3_mern}
                  </span>{" "}
                  {t.bio_p3_3}{" "}
                  <span className="text-electric-indigo font-medium">
                    {t.bio_p3_next}
                  </span>{" "}
                  {t.bio_p3_4}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <ClientReveal
                  as="div"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-grow md:flex-grow-0"
                >
                  <ResumeViewer 
                    heading={t.resume_btn} 
                    className="block w-full h-full px-6 py-3 bg-transparent text-gray-700 dark:text-gray-300 font-bold transition-all cursor-pointer text-center"
                  />
                </ClientReveal>

                <a
                  href="#project-section"
                  className="flex-grow md:flex-grow-0"
                >
                  <ClientReveal
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99,102,241,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all cursor-pointer text-center"
                  >
                    {t.projects_btn}
                  </ClientReveal>
                </a>

                <a
                  href="https://www.linkedin.com/in/sourav-paitandy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow md:flex-grow-0"
                >
                  <ClientReveal
                    as="button"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(99,102,241,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-gray-500 transition-all text-sm md:text-base"
                  >
                    {t.linkedin_btn}
                  </ClientReveal>
                </a>
              </div>
            </div>
          </ClientReveal>

          {/* Skills Column */}
          <ClientReveal
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
                  {t.tech_arsenal}
                </h3>
              </div>

              <SkillIconsGrid />

              <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Terminal className="w-4 h-4" />
                  <span>{t.always_learning}</span>
                </div>
              </div>
            </div>
          </ClientReveal>
        </div>

        {/* Floating Skills Bubbles Section */}
        <FloatingSkills />
      </div>
    </section>
  );
});

export default About;
