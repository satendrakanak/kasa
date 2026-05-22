"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function PageUxControls() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const loaderTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const lastPathRef = useRef(pathname);

  const clearLoaderTimer = useCallback(() => {
    if (loaderTimerRef.current) {
      window.clearInterval(loaderTimerRef.current);
      loaderTimerRef.current = null;
    }
  }, []);

  const startLoader = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    clearLoaderTimer();
    setLoaderVisible(true);
    setLoaderProgress((current) =>
      current > 0 && current < 100 ? current : 8,
    );

    loaderTimerRef.current = window.setInterval(() => {
      setLoaderProgress((current) => {
        if (current < 48) return current + 8;
        if (current < 74) return current + 4;
        if (current < 88) return current + 1.8;
        return Math.min(current + 0.45, 94);
      });
    }, 220);
  }, [clearLoaderTimer]);

  const finishLoader = useCallback(() => {
    clearLoaderTimer();
    setLoaderProgress(100);
    hideTimerRef.current = window.setTimeout(() => {
      setLoaderVisible(false);
      setLoaderProgress(0);
    }, 360);
  }, [clearLoaderTimer]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
          : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 360);
    };

    const frame = window.requestAnimationFrame(updateScrollProgress);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const target =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== "_self") return;
      if (target.hasAttribute("download")) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      const nextUrl = new URL(target.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentPath = `${window.location.pathname}${window.location.search}`;
      const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
      if (currentPath === nextPath) return;

      startLoader();
    };

    const handleBeforeUnload = () => startLoader();
    const handlePageShow = () => finishLoader();

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
      clearLoaderTimer();
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [clearLoaderTimer, finishLoader, startLoader]);

  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      finishLoader();
    }
  }, [finishLoader, pathname]);

  return (
    <>
      <div
        className={[
          "fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-[image:var(--button-solid)] shadow-[0_0_22px_rgba(43,168,255,0.55)] transition-[transform,opacity] duration-200",
          loaderVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{ transform: `scaleX(${loaderProgress / 100})` }}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={[
          "fixed bottom-20 right-4 z-40 grid size-12 cursor-pointer place-items-center rounded-full p-[3px] shadow-2xl shadow-blue-950/18 transition duration-300 [--ring-color:#2453a6] [--ring-track:rgba(36,83,166,0.12)] dark:[--ring-color:#58c98a] dark:[--ring-track:rgba(88,201,138,0.18)] sm:bottom-24 sm:right-5",
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        ].join(" ")}
        style={{
          background: `conic-gradient(var(--ring-color) ${scrollProgress * 3.6}deg, var(--ring-track) 0deg)`,
        }}
        aria-label="Back to top"
      >
        <span className="grid size-full place-items-center rounded-full border border-white/75 bg-white text-primary transition hover:bg-blue-50 dark:border-white/10 dark:bg-slate-950 dark:text-emerald-200 dark:hover:bg-slate-900">
          <ArrowUp className="size-5" aria-hidden="true" />
        </span>
      </button>
    </>
  );
}
