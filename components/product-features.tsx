import Image from "next/image";
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  FileBadge,
  Globe2,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import { productFeatures } from "@/lib/landing";

const featureIcons = [
  Globe2,
  BookOpenCheck,
  CalendarDays,
  FileBadge,
  CreditCard,
  UsersRound,
];

const featureAccents = [
  "from-emerald-300/18 to-cyan-300/8 text-emerald-200",
  "from-sky-300/18 to-blue-300/8 text-sky-200",
  "from-violet-300/18 to-fuchsia-300/8 text-violet-200",
  "from-amber-300/20 to-orange-300/8 text-amber-200",
  "from-rose-300/18 to-pink-300/8 text-rose-200",
  "from-cyan-300/18 to-emerald-300/8 text-cyan-200",
];

const workflowItems = [
  "Course website",
  "Learner access",
  "Live classes",
  "Payments",
  "Certificates",
  "CRM",
];

export default function ProductFeaturesSection() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden bg-background px-4 py-18 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="absolute left-1/2 top-20 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="absolute right-[8%] top-[22%] hidden h-80 w-80 rounded-full bg-blue-500/10 blur-3xl lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.82))]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Product features
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.16] tracking-normal text-white sm:text-5xl sm:leading-tight">
            Everything your academy needs in one branded LMS.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            KASA connects website, course delivery, live classes, tests,
            payments, certificates, CRM, and learner dashboards so your team
            does not depend on scattered tools.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5 lg:p-6">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[1.7rem] border border-white/12 bg-slate-950 sm:min-h-[38rem] lg:min-h-[42rem]">
              <Image
                src="/cwk-banner-01-900.webp"
                alt="KASA online academy dashboard preview"
                width={1400}
                height={1000}
                quality={72}
                sizes="(min-width: 1024px) 42rem, 92vw"
                className="absolute bottom-0 left-1/2 h-[102%] w-auto max-w-none -translate-x-1/2 object-contain opacity-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.24),rgba(2,6,23,0.02)_45%,rgba(2,6,23,0.34)),linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.72)),radial-gradient(circle_at_30%_20%,rgba(88,201,138,0.2),transparent_19rem)]" />

              <div className="absolute bottom-24 left-4 right-4 rounded-[1.6rem] border border-primary/22 bg-slate-950/86 p-5 shadow-2xl shadow-black/35 backdrop-blur-xl sm:bottom-28 sm:left-6 sm:right-auto sm:w-[25rem] sm:p-6 lg:w-[27rem]">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  <LayoutDashboard className="size-3.5" />
                  Academy command
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  Launch, teach, collect fees, and track learners.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  A ready workflow for serious coaching institutes, online
                  academies, and training teams.
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:bottom-7 sm:left-7 sm:right-7 sm:grid-cols-3">
                {workflowItems.slice(0, 3).map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/16 bg-slate-950/82 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {productFeatures.slice(0, 4).map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <article
                  key={feature.title}
                  className={[
                    "group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(145deg,var(--tw-gradient-stops))] p-5 shadow-xl shadow-black/15 transition duration-500 hover:-translate-y-1 hover:border-primary/50 sm:p-6",
                    featureAccents[index],
                  ].join(" ")}
                >
                  <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-white/10 blur-2xl transition duration-500 group-hover:bg-primary/18" />
                  <div className="relative grid size-12 place-items-center rounded-2xl border border-white/12 bg-slate-950/55 text-current shadow-lg shadow-black/15">
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-current">
                    {feature.keyword}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-white">
                    {feature.screenTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {feature.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {feature.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold text-white/75"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productFeatures.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <article
                key={feature.short}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-sm shadow-black/10 transition duration-500 hover:-translate-y-1 hover:border-primary/45 hover:bg-white/[0.07] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "grid size-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br",
                      featureAccents[index],
                    ].join(" ")}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold leading-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/64">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 rounded-[2rem] border border-primary/20 bg-primary/8 p-4 text-sm text-white/72 shadow-2xl shadow-primary/5 sm:grid-cols-3 sm:p-5">
          {["Own domain", "Zero marketplace commission", "Setup support"].map(
            (item) => (
              <div key={item} className="flex items-center gap-3">
                <BadgeCheck className="size-5 shrink-0 text-primary" />
                <span className="font-semibold text-white">{item}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
