import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Archive,
  Blocks,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  Database,
  FileArchive,
  FileText,
  FolderTree,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Presentation,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { FinalYearProjectKitGenerator } from "@/components/tools/final-year-project-kit-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "AI Final Year Project Kit Generator | Ideas, Source Code, Report & Viva",
  description:
    "Generate your final year project kit in 2 minutes. Get BTech, BCA, MCA project ideas, source code starter, synopsis, report, documentation, viva questions, resume bullets and ZIP.",
  keywords: [
    "final year project generator",
    "AI final year project kit generator",
    "final year project ideas",
    "final year project with source code",
    "final year project source code",
    "final year project report",
    "final year project documentation",
    "final year project synopsis",
    "final year project abstract",
    "final year project viva questions",
    "BTech final year project ideas",
    "BTech CSE final year project",
    "BTech CSE project with source code",
    "BCA final year project with documentation",
    "BCA project ideas with source code",
    "MCA final year project ideas",
    "MCA project with documentation",
    "computer science final year project",
    "CSE final year project ideas",
    "mini project source code",
    "mini project ideas for CSE",
    "major project ideas for CSE",
    "major project report generator",
    "project synopsis generator",
    "project report generator",
    "project documentation generator",
    "AI project generator for students",
    "project viva questions",
    "project zip download",
    "computer science project ideas",
    "AI ML final year project ideas",
    "data science final year project",
    "IoT final year project ideas",
    "cybersecurity final year project",
    "React project for final year",
    "Python project for students",
    "Java project for final year",
    "MERN stack project ideas",
  ],
  alternates: { canonical: "/tools/final-year-project-kit-generator" },
  openGraph: {
    title: "AI Final Year Project Kit Generator",
    description: "Generate final year project ideas, source-code starter, synopsis, report, documentation, viva questions, resume bullets, and ZIP.",
    url: "/tools/final-year-project-kit-generator",
    type: "website",
  },
};

const pageUrl = "https://www.getkasa.in/tools/final-year-project-kit-generator";

