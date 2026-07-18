"use client";

import { useRef, useState } from "react";
import { CheckIcon, Link2Icon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 130);
}

function FieldHealth({
  goodMax,
  goodMin,
  length,
  max,
}: {
  goodMax: number;
  goodMin: number;
  length: number;
  max: number;
}) {
  const state = length === 0 || length > max ? "red" : length >= goodMin && length <= goodMax ? "green" : "amber";
  const styles = {
    red: { bar: "bg-red-500", text: "text-red-600", label: length === 0 ? "Missing" : "Too long" },
    amber: { bar: "bg-amber-500", text: "text-amber-700", label: length < goodMin ? "Add more detail" : "Slightly long" },
    green: { bar: "bg-emerald-500", text: "text-emerald-700", label: "Optimal length" },
  }[state];
  const percentage = Math.min(100, Math.round((length / max) * 100));

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className={styles.text}>{styles.label}</span>
        <span className={styles.text}>{length}/{max} characters</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all ${styles.bar}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export function ArticleSeoEditor({
  articleTitle,
  baseUrl,
  initialCanonicalUrl,
  initialDescription,
  initialFaqs,
  initialFocusKeyword,
  initialSchemaType,
  initialSlug,
  initialTitle,
}: {
  articleTitle: string;
  baseUrl: string;
  initialCanonicalUrl: string;
  initialDescription: string;
  initialFaqs: Array<{ question: string; answer: string }>;
  initialFocusKeyword: string;
  initialSchemaType: string;
  initialSlug: string;
  initialTitle: string;
}) {
  const [seoTitle, setSeoTitle] = useState(initialTitle);
  const [seoDescription, setSeoDescription] = useState(initialDescription);
  const [slug, setSlug] = useState(initialSlug);
  const [editingSlug, setEditingSlug] = useState(false);
  const [faqs, setFaqs] = useState<FaqItem[]>(() =>
    initialFaqs.map((faq, index) => ({ ...faq, id: `initial-${index}` })),
  );
  const nextFaqId = useRef(initialFaqs.length);
  const articleUrl = `${baseUrl}${slug}`;
  const previewTitle = seoTitle.trim() || articleTitle;
  const previewDescription = seoDescription.trim() || "Add a meta description for this article.";
  const serializedFaqs = faqs
    .filter((faq) => faq.question.trim() && faq.answer.trim())
    .map((faq) => {
      const question = faq.question.replace(/\|/g, "-").replace(/\s+/g, " ").trim();
      const answer = faq.answer.replace(/\s+/g, " ").trim();
      return `${question} | ${answer}`;
    })
    .join("\n");

  function addFaq() {
    if (faqs.length >= 8) {
      toast.warning("You can add up to 8 FAQs");
      return;
    }
    const id = `new-${nextFaqId.current++}`;
    setFaqs((current) => [...current, { id, question: "", answer: "" }]);
  }

  function updateFaq(id: string, field: "question" | "answer", value: string) {
    setFaqs((current) => current.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)));
  }

  function removeFaq(id: string) {
    setFaqs((current) => current.filter((faq) => faq.id !== id));
    toast.info("FAQ removed");
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Search preview</p>
        <div className="mt-3 rounded-xl border border-blue-100 bg-slate-50/70 p-4">
          <p className="line-clamp-2 text-xl font-semibold leading-7 text-[#1a0dab]">{previewTitle}</p>
          <p className="mt-1 truncate text-sm font-medium text-emerald-700">{articleUrl}</p>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">{previewDescription}</p>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="seoTitle">SEO title</Label>
        <Input
          id="seoTitle"
          name="seoTitle"
          value={seoTitle}
          maxLength={70}
          onChange={(event) => setSeoTitle(event.target.value)}
          placeholder={articleTitle}
          className="h-12 bg-white text-slate-950 shadow-sm"
        />
        <FieldHealth length={seoTitle.length} goodMin={50} goodMax={60} max={70} />
      </div>

      <div className="grid gap-2">
        <Label>Article URL</Label>
        <input type="hidden" name="slug" value={slug} />
        <div className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 text-sm text-slate-800 shadow-sm">
          <Link2Icon className="size-4 shrink-0 text-primary" />
          {editingSlug ? (
            <div className="flex min-w-0 flex-1 items-center gap-1">
              <span className="shrink-0 text-xs text-slate-500">{baseUrl}</span>
              <div className="relative min-w-0 flex-1">
                <input
                  autoFocus
                  aria-label="Edit SEO article slug"
                  value={slug}
                  onChange={(event) => setSlug(slugify(event.target.value))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      setSlug((current) => current || slugify(articleTitle));
                      setEditingSlug(false);
                    }
                    if (event.key === "Escape") setEditingSlug(false);
                  }}
                  className="h-8 w-full rounded-md border border-blue-200 bg-white py-1 pl-2 pr-9 text-xs font-semibold text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0.5 top-0.5 size-7 bg-blue-50 text-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    setSlug((current) => current || slugify(articleTitle));
                    setEditingSlug(false);
                  }}
                  aria-label="Finish editing SEO slug"
                >
                  <CheckIcon className="size-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <span className="min-w-0 flex-1 truncate font-semibold text-slate-800">{articleUrl}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 bg-blue-50 text-primary hover:bg-primary hover:text-white"
                onClick={() => setEditingSlug(true)}
                aria-label="Edit article slug from SEO settings"
              >
                <PencilIcon className="size-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="seoDescription">Meta description</Label>
        <Textarea
          id="seoDescription"
          name="seoDescription"
          rows={4}
          value={seoDescription}
          maxLength={170}
          onChange={(event) => setSeoDescription(event.target.value)}
          placeholder="Write a concise description for search results."
          className="resize-y bg-white text-slate-950 shadow-sm"
        />
        <FieldHealth length={seoDescription.length} goodMin={120} goodMax={160} max={170} />
      </div>

      <details className="rounded-xl border border-blue-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-800">
          Advanced SEO settings
        </summary>
        <div className="grid gap-4 border-t border-blue-100 p-4">
          <div className="grid gap-2">
            <Label htmlFor="focusKeyword">Primary topic</Label>
            <Input
              id="focusKeyword"
              name="focusKeyword"
              defaultValue={initialFocusKeyword}
              maxLength={100}
              placeholder="e.g. AI tools for teachers"
              className="h-10 bg-white text-slate-950"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="schemaType">Article type</Label>
            <select
              id="schemaType"
              name="schemaType"
              defaultValue={initialSchemaType}
              className="h-10 rounded-md border border-blue-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="Article">Article</option>
              <option value="BlogPosting">Blog post</option>
              <option value="NewsArticle">News article</option>
              <option value="TechArticle">Technical article</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="canonicalUrl">Canonical URL override</Label>
            <Input
              id="canonicalUrl"
              name="canonicalUrl"
              type="url"
              defaultValue={initialCanonicalUrl}
              placeholder="Leave blank to use this article URL"
              className="h-10 bg-white text-slate-950"
            />
          </div>
        </div>
      </details>

      <section className="grid gap-3 border-t border-blue-100 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-semibold text-slate-950">FAQs</h3>
            <p className="text-xs text-slate-500">These questions appear in the article FAQ section.</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="bg-white" onClick={addFaq}>
            <PlusIcon className="size-4" />
            Add FAQ
          </Button>
        </div>

        <input type="hidden" name="faqs" value={serializedFaqs} />
        {faqs.length ? (
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="grid gap-3 rounded-xl border border-blue-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeFaq(faq.id)}
                    aria-label={`Remove FAQ ${index + 1}`}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`faq-question-${faq.id}`}>Question</Label>
                  <Input
                    id={`faq-question-${faq.id}`}
                    value={faq.question}
                    maxLength={150}
                    onChange={(event) => updateFaq(faq.id, "question", event.target.value)}
                    placeholder="What do readers commonly ask?"
                    className="bg-white text-slate-950"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`faq-answer-${faq.id}`}>Answer</Label>
                  <Textarea
                    id={`faq-answer-${faq.id}`}
                    rows={3}
                    value={faq.answer}
                    maxLength={300}
                    onChange={(event) => updateFaq(faq.id, "answer", event.target.value)}
                    placeholder="Write a clear, direct answer."
                    className="resize-y bg-white text-slate-950"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={addFaq}
            className="rounded-xl border border-dashed border-blue-300 bg-blue-50/50 px-4 py-6 text-sm font-semibold text-primary hover:bg-blue-50"
          >
            <PlusIcon className="mx-auto mb-2 size-5" />
            Add the first FAQ
          </button>
        )}
      </section>
    </div>
  );
}
