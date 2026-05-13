import Image from "next/image";
import { faqs, features, pricing, replacedTools } from "@/lib/landing";

const planetMotion = [
  "animate-[planet-orbit-0_155s_linear_infinite]",
  "animate-[planet-orbit-1_155s_linear_infinite]",
  "animate-[planet-orbit-2_155s_linear_infinite]",
  "animate-[planet-orbit-3_155s_linear_infinite]",
  "animate-[planet-orbit-4_155s_linear_infinite]",
  "animate-[planet-orbit-5_155s_linear_infinite]",
];

export function PlatformSection() {
  return (
    <section
      id="platform"
      className="relative scroll-mt-28 overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="absolute left-1/2 top-20 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
      <div className="absolute left-[12%] top-[20%] hidden size-1 rounded-full bg-white/55 animate-[star-drift_9s_ease-in-out_infinite] sm:block" />
      <div className="absolute left-[27%] top-[68%] hidden size-1 rounded-full bg-white/40 animate-[star-drift_12s_ease-in-out_infinite] sm:block" />
      <div className="absolute left-[39%] top-[31%] hidden size-1 rounded-full bg-white/45 animate-[star-drift_10s_ease-in-out_infinite] sm:block" />
      <div className="absolute left-[46%] top-[78%] hidden size-1 rounded-full bg-primary/55 animate-[star-drift_14s_ease-in-out_infinite] sm:block" />
      <div className="absolute right-[18%] top-[24%] hidden size-1.5 rounded-full bg-white/60 animate-[star-drift_10s_ease-in-out_infinite] sm:block" />
      <div className="absolute right-[30%] top-[58%] hidden size-1 rounded-full bg-primary/70 animate-[star-drift_13s_ease-in-out_infinite] sm:block" />
      <div className="absolute right-[10%] top-[46%] hidden size-1 rounded-full bg-white/45 animate-[star-drift_12s_ease-in-out_infinite] sm:block" />
      <div className="absolute right-[24%] top-[36%] hidden h-px w-20 -rotate-45 bg-gradient-to-r from-transparent via-white/55 to-transparent animate-[star-drift_11s_ease-in-out_infinite] sm:block" />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Academy operating system
          </p>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-[1.2] tracking-normal text-foreground sm:text-5xl sm:leading-tight">
            A complete growth universe for modern training institutes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Connect admissions, learning delivery, tuition workflows,
            assessments, student communication, and brand presence around one
            KASA core.
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex h-[18rem] max-w-5xl items-center justify-center overflow-hidden sm:mt-14 sm:h-[24rem] lg:hidden">
          <OrbitSystem scaleClassName="scale-[0.37] sm:scale-[0.5]" />
        </div>

        <div className="relative mx-auto mt-18 hidden h-[44rem] max-w-5xl items-center justify-center lg:flex">
          <OrbitSystem />
        </div>
      </div>
    </section>
  );
}

function OrbitSystem({ scaleClassName = "" }: { scaleClassName?: string }) {
  return (
    <div
      className={[
        "relative flex size-[40rem] items-center justify-center origin-center",
        scaleClassName,
      ]
        .join(" ")
        .trim()}
    >
      <div className="absolute size-[40rem] rounded-full border border-white/10" />
      <div className="absolute size-[31rem] rounded-full border border-primary/15" />
      <div className="absolute size-[21rem] rounded-full border border-white/8" />

      <div className="group/orbit absolute size-[38rem]">
        {replacedTools.map((tool, index) => (
          <div
            key={tool.title}
            className={[
              "absolute left-1/2 top-1/2",
              planetMotion[index],
              "group-hover/orbit:[animation-play-state:paused]",
            ].join(" ")}
          >
            <OrbitItem {...tool} delay={0} />
          </div>
        ))}
      </div>

      <div className="relative grid size-72 place-items-center rounded-full border border-primary/35 bg-primary/10 shadow-2xl shadow-primary/20 backdrop-blur-xl">
        <div className="absolute inset-5 rounded-full border border-white/10" />
        <div className="absolute inset-10 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative text-center">
          <div className="relative mx-auto h-20 w-36">
            <Image
              src="/kasa-logo-dark.png"
              alt="KASA"
              width={760}
              height={260}
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-white">
            KASA Universe
          </h3>
          <p className="mx-auto mt-3 max-w-44 text-sm leading-6 text-white/65">
            Your all-in-one LMS growth engine.
          </p>
        </div>
      </div>
    </div>
  );
}

