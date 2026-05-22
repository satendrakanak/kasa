import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

type ProjectKitRequest = {
  course: string;
  projectType: string;
  techStack: string;
  domain: string;
  difficulty: string;
  timeLeft: string;
  teamSize: number;
  goal: string;
  requirement: string;
};

type ProjectKit = {
  title: string;
  tagline: string;
  difficultyFit: string;
  abstract: string;
  problemStatement: string;
  objectives: string[];
  keyFeatures: string[];
  architecture: string[];
  folderStructure: string[];
  databaseSchema: string[];
  apiEndpoints: string[];
  screens: string[];
  setupSteps: string[];
  vivaQuestions: { question: string; answer: string }[];
  resumeBullets: string[];
  documentationFiles: string[];
  futureScope: string[];
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

function cleanText(value: unknown, fallback: string, max = 240) {
  const text = String(value || fallback).replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, fallback: string[], maxItems = 10, maxLength = 260) {
  if (!Array.isArray(value)) return fallback;
  const list = value.map((item) => cleanText(item, "", maxLength)).filter(Boolean).slice(0, maxItems);
  return list.length ? list : fallback;
}

function normalizeRequest(input: Partial<ProjectKitRequest>): ProjectKitRequest {
  return {
    course: cleanText(input.course, "BTech CSE", 50),
    projectType: cleanText(input.projectType, "Final Year Project", 60),
    techStack: cleanText(input.techStack, "MERN Stack", 80),
    domain: cleanText(input.domain, "Education", 80),
    difficulty: cleanText(input.difficulty, "Balanced", 40),
    timeLeft: cleanText(input.timeLeft, "1 month", 40),
    teamSize: cleanNumber(input.teamSize, 2, 1, 6),
    goal: cleanText(input.goal, "Impressive and practical", 80),
    requirement: cleanText(input.requirement, "Suggest a useful project with documentation and viva preparation.", 900),
  };
}

function normalizeKit(value: Partial<ProjectKit>): ProjectKit {
  const vivaQuestions = Array.isArray(value.vivaQuestions)
    ? value.vivaQuestions.slice(0, 12).map((item) => {
        const row = item as Partial<ProjectKit["vivaQuestions"][number]>;
        return {
          question: cleanText(row.question, "Explain the main problem solved by this project.", 220),
          answer: cleanText(row.answer, "Explain the goal, modules, technology, and expected outcome clearly.", 500),
        };
      })
    : [];

  return {
    title: cleanText(value.title, "Smart Student Project Management System", 120),
    tagline: cleanText(value.tagline, "A practical final year project kit with code starter, docs, and viva preparation.", 180),
    difficultyFit: cleanText(value.difficultyFit, "Balanced project suitable for final year submission.", 220),
    abstract: cleanText(value.abstract, "This project solves a real student workflow with a practical web-based system.", 1200),
    problemStatement: cleanText(value.problemStatement, "Students and institutions need a structured system to manage this workflow efficiently.", 900),
    objectives: cleanList(value.objectives, ["Build a usable project", "Create clear modules", "Prepare documentation"], 8, 240),
    keyFeatures: cleanList(value.keyFeatures, ["Authentication", "Dashboard", "CRUD modules", "Reports"], 12, 220),
    architecture: cleanList(value.architecture, ["Frontend UI", "Backend API", "Database", "Authentication", "Deployment"], 12, 240),
    folderStructure: cleanList(value.folderStructure, ["frontend/src", "backend/src", "docs", "database"], 18, 160),
    databaseSchema: cleanList(value.databaseSchema, ["users(id, name, email, role)", "records(id, title, status, created_at)"], 16, 220),
    apiEndpoints: cleanList(value.apiEndpoints, ["POST /api/auth/login", "GET /api/dashboard", "POST /api/records"], 16, 220),
    screens: cleanList(value.screens, ["Login", "Dashboard", "Admin panel", "Reports"], 12, 180),
    setupSteps: cleanList(value.setupSteps, ["Install dependencies", "Configure environment variables", "Run frontend and backend"], 12, 220),
    vivaQuestions: vivaQuestions.length ? vivaQuestions : [
      {
        question: "Why did you choose this project?",
        answer: "It solves a practical problem, demonstrates full-stack skills, and can be explained clearly in viva.",
      },
    ],
    resumeBullets: cleanList(value.resumeBullets, ["Built a full-stack final year project with authentication, dashboard, APIs, and documentation."], 8, 260),
    documentationFiles: cleanList(value.documentationFiles, ["README.md", "project-synopsis.md", "setup-guide.md", "viva-questions.md"], 12, 160),
    futureScope: cleanList(value.futureScope, ["Add analytics", "Add notifications", "Deploy to cloud"], 8, 220),
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
    return NextResponse.json({ error: "Daily AI generation limit reached. Please try again tomorrow." }, { status: 429 });
  }

  let payload: ProjectKitRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create a practical final year project kit for an Indian college student.",
    "Return only valid JSON matching the schema.",
    "The kit must feel useful, buildable, and college-submission ready.",
    "Do not promise a production-grade complete app. Generate a reliable starter kit plan, source-code skeleton guidance, documentation, and viva preparation.",
    "Use clear English. Avoid generic filler. Make the idea specific to the selected stack and domain.",
    "",
    `Course: ${payload.course}`,
    `Project type: ${payload.projectType}`,
    `Tech stack: ${payload.techStack}`,
    `Domain: ${payload.domain}`,
    `Difficulty: ${payload.difficulty}`,
    `Time left: ${payload.timeLeft}`,
    `Team size: ${payload.teamSize}`,
    `Student goal: ${payload.goal}`,
    `Requirement: ${payload.requirement}`,
  ].join("\n");

  const result = await generateGeminiContent(apiKey, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.66,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          tagline: { type: "STRING" },
          difficultyFit: { type: "STRING" },
          abstract: { type: "STRING" },
          problemStatement: { type: "STRING" },
          objectives: { type: "ARRAY", items: { type: "STRING" } },
          keyFeatures: { type: "ARRAY", items: { type: "STRING" } },
          architecture: { type: "ARRAY", items: { type: "STRING" } },
          folderStructure: { type: "ARRAY", items: { type: "STRING" } },
          databaseSchema: { type: "ARRAY", items: { type: "STRING" } },
          apiEndpoints: { type: "ARRAY", items: { type: "STRING" } },
          screens: { type: "ARRAY", items: { type: "STRING" } },
          setupSteps: { type: "ARRAY", items: { type: "STRING" } },
          vivaQuestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: { type: "STRING" },
                answer: { type: "STRING" },
              },
              required: ["question", "answer"],
            },
          },
          resumeBullets: { type: "ARRAY", items: { type: "STRING" } },
          documentationFiles: { type: "ARRAY", items: { type: "STRING" } },
          futureScope: { type: "ARRAY", items: { type: "STRING" } },
        },
        required: [
          "title",
          "tagline",
          "difficultyFit",
          "abstract",
          "problemStatement",
          "objectives",
          "keyFeatures",
          "architecture",
          "folderStructure",
          "databaseSchema",
          "apiEndpoints",
          "screens",
          "setupSteps",
          "vivaQuestions",
          "resumeBullets",
          "documentationFiles",
          "futureScope",
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
    const kit = normalizeKit(JSON.parse(rawText) as Partial<ProjectKit>);
    return NextResponse.json({ kit, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI project kit response could not be parsed." }, { status: 502 });
  }
}
