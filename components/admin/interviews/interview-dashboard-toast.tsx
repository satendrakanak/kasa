"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function InterviewDashboardToast({ bulk, bulkError, count }: { bulk?: string; bulkError?: string; count?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const total = Number(count || 0);
    if (bulk) toast.success(`${total} question${total === 1 ? "" : "s"} ${bulk}`);
    if (bulkError === "empty") toast.error("Select at least one question");
    if (bulkError === "publish-incomplete") toast.error(`${total} selected question${total === 1 ? " is" : "s are"} missing an answer, role, or topic`);
    if (bulk || bulkError) router.replace(pathname, { scroll: false });
  }, [bulk, bulkError, count, pathname, router]);

  return null;
}
