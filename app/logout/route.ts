import { signOut } from "@/auth";
import { safeRelativePath } from "@/lib/auth/redirects";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const callbackUrl = safeRelativePath(url.searchParams.get("callbackUrl"), "/");

  return signOut({
    redirectTo: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  });
}
