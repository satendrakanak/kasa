import { prisma } from "@/lib/admin/prisma";

const AI_PROVIDER_SETTING_KEY = "ai_provider";

export const aiProviders = ["gemini", "openai"] as const;
export type AiProvider = (typeof aiProviders)[number];

export type AiProviderSettings = {
  provider: AiProvider;
};

export const defaultAiProviderSettings: AiProviderSettings = {
  provider: "gemini",
};

function normalizeProvider(value: unknown): AiProvider {
  return aiProviders.includes(value as AiProvider)
    ? (value as AiProvider)
    : defaultAiProviderSettings.provider;
}

function normalizeSettings(value: unknown): AiProviderSettings {
  if (!value || typeof value !== "object") return defaultAiProviderSettings;
  return {
    provider: normalizeProvider((value as { provider?: unknown }).provider),
  };
}

export async function getAiProviderSettings(): Promise<AiProviderSettings> {
  try {
    const setting = await prisma.adminSetting.findUnique({
      where: { key: AI_PROVIDER_SETTING_KEY },
    });
    return normalizeSettings(setting?.value);
  } catch {
    return defaultAiProviderSettings;
  }
}

export async function saveAiProviderSettings(settings: AiProviderSettings) {
  const normalized = normalizeSettings(settings);
  return prisma.adminSetting.upsert({
    where: { key: AI_PROVIDER_SETTING_KEY },
    update: { value: normalized },
    create: { key: AI_PROVIDER_SETTING_KEY, value: normalized },
  });
}

export function getAiProviderEnvironmentStatus() {
  return {
    gemini: Boolean(
      process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim(),
    ),
    openai: Boolean(process.env.OPENAI_API_KEY?.trim()),
    geminiModel: process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash",
    openaiModel: process.env.OPENAI_MODEL?.trim() || "gpt-5.4-mini",
  };
}
