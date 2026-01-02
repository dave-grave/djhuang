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
        <ul className="flex gap-2 md:gap-4 items-center">
          <li>
            <Link href="/" className="nav-link navigation-text">
              <span className="nav-link-text">home</span>
            </Link>
          </li>
          <li>
            <Link href="/art" className="nav-link navigation-text">
              <span className="nav-link-text">art</span>
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
          <li>
            <div className="nav-button md:hidden">
              <DarkModeButton />
            </div>
          </li>
        </ul>

        {/* md and up: show dark mode button on the right */}
        <div className="nav-button hidden md:block">
          <DarkModeButton />
        </div>
      </nav>
    </header>
  );
}
