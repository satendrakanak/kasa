import type { Metadata } from "next";
import { ListingPage } from "@/components/site/listing-page";
import { comparisonPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "KASA LMS Comparisons and Buying Guides",
  description:
    "Compare KASA with custom LMS development, course marketplaces, WordPress LMS plugins, and common LMS buying choices for coaching institutes.",
  alternates: {
    canonical: "/compare",
  },
};

export default function CompareIndexPage() {
  return (
    <ListingPage
      eyebrow="KASA comparisons"
      title="Compare KASA with other ways to build or sell online courses."
      description="These pages help buyers understand when a branded LMS is better than marketplace dependency, plugin stacks, or custom LMS development."
      pages={comparisonPages.map((page) => ({ ...page, href: `/compare/${page.slug}` }))}
    />
  );
}
