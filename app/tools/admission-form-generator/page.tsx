import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, UserPlus } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { AdmissionFormGenerator } from "@/components/tools/admission-form-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Admission Form Generator - Free Printable Student Admission Form",
  description:
    "Create a free printable student admission form for coaching institutes, tuition centres, schools, online academies, and training centres with custom fields, document checklist, fees, and download options.",
  keywords: [
    "admission form generator",
    "student admission form generator",
    "coaching admission form",
    "tuition admission form",
    "school admission form format",
    "academy admission form",
    "printable admission form",
    "student registration form generator",
  ],
  alternates: { canonical: "/tools/admission-form-generator" },
  openGraph: {
    title: "Admission Form Generator - Free Academy Tool",
    description: "Generate printable student admission forms with course, batch, fees, fields, documents, print, and download options.",
    url: "/tools/admission-form-generator",
  },
};

export default function AdmissionFormGeneratorPage() {
  const heroKeywords = [
    "admission form generator",
    "student admission form",
    "coaching admission form",
    "printable admission form",
    "registration form generator",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Admission Form Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free admission form generator for academies, coaching institutes, schools, and training centres to create printable student registration forms.",
  };

  return (
    <div className="relative overflow-hidden bg-[#eef7ff] text-slate-950 dark:bg-surface-strong dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                <UserPlus className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Admission Form Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Admission Form Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a professional student admission form with academy details, student information, course, batch, fees, custom fields, document checklist, print, copy, and download options.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={FileText}
              title="Make admission records cleaner"
              description="Build a printable admission form that works for local coaching, online academies, schools, and training centres."
              points={[
                "Choose course, batch type, enquiry source, fee amount, and currency.",
                "Select extra fields such as address, school, DOB, and emergency contact.",
                "Print only the admission form or download it as clean HTML.",
              ]}
            />
          </div>
        </div>
      </section>

      <AdmissionFormGenerator />

      <ToolSeoSection
        eyebrow="Admission form FAQ"
        title="Create printable student admission forms online"
        description="Use this free admission form generator to create student registration forms for coaching institutes, tuition centres, schools, online academies, course batches, training centres, and education programs."
        keywords={[
          "admission form generator",
          "student admission form generator",
          "coaching admission form",
          "tuition admission form",
          "school admission form format",
          "student registration form generator",
        ]}
        faqs={[
          {
            question: "How do I create a student admission form online?",
            answer:
              "Add academy name, student details, parent contact, course, batch type, fees, required fields, and document checklist. The printable admission form updates instantly.",
          },
          {
            question: "What should an admission form include?",
            answer:
              "A useful admission form includes student name, parent or guardian details, contact information, course, batch, fee details, address, emergency contact, and required document checklist.",
          },
          {
            question: "Can I print only the admission form?",
            answer:
              "Yes. The print button opens a form-only print view, so it does not print the full webpage.",
          },
        ]}
        relatedTools={[
          { href: "/tools/fee-receipt-generator", label: "Fee Receipt Generator" },
          { href: "/tools/profit-calculator", label: "Academy Profit Calculator" },
          { href: "/tools/course-pricing-calculator", label: "Course Pricing Calculator" },
        ]}
      />
    </div>
  );
}
