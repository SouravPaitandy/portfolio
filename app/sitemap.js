/**
 * app/sitemap.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js App Router sitemap — replaces the old static public/sitemap.xml.
 *
 * Project URLs are derived from the same data source used by:
 *   - generateStaticParams() in app/projects/[slug]/page.jsx
 *   - generateMetadata()     in app/projects/[slug]/page.jsx
 *   - projectsServer.js      (the server-safe data layer)
 *
 * No second manual list is maintained here.
 *
 * Accessible at: https://souravpaitandy.dev/sitemap.xml
 * Referenced by: public/robots.txt → Sitemap: https://souravpaitandy.dev/sitemap.xml
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { getAllProjectSlugs } from "../src/data/projectsServer";
import { i18nConfig } from "../src/i18n-config";

const BASE_URL = "https://souravpaitandy.dev";

export default function sitemap() {
  const slugs = getAllProjectSlugs();
  const locales = i18nConfig.locales;

  /** Static / always-present routes for all locales */
  const staticRoutes = locales.map((locale) => {
    const isDefault = locale === i18nConfig.defaultLocale;
    return {
      url: isDefault ? `${BASE_URL}/` : `${BASE_URL}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    };
  });

  /** Dynamic project detail routes for all locales */
  const projectRoutes = [];
  slugs.forEach((slug) => {
    locales.forEach((locale) => {
      const isDefault = locale === i18nConfig.defaultLocale;
      projectRoutes.push({
        url: isDefault ? `${BASE_URL}/projects/${slug}` : `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    });
  });

  return [...staticRoutes, ...projectRoutes];
}
