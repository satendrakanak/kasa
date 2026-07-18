"use server";

import { KasaEdition, PlanType, ProductStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin/auth";
import {
  enforcePlanHierarchy,
  KASA_MODULES,
  normalizeFeatures,
  normalizeRules,
} from "@/lib/admin/kasa-modules";
import { prisma } from "@/lib/admin/prisma";
import {
  deleteProductPriceSchema,
  deleteProductSchema,
  productPriceSchema,
  productPriceStatusSchema,
  productSchema,
  updateProductPriceSchema,
  updateProductSchema,
} from "@/schemas/admin/products";
import { formObject, revalidateAdminLicensePaths } from "@/actions/admin/action-utils";

function optionalLimit(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getProductPriceEntitlementData(parsed: {
  edition: KasaEdition | string;
  features?: string[];
  certificateRule: "lecture_completion" | "exam_pass";
  allowedCourseModes?: string[];
}) {
  const edition = parsed.edition as KasaEdition;
  const defaults = enforcePlanHierarchy(
    (["STARTER", "PLUS", "ENTERPRISE"] as const).map((item) => ({
      edition: item,
      features: normalizeFeatures(undefined, item),
      rules: normalizeRules(undefined, item),
    })),
  );
  const fallback =
    defaults.find((item) => item.edition === edition) ??
    ({
      edition,
      features: normalizeFeatures(undefined, edition),
      rules: normalizeRules(undefined, edition),
    } as const);
  const selectedFeatures = new Set(parsed.features || []);
  const features = normalizeFeatures(
    Object.fromEntries(
      KASA_MODULES.map((module) => [
        module.key,
        Array.isArray(parsed.features)
          ? selectedFeatures.has(module.key)
          : fallback.features[module.key],
      ]),
    ),
    edition,
  );
  const rules = normalizeRules(
    {
      certificateRule: parsed.certificateRule,
      allowedCourseModes: parsed.allowedCourseModes?.length
        ? parsed.allowedCourseModes
        : fallback.rules.allowedCourseModes,
    },
    edition,
  );

  return {
    features: features as unknown as Prisma.InputJsonValue,
    rules: rules as unknown as Prisma.InputJsonValue,
  };
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const parsed = productSchema.parse(formObject(formData));

  await prisma.product.create({
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      status: ProductStatus.ACTIVE,
    },
  });

  revalidateAdminLicensePaths();
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin();
  const parsed = updateProductSchema.parse(formObject(formData));

  const duplicate = await prisma.product.findUnique({
    where: { slug: parsed.slug },
    select: { id: true },
  });

  if (duplicate && duplicate.id !== parsed.productId) return;

  await prisma.product.update({
    where: { id: parsed.productId },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
    },
  });

  revalidateAdminLicensePaths();
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const parsed = deleteProductSchema.parse(formObject(formData));
  const product = await prisma.product.findUnique({
    where: { id: parsed.productId },
    include: { _count: { select: { licenses: true } } },
  });

  if (!product || product._count.licenses > 0) return;

  await prisma.product.delete({ where: { id: product.id } });
  revalidateAdminLicensePaths();
}

export async function toggleProductStatusAction(formData: FormData) {
  await requireAdmin();
  const productId = String(formData.get("productId") || "");
  const status = String(formData.get("status") || "") as ProductStatus;
  if (!productId || !["ACTIVE", "ARCHIVED"].includes(status)) return;

  await prisma.product.update({
    where: { id: productId },
    data: { status },
  });

  revalidateAdminLicensePaths();
}

export async function createProductPriceAction(formData: FormData) {
  await requireAdmin();
  const parsed = productPriceSchema.parse({
    ...formObject(formData),
    features: formData.getAll("features"),
    allowedCourseModes: formData.getAll("allowedCourseModes"),
  });

  const product = await prisma.product.findUnique({
    where: { id: parsed.productId },
    select: { id: true },
  });
  if (!product) return;
  const entitlementData = getProductPriceEntitlementData(parsed);

  await prisma.productPrice.upsert({
    where: {
      productId_edition_plan_currency: {
        productId: parsed.productId,
        edition: parsed.edition as KasaEdition,
        plan: parsed.plan as PlanType,
        currency: parsed.currency.toUpperCase(),
      },
    },
    update: {
      amount: parsed.amount,
      maxActivations: parsed.maxActivations,
      userLimit: optionalLimit(parsed.userLimit),
      courseLimit: optionalLimit(parsed.courseLimit),
      facultyLimit: optionalLimit(parsed.facultyLimit),
      features: entitlementData.features,
      rules: entitlementData.rules,
      envatoItemId: parsed.envatoItemId?.trim() || null,
      isActive: true,
    },
    create: {
      productId: parsed.productId,
      edition: parsed.edition as KasaEdition,
      plan: parsed.plan as PlanType,
      currency: parsed.currency.toUpperCase(),
      amount: parsed.amount,
      maxActivations: parsed.maxActivations,
      userLimit: optionalLimit(parsed.userLimit),
      courseLimit: optionalLimit(parsed.courseLimit),
      facultyLimit: optionalLimit(parsed.facultyLimit),
      features: entitlementData.features,
      rules: entitlementData.rules,
      envatoItemId: parsed.envatoItemId?.trim() || null,
    },
  });

  revalidateAdminLicensePaths();
}

export async function updateProductPriceAction(formData: FormData) {
  await requireAdmin();
  const parsed = updateProductPriceSchema.parse({
    ...formObject(formData),
    features: formData.getAll("features"),
    allowedCourseModes: formData.getAll("allowedCourseModes"),
  });

  const existing = await prisma.productPrice.findUnique({
    where: { id: parsed.productPriceId },
    select: { id: true },
  });
  if (!existing) return;

  const duplicate = await prisma.productPrice.findFirst({
    where: {
      id: { not: parsed.productPriceId },
      productId: parsed.productId,
      edition: parsed.edition as KasaEdition,
      plan: parsed.plan as PlanType,
      currency: parsed.currency.toUpperCase(),
    },
    select: { id: true },
  });
  if (duplicate) return;

  const entitlementData = getProductPriceEntitlementData(parsed);

  await prisma.productPrice.update({
    where: { id: parsed.productPriceId },
    data: {
      productId: parsed.productId,
      edition: parsed.edition as KasaEdition,
      plan: parsed.plan as PlanType,
      currency: parsed.currency.toUpperCase(),
      amount: parsed.amount,
      maxActivations: parsed.maxActivations,
      userLimit: optionalLimit(parsed.userLimit),
      courseLimit: optionalLimit(parsed.courseLimit),
      facultyLimit: optionalLimit(parsed.facultyLimit),
      features: entitlementData.features,
      rules: entitlementData.rules,
      envatoItemId: parsed.envatoItemId?.trim() || null,
    },
  });

  revalidateAdminLicensePaths();
}

export async function deleteProductPriceAction(formData: FormData) {
  await requireAdmin();
  const parsed = deleteProductPriceSchema.parse(formObject(formData));
  const usedLicenses = await prisma.license.count({
    where: { productPriceId: parsed.productPriceId },
  });
  if (usedLicenses > 0) return;

  await prisma.productPrice.delete({
    where: { id: parsed.productPriceId },
  });

  revalidateAdminLicensePaths();
}

export async function toggleProductPriceStatusAction(formData: FormData) {
  await requireAdmin();
  const parsed = productPriceStatusSchema.parse(formObject(formData));

  await prisma.productPrice.update({
    where: { id: parsed.productPriceId },
    data: { isActive: parsed.isActive === "true" },
  });

  revalidateAdminLicensePaths();
}
