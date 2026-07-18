import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BadgeIndianRupeeIcon,
  BellRingIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  Clock3Icon,
  KeyRoundIcon,
  PackageIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { AdminShell } from "@/components/admin/layouts/admin-shell";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminDashboardData, type AdminDashboardData } from "@/lib/admin/dashboard-data";
import { displayLabel, formatDate, formatMoney } from "@/lib/admin/dashboard-format";

export const dynamic = "force-dynamic";

type BreakdownRows = AdminDashboardData["revenue"]["channelRows"];
type MonthRows = AdminDashboardData["revenue"]["monthRows"];

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    notation: value >= 100000 ? "compact" : "standard",
  }).format(value);
}

function cleanLabel(value: string) {
  return displayLabel(value || "unknown").toLowerCase();
}

function percent(value: number, total: number, minimum = 5) {
  if (!value || !total) return 0;

  return Math.max(minimum, Math.round((value / total) * 100));
}

function panelClass(extra = "") {
  return `rounded-2xl border border-border/80 bg-card/85 shadow-xl shadow-primary/5 backdrop-blur ${extra}`;
}

function labelClass() {
  return "text-[0.66rem] font-black uppercase tracking-[0.28em] text-primary/80";
}

function StatusChip({ children, tone = "amber" }: { children: ReactNode; tone?: "amber" | "red" | "green" | "blue" }) {
  const tones = {
    amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200",
    red: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200",
    blue: "border-primary/25 bg-primary/10 text-primary dark:text-primary",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StatTile({
  label,
  value,
  helper,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  helper: string;
  icon: typeof TrendingUpIcon;
  accent: string;
}) {
  return (
    <div className="group rounded-2xl border border-border/75 bg-card/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-foreground">{value}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/10 transition group-hover:bg-primary/15">
          <Icon className={`size-4 ${accent}`} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-2 text-xs font-medium text-muted-foreground">{helper}</p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  icon: Icon,
  href,
}: {
  eyebrow: string;
  title: string;
  icon?: typeof TrendingUpIcon;
  href?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className={labelClass()}>{eyebrow}</p>
        <h2 className="mt-2 text-xl font-black tracking-tight text-foreground">{title}</h2>
      </div>
      {href ? (
        <Link
          href={href}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border/80 bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          aria-label={title}
        >
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </Link>
      ) : Icon ? (
        <Icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
      ) : null}
    </div>
  );
}

function RevenuePulse({ rows, currency }: { rows: MonthRows; currency: string }) {
  const maxRevenue = Math.max(...rows.map((row) => row.revenue), 1);

  return (
    <div className={panelClass("p-5 lg:col-span-3")}>
      <SectionHeader eyebrow="Revenue" title="Monthly license revenue" href="/admin/licenses" />
      <p className="mt-1 text-sm font-medium text-muted-foreground">Paid license sales from the last six months.</p>
      <div className="mt-7 flex h-48 items-end gap-5 px-2 sm:gap-7">
        {rows.map((row) => {
          const height = row.revenue ? percent(row.revenue, maxRevenue, 14) : 2;

          return (
            <div key={row.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end justify-center border-b border-border/70">
                <div
                  className="w-full max-w-14 rounded-t-2xl bg-primary shadow-[0_12px_22px_rgba(22,71,163,0.18)] dark:shadow-[0_12px_22px_rgba(88,201,138,0.14)]"
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-foreground">{row.label.split(" ")[0]}</p>
                <p className="text-[0.68rem] font-medium text-muted-foreground">{row.count} paid</p>
                <p className="text-[0.68rem] font-bold text-primary">{formatMoney(row.revenue, currency)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QueueItem({
  value,
  label,
  href,
  tone,
}: {
  value: number;
  label: string;
  href: string;
  tone: "amber" | "red" | "blue" | "green";
}) {
  const tones = {
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
    red: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
    blue: "bg-primary/10 text-primary",
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-border/80 bg-background/60 p-4 transition hover:border-primary/40 hover:bg-background"
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-black ${tones[tone]}`}>
        {compactNumber(value)}
      </span>
      <span className="min-w-0 flex-1 text-sm font-bold text-foreground">{label}</span>
      <ArrowRightIcon className="size-4 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}

function ActionCenter({
  expiringSoon,
  expired,
  freshLeads,
  unpricedProducts,
}: {
  expiringSoon: number;
  expired: number;
  freshLeads: number;
  unpricedProducts: number;
}) {
  const total = expiringSoon + expired + freshLeads + unpricedProducts;

  return (
    <div className={panelClass("p-5 lg:col-span-2")}>
      <div className="flex items-start justify-between gap-4">
        <SectionHeader eyebrow="Action center" title="Priority queue" />
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <CircleAlertIcon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        <QueueItem value={freshLeads} label="Fresh or follow-up leads" href="/admin/leads" tone="blue" />
        <QueueItem value={expiringSoon} label="Licenses ending soon" href="/admin/licenses" tone="amber" />
        <QueueItem value={expired} label="Expired or blocked access" href="/admin/licenses" tone="red" />
        <QueueItem value={unpricedProducts} label="Products missing prices" href="/admin/licenses/products" tone="green" />
      </div>
      <p className="mt-4 text-xs font-semibold text-muted-foreground">{total} items need attention from current data.</p>
    </div>
  );
}

function MiniBars({ rows, currency, title }: { rows: BreakdownRows; currency: string; title: string }) {
  const topRows = rows.slice(0, 4);
  const maxRevenue = Math.max(...topRows.map((row) => row.revenue), 1);

  return (
    <div className="rounded-xl border border-border/80 bg-background/60 p-4">
      <h3 className="text-sm font-black text-foreground">{title}</h3>
      <div className="mt-4 grid gap-3">
        {topRows.length ? topRows.map((row) => (
          <div key={row.label} className="grid gap-1.5">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-bold capitalize text-foreground">{cleanLabel(row.label)}</span>
              <span className="font-semibold text-muted-foreground">{formatMoney(row.revenue, currency)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percent(row.revenue, maxRevenue, 8)}%` }}
              />
            </div>
          </div>
        )) : (
          <p className="rounded-xl border border-dashed border-border p-3 text-xs font-medium text-muted-foreground">No revenue yet.</p>
        )}
      </div>
    </div>
  );
}

function AccessHealth({
  active,
  total,
  expiring,
  expired,
}: {
  active: number;
  total: number;
  expiring: number;
  expired: number;
}) {
  const coverage = percent(active, total, 0);

  return (
    <div className={panelClass("p-5 lg:col-span-2")}>
      <SectionHeader eyebrow="Subscriptions" title="Access health" href="/admin/licenses" />
      <div className="mt-5 rounded-xl border border-border/80 bg-background/60 p-5">
        <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-center">
          <div
            className="grid aspect-square place-items-center rounded-full"
            style={{ background: `conic-gradient(var(--primary) ${coverage}%, var(--secondary) ${coverage}% 100%)` }}
          >
            <div className="grid size-24 place-items-center rounded-full bg-card text-center shadow-inner">
              <div>
                <p className="text-2xl font-black text-foreground">{active}</p>
                <p className="text-[0.65rem] font-bold text-muted-foreground">licenses</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Active license coverage</p>
            <p className="mt-1 text-3xl font-black text-primary">{coverage}%</p>
            <p className="text-xs font-medium text-muted-foreground">{active} active across {total} total licenses</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatTile label="Expiring" value={compactNumber(expiring)} helper="soon" icon={Clock3Icon} accent="text-primary" />
        <StatTile label="Expired" value={compactNumber(expired)} helper="blocked" icon={CircleAlertIcon} accent="text-primary" />
        <StatTile label="Total" value={compactNumber(total)} helper="keys" icon={KeyRoundIcon} accent="text-primary" />
      </div>
    </div>
  );
}

function ContentReadiness({
  products,
  pricedProducts,
  questions,
  publishedQuestions,
}: {
  products: number;
  pricedProducts: number;
  questions: number;
  publishedQuestions: number;
}) {
  const rows = [
    { label: "Products priced", done: pricedProducts, total: products },
    { label: "Questions published", done: publishedQuestions, total: questions },
    { label: "Catalog ready", done: pricedProducts + publishedQuestions, total: products + questions },
  ];

  return (
    <div className={panelClass("p-5")}>
      <SectionHeader eyebrow="Publishing" title="Content readiness" icon={BookOpenIcon} />
      <div className="mt-5 grid gap-4">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-foreground">{row.label}</span>
              <span className="font-semibold text-muted-foreground">{row.done}/{row.total || 0}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percent(row.done, row.total, 0)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/licenses/products" className="mt-5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm font-black text-primary">
        Review product pricing
        <ArrowRightIcon className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function ProductCatalog({ products }: { products: AdminDashboardData["products"] }) {
  return (
    <div className={panelClass("p-5")}>
      <SectionHeader eyebrow="Products" title="Catalog snapshot" href="/admin/licenses/products" />
      <div className="mt-5 grid gap-3">
        {products.slice(0, 5).map((product) => (
          <Link
            key={product.id}
            href="/admin/licenses/products"
            className="flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-background/60 p-4 transition hover:border-primary/40"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-foreground">{product.name}</span>
              <span className="block text-xs font-medium text-muted-foreground">
                {product._count.licenses} licenses / {product.prices.length} prices
              </span>
            </span>
            <StatusChip tone={product.status === "ACTIVE" ? "green" : "red"}>
              {cleanLabel(product.status)}
            </StatusChip>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LeadPipeline({ rows }: { rows: AdminDashboardData["leadStatusRows"] }) {
  const statuses = ["NEW", "CONTACTED", "QUALIFIED", "WON", "CLOSED"];
  const counts = statuses.map((status) => ({
    status,
    count: rows.find((row) => row.status === status)?.count || 0,
  }));
  const total = Math.max(counts.reduce((sum, item) => sum + item.count, 0), 1);
  const colors: Record<string, string> = {
    NEW: "var(--primary)",
    CONTACTED: "var(--primary-hover)",
    QUALIFIED: "var(--sidebar-ring)",
    WON: "var(--chart-2)",
    CLOSED: "var(--muted-foreground)",
  };

  return (
    <div className={panelClass("p-5")}>
      <SectionHeader eyebrow="CRM" title="Lead pipeline" href="/admin/leads" />
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-secondary">
        {counts.map((item) => (
          <span
            key={item.status}
            className="h-full"
            style={{ width: `${percent(item.count, total, item.count ? 8 : 0)}%`, background: colors[item.status] }}
          />
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {counts.map((item) => (
          <div key={item.status} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-semibold text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: colors[item.status] }} />
              {cleanLabel(item.status)}
            </span>
            <span className="font-black text-foreground">{item.count}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-secondary/70 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Conversion health</p>
        <p className="mt-1 text-3xl font-black text-foreground">{percent(counts.find((item) => item.status === "WON")?.count || 0, total, 0)}%</p>
        <p className="text-xs font-medium text-muted-foreground">of total leads converted</p>
      </div>
    </div>
  );
}

function LatestOrders({ sales, currency }: { sales: AdminDashboardData["revenue"]["recentSales"]; currency: string }) {
  return (
    <div className={panelClass("p-5")}>
      <SectionHeader eyebrow="Payments" title="Latest orders" href="/admin/licenses" />
      <div className="mt-5 grid gap-3">
        {sales.length ? sales.slice(0, 5).map((sale) => (
          <div key={sale.id} className="rounded-xl border border-border/80 bg-background/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-foreground">{sale.buyerEmail}</p>
                <p className="mt-1 truncate text-xs font-medium text-muted-foreground">{sale.product.name} / {formatDate(sale.soldAt)}</p>
              </div>
              <p className="shrink-0 text-sm font-black text-foreground">{formatMoney(Number(sale.saleAmount), sale.saleCurrency || currency)}</p>
            </div>
            <div className="mt-3">
              <StatusChip tone="green">paid</StatusChip>
            </div>
          </div>
        )) : (
          <p className="rounded-xl border border-dashed border-border p-5 text-sm font-medium text-muted-foreground">No paid license orders yet.</p>
        )}
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const admin = await requireAdmin();
  const data = await getAdminDashboardData();
  const currency = data.metrics.revenueCurrency;
  const productWithPrices = data.products.filter((product) => product.prices.length > 0).length;
  const unpricedProducts = Math.max(0, data.metrics.productCount - productWithPrices);
  const firstName = admin.name?.trim().split(/\s+/)[0] || "KASA team";

  return (
    <AdminShell
      adminName={admin.name}
      adminEmail={admin.email}
      pageTitle="Dashboard"
      pageDescription="Revenue, licenses, leads, products, and support signals."
      pageEyebrow="Admin"
      showHero={false}
    >
      <div className="mx-auto grid w-full max-w-[1180px] gap-4 text-foreground">
        <section className="admin-hero relative overflow-hidden rounded-[1.75rem] p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[image:var(--button-solid)]" />
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/14 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 size-56 rounded-full bg-primary/8 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                KASA live workspace
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                Namaste, <span className="bg-[image:var(--button-solid)] bg-clip-text text-transparent">{firstName}.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-muted-foreground sm:text-base">
                Your KASA command centre is ready. Track revenue, access, leads and content from one live view.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
                <span>{data.metrics.licenseCount} licenses</span>
                <span className="size-1 rounded-full bg-primary/45" />
                <span>{data.metrics.leadCount} leads</span>
                <span className="size-1 rounded-full bg-primary/45" />
                <span>{data.metrics.productCount} products</span>
                <span className="size-1 rounded-full bg-primary/45" />
                <span>{data.metrics.questionCount} interview questions</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:w-48 lg:flex-col">
              <Button asChild className="h-11 justify-center rounded-xl">
                <Link href="/admin/licenses">
                  <KeyRoundIcon className="size-4" aria-hidden="true" />
                  Manage licenses
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 justify-center rounded-xl bg-card/55 backdrop-blur">
                <Link href="/admin/leads">
                  <UsersIcon className="size-4" aria-hidden="true" />
                  Open lead inbox
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="Paid revenue" value={formatMoney(data.metrics.monthRevenue, currency)} helper={`${data.revenue.recentSales.length} latest paid orders`} icon={BadgeIndianRupeeIcon} accent="text-primary" />
            <StatTile label="Active licenses" value={compactNumber(data.metrics.activeLicenses)} helper={`${percent(data.metrics.activeLicenses, data.metrics.licenseCount, 0)}% of keys active`} icon={KeyRoundIcon} accent="text-primary" />
            <StatTile label="Products" value={compactNumber(data.metrics.productCount)} helper={`${productWithPrices} with pricing`} icon={PackageIcon} accent="text-primary" />
            <StatTile label="Needs attention" value={compactNumber(data.metrics.expiringSoonCount + data.metrics.expiredCount + data.metrics.newLeadCount + unpricedProducts)} helper="licenses, leads, pricing" icon={CircleAlertIcon} accent="text-primary" />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <RevenuePulse rows={data.revenue.monthRows} currency={currency} />
          <ActionCenter
            expiringSoon={data.metrics.expiringSoonCount}
            expired={data.metrics.expiredCount}
            freshLeads={data.metrics.newLeadCount}
            unpricedProducts={unpricedProducts}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <div className={panelClass("p-5 lg:col-span-3")}>
            <SectionHeader eyebrow="Licenses" title="Recent license records" href="/admin/licenses" />
            <div className="mt-5 grid gap-3">
              {data.licenses.slice(0, 5).map((license) => (
                <Link
                  key={license.id}
                  href="/admin/licenses"
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border/80 bg-background/60 p-4 transition hover:border-primary/40"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-foreground">{license.buyerEmail}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">
                      {license.product.name} / {cleanLabel(license.edition)} / expires {formatDate(license.expiresAt)}
                    </span>
                  </span>
                  <span className="shrink-0">
                    <StatusChip tone={license.status === "ACTIVE" ? "green" : license.status === "SUSPENDED" ? "amber" : "red"}>
                      {cleanLabel(license.status)}
                    </StatusChip>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <AccessHealth
            active={data.metrics.activeLicenses}
            total={data.metrics.licenseCount}
            expiring={data.metrics.expiringSoonCount}
            expired={data.metrics.expiredCount}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className={panelClass("p-5")}>
            <SectionHeader eyebrow="Revenue mix" title="Sales channels" icon={ShoppingBagIcon} />
            <div className="mt-5 grid gap-4">
              <MiniBars title="By channel" rows={data.revenue.channelRows} currency={currency} />
              <MiniBars title="By edition" rows={data.revenue.editionRows} currency={currency} />
            </div>
          </div>
          <ContentReadiness
            products={data.metrics.productCount}
            pricedProducts={productWithPrices}
            questions={data.metrics.questionCount}
            publishedQuestions={data.metrics.publishedQuestionCount}
          />
          <ProductCatalog products={data.products} />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className={panelClass("p-5")}>
            <SectionHeader eyebrow="Recent leads" title="Lead inbox" href="/admin/leads" />
            <div className="mt-5 grid gap-3">
              {data.recentLeads.slice(0, 5).map((lead) => (
                <Link key={lead.id} href="/admin/leads" className="flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-border/80 bg-background/60 p-4 transition hover:border-primary/40">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-black text-primary">
                    {lead.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-foreground">{lead.name}</span>
                    <span className="block truncate text-xs font-medium text-muted-foreground">{lead.email}</span>
                  </span>
                  <span className="shrink-0">
                    <StatusChip tone={lead.status === "WON" ? "green" : lead.status === "CLOSED" ? "red" : "blue"}>
                      {cleanLabel(lead.status)}
                    </StatusChip>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <LeadPipeline rows={data.leadStatusRows} />
          <LatestOrders sales={data.revenue.recentSales} currency={currency} />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className={panelClass("p-5")}>
            <SectionHeader eyebrow="Marketing" title="Source performance" icon={TrendingUpIcon} />
            <div className="mt-5">
              <MiniBars title="Top sources" rows={data.revenue.sourceRows} currency={currency} />
            </div>
          </div>
          <div className={panelClass("p-5")}>
            <SectionHeader eyebrow="Audit" title="Latest admin movement" icon={BellRingIcon} />
            <div className="mt-5 grid gap-3">
              {data.auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex gap-3 rounded-xl border border-border/80 bg-background/60 p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    {log.action.includes("CREATE") ? (
                      <CheckCircle2Icon className="size-4" aria-hidden="true" />
                    ) : (
                      <Clock3Icon className="size-4" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black capitalize text-foreground">{cleanLabel(log.action)}</p>
                    <p className="truncate text-xs font-medium text-muted-foreground">{log.license?.buyerEmail || log.license?.product.name || "System event"}</p>
                    <p className="text-[0.68rem] font-medium text-muted-foreground">{formatDate(log.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p className="pb-3 text-right text-xs font-semibold text-muted-foreground">
          Snapshot refreshed {formatDate(new Date())}
        </p>
      </div>
    </AdminShell>
  );
}
