import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type ProfitRequest = {
  students: number;
  averageFee: number;
  teacherSalary: number;
  marketingCost: number;
  platformCost: number;
  rentCost: number;
  otherCost: number;
  taxPercent: number;
  grossRevenue: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
  breakEvenStudents: number;
};

type ProfitStrategy = {
  summary: string;
  profitMoves: string[];
  costWarnings: string[];
  growthIdeas: string[];
  ownerNote: string;
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

function cleanText(value: unknown, fallback: string, max = 600) {
  const text = String(value || fallback).trim();
  return (text || fallback).slice(0, max);
}

function cleanList(value: unknown, fallback: string[]) {
  const list = Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5)
    : [];
  return list.length ? list : fallback;
}

function normalizeRequest(input: Partial<ProfitRequest>): ProfitRequest {
  return {
    students: cleanNumber(input.students, 180, 1, 100000),
    averageFee: cleanNumber(input.averageFee, 1500, 0, 1000000),
    teacherSalary: cleanNumber(input.teacherSalary, 120000, 0, 10000000),
    marketingCost: cleanNumber(input.marketingCost, 50000, 0, 10000000),
    platformCost: cleanNumber(input.platformCost, 15000, 0, 10000000),
    rentCost: cleanNumber(input.rentCost, 30000, 0, 10000000),
    otherCost: cleanNumber(input.otherCost, 20000, 0, 10000000),
    taxPercent: cleanNumber(input.taxPercent, 5, 0, 40),
    grossRevenue: cleanNumber(input.grossRevenue, 270000, 0, 100000000),
    totalExpense: cleanNumber(input.totalExpense, 235000, 0, 100000000),
    netProfit: cleanNumber(input.netProfit, 35000, -100000000, 100000000),
    profitMargin: cleanNumber(input.profitMargin, 13, -100, 100),
    breakEvenStudents: cleanNumber(input.breakEvenStudents, 157, 1, 100000),
  };
}

function normalizeStrategy(value: unknown): ProfitStrategy | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<ProfitStrategy>;
  return {
    summary: cleanText(item.summary, "Your academy profit needs regular cost tracking and enrollment planning."),
    profitMoves: cleanList(item.profitMoves, ["Improve fee collection", "Increase high-margin online batches"]),
    costWarnings: cleanList(item.costWarnings, ["Watch marketing spend", "Track fixed costs monthly"]),
    growthIdeas: cleanList(item.growthIdeas, ["Launch referral offers", "Upsell test series or recorded courses"]),
    ownerNote: cleanText(item.ownerNote, "Review profit every month and avoid scaling ad spend until margins are stable."),
  };
}

function buildFallbackStrategy(payload: ProfitRequest): ProfitStrategy {
  const healthy = payload.profitMargin >= 25;
  const tight = payload.profitMargin < 12;
  return {
    summary: healthy
      ? "Your academy has a healthy monthly margin. Protect it by keeping fixed costs controlled while increasing enrollments."
      : tight
        ? "Your academy margin is tight. Focus on fee collection, reducing avoidable spend, and improving student count before adding new costs."
        : "Your academy is profitable, but there is room to improve margin through pricing, retention, and cost control.",
    profitMoves: [
      `Break-even is about ${payload.breakEvenStudents} students. Keep monthly enrollment comfortably above this level.`,
      "Review low-performing ad campaigns and move budget toward channels that bring paid admissions.",
      "Create higher-margin add-ons like test series, revision batches, recorded courses, or certificates.",
      "Track pending fees weekly so revenue does not look good on paper but weak in cash flow.",
    ],
    costWarnings: [
      `Marketing cost should be watched because it directly reduces profit from the INR ${payload.grossRevenue} monthly revenue.`,
      "Teacher salary and rent are fixed costs, so low enrollment months can quickly reduce margin.",
      "Avoid adding new tools or operations cost until the current batches stay profitable for at least two months.",
    ],
    growthIdeas: [
      "Run referral offers for current students instead of relying only on paid ads.",
      "Add a premium doubt-solving or mentorship batch for students who need extra support.",
      "Use recorded lessons to serve more students without increasing teacher hours in the same ratio.",
    ],
    ownerNote: "Use this calculator monthly. If margin stays below 15%, improve pricing or reduce costs before scaling.",
  };
}

export async function POST(request: NextRequest) {
  let payload: ProfitRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }


  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Daily AI generation limit reached. Please try again tomorrow." },
      { status: 429 },
    );
  }

  const prompt = [
    "Create a practical monthly profit improvement strategy for an Indian coaching institute or online academy owner.",
    "Return only JSON matching the schema.",
    "Use concise, actionable English. Do not overpromise results.",
    "Focus on revenue, fixed costs, marketing efficiency, fee collection, retention, and high-margin offers.",
    "",
    `Students: ${payload.students}`,
    `Average monthly fee: INR ${payload.averageFee}`,
    `Gross revenue: INR ${payload.grossRevenue}`,
    `Teacher salary: INR ${payload.teacherSalary}`,
    `Marketing cost: INR ${payload.marketingCost}`,
    `Platform/tools cost: INR ${payload.platformCost}`,
    `Rent/office cost: INR ${payload.rentCost}`,
    `Other cost: INR ${payload.otherCost}`,
    `Tax percent: ${payload.taxPercent}%`,
    `Total expense: INR ${payload.totalExpense}`,
    `Net profit: INR ${payload.netProfit}`,
    `Profit margin: ${payload.profitMargin}%`,
    `Break-even students: ${payload.breakEvenStudents}`,
  ].join("\n");

  const result = await generateAiContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.68,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              summary: { type: "STRING" },
              profitMoves: { type: "ARRAY", items: { type: "STRING" } },
              costWarnings: { type: "ARRAY", items: { type: "STRING" } },
              growthIdeas: { type: "ARRAY", items: { type: "STRING" } },
              ownerNote: { type: "STRING" },
            },
            required: ["summary", "profitMoves", "costWarnings", "growthIdeas", "ownerNote"],
          },
        },
      });

  if (!result.ok) {
    return NextResponse.json({
      strategy: buildFallbackStrategy(payload),
      remaining: rate.remaining,
      fallback: true,
      notice:
        result.status === 429 || result.status === 503
          ? "The selected AI provider is busy right now, so a smart profit strategy was generated from your calculator numbers."
          : "AI profit strategy could not be generated right now, so a smart strategy was generated from your calculator numbers.",
    });
  }

  const data = result.data;
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ strategy: buildFallbackStrategy(payload), remaining: rate.remaining, fallback: true, notice: "AI returned an empty response, so a smart profit strategy was generated from your numbers." });
  }

  try {
    const strategy = normalizeStrategy(JSON.parse(rawText));
    if (!strategy) {
      return NextResponse.json({ strategy: buildFallbackStrategy(payload), remaining: rate.remaining, fallback: true, notice: "AI response was not usable, so a smart profit strategy was generated from your numbers." });
    }
    return NextResponse.json({ strategy, remaining: rate.remaining });
  } catch {
    return NextResponse.json({ strategy: buildFallbackStrategy(payload), remaining: rate.remaining, fallback: true, notice: "AI response could not be parsed, so a smart profit strategy was generated from your numbers." });
  }
}
