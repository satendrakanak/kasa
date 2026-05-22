"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ProductTourTrigger } from "@/components/site/product-tour-trigger";

type FooterLink = {
  label: string;
  href: string;
};

const productLinks: FooterLink[] = [
  { label: "KASA LMS", href: "/" },
  { label: "White label LMS", href: "/features/course-selling-platform" },
  {
    label: "Academy website builder",
    href: "/features/academy-website-builder",
  },
  {
    label: "Course selling platform",
    href: "/features/course-selling-platform",
  },
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

const featureLinks: FooterLink[] = [
  {
    label: "Course selling platform",
    href: "/features/course-selling-platform",
  },
  { label: "Live class management", href: "/features/live-class-management" },
  {
    label: "Assessment and certificate software",
    href: "/features/exams-assignments-certificates",
  },
  { label: "Payments and orders", href: "/features/payments-orders-coupons" },
  {
    label: "Student and faculty management",
    href: "/features/student-faculty-management",
  },
  { label: "Education CRM software", href: "/features/education-crm-leads" },
  {
    label: "Academy website builder",
    href: "/features/academy-website-builder",
  },
  {
    label: "Admin dashboard and reports",
    href: "/features/admin-dashboard-reporting",
  },
  { label: "White label LMS", href: "/features/white-label-lms" },
  { label: "Learner dashboard", href: "/features/learner-dashboard" },
];

const solutionLinks: FooterLink[] = [
  { label: "coaching institutes", href: "/solutions/coaching-institutes" },
  { label: "online academies", href: "/solutions/online-academies" },
  { label: "trainers and creators", href: "/solutions/trainers-creators" },
  { label: "EdTech startups", href: "/solutions/edtech-startups" },
  {
    label: "skill development centres",
    href: "/solutions/skill-development-centres",
  },
];

const popularToolLinks: FooterLink[] = [
  { label: "AI Resume ATS Checker", href: "/tools/resume-ats-checker" },
  {
    label: "AI Final Year Project Kit",
    href: "/tools/final-year-project-kit-generator",
  },
  { label: "Attendance Calculator", href: "/tools/attendance-calculator" },
  {
    label: "Study Timetable Generator",
    href: "/tools/study-timetable-generator",
  },
  {
    label: "AI Question Paper Generator",
    href: "/tools/question-paper-generator",
  },
  {
    label: "Course Pricing Calculator",
    href: "/tools/course-pricing-calculator",
  },
  { label: "Certificate Generator", href: "/tools/certificate-generator" },
];

const industryLinks: FooterLink[] = [
  { label: "IIT JEE coaching LMS", href: "/solutions/iit-jee-coaching-lms" },
  { label: "NEET coaching LMS", href: "/solutions/neet-coaching-lms" },
  { label: "UPSC coaching LMS", href: "/solutions/upsc-coaching-lms" },
  { label: "CA coaching LMS", href: "/solutions/ca-coaching-lms" },
  { label: "Spoken English LMS", href: "/solutions/spoken-english-lms" },
  { label: "Yoga academy LMS", href: "/solutions/yoga-academy-lms" },
  { label: "Dance academy LMS", href: "/solutions/dance-academy-lms" },
  { label: "Music classes LMS", href: "/solutions/music-classes-lms" },
  { label: "Coding bootcamp LMS", href: "/solutions/coding-bootcamp-lms" },
  { label: "Digital marketing LMS", href: "/solutions/digital-marketing-lms" },
  { label: "Tuition class LMS", href: "/solutions/tuition-class-lms" },
  { label: "Teacher training LMS", href: "/solutions/teacher-training-lms" },
  {
    label: "Corporate training LMS",
    href: "/solutions/corporate-training-lms",
  },
  { label: "Nursing institute LMS", href: "/solutions/nursing-institute-lms" },
  {
    label: "Computer institute LMS",
    href: "/solutions/computer-institute-lms",
  },
  { label: "Beauty academy LMS", href: "/solutions/beauty-academy-lms" },
  {
    label: "Financial education LMS",
    href: "/solutions/financial-education-lms",
  },
  { label: "Language academy LMS", href: "/solutions/language-academy-lms" },
  { label: "Competitive exam LMS", href: "/solutions/competitive-exam-lms" },
  {
    label: "Coaching franchise LMS",
    href: "/solutions/coaching-franchise-lms",
  },
];

const resourceLinks: FooterLink[] = [
  {
    label:
      "How to start an online academy in India with courses, payments, and certificates",
    href: "/resources/start-online-academy-india",
  },
  {
    label: "How to sell recorded courses online from your own branded platform",
    href: "/resources/sell-recorded-courses-online",
  },
  {
    label:
      "How to run live online classes with batches, replays, and student tracking",
    href: "/resources/run-live-online-classes",
  },
  {
    label: "SEO strategy for online academies and coaching institute websites",
    href: "/resources/lms-seo-for-academies",
  },
  {
    label:
      "Course certificate best practices for coaching institutes and trainers",
    href: "/resources/course-certificates-best-practices",
  },
  {
    label: "Online course pricing guide for trainers and coaching institutes",
    href: "/resources/online-course-pricing-guide",
  },
];

const compareLinks: FooterLink[] = [
  {
    label: "KASA vs custom LMS development",
    href: "/compare/kasa-vs-custom-lms-development",
  },
  {
    label: "KASA vs course marketplaces",
    href: "/compare/kasa-vs-marketplaces",
  },
  {
    label: "KASA vs WordPress LMS plugins for serious coaching operations.",
    href: "/compare/kasa-vs-wordpress-lms",
  },
  {
    label: "What makes the best LMS for coaching institutes in India?",
    href: "/compare/best-lms-for-coaching-institutes",
  },
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
    icon: "instagram",
  },
  {
    label: "KASA YouTube",
    href: "https://www.youtube.com/@codewithkasa751",
    icon: "youtube",
  },
  {
    label: "KASA LinkedIn",
    href: "https://www.linkedin.com/company/getkasa",
    icon: "linkedin",
  },
  {
    label: "KASA Facebook",
    href: "https://www.facebook.com/profile.php?id=61590188274201",
    icon: "facebook",
  },
  {
    label: "KASA X",
    href: "https://x.com/getkasalms",
    icon: "x",
  },
];

