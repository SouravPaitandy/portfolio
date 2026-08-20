/**
 * projectsServer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * A server-safe version of the project data list.
 *
 * The `src/data/projects.js` file imports static images directly:
 *   import * as Images from "../assets";
 *
 * In Next.js App Router, static image imports resolve to an object:
 *   { src: "/_next/static/media/hexode.xxx.png", height: N, width: N }
 *
 * This file provides the same project records but with image paths as plain
 * strings (using the /_next/static/media/... URLs that Next.js resolves at
 * build time), so Server Components can render <img> or next/image without
 * needing to import webpack-processed image objects.
 *
 * For the project detail pages we import images directly from assets here
 * so they are processed by Next.js's image optimisation pipeline, but we
 * expose .src so Server Component JSX can use them as strings.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as Images from "../assets/index.js";

/**
 * Returns the URL string from a Next.js static image import (or a plain
 * string as a fallback).
 */
function imgSrc(img) {
  if (!img) return null;
  return img?.src ?? img;
}

export const projectsServerList = [
  {
    id: "hexode-ide",
    slug: "hexode-ide",
    date: "2025-12-01",
    category: "AI",
    img: imgSrc(Images.hexode),
    additionalImages: [
      imgSrc(Images.hexodeDashboard),
      imgSrc(Images.hexodeIDE),
      imgSrc(Images.hexodePlayground),
      imgSrc(Images.hexodeDocs),
    ],
    stack: [
      "React",
      "Node.js",
      "Monaco Editor",
      "Yjs (CRDTs)",
      "WebSockets",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    links: {
      site: "https://hexode.vercel.app",
      github: "https://github.com/SouravPaitandy/hexode",
    },
  },
  {
    id: "collab-hub",
    slug: "collab-hub",
    date: "2025-04-01",
    category: "Full Stack",
    img: imgSrc(Images.Coordly),
    additionalImages: [
      imgSrc(Images.CoordlyDashboard),
      imgSrc(Images.CoordlyCollabs),
      imgSrc(Images.CoordlyWorkspace),
      imgSrc(Images.CoordlyWorkspaceAllFeatures),
      imgSrc(Images.CoordlyTaskboard),
      imgSrc(Images.CoordlyVideocallInterface),
    ],
    stack: ["Next.js", "MongoDB", "Socket.io", "Real-time"],
    links: {
      site: "https://getcoordly.vercel.app/",
      github: "https://github.com/SouravPaitandy/collabhub",
    },
  },
  {
    id: "mirror-mind",
    slug: "mirror-mind",
    date: "2026-08-01",
    category: "AI",
    img: imgSrc(Images.MirrorMind),
    additionalImages: [imgSrc(Images.InAction), imgSrc(Images.ResponsiveView)],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "FastAPI",
      "Python",
      "Groq API",
    ],
    links: {
      site: "https://mirror-mind-frontend.vercel.app",
      github: "https://github.com/SouravPaitandy/mirror-mind",
    },
  },
  {
    id: "jagjit-kaur-fashion",
    slug: "jagjit-kaur-fashion",
    date: "2025-06-01",
    category: "Full Stack",
    img: imgSrc(Images.jagjitkaur),
    additionalImages: [
      imgSrc(Images.jk1),
      imgSrc(Images.jk2),
      imgSrc(Images.jk3),
      imgSrc(Images.jk4),
    ],
    stack: [
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "Framer Motion",
      "Google Analytics",
    ],
    links: {
      site: "https://jkbyjagjitkaur.com",
      github: "https://github.com/SouravPaitandy/jagjitkaur-website",
    },
  },
  {
    id: "drawsync",
    slug: "drawsync",
    date: "2025-05-01",
    category: "Full Stack",
    img: imgSrc(Images.drawsync),
    additionalImages: [imgSrc(Images.Dscreenshot1), imgSrc(Images.Dscreenshot2)],
    stack: ["Next.js", "Liveblocks", "Canvas API", "Tailwind CSS"],
    links: {
      site: "https://drawsync.vercel.app",
      github: "https://github.com/SouravPaitandy/drawsync",
    },
  },
  {
    id: "vox-ai",
    slug: "vox-ai",
    date: "2024-09-01",
    category: "Frontend",
    img: imgSrc(Images.Voxai),
    additionalImages: [imgSrc(Images.voxaiApp)],
    stack: ["React", "Tailwind", "Vite", "AI"],
    links: {
      site: "https://voxai-project.vercel.app/",
      github: "https://github.com/SouravPaitandy/voxai-virtual-ai-assistant",
    },
  },
];

/** Find a project by its slug/id string. Returns undefined if not found. */
export function getProjectBySlug(slug) {
  return projectsServerList.find((p) => p.slug === slug);
}

/** All valid slugs — used by generateStaticParams. */
export function getAllProjectSlugs() {
  return projectsServerList.map((p) => p.slug);
}
