import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  FileText,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { ResumeAtsChecker } from "@/components/tools/resume-ats-checker";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker AI | Resume Score, Keywords & Rejection Fixes",
  description:
    "Free ATS Resume Checker AI to scan your resume, get an ATS score, find missing keywords, fix rejection risks, improve bullets, and download a report.",
  keywords: [
    "free ATS resume checker",
    "ATS resume checker free",
    "free ATS checker",
    "ATS resume checker",
    "ATS checker free",
    "ATS score checker",
    "resume ATS checker",
    "resume score checker free",
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
    description: "Scan your resume, get an ATS score, find missing keywords, fix rejection risks, and download a shareable improvement report.",
    url: "/tools/resume-ats-checker",
    type: "website",
  },
};

const pageUrl = "https://www.getkasa.in/tools/resume-ats-checker";

const resumeAtsFaqs = [
  {
    question: "What is an ATS Resume Checker?",
    answer:
      "An ATS Resume Checker scans your resume for applicant tracking system compatibility, role keywords, formatting issues, missing skills, weak bullets, and recruiter screening risks.",
  },
  {
    question: "Is this ATS resume checker free?",
    answer:
      "Yes. KASA's Free ATS Resume Checker AI lets you upload or paste your resume, get an ATS score, review keyword gaps, and download a report without signup.",
  },
  {
    question: "How does the ATS score checker work?",
    answer:
      "The ATS score checker compares your resume content with the target role, skills, keywords, experience level, bullet quality, formatting clarity, and recruiter expectations.",
  },
  {
    question: "Can I check my resume without signup?",
    answer:
      "Yes. You can use the resume checker without creating an account. Upload a PDF, DOC, DOCX, TXT file, or paste resume text directly.",
  },
  {
    question: "Can I upload a PDF resume?",
    answer:
      "Yes. The tool supports PDF resumes along with DOC, DOCX, and TXT formats. You can also paste text if you prefer not to upload a file.",
  },
  {
    question: "Can I upload a DOCX resume?",
    answer:
      "Yes. DOCX resumes are supported. The checker reads the content and gives feedback on score, keywords, weak areas, and improvements.",
  },
  {
    question: "Why does my resume get rejected by ATS?",
    answer:
      "Resumes often get rejected because they miss role-specific keywords, use vague bullets, hide skills in complex formatting, lack measurable impact, or target the wrong role.",
  },
  {
    question: "What is a good ATS resume score?",
    answer:
      "A higher ATS score usually means your resume is better aligned with the target role, but the score is a guide. You should still customize each resume for the job description.",
  },
  {
    question: "Does this tool find missing resume keywords?",
    answer:
      "Yes. It works as a resume keyword checker by highlighting missing ATS keywords, role skills, tools, technologies, and phrases recruiters expect for the selected role.",
  },
  {
    question: "Can freshers use this resume checker?",
    answer:
      "Yes. Freshers can use it to improve projects, internships, technical skills, certifications, college experience, and entry-level resume bullets.",
  },
  {
    question: "Can experienced professionals use this ATS checker?",
    answer:
      "Yes. Experienced professionals can use it to improve leadership signals, measurable achievements, role fit, seniority, domain keywords, and recruiter-facing impact.",
  },
  {
    question: "What is Resume Roast AI?",
    answer:
      "Resume Roast AI is direct, practical feedback on why your resume may look weak, where bullets are vague, which keywords are missing, and what to rewrite before applying.",
  },
  {
    question: "Can this AI resume checker improve bullet points?",
    answer:
      "Yes. The report suggests stronger bullet points that focus on action, skill, result, metrics, and role relevance.",
  },
  {
    question: "Does it create an interview preparation roadmap?",
    answer:
      "Yes. The report includes a practical roadmap with focus areas, missing skills, project ideas, and interview questions for the target role.",
  },
  {
    question: "Can I download the ATS report?",
    answer:
      "Yes. You can download or share the report with score, rejection risks, keyword gaps, improved bullets, checklist, and roadmap.",
  },
  {
    question: "Does an ATS score guarantee interview selection?",
    answer:
      "No. An ATS score helps improve alignment and reduce obvious rejection risks, but interview calls depend on the job description, competition, recruiter judgment, and your actual experience.",
  },
];

