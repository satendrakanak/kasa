import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedTool = {
  href: string;
  label: string;
};

export function ToolSeoSection({
  eyebrow,
  title,
  description,
  keywords,
  faqs,
  relatedTools,
}: {
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  faqs: FaqItem[];
  relatedTools: RelatedTool[];
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="relative pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className={siteContainerClasses()}>
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-blue-950/10 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Related tools
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:border-primary/35 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-emerald-200"
                    >
                      <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
