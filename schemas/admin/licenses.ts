import { z } from "zod";

const checkboxBoolean = z.preprocess(
  (value) => value === "on" || value === "true" || value === true,
  z.boolean().default(false),
);

export const licenseSchema = z.object({
  productPriceId: z.string().min(1),
  buyerName: z.string().optional(),
  buyerEmail: z.string().email(),
  platform: z.string().min(2).default("manual"),
  purchaseRef: z.string().optional(),
  saleChannel: z.string().min(2).max(80).default("direct"),
  marketingSource: z.string().max(120).optional(),
  soldAt: z.string().optional(),
  expiresAt: z.string().optional(),
  renewalUrl: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
  isComplimentary: checkboxBoolean,
});

export const licenseStatusSchema = z.object({
  licenseId: z.string().min(1),
  status: z.enum(["ACTIVE", "SUSPENDED", "EXPIRED", "REVOKED", "REFUNDED"]),
});

export const deactivateActivationSchema = z.object({
  activationId: z.string().min(1),
});

export const deleteLicenseSchema = z.object({
  licenseId: z.string().min(1),
});

export const revokeLicenseAccessSchema = z.object({
  licenseId: z.string().min(1),
});
