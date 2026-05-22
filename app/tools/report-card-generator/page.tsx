import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck2, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiReportCardGenerator } from "@/components/tools/ai-report-card-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Report Card Generator - Teacher Remarks and Parent Comments",
  description:
    "Free AI report card generator for teachers to create polished student remarks, parent comments, strengths, improvement plans, and next steps.",
  keywords: [
    "AI report card generator",
    "report card remarks generator",
    "teacher comments generator",
    "student report card comments",
    "parent teacher remarks generator",
    "AI student remarks",
  ],
  alternates: { canonical: "/tools/report-card-generator" },
  openGraph: {
    title: "AI Report Card Generator - Free Teacher Tool",
    description: "Generate teacher remarks, parent notes, strengths, and improvement plans with AI.",
    url: "/tools/report-card-generator",
  },
};

export default function ReportCardGeneratorPage() {
  const heroKeywords = [
    "AI report card generator",
    "teacher comments generator",
    "report card remarks",
    "student progress comments",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Report Card Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI report card generator for teachers to create student remarks, parent comments, strengths, and improvement plans.",
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
              <ToolBreadcrumb current="AI Report Card Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Report Card Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create polished report card remarks, parent comments, strengths, improvement plans, and next steps from simple teacher inputs.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={FileCheck2}
              title="AI-written teacher remarks"
              description="Turn performance, attendance, conduct, and teacher notes into useful parent-friendly comments."
              points={[
                "Generate overall remarks, parent notes, and next steps.",
                "Use sliders and chips instead of long manual writing.",
                "Print, copy, download, and restore the last report card.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiReportCardGenerator />

      <ToolSeoSection
        eyebrow="AI report card FAQ"
        title="AI report card generator for teachers"
        description="Use this AI report card generator to create teacher comments, student progress remarks, parent-friendly notes, improvement plans, strengths, and next steps for report cards."
        keywords={[
          "AI report card generator",
          "report card remarks generator",
          "teacher comments generator",
          "student report card comments",
          "parent teacher remarks",
          "AI student remarks",
        ]}
        faqs={[
          {
            question: "What does the AI report card generator create?",
            answer:
              "It creates an overall remark, parent note, student strengths, improvement plan, next steps, and a teacher closing line.",
          },
          {
            question: "Can teachers change the tone of report card comments?",
            answer:
              "Yes. Teachers can choose formal, warm, balanced, or improvement-focused tone before generating remarks.",
          },
          {
            question: "Can I restore my last generated report card?",
            answer:
              "Yes. The tool stores the last generated report card in your browser and shows a restore option when available.",
          },
        ]}
        relatedTools={[
          { href: "/tools/lesson-plan-generator", label: "AI Lesson Plan Generator" },
          { href: "/tools/worksheet-generator", label: "AI Worksheet Generator" },
          { href: "/tools/quiz-generator", label: "AI Quiz Generator" },
        ]}
      />
    </div>
  );
}
