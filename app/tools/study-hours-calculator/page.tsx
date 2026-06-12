import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  School,
  Target,
  Timer,
  Trophy,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { StudyHoursCalculator } from "@/components/tools/study-hours-calculator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

const pageUrl = "https://www.getkasa.in/tools/study-hours-calculator";

const studyHoursFaqs = [
  {
    question: "What is a study hours calculator?",
    answer:
      "A study hours calculator estimates how many hours you should study per day using exam days left, subjects, chapters or topics, revision time, session length, and confidence level.",
  },
  {
    question: "Is this study hours calculator free?",
    answer:
      "Yes. KASA's study hours calculator is free for students who want to calculate daily study hours, weekly study hours, study sessions per day, and exam preparation time.",
  },
  {
    question: "How do I calculate daily study hours?",
    answer:
      "Estimate the total syllabus time, add revision time, adjust for confidence level, then divide the total study time by the number of days left before the exam.",
  },
  {
    question: "How many hours should I study daily?",
    answer:
      "The right number depends on syllabus load, exam days left, current confidence, revision need, and energy level. A consistent realistic target is better than an extreme plan you cannot follow.",
  },
  {
    question: "How many hours should I study for board exams?",
    answer:
      "Board exam students often need a mix of concept study, writing practice, sample papers, and revision. Use the calculator with your chapter count and days left to estimate a daily target.",
  },
  {
    question: "How many hours should I study for NEET or JEE?",
    answer:
      "NEET and JEE preparation usually needs concept study, question practice, mock tests, analysis, and revision. Enter your topics and exam timeline to estimate a daily hours target.",
  },
  {
    question: "Can I calculate weekly study hours?",
    answer:
      "Yes. The tool converts daily study hours into weekly study hours so you can understand the total study load and plan school, college, coaching, or homework around it.",
  },
  {
    question: "Can this calculate study sessions per day?",
    answer:
      "Yes. Choose your session length, such as 30, 45, 50, 60, or 90 minutes, and the calculator estimates how many focused study sessions you need per day.",
  },
  {
    question: "Is this different from a study timetable generator?",
    answer:
      "Yes. A study hours calculator gives the daily time target. A study timetable generator places those hours into morning, afternoon, or evening sessions.",
  },
  {
    question: "How much revision time should I add?",
    answer:
      "Many students start with 20 to 30 percent revision time. Increase revision time when exams are close, when topics are weak, or when you need more mock test analysis.",
  },
  {
    question: "What is a good study session length?",
    answer:
      "Most students manage 40 to 60 minute focused sessions well. Use shorter sessions for difficult topics and longer sessions for mock tests, writing practice, or deep problem solving.",
  },
  {
    question: "Can I use this for last-minute exam preparation?",
    answer:
      "Yes. Enter fewer days left and a realistic chapter count. If the result is too heavy, prioritize high-weight chapters, formulas, previous-year questions, and revision.",
  },
  {
    question: "Can Class 10 students use this calculator?",
    answer:
      "Yes. Class 10 students can calculate daily study hours for Maths, Science, Social Science, English, Hindi, pre-board revision, and board exam preparation.",
  },
  {
    question: "Can Class 12 students use this calculator?",
    answer:
      "Yes. Class 12 students can estimate study hours for board exams, practical preparation, sample papers, Physics, Chemistry, Maths, Biology, Commerce, Humanities, and English.",
  },
  {
    question: "What if the calculator shows too many hours per day?",
    answer:
      "If the daily target is too high, reduce low-priority topics, increase preparation days, split the plan into phases, or focus first on high-weight chapters and weak areas.",
  },
  {
    question: "Can I copy or download my study hours plan?",
    answer:
      "Yes. You can copy or download the study hours result and use it while making a daily timetable or discussing your plan with parents, teachers, or mentors.",
  },
];

export const metadata: Metadata = {
  title: "Free Study Hours Calculator | How Many Hours Should I Study Daily?",
  description:
    "Free study hours calculator to estimate daily study hours, weekly study time, sessions per day, revision hours, and exam preparation load for students.",
  keywords: [
    "free study hours calculator",
    "study hours calculator",
    "how many hours should I study",
    "daily study hours calculator",
    "weekly study hours calculator",
    "exam preparation hours calculator",
    "study time calculator",
    "study hours per day calculator",
    "study session calculator",
    "revision hours calculator",
    "how many hours to study for exams",
    "how many hours should I study for board exams",
    "how many hours should I study for NEET",
    "how many hours should I study for JEE",
    "class 10 study hours",
    "class 12 study hours",
    "study plan calculator",
    "exam study time calculator",
  ],
  alternates: { canonical: "/tools/study-hours-calculator" },
  openGraph: {
    title: "Free Study Hours Calculator for Students",
    description:
      "Calculate daily study hours, weekly study time, sessions per day, and revision load before exams.",
    url: "/tools/study-hours-calculator",
  },
};

