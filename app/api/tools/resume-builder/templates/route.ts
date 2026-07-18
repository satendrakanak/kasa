import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/gateway";

type TemplateSuggestion = {
  name: string;
  tag: string;
  description: string;
  layout: "One column" | "Two column" | "Compact" | "Photo";
};

const layouts = ["One column", "Two column", "Compact", "Photo"] as const;

function cleanString(value: unknown, fallback: string, max = 120) {
  const text = String(value || fallback).replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, max);
}

function normalizeTemplate(value: Partial<TemplateSuggestion>, index: number): TemplateSuggestion {
  const layout = layouts.includes(value.layout as TemplateSuggestion["layout"])
    ? value.layout as TemplateSuggestion["layout"]
    : layouts[index % layouts.length];

  return {
    name: cleanString(value.name, `AI Resume ${index + 1}`, 32),
    tag: cleanString(value.tag, "AI generated", 18),
    description: cleanString(value.description, "Fresh AI-generated resume layout.", 120),
    layout,
  };
}

function fallbackTemplates(): TemplateSuggestion[] {
  return [
    {
      name: "Minimal Impact",
      tag: "AI clean",
      description: "Minimal layout with strong spacing for freshers, analysts, and support roles.",
      layout: "One column",
    },
    {
      name: "Product Story",
      tag: "AI modern",
      description: "Two-column resume for product, design, marketing, and startup profiles.",
      layout: "Two column",
    },
    {
      name: "Senior Compact",
      tag: "AI dense",
      description: "Compact format for experienced profiles with more roles, projects, and skills.",
      layout: "Compact",
    },
    {
      name: "Photo Elegant",
      tag: "AI photo",
      description: "Photo-ready profile layout for roles where a headshot is useful.",
      layout: "Photo",
    },
  ];
}

export async function POST(request: NextRequest) {
  let existingTemplates: string[] = [];
  let accent = "Blue";

  try {
    const payload = await request.json();
    existingTemplates = Array.isArray(payload?.existingTemplates)
      ? payload.existingTemplates.map((item: unknown) => cleanString(item, "", 40)).filter(Boolean).slice(0, 20)
      : [];
    accent = cleanString(payload?.accent, "Blue", 24);
  } catch {
    return NextResponse.json({ templates: fallbackTemplates(), source: "fallback" });
  }


  const prompt = [
    "Create fresh resume template ideas for a resume builder.",
    "Return only JSON. Do not repeat existing template names.",
    "The templates should feel meaningfully different from each other, not tiny variations.",
    "Use recruiter-friendly, ATS-safe layouts. Include a mix of fresher, senior, creative, compact, and photo-ready styles.",
    `Current accent color: ${accent}`,
    `Existing templates: ${existingTemplates.join(", ") || "None"}`,
  ].join("\n");

  const result = await generateAiContent({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.75,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          templates: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                tag: { type: "STRING" },
                description: { type: "STRING" },
                layout: { type: "STRING" },
              },
              required: ["name", "tag", "description", "layout"],
            },
          },
        },
        required: ["templates"],
      },
    },
  });

  if (!result.ok) {
    return NextResponse.json({ templates: fallbackTemplates(), source: "fallback" });
  }

  const data = result.data as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  try {
    const parsed = JSON.parse(String(rawText || "{}")) as { templates?: Partial<TemplateSuggestion>[] };
    const templates = (parsed.templates || []).slice(0, 6).map(normalizeTemplate);
    return NextResponse.json({ templates: templates.length ? templates : fallbackTemplates(), source: "ai" });
  } catch {
    return NextResponse.json({ templates: fallbackTemplates(), source: "fallback" });
  }
}
