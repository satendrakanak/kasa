"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const messages: Record<string, string> = {
  content: "Question content saved",
  guidance: "Answer guidance saved",
  classification: "Classification saved",
  seo: "Search settings saved",
  publishing: "Publishing status saved",
};

export function InterviewSaveToast({
  saved,
  created,
  error,
}: {
  saved?: string;
  created?: string;
  error?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (created) toast.success("Question draft created");
    if (saved) toast.success(messages[saved] || "Question changes saved");
    if (error === "publish-incomplete") {
      toast.error("Add a role, topic, and a complete answer before publishing");
    }
    if (created || saved || error) router.replace(pathname, { scroll: false });
  }, [created, error, pathname, router, saved]);

  return null;
}
