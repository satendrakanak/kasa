import type { Metadata } from "next";
import type { PageSummary } from "@/lib/site-content";

const SITE_URL = "https://www.getkasa.in";

export function pageMetadata(page: PageSummary, pathname: string): Metadata {
  const url = `${SITE_URL}${pathname}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type: "website",
      url,
      title: page.title,
      description: page.description,
      siteName: "KASA",
      images: [
        {
          url: "/kasa-hero.png",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/kasa-hero.png"],
    },
  };
}
