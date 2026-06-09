import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Lightbulb,
  School,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { AiAssignmentGenerator } from "@/components/tools/ai-assignment-generator";
import {
  ToolBreadcrumb,
  ToolHeroFeatureCard,
  ToolHeroKeywords,
} from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title:
    "Free AI Assignment Generator for Teachers | Create Homework & Projects",
  description:
    "Free AI assignment generator for teachers to create homework, projects, class assignments, rubrics, marks, learning goals, and printable tasks.",
  keywords: [
    "free AI assignment generator",
    "AI assignment generator",
    "assignment maker",
    "homework generator",
    "assignment creator for teachers",
    "AI assignment generator for teachers",
    "project assignment generator",
    "assignment rubric generator",
  ],
  alternates: { canonical: "/tools/assignment-generator" },
  openGraph: {
    title: "Free AI Assignment Generator for Teachers",
    description:
      "Create homework, class assignments, projects, rubrics, marks, and submission checklists with AI.",
    url: "/tools/assignment-generator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/assignment-generator";

const assignmentFaqs = [
  {
    question: "What is an AI Assignment Generator?",
    answer:
      "An AI Assignment Generator is an online tool that creates assignment briefs, task lists, marks, learning goals, rubrics, and submission instructions from a few teacher inputs.",
  },
  {
    question: "Is this assignment generator free?",
    answer:
      "Yes. KASA's AI Assignment Generator is free to use for creating classroom assignments, homework, project work, and rubric-based tasks.",
  },
  {
    question: "Can teachers generate assignments with rubric?",
    answer:
      "Yes. Teachers can generate assignments with a scoring rubric, marking criteria, task-wise marks, and a submission checklist.",
  },
  {
    question: "Can I create homework assignments?",
    answer:
      "Yes. Choose homework assignment as the assignment type, add the class, subject, topic, difficulty, and marks, then generate a ready-to-share homework plan.",
  },
  {
    question: "Can I generate science assignments?",
    answer:
      "Yes. The tool can create science assignments for topics such as force, motion, electricity, plants, human body systems, experiments, diagrams, and observations.",
  },
  {
    question: "Can I generate math assignments?",
    answer:
      "Yes. Teachers can create math assignments for arithmetic, algebra, geometry, mensuration, statistics, word problems, and practice sets with marks.",
  },
  {
    question: "How do I create project assignments?",
    answer:
      "Select project work, enter the topic and expected outcome, add grade level and marks, and the tool will create tasks, deliverables, checklist items, and rubric criteria.",
  },
  {
    question: "Can I print assignments?",
    answer:
      "Yes. Generated assignments can be printed from the browser. You can also copy or download the assignment text for sharing with students.",
  },
  {
    question: "Can students use this tool?",
    answer:
      "Students can use it to understand assignment structure, but it is designed mainly as an assignment creator for teachers, tutors, coaching institutes, and online educators.",
  },
  {
    question: "Can AI generate assignment questions?",
    answer:
      "Yes. AI can generate task prompts, short questions, project steps, research activities, reflection questions, and assessment criteria based on the subject and class.",
  },
  {
    question: "Is this an Assignment Maker or Homework Generator?",
    answer:
      "It works as both. You can use it as an Assignment Maker for classroom tasks or as a Homework Generator for practice work students complete after class.",
  },
  {
    question: "Can I create assignments for coaching institutes?",
    answer:
      "Yes. Coaching institutes can create chapter practice tasks, weekly homework, test-prep assignments, revision projects, and topic-wise practice sheets.",
  },
  {
    question: "Can online educators create assignments?",
    answer:
      "Yes. Online educators can create assignments for live classes, recorded courses, cohorts, workshops, and self-paced learning programs.",
  },
  {
    question: "Can I generate assignments with learning outcomes?",
    answer:
      "Yes. The generated assignment includes learning goals so students understand what they should know, practice, or demonstrate after completing the work.",
  },
  {
    question: "Does the tool save my last assignment?",
    answer:
      "Yes. The last generated assignment is saved in your browser so you can restore it later on the same device.",
  },
  {
    question: "Can I edit the generated assignment?",
    answer:
      "Yes. Treat the generated assignment as a strong first draft. Teachers can copy it and edit the language, marks, due date, or instructions before sharing.",
  },
];

const useCases = [
  {
    title: "For School Teachers",
    description:
      "Create classwork, homework, holiday homework, project work, and rubric-based assessments aligned with grade level.",
    icon: School,
  },
  {
    title: "For Coaching Institutes",
    description:
      "Prepare weekly assignments, chapter practice tasks, test-prep homework, and revision projects for batches.",
    icon: UsersRound,
  },
  {
    title: "For Tuition Teachers",
    description:
      "Turn a lesson topic into short practice tasks with marks, clear instructions, and parent-friendly homework notes.",
    icon: GraduationCap,
  },
  {
    title: "For Online Educators",
    description:
      "Build assignments for live cohorts, recorded courses, workshops, and self-paced learner checkpoints.",
    icon: BookOpenCheck,
  },
  {
    title: "For Homework Planning",
    description:
      "Plan repeatable homework with learning goals, student tasks, submission checklist, and grading criteria.",
    icon: ClipboardList,
  },
];

const assignmentExamples = [
  {
    title: "Example Science Assignment",
    subject: "Class 8 Science: Force and Pressure",
    tasks: [
      "Explain three daily-life examples of force with diagrams.",
      "Compare contact and non-contact forces in a two-column table.",
      "Create a short observation note on pressure using a simple home activity.",
    ],
  },
  {
    title: "Example English Assignment",
    subject: "Class 7 English: Descriptive Writing",
    tasks: [
      "Write a 180-word description of a busy marketplace using sensory details.",
      "Underline five adjectives and rewrite three weak sentences.",
      "Add a short reflection on how word choice changes the reader's image.",
    ],
  },
  {
    title: "Example Mathematics Assignment",
    subject: "Class 9 Mathematics: Linear Equations",
    tasks: [
      "Solve eight linear equations with clear steps.",
      "Create two word problems from real-life situations.",
      "Check one answer by substituting the value back into the equation.",
    ],
  },
];

export default function AssignmentGeneratorPage() {
  const heroKeywords = [
    "free AI assignment generator",
    "AI assignment generator",
    "assignment maker",
    "homework generator",
    "assignment rubric generator",
    "assignment creator for teachers",
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free AI Assignment Generator for Teachers",
      alternateName: [
        "AI Assignment Generator",
        "Assignment Maker",
        "Homework Generator",
        "Assignment Rubric Generator",
      ],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free AI assignment generator for teachers to create homework, project work, class assignments, rubrics, marks, learning goals, and submission checklists.",
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
      name: "How to create an assignment with AI",
      description:
        "Create a classroom-ready assignment with tasks, marks, learning outcomes, checklist, and rubric.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter class and subject",
          text: "Add the grade level, subject, topic, and syllabus coverage for the assignment.",
        },
        {
          "@type": "HowToStep",
          name: "Choose assignment type",
          text: "Select homework assignment, project work, practice task, or another assignment format.",
        },
        {
          "@type": "HowToStep",
          name: "Set difficulty and marks",
          text: "Choose the difficulty level, number of tasks, total marks, and rubric preference.",
        },
        {
          "@type": "HowToStep",
          name: "Generate and share",
          text: "Generate the assignment, review the tasks and rubric, then copy, print, or download it.",
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
            All AI tools
          </Link>

          <div className="mt-7 grid gap-8 text-center lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-3.5 py-2 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.16em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10 sm:px-4 sm:text-xs sm:leading-none sm:tracking-[0.18em]">
                <span className="relative grid size-4 place-items-center rounded-full bg-primary/10 text-primary dark:bg-emerald-300/10 dark:text-emerald-200">
                  <Sparkles
                    className="size-3.5 animate-pulse"
                    aria-hidden="true"
                  />
                </span>
                AI teacher tool
              </div>
              <ToolBreadcrumb current="AI Assignment Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                AI Assignment Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Free AI Assignment Generator for Teachers to create homework,
                class assignments, projects, marks, learning goals, submission
                checklist, teacher note, and optional rubric.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={ClipboardList}
              title="Assignment maker with rubric"
              description="Create homework, project work, and practice tasks teachers can share with students."
              points={[
                "Generate brief, learning goals, tasks, and marks.",
                "Add submission checklist and grading rubric.",
                "Print, copy, download, and restore the last assignment.",
              ]}
            />
          </div>
        </div>
      </section>

      <AiAssignmentGenerator />

      <AssignmentSeoContent />

      <ToolSeoSection
        eyebrow="AI assignment FAQ"
        title="AI Assignment Generator for Teachers FAQ"
        description="Use this free AI Assignment Generator as an Assignment Maker, Homework Generator, Assignment Rubric Generator, and Assignment Creator for Teachers. Create homework assignments, project work, practice tasks, rubrics, submission checklists, learning goals, and student instructions."
        keywords={[
          "free AI assignment generator",
          "AI assignment generator",
          "assignment maker",
          "homework generator",
          "assignment creator for teachers",
          "AI assignment generator for teachers",
          "project assignment generator",
          "assignment rubric generator",
        ]}
        faqs={assignmentFaqs}
        relatedTools={[
          {
            href: "/tools/question-paper-generator",
            label: "AI Question Paper Generator",
          },
          {
            href: "/tools/worksheet-generator",
            label: "AI Worksheet Generator",
          },
          {
            href: "/tools/lesson-plan-generator",
            label: "AI Lesson Plan Generator",
          },
          { href: "/tools/quiz-generator", label: "AI Quiz Generator" },
          {
            href: "/tools/report-card-generator",
            label: "AI Report Card Generator",
          },
          {
            href: "/tools/assignment-deadline-planner",
            label: "Assignment Deadline Planner",
          },
        ]}
      />
    </div>
  );
}

function AssignmentSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How AI Assignment Generator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Create better assignments, homework, and projects in minutes
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s free AI Assignment Generator helps teachers move
                from a rough topic to a classroom-ready assignment without
                spending extra planning time on formatting, task breakdown,
                marks, and rubric language. Add the class, subject, topic,
                assignment type, difficulty, number of tasks, and total marks.
                The tool then creates an assignment brief, learning goals,
                task-wise instructions, marks distribution, submission
                checklist, grading rubric, and teacher note. That makes it
                useful as an AI Assignment Generator, Assignment Maker, Homework
                Generator, Assignment Rubric Generator, and Assignment Creator
                for Teachers.
              </p>
              <p>
                The biggest SEO and classroom value is that the output is not
                just a list of questions. Teachers often need assignments that
                explain what students should do, how marks will be given, what
                evidence needs to be submitted, and how the work connects to the
                lesson. This generator keeps those parts together so students
                get clearer instructions and teachers get a more consistent
                assessment format. You can use it for daily homework,
                chapter-end practice, holiday homework, project-based learning,
                revision tasks, lab observation work, English writing practice,
                math problem sets, and online course checkpoints.
              </p>
              <p>
                For school teachers, the tool saves time when preparing
                differentiated assignments for different classes or difficulty
                levels. For coaching institutes, it can turn weekly chapters
                into structured homework with practice tasks and marks. Tuition
                teachers can quickly create short assignments after each
                session, while online educators can add assignments to recorded
                courses, live cohorts, or workshop follow-ups. If you also need
                supporting materials, pair this page with the{" "}
                <Link
                  href="/tools/worksheet-generator"
                  className="font-semibold text-primary hover:underline dark:text-emerald-200"
                >
                  AI Worksheet Generator
                </Link>
                ,{" "}
                <Link
                  href="/tools/question-paper-generator"
                  className="font-semibold text-primary hover:underline dark:text-emerald-200"
                >
                  AI Question Paper Generator
                </Link>
                ,{" "}
                <Link
                  href="/tools/quiz-generator"
                  className="font-semibold text-primary hover:underline dark:text-emerald-200"
                >
                  AI Quiz Generator
                </Link>
                , and{" "}
                <Link
                  href="/tools/lesson-plan-generator"
                  className="font-semibold text-primary hover:underline dark:text-emerald-200"
                >
                  AI Lesson Plan Generator
                </Link>
                .
              </p>
              <p>
                To get the best result, write the topic clearly, include the
                expected skill, and choose the assignment type that matches your
                goal. For example, &quot;Class 8 science force and pressure
                project with observation activity&quot; gives better output than
                only &quot;science assignment&quot;. After generating, review
                the wording, adjust marks, add your due date, and share the
                final version with students. The tool supports copy, print,
                download, and restore options, so it works for both quick
                classroom use and repeat planning.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Teacher-focused output
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {[
                "Learning goals",
                "Task-wise marks",
                "Submission checklist",
                "Rubric criteria",
                "Teacher note",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2
                    className="size-4 text-primary dark:text-emerald-200"
                    aria-hidden="true"
                  />
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
            Assignment creator for every teaching workflow
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;

              return (
                <div
                  key={useCase.title}
                  className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <Icon
                    className="size-5 text-primary dark:text-emerald-200"
                    aria-hidden="true"
                  />
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
                Example Assignments
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Sample assignment ideas teachers can generate
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200"
            >
              Explore more free teacher tools
              <FileText className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {assignmentExamples.map((example) => (
              <div
                key={example.title}
                className="rounded-[1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {example.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-primary dark:text-emerald-200">
                  {example.subject}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {example.tasks.map((task) => (
                    <li key={task} className="flex gap-2">
                      <CheckCircle2
                        className="mt-1 size-4 shrink-0 text-primary dark:text-emerald-200"
                        aria-hidden="true"
                      />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
