"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { LeadCaptureModalTrigger } from "@/components/lead-capture-form";
import ThemeToggle from "@/components/theme-toggle";
import { featurePages, solutionPages } from "@/lib/site-content";

type NavChild = {
  label: string;
  href: string;
  description: string;
};

type NavItem =
  | {
      label: string;
      href: string;
      items: NavChild[];
    }
  | {
      label: string;
      href: string;
      items?: never;
    };

const primaryNav: NavItem[] = [
  {
    label: "Features",
    href: "/features",
    items: featurePages.slice(0, 6).map((page) => ({
      label: page.eyebrow,
      href: `/features/${page.slug}`,
      description: page.title,
    })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: solutionPages.slice(0, 5).map((page) => ({
      label: page.eyebrow,
      href: `/solutions/${page.slug}`,
      description: page.title,
    })),
  },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Landing", href: "/landing" },
];

function hasChildren(item: NavItem): item is Extract<NavItem, { items: NavChild[] }> {
  return Array.isArray(item.items);
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const leadsEndpoint =
    process.env.NEXT_PUBLIC_LEADS_API_URL ?? "http://localhost:5000/api/v1/leads";

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-surface-strong/82 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <header className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between">
        <Link href="/" className="relative block h-8 w-32" aria-label="KASA home">
          <Image
            src="/kasa-logo-dark.png"
            alt="KASA"
            width={760}
            height={260}
            priority
            className="h-full w-full object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            hasChildren(item) ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex h-10 cursor-pointer items-center gap-1 rounded-full px-4 text-sm font-medium text-white/76 transition hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-0 top-full w-[28rem] translate-y-3 rounded-[1.4rem] border border-white/10 bg-surface p-3 opacity-0 shadow-2xl shadow-black/30 transition group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  <div className="grid gap-2">
                    {item.items.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-2xl px-4 py-3 transition hover:bg-white/7"
                      >
                        <div className="text-sm font-semibold text-white">
                          {child.label}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-muted">
                          {child.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex h-10 cursor-pointer items-center rounded-full px-4 text-sm font-medium text-white/76 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LeadCaptureModalTrigger
            endpoint={leadsEndpoint}
            source="header-enquiry-modal"
            leadType="enquiry"
            buttonLabel="Enquire Now"
            modalTitle="Tell us about your academy"
            modalEyebrow="Enquiry request"
            buttonClassName="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/8 text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.4rem] border border-white/10 bg-surface p-3 shadow-2xl shadow-black/30 lg:hidden">
          <div className="grid gap-1">
            {primaryNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/7"
                >
                  {item.label}
                </Link>
                {hasChildren(item) ? (
                  <div className="ml-4 grid gap-1 border-l border-white/10 pl-3">
                    {item.items.slice(0, 4).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/7 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
