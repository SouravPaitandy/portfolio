import ProjectPage from "../../../../../src/Components/server/ProjectPage";
import { getDictionary } from "../../../../../src/get-dictionary";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "../../../../../src/data/projectsServer";
import { i18nConfig } from "../../../../../src/i18n-config";
import { generateProjectMetadata } from "../../../../../src/Components/server/ProjectMetadata";
import { notFound } from "next/navigation";

import HexodeCaseStudy from "../../../../../src/Components/server/HexodeCaseStudy";
import DrawSyncCaseStudy from "../../../../../src/Components/server/DrawSyncCaseStudy";
import CoordlyCaseStudy from "../../../../../src/Components/server/CoordlyCaseStudy";
import { getCaseStudy } from "../../../../../src/data/caseStudyResolver";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const nonDefaultLocales = i18nConfig.locales.filter(
    (locale) => locale !== i18nConfig.defaultLocale,
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
  if (
    !i18nConfig.locales.includes(params.lang) ||
    params.lang === i18nConfig.defaultLocale
  ) {
    return { title: "Not Found" };
  }
  return generateProjectMetadata(params.slug, params.lang);
}

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
  let caseStudyData = null;

  try {
    caseStudyData = await getCaseStudy(slug, lang);
  } catch (e) {
    // Non-case-study projects won't have a resolver dir, ignore.
  }

  if (slug === "hexode-ide" && caseStudyData) {
    return (
      <HexodeCaseStudy dict={dict} lang={lang} project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />
    );
  }

  if (slug === "drawsync" && caseStudyData) {
    return (
      <DrawSyncCaseStudy dict={dict} lang={lang} project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />
    );
  }

  if (slug === "collab-hub" && caseStudyData) {
    return (
      <CoordlyCaseStudy dict={dict} lang={lang} project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />
    );
  }

  return <ProjectPage dict={dict} lang={lang} project={project} slug={slug} />;
}
