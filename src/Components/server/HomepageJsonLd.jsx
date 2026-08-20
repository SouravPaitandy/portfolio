export function HomepageJsonLd({ lang = "en" }) {
  const isDefault = lang === "en";
  const canonicalUrl = isDefault
    ? "https://souravpaitandy.dev"
    : `https://souravpaitandy.dev/${lang}/`;
  
  const idPrefix = isDefault 
    ? "https://souravpaitandy.dev" 
    : `https://souravpaitandy.dev/${lang}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${idPrefix}/#homepage`,
    url: canonicalUrl,
    name: "Sourav Paitandy | Full Stack Developer",
    isPartOf: { "@id": "https://souravpaitandy.dev/#website" },
    about: { "@id": "https://souravpaitandy.dev/#person" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://souravpaitandy.dev/portfolio-preview.png",
    },
    inLanguage: ["en", "hi", "bn", "es"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
