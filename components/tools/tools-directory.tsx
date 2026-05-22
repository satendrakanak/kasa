"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { tools, type ToolCategory, type ToolItem } from "@/lib/tools";

const categories = ["All", "Students", "Teachers", "Academies"] as const;

const visualStyles: Record<
  ToolCategory,
  {
    panel: string;
    icon: string;
    chip: string;
    glow: string;
    accent: string;
    line: string;
  }
> = {
  Students: {
    panel:
      "border-sky-200/80 bg-[radial-gradient(circle_at_82%_45%,rgba(43,168,255,0.18),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#edf7ff_54%,#f7fcff_100%)]",
    icon: "bg-white text-primary shadow-blue-950/10",
    chip: "border-sky-200 bg-white/72 text-primary",
    glow: "bg-sky-200/55",
    accent: "from-primary to-sky-400",
    line: "bg-sky-100",
  },
  Teachers: {
    panel:
      "border-emerald-200/80 bg-[radial-gradient(circle_at_82%_45%,rgba(34,181,115,0.18),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#f2fbf7_50%,#f1f8ff_100%)]",
    icon: "bg-white text-emerald-700 shadow-emerald-950/10",
    chip: "border-emerald-200 bg-white/72 text-emerald-700",
    glow: "bg-emerald-200/55",
    accent: "from-emerald-500 to-sky-400",
    line: "bg-emerald-100",
  },
  Academies: {
    panel:
      "border-indigo-200/70 bg-[radial-gradient(circle_at_82%_45%,rgba(79,70,229,0.16),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#f5f7ff_52%,#f2fbff_100%)]",
    icon: "bg-white text-indigo-700 shadow-indigo-950/10",
    chip: "border-indigo-200 bg-white/72 text-indigo-700",
    glow: "bg-indigo-200/55",
    accent: "from-indigo-600 to-sky-400",
    line: "bg-indigo-100",
  },
};

function ToolVisual({ tool }: { tool: ToolItem }) {
  const Icon = tool.icon;
  const style = visualStyles[tool.category];

  return (
    <div className={`relative h-40 overflow-hidden rounded-[1rem] border p-4 ${style.panel}`}>
      <div className={`pointer-events-none absolute -right-10 top-5 size-32 rounded-[2rem] ${style.glow} blur-sm transition duration-500 group-hover:scale-110`} />
      <div className={`pointer-events-none absolute -right-4 top-7 grid size-28 place-items-center rounded-l-[2rem] rounded-r-[1rem] bg-gradient-to-br ${style.accent} text-white shadow-2xl shadow-blue-950/12 transition duration-500 group-hover:translate-x-[-0.2rem]`}>
        <div className="grid size-20 place-items-center rounded-3xl border border-white/30 bg-white/18 shadow-inner shadow-white/20">
          <Icon className="size-11" strokeWidth={1.65} aria-hidden="true" />
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-16 left-12 size-36 rounded-full bg-white/46" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${style.chip}`}>
          {tool.isAi ? <Sparkles className="size-3 animate-pulse" aria-hidden="true" /> : null}
          {tool.isAi ? "AI" : tool.category}
        </span>
      </div>

      <div className="relative z-10 mt-5 w-[62%] rounded-[0.9rem] border border-white/80 bg-white/82 p-3 shadow-xl shadow-blue-950/8 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className={`grid size-8 place-items-center rounded-xl shadow-sm ${style.icon}`}>
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div className="grid flex-1 gap-1.5">
            <span className={`h-2 rounded-full ${style.line}`} />
            <span className={`h-2 w-7/12 rounded-full ${style.line}`} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((item) => (
            <span key={item} className={`h-8 rounded-xl ${style.line}`} />
          ))}
        </div>
      </div>

      <div className={`absolute bottom-5 right-5 z-10 h-1.5 w-16 rounded-full bg-gradient-to-r ${style.accent} opacity-55`} />
    </div>
  );
}

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
                <ToolVisual tool={tool} />
                <h3 className="mt-6 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {tool.description}
                </p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-emerald-200">
                    Open tool
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
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
