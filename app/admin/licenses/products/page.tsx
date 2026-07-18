import {
  CircleDollarSignIcon,
  Layers3Icon,
  PackageIcon,
  TagsIcon,
} from "lucide-react";
import {
  AdminProductsBoard,
  type ProductView,
} from "@/components/admin/licenses/admin-products-board";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/dashboard-format";
import { prisma } from "@/lib/admin/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const admin = await requireAdmin();
  const products = await prisma.product.findMany({
    include: {
      prices: {
        include: { _count: { select: { licenses: true } } },
        orderBy: [{ edition: "asc" }, { plan: "asc" }, { currency: "asc" }],
      },
      _count: { select: { licenses: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const productViews: ProductView[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    status: product.status,
    licenseCount: product._count.licenses,
    prices: product.prices.map((price) => ({
      id: price.id,
      productId: price.productId,
      edition: price.edition,
      plan: price.plan,
      currency: price.currency,
      amount: Number(price.amount),
      maxActivations: price.maxActivations,
      userLimit: price.userLimit,
      courseLimit: price.courseLimit,
      facultyLimit: price.facultyLimit,
      envatoItemId: price.envatoItemId,
      features: price.features,
      rules: price.rules,
      isActive: price.isActive,
      licenseCount: price._count.licenses,
    })),
  }));

  const priceRows = productViews.reduce((sum, product) => sum + product.prices.length, 0);
  const activeRows = productViews.reduce((sum, product) => sum + product.prices.filter((price) => price.isActive).length, 0);
  const envatoRows = productViews.reduce((sum, product) => sum + product.prices.filter((price) => price.envatoItemId).length, 0);
  const lowestPrice = productViews.flatMap((product) => product.prices).reduce<ProductView["prices"][number] | null>((lowest, price) => {
    if (!lowest) return price;
    return price.amount < lowest.amount ? price : lowest;
  }, null);

  const statCards = [
    { label: "Products", value: productViews.length, helper: `${productViews.filter((product) => product.status === "ACTIVE").length} active`, icon: PackageIcon },
    { label: "Pricing rows", value: priceRows, helper: `${activeRows} enabled`, icon: Layers3Icon },
    { label: "Envato mapped", value: envatoRows, helper: "Rows with item id", icon: TagsIcon },
    { label: "Starting price", value: lowestPrice ? formatMoney(lowestPrice.amount, lowestPrice.currency) : "No price", helper: lowestPrice?.currency || "Add pricing", icon: CircleDollarSignIcon },
  ];

  return (
    <AdminShell
      adminName={admin.name}
      adminEmail={admin.email}
      pageTitle="Products and pricing"
      pageDescription="Create sellable KASA products, map Envato item ids, define pricing rows, and control license entitlements cleanly."
      pageEyebrow="Catalog"
    >
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

      <AdminProductsBoard products={productViews} />
    </AdminShell>
  );
}
