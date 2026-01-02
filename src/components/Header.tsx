"use client";

import Link from "next/link";
import DarkModeButton from "./DarkModeButton";

function handleDarkMode() {
  console.log("toggled dark mode");
}

export default function Header() {
  return (
    <header className="py-4 justify-center items-center">
      <nav
        aria-label="Main navigation"
        className="max-w-4xl mx-auto px-4 border-b-amber-50 flex items-center justify-between"
      >
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="nav-link">
              <span className="nav-link-text">home</span>
            </Link>
          </li>
          <li>
            <Link href="/art" className="nav-link">
              <span className="nav-link-text">art</span>
            </Link>
          </li>
          <li>
            <Link href="/blog" className="nav-link">
              <span className="nav-link-text">blog</span>
            </Link>
          </li>
          <li>
            <Link href="/bucket" className="nav-link">
              <span className="nav-link-text">bucket</span>
            </Link>
          </li>
          <li>
            <Link href="/extra" className="nav-link">
              <span className="nav-link-text">extra</span>
            </Link>
          </li>
        </ul>

        <div className="nav-button">
          <DarkModeButton />
        </div>
      </nav>
    </header>
  );
}
