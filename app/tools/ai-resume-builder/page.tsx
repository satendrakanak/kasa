import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileUser, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { AiResumeBuilder } from "@/components/tools/ai-resume-builder";

export const metadata: Metadata = {
  title: "AI Resume Builder Free - ATS Friendly Resume Templates and PDF Download",
  description:
    "Build a clean ATS-friendly resume with AI. Upload an old resume or start directly, choose a template, improve bullets, optimize keywords, and print or download your resume.",
  keywords: [
    "AI resume builder",
    "free resume builder",
    "ATS friendly resume builder",
    "resume maker AI",
    "resume builder with templates",
    "AI CV maker",
    "resume PDF download",
    "fresher resume builder",
    "experienced resume builder",
    "job resume generator",
  ],
  alternates: { canonical: "/tools/ai-resume-builder" },
  openGraph: {
    title: "AI Resume Builder Free",
    description: "Build a clean ATS-friendly resume with AI, templates, keyword optimization, and PDF-ready preview.",
    url: "/tools/ai-resume-builder",
    type: "website",
  },
};

export default function AiResumeBuilderPage() {
  return (
    <div className="relative overflow-x-clip bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(34,181,115,0.18),transparent_24rem),radial-gradient(circle_at_12%_72%,rgba(43,168,255,0.16),transparent_24rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.18),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pb-10 lg:pt-[10.75rem]">
        <div className={siteContainerClasses({ className: "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" })}>
          <div>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All tools
            </Link>
            <ToolBreadcrumb current="AI Resume Builder" />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/76 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-emerald-200">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              ATS-ready resume maker
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.35rem] dark:text-white">
              AI Resume Builder: clean templates, smart bullets, and ATS-friendly output.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
              Upload your old resume or start directly. KASA writes a polished resume with role keywords, better sections,
              clean templates, score estimate, and print-ready preview without making the user fill a long form.
            </p>
            <ToolHeroKeywords keywords={["AI resume builder", "ATS friendly resume", "resume maker free", "resume templates", "PDF resume download", "fresher resume", "experienced resume"]} />
          </div>

          <ToolHeroFeatureCard
            icon={FileUser}
            title="Build from scratch or improve your ATS report"
            description="A simple resume studio that works for direct visitors and users coming from the ATS checker."
            points={[
              "Upload PDF, DOC, DOCX, TXT, paste resume text, or use the last ATS report.",
              "Choose a clean template and let AI rewrite sections with truthful role-focused wording.",
              "Preview, copy, print, and save an ATS-friendly resume without account friction.",
            ]}
          />
        </div>
      </section>

      <AiResumeBuilder />

      <ToolSeoSection
        eyebrow="AI Resume Builder FAQ"
        title="Build a resume that is simple, readable, and ready for job applications"
        description="A strong resume builder should not force users into a long confusing form. This tool can start from an uploaded resume, an ATS report, or a small amount of profile context, then produce a clean resume with ATS-friendly headings and role-specific keywords."
        keywords={["AI resume builder", "ATS resume", "resume templates", "resume PDF", "resume keywords", "resume bullets", "resume maker"]}
        faqs={[
          {
            question: "Can I use this resume builder directly?",
            answer: "Yes. You can upload an old resume, paste resume text, or enter a few profile details and build a resume directly.",
          },
          {
            question: "Can it use my ATS checker report?",
            answer: "Yes. If you generate a report in the KASA ATS checker, the resume builder can use its missing keywords, weak areas, and improved bullets to build a stronger resume.",
          },
          {
            question: "Are the templates ATS-friendly?",
            answer: "Yes. The templates use simple headings, readable structure, and clean formatting so the resume remains easy for recruiters and ATS systems to parse.",
          },
          {
            question: "Does AI invent fake experience?",
            answer: "No. The builder is instructed to improve wording and structure without inventing companies, degrees, dates, or achievements.",
          },
        ]}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
        ]}
      />
    </div>
  );
}
