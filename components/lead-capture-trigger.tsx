"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { siteButtonClasses } from "@/components/site/site-button";
import type { LeadCaptureModalTriggerProps } from "@/components/lead-capture-form";

const LazyLeadCaptureModalTrigger = dynamic(
  () =>
    import("@/components/lead-capture-form").then(
      (module) => module.LeadCaptureModalTrigger,
    ),
  { ssr: false },
);

export function LeadCaptureModalTrigger(props: LeadCaptureModalTriggerProps) {
  const [modalKey, setModalKey] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalKey((current) => current + 1)}
        className={
          props.buttonClassName ??
          siteButtonClasses({
            size: "sm",
          })
        }
      >
        {props.icon}
        {props.buttonLabel}
      </button>
      {modalKey > 0 ? (
        <LazyLeadCaptureModalTrigger
          key={modalKey}
          {...props}
          autoOpen
          hideButton
        />
      ) : null}
    </>
  );
}
