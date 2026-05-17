import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  FileCheck2,
  LayoutDashboard,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
import { siteContainerClasses } from "@/components/site/site-container";

const architectureItems = [
  {
    title: "Branded course storefront",
    body: "Publish course pages, pricing, landing funnels, and learner checkout on your own academy website.",
    icon: BookOpenCheck,
    tone: "text-sky-500 bg-sky-50 border-sky-200",
  },
  {
    title: "Live batches and schedules",
    body: "Run live classes, faculty-led cohorts, calendars, reminders, and replay access in one workspace.",
    icon: CalendarDays,
    tone: "text-primary bg-blue-50 border-blue-200",
  },
  {
    title: "Payments, coupons and orders",
    body: "Connect course sales with invoices, coupons, access control, refunds, and revenue visibility.",
    icon: ReceiptText,
    tone: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    title: "Student and faculty operations",
    body: "Manage learners, faculty, roles, progress, assignments, and internal team workflows.",
    icon: UsersRound,
    tone: "text-violet-500 bg-violet-50 border-violet-200",
  },
  {
    title: "Exams and certificates",
    body: "Create assignments, tests, completion rules, branded certificates, and result workflows.",
    icon: FileCheck2,
    tone: "text-amber-500 bg-amber-50 border-amber-200",
  },
  {
    title: "Reports and admin control",
    body: "Track course growth, usage limits, leads, plan access, and academy performance from dashboards.",
    icon: LayoutDashboard,
    tone: "text-rose-500 bg-rose-50 border-rose-200",
  },
];

export function ProductArchitectureSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className={siteContainerClasses()}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-primary/18">
            <BadgeCheck className="size-3.5" />
            Platform architecture
          </div>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.12] tracking-normal text-slate-950 sm:text-5xl dark:text-white">
            Built around a powerful{" "}
            <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
              core LMS
            </span>{" "}
            for modern academies.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-muted">
            KASA connects your website, courses, live classes, payments,
            certificates, users, leads, and admin controls into one branded
            online academy software.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white shadow-2xl shadow-blue-950/8 dark:border-white/10 dark:bg-surface">
          <div className="grid lg:grid-cols-[0.32fr_0.68fr]">
            <div className="architecture-panel relative overflow-hidden border-b border-blue-950/10 p-7 shadow-inner shadow-white/50 dark:border-white/10 dark:shadow-none sm:p-9 lg:border-b-0 lg:border-r">
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-sky-300/22 blur-2xl dark:bg-white/10" />
              <div className="absolute -bottom-16 left-8 size-44 rounded-full bg-emerald-300/24 blur-3xl dark:bg-emerald-300/14" />
              <div className="relative flex h-full min-h-72 flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-emerald-200">
                  KASA Core LMS
                </p>
                <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                  One command center for your academy business.
                </h3>
                <p className="mt-4 text-sm leading-7 opacity-80">
                  Start with course selling, add live batches, scale faculty
                  workflows, and keep revenue, learners, certificates, and leads
                  connected.
                </p>
                <div className="mt-6 grid gap-3 text-sm font-semibold">
                  {["Website", "Learning", "Payments", "CRM"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-blue-950/10 bg-white/70 px-4 py-3 text-slate-800 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <ProductTourTrigger
                  className="mt-7 w-full justify-center bg-white/80 text-primary hover:bg-white dark:border-white/25 dark:bg-white dark:text-primary"
                />
              </div>
            </div>

            <div className="grid gap-px bg-blue-950/8 p-px sm:grid-cols-2 dark:bg-white/10">
              {architectureItems.map(({ title, body, icon: Icon, tone }) => (
                <Link
                  key={title}
                  href="/features"
                  className="architecture-card group relative flex gap-4 overflow-hidden bg-white p-5 transition duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:origin-left after:scale-x-0 after:bg-[image:var(--button-solid)] after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:after:scale-x-100 dark:bg-surface"
                >
                  <span
                    className={[
                      "architecture-card-icon grid size-11 shrink-0 place-items-center rounded-2xl border transition duration-200 group-hover:scale-105 dark:border-white/10 dark:bg-white/[0.04]",
                      tone,
                    ].join(" ")}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-slate-950 transition group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-muted">
                      {body}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
