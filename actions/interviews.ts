"use server";

import { InterviewStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { formObject } from "@/actions/admin/action-utils";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";
import {
  answerInterviewQuestionSchema,
  askInterviewQuestionSchema,
  commentInterviewSchema,
  moderateInterviewContentSchema,
  voteInterviewSchema,
} from "@/schemas/interviews";

const db = prisma;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

async function uniqueQuestionSlug(question: string) {
  const base = slugify(question) || "interview-question";
  let candidate = base;
  let suffix = 2;
  while (await db.interviewQuestion.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

async function requireCommunityUser(callbackUrl: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return {
    id: session.user.id,
    name: session.user.name || "KASA member",
    email: session.user.email || null,
  };
}

async function getVoterKey() {
  const session = await auth();
  if (session?.user?.id) return `user:${session.user.id}`;

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "local";
  const agent = headerList.get("user-agent") || "unknown";
  return `guest:${ip}:${agent.slice(0, 120)}`;
}

async function upsertRoleAndTopic(roleTitle: string, topicTitle: string) {
  const roleSlug = slugify(roleTitle);
  const topicSlug = slugify(topicTitle);
  const [role, topic] = await Promise.all([
    db.interviewRole.upsert({
      where: { slug: roleSlug },
      update: { title: roleTitle },
      create: { title: roleTitle, slug: roleSlug },
    }),
    db.interviewTopic.upsert({
      where: { slug: topicSlug },
      update: { title: topicTitle },
      create: { title: topicTitle, slug: topicSlug },
    }),
  ]);

  return { role, topic };
}

export async function askInterviewQuestionAction(formData: FormData) {
  const parsed = askInterviewQuestionSchema.parse(formObject(formData));
  const authorUser = await requireCommunityUser("/students/interview-questions#ask");
  const { role, topic } = await upsertRoleAndTopic(parsed.roleTitle, parsed.topicTitle);
  const questionSlug = await uniqueQuestionSlug(parsed.question);

  await db.interviewQuestion.create({
    data: {
      slug: questionSlug,
      question: parsed.question,
      context: parsed.context || null,
      answer: "Community question awaiting approved answers.",
      roleId: role.id,
      topicId: topic.id,
      status: InterviewStatus.REVIEW,
      isCommunity: true,
      authorName: authorUser.name,
      authorEmail: authorUser.email,
      createdById: authorUser.id,
    },
  });

  revalidatePath("/students/interview-questions");
  revalidatePath("/admin/interviews");
  redirect("/students/interview-questions?submitted=question");
}

export async function answerInterviewQuestionAction(formData: FormData) {
  const parsed = answerInterviewQuestionSchema.parse(formObject(formData));
  const authorUser = await requireCommunityUser(`/students/interview-questions/${parsed.slug}#answer`);

  await db.interviewAnswer.create({
    data: {
      questionId: parsed.questionId,
      body: parsed.body,
      authorName: authorUser.name,
      authorEmail: authorUser.email,
      userId: authorUser.id,
      status: InterviewStatus.REVIEW,
    },
  });

  revalidatePath(`/students/interview-questions/${parsed.slug}`);
  revalidatePath("/admin/interviews");
  redirect(`/students/interview-questions/${parsed.slug}?submitted=answer`);
}

export async function commentInterviewAction(formData: FormData) {
  const parsed = commentInterviewSchema.parse(formObject(formData));
  const authorUser = await requireCommunityUser(`/students/interview-questions/${parsed.slug}`);
  const questionId = parsed.questionId || null;
  const answerId = parsed.answerId || null;

  if (!questionId && !answerId) {
    throw new Error("Comment target is required.");
  }

  await db.interviewComment.create({
    data: {
      questionId,
      answerId,
      body: parsed.body,
      authorName: authorUser.name,
      authorEmail: authorUser.email,
      userId: authorUser.id,
      status: InterviewStatus.REVIEW,
    },
  });

  revalidatePath(`/students/interview-questions/${parsed.slug}`);
  revalidatePath("/admin/interviews");
  redirect(`/students/interview-questions/${parsed.slug}?submitted=comment`);
}

export async function voteInterviewAction(formData: FormData) {
  const parsed = voteInterviewSchema.parse(formObject(formData));
  await requireCommunityUser(`/students/interview-questions/${parsed.slug}`);
  const voterKey = await getVoterKey();
  const target = parsed.target;
  const where =
    target === "QUESTION"
      ? { target, questionId: parsed.targetId, voterKey }
      : target === "ANSWER"
        ? { target, answerId: parsed.targetId, voterKey }
        : { target, commentId: parsed.targetId, voterKey };

  await db.$transaction(async (tx) => {
    const existing = await tx.interviewVote.findFirst({ where });
    const previousValue = existing?.value || 0;
    const nextValue = existing?.value === parsed.value ? 0 : parsed.value;
    const delta = nextValue - previousValue;

    if (existing && nextValue === 0) {
      await tx.interviewVote.delete({ where: { id: existing.id } });
    } else if (existing) {
      await tx.interviewVote.update({
        where: { id: existing.id },
        data: { value: nextValue },
      });
    } else {
      await tx.interviewVote.create({
        data: {
          target,
          value: nextValue,
          voterKey,
          questionId: target === "QUESTION" ? parsed.targetId : null,
          answerId: target === "ANSWER" ? parsed.targetId : null,
          commentId: target === "COMMENT" ? parsed.targetId : null,
        },
      });
    }

    if (delta) {
      if (target === "QUESTION") {
        await tx.interviewQuestion.update({
          where: { id: parsed.targetId },
          data: { voteScore: { increment: delta } },
        });
      } else if (target === "ANSWER") {
        await tx.interviewAnswer.update({
          where: { id: parsed.targetId },
          data: { voteScore: { increment: delta } },
        });
      } else {
        await tx.interviewComment.update({
          where: { id: parsed.targetId },
          data: { voteScore: { increment: delta } },
        });
      }
    }
  });

  revalidatePath(`/students/interview-questions/${parsed.slug}`);
  redirect(`/students/interview-questions/${parsed.slug}`);
}

export async function moderateInterviewContentAction(formData: FormData) {
  await requireAdmin();
  const parsed = moderateInterviewContentSchema.parse(formObject(formData));
  const status = parsed.status as InterviewStatus;
  const publishedAt = status === InterviewStatus.PUBLISHED ? new Date() : null;

  if (parsed.type === "QUESTION") {
    await db.interviewQuestion.update({
      where: { id: parsed.id },
      data: { status, publishedAt },
    });
  } else if (parsed.type === "ANSWER") {
    await db.interviewAnswer.update({
      where: { id: parsed.id },
      data: { status, publishedAt },
    });
  } else {
    await db.interviewComment.update({
      where: { id: parsed.id },
      data: { status, publishedAt },
    });
  }

  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
}
