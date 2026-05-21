"use client";

import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { siteButtonClasses } from "@/components/site/site-button";

type ProductTourTriggerProps = {
  label?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  onOpen?: () => void;
};

const LazyDemoTourTrigger = dynamic(
  () => import("@/components/demo-tour-form").then((module) => module.DemoTourTrigger),
  { ssr: false },
);

export function ProductTourTrigger({
  label = "Take a Product Tour",
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
  onOpen,
}: ProductTourTriggerProps) {
  const demoAppUrl =
    process.env.NEXT_PUBLIC_DEMO_APP_URL ?? "http://localhost:3000";
  const [modalKey, setModalKey] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setModalKey((current) => current + 1);
        }}
        className={siteButtonClasses({
          variant,
          size,
          className,
        })}
      >
        {showIcon ? <Sparkles className="size-4" aria-hidden="true" /> : null}
        {label}
      </button>
      {modalKey > 0 ? (
        <LazyDemoTourTrigger
          key={modalKey}
          appUrl={demoAppUrl}
          buttonLabel={label}
          autoOpen
          hideButton
        />
      ) : null}
    </>
  );
}
