import type { Metadata } from "next";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";

export const metadata: Metadata = {
  title: "KASA LMS FAQ | Setup, Pricing, Live Classes, Payments and Support",
  description:
    "Find answers about KASA LMS setup, domain configuration, pricing, Razorpay payments, live classes, learner dashboards, certificates, media, support, and rollout for academies.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <WebPageStructuredData
        name="KASA LMS FAQ"
        description="Answers about KASA LMS setup, pricing, live classes, payments, learners, certificates, and academy rollout."
        href="/faq"
        pageType="WebPage"
      />
      <PageHero
        eyebrow="KASA FAQ"
        title="Questions to clear before you launch your academy on KASA."
        description="Understand how KASA handles setup, branded domains, course selling, live batches, payments, learner access, certificates, media, and support before you book a product tour."
        points={[
          "Setup, domain, payment, and email configuration explained",
          "Live classes, learner dashboards, and certificate workflows covered",
          "Clear next steps for pricing, rollout, and product demo",
        ]}
        primaryLabel="Book a Demo"
        variant="resource"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <FaqSection />
    </>
  );
}
