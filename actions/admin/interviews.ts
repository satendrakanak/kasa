"use server";

import { InterviewStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";
import { curatedInterviewQuestions } from "@/lib/admin/interview-import-data";
import {
  interviewQuestionClassificationSchema,
  interviewQuestionContentSchema,
  interviewQuestionDraftSchema,
  interviewQuestionGuidanceSchema,
  interviewQuestionPublishingSchema,
  interviewQuestionSchema,
  interviewQuestionSeoSchema,
} from "@/schemas/admin/interviews";
import { formObject } from "@/actions/admin/action-utils";

const db = prisma;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function splitList(value: string | undefined) {
  return (value || "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function uniqueQuestionSlug(question: string, excludeId?: string) {
  const base = slugify(question) || "interview-question";
  let candidate = base;
  let suffix = 2;
  while (
    await db.interviewQuestion.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    })
  ) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function revalidateInterviewQuestion(id: string) {
  revalidatePath("/admin/interviews");
  revalidatePath(`/admin/interviews/${id}`);
  revalidatePath("/students/interview-questions");
}

export async function createInterviewQuestionDraftAction(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = interviewQuestionDraftSchema.parse(formObject(formData));
  const question = parsed.question.trim();
  const slug = await uniqueQuestionSlug(question);
  const created = await db.interviewQuestion.create({
    data: {
      slug,
      question,
      answer: "",
      roleId: parsed.roleId || null,
      topicId: parsed.topicId || null,
      status: InterviewStatus.DRAFT,
      createdById: admin.id,
    },
  });

  revalidateInterviewQuestion(created.id);
  redirect(`/admin/interviews/${created.id}?created=1`);
}

export async function updateInterviewQuestionContentAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionContentSchema.parse(formObject(formData));
  const slug = await uniqueQuestionSlug(parsed.question, parsed.id);
  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      question: parsed.question.trim(),
      slug,
      context: parsed.context?.trim() || null,
      shortAnswer: parsed.shortAnswer?.trim() || null,
      answer: parsed.answer?.trim() || "",
    },
  });
  revalidateInterviewQuestion(parsed.id);
  redirect(`/admin/interviews/${parsed.id}?saved=content`);
}

export async function updateInterviewQuestionGuidanceAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionGuidanceSchema.parse(formObject(formData));
  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      expectedPoints: splitList(parsed.expectedPoints),
      commonMistakes: splitList(parsed.commonMistakes),
      followUps: splitList(parsed.followUps),
    },
  });
  revalidateInterviewQuestion(parsed.id);
  redirect(`/admin/interviews/${parsed.id}?saved=guidance`);
}

export async function updateInterviewQuestionClassificationAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionClassificationSchema.parse(formObject(formData));
  const roleSlug = slugify(parsed.roleTitle);
  const topicSlug = slugify(parsed.topicTitle);
  const [role, topic] = await Promise.all([
    db.interviewRole.upsert({
      where: { slug: roleSlug },
      update: { title: parsed.roleTitle, aliases: splitList(parsed.roleAliases) },
      create: { title: parsed.roleTitle, slug: roleSlug, aliases: splitList(parsed.roleAliases) },
    }),
    db.interviewTopic.upsert({
      where: { slug: topicSlug },
      update: { title: parsed.topicTitle, group: parsed.topicGroup?.trim() || null },
      create: { title: parsed.topicTitle, slug: topicSlug, group: parsed.topicGroup?.trim() || null },
    }),
  ]);
  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      roleId: role.id,
      topicId: topic.id,
      difficulty: parsed.difficulty,
      experienceMin: parsed.experienceMin,
      experienceMax: parsed.experienceMax && parsed.experienceMax > 0 ? parsed.experienceMax : null,
      tags: splitList(parsed.tags),
    },
  });
  revalidateInterviewQuestion(parsed.id);
  redirect(`/admin/interviews/${parsed.id}?saved=classification`);
}

export async function updateInterviewQuestionSeoAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionSeoSchema.parse(formObject(formData));
  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      seoTitle: parsed.seoTitle?.trim() || null,
      seoDescription: parsed.seoDescription?.trim() || null,
      sourceNote: parsed.sourceNote?.trim() || null,
    },
  });
  revalidateInterviewQuestion(parsed.id);
  redirect(`/admin/interviews/${parsed.id}?saved=seo`);
}

export async function updateInterviewQuestionPublishingAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionPublishingSchema.parse(formObject(formData));
  const question = await db.interviewQuestion.findUnique({
    where: { id: parsed.id },
    select: { answer: true, roleId: true, topicId: true, publishedAt: true },
  });
  if (!question) throw new Error("Question not found.");
  if (
    parsed.status === InterviewStatus.PUBLISHED &&
    (question.answer.trim().length < 40 || !question.roleId || !question.topicId)
  ) {
    redirect(`/admin/interviews/${parsed.id}?error=publish-incomplete`);
  }
  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      status: parsed.status,
      publishedAt:
        parsed.status === InterviewStatus.PUBLISHED
          ? question.publishedAt || new Date()
          : null,
    },
  });
  revalidateInterviewQuestion(parsed.id);
  redirect(`/admin/interviews/${parsed.id}?saved=publishing`);
}

