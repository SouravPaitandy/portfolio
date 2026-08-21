"use client";

import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ChevronDown, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "why-i-built-it", label: "Why I Built It" },
  { id: "architecture", label: "Architecture" },
  { id: "collaboration", label: "Real-Time Collaboration" },
  { id: "sync-bug", label: "Synchronization Bug" },
  { id: "execution", label: "Multi-File Execution" },
  { id: "hexodeai", label: "HexodeAI" },
  { id: "challenges", label: "Engineering Challenges" },
  { id: "decisions", label: "Technical Decisions" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "lessons", label: "What I Learned" },
  { id: "tech-stack", label: "Tech Stack" }
];

export default function HexodeTOC() {
  const [activeId, setActiveId] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } // Adjust margins so active triggers near top
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  const TOCLinks = () => (
    <ul className="space-y-2">
      {sections.map((s) => (
        <li key={s.id}>
          <ScrollLink
            to={s.id}
            smooth={true}
            duration={500}
            offset={-100}
            onClick={closeMobile}
            className={`block cursor-pointer text-sm font-medium transition-colors border-l-2 pl-4 py-1
              ${
                activeId === s.id
                  ? "border-electric-indigo text-electric-indigo dark:text-electric-indigo"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }
            `}
          >
            {s.label}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-28 w-56 flex-shrink-0 self-start pb-10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-2">
          <List size={16} /> On this page
        </h4>
        <TOCLinks />
      </div>

      {/* Mobile TOC */}
      <div className="lg:hidden sticky top-[88px] z-30 mb-8 -mx-5 px-5">
        <div className="bg-white/80 dark:bg-rich-black/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-full flex items-center justify-between p-4 text-sm font-bold text-gray-900 dark:text-white"
          >
            <span className="flex items-center gap-2">
              <List size={16} className="text-electric-indigo" /> 
              On this page
            </span>
            <ChevronDown size={16} className={`transition-transform ${isMobileOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 max-h-[60vh] overflow-y-auto">
                  <TOCLinks />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
