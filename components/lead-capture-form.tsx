"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type LeadFormData = {
  name: string;
  email: string;
  institute: string;
  phone: string;
  message: string;
};

type LeadCaptureModalTriggerProps = {
  endpoint: string;
  source: string;
  buttonLabel: string;
  buttonClassName?: string;
  modalTitle: string;
  modalEyebrow?: string;
  icon?: React.ReactNode;
};

type ValidationErrors = Partial<Record<keyof LeadFormData, string>>;

const initialForm: LeadFormData = {
  name: "",
  email: "",
  institute: "",
  phone: "",
  message: "",
};

function validateForm(data: LeadFormData) {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your full name.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!data.institute.trim()) {
    errors.institute = "Please enter your institute name.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone or WhatsApp number.";
  }
  if (!data.message.trim()) {
    errors.message = "Please tell us what you want to launch or improve.";
  }

  return errors;
}

export function LeadCaptureModalTrigger({
  endpoint,
  source,
  buttonLabel,
  buttonClassName,
  modalTitle,
  modalEyebrow,
  icon,
}: LeadCaptureModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const modal = useMemo(() => {
    if (!open || typeof document === "undefined") return null;

    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4">
        <div
          className="absolute inset-0"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="relative z-10 max-h-[calc(100vh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-[1.6rem] border border-white/12 bg-surface shadow-2xl shadow-black/40 sm:max-h-[calc(100vh-2rem)] sm:max-w-3xl sm:rounded-[2rem]">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-7 sm:py-5">
            <div className="text-left">
              {modalEyebrow ? (
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                  {modalEyebrow}
                </p>
              ) : null}
              <h3 className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight text-white sm:text-[2.35rem]">
                {modalTitle}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/12 sm:size-11"
              aria-label="Close enquiry form"
            >
              <CloseIcon className="size-4.5 sm:size-5" />
            </button>
          </div>

          <form
            className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:gap-5 sm:px-7 sm:py-6"
            onSubmit={async (event) => {
              event.preventDefault();
              const nextErrors = validateForm(form);
              setErrors(nextErrors);
              if (Object.keys(nextErrors).length > 0) return;

              setSubmitting(true);

              try {
                const response = await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    institute: form.institute,
                    phone: form.phone,
                    message: form.message,
                    source,
                  }),
                });

                if (!response.ok) {
                  throw new Error("Lead capture failed");
                }

                setForm(initialForm);
                setErrors({});
                setOpen(false);
                setToast("Query submitted successfully.");
              } catch {
                setToast("Something went wrong. Please try again.");
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
                label="What do you need help with?"
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
                    placeholder="Tell us about your courses, current setup, live classes, learner flow, or rollout plans."
                    className={`${inputClassName} min-h-36 resize-none py-4`}
                  />
                }
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 min-w-40 cursor-pointer items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70 sm:h-13 sm:text-base"
              >
                {submitting ? "Sending..." : "Send query"}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body,
    );
  }, [endpoint, errors, form, modalEyebrow, modalTitle, open, source, submitting]);

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
            <div className="fixed bottom-5 right-5 z-[110] rounded-2xl border border-emerald-300/30 bg-emerald-500 px-4 py-3 text-sm font-medium text-slate-950 shadow-2xl shadow-emerald-500/25">
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
      <span className="mb-2.5 block text-sm font-medium text-white/88 sm:text-base">
        {label}
      </span>
      {input}
      {error ? <span className="mt-2 block text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "h-13 w-full rounded-[1.1rem] border border-white/10 bg-white/7 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-primary/45 sm:h-14 sm:px-5 sm:text-base";

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
