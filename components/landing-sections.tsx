import Image from "next/image";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";
import {
  faqs,
  features,
  replacedTools,
  testimonials,
} from "@/lib/landing";
import { getWebsitePricingPlans } from "@/lib/website-pricing";

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
            A complete coaching institute management software stack.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Connect admissions, course delivery, tuition workflows, online
            tests, student communication, certificates, and branded academy
            pages around one KASA core.
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

export async function PricingSection() {
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";
  const pricing = await getWebsitePricingPlans();

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
          Dynamic LMS pricing for every stage of your academy.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          Start with branded course selling, move into live and hybrid delivery,
          then scale students, faculty, payments, certificates, and operations
          when your admissions volume grows.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricing.map((plan) => (
          <article
            key={plan.name}
            className={[
              "relative overflow-hidden rounded-[2rem] border p-6 shadow-sm transition duration-500 sm:p-7",
              plan.highlighted
                ? "border-primary/55 bg-[linear-gradient(180deg,rgba(88,201,138,0.08),rgba(88,201,138,0.03)_16%,#0d1932_16%,#0b1833_100%)] text-white shadow-2xl shadow-primary/10 hover:shadow-[0_0_46px_rgba(88,201,138,0.18)]"
                : "border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.2)]",
            ].join(" ")}
          >
            <div
              className={[
                "pointer-events-none absolute inset-x-0 top-0 h-28",
                plan.highlighted
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]"
                  : "bg-[linear-gradient(180deg,rgba(88,201,138,0.08),transparent)]",
              ].join(" ")}
            />
            <div className="flex items-start justify-between gap-3">
              <div className="relative z-10">
                <div
                  className={
                    plan.highlighted
                      ? "text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
                      : "text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                  }
                >
                  {plan.eyebrow}
                </div>
                <h3 className="mt-2 font-heading text-[1.8rem] font-semibold">
                  {plan.name}
                </h3>
              </div>
              {plan.highlighted ? (
                <span className="relative z-10 rounded-full bg-surface-strong px-3 py-1 text-xs font-semibold text-foreground">
                  Best suitable for you
                </span>
              ) : null}
            </div>

            <div
              className={[
                "relative z-10 mt-8 rounded-[1.4rem] border p-5",
                plan.highlighted
                  ? "border-white/12 bg-slate-950/18 backdrop-blur"
                  : "border-white/8 bg-white/[0.03]",
              ].join(" ")}
            >
              <div className="font-heading text-4xl font-semibold tracking-tight">
                {plan.price}
              </div>
              <div
                className={
                  plan.highlighted
                    ? "mt-3 text-sm leading-6 text-white/78"
                    : "mt-3 text-sm leading-6 text-muted"
                }
              >
                {plan.note}
              </div>
            </div>

            <div
              className={[
                "relative z-10 mt-6 rounded-[1.4rem] border p-5",
                plan.highlighted
                  ? "border-white/10 bg-slate-950/14"
                  : "border-white/8 bg-white/[0.02]",
              ].join(" ")}
            >
              <div
                className={
                  plan.highlighted
                    ? "text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/62"
                    : "text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/90"
                }
              >
                Included
              </div>
              <ul className="mt-4 space-y-3.5 text-left text-sm font-medium">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span
                      className={[
                        "mt-[0.42rem] size-2 shrink-0 rounded-full",
                        plan.highlighted ? "bg-primary" : "bg-primary",
                      ].join(" ")}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={
                plan.highlighted
                  ? "relative z-10 mt-6 text-sm text-white/74"
                  : "relative z-10 mt-6 text-sm text-muted"
              }
            >
              {plan.bestFor}
            </div>
            <div className="relative z-10 mt-8">
              <LeadCaptureModalTrigger
                endpoint={leadsEndpoint}
                source={`pricing-${plan.name.toLowerCase()}-modal`}
                leadType="pricing"
                buttonLabel={plan.highlighted ? "Enquire Now" : "Talk to sales"}
                ctaLabel={`${plan.highlighted ? "Enquire Now" : "Talk to sales"} - ${plan.name} plan`}
                modalTitle="Tell us about your academy"
                modalEyebrow={`${plan.name} plan enquiry`}
                buttonClassName={[
                  "inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition",
                  plan.highlighted
                    ? "bg-white text-slate-950 hover:bg-slate-100"
                    : "bg-primary text-primary-foreground hover:bg-primary-hover",
                ].join(" ")}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-border bg-background py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-4xl sm:leading-tight">
            Common questions before you move your academy to KASA.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
            Short answers to the things institute teams usually want clarity on
            before they commit to a full rollout.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0}
              className="group rounded-3xl border border-border bg-surface/80 p-5 transition duration-500 open:shadow-sm hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.18)] sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading text-left text-lg font-semibold">
                <span>{faq.question}</span>
                <span className="mt-1 shrink-0 text-primary">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="customers"
      className="mx-auto w-full max-w-7xl bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Client testimonials
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-normal sm:text-5xl sm:leading-tight">
          Teams choose KASA when they want the full learner journey to feel
          cleaner and easier to run.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          These are the kinds of outcomes serious institutes expect when their
          website, delivery flow, payments, and learner support finally start
          working together.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="rounded-[2rem] border border-border bg-surface/80 p-6 shadow-sm shadow-black/15 transition duration-500 hover:border-primary hover:shadow-[0_0_42px_rgba(88,201,138,0.18)]"
          >
            <div className="flex items-center gap-4">
              <div className="relative size-14 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-heading text-lg font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted">{testimonial.role}</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              “{testimonial.quote}”
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";

  return (
    <footer className="border-t border-border bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 text-center sm:text-left lg:flex-row lg:items-center lg:justify-between">
        <div className="mx-auto lg:mx-0">
          <div className="relative mx-auto h-10 w-28 lg:mx-0">
            <Image
              src="/kasa-logo-dark.png"
              alt="KASA"
              width={760}
              height={260}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Software for institutes that want their website, learner
            experience, classes, payments, and operations to finally feel
            connected.
          </p>
        </div>
        <LeadCaptureModalTrigger
          endpoint={leadsEndpoint}
          source="footer-enquiry-modal"
          leadType="enquiry"
          buttonLabel="Enquire Now"
          modalTitle="Tell us about your academy"
          modalEyebrow="Footer enquiry"
          buttonClassName="inline-flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        />
      </div>
    </footer>
  );
}
