import { InterviewDifficulty, InterviewStatus } from "@prisma/client";
import type { ReactNode } from "react";
import { createInterviewQuestionAction } from "@/actions/admin/interviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const difficulties = Object.values(InterviewDifficulty);
const statuses = Object.values(InterviewStatus);
const commonRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Computer Science Fresher",
  "HR Interview",
];
const commonTopics = [
  "React Hooks",
  "JavaScript Closures",
  "REST API",
  "Authentication",
  "Database Indexing",
  "SQL Joins",
  "OOP",
  "Operating System",
  "Self Introduction",
  "Final Year Project",
];
const commonTopicGroups = [
  "React",
  "JavaScript",
  "Backend",
  "Database",
  "SQL",
  "Computer Science",
  "HR",
  "Projects",
];
const experienceOptions = [0, 1, 2, 3, 5, 8, 10];
const fieldClassName =
  "border-slate-300 bg-white text-slate-950 shadow-sm placeholder:text-slate-500 focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-300 dark:bg-white dark:text-slate-950 dark:placeholder:text-slate-500";
const selectClassName =
  "h-11 w-full border-slate-300 bg-white text-slate-950 shadow-sm focus-visible:border-primary focus-visible:ring-primary/20 dark:border-slate-300 dark:bg-white dark:text-slate-950";

type InterviewQuestionFormData = {
  id?: string;
  question?: string;
  context?: string | null;
  shortAnswer?: string | null;
  answer?: string;
  expectedPoints?: string[];
  commonMistakes?: string[];
  followUps?: string[];
  role?: { title?: string | null; aliases?: string[] | null } | null;
  topic?: { title?: string | null; group?: string | null } | null;
  difficulty?: InterviewDifficulty;
  experienceMin?: number;
  experienceMax?: number | null;
  tags?: string[];
  status?: InterviewStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sourceNote?: string | null;
};

function listValue(value: string[] | undefined) {
  return (value || []).join("\n");
}

function mergeOptions(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((item) => item?.trim()).filter(Boolean) as string[]));
}

