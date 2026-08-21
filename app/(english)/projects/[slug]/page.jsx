import ProjectPage from "../../../../src/Components/server/ProjectPage";
import { getDictionary } from "../../../../src/get-dictionary";
import { getAllProjectSlugs, getProjectBySlug } from "../../../../src/data/projectsServer";
import { generateProjectMetadata } from "../../../../src/Components/server/ProjectMetadata";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  return generateProjectMetadata(params.slug, "en");
}

import HexodeCaseStudy from "../../../../src/Components/server/HexodeCaseStudy";

export default async function EnglishProjectPage({ params }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary("en");

  if (slug === "hexode-ide") {
    return <HexodeCaseStudy dict={dict} lang="en" project={project} slug={slug} />;
  }

  return <ProjectPage dict={dict} lang="en" project={project} slug={slug} />;
}
