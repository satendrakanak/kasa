"use server";

import { AuthError } from "next-auth";
import { ProductStatus, UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { hasAdminUser, hashPassword } from "@/lib/admin/auth";
import { prisma } from "@/lib/admin/prisma";
import { loginSchema, publicLoginSchema, publicSignupSchema, setupAdminSchema } from "@/schemas/auth";

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function safeCallbackUrl(value: string | undefined, fallback: string) {
  if (!value?.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

async function seedProducts() {
  await prisma.product.createMany({
    data: [
      {
        name: "Kasa Enterprise",
        slug: "kasa-enterprise",
        description:
          "Full LMS, live classes, exams, certificates, notifications, and marketplace-ready modules.",
        status: ProductStatus.ACTIVE,
      },
      {
        name: "Kasa Starter Kit",
        slug: "kasa-starter-kit",
        description:
          "A focused starter edition for smaller academies and quick launches.",
        status: ProductStatus.ACTIVE,
      },
    ],
    skipDuplicates: true,
  });
}

export async function setupAdminAction(formData: FormData) {
  if (await hasAdminUser()) redirect("/auth/login");

  const parsed = setupAdminSchema.parse(formObject(formData));
  await prisma.user.create({
    data: {
      name: parsed.name.trim(),
      email: parsed.email.toLowerCase(),
      passwordHash: await hashPassword(parsed.password),
      role: UserRole.ADMIN,
    },
  });

  await seedProducts();

  await signIn("credentials", {
    email: parsed.email.toLowerCase(),
    password: parsed.password,
    redirectTo: "/admin",
  });
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.parse(formObject(formData));

  try {
    await signIn("credentials", {
      email: parsed.email.toLowerCase(),
      password: parsed.password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/auth/login?error=invalid");
    }

    throw error;
  }
}

export async function publicLoginAction(formData: FormData) {
  const parsed = publicLoginSchema.parse(formObject(formData));
  const redirectTo = safeCallbackUrl(parsed.callbackUrl, "/");

  try {
    await signIn("credentials", {
      email: parsed.email.toLowerCase(),
      password: parsed.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/login?error=invalid&callbackUrl=${encodeURIComponent(redirectTo)}`);
    }

    throw error;
  }
}

export async function publicSignupAction(formData: FormData) {
  const parsed = publicSignupSchema.parse(formObject(formData));
  const email = parsed.email.toLowerCase();
  const redirectTo = safeCallbackUrl(parsed.callbackUrl, "/");
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    redirect(`/signup?error=exists&callbackUrl=${encodeURIComponent(redirectTo)}`);
  }

  await prisma.user.create({
    data: {
      name: parsed.name,
      email,
      passwordHash: await hashPassword(parsed.password),
      role: UserRole.USER,
    },
  });

  await signIn("credentials", {
    email,
    password: parsed.password,
    redirectTo,
  });
}
