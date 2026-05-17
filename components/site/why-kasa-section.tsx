import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
  Layers3,
  Sparkles,
  XCircle,
} from "lucide-react";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
import { siteButtonClasses } from "@/components/site/site-button";
import { siteContainerClasses } from "@/components/site/site-container";

const comparisonRows = [
  {
    feature: "Launch and setup",
    traditional: "Months of custom development, plugin stitching, server setup, and repeated vendor coordination.",
    kasa: "1-click installation style rollout: configure domain, connect keys, brand the academy, and start working.",
  },
  {
    feature: "Course selling",
    traditional: "Website, checkout, payment links, invoices, coupons, and LMS access usually live in separate tools.",
    kasa: "Course pages, Razorpay payments, coupons, invoices, orders, and learner access stay connected.",
  },
  {
    feature: "Live classes",
    traditional: "Classes depend on meeting links, chat reminders, manual recordings, and disconnected attendance.",
    kasa: "BigBlueButton classes, batches, schedules, replays, reminders, and learner progress run inside the LMS.",
  },
  {
    feature: "Learner experience",
    traditional: "Students jump between WhatsApp, Drive folders, video links, payment receipts, and scattered resources.",
    kasa: "Learners get one dashboard for courses, live classes, resources, exams, certificates, orders, and progress.",
  },
  {
    feature: "Team operations",
    traditional: "Admins, faculty, counsellors, and support teams need spreadsheets to track work and ownership.",
    kasa: "Role-based dashboards keep admin control, faculty work, leads, payments, and learner records organized.",
  },
  {
    feature: "Infrastructure",
    traditional: "Hosting, media storage, email, database, backups, and deployment maintenance become separate headaches.",
    kasa: "Next.js 16, NestJS, Docker, EC2, RDS PostgreSQL, S3, Resend, VAPID, and monitoring are planned as one stack.",
  },
  {
    feature: "Growth and reporting",
    traditional: "Leads, demos, sales, course progress, revenue, and certificates are hard to see in one place.",
    kasa: "CRM context, orders, learners, course activity, certificates, and reports stay tied to academy growth.",
  },
];

const proofPoints = [
  "Ready LMS core",
  "White-label academy brand",
  "Live, recorded, and hybrid delivery",
  "Payments and access automation",
];

export function WhyKasaSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f1f8ff_48%,#f7fbff_100%)] py-16 text-foreground sm:py-20 lg:py-24 dark:bg-[linear-gradient(180deg,#061126_0%,#0b1833_52%,#071126_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(43,168,255,0.14),transparent_30rem),radial-gradient(circle_at_90%_10%,rgba(34,181,115,0.12),transparent_32rem)] dark:bg-[radial-gradient(circle_at_12%_14%,rgba(69,145,255,0.14),transparent_30rem),radial-gradient(circle_at_90%_10%,rgba(88,201,138,0.1),transparent_32rem)]" />
      <div className={siteContainerClasses({ className: "relative z-10" })}>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-primary/18">
            <Sparkles className="size-4" aria-hidden="true" />
            Why KASA
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
            Traditional LMS setup vs{" "}
            <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
              KASA all-in-one academy software
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            KASA is built for teams that do not want a website here, a payment
            tool there, live classes somewhere else, and learner data in
            spreadsheets. One product core handles launch, delivery, payments,
            operations, and growth.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
          {proofPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
            >
              <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
              {point}
            </span>
          ))}
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-surface lg:block">
          <div className="grid grid-cols-[0.24fr_0.38fr_0.38fr] bg-slate-100 text-left dark:bg-white/[0.06]">
            <div className="p-5 font-heading text-lg font-semibold text-slate-950 dark:text-white">
              Feature
            </div>
            <div className="border-l border-blue-950/10 p-5 dark:border-white/10">
              <div className="flex items-center gap-2 font-heading text-lg font-semibold text-slate-950 dark:text-white">
                <CircleAlert className="size-5 text-amber-500" aria-hidden="true" />
                Traditional setup
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">
                Fragmented approach
              </p>
            </div>
            <div className="border-l border-blue-950/10 bg-[linear-gradient(135deg,rgba(43,168,255,0.12),rgba(34,181,115,0.1))] p-5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.14),rgba(88,201,138,0.1))]">
              <div className="flex items-center gap-2 font-heading text-lg font-semibold text-slate-950 dark:text-white">
                <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                KASA
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">
                Connected LMS product
              </p>
            </div>
          </div>

          {comparisonRows.map((row, index) => (
            <div
              key={row.feature}
              className={[
                "grid grid-cols-[0.24fr_0.38fr_0.38fr] border-t border-blue-950/8 dark:border-white/10",
                index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/80 dark:bg-white/[0.025]",
              ].join(" ")}
            >
              <div className="p-5 font-heading text-base font-semibold text-slate-950 dark:text-white">
                {row.feature}
              </div>
              <div className="border-l border-blue-950/8 p-5 text-sm leading-7 text-slate-600 dark:border-white/10 dark:text-slate-300">
                {row.traditional}
              </div>
              <div className="border-l border-blue-950/8 bg-primary/4 p-5 text-sm font-medium leading-7 text-slate-700 dark:border-white/10 dark:bg-primary/8 dark:text-slate-200">
                {row.kasa}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:hidden">
          {comparisonRows.map((row) => (
            <article
              key={row.feature}
              className="overflow-hidden rounded-[1.5rem] border border-blue-950/10 bg-white shadow-xl shadow-blue-950/6 dark:border-white/10 dark:bg-surface"
            >
              <div className="border-b border-blue-950/10 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
                <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {row.feature}
                </h3>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-[1.15rem] border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-300/20 dark:bg-amber-300/8">
                  <div className="flex items-center gap-2 font-heading text-sm font-semibold text-slate-950 dark:text-white">
                    <XCircle className="size-4 text-amber-500" aria-hidden="true" />
                    Traditional setup
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {row.traditional}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(43,168,255,0.1),rgba(34,181,115,0.1))] p-4 dark:border-primary/30 dark:bg-primary/8">
                  <div className="flex items-center gap-2 font-heading text-sm font-semibold text-slate-950 dark:text-white">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                    KASA
                  </div>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                    {row.kasa}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ProductTourTrigger
            label="View Product Tour"
            variant="solid"
            size="lg"
            className="justify-center"
          />
          <Link
            href="/features"
            className={siteButtonClasses({ variant: "outline", size: "lg" })}
          >
            Explore Features
            <Layers3 className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
