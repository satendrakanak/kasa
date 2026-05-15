import type { MetadataRoute } from "next";
import { allSeoPages } from "@/lib/site-content";

const SITE_URL = "https://www.getkasa.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/features`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${SITE_URL}/landing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.72,
    },
  ];

  return [
    ...staticPages,
    ...allSeoPages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      lastModified,
      changeFrequency: page.group === "Resources" ? "monthly" : "weekly",
      priority: page.group === "Features" || page.group === "Solutions" ? 0.88 : 0.78,
    }) satisfies MetadataRoute.Sitemap[number]),
  ];
}
