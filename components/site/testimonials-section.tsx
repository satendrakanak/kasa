import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Quote,
  Star,
  UsersRound,
} from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";

const stats = [
  { value: "150+", label: "Academy teams" },
  { value: "98%", label: "Launch satisfaction" },
  { value: "18K+", label: "Courses delivered" },
  { value: "24/7", label: "Learner access" },
];

const testimonials = [
  {
    name: "Ankit Sharma",
    role: "Director, PrimeEdge Classes",
    quote:
      "KASA helped us move from payment links, recorded folders, and scattered live class reminders to one academy workspace. Our team finally has clarity across courses, batches, fees, and learners.",
    initials: "AS",
    tone: "from-blue-500/14 via-white to-emerald-500/10",
  },
  {
    name: "Meera Iyer",
    role: "Founder, SkillBridge Academy",
    quote:
      "The best part is that it feels like our own platform. Course pages, learner dashboard, certificates, and Razorpay payments work together without making us manage five tools.",
    initials: "MI",
    tone: "from-emerald-500/14 via-white to-sky-500/10",
  },
  {
    name: "Rahul Verma",
    role: "Operations Lead, EduLaunch",
    quote:
      "Live batches, replays, email reminders, push notifications, and student progress are now in the same flow. It reduced our admin follow-up work from day one.",
    initials: "RV",
    tone: "from-violet-500/12 via-white to-blue-500/10",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef7ff_0%,#f7fbff_48%,#ffffff_100%)] py-16 text-foreground sm:py-20 lg:py-24 dark:bg-[linear-gradient(180deg,#071126_0%,#0b1833_52%,#061126_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(43,168,255,0.16),transparent_30rem),radial-gradient(circle_at_88%_16%,rgba(34,181,115,0.12),transparent_32rem)] dark:bg-[radial-gradient(circle_at_14%_12%,rgba(69,145,255,0.14),transparent_30rem),radial-gradient(circle_at_88%_16%,rgba(88,201,138,0.1),transparent_32rem)]" />
      <div className={siteContainerClasses({ className: "relative z-10" })}>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-lg shadow-blue-950/8 dark:bg-white/8 dark:text-emerald-200">
            <UsersRound className="size-4" aria-hidden="true" />
            Testimonials
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
            Real academy teams are building{" "}
            <span className="stat-gradient-text animate-[gradient-shift_4s_ease-in-out_infinite]">
              serious learning businesses
            </span>{" "}
            with KASA.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            From coaching institutes to online academies, teams use KASA to
            launch faster, sell courses, run live batches, manage learners, and
            keep operations connected.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-7xl gap-4 rounded-[2rem] border border-blue-950/10 bg-white/88 p-4 shadow-2xl shadow-blue-950/8 dark:border-white/10 dark:bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.35rem] bg-slate-50 px-5 py-5 text-center dark:bg-white/[0.05]">
              <div className="stat-gradient-text font-heading text-3xl font-semibold sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <article className="relative overflow-hidden rounded-[2rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#eaf5ff_52%,#effbf5)] p-6 shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(255,255,255,0.04)_52%,rgba(88,201,138,0.1))]">
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-sky-300/18 blur-3xl" />
            <div className="absolute -bottom-24 left-8 size-64 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative flex min-h-[28rem] flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-emerald-200">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Customer story
                </div>
                <Quote className="mt-8 size-12 text-primary/25" aria-hidden="true" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                  3 months after launch
                </p>
                <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">
                  “Our website, LMS, payments, and batches finally started
                  feeling like one system.”
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  The team moved course sales, live batches, learner access,
                  fee collection, replays, and certificates into one branded
                  academy setup. Admin follow-ups became cleaner and students
                  stopped searching through scattered links.
                </p>
              </div>

              <div className="mt-8">
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Course sales", "Live batches", "Certificates"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-blue-950/10 bg-white/76 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>PrimeEdge Classes</span>
                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                  <span>Coaching institute</span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`rounded-[2rem] border border-blue-950/10 bg-gradient-to-br ${testimonial.tone} p-5 shadow-xl shadow-blue-950/7 dark:border-white/10 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-emerald-400/8`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-13 place-items-center rounded-full bg-[image:var(--button-solid)] font-heading text-sm font-semibold !text-white shadow-lg shadow-blue-950/12">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <Quote className="size-8 text-primary/35" aria-hidden="true" />
                </div>

                <div className="mt-4 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  “{testimonial.quote}”
                </p>
                {index === 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="size-4 text-primary" aria-hidden="true" />
                      Coaching
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                      Live + recorded courses
                    </span>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
