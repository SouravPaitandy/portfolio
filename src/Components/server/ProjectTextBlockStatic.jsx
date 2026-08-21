import React from "react";
import Link from "next/link";
import { TrendingUp, ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectTextBlockStatic({ project, index, dict, lang }) {
  const t = dict.projects;
  const pData = t[project.id];

  return (
    <div className="space-y-6 max-w-xl pb-12">
      <div className="flex items-center gap-3">
        <span className="text-electric-indigo font-mono text-sm tracking-widest uppercase">
          0{index + 1}
        </span>
        <span className="h-[1px] w-12 bg-black/10 dark:bg-white/10"></span>
        <span className="text-gray-500 dark:text-gray-500 font-mono text-xs tracking-wider uppercase">
          {pData.category}
        </span>
      </div>

      <h3
        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors"
        data-modal-trigger={project.id}
      >
        {pData.title}
      </h3>

      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          {pData.shortDescription}
        </p>

        {/* Impact Section */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-electric-indigo/5 border border-electric-indigo/10">
          <TrendingUp
            size={20}
            className="text-electric-indigo flex-shrink-0 mt-1"
          />
          <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
            {pData.impact}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {project.stack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 pt-6">
        <div className="flex items-center gap-3">
          {/* Server-rendered link to the static project detail page */}
          <Link
            href={
              lang === "en"
                ? `/projects/${project.id}`
                : `/${lang}/projects/${project.id}`
            }
            className="group text-gray-900 dark:text-white border-b border-electric-indigo pb-1 hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors flex items-center gap-2 text-sm font-medium"
          >
            {t.view_details}{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
          {/* Keep data-modal-trigger so the existing interactive modal still works */}
          <button
            className="text-gray-500 dark:text-gray-400 text-sm hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors"
            data-modal-trigger={project.id}
            aria-label="Open project details modal"
            title="View Important Project Details in Brief"
          >
            Quick View
          </button>
        </div>
        <div className="flex gap-4">
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={project.links.site}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
