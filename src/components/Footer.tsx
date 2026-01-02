import Link from "next/link";

interface FooterProps {
  prevPage: string;
  href: string;
}

export default function Footer({ prevPage, href }: FooterProps) {
  return (
    <footer className="mt-12 mx-4 py-8 border-t dark:border-gray-200 border-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href={href}
          className="text-gray-500 hover:text-blue-800 transition-colors flex items-center gap-2 group"
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
