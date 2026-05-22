import { NextRequest, NextResponse } from "next/server";

type PricingStrategyRequest = {
  courseType: string;
  expectedStudents: number;
  totalLaunchCost: number;
  recommendedPrice: number;
  starterPrice: number;
  premiumPrice: number;
  projectedRevenue: number;
  estimatedProfit: number;
  profitMargin: number;
  breakEvenStudents: number;
  platformFee: number;
  targetProfit: number;
};

type PricingStrategy = {
  summary: string;
  strategy: string[];
  tierIdeas: string[];
  launchOffer: string;
  riskWarning: string;
  whatsappPromo: string;
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
    ? value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5)
    : [];
  return list.length ? list : fallback;
}

function normalizeRequest(input: Partial<PricingStrategyRequest>): PricingStrategyRequest {
  return {
    courseType: cleanText(input.courseType, "Recorded course", 60),
    expectedStudents: cleanNumber(input.expectedStudents, 100, 1, 10000),
    totalLaunchCost: cleanNumber(input.totalLaunchCost, 100000, 0, 10000000),
    recommendedPrice: cleanNumber(input.recommendedPrice, 999, 0, 1000000),
    starterPrice: cleanNumber(input.starterPrice, 799, 0, 1000000),
    premiumPrice: cleanNumber(input.premiumPrice, 1499, 0, 1000000),
    projectedRevenue: cleanNumber(input.projectedRevenue, 100000, 0, 100000000),
    estimatedProfit: cleanNumber(input.estimatedProfit, 25000, -10000000, 100000000),
    profitMargin: cleanNumber(input.profitMargin, 25, -100, 100),
    breakEvenStudents: cleanNumber(input.breakEvenStudents, 50, 1, 10000),
    platformFee: cleanNumber(input.platformFee, 8, 0, 40),
    targetProfit: cleanNumber(input.targetProfit, 35, 0, 200),
  };
}

function normalizeStrategy(value: unknown): PricingStrategy | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<PricingStrategy>;
  return {
    summary: cleanText(item.summary, "The pricing is usable, but the launch offer should be positioned clearly.", 500),
    strategy: cleanList(item.strategy, ["Keep one clear recommended price", "Use an early-bird offer for the first batch"]),
    tierIdeas: cleanList(item.tierIdeas, ["Starter: recorded access", "Premium: live support and certificate"]),
    launchOffer: cleanText(item.launchOffer, "Offer a limited early-bird discount for the first enrolled students.", 500),
    riskWarning: cleanText(item.riskWarning, "Watch acquisition cost and confirm enough demand before increasing ad spend.", 500),
    whatsappPromo: cleanText(item.whatsappPromo, "New course batch is open. Join now for structured lessons, practice, and support.", 700),
  };
}

function buildFallbackStrategy(payload: PricingStrategyRequest): PricingStrategy {
  const marginIsHealthy = payload.profitMargin >= 25;
  const breakEvenPressure = payload.breakEvenStudents > payload.expectedStudents * 0.75;
  const courseTypeLabel = payload.courseType.toLowerCase();

  return {
    summary: marginIsHealthy
      ? `Your ${courseTypeLabel} pricing has a workable margin. Keep the recommended price as the main offer and use the starter tier only for a short early-bird window.`
      : `Your ${courseTypeLabel} pricing is tight. Improve the offer value or reduce launch costs before spending more on ads.`,
    strategy: [
      `Keep INR ${payload.recommendedPrice} as the main public price because it balances recovery cost and profit margin.`,
      `Use INR ${payload.starterPrice} for the first batch or first ${Math.max(10, Math.round(payload.expectedStudents * 0.15))} enrollments only.`,
      `Use INR ${payload.premiumPrice} when adding live support, doubt sessions, certificates, or personal feedback.`,
      breakEvenPressure
        ? "Your break-even point is high, so validate demand with a small launch before increasing marketing spend."
        : "Your break-even target looks manageable if the expected enrollment is realistic.",
    ],
    tierIdeas: [
      `Starter: recorded access, practice material, and basic community support at INR ${payload.starterPrice}.`,
      `Core: full course access, worksheets, tests, and completion certificate at INR ${payload.recommendedPrice}.`,
      `Premium: core plan plus live doubt sessions, feedback, and priority support at INR ${payload.premiumPrice}.`,
    ],
    launchOffer: `Run a limited early-bird offer at INR ${payload.starterPrice}, then move to INR ${payload.recommendedPrice} once the first batch seats are filled.`,
    riskWarning: breakEvenPressure
      ? `You need around ${payload.breakEvenStudents} paid students to recover launch cost. Reduce ad spend or improve conversion before scaling.`
      : `Watch acquisition cost carefully. If paid ads become expensive, protect the INR ${payload.recommendedPrice} main price instead of discounting too much.`,
    whatsappPromo: `New ${payload.courseType} batch is open.\nGet structured lessons, practice support, and clear learning outcomes.\nEarly-bird fee: INR ${payload.starterPrice} for limited seats.\nRegular fee: INR ${payload.recommendedPrice}.\nReply interested to get details.`,
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

  let payload: PricingStrategyRequest;
  try {
    payload = normalizeRequest(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = [
    "Create a practical pricing strategy for an Indian online academy owner.",
    "Return only JSON matching the schema.",
    "Use concise, actionable English. Do not overpromise sales results.",
    "Focus on pricing positioning, launch offer, tier packaging, margin risk, and a WhatsApp promo message.",
    "",
    `Course type: ${payload.courseType}`,
    `Expected students: ${payload.expectedStudents}`,
    `Total launch cost: INR ${payload.totalLaunchCost}`,
    `Recommended price: INR ${payload.recommendedPrice}`,
    `Starter price: INR ${payload.starterPrice}`,
    `Premium price: INR ${payload.premiumPrice}`,
    `Projected revenue: INR ${payload.projectedRevenue}`,
    `Estimated profit: INR ${payload.estimatedProfit}`,
    `Profit margin: ${payload.profitMargin}%`,
    `Break-even students: ${payload.breakEvenStudents}`,
    `Platform/payment fee: ${payload.platformFee}%`,
    `Target profit margin: ${payload.targetProfit}%`,
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.68,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              summary: { type: "STRING" },
              strategy: { type: "ARRAY", items: { type: "STRING" } },
              tierIdeas: { type: "ARRAY", items: { type: "STRING" } },
              launchOffer: { type: "STRING" },
              riskWarning: { type: "STRING" },
              whatsappPromo: { type: "STRING" },
            },
            required: ["summary", "strategy", "tierIdeas", "launchOffer", "riskWarning", "whatsappPromo"],
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const fallback = buildFallbackStrategy(payload);
    return NextResponse.json({
      strategy: fallback,
      remaining: rate.remaining,
      fallback: true,
      notice:
        response.status === 429 || response.status === 503
          ? "Gemini is busy or quota-limited right now, so a smart pricing strategy was generated from your calculator numbers."
          : "AI strategy could not be generated right now, so a smart pricing strategy was generated from your calculator numbers.",
    });
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof rawText !== "string") {
    return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
  }

  try {
    const strategy = normalizeStrategy(JSON.parse(rawText));
    if (!strategy) {
      return NextResponse.json({ error: "AI response did not include a usable pricing strategy." }, { status: 502 });
    }
    return NextResponse.json({ strategy, remaining: rate.remaining });
  } catch {
    return NextResponse.json({
      strategy: buildFallbackStrategy(payload),
      remaining: rate.remaining,
      fallback: true,
      notice: "AI response could not be parsed, so a smart pricing strategy was generated from your calculator numbers.",
    });
  }
}
