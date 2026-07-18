import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type AssignmentRequest = {
  selectedClass: string;
  subject: string;
  coverage: string;
  assignmentType: string;
  difficulty: string;
  totalMarks: number;
  durationDays: number;
  includeRubric: boolean;
  skills: string[];
};

type AssignmentTask = {
  title: string;
  instructions: string;
  marks: number;
};

type GeneratedAssignment = {
  title: string;
  brief: string;
  learningGoals: string[];
  tasks: AssignmentTask[];
  submissionChecklist: string[];
  rubric: string[];
  teacherNote: string;
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

function cleanText(value: unknown, fallback: string, max = 140) {
  const text = String(value || fallback).trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, fallback: string[]) {
  const list = Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 8)
    : [];
  return list.length ? list : fallback;
}

function normalizeRequest(input: Partial<AssignmentRequest>): AssignmentRequest {
  return {
    selectedClass: cleanText(input.selectedClass, "Class 10", 30),
    subject: cleanText(input.subject, "Science", 60),
    coverage: cleanText(input.coverage, "Full syllabus", 180),
    assignmentType: cleanText(input.assignmentType, "Homework assignment", 60),
    difficulty: cleanText(input.difficulty, "Balanced", 30),
    totalMarks: cleanNumber(input.totalMarks, 30, 10, 100),
    durationDays: cleanNumber(input.durationDays, 7, 1, 30),
    includeRubric: Boolean(input.includeRubric),
    skills: cleanList(input.skills, ["Concept understanding", "Written explanation"]),
  };
}

function normalizeAssignment(value: unknown): GeneratedAssignment | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<GeneratedAssignment>;
  const tasks = Array.isArray(item.tasks)
    ? item.tasks.slice(0, 8).map((task) => {
        const row = task as Partial<AssignmentTask>;
        return {
          title: cleanText(row.title, "Assignment task", 100),
          instructions: cleanText(row.instructions, "Complete this task carefully.", 700),
          marks: cleanNumber(row.marks, 5, 1, 30),
        };
      }).filter((task) => task.instructions.length > 12)
    : [];

  return {
    title: cleanText(item.title, "Class Assignment", 120),
    brief: cleanText(item.brief, "Complete the assignment using clear steps and neat presentation.", 700),
    learningGoals: cleanList(item.learningGoals, ["Understand the core concept", "Apply learning in written work"]),
    tasks: tasks.length ? tasks : [{ title: "Main task", instructions: "Answer the given questions with neat working.", marks: 10 }],
    submissionChecklist: cleanList(item.submissionChecklist, ["Write name and class", "Complete all tasks", "Review before submission"]),
    rubric: cleanList(item.rubric, ["Concept clarity", "Accuracy", "Presentation"]),
    teacherNote: cleanText(item.teacherNote, "Review work for clarity, completion, and accuracy.", 500),
  };
}

export async function POST(request: NextRequest) {

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Daily AI generation limit reached. Please try again tomorrow." },
      { status: 429 },
    );
  }

  let payload: AssignmentRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create a classroom-ready assignment for a teacher.",
    "Return only JSON matching the schema.",
    "Use original tasks, plain English, clear instructions, and age-appropriate difficulty.",
    "The assignment must feel useful to students, with a brief, tasks, learning goals, checklist, and teacher note.",
    payload.includeRubric ? "Include a practical rubric." : "Keep rubric short even if not emphasized.",
    "",
    `Class: ${payload.selectedClass}`,
    `Subject: ${payload.subject}`,
    `Syllabus coverage: ${payload.coverage}`,
    `Assignment type: ${payload.assignmentType}`,
    `Difficulty: ${payload.difficulty}`,
    `Total marks: ${payload.totalMarks}`,
    `Days to complete: ${payload.durationDays}`,
    `Skills to focus: ${payload.skills.join(", ")}`,
  ].join("\n");

  const result = await generateAiContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.68,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              brief: { type: "STRING" },
              learningGoals: { type: "ARRAY", items: { type: "STRING" } },
              tasks: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    title: { type: "STRING" },
                    instructions: { type: "STRING" },
                    marks: { type: "INTEGER" },
                  },
                  required: ["title", "instructions", "marks"],
                },
              },
              submissionChecklist: { type: "ARRAY", items: { type: "STRING" } },
              rubric: { type: "ARRAY", items: { type: "STRING" } },
              teacherNote: { type: "STRING" },
            },
            required: ["title", "brief", "learningGoals", "tasks", "submissionChecklist", "rubric", "teacherNote"],
          },
        },
      });

  if (!result.ok) {
    return NextResponse.json(
      { error: "AI assignment generation failed. Please try again in a few minutes." },
      { status: result.status },
    );
  }

  const data = result.data;
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const assignment = normalizeAssignment(JSON.parse(rawText));
    if (!assignment) {
      return NextResponse.json({ error: "AI response did not include a usable assignment." }, { status: 502 });
    }
    return NextResponse.json({ assignment, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI assignment response could not be parsed." }, { status: 502 });
  }
}
