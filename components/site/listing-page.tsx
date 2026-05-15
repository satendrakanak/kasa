import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionShell } from "@/components/site/section-shell";
import type { PageSummary } from "@/lib/site-content";

type ListingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  pages: Array<PageSummary & { href: string }>;
};

export function ListingPage({ eyebrow, title, description, pages }: ListingPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        points={["SEO topic cluster", "Buyer intent pages", "Internal linking"]}
      />

      <SectionShell
        eyebrow="Browse pages"
        title="Choose the page that matches your current question."
        description="Every page is written around one search intent and links into the wider KASA academy platform story."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-[1.5rem] border border-border bg-surface/75 p-5 transition hover:-translate-y-1 hover:border-primary"
            >
              <BookOpenCheck className="size-7 text-primary" aria-hidden="true" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {page.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-xl font-semibold leading-tight text-white">
                {page.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{page.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Open page
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="bg-surface-strong px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            KASA website structure
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-white">
            Built for long-term SEO, not a single-page brochure.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Feature pages target product capability searches.",
              "Solution pages target institute and team use cases.",
              "Guides and comparisons answer research-stage buyers.",
            ].map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl bg-slate-950/25 p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-white/78">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
