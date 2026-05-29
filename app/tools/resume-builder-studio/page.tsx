import type { Metadata } from "next";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";
import { ResumeBuilderStudio } from "@/components/tools/resume-builder-studio";

export const metadata: Metadata = {
  title: "Free Resume Builder Online - AI Resume Maker with ATS Templates",
  description:
    "Create a professional resume for free with KASA's online AI resume builder. Choose ATS-friendly templates, upload an old resume, edit live, add photo, and print or save as PDF.",
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

export default function ResumeBuilderStudioPage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KASA Free Resume Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://getkasa.in/tools/resume-builder-studio",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Free online AI resume builder with ATS-friendly templates, student and fresher resume formats, live editing, photo resume templates, and print-ready export.",
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f3f8ff] pt-[7.1rem] text-slate-950 dark:bg-surface-strong dark:text-white lg:pt-[7.6rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_42%,#f9fbff_100%)] dark:bg-[linear-gradient(180deg,rgba(11,29,62,0.97),rgba(6,17,38,1))]" />
      <ResumeBuilderStudio />
      <ToolSeoSection
        eyebrow="Free Resume Builder FAQ"
        title="Online resume maker for students, freshers, and job seekers"
        description="Use this free resume builder to create a clean resume online without signup. It supports ATS-friendly resume templates, photo resume layouts, AI writing suggestions, old resume upload, live editing, and print-ready PDF export."
        keywords={[
          "free resume builder",
          "resume maker online free",
          "AI resume builder",
          "ATS friendly resume",
          "fresher resume format",
          "student resume builder",
          "resume templates free",
          "CV maker online",
          "PDF resume download",
        ]}
        faqs={[
          {
            question: "Is this resume builder free to use?",
            answer:
              "Yes. You can choose a template, write or upload resume details, edit the resume, and prepare it for print or PDF without a signup wall or hidden payment screen.",
          },
          {
            question: "Can students and freshers use this resume maker?",
            answer:
              "Yes. The builder includes simple resume formats for students, freshers, internships, campus placement, and early-career job applications.",
          },
          {
            question: "Does it create ATS-friendly resumes?",
            answer:
              "Yes. Templates use clean sections, readable headings, role-focused skills, and simple formatting so the resume remains easy for recruiters and ATS systems to parse.",
          },
          {
            question: "Can I upload my old resume and improve it?",
            answer:
              "Yes. You can upload an existing PDF, DOC, DOCX, TXT, or RTF resume and use the editor to rebuild it with a better template and stronger wording.",
          },
          {
            question: "Can I make a resume with photo?",
            answer:
              "Yes. Select a photo resume template, upload your profile photo, and the live preview will show how it looks before export.",
          },
        ]}
        relatedTools={[
          { href: "/tools/resume-ats-checker", label: "AI Resume ATS Checker" },
          { href: "/tools/ai-resume-builder", label: "AI Resume Builder" },
          { href: "/tools/final-year-project-kit-generator", label: "AI Final Year Project Kit" },
        ]}
      />
    </main>
  );
}
