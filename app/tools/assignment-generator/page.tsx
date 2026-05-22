import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiAssignmentGenerator } from "@/components/tools/ai-assignment-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Assignment Generator - Create Homework, Projects, and Rubrics",
  description:
    "Free AI assignment generator for teachers to create homework assignments, project tasks, marks, rubrics, submission checklists, and learning goals.",
  keywords: [
    "AI assignment generator",
    "homework assignment generator",
    "teacher assignment maker",
    "AI homework generator",
    "assignment rubric generator",
    "project assignment generator",
  ],
  alternates: { canonical: "/tools/assignment-generator" },
  openGraph: {
    title: "AI Assignment Generator - Free Teacher Tool",
    description: "Generate classroom-ready assignments, tasks, rubrics, and submission checklists with AI.",
    url: "/tools/assignment-generator",
  },
};

export default function AssignmentGeneratorPage() {
  const heroKeywords = [
    "AI assignment generator",
    "homework assignment generator",
    "assignment rubric generator",
    "teacher assignment maker",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Assignment Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI assignment generator for teachers to create homework, project work, rubrics, and submission checklists.",
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
              <ToolBreadcrumb current="AI Assignment Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Assignment Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Generate classroom-ready assignments with tasks, marks, learning goals, submission checklist, teacher note, and optional rubric.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={ClipboardList}
              title="Assignment maker with rubric"
              description="Create homework, project work, and practice tasks teachers can share with students."
              points={[
                "Generate brief, learning goals, tasks, and marks.",
                "Add submission checklist and grading rubric.",
                "Print, copy, download, and restore the last assignment.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiAssignmentGenerator />

      <ToolSeoSection
        eyebrow="AI assignment FAQ"
        title="AI assignment generator for teachers"
        description="Use this AI assignment generator to create homework assignments, project work, practice tasks, rubrics, submission checklists, learning goals, and student instructions."
        keywords={[
          "AI assignment generator",
          "homework assignment generator",
          "teacher assignment maker",
          "assignment rubric generator",
          "AI homework generator",
          "project assignment generator",
        ]}
        faqs={[
          {
            question: "What can the AI assignment generator create?",
            answer:
              "It creates an assignment brief, learning goals, tasks with marks, submission checklist, rubric, and teacher note.",
          },
          {
            question: "Can I create project assignments with this tool?",
            answer:
              "Yes. Choose project work as the assignment type and add the topic or syllabus coverage.",
          },
          {
            question: "Can I restore the last generated assignment?",
            answer:
              "Yes. The tool stores the last generated assignment in your browser and shows a restore option when available.",
          },
        ]}
        relatedTools={[
          { href: "/tools/worksheet-generator", label: "AI Worksheet Generator" },
          { href: "/tools/lesson-plan-generator", label: "AI Lesson Plan Generator" },
          { href: "/tools/report-card-generator", label: "AI Report Card Generator" },
        ]}
      />
    </div>
  );
}
