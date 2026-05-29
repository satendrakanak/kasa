import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileSearch, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { ResumeAtsChecker } from "@/components/tools/resume-ats-checker";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker AI - Resume Score, Roast, Keywords and Roadmap",
  description:
    "Use this free AI ATS resume checker to upload PDF or DOCX resumes, get an ATS score, find why your resume gets rejected, fix missing keywords, and download a shareable report.",
  keywords: [
    "free ATS resume checker",
    "free ATS checker",
    "ATS resume checker",
    "ATS checker free",
    "ATS score checker",
    "AI resume checker",
    "AI resume roast",
    "resume roast AI",
    "why resume gets rejected",
    "resume ATS score",
    "resume score checker",
    "resume scanner free",
    "free resume checker no signup",
    "PDF resume checker",
    "DOCX resume checker",
    "resume roast AI",
    "fresher resume checker",
    "experienced resume checker",
    "resume keyword checker",
    "resume keyword scanner",
    "ATS resume keywords",
    "resume rejection checker",
    "resume improvement tool",
    "career roadmap generator",
    "interview preparation roadmap",
    "student resume checker",
  ],
  alternates: { canonical: "/tools/resume-ats-checker" },
  openGraph: {
    title: "Free ATS Resume Checker AI",
    description: "Upload your resume, get an ATS score, see why it may be rejected, and download a shareable improvement report.",
    url: "/tools/resume-ats-checker",
    type: "website",
  },
};

export default function ResumeAtsCheckerPage() {
  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(43,168,255,0.24),transparent_26rem),radial-gradient(circle_at_14%_76%,rgba(34,181,115,0.11),transparent_24rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.18),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pb-10 lg:pt-[10.75rem]">
        <div className={siteContainerClasses({ className: "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" })}>
          <div>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All tools
            </Link>
            <ToolBreadcrumb current="AI Resume ATS Checker" />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/76 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-emerald-200">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              Free AI career tool
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.35rem] dark:text-white">
              Free ATS Resume Checker AI: score your resume before recruiters reject it.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
              Upload a PDF or DOCX resume, choose any target role, and get an ATS score, resume roast, missing keywords,
              skill gaps, improved bullets, interview questions, and a practical roadmap to become interview-ready.
            </p>
            <ToolHeroKeywords
              keywords={[
                "free ATS resume checker",
                "free ATS checker",
                "resume roast AI",
                "why your resume gets rejected",
                "resume score checker",
                "resume keyword checker",
                "ATS score checker",
                "PDF resume checker",
                "resume checker no signup",
              ]}
            />
          </div>

          <ToolHeroFeatureCard
            icon={FileSearch}
            title="Resume roast + ATS report"
            description="Turn a plain resume into a role-focused ATS score, rejection diagnosis, and improvement plan."
            points={[
              "Upload PDF, DOC, DOCX, or TXT resumes without creating an account.",
              "Find missing ATS keywords, weak bullets, role gaps, and rejection risks.",
              "Download or share a clean PDF report with score, fixes, and roadmap.",
            ]}
          />
        </div>
      </section>

      <ResumeAtsChecker />

      <ToolSeoSection
        eyebrow="Resume ATS Checker FAQ"
        title="Why your resume gets rejected and how to fix it"
        description="A strong resume should match the job role, include ATS-friendly keywords, show measurable impact, and prove the right skills. This free ATS resume checker helps students, freshers, and experienced professionals find resume rejection risks before they apply."
        keywords={[
          "free ATS resume checker",
          "ATS score",
          "resume rejection",
          "resume roast AI",
          "resume keywords",
          "ATS resume keywords",
          "resume bullet points",
          "missing skills",
          "resume scanner",
          "resume checker no signup",
          "PDF resume checker",
          "interview questions",
          "career roadmap",
        ]}
        faqs={[
          {
            question: "Why does my resume get rejected by ATS systems?",
            answer:
              "Resumes often get rejected because they miss role-specific keywords, use vague bullet points, hide skills in poor formatting, or do not show measurable impact. This ATS checker highlights those gaps before you apply.",
          },
          {
            question: "What is an ATS score?",
            answer:
              "An ATS score estimates how well your resume matches a job role, keywords, skills, and recruiter screening patterns. It is a useful guide, not a guaranteed hiring result.",
          },
          {
            question: "Is this a free ATS resume checker?",
            answer:
              "Yes. You can upload a resume, check your ATS score, see keyword gaps, and download a report without creating an account.",
          },
          {
            question: "Can I upload a PDF or DOCX resume?",
            answer:
              "Yes. The tool accepts PDF, DOC, DOCX, and TXT resumes. It can also work with pasted resume text if you do not want to upload a file.",
          },
          {
            question: "Can freshers use this resume checker?",
            answer:
              "Yes. Freshers can use it to find missing skills, improve project descriptions, add better resume bullets, and prepare for interview questions.",
          },
          {
            question: "Can experienced professionals use this AI resume checker?",
            answer:
              "Yes. The checker detects senior experience from the resume, reviews leadership and impact signals, and gives role-specific keyword, project, and roadmap suggestions.",
          },
          {
            question: "What is Resume Roast AI?",
            answer:
              "Resume Roast AI means direct, practical feedback on weak bullets, missing keywords, unclear achievements, and why a recruiter or ATS may reject the resume.",
          },
          {
            question: "Does this replace a human resume review?",
            answer:
              "No. It gives fast AI feedback and a practical improvement roadmap. You should still proofread and customize the final resume for each job application.",
          },
        ]}
        relatedTools={[
          { href: "/tools/ai-resume-builder", label: "AI Resume Builder" },
          { href: "/tools/assignment-generator", label: "AI Assignment Generator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
        ]}
      />
    </div>
  );
}
