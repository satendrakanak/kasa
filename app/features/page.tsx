import type { Metadata } from "next";
import { ListingPage } from "@/components/site/listing-page";
import { featurePages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "KASA LMS Features for Online Academies and Coaching Institutes",
  description:
    "Explore KASA LMS features for course selling, live classes, payments, certificates, learner dashboards, education CRM, and admin reporting.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesIndexPage() {
  return (
    <ListingPage
      eyebrow="KASA features"
      title="Explore every major KASA LMS feature in one place."
      description="From course selling and live classes to certificates, payments, CRM, and admin reporting, these pages explain the workflows KASA brings together for modern academy teams."
      pages={featurePages.map((page) => ({ ...page, href: `/features/${page.slug}` }))}
      variant="feature"
    />
  );
}
