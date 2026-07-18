import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type CareerRoadmapRequest = {
  targetRole: string;
  course: string;
  year: string;
  currentSkills: string;
  goal: string;
  dailyHours: number;
  timelineMonths: number;
  experienceLevel: string;
  learningStyle: string;
  language: string;
};

type CareerRoadmapResponse = {
  title: string;
  summary: string;
  roleFit: string;
  focusAreas: string[];
  skillsToLearn: { skill: string; why: string; priority: string }[];
  weeklyPlan: { week: string; focus: string; tasks: string[]; outcome: string }[];
  projects: { title: string; description: string; skills: string[]; resumeBullets: string[] }[];
  portfolioTasks: string[];
  interviewPrep: { topic: string; questions: string[] }[];
  jobSearchActions: string[];
  freeResources: string[];
  mistakesToAvoid: string[];
  checkpoints: { label: string; proof: string }[];
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

function cleanString(value: unknown, fallback: string, max = 500) {
  const text = String(value || fallback).replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, maxItems: number, maxLength = 260) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanString(item, "", maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeRequest(input: Partial<CareerRoadmapRequest>): CareerRoadmapRequest {
  return {
    targetRole: cleanString(input.targetRole, "Frontend Developer", 80),
    course: cleanString(input.course, "BTech CSE", 80),
    year: cleanString(input.year, "Final year", 50),
    currentSkills: cleanString(input.currentSkills, "HTML, CSS, JavaScript", 800),
    goal: cleanString(input.goal, "Get an internship or fresher job", 180),
    dailyHours: cleanNumber(input.dailyHours, 2, 1, 10),
    timelineMonths: cleanNumber(input.timelineMonths, 3, 1, 12),
    experienceLevel: cleanString(input.experienceLevel, "Student / Fresher", 60),
    learningStyle: cleanString(input.learningStyle, "Balanced theory and projects", 80),
    language: cleanString(input.language, "English", 30),
  };
}

function normalizeRoadmap(value: Partial<CareerRoadmapResponse>, payload: CareerRoadmapRequest): CareerRoadmapResponse {
  const weeklyPlan = Array.isArray(value.weeklyPlan)
    ? value.weeklyPlan.slice(0, 12).map((item, index) => {
        const row = item as Partial<CareerRoadmapResponse["weeklyPlan"][number]>;
        return {
          week: cleanString(row.week, `Week ${index + 1}`, 40),
          focus: cleanString(row.focus, "Skill building", 140),
          tasks: cleanList(row.tasks, 5, 260),
          outcome: cleanString(row.outcome, "Clear progress proof for your portfolio.", 220),
        };
      })
    : [];

  return {
    title: cleanString(value.title, `${payload.targetRole} roadmap for ${payload.course}`, 120),
    summary: cleanString(value.summary, "A practical roadmap based on your current skills, time, and target role.", 1200),
    roleFit: cleanString(value.roleFit, "You can reach this role with focused skills, projects, and interview practice.", 600),
    focusAreas: cleanList(value.focusAreas, 8, 180),
    skillsToLearn: Array.isArray(value.skillsToLearn)
      ? value.skillsToLearn.slice(0, 10).map((item) => {
          const row = item as Partial<CareerRoadmapResponse["skillsToLearn"][number]>;
          return {
            skill: cleanString(row.skill, "Core skill", 80),
            why: cleanString(row.why, "Important for the target role.", 220),
            priority: cleanString(row.priority, "High", 40),
          };
        })
      : [],
    weeklyPlan: weeklyPlan.length
      ? weeklyPlan
      : [
          {
            week: "Week 1",
            focus: "Foundation cleanup",
            tasks: ["List current skills", "Revise basics", "Set up GitHub and LinkedIn"],
            outcome: "A clear starting profile and learning checklist.",
          },
        ],
    projects: Array.isArray(value.projects)
      ? value.projects.slice(0, 4).map((item) => {
          const row = item as Partial<CareerRoadmapResponse["projects"][number]>;
          return {
            title: cleanString(row.title, "Portfolio project", 100),
            description: cleanString(row.description, "Build a project that proves role readiness.", 320),
            skills: cleanList(row.skills, 8, 80),
            resumeBullets: cleanList(row.resumeBullets, 4, 260),
          };
        })
      : [],
    portfolioTasks: cleanList(value.portfolioTasks, 8, 240),
    interviewPrep: Array.isArray(value.interviewPrep)
      ? value.interviewPrep.slice(0, 6).map((item) => {
          const row = item as Partial<CareerRoadmapResponse["interviewPrep"][number]>;
          return {
            topic: cleanString(row.topic, "Interview topic", 80),
            questions: cleanList(row.questions, 6, 220),
          };
        })
      : [],
    jobSearchActions: cleanList(value.jobSearchActions, 8, 260),
    freeResources: cleanList(value.freeResources, 8, 220),
    mistakesToAvoid: cleanList(value.mistakesToAvoid, 8, 260),
    checkpoints: Array.isArray(value.checkpoints)
      ? value.checkpoints.slice(0, 6).map((item) => {
          const row = item as Partial<CareerRoadmapResponse["checkpoints"][number]>;
          return {
            label: cleanString(row.label, "Checkpoint", 80),
            proof: cleanString(row.proof, "Something you can show in your portfolio.", 220),
          };
        })
      : [],
  };
}

export async function POST(request: NextRequest) {

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json({ error: "Daily AI roadmap limit reached. Please try again tomorrow." }, { status: 429 });
  }

  let payload: CareerRoadmapRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.currentSkills.length < 8) {
    return NextResponse.json({ error: "Please add at least a few current skills or subjects you know." }, { status: 400 });
  }

  const prompt = [
    "You are an expert career mentor for Indian college students, freshers, and early career job seekers.",
    "Create a practical AI career roadmap. Return only valid JSON matching the schema.",
    "Write for a real student visitor, not for a company planning document.",
    "Do not promise jobs, salary, referrals, or guaranteed placement.",
    "Make the roadmap specific, realistic, and project-heavy. Avoid generic advice.",
    "Tasks should be doable within the user's daily study time.",
    "If the timeline is short, prioritize the highest-impact skills and portfolio proof.",
    "Use the requested language. If Hinglish is requested, write natural student-friendly Hinglish. Otherwise use clear English.",
    "",
    `Target role: ${payload.targetRole}`,
    `Course/branch: ${payload.course}`,
    `College year: ${payload.year}`,
    `Experience level: ${payload.experienceLevel}`,
    `Current skills/subjects: ${payload.currentSkills}`,
    `Goal: ${payload.goal}`,
    `Daily available time: ${payload.dailyHours} hours`,
    `Timeline: ${payload.timelineMonths} months`,
    `Learning style: ${payload.learningStyle}`,
    `Output language: ${payload.language}`,
  ].join("\n");

  const result = await generateAiContent({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.58,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          summary: { type: "STRING" },
          roleFit: { type: "STRING" },
          focusAreas: { type: "ARRAY", items: { type: "STRING" } },
          skillsToLearn: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                skill: { type: "STRING" },
                why: { type: "STRING" },
                priority: { type: "STRING" },
              },
              required: ["skill", "why", "priority"],
            },
          },
          weeklyPlan: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                week: { type: "STRING" },
                focus: { type: "STRING" },
                tasks: { type: "ARRAY", items: { type: "STRING" } },
                outcome: { type: "STRING" },
              },
              required: ["week", "focus", "tasks", "outcome"],
            },
          },
          projects: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                description: { type: "STRING" },
                skills: { type: "ARRAY", items: { type: "STRING" } },
                resumeBullets: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["title", "description", "skills", "resumeBullets"],
            },
          },
          portfolioTasks: { type: "ARRAY", items: { type: "STRING" } },
          interviewPrep: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                topic: { type: "STRING" },
                questions: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["topic", "questions"],
            },
          },
          jobSearchActions: { type: "ARRAY", items: { type: "STRING" } },
          freeResources: { type: "ARRAY", items: { type: "STRING" } },
          mistakesToAvoid: { type: "ARRAY", items: { type: "STRING" } },
          checkpoints: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                proof: { type: "STRING" },
              },
              required: ["label", "proof"],
            },
          },
        },
        required: [
          "title",
          "summary",
          "roleFit",
          "focusAreas",
          "skillsToLearn",
          "weeklyPlan",
          "projects",
          "portfolioTasks",
          "interviewPrep",
          "jobSearchActions",
          "freeResources",
          "mistakesToAvoid",
          "checkpoints",
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
    const parsed = JSON.parse(rawText) as Partial<CareerRoadmapResponse>;
    return NextResponse.json({ roadmap: normalizeRoadmap(parsed, payload), remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI career roadmap could not be parsed." }, { status: 502 });
  }
}
