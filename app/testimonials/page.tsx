import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";

export const metadata: Metadata = {
  title: "KASA LMS Use Cases for Coaching Institutes and Academies",
  description:
    "Explore KASA LMS use cases for coaching institutes, online academies, trainers, and EdTech teams managing courses, live classes, payments, learners, and certificates.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: "Use cases", href: "/testimonials" },
        ]}
      />
      <WebPageStructuredData
        name="KASA LMS Use Cases"
        description="Use cases for academy teams using KASA to sell courses, run live batches, manage learners, and issue certificates."
        href="/testimonials"
        pageType="WebPage"
      />
      <PageHero
        eyebrow="Use cases"
        title="Academy teams can use KASA to run cleaner, faster learning operations."
        description="See how coaching institutes, trainers, and EdTech teams can move from scattered course links, payment follow-ups, and manual learner tracking to one branded LMS workspace."
        points={[
          "Course storefront, checkout, and learner access work together",
          "Live batches, replays, reminders, and certificates stay connected",
          "Admins get clearer visibility across courses, payments, and progress",
        ]}
        primaryLabel="Book a Demo"
        variant="solution"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Use cases" },
        ]}
      />
      <TestimonialsSection />
    </>
  );
}
