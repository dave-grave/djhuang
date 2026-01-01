import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { getPostContent } from "@/lib/markdown";

export default async function BlogPage() {
  // Read all filenames from the posts directory
  const filenames = await fs.readdir(path.join(process.cwd(), "content/posts"));

  // Read and parse each post's frontmatter
  const unsortedPosts = await Promise.all(
    filenames.map(async (filename: string) => {
      const slug = filename.replace(/\.mdx$/, "");
      const data = await getPostContent(slug);

      return { slug, frontmatter: data.frontmatter };
    })
  );

  // Sort posts by newest first
  const posts = unsortedPosts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );

  return (
    <>
      {posts ? (
        <div>
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <ul>
            {posts.map(({ slug, frontmatter }) => (
              <li key={slug} className="mb-4">
                <Link
                  href={`/blog/${slug}`}
                  className="text-2xl text-blue-300 hover:underline"
                >
                  {frontmatter.title}
                </Link>
                <p className="text-sm! text-white/60! mb-1!">
                  {frontmatter.description}
                </p>
                <p className="text-sm! text-white-60! italic!">
                  {frontmatter.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