function OrbitItem({
  title,
  body,
  delay = 0,
}: {
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <article
      className="group relative grid size-40 shrink-0 place-items-center overflow-visible rounded-full border border-white/14 bg-surface/80 p-4 text-center shadow-xl shadow-black/15 backdrop-blur transition duration-500 hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.26)] lg:animate-none animate-[feature-rise_620ms_ease-out_both]"
      style={{ animationDelay: `${delay * 120}ms` }}
    >
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/0 blur-2xl transition duration-500 group-hover:bg-primary/14" />
      <div className="relative z-10">
        <h3 className="font-heading text-sm font-semibold text-white">
          {title}
        </h3>
        <p className="mt-2 text-[0.68rem] leading-4 text-muted transition duration-500 group-hover:text-white/72">
          {body}
        </p>
      </div>
    </article>
  );
}

export function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Complete LMS stack
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-5xl sm:leading-tight">
          Everything an institute needs to teach, sell, and scale.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.22)] sm:p-6"
          >
            <div className="mb-8 h-2 w-16 rounded-full bg-primary" />
            <h3 className="font-heading text-xl font-semibold">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-7xl bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Pricing
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-5xl sm:leading-tight">
          Choose the rollout stage that matches your institute right now.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          These plans are structured around the actual product layers we
          reviewed: storefront, learner workspace, faculty workflows, class
          scheduling, assessments, reminders, and operations.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricing.map((plan) => (
          <article
            key={plan.name}
            className={[
              "rounded-3xl border p-5 shadow-sm sm:p-6",
              plan.highlighted
                ? "border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/15 hover:shadow-[0_0_46px_rgba(88,201,138,0.24)]"
                : "border-border bg-surface/80 hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.2)]",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-2xl font-semibold">
                  {plan.name}
                </h3>
                <p
                  className={
                    plan.highlighted
                      ? "mt-1 text-sm opacity-75"
                      : "mt-1 text-sm text-muted"
                  }
                >
                  {plan.note}
                </p>
              </div>
              {plan.highlighted ? (
                <span className="rounded-full bg-surface-strong px-3 py-1 text-xs font-semibold text-foreground">
                  Best
                </span>
              ) : null}
            </div>

            <div className="mt-8 font-heading text-4xl font-semibold">
              {plan.price}
            </div>
            <ul className="mt-8 space-y-3 text-sm font-medium">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    className={[
                      "mt-1 size-2 shrink-0 rounded-full",
                      plan.highlighted ? "bg-primary-foreground" : "bg-primary",
                    ].join(" ")}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@getkasa.in?subject=KASA LMS demo"
              className={[
                "mt-8 flex h-12 items-center justify-center rounded-full text-sm font-semibold transition",
                plan.highlighted
                  ? "bg-surface-strong text-foreground hover:bg-surface"
                  : "bg-primary text-primary-foreground hover:bg-primary-hover",
              ].join(" ")}
            >
              Book demo
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-border bg-background py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            06. FAQ / Demo CTA
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-4xl sm:leading-tight">
            See the real flow, then decide the rollout.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Best next step is a guided product demo around your institute model:
            self-learning, live batches, hybrid delivery, or a mix of all three.
          </p>
          <div className="mt-6 rounded-3xl border border-border bg-surface/80 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Book Demo
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Walk through storefront, learner dashboard, faculty panel,
              classes, calendar, batches, exams, reminders, and certificates.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:hello@getkasa.in?subject=KASA LMS demo"
                className="flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Book live walkthrough
              </a>
              <a
                href="https://cwk.getkasa.in"
                className="flex h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground"
              >
                Open live academy
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-border bg-surface/80 p-5 transition duration-500 open:shadow-sm hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.18)] sm:p-6"
            >
              <summary className="cursor-pointer list-none font-heading text-lg font-semibold">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xl font-semibold tracking-[0.18em]">KASA</div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Software products for educators, institutes, and training
            businesses.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://cwk.getkasa.in"
            className="flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Live demo
          </a>
          <a
            href="mailto:hello@getkasa.in"
            className="flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground"
          >
            Contact sales
          </a>
        </div>
      </div>
    </footer>
  );
}
