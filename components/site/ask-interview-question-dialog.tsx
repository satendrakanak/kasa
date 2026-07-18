"use client";

import Link from "next/link";
import { ArrowRight, MessageSquarePlus } from "lucide-react";
import { AskInterviewQuestionForm } from "@/components/site/ask-interview-question-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type InterviewOption = {
  id: string;
  title: string;
};

type AskInterviewQuestionDialogProps = {
  roles: InterviewOption[];
  topics: InterviewOption[];
  defaultRoleTitle?: string | null;
  defaultTopicTitle?: string | null;
  isLoggedIn: boolean;
  callbackUrl: string;
};

const triggerClassName =
  "mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--button-solid)] px-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-95";

export function AskInterviewQuestionDialog({
  roles,
  topics,
  defaultRoleTitle,
  defaultTopicTitle,
  isLoggedIn,
  callbackUrl,
}: AskInterviewQuestionDialogProps) {
  const card = (
    <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-surface-muted to-card p-5 text-card-foreground shadow-xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
        <MessageSquarePlus className="size-4" aria-hidden="true" />
        Ask the community
      </div>
      <h2 className="mt-2.5 font-heading text-xl font-semibold leading-tight text-foreground">
        Have a different interview question?
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Ask it here and get help from students preparing for the same role.
      </p>
      {isLoggedIn ? (
        <DialogTrigger asChild>
          <button type="button" className={triggerClassName}>
            Ask your question
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </DialogTrigger>
      ) : (
        <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className={triggerClassName}>
          Login and ask
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </section>
  );

  if (!isLoggedIn) return card;

  return (
    <Dialog>
      {card}
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[92vh] overflow-y-auto border-border bg-background p-5 text-foreground shadow-2xl sm:max-w-xl"
      >
        <DialogHeader className="pr-9">
          <DialogTitle className="font-heading text-2xl font-semibold leading-tight text-foreground">
            Ask your interview question
          </DialogTitle>
        </DialogHeader>
        <AskInterviewQuestionForm
          roles={roles}
          topics={topics}
          defaultRoleTitle={defaultRoleTitle || ""}
          defaultTopicTitle={defaultTopicTitle || ""}
          compact
        />
      </DialogContent>
    </Dialog>
  );
}
