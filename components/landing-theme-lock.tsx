"use client";

import { useEffect } from "react";

export function LandingThemeLock() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.dataset.landing = "true";

    return () => {
      delete document.documentElement.dataset.landing;
      try {
        const savedTheme = window.localStorage.getItem("theme") || "light";
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } catch {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  return null;
}
