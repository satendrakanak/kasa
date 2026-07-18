"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2Icon, CircleAlertIcon, MessageSquareMoreIcon } from "lucide-react";
import { bulkInterviewQuestionsAction } from "@/actions/admin/interviews";
import { BulkDeleteQuestionsDialog } from "@/components/admin/interviews/bulk-delete-questions-dialog";
import {
  ArticleTableFrame,
  articleTableCellClass,
  articleTableHeadClass,
  articleTableHeaderRowClass,
  articleTableRowClass,
} from "@/components/admin/articles/article-admin-primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type InterviewTableItem = {
  id: string;
  slug: string;
  question: string;
  status: string;
  difficulty: string;
  publishedAt: string | null;
  createdAt: string;
  authorName: string | null;
  authorEmail: string | null;
  isCommunity: boolean;
  ownerName: string | null;
  ownerEmail: string | null;
  role: string | null;
  topic: string | null;
  completed: number;
  totalAnswers: number;
  totalComments: number;
  pendingAnswers: number;
  pendingComments: number;
};

export function InterviewQuestionsTable({ items }: { items: InterviewTableItem[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = items.length > 0 && items.every((item) => selected.has(item.id));
  const selectedCount = selected.size;
  const selectedIds = useMemo(() => Array.from(selected), [selected]);
  const selectedItems = useMemo(
    () => items.filter((item) => selected.has(item.id)),
    [items, selected],
  );
  const canPublish = selectedItems.some((item) => item.status !== "PUBLISHED");
  const canReview = selectedItems.some((item) => item.status !== "REVIEW");
  const canDraft = selectedItems.some((item) => item.status !== "DRAFT");
  const canArchive = selectedItems.some((item) => item.status !== "ARCHIVED");

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(items.map((item) => item.id)) : new Set());
  }

  function toggleOne(id: string, checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id); else next.delete(id);
      return next;
    });
  }

  return (
    <form action={bulkInterviewQuestionsAction} className="grid gap-3">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50/70 px-3 py-2 dark:bg-white/[0.05]">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{selectedCount ? `${selectedCount} selected` : "Select questions to perform a bulk action"}</p>
        {selectedCount ? <div className="flex flex-wrap gap-2">
          {canPublish ? <Button name="bulkAction" value="PUBLISH" type="submit" size="sm" className="!text-white">Publish</Button> : null}
          {canReview ? <Button name="bulkAction" value="REVIEW" type="submit" size="sm" variant="outline" className="bg-white">Send to review</Button> : null}
          {canDraft ? <Button name="bulkAction" value="DRAFT" type="submit" size="sm" variant="outline" className="bg-white">Move to draft</Button> : null}
          {canArchive ? <Button name="bulkAction" value="ARCHIVE" type="submit" size="sm" variant="outline" className="bg-white">Archive</Button> : null}
          <BulkDeleteQuestionsDialog ids={selectedIds} />
        </div> : null}
      </div>
      {selectedIds.map((id) => <input key={id} type="hidden" name="questionIds" value={id} />)}
      <ArticleTableFrame className="min-w-0 max-w-full">
        <Table className="min-w-[920px] table-fixed xl:min-w-0">
          <TableHeader><TableRow className={articleTableHeaderRowClass}>
            <TableHead className={`${articleTableHeadClass} w-[4%]`}><Checkbox checked={allSelected} onCheckedChange={(value) => toggleAll(value === true)} aria-label="Select all questions on this page" /></TableHead>
            <TableHead className={`${articleTableHeadClass} w-[29%]`}>Question</TableHead><TableHead className={`${articleTableHeadClass} w-[11%]`}>Status</TableHead><TableHead className={`${articleTableHeadClass} w-[15%]`}>Role & topic</TableHead><TableHead className={`${articleTableHeadClass} w-[18%]`}>Community activity</TableHead><TableHead className={`${articleTableHeadClass} w-[15%]`}>Source</TableHead><TableHead className={`${articleTableHeadClass} w-[8%] text-right`}>Action</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {items.map((item) => <TableRow key={item.id} className={articleTableRowClass} data-state={selected.has(item.id) ? "selected" : undefined}>
              <TableCell className={articleTableCellClass}><Checkbox checked={selected.has(item.id)} onCheckedChange={(value) => toggleOne(item.id, value === true)} aria-label={`Select ${item.question}`} /></TableCell>
              <TableCell className={`${articleTableCellClass} whitespace-normal break-words`}><Link href={`/admin/interviews/${item.id}`} className="line-clamp-2 font-semibold leading-5 text-slate-950 hover:text-primary dark:text-white">{item.question}</Link><p className="mt-1 line-clamp-1 break-all text-xs text-muted-foreground">/{item.slug}</p><p className="mt-2 flex items-center gap-1 text-xs">{item.completed === 4 ? <><CheckCircle2Icon className="size-3.5 shrink-0 text-emerald-600" /><span className="font-semibold text-emerald-700 dark:text-emerald-400">Ready</span></> : <><CircleAlertIcon className="size-3.5 shrink-0 text-amber-600" /><span className="font-semibold text-amber-700 dark:text-amber-300">{4 - item.completed} fields missing</span></>}</p></TableCell>
              <TableCell className={articleTableCellClass}><Badge variant={item.status === "PUBLISHED" ? "default" : "secondary"}>{item.status}</Badge><p className="mt-2 text-xs text-muted-foreground">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-IN") : item.status === "REVIEW" ? `Sent ${new Date(item.createdAt).toLocaleDateString("en-IN")}` : "Not published"}</p></TableCell>
              <TableCell className={`${articleTableCellClass} whitespace-normal`}><p className="font-medium">{item.role || "Not selected"}</p><p className="mt-1 text-xs text-muted-foreground">{item.topic || item.difficulty.replaceAll("_", " ")}</p></TableCell>
              <TableCell className={`${articleTableCellClass} whitespace-normal`}><div className="flex flex-wrap gap-1.5">{item.pendingAnswers ? <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200">{item.pendingAnswers} answer{item.pendingAnswers === 1 ? "" : "s"} to review</Badge> : null}{item.pendingComments ? <Badge variant="secondary">{item.pendingComments} comment{item.pendingComments === 1 ? "" : "s"} to review</Badge> : null}{!item.pendingAnswers && !item.pendingComments ? <span className="text-xs text-muted-foreground">No new submissions</span> : null}</div><p className="mt-2 text-xs text-muted-foreground">{item.totalAnswers} answers · {item.totalComments} comments</p>{item.pendingAnswers || item.pendingComments ? <Link href={`/admin/interviews?activity=${item.pendingAnswers ? "PENDING_ANSWERS" : "PENDING_COMMENTS"}&moderationQuestion=${item.id}#moderation`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"><MessageSquareMoreIcon className="size-3.5" />Review submissions</Link> : null}</TableCell>
              <TableCell className={`${articleTableCellClass} whitespace-normal`}><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.status === "REVIEW" ? "Submitted by" : item.status === "PUBLISHED" ? "Published by" : "Created by"}</p><p className="mt-1 line-clamp-1 font-medium text-slate-950 dark:text-white">{item.authorName || item.ownerName || (item.isCommunity ? "Community member" : "KASA admin")}</p><p className="mt-1 line-clamp-1 break-all text-xs text-muted-foreground">{item.authorEmail || item.ownerEmail || (item.isCommunity ? "Community submission" : "Admin workspace")}</p><Badge variant="outline" className="mt-2">{item.isCommunity ? "Community" : "Editorial"}</Badge></TableCell>
              <TableCell className={`${articleTableCellClass} text-right`}><Button asChild variant="outline" size="sm" className="bg-white"><Link href={`/admin/interviews/${item.id}`}>Edit</Link></Button></TableCell>
            </TableRow>)}
            {!items.length ? <TableRow><TableCell colSpan={7} className="p-10 text-center text-muted-foreground">No questions match these filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </ArticleTableFrame>
    </form>
  );
}
