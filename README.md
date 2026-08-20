# Sourav Paitandy - Portfolio

This is the official portfolio for Sourav Paitandy, a Full Stack Developer specializing in React, Next.js, Node.js, and AI applications.

## Architecture Migration (Phase 6)

This repository recently underwent a major architectural migration:
**Vite + React SPA → Next.js App Router**

The migration transitions the site from a purely client-side rendered Single Page Application to a modern, server-rendered application with robust SEO and Internationalization.

### Key Features
- **Next.js App Router**: Utilizing Server Components for fast initial loads and SEO.
- **Server-Rendered i18n**: Multi-language support (English, Hindi, Bengali, Spanish) driven by the URL as the absolute source of truth.
- **Dark/Light Theme**: A robust, flash-free (FOUC-prevented) theme system.
- **Dynamic Projects**: Content is loaded securely on the server.

## Local Development

Ensure you have Node.js installed, then run the following:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

## Deployment

This project is optimized for deployment on **Vercel**. 
The repository is fully configured; Vercel will automatically detect the Next.js framework, run `npm run build`, and serve the `.next` output directory. No environment variables are required.

## Technical Debt (Pending Fixes)
- Images have not yet been migrated to `next/image` for WebP optimization.
- Strict ESLint and TypeScript checking is currently bypassed in `next.config.mjs` (`ignoreDuringBuilds: true`) to allow the migration to complete. These should be fixed in a future maintenance phase.
