import type { Metadata } from "next";
import { ListingPage } from "@/components/site/listing-page";
import { solutionPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "KASA LMS Solutions for Institutes, Academies, Trainers, and EdTech Teams",
  description:
    "See how KASA supports coaching institutes, online academies, trainers, EdTech startups, and skill development centres with one branded LMS platform.",
  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsIndexPage() {
  return (
    <ListingPage
      eyebrow="KASA solutions"
      title="Find the KASA workflow for your education business."
      description="Different teams search for different outcomes. KASA solution pages explain how the same platform supports institutes, online academies, trainers, EdTech teams, and skill centres."
      pages={solutionPages.map((page) => ({ ...page, href: `/solutions/${page.slug}` }))}
      variant="solution"
    />
  );
}
