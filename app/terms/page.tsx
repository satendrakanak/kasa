import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Terms of Service | KASA LMS",
  description:
    "Read the basic terms for using KASA LMS, including academy setup, account responsibility, product access, payments, support, and acceptable use.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    title: "Platform use",
    body: "KASA is provided for academies, coaching institutes, trainers, and EdTech teams to manage courses, learners, payments, live classes, and certificates. Your team is responsible for the accuracy of the course, pricing, learner, and business information configured in the platform.",
  },
  {
    title: "Accounts and access",
    body: "Admins should keep login credentials secure, assign roles carefully, and remove access when a team member no longer needs the workspace. Learner access, faculty access, and admin access should be used only for the intended academy workflow.",
  },
  {
    title: "Payments and services",
    body: "Payment gateway processing, taxes, refunds, invoices, and learner fee policies depend on your academy configuration and payment provider setup. KASA helps manage the workflow but does not replace your commercial terms with learners.",
  },
  {
    title: "Support and changes",
    body: "Product capabilities may improve over time as KASA adds new LMS, live class, media, reporting, CRM, and automation features. For current rollout, support, and service details, contact the KASA team before launch.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms for using KASA LMS in your academy workflow."
        description="These terms explain the basic operating expectations for teams using KASA to sell courses, run live classes, manage learners, collect payments, and issue certificates."
        points={[
          "Use KASA for legitimate academy and training operations",
          "Keep admin, faculty, and learner access secure",
          "Confirm rollout, support, and payment responsibilities with the team",
        ]}
        primaryLabel="Book a Demo"
        variant="resource"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms" },
        ]}
      />
      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid w-full max-w-[108rem] gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.6rem] border border-blue-950/10 bg-white p-6 shadow-xl shadow-blue-950/6 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {section.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-600 dark:text-slate-300">
          Need a formal agreement for your institute rollout?{" "}
          <Link href="/contact" className="font-semibold text-primary">
            Contact KASA
          </Link>{" "}
          and the team will share the right commercial documentation.
        </p>
      </section>
    </>
  );
}
