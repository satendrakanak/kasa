import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Banknote,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  IndianRupee,
  Lightbulb,
  ListChecks,
  PiggyBank,
  School,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { ScholarshipEligibilityCalculator } from "@/components/tools/scholarship-eligibility-calculator";
import { ToolBreadcrumb, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

const pageUrl = "https://www.getkasa.in/tools/scholarship-eligibility-calculator";

const scholarshipFaqs = [
  {
    question: "What is a scholarship eligibility calculator?",
    answer:
      "A scholarship eligibility calculator is a planning tool that checks common scholarship filters such as marks percentage, annual family income, category, course level, and applicant status before you apply.",
  },
  {
    question: "Is this scholarship eligibility calculator free?",
    answer:
      "Yes. KASA's scholarship eligibility calculator is free for students who want to estimate scholarship eligibility, income limit fit, marks eligibility, and document readiness.",
  },
  {
    question: "Is this an official scholarship checker?",
    answer:
      "No. This is not an official government or university approval tool. It gives a planning estimate only. Always verify final rules on the official scholarship portal, institute notice, or scheme notification.",
  },
  {
    question: "Can this tool guarantee scholarship approval?",
    answer:
      "No. Final approval depends on official scheme rules, document verification, institute validation, merit list, quota, renewal conditions, and available scholarship funds.",
  },
  {
    question: "What details are needed to check scholarship eligibility?",
    answer:
      "Most scholarship schemes ask for marks percentage, annual family income, category, course level, institute type, domicile or residency, bank account, identity proof, and academic documents.",
  },
  {
    question: "How is scholarship income limit checked?",
    answer:
      "Scholarship income limit is usually checked using annual family income. Many schemes require an income certificate or income proof, and the allowed limit can vary by category and scheme.",
  },
  {
    question: "How much percentage is required for scholarship?",
    answer:
      "Many schemes use minimum marks such as 50 percent, 60 percent, 75 percent, or merit-based cutoffs. The exact percentage depends on the scholarship type, category, class, course, and official rules.",
  },
  {
    question: "Can OBC, SC, ST, EWS, General, and Minority students use this tool?",
    answer:
      "Yes. The calculator supports common category inputs such as General, OBC, SC, ST, EWS, and Minority so students can estimate how category-based filters may affect eligibility.",
  },
  {
    question: "Can school students check scholarship eligibility?",
    answer:
      "Yes. School students can use it to plan for pre-matric, post-matric, merit-based, minority, income-based, and board-result scholarship applications.",
  },
  {
    question: "Can college students check scholarship eligibility?",
    answer:
      "Yes. Undergraduate, postgraduate, professional course, diploma, and technical course students can use the tool to estimate common marks and income filters before applying.",
  },
  {
    question: "Can I use this for post-matric scholarship eligibility?",
    answer:
      "Yes. It can help students understand common post-matric scholarship filters, but official post-matric rules vary by state, category, course, institute, and academic year.",
  },
  {
    question: "Can I check merit scholarship eligibility?",
    answer:
      "Yes. Use your latest marks percentage to estimate merit strength. Merit scholarships may also consider rank, entrance score, board result, course, institute, and available seats.",
  },
  {
    question: "What documents are usually needed for scholarship applications?",
    answer:
      "Common documents include marksheet, income certificate, caste or category certificate, domicile certificate, Aadhaar or ID proof, bank details, admission proof, fee receipt, and passport-size photo.",
  },
  {
    question: "What should I do if my income is above the limit?",
    answer:
      "If income is above the limit, check other scholarships such as merit-only awards, private scholarships, institute fee waivers, entrance-based aid, or education loan support.",
  },
  {
    question: "What should I do if my marks are below the requirement?",
    answer:
      "If marks are below the requirement, check schemes with lower cutoffs, category relaxation, need-based aid, institute support, or apply after improving marks in the next qualifying exam.",
  },
  {
    question: "Can I print or download my scholarship eligibility result?",
    answer:
      "Yes. The tool lets you copy, print, or download the scholarship eligibility estimate so you can use it while preparing documents or discussing options with your institute.",
  },
  {
    question: "Should I still visit the official scholarship portal?",
    answer:
      "Yes. Use this calculator for early planning, then confirm exact eligibility, dates, documents, renewal rules, and application steps on the official scholarship portal.",
  },
];

export const metadata: Metadata = {
  title: "Free Scholarship Eligibility Calculator | Check Marks, Income & Category",
  description:
    "Free scholarship eligibility calculator for students to check marks percentage, family income limit, category, course level, documents, and common scholarship filters.",
  keywords: [
    "free scholarship eligibility calculator",
    "scholarship eligibility calculator",
    "scholarship eligibility checker",
    "student scholarship eligibility",
    "scholarship income limit calculator",
    "scholarship marks eligibility",
    "India scholarship eligibility checker",
    "scholarship calculator for students",
    "scholarship percentage eligibility",
    "family income limit for scholarship",
    "OBC scholarship eligibility",
    "SC ST scholarship eligibility",
    "EWS scholarship eligibility",
    "minority scholarship eligibility",
    "post matric scholarship eligibility",
    "merit scholarship eligibility",
    "college scholarship eligibility",
    "school scholarship eligibility",
    "scholarship documents checklist",
  ],
  alternates: { canonical: "/tools/scholarship-eligibility-calculator" },
  openGraph: {
    title: "Free Scholarship Eligibility Calculator for Students",
    description:
      "Check common scholarship eligibility filters using marks percentage, income limit, category, course level, and documents.",
    url: "/tools/scholarship-eligibility-calculator",
  },
};

export default function ScholarshipEligibilityCalculatorPage() {
  const heroKeywords = [
    "free scholarship eligibility calculator",
    "scholarship eligibility calculator",
    "scholarship eligibility checker",
    "scholarship income limit",
    "scholarship marks eligibility",
    "student scholarship checker",
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: "Free Scholarship Eligibility Calculator",
      alternateName: [
        "Scholarship Eligibility Checker",
        "Student Scholarship Checker",
        "Scholarship Income Limit Calculator",
        "Scholarship Marks Eligibility Calculator",
      ],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free scholarship eligibility calculator for students to estimate common scholarship filters using marks percentage, annual family income, category, course level, and applicant status.",
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
      name: "How to check scholarship eligibility",
      description:
        "Estimate scholarship eligibility using marks percentage, family income, category, course level, and common applicant filters.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter marks percentage",
          text: "Add your latest academic percentage so the tool can compare it with common scholarship marks requirements.",
        },
        {
          "@type": "HowToStep",
          name: "Add annual family income",
          text: "Enter approximate annual family income to estimate whether you fit common scholarship income limits.",
        },
        {
          "@type": "HowToStep",
          name: "Select category and course level",
          text: "Choose your category and course level, such as school, undergraduate, postgraduate, or professional course.",
        },
        {
          "@type": "HowToStep",
          name: "Review and verify",
          text: "Use the estimate for planning, then confirm exact eligibility, documents, and dates on the official scholarship portal.",
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
                <PiggyBank className="size-3.5" aria-hidden="true" />
                Scholarship tool
              </div>
              <ToolBreadcrumb current="Scholarship Eligibility Calculator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Free Scholarship Eligibility Calculator for Students
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Check common scholarship filters using marks percentage, annual family income,
                category, course level, applicant status, and document readiness before you apply.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <HeroCard
              icon={ShieldCheck}
              title="Built for scholarship planning"
              points={[
                "Estimate eligibility before starting a long application.",
                "Compare marks and income against common scholarship filters.",
                "Copy, print, or download the result for document planning.",
              ]}
            />
          </div>
        </div>
      </section>

      <ScholarshipEligibilityCalculator />

      <ScholarshipEligibilitySeoContent />

      <ToolSeoSection
        eyebrow="Scholarship FAQ"
        title="Scholarship eligibility checker for marks, income, category, and documents"
        description="Use this scholarship eligibility calculator to estimate common scholarship filters such as marks percentage, annual family income limit, category, course level, applicant status, document readiness, and official portal verification."
        keywords={[
          "free scholarship eligibility calculator",
          "scholarship eligibility checker",
          "student scholarship checker",
          "scholarship income limit",
          "scholarship marks eligibility",
          "post matric scholarship eligibility",
          "merit scholarship eligibility",
          "scholarship documents checklist",
        ]}
        faqs={scholarshipFaqs}
        relatedTools={[
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/board-percentage-calculator", label: "Board Percentage Calculator" },
          { href: "/tools/cgpa-percentage-converter", label: "CGPA to Percentage Converter" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/study-hours-calculator", label: "Study Hours Calculator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
        ]}
      />
    </div>
  );
}

function ScholarshipEligibilitySeoContent() {
  const useCases = [
    {
      title: "For School Students",
      description:
        "Estimate pre-matric, post-matric, merit-based, minority, and income-based scholarship fit using marks, income, category, and documents.",
      icon: School,
    },
    {
      title: "For College Students",
      description:
        "Check common eligibility filters before applying for undergraduate, postgraduate, diploma, professional, and technical course scholarships.",
      icon: GraduationCap,
    },
    {
      title: "For Merit Scholarships",
      description:
        "Use marks percentage to understand merit strength for board result scholarships, institute awards, entrance-based aid, and high-score schemes.",
      icon: Award,
    },
    {
      title: "For Income-Based Scholarships",
      description:
        "Compare annual family income with common income limits and prepare income certificate, bank details, and supporting documents early.",
      icon: IndianRupee,
    },
    {
      title: "For Category-Based Scholarships",
      description:
        "Plan for OBC, SC, ST, EWS, Minority, and General category scholarship filters while remembering that final rules vary by official scheme.",
      icon: Users,
    },
    {
      title: "For Document Planning",
      description:
        "Use the result to prepare marksheet, income proof, caste or category certificate, domicile, admission proof, fee receipt, and bank details.",
      icon: FileCheck2,
    },
  ];

  const examples = [
    {
      title: "Example Post-Matric Scholarship Check",
      focus: "Marks, income limit, category, course level, documents",
      points: [
        "Student enters marks percentage and annual family income.",
        "Tool estimates whether common marks and income filters are matching.",
        "Student verifies official post-matric rules and prepares documents before deadline.",
      ],
    },
    {
      title: "Example Merit Scholarship Check",
      focus: "High marks, board percentage, entrance score, institute rules",
      points: [
        "Student checks whether marks are strong enough for merit-based schemes.",
        "Scholarship planning is paired with board percentage or GPA calculation.",
        "Final selection still depends on official merit list, seats, and scheme rules.",
      ],
    },
    {
      title: "Example Income-Based Scholarship Check",
      focus: "Family income, income certificate, fee support, renewal",
      points: [
        "Student compares family income with common scholarship income limits.",
        "If income is above the limit, student checks merit-only or institute support options.",
        "The result helps create a document checklist before applying online.",
      ],
    },
  ];

  const internalLinks = [
    {
      href: "/tools/marks-percentage-calculator",
      title: "Marks Percentage Calculator",
      description: "Calculate percentage from obtained marks before checking scholarship cutoffs.",
      icon: Target,
    },
    {
      href: "/tools/board-percentage-calculator",
      title: "Board Percentage Calculator",
      description: "Calculate board exam percentage for scholarship applications and forms.",
      icon: Award,
    },
    {
      href: "/tools/gpa-calculator",
      title: "GPA Calculator",
      description: "Convert semester performance into GPA for college scholarship planning.",
      icon: GraduationCap,
    },
    {
      href: "/tools/study-timetable-generator",
      title: "Study Timetable Generator",
      description: "Plan study sessions to improve marks for merit-based scholarships.",
      icon: ListChecks,
    },
  ];

  return (
    <section className="relative pb-12">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.38fr]">
          <article className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How scholarship eligibility calculator works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
              Check scholarship eligibility before filling long application forms
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <p>
                KASA&apos;s free Scholarship Eligibility Calculator helps students estimate whether
                they match common scholarship filters before starting a long application. Enter your
                marks percentage, annual family income, category, course level, and applicant status.
                The tool compares these details with common screening patterns and gives a simple
                eligibility estimate, profile match score, marks gap, and income gap.
              </p>
              <p>
                This page is built for the early planning stage, when students are unsure whether an
                application is worth starting. It helps you compare your marks, income, category,
                course level, and applicant type against common scholarship screening filters before
                you spend time collecting documents and filling long forms.
              </p>
              <p>
                A scholarship form may look simple, but rejection often happens because students
                miss one eligibility condition or upload weak documents. Common requirements include
                marksheet, income certificate, caste or category certificate, domicile certificate,
                identity proof, bank account, admission proof, fee receipt, institute verification,
                and sometimes renewal history. Use this calculator to prepare early, then confirm
                the exact rules, dates, documents, and application process on the official
                scholarship portal.
              </p>
              <p>
                For better planning, pair this tool with the{" "}
                <Link href="/tools/marks-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Marks Percentage Calculator
                </Link>
                ,{" "}
                <Link href="/tools/board-percentage-calculator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Board Percentage Calculator
                </Link>
                , and{" "}
                <Link href="/tools/study-timetable-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Study Timetable Generator
                </Link>
                . These tools help students calculate academic percentages, understand score
                readiness, and improve marks for merit-based or renewal-based scholarships.
              </p>
            </div>
          </article>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Eligibility check includes
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Marks percentage check",
                "Annual family income limit",
                "Category-based filters",
                "Course level selection",
                "Applicant status check",
                "Copy, print, download result",
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
            Scholarship checker for school, college, merit, income, and category filters
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
            Example scholarship checks
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            Examples students can use before applying online
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
              Important reminder
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Scholarship rules change by scheme, state, institute, year, category, and course. Use
              this calculator for planning only, then verify official eligibility, income limit,
              document format, last date, renewal rules, and application status on the official
              portal.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              Useful student tools
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              Prepare scholarship marks, percentage, GPA, and study plan
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
              <Banknote className="size-6 text-primary dark:text-emerald-200" aria-hidden="true" />
              <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Plan documents before the deadline
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              Many students miss scholarships because documents are not ready on time. After
              checking eligibility, prepare your marksheet, income certificate, category certificate,
              domicile proof, ID proof, bank account details, fee receipt, admission proof, and
              institute verification details. Keep digital copies clear and readable before applying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard({ icon: Icon, title, points }: { icon: typeof ShieldCheck; title: string; points: string[] }) {
  return (
    <div className="rounded-[1.4rem] border border-blue-950/10 bg-white/88 p-5 text-left shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">A simple eligibility estimate students can understand before collecting documents.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {points.map((point) => (
          <div key={point} className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
