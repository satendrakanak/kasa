"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";
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
    <footer className="site-footer relative overflow-hidden bg-[#101b31] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(43,168,255,0.14),transparent_30rem),radial-gradient(circle_at_88%_8%,rgba(34,181,115,0.16),transparent_34rem)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-80 w-80 rounded-tl-full bg-[linear-gradient(135deg,rgba(105,211,142,0.18),rgba(43,168,255,0.1))] lg:block" />

      <div className="relative mx-auto w-full max-w-[108rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.8fr_0.9fr]">
          <div>
            <div className="relative h-12 w-44">
              <Image
                src="/kasa-logo-dark.png"
                alt="KASA"
                width={760}
                height={260}
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

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.youtube.com"
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 !text-white shadow-lg shadow-black/10 transition hover:border-emerald-300/40 hover:bg-white/16"
                aria-label="KASA YouTube"
              >
                <FaYoutube className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 !text-white shadow-lg shadow-black/10 transition hover:border-emerald-300/40 hover:bg-white/16"
                aria-label="KASA LinkedIn"
              >
                <FaLinkedinIn className="size-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <FooterColumn title="Products & Services" links={productLinks} />
            <FooterColumn title="Features" links={featureLinks} />
            <FooterColumn title="Solutions" links={solutionLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
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
                label="Start Product Tour"
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
  );
}
