import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type PaperRequest = {
  selectedClass: string;
  subject: string;
  topic: string;
  totalMarks: number;
  duration: number;
  difficulty: string;
  includeAnswerKey: boolean;
  questionMix: Array<{
    key: string;
    label: string;
    marks: number;
    count: number;
  }>;
};

type GeneratedQuestion = {
  number: number;
  text: string;
  marks: number;
  answer: string;
};

type GeneratedSection = {
  key: string;
  label: string;
  sectionName: string;
  total: number;
  questions: GeneratedQuestion[];
};

const requestLog = new Map<string, { count: number; resetAt: number }>();
const DAY_MS = 24 * 60 * 60 * 1000;
const DAILY_LIMIT = 3;

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

function checkRateLimit(clientKey: string) {
  const now = Date.now();
  const entry = requestLog.get(clientKey);
  if (!entry || entry.resetAt <= now) {
    requestLog.set(clientKey, { count: 1, resetAt: now + DAY_MS });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }
  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

function cleanNumber(value: unknown, fallback: number, min: number, max: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(Math.max(numeric, min), max);
}

function normalizeRequest(input: Partial<PaperRequest>): PaperRequest {
  const questionMix = Array.isArray(input.questionMix)
    ? input.questionMix
        .slice(0, 6)
        .map((item) => ({
          key: String(item.key || "question"),
          label: String(item.label || "Questions").slice(0, 80),
          marks: cleanNumber(item.marks, 1, 1, 10),
          count: cleanNumber(item.count, 1, 0, 20),
        }))
        .filter((item) => item.count > 0)
    : [];

  return {
    selectedClass: String(input.selectedClass || "Class 10").slice(0, 30),
    subject: String(input.subject || "Science").slice(0, 60),
    topic: String(input.topic || "Full syllabus").slice(0, 160),
    totalMarks: cleanNumber(input.totalMarks, 50, 10, 100),
    duration: cleanNumber(input.duration, 90, 30, 180),
    difficulty: String(input.difficulty || "Balanced").slice(0, 30),
    includeAnswerKey: Boolean(input.includeAnswerKey),
    questionMix:
      questionMix.length > 0
        ? questionMix
        : [
            { key: "mcq", label: "Multiple choice questions", marks: 1, count: 8 },
            { key: "short", label: "Short answer questions", marks: 2, count: 6 },
            { key: "long", label: "Long answer questions", marks: 5, count: 4 },
          ],
  };
}

function normalizeSections(sections: unknown): GeneratedSection[] {
  if (!Array.isArray(sections)) return [];

  return sections.slice(0, 8).map((section, sectionIndex) => {
    const item = section as Partial<GeneratedSection>;
    const questions = Array.isArray(item.questions)
      ? item.questions.slice(0, 30).map((question, questionIndex) => {
          const row = question as Partial<GeneratedQuestion>;
          return {
            number: questionIndex + 1,
            text: String(row.text || "Answer the question based on the selected topic.").slice(0, 700),
            marks: cleanNumber(row.marks, 1, 1, 10),
            answer: String(row.answer || "Teacher can evaluate using the chapter concept.").slice(0, 700),
          };
        })
      : [];

    return {
      key: String(item.key || `section-${sectionIndex + 1}`).slice(0, 40),
      label: String(item.label || "Questions").slice(0, 100),
      sectionName: String(item.sectionName || `Section ${String.fromCharCode(65 + sectionIndex)}`).slice(0, 30),
      total: questions.reduce((sum, question) => sum + question.marks, 0),
      questions,
    };
  }).filter((section) => section.questions.length > 0);
}

export async function POST(request: NextRequest) {

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Daily AI generation limit reached. Please try again tomorrow." },
      { status: 429 },
    );
  }

  let payload: PaperRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create an original, classroom-ready question paper for a teacher.",
    "Return only JSON that matches the schema.",
    "Do not copy copyrighted textbook questions. Create fresh questions based on the selected syllabus coverage.",
    "If the coverage is Full syllabus, spread questions across major age-appropriate areas of the subject instead of focusing on one chapter.",
    "If specific chapters or units are provided, focus the paper on those chapters or units.",
    "Questions must be age-appropriate for the class and subject.",
    "Use clear English. Avoid vague placeholder wording.",
    "Respect the requested question counts and marks.",
    payload.includeAnswerKey
      ? "Include concise answer key hints for every question."
      : "Still include short teacher-only answer hints in JSON for internal use.",
    "",
    `Class: ${payload.selectedClass}`,
    `Subject: ${payload.subject}`,
    `Syllabus coverage: ${payload.topic}`,
    `Target marks: ${payload.totalMarks}`,
    `Duration: ${payload.duration} minutes`,
    `Difficulty: ${payload.difficulty}`,
    `Question mix: ${payload.questionMix
      .map((item) => `${item.count} ${item.label} of ${item.marks} mark(s) each`)
      .join("; ")}`,
  ].join("\n");

  const result = await generateAiContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.65,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              sections: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    key: { type: "STRING" },
                    label: { type: "STRING" },
                    sectionName: { type: "STRING" },
                    questions: {
                      type: "ARRAY",
                      items: {
                        type: "OBJECT",
                        properties: {
                          text: { type: "STRING" },
                          marks: { type: "INTEGER" },
                          answer: { type: "STRING" },
                        },
                        required: ["text", "marks", "answer"],
                      },
                    },
                  },
                  required: ["key", "label", "sectionName", "questions"],
                },
              },
            },
            required: ["sections"],
          },
        },
      });

  if (!result.ok) {
    return NextResponse.json(
      { error: "AI generation failed. Please try again in a few minutes." },
      { status: result.status },
    );
  }

  const data = result.data;
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const parsed = JSON.parse(rawText) as { sections?: unknown };
    const sections = normalizeSections(parsed.sections);
    if (!sections.length) {
      return NextResponse.json({ error: "AI response did not include usable questions." }, { status: 502 });
    }
    return NextResponse.json({ sections, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI response could not be parsed." }, { status: 502 });
  }
}
