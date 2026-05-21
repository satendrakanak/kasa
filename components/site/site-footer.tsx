"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
import { industrySolutionPages } from "@/lib/industry-page-content";
import {
  comparisonPages,
  featurePages,
  resourcePages,
  solutionPages,
} from "@/lib/site-content";

type FooterLink = {
  label: string;
  href: string;
};

const productLinks: FooterLink[] = [
  { label: "KASA LMS", href: "/" },
  { label: "White label LMS", href: "/features/course-selling-platform" },
  { label: "Academy website builder", href: "/features/academy-website-builder" },
  { label: "Course selling platform", href: "/features/course-selling-platform" },
  { label: "Live class management", href: "/features/live-class-management" },
  { label: "Learner dashboard", href: "/features/student-faculty-management" },
  { label: "Education CRM", href: "/features/education-crm-leads" },
  { label: "Admin dashboard", href: "/features/admin-dashboard-reporting" },
];

const platformLinks: FooterLink[] = [
  { label: "Online academy software", href: "/solutions/online-academies" },
  { label: "Coaching institute LMS", href: "/solutions/coaching-institutes" },
  { label: "Trainer LMS", href: "/solutions/trainers-creators" },
  { label: "EdTech startup platform", href: "/solutions/edtech-startups" },
  { label: "Skill centre LMS", href: "/solutions/skill-development-centres" },
  { label: "Feature index", href: "/features" },
  { label: "Compare options", href: "/compare" },
  { label: "Resources", href: "/resources" },
];

const companyLinks: FooterLink[] = [
  { label: "Why KASA?", href: "/why-kasa" },
  { label: "About KASA", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Customer stories", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Feature index", href: "/features" },
  { label: "Solution index", href: "/solutions" },
];

const socialLinks = [
  {
    label: "KASA Instagram",
    href: "https://www.instagram.com/getkasalms",
    icon: FaInstagram,
  },
  {
    label: "KASA YouTube",
    href: "https://www.youtube.com/@codewithkasa751",
    icon: FaYoutube,
  },
  {
    label: "KASA LinkedIn",
    href: "https://www.linkedin.com/company/getkasa",
    icon: FaLinkedinIn,
  },
  {
    label: "KASA Facebook",
    href: "https://www.facebook.com/profile.php?id=61590188274201",
    icon: FaFacebookF,
  },
  {
    label: "KASA X",
    href: "https://x.com/getkasalms",
    icon: FaXTwitter,
  },
];

const whatsappHref =
  "https://wa.me/918979791615?text=I%20want%20to%20know%20more%20about%20KASA%20LMS";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h2 className="font-heading text-base font-semibold text-emerald-300">
        {title}
      </h2>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            key={`${title}-${link.href}-${link.label}`}
            href={link.href}
            className="group inline-flex items-start gap-2 text-sm leading-6 text-slate-300 transition hover:text-white"
          >
            <ChevronRight className="mt-1 size-4 shrink-0 text-emerald-300 transition group-hover:translate-x-0.5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FooterLinkItem({
  link,
  compact = false,
}: {
  link: FooterLink;
  compact?: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={[
        "group inline-flex items-start gap-2 leading-6 transition hover:text-white",
        compact
          ? "text-[0.84rem] font-medium text-slate-200"
          : "text-sm text-slate-300",
      ].join(" ")}
    >
      <ChevronRight className="mt-1 size-4 shrink-0 text-emerald-300 transition group-hover:translate-x-0.5" />
      <span>{link.label}</span>
    </Link>
  );
}

function FooterMegaColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-emerald-300/14 bg-[#14233b] p-5 shadow-xl shadow-black/15">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-base font-semibold text-emerald-300">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            Focused pages for high-intent academy and institute searches.
          </p>
        </div>
        <Link
          href="/solutions"
          className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200 transition hover:text-white"
        >
          View all
        </Link>
      </div>
      <div className="mt-5 grid gap-x-5 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
        {links.map((link) => (
          <FooterLinkItem key={`${title}-${link.href}-${link.label}`} link={link} compact />
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const featureLinks = featurePages.map((page) => ({
    label: page.eyebrow,
    href: `/features/${page.slug}`,
  }));

  const solutionLinks = solutionPages.map((page) => ({
    label: page.eyebrow.replace("For ", ""),
    href: `/solutions/${page.slug}`,
  }));

  const industryLinks = industrySolutionPages.map((page) => ({
    label: page.eyebrow,
    href: `/solutions/${page.slug}`,
  }));

  const resourceLinks = resourcePages.map((page) => ({
    label:
      page.eyebrow === "Guide"
        ? page.title.replace(/\.$/, "")
        : page.eyebrow,
    href: `/resources/${page.slug}`,
  }));

  const compareLinks = comparisonPages.map((page) => ({
    label: page.title.split(":")[0],
    href: `/compare/${page.slug}`,
  }));

  if (pathname?.startsWith("/cwk") || pathname?.startsWith("/landing")) {
    return null;
  }

  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-40 inline-flex size-13 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-2xl shadow-emerald-950/25 transition hover:-translate-y-0.5 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-emerald-300/35 sm:bottom-5 sm:right-5 md:h-13 md:w-auto md:gap-2.5 md:px-4"
        aria-label="Contact KASA on WhatsApp"
      >
        <FaWhatsapp className="size-7" aria-hidden="true" />
        <span className="hidden text-sm font-bold md:inline">WhatsApp</span>
      </a>

      <footer className="site-footer relative overflow-hidden bg-[#101b31] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(43,168,255,0.14),transparent_30rem),radial-gradient(circle_at_88%_8%,rgba(34,181,115,0.16),transparent_34rem)]" />
        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-80 w-80 rounded-tl-full bg-[linear-gradient(135deg,rgba(105,211,142,0.18),rgba(43,168,255,0.1))] lg:block" />

      <div className="relative mx-auto w-full max-w-[108rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-[0.78fr_2.2fr_0.72fr]">
          <div>
            <div className="relative h-12 w-44">
              <Image
                src="/kasa-logo-dark.png"
                alt="KASA"
                width={760}
                height={260}
                sizes="11rem"
                className="h-full w-full object-contain object-left"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              KASA is an all-in-one LMS software for coaching institutes,
              academies, trainers, and EdTech teams to sell courses, run live
              classes, manage learners, collect payments, and issue certificates.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-300">
              <a
                href="mailto:support@getkasa.in"
                className="inline-flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="size-4 text-emerald-300" />
                support@getkasa.in
              </a>
              <a
                href="tel:+918979791615"
                className="inline-flex items-center gap-3 transition hover:text-white"
              >
                <Phone className="size-4 text-emerald-300" />
                +91 8979 791615
              </a>
              <span className="inline-flex items-center gap-3">
                <MapPin className="size-4 text-emerald-300" />
                Built for education teams in India
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 !text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/16"
                  aria-label={label}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FooterColumn title="Products & Services" links={productLinks} />
              <FooterColumn title="Features" links={featureLinks} />
              <FooterColumn title="Core Solutions" links={solutionLinks} />
              <FooterColumn title="Resources" links={resourceLinks} />
            </div>
            <FooterMegaColumn title="Industry LMS pages" links={industryLinks} />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-1">
            <FooterColumn title="Compare" links={compareLinks} />
            <FooterColumn title="Platform" links={platformLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">
              Launch your branded academy without custom LMS development delays.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-200">
              Configure your domain, connect payments and email, upload courses,
              run live batches, and manage learners from one connected workspace.
            </p>
            <div className="mt-5">
              <ProductTourTrigger
                label="Take a Product Tour"
                variant="solid"
                size="sm"
                className="justify-center"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["AWS hosted", "S3 media", "RDS PostgreSQL"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-emerald-300/20 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10"
              >
                <ShieldCheck className="mb-2 size-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#0b1426]">
        <div className="mx-auto flex w-full max-w-[108rem] flex-col gap-3 px-4 py-5 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} KASA. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}
