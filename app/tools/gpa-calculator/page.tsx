import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  FileText,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Percent,
  School,
  Target,
  Trophy,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { GpaCalculator } from "@/components/tools/gpa-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free GPA Calculator | Calculate GPA, CGPA, Credits & Target GPA",
  description:
    "Free GPA calculator to calculate semester GPA, CGPA, credit-weighted grade points, 4.0 GPA, 10 point GPA, total credits, and target GPA.",
  keywords: [
    "free GPA calculator",
    "GPA calculator",
    "CGPA calculator",
    "grade point average calculator",
    "college GPA calculator",
    "semester GPA calculator",
    "credit GPA calculator",
    "credit weighted GPA calculator",
    "GPA calculator with credits",
    "GPA calculator 4.0 scale",
    "4 point GPA calculator",
    "4.0 GPA calculator",
    "10 point GPA calculator",
    "10 point CGPA calculator",
    "university GPA calculator",
    "target GPA calculator",
    "GPA to percentage calculator",
    "semester grade calculator",
  ],
  alternates: {
    canonical: "/tools/gpa-calculator",
  },
  openGraph: {
    title: "Free GPA Calculator",
    description:
      "Calculate GPA, CGPA, total credits, weighted grade points, 4.0 GPA, 10 point GPA, and target GPA instantly.",
    url: "/tools/gpa-calculator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/gpa-calculator";

const heroKeywords = [
  "free GPA calculator",
  "GPA calculator",
  "CGPA calculator",
  "semester GPA calculator",
  "GPA calculator with credits",
  "4.0 GPA calculator",
  "10 point GPA calculator",
];

const gpaFaqs = [
  {
    question: "What is a GPA calculator?",
    answer:
      "A GPA calculator is a student tool that calculates Grade Point Average from subject grades and credits. It helps estimate semester GPA, CGPA, credit points, and target GPA.",
  },
  {
    question: "How do I calculate GPA with credits?",
    answer:
      "Multiply each subject grade point by its credits, add all weighted points, then divide by total credits.",
  },
  {
    question: "What is the GPA formula?",
    answer:
      "GPA = total weighted grade points divided by total credits. Weighted grade points are calculated by multiplying grade point by subject credits.",
  },
  {
    question: "What is CGPA?",
    answer:
      "CGPA stands for Cumulative Grade Point Average. It combines grade performance across multiple semesters into one overall academic score.",
  },
  {
    question: "What is the difference between GPA and CGPA?",
    answer:
      "GPA usually measures one semester or term, while CGPA measures cumulative performance across multiple semesters.",
  },
  {
    question: "Can I calculate 4.0 GPA?",
    answer:
      "Yes. Select the 4.0 GPA scale to calculate grade point average using common A, B, C, D, and F grade points.",
  },
  {
    question: "Can I calculate 10 point CGPA?",
    answer:
      "Yes. Select the 10.0 CGPA scale to calculate GPA or CGPA using common O, A+, A, B+, B, C, P, and F grades.",
  },
  {
    question: "Can I calculate semester GPA?",
    answer:
      "Yes. Add all subjects for one semester with credits and grades. The result is your credit-weighted semester GPA.",
  },
  {
    question: "Can I calculate college GPA?",
    answer:
      "Yes. College students can calculate GPA for a term, semester, or subject set by entering subject credits and grades.",
  },
  {
    question: "Can this calculator show target GPA?",
    answer:
      "Yes. Enter your target GPA and remaining credits to see the average grade point needed in upcoming subjects.",
  },
  {
    question: "How are credits used in GPA?",
    answer:
      "Credits decide the weight of each subject. A 4-credit subject affects GPA more than a 2-credit subject with the same grade.",
  },
  {
    question: "Is GPA the same as percentage?",
    answer:
      "No. GPA uses grade points and credits, while percentage is based on scored marks out of total marks. Conversion depends on institute rules.",
  },
  {
    question: "Can I convert CGPA to percentage?",
    answer:
      "Use the CGPA to Percentage Converter for conversion because different universities may use different formulas.",
  },
  {
    question: "Can I calculate GPA for pass/fail subjects?",
    answer:
      "If a pass/fail subject has no grade point or credit weight, exclude it or follow your institute's official GPA rules.",
  },
  {
    question: "What is a good GPA?",
    answer:
      "A good GPA depends on your grading scale, university, scholarship criteria, placement requirements, and admission goals.",
  },
  {
    question: "Is this GPA calculator free?",
    answer:
      "Yes. KASA's GPA calculator is free for students to calculate GPA, CGPA, credits, target GPA, and weighted grade points.",
  },
];

const useCases = [
  {
    title: "For Semester GPA",
    description: "Calculate one-term GPA from subjects, credits, and grades after semester results.",
    icon: BookOpenCheck,
  },
  {
    title: "For CGPA Planning",
    description: "Track cumulative performance and plan the average needed in remaining credits.",
    icon: GraduationCap,
  },
  {
    title: "For 4.0 GPA Scale",
    description: "Use A, B, C, D, and F grade points for universities that follow a 4-point scale.",
    icon: School,
  },
  {
    title: "For 10 Point CGPA",
    description: "Use O, A+, A, B+, B, C, P, and F grades for 10-point university systems.",
    icon: Trophy,
  },
  {
    title: "For Target GPA",
    description: "Set a goal and calculate the average grade point needed in upcoming credits.",
    icon: Target,
  },
];

const gpaExamples = [
  {
    title: "Example 10 Point CGPA",
    focus: "Credits: 4, 4, 3, 3, 2 with grades A, B+, A+, B, O",
    points: ["Multiply each grade point by credits.", "Add weighted points and divide by total credits.", "Use this for common Indian university CGPA systems."],
  },
  {
    title: "Example 4.0 GPA",
    focus: "Credits: 3, 4, 3, 2 with grades A, B+, A-, B",
    points: ["Use the 4.0 scale grade points.", "Higher-credit subjects affect GPA more.", "Useful for applications, transfers, and international formats."],
  },
  {
    title: "Example Target GPA",
    focus: "Current GPA plus remaining credits",
    points: ["Set your target GPA.", "Enter remaining credits.", "Check the average future grade point needed to reach the goal."],
  },
];

export default function GpaCalculatorPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free GPA Calculator",
      alternateName: ["GPA Calculator", "CGPA Calculator", "Semester GPA Calculator", "Credit GPA Calculator", "Target GPA Calculator"],
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
        "Free GPA and CGPA calculator for students to calculate credit-weighted GPA, 4.0 GPA, 10 point CGPA, total credits, weighted grade points, and target GPA.",
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
      name: "How to calculate GPA with credits",
      description: "Calculate GPA or CGPA from subject credits and grades using 4.0 or 10.0 grading scales.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose GPA scale",
          text: "Select 4.0 GPA or 10.0 CGPA depending on your college or university grading system.",
        },
        {
          "@type": "HowToStep",
          name: "Add subjects",
          text: "Enter each subject name, credits, and grade.",
        },
        {
          "@type": "HowToStep",
          name: "Calculate weighted points",
          text: "The calculator multiplies each subject grade point by credits and adds total weighted points.",
        },
        {
          "@type": "HowToStep",
          name: "Check GPA and target",
          text: "Review GPA, total credits, percentage estimate, and average needed in remaining credits for target GPA.",
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
                <GraduationCap className="size-3.5" aria-hidden="true" />
                Student calculator
              </div>
              <ToolBreadcrumb current="GPA Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                GPA Calculator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Add your subject credits and grades to calculate GPA, CGPA, total credits, and the
                average grade point needed to reach your target.
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
                    Built for semester results
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Pick a grading scale, select grades, adjust credits, and see the GPA instantly.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <QuickPoint text="Supports common 4.0 GPA and 10.0 CGPA scales." />
                <QuickPoint text="Credit-weighted GPA calculation for every subject." />
                <QuickPoint text="Target planner shows the average needed in remaining credits." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GpaCalculator />

      <GpaSeoContent />

      <ToolSeoSection
        eyebrow="GPA calculator FAQ"
        title="Free GPA and CGPA Calculator FAQ"
        description="Use this free GPA calculator as a semester GPA calculator, CGPA calculator, 4.0 GPA calculator, 10 point GPA calculator, credit GPA calculator, and target GPA planner."
        keywords={[
          "free GPA calculator",
          "GPA calculator",
          "semester GPA calculator",
          "CGPA calculator",
          "4.0 GPA calculator",
          "10 point GPA calculator",
          "GPA calculator with credits",
          "credit weighted GPA calculator",
          "grade point average calculator",
          "target GPA calculator",
        ]}
        faqs={gpaFaqs}
        relatedTools={[
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/cgpa-percentage-converter", label: "CGPA to Percentage Converter" },
          { href: "/tools/scholarship-eligibility-calculator", label: "Scholarship Eligibility Calculator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
        ]}
      />
    </div>
  );
}

function GpaSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How GPA Calculator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Calculate semester GPA, CGPA, credits, and target GPA
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free GPA Calculator helps students calculate Grade Point Average from subject credits and grades. Add each subject, choose credits, select the grade, and pick the grading scale used by your college or university. The calculator supports common 4.0 GPA and 10.0 CGPA systems, then shows GPA, total credits, weighted grade points, percentage estimate, target gap, and the average grade point needed in remaining credits.
              </p>
              <p>
                GPA is usually used for one semester or term, while CGPA is cumulative across multiple semesters. The core formula is credit-weighted: multiply each subject grade point by its credits, add all weighted points, then divide by total credits. This is why high-credit subjects affect your GPA more than low-credit subjects. A 4-credit subject with a low grade can pull GPA down more than a 2-credit elective, so students should pay attention to credits while planning improvement.
              </p>
              <p>
                Students search for GPA calculators in different ways: college GPA calculator, semester GPA calculator, GPA calculator with credits, 4.0 GPA calculator, 10 point CGPA calculator, target GPA calculator, and grade point average calculator. This page covers those use cases in one place. Use it after semester results, before scholarship applications, while planning placements, or when estimating how much future performance is needed to reach a target GPA.
              </p>
              <p>
                If your institute gives marks instead of grade points, start with the{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>
                . If you need percentage conversion from CGPA, use the{" "}
                <Link href="/tools/cgpa-percentage-converter" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  CGPA to Percentage Converter
                </Link>
                . For weighted coursework, assignments, and exams, the{" "}
                <Link href="/tools/grade-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Grade Calculator
                </Link>
                {" "}may be more useful.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              GPA report includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Semester GPA", "Total credits", "Weighted points", "Percentage estimate", "Target GPA plan"].map((item) => (
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
            GPA calculator for every college grading system
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
                GPA Examples
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Common GPA and CGPA calculations
              </h2>
            </div>
            <Link href="/tools/cgpa-percentage-converter" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Convert CGPA to percentage
              <Percent className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {gpaExamples.map((example) => (
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
            { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator", icon: FileText },
            { href: "/tools/final-exam-calculator", label: "Final Exam Calculator", icon: Target },
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
                GPA basics
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                GPA measures average grade points for a semester. CGPA combines performance across semesters.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <QuickPoint
                title="GPA"
                text="Grade Point Average for one semester or term, usually calculated from grades and credits."
              />
              <QuickPoint
                title="CGPA"
                text="Cumulative Grade Point Average across multiple semesters or academic terms."
              />
              <QuickPoint
                title="Credits"
                text="Credit weight controls how strongly each subject affects your final GPA."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickPoint({ title, text }: { title?: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
      <span>
        {title ? <strong className="block text-slate-950 dark:text-white">{title}</strong> : null}
        {text}
      </span>
    </div>
  );
}
