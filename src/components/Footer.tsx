import Link from "next/link";

interface FooterProps {
  prevPage: string;
  href: string;
}

export default function Footer({ prevPage, href }: FooterProps) {
  return (
    <footer
      className="mt-12 mx-4 py-8 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href={href}
          className="navigation-link text-secondary! transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          {`back to ${prevPage}`}
        </Link>
      </div>
    </footer>
  );
}