function FormSection({
  title,
  description,
  tone,
  children,
}: {
  title: string;
  description: string;
  tone: "blue" | "emerald" | "amber" | "violet";
  children: ReactNode;
}) {
  const toneClasses = {
    blue: "border-blue-200 bg-blue-50/70 shadow-blue-950/5",
    emerald: "border-emerald-200 bg-emerald-50/70 shadow-emerald-950/5",
    amber: "border-amber-200 bg-amber-50/75 shadow-amber-950/5",
    violet: "border-violet-200 bg-violet-50/70 shadow-violet-950/5",
  }[tone];
  const dividerClasses = {
    blue: "border-blue-200",
    emerald: "border-emerald-200",
    amber: "border-amber-200",
    violet: "border-violet-200",
  }[tone];

  return (
    <section className={`rounded-xl border p-4 shadow-sm ${toneClasses}`}>
      <div className={`mb-4 border-b pb-3 ${dividerClasses}`}>
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function InterviewQuestionForm({
  action = createInterviewQuestionAction,
  question,
  roleOptions = [],
  topicOptions = [],
  topicGroupOptions = [],
  submitLabel = "Save question",
  className = "",
}: {
  action?: (formData: FormData) => void | Promise<void>;
  question?: InterviewQuestionFormData;
  roleOptions?: string[];
  topicOptions?: string[];
  topicGroupOptions?: string[];
  submitLabel?: string;
  className?: string;
}) {
  const roleChoices = mergeOptions([question?.role?.title, ...roleOptions, ...commonRoles]);
  const topicChoices = mergeOptions([question?.topic?.title, ...topicOptions, ...commonTopics]);
  const topicGroupChoices = mergeOptions([question?.topic?.group, ...topicGroupOptions, ...commonTopicGroups]);
  const selectedRole = question?.role?.title || roleChoices[0] || "Frontend Developer";
  const selectedTopic = question?.topic?.title || topicChoices[0] || "React Hooks";
  const selectedTopicGroup = question?.topic?.group || topicGroupChoices[0] || "React";

  return (
    <form
      action={action}
      className={["grid gap-6", className].filter(Boolean).join(" ")}
    >
      {question?.id ? <input type="hidden" name="id" value={question.id} /> : null}
      <input type="hidden" name="roleAliases" value={(question?.role?.aliases || []).join(", ")} />

      <FormSection
        title="Question basics"
        description="Role, topic, and question text. These power public filters and question pages."
        tone="blue"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select name="roleTitle" defaultValue={selectedRole}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roleChoices.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Topic</Label>
            <Select name="topicTitle" defaultValue={selectedTopic}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topicChoices.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Topic group</Label>
            <Select name="topicGroup" defaultValue={selectedTopicGroup}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {topicGroupChoices.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Difficulty</Label>
            <Select name="difficulty" defaultValue={question?.difficulty || "INTERMEDIATE"}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              name="question"
              required
              rows={3}
              defaultValue={question?.question || ""}
              placeholder="What is the difference between useEffect and useMemo in React?"
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="context">Interview context</Label>
            <Textarea
              id="context"
              name="context"
              rows={3}
              defaultValue={question?.context || ""}
              placeholder="Why this question is asked, round type, or what the interviewer wants to test."
              className={fieldClassName}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Answer content"
        description="Short preview plus full answer students can actually speak in an interview."
        tone="emerald"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="shortAnswer">Short answer</Label>
            <Textarea
              id="shortAnswer"
              name="shortAnswer"
              rows={2}
              defaultValue={question?.shortAnswer || ""}
              placeholder="A concise answer for preview cards and snippets."
              className={fieldClassName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="answer">Full answer</Label>
            <Textarea
              id="answer"
              name="answer"
              required
              rows={8}
              defaultValue={question?.answer || ""}
              placeholder="Write a clear, interview-ready answer with examples, tradeoffs, and follow-up points."
              className={fieldClassName}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Answer guidance"
        description="Optional lists that make the public detail page more useful."
        tone="amber"
      >
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="expectedPoints">Expected points</Label>
            <Textarea
              id="expectedPoints"
              name="expectedPoints"
              rows={5}
              defaultValue={listValue(question?.expectedPoints)}
              placeholder="One point per line"
              className={fieldClassName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="commonMistakes">Common mistakes</Label>
            <Textarea
              id="commonMistakes"
              name="commonMistakes"
              rows={5}
              defaultValue={listValue(question?.commonMistakes)}
              placeholder="Mistakes freshers make"
              className={fieldClassName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="followUps">Follow-up questions</Label>
            <Textarea
              id="followUps"
              name="followUps"
              rows={5}
              defaultValue={listValue(question?.followUps)}
              placeholder="Likely follow-up questions"
              className={fieldClassName}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Publishing and SEO"
        description="Status, tags, and search snippets for the public question page."
        tone="violet"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Min exp</Label>
            <Select name="experienceMin" defaultValue={String(question?.experienceMin ?? 0)}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select min exp" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((item) => (
                  <SelectItem key={item} value={String(item)}>
                    {item} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Max exp</Label>
            <Select name="experienceMax" defaultValue={String(question?.experienceMax ?? 3)}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select max exp" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.slice(1).map((item) => (
                  <SelectItem key={item} value={String(item)}>
                    {item} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={question?.status || "PUBLISHED"}>
              <SelectTrigger className={selectClassName}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={(question?.tags || []).join(", ")}
              placeholder="react, hooks, frontend, fresher"
              className={fieldClassName}
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="seoTitle">SEO title</Label>
              <Input
                id="seoTitle"
                name="seoTitle"
                defaultValue={question?.seoTitle || ""}
                placeholder="useEffect vs useMemo Interview Question and Answer"
                className={fieldClassName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Input
                id="seoDescription"
                name="seoDescription"
                defaultValue={question?.seoDescription || ""}
                placeholder="Practice a clear interview answer with expected points and follow-up questions."
                className={fieldClassName}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sourceNote">Source note</Label>
            <Input
              id="sourceNote"
              name="sourceNote"
              defaultValue={question?.sourceNote || ""}
              placeholder="Internal review note, source, or version reference"
              className={fieldClassName}
            />
          </div>
        </div>
      </FormSection>

      <Button type="submit" size="lg" className="justify-self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
