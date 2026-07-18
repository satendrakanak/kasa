import Link from "next/link";
import {
  BookOpenCheckIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ChevronLeftIcon,
  FilePenLineIcon,
  MessageSquareWarningIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { InterviewDifficulty, InterviewStatus, Prisma } from "@prisma/client";
import { createInterviewQuestionDraftAction } from "@/actions/admin/interviews";
import { moderateInterviewContentAction } from "@/actions/interviews";
import {
  adminSelectClass,
  adminTextInputClass,
  ArticleAdminHero,
  ArticleMetric,
} from "@/components/admin/articles/article-admin-primitives";
import { InterviewDashboardToast } from "@/components/admin/interviews/interview-dashboard-toast";
import { InterviewPerPageSelect } from "@/components/admin/interviews/interview-per-page-select";
import { InterviewQuestionsTable, type InterviewTableItem } from "@/components/admin/interviews/interview-questions-table";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

const db = prisma;
const statusFilters = ["ALL", "PUBLISHED", "DRAFT", "REVIEW", "ARCHIVED"] as const;
const difficultyFilters = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED", "SYSTEM_DESIGN"] as const;
const activityFilters = ["ALL", "PENDING_ANSWERS", "PENDING_COMMENTS", "HAS_ANSWERS", "NO_ANSWERS", "COMMUNITY"] as const;
const perPageOptions = [10, 20, 50] as const;

type SearchParams = Promise<{ q?: string; status?: string; role?: string; difficulty?: string; activity?: string; moderationQuestion?: string; page?: string; perPage?: string; bulk?: string; bulkError?: string; count?: string }>;

function clean(value?: string) {
  return (value || "").trim().slice(0, 100);
}

function QuickCreateQuestion({ roles, topics }: { roles: Array<{ id: string; title: string }>; topics: Array<{ id: string; title: string }> }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-10 rounded-xl px-4 !text-white"><PlusIcon className="size-4" />Add question</Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto bg-white sm:max-w-xl dark:bg-slate-950">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-heading text-2xl">Create question</SheetTitle>
          <SheetDescription>Start with the question. Build the answer, guidance, SEO, and publishing later in the question studio.</SheetDescription>
        </SheetHeader>
        <form action={createInterviewQuestionDraftAction} className="grid gap-6 px-6 py-6">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <p className="font-semibold text-slate-950 dark:text-white">Draft first, complete it section by section</p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Only the question is required. Role and topic can be selected now or added later.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input id="question" name="question" required minLength={12} maxLength={260} placeholder="e.g. What is the difference between useEffect and useMemo?" className={adminTextInputClass} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roleId">Starting role <span className="text-muted-foreground">(optional)</span></Label>
            <select id="roleId" name="roleId" defaultValue="" className={adminSelectClass}>
              <option value="">Choose later</option>
              {roles.map((role) => <option key={role.id} value={role.id}>{role.title}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topicId">Starting topic <span className="text-muted-foreground">(optional)</span></Label>
            <select id="topicId" name="topicId" defaultValue="" className={adminSelectClass}>
              <option value="">Choose later</option>
              {topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
            </select>
          </div>
          <SheetFooter className="px-0"><Button type="submit" className="h-11 !text-white">Create draft & continue</Button></SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default async function AdminInterviewsPage({ searchParams }: { searchParams: SearchParams }) {
  const admin = await requireAdmin();
  const query = await searchParams;
  const q = clean(query.q);
  const role = clean(query.role);
  const requestedStatus = statusFilters.includes(query.status as (typeof statusFilters)[number]) ? query.status! : "ALL";
  const requestedDifficulty = difficultyFilters.includes(query.difficulty as (typeof difficultyFilters)[number]) ? query.difficulty! : "ALL";
  const requestedActivity = activityFilters.includes(query.activity as (typeof activityFilters)[number]) ? query.activity! : "ALL";
  const moderationQuestion = clean(query.moderationQuestion);
  const requestedPerPage = Number(query.perPage || 10);
  const perPage = perPageOptions.includes(requestedPerPage as (typeof perPageOptions)[number]) ? requestedPerPage : 10;
  const requestedPage = Math.max(1, Number.parseInt(query.page || "1", 10) || 1);
  const where: Prisma.InterviewQuestionWhereInput = {
    ...(requestedStatus !== "ALL" ? { status: requestedStatus as InterviewStatus } : {}),
    ...(requestedDifficulty !== "ALL" ? { difficulty: requestedDifficulty as InterviewDifficulty } : {}),
    ...(role ? { role: { slug: role } } : {}),
    ...(requestedActivity === "PENDING_ANSWERS" ? { answers: { some: { status: InterviewStatus.REVIEW } } } : {}),
    ...(requestedActivity === "PENDING_COMMENTS" ? { comments: { some: { status: InterviewStatus.REVIEW } } } : {}),
    ...(requestedActivity === "HAS_ANSWERS" ? { answers: { some: {} } } : {}),
    ...(requestedActivity === "NO_ANSWERS" ? { answers: { none: {} } } : {}),
    ...(requestedActivity === "COMMUNITY" ? { isCommunity: true } : {}),
    ...(q ? { OR: [
      { question: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
      { shortAnswer: { contains: q, mode: "insensitive" } },
    ] } : {}),
  };

  const [roles, topics, stats, totalQuestions, pendingQuestions, pendingAnswers, pendingComments] = await Promise.all([
    db.interviewRole.findMany({ orderBy: { title: "asc" }, take: 100 }),
    db.interviewTopic.findMany({ orderBy: { title: "asc" }, take: 140 }),
    db.$transaction([
      db.interviewQuestion.count(),
      db.interviewQuestion.count({ where: { status: "PUBLISHED" } }),
      db.interviewQuestion.count({ where: { status: "DRAFT" } }),
      db.interviewQuestion.count({ where: { status: "REVIEW" } }),
      db.interviewQuestion.count({ where: { answer: { not: "" }, roleId: { not: null }, topicId: { not: null }, seoTitle: { not: null }, seoDescription: { not: null } } }),
      db.interviewAnswer.count({ where: { status: "REVIEW" } }),
      db.interviewComment.count({ where: { status: "REVIEW" } }),
    ]),
    db.interviewQuestion.count({ where }),
    db.interviewQuestion.findMany({ where: { status: "REVIEW", ...(moderationQuestion ? { id: moderationQuestion } : {}) }, orderBy: { createdAt: "asc" }, take: 20, select: { id: true, question: true, authorName: true, authorEmail: true } }),
    db.interviewAnswer.findMany({ where: { status: "REVIEW", ...(moderationQuestion ? { questionId: moderationQuestion } : {}) }, orderBy: { createdAt: "asc" }, take: 20, include: { question: true } }),
    db.interviewComment.findMany({ where: { status: "REVIEW", ...(moderationQuestion ? { OR: [{ questionId: moderationQuestion }, { answer: { questionId: moderationQuestion } }] } : {}) }, orderBy: { createdAt: "asc" }, take: 20, include: { question: true, answer: { include: { question: true } } } }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalQuestions / perPage));
  const page = Math.min(requestedPage, totalPages);
  const questions = await db.interviewQuestion.findMany({
    where,
    orderBy: [
      { publishedAt: { sort: "desc", nulls: "last" } },
      { createdAt: "desc" },
    ],
    skip: (page - 1) * perPage,
    take: perPage,
    include: {
      role: true,
      topic: true,
      createdBy: { select: { name: true, email: true } },
      _count: { select: { answers: true, comments: true } },
      answers: { where: { status: "REVIEW" }, select: { id: true } },
      comments: { where: { status: "REVIEW" }, select: { id: true } },
    },
  });
  const pendingCount = stats[3] + stats[5] + stats[6];
  const tableItems: InterviewTableItem[] = questions.map((item) => ({
    id: item.id,
    slug: item.slug,
    question: item.question,
    status: item.status,
    difficulty: item.difficulty,
    publishedAt: item.publishedAt?.toISOString() || null,
    createdAt: item.createdAt.toISOString(),
    authorName: item.authorName,
    authorEmail: item.authorEmail,
    isCommunity: item.isCommunity,
    ownerName: item.createdBy?.name || null,
    ownerEmail: item.createdBy?.email || null,
    role: item.role?.title || null,
    topic: item.topic?.title || null,
    completed: [item.answer.trim().length >= 40, Boolean(item.roleId), Boolean(item.topicId), Boolean(item.seoTitle && item.seoDescription)].filter(Boolean).length,
    totalAnswers: item._count.answers,
    totalComments: item._count.comments,
    pendingAnswers: item.answers.length,
    pendingComments: item.comments.length,
  }));
  const paginationHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (role) params.set("role", role);
    if (requestedStatus !== "ALL") params.set("status", requestedStatus);
    if (requestedDifficulty !== "ALL") params.set("difficulty", requestedDifficulty);
    if (requestedActivity !== "ALL") params.set("activity", requestedActivity);
    if (perPage !== 10) params.set("perPage", String(perPage));
    if (targetPage > 1) params.set("page", String(targetPage));
    const value = params.toString();
    return value ? `/admin/interviews?${value}` : "/admin/interviews";
  };
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1);

  return (
    <AdminShell adminName={admin.name} adminEmail={admin.email} pageTitle="Interview questions" pageDescription="Create question drafts, then complete answers and publishing in focused sections." showHero={false} headerContent={
      <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground"><Link href="/admin" className="hover:text-foreground">Admin</Link><ChevronRightIcon className="size-4" /><span className="truncate text-foreground">Interview Q&A</span></div>
    }>
      <div className="grid gap-6">
        <InterviewDashboardToast bulk={query.bulk} bulkError={query.bulkError} count={query.count} />
        <ArticleAdminHero eyebrow="Question CMS" title="Interview questions dashboard" description="Review drafts, published questions, answer readiness, and moderation before opening the question studio." actions={<QuickCreateQuestion roles={roles} topics={topics} />} />
        <section className="rounded-2xl border border-blue-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff7ff_60%,#e8fff4_100%)] p-6 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,.92),rgba(15,59,117,.45),rgba(6,78,59,.28))]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <ArticleMetric icon={<BookOpenCheckIcon />} label="Total questions" value={stats[0]} />
            <ArticleMetric icon={<CheckCircle2Icon />} label="Published" value={stats[1]} />
            <ArticleMetric icon={<FilePenLineIcon />} label="Drafts" value={stats[2]} />
            <ArticleMetric icon={<MessageSquareWarningIcon />} label="Pending review" value={pendingCount} />
            <ArticleMetric icon={<SearchIcon />} label="Content ready" value={stats[4]} />
          </div>
        </section>

        <Card className="min-w-0 overflow-hidden">
          <CardContent className="grid min-w-0 gap-5 p-4">
            <form className="grid min-w-0 gap-3 md:grid-cols-2 xl:flex xl:flex-nowrap xl:items-center">
              <input type="hidden" name="perPage" value={perPage} />
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-input bg-white px-3 shadow-sm dark:bg-white md:col-span-2 xl:min-w-60 xl:flex-1"><SearchIcon className="size-4 shrink-0 text-primary" /><input name="q" defaultValue={q} placeholder="Search question, slug, answer..." className="min-w-0 flex-1 bg-transparent text-slate-950 outline-none placeholder:text-slate-500" /></label>
              <select name="role" defaultValue={role} className={`${adminSelectClass} min-w-0 xl:w-44 xl:shrink-0`}><option value="">All roles</option>{roles.map((item) => <option key={item.id} value={item.slug}>{item.title}</option>)}</select>
              <select name="status" defaultValue={requestedStatus} className={`${adminSelectClass} min-w-0 xl:w-40 xl:shrink-0`}>{statusFilters.map((item) => <option key={item} value={item}>{item === "ALL" ? "All statuses" : item.replaceAll("_", " ")}</option>)}</select>
              <select name="difficulty" defaultValue={requestedDifficulty} className={`${adminSelectClass} min-w-0 xl:w-40 xl:shrink-0`}>{difficultyFilters.map((item) => <option key={item} value={item}>{item === "ALL" ? "Any level" : item.replaceAll("_", " ")}</option>)}</select>
              <select name="activity" defaultValue={requestedActivity} className={`${adminSelectClass} min-w-0 xl:w-52 xl:shrink-0`}><option value="ALL">All activity</option><option value="PENDING_ANSWERS">Answers to review</option><option value="PENDING_COMMENTS">Comments to review</option><option value="HAS_ANSWERS">Has answers</option><option value="NO_ANSWERS">No answers</option><option value="COMMUNITY">Community questions</option></select>
              <div className="flex shrink-0 gap-2 md:col-span-2 md:justify-end"><Button type="submit" className="h-10 min-w-20 !text-white">Filter</Button><Button asChild variant="outline" className="h-10 bg-white"><Link href="/admin/interviews">Reset</Link></Button></div>
            </form>

            <InterviewQuestionsTable items={tableItems} />
            <div className="flex flex-col gap-3 rounded-xl bg-blue-50/55 px-4 py-3 dark:bg-white/[0.04] lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2"><InterviewPerPageSelect value={perPage} /><p className="text-sm text-muted-foreground">Showing {totalQuestions ? (page - 1) * perPage + 1 : 0}–{Math.min(page * perPage, totalQuestions)} of {totalQuestions}</p></div>
              <div className="flex flex-wrap items-center gap-1.5">
                {page > 1 ? <Button asChild variant="outline" size="sm" className="bg-white"><Link href={paginationHref(page - 1)}><ChevronLeftIcon className="size-4" />Previous</Link></Button> : <Button variant="outline" size="sm" className="bg-white" disabled><ChevronLeftIcon className="size-4" />Previous</Button>}
                {visiblePages.map((value, index) => <span key={value} className="contents">{index > 0 && value - visiblePages[index - 1] > 1 ? <span className="px-1 text-muted-foreground">…</span> : null}<Button asChild size="sm" variant={value === page ? "default" : "outline"} className={value === page ? "!text-white" : "bg-white"}><Link href={paginationHref(value)}>{value}</Link></Button></span>)}
                {page < totalPages ? <Button asChild variant="outline" size="sm" className="bg-white"><Link href={paginationHref(page + 1)}>Next<ArrowRightIcon className="size-4" /></Link></Button> : <Button variant="outline" size="sm" className="bg-white" disabled>Next<ArrowRightIcon className="size-4" /></Button>}
              </div>
            </div>
          </CardContent>
        </Card>

        {pendingCount ? <div id="moderation"><ModerationQueue questions={pendingQuestions} answers={pendingAnswers} comments={pendingComments} /></div> : null}
      </div>
    </AdminShell>
  );
}

function ModerationQueue({ questions, answers, comments }: { questions: Array<{ id: string; question: string; authorName: string | null; authorEmail: string | null }>; answers: Array<{ id: string; body: string; authorName: string | null; authorEmail: string | null; question: { id: string; question: string } }>; comments: Array<{ id: string; body: string; authorName: string | null; authorEmail: string | null; question: { id: string; question: string } | null; answer: { question: { id: string; question: string } } | null }> }) {
  const items = [
    ...questions.map((item) => ({ type: "QUESTION" as const, id: item.id, questionId: item.id, title: item.question, body: "Question submitted for review", author: item.authorName || item.authorEmail || "Community member" })),
    ...answers.map((item) => ({ type: "ANSWER" as const, id: item.id, questionId: item.question.id, title: item.question.question, body: item.body, author: item.authorName || item.authorEmail || "Community member" })),
    ...comments.map((item) => ({ type: "COMMENT" as const, id: item.id, questionId: item.question?.id || item.answer?.question.id || "", title: item.question?.question || item.answer?.question.question || "Comment", body: item.body, author: item.authorName || item.authorEmail || "Community member" })),
  ];
  return <Card><CardHeader><CardTitle>Moderation queue</CardTitle><CardDescription>Approve or archive community submissions. Every answer stays connected to its question and submitter.</CardDescription></CardHeader><CardContent className="grid gap-3">{items.map((item) => <div key={`${item.type}-${item.id}`} className="flex flex-col gap-3 rounded-xl bg-blue-50/65 p-4 dark:bg-white/[0.05] md:flex-row md:items-center md:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><Badge variant="secondary">{item.type}</Badge><span className="text-xs text-muted-foreground">Submitted by {item.author}</span></div><Link href={`/admin/interviews/${item.questionId}`} className="mt-2 block font-semibold hover:text-primary">{item.title}</Link><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.body}</p></div><div className="flex gap-2"><ModerationButton type={item.type} id={item.id} status="PUBLISHED">Approve</ModerationButton><ModerationButton type={item.type} id={item.id} status="ARCHIVED" outline>Archive</ModerationButton></div></div>)}</CardContent></Card>;
}

function ModerationButton({ type, id, status, children, outline }: { type: "QUESTION" | "ANSWER" | "COMMENT"; id: string; status: "PUBLISHED" | "ARCHIVED"; children: string; outline?: boolean }) {
  return <form action={moderateInterviewContentAction}><input type="hidden" name="type" value={type} /><input type="hidden" name="id" value={id} /><input type="hidden" name="status" value={status} /><Button type="submit" size="sm" variant={outline ? "outline" : "default"} className={outline ? "bg-white" : "!text-white"}>{children}</Button></form>;
}
