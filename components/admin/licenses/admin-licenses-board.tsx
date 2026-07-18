"use client";

import { useMemo, useState } from "react";
import {
  ActivityIcon,
  CheckIcon,
  DownloadIcon,
  KeyRoundIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  ShieldOffIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import {
  createLicenseAction,
  deactivateActivationAction,
  deleteUnusedLicenseAction,
  revokeLicenseAccessAction,
  updateLicenseStatusAction,
} from "@/actions/admin/licenses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminInfoTile,
  formattedDate,
  friendlyLabel,
  limitLabel,
  MetaBox,
  MetaItem,
  SectionLabel,
} from "@/components/admin/shared/detail-primitives";
import { KASA_MODULES, normalizeFeatures, normalizeRules } from "@/lib/admin/kasa-modules";
import { formatMoney } from "@/lib/admin/dashboard-format";

const licenseStatuses = ["ACTIVE", "SUSPENDED", "EXPIRED", "REVOKED", "REFUNDED"] as const;
const statusFilters = ["ALL", ...licenseStatuses] as const;
const sourceFilters = ["ALL", "PAID", "INTERNAL", "ENVATO"] as const;

export type LicensePriceOption = {
  id: string;
  productName: string;
  productStatus: string;
  edition: "STARTER" | "PLUS" | "ENTERPRISE";
  plan: "LIFETIME" | "SIX_MONTHS" | "TWELVE_MONTHS" | "CUSTOM";
  currency: string;
  amount: number;
  maxActivations: number;
  userLimit: number | null;
  courseLimit: number | null;
  facultyLimit: number | null;
  envatoItemId: string | null;
};

export type LicenseActivationView = {
  id: string;
  instanceLabel: string | null;
  productVersion: string | null;
  status: string;
  activatedAt: string;
  lastSeenAt: string;
  deactivatedAt: string | null;
};

export type LicenseMarketplacePurchaseView = {
  id: string;
  marketplace: string;
  purchaseCodePreview: string;
  externalItemId: string;
  externalItemName: string | null;
  buyerUsername: string | null;
  buyerEmail: string | null;
  soldAt: string | null;
  supportedUntil: string | null;
  rawSummary: unknown;
};

export type LicenseAuditView = {
  id: string;
  action: string;
  actor: string | null;
  createdAt: string;
};

export type LicenseView = {
  id: string;
  productName: string;
  productSlug: string;
  productPriceEnvatoItemId: string | null;
  keyPreview: string;
  buyerName: string | null;
  buyerEmail: string;
  platform: string;
  purchaseRef: string | null;
  saleAmount: number;
  saleCurrency: string;
  saleChannel: string;
  marketingSource: string | null;
  soldAt: string;
  edition: "STARTER" | "PLUS" | "ENTERPRISE";
  plan: "LIFETIME" | "SIX_MONTHS" | "TWELVE_MONTHS" | "CUSTOM";
  expiresAt: string | null;
  renewalUrl: string | null;
  expiryNoticeLastSentAt: string | null;
  expiryNoticeCount: number;
  maxActivations: number;
  userLimit: number | null;
  courseLimit: number | null;
  facultyLimit: number | null;
  status: (typeof licenseStatuses)[number];
  notes: string | null;
  features: unknown;
  rules: unknown;
  activations: LicenseActivationView[];
  marketplacePurchases: LicenseMarketplacePurchaseView[];
  audits: LicenseAuditView[];
};

function statusBadgeClass(status: string) {
  if (status === "ACTIVE") return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-200";
  if (status === "SUSPENDED") return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200";
  if (status === "EXPIRED") return "border-slate-300 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";
  return "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-200";
}

function isInternalLicense(license: LicenseView) {
  return license.saleAmount === 0 || license.platform === "internal" || license.saleChannel === "internal-free" || license.marketingSource === "internal";
}

function isEnvatoLicense(license: LicenseView) {
  return Boolean(
    license.marketplacePurchases.length ||
      license.productPriceEnvatoItemId ||
      license.platform.toLowerCase().includes("envato") ||
      license.saleChannel.toLowerCase().includes("envato") ||
      license.marketingSource?.toLowerCase().includes("envato"),
  );
}

function sourceLabel(license: LicenseView) {
  if (isEnvatoLicense(license)) return "Envato";
  if (isInternalLicense(license)) return "Internal free";
  return friendlyLabel(license.saleChannel || license.platform || "direct");
}

