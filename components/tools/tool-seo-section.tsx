import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { siteContainerClasses } from "@/components/site/site-container";
import { tools } from "@/lib/tools";

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedTool = {
  href: string;
  label: string;
};

export function ToolSeoSection({
  eyebrow,
  title,
  description,
  keywords,
  faqs,
  relatedTools,
}: {
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  faqs: FaqItem[];
  relatedTools: RelatedTool[];
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const suggestedTools = getSuggestedTools(title, keywords, relatedTools);

  return (
    <section className="relative pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className={siteContainerClasses()}>
        <div className="rounded-[1.25rem] border border-blue-950/10 bg-white/86 p-5 shadow-xl shadow-blue-950/8 backdrop-blur dark:border-white/10 dark:bg-surface/90 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-emerald-200">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-blue-950/10 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Next useful tools
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {suggestedTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-center justify-between gap-3 rounded-[1rem] border border-primary/18 bg-white p-3 text-sm font-semibold text-slate-800 shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-blue-50 dark:border-emerald-300/18 dark:bg-white/[0.06] dark:text-slate-100"
                    >
                      <span className="flex items-center gap-2">
                        {tool.auto ? <Sparkles className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" /> : <CheckCircle2 className="size-4 text-primary dark:text-emerald-200" aria-hidden="true" />}
                        {tool.label}
                      </span>
                      <ArrowRight className="size-4 text-primary transition group-hover:translate-x-1 dark:text-emerald-200" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[1.1rem] border border-blue-950/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getSuggestedTools(title: string, keywords: string[], relatedTools: RelatedTool[]) {
  const haystack = `${title} ${keywords.join(" ")} ${relatedTools.map((tool) => tool.label).join(" ")}`.toLowerCase();
  const suggestions: RelatedTool[] = [...relatedTools];
  const add = (slugs: string[]) => {
    slugs.forEach((slug) => {
      const tool = tools.find((item) => item.slug === slug);
      if (!tool) return;
      const href = `/tools/${tool.slug}`;
      if (suggestions.some((item) => item.href === href)) return;
      suggestions.push({ href, label: tool.title });
    });
  };

  if (/resume|ats|career|placement|job|interview/.test(haystack)) {
    add(["resume-ats-checker", "ai-resume-builder", "final-year-project-kit-generator", "study-timetable-generator"]);
  }
  if (/project|viva|coding|btech|bca|computer/.test(haystack)) {
    add(["final-year-project-kit-generator", "ai-resume-builder", "resume-ats-checker"]);
  }
  if (/attendance|study|exam|grade|gpa|cgpa|marks|scholarship|student/.test(haystack)) {
    add(["study-timetable-generator", "exam-score-goal-planner", "final-exam-calculator", "gpa-calculator"]);
  }
  if (/quiz|question|worksheet|lesson|assignment|teacher|assessment|report card/.test(haystack)) {
    add(["question-paper-generator", "quiz-generator", "worksheet-generator", "lesson-plan-generator", "assignment-generator", "report-card-generator"]);
  }
  if (/course|pricing|profit|fee|receipt|admission|batch|certificate|academy|institute/.test(haystack)) {
    add(["course-pricing-calculator", "profit-calculator", "fee-receipt-generator", "admission-form-generator", "batch-capacity-calculator", "certificate-generator"]);
  }

  return suggestions.slice(0, 6).map((tool) => ({ ...tool, auto: !relatedTools.some((item) => item.href === tool.href) }));
}
