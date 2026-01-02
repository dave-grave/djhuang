"use client";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize from localStorage or system preference
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Apply class and persist whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
    console.log("isDarkMode:", isDarkMode); // appears in browser console
  }, [isDarkMode]);

  return (
    <button
      className="items-center"
      aria-pressed={isDarkMode}
      onClick={() => setIsDarkMode((v) => !v)}
    >
      <span>{isDarkMode ? "light mode" : "dark mode"}</span>
    </button>
  );
}
