"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { siteButtonClasses } from "@/components/site/site-button";

type DemoFormData = {
  name: string;
  email: string;
  institute: string;
  phone: string;
  message: string;
};

type DemoTourTriggerProps = {
  buttonLabel: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
  autoOpen?: boolean;
  hideButton?: boolean;
};

type ValidationErrors = Partial<Record<keyof DemoFormData, string>>;

const initialForm: DemoFormData = {
  name: "",
  email: "",
  institute: "",
  phone: "",
  message: "",
};

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

export function DemoTourTrigger({
  buttonLabel,
  buttonClassName,
  icon,
  autoOpen = false,
  hideButton = false,
}: DemoTourTriggerProps) {
  const [open, setOpen] = useState(autoOpen);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
        <div className="relative z-10 max-h-[calc(100vh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-[1.25rem] border border-blue-950/10 bg-white shadow-2xl shadow-blue-950/18 dark:border-white/12 dark:bg-surface dark:shadow-black/40 sm:max-h-[calc(100vh-2rem)]">
          <div className="flex items-start justify-between gap-4 border-b border-blue-950/8 px-4 py-3 dark:border-white/8 sm:px-5">
            <div className="text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Demo request
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-2xl">
                Request a guided KASA demo
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={submitting}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-blue-950/10 bg-white text-slate-600 shadow-sm shadow-blue-950/6 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/6 dark:text-white/80 dark:hover:bg-white/12 sm:size-11"
              aria-label="Close demo form"
            >
              <CloseIcon className="size-4.5 sm:size-5" />
            </button>
          </div>

          {submitted ? (
            <div className="px-4 py-8 text-center sm:px-8 sm:py-10">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-300">
                <CheckIcon className="size-7" />
              </div>
              <h4 className="mt-5 font-heading text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">
                Thank you! Your request is received.
              </h4>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-white/65">
                Our KASA team will contact you shortly to understand your academy
                requirements and schedule a guided product demo.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={siteButtonClasses({
                  size: "sm",
                  className: "mt-6 h-10 min-w-32",
                })}
              >
                Done
              </button>
            </div>
          ) : (
            <form
              className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const nextErrors = validateForm(form);
                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;

                setSubmitting(true);

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
                      "Unable to submit your demo request. Please try again.";
                    throw new Error(Array.isArray(message) ? message.join(", ") : message);
                  }

                  setForm(initialForm);
                  setErrors({});
                  setSubmitted(true);
                } catch (error) {
                  setToast(
                    error instanceof Error
                      ? error.message
                      : "Unable to submit your demo request. Please try again.",
                  );
                } finally {
                  setSubmitting(false);
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
                  label="What would you like to explore?"
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
                      placeholder="Courses, live classes, certificates, payments..."
                      className={`${inputClassName} min-h-20 resize-none py-3`}
                    />
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className={siteButtonClasses({
                    size: "sm",
                    className: "h-10 min-w-40",
                  })}
                >
                  {submitting ? "Sending request..." : "Request a demo"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>,
      document.body,
    );
  }, [buttonLabel, errors, form, open, submitted, submitting]);

  return (
    <>
      {hideButton ? null : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={
            buttonClassName ??
            siteButtonClasses({
              size: "sm",
            })
          }
        >
          {icon}
          {buttonLabel}
        </button>
      )}
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
      <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-white/82">
        {label}
      </span>
      {input}
      {error ? (
        <span className="mt-2 block text-sm font-medium leading-5 text-rose-600 dark:text-rose-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

const inputClassName =
  "h-10 w-full rounded-[0.85rem] border border-blue-950/10 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary/45 dark:border-white/10 dark:bg-white/7 dark:text-white dark:placeholder:text-white/28";

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

function CheckIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="m5 10.25 3.1 3.1L15.25 6.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
