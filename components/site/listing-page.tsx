import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Layers3,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { RelatedToolsBlock } from "@/components/site/related-tools-block";
import {
  BreadcrumbStructuredData,
  ItemListStructuredData,
  WebPageStructuredData,
} from "@/components/site/structured-data";
import type { PageSummary } from "@/lib/site-content";

type ListingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  pages: Array<PageSummary & { href: string }>;
  variant?: "feature" | "solution" | "resource" | "compare";
};

const variantCopy = {
  feature: {
    points: ["Product workflows", "Connected modules", "Admin-ready pages"],
    browseEyebrow: "Feature library",
    browseTitle: "Pick the capability your academy team wants to improve.",
    browseDescription:
      "Every feature page explains the operational workflow, buyer value, and connected KASA modules behind one product capability.",
    structure: [
      "Use these pages to understand how course selling, live classes, payments, certificates, CRM, and reporting work together.",
      "Move from broad product research into the exact KASA feature that matches your academy workflow.",
      "Compare related modules before starting a product tour, so the demo focuses on the right use case.",
    ],
  },
  solution: {
    points: ["Use-case pages", "Team workflows", "Industry positioning"],
    browseEyebrow: "Solution paths",
    browseTitle: "Choose the education business model closest to yours.",
    browseDescription:
      "Solution pages translate KASA capabilities into coaching institute, academy, trainer, EdTech, and skill-centre outcomes.",
    structure: [
      "Find the setup that matches your team, whether you run coaching batches, online courses, creator-led programs, or skill training.",
      "See which KASA workflows matter most for your model: course sales, live teaching, learner operations, payments, and certificates.",
      "Use the links on each solution page to move into deeper feature and comparison pages.",
    ],
  },
  resource: {
    points: ["Planning guides", "Growth content", "Search-ready resources"],
    browseEyebrow: "Resource hub",
    browseTitle: "Read practical guides before you build or scale the academy.",
    browseDescription:
      "Resource pages answer research-stage questions around setup, selling, live classes, certificates, pricing, and SEO.",
    structure: [
      "Use the guides to plan academy setup, course pricing, live classes, certificates, and SEO before choosing tools.",
      "Each resource connects practical advice with relevant KASA features, solution pages, and comparison pages.",
      "The goal is to help your team make a cleaner decision, not push keywords into a page unnaturally.",
    ],
  },
  compare: {
    points: ["Buying clarity", "Option comparison", "Decision support"],
    browseEyebrow: "Comparison hub",
    browseTitle: "Compare KASA with common ways teams build LMS systems.",
    browseDescription:
      "Comparison pages help buyers evaluate marketplaces, plugins, custom development, and serious branded LMS alternatives.",
    structure: [
      "Compare ownership, cost, launch speed, maintenance, learner experience, and daily operations before choosing an LMS route.",
      "Understand when KASA is a better fit than custom development, marketplaces, plugin stacks, or generic LMS options.",
      "Use the comparison pages to prepare sharper product tour questions for your team.",
    ],
  },
} as const;

const indexHref = {
  feature: "/features",
  solution: "/solutions",
  resource: "/resources",
  compare: "/compare",
} as const;

