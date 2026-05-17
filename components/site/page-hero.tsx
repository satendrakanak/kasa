import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers3,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { CtaLink } from "@/components/site/cta-link";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  primaryLabel?: string;
  variant?: "feature" | "solution" | "resource" | "compare";
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
};

export function PageHero({
  eyebrow,
  title,
  description,
  points,
  primaryLabel = "View Product Tour",
  variant = "feature",
  breadcrumbs,
}: PageHeroProps) {
  const Icon =
    variant === "solution"
      ? UsersRound
      : variant === "resource"
        ? GraduationCap
        : variant === "compare"
          ? BarChart3
          : Layers3;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_48%,#ffffff_100%)] px-4 pb-16 pt-32 text-foreground sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 dark:bg-[linear-gradient(180deg,#061126_0%,#0b1833_52%,#071126_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(43,168,255,0.18),transparent_30rem),radial-gradient(circle_at_86%_14%,rgba(34,181,115,0.14),transparent_32rem)] dark:bg-[radial-gradient(circle_at_14%_18%,rgba(69,145,255,0.16),transparent_30rem),radial-gradient(circle_at_86%_14%,rgba(88,201,138,0.12),transparent_32rem)]" />
      <div className="relative mx-auto grid w-full max-w-[108rem] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300"
            >
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="rounded-full border border-blue-950/10 bg-white/70 px-3 py-1.5 text-slate-600 shadow-sm shadow-blue-950/5 transition hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-primary dark:border-emerald-200/20 dark:bg-white/[0.06] dark:text-emerald-200">
                        {item.label}
                      </span>
                    )}
                    {!isLast ? (
                      <ChevronRight className="size-4 text-primary/55" aria-hidden="true" />
                    ) : null}
                  </span>
                );
              })}
            </nav>
          ) : null}
          <div className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-primary/18">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-5xl font-heading text-4xl font-semibold leading-[1.08] tracking-normal text-slate-950 sm:text-6xl dark:text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ProductTourTrigger
              label={primaryLabel}
              variant="solid"
              size="md"
              className="w-full justify-center sm:w-auto"
            />
            <CtaLink href="/features" variant="outline" className="w-full sm:w-auto">
              Explore Features
            </CtaLink>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white/90 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute -bottom-20 left-8 size-52 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="relative rounded-[1.4rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#f4fbf7)] p-5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(88,201,138,0.09))]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                  KASA outcomes
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                  What this page helps you solve
                </h2>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--button-solid)] !text-white shadow-lg shadow-blue-950/12 sm:size-13">
                <Icon className="size-6" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-blue-950/10 bg-white/76 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ["Own", "brand"],
                ["Fast", "launch"],
                ["One", "system"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-blue-950/10 bg-white/72 p-3 text-center dark:border-white/10 dark:bg-white/8"
                >
                  <div className="stat-gradient-text font-heading text-xl font-semibold">
                    {value}
                  </div>
                  <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