const useCases = [
  {
    title: "For Students",
    description: "Check internship resumes, college project resumes, placement resumes, and entry-level applications before applying.",
    icon: GraduationCap,
  },
  {
    title: "For Freshers",
    description: "Find missing skills, weak project descriptions, vague bullets, and role keywords for first job applications.",
    icon: UserRoundCheck,
  },
  {
    title: "For Experienced Professionals",
    description: "Improve achievement bullets, leadership signals, domain keywords, impact metrics, and senior role fit.",
    icon: BriefcaseBusiness,
  },
  {
    title: "For Career Switchers",
    description: "Map transferable skills to a new role and identify the projects, tools, and keywords your resume is missing.",
    icon: TrendingUp,
  },
  {
    title: "For Job Applications",
    description: "Run a final resume scan before applying to a role and fix obvious ATS rejection risks.",
    icon: Target,
  },
];

const resumeExamples = [
  {
    title: "Example Frontend Developer Resume Fix",
    focus: "React, TypeScript, Next.js, performance, UI ownership",
    fixes: [
      "Replace vague UI bullets with measurable feature and performance impact.",
      "Add missing keywords such as React, TypeScript, REST APIs, accessibility, and responsive design.",
      "Show project ownership, deployment links, and quantified improvements.",
    ],
  },
  {
    title: "Example Fresher Resume Fix",
    focus: "Projects, internships, skills, certifications, placement readiness",
    fixes: [
      "Move strong projects above generic coursework.",
      "Rewrite project bullets with tools used, problem solved, and result achieved.",
      "Add role-specific skills and remove unrelated filler sections.",
    ],
  },
  {
    title: "Example Data Analyst Resume Fix",
    focus: "SQL, Excel, Power BI, dashboards, insights, business metrics",
    fixes: [
      "Add analytics keywords that match the target role.",
      "Convert task descriptions into business impact bullets.",
      "Mention dashboard metrics, data cleaning, reporting, and stakeholder outcomes.",
    ],
  },
];