export function ListingPage({
  eyebrow,
  title,
  description,
  pages,
  variant = "feature",
}: ListingPageProps) {
  const copy = variantCopy[variant];
  const currentHref = indexHref[variant];
  const examples = getListingExamples(variant);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: title, href: currentHref },
        ]}
      />
      <ItemListStructuredData name={title} items={pages} />
      <WebPageStructuredData
        name={title}
        description={description}
        href={currentHref}
      />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        points={[...copy.points]}
        variant={variant}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title },
        ]}
      />

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {copy.browseEyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
              {copy.browseTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              {copy.browseDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex min-h-[24rem] flex-col rounded-[1.75rem] border border-blue-950/10 bg-white p-5 shadow-xl shadow-blue-950/6 transition hover:-translate-y-1 hover:border-primary/45 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start gap-4 md:justify-between">
                  <span className="grid size-13 place-items-center rounded-2xl bg-primary/8 text-primary dark:bg-white/8 dark:text-emerald-200">
                    {variant === "resource" ? (
                      <FileText className="size-6" aria-hidden="true" />
                    ) : variant === "compare" ? (
                      <SearchCheck className="size-6" aria-hidden="true" />
                    ) : variant === "solution" ? (
                      <Layers3 className="size-6" aria-hidden="true" />
                    ) : (
                      <BookOpenCheck className="size-6" aria-hidden="true" />
                    )}
                  </span>
                  <span className="font-heading text-3xl font-semibold text-slate-100 transition group-hover:text-primary/18 dark:text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-emerald-200">
                  {page.eyebrow}
                </p>
                <h2 className="mt-3 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                  {page.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {page.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {page.heroPoints.slice(0, 3).map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-blue-950/10 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300"
                    >
                      {point}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open page
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedToolsBlock
        context={variant}
        pageTitle={title}
        keywords={pages.flatMap((page) => page.keywords).slice(0, 24)}
        title="Free tools connected to this section."
        description="Use these calculators and AI generators while exploring the related KASA pages. They help visitors get an instant result before moving into a product workflow."
        limit={4}
        className="py-6 sm:py-8"
      />

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
                {examples.eyebrow}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
                {examples.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {examples.description}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {examples.cards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.5rem] border border-blue-950/10 bg-white p-5 shadow-xl shadow-blue-950/6 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                    {card.label}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef7ff_0%,#f8fbff_52%,#ffffff_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-[linear-gradient(180deg,#071126_0%,#0b1833_54%,#061126_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(43,168,255,0.16),transparent_30rem),radial-gradient(circle_at_90%_20%,rgba(34,181,115,0.12),transparent_34rem)]" />
        <div className="relative mx-auto grid w-full max-w-[108rem] gap-6 rounded-[2rem] border border-blue-950/10 bg-white/88 p-6 shadow-2xl shadow-blue-950/8 sm:p-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center dark:border-white/10 dark:bg-surface/88">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[image:var(--button-solid)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] !text-white shadow-lg shadow-blue-950/12">
              <Sparkles className="size-4" aria-hidden="true" />
              Buyer journey
            </div>
            <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">
              Move from research to the right KASA workflow.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              KASA pages are organized so institute owners, trainers, and EdTech
              teams can start with the problem they are researching, then move
              naturally into related features, comparisons, resources, pricing,
              and a product tour.
            </p>
          </div>

          <div className="grid gap-3">
            {copy.structure.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-2xl border border-blue-950/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem] rounded-[2rem] border border-blue-950/10 bg-[linear-gradient(135deg,#f8fcff,#effbf5)] p-6 shadow-xl shadow-blue-950/6 sm:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(69,145,255,0.12),rgba(88,201,138,0.09))]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-emerald-200">
            Explore related paths
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-slate-950 dark:text-white">
            Choose the next page based on what you need to decide.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "If you are comparing tools, open the comparison pages before booking a demo.",
              "If you already know the workflow you need, go directly to the matching feature page.",
              "If you are still planning the academy, use the guides and solution pages first.",
            ].map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-2xl border border-blue-950/10 bg-white/76 p-4 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function getListingExamples(variant: NonNullable<ListingPageProps["variant"]>) {
  if (variant === "feature") {
    return {
      eyebrow: "Feature paths",
      title: "Start with the workflow your team touches every week.",
      description:
        "The feature library should not feel like a flat module list. These paths help visitors choose based on the daily job they need KASA to improve.",
      cards: [
        { label: "Course sales", title: "Website → checkout → learner access", text: "Use this path when the team needs course pages, payments, coupons, enrolment, and automated access in one flow." },
        { label: "Teaching ops", title: "Live class → attendance → recordings", text: "Use this path when faculty scheduling, learner reminders, attendance, and class resources are the main pain." },
        { label: "Assessment", title: "Exams → assignments → certificates", text: "Use this path when outcomes, submissions, report cards, certificates, and academic proof matter more than marketing pages." },
        { label: "Growth team", title: "CRM → leads → reporting", text: "Use this path when counsellors and admins need follow-ups, source tracking, fee visibility, and conversion reports." },
      ],
    };
  }

  if (variant === "solution") {
    return {
      eyebrow: "Business model paths",
      title: "Different education businesses should not read the same page.",
      description:
        "Solution pages need to reflect how each team sells, teaches, supports learners, and measures growth.",
      cards: [
        { label: "Coaching institute", title: "Batches, fees, tests, and parent trust", text: "Prioritize batch operations, live teaching, attendance, test series, fee collection, and progress visibility." },
        { label: "Online academy", title: "Course storefront and learner dashboard", text: "Prioritize branded course pages, checkout, content access, certificates, and student engagement." },
        { label: "Creator or trainer", title: "Fast launch with simple operations", text: "Prioritize landing pages, pricing, recorded lessons, live workshops, certificates, and low-admin workflows." },
        { label: "Multi-centre team", title: "Standardized control across locations", text: "Prioritize reporting, permissions, branch visibility, counsellor workflows, and repeatable course templates." },
      ],
    };
  }

  if (variant === "compare") {
    return {
      eyebrow: "Comparison shortcuts",
      title: "Compare by operational tradeoff, not software category.",
      description:
        "A useful comparison hub helps teams decide what they gain or lose in speed, ownership, control, maintenance, and learner experience.",
      cards: [
        { label: "Custom build", title: "Control versus delivery time", text: "Compare custom development when ownership matters, but maintenance and launch delay are real constraints." },
        { label: "Marketplace", title: "Discovery versus brand ownership", text: "Compare marketplaces when reach is attractive, but learner data, pricing control, and brand experience matter." },
        { label: "WordPress LMS", title: "Plugin flexibility versus operations", text: "Compare plugin stacks when setup looks cheaper, but updates, security, integrations, and support create hidden work." },
        { label: "Ready LMS", title: "Speed versus workflow fit", text: "Compare ready platforms by whether they support your actual teaching, payment, certificate, and reporting workflows." },
      ],
    };
  }

  return {
    eyebrow: "Planning paths",
    title: "Use resources when the team is still shaping the decision.",
    description:
      "Resource pages should help founders and academy teams turn research into a concrete launch, pricing, teaching, or growth plan.",
    cards: [
      { label: "Launch", title: "Start online academy", text: "Clarify learner segment, course outcome, pricing, content format, launch date, and support process." },
      { label: "Content", title: "Sell recorded courses", text: "Plan modules, access rules, certificates, student communication, and update cadence before publishing." },
      { label: "Delivery", title: "Run live classes", text: "Plan batch schedule, faculty ownership, reminders, attendance, recordings, and doubt support." },
      { label: "Growth", title: "Improve academy website", text: "Plan pages, internal links, enquiry forms, testimonials, and conversion paths before buying more ads." },
    ],
  };
}
