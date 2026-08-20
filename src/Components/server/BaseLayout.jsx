import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Space_Mono,
} from "next/font/google";
import { Providers } from "../../providers";

// ── Font definitions ────────────────────────────────────────────────────────
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// ── Shared Metadata Generator ────────────────────────────────────────────────
export function getBaseMetadata(lang) {
  const canonicalUrl =
    lang === "en" || !lang
      ? "https://souravpaitandy.dev"
      : `https://souravpaitandy.dev/${lang}/`;

  return {
    title:
      "Sourav Paitandy | Full Stack Developer | React, Next.js, Node.js & AI",
    description:
      "Sourav Paitandy is a Full Stack Developer specializing in React, Next.js, Node.js, AI applications, and modern yet scalable web systems. View my portfolio of innovative web applications and contact me for your next project.",
    keywords: [
      "Sourav Paitandy",
      "Full Stack Developer",
      "Web Developer",
      "React Developer",
      "Next.js Developer",
      "Node.js Developer",
      "JavaScript",
      "portfolio",
      "MERN stack",
      "AI Engineer",
      "software engineer India",
    ],
    authors: [{ name: "Sourav Paitandy" }],
    robots: "index, follow",
    manifest: "/manifest.json",
    icons: {
      icon: "/nav-img.png",
      apple: "/nav-img.png",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": "https://souravpaitandy.dev/",
        "hi": "https://souravpaitandy.dev/hi/",
        "bn": "https://souravpaitandy.dev/bn/",
        "es": "https://souravpaitandy.dev/es/",
        "x-default": "https://souravpaitandy.dev/",
      },
    },
    openGraph: {
      type: "website",
      title: "Sourav Paitandy | Full Stack Developer",
      description:
        "Experienced Full Stack Developer specializing in React, Next.js, Node.js, AI and modern web technologies. Creating high-performance digital experiences.",
      url: canonicalUrl,
      siteName: "Sourav Paitandy Portfolio",
      images: [
        {
          url: "https://souravpaitandy.dev/portfolio-preview.png",
          width: 1200,
          height: 630,
          alt: "Sourav Paitandy Portfolio Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sourav Paitandy | Full Stack Developer",
      description:
        "Experienced Full Stack Developer specializing in React, Next.js, Node.js, AI and modern web technologies.",
      images: ["https://souravpaitandy.dev/portfolio-preview.png"],
      creator: "@PaitandySourav",
    },
  };
}

// ── JSON-LD Structured Data ─────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://souravpaitandy.dev/#person",
      name: "Sourav Paitandy",
      url: "https://souravpaitandy.dev",
      image: "https://souravpaitandy.dev/nav-img.png",
      jobTitle: "Full Stack Developer",
      description:
        "Full Stack Developer specializing in React, Next.js, Node.js, AI applications, and modern web technologies.",
      email: "mailto:souravpaitandy@gmail.com",
      nationality: { "@type": "Country", name: "India" },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "NSHM Knowledge Campus, Durgapur, West Bengal, India",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal, India",
        },
      ],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL",
        "Tailwind CSS",
        "REST API",
        "WebSockets",
        "Java",
        "Python",
        "System Design",
        "Artificial Intelligence",
        "Large Language Models",
        "Full Stack Development",
      ],
      sameAs: [
        "https://github.com/SouravPaitandy",
        "https://www.linkedin.com/in/sourav-paitandy/",
        "https://leetcode.com/u/souravpaitandy/",
        "https://www.hackerrank.com/profile/souravpaitandy",
        "https://x.com/PaitandySourav",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://souravpaitandy.dev/#website",
      url: "https://souravpaitandy.dev",
      name: "Sourav Paitandy",
      description: "Official portfolio of Sourav Paitandy.",
      publisher: { "@id": "https://souravpaitandy.dev/#person" },
      inLanguage: ["en", "hi", "bn", "es"],
    },
  ],
};

// ── Shared Root Layout Component ─────────────────────────────────────────────
export function BaseLayout({ children, lang = "en" }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#115e59" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem("themeMode");
                if (theme) {
                  theme = theme.replace(/"/g, '');
                  if (theme === "light" || theme === "dark") {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add("dark");
                  }
                } else {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={[
          plusJakartaSans.variable,
          jetbrainsMono.variable,
          spaceMono.variable,
        ].join(" ")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
