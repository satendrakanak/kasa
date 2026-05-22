import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Award, FileText } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { CertificateGenerator } from "@/components/tools/certificate-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Certificate Generator - Free Printable Course Completion Certificate",
  description:
    "Create free printable premium certificates for course completion, participation, achievement, workshops, and training programs with logo upload, color picker, templates, student name, certificate ID, date, grade, and signature.",
  keywords: [
    "certificate generator",
    "course completion certificate generator",
    "free certificate generator",
    "printable certificate maker",
    "student certificate generator",
    "training certificate generator",
    "participation certificate generator",
    "achievement certificate maker",
    "certificate with logo",
    "custom certificate maker",
  ],
  alternates: { canonical: "/tools/certificate-generator" },
  openGraph: {
    title: "Certificate Generator - Free Academy Tool",
    description: "Generate printable course completion, participation, achievement, workshop, and training certificates.",
    url: "/tools/certificate-generator",
  },
};

export default function CertificateGeneratorPage() {
  const heroKeywords = [
    "certificate generator",
    "course completion certificate",
    "printable certificate maker",
    "student certificate",
    "training certificate",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Certificate Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free certificate generator for academies, teachers, trainers, and coaching institutes to create printable course completion and participation certificates.",
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
                <Award className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Certificate Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Certificate Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create printable premium course completion, participation, achievement, workshop, and training certificates with logo upload, brand color, background design, student name, course, issue date, grade, certificate ID, and signature.
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

      <ToolSeoSection
        eyebrow="Certificate generator FAQ"
        title="Create printable certificates online"
        description="Use this free certificate generator to create premium course completion certificates, participation certificates, achievement certificates, workshop certificates, training certificates, and printable student certificates with logo, colors, backgrounds, and certificate IDs."
        keywords={[
          "certificate generator",
          "course completion certificate generator",
          "free certificate generator",
          "printable certificate maker",
          "student certificate generator",
          "training certificate generator",
          "certificate with logo",
          "custom certificate maker",
        ]}
        faqs={[
          {
            question: "How do I create a course completion certificate?",
            answer:
              "Add academy name, logo, brand color, student name, course name, certificate type, issue date, certificate ID, grade or duration, and signatory name. The certificate preview updates instantly.",
          },
          {
            question: "Can I print only the certificate?",
            answer:
              "Yes. The print button opens a certificate-only print view designed for landscape output.",
          },
          {
            question: "What should a certificate include?",
            answer:
              "A certificate should include issuing academy, recipient name, course or achievement, issue date, certificate ID, signatory, and optional verification note.",
          },
        ]}
        relatedTools={[
          { href: "/tools/admission-form-generator", label: "Admission Form Generator" },
          { href: "/tools/fee-receipt-generator", label: "Fee Receipt Generator" },
          { href: "/tools/report-card-generator", label: "AI Report Card Generator" },
        ]}
      />
    </div>
  );
}
