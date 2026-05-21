import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, GraduationCap } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { CgpaPercentageConverter } from "@/components/tools/cgpa-percentage-converter";
import { ToolBreadcrumb, ToolHeroFeatureCard, ToolHeroKeywords } from "@/components/tools/tool-hero-extras";
import { ToolSeoSection } from "@/components/tools/tool-seo-section";

export const metadata: Metadata = {
  title: "CGPA to Percentage Converter - Percentage to CGPA Calculator",
  description:
    "Free CGPA to percentage converter and percentage to CGPA calculator with common 10-point, 4-point, and university conversion formulas.",
  keywords: [
    "CGPA to percentage converter",
    "percentage to CGPA calculator",
    "CGPA calculator",
    "CGPA into percentage",
    "10 point CGPA to percentage",
    "4 point GPA to percentage",
  ],
  alternates: { canonical: "/tools/cgpa-percentage-converter" },
  openGraph: {
    title: "CGPA to Percentage Converter - Free Student Tool",
    description: "Convert CGPA to percentage and percentage to CGPA using common formulas.",
    url: "/tools/cgpa-percentage-converter",
  },
};

export default function CgpaPercentageConverterPage() {
  const heroKeywords = ["CGPA to percentage converter", "percentage to CGPA", "10 point CGPA formula", "4 point GPA converter"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CGPA to Percentage Converter",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free CGPA to percentage converter and percentage to CGPA calculator.",
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
                <GraduationCap className="size-3.5" aria-hidden="true" />
                CGPA converter
              </div>
              <ToolBreadcrumb current="CGPA to Percentage Converter" />
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
                CGPA to Percentage Converter
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
                Convert CGPA to percentage or percentage to CGPA using common 10-point, 4-point, and university-style formulas.
              </p>
              <ToolHeroKeywords keywords={heroKeywords} />
            </div>
            <ToolHeroFeatureCard
              icon={ArrowLeftRight}
              title="Built for quick conversion"
              description="Choose the formula your board or university follows."
              points={[
                "Convert CGPA to percentage instantly.",
                "Convert percentage back to CGPA or GPA.",
                "Compare common formulas used by students.",
              ]}
            />
          </div>
        </div>
      </section>
      <CgpaPercentageConverter />
      <ToolSeoSection
        eyebrow="CGPA conversion FAQ"
        title="CGPA to percentage and percentage to CGPA calculator"
        description="Use this CGPA converter to calculate CGPA into percentage, percentage into CGPA, 10-point CGPA conversion, and 4-point GPA conversion."
        keywords={["CGPA to percentage converter", "percentage to CGPA calculator", "CGPA into percentage", "10 point CGPA to percentage"]}
        faqs={[
          { question: "How do I convert CGPA to percentage?", answer: "A common CBSE-style formula is CGPA multiplied by 9.5. Some universities use CGPA multiplied by 10 or other formulas." },
          { question: "How do I convert percentage to CGPA?", answer: "Use the reverse of the selected formula. For example, with the 9.5 formula, divide percentage by 9.5." },
          { question: "Which CGPA conversion formula should I use?", answer: "Use the formula officially provided by your board, college, or university. This tool includes common formulas for quick planning." },
        ]}
        relatedTools={[
          { href: "/tools/gpa-calculator", label: "GPA Calculator" },
          { href: "/tools/marks-percentage-calculator", label: "Marks Percentage Calculator" },
          { href: "/tools/grade-calculator", label: "Grade Calculator" },
        ]}
      />
    </div>
  );
}
