import { getProjectBySlug } from "../../data/projectsServer";
import { getDictionary } from "../../get-dictionary";

export async function generateProjectMetadata(slug, lang) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Sourav Paitandy",
      description: "The project you are looking for does not exist.",
    };
  }

  const dict = await getDictionary(lang);
  const pContent = dict.projects[project.id];
  
  const title = pContent?.title ?? project.id;
  const shortDescription = pContent?.shortDescription ?? "";
  const description = pContent?.description ?? shortDescription;
  const category = pContent?.category ?? project.category ?? "";

  const pageTitle = `${title} | Sourav Paitandy`;
  const metaDescription =
    description.length > 155 ? `${description.slice(0, 152)}…` : description || shortDescription;

  const canonicalUrl = lang === "en" 
    ? `https://souravpaitandy.dev/projects/${slug}`
    : `https://souravpaitandy.dev/${lang}/projects/${slug}`;

  const ogImage = project.img
    ? {
        url: project.img.startsWith("http")
          ? project.img
          : `https://souravpaitandy.dev${project.img}`,
        width: 1200,
        height: 630,
        alt: `${title} — project screenshot`,
      }
    : {
        url: "https://souravpaitandy.dev/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Sourav Paitandy Portfolio",
      };

  const stackKeywords = project.stack?.join(", ") ?? "";

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: `${title}, ${stackKeywords}, Sourav Paitandy, ${category}, portfolio`,
    authors: [{ name: "Sourav Paitandy" }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": `https://souravpaitandy.dev/projects/${slug}`,
        "hi": `https://souravpaitandy.dev/hi/projects/${slug}`,
        "bn": `https://souravpaitandy.dev/bn/projects/${slug}`,
        "es": `https://souravpaitandy.dev/es/projects/${slug}`,
        "x-default": `https://souravpaitandy.dev/projects/${slug}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Sourav Paitandy Portfolio",
      images: [ogImage],
      type: "website",
      locale: lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      creator: "@PaitandySourav",
      images: [ogImage.url],
    },
  };
}
