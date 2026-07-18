"use client";

import { useState } from "react";
import { LinkIcon } from "lucide-react";
import { adminTextInputClass } from "@/components/admin/articles/article-admin-primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function InterviewQuestionTitleField({ initialQuestion }: { initialQuestion: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const slug = slugify(question) || "interview-question";

  return (
    <div className="grid gap-2">
      <Label htmlFor="question">Question</Label>
      <Input
        id="question"
        name="question"
        required
        minLength={12}
        maxLength={260}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        className={adminTextInputClass}
      />
      <div className="flex min-w-0 items-center gap-2 px-1 text-xs text-muted-foreground">
        <LinkIcon className="size-3.5 shrink-0 text-primary" />
        <span className="shrink-0">/students/interview-questions/</span>
        <span className="min-w-0 truncate font-semibold text-primary">{slug}</span>
      </div>
    </div>
  );
}
