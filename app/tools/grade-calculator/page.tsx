import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Percent,
  Target,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { GradeCalculator } from "@/components/tools/grade-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free Grade Calculator | Weighted, Final & Target Grade Calculator",
  description:
    "Free grade calculator to calculate weighted grade, current course grade, assignment grade, final grade needed, remaining weight, and target grade.",
  keywords: [
    "free grade calculator",
    "grade calculator",
    "weighted grade calculator",
    "final grade calculator",
    "final grade needed calculator",
    "assignment grade calculator",
    "course grade calculator",
    "target grade calculator",
    "current grade calculator",
    "test grade calculator",
    "exam grade calculator",
    "class grade calculator",
    "grade percentage calculator",
    "weighted average grade calculator",
    "course final grade calculator",
    "what grade do I need calculator",
    "remaining grade calculator",
  ],
  alternates: {
    canonical: "/tools/grade-calculator",
  },
  openGraph: {
    title: "Free Grade Calculator",
    description:
      "Calculate weighted grade, current course grade, final grade needed, remaining coursework, and target grade instantly.",
    url: "/tools/grade-calculator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/grade-calculator";

const heroKeywords = [
  "free grade calculator",
  "weighted grade calculator",
  "final grade calculator",
  "course grade calculator",
  "assignment grade calculator",
  "target grade calculator",
];

const gradeFaqs = [
  {
    question: "What is a grade calculator?",
    answer:
      "A grade calculator is a student tool that calculates current course grade, weighted grade, assignment contribution, remaining weight, and target grade requirement.",
  },
  {
    question: "What is a weighted grade?",
    answer:
      "A weighted grade gives different importance to assignments, quizzes, projects, midterms, and exams based on their percentage weight in the final course grade.",
  },
  {
    question: "How do I calculate a weighted grade?",
    answer:
      "Convert each assessment score to a percentage, multiply it by the assessment weight, and add all weighted contributions together.",
  },
  {
    question: "How do I calculate my current grade?",
    answer:
      "Enter scored marks, total marks, and weight for completed assessments. The calculator shows your current weighted grade from completed work.",
  },
  {
    question: "Can this calculate final grade needed?",
    answer:
      "Yes. Enter your target grade and remaining coursework weight to see the average needed on remaining work or final exam.",
  },
  {
    question: "What grade do I need on the final exam?",
    answer:
      "Add all completed coursework and set the final exam as remaining weight. The calculator shows the average needed to reach your target grade.",
  },
  {
    question: "Can I calculate assignment grades?",
    answer:
      "Yes. Add assignments with scored marks, total marks, and assignment weight to calculate their weighted contribution.",
  },
  {
    question: "Can I calculate quiz and test grades?",
    answer:
      "Yes. Add quizzes, tests, midterms, projects, labs, and final exams as separate weighted rows.",
  },
  {
    question: "What if total weight is less than 100%?",
    answer:
      "The calculator shows remaining weight and estimates the average needed in the remaining coursework to hit your target.",
  },
  {
    question: "What if total weight is more than 100%?",
    answer:
      "Reduce assessment weights until total weight is 100% because overweight coursework can make the final grade inaccurate.",
  },
  {
    question: "Can I use this for college courses?",
    answer:
      "Yes. It works for college courses where assignments, labs, midterms, projects, attendance, and finals have different weights.",
  },
  {
    question: "Can I use this for school grades?",
    answer:
      "Yes. School students can calculate class grade from tests, homework, projects, practicals, and exams.",
  },
  {
    question: "Is grade percentage different from GPA?",
    answer:
      "Yes. Grade percentage calculates course score out of 100, while GPA converts grades into grade points and may use credit weights.",
  },
  {
    question: "Is this grade calculator free?",
    answer:
      "Yes. KASA's grade calculator is free for students to calculate weighted grades, target grades, and remaining grade requirements.",
  },
  {
    question: "Can this help plan a target grade?",
    answer:
      "Yes. Set a target such as 80%, 90%, or any required grade and the calculator shows how much you need in remaining coursework.",
  },
  {
    question: "Can I calculate letter grade?",
    answer:
      "Yes. The calculator shows a simple grade range based on percentage, but your school or college may follow a different letter grade scale.",
  },
];

const useCases = [
  {
    title: "For Weighted Courses",
    description: "Calculate courses where assignments, quizzes, projects, midterms, and finals have different weights.",
    icon: BarChart3,
  },
  {
    title: "For Final Exam Planning",
    description: "Find the average or final exam grade needed to reach a target course grade.",
    icon: Target,
  },
  {
    title: "For Assignment Grades",
    description: "Track how homework, assignments, labs, and projects affect your final grade.",
    icon: FileText,
  },
  {
    title: "For College Students",
    description: "Calculate class grade in courses with weighted assessments and remaining coursework.",
    icon: GraduationCap,
  },
  {
    title: "For School Students",
    description: "Check class grade from tests, projects, practicals, homework, and exams.",
    icon: BookOpenCheck,
  },
];

const gradeExamples = [
  {
    title: "Example Weighted Grade",
    focus: "Assignments 20%, quizzes 15%, midterm 30%, project 25%",
    points: [
      "Convert each score into a percentage.",
      "Multiply each percentage by its course weight.",
      "Add weighted contributions to get current course grade.",
    ],
  },
  {
    title: "Example Final Grade Needed",
    focus: "Current weighted points plus remaining final exam weight",
    points: [
      "Set your target grade, such as 80% or 90%.",
      "Check remaining coursework weight.",
      "Use required remaining average to plan final exam score.",
    ],
  },
  {
    title: "Example Assignment Grade",
    focus: "44 scored out of 50 with 25% project weight",
    points: [
      "44 out of 50 is 88%.",
      "88% with 25% weight contributes 22 points.",
      "This shows how one project affects final course grade.",
    ],
  },
];

export default function GradeCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free Grade Calculator",
      alternateName: ["Weighted Grade Calculator", "Final Grade Calculator", "Assignment Grade Calculator", "Target Grade Calculator"],
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
        "Free grade calculator for students to calculate weighted grade, current course grade, assignment contribution, remaining weight, final grade needed, and target grade.",
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
      name: "How to calculate weighted grade",
      description: "Calculate current grade, weighted contributions, remaining weight, and final grade needed for a target.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Add coursework",
          text: "Enter assignments, quizzes, tests, projects, midterms, or final exam rows.",
        },
        {
          "@type": "HowToStep",
          name: "Enter score and total",
          text: "Add scored marks and total marks for each assessment.",
        },
        {
          "@type": "HowToStep",
          name: "Enter weight",
          text: "Add each assessment weight as a percentage of the final course grade.",
        },
        {
          "@type": "HowToStep",
          name: "Check target grade",
          text: "Set your target grade and review current grade, remaining weight, and average needed.",
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
                <BarChart3 className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Grade Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Grade Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Add assignments, tests, projects, and their weight to calculate your current weighted
                grade and the average needed in remaining coursework.
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
                    Built for weighted grades
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Useful when assignments, quizzes, midterms, and projects carry different weight.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate weighted contribution for each assessment." />
                <QuickPoint text="See remaining weight and required average for your target." />
                <QuickPoint text="Works for school, college, online courses, and coaching tests." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradeCalculator />

      <GradeSeoContent />

      <ToolSeoSection
        eyebrow="Grade calculator FAQ"
        title="Free Weighted Grade Calculator FAQ"
        description="Use this free grade calculator as a weighted grade calculator, final grade calculator, assignment grade calculator, current grade calculator, and target grade calculator."
        keywords={[
          "free grade calculator",
          "weighted grade calculator",
          "final grade calculator",
          "final grade needed calculator",
          "course grade calculator",
          "assignment grade calculator",
          "target grade calculator",
          "current grade calculator",
          "what grade do I need calculator",
        ]}
        faqs={gradeFaqs}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/cgpa-percentage-converter", label: "CGPA to Percentage Converter" },
        ]}
      />
    </div>
  );
}

function GradeSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Grade Calculator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Calculate weighted grade, current course grade, and final grade needed
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free Grade Calculator helps students calculate weighted grades when assignments, quizzes, projects, midterms, labs, and final exams all carry different weights. Add each assessment, scored marks, total marks, and weight percentage. The calculator shows current weighted grade, completed weight, remaining weight, projected grade, letter grade range, and the average needed in remaining coursework to reach your target grade.
              </p>
              <p>
                Students often search for this tool as weighted grade calculator, final grade calculator, assignment grade calculator, current grade calculator, course grade calculator, and what grade do I need calculator. The important idea is weight. A score of 90% on a 10% assignment contributes 9 points to the final grade, while 90% on a 40% final exam contributes 36 points. That is why a simple average is not enough for courses with weighted assessments.
              </p>
              <p>
                Use this calculator after each test or assignment to understand your real course standing. If your remaining weight is high, your final grade can still change a lot. If your remaining weight is low, the target planner tells whether your goal is realistic. For pure marks percentage, use the{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>
                . For GPA or CGPA from credits and grade points, use the{" "}
                <Link href="/tools/gpa-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  GPA Calculator
                </Link>
                .
              </p>
              <p>
                For best results, make sure all weights match your syllabus. If total weight is above 100%, reduce weights before trusting the result. If total weight is below 100%, the remaining weight is treated as future coursework. Use the{" "}
                <Link href="/tools/final-exam-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Final Exam Calculator
                </Link>
                {" "}when your main question is specifically how much you need on the final exam.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Grade report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Current grade", "Weighted points", "Remaining weight", "Letter grade", "Target average"].map((item) => (
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
            Grade calculator for weighted coursework and final planning
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
                Grade Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Common weighted grade calculations
              </h2>
            </div>
            <Link href="/tools/final-exam-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Final exam calculator
              <Calculator className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {gradeExamples.map((example) => (
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
            { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator", icon: Percent },
            { href: "/tools/gpa-calculator", label: "GPA Calculator", icon: GraduationCap },
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
                Weighted grade formula
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Weighted grade = sum of each assessment percentage multiplied by its course weight.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <QuickPoint
                text="88% on a 25% project contributes 22 points."
              />
              <QuickPoint
                text="78% on a 30% midterm contributes 23.4 points."
              />
              <QuickPoint
                text="Remaining weight decides how much your grade can still change."
              />
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
