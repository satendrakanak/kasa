import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  GraduationCap,
  ImagePlus,
  Lightbulb,
  ListChecks,
  Search,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";
import { JsonLd } from "@/components/site/structured-data";
import { siteContainerClasses } from "@/components/site/site-container";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { ResumeBuilderStudio } from "@/components/tools/resume-builder-studio";

export const metadata: Metadata = {
  title: "Free Resume Builder Online | ATS Resume Maker, Templates & PDF",
  description:
    "Free Resume Builder Online to create ATS-friendly resumes with templates, AI writing help, photo resume layouts, live editing, and PDF download.",
  keywords: [
    "free resume builder",
    "resume builder online",
    "resume maker online free",
    "free resume maker",
    "AI resume maker",
    "AI resume builder free",
    "ATS friendly resume builder",
    "resume builder for students",
    "fresher resume builder",
    "resume format for freshers",
    "professional resume builder",
    "online CV maker",
    "CV maker free",
    "resume templates free",
    "resume PDF download",
    "resume builder with photo",
    "resume editor online",
    "resume maker with photo",
    "ATS resume maker",
    "resume PDF maker",
  ],
  alternates: { canonical: "/tools/resume-builder-studio" },
  openGraph: {
    title: "Free Resume Builder Online - KASA AI Resume Maker",
    description: "Build an ATS-friendly resume online for free with templates, live editing, AI suggestions, photo support, and print-ready export.",
    url: "/tools/resume-builder-studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder Online",
    description: "Create an ATS-friendly resume online with free templates, AI writing help, live editing, and PDF-ready export.",
  },
};

const pageUrl = "https://www.getkasa.in/tools/resume-builder-studio";

const resumeBuilderFaqs = [
  {
    question: "What is a free resume builder online?",
    answer:
      "A free resume builder online is a web tool that helps you create a professional resume with templates, sections, live editing, writing suggestions, and PDF-ready output.",
  },
  {
    question: "Is KASA Free Resume Builder really free?",
    answer:
      "Yes. You can choose a template, write resume details, upload an old resume, edit live, add a photo if needed, and prepare a resume for print or PDF.",
  },
  {
    question: "Can I create an ATS-friendly resume?",
    answer:
      "Yes. The templates use clear headings, readable sections, simple formatting, and role-focused skills so the resume is easier for ATS systems and recruiters to read.",
  },
  {
    question: "Can students use this resume builder?",
    answer:
      "Yes. Students can create internship, campus placement, scholarship, project-based, and fresher resumes with simple professional formats.",
  },
  {
    question: "Can freshers create resumes here?",
    answer:
      "Yes. Freshers can add education, skills, internships, certifications, projects, achievements, and a clean career objective.",
  },
  {
    question: "Can experienced professionals use it?",
    answer:
      "Yes. Experienced professionals can build resumes with work experience, measurable achievements, skills, summary, certifications, and leadership impact.",
  },
  {
    question: "Can I upload my old resume?",
    answer:
      "Yes. You can upload an existing PDF, DOC, DOCX, TXT, or RTF resume and rebuild it with a cleaner template and better structure.",
  },
  {
    question: "Can I make a resume with photo?",
    answer:
      "Yes. You can select a photo resume layout, upload your profile photo, and preview the final resume before export.",
  },
  {
    question: "Can I download my resume as PDF?",
    answer:
      "Yes. The resume preview is print-ready, so you can print or save the resume as a PDF from your browser.",
  },
  {
    question: "Does this resume maker support AI writing help?",
    answer:
      "Yes. The builder includes AI writing support to improve summaries, bullet points, skills, and role-focused wording.",
  },
  {
    question: "Which resume format is best for freshers?",
    answer:
      "Freshers should use a clean one-page format with education, skills, projects, internships, certifications, and relevant achievements near the top.",
  },
  {
    question: "Should I add a photo to my resume?",
    answer:
      "Add a photo only when it is expected in your industry or region. For many ATS-focused job applications, a no-photo resume is simpler and safer.",
  },
  {
    question: "Can I edit the resume after generating it?",
    answer:
      "Yes. You can edit resume sections, template details, wording, skills, and layout before printing or saving.",
  },
  {
    question: "Can I check my resume ATS score after building it?",
    answer:
      "Yes. Use the AI Resume ATS Checker to scan your resume, find missing keywords, and improve it before applying.",
  },
  {
    question: "Is this resume builder good for job applications?",
    answer:
      "Yes. It is designed for job seekers who need a clean, readable, role-focused resume for applications, internships, placements, and career moves.",
  },
];

