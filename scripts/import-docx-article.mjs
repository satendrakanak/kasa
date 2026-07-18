import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

const DOCX_PATH = process.argv[2];
const PYTHON =
  process.env.DOCX_IMPORT_PYTHON ||
  "/Users/shivaan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

if (!DOCX_PATH) {
  console.error("Usage: node scripts/import-docx-article.mjs /path/to/article.docx");
  process.exit(1);
}

loadDotEnv(resolve(process.cwd(), ".env"));

const prisma = new PrismaClient();

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const clean = line.trim();
    if (!clean || clean.startsWith("#") || !clean.includes("=")) continue;
    const [key, ...valueParts] = clean.split("=");
    if (process.env[key]) continue;
    process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractDocx(path) {
  const code = `
import json
from docx import Document
doc = Document(${JSON.stringify(path)})
items = []
for paragraph in doc.paragraphs:
    text = paragraph.text.strip()
    if text:
        items.append({"kind": "paragraph", "style": paragraph.style.name, "text": text})
for table_index, table in enumerate(doc.tables):
    rows = []
    for row in table.rows:
        rows.append([cell.text.strip() for cell in row.cells])
    items.append({"kind": "table", "index": table_index, "rows": rows})
print(json.dumps(items, ensure_ascii=False))
`;
  return JSON.parse(execFileSync(PYTHON, ["-c", code], { encoding: "utf8" }));
}

function extractMetadata(items) {
  const firstHeading = items.find((item) => item.kind === "paragraph" && item.style.startsWith("Heading") && item.text);
  const metaTitle = items.find((item) => item.text?.startsWith("Meta Title:"))?.text.replace("Meta Title:", "").trim();
  const metaDescription = items
    .find((item) => item.text?.startsWith("Meta Description:"))
    ?.text.replace("Meta Description:", "")
    .trim();

  const title = firstHeading?.text || metaTitle || "Imported article";
  return { title, metaTitle, metaDescription };
}

function buildArticleHtmlAndFaqs(items, title) {
  const html = [];
  const faqs = [];
  let listItems = [];
  let inFaq = false;
  let activeQuestion = null;
  let skipDuplicateIntroTitle = true;

  function flushList() {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  function finishQuestion() {
    if (!activeQuestion) return;
    const answer = activeQuestion.answer.join(" ").trim();
    if (answer) {
      faqs.push({ question: activeQuestion.question, answer });
    }
    activeQuestion = null;
  }

  for (const item of items) {
    if (item.kind !== "paragraph") continue;
    const text = item.text.trim();
    if (!text || text.startsWith("Meta Title:") || text.startsWith("Meta Description:")) continue;

    const isHeading = item.style.startsWith("Heading");
    const isCompact = item.style === "Compact";

    if (skipDuplicateIntroTitle && isHeading && text === title) {
      skipDuplicateIntroTitle = false;
      continue;
    }

    if (isHeading && /^frequently asked questions$/i.test(text)) {
      flushList();
      finishQuestion();
      inFaq = true;
      continue;
    }

    if (inFaq && isHeading && /^final thoughts$/i.test(text)) {
      finishQuestion();
      inFaq = false;
      html.push(`<h2>${escapeHtml(text)}</h2>`);
      continue;
    }

    if (inFaq) {
      if (item.style === "Heading 2") {
        finishQuestion();
        activeQuestion = { question: text, answer: [] };
      } else if (activeQuestion) {
        activeQuestion.answer.push(text);
      }
      continue;
    }

    if (isCompact) {
      listItems.push(text);
      continue;
    }

    flushList();

    if (isHeading) {
      const tag = item.style === "Heading 1" ? "h2" : item.style === "Heading 2" ? "h3" : "h4";
      html.push(`<${tag}>${escapeHtml(text)}</${tag}>`);
      continue;
    }

    html.push(`<p>${escapeHtml(text)}</p>`);
  }

  flushList();
  finishQuestion();

  return {
    content: html.join("\n"),
    faqs,
  };
}

function readingTimeMinutes(content) {
  const plain = content.replace(/<[^>]*>/g, " ");
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function excerptFromHtml(content) {
  const paragraphs = Array.from(content.matchAll(/<p>(.*?)<\/p>/g)).map((match) =>
    match[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  );
  return paragraphs.slice(0, 2).join(" ").slice(0, 320);
}

async function syncTags(articleId, tagTitles) {
  await prisma.articleTagOnArticle.deleteMany({ where: { articleId } });

  for (const title of tagTitles) {
    const slug = slugify(title);
    if (!slug) continue;
    const tag = await prisma.articleTag.upsert({
      where: { slug },
      update: { title },
      create: { title, slug, description: null },
    });
    await prisma.articleTagOnArticle.create({
      data: { articleId, tagId: tag.id },
    });
  }
}

async function main() {
  const items = extractDocx(DOCX_PATH);
  const { title, metaTitle, metaDescription } = extractMetadata(items);
  const { content, faqs } = buildArticleHtmlAndFaqs(items, title);
  const slug = "best-ai-tools-for-teachers-in-2026";
  const now = new Date();

  const category = await prisma.articleCategory.upsert({
    where: { slug: "ai-tools" },
    update: {
      title: "AI Tools",
      description: "Practical articles about AI tools for teaching, productivity, LMS workflows, and education content creation.",
      isActive: true,
    },
    create: {
      title: "AI Tools",
      slug: "ai-tools",
      description: "Practical articles about AI tools for teaching, productivity, LMS workflows, and education content creation.",
      seoTitle: "AI Tools Articles | KASA Blog",
      seoDescription: "Explore practical AI tools for teachers, students, coaching institutes, and online academies.",
      isActive: true,
    },
  });

  const article = await prisma.article.upsert({
    where: { slug },
    update: {
      title,
      excerpt: excerptFromHtml(content),
      content,
      status: "PUBLISHED",
      categoryId: category.id,
      authorName: "KASA Team",
      featured: true,
      allowIndexing: true,
      seoTitle: metaTitle || title,
      seoDescription: metaDescription || excerptFromHtml(content),
      canonicalUrl: null,
      ogTitle: metaTitle || title,
      ogDescription: metaDescription || excerptFromHtml(content),
      schemaType: "Article",
      faqs,
      readingTimeMinutes: readingTimeMinutes(content),
      publishedAt: now,
      scheduledAt: null,
    },
    create: {
      title,
      slug,
      excerpt: excerptFromHtml(content),
      content,
      status: "PUBLISHED",
      categoryId: category.id,
      authorName: "KASA Team",
      featured: true,
      allowIndexing: true,
      seoTitle: metaTitle || title,
      seoDescription: metaDescription || excerptFromHtml(content),
      canonicalUrl: null,
      ogTitle: metaTitle || title,
      ogDescription: metaDescription || excerptFromHtml(content),
      schemaType: "Article",
      faqs,
      readingTimeMinutes: readingTimeMinutes(content),
      publishedAt: now,
      scheduledAt: null,
    },
  });

  await syncTags(article.id, [
    "AI Tools",
    "Teachers",
    "Education Technology",
    "Lesson Planning",
    "Question Paper Generator",
    "Quiz Generator",
    "Assignments",
    "LMS",
  ]);

  console.log(
    JSON.stringify(
      {
        id: article.id,
        slug: article.slug,
        title: article.title,
        status: article.status,
        faqs: faqs.length,
        readingTimeMinutes: article.readingTimeMinutes,
        adminUrl: `/admin/articles/${article.id}`,
        publicUrl: `/blog/${article.slug}`,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
