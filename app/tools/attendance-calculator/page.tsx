import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Percent,
  School,
  Target,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { AttendanceCalculator } from "@/components/tools/attendance-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free Attendance Calculator | 75% Attendance, Bunk & Shortage Tool",
  description:
    "Free attendance calculator to check attendance percentage, 75% attendance eligibility, safe bunk limit, shortage recovery, and classes needed to attend.",
  keywords: [
    "free attendance calculator",
    "attendance calculator",
    "75 attendance calculator",
    "75% attendance calculator",
    "attendance percentage calculator",
    "college attendance calculator",
    "school attendance calculator",
    "semester attendance calculator",
    "classes bunk calculator",
    "safe bunk calculator",
    "attendance shortage calculator",
    "attendance recovery calculator",
    "minimum attendance calculator",
    "class attendance calculator",
    "how many classes can I miss",
    "how many classes need to attend",
    "student attendance calculator",
  ],
  alternates: {
    canonical: "/tools/attendance-calculator",
  },
  openGraph: {
    title: "Free Attendance Calculator - 75% Attendance, Bunk & Shortage Tool",
    description:
      "Calculate attendance percentage instantly and see safe bunk limit, attendance shortage, and classes needed for 75%.",
    url: "/tools/attendance-calculator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/attendance-calculator";

const examples = [
  ["36 attended", "48 total classes", "75.00% attendance"],
  ["42 attended", "56 total classes", "75.00% attendance"],
  ["28 attended", "40 total classes", "70.00% attendance"],
  ["60 attended", "80 total classes", "75.00% attendance"],
  ["45 attended", "70 total classes", "64.29% attendance"],
  ["72 attended", "90 total classes", "80.00% attendance"],
];

const heroKeywords = [
  "free attendance calculator",
  "75% attendance calculator",
  "attendance percentage calculator",
  "how many classes can I miss",
  "attendance shortage calculator",
  "safe bunk calculator",
];

const attendanceFaqs = [
  {
    question: "What is an attendance calculator?",
    answer:
      "An attendance calculator is a student tool that calculates attendance percentage from attended classes and total classes. It also shows safe bunk limit, shortage, and classes needed to reach a target.",
  },
  {
    question: "How is attendance percentage calculated?",
    answer:
      "Attendance percentage is calculated by dividing attended classes by total classes and multiplying the result by 100.",
  },
  {
    question: "How do I calculate 75% attendance?",
    answer:
      "Enter your attended classes, total classes, and set the required percentage to 75. The calculator will show your current percentage and whether you meet the 75% attendance rule.",
  },
  {
    question: "How many classes can I miss and still maintain 75% attendance?",
    answer:
      "If your attendance is above the required minimum, the calculator shows how many classes you can miss while staying at or above 75% or your selected target.",
  },
  {
    question: "How many classes do I need to attend to reach 75%?",
    answer:
      "If your attendance is below 75%, the calculator shows the number of future classes you need to attend to recover the required percentage.",
  },
  {
    question: "Can I use this as a bunk calculator?",
    answer:
      "Yes. It works as a safe bunk calculator by showing how many classes you can miss without dropping below your required attendance percentage.",
  },
  {
    question: "Can I calculate attendance shortage?",
    answer:
      "Yes. If your attendance is below the target, the tool shows the shortage and how many classes you need to attend to recover.",
  },
  {
    question: "Can I use targets other than 75%?",
    answer:
      "Yes. You can set any required attendance target from 0% to 100%, such as 60%, 65%, 70%, 75%, 80%, 85%, or 90%.",
  },
  {
    question: "Is this attendance calculator free?",
    answer:
      "Yes. KASA's attendance calculator is free to use for students, schools, colleges, coaching institutes, and online classes.",
  },
  {
    question: "Can I use this for college attendance?",
    answer:
      "Yes. The tool is useful for college semester attendance, lab attendance, lecture attendance, practical classes, and subject-wise attendance planning.",
  },
  {
    question: "Can I use this for school attendance?",
    answer:
      "Yes. School students can calculate monthly attendance, term attendance, annual attendance, and required minimum attendance.",
  },
  {
    question: "Can coaching students use this calculator?",
    answer:
      "Yes. Coaching students can track batch attendance, test-series attendance, doubt class attendance, and safe miss limits.",
  },
  {
    question: "What does safe bunk mean?",
    answer:
      "Safe bunk means the number of classes you can miss while still keeping your attendance at or above the required percentage.",
  },
  {
    question: "What if my total classes increase later?",
    answer:
      "Update the total classes whenever new classes are added. Your attendance percentage, safe bunk limit, and recovery count will update instantly.",
  },
  {
    question: "Does one missed class affect attendance?",
    answer:
      "Yes. Missing one class can reduce your percentage, especially when total classes are low or you are close to the minimum requirement.",
  },
  {
    question: "Can I calculate subject-wise attendance?",
    answer:
      "Yes. Use the calculator separately for each subject by entering attended and total classes for that subject.",
  },
];

const useCases = [
  {
    title: "For College Students",
    description: "Track semester attendance, 75% eligibility, safe bunk limit, and shortage recovery before exams.",
    icon: GraduationCap,
  },
  {
    title: "For School Students",
    description: "Calculate monthly, term-wise, or annual attendance percentage for school requirements.",
    icon: School,
  },
  {
    title: "For Coaching Batches",
    description: "Plan attendance for coaching classes, test series, doubt sessions, and revision batches.",
    icon: UsersRound,
  },
  {
    title: "For Low Attendance Recovery",
    description: "Find how many upcoming classes you need to attend to recover your minimum percentage.",
    icon: AlertTriangle,
  },
  {
    title: "For Safe Bunk Planning",
    description: "Check how many classes you can miss while staying above your required attendance target.",
    icon: CalendarCheck,
  },
];

const attendanceScenarios = [
  {
    title: "Example 75% Attendance",
    focus: "36 attended out of 48 total classes",
    points: ["Attendance is exactly 75%.", "You are at the minimum requirement.", "Missing the next class can drop you below 75%."],
  },
  {
    title: "Example Attendance Shortage",
    focus: "28 attended out of 40 total classes",
    points: ["Current attendance is 70%.", "You are below a 75% target.", "Attend upcoming classes continuously to recover."],
  },
  {
    title: "Example Safe Bunk",
    focus: "72 attended out of 90 total classes",
    points: ["Current attendance is 80%.", "You have a buffer above 75%.", "Use safe bunk count before missing classes."],
  },
];

export default function AttendanceCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free Attendance Calculator",
      alternateName: ["75% Attendance Calculator", "Attendance Percentage Calculator", "Safe Bunk Calculator", "Attendance Shortage Calculator"],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Free attendance calculator to calculate attendance percentage, 75% eligibility, safe bunk limit, attendance shortage, and classes needed to attend.",
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
      name: "How to calculate attendance percentage",
      description: "Calculate attendance percentage, 75% attendance eligibility, safe bunk count, and shortage recovery.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter attended classes",
          text: "Add the number of classes you have attended so far.",
        },
        {
          "@type": "HowToStep",
          name: "Enter total classes",
          text: "Add the total number of classes conducted so far.",
        },
        {
          "@type": "HowToStep",
          name: "Set required attendance",
          text: "Choose your required attendance percentage, such as 75%, 80%, or any institute policy.",
        },
        {
          "@type": "HowToStep",
          name: "Check result",
          text: "Review your attendance percentage, safe bunk limit, shortage, and classes needed to attend.",
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <JsonLd data={jsonLd} />
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

      <AttendanceSeoContent />

      <ToolSeoSection
        eyebrow="Attendance calculator FAQ"
        title="Free 75% Attendance Calculator FAQ"
        description="Use this free attendance calculator as a 75% attendance calculator, attendance percentage calculator, safe bunk calculator, attendance shortage calculator, and college attendance calculator."
        keywords={[
          "free attendance calculator",
          "75% attendance calculator",
          "attendance percentage calculator",
          "attendance shortage calculator",
          "safe bunk calculator",
          "minimum attendance calculator",
          "college attendance percentage",
          "how many classes can I miss",
          "how many classes need to attend",
          "student attendance calculator",
        ]}
        faqs={attendanceFaqs}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
        ]}
      />
    </div>
  );
}

function AttendanceSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Attendance Calculator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Calculate 75% attendance, safe bunk count, and shortage recovery
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free Attendance Calculator helps students quickly check attendance percentage, 75% attendance eligibility, safe bunk limit, and shortage recovery. Enter the number of classes attended, total classes conducted, and the required attendance target. The tool instantly shows whether your attendance is safe, close to shortage, or below the minimum. It also tells how many classes you can miss safely or how many upcoming classes you need to attend to recover the target.
              </p>
              <p>
                The basic attendance formula is simple: attended classes divided by total classes, multiplied by 100. For example, 36 attended classes out of 48 total classes gives exactly 75% attendance. But students usually need more than the formula. The real question is: how many classes can I miss, how many classes do I need to attend, and will one bunk drop me below the required percentage? This attendance percentage calculator answers those practical questions for college, school, coaching, and online batches.
              </p>
              <p>
                College students can use it as a 75 attendance calculator for semester lectures, lab sessions, practical classes, and subject-wise attendance. School students can use it for monthly, term-wise, or yearly attendance. Coaching students can track batch attendance, test series, and revision classes. If your attendance is already low, the shortage recovery number helps you plan the next few weeks. If your attendance is high, the safe bunk calculator tells how much buffer you have before missing a class becomes risky.
              </p>
              <p>
                For best results, update the total classes whenever your institute adds new lectures. Use the target slider to match your actual rule, whether it is 60%, 70%, 75%, 80%, or 85%. After checking attendance, plan your study schedule with the{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                , track marks with the{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>
                , and manage assignment work with the{" "}
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
              Attendance report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Current percentage", "75% eligibility", "Safe bunk count", "Classes needed", "Shortage warning"].map((item) => (
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
            Attendance percentage tool for every student workflow
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
                Attendance Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Example attendance calculations students search for
              </h2>
            </div>
            <Link href="/tools/study-timetable-generator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Plan study time
              <BookOpenCheck className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {attendanceScenarios.map((scenario) => (
              <div key={scenario.title} className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {scenario.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary dark:text-emerald-200">
                  {scenario.focus}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {scenario.points.map((point) => (
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
            { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator", icon: Percent },
            { href: "/tools/grade-calculator", label: "Grade Calculator", icon: Calculator },
            { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner", icon: Target },
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

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/82 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/88 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <div>
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[image:var(--button-solid)] !text-white">
                <HelpCircle className="size-5 !text-white [stroke:white]" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Attendance percentage formula
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Attendance percentage = attended classes divided by total classes, multiplied by 100.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {examples.map(([attended, total, result]) => (
                <div
                  key={`${attended}-${total}`}
                  className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"
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
        </div>
      </div>
    </section>
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
