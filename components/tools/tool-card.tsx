import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { type ToolCategory, type ToolItem } from "@/lib/tools";

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
      "border-sky-200/80 bg-[radial-gradient(circle_at_82%_45%,rgba(43,168,255,0.18),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#edf7ff_54%,#f7fcff_100%)] dark:border-sky-300/20 dark:bg-[radial-gradient(circle_at_82%_45%,rgba(74,163,255,0.16),transparent_9rem),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(19,35,55,0.92))]",
    icon: "bg-white text-primary shadow-blue-950/10 dark:bg-white/10 dark:text-sky-100",
    chip: "border-sky-200 bg-white/72 text-primary dark:border-sky-300/25 dark:bg-sky-300/10 dark:text-sky-100",
    glow: "bg-sky-200/55 dark:bg-sky-300/15",
    accent: "from-primary to-sky-400",
    line: "bg-sky-100 dark:bg-sky-300/10",
  },
  Teachers: {
    panel:
      "border-emerald-200/80 bg-[radial-gradient(circle_at_82%_45%,rgba(34,181,115,0.18),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#f2fbf7_50%,#f1f8ff_100%)] dark:border-emerald-300/20 dark:bg-[radial-gradient(circle_at_82%_45%,rgba(88,201,138,0.14),transparent_9rem),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(18,43,35,0.88))]",
    icon: "bg-white text-emerald-700 shadow-emerald-950/10 dark:bg-white/10 dark:text-emerald-100",
    chip: "border-emerald-200 bg-white/72 text-emerald-700 dark:border-emerald-300/25 dark:bg-emerald-300/10 dark:text-emerald-100",
    glow: "bg-emerald-200/55 dark:bg-emerald-300/14",
    accent: "from-emerald-500 to-sky-400",
    line: "bg-emerald-100 dark:bg-emerald-300/10",
  },
  Academies: {
    panel:
      "border-indigo-200/70 bg-[radial-gradient(circle_at_82%_45%,rgba(79,70,229,0.16),transparent_9rem),linear-gradient(135deg,#ffffff_0%,#f5f7ff_52%,#f2fbff_100%)] dark:border-indigo-300/20 dark:bg-[radial-gradient(circle_at_82%_45%,rgba(104,115,255,0.14),transparent_9rem),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(32,34,61,0.9))]",
    icon: "bg-white text-indigo-700 shadow-indigo-950/10 dark:bg-white/10 dark:text-indigo-100",
    chip: "border-indigo-200 bg-white/72 text-indigo-700 dark:border-indigo-300/25 dark:bg-indigo-300/10 dark:text-indigo-100",
    glow: "bg-indigo-200/55 dark:bg-indigo-300/14",
    accent: "from-indigo-600 to-sky-400",
    line: "bg-indigo-100 dark:bg-indigo-300/10",
  },
};

export function ToolCardVisual({ tool }: { tool: ToolItem }) {
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
      <div className="pointer-events-none absolute -bottom-16 left-12 size-36 rounded-full bg-white/46 dark:bg-white/8" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${style.chip}`}>
          {tool.isAi ? <Sparkles className="size-3 animate-pulse" aria-hidden="true" /> : null}
          {tool.isAi ? "AI" : tool.category}
        </span>
      </div>

      <div className="relative z-10 mt-5 w-[62%] rounded-[0.9rem] border border-white/80 bg-white/82 p-3 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-white/10">
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

export function ToolCard({
  tool,
  href,
  disabled = false,
}: {
  tool: ToolItem;
  href?: string;
  disabled?: boolean;
}) {
  const targetHref = href ?? `/tools/${tool.slug}`;

  return (
    <Link
      href={disabled ? "/tools" : targetHref}
      className={[
        "group flex flex-col rounded-[1.1rem] border bg-white/88 p-5 shadow-sm shadow-blue-950/5 backdrop-blur transition dark:bg-white/[0.05] sm:min-h-[20rem]",
        disabled
          ? "pointer-events-none border-blue-950/10 opacity-70 dark:border-white/10"
          : "border-blue-950/10 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-blue-950/12 dark:border-white/10 dark:hover:border-emerald-200/35",
      ].join(" ")}
    >
      <ToolCardVisual tool={tool} />
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
}
