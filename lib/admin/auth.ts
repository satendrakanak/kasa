import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/admin/prisma";

export { hashPassword, verifyPassword } from "@/lib/auth/password";

export async function getCurrentUser() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !user.email) return null;

  return {
    id: user.id,
    name: user.name || "KASA User",
    email: user.email,
    role: user.role,
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== UserRole.ADMIN) redirect("/auth/login");
  return user;
}

export async function hasAdminUser() {
  const count = await prisma.user.count({
    where: { role: UserRole.ADMIN },
  });

  return count > 0;
}