const whatsappHref =
  "https://wa.me/918979791615?text=I%20want%20to%20know%20more%20about%20KASA%20LMS";

type SocialIconName = (typeof socialLinks)[number]["icon"];

function SocialIcon({
  name,
  className = "size-5",
}: {
  name: SocialIconName;
  className?: string;
}) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className,
    "aria-hidden": true,
  };

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 2a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm5.15-2.3a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...commonProps}>
        <path d="M21.58 7.2a2.7 2.7 0 0 0-1.9-1.92C18 4.84 12 4.84 12 4.84s-6 0-7.68.44A2.7 2.7 0 0 0 2.42 7.2 28.2 28.2 0 0 0 2 12a28.2 28.2 0 0 0 .42 4.8 2.7 2.7 0 0 0 1.9 1.92c1.68.44 7.68.44 7.68.44s6 0 7.68-.44a2.7 2.7 0 0 0 1.9-1.92A28.2 28.2 0 0 0 22 12a28.2 28.2 0 0 0-.42-4.8ZM10 15.15v-6.3L15.2 12 10 15.15Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...commonProps}>
        <path d="M6.94 8.98H3.8V20h3.14V8.98ZM5.37 4A1.84 1.84 0 1 0 5.35 7.68 1.84 1.84 0 0 0 5.37 4Zm5.72 4.98H8.08V20h3.14v-5.78c0-1.52.29-2.99 2.17-2.99 1.85 0 1.88 1.73 1.88 3.09V20h3.14v-6.42c0-3.15-.68-5.57-4.36-5.57a3.82 3.82 0 0 0-3.44 1.89h-.04l-.08-.92Z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M14.2 8.16V6.82c0-.65.43-.8.73-.8h1.85V3.17L14.23 3c-2.83 0-3.47 2.12-3.47 3.48v1.68H8.54v3.2h2.22V21h3.44v-9.64h2.32l.31-3.2H14.2Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M15.14 10.24 21.3 3h-1.46l-5.35 6.29L10.22 3H5.3l6.46 9.51L5.3 20.1h1.46l5.65-6.64 4.51 6.64h4.92l-6.7-9.86Zm-2 2.35-.66-.94-5.2-7.52h2.24l4.2 6.07.65.94 5.46 7.89h-2.24l-4.45-6.44Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.81 11.81 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.89c0 2.1.55 4.14 1.6 5.95L.1 24l6.32-1.66a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.18-1.23-6.16-3.47-8.42ZM12.1 21.78h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.75.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

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
          <FooterLinkItem
            key={`${title}-${link.href}-${link.label}`}
            link={link}
            compact
          />
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
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
        <WhatsAppIcon className="size-7" />
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
                classes, manage learners, collect payments, and issue
                certificates.
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
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 !text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/16"
                    aria-label={label}
                  >
                    <SocialIcon name={icon} className="size-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <FooterColumn
                  title="Products & Services"
                  links={productLinks}
                />
                <FooterColumn title="Features" links={featureLinks} />
                <div className="grid gap-8">
                  <FooterColumn title="Core Solutions" links={solutionLinks} />
                  <FooterColumn
                    title="Popular AI Tools"
                    links={popularToolLinks}
                  />
                </div>
                <FooterColumn title="Resources" links={resourceLinks} />
              </div>
              <FooterMegaColumn
                title="Industry LMS pages"
                links={industryLinks}
              />
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
                Launch your branded academy without custom LMS development
                delays.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-200">
                Configure your domain, connect payments and email, upload
                courses, run live batches, and manage learners from one
                connected workspace.
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
