import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { loginAction } from "@/actions/auth";
import { LoginForm } from "@/components/login-form";
import { safeRelativePath } from "@/lib/auth/redirects";
import { getCurrentUser, hasAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AuthLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  if (!(await hasAdminUser())) redirect("/auth/setup");
  const params = await searchParams;
  const callbackUrl = safeRelativePath(params.callbackUrl, "/admin");
  const currentUser = await getCurrentUser();

  if (currentUser?.role === UserRole.ADMIN) redirect(callbackUrl);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
          action={loginAction}
          callbackUrl={callbackUrl}
          error={params.error === "invalid" ? "Email or password is incorrect." : undefined}
        />
      </div>
    </div>
  );
}
