import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const setupAdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = credentialsSchema;

export const publicSignupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  password: z.string().min(8).max(120),
  callbackUrl: z.string().trim().optional(),
});

export const publicLoginSchema = z.object({
  email: z.string().trim().email().max(120),
  password: z.string().min(1).max(120),
  callbackUrl: z.string().trim().optional(),
});
