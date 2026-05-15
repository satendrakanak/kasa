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

async function captureDemoLead(payload: DemoTourPayload | null) {
  if (!payload?.email) return;

  const leadsUrl =
    process.env.LEADS_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_LEADS_API_URL?.trim() ||
    DEFAULT_LEADS_API_URL;
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ").trim();

  await fetch(leadsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name || payload.email,
      email: payload.email,
      institute: payload.businessName || undefined,
      phone: payload.phoneNumber || undefined,
      message:
        payload.useCase?.trim() ||
        "Requested a guided KASA demo tour from the marketing site.",
      source: "demo-tour",
    }),
    cache: "no-store",
  });
}

export async function POST(request: NextRequest) {
  const appUrl =
    process.env.NEXT_PUBLIC_DEMO_APP_URL?.trim() || DEFAULT_DEMO_APP_URL;
  const endpoint = new URL(DEMO_TOUR_START_PATH, appUrl).toString();
  const requestBody = await request.text();
  const payload = parseDemoPayload(requestBody);

  let upstreamResponse: Response;

  try {
    await captureDemoLead(payload).catch(() => undefined);

    upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type":
          request.headers.get("content-type") ?? "application/json",
      },
      body: requestBody,
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
