/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── ESLint ────────────────────────────────────────────────────────────────
  // Disable ESLint during `next build` for the skeleton phase.
  // The existing codebase has pre-existing lint errors (unused imports,
  // missing prop-types) that were never enforced by Vite's build.
  // These will be fixed in a dedicated lint-cleanup phase; we don't want
  // them to block the migration skeleton from building.
  // Run `npm run lint` to see the full list at any time.
};

export default nextConfig;
