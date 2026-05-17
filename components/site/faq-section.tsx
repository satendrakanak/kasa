import {
  BadgeCheck,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { faqs } from "@/lib/landing";

const setupPoints = [
  "Domain, logo, colors, and academy branding",
  "Course list, pricing, batches, and learner flow",
  "Payment, email, media, live class, and access settings",
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f2f8ff_48%,#eef7ff_100%)] py-16 text-foreground sm:py-20 lg:py-24 dark:bg-[linear-gradient(180deg,#061126_0%,#0b1833_52%,#071126_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(43,168,255,0.14),transparent_30rem),radial-gradient(circle_at_90%_12%,rgba(34,181,115,0.12),transparent_32rem)] dark:bg-[radial-gradient(circle_at_10%_16%,rgba(69,145,255,0.14),transparent_30rem),radial-gradient(circle_at_90%_12%,rgba(88,201,138,0.1),transparent_32rem)]" />
      <div className={siteContainerClasses({ className: "relative z-10" })}>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-lg shadow-blue-950/8 dark:bg-white/8 dark:text-emerald-200">
            <HelpCircle className="size-4" aria-hidden="true" />
            FAQs
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
            Common questions before you{" "}
            <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
              launch your academy
            </span>{" "}
            on KASA.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            Clear answers for institute owners, trainers, and EdTech teams who
            want to understand setup, learner experience, faculty workflows, and
            rollout before booking a demo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <aside className="relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#eaf5ff_54%,#effbf5)] p-6 shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(255,255,255,0.04)_52%,rgba(88,201,138,0.1))]">
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-sky-300/18 blur-3xl" />
            <div className="absolute -bottom-24 left-8 size-64 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex size-13 items-center justify-center rounded-2xl bg-[image:var(--button-solid)] !text-white shadow-xl shadow-blue-950/12">
                <MessageCircle className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                Not sure what your academy setup needs?
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                We can map your current workflow into a KASA rollout: storefront,
                payments, live classes, faculty, learner dashboards, certificates,
                and reports.
              </p>

              <div className="mt-6 grid gap-3">
                {setupPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-blue-950/10 bg-white/74 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-primary/15 bg-white/78 p-4 dark:border-white/10 dark:bg-white/8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  <p className="font-heading text-base font-semibold text-slate-950 dark:text-white">
                    Demo is workflow-based
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  We show the parts that match your institute instead of a generic
                  product tour.
                </p>
              </div>
            </div>
          </aside>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-[1.5rem] border border-blue-950/10 bg-white/88 p-5 shadow-xl shadow-blue-950/5 transition duration-300 open:border-primary/35 open:bg-white hover:-translate-y-0.5 hover:border-primary/35 dark:border-white/10 dark:bg-surface/88 dark:open:bg-surface"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/8 text-primary dark:bg-white/8 dark:text-emerald-200">
                      <BadgeCheck className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-base font-semibold leading-7 text-slate-950 sm:text-lg dark:text-white">
                      {faq.question}
                    </span>
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-blue-950/10 text-primary transition group-open:rotate-45 dark:border-white/10">
                    +
                  </span>
                </summary>
                <p className="mt-4 pl-11 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
