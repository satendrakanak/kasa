import { redirect } from "next/navigation";
import { setupAdminAction } from "@/actions/auth";
import { LoginForm } from "@/components/login-form";
import { hasAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AuthSetupPage() {
  if (await hasAdminUser()) redirect("/auth/login");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm action={setupAdminAction} mode="setup" />
      </div>
    </div>
  );
}
