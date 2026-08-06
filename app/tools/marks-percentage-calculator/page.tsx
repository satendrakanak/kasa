import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Percent,
  School,
  Target,
  Trophy,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { MarksPercentageCalculator } from "@/components/tools/marks-percentage-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free Marks Percentage Calculator | Calculate Percentage from Marks",
  description:
    "Free marks percentage calculator to calculate percentage from marks, total marks, grade, target marks, out of 100, out of 500, board exam and result percentage.",
  keywords: [
    "free marks percentage calculator",
    "marks percentage calculator",
    "percentage calculator for marks",
    "calculate marks percentage",
    "calculate percentage from marks",
    "marks to percentage calculator",
    "marks percentage formula",
    "exam percentage calculator",
    "result percentage calculator",
    "board marks percentage calculator",
    "class 10 percentage calculator",
    "class 12 percentage calculator",
    "out of 100 percentage calculator",
    "out of 500 percentage calculator",
    "out of 600 percentage calculator",
    "total marks percentage calculator",
    "subject marks percentage calculator",
    "grade percentage calculator",
    "percentage from total marks",
    "target marks calculator",
  ],
  alternates: {
    canonical: "/tools/marks-percentage-calculator",
  },
  openGraph: {
    title: "Free Marks Percentage Calculator",
    description:
      "Calculate percentage from marks, total marks, grade, target marks, and result percentage instantly.",
    url: "/tools/marks-percentage-calculator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/marks-percentage-calculator";

const heroKeywords = [
  "free marks percentage calculator",
  "marks percentage calculator",
  "calculate percentage from marks",
  "out of 500 percentage calculator",
  "exam percentage calculator",
  "board marks percentage",
];

const marksFaqs = [
  {
    question: "How do I calculate percentage from marks?",
    answer:
      "Divide scored marks by total marks and multiply by 100. For example, 385 out of 500 is 77%.",
  },
  {
    question: "What is the marks percentage formula?",
    answer:
      "The formula is: marks percentage = scored marks divided by total marks multiplied by 100.",
  },
  {
    question: "How do I calculate percentage of 500 marks?",
    answer:
      "Enter your scored marks and set total marks to 500. For example, 420 out of 500 is 84%.",
  },
  {
    question: "How do I calculate percentage of 600 marks?",
    answer:
      "Enter scored marks and set total marks to 600. For example, 480 out of 600 is 80%.",
  },
  {
    question: "How do I calculate percentage out of 100?",
    answer:
      "If total marks are 100, the scored marks are already the percentage. For example, 78 out of 100 is 78%.",
  },
  {
    question: "Can I calculate board exam percentage?",
    answer:
      "Yes. Add your total scored marks and total maximum marks for Class 10, Class 12, or board exams to calculate the overall percentage.",
  },
  {
    question: "Can I calculate subject-wise percentage?",
    answer:
      "Yes. Use the calculator separately for each subject by entering scored marks and total marks for that subject.",
  },
  {
    question: "Can this calculator show marks needed for a target percentage?",
    answer:
      "Yes. Set a target percentage and the calculator shows the minimum marks required and how many more marks are needed.",
  },
  {
    question: "How many marks do I need for 75%?",
    answer:
      "Set the target percentage to 75%. The calculator will show the required marks based on your total marks.",
  },
  {
    question: "How many marks do I need for 90%?",
    answer:
      "Set the target percentage to 90%. For example, in a 500-mark exam, you need 450 marks for 90%.",
  },
  {
    question: "Is this marks percentage calculator free?",
    answer:
      "Yes. KASA's marks percentage calculator is free for students to calculate exam percentage, result percentage, grade range, and target marks.",
  },
  {
    question: "Can I use this for college semester marks?",
    answer:
      "Yes. You can calculate semester marks percentage by entering total scored marks and total maximum marks across subjects.",
  },
  {
    question: "Can I use this for school test marks?",
    answer:
      "Yes. It works for unit tests, half-yearly exams, annual exams, practical exams, and subject tests.",
  },
  {
    question: "Is percentage the same as percentile?",
    answer:
      "No. Percentage shows your score out of total marks. Percentile compares your score with other students.",
  },
  {
    question: "Is marks percentage different from CGPA?",
    answer:
      "Yes. Marks percentage is based on scored marks and total marks. CGPA uses grade points and may follow a school, college, or university conversion formula.",
  },
  {
    question: "Can I calculate grade from percentage?",
    answer:
      "Yes. This tool shows a simple grade range from the calculated percentage, but your institute may use a different grading scale.",
  },
];

const useCases = [
  {
    title: "For Class 10 Students",
    description: "Calculate board percentage from total scored marks and maximum marks across subjects.",
    icon: School,
  },
  {
    title: "For Class 12 Students",
    description: "Check result percentage, target marks, and grade range for board or pre-board exams.",
    icon: GraduationCap,
  },
  {
    title: "For College Students",
    description: "Calculate semester marks percentage from internal, practical, theory, and total marks.",
    icon: BookOpenCheck,
  },
  {
    title: "For Exam Results",
    description: "Find percentage quickly after unit tests, annual exams, entrance mock tests, or result day.",
    icon: Trophy,
  },
  {
    title: "For Target Marks",
    description: "Set a target percentage and see the minimum marks required to reach it.",
    icon: Target,
  },
];

const markExamples = [
  {
    title: "Example: 385 out of 500",
    focus: "Board exam or five-subject total",
    points: ["385 divided by 500 is 0.77.", "0.77 multiplied by 100 is 77%.", "This is useful for Class 10 or Class 12 total marks."],
  },
  {
    title: "Example: 480 out of 600",
    focus: "Six-subject total marks",
    points: ["480 divided by 600 is 0.80.", "0.80 multiplied by 100 is 80%.", "Use this for results where total marks are 600."],
  },
  {
    title: "Example: 72 out of 80",
    focus: "Subject test or internal exam",
    points: ["72 divided by 80 is 0.90.", "0.90 multiplied by 100 is 90%.", "Use this for subject-wise marks percentage."],
  },
];

export default function MarksPercentageCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free Marks Percentage Calculator",
      alternateName: ["Marks Percentage Calculator", "Percentage Calculator for Marks", "Exam Percentage Calculator", "Result Percentage Calculator"],
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
        "Free marks percentage calculator for students to calculate percentage from marks, total marks, grade, required marks, and target percentage.",
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
      name: "How to calculate percentage from marks",
      description: "Calculate marks percentage from scored marks and total marks using the standard percentage formula.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter scored marks",
          text: "Add the marks you received in the exam, subject, or result.",
        },
        {
          "@type": "HowToStep",
          name: "Enter total marks",
          text: "Add the maximum marks, such as 100, 500, 600, or any exam total.",
        },
        {
          "@type": "HowToStep",
          name: "Set target percentage",
          text: "Choose a target percentage if you want to know required marks or marks needed.",
        },
        {
          "@type": "HowToStep",
          name: "Check percentage",
          text: "Review the calculated percentage, grade range, marks lost, required marks, and target gap.",
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
                <Percent className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Marks Percentage Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Marks Percentage Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate your marks percentage, grade range, total marks, and how many marks you need
                to reach a target percentage.
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
                    Built for result checks
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Use one subject or add multiple subjects to calculate your overall percentage.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate percentage from scored marks and total marks." />
                <QuickPoint text="See grade range, marks lost, and marks needed." />
                <QuickPoint text="Set any target percentage from 0% to 100%." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarksPercentageCalculator />

      <MarksPercentageSeoContent />

      <ToolSeoSection
        eyebrow="Marks percentage FAQ"
        title="Free Marks Percentage Calculator FAQ"
        description="Use this free marks percentage calculator as a percentage calculator for marks, exam percentage calculator, result percentage calculator, board marks percentage calculator, and target marks calculator."
        keywords={[
          "free marks percentage calculator",
          "marks percentage calculator",
          "percentage calculator for marks",
          "exam percentage calculator",
          "result percentage calculator",
          "calculate percentage from marks",
          "out of 500 percentage calculator",
          "out of 600 percentage calculator",
          "board marks percentage calculator",
          "target marks calculator",
        ]}
        faqs={marksFaqs}
        relatedTools={[
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
          { href: "/tools/scholarship-eligibility-calculator", label: "Scholarship Eligibility Calculator" },
          { href: "/tools/cgpa-percentage-converter", label: "CGPA to Percentage Converter" },
          { href: "/tools/board-percentage-calculator", label: "Class 10/12 Board Percentage Calculator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
        ]}
      />
    </div>
  );
}

function MarksPercentageSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Marks Percentage Calculator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Calculate percentage from marks, total marks, and target score
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free Marks Percentage Calculator helps students calculate percentage from scored marks and total marks instantly. Enter your marks scored, total marks, and optional target percentage. The tool shows your marks percentage, grade range, marks lost, required marks, and how many more marks are needed to reach your target. It works for school exams, Class 10 board results, Class 12 board results, college semester marks, subject tests, internal assessments, practical exams, and entrance mock tests.
              </p>
              <p>
                The formula is simple: scored marks divided by total marks, multiplied by 100. The calculator is faster because it handles common exam totals like 50, 80, 100, 200, 500, and 600, and it shows target marks automatically. For example, it can quickly explain what 420 out of 500 means, how many marks are missing for 90%, or whether one subject pulled the overall percentage down.
              </p>
              <p>
                For board exams, add the total marks scored across subjects and the maximum possible marks. For example, if you scored 420 out of 500, your percentage is 84%. For a subject test, enter the subject marks and total marks, such as 72 out of 80. College students can use it for semester totals by adding internal, theory, practical, and assignment marks together. If your institute uses CGPA, use the{" "}
                <Link href="/tools/cgpa-percentage-converter" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  CGPA to Percentage Converter
                </Link>
                {" "}after checking your marks-based percentage.
              </p>
              <p>
                Use this page after an exam result, before setting a score goal, or while checking how close you are to a target percentage like 60%, 75%, 80%, or 90%. For weighted coursework and assignments, the{" "}
                <Link href="/tools/grade-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Grade Calculator
                </Link>
                {" "}may be more useful. For board-specific calculations, try the{" "}
                <Link href="/tools/board-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Class 10/12 Board Percentage Calculator
                </Link>
                . To plan score improvement, pair it with the{" "}
                <Link href="/tools/exam-score-goal-planner" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Exam Score Goal Planner
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
              Marks report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Marks percentage", "Grade range", "Marks lost", "Target marks", "Required improvement"].map((item) => (
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
            Percentage calculator for every student result
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
                Marks Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Common marks percentage calculations
              </h2>
            </div>
            <Link href="/tools/board-percentage-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Board percentage calculator
              <ListChecks className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {markExamples.map((example) => (
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
            { href: "/tools/grade-calculator", label: "Grade Calculator", icon: Calculator },
            { href: "/tools/gpa-calculator", label: "GPA Calculator", icon: GraduationCap },
            { href: "/tools/attendance-calculator", label: "Attendance Calculator", icon: Percent },
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
                Marks percentage formula
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Percentage = scored marks divided by total marks, multiplied by 100.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["385 marks", "500 total", "77%"],
                ["420 marks", "500 total", "84%"],
                ["480 marks", "600 total", "80%"],
              ].map(([scored, total, result]) => (
                <div
                  key={`${scored}-${total}`}
                  className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-300">{scored}</div>
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
