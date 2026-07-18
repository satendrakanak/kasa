"use server";

import { LicenseStatus, PlanType } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  createLicenseKey,
  encryptLicenseKey,
  previewLicenseKey,
  sha256,
} from "@/lib/admin/crypto";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";
import {
  deactivateActivationSchema,
  deleteLicenseSchema,
  licenseSchema,
  licenseStatusSchema,
  revokeLicenseAccessSchema,
} from "@/schemas/admin/licenses";
import { formObject, revalidateAdminLicensePaths } from "@/actions/admin/action-utils";

function getPlanExpiry(plan: PlanType, customDate?: string) {
  if (plan === "LIFETIME") return null;
  if (plan === "CUSTOM") return customDate ? new Date(customDate) : null;

  const date = new Date();
  date.setMonth(date.getMonth() + (plan === "SIX_MONTHS" ? 6 : 12));
  return date;
}

export async function createLicenseAction(formData: FormData) {
  await requireAdmin();
  const parsed = licenseSchema.parse(formObject(formData));
  const price = await prisma.productPrice.findUnique({
    where: { id: parsed.productPriceId },
    include: { product: true },
  });
  if (!price || !price.isActive || price.product.status !== "ACTIVE") return;

  const edition = price.edition;
  const key = createLicenseKey(`KASA-${edition}`);
  const isComplimentary = parsed.isComplimentary;

  await prisma.license.create({
    data: {
      productId: price.productId,
      productPriceId: price.id,
      keyHash: sha256(key),
      keyPreview: previewLicenseKey(key),
      keyEncrypted: encryptLicenseKey(key),
      buyerName: parsed.buyerName || null,
      buyerEmail: parsed.buyerEmail.toLowerCase(),
      platform: isComplimentary ? "internal" : parsed.platform,
      purchaseRef:
        parsed.purchaseRef || (isComplimentary ? "complimentary-key" : null),
      saleAmount: isComplimentary ? 0 : price.amount,
      saleCurrency: price.currency,
      saleChannel: isComplimentary ? "internal-free" : parsed.saleChannel,
      marketingSource: isComplimentary ? "internal" : parsed.marketingSource || null,
      soldAt: parsed.soldAt ? new Date(parsed.soldAt) : new Date(),
      edition,
      plan: price.plan,
      expiresAt: getPlanExpiry(price.plan, parsed.expiresAt),
      renewalUrl: parsed.renewalUrl || null,
      maxActivations: price.maxActivations,
      userLimit: price.userLimit,
      courseLimit: price.courseLimit,
      facultyLimit: price.facultyLimit,
      notes: isComplimentary
        ? [parsed.notes, "Complimentary/internal key. Revenue excluded."]
            .filter(Boolean)
            .join("\n")
        : parsed.notes || null,
    },
  });

  revalidateAdminLicensePaths();
  redirect(`/admin/licenses?newKey=${encodeURIComponent(key)}`);
}

export async function updateLicenseStatusAction(formData: FormData) {
  await requireAdmin();
  const parsed = licenseStatusSchema.parse(formObject(formData));
  const status = parsed.status as LicenseStatus;

  await prisma.$transaction(async (tx) => {
    await tx.license.update({
      where: { id: parsed.licenseId },
      data: { status },
    });

    if (status !== LicenseStatus.ACTIVE) {
      await tx.licenseActivation.updateMany({
        where: { licenseId: parsed.licenseId, status: "ACTIVE" },
        data: { status: "DEACTIVATED", deactivatedAt: new Date() },
      });
    }

    await tx.auditLog.create({
      data: {
        licenseId: parsed.licenseId,
        action:
          status === LicenseStatus.ACTIVE
            ? "license.reactivated"
            : "license.access_revoked",
        actor: "admin",
        details: { status },
      },
    });
  });

  revalidateAdminLicensePaths();
}

export async function revokeLicenseAccessAction(formData: FormData) {
  await requireAdmin();
  const parsed = revokeLicenseAccessSchema.parse(formObject(formData));
  const license = await prisma.license.findUnique({
    where: { id: parsed.licenseId },
    select: {
      id: true,
      keyPreview: true,
      buyerEmail: true,
      activations: { where: { status: "ACTIVE" }, select: { id: true } },
    },
  });

  if (!license) return;

  await prisma.$transaction(async (tx) => {
    await tx.license.update({
      where: { id: license.id },
      data: { status: LicenseStatus.SUSPENDED },
    });

    await tx.licenseActivation.updateMany({
      where: { licenseId: license.id, status: "ACTIVE" },
      data: { status: "DEACTIVATED", deactivatedAt: new Date() },
    });

    await tx.auditLog.create({
      data: {
        licenseId: license.id,
        action: "license.access_revoked",
        actor: "admin",
        details: {
          keyPreview: license.keyPreview,
          buyerEmail: license.buyerEmail,
          deactivatedInstallations: license.activations.length,
        },
      },
    });
  });

  revalidateAdminLicensePaths();
}

export async function deleteUnusedLicenseAction(formData: FormData) {
  await requireAdmin();
  const parsed = deleteLicenseSchema.parse(formObject(formData));
  const license = await prisma.license.findUnique({
    where: { id: parsed.licenseId },
    include: { activations: { select: { status: true } } },
  });

  if (!license) return;
  const hasActiveInstallations = license.activations.some(
    (activation) => activation.status === "ACTIVE",
  );
  if (hasActiveInstallations) return;

  await prisma.auditLog.create({
    data: {
      licenseId: license.id,
      action: "license.deleted",
      actor: "admin",
      details: {
        keyPreview: license.keyPreview,
        buyerEmail: license.buyerEmail,
      },
    },
  });

  await prisma.license.delete({ where: { id: license.id } });
  revalidateAdminLicensePaths();
}

export async function deactivateActivationAction(formData: FormData) {
  await requireAdmin();
  const parsed = deactivateActivationSchema.parse(formObject(formData));

  const activation = await prisma.licenseActivation.update({
    where: { id: parsed.activationId },
    include: { license: true },
    data: { status: "DEACTIVATED", deactivatedAt: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      licenseId: activation.licenseId,
      action: "installation.deactivated",
      actor: "admin",
      details: {
        instanceLabel: activation.instanceLabel,
        keyPreview: activation.license.keyPreview,
      },
    },
  });

  revalidateAdminLicensePaths();
}
