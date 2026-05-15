import { NextRequest, NextResponse } from "next/server";

const DEFAULT_DEMO_TOUR_API_URL =
  "http://localhost:3000/api/demo-tours/start";

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

export async function POST(request: NextRequest) {
  const endpoint =
    process.env.DEMO_TOUR_API_URL?.trim() || DEFAULT_DEMO_TOUR_API_URL;
  const requestBody = await request.text();

  let upstreamResponse: Response;

  try {
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
