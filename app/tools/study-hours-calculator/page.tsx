import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Clock3 } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { StudyHoursCalculator } from "@/components/tools/study-hours-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Study Hours Calculator - How Many Hours Should I Study Daily?",
  description:
    "Free study hours calculator for students to estimate daily study time from exam days, subjects, chapters, revision time, and confidence level.",
  keywords: [
    "study hours calculator",
    "how many hours should I study",
    "daily study hours calculator",
    "exam preparation hours calculator",
    "study time calculator",
  ],
  alternates: { canonical: "/tools/study-hours-calculator" },
  openGraph: {
    title: "Study Hours Calculator - Free Student Tool",
    description: "Calculate daily study hours and sessions needed before exams.",
    url: "/tools/study-hours-calculator",
  },
};

export default function StudyHoursCalculatorPage() {
  const heroKeywords = ["study hours calculator", "daily study hours", "exam preparation hours", "study time calculator"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Study Hours Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free study hours calculator for students to estimate daily study time before exams.",
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
                <Clock3 className="size-3.5" aria-hidden="true" />
                Study planning tool
              </div>
              <ToolBreadcrumb current="Study Hours Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Study Hours Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate how many hours to study daily based on exam days left, subjects, syllabus load, revision time, and confidence level.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={BookOpenCheck}
              title="Built for exam planning"
              description="Turn syllabus pressure into a clear daily study target."
              points={[
                "Estimate daily hours and sessions before exams.",
                "Include revision time and current confidence level.",
                "Copy or download a simple study hours plan.",
              ]}
            />
          </div>
        </div>
      </section>
      <StudyHoursCalculator />
      <ToolSeoSection
        eyebrow="Study hours FAQ"
        title="How many hours should I study daily?"
        description="Use this study hours calculator to estimate daily study time, sessions per day, weekly study hours, and revision load before exams."
        keywords={["study hours calculator", "daily study hours calculator", "how many hours should I study", "exam preparation calculator"]}
        faqs={[
          { question: "How do I calculate daily study hours?", answer: "Estimate the total syllabus time, add revision time, then divide it by the number of days left before the exam." },
          { question: "Is this different from a study timetable generator?", answer: "Yes. A study hours calculator gives the daily time target. A study timetable generator places those hours into morning, afternoon, or evening sessions." },
          { question: "How many study sessions per day are better?", answer: "Short focused sessions are usually easier to maintain. The calculator estimates sessions based on your selected session length." },
        ]}
        relatedTools={[
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/assignment-deadline-planner", label: "Assignment Deadline Planner" },
        ]}
      />
    </div>
  );
}