const useCases = [
  {
    title: "For Students",
    description: "Create internship, placement, project, and scholarship resumes with clean student-friendly sections.",
    icon: GraduationCap,
  },
  {
    title: "For Freshers",
    description: "Build a first-job resume with education, skills, certifications, internships, and projects.",
    icon: UserRoundCheck,
  },
  {
    title: "For Professionals",
    description: "Create a work-experience resume with measurable achievements, summary, skills, and role fit.",
    icon: BriefcaseBusiness,
  },
  {
    title: "For Photo Resumes",
    description: "Use photo resume layouts when your industry or application format expects a profile image.",
    icon: ImagePlus,
  },
  {
    title: "For PDF Export",
    description: "Preview, edit, print, and save a resume as PDF for job applications.",
    icon: Target,
  },
];

const resumeExamples = [
  {
    title: "Example Student Resume",
    focus: "Education, projects, skills, certifications, internships",
    points: [
      "Keep the resume concise and project-focused.",
      "Add tools, technologies, coursework, and measurable project outcomes.",
      "Use a clean format for campus placement and internship applications.",
    ],
  },
  {
    title: "Example Fresher Resume",
    focus: "Career objective, skills, projects, internship, achievements",
    points: [
      "Put strongest projects and role skills above generic details.",
      "Write bullets that show what you built, used, and improved.",
      "Use keywords from the target job role naturally.",
    ],
  },
  {
    title: "Example Professional Resume",
    focus: "Summary, experience, achievements, skills, certifications",
    points: [
      "Lead with a role-focused professional summary.",
      "Show measurable impact using numbers, scope, or outcomes.",
      "Keep formatting simple for ATS and recruiter scanning.",
    ],
  },
];

export default function ResumeBuilderStudioPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#softwareapplication`,
      name: "KASA Free Resume Builder",
      alternateName: ["Free Resume Builder Online", "Resume Maker Online Free", "ATS Resume Maker", "CV Maker Free"],
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Free online resume builder with ATS-friendly templates, student and fresher resume formats, AI writing help, live editing, photo resume templates, and print-ready PDF export.",
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
      name: "How to create a resume online for free",
      description: "Create a professional resume with a template, AI writing help, live editing, and PDF-ready export.",
      totalTime: "PT3M",
      step: [
        {
          "@type": "HowToStep",
          name: "Choose a resume template",
          text: "Select an ATS-friendly resume template or a photo resume layout.",
        },
        {
          "@type": "HowToStep",
          name: "Add or upload resume details",
          text: "Enter your profile details or upload an old resume to rebuild it.",
        },
        {
          "@type": "HowToStep",
          name: "Edit with AI help",
          text: "Improve summary, skills, projects, experience, and bullet points with AI writing suggestions.",
        },
        {
          "@type": "HowToStep",
          name: "Preview and export",
          text: "Review the live preview, make final edits, then print or save the resume as PDF.",
        },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f3f8ff] pt-[7.1rem] text-slate-950 dark:bg-surface-strong dark:text-white lg:pt-[7.6rem]">
      <JsonLd data={jsonLd} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_42%,#f9fbff_100%)] dark:bg-[linear-gradient(180deg,rgba(11,29,62,0.97),rgba(6,17,38,1))]" />
      <ResumeBuilderStudio />
      <ResumeBuilderStudioSeoContent />
      <ToolSeoSection
        eyebrow="Free Resume Builder FAQ"
        title="Free Resume Builder Online FAQ"
        description="Use this free resume builder online as a resume maker, ATS resume maker, CV maker, photo resume builder, and PDF resume maker for students, freshers, and professionals."
        keywords={[
          "free resume builder",
          "resume builder online",
          "resume maker online free",
          "AI resume builder",
          "ATS friendly resume",
          "fresher resume format",
          "student resume builder",
          "resume templates free",
          "CV maker online",
          "PDF resume download",
          "resume builder with photo",
          "ATS resume maker",
        ]}
        faqs={resumeBuilderFaqs}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/ai-resume-builder", label: "AI Resume Builder" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit" },
          { href: "/tools/study-timetable-generator", label: "Study Timetable Generator" },
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
        ]}
      />
    </main>
  );
}

