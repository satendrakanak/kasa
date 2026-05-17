import Image from "next/image";
import {
  BarChart3,
  BadgeCheck,
  BookOpenCheck,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
import { siteButtonClasses } from "@/components/site/site-button";
import { siteContainerClasses } from "@/components/site/site-container";
import { primaryKeywords } from "@/lib/site-content";

const heroHighlights = [
  ["250K+", "Learners managed"],
  ["18K+", "Courses delivered"],
  ["₹12Cr+", "Course sales tracked"],
  ["99.9%", "Workspace uptime"],
];

const heroFeatureCards = [
  {
    title: "Smart workspace",
    body: "Live classes, replays, student progress, and role access in one place.",
    icon: ShieldCheck,
  },
  {
    title: "Plan controls synced",
    body: "Courses, coupons, certificates and roles unlock by plan.",
    icon: BadgeCheck,
  },
  {
    title: "Sales engine ready",
    body: "Checkout, coupons, access and certificates connected.",
    icon: BookOpenCheck,
  },
];

type HomeHeroProps = {
  leadsEndpoint: string;
};

export function HomeHero({ leadsEndpoint }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#eef7ff] pb-14 pt-[9.5rem] text-slate-950 dark:bg-surface-strong sm:pt-[10.5rem] lg:pb-16 lg:pt-[11rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(43,168,255,0.24),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(34,181,115,0.08),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#eef7ff_48%,#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />

      <div
        className={siteContainerClasses({
          className:
            "relative grid min-h-[32rem] gap-10 text-center lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:text-left xl:min-h-[35rem]",
        })}
      >
        <div className="mx-auto max-w-3xl lg:mx-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm shadow-blue-950/5 dark:border-primary/25 dark:bg-primary/10">
            <Sparkles className="size-3.5" />
            LMS software for coaching institutes
          </div>

          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-normal text-slate-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.7rem] dark:text-white">
            Create your own{" "}
            <span className="bg-gradient-to-r from-sky-500 via-primary to-emerald-500 bg-clip-text text-transparent">
              online course platform
            </span>{" "}
            with KASA.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg dark:text-muted">
            Sell online courses, run live classes, manage students, collect
            payments, and issue certificates from one branded LMS platform.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <LeadCaptureModalTrigger
              endpoint={leadsEndpoint}
              source="home-hero-enquiry"
              leadType="enquiry"
              buttonLabel="Talk to sales"
              modalTitle="Tell us about your academy"
              modalEyebrow="Website enquiry"
              icon={<MessageCircle className="size-4" aria-hidden="true" />}
              buttonClassName={siteButtonClasses({
                size: "sm",
                className: "h-11 px-5",
              })}
            />
            <ProductTourTrigger
              label="View Product Tour"
              variant="outline"
              size="sm"
              className="h-11 px-5"
            />
          </div>

          <div className="mx-auto mt-7 grid max-w-2xl grid-cols-2 overflow-hidden rounded-[1.1rem] border border-blue-950/10 bg-white/88 text-left shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04] sm:grid-cols-4 lg:mx-0">
            {heroHighlights.map(([value, label], index) => (
              <div
                key={value}
                className="animate-[stat-glow_4.5s_ease-in-out_infinite] border-b border-r border-blue-950/10 px-4 py-3 last:border-r-0 odd:sm:border-b-0 even:sm:border-b-0 dark:border-white/10"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <AnimatedCounter
                  value={value}
                  duration={1250 + index * 130}
                  className="stat-gradient-text block font-heading text-xl font-semibold animate-[gradient-shift_4s_ease-in-out_infinite]"
                />
                <div className="mt-1 text-xs font-medium text-slate-600 dark:text-muted">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
            {primaryKeywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-blue-950/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/6 dark:text-white/70"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[38rem] lg:min-h-[34rem] lg:max-w-none">
          <div className="relative mx-auto h-[24rem] w-full max-w-[34rem] overflow-hidden rounded-[2rem] rounded-br-[3.5rem] border border-white bg-white/88 shadow-2xl shadow-blue-950/14 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/25 sm:h-[28rem] lg:absolute lg:right-0 lg:top-1/2 lg:h-[31rem] lg:w-[86%] lg:max-w-none lg:-translate-y-1/2 lg:rounded-br-[4.25rem]">
            <Image
              src="/cwk-banner-01.webp"
              alt="Learner using KASA academy platform"
              fill
              priority
              sizes="(min-width: 1024px) 46rem, 90vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="absolute left-0 top-[44%] hidden w-[15.5rem] -translate-y-1/2 animate-[float-x_8s_ease-in-out_infinite] rounded-[1.1rem] border border-blue-950/10 bg-white/92 p-3 shadow-2xl shadow-blue-950/12 dark:border-white/10 dark:bg-surface/92 dark:shadow-black/30 sm:w-[16.5rem] lg:block">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-semibold text-primary">
                Smart workspace
              </span>
              <ShieldCheck className="size-4 text-primary" />
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                ["Live", "classes and replays"],
                ["Auto", "student progress tracking"],
                ["Role", "admin, faculty and learner access"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-lg bg-blue-50 text-primary dark:bg-primary/12">
                    <UsersRound className="size-3.5" />
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-muted">
                    <strong className="text-slate-950 dark:text-white">{value}</strong>{" "}
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-[10%] right-[3%] hidden w-[15.5rem] animate-[float-x-reverse_9s_ease-in-out_infinite] rounded-[1.1rem] border border-blue-950/10 bg-white/92 p-3 shadow-2xl shadow-blue-950/12 dark:border-white/10 dark:bg-surface/92 dark:shadow-black/30 sm:w-[16.5rem] lg:block">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-primary/12 dark:text-primary">
                <BookOpenCheck className="size-4" />
              </span>
              <div>
                <div className="text-xs font-semibold text-slate-950 dark:text-white">
                  Sales engine ready
                </div>
                <div className="mt-1 text-xs text-slate-600 dark:text-muted">
                  Checkout, coupons, access and certificates connected.
                </div>
              </div>
              <BarChart3 className="ml-auto size-4 text-primary" />
            </div>
          </div>

          <div className="absolute right-[1%] top-[13%] hidden w-[14rem] animate-[float-x_10s_ease-in-out_infinite] rounded-[1.1rem] border border-blue-950/10 bg-white/92 p-3 shadow-2xl shadow-blue-950/12 dark:border-white/10 dark:bg-surface/92 dark:shadow-black/30 sm:w-[15rem] lg:block">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-50 text-primary dark:bg-primary/12">
                <BadgeCheck className="size-4" />
              </span>
              <div>
                <div className="text-xs font-semibold text-slate-950 dark:text-white">
                  Plan controls synced
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-600 dark:text-muted">
                  Courses, coupons, certificates and roles unlock by plan.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-left sm:grid-cols-3 lg:hidden">
            {heroFeatureCards.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="rounded-[1.1rem] border border-blue-950/10 bg-white/88 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
                  {title}
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-600 dark:text-muted">
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
