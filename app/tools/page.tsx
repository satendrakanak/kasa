import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Search, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { ToolBreadcrumb } from "@/components/tools/tool-hero-extras";
import { ToolsDirectory } from "@/components/tools/tools-directory";

export const metadata: Metadata = {
  title: "Free AI Tools for Students and Teachers - Calculators, Planners, Question Papers",
  description:
    "Use free AI tools and education calculators including attendance calculator, GPA calculator, study timetable generator, AI question paper generator, marks calculator, and exam planning tools.",
  keywords: [
    "free AI tools",
    "AI tools for teachers",
    "AI tools for students",
    "AI question paper generator",
    "AI quiz generator",
    "AI lesson plan generator",
    "AI worksheet generator",
    "AI report card generator",
    "AI assignment generator",
    "AI final year project kit generator",
    "final year project ideas",
    "BTech project ideas",
    "BCA project with documentation",
    "project viva questions",
    "project zip download",
    "online quiz generator",
    "free student tools",
    "attendance calculator",
    "marks percentage calculator",
    "GPA calculator",
    "CGPA calculator",
    "grade calculator",
    "study timetable generator",
    "exam study planner",
    "course pricing calculator",
    "course fee calculator",
    "online course pricing calculator",
    "academy profit calculator",
    "coaching institute profit calculator",
    "AI profit strategy",
    "fee receipt generator",
    "coaching fee receipt generator",
    "tuition fee receipt generator",
    "admission form generator",
    "student admission form generator",
    "coaching admission form",
    "batch capacity calculator",
    "coaching seats calculator",
    "classroom capacity calculator",
    "certificate generator",
    "course completion certificate generator",
    "printable certificate maker",
  ],
  alternates: {
    canonical: "/tools",
  },
};

const popularSearches = [
  { label: "final year project ideas", href: "/tools/final-year-project-kit-generator" },
  { label: "AI project kit generator", href: "/tools/final-year-project-kit-generator" },
  { label: "BTech project with documentation", href: "/tools/final-year-project-kit-generator" },
  { label: "free ATS checker", href: "/tools/resume-ats-checker" },
  { label: "AI resume checker", href: "/tools/resume-ats-checker" },
  { label: "75% attendance calculator", href: "/tools/attendance-calculator" },
  { label: "marks percentage calculator", href: "/tools/marks-percentage-calculator" },
  { label: "CGPA calculator", href: "/tools/cgpa-percentage-converter" },
  { label: "weighted grade calculator", href: "/tools/grade-calculator" },
  { label: "final exam calculator", href: "/tools/final-exam-calculator" },
  { label: "study timetable generator", href: "/tools/study-timetable-generator" },
  { label: "CGPA to percentage converter", href: "/tools/cgpa-percentage-converter" },
  { label: "board percentage calculator", href: "/tools/board-percentage-calculator" },
  { label: "scholarship eligibility calculator", href: "/tools/scholarship-eligibility-calculator" },
  { label: "AI quiz generator", href: "/tools/quiz-generator" },
  { label: "AI lesson plan generator", href: "/tools/lesson-plan-generator" },
  { label: "AI worksheet generator", href: "/tools/worksheet-generator" },
  { label: "AI report card generator", href: "/tools/report-card-generator" },
  { label: "AI assignment generator", href: "/tools/assignment-generator" },
  { label: "AI question paper generator", href: "/tools/question-paper-generator" },
  { label: "exam study planner", href: "/tools/study-hours-calculator" },
  { label: "course pricing calculator", href: "/tools/course-pricing-calculator" },
  { label: "academy profit calculator", href: "/tools/profit-calculator" },
  { label: "fee receipt generator", href: "/tools/fee-receipt-generator" },
  { label: "admission form generator", href: "/tools/admission-form-generator" },
  { label: "batch capacity calculator", href: "/tools/batch-capacity-calculator" },
  { label: "certificate generator", href: "/tools/certificate-generator" },
];

export default function ToolsPage() {
  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-10 pt-[9.25rem] sm:pt-[10.25rem] lg:pb-14 lg:pt-[10.75rem]">
        <div
          className={siteContainerClasses({
            className:
              "grid gap-8 text-center lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:text-left",
          })}
        >
          <div className="mx-auto max-w-3xl lg:mx-0">
            <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
              <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
              <span>Free AI education tools</span>
            </div>
            <ToolBreadcrumb current="Free AI Tools" />
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
              Free AI tools that help students and teachers work faster.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
              Fast calculators, planners, converters, and AI generators for attendance, marks percentage, GPA, CGPA, weighted
              grades, final exam scores, study planning, and printable teacher question papers. No signup, no clutter, just useful outputs
              students and teachers can save, print, and share.
            </p>

            <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {popularSearches.map((search) => (
                <Link
                  key={search.label}
                  href={search.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-950/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white hover:text-primary dark:border-white/10 dark:bg-white/6 dark:text-white/70 dark:hover:text-emerald-200"
                >
                  <Search className="size-3.5 text-primary dark:text-emerald-300" aria-hidden="true" />
                  {search.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[42rem] lg:max-w-none">
            <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-2xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/25 sm:min-h-[28rem] sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(43,168,255,0.15),transparent_16rem),radial-gradient(circle_at_78%_70%,rgba(34,181,115,0.12),transparent_18rem)]" />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                    AI tools hub
                  </p>
                  <h2 className="mt-2 max-w-sm font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                    Calculate, plan, generate, save, and share in one place.
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  Free to use
                </span>
              </div>

              <div className="relative z-0 mx-auto mt-2 flex justify-center sm:mt-0">
                <Image
                  src="/student-tools-hero.png"
                  alt="Student using online calculators and study planning tools"
                  width={980}
                  height={760}
                  priority
                  className="w-full max-w-[42rem] object-contain drop-shadow-[0_24px_36px_rgba(15,40,80,0.12)]"
                  sizes="(min-width: 1024px) 42rem, 92vw"
                />
              </div>

              <div className="absolute left-5 top-[8.75rem] z-20 hidden max-w-[12rem] rounded-2xl border border-blue-950/10 bg-white/92 p-3 shadow-xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-slate-950/70 sm:block">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
                  Study plan
                </div>
                <div className="mt-1 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                  3 sessions
                </div>
              </div>

              <div className="absolute bottom-6 right-5 z-20 grid w-[13.5rem] gap-2 rounded-2xl border border-blue-950/10 bg-white/92 p-3 shadow-xl shadow-blue-950/12 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                {[
                  ["GPA", "8.4"],
                  ["Board %", "86.2%"],
                  ["AI paper", "Ready"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3 rounded-xl bg-blue-50/75 px-3 py-2 dark:bg-white/[0.06]">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">{label}</span>
                    <span className="text-sm font-semibold text-slate-950 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-12">
        <div className={siteContainerClasses()}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                Choose a tool
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Free tools library
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Calculate attendance, marks, GPA, weighted grades, study plans, and generate teacher-ready AI papers without creating an account.
            </p>
          </div>

          <ToolsDirectory />
        </div>
      </section>

      <section className="relative border-y border-blue-950/10 bg-white/72 py-10 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
        <div className={siteContainerClasses({ className: "grid gap-4 md:grid-cols-3" })}>
          {[
            "AI-powered and student-first tools for attendance, marks, grades, GPA, question papers, and exam planning.",
            "Useful outputs students can copy, download, print, email, and share.",
            "SEO-focused tools built around real student and teacher search intent.",
          ].map((point) => (
            <div key={point} className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-white p-5 dark:border-white/10 dark:bg-slate-950/40">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
