"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Search, Sparkles, X } from "lucide-react";
import { tools } from "@/lib/tools";

const categories = ["All", "Students", "Teachers", "Academies"] as const;

export function ToolsDirectory() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [aiOnly, setAiOnly] = useState(false);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesAi = !aiOnly || tool.isAi;
      const searchable = `${tool.title} ${tool.description} ${tool.category}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      return matchesCategory && matchesAi && matchesQuery;
    });
  }, [activeCategory, aiOnly, query]);

  return (
    <div className="grid gap-5">
      <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-4 shadow-xl shadow-blue-950/6 backdrop-blur dark:border-white/10 dark:bg-white/[0.05] sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary dark:text-emerald-200" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search attendance, quiz, fee receipt, certificate..."
              className="h-12 w-full rounded-full border border-blue-950/10 bg-blue-50/70 px-11 pr-12 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-primary/45 focus:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <button
            type="button"
            onClick={() => setAiOnly((value) => !value)}
            className={[
              "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
              aiOnly
                ? "border-primary/35 bg-[image:var(--button-solid)] !text-white shadow-lg shadow-primary/15"
                : "border-blue-950/10 bg-white text-slate-700 hover:border-primary/35 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:text-white",
            ].join(" ")}
          >
            <Sparkles className="size-4 animate-pulse" aria-hidden="true" />
            AI powered only
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const count = category === "All" ? tools.length : tools.filter((tool) => tool.category === category).length;
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition",
                  active
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-slate-950"
                    : "border-blue-950/10 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200",
                ].join(" ")}
              >
                {category}
                <span className={active ? "text-emerald-700 dark:text-slate-800" : "text-slate-400 dark:text-slate-500"}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          <span>{filteredTools.length} tools found</span>
          <span>Students · Teachers · Academies</span>
        </div>
      </div>

      {filteredTools.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isLive = tool.status === "Live";
            return (
              <Link
                key={tool.slug}
                href={isLive ? `/tools/${tool.slug}` : "/tools"}
                className={[
                  "group flex flex-col rounded-[1.1rem] border bg-white/88 p-5 shadow-sm shadow-blue-950/5 backdrop-blur transition dark:bg-white/[0.05] sm:min-h-[20rem]",
                  isLive
                    ? "border-blue-950/10 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-blue-950/12 dark:border-white/10 dark:hover:border-emerald-200/35"
                    : "pointer-events-none border-blue-950/10 opacity-70 dark:border-white/10",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="relative grid size-12 place-items-center rounded-xl bg-[image:var(--button-solid)] !text-white">
                    <Icon className="size-5" aria-hidden="true" />
                    {tool.isAi ? (
                      <Sparkles className="absolute -right-1 -top-1 size-4 animate-pulse rounded-full bg-white p-0.5 text-primary shadow-sm" aria-hidden="true" />
                    ) : null}
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full border border-blue-950/10 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
                      {tool.status}
                    </span>
                    {tool.isAi ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[0.68rem] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                        <Sparkles className="size-3" aria-hidden="true" />
                        AI
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                  {tool.category}
                </div>
                <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {tool.description}
                </p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-emerald-200">
                    {isLive ? "Open tool" : "Coming soon"}
                    {isLive ? (
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    ) : (
                      <Clock3 className="size-4" aria-hidden="true" />
                    )}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-8 text-center shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.05]">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
            <Search className="size-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-slate-950 dark:text-white">No matching tools found</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Try another keyword or clear the filters.</p>
        </div>
      )}
    </div>
  );
}
