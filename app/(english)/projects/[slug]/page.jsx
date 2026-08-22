import ProjectPage from "../../../../src/Components/server/ProjectPage";
import { getDictionary } from "../../../../src/get-dictionary";
import { getAllProjectSlugs, getProjectBySlug } from "../../../../src/data/projectsServer";
import { generateProjectMetadata } from "../../../../src/Components/server/ProjectMetadata";
import { notFound } from "next/navigation";
import HexodeCaseStudy from "../../../../src/Components/server/HexodeCaseStudy";
import DrawSyncCaseStudy from "../../../../src/Components/server/DrawSyncCaseStudy";
import CoordlyCaseStudy from "../../../../src/Components/server/CoordlyCaseStudy";
import { getCaseStudy } from "../../../../src/data/caseStudyResolver";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  return generateProjectMetadata(params.slug, "en");
}

export default async function EnglishProjectPage({ params }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary("en");
  let caseStudyData = null;

  try {
    caseStudyData = await getCaseStudy(slug, "en");
  } catch (e) {
    // Non-case-study projects won't have a resolver dir, ignore.
  }

  if (slug === "hexode-ide" && caseStudyData) {
    return <HexodeCaseStudy dict={dict} lang="en" project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />;
  }
  if (slug === "drawsync" && caseStudyData) {
    return <DrawSyncCaseStudy dict={dict} lang="en" project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />;
  }
  if (slug === "collab-hub" && caseStudyData) {
    return <CoordlyCaseStudy dict={dict} lang="en" project={project} slug={slug} technical={caseStudyData.technical} prose={caseStudyData.prose} />;
  }

  return <ProjectPage dict={dict} lang="en" project={project} slug={slug} />;
}
