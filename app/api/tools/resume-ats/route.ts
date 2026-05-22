import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

type ResumeAtsRequest = {
  resumeText: string;
  fileData?: string;
  fileMimeType?: string;
  fileName?: string;
  targetRole: string;
  roleFamily?: string;
  yearsExperience?: number;
  experienceLevel: string;
  currentSkills: string;
  targetPackage: number;
  dailyHours: number;
  language: string;
};

type ResumeAtsResponse = {
  atsScore: number;
  roleFit: string;
  verdict: string;
  summary: string;
  missingKeywords: string[];
  missingSkills: string[];
  strengths: string[];
  weakAreas: string[];
  improvedBullets: string[];
  projectsToAdd: string[];
  interviewQuestions: string[];
  roadmap: { week: string; focus: string; tasks: string[] }[];
  salaryRange: string;
  recruiterChecklist: string[];
  componentScores: { label: string; score: number }[];
  quickWins: string[];
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

function cleanString(value: unknown, fallback: string, max = 400) {
  const text = String(value || fallback).replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, maxItems: number, maxLength = 180) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, "", maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeRequest(input: Partial<ResumeAtsRequest>): ResumeAtsRequest {
  const fileMimeType = cleanString(input.fileMimeType, "", 120);
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  return {
    resumeText: String(input.resumeText || "").replace(/\s+/g, " ").trim().slice(0, 12000),
    fileData: String(input.fileData || "").slice(0, 5_500_000),
    fileMimeType: allowedMimeTypes.includes(fileMimeType) ? fileMimeType : "",
    fileName: cleanString(input.fileName, "", 160),
    targetRole: cleanString(input.targetRole, "Frontend Developer", 80),
    roleFamily: cleanString(input.roleFamily, "Software Engineering", 80),
    yearsExperience: cleanNumber(input.yearsExperience, 0, 0, 20),
    experienceLevel: cleanString(input.experienceLevel, "Fresher", 40),
    currentSkills: cleanString(input.currentSkills, "Not specified", 600),
    targetPackage: cleanNumber(input.targetPackage, 8, 0, 100),
    dailyHours: cleanNumber(input.dailyHours, 2, 1, 10),
    language: cleanString(input.language, "English", 30),
  };
}

function normalizeAnalysis(value: Partial<ResumeAtsResponse>): ResumeAtsResponse {
  const roadmap = Array.isArray(value.roadmap)
    ? value.roadmap.slice(0, 6).map((item, index) => {
        const row = item as Partial<ResumeAtsResponse["roadmap"][number]>;
        return {
          week: cleanString(row.week, `Week ${index + 1}`, 40),
          focus: cleanString(row.focus, "Skill improvement", 140),
          tasks: cleanList(row.tasks, 5, 320),
        };
      })
    : [];

  return {
    atsScore: Math.round(cleanNumber(value.atsScore, 55, 0, 100)),
    roleFit: cleanString(value.roleFit, "Needs improvement", 160),
    verdict: cleanString(value.verdict, "Improve role keywords, projects, and measurable outcomes before applying.", 900),
    summary: cleanString(value.summary, "Resume analysis completed.", 1200),
    missingKeywords: cleanList(value.missingKeywords, 12, 180),
    missingSkills: cleanList(value.missingSkills, 10, 220),
    strengths: cleanList(value.strengths, 8, 420),
    weakAreas: cleanList(value.weakAreas, 8, 520),
    improvedBullets: cleanList(value.improvedBullets, 8, 520),
    projectsToAdd: cleanList(value.projectsToAdd, 6, 420),
    interviewQuestions: cleanList(value.interviewQuestions, 10, 420),
    roadmap: roadmap.length ? roadmap : [
      {
        week: "Week 1",
        focus: "Resume cleanup",
        tasks: ["Add role keywords", "Rewrite weak bullets with measurable impact", "Remove vague wording"],
      },
    ],
    salaryRange: cleanString(value.salaryRange, "Depends on role, city, company, and interview performance.", 420),
    recruiterChecklist: cleanList(value.recruiterChecklist, 8, 320),
    componentScores: Array.isArray(value.componentScores)
      ? value.componentScores.slice(0, 6).map((item, index) => {
          const row = item as { label?: unknown; score?: unknown };
          return {
            label: cleanString(row.label, ["Keywords", "Skills", "Projects", "Impact", "Formatting", "Role fit"][index] || "Score", 40),
            score: Math.round(cleanNumber(row.score, 50, 0, 100)),
          };
        })
      : [
          { label: "Keywords", score: 50 },
          { label: "Skills", score: 50 },
          { label: "Projects", score: 50 },
          { label: "Impact", score: 50 },
        ],
    quickWins: cleanList(value.quickWins, 6, 420),
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

  let payload: ResumeAtsRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.resumeText.length < 300 && !payload.fileData) {
    return NextResponse.json({ error: "Please upload a PDF/DOC/DOCX resume or paste at least 300 characters." }, { status: 400 });
  }
  if (payload.fileData && !payload.fileMimeType) {
    return NextResponse.json({ error: "Unsupported resume file type. Upload PDF, DOC, DOCX, or TXT." }, { status: 400 });
  }

  const prompt = [
    "You are an expert resume reviewer, ATS analyst, and career mentor for students and job seekers.",
    "Analyze the resume against the target role. Return only valid JSON matching the schema.",
    "Be practical, specific, and honest. Do not invent degrees, jobs, companies, or achievements.",
    "Use the requested output language. If Hinglish is requested, write natural Hinglish. Otherwise use clear professional English.",
    "ATS score should reflect keyword match, clarity, role relevance, quantified impact, projects, and recruiter readability.",
    "Improved bullets must be realistic rewrites based only on the resume context and target role.",
    "Salary range must be a cautious estimate with a disclaimer that it varies by city, company, and interview performance.",
    "If a resume file is attached, extract and analyze the resume from that file. Use pasted text only as additional context.",
    "Infer actual experience from the resume evidence. If the user-selected experience conflicts with the resume, prioritize resume evidence and mention the mismatch in weakAreas or verdict.",
    "Do not punish a senior candidate as a fresher just because a default UI value was sent.",
    "componentScores must include Keywords, Skills, Projects, Impact, Formatting, and Role fit.",
    "",
    `Role family: ${payload.roleFamily}`,
    `Target role: ${payload.targetRole}`,
    `User-selected years of experience: ${payload.yearsExperience}`,
    `User-selected experience level: ${payload.experienceLevel}`,
    `Current skills user mentioned: ${payload.currentSkills}`,
    `Target package: ${payload.targetPackage} LPA or equivalent ambition`,
    `Daily available hours for improvement: ${payload.dailyHours}`,
    `Output language: ${payload.language}`,
    payload.fileName ? `Uploaded resume file name: ${payload.fileName}` : "",
    "",
    "Resume text:",
    payload.resumeText || "Resume file is attached. Extract resume content from the uploaded file.",
  ].join("\n");

  const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [{ text: prompt }];
  if (payload.fileData && payload.fileMimeType) {
    parts.push({ inlineData: { mimeType: payload.fileMimeType, data: payload.fileData } });
  }

  const result = await generateGeminiContent(apiKey, {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.55,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          atsScore: { type: "NUMBER" },
          roleFit: { type: "STRING" },
          verdict: { type: "STRING" },
          summary: { type: "STRING" },
          missingKeywords: { type: "ARRAY", items: { type: "STRING" } },
          missingSkills: { type: "ARRAY", items: { type: "STRING" } },
          strengths: { type: "ARRAY", items: { type: "STRING" } },
          weakAreas: { type: "ARRAY", items: { type: "STRING" } },
          improvedBullets: { type: "ARRAY", items: { type: "STRING" } },
          projectsToAdd: { type: "ARRAY", items: { type: "STRING" } },
          interviewQuestions: { type: "ARRAY", items: { type: "STRING" } },
          roadmap: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                week: { type: "STRING" },
                focus: { type: "STRING" },
                tasks: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["week", "focus", "tasks"],
            },
          },
          salaryRange: { type: "STRING" },
          recruiterChecklist: { type: "ARRAY", items: { type: "STRING" } },
          componentScores: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                score: { type: "NUMBER" },
              },
              required: ["label", "score"],
            },
          },
          quickWins: { type: "ARRAY", items: { type: "STRING" } },
        },
        required: [
          "atsScore",
          "roleFit",
          "verdict",
          "summary",
          "missingKeywords",
          "missingSkills",
          "strengths",
          "weakAreas",
          "improvedBullets",
          "projectsToAdd",
          "interviewQuestions",
          "roadmap",
          "salaryRange",
          "recruiterChecklist",
          "componentScores",
          "quickWins",
        ],
      },
    },
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  const data = result.data as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const parsed = JSON.parse(rawText) as Partial<ResumeAtsResponse>;
    return NextResponse.json({ analysis: normalizeAnalysis(parsed), remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI resume analysis could not be parsed." }, { status: 502 });
  }
}