export default function StudyHoursCalculatorPage() {
  const heroKeywords = [
    "free study hours calculator",
    "how many hours should I study",
    "daily study hours calculator",
    "exam preparation hours",
    "study session calculator",
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: "Free Study Hours Calculator",
      alternateName: [
        "Daily Study Hours Calculator",
        "Study Time Calculator",
        "Exam Preparation Hours Calculator",
        "Study Session Calculator",
      ],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free study hours calculator for students to estimate daily study hours, weekly study time, sessions per day, revision hours, and total exam preparation load.",
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
      name: "How to calculate daily study hours before exams",
      description:
        "Calculate how many hours to study per day using exam days left, subjects, chapters, revision percentage, session length, and confidence level.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter exam days left",
          text: "Add the number of days remaining before your exam so the calculator can divide preparation time realistically.",
        },
        {
          "@type": "HowToStep",
          name: "Add subjects and chapters",
          text: "Enter the number of subjects and chapters or topics you need to complete before the exam.",
        },
        {
          "@type": "HowToStep",
          name: "Set revision and session length",
          text: "Choose revision percentage and focused session length to estimate daily sessions and weekly study hours.",
        },
        {
          "@type": "HowToStep",
          name: "Review the study hours plan",
          text: "Use the daily hours, sessions per day, weekly hours, and total study hours to build a timetable.",
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
          <Link href="/tools" className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All tools
          </Link>
          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <Clock3 className="size-3.5" aria-hidden="true" />
                Study planning tool
              </div>
              <ToolBreadcrumb current="Study Hours Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Free Study Hours Calculator for Exam Preparation
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Calculate how many hours to study daily based on exam days left, subjects,
                chapters, syllabus load, revision time, session length, and confidence level.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={BookOpenCheck}
              title="Built for exam planning"
              description="Turn syllabus pressure into a clear daily study target."
              points={[
                "Estimate daily hours and sessions before exams.",
                "Include revision time and current confidence level.",
                "Copy or download a simple study hours plan.",
              ]}
            />
          </div>
        </div>
      </section>
      <StudyHoursCalculator />
      <StudyHoursSeoContent />
      <ToolSeoSection
        eyebrow="Study hours FAQ"
        title="How many hours should I study daily for exams?"
        description="Use this free study hours calculator to estimate daily study time, weekly study hours, sessions per day, revision load, and total exam preparation time for board exams, school tests, college exams, NEET, JEE, and competitive exams."
        keywords={[
          "free study hours calculator",
          "study hours calculator",
          "daily study hours calculator",
          "how many hours should I study",
          "exam preparation hours calculator",
          "study session calculator",
          "revision hours calculator",
        ]}
        faqs={studyHoursFaqs}
        relatedTools={[
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/attendance-calculator", label: "Attendance Calculator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
        ]}
      />
    </div>
  );
}

