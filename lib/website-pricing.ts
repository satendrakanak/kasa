import { pricing as fallbackPricing } from "@/lib/landing";

const DEFAULT_ADMIN_URL = "https://admin.getkasa.in";

type WebsitePricingApiPlan = {
  product?: {
    name?: string | null;
    description?: string | null;
  };
  edition: "STARTER" | "PLUS" | "ENTERPRISE";
  plan: string;
  planLabel: string;
  currency: string;
  amount: number;
  maxActivations: number;
  userLimit: number | null;
  courseLimit: number | null;
  facultyLimit: number | null;
  features: string[];
  rules?: {
    certificateRule?: "lecture_completion" | "exam_pass";
    allowedCourseModes?: string[];
  } | null;
  highlighted?: boolean;
};

type WebsitePricingApiResponse = {
  ok?: boolean;
  plans?: WebsitePricingApiPlan[];
};

export type WebsitePricingPlan = {
  name: string;
  eyebrow: string;
  price: string;
  note: string;
  features: string[];
  highlighted?: boolean;
  bestFor: string;
};

const editionNames: Record<WebsitePricingApiPlan["edition"], string> = {
  STARTER: "Starter",
  PLUS: "Plus",
  ENTERPRISE: "Enterprise",
};

const editionNotes: Record<WebsitePricingApiPlan["edition"], string> = {
  STARTER:
    "For new academies launching a branded course website with self-paced learning.",
  PLUS:
    "For institutes that need live classes, faculty workflows, tests, and growth operations.",
  ENTERPRISE:
    "For larger teams that need every module, advanced controls, and rollout support.",
};

const editionBestFor: Record<WebsitePricingApiPlan["edition"], string> = {
  STARTER: "Best for solo trainers and small teams starting their first academy.",
  PLUS: "Best for institutes already selling, teaching, and managing active cohorts.",
  ENTERPRISE: "Best for multi-team institutes that need deeper operations control.",
};

const priorityFeatures: Record<WebsitePricingApiPlan["edition"], string[]> = {
  STARTER: [
    "Branded academy website and course storefront",
    "Self-paced course delivery and learner progress",
    "Certificates based on lecture completion",
  ],
  PLUS: [
    "Everything in Starter",
    "Faculty workspace, live classes, and batches",
    "Exams, assignments, coupons, refunds, and email templates",
  ],
  ENTERPRISE: [
    "Everything in Plus",
    "All KASA modules enabled",
    "Priority support, advanced settings, and complete branding control",
  ],
};

function getAdminUrl() {
  return (
    process.env.KASA_ADMIN_URL?.trim() ||
    process.env.NEXT_PUBLIC_KASA_ADMIN_URL?.trim() ||
    DEFAULT_ADMIN_URL
  ).replace(/\/$/, "");
}

function formatCurrency(currency: string, amount: number) {
  if (amount <= 0) return "Custom";

  const symbol = currency.toUpperCase() === "INR" ? "₹" : "$";
  return `${symbol}${amount.toLocaleString("en-IN", {
    maximumFractionDigits: amount % 1 ? 2 : 0,
  })}`;
}

function formatLimit(label: string, value: number | null) {
  return `${value ?? "Unlimited"} ${label}`;
}

function formatCertificateRule(rule?: WebsitePricingApiPlan["rules"]) {
  if (!rule?.certificateRule) return null;

  return rule.certificateRule === "exam_pass"
    ? "Certificate after exam pass"
    : "Certificate after lecture completion";
}

function uniqueFeatures(features: Array<string | null | undefined>) {
  return [...new Set(features.filter(Boolean) as string[])].slice(0, 8);
}

function mapPlan(plan: WebsitePricingApiPlan): WebsitePricingPlan {
  const name = editionNames[plan.edition];
  const price = formatCurrency(plan.currency, plan.amount);
  const limitFeatures = [
    formatLimit("users", plan.userLimit),
    formatLimit("courses", plan.courseLimit),
    formatLimit("faculty", plan.facultyLimit),
    `${plan.maxActivations} installation${plan.maxActivations === 1 ? "" : "s"}`,
    formatCertificateRule(plan.rules),
  ];

  return {
    name,
    eyebrow: `${name} ${plan.planLabel}`,
    price: plan.plan === "LIFETIME" && price !== "Custom" ? `${price} lifetime` : price,
    note: plan.product?.description || editionNotes[plan.edition],
    features: uniqueFeatures([
      ...priorityFeatures[plan.edition],
      ...limitFeatures,
      ...plan.features,
    ]),
    highlighted: plan.highlighted ?? plan.edition === "PLUS",
    bestFor: editionBestFor[plan.edition],
  };
}

function fallbackPlans(): WebsitePricingPlan[] {
  return fallbackPricing.map((plan) => ({
    ...plan,
    eyebrow: `${plan.name} plan`,
    bestFor: plan.highlighted
      ? editionBestFor.PLUS
      : plan.name === "Starter"
        ? editionBestFor.STARTER
        : editionBestFor.ENTERPRISE,
  }));
}

export async function getWebsitePricingPlans(): Promise<WebsitePricingPlan[]> {
  try {
    const response = await fetch(`${getAdminUrl()}/api/v1/website-pricing`, {
      cache: "no-store",
    });

    if (!response.ok) return fallbackPlans();

    const payload = (await response.json()) as WebsitePricingApiResponse;
    if (!payload.ok || !payload.plans?.length) return fallbackPlans();

    return payload.plans.map(mapPlan);
  } catch {
    return fallbackPlans();
  }
}
