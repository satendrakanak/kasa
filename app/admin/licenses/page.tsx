import {
  ActivityIcon,
  BadgeIndianRupeeIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";
import {
  AdminLicensesBoard,
  type LicensePriceOption,
  type LicenseView,
} from "@/components/admin/licenses/admin-licenses-board";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/dashboard-format";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

function toIso(date: Date | null | undefined) {
  return date?.toISOString() || null;
}

export default async function AdminLicensesPage({
  searchParams,
}: {
  searchParams: Promise<{ newKey?: string }>;
}) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const [licenses, products, totals, revenueRows] = await Promise.all([
    prisma.license.findMany({
      include: {
        product: true,
        productPrice: true,
        activations: { orderBy: { lastSeenAt: "desc" } },
        marketplacePurchases: { orderBy: { createdAt: "desc" } },
        audits: { orderBy: { createdAt: "desc" }, take: 12 },
      },
      orderBy: { createdAt: "desc" },
      take: 150,
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        prices: {
          where: { isActive: true },
          orderBy: [{ edition: "asc" }, { plan: "asc" }, { currency: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    }),
    Promise.all([
      prisma.license.count(),
      prisma.license.count({ where: { status: "ACTIVE" } }),
      prisma.licenseActivation.count({ where: { status: "ACTIVE" } }),
      prisma.license.count({ where: { saleAmount: 0 } }),
      prisma.marketplacePurchase.count(),
      prisma.license.count({ where: { expiresAt: { lte: new Date() } } }),
    ]),
    prisma.license.findMany({
      where: { saleAmount: { gt: 0 } },
      select: { saleAmount: true, saleCurrency: true },
      take: 500,
    }),
  ]);

  const [licenseCount, activeLicenseCount, activeActivationCount, internalFreeCount, marketplaceCount, expiredCount] = totals;
  const revenueCurrency = revenueRows[0]?.saleCurrency || "INR";
  const revenueTotal = revenueRows.reduce((sum, license) => sum + Number(license.saleAmount), 0);

  const priceOptions: LicensePriceOption[] = products.flatMap((product) =>
    product.prices.map((price) => ({
      id: price.id,
      productName: product.name,
      productStatus: product.status,
      edition: price.edition,
      plan: price.plan,
      currency: price.currency,
      amount: Number(price.amount),
      maxActivations: price.maxActivations,
      userLimit: price.userLimit,
      courseLimit: price.courseLimit,
      facultyLimit: price.facultyLimit,
      envatoItemId: price.envatoItemId,
    })),
  );

  const licenseViews: LicenseView[] = licenses.map((license) => ({
    id: license.id,
    productName: license.product.name,
    productSlug: license.product.slug,
    productPriceEnvatoItemId: license.productPrice?.envatoItemId || null,
    keyPreview: license.keyPreview,
    buyerName: license.buyerName,
    buyerEmail: license.buyerEmail,
    platform: license.platform,
    purchaseRef: license.purchaseRef,
    saleAmount: Number(license.saleAmount),
    saleCurrency: license.saleCurrency,
    saleChannel: license.saleChannel,
    marketingSource: license.marketingSource,
    soldAt: license.soldAt.toISOString(),
    edition: license.edition,
    plan: license.plan,
    expiresAt: toIso(license.expiresAt),
    renewalUrl: license.renewalUrl,
    expiryNoticeLastSentAt: toIso(license.expiryNoticeLastSentAt),
    expiryNoticeCount: license.expiryNoticeCount,
    maxActivations: license.maxActivations,
    userLimit: license.userLimit,
    courseLimit: license.courseLimit,
    facultyLimit: license.facultyLimit,
    status: license.status,
    notes: license.notes,
    features: license.productPrice?.features || null,
    rules: license.productPrice?.rules || null,
    activations: license.activations.map((activation) => ({
      id: activation.id,
      instanceLabel: activation.instanceLabel,
      productVersion: activation.productVersion,
      status: activation.status,
      activatedAt: activation.activatedAt.toISOString(),
      lastSeenAt: activation.lastSeenAt.toISOString(),
      deactivatedAt: toIso(activation.deactivatedAt),
    })),
    marketplacePurchases: license.marketplacePurchases.map((purchase) => ({
      id: purchase.id,
      marketplace: purchase.marketplace,
      purchaseCodePreview: purchase.purchaseCodePreview,
      externalItemId: purchase.externalItemId,
      externalItemName: purchase.externalItemName,
      buyerUsername: purchase.buyerUsername,
      buyerEmail: purchase.buyerEmail,
      soldAt: toIso(purchase.soldAt),
      supportedUntil: toIso(purchase.supportedUntil),
      rawSummary: purchase.rawSummary,
    })),
    audits: license.audits.map((audit) => ({
      id: audit.id,
      action: audit.action,
      actor: audit.actor,
      createdAt: audit.createdAt.toISOString(),
    })),
  }));

  const statCards = [
    { label: "All licenses", value: licenseCount, helper: "Issued keys", icon: KeyRoundIcon },
    { label: "Active keys", value: activeLicenseCount, helper: `${expiredCount} expired`, icon: ShieldCheckIcon },
    { label: "Active installs", value: activeActivationCount, helper: "Current devices", icon: ActivityIcon },
    { label: "Revenue", value: formatMoney(revenueTotal, revenueCurrency), helper: `${internalFreeCount} free · ${marketplaceCount} marketplace`, icon: BadgeIndianRupeeIcon },
  ];

  return (
    <AdminShell
      adminName={admin.name}
      adminEmail={admin.email}
      pageTitle="License operations"
      pageDescription="Issue direct, internal, and Envato-linked licenses, monitor activations, and audit every access change from one workspace."
      pageEyebrow="Licensing"
    >
      {params.newKey ? (
        <Alert>
          <KeyRoundIcon className="size-4" />
          <AlertDescription>
            New license generated: <span className="font-semibold">{params.newKey}</span>
          </AlertDescription>
        </Alert>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        {statCards.map(({ label, value, helper, icon: Icon }) => (
          <Card key={label} className="border-[color:var(--button-outline-border)] bg-card/70">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-5 truncate font-heading text-3xl font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
              </div>
              <Icon className="size-5 shrink-0 text-[color:var(--button-outline-foreground)]" aria-hidden="true" />
            </CardContent>
          </Card>
        ))}
      </section>

      <AdminLicensesBoard licenses={licenseViews} prices={priceOptions} />
    </AdminShell>
  );
}
