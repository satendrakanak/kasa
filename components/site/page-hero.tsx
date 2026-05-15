import { CheckCircle2, Sparkles } from "lucide-react";
import { CtaLink } from "@/components/site/cta-link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  primaryHref?: string;
  primaryLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  points,
  primaryHref = "/#pricing",
  primaryLabel = "View Pricing",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-strong px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(88,201,138,0.18),transparent_24rem),linear-gradient(180deg,rgba(13,25,50,0.92),rgba(6,17,38,1))]" />
      <div className="absolute left-[8%] top-24 hidden h-36 w-36 rounded-full bg-primary/10 blur-3xl sm:block" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={primaryHref}>{primaryLabel}</CtaLink>
            <CtaLink href="/landing" variant="ghost">
              Open Landing Page
            </CtaLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="rounded-[1.4rem] border border-white/8 bg-slate-950/30 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/48">
              KASA outcomes
            </p>
            <div className="mt-5 space-y-4">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-white/82">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
