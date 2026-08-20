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

import { projectsList } from "./projects.js";

/**
 * Returns the URL string from a Next.js static image import (or a plain
 * string as a fallback).
 */
function imgSrc(img) {
  if (!img) return null;
  return img?.src ?? img;
}

export const projectsServerList = projectsList.map((project) => ({
  ...project,
  slug: project.id, // Support the slug property which Server components might expect
  img: imgSrc(project.img),
  additionalImages: project.additionalImages?.map(imgSrc),
}));

/** Find a project by its slug/id string. Returns undefined if not found. */
export function getProjectBySlug(slug) {
  return projectsServerList.find((p) => p.slug === slug);
}

/** All valid slugs — used by generateStaticParams. */
export function getAllProjectSlugs() {
  return projectsServerList.map((p) => p.slug);
}
