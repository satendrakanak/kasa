import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ListChecks, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiQuizGenerator } from "@/components/tools/ai-quiz-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Quiz Generator - Create Online Quizzes and Answer Keys",
  description:
    "Free AI quiz generator for teachers to create classroom quizzes, MCQs, true or false questions, short answer questions, answer keys, and explanations.",
  keywords: [
    "AI quiz generator",
    "quiz generator",
    "online quiz generator",
    "MCQ quiz generator",
    "AI MCQ generator",
    "teacher quiz maker",
    "quiz with answer key",
    "classroom quiz generator",
  ],
  alternates: { canonical: "/tools/quiz-generator" },
  openGraph: {
    title: "AI Quiz Generator - Free Teacher Tool",
    description:
      "Generate classroom quizzes with MCQs, true or false questions, short answers, answer keys, and explanations.",
    url: "/tools/quiz-generator",
  },
};

export default function QuizGeneratorPage() {
  const heroKeywords = [
    "AI quiz generator",
    "online quiz generator",
    "MCQ quiz generator",
    "quiz with answer key",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Quiz Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI quiz generator for teachers to create classroom quizzes with question types, answer keys, and explanations.",
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
              <ToolBreadcrumb current="AI Quiz Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Quiz Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a fresh classroom quiz with AI using class, subject, syllabus coverage, question types, difficulty, answer key, and explanations.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={ListChecks}
              title="AI-built quiz maker"
              description="Generate quick quizzes for practice, revision, homework, or class tests."
              points={[
                "Choose MCQ, true or false, fill in the blank, and short answer questions.",
                "Generate answer keys and explanations for teachers.",
                "Copy, print, or download only the quiz output.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiQuizGenerator />

      <ToolSeoSection
        eyebrow="AI quiz FAQ"
        title="AI quiz generator for teachers"
        description="Use this AI quiz generator to create classroom quizzes, MCQ quizzes, online quiz questions, answer keys, explanations, revision quizzes, homework quizzes, and class test questions."
        keywords={[
          "AI quiz generator",
          "quiz generator",
          "online quiz generator",
          "MCQ quiz generator",
          "AI MCQ generator",
          "quiz with answer key",
        ]}
        faqs={[
          {
            question: "How does the AI quiz generator work?",
            answer:
              "Select class, subject, syllabus coverage, quiz purpose, difficulty, question count, and question types. The AI creates a ready-to-use quiz with optional answer key and explanations.",
          },
          {
            question: "Can I generate MCQ questions with answers?",
            answer:
              "Yes. Select Multiple choice in question types and keep answer key enabled to generate MCQ questions with correct answers.",
          },
          {
            question: "Can I print only the quiz?",
            answer:
              "Yes. The print button opens a clean quiz-only print layout with optional answer key and explanations.",
          },
        ]}
        relatedTools={[
          { href: "/tools/question-paper-generator", label: "AI Question Paper Generator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
        ]}
      />
    </div>
  );
}
