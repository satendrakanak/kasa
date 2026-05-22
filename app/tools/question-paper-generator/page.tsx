import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { QuestionPaperGenerator } from "@/components/tools/question-paper-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Question Paper Generator - Create Printable Exam Papers",
  description:
    "Free AI question paper generator for teachers to create printable exam papers with class, subject, syllabus coverage, marks, difficulty, question types, and answer key hints.",
  keywords: [
    "AI question paper generator",
    "question paper generator",
    "AI question paper maker",
    "question paper maker",
    "exam paper generator",
    "AI exam paper generator",
    "printable question paper",
    "teacher question paper generator",
    "question paper with answer key",
  ],
  alternates: { canonical: "/tools/question-paper-generator" },
  openGraph: {
    title: "AI Question Paper Generator - Free Teacher Tool",
    description:
      "Create AI-generated printable question papers with marks distribution, difficulty, syllabus coverage, and answer key hints.",
    url: "/tools/question-paper-generator",
  },
};

export default function QuestionPaperGeneratorPage() {
  const heroKeywords = [
    "AI question paper generator",
    "question paper generator",
    "AI exam paper generator",
    "exam paper generator",
    "question paper maker",
    "paper with answer key",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Question Paper Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI question paper generator for teachers to create printable exam papers with class, subject, syllabus coverage, marks, difficulty, and answer key hints.",
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
              <ToolBreadcrumb current="AI Question Paper Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Question Paper Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a fresh printable exam paper with AI using class, subject, syllabus coverage, marks, difficulty, question type mix, and optional answer key hints.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={ClipboardList}
              title="AI-built for teachers"
              description="Generate a structured paper quickly, then print or download it for class."
              points={[
                "Choose class, subject, syllabus coverage, marks, and time.",
                "Control MCQ, short answer, long answer, and case-based questions.",
                "Generate original questions with optional answer key hints.",
              ]}
            />
          </div>
        </div>
      </section>

      <QuestionPaperGenerator />

      <ToolSeoSection
        eyebrow="AI question paper FAQ"
        title="AI question paper generator for teachers"
        description="Use this AI question paper generator to create printable exam papers, question paper format, class test papers, marks distribution, difficulty levels, syllabus coverage, and answer key hints."
        keywords={[
          "AI question paper generator",
          "question paper generator",
          "AI question paper maker",
          "question paper maker",
          "AI exam paper generator",
          "exam paper generator",
          "printable question paper",
          "question paper with answer key",
        ]}
        faqs={[
          {
            question: "How does the AI question paper generator work?",
            answer:
              "Select class, subject, syllabus coverage, total marks, duration, difficulty, and question type counts. The AI creates a section-wise question paper preview.",
          },
          {
            question: "Can I print only the question paper?",
            answer:
              "Yes. The print button opens a clean print layout with only the question paper and optional answer key, not the full web page.",
          },
          {
            question: "Can this create an answer key?",
            answer:
              "Yes. You can include teacher hints or an answer key section and turn it off whenever you only want the student paper.",
          },
        ]}
        relatedTools={[
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
        ]}
      />
    </div>
  );
}
