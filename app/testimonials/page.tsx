import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";

export const metadata: Metadata = {
  title: "KASA Customer Stories | LMS Testimonials for Coaching Institutes",
  description:
    "Read KASA customer stories from coaching institutes, online academies, trainers, and EdTech teams using one LMS for courses, live classes, payments, learners, and certificates.",
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
          { name: "Customer stories", href: "/testimonials" },
        ]}
      />
      <WebPageStructuredData
        name="KASA Customer Stories"
        description="Customer stories from academy teams using KASA to sell courses, run live batches, manage learners, and issue certificates."
        href="/testimonials"
        pageType="WebPage"
      />
      <PageHero
        eyebrow="Customer stories"
        title="Academy teams use KASA to run cleaner, faster learning businesses."
        description="See how coaching institutes, trainers, and EdTech teams move from scattered course links, payment follow-ups, and manual learner tracking to one branded LMS workspace."
        points={[
          "Course storefront, checkout, and learner access work together",
          "Live batches, replays, reminders, and certificates stay connected",
          "Admins get clearer visibility across courses, payments, and progress",
        ]}
        primaryLabel="Book a Demo"
        variant="solution"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Customer stories" },
        ]}
      />
      <TestimonialsSection />
    </>
  );
}