export default function ResumeAtsCheckerPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free ATS Resume Checker AI",
      alternateName: ["ATS Resume Checker", "Resume Score Checker", "AI Resume Checker", "Resume Keyword Checker"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free ATS Resume Checker AI to scan resumes, calculate ATS score, find missing keywords, diagnose rejection risks, improve bullets, and generate a career roadmap.",
      publisher: {
        "@type": "Organization",
        name: "KASA",
        url: "https://www.getkasa.in",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: "How to check your resume ATS score",
      description: "Scan your resume with AI, find ATS keyword gaps, improve weak bullets, and download a resume report.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Upload or paste your resume",
          text: "Upload a PDF, DOC, DOCX, TXT resume, or paste your resume text into the checker.",
        },
        {
          "@type": "HowToStep",
          name: "Choose the target role",
          text: "Select the job role, role family, experience level, skills, target package, and preparation time.",
        },
        {
          "@type": "HowToStep",
          name: "Run the ATS scan",
          text: "Generate an ATS score, resume roast, missing keywords, weak areas, improved bullets, and recruiter checklist.",
        },
        {
          "@type": "HowToStep",
          name: "Download and improve",
          text: "Download the report, rewrite weak sections, add missing keywords, and use the roadmap before applying.",
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <JsonLd data={jsonLd} />
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

      <ResumeAtsSeoContent />

      <ToolSeoSection
        eyebrow="Resume ATS Checker FAQ"
        title="Free ATS Resume Checker AI FAQ"
        description="Use this free ATS Resume Checker AI as a resume score checker, resume keyword checker, resume scanner, and Resume Roast AI tool. It helps students, freshers, and experienced professionals find resume rejection risks before they apply."
        keywords={[
          "free ATS resume checker",
          "ATS resume checker free",
          "ATS score",
          "resume rejection",
          "resume roast AI",
          "AI resume checker",
          "resume keywords",
          "ATS resume keywords",
          "resume keyword checker",
          "resume bullet points",
          "missing skills",
          "resume scanner",
          "resume checker no signup",
          "PDF resume checker",
          "interview questions",
          "career roadmap",
        ]}
        faqs={resumeAtsFaqs}
        relatedTools={[
          { href: "/tools/ai-resume-builder", label: "AI Resume Builder" },
          { href: "/tools/resume-builder-studio", label: "Free Resume Builder" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit Generator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
        ]}
      />
    </div>
  );
}

function ResumeAtsSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Free ATS Resume Checker AI Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Scan your resume before recruiters and ATS systems reject it
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s Free ATS Resume Checker AI helps students, freshers, and experienced professionals understand why a resume may not get shortlisted. Upload a PDF, DOC, DOCX, or TXT resume, or paste your resume text directly. Then choose the target role, role family, experience level, current skills, expected package, daily preparation time, and report language. The tool generates an ATS score, role-fit verdict, Resume Roast AI feedback, missing keywords, missing skills, weak areas, improved bullet points, interview questions, recruiter checklist, and a practical career roadmap.
              </p>
              <p>
                Most resumes fail because they are written like a biography instead of a job-matching document. Applicant tracking systems and recruiters look for role-specific keywords, clear skills, measurable achievements, readable formatting, and evidence that the candidate can do the job. A resume may look good visually but still miss phrases like React, SQL, Power BI, stakeholder management, REST APIs, performance optimization, campaign analytics, or any other keywords that matter for the target role. This ATS resume checker works as a resume score checker and resume keyword checker so you can fix those gaps before applying.
              </p>
              <p>
                For students and freshers, the checker is useful for improving placement resumes, internship applications, project descriptions, and entry-level job profiles. It points out weak project bullets, missing technical skills, unclear tools, and places where achievements should be more specific. For experienced professionals, it helps sharpen leadership impact, domain keywords, team ownership, metrics, seniority signals, and recruiter-facing results. Career switchers can use the report to understand which transferable skills are visible and which new skills or projects should be added.
              </p>
              <p>
                Use this page before applying to a job, after updating your resume, or when tailoring your resume for a new role. Start with the ATS report, rewrite weak bullets, add missing keywords naturally, remove unrelated filler, and make sure your best projects or achievements appear near the top. If you need to rebuild the resume after the scan, use the{" "}
                <Link href="/tools/ai-resume-builder" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Resume Builder
                </Link>
                {" "}or{" "}
                <Link href="/tools/resume-builder-studio" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Free Resume Builder
                </Link>
                . Students can also pair it with the{" "}
                <Link href="/tools/final-year-project-kit-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Final Year Project Kit Generator
                </Link>
                {" "}and{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                {" "}to improve projects and interview preparation.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              ATS report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["ATS score", "Missing keywords", "Resume roast", "Improved bullets", "Interview roadmap"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/82 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/88 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
            Use Cases
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Resume checker for every job search stage
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;

              return (
                <div key={useCase.title} className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                  <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/82 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/88 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Example Resume Fixes
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Sample improvements an ATS checker can reveal
              </h2>
            </div>
            <Link href="/tools/ai-resume-builder" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Build a better resume
              <FileText className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {resumeExamples.map((example) => (
              <div key={example.title} className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {example.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary dark:text-emerald-200">
                  {example.focus}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {example.fixes.map((fix) => (
                    <li key={fix} className="flex gap-2">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary dark:text-emerald-200" aria-hidden="true" />
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { href: "/tools/ai-resume-builder", label: "AI Resume Builder", icon: ListChecks },
            { href: "/tools/resume-builder-studio", label: "Free Resume Builder", icon: FileText },
            { href: "/tools/final-year-project-kit-generator", label: "Final Year Project Kit", icon: Search },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-3 rounded-[1rem] border border-primary/18 bg-white/84 p-4 text-sm font-semibold text-slate-800 shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50 dark:border-emerald-300/18 dark:bg-white/[0.06] dark:text-slate-100"
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />
                  {item.label}
                </span>
                <ArrowLeft className="size-4 rotate-180 text-primary dark:text-emerald-200" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
