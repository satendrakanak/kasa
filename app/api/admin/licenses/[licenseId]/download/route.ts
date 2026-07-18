import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { decryptLicenseKey } from "@/lib/admin/crypto";
import { prisma } from "@/lib/admin/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ licenseId: string }> },
) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { licenseId } = await params;
  const license = await prisma.license.findUnique({
    where: { id: licenseId },
    include: { product: true },
  });

  if (!license) {
    return NextResponse.json({ error: "License not found" }, { status: 404 });
  }

  const key = decryptLicenseKey(license.keyEncrypted);
  const payload = {
    product: license.product.slug,
    buyerEmail: license.buyerEmail,
    buyerName: license.buyerName,
    licenseKey: key || license.keyPreview,
    keyPreview: license.keyPreview,
    edition: license.edition,
    plan: license.plan,
    status: license.status,
    maxActivations: license.maxActivations,
    userLimit: license.userLimit,
    courseLimit: license.courseLimit,
    facultyLimit: license.facultyLimit,
    expiresAt: license.expiresAt?.toISOString() || null,
    renewalUrl: license.renewalUrl,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${license.product.slug}-${license.keyPreview.replace(/[^a-zA-Z0-9]/g, "-")}.json"`,
    },
  });
}
