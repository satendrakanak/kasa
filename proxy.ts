import { NextRequest, NextResponse } from "next/server";

const APEX_HOST = "getkasa.in";
const WWW_HOST = "www.getkasa.in";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host !== APEX_HOST) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = WWW_HOST;
  redirectUrl.protocol = "https:";
  redirectUrl.port = "";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/:path*"],
};
