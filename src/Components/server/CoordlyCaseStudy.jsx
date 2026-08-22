import React from "react";
import Link from "next/link";
import {
  Home,
  ExternalLink,
  Code2,
  Calendar,
  Tag,
  Zap,
  Server,
  Monitor,
  MessageSquare,
  CheckCircle,
  Lightbulb,
  Info,
  Video,
  FileText,
  Database,
  Network,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import HexodeHeroWrapper from "../client/HexodeHeroWrapper";
import ProjectTOC from "../client/ProjectTOC";

export default function CoordlyCaseStudy({ dict, lang, project, slug, technical, prose }) {
  const pContent = dict.projects[project.id];
  const title = pContent?.title ?? project.id;
  const category =
    pContent?.category ?? project.category ?? "Full Stack Application";

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
    { id: "why-i-built-it", label: prose.toc["why-i-built-it"] },
    { id: "workspace", label: prose.toc["the-workspace"] },
    { id: "architecture", label: prose.toc.evolution || "Architecture" }, // Fallback since it wasn't in the toc
    { id: "realtime", label: prose.toc["realtime-systems"] },
    { id: "hot-swapping", label: prose.toc["hot-swapping"] },
    { id: "persistence", label: prose.toc.persistence },
    { id: "auth", label: prose.toc.auth },
    { id: "challenges", label: prose.toc.challenges },
    { id: "tradeoffs", label: prose.toc.tradeoffs },
    { id: "lessons", label: prose.toc.lessons },
    { id: "tech-stack", label: prose.toc["tech-stack"] },
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
            <Home size={14} />
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
      </div>
      {/* ── Project Header ───────────────────────────────────────────────── */}
      <div className="mx-auto px-5 lg:px-8">
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
          {/* 1. Origins & Intent */}
          <section
            id="why-i-built-it"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto bg-electric-indigo/5 p-8 md:p-10 rounded-3xl border border-electric-indigo/10 shadow-sm"
          >
            <SectionMarker num={1} label="Why I Built It" />
            <H2 icon={Lightbulb}>{prose.whyIBuiltIt.title}</H2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
              {prose.whyIBuiltIt.content.map((p, i) => (
                <p key={i}>&quot;{p}&quot;</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-electric-indigo/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {prose.evolution.title}
              </h3>
              <div className="space-y-3 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {prose.evolution.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Workspace Overview */}
          <section
            id="workspace"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={2} label="The Workspace" />
            <H2 icon={Monitor}>{prose.theWorkspace.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {prose.theWorkspace.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 3. Architecture Overview */}
          <section
            id="architecture"
            className="prose prose-lg dark:prose-invert max-w-5xl mx-auto"
          >
            <SectionMarker num={3} label="Architecture" />
            <H2 icon={Network}>System Architecture</H2>

            <div className="bg-gray-50 dark:bg-white/5 p-6 md:p-10 rounded-3xl border border-gray-200 dark:border-white/10 overflow-x-auto my-10 shadow-inner">
              <div className="min-w-[800px] flex flex-col items-center select-none font-mono text-sm">
                {/* Client Layer */}
                <div className="w-full max-w-4xl border-2 border-gray-300 dark:border-gray-600 rounded-2xl p-6 relative bg-white dark:bg-rich-black shadow-sm text-center">
                  <span className="absolute -top-3 left-6 bg-white dark:bg-rich-black px-2 text-gray-500 font-bold tracking-widest text-xs uppercase">
                    Coordly Workspace (Client)
                  </span>

                  <div className="grid grid-cols-3 gap-6 mt-2">
                    <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <FileText size={24} className="text-blue-500 mb-2" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        Docs
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Yjs / Tiptap
                      </span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <MessageSquare
                        size={24}
                        className="text-green-500 mb-2"
                      />
                      <span className="font-bold text-gray-900 dark:text-white">
                        Chat
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Socket.IO
                      </span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <Video size={24} className="text-purple-500 mb-2" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        Video
                      </span>
                      <span className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        WebRTC / PeerJS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connection Layer */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl my-4 text-gray-400 dark:text-gray-500">
                  <div className="flex flex-col items-center">
                    <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                    <span className="text-[10px] mt-1 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      y-websocket
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                    <span className="text-[10px] mt-1 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      socket.io signaling
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                    <span className="text-[10px] mt-1 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      Peer signaling
                    </span>
                  </div>
                </div>

                {/* Server Layer */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl relative">
                  <div className="col-span-2 flex flex-col items-center justify-center p-6 bg-white dark:bg-rich-black rounded-2xl border-2 border-electric-indigo/50 shadow-sm relative">
                    <span className="absolute -top-3 left-6 bg-white dark:bg-rich-black px-2 text-electric-indigo font-bold tracking-widest text-xs uppercase">
                      documentServer.js (Node)
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Server size={18} /> Multiplexed Realtime Server
                    </span>
                  </div>

                  <div className="col-span-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-rich-black rounded-2xl border-2 border-gray-300 dark:border-gray-600 shadow-sm relative">
                    <span className="absolute -top-3 left-6 bg-white dark:bg-rich-black px-2 text-gray-500 font-bold tracking-widest text-xs uppercase">
                      peerServer.js
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Server size={18} /> Peer Broker
                    </span>
                  </div>
                </div>

                {/* DB Arrow */}
                <div className="flex justify-center items-center w-full max-w-4xl my-2">
                  <div className="h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                </div>

                {/* DB Layer */}
                <div className="w-full max-w-4xl flex justify-center">
                  <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 min-w-[200px]">
                    <Database size={24} className="text-orange-500 mb-2" />
                    <span className="font-bold text-gray-900 dark:text-white">
                      MongoDB
                    </span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      App Data & Yjs Buffers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {technical.multiplexing.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 4. Three Realtime Systems */}
          <section
            id="realtime"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={4} label="Real-Time Systems" />
            <H2 icon={Zap}>
              {prose.threeRealtimeSystems.title}
            </H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {technical.threeRealtimeSystems.items.map((item, i) => ( // Note: For this project, content is entirely within technical.threeRealtimeSystems.items
                <div
                    key={i}
                    className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <CheckCircle size={18} className="text-electric-indigo" />{" "}
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed m-0 pl-7">
                      {item.content}
                    </p>
                  </div>
              ))}
            </div>
          </section>

          {/* 5. Hot Swapping */}
          <section
            id="hot-swapping"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={5} label="WebRTC Media" />
            <H2 icon={Video}>{prose.hotSwapping.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {technical.hotSwapping.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* 6. Persistence & Auth */}
          <section
            id="persistence"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={6} label="Persistence" />
            <H2 icon={Database}>{prose.persistence.title}</H2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-16">
              {technical.persistence.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div id="auth" className="pt-4">
              <SectionMarker num={7} label="Security" />
              <H2 icon={Server}>
                {prose.authAndSecurity.title}
              </H2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {technical.authAndSecurity.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
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

          {/* 9. Trade-offs */}
          <section
            id="tradeoffs"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <SectionMarker num={9} label="Trade-offs" />
            <H2 icon={Info}>{prose.limitations.title}</H2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400 list-disc pl-6 leading-relaxed">
              {prose.limitations.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 10. What I Learned */}
          <section
            id="lessons"
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto bg-electric-indigo/5 p-8 md:p-10 rounded-3xl border border-electric-indigo/10 shadow-sm"
          >
            <SectionMarker num={10} label="What I Learned" />
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

          {/* 11. Tech Stack */}
          <section
            id="tech-stack"
            className="prose prose-lg dark:prose-invert max-w-5xl mx-auto"
          >
            <SectionMarker num={11} label="Tech Stack" />
            <H2 icon={Server}>{prose.techStack.title}</H2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              <table className="w-full text-left text-sm">
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
