import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { ExamScoreGoalPlanner } from "@/components/tools/exam-score-goal-planner";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Exam Score Goal Planner - Subject Wise Marks Target Calculator",
  description:
    "Free exam score goal planner to set subject-wise marks targets, calculate required marks, and plan an overall exam percentage goal.",
  keywords: [
    "exam score goal planner",
    "subject wise marks target calculator",
    "exam marks target calculator",
    "overall percentage goal calculator",
    "marks goal planner",
  ],
  alternates: { canonical: "/tools/exam-score-goal-planner" },
  openGraph: {
    title: "Exam Score Goal Planner - Free Student Tool",
    description: "Plan subject-wise marks needed to reach your overall exam percentage target.",
    url: "/tools/exam-score-goal-planner",
  },
};

export default function ExamScoreGoalPlannerPage() {
  const heroKeywords = ["exam score goal planner", "marks target calculator", "subject wise marks target", "overall percentage goal"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Exam Score Goal Planner",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free exam score goal planner for students to set subject-wise marks targets.",
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
                <Target className="size-3.5" aria-hidden="true" />
                Marks goal tool
              </div>
              <ToolBreadcrumb current="Exam Score Goal Planner" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Exam Score Goal Planner
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Set subject-wise marks targets and calculate how many marks you need to reach your overall exam percentage goal.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={BarChart3}
              title="Built for score planning"
              description="Move from a vague target to subject-wise marks needed."
              points={[
                "Add expected marks, total marks, and subject targets.",
                "Find the gap between expected and required marks.",
                "Identify the subject that needs the most focus.",
              ]}
            />
          </div>
        </div>
      </section>
      <ExamScoreGoalPlanner />
      <ToolSeoSection
        eyebrow="Score goal FAQ"
        title="Subject-wise exam score goal planner"
        description="Use this exam score goal planner to calculate subject-wise required marks, total expected percentage, and marks needed to reach an overall percentage goal."
        keywords={["exam score goal planner", "subject wise marks target calculator", "marks target calculator", "overall percentage goal calculator"]}
        faqs={[
          { question: "How do I plan subject-wise marks targets?", answer: "Enter expected marks, total marks, and target percentage for each subject. The planner calculates the target marks and the gap for every subject." },
          { question: "Can this help me reach an overall percentage target?", answer: "Yes. Set an overall target percentage and the tool calculates how many more marks are needed across subjects." },
          { question: "Is this different from a marks percentage calculator?", answer: "Yes. A marks percentage calculator shows your current percentage. This planner helps set future score goals subject by subject." },
        ]}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/board-percentage-calculator", label: "Board Percentage Calculator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
        ]}
      />
    </div>
  );
}
