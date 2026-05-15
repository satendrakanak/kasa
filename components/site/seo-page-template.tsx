import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionShell } from "@/components/site/section-shell";
import { allSeoPages, type PageSummary } from "@/lib/site-content";

type SeoPageTemplateProps = {
  page: PageSummary;
};

export function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  const relatedPages = allSeoPages
    .filter((item) => item.slug !== page.slug)
    .filter((item) =>
      item.keywords.some((keyword) => page.keywords.includes(keyword)) ||
      item.group === "Features",
    )
    .slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        points={page.heroPoints}
      />

      <SectionShell
        eyebrow="Why it matters"
        title="Built around real academy operations, not just a brochure page."
        description="Every KASA SEO page connects product value with a specific buyer intent, so visitors can understand the exact workflow they searched for."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {page.outcomes.map((outcome) => (
            <article
              key={outcome}
              className="rounded-[1.5rem] border border-border bg-surface/80 p-5"
            >
              <CheckCircle2 className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-4 text-sm leading-7 text-white/78">{outcome}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <section className="bg-surface-strong px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Layers3 className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-semibold leading-tight text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
              <ul className="mt-6 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-white/82">
                    <span className="size-2 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <SectionShell
        eyebrow="Explore next"
        title="Related KASA pages for the same buying journey."
        description="Internal links help users and search engines move through the complete KASA topic cluster."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[1.5rem] border border-border bg-surface/75 p-5 transition hover:-translate-y-1 hover:border-primary"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {item.group}
              </p>
              <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read page
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