export async function createInterviewQuestionAction(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = interviewQuestionSchema.parse(formObject(formData));
  const roleSlug = slugify(parsed.roleTitle);
  const topicSlug = slugify(parsed.topicTitle);
  const questionSlug = await uniqueQuestionSlug(parsed.question);

  const role = await db.interviewRole.upsert({
    where: { slug: roleSlug },
    update: {
      title: parsed.roleTitle.trim(),
      aliases: splitList(parsed.roleAliases),
    },
    create: {
      title: parsed.roleTitle.trim(),
      slug: roleSlug,
      aliases: splitList(parsed.roleAliases),
    },
  });

  const topic = await db.interviewTopic.upsert({
    where: { slug: topicSlug },
    update: {
      title: parsed.topicTitle.trim(),
      group: parsed.topicGroup?.trim() || null,
    },
    create: {
      title: parsed.topicTitle.trim(),
      slug: topicSlug,
      group: parsed.topicGroup?.trim() || null,
    },
  });

  const experienceMax =
    typeof parsed.experienceMax === "number" && parsed.experienceMax > 0
      ? parsed.experienceMax
      : null;

  await db.interviewQuestion.create({
    data: {
      slug: questionSlug,
      question: parsed.question.trim(),
      context: parsed.context?.trim() || null,
      shortAnswer: parsed.shortAnswer?.trim() || null,
      answer: parsed.answer.trim(),
      expectedPoints: splitList(parsed.expectedPoints),
      commonMistakes: splitList(parsed.commonMistakes),
      followUps: splitList(parsed.followUps),
      roleId: role.id,
      topicId: topic.id,
      difficulty: parsed.difficulty,
      experienceMin: parsed.experienceMin,
      experienceMax,
      tags: splitList(parsed.tags),
      status: parsed.status,
      seoTitle: parsed.seoTitle?.trim() || null,
      seoDescription: parsed.seoDescription?.trim() || null,
      sourceNote: parsed.sourceNote?.trim() || null,
      createdById: admin.id,
      publishedAt:
        parsed.status === InterviewStatus.PUBLISHED ? new Date() : null,
    },
  });

  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
  redirect("/admin/interviews?created=1");
}

export async function updateInterviewQuestionAction(formData: FormData) {
  await requireAdmin();
  const parsed = interviewQuestionSchema.parse(formObject(formData));
  if (!parsed.id) throw new Error("Question id is required.");
  const questionSlug = await uniqueQuestionSlug(parsed.question, parsed.id);

  const roleSlug = slugify(parsed.roleTitle);
  const topicSlug = slugify(parsed.topicTitle);
  const role = await db.interviewRole.upsert({
    where: { slug: roleSlug },
    update: {
      title: parsed.roleTitle.trim(),
      aliases: splitList(parsed.roleAliases),
    },
    create: {
      title: parsed.roleTitle.trim(),
      slug: roleSlug,
      aliases: splitList(parsed.roleAliases),
    },
  });

  const topic = await db.interviewTopic.upsert({
    where: { slug: topicSlug },
    update: {
      title: parsed.topicTitle.trim(),
      group: parsed.topicGroup?.trim() || null,
    },
    create: {
      title: parsed.topicTitle.trim(),
      slug: topicSlug,
      group: parsed.topicGroup?.trim() || null,
    },
  });

  const experienceMax =
    typeof parsed.experienceMax === "number" && parsed.experienceMax > 0
      ? parsed.experienceMax
      : null;

  await db.interviewQuestion.update({
    where: { id: parsed.id },
    data: {
      question: parsed.question.trim(),
      slug: questionSlug,
      context: parsed.context?.trim() || null,
      shortAnswer: parsed.shortAnswer?.trim() || null,
      answer: parsed.answer.trim(),
      expectedPoints: splitList(parsed.expectedPoints),
      commonMistakes: splitList(parsed.commonMistakes),
      followUps: splitList(parsed.followUps),
      roleId: role.id,
      topicId: topic.id,
      difficulty: parsed.difficulty,
      experienceMin: parsed.experienceMin,
      experienceMax,
      tags: splitList(parsed.tags),
      status: parsed.status,
      seoTitle: parsed.seoTitle?.trim() || null,
      seoDescription: parsed.seoDescription?.trim() || null,
      sourceNote: parsed.sourceNote?.trim() || null,
      publishedAt:
        parsed.status === InterviewStatus.PUBLISHED ? new Date() : null,
    },
  });

  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
  redirect("/admin/interviews?updated=1");
}

