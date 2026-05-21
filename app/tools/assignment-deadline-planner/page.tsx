import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardList } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AssignmentDeadlinePlanner } from "@/components/tools/assignment-deadline-planner";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Assignment Deadline Planner - Plan Homework and Projects",
  description:
    "Free assignment deadline planner for students to split pages, tasks, research, writing, editing, and review time before the due date.",
  keywords: [
    "assignment deadline planner",
    "assignment planner",
    "homework planner",
    "project deadline calculator",
    "student deadline planner",
  ],
  alternates: { canonical: "/tools/assignment-deadline-planner" },
  openGraph: {
    title: "Assignment Deadline Planner - Free Student Tool",
    description: "Create a simple assignment work plan from pages, days left, daily time, and difficulty.",
    url: "/tools/assignment-deadline-planner",
  },
};

export default function AssignmentDeadlinePlannerPage() {
  const heroKeywords = ["assignment deadline planner", "homework planner", "project deadline calculator", "student task planner"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Assignment Deadline Planner",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free assignment deadline planner for students to split project work into daily tasks.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />
      <section className="relative pb-8 pt-[9.25rem] sm:pt-[10.25rem] lg:pt-[10.75rem]">
        <div className={siteContainerClasses()}>
          <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All tools
          </Link>
          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Deadline planner
              </div>
              <ToolBreadcrumb current="Assignment Deadline Planner" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Assignment Deadline Planner
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Plan assignment work by days left, pages, difficulty, daily available time, and review buffer so you finish before the deadline.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={ClipboardList}
              title="Built for project deadlines"
              description="Break a deadline into research, writing, editing, and final check time."
              points={[
                "Estimate daily minutes needed before the due date.",
                "See whether your deadline is manageable.",
                "Download a task breakdown for later.",
              ]}
            />
          </div>
        </div>
      </section>
      <AssignmentDeadlinePlanner />
      <ToolSeoSection
        eyebrow="Assignment planner FAQ"
        title="Assignment deadline planner for students"
        description="Use this assignment deadline planner to calculate daily work time, task breakdown, review buffer, writing time, and project completion effort."
        keywords={["assignment deadline planner", "assignment planner", "homework planner", "project deadline calculator"]}
        faqs={[
          { question: "How do I plan an assignment before the deadline?", answer: "Estimate total pages or tasks, divide the work across the days left, and keep a review buffer for editing and final checks." },
          { question: "What does the assignment planner calculate?", answer: "It estimates daily work minutes, total work hours, available capacity, pages per day, and time split across research, outline, writing, editing, and final review." },
          { question: "Can I use this for homework and projects?", answer: "Yes. It works for assignments, essays, reports, homework, and student projects." },
        ]}
        relatedTools={[
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
        ]}
      />
    </div>
  );
}
