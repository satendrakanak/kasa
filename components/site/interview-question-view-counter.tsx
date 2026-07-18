"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const requestedQuestionViews = new Set<string>();

export function InterviewQuestionViewCounter({
  questionId,
  initialCount,
}: {
  questionId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (requestedQuestionViews.has(questionId)) return;
    requestedQuestionViews.add(questionId);

    void fetch(
      `/api/interview-questions/${encodeURIComponent(questionId)}/view`,
      {
        method: "POST",
        cache: "no-store",
        credentials: "same-origin",
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error("View registration failed");
        return response.json() as Promise<{ viewCount?: number }>;
      })
      .then((data) => {
        if (typeof data.viewCount === "number") setCount(data.viewCount);
      })
      .catch(() => {
        requestedQuestionViews.delete(questionId);
      });
  }, [questionId]);

  return (
    <span className="inline-flex items-center gap-2">
      <Eye className="size-4 text-primary" aria-hidden="true" />
      {count} {count === 1 ? "view" : "views"}
    </span>
  );
}
