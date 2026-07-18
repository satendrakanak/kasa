import { execFileSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const legacyUrl = process.env.LEGACY_DATABASE_URL;

if (!legacyUrl) {
  throw new Error("LEGACY_DATABASE_URL is required.");
}

function legacyRows(table) {
  const sql = `SELECT COALESCE(json_agg(row_to_json(t))::text, '[]') FROM (SELECT * FROM "${table}") t`;
  const output = execFileSync("psql", [legacyUrl, "-At", "-c", sql], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 32,
  }).trim();

  return JSON.parse(output || "[]");
}

function nullableDate(value) {
  return value ? new Date(value) : null;
}

function requiredDate(value) {
  return value ? new Date(value) : new Date();
}

function pick(row, keys) {
  return Object.fromEntries(keys.map((key) => [key, row[key]]));
}

const legacy = {
  admins: legacyRows("AdminUser"),
  products: legacyRows("Product"),
  prices: legacyRows("ProductPrice"),
  modulePlans: legacyRows("KasaModulePlan"),
  licenses: legacyRows("License"),
  activations: legacyRows("LicenseActivation"),
  audits: legacyRows("AuditLog"),
  purchases: legacyRows("MarketplacePurchase"),
  leads: legacyRows("Lead"),
  settings: legacyRows("AdminSetting"),
};

const modulePlanByEdition = new Map(
  legacy.modulePlans.map((plan) => [plan.edition, plan]),
);

await prisma.$transaction(
  async (tx) => {
    await tx.marketplacePurchase.deleteMany();
    await tx.auditLog.deleteMany();
    await tx.licenseActivation.deleteMany();
    await tx.license.deleteMany();
    await tx.productPrice.deleteMany();
    await tx.product.deleteMany();
    await tx.lead.deleteMany();
    await tx.adminUser.deleteMany();
    await tx.session.deleteMany();
    await tx.account.deleteMany();
    await tx.verificationToken.deleteMany();
    await tx.$executeRawUnsafe(`UPDATE "InterviewQuestion" SET "createdById" = NULL`);
    await tx.user.deleteMany();
    await tx.adminSetting.deleteMany();

    for (const admin of legacy.admins) {
      await tx.user.create({
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          passwordHash: admin.passwordHash,
          role: "ADMIN",
          createdAt: requiredDate(admin.createdAt),
          updatedAt: requiredDate(admin.updatedAt),
        },
      });

      await tx.adminUser.create({
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          passwordHash: admin.passwordHash,
          createdAt: requiredDate(admin.createdAt),
          updatedAt: requiredDate(admin.updatedAt),
        },
      });
    }

    for (const product of legacy.products) {
      await tx.product.create({
        data: {
          ...pick(product, ["id", "name", "slug", "description", "status"]),
          createdAt: requiredDate(product.createdAt),
          updatedAt: requiredDate(product.updatedAt),
        },
      });
    }

    for (const price of legacy.prices) {
      const modulePlan = modulePlanByEdition.get(price.edition);

      await tx.productPrice.create({
        data: {
          ...pick(price, [
            "id",
            "productId",
            "edition",
            "plan",
            "currency",
            "amount",
            "maxActivations",
            "userLimit",
            "courseLimit",
            "facultyLimit",
            "envatoItemId",
            "isActive",
          ]),
          features: modulePlan?.features ?? undefined,
          rules: modulePlan?.rules ?? undefined,
          createdAt: requiredDate(price.createdAt),
          updatedAt: requiredDate(price.updatedAt),
        },
      });
    }

    for (const setting of legacy.settings) {
      await tx.adminSetting.create({
        data: {
          key: setting.key,
          value: setting.value,
          createdAt: requiredDate(setting.createdAt),
          updatedAt: requiredDate(setting.updatedAt),
        },
      });
    }

    for (const lead of legacy.leads) {
      await tx.lead.create({
        data: {
          ...pick(lead, [
            "id",
            "name",
            "email",
            "institute",
            "phone",
            "message",
            "source",
            "leadType",
            "ctaLabel",
            "pageUrl",
            "demoUrl",
            "status",
            "assignedToId",
            "notes",
          ]),
          demoExpiresAt: nullableDate(lead.demoExpiresAt),
          emailedAt: nullableDate(lead.emailedAt),
          createdAt: requiredDate(lead.createdAt),
          updatedAt: requiredDate(lead.updatedAt),
        },
      });
    }

    for (const license of legacy.licenses) {
      await tx.license.create({
        data: {
          ...pick(license, [
            "id",
            "productId",
            "productPriceId",
            "keyHash",
            "keyPreview",
            "keyEncrypted",
            "buyerName",
            "buyerEmail",
            "platform",
            "purchaseRef",
            "saleAmount",
            "saleCurrency",
            "saleChannel",
            "marketingSource",
            "edition",
            "plan",
            "renewalUrl",
            "expiryNoticeCount",
            "maxActivations",
            "userLimit",
            "courseLimit",
            "facultyLimit",
            "status",
            "notes",
          ]),
          soldAt: requiredDate(license.soldAt),
          expiresAt: nullableDate(license.expiresAt),
          expiryNoticeLastSentAt: nullableDate(license.expiryNoticeLastSentAt),
          createdAt: requiredDate(license.createdAt),
          updatedAt: requiredDate(license.updatedAt),
        },
      });
    }

    for (const activation of legacy.activations) {
      await tx.licenseActivation.create({
        data: {
          ...pick(activation, [
            "id",
            "licenseId",
            "instanceIdHash",
            "instanceLabel",
            "productVersion",
            "metadata",
            "status",
          ]),
          activatedAt: requiredDate(activation.activatedAt),
          lastSeenAt: requiredDate(activation.lastSeenAt),
          deactivatedAt: nullableDate(activation.deactivatedAt),
        },
      });
    }

    for (const audit of legacy.audits) {
      await tx.auditLog.create({
        data: {
          ...pick(audit, ["id", "licenseId", "action", "actor", "details"]),
          createdAt: requiredDate(audit.createdAt),
        },
      });
    }

    for (const purchase of legacy.purchases) {
      await tx.marketplacePurchase.create({
        data: {
          ...pick(purchase, [
            "id",
            "marketplace",
            "purchaseCodeHash",
            "purchaseCodePreview",
            "externalItemId",
            "externalItemName",
            "buyerUsername",
            "buyerEmail",
            "licenseId",
            "rawSummary",
          ]),
          soldAt: nullableDate(purchase.soldAt),
          supportedUntil: nullableDate(purchase.supportedUntil),
          createdAt: requiredDate(purchase.createdAt),
          updatedAt: requiredDate(purchase.updatedAt),
        },
      });
    }
  },
  { timeout: 60_000 },
);

const counts = {
  users: await prisma.user.count(),
  products: await prisma.product.count(),
  prices: await prisma.productPrice.count(),
  licenses: await prisma.license.count(),
  leads: await prisma.lead.count(),
};

console.log(JSON.stringify(counts, null, 2));

await prisma.$disconnect();
