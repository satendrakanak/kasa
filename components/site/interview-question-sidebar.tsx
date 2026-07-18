import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Route,
  Sparkles,
} from "lucide-react";
import { AskInterviewQuestionDialog } from "@/components/site/ask-interview-question-dialog";

type InterviewQuestionSidebarProps = {
  roleTitle?: string | null;
  topicTitle?: string | null;
  roles: Array<{ id: string; title: string }>;
  topics: Array<{ id: string; title: string }>;
  isLoggedIn: boolean;
  callbackUrl: string;
};

const interviewTools = [
  {
    title: "AI Resume ATS Checker",
    href: "/tools/resume-ats-checker",
    icon: FileSearch,
  },
  {
    title: "AI Career Roadmap",
    href: "/tools/ai-career-roadmap",
    icon: Route,
  },
  {
    title: "AI Resume Builder",
    href: "/tools/ai-resume-builder",
    icon: BrainCircuit,
  },
];

export function InterviewQuestionSidebar({
  roleTitle,
  topicTitle,
  roles,
  topics,
  isLoggedIn,
  callbackUrl,
}: InterviewQuestionSidebarProps) {
  return (
    <aside className="self-stretch">
      <div className="grid gap-4 lg:sticky lg:top-28">
        <AskInterviewQuestionDialog
          roles={roles}
          topics={topics}
          defaultRoleTitle={roleTitle}
          defaultTopicTitle={topicTitle}
          isLoggedIn={isLoggedIn}
          callbackUrl={callbackUrl}
        />

        <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-surface-muted to-card p-5 text-card-foreground shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Interview answer guide
          </div>
          <h2 className="mt-3 font-heading text-xl font-semibold leading-tight text-foreground">
            Build a clear, interview-ready answer.
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[roleTitle, topicTitle].filter(Boolean).map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.6875rem] font-semibold text-muted-foreground">
            {[
              ["01", "Define"],
              ["02", "Example"],
              ["03", "Trade-off"],
            ].map(([number, label]) => (
              <div key={number} className="rounded-xl border border-border bg-card px-2 py-2.5 shadow-sm">
                <span className="block text-primary">{number}</span>
                {label}
              </div>
            ))}
          </div>
          <a
            href="#answer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            Write your answer <ArrowRight className="size-4" />
          </a>
        </section>

        <section className="rounded-3xl border border-border bg-[image:var(--promo-background)] p-5 text-promo-foreground shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-promo-accent">
            Free career tools
          </p>
          <h2 className="mt-2 font-heading text-lg font-semibold">
            Prepare beyond this question
          </h2>
          <div className="mt-4 grid gap-2">
            {interviewTools.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-xl border border-promo-foreground/15 bg-promo-foreground/5 px-3 py-2.5 text-sm font-medium text-promo-foreground transition hover:border-promo-accent/45 hover:bg-promo-foreground/10"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-promo-accent/15 text-promo-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">{title}</span>
                <ArrowRight className="size-4 shrink-0 text-promo-accent transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

      </div>
    </aside>
  );
}
