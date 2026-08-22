export async function getCaseStudy(slug, lang) {
  const dir = slug === 'hexode-ide' ? 'hexode' : slug === 'collab-hub' ? 'coordly' : slug;
  
  // 1. Load Technical Data
  const technicalModule = await import(`./caseStudies/${dir}/technical.js`);
  const technical = technicalModule.technical;
  
  // 2. Load Localized Prose with fallback to 'en'
  let prose;
  try {
    const proseModule = await import(`./caseStudies/${dir}/${lang}.js`);
    prose = proseModule.default;
  } catch (e) {
    const proseModule = await import(`./caseStudies/${dir}/en.js`);
    prose = proseModule.default;
  }
  
  return { technical, prose };
}
