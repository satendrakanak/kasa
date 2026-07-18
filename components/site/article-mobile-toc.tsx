"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ArticleTocHeading = {
  id: string;
  level: number;
  text: string;
};

export function ArticleMobileToc({
  headings,
  contentSectionId,
}: {
  headings: ArticleTocHeading[];
  contentSectionId: string;
}) {
  const [isReadingContent, setIsReadingContent] = useState(false);

  useEffect(() => {
    const contentSection = document.getElementById(contentSectionId);
    if (!contentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsReadingContent(entry.isIntersecting),
      {
        rootMargin: "-80px 0px -32px 0px",
        threshold: 0,
      },
    );

    observer.observe(contentSection);
    return () => observer.disconnect();
  }, [contentSectionId]);

  if (!headings.length) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-hidden={!isReadingContent}
          tabIndex={isReadingContent ? 0 : -1}
          className={`fixed bottom-5 left-1/2 z-40 inline-flex h-10 -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-semibold text-primary shadow-xl transition duration-200 hover:bg-accent lg:hidden ${
            isReadingContent
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ListTree className="size-4" />
          On this page
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(90vw,24rem)] gap-0 overflow-y-auto border-border bg-background p-0 sm:max-w-none"
      >
        <SheetHeader className="sticky top-0 z-10 border-b border-border bg-background/95 px-5 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 pr-10">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <ListTree className="size-5" />
            </span>
            <div>
              <SheetTitle className="font-heading text-lg font-semibold text-foreground">
                On this page
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-xs text-muted-foreground">
                Jump directly to any section
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav className="grid gap-1 p-4">
          {headings.map((heading, index) => (
            <SheetClose asChild key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={
                  heading.level === 3
                    ? "ml-5 flex gap-3 rounded-xl px-3 py-2 text-sm leading-5 text-muted-foreground transition hover:bg-accent hover:text-primary"
                    : "flex gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 text-foreground transition hover:bg-accent hover:text-primary"
                }
              >
                <span className="mt-0.5 min-w-5 text-[0.6875rem] font-semibold text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{heading.text}</span>
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
