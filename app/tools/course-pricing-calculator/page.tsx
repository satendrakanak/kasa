import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, IndianRupee, TrendingUp } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { CoursePricingCalculator } from "@/components/tools/course-pricing-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Course Pricing Calculator with AI Strategy - Set Profitable Course Fees",
  description:
    "Free course pricing calculator with AI strategy for academy owners to calculate course price, revenue, profit margin, break-even students, tiers, and launch offers.",
  keywords: [
    "course pricing calculator",
    "online course pricing calculator",
    "AI course pricing strategy",
    "course fee calculator",
    "academy pricing calculator",
    "course profit calculator",
    "online course price calculator",
  ],
  alternates: { canonical: "/tools/course-pricing-calculator" },
  openGraph: {
    title: "Course Pricing Calculator with AI Strategy - Free Academy Owner Tool",
    description: "Calculate profitable course price, revenue, margin, break-even students, and AI launch strategy.",
    url: "/tools/course-pricing-calculator",
  },
};

export default function CoursePricingCalculatorPage() {
  const heroKeywords = [
      "course pricing calculator",
      "AI course pricing strategy",
    "course fee calculator",
    "online course pricing",
    "academy profit margin",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Course Pricing Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free course pricing calculator for academy owners to estimate online course fees, revenue, profit, and break-even students.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pt-[10.75rem]">
        <div className={siteContainerClasses()}>
          <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All tools
          </Link>

          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Course Pricing Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Course Pricing Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate a profitable online course fee using content cost, marketing budget, support cost, platform fee, expected students, target margin, and AI pricing strategy.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={IndianRupee}
              title="Price courses with confidence"
              description="Turn launch costs into a clear selling price, break-even target, AI launch advice, and pricing tiers."
              points={[
                "Calculate recommended course fee per student.",
                "See revenue, net profit, margin, and break-even students.",
                "Generate AI pricing strategy, launch offer, and WhatsApp promo copy.",
              ]}
            />
          </div>
        </div>
      </section>

      <CoursePricingCalculator />

      <ToolSeoSection
        eyebrow="Course pricing FAQ"
        title="How to price an online course profitably"
        description="Use this course pricing calculator with AI strategy to estimate online course fees, enrollment targets, launch cost recovery, profit margin, pricing tiers, launch offers, and promo copy for academies."
        keywords={[
          "course pricing calculator",
          "online course pricing calculator",
          "AI course pricing strategy",
          "course fee calculator",
          "academy pricing calculator",
          "course profit calculator",
        ]}
        faqs={[
          {
            question: "How do I calculate online course price?",
            answer:
              "Add content creation cost, marketing budget, and support cost. Then divide by expected students, adjust for platform fees, and add your target profit margin.",
          },
          {
            question: "What is break-even students in course pricing?",
            answer:
              "Break-even students means the number of paid enrollments needed to recover your total course launch cost at the selected price.",
          },
          {
            question: "Can this calculator help with course pricing tiers?",
            answer:
              "Yes. It suggests starter, recommended, and premium pricing tiers, and the AI strategy can generate launch offers and package positioning.",
          },
        ]}
        relatedTools={[
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/assignment-generator", label: "AI Assignment Generator" },
          { href: "/tools/certificate-generator", label: "Certificate Generator" },
        ]}
      />
    </div>
  );
}
