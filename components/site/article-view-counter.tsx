"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const requestedArticleViews = new Set<string>();

type ArticleViewCounterProps = {
  articleId: string;
  initialCount: number;
};

export function ArticleViewCounter({
  articleId,
  initialCount,
}: ArticleViewCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (requestedArticleViews.has(articleId)) return;
    requestedArticleViews.add(articleId);

    void fetch(`/api/articles/${encodeURIComponent(articleId)}/view`, {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) throw new Error("View registration failed");
        return response.json() as Promise<{ viewCount?: number }>;
      })
      .then((data) => {
        if (typeof data.viewCount === "number") setCount(data.viewCount);
      })
      .catch(() => {
        requestedArticleViews.delete(articleId);
      });
  }, [articleId]);

  return (
    <span className="inline-flex items-center gap-2">
      <Eye className="size-4 text-primary" />
      {count} {count === 1 ? "view" : "views"}
    </span>
  );
}
