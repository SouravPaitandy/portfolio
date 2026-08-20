import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  Code2,
  Calendar,
  Tag,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectDetailCarousel from "../client/ProjectDetailCarousel";

export default function ProjectPage({ dict, lang, project, slug }) {
  const pContent = dict.projects[project.id];

  if (!pContent) {
    console.warn(`[ProjectPage] No locale content found for id: ${project.id}`);
  }

  const title = pContent?.title ?? project.id;
  const description = pContent?.description ?? "";
  const shortDescription = pContent?.shortDescription ?? "";
  const impact = pContent?.impact ?? "";
  const category = pContent?.category ?? project.category ?? "";

  // All images for the carousel
  const allImages = [project.img, ...(project.additionalImages ?? [])].filter(
    Boolean,
  );

  // JSON-LD Structured Data
  const canonicalUrl = `https://souravpaitandy.dev/projects/${slug}`;
  const isWebProject = category === "Full Stack" || category === "Frontend";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${title} | Sourav Paitandy`,
    description: description || shortDescription,
    isPartOf: { "@id": "https://souravpaitandy.dev/#website" },
    mainEntity: {
      "@type": isWebProject ? "WebApplication" : "SoftwareApplication",
      "@id": `${canonicalUrl}#software`,
      name: title,
      description: description || shortDescription,
      url: canonicalUrl,
      applicationCategory: category,
      author: {
        "@id": "https://souravpaitandy.dev/#person",
      },
    },
  };

  if (project.img) {
    jsonLd.mainEntity.screenshot = project.img.startsWith("http")
      ? project.img
      : `https://souravpaitandy.dev${project.img}`;
  }
  if (project.stack && project.stack.length > 0) {
    jsonLd.mainEntity.keywords = project.stack.join(", ");
  }
  if (project.links?.github) {
    jsonLd.mainEntity.codeRepository = project.links.github;
  }

  // Define the base prefix for navigation
  const routePrefix = lang === "en" ? "" : `/${lang}`;

  return (
    <main className="min-h-screen bg-white dark:bg-rich-black text-gray-900 dark:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Back navigation ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link
          href={`${routePrefix}/#project-section`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors mb-10 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {/* Using English label for Back for now, or maybe dict.projects.view_details? Wait, there is no generic "Back to Projects" in dictionary. Let's use hardcoded English or add to dictionary. The prompt said "Do not invent missing translations." I will keep it hardcoded since it's missing, or just use what was there. Wait, is "Back to Projects" in the dictionary? No, it's not. I'll just keep it hardcoded for now or use projects.view_archive. Let's stick to "Back to Projects". */}
          Back to Projects
        </Link>

        {/* ── Project Header ───────────────────────────────────────────────── */}
        <header className="mb-12">
          {/* Category badge + number */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 text-electric-indigo font-mono text-xs tracking-widest uppercase">
              <Tag size={12} />
              {category}
            </span>
            {project.date && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Calendar size={12} />
                {new Date(project.date).toLocaleDateString(
                  lang === "en" ? "en-US" : lang,
                  {
                    year: "numeric",
                    month: "long",
                  },
                )}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-900 dark:text-white mb-4">
            {title}
          </h1>

          {shortDescription && (
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
              {shortDescription}
            </p>
          )}
        </header>
      </div>

      {/* ── Image Carousel (Client Component island) ──────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <ProjectDetailCarousel images={allImages} projectTitle={title} />
      </div>

      {/* ── Project Content ─────────────────────────────────────────────────  */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: description + impact */}
          <div className="lg:col-span-2 space-y-10">
            {/* Full description */}
            {description && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Code2 size={22} className="text-electric-indigo" />
                  About this Project
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                  {description}
                </p>
              </section>
            )}

            {/* Impact / key outcome */}
            {impact && (
              <section>
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-electric-indigo/5 border border-electric-indigo/10">
                  <TrendingUp
                    size={20}
                    className="text-electric-indigo flex-shrink-0 mt-1"
                  />
                  <div>
                    <p className="text-sm font-semibold text-electric-indigo uppercase tracking-wider mb-1">
                      Key Outcome
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-base md:text-lg leading-relaxed">
                      {impact}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right: meta sidebar */}
          <aside className="space-y-8">
            {/* Tech stack */}
            {project.stack && project.stack.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                  {dict.projects.modal.technologies || "Tech Stack"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Links */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                Links
              </h3>
              <div className="flex flex-col gap-3">
                {project.links?.site && (
                  <a
                    href={project.links.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 px-4 py-3 bg-electric-indigo text-white rounded-xl font-semibold hover:bg-electric-indigo/80 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    {dict.projects.modal.live_demo || "Live Demo"}
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm text-gray-900 dark:text-white"
                  >
                    <FaGithub size={16} />
                    {dict.projects.modal.source_code || "Source Code"}
                  </a>
                )}
              </div>
            </section>

            {/* Category */}
            {category && (
              <section>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                  Category
                </h3>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {category}
                </span>
              </section>
            )}
          </aside>
        </div>

        {/* ── Footer navigation ─────────────────────────────────────────────── */}
        <div className="mt-20 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href={`${routePrefix}/#project-section`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            All Projects
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
            souravpaitandy.dev / projects / {slug}
          </p>
        </div>
      </div>
    </main>
  );
}
