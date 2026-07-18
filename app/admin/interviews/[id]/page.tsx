import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  BookOpenCheckIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  SearchCheckIcon,
  SendIcon,
  TagsIcon,
  Trash2Icon,
} from "lucide-react";
import {
  deleteInterviewQuestionAction,
  updateInterviewQuestionClassificationAction,
  updateInterviewQuestionContentAction,
  updateInterviewQuestionGuidanceAction,
  updateInterviewQuestionPublishingAction,
  updateInterviewQuestionSeoAction,
} from "@/actions/admin/interviews";
import { ConfirmActionButton } from "@/components/admin/confirm-action-button";
import {
  adminSelectClass,
  adminTextInputClass,
  adminTextareaClass,
} from "@/components/admin/articles/article-admin-primitives";
import { InterviewSaveToast } from "@/components/admin/interviews/interview-save-toast";
import { InterviewQuestionTitleField } from "@/components/admin/interviews/interview-question-title-field";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ saved?: string; created?: string; error?: string }>;

function listValue(items: string[]) {
  return items.join("\n");
}

export default async function InterviewQuestionStudio({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const admin = await requireAdmin();
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [question, roles, topics] = await Promise.all([
    prisma.interviewQuestion.findUnique({ where: { id }, include: { role: true, topic: true, _count: { select: { answers: true, comments: true } } } }),
    prisma.interviewRole.findMany({ orderBy: { title: "asc" }, take: 100 }),
    prisma.interviewTopic.findMany({ orderBy: { title: "asc" }, take: 140 }),
  ]);
  if (!question) notFound();

  const contentReady = question.answer.trim().length >= 40;
  const taxonomyReady = Boolean(question.roleId && question.topicId);
  const seoReady = Boolean(question.seoTitle && question.seoDescription);
  const completeCount = [contentReady, taxonomyReady, seoReady].filter(Boolean).length;

  return (
    <AdminShell adminName={admin.name} adminEmail={admin.email} pageTitle={question.question} pageDescription="Edit this question in focused sections." showHero={false} headerContent={
      <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground"><Link href="/admin" className="hover:text-foreground">Admin</Link><ChevronRightIcon className="size-4" /><Link href="/admin/interviews" className="hover:text-foreground">Interview Q&A</Link><ChevronRightIcon className="size-4" /><span className="truncate text-foreground">Details</span></div>
    }>
      <div className="grid gap-6">
        <InterviewSaveToast saved={query.saved} created={query.created} error={query.error} />

        <section className="rounded-2xl border border-blue-200 bg-[linear-gradient(135deg,#ffffff_0%,#eff7ff_58%,#e8fff4_100%)] p-5 shadow-sm shadow-blue-950/5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,.94),rgba(15,59,117,.55),rgba(6,78,59,.25))] xl:sticky xl:top-16 xl:z-20 xl:p-4 xl:shadow-lg xl:backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><Badge variant={question.status === "PUBLISHED" ? "default" : "secondary"}>{question.status}</Badge><Badge variant="outline">{completeCount}/3 ready</Badge><span className="text-sm text-muted-foreground">Updated {question.updatedAt.toLocaleDateString("en-IN")}</span></div>
              <h1 className="mt-3 line-clamp-2 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white xl:line-clamp-1 xl:text-xl">{question.question}</h1>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button asChild variant="outline" className="bg-white"><Link href="/admin/interviews"><ArrowLeftIcon className="size-4" />Back</Link></Button>
              {question.status === "PUBLISHED" ? <Button asChild variant="outline" size="icon" className="bg-white" title="Open public page"><Link href={`/students/interview-questions/${question.slug}`} target="_blank"><ExternalLinkIcon className="size-4" /></Link></Button> : null}
              <ConfirmActionButton action={deleteInterviewQuestionAction} fields={[{ name: "id", value: question.id }]} icon={Trash2Icon} label="Delete" title="Delete this question?" description="This permanently removes the question, answers, comments, and votes." confirmLabel="Delete" variant="outline" confirmVariant="destructive" />
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid gap-6">
            <SectionCard icon={<BookOpenCheckIcon className="size-5" />} title="Question content">
              <form action={updateInterviewQuestionContentAction} className="grid gap-4">
                <input type="hidden" name="id" value={question.id} />
                <InterviewQuestionTitleField initialQuestion={question.question} />
                <Field label="Context" htmlFor="context"><Textarea id="context" name="context" rows={3} defaultValue={question.context || ""} placeholder="Why an interviewer asks this or when it matters" className={adminTextareaClass} /></Field>
                <Field label="Short answer" htmlFor="shortAnswer"><Textarea id="shortAnswer" name="shortAnswer" rows={3} defaultValue={question.shortAnswer || ""} placeholder="Concise answer used on listing cards" className={adminTextareaClass} /></Field>
                <Field label="Full answer" htmlFor="answer"><Textarea id="answer" name="answer" rows={12} defaultValue={question.answer} placeholder="Write the interview-ready explanation with examples and trade-offs" className={adminTextareaClass} /></Field>
                <SaveButton>Save content</SaveButton>
              </form>
            </SectionCard>

            <SectionCard icon={<ClipboardCheckIcon className="size-5" />} title="Answer guidance">
              <form action={updateInterviewQuestionGuidanceAction} className="grid gap-4">
                <input type="hidden" name="id" value={question.id} />
                <Field label="Key points" htmlFor="expectedPoints"><Textarea id="expectedPoints" name="expectedPoints" rows={5} defaultValue={listValue(question.expectedPoints)} placeholder="One point per line" className={adminTextareaClass} /></Field>
                <Field label="Common mistakes" htmlFor="commonMistakes"><Textarea id="commonMistakes" name="commonMistakes" rows={5} defaultValue={listValue(question.commonMistakes)} placeholder="One mistake per line" className={adminTextareaClass} /></Field>
                <Field label="Follow-up questions" htmlFor="followUps"><Textarea id="followUps" name="followUps" rows={5} defaultValue={listValue(question.followUps)} placeholder="One follow-up per line" className={adminTextareaClass} /></Field>
                <SaveButton>Save guidance</SaveButton>
              </form>
            </SectionCard>

            <SectionCard icon={<SearchCheckIcon className="size-5" />} title="Search preview">
              <form action={updateInterviewQuestionSeoAction} className="grid gap-4">
                <input type="hidden" name="id" value={question.id} />
                <div className="rounded-2xl border border-blue-200 bg-blue-50/55 p-5 dark:border-white/10 dark:bg-white/[0.04]"><p className="text-lg font-semibold text-primary dark:text-blue-200">{question.seoTitle || question.question}</p><p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">/students/interview-questions/{question.slug}</p><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{question.seoDescription || question.shortAnswer || "Add a clear search description for this question."}</p></div>
                <Field label="SEO title" htmlFor="seoTitle"><Input id="seoTitle" name="seoTitle" maxLength={80} defaultValue={question.seoTitle || ""} className={adminTextInputClass} /></Field>
                <Field label="SEO description" htmlFor="seoDescription"><Textarea id="seoDescription" name="seoDescription" maxLength={220} rows={4} defaultValue={question.seoDescription || ""} className={adminTextareaClass} /></Field>
                <Field label="Source note" htmlFor="sourceNote"><Input id="sourceNote" name="sourceNote" maxLength={300} defaultValue={question.sourceNote || ""} className={adminTextInputClass} /></Field>
                <SaveButton>Save SEO</SaveButton>
              </form>
            </SectionCard>
          </div>

          <aside className="grid h-fit self-start gap-6 xl:sticky xl:top-44">
            <SectionCard icon={<SendIcon className="size-5" />} title="Publish">
              <form action={updateInterviewQuestionPublishingAction} className="grid gap-4">
                <input type="hidden" name="id" value={question.id} />
                <Field label="Status" htmlFor="status"><select id="status" name="status" defaultValue={question.status} className={adminSelectClass}><option value="DRAFT">Draft</option><option value="REVIEW">Review</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select></Field>
                <div className="grid gap-2 text-sm">
                  <Readiness ready={contentReady}>Complete answer</Readiness><Readiness ready={taxonomyReady}>Role and topic</Readiness><Readiness ready={seoReady}>SEO title and description</Readiness>
                </div>
                <Button type="submit" className="h-11 !text-white">Save publishing</Button>
              </form>
            </SectionCard>

            <SectionCard icon={<TagsIcon className="size-5" />} title="Classification">
              <form action={updateInterviewQuestionClassificationAction} className="grid gap-4">
                <input type="hidden" name="id" value={question.id} />
                <Field label="Interview role" htmlFor="roleTitle"><Input id="roleTitle" name="roleTitle" list="role-options" required defaultValue={question.role?.title || ""} className={adminTextInputClass} /><datalist id="role-options">{roles.map((item) => <option key={item.id} value={item.title} />)}</datalist></Field>
                <Field label="Role aliases" htmlFor="roleAliases"><Input id="roleAliases" name="roleAliases" defaultValue={question.role?.aliases.join(", ") || ""} placeholder="Comma separated" className={adminTextInputClass} /></Field>
                <Field label="Topic" htmlFor="topicTitle"><Input id="topicTitle" name="topicTitle" list="topic-options" required defaultValue={question.topic?.title || ""} className={adminTextInputClass} /><datalist id="topic-options">{topics.map((item) => <option key={item.id} value={item.title} />)}</datalist></Field>
                <Field label="Topic group" htmlFor="topicGroup"><Input id="topicGroup" name="topicGroup" defaultValue={question.topic?.group || ""} className={adminTextInputClass} /></Field>
                <Field label="Difficulty" htmlFor="difficulty"><select id="difficulty" name="difficulty" defaultValue={question.difficulty} className={adminSelectClass}><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option><option value="SYSTEM_DESIGN">System design</option></select></Field>
                <div className="grid grid-cols-2 gap-3"><Field label="Min years" htmlFor="experienceMin"><Input id="experienceMin" name="experienceMin" type="number" min={0} max={30} defaultValue={question.experienceMin} className={adminTextInputClass} /></Field><Field label="Max years" htmlFor="experienceMax"><Input id="experienceMax" name="experienceMax" type="number" min={0} max={30} defaultValue={question.experienceMax || ""} className={adminTextInputClass} /></Field></div>
                <Field label="Tags" htmlFor="tags"><Textarea id="tags" name="tags" rows={3} defaultValue={question.tags.join(", ")} placeholder="Comma separated" className={adminTextareaClass} /></Field>
                <Button type="submit" className="h-11 !text-white">Save classification</Button>
              </form>
            </SectionCard>
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}

function SectionCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <Card><CardHeader><div className="flex items-center gap-3"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-primary dark:bg-white/10 dark:text-blue-100">{icon}</div><CardTitle>{title}</CardTitle></div></CardHeader><CardContent>{children}</CardContent></Card>;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return <div className="grid gap-2"><Label htmlFor={htmlFor}>{label}</Label>{children}</div>;
}

function SaveButton({ children }: { children: ReactNode }) {
  return <div className="flex justify-end"><Button type="submit" className="h-11 min-w-36 !text-white">{children}</Button></div>;
}

function Readiness({ ready, children }: { ready: boolean; children: ReactNode }) {
  return <div className="flex items-center gap-2"><CheckCircle2Icon className={ready ? "size-4 text-emerald-600" : "size-4 text-slate-400"} /><span className={ready ? "text-foreground" : "text-muted-foreground"}>{children}</span></div>;
}
