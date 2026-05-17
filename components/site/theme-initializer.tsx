"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    try {
      if (
        window.location.pathname.startsWith("/cwk") ||
        window.location.pathname.startsWith("/landing")
      ) {
        document.documentElement.classList.add("dark");
        return;
      }
      const theme = window.localStorage.getItem("theme") || "dark";
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
