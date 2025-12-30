"use client";

import Link from "next/link";

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
            <Link href="/" className="hover:underline">
              home
            </Link>
          </li>
          <li>
            <Link href="/art" className="hover:underline">
              art
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:underline">
              blog
            </Link>
          </li>
          <li>
            <Link href="/bucket" className="hover:underline">
              bucket
            </Link>
          </li>
          <li>
            <Link href="/extra" className="hover:underline">
              extra
            </Link>
          </li>
        </ul>

        <button onClick={() => handleDarkMode()}>dark mode</button>
      </nav>
    </header>
  );
}
