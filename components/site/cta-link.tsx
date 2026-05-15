import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function CtaLink({ href, children, variant = "primary" }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover"
          : "border border-white/14 bg-white/8 text-white hover:bg-white/12",
      ].join(" ")}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