const projectFaqs = [
  {
    question: "What is an AI Final Year Project Kit Generator?",
    answer:
      "It is a student tool that generates final year project ideas, abstract, problem statement, features, architecture, folder structure, database schema, API plan, documentation, viva questions, resume bullets, and a starter ZIP.",
  },
  {
    question: "Can I generate a final year project in 2 minutes?",
    answer:
      "Yes. Choose your course, project type, tech stack, domain, difficulty, team size, and time left. The tool creates a structured project kit quickly.",
  },
  {
    question: "Can I get final year project ideas with source code?",
    answer:
      "The tool creates a source-code starter structure, setup guide, folder plan, API plan, and implementation roadmap. It is designed to help students start coding instead of searching random ZIP files.",
  },
  {
    question: "Does the ZIP include complete source code?",
    answer:
      "The current ZIP includes a reliable starter kit with documentation, source-code structure, setup guide, environment sample, and implementation plan. Full production code can be built from the generated plan.",
  },
  {
    question: "Can I generate BTech CSE final year project ideas?",
    answer:
      "Yes. It supports BTech CSE projects across MERN, React, Next.js, Python, Java, AI/ML, data science, IoT, cybersecurity, and other domains.",
  },
  {
    question: "Can BCA students use this project generator?",
    answer:
      "Yes. BCA students can generate final year projects, mini projects, major projects, documentation, viva questions, and resume-ready project bullets.",
  },
  {
    question: "Can MCA students generate project documentation?",
    answer:
      "Yes. MCA students can generate project synopsis, abstract, system architecture, modules, database schema, API design, future scope, and viva preparation.",
  },
  {
    question: "Can I create a project synopsis?",
    answer:
      "Yes. The generated kit includes abstract, problem statement, objectives, features, architecture, scope, and implementation plan that can be used to write a synopsis.",
  },
  {
    question: "Can I create a final year project report?",
    answer:
      "Yes. The kit gives the building blocks for a report: abstract, problem statement, objectives, modules, database schema, API plan, setup steps, future scope, and documentation files.",
  },
  {
    question: "Does it generate viva questions?",
    answer:
      "Yes. The project kit includes viva questions with answers so students can prepare for project explanation, architecture, database, APIs, and future scope.",
  },
  {
    question: "Which tech stacks are supported?",
    answer:
      "Supported stacks include MERN, React + Firebase, Next.js + Supabase, Python Django, Flask, Java Spring Boot, Laravel, Flutter, Android Kotlin, AI/ML Python, data science, IoT, and cybersecurity.",
  },
  {
    question: "Can I generate AI/ML final year project ideas?",
    answer:
      "Yes. Choose AI/ML Python or Data Science to generate projects with dataset ideas, model workflow, features, architecture, and viva points.",
  },
  {
    question: "Can I generate MERN stack final year projects?",
    answer:
      "Yes. Choose MERN Stack to generate MongoDB, Express, React, Node.js project ideas with APIs, folder structure, database schema, and implementation plan.",
  },
  {
    question: "Can I generate Java Spring Boot project ideas?",
    answer:
      "Yes. Choose Java Spring Boot for backend-heavy projects with modules, REST APIs, database schema, admin/user roles, and setup steps.",
  },
  {
    question: "Can I generate Python project ideas for students?",
    answer:
      "Yes. Python Django, Flask, AI/ML Python, and Data Science stacks are supported for student projects, dashboards, prediction systems, and automation tools.",
  },
  {
    question: "Can this help with resume and placement?",
    answer:
      "Yes. The tool generates resume bullets, project explanation points, and portfolio-friendly wording. You can also check your resume with the AI Resume ATS Checker.",
  },
  {
    question: "Can I use this for mini projects?",
    answer:
      "Yes. Select Mini Project and choose an easier difficulty or shorter time left. The tool will keep the idea simpler and more practical.",
  },
  {
    question: "Can I use this for major projects?",
    answer:
      "Yes. Select Major Project or Final Year Project and choose Balanced, Impressive, or Advanced difficulty for a deeper project plan.",
  },
  {
    question: "Is this project generator free?",
    answer:
      "Yes. KASA's AI Final Year Project Kit Generator is free to use for students who need ideas, documentation, viva prep, and starter project structure.",
  },
  {
    question: "How should I choose a final year project topic?",
    answer:
      "Choose a topic that matches your skill level, available time, team size, faculty expectations, and placement goals. A project you can explain clearly is better than a complex idea you cannot complete.",
  },
];

const useCases = [
  {
    title: "For BTech CSE Students",
    description: "Generate major project ideas, architecture, database schema, APIs, documentation, and viva prep for CSE final year.",
    icon: GraduationCap,
  },
  {
    title: "For BCA & MCA Students",
    description: "Create practical project kits for web apps, management systems, dashboards, AI tools, and portfolio-ready software.",
    icon: BookOpenCheck,
  },
  {
    title: "For Mini Projects",
    description: "Get simple project ideas with source-code structure, modules, setup steps, and easy explanation points.",
    icon: Blocks,
  },
  {
    title: "For Major Projects",
    description: "Plan impressive final year projects with abstract, problem statement, system design, future scope, and report content.",
    icon: Rocket,
  },
  {
    title: "For Viva & Placement",
    description: "Prepare viva answers, resume bullets, project explanation, and interview-friendly talking points.",
    icon: Presentation,
  },
];

