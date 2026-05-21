import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { StudyTimetableGenerator } from "@/components/tools/study-timetable-generator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Study Timetable Generator - Create a Study Plan for Exams",
  description:
    "Free study timetable generator for students to create a daily study schedule based on subjects, priorities, exam days, study hours, and revision time.",
  keywords: [
    "study timetable generator",
    "study planner",
    "exam study schedule",
    "study schedule maker",
    "revision timetable generator",
    "daily study timetable",
    "student study planner",
    "study plan generator",
  ],
  alternates: {
    canonical: "/tools/study-timetable-generator",
  },
  openGraph: {
    title: "Study Timetable Generator - Free Student Tool",
    description:
      "Generate a balanced study timetable with daily sessions, subject priorities, breaks, and revision time.",
    url: "/tools/study-timetable-generator",
  },
};

export default function StudyTimetableGeneratorPage() {
  const heroKeywords = [
    "study timetable generator",
    "exam study schedule",
    "revision timetable generator",
    "daily study planner",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Study Timetable Generator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free study timetable generator for students using subjects, priorities, exam days, and daily study hours.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pt-[10.75rem]">
        <div className={siteContainerClasses()}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All tools
          </Link>

          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Student planner
              </div>
              <ToolBreadcrumb current="Study Timetable Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Study Timetable Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a balanced exam study plan from your subjects, available study hours, exam
                timeline, and subject priority.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <div className="rounded-[1.4rem] border border-blue-950/10 bg-white/88 p-5 text-left shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
                  <Target className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                    Built for exam preparation
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Plan focused sessions, revision blocks, breaks, and harder subjects without
                    manually arranging every hour.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Generate a day-wise study schedule in seconds." />
                <QuickPoint text="Prioritize difficult subjects and high-effort topics." />
                <QuickPoint text="Balance study sessions with short breaks and revision time." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudyTimetableGenerator />

      <section className="relative pb-12">
        <div className={siteContainerClasses()}>
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              Study planning basics
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              How a study timetable helps students
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              A study timetable divides available preparation time across subjects, revision, and
              breaks. A good plan gives more time to difficult subjects, keeps sessions short enough
              to stay focused, and leaves space for revision before exams.
            </p>
          </div>
        </div>
      </section>

      <ToolSeoSection
        eyebrow="Study timetable FAQ"
        title="Study timetable generator for exam preparation"
        description="Use this study timetable generator to create a day-wise exam preparation schedule with subject priorities, revision time, morning study blocks, afternoon study blocks, evening study blocks, and printable timetable output."
        keywords={[
          "study timetable generator",
          "exam study schedule",
          "revision timetable generator",
          "daily study planner",
          "printable study timetable",
        ]}
        faqs={[
          {
            question: "How does the study timetable generator work?",
            answer:
              "The generator uses your subjects, difficulty, chapters, exam days, session length, revision time, and preferred study windows to create a day-wise study timetable.",
          },
          {
            question: "Can I choose morning, afternoon, or evening study time?",
            answer:
              "Yes. You can enable morning, afternoon, evening, or any combination of study windows, then choose the exact from and to time for each block.",
          },
          {
            question: "Can I print or share my study timetable?",
            answer:
              "Yes. The tool supports copy, share, email, download, and clean print output for the generated timetable.",
          },
        ]}
        relatedTools={[
          { href: "/tools/attendance-calculator", label: "Attendance Calculator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
        ]}
      />
    </div>
  );
}

function QuickPoint({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
