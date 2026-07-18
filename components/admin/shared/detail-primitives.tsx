"use client";

import type { ComponentType, SVGProps } from "react";
import { displayLabel, formatDate } from "@/lib/admin/dashboard-format";

export function friendlyLabel(value: string) {
  return displayLabel(value).toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase());
}

export function formattedDate(value: Date | string | null | undefined) {
  return formatDate(value ? new Date(value) : null);
}

export function limitLabel(value: number | null, suffix: string) {
  return value === null ? `Unlimited ${suffix}` : `${value} ${suffix}`;
}

export function SectionLabel({ children }: { children: string }) {
  return <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{children}</p>;
}

export function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-medium text-foreground">{value}</p>
    </div>
  );
}

export function MetaBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border/80 bg-background/60 p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm text-foreground">{value}</p>
    </div>
  );
}

export function AdminInfoTile({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-background/70 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-[color:var(--button-outline-foreground)]">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium text-foreground">{value}</p>
        {helper ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{helper}</p> : null}
      </div>
    </div>
  );
}
