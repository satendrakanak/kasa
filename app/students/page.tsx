import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  LayoutTemplate,
  Route,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import {
  FaqStructuredData,
  ItemListStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";
import { RelatedToolsBlock } from "@/components/site/related-tools-block";
import { siteContainerClasses } from "@/components/site/site-container";
import { siteButtonClasses } from "@/components/site/site-button";
import { ToolBreadcrumb } from "@/components/tools/tool-hero-extras";
import { tools, type ToolItem } from "@/lib/tools";

const pageTitle = "Free Student Tools for Resume, ATS, Projects, CGPA, Attendance and Exams";
const pageDescription =
  "Use KASA free student tools for resume building, ATS resume checking, career roadmap planning, final year project kits, interview questions, attendance, CGPA, GPA, marks, and exam planning.";

export const metadata: Metadata = {
  title: `${pageTitle} | KASA`,
  description: pageDescription,
  keywords: [
    "free student tools",
    "resume builder for students",
    "ATS resume checker",
    "career roadmap generator",
    "final year project ideas",
    "final year project documentation",
    "attendance calculator",
    "75 percent attendance calculator",
    "CGPA to percentage converter",
    "GPA calculator",
    "marks percentage calculator",
    "study timetable generator",
    "interview questions for freshers",
    "exam planning tools",
  ],
  alternates: {
    canonical: "/students",
  },
};

type HighlightTool = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type Workflow = {
  title: string;
  description: string;
  points: string[];
  href: string;
  cta: string;
  icon: LucideIcon;
};

const studentTools = tools.filter((tool) => tool.category === "Students" && tool.status === "Live");

function pickTool(slug: string) {
  return studentTools.find((tool) => tool.slug === slug);
}

const priorityToolSlugs = [
  "resume-builder-studio",
  "resume-ats-checker",
  "ai-career-roadmap",
  "final-year-project-kit-generator",
  "attendance-calculator",
  "cgpa-percentage-converter",
  "gpa-calculator",
  "study-timetable-generator",
  "final-exam-calculator",
  "marks-percentage-calculator",
  "assignment-deadline-planner",
  "study-hours-calculator",
];

const priorityTools = priorityToolSlugs.map(pickTool).filter(Boolean) as ToolItem[];

const highlights: HighlightTool[] = [
  {
    title: "Resume and ATS preparation",
    description:
      "Create a fresher resume, check ATS gaps, improve bullets, and prepare a cleaner profile before applying.",
    href: "/tools/resume-builder-studio",
    icon: FileSearch,
  },
  {
    title: "Career roadmap planning",
    description:
      "Choose a target role and turn it into a weekly learning plan with skills, projects, and interview focus areas.",
    href: "/tools/ai-career-roadmap",
    icon: Route,
  },
  {
    title: "Final year project support",
    description:
      "Generate project ideas, modules, documentation outline, viva questions, and resume points from one topic.",
    href: "/tools/final-year-project-kit-generator",
    icon: GraduationCap,
  },
  {
    title: "Exam and college calculators",
    description:
      "Check attendance, GPA, CGPA, marks percentage, final exam targets, deadlines, and daily study hours.",
    href: "/tools/attendance-calculator",
    icon: Target,
  },
];

const workflows: Workflow[] = [
  {
    title: "Placement preparation without confusion",
    description:
      "Start with a clean resume, check it against the role, then revise interview questions that match your profile.",
    points: ["Build a student-friendly resume.", "Find missing keywords and weak bullets.", "Practice HR, project, and technical questions."],
    href: "/tools/resume-ats-checker",
    cta: "Check resume",
    icon: Trophy,
  },
  {
    title: "Final year project planning",
    description:
      "Turn a broad idea into modules, documentation structure, viva preparation, and resume-ready project points.",
    points: ["Pick a practical project direction.", "Prepare documentation and viva preparation.", "Add honest project points to your resume."],
    href: "/tools/final-year-project-kit-generator",
    cta: "Generate project kit",
    icon: LayoutTemplate,
  },
  {
    title: "Exam and semester control",
    description:
      "Use calculators to understand attendance risk, target marks, study hours, GPA, and CGPA before it becomes urgent.",
    points: ["Know safe attendance and recovery classes.", "Plan daily study hours before exams.", "Convert CGPA or calculate GPA accurately."],
    href: "/tools/study-timetable-generator",
    cta: "Plan study time",
    icon: BookOpenCheck,
  },
];

const studentOutcomes = [
  {
    title: "Placement profile",
    description: "Prepare resume sections, improve ATS keywords, and practice questions around your projects and target role.",
  },
  {
    title: "Semester planning",
    description: "Calculate attendance, final exam targets, GPA, CGPA, marks percentage, deadlines, and study hours before exams.",
  },
  {
    title: "Project readiness",
    description: "Move from a rough final year project idea to modules, documentation structure, viva preparation, and resume points.",
  },
];

const preparationGuide = [
  {
    title: "Before applying for internships or fresher jobs",
    description:
      "Create one clean resume, check it with the ATS resume checker, then update weak bullets with measurable project work, skills, education, and certifications.",
  },
  {
    title: "Before project review or viva",
    description:
      "Use the project kit generator to clarify problem statement, modules, tech stack, database design, documentation flow, viva questions, and resume-ready project lines.",
  },
  {
    title: "Before exams and attendance shortage",
    description:
      "Check attendance percentage, required classes, final exam score target, study hours, assignment deadline plan, and CGPA conversion from one student tools hub.",
  },
];

const faqs: Array<[string, string]> = [
  [
    "What can students use KASA for?",
    "Students can use KASA for resume building, ATS checking, career roadmap planning, final year project preparation, interview questions, attendance calculation, CGPA conversion, GPA calculation, marks percentage, and study planning.",
  ],
  [
    "Which tool should a student use first?",
    "For placements, start with the resume builder and ATS checker. For academics, start with the attendance calculator, GPA calculator, CGPA converter, or study timetable generator. For final year work, start with the project kit generator.",
  ],
  [
    "Are these tools useful for freshers and final year students?",
    "Yes. The resume, ATS, career roadmap, project kit, and interview question pages are especially useful for freshers, final year students, and students preparing for placements.",
  ],
  [
    "Are the calculators official university calculators?",
    "No. They are practical planning tools. Students should always compare the result with their college, board, or university's official formula before making final academic decisions.",
  ],
];

function ToolLinkCard({ tool }: { tool: ToolItem }) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex min-h-[13rem] flex-col rounded-[1.15rem] border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-blue-950/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/15"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-primary transition group-hover:bg-primary group-hover:text-white dark:bg-primary/12 dark:text-emerald-200">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
        {tool.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {tool.description}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary dark:text-emerald-200">
        Open tool
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function StudentsPage() {
  return (
    <div className="relative overflow-hidden bg-[#f7fbff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <WebPageStructuredData
        name={pageTitle}
        description={pageDescription}
        href="/students"
        image="/student-tools-hero.png"
      />
      <ItemListStructuredData
        name="KASA free student tools"
        items={priorityTools.map((tool) => ({
          title: tool.title,
          href: `/tools/${tool.slug}`,
          description: tool.description,
        }))}
      />
      <FaqStructuredData faqs={faqs} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45rem] bg-[linear-gradient(180deg,#eef7ff_0%,#ffffff_58%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,0.96)_58%,rgba(6,17,38,0)_100%)]" />

      <section className="relative pb-12 pt-[8.75rem] sm:pt-[9.75rem] lg:pb-16 lg:pt-[10.25rem]">
        <div className={siteContainerClasses({ className: "grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center" })}>
          <div>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-950/10 bg-white/80 px-3.5 py-2 text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 dark:text-emerald-200 sm:text-xs">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>Free student tools</span>
            </div>
            <ToolBreadcrumb current="Students" />
            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3rem] xl:text-[3.45rem] dark:text-white">
              Free student tools for resume, ATS score, projects, attendance, CGPA and exams.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-300">
              Build a fresher resume, check ATS score, plan a career path, prepare final year project work,
              calculate attendance, convert CGPA, calculate GPA, and plan exam study time from one simple student hub.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#student-tools" className={siteButtonClasses({ size: "lg" })}>
                Explore student tools
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/students/interview-questions" className={siteButtonClasses({ variant: "outline", size: "lg" })}>
                Interview questions
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {studentOutcomes.map((item) => (
                <div key={item.title} className="rounded-[1rem] border border-blue-950/10 bg-white/78 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="text-base font-semibold text-slate-950 dark:text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[44rem] lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/76 p-5 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/25">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                    KASA for students
                  </p>
                  <h2 className="mt-2 max-w-md font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                    Pick the right tool for the next student task.
                  </h2>
                </div>
                <Link
                  href="/tools"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-200"
                >
                  Browse tools
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group rounded-[1.1rem] border border-blue-950/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary/35 dark:border-white/10 dark:bg-slate-950/40"
                    >
                      <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-primary transition group-hover:bg-primary group-hover:text-white dark:bg-primary/12 dark:text-emerald-200">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-blue-950/10 bg-[#f8fbff] dark:border-white/10 dark:bg-white/[0.04]">
                <Image
                  src="/student-tools-hero.png"
                  alt="Student using KASA free tools for resume, projects, attendance and study planning"
                  width={980}
                  height={760}
                  priority
                  className="max-h-[22rem] w-full object-contain p-4"
                  sizes="(min-width: 1024px) 44rem, 92vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="student-tools" className="relative bg-white px-4 py-14 dark:bg-surface sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
                Student toolkit
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.12] text-slate-950 sm:text-5xl dark:text-white">
                Tools for the problems students search before placements, exams and submissions.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
              Use these free tools when you need a quick result: an ATS-friendly resume, a better resume score, a career
              roadmap, final year project structure, 75% attendance calculation, CGPA to percentage conversion, GPA result,
              marks percentage, final exam target, or a study timetable.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {priorityTools.map((tool) => (
              <ToolLinkCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#eef7ff] px-4 py-14 dark:bg-surface-strong sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
              Student workflows
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.12] text-slate-950 sm:text-5xl dark:text-white">
              A better path than opening ten random tabs before every deadline.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
              Students usually search when there is pressure: resume submission, placement drive, final year project review,
              attendance shortage, exam target, or assignment deadline. These workflows keep that work practical.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {workflows.map((workflow) => {
              const Icon = workflow.icon;
              return (
                <article
                  key={workflow.title}
                  className="rounded-[1.2rem] border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-primary dark:bg-primary/12 dark:text-emerald-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                    {workflow.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{workflow.description}</p>
                  <ul className="mt-5 space-y-3">
                    {workflow.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={workflow.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-emerald-200">
                    {workflow.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 dark:bg-surface sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto grid w-full max-w-[108rem] gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-[#f8fbff] p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
              <GraduationCap className="size-4" aria-hidden="true" />
              Preparation guide
            </div>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              What should students do with these tools?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
              A student tool page should not only list links. It should help students decide the next step for placement,
              project work, semester marks, attendance recovery, and exam preparation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {preparationGuide.map((item) => (
              <div key={item.title} className="rounded-[1.15rem] border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-300" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold leading-6 text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedToolsBlock
        context="home"
        pageTitle={pageTitle}
        keywords={metadata.keywords as string[]}
        title="Popular tools for students."
        description="Open a calculator, planner, converter, resume tool, or AI generator for placement preparation, exam planning, and project work."
        limit={8}
        className="py-14 sm:py-18"
      />

      <section className="bg-white px-4 py-14 dark:bg-surface sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
              Student FAQs
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.12] text-slate-950 sm:text-5xl dark:text-white">
              Common questions students ask before using these tools.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-[1.15rem] border border-blue-950/10 bg-[#f8fbff] p-6 dark:border-white/10 dark:bg-white/[0.04]">
                <h3 className="font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 dark:bg-surface sm:px-6 sm:pb-18 lg:px-8">
        <div className="mx-auto flex w-full max-w-[108rem] flex-col gap-4 rounded-[1.25rem] border border-blue-950/10 bg-[#f8fbff] p-5 dark:border-white/10 dark:bg-white/[0.04] md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
              <GraduationCap className="size-4" aria-hidden="true" />
              For students and academies
            </div>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              KASA keeps student tools useful, focused, and connected to real preparation.
            </h2>
          </div>
          <Link href="/tools" className={siteButtonClasses({ size: "md" })}>
            Browse all tools
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
