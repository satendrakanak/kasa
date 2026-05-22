import { NextRequest, NextResponse } from "next/server";

type WorksheetRequest = {
  selectedClass: string;
  subject: string;
  coverage: string;
  questionCount: number;
  difficulty: string;
  worksheetType: string;
  includeAnswerKey: boolean;
  questionTypes: string[];
};

type WorksheetQuestion = {
  number: number;
  type: string;
  question: string;
  marks: number;
  answer: string;
};

type WorksheetSection = {
  title: string;
  instructions: string;
  questions: WorksheetQuestion[];
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
  if (entry.count >= DAILY_LIMIT) return { allowed: false, remaining: 0 };
  entry.count += 1;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

function cleanNumber(value: unknown, fallback: number, min: number, max: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(Math.max(numeric, min), max);
}

function normalizeType(value: unknown) {
  const type = String(value || "Question").replace(/_/g, " ").trim();
  if (/multiple\s*choice|mcq/i.test(type)) return "Multiple choice";
  if (/fill/i.test(type)) return "Fill in the blank";
  if (/short/i.test(type)) return "Short answer";
  if (/word|problem/i.test(type)) return "Word problem";
  return type.slice(0, 50);
}

function normalizeRequest(input: Partial<WorksheetRequest>): WorksheetRequest {
  const questionTypes = Array.isArray(input.questionTypes)
    ? input.questionTypes.map((type) => String(type || "").slice(0, 50)).filter(Boolean).slice(0, 5)
    : [];

  return {
    selectedClass: String(input.selectedClass || "Class 10").slice(0, 30),
    subject: String(input.subject || "Science").slice(0, 60),
    coverage: String(input.coverage || "Full syllabus").slice(0, 160),
    questionCount: cleanNumber(input.questionCount, 15, 5, 50),
    difficulty: String(input.difficulty || "Balanced").slice(0, 30),
    worksheetType: String(input.worksheetType || "Practice worksheet").slice(0, 60),
    includeAnswerKey: Boolean(input.includeAnswerKey),
    questionTypes: questionTypes.length ? questionTypes : ["Short answer", "Fill in the blank"],
  };
}

function normalizeSections(sections: unknown): WorksheetSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.slice(0, 6).map((section) => {
    const item = section as Partial<WorksheetSection>;
    const questions = Array.isArray(item.questions)
      ? item.questions.slice(0, 50).map((question, index) => {
          const row = question as Partial<WorksheetQuestion>;
          return {
            number: index + 1,
            type: normalizeType(row.type),
            question: String(row.question || "Answer the question.").slice(0, 700),
            marks: cleanNumber(row.marks, 1, 1, 10),
            answer: String(row.answer || "Teacher review required.").slice(0, 600),
          };
        }).filter((question) => question.question.length > 8)
      : [];

    return {
      title: String(item.title || "Worksheet section").slice(0, 100),
      instructions: String(item.instructions || "Answer all questions.").slice(0, 300),
      questions,
    };
  }).filter((section) => section.questions.length);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured. Add GEMINI_API_KEY in the environment." },
      { status: 503 },
    );
  }

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Daily AI generation limit reached. Please try again tomorrow." },
      { status: 429 },
    );
  }

  let payload: WorksheetRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create an original printable worksheet for a teacher.",
    "Return only JSON that matches the schema.",
    "Do not copy copyrighted textbook questions. Create fresh worksheet questions.",
    "Make the worksheet age-appropriate and classroom-ready.",
    "If coverage is Full syllabus, spread questions across major subject areas. If chapters are provided, focus on them.",
    "Group questions into clear sections by question type or skill.",
    "Use plain English and include marks per question.",
    payload.includeAnswerKey ? "Include concise answer key text for every question." : "Still include answer text in JSON for teacher use.",
    "",
    `Class: ${payload.selectedClass}`,
    `Subject: ${payload.subject}`,
    `Syllabus coverage: ${payload.coverage}`,
    `Worksheet type: ${payload.worksheetType}`,
    `Difficulty: ${payload.difficulty}`,
    `Total questions: ${payload.questionCount}`,
    `Question types to include: ${payload.questionTypes.join(", ")}`,
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              sections: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    title: { type: "STRING" },
                    instructions: { type: "STRING" },
                    questions: {
                      type: "ARRAY",
                      items: {
                        type: "OBJECT",
                        properties: {
                          type: { type: "STRING" },
                          question: { type: "STRING" },
                          marks: { type: "INTEGER" },
                          answer: { type: "STRING" },
                        },
                        required: ["type", "question", "marks", "answer"],
                      },
                    },
                  },
                  required: ["title", "instructions", "questions"],
                },
              },
            },
            required: ["sections"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "AI worksheet generation failed. Please try again in a few minutes." },
      { status: response.status },
    );
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const parsed = JSON.parse(rawText) as { sections?: unknown };
    const sections = normalizeSections(parsed.sections);
    if (!sections.length) {
      return NextResponse.json({ error: "AI response did not include usable worksheet questions." }, { status: 502 });
    }
    return NextResponse.json({ sections, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI worksheet response could not be parsed." }, { status: 502 });
  }
}
