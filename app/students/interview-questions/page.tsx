import type { Metadata } from "next";
import Link from "next/link";
import { InterviewDifficulty, InterviewStatus, Prisma } from "@prisma/client";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  MessageSquarePlus,
  Search,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { auth } from "@/auth";
import { AskInterviewQuestionForm } from "@/components/site/ask-interview-question-form";
import { InterviewQuestionSearch } from "@/components/site/interview-question-search";
import { BreadcrumbStructuredData, JsonLd } from "@/components/site/structured-data";
import { siteButtonClasses } from "@/components/site/site-button";
import { siteContainerClasses } from "@/components/site/site-container";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

const db = prisma;

type InterviewQuestionSearchParams = Promise<{
  q?: string;
  role?: string;
  topic?: string;
  difficulty?: string;
  answer?: string;
  sort?: string;
  submitted?: string;
}>;

const pageUrl = "https://www.getkasa.in/students/interview-questions";
const awaitingAnswer = "Community question awaiting approved answers.";
const pageTitle = "Interview Questions and Answers for Freshers";
const pageDescription =
  "Practice interview questions and answers for freshers, final-year projects, HR and technical rounds. Search by role, topic, difficulty and answer status.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: InterviewQuestionSearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasFilters = Boolean(
    cleanQuery(params.q) ||
      cleanQuery(params.role) ||
      cleanQuery(params.topic) ||
      cleanQuery(params.difficulty) ||
      cleanQuery(params.answer) ||
      (cleanQuery(params.sort) && params.sort !== "relevant") ||
      params.submitted,
  );

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "interview questions and answers",
      "interview questions for freshers",
      "HR interview questions",
      "technical interview questions",
      "project interview questions",
      "frontend interview questions",
      "backend interview questions",
      "DBMS interview questions",
    ],
    alternates: { canonical: pageUrl },
    robots: {
      index: !hasFilters,
      follow: true,
      googleBot: {
        index: !hasFilters,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: `${pageTitle} | KASA`,
      description: pageDescription,
      url: pageUrl,
      siteName: "KASA",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/kasa-hero.png",
          width: 1200,
          height: 630,
          alt: "Interview questions and answers for students and freshers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | KASA`,
      description: pageDescription,
      images: ["/kasa-hero.png"],
    },
  };
}
const prepTracks = [
  {
    title: "HR interview answers",
    body: "Prepare simple answers for self introduction, strengths, weakness, internships, career goals, and fresher confidence questions.",
  },
  {
    title: "Final year project viva",
    body: "Learn how to explain problem statement, users, tech stack, database, APIs, authentication, deployment, and your exact contribution.",
  },
  {
    title: "Technical fundamentals",
    body: "Revise DBMS, operating system, OOP, SQL, REST APIs, authentication, JavaScript, React, backend and full stack interview topics.",
  },
];
const practiceSteps = [
  "Search a role or topic before reading answers.",
  "Open one question and speak the answer aloud.",
  "Check expected points, mistakes, and follow-up questions.",
  "Add a better answer or comment when you have a clearer explanation.",
];
const intentLinks = [
  "fresher interview questions",
  "HR interview questions",
  "final year project interview",
  "React interview questions",
  "DBMS interview questions",
  "SQL interview questions",
  "backend interview questions",
  "full stack interview questions",
];
const actionButtonClassName =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--button-solid)] px-5 text-sm font-semibold text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:opacity-95";

function cleanQuery(value: string | undefined) {
  return (value || "").trim().slice(0, 80);
}

function displayDifficulty(value: InterviewDifficulty) {
  return value.replaceAll("_", " ").toLowerCase();
}

