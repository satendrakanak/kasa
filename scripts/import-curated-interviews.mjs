import { PrismaClient, InterviewStatus } from "@prisma/client";
import { curatedInterviewQuestions } from "../lib/admin/interview-import-data.ts";

const prisma = new PrismaClient();

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

async function main() {
  let imported = 0;

  for (const item of curatedInterviewQuestions) {
    const roleSlug = slugify(item.roleTitle);
    const topicSlug = slugify(item.topicTitle);
    const questionSlug = slugify(`${item.roleTitle}-${item.topicTitle}-${item.question}`);

    const role = await prisma.interviewRole.upsert({
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

    const topic = await prisma.interviewTopic.upsert({
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

    await prisma.interviewQuestion.upsert({
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

    imported += 1;
  }

  console.log(`Imported or updated ${imported} curated interview questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
