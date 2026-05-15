"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type DemoFormData = {
  name: string;
  email: string;
  institute: string;
  phone: string;
  message: string;
};

type DemoTourTriggerProps = {
  appUrl: string;
  buttonLabel: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
};

type ValidationErrors = Partial<Record<keyof DemoFormData, string>>;

const initialForm: DemoFormData = {
  name: "",
  email: "",
  institute: "",
  phone: "",
  message: "",
};

const progressSteps = [
  "Creating your demo account",
  "Preparing KASA controls",
  "Adding limited admin access",
  "Opening your 1 hour tour",
];

function validateForm(data: DemoFormData) {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your full name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!data.institute.trim()) errors.institute = "Please enter your institute name.";
  if (!data.phone.trim()) errors.phone = "Please enter your phone or WhatsApp number.";

  return errors;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");

  return { firstName, lastName };
}

function unwrapDemoResponse(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const outer = payload as { data?: unknown };
  const firstData = outer.data;

  if (!firstData || typeof firstData !== "object") return null;

  const maybeNested = firstData as {
    defaultRedirect?: string;
    data?: { defaultRedirect?: string };
  };

  return maybeNested.defaultRedirect ? maybeNested : maybeNested.data || null;
}

export function DemoTourTrigger({
  appUrl,
  buttonLabel,
  buttonClassName,
  icon,
}: DemoTourTriggerProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<DemoFormData>(initialForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, submitting]);

  useEffect(() => {
    if (!isPreparing) return;

    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 12, 92));
      setActiveStep((current) =>
        current >= progressSteps.length - 1 ? current : current + 1,
      );
    }, 650);

    return () => window.clearInterval(interval);
  }, [isPreparing]);

  const modal = useMemo(() => {
    if (!open || typeof document === "undefined") return null;

    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4">
        <div
          className="absolute inset-0"
          onClick={() => {
            if (!submitting) setOpen(false);
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-h-[calc(100vh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-[1.35rem] border border-white/12 bg-surface shadow-2xl shadow-black/40 sm:max-h-[calc(100vh-2rem)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Tour access
              </p>
              <h3 className="mt-1.5 font-heading text-2xl font-semibold leading-tight text-white sm:text-[1.9rem]">
                Take a guided KASA tour
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={submitting}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-60 sm:size-11"
              aria-label="Close demo form"
            >
              <CloseIcon className="size-4.5 sm:size-5" />
            </button>
          </div>

          {isPreparing ? (
            <div className="space-y-4 px-4 py-5 sm:px-5">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                  <SpinnerIcon className="size-4 animate-spin text-primary" />
                  We are preparing KASA for you
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="rounded-[1.1rem] border border-white/10 bg-white/7 p-4">
                <p className="text-sm font-medium text-white">
                  {progressSteps[activeStep]}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Your temporary demo will stay active for 1 hour. A live timer
                  will appear inside the workspace.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="grid gap-3.5 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const nextErrors = validateForm(form);
                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;

                setSubmitting(true);
                setIsPreparing(true);
                setProgress(14);
                setActiveStep(0);

                try {
                  const { firstName, lastName } = splitName(form.name);
                  const response = await fetch("/api/demo-tours/start", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firstName,
                      lastName,
                      email: form.email,
                      phoneNumber: form.phone,
                      businessName: form.institute,
                      useCase: form.message,
                      leadType: "demo",
                      ctaLabel: buttonLabel,
                      pageUrl: window.location.href,
                    }),
                  });

                  if (!response.ok) {
                    const errorBody = await response.json().catch(() => null);
                    const message =
                      errorBody?.message ||
                      "Unable to start demo. Please try with another email.";
                    throw new Error(Array.isArray(message) ? message.join(", ") : message);
                  }

                  const demo = unwrapDemoResponse(await response.json());
                  if (!demo?.defaultRedirect) {
                    throw new Error("Demo started but redirect was missing.");
                  }

                  setProgress(100);
                  window.setTimeout(() => {
                    window.location.href = `${appUrl}${demo.defaultRedirect}`;
                  }, 800);
                } catch (error) {
                  setIsPreparing(false);
                  setProgress(0);
                  setSubmitting(false);
                  setToast(
                    error instanceof Error
                      ? error.message
                      : "Unable to start demo. Please try again.",
                  );
                }
              }}
            >
              <FormField
                label="Full name"
                error={errors.name}
                input={
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="Your name"
                    className={inputClassName}
                  />
                }
              />
              <FormField
                label="Work email"
                error={errors.email}
                input={
                  <input
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    placeholder="you@academy.com"
                    className={inputClassName}
                  />
                }
              />
              <FormField
                label="Institute name"
                error={errors.institute}
                input={
                  <input
                    value={form.institute}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        institute: event.target.value,
                      }))
                    }
                    placeholder="Your academy or institute"
                    className={inputClassName}
                  />
                }
              />
              <FormField
                label="Phone or WhatsApp"
                error={errors.phone}
                input={
                  <input
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, phone: event.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    className={inputClassName}
                  />
                }
              />
              <div className="sm:col-span-2">
                <FormField
                  label="What do you want to test?"
                  error={errors.message}
                  input={
                    <textarea
                      value={form.message}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      placeholder="Courses, live classes, exams, certificates, users, reports, or complete admin workflow."
                      className={`${inputClassName} min-h-24 resize-none py-3`}
                    />
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 min-w-40 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Preparing demo..." : "Start demo tour"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>,
      document.body,
    );
  }, [appUrl, buttonLabel, errors, form, isPreparing, open, progress, activeStep, submitting]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          buttonClassName ??
          "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        }
      >
        {icon}
        {buttonLabel}
      </button>
      {modal}
      {toast && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed bottom-5 right-5 z-[110] max-w-sm rounded-2xl border border-rose-300/30 bg-rose-500 px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-rose-500/25">
              {toast}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function FormField({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-sm font-medium text-white/88">
        {label}
      </span>
      {input}
      {error ? <span className="mt-2 block text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "h-11 w-full rounded-[0.95rem] border border-white/10 bg-white/7 px-3.5 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-primary/45 sm:px-4";

function CloseIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5.5 5.5 14.5 14.5M14.5 5.5 5.5 14.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpinnerIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 2.5a7.5 7.5 0 1 1-6.65 4.04"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
