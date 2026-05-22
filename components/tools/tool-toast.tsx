"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToolToastState = {
  id: number;
  type: "success" | "error" | "info";
  title: string;
  message: string;
} | null;

export function ToolToast({ toast, onClose }: { toast: ToolToastState; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const timeoutId = window.setTimeout(onClose, toast.type === "error" ? 6200 : 4200);
    return () => window.clearTimeout(timeoutId);
  }, [onClose, toast]);

  if (!toast) return null;

  const Icon = toast.type === "success" ? CheckCircle2 : toast.type === "error" ? AlertCircle : Info;
  const tone =
    toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950 shadow-emerald-950/10 dark:border-emerald-300/20 dark:bg-emerald-400/12 dark:text-emerald-50"
      : toast.type === "error"
        ? "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-950/10 dark:border-rose-300/20 dark:bg-rose-400/12 dark:text-rose-50"
        : "border-blue-200 bg-blue-50 text-slate-950 shadow-blue-950/10 dark:border-sky-300/20 dark:bg-sky-400/12 dark:text-sky-50";
  const iconTone = toast.type === "success" ? "text-emerald-700 dark:text-emerald-200" : toast.type === "error" ? "text-rose-700 dark:text-rose-200" : "text-primary dark:text-sky-200";

  return (
    <div className="fixed bottom-28 right-4 z-[120] w-[calc(100vw-2rem)] max-w-md animate-[toast-in_220ms_ease-out] sm:bottom-24 sm:right-6">
      <div className={`rounded-2xl border p-4 shadow-2xl backdrop-blur ${tone}`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/70 ${iconTone} dark:bg-white/10`}>
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">{toast.title}</div>
            <p className="mt-1 text-sm leading-6 opacity-82">{toast.message}</p>
          </div>
          <button type="button" onClick={onClose} className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-white/60 transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/18" aria-label="Close notification">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
