"use client";
import { useEffect, useState } from "react";

export default function DarkModeButton() {
  const [theme, setTheme] = useState<string>("");

  // set initial theme based on system preference
  useEffect(() => {
    const preferredTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(preferredTheme);
    document.body.classList.add(preferredTheme);
  }, []);

  // update theme on toggle
  useEffect(() => {
    localStorage.setItem("theme", theme);

    const selectedTheme = localStorage.getItem("theme");
    document.body.classList.remove("light", "dark");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    }

    // defaults to system preference if no theme is set
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, [theme]);

  return (
    <button
      className="items-center"
      onClick={() => setTheme((v) => (v === "dark" ? "light" : "dark"))}
    >
      <span>{theme === "dark" ? "light mode" : "dark mode"}</span>
    </button>
  );
}