function StudyHoursSeoContent() {
  const useCases = [
    {
      title: "For Board Exam Students",
      description:
        "Estimate daily study hours for Class 10 and Class 12 board exams, sample papers, writing practice, formulas, diagrams, and revision.",
      icon: School,
    },
    {
      title: "For NEET and JEE Aspirants",
      description:
        "Plan concept study, question practice, mock tests, test analysis, error notebook review, and revision hours across the week.",
      icon: Target,
    },
    {
      title: "For College Exams",
      description:
        "Calculate study hours for semester exams, unit tests, lab records, assignments, viva preparation, and previous-year papers.",
      icon: GraduationCap,
    },
    {
      title: "For Last-Minute Preparation",
      description:
        "When exams are close, use the daily target to prioritize high-weight chapters, weak topics, formulas, and previous-year questions.",
      icon: Timer,
    },
    {
      title: "For Revision Planning",
      description:
        "Add revision percentage to reserve time for quick notes, mock test analysis, recall practice, and repeated weak-topic review.",
      icon: CalendarCheck,
    },
    {
      title: "For Daily Study Routine",
      description:
        "Convert total syllabus load into practical sessions per day before building a morning, afternoon, or evening timetable.",
      icon: ListChecks,
    },
  ];

  const examples = [
    {
      title: "Example Board Exam Study Hours",
      focus: "30 days left, 5 subjects, 45 chapters, 25 percent revision",
      points: [
        "Calculator estimates daily study hours and sessions per day.",
        "Student uses harder subjects in high-energy hours.",
        "Weekly hours help balance school, coaching, and sample papers.",
      ],
    },
    {
      title: "Example NEET or JEE Study Hours",
      focus: "Concepts, practice questions, mocks, analysis, revision",
      points: [
        "Use longer sessions for mock tests and analysis.",
        "Add revision time for formulas, NCERT lines, and error notebook review.",
        "If daily hours are too high, split the syllabus into high-priority phases.",
      ],
    },
    {
      title: "Example Last-Minute Study Hours",
      focus: "7 days left, fewer topics, more revision",
      points: [
        "Enter only chapters that must be completed before the exam.",
        "Increase revision percentage and reduce low-priority topics.",
        "Use the result to avoid unrealistic all-day study plans.",
      ],
    },
  ];

  const internalLinks = [
    {
      href: "/tools/study-timetable-generator",
      title: "Study Timetable Generator",
      description: "Place your calculated study hours into daily morning, afternoon, and evening sessions.",
      icon: CalendarDays,
    },
    {
      href: "/tools/exam-score-goal-planner",
      title: "Exam Score Goal Planner",
      description: "Turn target marks into subject-wise preparation goals.",
      icon: Target,
    },
    {
      href: "/tools/final-exam-calculator",
      title: "Final Exam Calculator",
      description: "Calculate the score needed in your final exam to reach your target grade.",
      icon: Trophy,
    },
    {
      href: "/tools/marks-percentage-calculator",
      title: "Marks Percentage Calculator",
      description: "Calculate marks percentage after tests, boards, or semester exams.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative pb-12">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.38fr]">
          <article className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How study hours calculator works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              Calculate daily study hours, weekly study time, and sessions per day
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <p>
                KASA&apos;s free Study Hours Calculator helps students answer one of the most common
                exam questions: how many hours should I study daily? Instead of guessing, enter the
                number of days left before the exam, subjects, chapters or topics, revision time,
                session length, and current confidence level. The tool estimates daily study hours,
                weekly study hours, sessions per day, chapters per day, total study time, and study
                load status.
              </p>
              <p>
                This study time calculator is useful because every student&apos;s exam load is
                different. A student with 60 days left and high confidence does not need the same
                schedule as a student with 7 days left and weak topics. The calculator adds a
                confidence adjustment and revision percentage so the result is closer to real exam
                preparation. It can support board exams, school tests, college semester exams, NEET,
                JEE, competitive exams, coaching tests, and last-minute revision planning.
              </p>
              <p>
                Students often search for daily study hours calculator, exam preparation hours
                calculator, study session calculator, revision hours calculator, and how many hours
                to study for exams when they feel the syllabus is too large. The better approach is
                to calculate the daily target first, then create a timetable around that number. If
                the result shows a heavy study load, reduce low-priority topics, increase available
                days, focus on high-weight chapters, or split preparation into concept, practice,
                mock test, and revision phases.
              </p>
              <p>
                After calculating hours, use the{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>{" "}
                to place those hours into a daily schedule. You can also use the{" "}
                <Link href="/tools/final-exam-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Final Exam Calculator
                </Link>{" "}
                and{" "}
                <Link href="/tools/exam-score-goal-planner" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Exam Score Goal Planner
                </Link>{" "}
                to connect study time with marks, grades, and score targets.
              </p>
            </div>
          </article>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Study hours result includes
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Daily study hours",
                "Weekly study hours",
                "Sessions per day",
                "Chapters per day",
                "Total study load",
                "Copy and download plan",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-200" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
            Use cases
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Study time calculator for exams, revision, boards, NEET, JEE, and college
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
            Example study hour plans
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Examples students can use before making a timetable
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {examples.map((example) => (
              <div
                key={example.title}
                className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.06]"
              >
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                  {example.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary dark:text-emerald-200">
                  {example.focus}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.58fr_1fr]">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <HelpCircle className="size-6 text-primary dark:text-emerald-200" aria-hidden="true" />
            <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Simple study hours formula
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Daily study hours = total syllabus time plus revision time divided by days left.
              Sessions per day = daily study minutes divided by your focused session length. Use
              the result as a realistic target, then build a timetable around it.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              Useful student tools
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Turn study hours into timetable, score goals, and result planning
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {internalLinks.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
