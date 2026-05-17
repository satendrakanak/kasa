"use client";

import { useEffect, useMemo, useState } from "react";

type AnimatedCounterProps = {
  value: string;
  duration?: number;
  className?: string;
};

function parseCounterValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1] ?? "",
    number: Number(match[2]),
    suffix: match[3] ?? "",
    decimals: match[2]?.includes(".") ? match[2].split(".")[1]?.length ?? 0 : 0,
  };
}

export function AnimatedCounter({
  value,
  duration = 1200,
  className,
}: AnimatedCounterProps) {
  const parsed = useMemo(() => parseCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!parsed) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.number * eased;
      const formatted = current.toLocaleString("en-IN", {
        maximumFractionDigits: parsed.decimals,
        minimumFractionDigits: progress === 1 ? parsed.decimals : 0,
      });

      setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, parsed, value]);

  return <span className={className}>{parsed ? displayValue : value}</span>;
}
