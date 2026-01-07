"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // focus the first link when opening the mobile menu
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      // prevent body scroll when menu open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="py-4">
      <nav
        aria-label="Main navigation"
        className="max-w-4xl mx-auto px-4 border-b-amber-50 flex items-center justify-between"
      >
        <ul className="gap-4 items-center hidden md:flex">
          <li>
            <Link href="/" className="nav-link navigation-text">
              <span className="nav-link-text">home</span>
            </Link>
          </li>
          <li>
            <Link href="/projects" className="nav-link navigation-text">
              <span className="nav-link-text">projects</span>
            </Link>
          </li>
          <li>
            <Link href="/blog" className="nav-link navigation-text">
              <span className="nav-link-text">blog</span>
            </Link>
          </li>
          <li>
            <Link href="/bucket" className="nav-link navigation-text">
              <span className="nav-link-text">bucket</span>
            </Link>
          </li>
          <li>
            <Link href="/extra" className="nav-link navigation-text">
              <span className="nav-link-text">extra</span>
            </Link>
          </li>
        </ul>

        {/* Mobile menu - visible on small screens */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className=" md:hidden flex"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-link navigation-text">menu</span>
        </button>

        <div className="nav-button ">
          <DarkModeButton />
        </div>

        {/* Mobile fullscreen overlay menu (slides down) */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          className={
            "fixed inset-0 z-50 bg-white/95 dark:bg-black/80 transform transition-transform duration-300 ease-out " +
            (open ? "translate-y-0" : "-translate-y-full pointer-events-none")
          }
        >
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div />
              <button
                aria-label="Close menu"
                className="p-2"
                onClick={() => setOpen(false)}
              >
                <span className="nav-link navigation-text text-white!">
                  close
                </span>
              </button>
            </div>

            <nav className="mt-8">
              <ul className="flex flex-col gap-6 items-start">
                <li>
                  <Link
                    href="/"
                    className="text-2xl font-semibold"
                    ref={firstLinkRef}
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-link navigation-text text-white!">
                      home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-2xl font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-link navigation-text text-white!">
                      projects
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-2xl font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-link navigation-text text-white!">
                      blog
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bucket"
                    className="text-2xl font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-link navigation-text text-white!">
                      bucket
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/extra"
                    className="text-2xl font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-link navigation-text text-white!">
                      extra
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}
