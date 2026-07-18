import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, GraduationCap, Route, Sparkles, Target } from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { AiCareerRoadmap } from "@/components/tools/ai-career-roadmap";

export const metadata: Metadata = {
  title: "AI Career Roadmap Generator for Students | Skills, Projects and Weekly Plan",
  description:
    "Create a free AI career roadmap for students and freshers. Get role-wise skills, weekly learning plan, project ideas, interview prep, portfolio tasks, and job search actions.",
  keywords: [
    "AI career roadmap",
    "career roadmap generator",
    "career roadmap for students",
    "roadmap for frontend developer",
    "roadmap for data analyst",
    "student career planner",
    "fresher job roadmap",
    "skills roadmap",
    "project based learning roadmap",
  ],
  alternates: { canonical: "/tools/ai-career-roadmap" },
  openGraph: {
    title: "AI Career Roadmap Generator for Students",
    description: "Generate a role-wise career roadmap with skills, projects, weekly tasks, interview prep, and job search actions.",
    url: "/tools/ai-career-roadmap",
    type: "website",
  },
};

const pageUrl = "https://www.getkasa.in/tools/ai-career-roadmap";

const faqs = [
  {
    question: "What is an AI Career Roadmap Generator?",
    answer:
      "It is a tool that creates a practical learning and career plan based on your target role, current skills, course, available time, and career goal.",
  },
  {
    question: "Can college students use this career roadmap tool?",
    answer:
      "Yes. It is designed for college students, freshers, and early career learners who want a clear plan for skills, projects, interviews, and job applications.",
  },
  {
    question: "Does it guarantee a job?",
    answer:
      "No. The roadmap gives structured guidance, but job selection depends on skills, projects, applications, interviews, market conditions, and consistency.",
  },
  {
    question: "What does the roadmap include?",
    answer:
      "It includes focus areas, skills to learn, weekly tasks, portfolio projects, interview questions, job search actions, free resources, and mistakes to avoid.",
  },
];

export default function AiCareerRoadmapPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "AI Career Roadmap Generator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free AI career roadmap generator for students and freshers with role-wise skills, weekly plan, projects, portfolio tasks, interview prep, and job search actions.",
      publisher: { "@type": "Organization", name: "KASA", url: "https://www.getkasa.in" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <div className="bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <JsonLd data={jsonLd} />
      <section className="relative overflow-hidden px-4 pb-10 pt-[9.25rem] sm:px-6 sm:pt-[10.25rem] lg:px-8 lg:pt-[10.75rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(43,168,255,0.22),transparent_25rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_64%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_22%,rgba(88,201,138,0.18),transparent_24rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />
        <div className={siteContainerClasses({ className: "relative" })}>
          <Link href="/tools" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 dark:text-emerald-200">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to tools
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/82 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-emerald-200">
                <Sparkles className="size-4" aria-hidden="true" />
                Free AI student tool
              </div>
              <ToolBreadcrumb current="AI Career Roadmap" />
              <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.06] text-slate-950 sm:text-5xl lg:text-[3.6rem] dark:text-white">
                AI Career Roadmap Generator for students and freshers.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-300">
                Choose your target role, add your current skills, and get a practical roadmap with weekly tasks,
                role-wise skills, project ideas, interview prep, and job search actions.
              </p>
              <ToolHeroKeywords
                keywords={[
                  "AI career roadmap",
                  "weekly learning plan",
                  "project ideas",
                  "interview prep",
                  "student career planner",
                ]}
              />
            </div>

            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
              {[
                {
                  title: "Role-wise skills",
                  description: "Know what to learn first for your target job.",
                  icon: Target,
                  points: ["Priority skills", "Current skill gap", "Beginner-friendly order"],
                },
                {
                  title: "Weekly plan",
                  description: "Turn goals into focused weekly tasks.",
                  icon: Route,
                  points: ["1-12 month timeline", "Daily study time", "Clear weekly outcomes"],
                },
                {
                  title: "Project ideas",
                  description: "Build portfolio proof recruiters can review.",
                  icon: Sparkles,
                  points: ["Project brief", "Skills used", "Resume bullet ideas"],
                },
                {
                  title: "Interview prep",
                  description: "Practice topics and questions for fresher roles.",
                  icon: GraduationCap,
                  points: ["Technical topics", "HR prep", "Job search actions"],
                },
              ].map((item) => (
                <ToolHeroFeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} points={item.points} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AiCareerRoadmap />

      <section className="bg-[#eef7ff] px-4 py-12 dark:bg-surface-strong sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[108rem] gap-4 md:grid-cols-3">
          {[
          {
            title: "Skills become easier to prioritize",
            body: "Students often try to learn everything at once. This roadmap separates high-priority skills from optional skills so the first few weeks stay focused.",
            points: ["Target role", "Current skills", "Priority order"],
          },
          {
            title: "Projects become resume proof",
            body: "The roadmap suggests projects with skills and resume bullets, so learning does not stay theoretical.",
            points: ["Portfolio projects", "Resume bullets", "GitHub proof"],
          },
          {
            title: "Interview prep starts early",
            body: "Each roadmap includes interview topics and practice questions, helping students prepare before applications begin.",
            points: ["HR questions", "Technical topics", "Job search actions"],
          },
        ].map((section) => (
          <div key={section.title} className="rounded-[1.2rem] border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="font-heading text-xl font-semibold text-slate-950 dark:text-white">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{section.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.points.map((point) => (
                <span key={point} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary dark:bg-primary/12 dark:text-emerald-200">{point}</span>
              ))}
            </div>
          </div>
        ))}
        </div>
      </section>

      <ToolSeoSection
        eyebrow="Career roadmap guide"
        title="How the AI career roadmap helps students"
        description="A good roadmap should not only list skills. It should tell you what to learn, what to build, what to show on your resume, and how to prepare for interviews."
        keywords={["career roadmap", "student career plan", "weekly learning plan", "portfolio projects", "interview prep"]}
        faqs={faqs}
        relatedTools={[
          { href: "/tools/resume-builder-studio", label: "Free Resume Builder" },
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit" },
        ]}
      />

      <section className="bg-white px-4 py-12 dark:bg-surface sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[108rem] gap-4 md:grid-cols-3">
          {["No job guarantee, only practical guidance.", "Best results come when you update skills and projects weekly.", "Use the roadmap with resume builder and ATS checker for stronger applications."].map((point) => (
            <div key={point} className="flex gap-3 rounded-[1rem] border border-blue-950/10 bg-[#f8fbff] p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
