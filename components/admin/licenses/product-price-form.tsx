"use client";

import type { KasaEdition, PlanType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COURSE_DELIVERY_MODES,
  KASA_MODULES,
  normalizeFeatures,
  normalizeRules,
} from "@/lib/admin/kasa-modules";

const editions = ["STARTER", "PLUS", "ENTERPRISE"] as const;
const plans = ["LIFETIME", "SIX_MONTHS", "TWELVE_MONTHS", "CUSTOM"] as const;
const currencies = ["INR", "USD", "AED", "GBP", "EUR"] as const;

export type ProductOption = {
  id: string;
  name: string;
};

export type PriceFormValue = {
  id: string;
  productId: string;
  edition: KasaEdition;
  plan: PlanType;
  currency: string;
  amount: number;
  maxActivations: number;
  userLimit: number | null;
  courseLimit: number | null;
  facultyLimit: number | null;
  envatoItemId: string | null;
  features: unknown;
  rules: unknown;
};

export function ProductPriceForm({
  action,
  products,
  price,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  products: ProductOption[];
  price?: PriceFormValue;
  submitLabel: string;
}) {
  const edition = price?.edition ?? "STARTER";
  const featureDefaults = normalizeFeatures(price?.features, edition);
  const ruleDefaults = normalizeRules(price?.rules, edition);

  return (
    <form action={action} className="grid gap-5 px-5 pb-6 md:px-6">
      {price ? <input type="hidden" name="productPriceId" value={price.id} /> : null}
      <div className="grid gap-4 rounded-xl border border-border/75 bg-background/55 p-4">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">Plan details</h3>
          <p className="mt-1 text-xs text-muted-foreground">Choose product, edition, billing term, and price display.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor={price ? `productId-${price.id}` : "productId"}>Product</Label>
            <select
              id={price ? `productId-${price.id}` : "productId"}
              name="productId"
              required
              defaultValue={price?.productId ?? ""}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `edition-${price.id}` : "edition"}>Edition</Label>
            <select
              id={price ? `edition-${price.id}` : "edition"}
              name="edition"
              defaultValue={edition}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {editions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `plan-${price.id}` : "plan"}>Plan</Label>
            <select
              id={price ? `plan-${price.id}` : "plan"}
              name="plan"
              defaultValue={price?.plan ?? "LIFETIME"}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {plans.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>Currency</Label>
            <Select name="currency" defaultValue={price?.currency ?? "INR"}>
              <SelectTrigger className="h-9 w-full bg-background">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `amount-${price.id}` : "amount"}>Amount</Label>
            <Input
              id={price ? `amount-${price.id}` : "amount"}
              name="amount"
              type="number"
              min={0}
              defaultValue={price?.amount ?? 0}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 rounded-xl border border-border/75 bg-background/55 p-4">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">Usage limits</h3>
          <p className="mt-1 text-xs text-muted-foreground">Leave users, courses, or faculty empty for unlimited access.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor={price ? `maxActivations-${price.id}` : "maxActivations"}>Activations</Label>
            <Input
              id={price ? `maxActivations-${price.id}` : "maxActivations"}
              name="maxActivations"
              type="number"
              min={1}
              defaultValue={price?.maxActivations ?? 1}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `userLimit-${price.id}` : "userLimit"}>Users</Label>
            <Input id={price ? `userLimit-${price.id}` : "userLimit"} name="userLimit" type="number" min={0} defaultValue={price?.userLimit ?? ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `courseLimit-${price.id}` : "courseLimit"}>Courses</Label>
            <Input id={price ? `courseLimit-${price.id}` : "courseLimit"} name="courseLimit" type="number" min={0} defaultValue={price?.courseLimit ?? ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={price ? `facultyLimit-${price.id}` : "facultyLimit"}>Faculty</Label>
            <Input id={price ? `facultyLimit-${price.id}` : "facultyLimit"} name="facultyLimit" type="number" min={0} defaultValue={price?.facultyLimit ?? ""} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor={price ? `envatoItemId-${price.id}` : "envatoItemId"}>Envato item id</Label>
            <Input id={price ? `envatoItemId-${price.id}` : "envatoItemId"} name="envatoItemId" defaultValue={price?.envatoItemId ?? ""} />
          </div>
        </div>
      </div>
      <div className="grid gap-3 rounded-xl border border-border/75 bg-background/55 p-4">
        <div className="flex flex-col gap-1">
          <Label>Plan modules</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            These modules belong to this product edition and control license entitlements.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {KASA_MODULES.map((module) => (
            <label
              key={module.key}
              className="flex min-h-24 cursor-pointer items-start gap-3 rounded-xl border border-border/80 bg-card/75 p-3 text-sm transition hover:border-primary/45 hover:bg-secondary/45"
            >
              <Checkbox
                name="features"
                value={module.key}
                defaultChecked={featureDefaults[module.key]}
                className="mt-1"
              />
              <span className="min-w-0">
                <span className="block font-medium">{module.label}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{module.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-4 rounded-xl border border-border/75 bg-background/55 p-4">
        <div className="grid gap-2">
          <Label htmlFor={price ? `certificateRule-${price.id}` : "certificateRule"}>Certificate rule</Label>
          <select
            id={price ? `certificateRule-${price.id}` : "certificateRule"}
            name="certificateRule"
            defaultValue={ruleDefaults.certificateRule}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="lecture_completion">Lecture completion</option>
            <option value="exam_pass">Exam pass</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label>Allowed delivery modes</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {COURSE_DELIVERY_MODES.map((mode) => (
              <label key={mode.key} className="flex min-h-20 cursor-pointer items-start gap-3 rounded-xl border border-border/80 bg-card/75 p-3 text-sm transition hover:border-primary/45 hover:bg-secondary/45">
                <Checkbox
                  name="allowedCourseModes"
                  value={mode.key}
                  defaultChecked={ruleDefaults.allowedCourseModes.includes(mode.key)}
                  className="mt-1"
                />
                <span className="min-w-0">
                  <span className="block font-medium">{mode.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{mode.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Button type="submit" size="lg">{submitLabel}</Button>
      </div>
    </form>
  );
}
