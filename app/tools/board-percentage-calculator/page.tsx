import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Percent } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { BoardPercentageCalculator } from "@/components/tools/board-percentage-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Class 10/12 Board Percentage Calculator - Best of Five Marks",
  description:
    "Free Class 10 and Class 12 board percentage calculator with best of five, all subjects, total marks, percentage, and grade range.",
  keywords: [
    "board percentage calculator",
    "class 10 percentage calculator",
    "class 12 percentage calculator",
    "best of five percentage calculator",
    "CBSE percentage calculator",
    "marks percentage calculator",
  ],
  alternates: { canonical: "/tools/board-percentage-calculator" },
  openGraph: {
    title: "Class 10/12 Board Percentage Calculator - Free Student Tool",
    description: "Calculate board exam percentage using all subjects or best of five subjects.",
    url: "/tools/board-percentage-calculator",
  },
};

export default function BoardPercentageCalculatorPage() {
  const heroKeywords = ["board percentage calculator", "class 10 percentage", "class 12 percentage", "best of five calculator"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Board Percentage Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free Class 10 and Class 12 board percentage calculator with best of five option.",
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
                <GraduationCap className="size-3.5" aria-hidden="true" />
                Board exam tool
              </div>
              <ToolBreadcrumb current="Board Percentage Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Class 10/12 Board Percentage Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate board exam percentage using all subjects or best of five subjects with total marks, grade range, and subject-wise breakdown.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={Percent}
              title="Built for board results"
              description="Calculate your percentage clearly after Class 10 or Class 12 marks."
              points={[
                "Add subjects with scored marks and total marks.",
                "Switch between best of five and all subjects.",
                "Copy or download your board percentage result.",
              ]}
            />
          </div>
        </div>
      </section>
      <BoardPercentageCalculator />
      <ToolSeoSection
        eyebrow="Board percentage FAQ"
        title="Class 10 and Class 12 percentage calculator"
        description="Use this board percentage calculator for Class 10, Class 12, best of five percentage, all subjects percentage, and grade range calculation."
        keywords={["board percentage calculator", "class 10 percentage calculator", "class 12 percentage calculator", "best of five percentage calculator"]}
        faqs={[
          { question: "How do I calculate board percentage?", answer: "Add marks scored in selected subjects, divide by total marks, and multiply by 100." },
          { question: "What is best of five percentage?", answer: "Best of five percentage uses the five highest scoring subjects instead of all subjects. Rules may vary by board or institution." },
          { question: "Can I use this for CBSE Class 10 or Class 12?", answer: "Yes. You can enter CBSE marks or any board marks, then choose best of five or all subjects as needed." },
        ]}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/cgpa-percentage-converter", label: "CGPA to Percentage Converter" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
        ]}
      />
    </div>
  );
}
