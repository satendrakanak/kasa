import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiWorksheetGenerator } from "@/components/tools/ai-worksheet-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Worksheet Generator - Create Printable Practice Worksheets",
  description:
    "Free AI worksheet generator for teachers to create printable worksheets with practice questions, marks, sections, difficulty, and answer key.",
  keywords: [
    "AI worksheet generator",
    "worksheet generator",
    "printable worksheet generator",
    "teacher worksheet maker",
    "practice worksheet generator",
    "worksheet with answer key",
  ],
  alternates: { canonical: "/tools/worksheet-generator" },
  openGraph: {
    title: "AI Worksheet Generator - Free Teacher Tool",
    description: "Generate printable practice worksheets with sections, marks, questions, and answer keys.",
    url: "/tools/worksheet-generator",
  },
};

export default function WorksheetGeneratorPage() {
  const heroKeywords = [
    "AI worksheet generator",
    "printable worksheet generator",
    "teacher worksheet maker",
    "worksheet with answer key",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Worksheet Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI worksheet generator for teachers to create printable practice worksheets with questions, marks, and answer keys.",
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
              <ToolBreadcrumb current="AI Worksheet Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Worksheet Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create printable worksheets with AI using class, subject, syllabus coverage, question types, difficulty, marks, and optional answer key.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={ClipboardList}
              title="AI-built worksheet maker"
              description="Generate printable practice sheets teachers can use in class or homework."
              points={[
                "Create sections with clear instructions and marks.",
                "Choose short answers, fill blanks, MCQs, and word problems.",
                "Print, copy, download, and restore the last worksheet.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiWorksheetGenerator />

      <ToolSeoSection
        eyebrow="AI worksheet FAQ"
        title="AI worksheet generator for teachers"
        description="Use this AI worksheet generator to create printable worksheets, practice questions, homework worksheets, revision sheets, answer keys, marks distribution, and classroom practice material."
        keywords={[
          "AI worksheet generator",
          "worksheet generator",
          "printable worksheet generator",
          "practice worksheet generator",
          "teacher worksheet maker",
          "worksheet with answer key",
        ]}
        faqs={[
          {
            question: "How does the AI worksheet generator work?",
            answer:
              "Select class, subject, syllabus coverage, worksheet type, difficulty, question count, and question types. The AI creates a printable worksheet with sections and marks.",
          },
          {
            question: "Can I generate a worksheet with answers?",
            answer:
              "Yes. Keep answer key enabled to generate teacher answers along with the worksheet.",
          },
          {
            question: "Can I restore my last worksheet after refresh?",
            answer:
              "Yes. The tool stores your last generated worksheet in your browser and can restore it later.",
          },
        ]}
        relatedTools={[
          { href: "/tools/quiz-generator", label: "AI Quiz Generator" },
          { href: "/tools/question-paper-generator", label: "AI Question Paper Generator" },
          { href: "/tools/lesson-plan-generator", label: "AI Lesson Plan Generator" },
        ]}
      />
    </div>
  );
}
