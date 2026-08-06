import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  FileUser,
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
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { AiResumeBuilder } from "@/components/tools/ai-resume-builder";

export const metadata: Metadata = {
  title: "Free AI Resume Builder | ATS-Friendly Resume Maker & PDF Download",
  description:
    "Free AI Resume Builder to create ATS-friendly resumes with templates, smart bullets, role keywords, resume score, live preview, and PDF download.",
  keywords: [
    "free AI resume builder",
    "AI resume builder",
    "free resume builder",
    "ATS friendly resume builder",
    "resume maker AI",
    "AI resume maker free",
    "resume builder with templates",
    "AI CV maker",
    "CV maker AI",
    "resume PDF download",
    "fresher resume builder",
    "experienced resume builder",
    "student resume builder",
    "resume bullet generator",
    "ATS resume maker",
    "job resume generator",
  ],
  alternates: { canonical: "/tools/ai-resume-builder" },
  openGraph: {
    title: "Free AI Resume Builder",
    description: "Build an ATS-friendly resume with AI, clean templates, smart bullets, keyword optimization, and PDF-ready preview.",
    url: "/tools/ai-resume-builder",
    type: "website",
  },
};

const pageUrl = "https://www.getkasa.in/tools/ai-resume-builder";

const aiResumeBuilderFaqs = [
  {
    question: "What is an AI Resume Builder?",
    answer:
      "An AI Resume Builder is an online resume maker that helps write resume sections, improve bullets, add role keywords, choose a clean template, and prepare a resume for job applications.",
  },
  {
    question: "Is this AI resume builder free?",
    answer:
      "Yes. KASA's Free AI Resume Builder can be used to create an ATS-friendly resume, preview it, copy content, print it, and prepare it for PDF download.",
  },
  {
    question: "Can I upload my old resume?",
    answer:
      "Yes. You can upload an old PDF, DOC, DOCX, or TXT resume, paste resume text, or start directly with profile details.",
  },
  {
    question: "Can the builder use my ATS checker report?",
    answer:
      "Yes. If you run the KASA ATS checker first, the AI Resume Builder can use missing keywords, weak areas, and improved bullets from the report.",
  },
  {
    question: "Does it create ATS-friendly resumes?",
    answer:
      "Yes. The templates use readable headings, simple structure, role-focused skills, and clean formatting so recruiters and ATS systems can parse the resume easily.",
  },
  {
    question: "Can freshers use this AI resume maker?",
    answer:
      "Yes. Freshers can create resumes for campus placements, internships, first jobs, final year projects, technical skills, certifications, and entry-level roles.",
  },
  {
    question: "Can experienced professionals use it?",
    answer:
      "Yes. Experienced professionals can improve achievements, leadership impact, metrics, role fit, domain keywords, and seniority signals.",
  },
  {
    question: "Does AI invent fake experience?",
    answer:
      "No. The builder is designed to improve wording and structure without inventing companies, degrees, dates, jobs, or achievements.",
  },
  {
    question: "Can I download the resume as PDF?",
    answer:
      "Yes. You can use the print-ready preview to save or print the resume as a PDF from your browser.",
  },
  {
    question: "Can I make a resume for software developer jobs?",
    answer:
      "Yes. The builder can create role-focused resumes for frontend, backend, full stack, React, Next.js, Java, Python, data, cloud, and other tech roles.",
  },
  {
    question: "Can it improve resume bullet points?",
    answer:
      "Yes. It can rewrite weak bullet points with clearer action, skills, tools, measurable results, and role relevance.",
  },
  {
    question: "Can students create project-based resumes?",
    answer:
      "Yes. Students can add college projects, final year projects, internships, coursework, skills, GitHub links, and certifications.",
  },
  {
    question: "Is this better than a manual resume template?",
    answer:
      "It is faster because AI helps with wording, role keywords, and bullet structure, while templates keep the resume readable and consistent.",
  },
  {
    question: "Should I still customize my resume for each job?",
    answer:
      "Yes. Use the builder to create a strong base resume, then customize keywords, projects, and achievements for each job description.",
  },
];

const useCases = [
  {
    title: "For Freshers",
    description: "Create a first-job resume with projects, internships, skills, certifications, and placement-ready formatting.",
    icon: UserRoundCheck,
  },
  {
    title: "For Students",
    description: "Build internship, campus placement, final year project, and entry-level resumes without a long form.",
    icon: GraduationCap,
  },
  {
    title: "For Experienced Professionals",
    description: "Rewrite achievements with metrics, leadership signals, domain keywords, and recruiter-friendly impact.",
    icon: BriefcaseBusiness,
  },
  {
    title: "For Career Switchers",
    description: "Translate transferable skills into a new role and add projects that support the career shift.",
    icon: TrendingUp,
  },
  {
    title: "For Job Applications",
    description: "Prepare a clean ATS-friendly resume before applying to a specific role or company.",
    icon: Target,
  },
];

