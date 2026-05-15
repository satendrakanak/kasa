import type { Metadata } from "next";
import { ListingPage } from "@/components/site/listing-page";
import { resourcePages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "KASA LMS Resources for Online Academy Growth",
  description:
    "Read practical KASA guides for starting an online academy, selling recorded courses, running live classes, LMS SEO, certificates, and course pricing.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesIndexPage() {
  return (
    <ListingPage
      eyebrow="KASA resources"
      title="Practical guides for building and growing an online academy."
      description="Use these resources to plan academy setup, course sales, live classes, certificates, pricing, and SEO before scaling your LMS operations."
      pages={resourcePages.map((page) => ({ ...page, href: `/resources/${page.slug}` }))}
    />
  );
}
