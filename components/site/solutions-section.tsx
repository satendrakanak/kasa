import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Rocket,
  Sparkles,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { solutionPages } from "@/lib/site-content";

type SolutionMeta = {
  icon: LucideIcon;
  accent: string;
  promise: string;
};

const solutionMeta: Record<string, SolutionMeta> = {
  "coaching-institutes": {
    icon: Building2,
    accent: "from-blue-500/16 via-white to-sky-400/12 dark:from-blue-400/12 dark:via-white/[0.03] dark:to-sky-400/10",
    promise: "Batch operations, fees, tests, replays, and student management under one branded institute workspace.",
  },
  "online-academies": {
    icon: BookOpenCheck,
    accent: "from-emerald-500/16 via-white to-blue-400/12 dark:from-emerald-400/12 dark:via-white/[0.03] dark:to-blue-400/10",
    promise: "Course website, checkout, learner dashboard, progress, certificates, and launch funnels that feel like one academy.",
  },
  "trainers-creators": {
    icon: Sparkles,
    accent: "from-violet-500/14 via-white to-sky-400/12 dark:from-violet-400/12 dark:via-white/[0.03] dark:to-sky-400/10",
    promise: "Own your brand, sell your programs, and grow without sending learners to marketplace-style platforms.",
  },
  "edtech-startups": {
    icon: Rocket,
    accent: "from-cyan-500/16 via-white to-emerald-400/12 dark:from-cyan-400/12 dark:via-white/[0.03] dark:to-emerald-400/10",
    promise: "A ready LMS foundation for teams that need to launch fast and still keep room for serious scale.",
  },
  "skill-development-centres": {
    icon: Target,
    accent: "from-amber-400/16 via-white to-emerald-400/12 dark:from-amber-300/12 dark:via-white/[0.03] dark:to-emerald-400/10",
    promise: "Structured programs, assessments, trainer workflows, outcome tracking, and certificates for skill-based learning.",
  },
};

const outcomes = [
  {
    label: "Own domain and academy brand",
    href: "/features/academy-website-builder",
  },
  {
    label: "Recorded, live, and hybrid programs",
    href: "/features/live-class-management",
  },
  {
    label: "Payments, coupons, invoices, and access",
    href: "/features/payments-coupons-orders",
  },
  {
    label: "Learner, faculty, and admin dashboards",
    href: "/features/student-faculty-management",
  },
  {
    label: "Exams, assignments, progress, and certificates",
    href: "/features/exams-assignments-certificates",
  },
  {
    label: "Leads, demo requests, CRM, and reports",
    href: "/features/education-crm-leads",
  },
];

export function SolutionsSection() {
  const featured = solutionPages[0];
  const FeaturedIcon = solutionMeta[featured.slug]?.icon ?? GraduationCap;

  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(43,168,255,0.1),transparent)] dark:bg-[linear-gradient(180deg,rgba(88,201,138,0.08),transparent)]" />
      <div className={siteContainerClasses({ className: "relative z-10" })}>
        <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-primary/18">
              <UsersRound className="size-4" aria-hidden="true" />
              Solutions
            </span>
            <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
              Built for every serious{" "}
              <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
                education business
              </span>{" "}
              that wants its own LMS.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              KASA adapts to the way different teams sell, teach, and manage
              learning: coaching institutes, digital academies, trainers, EdTech
              startups, and skill centres can all run on the same connected core.
            </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.slice(0, 4).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 rounded-2xl border border-blue-950/10 bg-white/82 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
              >
                <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                <ArrowRight className="size-4 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <Link
            href={`/solutions/${featured.slug}`}
            className="group relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#eaf5ff_54%,#effbf5)] p-6 shadow-2xl shadow-blue-950/10 transition hover:-translate-y-1 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(255,255,255,0.04)_52%,rgba(88,201,138,0.1))] lg:col-span-5"
          >
            <div className="absolute -right-24 -top-24 size-64 rounded-full bg-sky-300/18 blur-3xl" />
            <div className="absolute -bottom-28 left-8 size-72 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative flex min-h-[30rem] flex-col justify-between">
              <div>
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-primary shadow-xl dark:bg-white/10 dark:text-emerald-200">
                  <FeaturedIcon className="size-7" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-emerald-200">
                  Featured solution
                </p>
                <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">
                  Coaching institutes can launch a complete branded academy.
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Sell recorded courses, run live batches, manage faculty,
                  collect fees, publish exams, issue certificates, and track
                  growth without stitching together five different tools.
                </p>
              </div>

              <div className="mt-8 grid gap-3">
                {featured.heroPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center justify-between rounded-2xl border border-blue-950/10 bg-white/74 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-white"
                  >
                    {point}
                    <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
                  </div>
                ))}
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                  Explore institute solution
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid gap-5 md:grid-cols-2 lg:col-span-7">
            {solutionPages.slice(1).map((page) => {
              const meta = solutionMeta[page.slug];
              const Icon = meta?.icon ?? GraduationCap;

              return (
                <Link
                  key={page.slug}
                  href={`/solutions/${page.slug}`}
                  className={`group rounded-[2rem] border border-blue-950/10 bg-gradient-to-br ${meta?.accent} p-5 shadow-xl shadow-blue-950/7 transition hover:-translate-y-1 hover:border-primary/45 dark:border-white/10`}
                >
                  <div className="flex items-start gap-4 md:justify-between">
                    <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm dark:bg-white/10 dark:text-emerald-200">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-primary/15 bg-white/78 px-3 py-1.5 text-xs font-semibold text-primary dark:border-white/10 dark:bg-white/8 dark:text-emerald-200">
                      {page.heroPoints[0]}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                    {page.eyebrow}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                    {page.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {meta?.promise ?? page.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {page.heroPoints.slice(0, 3).map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-blue-950/10 bg-white/72 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-200"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                    View solution
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border border-blue-950/10 bg-white/82 p-5 shadow-xl shadow-blue-950/6 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="grid gap-4 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            <div>
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-white/10 dark:text-emerald-200">
                <Layers3 className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                One LMS core. Multiple business models.
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Start with a single course line, add batches, attach faculty,
                collect payments, run assessments, and grow into a complete
                academy operation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {outcomes.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-blue-950/10 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:text-primary dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