export async function deleteInterviewQuestionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Question id is required.");

  await db.interviewQuestion.delete({ where: { id } });

  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
  redirect("/admin/interviews?deleted=1");
}

export async function bulkInterviewQuestionsAction(formData: FormData) {
  await requireAdmin();
  const ids = formData
    .getAll("questionIds")
    .map(String)
    .filter(Boolean)
    .slice(0, 100);
  const action = String(formData.get("bulkAction") || "");
  if (!ids.length) redirect("/admin/interviews?bulkError=empty");

  if (action === "DELETE") {
    await db.interviewQuestion.deleteMany({ where: { id: { in: ids } } });
    revalidatePath("/admin/interviews");
    revalidatePath("/students/interview-questions");
    redirect(`/admin/interviews?bulk=deleted&count=${ids.length}`);
  }

  const status = {
    PUBLISH: InterviewStatus.PUBLISHED,
    REVIEW: InterviewStatus.REVIEW,
    DRAFT: InterviewStatus.DRAFT,
    ARCHIVE: InterviewStatus.ARCHIVED,
  }[action];
  if (!status) throw new Error("Unsupported bulk action.");

  if (status === InterviewStatus.PUBLISHED) {
    const selectedQuestions = await db.interviewQuestion.findMany({
      where: { id: { in: ids } },
      select: { answer: true, roleId: true, topicId: true },
    });
    const incomplete = selectedQuestions.filter(
      (item) => item.answer.trim().length < 40 || !item.roleId || !item.topicId,
    ).length;
    if (incomplete) {
      redirect(`/admin/interviews?bulkError=publish-incomplete&count=${incomplete}`);
    }
    await db.$transaction([
      db.interviewQuestion.updateMany({
        where: { id: { in: ids }, status: { not: InterviewStatus.PUBLISHED } },
        data: { publishedAt: new Date() },
      }),
      db.interviewQuestion.updateMany({
        where: { id: { in: ids } },
        data: { status: InterviewStatus.PUBLISHED },
      }),
    ]);
  } else {
    await db.interviewQuestion.updateMany({
      where: { id: { in: ids } },
      data: { status, publishedAt: null },
    });
  }
  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
  redirect(`/admin/interviews?bulk=${status.toLowerCase()}&count=${ids.length}`);
}

export async function importCuratedInterviewQuestionsAction() {
  await requireAdmin();

  for (const item of curatedInterviewQuestions) {
    const roleSlug = slugify(item.roleTitle);
    const topicSlug = slugify(item.topicTitle);
    const questionSlug = slugify(item.question);

    const role = await db.interviewRole.upsert({
      where: { slug: roleSlug },
      update: {
        title: item.roleTitle,
        aliases: item.roleAliases || [],
        description: item.roleAliases?.length
          ? `Also searched as ${item.roleAliases.join(", ")}.`
          : null,
      },
      create: {
        title: item.roleTitle,
        slug: roleSlug,
        aliases: item.roleAliases || [],
        description: item.roleAliases?.length
          ? `Also searched as ${item.roleAliases.join(", ")}.`
          : null,
      },
    });

    const topic = await db.interviewTopic.upsert({
      where: { slug: topicSlug },
      update: {
        title: item.topicTitle,
        group: item.topicGroup || null,
      },
      create: {
        title: item.topicTitle,
        slug: topicSlug,
        group: item.topicGroup || null,
      },
    });

    await db.interviewQuestion.upsert({
      where: { slug: questionSlug },
      update: {
        question: item.question,
        context: item.context || null,
        shortAnswer: item.shortAnswer,
        answer: item.answer,
        expectedPoints: item.expectedPoints,
        commonMistakes: item.commonMistakes,
        followUps: item.followUps,
        roleId: role.id,
        topicId: topic.id,
        difficulty: item.difficulty,
        experienceMin: 0,
        experienceMax: null,
        tags: item.tags,
        status: InterviewStatus.PUBLISHED,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        sourceNote: "KASA original curated import",
        isCommunity: false,
        publishedAt: new Date(),
      },
      create: {
        slug: questionSlug,
        question: item.question,
        context: item.context || null,
        shortAnswer: item.shortAnswer,
        answer: item.answer,
        expectedPoints: item.expectedPoints,
        commonMistakes: item.commonMistakes,
        followUps: item.followUps,
        roleId: role.id,
        topicId: topic.id,
        difficulty: item.difficulty,
        experienceMin: 0,
        experienceMax: null,
        tags: item.tags,
        status: InterviewStatus.PUBLISHED,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        sourceNote: "KASA original curated import",
        isCommunity: false,
        publishedAt: new Date(),
      },
    });
  }

  revalidatePath("/admin/interviews");
  revalidatePath("/students/interview-questions");
  redirect(`/admin/interviews?imported=${curatedInterviewQuestions.length}`);
}
