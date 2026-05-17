import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Cookie Preferences | KASA LMS",
  description:
    "Understand how KASA may use essential, analytics, preference, and marketing cookies on the website and product enquiry flow.",
  alternates: {
    canonical: "/cookies",
  },
};

const sections = [
  {
    title: "Essential cookies",
    body: "These help the website and product enquiry flow work correctly, including session continuity, security checks, theme preference, and form behavior.",
  },
  {
    title: "Analytics cookies",
    body: "Analytics may help KASA understand which LMS pages, feature guides, solution pages, and comparison resources are useful so the website can be improved responsibly.",
  },
  {
    title: "Preference cookies",
    body: "Preference cookies can remember choices such as theme mode, display settings, or repeated form information where supported by the website experience.",
  },
  {
    title: "Managing cookies",
    body: "You can manage cookies from your browser settings. Some essential features may work differently if cookies are blocked or cleared.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookies"
        title="Cookie preferences for the KASA website experience."
        description="This page explains the types of cookies that may support the KASA website, product tour, enquiry forms, analytics, and browsing preferences."
        points={[
          "Essential cookies support basic website functionality",
          "Analytics can help improve LMS content and navigation",
          "Browser settings can be used to manage cookie choices",
        ]}
        primaryLabel="Book a Demo"
        variant="resource"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookies" },
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
          Have a cookie or tracking question?{" "}
          <Link href="/contact" className="font-semibold text-primary">
            Contact KASA
          </Link>{" "}
          and the team will help.
        </p>
      </section>
    </>
  );
}