const stackExamples = [
  {
    title: "MERN Stack Final Year Project",
    focus: "React, Node.js, Express, MongoDB",
    points: [
      "Generate user/admin modules, REST APIs, MongoDB schema, and folder structure.",
      "Best for LMS, e-commerce, task manager, HR, finance, and dashboard projects.",
      "Good for students who want a placement-friendly full-stack project.",
    ],
  },
  {
    title: "AI/ML Final Year Project",
    focus: "Python, model workflow, dataset, prediction",
    points: [
      "Generate problem statement, dataset idea, ML workflow, model features, and evaluation plan.",
      "Best for healthcare, agriculture, education, finance, and recommendation systems.",
      "Useful for viva because model choice and future scope can be explained clearly.",
    ],
  },
  {
    title: "Java Spring Boot Project",
    focus: "REST APIs, database, backend modules",
    points: [
      "Generate entity design, API endpoints, service modules, and setup steps.",
      "Best for library, hospital, banking, attendance, billing, and management systems.",
      "Strong option for students targeting backend developer roles.",
    ],
  },
  {
    title: "Python Django Project",
    focus: "Admin panel, database models, web app",
    points: [
      "Generate models, views, templates, user roles, and database schema.",
      "Best for student portals, inventory systems, LMS, appointment systems, and CRM projects.",
      "Practical for BCA, MCA, and diploma students with limited time.",
    ],
  },
  {
    title: "IoT + Web Dashboard Project",
    focus: "Sensor data, dashboard, alerts",
    points: [
      "Generate device flow, data collection plan, dashboard screens, and database schema.",
      "Best for smart agriculture, smart city, health monitoring, and energy projects.",
      "Good for teams that want hardware plus software presentation impact.",
    ],
  },
  {
    title: "Cybersecurity Project",
    focus: "Security tool, scanner, detection, report",
    points: [
      "Generate project scope, modules, test cases, risk explanation, and report structure.",
      "Best for phishing detection, vulnerability scanner, password audit, and network security tools.",
      "Useful when you need a project that sounds strong in viva and interviews.",
    ],
  },
];

const deliverables = [
  { title: "Project Idea", text: "Title, tagline, domain, difficulty fit, and project direction.", icon: Lightbulb },
  { title: "Synopsis", text: "Abstract, problem statement, objectives, modules, and future scope.", icon: FileText },
  { title: "Architecture", text: "System flow, components, screens, APIs, and database planning.", icon: FolderTree },
  { title: "Code Starter", text: "Folder structure, setup guide, environment sample, and ZIP download.", icon: Code2 },
  { title: "Database Schema", text: "Tables or collections, relationships, fields, and data planning.", icon: Database },
  { title: "Viva Prep", text: "Viva questions, answers, resume bullets, and presentation points.", icon: ListChecks },
];

export default function FinalYearProjectKitGeneratorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "AI Final Year Project Kit Generator",
      alternateName: ["Final Year Project Generator", "Final Year Project Ideas Generator", "Project Synopsis Generator", "Project Report Generator"],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free AI final year project kit generator for students to create BTech, BCA, MCA, CSE project ideas, source-code starter, synopsis, report, documentation, viva questions, resume bullets, and downloadable ZIP.",
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
      name: "How to generate a final year project kit",
      description: "Generate final year project ideas, source-code starter, documentation, viva questions, resume bullets, and ZIP in minutes.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose course and project type",
          text: "Select BTech CSE, BCA, MCA, diploma, mini project, major project, internship project, or portfolio project.",
        },
        {
          "@type": "HowToStep",
          name: "Select stack and domain",
          text: "Choose MERN, React, Next.js, Python, Java, AI/ML, data science, IoT, cybersecurity, or another stack and domain.",
        },
        {
          "@type": "HowToStep",
          name: "Set difficulty and time left",
          text: "Add difficulty, team size, time left, and goal so the project kit matches your actual deadline and skill level.",
        },
        {
          "@type": "HowToStep",
          name: "Generate and download",
          text: "Generate the project kit, review documentation, viva questions, architecture, and download the starter ZIP.",
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

      <FinalYearProjectSeoContent />

      <ToolSeoSection
        eyebrow="Final year project FAQ"
        title="AI Final Year Project Kit Generator FAQ"
        description="Learn how to turn the generated kit into a practical build plan, faculty-ready documentation, and confident viva preparation."
        keywords={[
          "final year project generator",
          "final year project ideas",
          "final year project with source code",
          "final year project report",
          "final year project documentation",
          "final year project synopsis",
          "BTech final year project",
          "BTech CSE project with source code",
          "BCA project with documentation",
          "MCA project with documentation",
          "major project report generator",
          "mini project source code",
          "AI project generator",
          "project synopsis generator",
          "project viva questions",
          "MERN stack project ideas",
          "Python project for students",
        ]}
        faqs={projectFaqs}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/ai-resume-builder", label: "AI Resume Builder" },
          { href: "/tools/resume-builder-studio", label: "Free Resume Builder" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/assignment-deadline-planner", label: "Assignment Deadline Planner" },
        ]}
      />
    </div>
  );
}

function FinalYearProjectSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How AI Final Year Project Kit Generator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Generate project ideas, source-code starter, report, synopsis, and viva prep
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s AI Final Year Project Kit Generator helps students move from confusion to a complete project direction in minutes. Choose your course, project type, tech stack, domain, difficulty, time left, team size, and goal. The generator then prepares a practical kit with a project title, abstract, problem statement, objectives, features, architecture, folder structure, database schema, API endpoints, screen plan, setup steps, documentation outline, viva questions, resume bullets, and future scope.
              </p>
              <p>
                The best output depends on your constraint. A student with one week left needs a smaller build with clear modules, screenshots, and a strong explanation. A team with six weeks can choose deeper architecture, authentication, dashboards, APIs, testing, and deployment. The page is designed around those real decisions: selecting an idea, planning implementation, preparing documentation, getting ready for viva, and turning the project into placement value.
              </p>
              <p>
                A good final year project should be practical, explainable, and finishable. Many students choose a topic that sounds advanced but becomes difficult to complete before submission. This project kit generator balances ambition with time left. If you have only a few days, generate an easy mini project with clear modules. If you have one or two months, choose a major project with better architecture, database design, authentication, dashboard screens, APIs, and future scope. For placement, choose a stack that matches your resume goal and then use the generated resume bullets in the{" "}
                <Link href="/tools/resume-ats-checker" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Resume ATS Checker
                </Link>
                .
              </p>
              <p>
                Use the generated kit as a roadmap, not as blind copy-paste material. Read the abstract, understand the problem statement, build the modules step by step, and prepare the viva answers in your own words. If your faculty asks for documentation, expand the generated synopsis into chapters such as introduction, literature survey, proposed system, requirements, system design, implementation, testing, results, conclusion, and future scope. To manage your deadline, combine this page with the{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                {" "}and{" "}
                <Link href="/tools/assignment-deadline-planner" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Assignment Deadline Planner
                </Link>
                .
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Project kit includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Project idea", "Synopsis and report plan", "Architecture", "Source-code structure", "Viva questions", "Resume bullets"].map((item) => (
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
            Final year project generator for every student deadline
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
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
            Project Deliverables
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Everything students need for project submission and viva
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deliverables.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                  <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.text}
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
                Project Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Popular final year project ideas by stack
              </h2>
            </div>
            <Link href="/tools/ai-resume-builder" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Add project to resume
              <FileText className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {stackExamples.map((example) => (
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

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/82 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/88 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
            Choosing Guide
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Pick a project scope that matches your deadline
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Mini project",
                bestFor: "Few days left, solo work, or first working prototype",
                includes: "One clear problem, 3-5 modules, simple database, screenshots, and easy viva flow.",
              },
              {
                title: "Major project",
                bestFor: "Four to eight weeks, team submission, or stronger portfolio value",
                includes: "Authentication, role-based dashboard, APIs, testing notes, deployment plan, and report chapters.",
              },
              {
                title: "Advanced build",
                bestFor: "Placement-focused students who can explain architecture confidently",
                includes: "ML model, IoT data, analytics, security layer, integrations, or performance decisions where relevant.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary dark:text-emerald-200">
                  {item.bestFor}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.includes}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker", icon: Search },
            { href: "/tools/ai-resume-builder", label: "AI Resume Builder", icon: FileText },
            { href: "/tools/study-timetable-generator", label: "Study Timetable Generator", icon: TerminalSquare },
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

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { title: "Ethical Use", text: "Use the generated kit as a roadmap and build the project yourself.", icon: ShieldCheck },
            { title: "Starter ZIP", text: "Download a source-code structure and documentation starter.", icon: FileArchive },
            { title: "Viva Ready", text: "Prepare explanation points for architecture, database, APIs, and future scope.", icon: Presentation },
            { title: "Portfolio Value", text: "Turn your project into resume bullets and interview stories.", icon: UsersRound },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[1rem] border border-blue-950/10 bg-white/82 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
