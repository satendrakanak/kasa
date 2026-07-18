"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const messages: Record<string, string> = {
  content: "Article content saved",
  publishing: "Publishing settings saved",
  presentation: "Presentation saved",
  seo: "SEO settings saved",
  featured: "Featured status updated",
};

export function ArticleSaveToast({ saved }: { saved?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!saved) return;
    toast.success(messages[saved] || "Article changes saved");
    router.replace(pathname, { scroll: false });
  }, [pathname, router, saved]);

  return null;
}
