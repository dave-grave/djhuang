import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 mx-16 py-8 border-t">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link href="#" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
