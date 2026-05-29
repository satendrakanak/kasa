import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

type ResumeBuilderRequest = {
  resumeText: string;
  fileData?: string;
  fileMimeType?: string;
  fileName?: string;
  candidateName: string;
  targetRole: string;
  roleFamily: string;
  yearsExperience: number;
  currentSkills: string;
  template: string;
  tone: string;
  jobDescription?: string;
  atsContext?: {
    atsScore?: number;
    missingKeywords?: string[];
    missingSkills?: string[];
    improvedBullets?: string[];
    weakAreas?: string[];
    quickWins?: string[];
  };
};

type ResumeSection = {
  title: string;
  company?: string;
  location?: string;
  period?: string;
  bullets: string[];
};

type BuiltResume = {
  candidateName: string;
  headline: string;
  contactLine: string;
  professionalSummary: string;
  skills: string[];
  experience: ResumeSection[];
  projects: ResumeSection[];
  education: ResumeSection[];
  achievements: string[];
  certifications: string[];
  atsScoreEstimate: number;
  keywordCoverage: number;
  recruiterFit: string;
  templateAdvice: string;
  improvementNotes: string[];
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

function cleanSections(value: unknown, maxItems: number): ResumeSection[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item, index) => {
    const row = item as Partial<ResumeSection>;
    return {
      title: cleanString(row.title, index === 0 ? "Relevant Experience" : "Additional Experience", 120),
      company: cleanString(row.company, "", 120),
      location: cleanString(row.location, "", 80),
      period: cleanString(row.period, "", 80),
      bullets: cleanList(row.bullets, 5, 260),
    };
  });
}

function normalizeRequest(input: Partial<ResumeBuilderRequest>): ResumeBuilderRequest {
  const fileMimeType = cleanString(input.fileMimeType, "", 120);
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  const atsContext = input.atsContext || {};
  return {
    resumeText: String(input.resumeText || "").replace(/\s+/g, " ").trim().slice(0, 14000),
    fileData: String(input.fileData || "").slice(0, 5_500_000),
    fileMimeType: allowedMimeTypes.includes(fileMimeType) ? fileMimeType : "",
    fileName: cleanString(input.fileName, "", 160),
    candidateName: cleanString(input.candidateName, "Candidate", 90),
    targetRole: cleanString(input.targetRole, "Frontend Developer", 90),
    roleFamily: cleanString(input.roleFamily, "Software Engineering", 90),
    yearsExperience: cleanNumber(input.yearsExperience, 0, 0, 25),
    currentSkills: cleanString(input.currentSkills, "Not specified", 900),
    template: cleanString(input.template, "Modern ATS", 50),
    tone: cleanString(input.tone, "Confident", 50),
    jobDescription: cleanString(input.jobDescription, "", 3000),
    atsContext: {
      atsScore: cleanNumber(atsContext.atsScore, 0, 0, 100),
      missingKeywords: cleanList(atsContext.missingKeywords, 16, 120),
      missingSkills: cleanList(atsContext.missingSkills, 12, 160),
      improvedBullets: cleanList(atsContext.improvedBullets, 10, 300),
      weakAreas: cleanList(atsContext.weakAreas, 8, 260),
      quickWins: cleanList(atsContext.quickWins, 8, 260),
    },
  };
}

