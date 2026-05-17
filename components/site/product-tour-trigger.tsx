"use client";

import { Sparkles } from "lucide-react";
import { DemoTourTrigger } from "@/components/demo-tour-form";
import { siteButtonClasses } from "@/components/site/site-button";

type ProductTourTriggerProps = {
  label?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  onOpen?: () => void;
};

export function ProductTourTrigger({
  label = "Product Tour",
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
  onOpen,
}: ProductTourTriggerProps) {
  const demoAppUrl =
    process.env.NEXT_PUBLIC_DEMO_APP_URL ?? "http://localhost:3000";

  return (
    <span className="contents" onClick={onOpen}>
      <DemoTourTrigger
        appUrl={demoAppUrl}
        buttonLabel={label}
        icon={showIcon ? <Sparkles className="size-4" aria-hidden="true" /> : null}
        buttonClassName={siteButtonClasses({
          variant,
          size,
          className,
        })}
      />
    </span>
  );
}
