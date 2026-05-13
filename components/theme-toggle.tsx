"use client";

import { useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme") as Theme | null;

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-[6.25rem] items-center rounded-full border border-border bg-surface p-1 text-xs font-medium text-muted shadow-sm transition hover:border-primary"
      aria-label="Toggle color theme"
      suppressHydrationWarning
    >
      <span
        className={[
          "flex h-8 w-11 items-center justify-center rounded-full transition",
          theme === "light" ? "bg-primary text-primary-foreground" : "",
        ].join(" ")}
      >
        Light
      </span>
      <span
        className={[
          "flex h-8 w-11 items-center justify-center rounded-full transition",
          theme === "dark" ? "bg-primary text-primary-foreground" : "",
        ].join(" ")}
      >
        Dark
      </span>
    </button>
  );
}
