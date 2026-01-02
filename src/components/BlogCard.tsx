import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
};

export default function BlogCard({
  slug,
  title,
  description,
  date,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block w-full">
      <article className="w-full max-w-3xl bg-white/5 px-6 py-2 rounded-lg shadow-sm max-h-36 overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold mb-0 min-w-0 flex-1">
            <span className="block! hover:underline! navigation-link truncate">
              {title}
            </span>
          </h2>
          {date && (
            <p className="text-sm text-white/50 italic shrink-0 ml-2">{date}</p>
          )}
        </header>

        {description && (
          <p className="text-sm text-white/60 mt-2">{description}</p>
        )}
      </article>
    </Link>
  );
}
