import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Target, Trophy } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { FinalExamCalculator } from "@/components/tools/final-exam-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Final Exam Calculator - What Do I Need on My Final?",
  description:
    "Free final exam calculator to find the score needed on your final exam to reach a target course grade, pass a class, or calculate final grade after the exam.",
  keywords: [
    "final exam calculator",
    "final grade calculator",
    "what do I need on my final",
    "final exam score calculator",
    "required final exam grade calculator",
    "final exam weight calculator",
    "passing grade calculator",
    "calculate final grade after exam",
  ],
  alternates: {
    canonical: "/tools/final-exam-calculator",
  },
  openGraph: {
    title: "Final Exam Calculator - Free Student Tool",
    description:
      "Calculate the final exam score needed to reach your target course grade or passing grade.",
    url: "/tools/final-exam-calculator",
  },
};

export default function FinalExamCalculatorPage() {
  const heroKeywords = [
    "final exam calculator",
    "what do I need on my final",
    "final grade calculator",
    "required final exam score",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Final Exam Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free final exam calculator for students to calculate the score needed on a final exam to reach a target course grade.",
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
                <Trophy className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Final Exam Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Final Exam Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Find out what score you need on your final exam to reach a target course grade,
                pass a class, or protect your current grade.
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
                    Built for final exam targets
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Enter your current grade, target grade, and final exam weight to calculate the
                    required final exam score instantly.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate what you need on your final exam." />
                <QuickPoint text="Check if your target grade is possible or out of reach." />
                <QuickPoint text="See final grade outcomes for different exam scores." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalExamCalculator />

      <ToolSeoSection
        eyebrow="Final exam calculator FAQ"
        title="What do I need on my final exam?"
        description="Use this final exam calculator to answer common student questions like what score do I need on my final, what final exam grade is required to pass, and how final exam weight affects the final course grade."
        keywords={[
          "final exam calculator",
          "what do I need on my final",
          "final grade calculator",
          "required final exam score",
          "passing grade calculator",
        ]}
        faqs={[
          {
            question: "How do I calculate what I need on my final exam?",
            answer:
              "Subtract the current grade contribution from your target final grade, then divide by the final exam weight.",
          },
          {
            question: "What if the required final exam score is above 100%?",
            answer:
              "If the required score is above 100%, the selected target grade is not possible with the current grade and final exam weight.",
          },
          {
            question: "Is this different from a marks percentage calculator?",
            answer:
              "Yes. A marks percentage calculator converts scored marks into a percentage. A final exam calculator uses current grade, target grade, and final exam weight to calculate the required exam score.",
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

function QuickPoint({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
