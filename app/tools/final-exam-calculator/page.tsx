import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Percent,
  Target,
  Trophy,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { FinalExamCalculator } from "@/components/tools/final-exam-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Final Exam Calculator | What Grade Do I Need on My Final?",
  description:
    "Free final exam calculator to find what grade you need on your final, required final exam score, final grade, passing score, and target course grade.",
  keywords: [
    "free final exam calculator",
    "final exam calculator",
    "final grade calculator",
    "what do I need on my final",
    "what grade do I need on my final",
    "what score do I need on my final",
    "what do I need to get on my final",
    "final exam score calculator",
    "required final exam grade calculator",
    "required final exam score calculator",
    "final exam weight calculator",
    "final worth calculator",
    "passing grade calculator",
    "final grade needed calculator",
    "course grade calculator",
    "target grade calculator",
    "exam score needed calculator",
    "need to pass final calculator",
    "calculate final grade after exam",
  ],
  alternates: {
    canonical: "/tools/final-exam-calculator",
  },
  openGraph: {
    title: "Final Exam Calculator - What Grade Do I Need on My Final?",
    description:
      "Calculate the final exam score needed to reach your target course grade, pass a class, or protect your grade.",
    url: "/tools/final-exam-calculator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/final-exam-calculator";

const finalExamFaqs = [
  {
    question: "What is a final exam calculator?",
    answer:
      "A final exam calculator is a student tool that calculates what score you need on your final exam to reach a target course grade, passing grade, or final grade goal.",
  },
  {
    question: "What grade do I need on my final?",
    answer:
      "Enter your current grade, target course grade, and final exam weight. The calculator shows the required final exam score.",
  },
  {
    question: "How do I calculate what I need on my final exam?",
    answer:
      "Subtract your current coursework contribution from the target grade, then divide by the final exam weight.",
  },
  {
    question: "What is the final exam grade formula?",
    answer:
      "Required final score = (target grade - current grade contribution) divided by final exam weight.",
  },
  {
    question: "Can this calculate final grade after the exam?",
    answer:
      "Yes. Enter an expected final exam score and the calculator shows your projected final course grade.",
  },
  {
    question: "What if the required final exam score is above 100%?",
    answer:
      "If the required score is above 100%, the selected target grade is not possible with your current grade and final exam weight.",
  },
  {
    question: "What if the required final exam score is below 0%?",
    answer:
      "If the required score is 0% or below, your current grade is already enough for the selected target even before the final.",
  },
  {
    question: "Can I calculate the score needed to pass a class?",
    answer:
      "Yes. Set your target grade to the passing percentage, such as 40%, 50%, or 60%, and check the required final exam score.",
  },
  {
    question: "Can I calculate what I need for an A?",
    answer:
      "Yes. Set your target grade to 80%, 90%, or your school&apos;s A-grade cutoff to see the final exam score required.",
  },
  {
    question: "How does final exam weight affect my grade?",
    answer:
      "A higher final exam weight means the exam has more impact on your final course grade. A low final weight changes your grade less.",
  },
  {
    question: "Can I use this if my final is worth 20%?",
    answer:
      "Yes. Set final exam weight to 20% and enter your current grade and target grade.",
  },
  {
    question: "Can I use this if my final is worth 30% or 40%?",
    answer:
      "Yes. Common final weights like 30%, 40%, and 50% are supported. Use the slider to match your syllabus.",
  },
  {
    question: "Is this different from a grade calculator?",
    answer:
      "Yes. A grade calculator handles multiple assignments and weights. A final exam calculator focuses on the final exam score needed for a target grade.",
  },
  {
    question: "Is this different from a marks percentage calculator?",
    answer:
      "Yes. A marks percentage calculator converts marks into percentage. A final exam calculator uses current grade, target grade, and exam weight.",
  },
  {
    question: "Is this final exam calculator free?",
    answer:
      "Yes. KASA's final exam calculator is free for students to calculate required final exam score, passing score, and projected final grade.",
  },
  {
    question: "Can I save or share the result?",
    answer:
      "Yes. The tool supports copy, download, and print options for your final exam calculator result.",
  },
];

const useCases = [
  {
    title: "For Passing a Class",
    description: "Set your passing grade target and calculate the final exam score needed to pass.",
    icon: CheckCircle2,
  },
  {
    title: "For Getting an A",
    description: "Set a high target like 80%, 90%, or your school&apos;s A cutoff and check the required final score.",
    icon: Trophy,
  },
  {
    title: "For Final Exam Weight",
    description: "Understand how a final worth 20%, 30%, 40%, or 50% changes your course grade.",
    icon: Percent,
  },
  {
    title: "For Last-Minute Planning",
    description: "See whether your target is realistic before deciding how much time to spend revising.",
    icon: AlertTriangle,
  },
  {
    title: "For Projected Grade",
    description: "Enter an expected final exam score and estimate your final course grade after the exam.",
    icon: BarChart3,
  },
];

const finalExamExamples = [
  {
    title: "Example: Need 80 in Course",
    focus: "Current grade 78%, target 80%, final worth 30%",
    points: [
      "Coursework contribution is 78% of the 70% non-final weight.",
      "The calculator solves the score needed on the 30% final.",
      "Useful when asking what do I need on my final for an 80.",
    ],
  },
  {
    title: "Example: Final Worth 40%",
    focus: "Current grade 72%, target 75%, final worth 40%",
    points: [
      "A 40% final can significantly move your final course grade.",
      "Small changes in final exam score create larger course-grade changes.",
      "Use this when your syllabus says final exam is worth 40%.",
    ],
  },
  {
    title: "Example: Passing Grade",
    focus: "Current grade 45%, target pass grade 50%",
    points: [
      "Set target grade to your passing requirement.",
      "Check whether passing is possible with your final exam weight.",
      "If required score is above 100%, the target is out of reach.",
    ],
  },
];

export default function FinalExamCalculatorPage() {
  const heroKeywords = [
    "free final exam calculator",
    "final exam calculator",
    "what grade do I need on my final",
    "final grade calculator",
    "final exam score calculator",
    "required final grade",
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Final Exam Calculator",
      alternateName: ["Final Grade Calculator", "What Grade Do I Need on My Final Calculator", "Required Final Exam Score Calculator"],
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
        "Free final exam calculator for students to calculate what grade is needed on a final exam to reach a target course grade, passing grade, or projected final grade.",
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
      name: "How to calculate what grade you need on your final",
      description: "Calculate required final exam score from current grade, target grade, and final exam weight.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter current grade",
          text: "Add your current course grade before the final exam.",
        },
        {
          "@type": "HowToStep",
          name: "Enter target grade",
          text: "Add the final course grade you want, such as passing grade, 80%, or 90%.",
        },
        {
          "@type": "HowToStep",
          name: "Enter final exam weight",
          text: "Add how much the final exam is worth in the course, such as 20%, 30%, 40%, or 50%.",
        },
        {
          "@type": "HowToStep",
          name: "Check required score",
          text: "Review the score needed on the final exam and projected final grade scenarios.",
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
                <Trophy className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="Final Exam Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Final Exam Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Find out what score you need on your final exam to reach a target course grade,
                pass a class, or protect your current grade.
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
                    Built for final exam targets
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Enter your current grade, target grade, and final exam weight to calculate the
                    required final exam score instantly.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Calculate what you need on your final exam." />
                <QuickPoint text="Check if your target grade is possible or out of reach." />
                <QuickPoint text="See final grade outcomes for different exam scores." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalExamCalculator />

      <FinalExamSeoContent />

      <ToolSeoSection
        eyebrow="Final exam calculator FAQ"
        title="What Grade Do I Need on My Final FAQ"
        description="Use this free final exam calculator as a final grade calculator, required final exam score calculator, final worth calculator, passing grade calculator, and target course grade planner."
        keywords={[
          "free final exam calculator",
          "final exam calculator",
          "what grade do I need on my final",
          "what score do I need on my final",
          "final grade calculator",
          "final grade needed calculator",
          "required final exam score",
          "passing grade calculator",
          "final exam weight calculator",
        ]}
        faqs={finalExamFaqs}
        relatedTools={[
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
        ]}
      />
    </div>
  );
}

function FinalExamSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Final Exam Calculator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Calculate what grade you need on your final exam
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free Final Exam Calculator helps students answer the exact question they search before exams: what grade do I need on my final? Enter your current course grade, target final grade, and final exam weight. The calculator shows the required final exam score, whether the target is possible, what score is needed to pass, and how different final exam scores can change your final course grade.
              </p>
              <p>
                The formula uses weighted grading. If your final exam is worth 30%, your current coursework is worth 70%. The calculator first finds your current coursework contribution, then solves the final exam score needed to reach your target. This is different from a simple marks percentage calculator because final exam weight matters. A final worth 20% affects your course grade less than a final worth 50%.
              </p>
              <p>
                Students search for this tool with phrases like final exam calculator, final grade calculator, what do I need on my final, what score do I need on my final, final exam score calculator, final grade needed calculator, passing grade calculator, and final worth calculator. This page is built for those use cases: passing a class, protecting a current grade, reaching an A, checking whether a target is impossible, and planning study time before the exam.
              </p>
              <p>
                If your course has many weighted assignments before the final, use the{" "}
                <Link href="/tools/grade-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Grade Calculator
                </Link>
                {" "}first. If you need to convert marks into percentage, use the{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>
                . Once you know your target, plan revision with the{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                {" "}or set subject-wise goals with the{" "}
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
              Final exam report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Required final score", "Target possibility", "Passing score", "Projected final grade", "Score scenarios"].map((item) => (
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
            Final grade calculator for urgent exam questions
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
                Final Exam Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Common final exam grade calculations
              </h2>
            </div>
            <Link href="/tools/grade-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Calculate full course grade
              <Calculator className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {finalExamExamples.map((example) => (
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
            { href: "/tools/grade-calculator", label: "Grade Calculator", icon: BarChart3 },
            { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner", icon: Target },
            { href: "/tools/study-timetable-generator", label: "Study Timetable Generator", icon: BookOpenCheck },
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
                Final exam formula
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Required final score = target grade minus current coursework contribution, divided by final exam weight.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <FormulaPoint title="Current grade" text="Your course grade before the final exam." />
              <FormulaPoint title="Final weight" text="How much the final exam counts in the course." />
              <FormulaPoint title="Target grade" text="The final course grade you want to reach." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormulaPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <strong className="block text-slate-950 dark:text-white">{title}</strong>
      {text}
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
