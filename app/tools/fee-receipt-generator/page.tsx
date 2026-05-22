import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ReceiptText, IndianRupee } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { FeeReceiptGenerator } from "@/components/tools/fee-receipt-generator";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "Fee Receipt Generator - Free Printable Coaching Fee Receipt",
  description:
    "Create a free printable fee receipt for coaching institutes, tuition centres, schools, and academies with multi-currency support, student details, payment mode, due balance, and download options.",
  keywords: [
    "fee receipt generator",
    "coaching fee receipt generator",
    "tuition fee receipt generator",
    "school fee receipt generator",
    "academy fee receipt",
    "printable fee receipt",
    "student fee receipt format",
    "fee payment receipt",
    "multi currency fee receipt",
  ],
  alternates: { canonical: "/tools/fee-receipt-generator" },
  openGraph: {
    title: "Fee Receipt Generator - Free Academy Tool",
    description: "Generate printable student fee receipts with payment details, balance due, copy, print, and download options.",
    url: "/tools/fee-receipt-generator",
  },
};

export default function FeeReceiptGeneratorPage() {
  const heroKeywords = [
    "fee receipt generator",
    "coaching fee receipt",
    "tuition fee receipt",
    "printable receipt",
    "student payment receipt",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fee Receipt Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free fee receipt generator for academies and coaching institutes to create printable student payment receipts.",
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
                <ReceiptText className="size-3.5" aria-hidden="true" />
                Academy owner tool
              </div>
              <ToolBreadcrumb current="Fee Receipt Generator" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                Fee Receipt Generator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Create a professional coaching fee receipt with student details, currency, fee amount, discount, previous due, paid amount, payment mode, balance, print, copy, and download options.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>

            <ToolHeroFeatureCard
              icon={IndianRupee}
              title="Issue clean student receipts"
              description="Generate a printable fee receipt that parents and students can understand immediately in the currency your academy uses."
              points={[
                "Add student, course, receipt number, fee type, currency, and payment mode.",
                "Calculate payable amount, paid amount, balance due, and payment status.",
                "Print only the receipt or download it as a clean HTML receipt.",
              ]}
            />
          </div>
        </div>
      </section>

      <FeeReceiptGenerator />

      <ToolSeoSection
        eyebrow="Fee receipt FAQ"
        title="Create printable fee receipts for coaching institutes"
        description="Use this free fee receipt generator to create multi-currency student payment receipts for tuition centres, coaching institutes, online academies, course batches, admission fees, monthly fees, installments, and due balances."
        keywords={[
          "fee receipt generator",
          "coaching fee receipt generator",
          "tuition fee receipt generator",
          "printable fee receipt",
          "student fee receipt format",
          "fee payment receipt",
          "multi currency fee receipt",
        ]}
        faqs={[
          {
            question: "How do I create a fee receipt online?",
            answer:
              "Add academy name, student name, receipt number, course, fee type, currency, fee amount, discount, due amount, paid amount, and payment mode. The receipt is calculated instantly.",
          },
          {
            question: "Can I print only the receipt?",
            answer:
              "Yes. The print button opens a receipt-only print view, so it does not print the full webpage.",
          },
          {
            question: "What should a student fee receipt include?",
            answer:
              "A good fee receipt includes receipt number, date, student name, course or batch, fee type, total payable, paid amount, balance due, payment mode, and authorised signature space.",
          },
        ]}
        relatedTools={[
          { href: "/tools/profit-calculator", label: "Academy Profit Calculator" },
          { href: "/tools/course-pricing-calculator", label: "Course Pricing Calculator" },
          { href: "/tools/report-card-generator", label: "AI Report Card Generator" },
        ]}
      />
    </div>
  );
}