function ResumeBuilderStudioSeoContent() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className={siteContainerClasses()}>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface/90 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
              How Free Resume Builder Online Works
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
              Create a professional resume with templates, AI help, and PDF export
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                KASA&apos;s Free Resume Builder Online helps students, freshers, and professionals create a clean resume without installing software or starting from a blank document. Choose a resume template, add your details, upload an old resume if you already have one, use AI writing help where needed, and preview the final resume before printing or saving it as PDF. The tool works as a free resume builder, resume maker online free, ATS resume maker, CV maker, photo resume builder, and resume PDF maker.
              </p>
              <p>
                A good resume builder should make the resume easier to read, not just prettier. Recruiters scan for the right sections, role keywords, skills, projects, experience, education, and achievements. ATS systems also prefer simple formatting, clear headings, readable text, and well-structured content. This builder keeps the layout professional while giving you room to edit every important part of the resume. You can create a simple no-photo ATS resume or choose a photo resume layout when that format is useful for your industry.
              </p>
              <p>
                Students can create resumes for internships, campus placement, scholarships, and first job applications. Freshers can highlight education, projects, internships, certifications, and technical skills. Professionals can write a stronger summary, organize experience, add measurable achievements, and keep the resume focused on the next role. If you want to improve the resume after building it, use the{" "}
                <Link href="/tools/resume-ats-checker" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Resume ATS Checker
                </Link>
                {" "}to find missing keywords, weak bullets, and rejection risks.
              </p>
              <p>
                For best results, keep the resume short, honest, and role-focused. Put the most relevant skills and achievements near the top, remove unrelated filler, and rewrite generic responsibilities into impact-based bullets. After you create a resume here, you can also try the{" "}
                <Link href="/tools/ai-resume-builder" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Resume Builder
                </Link>
                {" "}for AI-assisted role-specific rewriting or the{" "}
                <Link href="/tools/final-year-project-kit-generator" className="font-semibold text-primary hover:underline dark:text-emerald-200">
                  AI Final Year Project Kit
                </Link>
                {" "}to strengthen student project sections.
              </p>
            </div>
          </div>

          <aside className="rounded-[1.25rem] border border-blue-950/10 bg-white/80 p-5 shadow-xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] !text-white">
              <Lightbulb className="size-5 !text-white [stroke:white]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-slate-950 dark:text-white">
              Resume builder includes
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {["Free templates", "Live editing", "AI writing help", "Photo layouts", "PDF-ready export"].map((item) => (
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
            Resume maker for every application format
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
                Example Resume Formats
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                Resume examples you can build online
              </h2>
            </div>
            <Link href="/tools/resume-ats-checker" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline dark:text-emerald-200">
              Check resume after building
              <FileText className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {resumeExamples.map((example) => (
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
            { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker", icon: Search },
            { href: "/tools/ai-resume-builder", label: "AI Resume Builder", icon: Sparkles },
            { href: "/tools/final-year-project-kit-generator", label: "Final Year Project Kit", icon: ListChecks },
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
      </div>
    </section>
  );
}
