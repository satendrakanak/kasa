import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ToolCard } from "@/components/tools/tool-card";
import { tools, type ToolItem } from "@/lib/tools";

type RelatedToolsBlockProps = {
  context?: "home" | "pricing" | "feature" | "solution" | "resource" | "compare";
  title?: string;
  description?: string;
  pageTitle?: string;
  keywords?: string[];
  limit?: number;
  className?: string;
};

const featuredToolSlugs = [
  "resume-ats-checker",
  "ai-resume-builder",
  "final-year-project-kit-generator",
  "attendance-calculator",
  "study-timetable-generator",
  "question-paper-generator",
  "quiz-generator",
  "course-pricing-calculator",
  "certificate-generator",
];

const academyToolSlugs = [
  "course-pricing-calculator",
  "profit-calculator",
  "fee-receipt-generator",
  "admission-form-generator",
  "batch-capacity-calculator",
  "certificate-generator",
];

const teacherToolSlugs = [
  "question-paper-generator",
  "quiz-generator",
  "lesson-plan-generator",
  "worksheet-generator",
  "assignment-generator",
  "report-card-generator",
];

const studentToolSlugs = [
  "attendance-calculator",
  "study-timetable-generator",
  "study-hours-calculator",
  "final-exam-calculator",
  "gpa-calculator",
  "cgpa-percentage-converter",
];

function bySlug(slugs: string[]) {
  const map = new Map(tools.map((tool) => [tool.slug, tool]));
  return slugs.map((slug) => map.get(slug)).filter(Boolean) as ToolItem[];
}

function pickTools({
  context,
  pageTitle = "",
  keywords = [],
  limit = 4,
}: Pick<RelatedToolsBlockProps, "context" | "pageTitle" | "keywords" | "limit">) {
  const haystack = `${pageTitle} ${keywords.join(" ")}`.toLowerCase();
  const selected: string[] = [];

  const add = (slugs: string[]) => {
    slugs.forEach((slug) => {
      if (!selected.includes(slug)) selected.push(slug);
    });
  };

  if (context === "home") add(featuredToolSlugs);
  if (context === "pricing") add(["course-pricing-calculator", "profit-calculator", "batch-capacity-calculator", "fee-receipt-generator"]);

  if (/pricing|payment|fee|order|coupon|revenue|profit|academy|institute|admission|batch|certificate|course selling/.test(haystack)) {
    add(academyToolSlugs);
  }

  if (/exam|test|quiz|assignment|worksheet|lesson|teacher|report card|certificate|assessment/.test(haystack)) {
    add(teacherToolSlugs);
  }

  if (/student|learner|attendance|study|grade|gpa|cgpa|marks|final exam|scholarship|class|board/.test(haystack)) {
    add(studentToolSlugs);
  }

if (/resume|career|project|placement|btech|bca|coding|bootcamp|computer/.test(haystack)) {
    add(["resume-ats-checker", "ai-resume-builder", "final-year-project-kit-generator", "study-timetable-generator"]);
  }

  if (!selected.length) add(featuredToolSlugs);
  add(featuredToolSlugs);

  return bySlug(selected).slice(0, limit);
}

export function RelatedToolsBlock({
  context,
  title = "Helpful tools for the next step.",
  description = "Open a related calculator or AI generator when you want a quick answer, printable output, or shareable result.",
  pageTitle,
  keywords,
  limit = 4,
  className = "",
}: RelatedToolsBlockProps) {
  const relatedTools = pickTools({ context, pageTitle, keywords, limit });
  const isWideFeature = limit > 4;

  return (
    <section
      className={[
        "relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef7ff_50%,#f7fcff_100%)] px-4 py-14 dark:bg-[linear-gradient(180deg,#050b18_0%,#071425_52%,#06120f_100%)] sm:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(43,168,255,0.16),transparent_24rem),radial-gradient(circle_at_86%_22%,rgba(34,181,115,0.13),transparent_26rem)] dark:bg-[radial-gradient(circle_at_12%_0%,rgba(58,139,255,0.13),transparent_24rem),radial-gradient(circle_at_86%_22%,rgba(88,201,138,0.12),transparent_26rem)]" />
      <div className="relative mx-auto w-full max-w-[108rem]">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white/82 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-emerald-200">
              <Sparkles className="size-4" aria-hidden="true" />
              Free tools
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl dark:text-white">
              {title}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-blue-950/10 bg-white px-5 text-sm font-semibold text-primary shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:border-primary/35 dark:border-white/10 dark:bg-white/8 dark:text-emerald-200"
          >
            Browse all tools
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className={["grid gap-4", isWideFeature ? "md:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4"].join(" ")}>
          {relatedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
