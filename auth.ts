import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/admin/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { credentialsSchema } from "@/schemas/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        if (!user?.passwordHash) return null;
        const isValidPassword = await verifyPassword(
          parsed.data.password,
          user.passwordHash,
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user.role as UserRole | undefined) || UserRole.USER;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.role = (token.role as UserRole | undefined) || UserRole.USER;
      }

      return session;
    },
  },
});
