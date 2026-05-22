import Link from "next/link";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ToolBreadcrumb({ current }: { current: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300 lg:justify-start"
    >
      <Link href="/" className="transition hover:text-primary dark:hover:text-emerald-200">
        Home
      </Link>
      <ChevronRight className="size-3.5" aria-hidden="true" />
      <Link href="/tools" className="transition hover:text-primary dark:hover:text-emerald-200">
        AI Tools
      </Link>
      <ChevronRight className="size-3.5" aria-hidden="true" />
      <span className="text-slate-700 dark:text-white">{current}</span>
    </nav>
  );
}

export function ToolHeroKeywords({ keywords }: { keywords: string[] }) {
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="inline-flex items-center gap-1.5 rounded-full border border-blue-950/10 bg-white/72 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
        >
          <Search className="size-3.5 text-primary dark:text-emerald-300" aria-hidden="true" />
          {keyword}
        </span>
      ))}
    </div>
  );
}

export function ToolHeroFeatureCard({
  icon: Icon,
  title,
  description,
  points,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="rounded-[1.4rem] border border-blue-950/10 bg-white/88 p-5 text-left shadow-2xl shadow-blue-950/10 backdrop-blur dark:border-white/10 dark:bg-surface/90">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {points.map((point) => (
          <div
            key={point}
            className="flex gap-3 rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary dark:text-emerald-300" aria-hidden="true" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
