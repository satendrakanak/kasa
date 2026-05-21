import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, CheckCircle2, HelpCircle, Target } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AttendanceCalculator } from "@/components/tools/attendance-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Attendance Calculator - Check 75% Attendance Requirement",
  description:
    "Free attendance calculator to check your attendance percentage, how many classes you can miss, and how many classes you need to attend for 75% attendance.",
  keywords: [
    "attendance calculator",
    "75 attendance calculator",
    "attendance percentage calculator",
    "college attendance calculator",
    "classes bunk calculator",
    "how many classes can I miss",
    "how many classes need to attend",
    "student attendance calculator",
  ],
  alternates: {
    canonical: "/tools/attendance-calculator",
  },
  openGraph: {
    title: "Attendance Calculator - Free 75% Attendance Tool",
    description:
      "Calculate attendance percentage instantly and see how many classes you can miss or need to attend.",
    url: "/tools/attendance-calculator",
  },
};

const examples = [
  ["36 attended", "48 total classes", "75.00% attendance"],
  ["42 attended", "56 total classes", "75.00% attendance"],
  ["28 attended", "40 total classes", "70.00% attendance"],
];

const heroKeywords = [
  "75% attendance calculator",
  "attendance percentage calculator",
  "how many classes can I miss",
  "attendance shortage calculator",
];

export default function AttendanceCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Attendance Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free attendance calculator to calculate attendance percentage and 75% attendance requirements.",
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
                <CalendarCheck className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Attendance Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Attendance Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Check your attendance percentage, 75% eligibility, and how many classes you can miss
                or need to attend. Useful for school, college, coaching, and online batches.
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
                    Built around the 75% rule
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Change the required percentage anytime for your institute policy.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Shows exact attendance percentage instantly." />
                <QuickPoint text="Tells how many classes can be missed safely." />
                <QuickPoint text="Tells how many future classes are needed to recover." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AttendanceCalculator />

      <section className="relative py-12">
        <div className={siteContainerClasses({ className: "grid gap-6 lg:grid-cols-[0.72fr_1fr]" })}>
          <div>
            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[image:var(--button-solid)] !text-white">
              <HelpCircle className="size-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              How to calculate attendance percentage
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Attendance is calculated by dividing attended classes by total classes, then multiplying
              the result by 100.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {examples.map(([attended, total, result]) => (
              <div
                key={`${attended}-${total}`}
                className="rounded-[1.1rem] border border-blue-950/10 bg-white/86 p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-300">{attended}</div>
                <div className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">{total}</div>
                <div className="mt-5 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolSeoSection
        eyebrow="Attendance calculator FAQ"
        title="75% attendance calculator for students"
        description="Use this attendance percentage calculator to check college attendance, coaching attendance, and school attendance targets. The tool helps students understand safe bunk limits, shortage recovery, and required future classes."
        keywords={[
          "75% attendance calculator",
          "attendance shortage calculator",
          "bunk calculator",
          "minimum attendance calculator",
          "college attendance percentage",
        ]}
        faqs={[
          {
            question: "How is attendance percentage calculated?",
            answer:
              "Attendance percentage is calculated by dividing attended classes by total classes and multiplying the result by 100.",
          },
          {
            question: "How many classes can I miss and still maintain 75% attendance?",
            answer:
              "If your attended classes are above the required minimum, the calculator shows how many classes you can miss while staying at or above the selected attendance target.",
          },
          {
            question: "Can I use this for targets other than 75%?",
            answer:
              "Yes. You can set any required attendance target from 0% to 100%, including 65%, 70%, 75%, 80%, or 85%.",
          },
        ]}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
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
