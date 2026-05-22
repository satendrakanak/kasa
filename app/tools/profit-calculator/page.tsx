import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, IndianRupee, TrendingUp } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AcademyProfitCalculator } from "@/components/tools/academy-profit-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Academy Profit Calculator with AI Strategy - Coaching Institute Profit",
  description:
    "Free academy profit calculator with AI strategy for coaching owners to calculate monthly revenue, expenses, net profit, profit margin, break-even students, and growth ideas.",
  keywords: [
    "academy profit calculator",
    "coaching institute profit calculator",
    "coaching business profit calculator",
    "tuition centre profit calculator",
    "online academy profit calculator",
    "monthly profit calculator",
    "coaching business profit margin",
    "AI profit strategy",
  ],
  alternates: { canonical: "/tools/profit-calculator" },
  openGraph: {
    title: "Academy Profit Calculator with AI Strategy - Free Academy Owner Tool",
    description: "Calculate academy revenue, expenses, net profit, margin, break-even students, and AI profit strategy.",
    url: "/tools/profit-calculator",
  },
};

export default function ProfitCalculatorPage() {
  const heroKeywords = [
    "academy profit calculator",
    "coaching institute profit calculator",
    "monthly profit calculator",
    "break-even students",
    "AI profit strategy",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Academy Profit Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free academy profit calculator for coaching owners to estimate monthly revenue, expenses, net profit, margin, and break-even students.",
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
              <ToolBreadcrumb current="Academy Profit Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Academy Profit Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate coaching institute profit from active students, average fee, teacher salary, rent, marketing spend, platform cost, tax reserve, and AI profit strategy.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={IndianRupee}
              title="Know your real monthly profit"
              description="Turn academy revenue and expenses into clear profit, margin, break-even, cost warnings, and AI growth actions."
              points={[
                "Calculate monthly revenue, expenses, net profit, and profit margin.",
                "Find break-even students at your current average fee.",
                "Generate AI profit moves, cost warnings, and growth ideas.",
              ]}
            />
          </div>
        </div>
      </section>

      <AcademyProfitCalculator />

      <ToolSeoSection
        eyebrow="Academy profit FAQ"
        title="How to calculate coaching institute profit"
        description="Use this academy profit calculator with AI strategy to estimate monthly revenue, total expenses, tax reserve, net profit, profit margin, break-even students, cost pressure, and growth actions for coaching centres and online academies."
        keywords={[
          "academy profit calculator",
          "coaching institute profit calculator",
          "tuition centre profit calculator",
          "monthly profit calculator",
          "coaching business profit margin",
          "AI profit strategy",
        ]}
        faqs={[
          {
            question: "How do I calculate academy profit?",
            answer:
              "Multiply active students by average monthly fee to get revenue. Then subtract teacher salary, rent, marketing, platform cost, other expenses, and tax or reserve amount.",
          },
          {
            question: "What is break-even students for a coaching institute?",
            answer:
              "Break-even students means the number of paid students needed to cover monthly expenses at your current average fee.",
          },
          {
            question: "Can this calculator help improve academy profit margin?",
            answer:
              "Yes. It shows expense ratio, break-even students, and AI strategy suggestions for fee collection, cost control, retention, referrals, and high-margin offers.",
          },
        ]}
        relatedTools={[
          { href: "/tools/course-pricing-calculator", label: "Course Pricing Calculator" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/assignment-generator", label: "AI Assignment Generator" },
        ]}
      />
    </div>
  );
}
