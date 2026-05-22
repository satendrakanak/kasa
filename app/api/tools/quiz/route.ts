import { NextRequest, NextResponse } from "next/server";

type QuizRequest = {
  selectedClass: string;
  subject: string;
  coverage: string;
  questionCount: number;
  difficulty: string;
  quizPurpose: string;
  includeAnswerKey: boolean;
  includeExplanations: boolean;
  questionTypes: string[];
};

type GeneratedQuizQuestion = {
  number: number;
  type: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
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

function cleanOptionLabel(value: unknown) {
  return String(value || "")
    .replace(/^\s*(?:[A-Da-d]|\d+)[).:-]\s*/, "")
    .trim()
    .slice(0, 220);
}

function normalizeType(value: unknown) {
  const type = String(value || "Question").replace(/_/g, " ").trim();
  if (/true\s*or\s*false|true.?false/i.test(type)) return "True or false";
  if (/multiple\s*choice|mcq/i.test(type)) return "Multiple choice";
  if (/fill/i.test(type)) return "Fill in the blank";
  if (/short/i.test(type)) return "Short answer";
  return type.slice(0, 40);
}

function normalizeRequest(input: Partial<QuizRequest>): QuizRequest {
  const questionTypes = Array.isArray(input.questionTypes)
    ? input.questionTypes
        .map((type) => String(type || "").slice(0, 40))
        .filter(Boolean)
        .slice(0, 5)
    : [];

  return {
    selectedClass: String(input.selectedClass || "Class 10").slice(0, 30),
    subject: String(input.subject || "Science").slice(0, 60),
    coverage: String(input.coverage || "Full syllabus").slice(0, 160),
    questionCount: cleanNumber(input.questionCount, 12, 5, 40),
    difficulty: String(input.difficulty || "Balanced").slice(0, 30),
    quizPurpose: String(input.quizPurpose || "Practice quiz").slice(0, 60),
    includeAnswerKey: Boolean(input.includeAnswerKey),
    includeExplanations: Boolean(input.includeExplanations),
    questionTypes: questionTypes.length > 0 ? questionTypes : ["Multiple choice", "True or false"],
  };
}

function normalizeQuestions(questions: unknown): GeneratedQuizQuestion[] {
  if (!Array.isArray(questions)) return [];

  return questions.slice(0, 45).map((question, index) => {
    const item = question as Partial<GeneratedQuizQuestion>;
    const type = normalizeType(item.type);
    const rawOptions = Array.isArray(item.options)
      ? item.options.map(cleanOptionLabel).filter(Boolean).slice(0, 6)
      : [];
    const options = type === "True or false" ? ["True", "False"] : rawOptions;

    return {
      number: index + 1,
      type,
      question: String(item.question || "Answer the question.").slice(0, 700),
      options,
      answer: cleanOptionLabel(item.answer || "Teacher review required.").slice(0, 500),
      explanation: String(item.explanation || "Use the relevant concept to evaluate the answer.").slice(0, 700),
    };
  }).filter((question) => question.question.length > 8);
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

  let payload: QuizRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create an original classroom quiz for a teacher.",
    "Return only JSON that matches the schema.",
    "Do not copy copyrighted textbook questions. Create fresh questions.",
    "Questions must be age-appropriate for the selected class and subject.",
    "If syllabus coverage is Full syllabus, spread questions across major subject areas.",
    "If specific units or chapters are provided, focus the quiz on those areas.",
    "Use clear English. Avoid vague placeholder wording.",
    "For multiple choice questions, include exactly 4 plain answer options. Do not prefix options with A), B), C), D), numbers, or bullets.",
    "For true or false questions, use options exactly as True and False.",
    "Do not include option labels inside answer text. Use the plain answer only.",
    payload.includeAnswerKey
      ? "Include the correct answer for every question."
      : "Still include answers in JSON for internal teacher use.",
    payload.includeExplanations
      ? "Include concise explanations for every answer."
      : "Keep explanations short.",
    "",
    `Class: ${payload.selectedClass}`,
    `Subject: ${payload.subject}`,
    `Syllabus coverage: ${payload.coverage}`,
    `Quiz purpose: ${payload.quizPurpose}`,
    `Difficulty: ${payload.difficulty}`,
    `Total questions: ${payload.questionCount}`,
    `Question types to mix: ${payload.questionTypes.join(", ")}`,
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
              questions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    type: { type: "STRING" },
                    question: { type: "STRING" },
                    options: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                    },
                    answer: { type: "STRING" },
                    explanation: { type: "STRING" },
                  },
                  required: ["type", "question", "answer", "explanation"],
                },
              },
            },
            required: ["questions"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "AI quiz generation failed. Please try again in a few minutes." },
      { status: response.status },
    );
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const parsed = JSON.parse(rawText) as { questions?: unknown };
    const questions = normalizeQuestions(parsed.questions);
    if (!questions.length) {
      return NextResponse.json({ error: "AI response did not include usable quiz questions." }, { status: 502 });
    }
    return NextResponse.json({ questions, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI quiz response could not be parsed." }, { status: 502 });
  }
}
