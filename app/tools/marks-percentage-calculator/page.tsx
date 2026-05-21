import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Percent, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { MarksPercentageCalculator } from "@/components/tools/marks-percentage-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Marks Percentage Calculator - Calculate Marks, Grade, and Target",
  description:
    "Free marks percentage calculator to calculate scored marks percentage, grade, required marks, and marks needed for a target percentage.",
  keywords: [
    "marks percentage calculator",
    "percentage calculator for marks",
    "calculate marks percentage",
    "marks to percentage calculator",
    "exam percentage calculator",
    "grade percentage calculator",
    "percentage from total marks",
  ],
  alternates: {
    canonical: "/tools/marks-percentage-calculator",
  },
  openGraph: {
    title: "Marks Percentage Calculator - Free Student Tool",
    description:
      "Calculate marks percentage, grade range, required marks, and target percentage instantly.",
    url: "/tools/marks-percentage-calculator",
  },
};

const heroKeywords = [
  "marks percentage calculator",
  "calculate percentage from marks",
  "marks out of total calculator",
  "exam percentage calculator",
];

export default function MarksPercentageCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Marks Percentage Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free marks percentage calculator for students to calculate percentage, grade, and target marks.",
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
                <Percent className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Marks Percentage Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Marks Percentage Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate your marks percentage, grade range, total marks, and how many marks you need
                to reach a target percentage.
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
                    Built for result checks
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Use one subject or add multiple subjects to calculate your overall percentage.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate percentage from scored marks and total marks." />
                <QuickPoint text="See grade range, marks lost, and marks needed." />
                <QuickPoint text="Set any target percentage from 0% to 100%." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarksPercentageCalculator />

      <ToolSeoSection
        eyebrow="Marks percentage FAQ"
        title="Calculate marks percentage from scored marks and total marks"
        description="This marks percentage calculator targets common student use cases such as exam percentage, subject percentage, total marks percentage, grade range, and required marks for a target score."
        keywords={[
          "marks percentage calculator",
          "exam percentage calculator",
          "calculate percentage from marks",
          "marks out of total calculator",
          "target marks calculator",
        ]}
        faqs={[
          {
            question: "How do I calculate percentage from marks?",
            answer:
              "Divide scored marks by total marks and multiply by 100. For example, 385 out of 500 is 77%.",
          },
          {
            question: "Can this calculator show marks needed for a target percentage?",
            answer:
              "Yes. Set a target percentage and the calculator shows the minimum marks required and how many more marks are needed.",
          },
          {
            question: "Is marks percentage different from a grade calculator?",
            answer:
              "Yes. Marks percentage uses scored marks and total marks, while a grade calculator can include weighted assignments, projects, and exams.",
          },
        ]}
        relatedTools={[
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
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
