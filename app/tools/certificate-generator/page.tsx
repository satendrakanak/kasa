import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  FileText,
  GraduationCap,
  Lightbulb,
  Palette,
  Printer,
  School,
  ShieldCheck,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { CertificateGenerator } from "@/components/tools/certificate-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Free Certificate Generator Online | Certificate Maker & PDF Download",
  description:
    "Free certificate generator online to create course completion, participation, training, workshop, achievement, and student certificates with templates, logo, signature, and PDF download.",
  keywords: [
    "free certificate generator",
    "certificate generator",
    "certificate generator online",
    "certificate maker",
    "certificate maker online",
    "free certificate maker",
    "certificate template",
    "certificate templates free",
    "certificate design online",
    "certificate PDF download",
    "course completion certificate generator",
    "course certificate maker",
    "participation certificate generator",
    "participation certificate maker",
    "achievement certificate generator",
    "appreciation certificate maker",
    "training certificate generator",
    "workshop certificate generator",
    "printable certificate maker",
    "student certificate generator",
    "certificate with logo",
    "custom certificate maker",
  ],
  alternates: { canonical: "/tools/certificate-generator" },
  openGraph: {
    title: "Free Certificate Generator Online",
    description: "Create printable course completion, participation, training, workshop, and achievement certificates with templates, logo, signature, and PDF download.",
    url: "/tools/certificate-generator",
  },
};

const pageUrl = "https://www.getkasa.in/tools/certificate-generator";

const certificateFaqs = [
  {
    question: "What is a certificate generator?",
    answer:
      "A certificate generator is an online tool that helps create printable certificates with recipient name, course or achievement, date, certificate ID, logo, signature, and design template.",
  },
  {
    question: "Is this certificate generator free?",
    answer:
      "Yes. KASA's certificate generator is free to use for creating course completion, participation, workshop, training, achievement, and student certificates.",
  },
  {
    question: "Can I create a certificate online?",
    answer:
      "Yes. You can create a certificate online by entering the academy name, recipient name, course or event, issue date, signatory, certificate ID, logo, and design options.",
  },
  {
    question: "Can I download a certificate as PDF?",
    answer:
      "Yes. The tool supports print-ready certificate output, so you can print or save the certificate as a PDF from your browser.",
  },
  {
    question: "Can I make a course completion certificate?",
    answer:
      "Yes. Choose Course Completion, add the student name, course name, academy name, issue date, duration, grade, certificate ID, and signatory.",
  },
  {
    question: "Can I make a participation certificate?",
    answer:
      "Yes. Select Participation as the certificate type and enter the event, workshop, activity, course, competition, or program name.",
  },
  {
    question: "Can I create a training certificate?",
    answer:
      "Yes. Trainers, companies, academies, and institutes can create training completion certificates with duration, participant name, date, and signature.",
  },
  {
    question: "Can I create a workshop certificate?",
    answer:
      "Yes. Use the workshop certificate type for seminars, webinars, bootcamps, masterclasses, and live training sessions.",
  },
  {
    question: "Can I add my logo to the certificate?",
    answer:
      "Yes. You can upload a logo and adjust its scale and position before printing or downloading the certificate.",
  },
  {
    question: "Can I change certificate colors and templates?",
    answer:
      "Yes. The certificate maker includes templates, brand color, background patterns, border styles, and optional details.",
  },
  {
    question: "What should a certificate include?",
    answer:
      "A good certificate includes issuer name, recipient name, course or achievement, certificate type, issue date, certificate ID, signatory, logo, and optional verification note.",
  },
  {
    question: "Can schools and colleges use this certificate maker?",
    answer:
      "Yes. Schools and colleges can create student certificates for participation, achievement, workshops, competitions, and course completion.",
  },
  {
    question: "Can coaching institutes use this certificate generator?",
    answer:
      "Yes. Coaching institutes can create certificates for completed batches, workshops, test series, training programs, and student achievements.",
  },
  {
    question: "Can online educators create certificates?",
    answer:
      "Yes. Online educators can create certificates for recorded courses, live cohorts, webinars, masterclasses, and digital training programs.",
  },
  {
    question: "Can I add a certificate ID?",
    answer:
      "Yes. You can show a certificate ID on the certificate to make records easier to manage and verify.",
  },
  {
    question: "Can I print only the certificate?",
    answer:
      "Yes. The print button opens a certificate-only print view designed for landscape certificate output.",
  },
];

