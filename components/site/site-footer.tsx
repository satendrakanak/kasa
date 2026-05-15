import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { featurePages, solutionPages, resourcePages } from "@/lib/site-content";

export function SiteFooter() {
  const columns = [
    {
      title: "Features",
      links: featurePages.slice(0, 6).map((page) => ({
        label: page.eyebrow,
        href: `/features/${page.slug}`,
      })),
    },
    {
      title: "Solutions",
      links: solutionPages.slice(0, 5).map((page) => ({
        label: page.eyebrow.replace("For ", ""),
        href: `/solutions/${page.slug}`,
      })),
    },
    {
      title: "Resources",
      links: resourcePages.slice(0, 5).map((page) => ({
        label: page.eyebrow === "Guide" ? page.title.split(" ").slice(0, 5).join(" ") : page.eyebrow,
        href: `/resources/${page.slug}`,
      })),
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-surface-strong px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <div className="relative h-10 w-36">
            <Image
              src="/kasa-logo-dark.png"
              alt="KASA"
              width={760}
              height={260}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            KASA is a branded LMS and academy operating system for coaching
            institutes, online academies, trainers, and EdTech teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/78">
            <a
              href="mailto:support@getkasa.in"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:bg-white/7"
            >
              <Mail className="size-4" />
              support@getkasa.in
            </a>
            <a
              href="tel:+918979791615"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 hover:bg-white/7"
            >
              <Phone className="size-4" />
              +91-8979-791615
            </a>
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.youtube.com"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-white/72 hover:bg-white/7 hover:text-white"
              aria-label="KASA YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com"
              className="grid size-10 place-items-center rounded-full border border-white/10 text-white/72 hover:bg-white/7 hover:text-white"
              aria-label="KASA LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {column.title}
              </h2>
              <div className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm leading-6 text-muted transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} KASA. All rights reserved.</span>
        <span>Built for serious education businesses.</span>
      </div>
    </footer>
  );
}
