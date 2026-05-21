import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, GraduationCap, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { GpaCalculator } from "@/components/tools/gpa-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "GPA Calculator - Calculate GPA, CGPA, Credits, and Target GPA",
  description:
    "Free GPA calculator for students to calculate GPA or CGPA from subject credits and grades using 4.0 and 10.0 grading scales.",
  keywords: [
    "GPA calculator",
    "CGPA calculator",
    "grade point average calculator",
    "college GPA calculator",
    "semester GPA calculator",
    "credit GPA calculator",
    "10 point CGPA calculator",
    "4.0 GPA calculator",
  ],
  alternates: {
    canonical: "/tools/gpa-calculator",
  },
  openGraph: {
    title: "GPA Calculator - Free Student Tool",
    description:
      "Calculate GPA, CGPA, total credits, weighted grade points, and target GPA instantly.",
    url: "/tools/gpa-calculator",
  },
};

const heroKeywords = [
  "GPA calculator",
  "CGPA calculator",
  "semester GPA calculator",
  "credit weighted GPA",
];

export default function GpaCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GPA Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free GPA and CGPA calculator for students using subject credits and grades.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pt-[10.75rem]">
        <div className={siteContainerClasses()}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All tools
          </Link>

          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <GraduationCap className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="GPA Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                GPA Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Add your subject credits and grades to calculate GPA, CGPA, total credits, and the
                average grade point needed to reach your target.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <div className="rounded-[1.4rem] border border-blue-950/10 bg-white/88 p-5 text-left shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
                  <Target className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                    Built for semester results
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Pick a grading scale, select grades, adjust credits, and see the GPA instantly.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Supports common 4.0 GPA and 10.0 CGPA scales." />
                <QuickPoint text="Credit-weighted GPA calculation for every subject." />
                <QuickPoint text="Target planner shows the average needed in remaining credits." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GpaCalculator />

      <section className="relative pb-12">
        <div className={siteContainerClasses()}>
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                GPA basics
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                What GPA and CGPA mean
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                GPA measures the average grade points earned in a semester or term. CGPA measures
                the cumulative average across multiple semesters, giving a clearer view of overall
                academic performance.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <QuickPoint
                title="GPA"
                text="GPA stands for Grade Point Average. It is usually calculated from subject grade points and credits for one semester or term."
              />
              <QuickPoint
                title="CGPA"
                text="CGPA stands for Cumulative Grade Point Average. It combines grade performance across semesters into one overall score."
              />
              <QuickPoint
                title="Use"
                text="GPA and CGPA are commonly used for result tracking, scholarships, placements, admissions, and academic eligibility checks."
              />
            </div>
          </div>
        </div>
      </section>

      <ToolSeoSection
        eyebrow="GPA calculator FAQ"
        title="GPA and CGPA calculator for semester results"
        description="Use this GPA calculator for credit-weighted semester GPA, cumulative grade point average checks, 4.0 GPA conversion, 10.0 CGPA calculations, and target GPA planning."
        keywords={[
          "semester GPA calculator",
          "CGPA calculator",
          "credit weighted GPA",
          "grade point average calculator",
          "target GPA calculator",
        ]}
        faqs={[
          {
            question: "What is GPA?",
            answer:
              "GPA stands for Grade Point Average. It usually measures average grade points for one semester or term.",
          },
          {
            question: "What is CGPA?",
            answer:
              "CGPA stands for Cumulative Grade Point Average. It combines grade performance across multiple semesters into one overall score.",
          },
          {
            question: "How is credit-weighted GPA calculated?",
            answer:
              "Each subject grade point is multiplied by its credits. The total credit points are divided by total credits to calculate GPA.",
          },
        ]}
        relatedTools={[
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
        ]}
      />
    </div>
  );
}

function QuickPoint({ title, text }: { title?: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      <span>
        {title ? <strong className="block text-slate-950 dark:text-white">{title}</strong> : null}
        {text}
      </span>
    </div>
  );
}
