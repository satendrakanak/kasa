import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/admin/prisma";

export { hashPassword, verifyPassword } from "@/lib/auth/password";

export async function getCurrentUser() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !user.email) return null;

  const currentUser = await prisma.user.findFirst({
    where: {
      OR: [{ id: user.id }, { email: user.email.toLowerCase() }],
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!currentUser?.email) return null;

  return {
    id: currentUser.id,
    name: currentUser.name || "KASA User",
    email: currentUser.email,
    role: currentUser.role,
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
