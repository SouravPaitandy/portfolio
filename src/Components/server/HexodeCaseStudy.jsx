import Link from "next/link";
import {
  ExternalLink,
  Code2,
  Calendar,
  Tag,
  Cpu,
  Zap,
  Server,
  Monitor,
  Terminal,
  BrainCircuit,
  MessageSquare,
  Wrench,
  CheckCircle,
  Lightbulb,
  Info,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import HexodeHeroWrapper from "../client/HexodeHeroWrapper";
import ProjectTOC from "../client/ProjectTOC";

export default function HexodeCaseStudy({ dict, lang, project, slug, technical, prose }) {
  const pContent = dict.projects[project.id];
  const title = pContent?.title ?? project.id;
  const category =
    pContent?.category ?? project.category ?? "AI-Powered Developer Tools";

  // Carousel images
  const allImages = [project.img, ...(project.additionalImages ?? [])].filter(
    Boolean,
  );

  // JSON-LD Structured Data
  const routePrefix = lang === "en" ? "" : `/${lang}`;
  const canonicalUrl = `https://souravpaitandy.dev${routePrefix}/projects/${slug}`;
  const isWebProject =
    category === "Full Stack" ||
    category === "Frontend" ||
    category.includes("Application") ||
    category.includes("Tools");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${title} | Case Study | Sourav Paitandy`,
    description: prose.hero.subtitle,
    isPartOf: { "@id": "https://souravpaitandy.dev/#website" },
    mainEntity: {
      "@type": isWebProject ? "WebApplication" : "SoftwareApplication",
      "@id": `${canonicalUrl}#software`,
      name: title,
      description: prose.hero.subtitle,
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

  const H2 = ({ icon: Icon, children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
      {Icon && <Icon size={26} className="text-electric-indigo" />}
      {children}
    </h2>
  );

  const SectionMarker = ({ num, label }) => (
    <div className="text-xs font-bold tracking-[0.2em] text-electric-indigo mb-3 opacity-80 uppercase">
      {String(num).padStart(2, "0")} — {label}
    </div>
  );

  const tocSections = [
    { id: "overview", label: prose.toc.overview },
    { id: "why-i-built-it", label: prose.toc["why-i-built-it"] },
    { id: "architecture", label: prose.toc.architecture },
    { id: "collaboration", label: prose.toc.collaboration },
    { id: "sync-bug", label: prose.toc["sync-bug"] },
    { id: "execution", label: prose.toc.execution },
    { id: "hexodeai", label: prose.toc.hexodeai },
    { id: "challenges", label: prose.toc.challenges },
    { id: "decisions", label: prose.toc.decisions },
    { id: "tradeoffs", label: prose.toc.tradeoffs },
    { id: "lessons", label: prose.toc.lessons },
    { id: "tech-stack", label: prose.toc["tech-stack"] }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-rich-black text-gray-900 dark:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Breadcrumb Navigation ───────────────────────────────────────────── */}
      <div className="mx-auto px-5 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap hide-scrollbar mb-6">
          <Link
            href={`${routePrefix}/`}
            className="hover:text-electric-indigo transition-colors flex items-center gap-1.5"
          >
            Home
          </Link>
          <span className="mx-2 text-base font-semibold text-gray-300 dark:text-gray-600 flex-shrink-0">
            /
          </span>
          <Link
            href={`${routePrefix}/#project-section`}
            className="hover:text-electric-indigo transition-colors"
          >
            Projects
          </Link>
          <span className="mx-2 text-base font-semibold text-gray-300 dark:text-gray-600 flex-shrink-0">
            /
          </span>
          <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </nav>

        {/* ── Project Header ───────────────────────────────────────────────── */}
        <HexodeHeroWrapper images={allImages} title={title}>
          <header className="mb-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
              <span className="flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded-full bg-electric-indigo/10 border border-electric-indigo/60 dark:border-electric-indigo/20 text-electric-indigo font-mono font-semibold dark:font-normal text-xs tracking-widest uppercase shadow-sm">
                <Tag size={12} />
                {category}
              </span>
              {project.date && (
                <span className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-400 font-mono">
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

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-900 dark:text-white mb-6 drop-shadow-sm">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-10 font-medium">
              {prose.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              {project.links?.site && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-electric-indigo text-white font-medium hover:bg-electric-indigo/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-electric-indigo/20 w-full sm:w-auto"
                >
                  <ExternalLink size={18} />
                  {dict.projects?.modal?.live_demo || "Live Demo"}
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/10 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-gray-200 dark:border-white/10 shadow-sm w-full sm:w-auto"
                >
                  <FaGithub size={18} />
                  {dict.projects?.modal?.source_code || "Source Code"}
                </a>
              )}
            </div>
          </header>
        </HexodeHeroWrapper>
      </div>
      {/* ── Case Study Content with TOC ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-32 flex flex-col lg:flex-row gap-10 lg:gap-16 relative items-start">
        <ProjectTOC sections={tocSections} />
        <div className="flex-1 w-full min-w-0 space-y-24">
          {/* 1. Overview */}
          <section
            id="overview"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={1} label="Overview" />
            <H2 icon={Info}>{prose.overview.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {prose.overview.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 2. The Problem */}
          <section
            id="why-i-built-it"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto bg-electric-indigo/5 p-8 md:p-10 rounded-3xl border border-electric-indigo/10 shadow-sm"
          >
            <SectionMarker num={2} label="Why I Built It" />
            <H2 icon={Lightbulb}>{prose.problem.title}</H2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
              {prose.problem.content.map((p, i) => (
                <p key={i}>&quot;{p}&quot;</p>
              ))}
            </div>
          </section>

          {/* 3. Architecture */}
          <section
            id="architecture"
            className="prose prose-lg dark:prose-invert max-w-5xl mx-auto"
          >
            <SectionMarker num={3} label="Architecture" />
            <H2 icon={Server}>{prose.architecture.title}</H2>

            <div className="bg-gray-50 dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 overflow-x-auto my-10 shadow-inner">
              <div className="min-w-[700px] flex flex-col items-center select-none">
                {/* Browser Node */}
                <div className="flex flex-col items-center p-5 bg-white dark:bg-rich-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 w-72 transition-transform hover:-translate-y-1">
                  <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Monitor size={16} /> Browser (Client)
                  </span>
                  <div className="flex gap-2 mt-3 w-full justify-center">
                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5 rounded-lg font-mono">
                      React / Monaco
                    </span>
                    <span className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1.5 rounded-lg font-mono">
                      Yjs State
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600 relative flex items-center justify-center my-1">
                  <span className="absolute bg-gray-50 dark:bg-rich-black px-3 py-1 text-xs font-medium text-gray-500 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                    WebSocket
                  </span>
                </div>

                {/* Node.js Node */}
                <div className="flex flex-col items-center p-6 bg-white dark:bg-rich-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-3xl transition-transform hover:-translate-y-1">
                  <span className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Server size={16} /> Node.js + Express (Backend)
                  </span>
                  <div className="grid grid-cols-4 gap-4 w-full">
                    <div className="text-center text-xs font-mono font-semibold bg-gray-100 dark:bg-zinc-800 py-3 px-2 rounded-xl border border-gray-200 dark:border-gray-600">
                      Yjs Sync
                    </div>
                    <div className="text-center text-xs font-mono font-semibold bg-gray-100 dark:bg-zinc-800 py-3 px-2 rounded-xl border border-gray-200 dark:border-gray-600">
                      REST API
                    </div>
                    <div className="text-center text-xs font-mono font-semibold bg-gray-100 dark:bg-zinc-800 py-3 px-2 rounded-xl border border-gray-200 dark:border-gray-600">
                      HexodeAI
                    </div>
                    <div className="text-center text-xs font-mono font-semibold bg-gray-100 dark:bg-zinc-800 py-3 px-2 rounded-xl border border-gray-200 dark:border-gray-600">
                      Orchestrator
                    </div>
                  </div>
                </div>

                {/* 3 Arrows down */}
                <div className="w-full max-w-2xl flex justify-between px-16 my-1">
                  <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600" />
                  <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600" />
                  <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600" />
                </div>

                {/* DBs */}
                <div className="w-full max-w-2xl flex justify-between px-8">
                  <div className="flex flex-col items-center transition-transform hover:-translate-y-1">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-center w-36 shadow-sm">
                      <span className="font-bold text-sm block text-green-800 dark:text-green-300">
                        MongoDB
                      </span>
                      <span className="text-[10px] text-green-600 dark:text-green-400 mt-1 block">
                        Persistence
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center transition-transform hover:-translate-y-1">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl text-center w-36 shadow-sm">
                      <span className="font-bold text-sm block text-blue-800 dark:text-blue-300">
                        Gemini Pro
                      </span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 block">
                        HexodeAI
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center transition-transform hover:-translate-y-1">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl text-center w-36 shadow-sm">
                      <span className="font-bold text-sm block text-purple-800 dark:text-purple-300">
                        Judge0
                      </span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 mt-1 block">
                        Code Execution
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technical.architecture.details.map((detail, i) => (
                <li
                  key={i}
                  className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl text-sm text-gray-700 dark:text-gray-300 flex items-start gap-3 border border-gray-100 dark:border-white/5 shadow-sm"
                >
                  <CheckCircle
                    size={18}
                    className="text-electric-indigo flex-shrink-0 mt-0.5"
                  />
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Real-Time Collaboration */}
          <section
            id="collaboration"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={4} label="Real-Time Collaboration" />
            <H2 icon={Zap}>{prose.realTime.title}</H2>
            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {technical.realTime.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 5. The Sync Bug (Hard Problem Callout) */}
          <section
            id="sync-bug"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto bg-red-50 dark:bg-red-900/10 p-8 md:p-10 rounded-3xl border border-red-200 dark:border-red-900/30 relative overflow-hidden shadow-sm"
          >
            <SectionMarker num={5} label="Synchronization Bug" />
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Wrench size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-red-600 dark:text-red-400 font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                <Terminal size={16} /> {dict.caseStudy?.hard_problem || "Hard Problem Callout"}
              </h3>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {prose.syncBug.title}:{" "}
                {prose.syncBug.subtitle}
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {technical.syncBug.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white dark:bg-black/40 p-5 rounded-2xl border border-red-100 dark:border-red-900/20 shadow-sm">
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-widest block mb-3">
                    Old Approach
                  </span>
                  <code className="text-red-500 font-mono text-sm">
                    setTimeout(() =&gt; init(), 1000)
                  </code>
                </div>
                <div className="flex-1 bg-white dark:bg-black/40 p-5 rounded-2xl border border-green-100 dark:border-green-900/20 shadow-sm">
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-widest block mb-3">
                    Final Approach
                  </span>
                  <code className="text-green-500 font-mono text-sm">
                    provider.on(&quot;synced&quot;, ...) + yFilesMap.size === 0
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Multi-File Execution */}
          <section
            id="execution"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={6} label="Multi-File Execution" />
            <H2 icon={Cpu}>{prose.execution.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {technical.execution.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {technical.execution.supported.map((lang, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-bold border border-gray-200 dark:border-white/10 shadow-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>

          {/* 7. HexodeAI */}
          <section
            id="hexodeai"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={7} label="HexodeAI" />
            <H2 icon={BrainCircuit}>{prose.hexodeAI.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {technical.hexodeAI.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 8. Engineering Challenges */}
          <section
            id="challenges"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={8} label="Engineering Challenges" />
            <H2 icon={Code2}>{prose.challenges.title}</H2>
            <div className="space-y-6">
              {prose.challenges.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-white/5 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                    {i + 1}. {item.title}
                  </h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-gray-200">
                        {dict.caseStudy?.challenge?.problem || "Problem:"}
                      </strong>{" "}
                      {technical.challenges[i].technicalProblem}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-gray-200">
                        {dict.caseStudy?.challenge?.approach || "Approach:"}
                      </strong>{" "}
                      {technical.challenges[i].technicalApproach}
                    </p>
                    <div className="p-4 bg-electric-indigo/5 rounded-xl border border-electric-indigo/10">
                      <p className="text-electric-indigo font-medium">
                        <strong className="text-gray-900 dark:text-white">
                          {dict.caseStudy?.challenge?.result || "Result:"}
                        </strong>{" "}
                        {technical.challenges[i].technicalResult}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Technical Decisions */}
          <section
            id="decisions"
            className="prose prose-lg dark:prose-invert max-w-4xl mx-auto"
          >
            <SectionMarker num={9} label="Technical Decisions" />
            <H2 icon={Lightbulb}>{prose.decisions.title}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technical.decisions.items.map((item, i) => (
                <div
                  key={i}
                  className="p-6 md:p-8 rounded-3xl bg-white dark:bg-rich-black border border-gray-200 dark:border-white/10 shadow-sm hover:border-electric-indigo/40 transition-colors group"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-electric-indigo transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 10. Trade-offs */}
          <section
            id="tradeoffs"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={10} label="Trade-offs" />
            <H2 icon={Monitor}>{prose.limitations.title}</H2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400 list-disc pl-6 leading-relaxed">
              {prose.limitations.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 11. What I Learned */}
          <section
            id="lessons"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto bg-electric-indigo/5 p-8 md:p-10 rounded-3xl border border-electric-indigo/10 shadow-sm"
          >
            <SectionMarker num={11} label="What I Learned" />
            <H2 icon={MessageSquare}>{prose.learned.title}</H2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {prose.learned.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-electric-indigo/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                {prose.future.title}
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed border-l-4 border-electric-indigo/30 pl-5">
                {prose.future.content.map((p, i) => (
                  <p key={i}>&quot;{p}&quot;</p>
                ))}
              </div>
            </div>
          </section>

          {/* 12. Tech Stack */}
          <section
            id="tech-stack"
            className="prose prose-lg dark:prose-invert max-w-5xl mx-auto"
          >
            <SectionMarker num={12} label="Tech Stack" />
            <H2 icon={Server}>{prose.techStack.title}</H2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white">
                    <th className="p-5 font-bold border-b border-gray-200 dark:border-white/10 uppercase tracking-wider text-xs">
                      {dict.caseStudy?.techStack?.technology || "Technology"}
                    </th>
                    <th className="p-5 font-bold border-b border-gray-200 dark:border-white/10 uppercase tracking-wider text-xs">
                      {dict.caseStudy?.techStack?.role || "Role"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {technical.techStack.items.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-5 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="p-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {prose.techStack.roles[item.roleId]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>{" "}
        {/* End of main content col */}
      </div>{" "}
      {/* End of flex container */}
      {/* ── Footer Branding ────────────────────────────────────────────────── */}
      <footer>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 flex justify-center select-none">
          <p className="text-sm font-medium font-mono text-gray-700 dark:text-gray-500 tracking-wider">
            souravpaitandy.dev
          </p>
        </div>
      </footer>
    </main>
  );
}
