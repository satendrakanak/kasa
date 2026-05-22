import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Archive, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { FinalYearProjectKitGenerator } from "@/components/tools/final-year-project-kit-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Final Year Project Kit Generator - Ideas, Source Starter, Docs and Viva",
  description:
    "Generate your final year project kit in 2 minutes. Get BTech, BCA and MCA project ideas, architecture, folder structure, APIs, documentation, viva questions, resume bullets and downloadable ZIP.",
  keywords: [
    "AI final year project kit generator",
    "final year project ideas",
    "final year project with source code",
    "BTech final year project ideas",
    "BCA final year project with documentation",
    "mini project source code",
    "major project report generator",
    "project synopsis generator",
    "AI project generator for students",
    "project viva questions",
    "project documentation generator",
    "project zip download",
    "computer science project ideas",
    "React project for final year",
    "Python project for students",
    "Java project for final year",
    "MERN stack project ideas",
  ],
  alternates: { canonical: "/tools/final-year-project-kit-generator" },
  openGraph: {
    title: "AI Final Year Project Kit Generator",
    description: "Generate project ideas, architecture, documentation, viva questions, resume bullets, and a starter ZIP.",
    url: "/tools/final-year-project-kit-generator",
    type: "website",
  },
};

export default function FinalYearProjectKitGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Final Year Project Kit Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free AI project kit generator for students to create final year project ideas, architecture, documentation, viva questions, resume bullets, and downloadable starter ZIP.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(43,168,255,0.24),transparent_26rem),radial-gradient(circle_at_14%_76%,rgba(34,181,115,0.11),transparent_24rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.18),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pb-10 lg:pt-[10.75rem]">
        <div className={siteContainerClasses({ className: "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" })}>
          <div>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All AI tools
            </Link>
            <ToolBreadcrumb current="AI Final Year Project Kit Generator" />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/76 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-emerald-200">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              Final year project in 2 minutes
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.35rem] dark:text-white">
              Generate your final year project kit in 2 minutes.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
              Get project ideas, architecture, folder structure, APIs, database schema, documentation, viva questions,
              resume bullets, and a downloadable starter ZIP for BTech, BCA, MCA, and diploma projects.
            </p>
            <ToolHeroKeywords
              keywords={[
                "final year project ideas",
                "project with source code",
                "BTech project ideas",
                "BCA project with documentation",
                "mini project source code",
                "project viva questions",
                "project ZIP download",
              ]}
            />
          </div>

          <ToolHeroFeatureCard
            icon={Archive}
            title="Idea + docs + starter ZIP"
            description="Generate a college-ready project kit instead of searching random project topics for hours."
            points={[
              "Choose stack, domain, difficulty, team size, and time left.",
              "Get synopsis, architecture, APIs, schema, setup guide, and viva prep.",
              "Download a ZIP with documentation and starter source-code structure.",
            ]}
          />
        </div>
      </section>

      <FinalYearProjectKitGenerator />

      <ToolSeoSection
        eyebrow="Final year project FAQ"
        title="Final year project ideas with documentation and starter ZIP"
        description="Use this AI final year project kit generator to create BTech, BCA, MCA, diploma, mini project, and major project ideas with architecture, folder structure, database schema, API plan, project synopsis, viva questions, and resume bullets."
        keywords={[
          "final year project ideas",
          "BTech final year project",
          "BCA project with documentation",
          "major project report generator",
          "mini project source code",
          "AI project generator",
          "project synopsis generator",
          "project viva questions",
          "MERN stack project ideas",
          "Python project for students",
        ]}
        faqs={[
          {
            question: "What does the AI Final Year Project Kit Generator create?",
            answer:
              "It creates a project title, abstract, problem statement, features, architecture, folder structure, database schema, APIs, setup steps, viva questions, resume bullets, and a downloadable starter ZIP.",
          },
          {
            question: "Can I generate BTech and BCA final year project ideas?",
            answer:
              "Yes. The tool supports BTech CSE, BCA, MCA, BSc CS, diploma, and other computer science project requirements.",
          },
          {
            question: "Does the ZIP include complete source code?",
            answer:
              "The current ZIP includes a reliable starter kit with documentation, source-code structure, setup guide, environment sample, and implementation plan. Full code generation can be added later as an advanced feature.",
          },
          {
            question: "Can this help with project viva?",
            answer:
              "Yes. The generated kit includes viva questions with answers, resume bullets, future scope, and explanation points for presentation.",
          },
          {
            question: "Which tech stacks are supported?",
            answer:
              "You can generate project kits for MERN, React, Next.js, Firebase, Django, Flask, Java Spring Boot, Laravel, Flutter, Android, AI/ML, data science, IoT, and cybersecurity projects.",
          },
        ]}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/assignment-generator", label: "AI Assignment Generator" },
        ]}
      />
    </div>
  );
}
