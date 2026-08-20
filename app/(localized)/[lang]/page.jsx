import HomePage from "../../../src/Components/server/HomePage";
import { getDictionary } from "../../../src/get-dictionary";
import { i18nConfig } from "../../../src/i18n-config";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  // Exclude defaultLocale from localized routes since it's served at the root `/`
  return i18nConfig.locales
    .filter((locale) => locale !== i18nConfig.defaultLocale)
    .map((locale) => ({ lang: locale }));
}

export default async function LocalizedHome({ params }) {
  const { lang } = params;

  if (!i18nConfig.locales.includes(lang) || lang === i18nConfig.defaultLocale) {
    notFound();
  }

  const dict = await getDictionary(lang);
  return <HomePage dict={dict} lang={lang} />;
}
