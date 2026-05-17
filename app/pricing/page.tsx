import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";
import { PageHero } from "@/components/site/page-hero";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
import { siteButtonClasses } from "@/components/site/site-button";
import {
  BreadcrumbStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";
import { getWebsitePricingPlans } from "@/lib/website-pricing";

export const metadata: Metadata = {
  title: "KASA Pricing | LMS Software Plans for Online Academies",
  description:
    "Explore KASA LMS pricing approach for coaching institutes, online academies, trainers, and EdTech teams.",
  alternates: {
    canonical: "/pricing",
  },
};

export default async function PricingPage() {
  const plans = await getWebsitePricingPlans();
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";
  const featureRows = [
    "Branded academy website and course storefront",
    "Live classes, batches, and faculty workflows",
    "Payments, coupons, invoices, and learner access",
    "Tests, assignments, certificates, and reports",
    "Rollout support and advanced admin controls",
  ];

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
      />
      <WebPageStructuredData
        name="KASA Pricing"
        description="KASA LMS pricing for coaching institutes, online academies, trainers, and EdTech teams based on workflow, modules, rollout support, and academy scale."
        href="/pricing"
      />
      <PageHero
        eyebrow="KASA pricing"
        title="Choose the LMS rollout that matches your academy stage."
        description="KASA pricing is based on your launch scope, users, modules, live class needs, media usage, and rollout support. Start with a product tour so the team can map the right plan."
        points={["Plan by workflow", "No marketplace commission", "Demo before rollout"]}
        variant="compare"
        primaryLabel="Start Product Tour"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
      />

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Plan structure
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
              Pricing should follow how your academy actually operates.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              The right plan depends on whether you need only course selling,
              live batches, exams, certificates, CRM, media scale, custom domain
              setup, or a full institute workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={[
                  "relative flex overflow-hidden rounded-[2rem] border p-6 shadow-xl transition hover:-translate-y-1 sm:p-7",
                  plan.highlighted
                    ? "border-primary/40 bg-[linear-gradient(180deg,#f0fff8_0%,#ffffff_34%,#f8fcff_100%)] shadow-primary/12 dark:border-primary/40 dark:bg-[linear-gradient(180deg,rgba(88,201,138,0.14),rgba(255,255,255,0.05))]"
                    : "border-blue-950/10 bg-white shadow-blue-950/6 dark:border-white/10 dark:bg-white/[0.04]",
                ].join(" ")}
              >
                <div className="flex w-full flex-col">
                  {plan.highlighted ? (
                    <div className="absolute right-5 top-5 rounded-full bg-[image:var(--button-solid)] px-3 py-1 text-xs font-semibold !text-white">
                      Popular
                    </div>
                  ) : null}
                  <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary dark:bg-white/8">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {plan.eyebrow}
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-5 rounded-[1.3rem] border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                    <div className="font-heading text-4xl font-semibold text-slate-950 dark:text-white">
                      {plan.price}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {plan.note}
                    </p>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                    {plan.bestFor}
                  </p>
                  <div className="mt-6 grid gap-3">
                    {plan.features.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-7">
                    <LeadCaptureModalTrigger
                      endpoint={leadsEndpoint}
                      source={`pricing-${plan.name.toLowerCase()}-page`}
                      leadType="pricing"
                      buttonLabel={plan.highlighted ? "Enquire Now" : "Talk to sales"}
                      ctaLabel={`${plan.highlighted ? "Enquire Now" : "Talk to sales"} - ${plan.name} plan`}
                      modalTitle="Tell us about your academy"
                      modalEyebrow={`${plan.name} plan enquiry`}
                      icon={<Sparkles className="size-4" aria-hidden="true" />}
                      buttonClassName={siteButtonClasses({
                        size: "sm",
                        className: "w-full justify-center",
                      })}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-blue-950/10 bg-white shadow-xl shadow-blue-950/6 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="grid bg-slate-50 text-sm font-semibold text-slate-600 dark:bg-white/[0.05] dark:text-slate-300 md:grid-cols-[1.2fr_repeat(3,1fr)]">
              <div className="p-4">Capability</div>
              {plans.map((plan) => (
                <div key={plan.name} className="border-t border-blue-950/10 p-4 md:border-l md:border-t-0 dark:border-white/10">
                  {plan.name}
                </div>
              ))}
            </div>
            {featureRows.map((row) => (
              <div
                key={row}
                className="grid border-t border-blue-950/10 text-sm md:grid-cols-[1.2fr_repeat(3,1fr)] dark:border-white/10"
              >
                <div className="p-4 font-semibold text-slate-800 dark:text-white">
                  {row}
                </div>
                {plans.map((plan) => {
                  const included = plan.features.some((feature) =>
                    feature.toLowerCase().includes(row.split(",")[0].toLowerCase().split(" ")[0]),
                  );
                  return (
                    <div
                      key={`${plan.name}-${row}`}
                      className="border-t border-blue-950/10 p-4 md:border-l md:border-t-0 dark:border-white/10"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        {included || plan.highlighted ? "Included" : "Available by scope"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#effbf5)] p-6 text-center shadow-xl shadow-blue-950/6 sm:p-8 lg:flex-row lg:text-left dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(88,201,138,0.09))]">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                Want exact pricing for your academy?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                Start the product tour and share your workflow. The team can
                suggest the right module set and rollout path.
              </p>
            </div>
            <ProductTourTrigger
              label="Start Product Tour"
              variant="solid"
              size="md"
              className="justify-center"
            />
          </div>
        </div>
      </section>
    </>
  );
}
