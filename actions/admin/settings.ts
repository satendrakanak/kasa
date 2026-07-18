"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveDemoOperationsSettings } from "@/lib/admin/demo-settings";
import { getAiProviderEnvironmentStatus, saveAiProviderSettings } from "@/lib/ai/settings";
import { requireAdmin } from "@/lib/admin/auth";
import { aiProviderSchema, demoOperationsSchema } from "@/schemas/admin/settings";

export async function updateDemoOperationsAction(formData: FormData) {
  await requireAdmin();
  const parsed = demoOperationsSchema.parse({
    demoToursEnabled: formData.get("demoToursEnabled") === "on",
    demoResetOnExpiry: formData.get("demoResetOnExpiry") === "on",
  });

  await saveDemoOperationsSettings(parsed);
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=demo");
}

export async function updateAiProviderAction(formData: FormData) {
  await requireAdmin();
  const parsed = aiProviderSchema.parse({ provider: formData.get("provider") });
  const status = getAiProviderEnvironmentStatus();

  if (!status[parsed.provider]) {
    throw new Error(`${parsed.provider === "openai" ? "OpenAI" : "Gemini"} cannot be enabled until its server API key is configured.`);
  }

  await saveAiProviderSettings(parsed);
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=ai");
}
