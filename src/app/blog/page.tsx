import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { getPostContent } from "@/lib/markdown";
import BlogCard from "@/components/BlogCard";

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
        <div className="min-h-[60vh] flex items-start justify-center py-12 px-4">
          <div className="w-full max-w-3xl flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold mb-2">Blog</h1>

            <div className="w-full flex flex-col items-center gap-4">
              {posts.map(({ slug, frontmatter }) => (
                <BlogCard
                  key={slug}
                  slug={slug}
                  title={frontmatter.title}
                  description={frontmatter.description}
                  date={frontmatter.date}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
