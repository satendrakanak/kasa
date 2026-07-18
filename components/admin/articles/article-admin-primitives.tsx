import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const adminTextInputClass =
  "h-12 bg-white text-slate-950 placeholder:text-slate-500 shadow-sm dark:bg-white dark:text-slate-950";

export const adminTextareaClass =
  "bg-white text-slate-950 placeholder:text-slate-500 shadow-sm dark:bg-white dark:text-slate-950";

export const adminSelectClass =
  "h-11 rounded-xl border border-input bg-white px-3 text-sm font-semibold text-slate-950 shadow-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 dark:bg-white dark:text-slate-950";

export function ArticleAdminHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-blue-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff7ff_58%,#e8fff4_100%)] p-6 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,.92),rgba(15,59,117,.5),rgba(6,78,59,.34))]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="w-fit rounded-full border border-blue-200 bg-white px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-blue-100">
            {eyebrow}
          </div>
          <h1 className="mt-5 font-heading text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl dark:text-white">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base dark:text-slate-300">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}

export function ArticleMetric({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-white/85 p-4 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-primary dark:bg-white/10 dark:text-blue-100">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ArticleTableFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/45",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const articleTableHeaderRowClass =
  "border-blue-200 bg-[#f3f8ff] hover:bg-[#f3f8ff] dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.05]";

export const articleTableHeadClass =
  "h-12 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300";

export const articleTableRowClass =
  "border-blue-100/80 hover:bg-blue-50/45 dark:border-white/10 dark:hover:bg-white/[0.04]";

export const articleTableCellClass = "px-4 py-4";