function normalizeResume(value: Partial<BuiltResume>, fallbackName: string, fallbackRole: string): BuiltResume {
  return {
    candidateName: cleanString(value.candidateName, fallbackName, 90),
    headline: cleanString(value.headline, fallbackRole, 140),
    contactLine: cleanString(value.contactLine, "Email | Phone | LinkedIn | Portfolio", 180),
    professionalSummary: cleanString(value.professionalSummary, `Role-focused ${fallbackRole} resume summary.`, 900),
    skills: cleanList(value.skills, 28, 90),
    experience: cleanSections(value.experience, 7),
    projects: cleanSections(value.projects, 6),
    education: cleanSections(value.education, 4),
    achievements: cleanList(value.achievements, 10, 260),
    certifications: cleanList(value.certifications, 12, 180),
    atsScoreEstimate: Math.round(cleanNumber(value.atsScoreEstimate, 78, 0, 100)),
    keywordCoverage: Math.round(cleanNumber(value.keywordCoverage, 72, 0, 100)),
    recruiterFit: cleanString(value.recruiterFit, "Clear, role-aligned resume with room for final proofreading.", 420),
    templateAdvice: cleanString(value.templateAdvice, "Use a clean ATS-friendly template with readable headings and simple section order.", 420),
    improvementNotes: cleanList(value.improvementNotes, 8, 260),
  };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key is not configured. Add GEMINI_API_KEY in the environment." }, { status: 503 });
  }

  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json({ error: "Daily AI resume builder limit reached. Please try again tomorrow." }, { status: 429 });
  }

  let payload: ResumeBuilderRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const hasResumeSource = payload.resumeText.length >= 250 || payload.fileData || payload.atsContext?.improvedBullets?.length;
  const hasDirectProfile = payload.candidateName.toLowerCase() !== "candidate" && payload.targetRole && payload.currentSkills !== "Not specified";
  if (!hasResumeSource && !hasDirectProfile) {
    return NextResponse.json({ error: "Upload a resume, paste resume text, connect an ATS report, or add your name and skills first." }, { status: 400 });
  }
  if (payload.fileData && !payload.fileMimeType) {
    return NextResponse.json({ error: "Unsupported resume file type. Upload PDF, DOC, DOCX, or TXT." }, { status: 400 });
  }
  if (payload.fileMimeType === "application/msword" && payload.resumeText.length < 250) {
    return NextResponse.json({ error: "This DOC file could not be read as text. Please upload PDF/DOCX/TXT or paste the resume text." }, { status: 400 });
  }

  const prompt = [
    "You are an expert resume writer and ATS optimization specialist.",
    "Build a polished, truthful, ATS-friendly resume from the supplied resume and ATS context.",
    "Return only valid JSON matching the schema. Do not invent companies, degrees, certifications, dates, or measurable numbers.",
    "You may improve wording, structure, keywords, section order, and bullet clarity. If evidence is missing, keep the wording conservative.",
    "Extract every useful factual section from the old resume: name, phone, email, location, links, all roles, companies, dates, education, projects, certifications, awards, and major skills.",
    "contactLine must preserve real contact details found in the resume. If phone, email, city, LinkedIn, GitHub, or portfolio are present, include them in contactLine.",
    "Do not drop older roles just because the target role is different. Keep relevant experience history, but rewrite bullets toward the target role.",
    "Do not collapse projects into experience unless the resume clearly presents them that way. Preserve meaningful project names and technologies.",
    "Keep the resume easy to scan: strong summary, focused skills, concise bullets, and clean ATS headings.",
    "If ATS context is provided, apply its improved bullets and missing keywords naturally without keyword stuffing.",
    "For freshers, emphasize projects, internships, coursework, and skills. For senior profiles, emphasize leadership, architecture, business impact, and ownership.",
    "",
    `Candidate name: ${payload.candidateName}`,
    `Target role: ${payload.targetRole}`,
    `Role family: ${payload.roleFamily}`,
    `Years of experience: ${payload.yearsExperience}`,
    `Known skills: ${payload.currentSkills}`,
    `Chosen template: ${payload.template}`,
    `Writing tone: ${payload.tone}`,
    payload.jobDescription ? `Target job description: ${payload.jobDescription}` : "",
    "",
    `ATS score before rebuild: ${payload.atsContext?.atsScore || "Not available"}`,
    `Missing keywords: ${(payload.atsContext?.missingKeywords || []).join(", ") || "Not available"}`,
    `Missing skills: ${(payload.atsContext?.missingSkills || []).join(", ") || "Not available"}`,
    `Weak areas: ${(payload.atsContext?.weakAreas || []).join(" | ") || "Not available"}`,
    `Quick wins: ${(payload.atsContext?.quickWins || []).join(" | ") || "Not available"}`,
    `Improved bullets from ATS checker: ${(payload.atsContext?.improvedBullets || []).join(" | ") || "Not available"}`,
    "",
    payload.fileName ? `Uploaded resume file name: ${payload.fileName}` : "",
    "Resume source:",
    payload.resumeText || "Resume file or ATS report context is attached. Extract factual content from available context.",
  ].join("\n");

  const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [{ text: prompt }];
  const canInlineFile = payload.fileMimeType !== "application/msword";
  if (payload.fileData && payload.fileMimeType && canInlineFile) {
    parts.push({ inlineData: { mimeType: payload.fileMimeType, data: payload.fileData } });
  }

  const result = await generateGeminiContent(apiKey, {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.48,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          candidateName: { type: "STRING" },
          headline: { type: "STRING" },
          contactLine: { type: "STRING" },
          professionalSummary: { type: "STRING" },
          skills: { type: "ARRAY", items: { type: "STRING" } },
          experience: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                company: { type: "STRING" },
                location: { type: "STRING" },
                period: { type: "STRING" },
                bullets: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["title", "bullets"],
            },
          },
          projects: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                company: { type: "STRING" },
                location: { type: "STRING" },
                period: { type: "STRING" },
                bullets: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["title", "bullets"],
            },
          },
          education: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                company: { type: "STRING" },
                location: { type: "STRING" },
                period: { type: "STRING" },
                bullets: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["title", "bullets"],
            },
          },
          achievements: { type: "ARRAY", items: { type: "STRING" } },
          certifications: { type: "ARRAY", items: { type: "STRING" } },
          atsScoreEstimate: { type: "NUMBER" },
          keywordCoverage: { type: "NUMBER" },
          recruiterFit: { type: "STRING" },
          templateAdvice: { type: "STRING" },
          improvementNotes: { type: "ARRAY", items: { type: "STRING" } },
        },
        required: [
          "candidateName",
          "headline",
          "contactLine",
          "professionalSummary",
          "skills",
          "experience",
          "projects",
          "education",
          "achievements",
          "certifications",
          "atsScoreEstimate",
          "keywordCoverage",
          "recruiterFit",
          "templateAdvice",
          "improvementNotes",
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
    const parsed = JSON.parse(rawText) as Partial<BuiltResume>;
    return NextResponse.json({ resume: normalizeResume(parsed, payload.candidateName, payload.targetRole), remaining: rate.remaining });
  } catch {
    return NextResponse.json({ error: "AI resume could not be parsed." }, { status: 502 });
  }
}
