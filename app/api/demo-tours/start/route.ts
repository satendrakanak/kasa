import { NextRequest, NextResponse } from "next/server";

const DEFAULT_DEMO_APP_URL = "http://localhost:3000";
const DEFAULT_LEADS_API_URL = "http://localhost:5000/api/v1/leads";
const DEMO_TOUR_START_PATH = "/api/demo-tours/start";

type DemoTourPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  businessName?: string;
  useCase?: string;
  leadType?: string;
  ctaLabel?: string;
  pageUrl?: string;
};

type DemoLeadContext = {
  demoUrl?: string;
  demoExpiresAt?: string;
};

function getSetCookieHeaders(headers: Headers) {
  const withGetSetCookie = headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof withGetSetCookie.getSetCookie === "function") {
    return withGetSetCookie.getSetCookie();
  }

  const cookieHeader = headers.get("set-cookie");
  return cookieHeader ? [cookieHeader] : [];
}

function parseDemoPayload(requestBody: string): DemoTourPayload | null {
  try {
    const payload = JSON.parse(requestBody) as unknown;
    return payload && typeof payload === "object"
      ? (payload as DemoTourPayload)
      : null;
  } catch {
    return null;
  }
}

function extractDemoRedirect(responseBody: string) {
  try {
    const payload = JSON.parse(responseBody) as {
      data?: { defaultRedirect?: string; data?: { defaultRedirect?: string } };
    };
    return payload.data?.defaultRedirect || payload.data?.data?.defaultRedirect || null;
  } catch {
    return null;
  }
}

function buildUpstreamDemoPayload(payload: DemoTourPayload | null) {
  if (!payload) return null;

  return {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    businessName: payload.businessName,
    useCase: payload.useCase,
  };
}

async function captureDemoLead(
  payload: DemoTourPayload | null,
  context: DemoLeadContext = {},
) {
  if (!payload?.email) return;

  const leadsUrl =
    process.env.LEADS_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_LEADS_API_URL?.trim() ||
    DEFAULT_LEADS_API_URL;
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();
  const useCase = payload.useCase?.trim();
  const message =
    useCase && useCase.length >= 10
      ? useCase
      : [
          "Requested a guided KASA demo tour from the marketing site.",
          useCase ? `Entered note: ${useCase}` : null,
        ]
          .filter(Boolean)
          .join(" ");

  const response = await fetch(leadsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name || payload.email,
      email: payload.email,
      institute: payload.businessName || undefined,
      phone: payload.phoneNumber || undefined,
      message,
      source: "demo-tour",
      leadType: "demo",
      ctaLabel: payload.ctaLabel || "Take a Tour",
      pageUrl: payload.pageUrl || undefined,
      demoUrl: context.demoUrl,
      demoExpiresAt: context.demoExpiresAt,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.warn("[demo-tour] lead capture failed", {
      status: response.status,
      leadsUrl,
      body,
    });
  }
}

export async function POST(request: NextRequest) {
  const appUrl =
    process.env.NEXT_PUBLIC_DEMO_APP_URL?.trim() || DEFAULT_DEMO_APP_URL;
  const endpoint = new URL(DEMO_TOUR_START_PATH, appUrl).toString();
  const requestBody = await request.text();
  const payload = parseDemoPayload(requestBody);
  const upstreamPayload = buildUpstreamDemoPayload(payload);

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(upstreamPayload),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Demo workspace is not reachable. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  const responseBody = await upstreamResponse.text();
  if (upstreamResponse.ok) {
    const redirect = extractDemoRedirect(responseBody);
    const demoUrl = redirect ? new URL(redirect, appUrl).toString() : undefined;
    const demoExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await captureDemoLead(payload, { demoUrl, demoExpiresAt }).catch((error) => {
      console.warn("[demo-tour] lead capture request failed", error);
    });
  }

  const response = new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers: {
      "content-type":
        upstreamResponse.headers.get("content-type") ?? "application/json",
    },
  });

  for (const cookie of getSetCookieHeaders(upstreamResponse.headers)) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}