const useCases = [
  {
    title: "For Online Courses",
    description: "Create course completion certificates for recorded courses, live cohorts, bootcamps, and masterclasses.",
    icon: BookOpenCheck,
  },
  {
    title: "For Schools & Colleges",
    description: "Make student certificates for competitions, participation, workshops, achievements, and activities.",
    icon: School,
  },
  {
    title: "For Coaching Institutes",
    description: "Generate batch completion, training, test-series, and workshop certificates with certificate IDs.",
    icon: GraduationCap,
  },
  {
    title: "For Corporate Training",
    description: "Create training completion certificates for employees, interns, onboarding, and skill programs.",
    icon: BriefcaseBusiness,
  },
  {
    title: "For Events & Workshops",
    description: "Design participation certificates for seminars, webinars, conferences, and offline events.",
    icon: UsersRound,
  },
];

const certificateExamples = [
  {
    title: "Example Course Completion Certificate",
    focus: "Digital Marketing Masterclass",
    points: [
      "Recipient name, course name, academy logo, duration, grade, and issue date.",
      "Best for online courses, coaching batches, and skill programs.",
      "Add certificate ID and verification note for credibility.",
    ],
  },
  {
    title: "Example Participation Certificate",
    focus: "Workshop, webinar, event, or competition",
    points: [
      "Use event name, participant name, organizer name, and event date.",
      "Best for seminars, student activities, webinars, and community programs.",
      "Keep wording short and make the organizer name clearly visible.",
    ],
  },
  {
    title: "Example Achievement Certificate",
    focus: "Top performer, contest winner, or milestone",
    points: [
      "Mention achievement, rank, award, or performance milestone.",
      "Use a premium template with signature and certificate ID.",
      "Best for schools, academies, competitions, and employee recognition.",
    ],
  },
];

export default function CertificateGeneratorPage() {
  const heroKeywords = [
    "free certificate generator",
    "certificate maker online",
    "course completion certificate",
    "participation certificate",
    "training certificate",
    "certificate PDF download",
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "Free Certificate Generator Online",
      alternateName: ["Certificate Maker", "Certificate Generator", "Course Completion Certificate Generator", "Participation Certificate Maker"],
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      description:
        "Free certificate generator online to create course completion, participation, training, workshop, achievement, and student certificates with templates, logo, signature, certificate ID, and PDF-ready output.",
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
      name: "How to create a certificate online",
      description: "Create a printable certificate with template, logo, recipient name, certificate ID, date, signature, and PDF-ready output.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose certificate type",
          text: "Select course completion, participation, achievement, workshop completion, or training completion.",
        },
        {
          "@type": "HowToStep",
          name: "Add certificate details",
          text: "Enter academy name, recipient name, course or event name, issue date, duration, grade, certificate ID, and signatory.",
        },
        {
          "@type": "HowToStep",
          name: "Customize design",
          text: "Upload logo, choose template, set brand color, select background pattern, and adjust border style.",
        },
        {
          "@type": "HowToStep",
          name: "Print or download",
          text: "Preview the certificate, then print it or save it as a PDF from the browser.",
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
                <Award className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Certificate Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Free Certificate Generator Online
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create printable premium course completion, participation, achievement, workshop, and training certificates with templates, logo upload, brand color, background design, student name, course, issue date, grade, certificate ID, signature, and PDF-ready output.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={FileText}
              title="Make certificates students can share"
              description="Design a branded certificate with logo, custom color, premium background, instant preview, and certificate-only print."
              points={[
                "Choose certificate type, template, logo, brand color, background, border, grade, duration, and certificate ID.",
                "Show or hide optional details such as verification note and grade.",
                "Copy certificate text, download HTML, or print a landscape certificate.",
              ]}
            />
          </div>
        </div>
      </section>

      <CertificateGenerator />

      <CertificateSeoContent />

      <ToolSeoSection
        eyebrow="Certificate generator FAQ"
        title="Free Certificate Generator Online FAQ"
        description="Use this free certificate generator as a certificate maker, certificate template editor, course completion certificate generator, participation certificate maker, training certificate generator, and printable PDF certificate tool."
        keywords={[
          "free certificate generator",
          "certificate generator",
          "certificate generator online",
          "certificate maker",
          "certificate maker online",
          "course completion certificate generator",
          "participation certificate generator",
          "achievement certificate generator",
          "training certificate generator",
          "workshop certificate generator",
          "certificate PDF download",
          "printable certificate maker",
          "student certificate generator",
          "certificate with logo",
        ]}
        faqs={certificateFaqs}
        relatedTools={[
          { href: "/tools/admission-form-generator", label: "Admission Form Generator" },
          { href: "/tools/fee-receipt-generator", label: "Fee Receipt Generator" },
          { href: "/tools/report-card-generator", label: "AI Report Card Generator" },
          { href: "/tools/assignment-generator", label: "AI Assignment Generator" },
          { href: "/tools/lesson-plan-generator", label: "AI Lesson Plan Generator" },
          { href: "/tools/batch-capacity-calculator", label: "Batch Capacity Calculator" },
        ]}
      />
    </div>
  );
}

function CertificateSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Certificate Generator Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Create printable certificates with templates, logo, signature, and PDF output
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s Free Certificate Generator Online helps academies, teachers, trainers, schools, colleges, coaching institutes, and online educators create professional certificates without design software. Add the academy name, recipient name, course or event name, certificate type, issue date, certificate ID, grade, duration, verification note, and signatory. Then customize the certificate template with logo upload, brand color, premium background pattern, border style, and optional details.
              </p>
              <p>
                The strongest search intent for this type of tool is practical: users want a free certificate maker online that can create a certificate quickly and produce a clean printable result. This page targets that intent with course completion certificates, participation certificates, achievement certificates, appreciation certificates, workshop certificates, training certificates, and student certificates. The certificate preview updates as you edit, so you can test names, titles, colors, and details before printing or saving the certificate as a PDF.
              </p>
              <p>
                Course creators can use the generator for online course completion certificates, cohort certificates, bootcamp certificates, and masterclass certificates. Schools and colleges can create participation certificates for competitions, seminars, clubs, workshops, and student achievements. Coaching institutes can issue batch completion certificates and training certificates. Companies and trainers can create employee training certificates, internship certificates, onboarding certificates, and recognition certificates with a certificate ID for easy records.
              </p>
              <p>
                A good certificate should look official and easy to verify. Keep the recipient name clear, use a short certificate title, add the issuing organization name, include the issue date, and show a certificate ID when possible. Add your logo and signatory to build trust. After creating certificates, academy teams can also use the{" "}
                <Link href="/tools/fee-receipt-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Fee Receipt Generator
                </Link>
                ,{" "}
                <Link href="/tools/admission-form-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  Admission Form Generator
                </Link>
                , and{" "}
                <Link href="/tools/report-card-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Report Card Generator
                </Link>
                {" "}for related student and institute documents.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Certificate maker includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Certificate templates", "Logo upload", "Brand colors", "Signature details", "PDF-ready print"].map((item) => (
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
            Certificate maker for courses, schools, training, and events
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
                Example Certificates
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Certificate formats you can create online
              </h2>
            </div>
            <Link href="/tools/report-card-generator" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Create student reports
              <FileCheck2 className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {certificateExamples.map((example) => (
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
            { href: "/tools/fee-receipt-generator", label: "Fee Receipt Generator", icon: Printer },
            { href: "/tools/admission-form-generator", label: "Admission Form Generator", icon: FileText },
            { href: "/tools/report-card-generator", label: "AI Report Card Generator", icon: Sparkles },
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

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { title: "Design", text: "Choose template, color, background, and border style.", icon: Palette },
            { title: "Details", text: "Add name, course, date, grade, duration, and certificate ID.", icon: FileText },
            { title: "Trust", text: "Use logo, signature, and verification note for credibility.", icon: ShieldCheck },
            { title: "Recognition", text: "Issue certificates for completion, participation, and achievement.", icon: Trophy },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-[1rem] border border-blue-950/10 bg-white/82 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                <Icon className="size-5 text-primary dark:text-emerald-200" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
