import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://getkasa.in/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://getkasa.in/#features",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://getkasa.in/#pricing",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
