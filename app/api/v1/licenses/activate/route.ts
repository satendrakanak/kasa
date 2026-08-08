import { createHmac } from "crypto";
import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sha256 } from "@/lib/admin/crypto";
import { normalizeFeatures, normalizeRules } from "@/lib/admin/kasa-modules";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

const activationSchema = z.object({
  licenseKey: z.string().trim().min(1),
  productSlug: z.string().trim().optional(),
  instanceId: z.string().trim().min(8),
  instanceLabel: z.string().trim().optional(),
  productVersion: z.string().trim().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

function failure(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

function signPayload(payload: unknown) {
  const secret = process.env.LICENSE_SIGNING_SECRET || process.env.AUTH_SECRET;

  if (!secret) return null;

  return createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("base64url");
}

function normalizeLicenseKey(value: string) {
  return value.trim().toUpperCase();
}

function isExpired(expiresAt: Date | null) {
  return Boolean(expiresAt && expiresAt.getTime() <= Date.now());
}

function isCompatibleProductSlug(requestedProductSlug: string | undefined, actualProductSlug: string) {
  if (!requestedProductSlug) return true;
  if (requestedProductSlug === actualProductSlug.toLowerCase()) return true;

  return new Set([
    "codewithkasa",
    "kasa-enterprise",
    "kasa-plus",
    "kasa-starter-kit",
  ]).has(requestedProductSlug);
}

export async function POST(request: Request) {
  const parsed = activationSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return failure(400, "INVALID_REQUEST", "Please provide a valid license activation request.");
  }

  const payload = parsed.data;
  const metadata = payload.metadata as Prisma.InputJsonValue | undefined;
  const keyHash = sha256(normalizeLicenseKey(payload.licenseKey));
  const instanceIdHash = sha256(payload.instanceId);
  const requestedProductSlug = payload.productSlug?.toLowerCase();

  const license = await prisma.license.findUnique({
    where: { keyHash },
    include: {
      product: true,
      productPrice: true,
      activations: {
        where: { status: "ACTIVE" },
        select: { id: true, instanceIdHash: true },
      },
    },
  });

  if (!license) {
    return failure(404, "LICENSE_NOT_FOUND", "License key was not found.");
  }

  if (!isCompatibleProductSlug(requestedProductSlug, license.product.slug)) {
    return failure(404, "LICENSE_NOT_FOUND", "License key was not found for this product.");
  }

  if (license.status !== "ACTIVE") {
    return failure(403, `LICENSE_${license.status}`, "Your KASA license is no longer active.");
  }

  if (isExpired(license.expiresAt)) {
    await prisma.license.update({
      where: { id: license.id },
      data: { status: "EXPIRED" },
    });

    return failure(403, "LICENSE_EXPIRED", "Your KASA license has expired.");
  }

  const existingActivation = license.activations.find(
    (activation) => activation.instanceIdHash === instanceIdHash,
  );

  if (!existingActivation && license.activations.length >= license.maxActivations) {
    return failure(
      409,
      "ACTIVATION_LIMIT_REACHED",
      "This license has reached its activation limit.",
    );
  }

  const activation = await prisma.licenseActivation.upsert({
    where: {
      licenseId_instanceIdHash: {
        licenseId: license.id,
        instanceIdHash,
      },
    },
    create: {
      licenseId: license.id,
      instanceIdHash,
      instanceLabel: payload.instanceLabel || null,
      productVersion: payload.productVersion || null,
      metadata,
      status: "ACTIVE",
    },
    update: {
      instanceLabel: payload.instanceLabel || undefined,
      productVersion: payload.productVersion || undefined,
      metadata,
      status: "ACTIVE",
      lastSeenAt: new Date(),
      deactivatedAt: null,
    },
  });

  await prisma.auditLog.create({
    data: {
      licenseId: license.id,
      action: existingActivation ? "license.revalidated" : "license.activated",
      actor: "api",
      details: {
        productSlug: payload.productSlug,
        instanceLabel: payload.instanceLabel,
        productVersion: payload.productVersion,
      },
    },
  });

  const features = normalizeFeatures(
    license.productPrice?.features ?? null,
    license.edition,
  );
  const rules = normalizeRules(license.productPrice?.rules ?? null, license.edition);
  const responsePayload = {
    ok: true,
    license: {
      product: license.product.slug,
      plan: license.edition,
      expiresAt: license.expiresAt?.toISOString() ?? null,
      maxActivations: license.maxActivations,
      activeActivations: existingActivation
        ? license.activations.length
        : license.activations.length + 1,
      limits: {
        users: license.userLimit,
        courses: license.courseLimit,
        faculty: license.facultyLimit,
      },
      features,
      rules,
    },
    activation: {
      id: activation.id,
      status: activation.status,
    },
  };

  return NextResponse.json({
    ...responsePayload,
    signature: signPayload(responsePayload),
  });
}
