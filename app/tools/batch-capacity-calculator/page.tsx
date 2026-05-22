import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, UsersRound } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { BatchCapacityCalculator } from "@/components/tools/batch-capacity-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Batch Capacity Calculator - Coaching Class Seats and Revenue Planner",
  description:
    "Use this free batch capacity calculator for coaching institutes, online academies, and training centres to estimate seats, batches, teacher load, occupancy, waiting list, and revenue potential.",
  keywords: [
    "batch capacity calculator",
    "coaching batch capacity calculator",
    "classroom capacity calculator",
    "academy capacity planner",
    "student capacity calculator",
    "coaching seats calculator",
    "batch revenue calculator",
    "teacher load calculator",
  ],
  alternates: { canonical: "/tools/batch-capacity-calculator" },
  openGraph: {
    title: "Batch Capacity Calculator - Free Academy Owner Tool",
    description: "Calculate student capacity, available seats, teacher load, occupancy, and revenue potential for academy batches.",
    url: "/tools/batch-capacity-calculator",
  },
};

export default function BatchCapacityCalculatorPage() {
  const heroKeywords = [
    "batch capacity calculator",
    "coaching seats calculator",
    "classroom capacity calculator",
    "student capacity planner",
    "batch revenue calculator",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Batch Capacity Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free batch capacity calculator for coaching institutes and academies to estimate student seats, teacher load, occupancy, and revenue potential.",
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
                <UsersRound className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Batch Capacity Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Batch Capacity Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate academy batch capacity from classrooms, seats, teachers, batches per day, working days, current students, occupancy target, and monthly fee.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={BarChart3}
              title="Plan seats before admissions fill up"
              description="Estimate how many students your academy can serve without overloading rooms, teachers, or batch schedules."
              points={[
                "Calculate max capacity, target seats, utilization, and available seats.",
                "Estimate current revenue, target revenue, and remaining revenue room.",
                "Compare offline, online live, and hybrid batch capacity.",
              ]}
            />
          </div>
        </div>
      </section>

      <BatchCapacityCalculator />

      <ToolSeoSection
        eyebrow="Batch capacity FAQ"
        title="Plan coaching batch capacity and available seats"
        description="Use this free batch capacity calculator to estimate classroom seats, online batch capacity, teacher load, occupancy rate, available seats, waiting list pressure, and revenue potential for coaching institutes, online academies, schools, and training centres."
        keywords={[
          "batch capacity calculator",
          "coaching batch capacity calculator",
          "classroom capacity calculator",
          "academy capacity planner",
          "student capacity calculator",
          "batch revenue calculator",
        ]}
        faqs={[
          {
            question: "How do I calculate batch capacity?",
            answer:
              "Multiply classrooms or live rooms by seats per room and batches per day, then adjust for teacher availability and your target occupancy percentage.",
          },
          {
            question: "What is a good occupancy target for coaching batches?",
            answer:
              "Many academies plan around 75% to 90% occupancy so batches feel full without becoming uncomfortable or difficult to manage.",
          },
          {
            question: "Can this calculator estimate revenue potential?",
            answer:
              "Yes. It multiplies current students and target students by average monthly fee to show current revenue, target revenue, and remaining revenue room.",
          },
        ]}
        relatedTools={[
          { href: "/tools/profit-calculator", label: "Academy Profit Calculator" },
          { href: "/tools/admission-form-generator", label: "Admission Form Generator" },
          { href: "/tools/fee-receipt-generator", label: "Fee Receipt Generator" },
        ]}
      />
    </div>
  );
}
