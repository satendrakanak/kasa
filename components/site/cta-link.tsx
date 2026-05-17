import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteButtonClasses } from "@/components/site/site-button";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={siteButtonClasses({
        variant: variant === "primary" ? "solid" : variant,
        size,
        className: [size === "sm" ? "h-11 px-5" : undefined, className]
          .filter(Boolean)
          .join(" "),
      })}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
