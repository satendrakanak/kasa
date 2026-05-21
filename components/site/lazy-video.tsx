"use client";

import { useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  ariaLabel?: string;
  poster?: string;
};

export function LazyVideo({ src, className, ariaLabel, poster }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) {
      return;
    }

    const loadVideo = () => {
      if (node.dataset.loaded === "true") {
        return;
      }
      node.dataset.loaded = "true";
      node.src = src;
      node.load();
      void node.play().catch(() => undefined);
    };

    if (!("IntersectionObserver" in window)) {
      globalThis.setTimeout(loadVideo, 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadVideo();
          observer.disconnect();
        }
      },
      { rootMargin: "360px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={ariaLabel}
    />
  );
}
