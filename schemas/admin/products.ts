import { z } from "zod";

const optionalLimit = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().min(0).optional(),
);

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
});

export const updateProductSchema = productSchema.extend({
  productId: z.string().min(1),
});

export const deleteProductSchema = z.object({
  productId: z.string().min(1),
});

export const productPriceSchema = z.object({
  productId: z.string().min(1),
  edition: z.enum(["STARTER", "PLUS", "ENTERPRISE"]),
  plan: z.enum(["LIFETIME", "SIX_MONTHS", "TWELVE_MONTHS", "CUSTOM"]),
  currency: z.string().min(3).max(3).default("INR"),
  amount: z.coerce.number().min(0),
  maxActivations: z.coerce.number().int().min(1).max(50),
  userLimit: optionalLimit,
  courseLimit: optionalLimit,
  facultyLimit: optionalLimit,
  features: z.array(z.string()).optional(),
  certificateRule: z.enum(["lecture_completion", "exam_pass"]),
  allowedCourseModes: z
    .array(z.enum(["self_learning", "faculty_led", "hybrid"]))
    .optional(),
  envatoItemId: z.string().max(80).optional(),
});

export const updateProductPriceSchema = productPriceSchema.extend({
  productPriceId: z.string().min(1),
});

export const deleteProductPriceSchema = z.object({
  productPriceId: z.string().min(1),
});

export const productPriceStatusSchema = z.object({
  productPriceId: z.string().min(1),
  isActive: z.enum(["true", "false"]),
});
