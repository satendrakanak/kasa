type SiteButtonVariant = "solid" | "outline" | "ghost";
type SiteButtonSize = "sm" | "md" | "lg";

type SiteButtonClassOptions = {
  variant?: SiteButtonVariant;
  size?: SiteButtonSize;
  className?: string;
};

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-70";

const sizeClasses: Record<SiteButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variantClasses: Record<SiteButtonVariant, string> = {
  solid:
    "site-btn-solid shadow-xl shadow-blue-900/18",
  outline:
    "site-btn-outline border shadow-sm shadow-blue-950/5",
  ghost:
    "site-btn-ghost border",
};

export function siteButtonClasses({
  variant = "solid",
  size = "md",
  className,
}: SiteButtonClassOptions = {}) {
  return [baseClasses, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");
}
