import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, PiggyBank, ShieldCheck } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { ScholarshipEligibilityCalculator } from "@/components/tools/scholarship-eligibility-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Scholarship Eligibility Calculator - Check Student Eligibility",
  description:
    "Free scholarship eligibility calculator for students to check marks, income, category, course level, and common scholarship filters before applying.",
  keywords: [
    "scholarship eligibility calculator",
    "student scholarship eligibility",
    "scholarship income limit calculator",
    "scholarship marks eligibility",
    "India scholarship eligibility checker",
  ],
  alternates: { canonical: "/tools/scholarship-eligibility-calculator" },
  openGraph: {
    title: "Scholarship Eligibility Calculator - Free Student Tool",
    description: "Check common scholarship eligibility filters using marks, income, category, and course level.",
    url: "/tools/scholarship-eligibility-calculator",
  },
};

export default function ScholarshipEligibilityCalculatorPage() {
  const heroKeywords = [
    "scholarship eligibility calculator",
    "scholarship income limit",
    "student scholarship checker",
    "scholarship marks eligibility",
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scholarship Eligibility Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free scholarship eligibility calculator for students using marks, income, category, and course level.",
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
                <PiggyBank className="size-3.5" aria-hidden="true" />
                Scholarship tool
              </div>
              <ToolBreadcrumb current="Scholarship Eligibility Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Scholarship Eligibility Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Check common scholarship filters using marks, annual family income, category, course level, and applicant status before you apply.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <HeroCard
              icon={ShieldCheck}
              title="Built for scholarship planning"
              points={[
                "Estimate eligibility before starting a long application.",
                "Compare marks and income against common scholarship filters.",
                "Copy, print, or download the result for document planning.",
              ]}
            />
          </div>
        </div>
      </section>

      <ScholarshipEligibilityCalculator />

      <ToolSeoSection
        eyebrow="Scholarship FAQ"
        title="Scholarship eligibility checker for students"
        description="Use this scholarship eligibility calculator to estimate common scholarship filters such as marks percentage, annual income limit, category, and course level."
        keywords={["scholarship eligibility calculator", "student scholarship checker", "scholarship income limit", "scholarship marks eligibility"]}
        faqs={[
          {
            question: "Is this scholarship eligibility calculator official?",
            answer: "No. It is a planning tool for common eligibility filters. Students should always verify rules on the official scholarship portal or scheme notification.",
          },
          {
            question: "What details are needed to check scholarship eligibility?",
            answer: "Most scholarship schemes use marks, annual family income, category, course level, institute type, documents, and residency rules.",
          },
          {
            question: "Can this tool guarantee scholarship approval?",
            answer: "No. Final approval depends on official rules, document verification, institute validation, and available scholarship seats or funds.",
          },
        ]}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/board-percentage-calculator", label: "Board Percentage Calculator" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
        ]}
      />
    </div>
  );
}

function HeroCard({ icon: Icon, title, points }: { icon: typeof ShieldCheck; title: string; points: string[] }) {
  return (
    <div className="rounded-[1.4rem] border border-blue-950/10 bg-white/88 p-5 text-left shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">A simple eligibility estimate students can understand before collecting documents.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {points.map((point) => (
          <div key={point} className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