function matchesLicense(license: LicenseView, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return true;

  return [
    license.buyerEmail,
    license.buyerName,
    license.keyPreview,
    license.productName,
    license.productSlug,
    license.purchaseRef,
    license.platform,
    license.saleChannel,
    license.marketingSource,
    license.status,
    license.edition,
    license.plan,
    license.productPriceEnvatoItemId,
    ...license.marketplacePurchases.flatMap((purchase) => [
      purchase.marketplace,
      purchase.purchaseCodePreview,
      purchase.externalItemId,
      purchase.externalItemName,
      purchase.buyerUsername,
      purchase.buyerEmail,
    ]),
  ]
    .filter(Boolean)
    .some((item) => String(item).toLowerCase().includes(value));
}

function matchesSourceFilter(license: LicenseView, filter: (typeof sourceFilters)[number]) {
  if (filter === "ALL") return true;
  if (filter === "INTERNAL") return isInternalLicense(license);
  if (filter === "ENVATO") return isEnvatoLicense(license);
  return !isInternalLicense(license) && !isEnvatoLicense(license);
}

function ConfirmIconAction({
  action,
  fields,
  icon: Icon,
  label,
  title,
  description,
  confirmLabel,
  destructive = false,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: Array<{ name: string; value: string }>;
  icon: typeof Trash2Icon;
  label: string;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={destructive ? "destructive" : "outline"} size="icon" aria-label={label} title={label}>
          <Icon className="size-4" aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={action}>
            {fields.map((field) => (
              <input key={field.name} type="hidden" name={field.name} value={field.value} />
            ))}
            <AlertDialogAction
              type="submit"
              className={destructive ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : undefined}
            >
              {confirmLabel}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function IssueLicenseSheet({ prices }: { prices: LicensePriceOption[] }) {
  const [selectedPriceId, setSelectedPriceId] = useState(prices[0]?.id || "");
  const selectedPrice = prices.find((price) => price.id === selectedPriceId) || prices[0] || null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Issue license
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(720px,calc(100vw-18px))] overflow-y-auto sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Issue license key</SheetTitle>
          <SheetDescription>
            Generate paid, Envato-mapped, or internal complimentary access from an active pricing row.
          </SheetDescription>
        </SheetHeader>
        <form action={createLicenseAction} className="grid gap-5 px-4 pb-5">
          <div className="grid gap-4 rounded-xl border border-border/75 bg-background/55 p-4">
            <div className="grid gap-2">
              <Label htmlFor="productPriceId">Product pricing</Label>
              <select
                id="productPriceId"
                name="productPriceId"
                required
                value={selectedPriceId}
                onChange={(event) => setSelectedPriceId(event.target.value)}
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                {prices.map((price) => (
                  <option key={price.id} value={price.id}>
                    {price.productName} · {price.edition} · {friendlyLabel(price.plan)} · {formatMoney(price.amount, price.currency)}
                  </option>
                ))}
              </select>
            </div>
            {selectedPrice ? (
              <div className="grid gap-3 rounded-xl border border-border/70 bg-card/70 p-3 text-sm md:grid-cols-3">
                <MetaItem label="Activations" value={String(selectedPrice.maxActivations)} />
                <MetaItem label="Users" value={limitLabel(selectedPrice.userLimit, "users")} />
                <MetaItem label="Courses" value={limitLabel(selectedPrice.courseLimit, "courses")} />
                <MetaItem label="Faculty" value={limitLabel(selectedPrice.facultyLimit, "faculty")} />
                <MetaItem label="Envato item" value={selectedPrice.envatoItemId || "Not mapped"} />
                <MetaItem label="Product" value={selectedPrice.productStatus} />
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 rounded-xl border border-border/75 bg-background/55 p-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="buyerEmail">Buyer email</Label>
              <Input id="buyerEmail" name="buyerEmail" type="email" required placeholder="buyer@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="buyerName">Buyer name</Label>
              <Input id="buyerName" name="buyerName" placeholder="Institute owner" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <select id="platform" name="platform" defaultValue="manual" className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                <option value="manual">Manual</option>
                <option value="envato">Envato</option>
                <option value="internal">Internal</option>
                <option value="website">Website</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="saleChannel">Sale channel</Label>
              <select id="saleChannel" name="saleChannel" defaultValue="direct" className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                <option value="direct">Direct</option>
                <option value="envato">Envato</option>
                <option value="partner">Partner</option>
                <option value="internal-free">Internal free</option>
                <option value="website-demo">Website demo</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="marketingSource">Marketing source</Label>
              <Input id="marketingSource" name="marketingSource" placeholder="website, referral, envato" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purchaseRef">Purchase ref</Label>
              <Input id="purchaseRef" name="purchaseRef" placeholder="Invoice, order id, Envato ref" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="soldAt">Sold at</Label>
              <Input id="soldAt" name="soldAt" type="datetime-local" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiresAt">Custom expiry</Label>
              <Input id="expiresAt" name="expiresAt" type="date" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="renewalUrl">Renewal URL</Label>
              <Input id="renewalUrl" name="renewalUrl" type="url" placeholder="https://..." />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" rows={3} placeholder="Internal note, customer context, support promise" />
            </div>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" name="isComplimentary" className="size-4" />
              Complimentary/internal key
            </label>
          </div>
          <Button type="submit" size="lg" disabled={!prices.length}>Generate license</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function AdminLicensesBoard({
  licenses,
  prices,
}: {
  licenses: LicenseView[];
  prices: LicensePriceOption[];
}) {
  const [activeLicenseId, setActiveLicenseId] = useState(licenses[0]?.id || "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("ALL");
  const [sourceFilter, setSourceFilter] = useState<(typeof sourceFilters)[number]>("ALL");
  const filteredLicenses = useMemo(
    () =>
      licenses.filter(
        (license) =>
          matchesLicense(license, query) &&
          (statusFilter === "ALL" || license.status === statusFilter) &&
          matchesSourceFilter(license, sourceFilter),
      ),
    [licenses, query, sourceFilter, statusFilter],
  );
  const selectedLicense = licenses.find((license) => license.id === activeLicenseId) || filteredLicenses[0] || licenses[0] || null;

  return (
    <>
      <div className="flex flex-wrap justify-end gap-2">
        <Button asChild variant="outline">
          <a href="/admin/licenses/products">
            <PackageIcon className="size-4" />
            Products
          </a>
        </Button>
        <IssueLicenseSheet prices={prices} />
      </div>
      <section className="grid min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-xl shadow-primary/5 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-border/80 p-3 lg:border-r lg:border-b-0 lg:p-4">
          <label className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-border/80 bg-background px-3 text-sm text-muted-foreground shadow-sm focus-within:border-primary/45 focus-within:ring-2 focus-within:ring-primary/10">
            <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search buyer, key, source, Envato"
              className="h-auto min-w-0 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {statusFilters.map((status) => (
                <option key={status} value={status}>{status === "ALL" ? "All statuses" : friendlyLabel(status)}</option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as typeof sourceFilter)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {sourceFilters.map((source) => (
                <option key={source} value={source}>{source === "ALL" ? "All sources" : friendlyLabel(source)}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Licenses ({filteredLicenses.length})
            </p>
            <Badge variant="secondary">{licenses.filter((license) => license.status === "ACTIVE").length} active</Badge>
          </div>
          <div className="mt-4 grid max-h-[min(40rem,calc(100svh-22rem))] gap-2 overflow-y-auto pr-1">
            {filteredLicenses.length ? (
              filteredLicenses.map((license) => {
                const active = selectedLicense?.id === license.id;
                const activeActivations = license.activations.filter((item) => item.status === "ACTIVE").length;

                return (
                  <button
                    key={license.id}
                    type="button"
                    onClick={() => setActiveLicenseId(license.id)}
                    className={`min-w-0 rounded-xl border p-4 text-left transition hover:border-primary/40 hover:bg-secondary/45 ${
                      active ? "border-primary/55 bg-secondary/70 shadow-sm" : "border-border/70 bg-background/55"
                    }`}
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-heading text-base font-semibold text-foreground">{license.buyerName || license.buyerEmail}</p>
                        <p className="mt-1 truncate text-sm text-muted-foreground">{license.buyerEmail}</p>
                      </div>
                      <Badge variant="outline" className={`${statusBadgeClass(license.status)} shrink-0`}>
                        {friendlyLabel(license.status)}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="secondary">{license.keyPreview}</Badge>
                      <Badge variant="outline">{sourceLabel(license)}</Badge>
                    </div>
                    <p className="mt-3 truncate text-sm text-muted-foreground">{license.productName} · {friendlyLabel(license.edition)} · {friendlyLabel(license.plan)}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {activeActivations}/{license.maxActivations} active installs · sold {formattedDate(license.soldAt)}
                    </p>
                  </button>
                );
              })
            ) : (
              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                No matching licenses.
              </div>
            )}
          </div>
        </aside>
        <div className="min-w-0 p-4 lg:p-5">
          {selectedLicense ? <LicenseDetails license={selectedLicense} /> : (
            <div className="grid min-h-96 place-items-center rounded-2xl border border-dashed text-center text-muted-foreground">
              No license selected.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function LicenseDetails({ license }: { license: LicenseView }) {
  const activeActivations = license.activations.filter((item) => item.status === "ACTIVE").length;
  const features = normalizeFeatures(license.features, license.edition);
  const rules = normalizeRules(license.rules, license.edition);
  const enabledModules = KASA_MODULES.filter((module) => features[module.key]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border/80 pb-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={statusBadgeClass(license.status)}>{friendlyLabel(license.status)}</Badge>
            <Badge variant="secondary">{sourceLabel(license)}</Badge>
            <Badge variant="secondary">{friendlyLabel(license.edition)}</Badge>
            <Badge variant="secondary">{friendlyLabel(license.plan)}</Badge>
          </div>
          <h2 className="mt-3 break-words font-heading text-2xl font-semibold text-foreground lg:text-3xl">
            {license.buyerName || license.buyerEmail}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {license.productName} · {license.keyPreview} · sold {formattedDate(license.soldAt)}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button asChild variant="outline" size="icon" aria-label="Download license" title="Download license">
            <a href={`/api/admin/licenses/${license.id}/download`}>
              <DownloadIcon className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <form action={updateLicenseStatusAction} className="flex min-w-[240px] gap-2">
            <input type="hidden" name="licenseId" value={license.id} />
            <select name="status" defaultValue={license.status} className="h-9 flex-1 rounded-lg border border-input bg-background px-2 text-sm">
              {licenseStatuses.map((status) => <option key={status} value={status}>{friendlyLabel(status)}</option>)}
            </select>
            <Button type="submit" variant="outline" size="icon" aria-label="Save license status" title="Save license status">
              <CheckIcon className="size-4" aria-hidden="true" />
            </Button>
          </form>
          <ConfirmIconAction
            action={revokeLicenseAccessAction}
            fields={[{ name: "licenseId", value: license.id }]}
            icon={ShieldOffIcon}
            label="Revoke license access"
            title="Revoke license access?"
            description={`This will suspend ${license.buyerEmail} and deactivate active installations.`}
            confirmLabel="Revoke access"
            destructive
          />
          <ConfirmIconAction
            action={deleteUnusedLicenseAction}
            fields={[{ name: "licenseId", value: license.id }]}
            icon={Trash2Icon}
            label="Delete unused license"
            title="Delete unused license?"
            description={`This permanently deletes ${license.keyPreview} only if it has no active installations.`}
            confirmLabel="Delete license"
            destructive
          />
        </div>
      </div>

      <div className="grid min-w-0 gap-3 border-b border-border/80 py-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminInfoTile icon={KeyRoundIcon} label="Revenue" value={formatMoney(license.saleAmount, license.saleCurrency)} helper={license.saleChannel} />
        <AdminInfoTile icon={ActivityIcon} label="Activations" value={`${activeActivations}/${license.maxActivations}`} helper="Active installs" />
        <AdminInfoTile icon={UsersIcon} label="Limits" value={limitLabel(license.userLimit, "users")} helper={`${limitLabel(license.courseLimit, "courses")} · ${limitLabel(license.facultyLimit, "faculty")}`} />
        <AdminInfoTile icon={PackageIcon} label="Expiry" value={formattedDate(license.expiresAt)} helper={license.renewalUrl ? "Renewal URL set" : "No renewal URL"} />
      </div>

      <div className="grid min-w-0 gap-5 py-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="grid min-w-0 gap-5">
          <section>
            <SectionLabel>Commercial profile</SectionLabel>
            <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
              <MetaBox label="Buyer email" value={license.buyerEmail} />
              <MetaBox label="Purchase ref" value={license.purchaseRef || "Not captured"} />
              <MetaBox label="Platform" value={friendlyLabel(license.platform)} />
              <MetaBox label="Marketing source" value={license.marketingSource || "No source"} />
              <MetaBox label="Product slug" value={license.productSlug} />
              <MetaBox label="Envato item id" value={license.productPriceEnvatoItemId || "Not mapped"} />
              <MetaBox label="Expiry notices" value={`${license.expiryNoticeCount} sent`} />
              <MetaBox label="Last expiry notice" value={formattedDate(license.expiryNoticeLastSentAt)} />
            </div>
          </section>

          <section>
            <SectionLabel>Entitlements</SectionLabel>
            <div className="mt-3 rounded-2xl border border-border/80 bg-background/65 p-4">
              <div className="flex flex-wrap gap-2">
                {enabledModules.map((module) => (
                  <Badge key={module.key} variant="secondary">{module.label}</Badge>
                ))}
              </div>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <MetaBox label="Certificate rule" value={friendlyLabel(rules.certificateRule)} />
                <MetaBox label="Delivery modes" value={rules.allowedCourseModes.map(friendlyLabel).join(", ")} />
              </div>
            </div>
          </section>

          {license.notes ? (
            <section>
              <SectionLabel>Internal notes</SectionLabel>
              <div className="mt-3 whitespace-pre-wrap rounded-2xl border border-border/80 bg-background/65 p-4 text-sm leading-7 text-foreground">
                {license.notes}
              </div>
            </section>
          ) : null}
        </div>

        <div className="grid min-w-0 gap-5">
          <MarketplacePanel purchases={license.marketplacePurchases} />
          <ActivationPanel activations={license.activations} license={license} />
          <AuditPanel audits={license.audits} />
        </div>
      </div>
    </>
  );
}

function MarketplacePanel({ purchases }: { purchases: LicenseMarketplacePurchaseView[] }) {
  return (
    <section>
      <SectionLabel>Marketplace</SectionLabel>
      <div className="mt-3 grid gap-3 rounded-2xl border border-border/80 bg-background/60 p-4">
        {purchases.length ? purchases.map((purchase) => (
          <div key={purchase.id} className="rounded-xl border border-border/80 bg-card/80 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{purchase.marketplace}</Badge>
              <Badge variant="secondary">{purchase.purchaseCodePreview}</Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">{purchase.externalItemName || purchase.externalItemId}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {purchase.buyerUsername || purchase.buyerEmail || "Marketplace buyer"} · sold {formattedDate(purchase.soldAt)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Support until {formattedDate(purchase.supportedUntil)}</p>
            {purchase.rawSummary ? (
              <details className="mt-3 rounded-lg border border-border/70 bg-background/60 p-3 text-xs">
                <summary className="cursor-pointer font-medium text-foreground">Raw marketplace summary</summary>
                <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words text-muted-foreground">
                  {JSON.stringify(purchase.rawSummary, null, 2)}
                </pre>
              </details>
            ) : null}
          </div>
        )) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No marketplace purchase linked.
          </div>
        )}
      </div>
    </section>
  );
}

function ActivationPanel({ activations, license }: { activations: LicenseActivationView[]; license: LicenseView }) {
  return (
    <section>
      <SectionLabel>Installations</SectionLabel>
      <div className="mt-3 grid max-h-[24rem] gap-3 overflow-y-auto rounded-2xl border border-border/80 bg-background/60 p-4">
        {activations.length ? activations.map((activation) => (
          <div key={activation.id} className="rounded-xl border border-border/80 bg-card/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{activation.instanceLabel || "Unnamed installation"}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {activation.productVersion || "Unknown version"} · last seen {formattedDate(activation.lastSeenAt)}
                </p>
              </div>
              <Badge variant={activation.status === "ACTIVE" ? "default" : "outline"}>{friendlyLabel(activation.status)}</Badge>
            </div>
            {activation.status === "ACTIVE" ? (
              <div className="mt-3">
                <ConfirmIconAction
                  action={deactivateActivationAction}
                  fields={[{ name: "activationId", value: activation.id }]}
                  icon={ActivityIcon}
                  label="Deactivate installation"
                  title="Deactivate this installation?"
                  description={`This installation will stop counting against ${license.keyPreview}.`}
                  confirmLabel="Deactivate"
                />
              </div>
            ) : null}
          </div>
        )) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No installations have checked in yet.
          </div>
        )}
      </div>
    </section>
  );
}

function AuditPanel({ audits }: { audits: LicenseAuditView[] }) {
  return (
    <section>
      <SectionLabel>Audit trail</SectionLabel>
      <div className="mt-3 grid max-h-[20rem] gap-3 overflow-y-auto rounded-2xl border border-border/80 bg-background/60 p-4">
        {audits.length ? audits.map((audit) => (
          <div key={audit.id} className="rounded-xl border border-border/80 bg-card/80 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{audit.action}</Badge>
              <span className="text-xs text-muted-foreground">{formattedDate(audit.createdAt)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{audit.actor || "system"}</p>
          </div>
        )) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            No audit activity yet.
          </div>
        )}
      </div>
    </section>
  );
}
