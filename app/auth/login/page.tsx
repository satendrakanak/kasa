import { redirect } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser, hasAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AuthLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await hasAdminUser())) redirect("/auth/setup");
  if (await getCurrentUser()) redirect("/admin");
  const params = await searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
          action={loginAction}
          error={params.error === "invalid" ? "Email or password is incorrect." : undefined}
        />
      </div>
    </div>
  );
}
