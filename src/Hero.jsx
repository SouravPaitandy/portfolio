import React from "react";
import HeroEffects, { HeroTypewriter } from "./Components/client/HeroEffects";
import ResumeViewer from "./ResumeViewer";

export default function Hero({ dict }) {
  const t = dict.hero;

  return (
    <section
      id="hero-section"
      className="hero-section relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-rich-black text-gray-900 dark:text-white z-30 transition-colors duration-300"
    >
      {/* Background & Client Effects (Particles, etc.) */}
      <HeroEffects />

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center z-10 max-w-5xl px-4 md:px-6 text-center">
        {/* New Project CTA */}
        <div className="mb-8 md:mb-4">
          <a
            href="#mirror-mind"
            className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/5 border border-electric-indigo/30 hover:border-electric-indigo/60 transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] backdrop-blur-md"
          >
            <div className="absolute inset-0 rounded-full bg-electric-indigo/5 group-hover:bg-electric-indigo/10 transition-colors" />

            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-indigo opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-indigo"></span>
            </span>

            <span className="text-sm z-50 font-medium text-gray-600 dark:text-gray-300 group-hover:text-electric-indigo dark:group-hover:text-electric-indigo transition-colors flex items-center gap-2">
              {t.new_project}{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                MirrorMind
              </span>
              <span className="hidden sm:inline opacity-70">
                - AI Professional Digital Twin
              </span>
            </span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-2 mb-4 md:mb-6">
          <div className="px-4 py-1 w-fit-content rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-electric-indigo font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
            {t.role}
          </div>
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            {t.open_to_work}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">
          {t.name}
        </h1>

        {/* Typewriter container */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-light text-gray-500 dark:text-gray-400 mb-6 md:mb-8 h-8 md:h-12 flex items-center justify-center gap-2"
          id="hero-typewriter-container"
        >
          <span>A Passionate</span>
          <HeroTypewriter />
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          {t.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <a
            href="#project-section"
            className="w-full sm:w-auto px-8 py-3 md:px-8 md:py-4 rounded-full bg-indigo-600 text-white font-bold text-base md:text-lg transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] text-center"
          >
            {t.cta_projects}
          </a>

          <ResumeViewer
            heading="View Resume"
            className="w-full sm:w-auto px-8 py-3 md:px-8 md:py-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent text-gray-900 dark:text-white font-medium text-base md:text-lg hover:border-black dark:hover:border-white transition-colors flex justify-center items-center text-center"
          />

          <a
            href="#contact-section"
            className="w-full sm:w-auto px-8 py-3 md:px-8 md:py-4 rounded-full border border-transparent text-gray-500 dark:text-gray-400 font-medium text-base md:text-lg hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors text-center"
          >
            {t.cta_contact}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-500 to-transparent opacity-30 relative overflow-hidden">
          <div className="w-full h-1/3 bg-electric-indigo absolute top-0 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
