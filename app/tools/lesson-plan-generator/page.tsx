import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiLessonPlanGenerator } from "@/components/tools/ai-lesson-plan-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Lesson Plan Generator - Create Teacher Lesson Plans",
  description:
    "Free AI lesson plan generator for teachers to create objectives, classroom activities, lesson flow, assessment, homework, and differentiation.",
  keywords: [
    "AI lesson plan generator",
    "lesson plan generator",
    "lesson plan maker",
    "teacher lesson plan generator",
    "AI lesson planner",
    "classroom lesson plan",
  ],
  alternates: { canonical: "/tools/lesson-plan-generator" },
  openGraph: {
    title: "AI Lesson Plan Generator - Free Teacher Tool",
    description:
      "Generate structured lesson plans with objectives, activities, assessment, homework, and differentiation.",
    url: "/tools/lesson-plan-generator",
  },
};

export default function LessonPlanGeneratorPage() {
  const heroKeywords = [
    "AI lesson plan generator",
    "lesson plan generator",
    "teacher lesson plan maker",
    "classroom lesson planner",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Lesson Plan Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI lesson plan generator for teachers to create classroom-ready lesson plans with objectives, activities, assessment, and homework.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pt-[10.75rem]">
        <div className={siteContainerClasses()}>
          <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All AI tools
          </Link>

          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <span className="relative grid size-4 place-items-center rounded-full bg-primary/10 text-primary dark:bg-emerald-300/10 dark:text-emerald-200">
                  <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
                </span>
                AI teacher tool
              </div>
              <ToolBreadcrumb current="AI Lesson Plan Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Lesson Plan Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a classroom-ready lesson plan with AI using class, subject, topic, duration, teaching style, learning objectives, activities, assessment, and homework.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={BookOpenCheck}
              title="AI-built lesson planner"
              description="Generate structured lesson plans teachers can print, save, and adapt."
              points={[
                "Create objectives, warm-up, lesson flow, closure, and homework.",
                "Plan teacher actions and student activities by time.",
                "Save, restore, print, copy, or download the generated plan.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiLessonPlanGenerator />

      <ToolSeoSection
        eyebrow="AI lesson plan FAQ"
        title="AI lesson plan generator for teachers"
        description="Use this AI lesson plan generator to create teacher lesson plans, classroom activities, learning objectives, lesson flow, formative assessment, homework, differentiation, and closure."
        keywords={[
          "AI lesson plan generator",
          "lesson plan generator",
          "teacher lesson plan generator",
          "lesson plan maker",
          "AI lesson planner",
          "classroom lesson plan",
        ]}
        faqs={[
          {
            question: "How does the AI lesson plan generator work?",
            answer:
              "Select class, subject, topic or syllabus coverage, duration, teaching style, class level, homework, and assessment options. The AI creates a structured lesson plan.",
          },
          {
            question: "Can I print only the lesson plan?",
            answer:
              "Yes. The print button opens a clean lesson-plan-only layout, not the full web page.",
          },
          {
            question: "Can I restore my last generated lesson plan?",
            answer:
              "Yes. The tool stores your last generated lesson plan in your browser and can restore it after refresh.",
          },
        ]}
        relatedTools={[
          { href: "/tools/quiz-generator", label: "AI Quiz Generator" },
          { href: "/tools/question-paper-generator", label: "AI Question Paper Generator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
        ]}
      />
    </div>
  );
}
