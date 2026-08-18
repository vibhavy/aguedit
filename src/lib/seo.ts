import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Build per-page Metadata with sensible SEO defaults: canonical URL, Open
 * Graph, Twitter card, and a dynamically generated OG image. Pass a page
 * title/description/path and everything else is derived.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
  ogImage,
  keywords,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  keywords?: readonly string[];
} = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const images = [
    {
      url: ogImage ?? "/og-aguedit-light.png",
      width: 1200,
      height: 630,
      alt: resolvedTitle,
    },
  ];

  return {
    title: resolvedTitle,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images,
    },
  };
}

/** JSON-LD for the software product — powers rich results for the app. */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    alternateName: "Agu Edit",
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: new URL("/download", siteConfig.url).toString(),
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Code editor for coding agents",
    operatingSystem: "macOS 12 or later",
    isAccessibleForFree: true,
    featureList: [
      "Claude Code and Codex in one editor",
      "Shared local project memory",
      "Cross-agent conversation handoff",
      "Monaco code editing and diffs",
      "Persistent terminal tabs",
      "Multi-repository Git workflows",
      "AI coding plans and task management",
      "Live token and context visibility",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: new URL("/download", siteConfig.url).toString(),
    },
    softwareRequirements: "macOS 12 or later",
    author: {
      "@type": "Organization",
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  };
}

/** WebSite identity helps search engines distinguish the product and brand. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "Agu Edit",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  };
}

/** Breadcrumb trail for search results on indexable secondary pages. */
export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
) {
  const trail = [{ name: siteConfig.name, path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

/** JSON-LD Organization node for brand / knowledge-panel signals. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL("/aguedit-icon.png", siteConfig.url).toString(),
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.x,
      siteConfig.socials.discord,
    ],
  };
}

/** JSON-LD FAQPage — eligible for FAQ rich results in search. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
