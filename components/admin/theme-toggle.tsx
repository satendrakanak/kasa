"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "kasa-theme-change";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function AdminThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, getServerTheme);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10 rounded-full border-[color:var(--button-outline-border)] bg-white/80 shadow-sm backdrop-blur dark:bg-white/5"
      aria-label="Toggle theme"
      suppressHydrationWarning
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        applyTheme(next);
      }}
    >
      {theme === "dark" ? (
        <MoonIcon className="size-4" aria-hidden="true" />
      ) : (
        <SunIcon className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}
