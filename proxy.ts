import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const APEX_HOST = "getkasa.in";
const WWW_HOST = "www.getkasa.in";

const { auth } = NextAuth(authConfig);

export const proxy = auth((request) => {
  const host = request.headers.get("host")?.split(":")[0];

  if (host !== APEX_HOST) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.hostname = WWW_HOST;
  redirectUrl.protocol = "https:";
  redirectUrl.port = "";

  return NextResponse.redirect(redirectUrl, 308);
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