function normalizedQuestion(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default async function InterviewQuestionsPage({
  searchParams,
}: {
  searchParams: InterviewQuestionSearchParams;
}) {
  const params = await searchParams;
  const q = cleanQuery(params.q);
  const role = cleanQuery(params.role);
  const topic = cleanQuery(params.topic);
  const difficulty = Object.values(InterviewDifficulty).includes(params.difficulty as InterviewDifficulty)
    ? (params.difficulty as InterviewDifficulty)
    : "";
  const answer = ["answered", "unanswered"].includes(params.answer || "") ? params.answer || "" : "";
  const sort = ["latest", "popular", "discussed"].includes(params.sort || "") ? params.sort || "" : "relevant";

  const where = {
    status: InterviewStatus.PUBLISHED,
    ...(role ? { role: { slug: role } } : {}),
    ...(topic ? { topic: { slug: topic } } : {}),
    ...(difficulty ? { difficulty } : {}),
    ...(answer === "answered" ? { answers: { some: { status: InterviewStatus.PUBLISHED } } } : {}),
    ...(answer === "unanswered" ? { answers: { none: { status: InterviewStatus.PUBLISHED } } } : {}),
    ...(q
      ? {
          OR: [
            { question: { contains: q, mode: "insensitive" as const } },
            { shortAnswer: { contains: q, mode: "insensitive" as const } },
            { answer: { contains: q, mode: "insensitive" as const } },
            { tags: { has: q.toLowerCase() } },
            { role: { title: { contains: q, mode: "insensitive" as const } } },
            { topic: { title: { contains: q, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  };
  const orderBy: Prisma.InterviewQuestionOrderByWithRelationInput[] =
    sort === "latest"
      ? [{ publishedAt: "desc" }, { createdAt: "desc" }]
      : sort === "popular"
        ? [{ voteScore: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }]
        : sort === "discussed"
          ? [{ comments: { _count: "desc" } }, { publishedAt: "desc" }, { createdAt: "desc" }]
          : q
            ? [{ voteScore: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }]
            : [{ publishedAt: "desc" }, { voteScore: "desc" }, { createdAt: "desc" }];

  const [session, questions, roles, topics, stats] = await Promise.all([
    auth(),
    db.interviewQuestion.findMany({
      where,
      orderBy,
      take: 40,
      include: {
        role: true,
        topic: true,
        _count: {
          select: {
            answers: { where: { status: InterviewStatus.PUBLISHED } },
            comments: { where: { status: InterviewStatus.PUBLISHED } },
          },
        },
      },
    }),
    db.interviewRole.findMany({
      where: { questions: { some: { status: InterviewStatus.PUBLISHED } } },
      orderBy: { title: "asc" },
      take: 50,
    }),
    db.interviewTopic.findMany({
      where: { questions: { some: { status: InterviewStatus.PUBLISHED } } },
      orderBy: { title: "asc" },
      take: 60,
    }),
    db.$transaction([
      db.interviewQuestion.count({ where: { status: InterviewStatus.PUBLISHED } }),
      db.interviewAnswer.count({ where: { status: InterviewStatus.PUBLISHED } }),
      db.interviewComment.count({ where: { status: InterviewStatus.PUBLISHED } }),
    ]),
  ]);
  const isLoggedIn = Boolean(session?.user?.id);
  const preferredQuestions = new Map<string, (typeof questions)[number]>();
  questions.forEach((item) => {
    const key = normalizedQuestion(item.question);
    const current = preferredQuestions.get(key);
    if (!current || (current.isCommunity && !item.isCommunity)) {
      preferredQuestions.set(key, item);
    }
  });
  const visibleQuestions = questions.filter(
    (item) => preferredQuestions.get(normalizedQuestion(item.question))?.id === item.id,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Interview Questions and Answers Community",
    url: pageUrl,
    description:
      "Database-backed interview questions and answers community for freshers, students, and job seekers.",
    isPartOf: { "@id": "https://www.getkasa.in/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visibleQuestions.length,
      itemListElement: visibleQuestions.slice(0, 40).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${pageUrl}/${item.slug}`,
        item: {
          "@type": "Question",
          "@id": `${pageUrl}/${item.slug}#question`,
          name: item.question,
          text: item.context || item.question,
          answerCount:
            item._count.answers +
            (item.answer && item.answer !== awaitingAnswer ? 1 : 0),
        },
      })),
    },
  };

  return (
    <div className="bg-background text-foreground">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", href: "/" },
          { name: "Students", href: "/students" },
          { name: "Interview Questions", href: "/students/interview-questions" },
        ]}
      />
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden px-4 pb-10 pt-[8.25rem] sm:px-6 sm:pt-[9.25rem] lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface-muted via-background to-surface-strong" />
        <div className={siteContainerClasses({ className: "relative" })}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                <Sparkles className="size-4" aria-hidden="true" />
                Interview questions and answers
              </div>
              <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.6rem]">
                Practice interview questions for freshers, projects, HR and technical rounds.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Search clear, interview-ready answers by role, topic and difficulty. Use the pages for spoken practice,
                quick revision, final year project viva preparation, and follow-up question discussion.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {intentLinks.slice(0, 6).map((item) => (
                  <a
                    key={item}
                    href={`#questions`}
                    className="rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#questions" className={siteButtonClasses({ size: "lg" })}>
                  Browse questions
                  <Search className="size-4" aria-hidden="true" />
                </a>
                <a href="#ask" className={siteButtonClasses({ variant: "outline", size: "lg" })}>
                  Ask a question
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card/90 p-5 text-card-foreground shadow-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Live practice index</p>
                  <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground">Start with the right round</h2>
                </div>
                <BookOpenCheck className="size-6 text-primary" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3">
                {prepTracks.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-surface-muted p-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Questions", value: stats[0] },
                  { label: "Answers", value: stats[1] },
                  { label: "Comments", value: stats[2] },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-card p-3 text-center">
                    <div className="font-heading text-2xl font-semibold text-foreground">{item.value}</div>
                    <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[108rem]">
          {params.submitted ? (
            <div className="mb-5 rounded-[1rem] border border-primary/25 bg-primary/10 p-4 text-sm font-medium text-primary">
              Thanks. Your {params.submitted} has been sent for review and will appear after approval.
            </div>
          ) : null}

          <InterviewQuestionSearch
            q={q}
            role={role}
            topic={topic}
            difficulty={difficulty}
            answer={answer}
            sort={sort}
            roles={roles.map((item) => ({ id: item.id, title: item.title, slug: item.slug }))}
            topics={topics.map((item) => ({ id: item.id, title: item.title, slug: item.slug }))}
            suggestions={Array.from(
              new Set([
                ...intentLinks,
                ...roles.slice(0, 8).map((item) => item.title),
                ...topics.slice(0, 8).map((item) => item.title),
              ]),
            )}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-muted-foreground">
            <p>
              {visibleQuestions.length
                ? `Showing ${visibleQuestions.length} matching question${visibleQuestions.length === 1 ? "" : "s"}.`
                : "No questions match these filters yet."}
            </p>
            {q || role || topic || difficulty || answer || sort !== "relevant" ? (
              <Link href="/students/interview-questions#questions" className="font-semibold text-primary transition hover:text-primary/75">
                Reset all filters
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_24rem]">
            <div className="grid gap-4">
              {visibleQuestions.map((item) => (
                <article key={item.id} className="rounded-[1.2rem] border border-border bg-card p-5 text-card-foreground shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {item.role ? <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.role.title}</span> : null}
                    {item.topic ? <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{item.topic.title}</span> : null}
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{displayDifficulty(item.difficulty)}</span>
                  </div>

                  <Link href={`/students/interview-questions/${item.slug}`} className="group mt-4 block">
                    <h2 className="font-heading text-2xl font-semibold leading-tight text-foreground transition group-hover:text-primary">
                      {item.question}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {item.shortAnswer || item.answer}
                    </p>
                  </Link>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-4" /> {item.voteScore} votes</span>
                    <span>{item._count.answers} answers</span>
                    <span>{item._count.comments} comments</span>
                    <Link href={`/students/interview-questions/${item.slug}`} className="ml-auto inline-flex items-center gap-2 font-semibold text-primary">
                      Join discussion
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}

              {!visibleQuestions.length ? (
                <div className="rounded-[1.2rem] border border-dashed border-border bg-surface-muted p-8 text-center">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">No approved questions found</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Ask the first question for this role or topic. It will appear after moderation.</p>
                </div>
              ) : null}
            </div>

            <aside id="ask" className="h-fit self-start rounded-[1.5rem] border border-border bg-gradient-to-b from-surface-muted via-card to-background p-5 text-card-foreground shadow-xl lg:sticky lg:top-28">
              <h2 className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
                <MessageSquarePlus className="size-5 text-primary" aria-hidden="true" />
                Ask an interview question
              </h2>

              {isLoggedIn ? (
                <AskInterviewQuestionForm
                  roles={roles.map((item) => ({ id: item.id, title: item.title }))}
                  topics={topics.map((item) => ({ id: item.id, title: item.title }))}
                />
              ) : (
                <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Login required. Create a free account so your questions, answers, votes, and comments stay connected to one profile.
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    <Link href="/login?callbackUrl=/students/interview-questions%23ask" className={`h-11 ${actionButtonClassName}`}>
                      Login to ask
                    </Link>
                    <Link href="/signup?callbackUrl=/students/interview-questions%23ask" className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-accent">
                      Create account
                    </Link>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div className={siteContainerClasses()}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.35rem] border border-border bg-card p-6 text-card-foreground shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                How to practice
              </div>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground">
                Use each answer as a speaking script, not just reading material.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Interview preparation works best when you can explain an answer in your own words. Use KASA to find the
                question, understand the expected points, then speak a short version and a detailed version.
              </p>
              <ol className="mt-5 grid gap-3">
                {practiceSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-2xl border border-border bg-surface-muted p-4 text-sm leading-6 text-foreground">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[image:var(--button-solid)] text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[1.35rem] border border-border bg-card p-6 text-card-foreground shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Search className="size-4" aria-hidden="true" />
                  Popular preparation areas
                </div>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                  Search by role, topic, round type, or interview difficulty.
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {intentLinks.map((item) => (
                    <a
                      key={item}
                      href="#questions"
                      className="rounded-full border border-border bg-surface-muted px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/35 hover:text-primary"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-border bg-card p-6 text-card-foreground shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <MessageSquarePlus className="size-4" aria-hidden="true" />
                  Community review
                </div>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
                  Add missing questions and improve answers with real interview context.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  If a company asked you a different version of a question, post it with role and topic. Approved
                  contributions become public pages, so other students can prepare from practical examples instead of
                  memorising random lists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
