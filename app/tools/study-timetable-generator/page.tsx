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
  Printer,
  School,
  Target,
  Trophy,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { StudyTimetableGenerator } from "@/components/tools/study-timetable-generator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

const pageUrl = "https://www.getkasa.in/tools/study-timetable-generator";

const studyTimetableFaqs = [
  {
    question: "What is a study timetable generator?",
    answer:
      "A study timetable generator is an online study planner that creates a day-wise study schedule from your subjects, available days, session length, breaks, revision time, and preferred study hours.",
  },
  {
    question: "Is this study timetable generator free?",
    answer:
      "Yes. KASA's study timetable generator is free to use for students who want to create an exam study plan, daily study timetable, revision timetable, or printable study schedule.",
  },
  {
    question: "How does the study timetable generator work?",
    answer:
      "The tool uses your subjects, difficulty level, chapters, preparation days, study windows, session duration, break time, and revision percentage to generate a balanced timetable automatically.",
  },
  {
    question: "How do I make a study timetable for exams?",
    answer:
      "Add your subjects, mark difficult subjects, enter the number of days left, choose morning, afternoon, or evening study windows, then generate the plan. Review the timetable and adjust subjects if needed.",
  },
  {
    question: "Can I create a daily study timetable?",
    answer:
      "Yes. You can create a daily study timetable with subject-wise study sessions, practice blocks, revision slots, and breaks arranged across each preparation day.",
  },
  {
    question: "Can I create a revision timetable?",
    answer:
      "Yes. The generator includes a revision percentage setting, so you can reserve time for quick revision, formula practice, mock tests, summaries, and previous-year question review.",
  },
  {
    question: "Can I make a subject-wise study timetable?",
    answer:
      "Yes. You can add multiple subjects with chapter counts and difficulty levels, then generate a subject-wise study timetable that gives more focus to harder or heavier subjects.",
  },
  {
    question: "Can I choose morning, afternoon, or evening study time?",
    answer:
      "Yes. You can enable morning, afternoon, evening, or any combination of study windows, then set the exact start and end time for each block.",
  },
  {
    question: "Can I print or download my study timetable?",
    answer:
      "Yes. The generated study timetable can be copied, shared, emailed, downloaded, or printed as a clean timetable for daily exam preparation.",
  },
  {
    question: "Can Class 10 students use this study planner?",
    answer:
      "Yes. Class 10 students can use it for board exam preparation, daily revision, Science and Maths practice, Social Science reading, English writing practice, and pre-board planning.",
  },
  {
    question: "Can Class 12 students use this timetable maker?",
    answer:
      "Yes. Class 12 students can create a board exam timetable for Physics, Chemistry, Maths, Biology, Commerce subjects, Humanities subjects, English, practical revision, and sample paper practice.",
  },
  {
    question: "Can NEET or JEE students use this tool?",
    answer:
      "Yes. NEET and JEE aspirants can build a study schedule for concepts, question practice, mock tests, error review, formula revision, NCERT revision, and subject rotation.",
  },
  {
    question: "How many hours should I study per day?",
    answer:
      "The right number depends on your exam date, syllabus, energy, and school or college workload. A realistic plan with consistent focused sessions is better than an overloaded timetable that you cannot follow.",
  },
  {
    question: "How long should each study session be?",
    answer:
      "Most students work well with 40 to 60 minute focused sessions followed by short breaks. Longer sessions can work for mock tests, writing practice, and deep revision.",
  },
  {
    question: "How do breaks help in a study schedule?",
    answer:
      "Breaks help you avoid fatigue and keep attention high. A good study schedule includes short breaks between sessions and longer pauses after heavy topics or mock tests.",
  },
  {
    question: "Can I use this for last-minute exam preparation?",
    answer:
      "Yes. For last-minute preparation, use fewer subjects, shorter sessions, more revision blocks, and prioritize high-weight chapters, formulas, definitions, diagrams, and previous-year questions.",
  },
  {
    question: "Can I share my study timetable with parents or friends?",
    answer:
      "Yes. You can copy, share, email, download, or print the timetable so parents, teachers, study partners, or classmates can review the plan.",
  },
];

export const metadata: Metadata = {
  title: "Free Study Timetable Generator | Exam Study Planner & Schedule Maker",
  description:
    "Free study timetable generator to create daily study schedule, exam study plan, revision timetable, subject-wise timetable, and printable study planner.",
  keywords: [
    "free study timetable generator",
    "study timetable generator",
    "study timetable maker",
    "study schedule maker",
    "study planner",
    "exam study planner",
    "exam study schedule",
    "study plan generator",
    "daily study timetable",
    "revision timetable generator",
    "printable study timetable",
    "student study planner",
    "study timetable for students",
    "class 10 study timetable",
    "class 12 study timetable",
    "board exam study timetable",
    "neet study timetable",
    "jee study timetable",
    "competitive exam study planner",
    "subject wise study timetable",
    "morning study timetable",
    "timetable maker for study",
  ],
  alternates: {
    canonical: "/tools/study-timetable-generator",
  },
  openGraph: {
    title: "Free Study Timetable Generator for Students",
    description:
      "Create a balanced exam study plan with daily sessions, subject priorities, breaks, revision blocks, and printable output.",
    url: "/tools/study-timetable-generator",
  },
};