const resumeExamples = [
  {
    title: "Example Fresher Resume",
    focus: "Projects, internships, skills, education, certifications",
    points: [
      "Place strongest technical projects above generic coursework.",
      "Write bullets with tools used, problem solved, and outcome.",
      "Add role keywords for the target fresher job.",
    ],
  },
  {
    title: "Example Software Developer Resume",
    focus: "React, Next.js, APIs, testing, performance, deployment",
    points: [
      "Convert feature work into measurable product impact.",
      "Add technical keywords naturally inside experience and project bullets.",
      "Show ownership across UI, API integration, debugging, and release.",
    ],
  },
  {
    title: "Example Career Switch Resume",
    focus: "Transferable skills, new projects, proof of role readiness",
    points: [
      "Connect previous experience to the target role.",
      "Highlight recent learning, tools, and portfolio projects.",
      "Remove unrelated filler and keep the resume focused.",
    ],
  },
];

export default function AiResumeBuilderPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free AI Resume Builder",
      alternateName: ["AI Resume Builder", "AI Resume Maker", "ATS Resume Maker", "AI CV Maker"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free AI Resume Builder to create ATS-friendly resumes with clean templates, smart bullets, role keywords, resume score estimate, live preview, and PDF-ready output.",
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
      name: "How to build an ATS-friendly resume with AI",
      description: "Create a clean resume with AI, improve bullets, add role keywords, choose a template, and export a PDF-ready resume.",
      totalTime: "PT3M",
      step: [
        {
          "@type": "HowToStep",
          name: "Upload or start from scratch",
          text: "Upload an old resume, paste resume text, use an ATS checker report, or enter profile details directly.",
        },
        {
          "@type": "HowToStep",
          name: "Choose role and template",
          text: "Select the target role, resume template, experience level, and key skills.",
        },
        {
          "@type": "HowToStep",
          name: "Generate resume content",
          text: "Let AI improve summary, skills, projects, experience, bullet points, and role keywords.",
        },
        {
          "@type": "HowToStep",
          name: "Preview and export",
          text: "Review the live preview, edit details, then copy, print, or save the resume as PDF.",
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-x-clip bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <JsonLd data={jsonLd} />
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

      <AiResumeBuilderSeoContent />

      <ToolSeoSection
        eyebrow="AI Resume Builder FAQ"
        title="Free AI Resume Builder FAQ"
        description="Use this Free AI Resume Builder as an AI resume maker, ATS resume maker, resume bullet generator, and AI CV maker. Build a clean resume from an old resume, ATS report, or a few profile details."
        keywords={["free AI resume builder", "AI resume builder", "ATS resume maker", "resume templates", "resume PDF", "resume keywords", "resume bullet generator", "AI CV maker", "fresher resume builder"]}
        faqs={aiResumeBuilderFaqs}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/resume-builder-studio", label: "Free Resume Builder" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
        ]}
      />
    </div>
  );
}

function AiResumeBuilderSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Free AI Resume Builder Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Build an ATS-friendly resume without fighting a long form
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s Free AI Resume Builder helps job seekers create a clean, readable, ATS-friendly resume from an old resume, a pasted draft, an ATS checker report, or a few profile details. Instead of asking users to fill a long form from zero, the builder can reuse existing resume information, improve wording, organize sections, and generate role-focused content for students, freshers, experienced professionals, and career switchers.
              </p>
              <p>
                A strong resume needs more than a good-looking template. Recruiters and applicant tracking systems need clear headings, relevant skills, role keywords, readable formatting, and proof of impact. The builder helps write summaries, skills, experience, projects, education, certifications, and achievements in a structure that is easy to scan. For technical roles, it can highlight tools, frameworks, projects, APIs, testing, deployment, and measurable outcomes. For business roles, it can focus on ownership, process improvement, communication, analytics, targets, and results.
              </p>
              <p>
                Freshers can use the tool to turn college projects, internships, coursework, and certifications into a placement-ready resume. Experienced professionals can rewrite vague responsibilities into achievement bullets with stronger action verbs and clearer impact. Career switchers can show transferable skills and recent projects that support a new role. If you are not sure what to fix first, run the{" "}
                <Link href="/tools/resume-ats-checker" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Resume ATS Checker
                </Link>
                {" "}and then use its missing keywords, weak areas, and improved bullet suggestions inside this builder.
              </p>
              <p>
                To get the best result, choose a target role, keep the content truthful, add measurable details where possible, and remove unrelated filler. Review every AI-generated bullet before downloading. A good base resume should be customized for each job description, especially the skills, projects, and top achievements. For students, pair the builder with the{" "}
                <Link href="/tools/final-year-project-kit-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Final Year Project Kit
                </Link>
                {" "}and{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                {" "}to improve project quality and interview preparation.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Resume builder includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["ATS-friendly template", "Smart summary", "Improved bullets", "Role keywords", "PDF-ready preview"].map((item) => (
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
            AI resume maker for every job seeker
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
                Example Resumes
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Resume formats AI can help create
              </h2>
            </div>
            <Link href="/tools/resume-ats-checker" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Check ATS score first
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
                  {example.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary dark:text-emerald-200" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker", icon: Search },
            { href: "/tools/resume-builder-studio", label: "Free Resume Builder", icon: ListChecks },
            { href: "/tools/final-year-project-kit-generator", label: "Final Year Project Kit", icon: FileText },
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
