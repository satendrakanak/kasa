import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type ReportCardRequest = {
  selectedClass: string;
  studentName: string;
  examName: string;
  overallPercentage: number;
  attendancePercentage: number;
  conductLevel: string;
  learningLevel: string;
  tone: string;
  strengths: string[];
  improvementAreas: string[];
  teacherNotes: string;
};

type GeneratedReportCard = {
  headline: string;
  overallRemark: string;
  parentNote: string;
  strengths: string[];
  improvementPlan: string[];
  nextSteps: string[];
  teacherClosing: string;
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

function cleanText(value: unknown, fallback: string, max = 120) {
  const text = String(value || fallback).trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, fallback: string[]) {
  const list = Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 6)
    : [];
  return list.length ? list : fallback;
}

function normalizeRequest(input: Partial<ReportCardRequest>): ReportCardRequest {
  return {
    selectedClass: cleanText(input.selectedClass, "Class 8", 30),
    studentName: cleanText(input.studentName, "the student", 60),
    examName: cleanText(input.examName, "Term Assessment", 80),
    overallPercentage: cleanNumber(input.overallPercentage, 78, 0, 100),
    attendancePercentage: cleanNumber(input.attendancePercentage, 88, 0, 100),
    conductLevel: cleanText(input.conductLevel, "Good", 40),
    learningLevel: cleanText(input.learningLevel, "On track", 40),
    tone: cleanText(input.tone, "Balanced and encouraging", 60),
    strengths: cleanList(input.strengths, ["Concept understanding", "Class participation"]),
    improvementAreas: cleanList(input.improvementAreas, ["Consistent revision", "Written presentation"]),
    teacherNotes: cleanText(input.teacherNotes, "Use clear, helpful language for parents.", 300),
  };
}

function cleanStringList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const list = value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 6);
  return list.length ? list : fallback;
}

function normalizeReportCard(value: unknown): GeneratedReportCard | null {
  if (!value || typeof value !== "object") return null;
  const report = value as Partial<GeneratedReportCard>;
  return {
    headline: cleanText(report.headline, "Steady progress with clear next steps", 120),
    overallRemark: cleanText(report.overallRemark, "The student has shown steady effort and can improve further with regular practice.", 800),
    parentNote: cleanText(report.parentNote, "Please support regular revision and encourage the student to complete practice work on time.", 700),
    strengths: cleanStringList(report.strengths, ["Shows positive learning habits", "Participates in class activities"]),
    improvementPlan: cleanStringList(report.improvementPlan, ["Revise key concepts weekly", "Practice written answers with time limits"]),
    nextSteps: cleanStringList(report.nextSteps, ["Maintain attendance", "Complete revision tasks", "Ask doubts early"]),
    teacherClosing: cleanText(report.teacherClosing, "With consistent support and practice, the student can continue improving.", 500),
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

  let payload: ReportCardRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create a professional school report card remark for a teacher.",
    "Return only JSON matching the schema.",
    "Use polished English, parent-friendly wording, and specific actionable feedback.",
    "Do not invent exact marks beyond the provided percentage and attendance.",
    "Keep remarks concise, positive, honest, and classroom appropriate.",
    "",
    `Student name: ${payload.studentName}`,
    `Class: ${payload.selectedClass}`,
    `Exam/report: ${payload.examName}`,
    `Overall percentage: ${payload.overallPercentage}%`,
    `Attendance: ${payload.attendancePercentage}%`,
    `Conduct: ${payload.conductLevel}`,
    `Learning level: ${payload.learningLevel}`,
    `Tone: ${payload.tone}`,
    `Strengths selected by teacher: ${payload.strengths.join(", ")}`,
    `Improvement areas: ${payload.improvementAreas.join(", ")}`,
    `Teacher notes: ${payload.teacherNotes}`,
  ].join("\n");

  const result = await generateAiContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.65,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              headline: { type: "STRING" },
              overallRemark: { type: "STRING" },
              parentNote: { type: "STRING" },
              strengths: { type: "ARRAY", items: { type: "STRING" } },
              improvementPlan: { type: "ARRAY", items: { type: "STRING" } },
              nextSteps: { type: "ARRAY", items: { type: "STRING" } },
              teacherClosing: { type: "STRING" },
            },
            required: ["headline", "overallRemark", "parentNote", "strengths", "improvementPlan", "nextSteps", "teacherClosing"],
          },
        },
      });

  if (!result.ok) {
    return NextResponse.json(
      { error: "AI report card generation failed. Please try again in a few minutes." },
      { status: result.status },
    );
  }

  const data = result.data;
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const reportCard = normalizeReportCard(JSON.parse(rawText));
    if (!reportCard) {
      return NextResponse.json({ error: "AI response did not include a usable report card." }, { status: 502 });
    }
    return NextResponse.json({ reportCard, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI report card response could not be parsed." }, { status: 502 });
  }
}