export default function StudyTimetableGeneratorPage() {
  const heroKeywords = [
    "free study timetable generator",
    "study timetable generator",
    "study schedule maker",
    "exam study planner",
    "revision timetable generator",
    "daily study timetable",
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: "Free Study Timetable Generator",
      alternateName: [
        "Study Timetable Maker",
        "Study Schedule Maker",
        "Exam Study Planner",
        "Revision Timetable Generator",
        "Daily Study Planner",
      ],
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
        "Free study timetable generator for students to create daily study schedules, exam study plans, revision timetables, and printable subject-wise study plans.",
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
      name: "How to create a study timetable for exams",
      description:
        "Create a practical exam study timetable with subjects, preparation days, study windows, session length, breaks, and revision time.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Add your subjects",
          text: "Enter every subject you need to prepare, then set chapter count and difficulty so the timetable can prioritize heavier subjects.",
        },
        {
          "@type": "HowToStep",
          name: "Set exam days and study hours",
          text: "Choose how many days you have left and select morning, afternoon, or evening study windows with start and end times.",
        },
        {
          "@type": "HowToStep",
          name: "Choose session length and revision time",
          text: "Set focused study session duration, break duration, and revision percentage to balance learning, practice, and review.",
        },
        {
          "@type": "HowToStep",
          name: "Generate and use your timetable",
          text: "Generate the timetable, review daily sessions, then copy, download, share, email, or print the study plan.",
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
                <CalendarDays className="size-3.5" aria-hidden="true" />
                Student planner
              </div>
              <ToolBreadcrumb current="Study Timetable Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Free Study Timetable Generator for Students
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a daily study timetable, exam study plan, revision schedule, and printable
                subject-wise timetable from your subjects, study hours, exam timeline, and priority.
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

      <StudyTimetableSeoContent />

      <ToolSeoSection
        eyebrow="Study timetable FAQ"
        title="Study timetable generator for daily exam preparation"
        description="Use this free study timetable generator to create a daily study schedule, subject-wise exam plan, revision timetable, morning study routine, evening study timetable, and printable planner for school, college, board exams, NEET, JEE, and competitive exams."
        keywords={[
          "free study timetable generator",
          "study timetable generator",
          "study schedule maker",
          "exam study planner",
          "exam study schedule",
          "revision timetable generator",
          "daily study planner",
          "printable study timetable",
          "subject wise study timetable",
        ]}
        faqs={studyTimetableFaqs}
        relatedTools={[
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/exam-score-goal-planner", label: "Exam Score Goal Planner" },
          { href: "/tools/final-exam-calculator", label: "Final Exam Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/attendance-calculator", label: "Attendance Calculator" },
          { href: "/tools/assignment-deadline-planner", label: "Assignment Deadline Planner" },
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

function StudyTimetableSeoContent() {
  const useCases = [
    {
      title: "For Class 10 Students",
      description:
        "Plan Maths, Science, Social Science, English, Hindi, pre-board revision, diagrams, formulas, and sample papers without making an unrealistic timetable.",
      icon: School,
    },
    {
      title: "For Class 12 Board Exams",
      description:
        "Create a board exam study plan for Physics, Chemistry, Maths, Biology, Commerce, Humanities, English, practical files, and writing practice.",
      icon: GraduationCap,
    },
    {
      title: "For NEET and JEE Aspirants",
      description:
        "Balance concept study, NCERT revision, question practice, mock tests, formula review, weak topics, and error notebook revision.",
      icon: Target,
    },
    {
      title: "For College Semester Exams",
      description:
        "Build a compact study schedule for units, notes, assignments, previous-year papers, lab records, viva preparation, and last-week revision.",
      icon: BookOpenCheck,
    },
    {
      title: "For Last-Minute Revision",
      description:
        "Prioritize high-weight topics, quick notes, formulas, definitions, diagrams, mock tests, and previous-year questions when exam time is close.",
      icon: Clock3,
    },
    {
      title: "For Homework Planning",
      description:
        "Use the timetable maker to divide homework, assignments, project work, reading, practice questions, and revision across the week.",
      icon: ListChecks,
    },
  ];

  const examples = [
    {
      title: "Example Class 10 Study Timetable",
      focus: "Maths, Science, English, Social Science, Hindi",
      points: [
        "Morning: Maths formulas and problem practice.",
        "Afternoon: Science concepts, diagrams, and NCERT questions.",
        "Evening: Social Science reading, English writing, and quick revision.",
      ],
    },
    {
      title: "Example Class 12 Board Exam Timetable",
      focus: "Physics, Chemistry, Maths or Biology, English, practical revision",
      points: [
        "Use harder subjects in high-energy hours.",
        "Add sample paper practice every few days.",
        "Reserve revision blocks for formulas, derivations, definitions, and diagrams.",
      ],
    },
    {
      title: "Example NEET or JEE Study Timetable",
      focus: "Concept study, question practice, mocks, analysis, revision",
      points: [
        "Rotate Physics, Chemistry, and Maths or Biology daily.",
        "Add mock test analysis instead of only more chapters.",
        "Keep short revision slots for formulas, NCERT lines, and error notebook fixes.",
      ],
    },
  ];

  const internalLinks = [
    {
      href: "/tools/exam-score-goal-planner",
      title: "Exam Score Goal Planner",
      description: "Turn target marks into a subject-wise preparation plan.",
      icon: Target,
    },
    {
      href: "/tools/final-exam-calculator",
      title: "Final Exam Calculator",
      description: "Find the marks you need in the final exam to reach your target grade.",
      icon: Trophy,
    },
    {
      href: "/tools/marks-percentage-calculator",
      title: "Marks Percentage Calculator",
      description: "Convert obtained marks into percentage for school and college results.",
      icon: CalendarCheck,
    },
    {
      href: "/tools/attendance-calculator",
      title: "Attendance Calculator",
      description: "Check classes needed for 75 percent attendance before planning study leave.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative pb-12">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.38fr]">
          <article className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How study timetable generator works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              Create a daily study plan, revision timetable, and exam schedule
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <p>
                KASA&apos;s free Study Timetable Generator helps students create a practical study
                schedule without manually arranging every subject hour by hour. Add your subjects,
                chapters, difficulty level, preparation days, session length, break time, and study
                windows. The tool then creates a day-wise timetable with study sessions, practice
                blocks, revision slots, and short breaks so your plan feels structured but still
                realistic.
              </p>
              <p>
                A useful study plan should not only divide time equally. It should give extra focus
                to difficult subjects, keep enough space for revision, and avoid long sessions that
                look impressive but fail in real life. This planner helps you balance hard chapters,
                easier topics, sample papers, mock tests, notes, formulas, diagrams, definitions,
                and previous-year questions.
              </p>
              <p>
                The timetable works for Class 10 board exams, Class 12 board exams, NEET, JEE,
                college semester exams, school tests, competitive exams, and daily self-study. You
                can create a morning study timetable, evening study timetable, subject-wise study
                timetable, last-minute revision timetable, or full exam preparation schedule. If you
                have only a few days left, increase revision time and focus on high-weight chapters.
                If you have more time, use the timetable maker to rotate subjects steadily and keep
                weekly revision blocks.
              </p>
              <p>
                A printable study timetable is useful because it makes your next action obvious.
                Instead of deciding what to study every day, you can follow a clear routine: learn
                concepts, practice questions, take breaks, revise, and test yourself. Pair this page
                with the{" "}
                <Link href="/tools/exam-score-goal-planner" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Exam Score Goal Planner
                </Link>
                ,{" "}
                <Link href="/tools/final-exam-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Final Exam Calculator
                </Link>
                , and{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>{" "}
                to connect study planning with marks, percentage, and grade targets.
              </p>
            </div>
          </article>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Study timetable includes
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Day-wise study schedule",
                "Subject priority planning",
                "Revision and practice blocks",
                "Morning, afternoon, evening slots",
                "Break time between sessions",
                "Printable timetable output",
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
            Study timetable maker for different student goals
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
            Example study timetables
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Examples students can copy and customize
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
              Simple study planning formula
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Available days x daily study windows should cover new learning, question practice,
              revision, breaks, and mock test review. If the timetable feels too heavy, reduce
              session length or move low-priority topics after high-weight chapters.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              Useful student tools
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Connect your timetable with marks, attendance, and exam goals
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

        <div className="mt-6 rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="grid gap-5 md:grid-cols-[0.35fr_1fr] md:items-center">
            <div>
              <Printer className="size-6 text-primary dark:text-emerald-200" aria-hidden="true" />
              <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Printable timetable for daily follow-through
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              After generating the timetable, print it or download it and keep it visible near your
              study desk. A visible timetable reduces decision fatigue because the next session,
              subject, revision block, and break time are already decided. This is especially useful
              during board exam preparation, competitive exam preparation, and college semester
              revision weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
