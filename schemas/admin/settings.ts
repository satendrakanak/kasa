import { z } from "zod";

export const demoOperationsSchema = z.object({
  demoToursEnabled: z.coerce.boolean().default(false),
  demoResetOnExpiry: z.coerce.boolean().default(false),
});

export const aiProviderSchema = z.object({
  provider: z.enum(["gemini", "openai"]),
});
