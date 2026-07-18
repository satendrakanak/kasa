"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  LoaderCircle,
  Plus,
  Tags,
} from "lucide-react";
import { askInterviewQuestionAction } from "@/actions/interviews";

type InterviewOption = {
  id: string;
  title: string;
};

type AskInterviewQuestionFormProps = {
  roles: InterviewOption[];
  topics: InterviewOption[];
  defaultRoleTitle?: string;
  defaultTopicTitle?: string;
  compact?: boolean;
};

const customOption = "__custom__";

const questionStarters = [
  {
    label: "Answer help",
    value: "How should I answer this question in an interview: ",
  },
  {
    label: "Explain a concept",
    value: "How should I explain this concept clearly in an interview: ",
  },
  {
    label: "Compare two things",
    value: "What is the difference between ",
  },
  {
    label: "Project question",
    value: "How should I explain my project work on ",
  },
];

const fieldClassName =
  "w-full rounded-xl border border-border bg-background text-sm font-medium text-foreground outline-none shadow-sm transition placeholder:font-normal placeholder:text-muted-foreground hover:border-primary/35 focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--button-solid)] px-5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
    >
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          Sending question...
        </>
      ) : (
        <>
          Send for community review
          <ArrowRight className="size-4" aria-hidden="true" />
        </>
      )}
    </button>
  );
}

export function AskInterviewQuestionForm({
  roles,
  topics,
  defaultRoleTitle = "",
  defaultTopicTitle = "",
  compact = false,
}: AskInterviewQuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [selectedRole, setSelectedRole] = useState(defaultRoleTitle);
  const [selectedTopic, setSelectedTopic] = useState(defaultTopicTitle);
  const [customRole, setCustomRole] = useState("");
  const [customTopic, setCustomTopic] = useState("");

  const roleTitle = selectedRole === customOption ? customRole.trim() : selectedRole;
  const topicTitle = selectedTopic === customOption ? customTopic.trim() : selectedTopic;
  const isIncomplete = question.trim().length < 12 || roleTitle.length < 2 || topicTitle.length < 2;

  function applyStarter(value: string) {
    setQuestion((current) => (current.trim() ? current : value));
  }

  return (
    <form action={askInterviewQuestionAction} className={compact ? "mt-3" : "mt-5"}>
      <input type="hidden" name="roleTitle" value={roleTitle} readOnly />
      <input type="hidden" name="topicTitle" value={topicTitle} readOnly />

      <div>
        <textarea
          id="community-question"
          aria-label="Your interview question"
          name="question"
          required
          minLength={12}
          maxLength={260}
          rows={compact ? 3 : 4}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: How should a fresher explain a final-year project in an interview?"
          className={`${fieldClassName} resize-y px-3.5 py-3 leading-6`}
        />
        <div className="mt-1.5 flex justify-end text-[0.7rem]">
          <span className={question.length > 0 && question.trim().length < 12 ? "font-medium text-destructive" : "tabular-nums text-muted-foreground"}>
            {question.length > 0 && question.trim().length < 12 ? "Add a little more detail" : `${question.length}/260`}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Quick start:</span>
        <div className="flex flex-wrap gap-1.5">
          {questionStarters.map((starter) => (
            <button
              key={starter.label}
              type="button"
              onClick={() => applyStarter(starter.value)}
              className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.7rem] font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
            >
              {starter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
          <label className="grid gap-1.5 text-xs font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseBusiness className="size-3.5 text-primary" aria-hidden="true" />
              Interview role
            </span>
            <span className="relative">
              <select
                required
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                className={`${fieldClassName} h-11 appearance-none px-3.5 pr-10`}
              >
                <option value="">Choose the closest role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.title}>{role.title}</option>
                ))}
                <option value={customOption}>My role is not listed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            </span>
          </label>
          {selectedRole === customOption ? (
            <input
              value={customRole}
              onChange={(event) => setCustomRole(event.target.value)}
              maxLength={80}
              placeholder="Type your role, e.g. Data Analyst"
              aria-label="Custom interview role"
              className={`${fieldClassName} h-11 px-3.5`}
            />
          ) : null}

          <label className="grid gap-1.5 text-xs font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Tags className="size-3.5 text-primary" aria-hidden="true" />
              Question topic
            </span>
            <span className="relative">
              <select
                required
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                className={`${fieldClassName} h-11 appearance-none px-3.5 pr-10`}
              >
                <option value="">Choose the closest topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.title}>{topic.title}</option>
                ))}
                <option value={customOption}>My topic is not listed</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            </span>
          </label>
          {selectedTopic === customOption ? (
            <input
              value={customTopic}
              onChange={(event) => setCustomTopic(event.target.value)}
              maxLength={80}
              placeholder="Type your topic, e.g. React Hooks"
              aria-label="Custom question topic"
              className={`${fieldClassName} h-11 px-3.5`}
            />
          ) : null}
        </div>
      </div>

      <details className="group mt-3 rounded-xl border border-border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-semibold text-foreground marker:hidden">
          <span className="inline-flex items-center gap-2">
            <Plus className="size-4 text-primary transition group-open:rotate-45" aria-hidden="true" />
            Add helpful context
            <span className="font-normal text-muted-foreground">Optional</span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="border-t border-border p-3.5">
          <textarea
            name="context"
            maxLength={1200}
            rows={4}
            placeholder="Example: I was asked this in a placement round and got confused about the follow-up..."
            className={`${fieldClassName} resize-y px-3.5 py-3 leading-6`}
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Add the company round, your attempt, or the exact part you found confusing.
          </p>
        </div>
      </details>

      <div className="mt-4">
        <SubmitButton disabled={isIncomplete} />
        <p className="mt-2.5 text-center text-[0.7rem] leading-5 text-muted-foreground">
          The community team reviews it before it becomes public.
        </p>
      </div>
    </form>
  );
}
