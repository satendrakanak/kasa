import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { safeRelativePath } from "@/lib/auth/redirects";

const DEFAULT_ROLE = "USER" as UserRole;

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname, search } = request.nextUrl;
      const isAuthenticated = Boolean(auth?.user?.id);

      if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = safeRelativePath(request.nextUrl.searchParams.get("callbackUrl"), "/");
        redirectUrl.search = "";
        return NextResponse.redirect(redirectUrl);
      }

      if (isAuthenticated && auth?.user?.role === "ADMIN" && pathname === "/auth/login") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = safeRelativePath(request.nextUrl.searchParams.get("callbackUrl"), "/admin");
        redirectUrl.search = "";
        return NextResponse.redirect(redirectUrl);
      }

      if (!isAuthenticated && pathname.startsWith("/admin")) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/auth/login";
        redirectUrl.search = "";
        redirectUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
        return NextResponse.redirect(redirectUrl);
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user.role as UserRole | undefined) || DEFAULT_ROLE;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.role = (token.role as UserRole | undefined) || DEFAULT_ROLE;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
