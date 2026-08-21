import ProjectPage from "../../../../../src/Components/server/ProjectPage";
import { getDictionary } from "../../../../../src/get-dictionary";
import { getAllProjectSlugs, getProjectBySlug } from "../../../../../src/data/projectsServer";
import { i18nConfig } from "../../../../../src/i18n-config";
import { generateProjectMetadata } from "../../../../../src/Components/server/ProjectMetadata";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const nonDefaultLocales = i18nConfig.locales.filter(
    (locale) => locale !== i18nConfig.defaultLocale
  );

  const params = [];
  for (const lang of nonDefaultLocales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  if (!i18nConfig.locales.includes(params.lang) || params.lang === i18nConfig.defaultLocale) {
    return { title: "Not Found" };
  }
  return generateProjectMetadata(params.slug, params.lang);
}

import HexodeCaseStudy from "../../../../../src/Components/server/HexodeCaseStudy";

export default async function LocalizedProjectPage({ params }) {
  const { lang, slug } = params;

  if (!i18nConfig.locales.includes(lang) || lang === i18nConfig.defaultLocale) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const dict = await getDictionary(lang);

  if (slug === "hexode-ide") {
    return <HexodeCaseStudy dict={dict} lang={lang} project={project} slug={slug} />;
  }

  return <ProjectPage dict={dict} lang={lang} project={project} slug={slug} />;
}
