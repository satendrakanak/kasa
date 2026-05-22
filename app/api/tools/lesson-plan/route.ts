import { NextRequest, NextResponse } from "next/server";

type LessonPlanRequest = {
  selectedClass: string;
  subject: string;
  topic: string;
  duration: number;
  teachingStyle: string;
  classLevel: string;
  includeHomework: boolean;
  includeAssessment: boolean;
};

type LessonStep = {
  title: string;
  time: string;
  activity: string;
  teacherAction: string;
  studentAction: string;
};

type LessonPlan = {
  title: string;
  overview: string;
  objectives: string[];
  materials: string[];
  warmUp: string;
  steps: LessonStep[];
  assessment: string[];
  homework: string;
  differentiation: string[];
  closure: string;
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

function cleanList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const items = value.map((item) => String(item || "").trim().slice(0, 260)).filter(Boolean);
  return items.length ? items.slice(0, 8) : fallback;
}

function normalizeRequest(input: Partial<LessonPlanRequest>): LessonPlanRequest {
  return {
    selectedClass: String(input.selectedClass || "Class 10").slice(0, 30),
    subject: String(input.subject || "Science").slice(0, 60),
    topic: String(input.topic || "Full syllabus").slice(0, 160),
    duration: cleanNumber(input.duration, 45, 20, 120),
    teachingStyle: String(input.teachingStyle || "Interactive").slice(0, 50),
    classLevel: String(input.classLevel || "Mixed level").slice(0, 50),
    includeHomework: Boolean(input.includeHomework),
    includeAssessment: Boolean(input.includeAssessment),
  };
}

function normalizePlan(input: unknown): LessonPlan | null {
  const plan = input as Partial<LessonPlan> | null;
  if (!plan || typeof plan !== "object") return null;
  const rawSteps = Array.isArray(plan.steps) ? plan.steps : [];
  const steps = rawSteps.slice(0, 8).map((step) => {
    const item = step as Partial<LessonStep>;
    return {
      title: String(item.title || "Lesson activity").slice(0, 100),
      time: String(item.time || "5 min").slice(0, 40),
      activity: String(item.activity || "Class activity").slice(0, 500),
      teacherAction: String(item.teacherAction || "Guide the activity.").slice(0, 500),
      studentAction: String(item.studentAction || "Participate and respond.").slice(0, 500),
    };
  });

  return {
    title: String(plan.title || "AI Lesson Plan").slice(0, 120),
    overview: String(plan.overview || "A structured lesson plan for classroom teaching.").slice(0, 700),
    objectives: cleanList(plan.objectives, ["Understand the core concept.", "Apply the concept in class activities."]),
    materials: cleanList(plan.materials, ["Whiteboard", "Notebook", "Textbook or worksheet"]),
    warmUp: String(plan.warmUp || "Start with a quick question to activate prior knowledge.").slice(0, 500),
    steps,
    assessment: cleanList(plan.assessment, ["Ask exit-ticket questions.", "Check student responses during practice."]),
    homework: String(plan.homework || "Revise the concept and solve practice questions.").slice(0, 500),
    differentiation: cleanList(plan.differentiation, ["Give hints to struggling learners.", "Add challenge tasks for advanced learners."]),
    closure: String(plan.closure || "Summarize key points and connect them to the next lesson.").slice(0, 500),
  };
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

  let payload: LessonPlanRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create an original classroom lesson plan for a teacher.",
    "Return only JSON that matches the schema.",
    "Use clear English and practical classroom actions.",
    "Make the plan age-appropriate for the selected class and subject.",
    "If topic is Full syllabus, create a broad revision lesson. If specific units are given, focus on them.",
    "Keep the timeline realistic for the selected duration.",
    payload.includeHomework ? "Include useful homework." : "Keep homework short and optional.",
    payload.includeAssessment ? "Include formative assessment checks." : "Keep assessment lightweight.",
    "",
    `Class: ${payload.selectedClass}`,
    `Subject: ${payload.subject}`,
    `Topic or syllabus coverage: ${payload.topic}`,
    `Duration: ${payload.duration} minutes`,
    `Teaching style: ${payload.teachingStyle}`,
    `Class level: ${payload.classLevel}`,
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.72,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              overview: { type: "STRING" },
              objectives: { type: "ARRAY", items: { type: "STRING" } },
              materials: { type: "ARRAY", items: { type: "STRING" } },
              warmUp: { type: "STRING" },
              steps: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    title: { type: "STRING" },
                    time: { type: "STRING" },
                    activity: { type: "STRING" },
                    teacherAction: { type: "STRING" },
                    studentAction: { type: "STRING" },
                  },
                  required: ["title", "time", "activity", "teacherAction", "studentAction"],
                },
              },
              assessment: { type: "ARRAY", items: { type: "STRING" } },
              homework: { type: "STRING" },
              differentiation: { type: "ARRAY", items: { type: "STRING" } },
              closure: { type: "STRING" },
            },
            required: ["title", "overview", "objectives", "materials", "warmUp", "steps", "assessment", "homework", "differentiation", "closure"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "AI lesson plan generation failed. Please try again in a few minutes." },
      { status: response.status },
    );
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const plan = normalizePlan(JSON.parse(rawText));
    if (!plan || !plan.steps.length) {
      return NextResponse.json({ error: "AI response did not include a usable lesson plan." }, { status: 502 });
    }
    return NextResponse.json({ plan, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI lesson plan response could not be parsed." }, { status: 502 });
  }
}
