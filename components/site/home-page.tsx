import Link from "next/link";
import {
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Radio,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { CtaLink } from "@/components/site/cta-link";
import { SectionShell } from "@/components/site/section-shell";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";
import { PricingSection } from "@/components/landing-sections";
import {
  featurePages,
  homeHighlights,
  primaryKeywords,
  solutionPages,
} from "@/lib/site-content";

const workflowCards = [
  {
    title: "Website and course storefront",
    body: "Publish SEO pages, course pages, pricing blocks, and high-intent enquiry forms under your own domain.",
    icon: Building2,
  },
  {
    title: "Course and learner delivery",
    body: "Deliver recorded lessons, live batches, replays, assignments, exams, certificates, and progress views.",
    icon: BookOpenCheck,
  },
  {
    title: "Admissions and CRM",
    body: "Capture demo, pricing, and contact leads with source context so follow-up is faster and cleaner.",
    icon: UsersRound,
  },
  {
    title: "Payments and operations",
    body: "Connect orders, coupons, invoices, refunds, access rules, users, faculty, and reports in one admin workspace.",
    icon: BarChart3,
  },
];

const deliveryModes = [
  "Self-paced recorded courses",
  "Faculty-led live batches",
  "Hybrid courses with replays",
  "Assignments and tests",
  "Certificates and completion rules",
  "Payments, coupons, and orders",
];

export function HomePage() {
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";

  return (
    <>
      <section className="relative overflow-hidden bg-surface-strong px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(88,201,138,0.2),transparent_23rem),linear-gradient(180deg,rgba(18,35,67,0.96),rgba(6,17,38,1))]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              White label LMS software
            </div>
            <h1 className="mt-6 max-w-5xl font-heading text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Build your own online academy website, LMS, and course sales engine.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              KASA helps coaching institutes, trainers, online academies, and
              EdTech teams sell courses, run live classes, manage students,
              collect payments, issue certificates, and track growth from one
              branded platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LeadCaptureModalTrigger
                endpoint={leadsEndpoint}
                source="home-hero-enquiry"
                leadType="enquiry"
                buttonLabel="Talk to sales"
                modalTitle="Tell us about your academy"
                modalEyebrow="Website enquiry"
                buttonClassName="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
              />
              <CtaLink href="/landing" variant="ghost">
                View Product Tour
              </CtaLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {primaryKeywords.slice(0, 5).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950/36 p-4">
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary">
                    Academy control room
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-semibold text-white">
                    KASA operating stack
                  </h2>
                </div>
                <ShieldCheck className="size-8 text-primary" />
              </div>
              <div className="mt-4 grid gap-3">
                {workflowCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4"
                    >
                      <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-white">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-muted">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Product pillars"
        title="One connected platform for selling, teaching, and managing an academy."
        description="The new KASA website is structured around search intent: feature pages, solution pages, comparison pages, and guides all link back into the same product story."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {homeHighlights.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[1.6rem] border border-border bg-surface/78 p-6 transition hover:-translate-y-1 hover:border-primary"
            >
              <Layers3 className="size-7 text-primary" />
              <h2 className="mt-5 font-heading text-xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary">
                Explore workflow
              </span>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="bg-surface-strong px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Delivery models
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Support self-learning, faculty-led, and hybrid academy models.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
              KASA is not limited to one course format. It is designed for the
              way education businesses actually grow: recorded programs first,
              live batches next, and hybrid operations when teams scale.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {deliveryModes.map((mode) => (
              <div
                key={mode}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/82"
              >
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                {mode}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Feature pages"
        title="Explore the complete KASA LMS feature stack."
        description="Each feature page is written for a specific SEO keyword and linked into the wider buyer journey."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featurePages.map((page) => (
            <Link
              key={page.slug}
              href={`/features/${page.slug}`}
              className="rounded-[1.4rem] border border-border bg-surface/75 p-5 transition hover:-translate-y-1 hover:border-primary"
            >
              <Radio className="size-6 text-primary" />
              <h2 className="mt-4 font-heading text-lg font-semibold text-white">
                {page.eyebrow}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{page.description}</p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="bg-surface-strong px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Solution pages
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Built for coaching institutes, academies, trainers, and EdTech teams.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutionPages.map((page) => (
              <Link
                key={page.slug}
                href={`/solutions/${page.slug}`}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-primary"
              >
                <GraduationCap className="size-6 text-primary" />
                <h2 className="mt-4 font-heading text-lg font-semibold text-white">
                  {page.eyebrow}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
    </>
  );
}
