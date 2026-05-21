import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, CheckCircle2, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { GradeCalculator } from "@/components/tools/grade-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Grade Calculator - Calculate Weighted Grade and Target Score",
  description:
    "Free grade calculator for students to calculate weighted grades, assignment contribution, remaining weight, and required average for a target grade.",
  keywords: [
    "grade calculator",
    "weighted grade calculator",
    "assignment grade calculator",
    "course grade calculator",
    "target grade calculator",
    "current grade calculator",
    "test grade calculator",
    "final grade calculator",
  ],
  alternates: {
    canonical: "/tools/grade-calculator",
  },
  openGraph: {
    title: "Grade Calculator - Free Student Tool",
    description:
      "Calculate current weighted grade, remaining coursework, and target grade requirement instantly.",
    url: "/tools/grade-calculator",
  },
};

const heroKeywords = [
  "weighted grade calculator",
  "course grade calculator",
  "assignment grade calculator",
  "target grade calculator",
];

export default function GradeCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Grade Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free weighted grade calculator for students using marks, total marks, and coursework weights.",
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
                <BarChart3 className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Grade Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Grade Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Add assignments, tests, projects, and their weight to calculate your current weighted
                grade and the average needed in remaining coursework.
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
                    Built for weighted grades
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Useful when assignments, quizzes, midterms, and projects carry different weight.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate weighted contribution for each assessment." />
                <QuickPoint text="See remaining weight and required average for your target." />
                <QuickPoint text="Works for school, college, online courses, and coaching tests." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradeCalculator />

      <section className="relative pb-12">
        <div className={siteContainerClasses()}>
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              Grade basics
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              What a weighted grade means
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              A weighted grade gives different importance to each assignment, test, project, or
              exam. For example, assignments may count for 20%, a midterm for 30%, and the final
              exam for 50%. This is why a simple marks average is not enough when each assessment
              has a different weight in the final grade.
            </p>
          </div>
        </div>
      </section>

      <ToolSeoSection
        eyebrow="Grade calculator FAQ"
        title="Weighted grade calculator for assignments, tests, and projects"
        description="Use this grade calculator to calculate current course grade, assignment contribution, weighted grades, remaining coursework weight, and the average needed to reach a target grade."
        keywords={[
          "weighted grade calculator",
          "course grade calculator",
          "assignment grade calculator",
          "target grade calculator",
          "current grade calculator",
        ]}
        faqs={[
          {
            question: "What is a weighted grade?",
            answer:
              "A weighted grade gives different importance to assignments, tests, projects, and exams based on their percentage weight in the final course grade.",
          },
          {
            question: "How do I calculate a weighted grade?",
            answer:
              "Convert each assessment score to a percentage, multiply it by the assessment weight, and add all weighted contributions together.",
          },
          {
            question: "Can this calculator show what average I need on remaining work?",
            answer:
              "Yes. Enter your target grade and the calculator shows the average needed in the remaining weighted coursework.",
          },
        ]}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
          { href: "/tools/attendance-calculator", label: "Attendance Calculator" },
        ]}
      />
    </div>
  );
}

function QuickPoint({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
