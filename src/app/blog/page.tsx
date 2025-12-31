import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

import remarkMath from "remark-math";
import { PostMetaData } from "@/types/types";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";

export default async function BlogPage() {
  // Read all filenames from the posts directory
  const filenames = await fs.readdir(path.join(process.cwd(), "content/posts"));

  // Read and parse each post's frontmatter
  const unsortedPosts = await Promise.all(
    filenames.map(async (filename: string) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "content/posts", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<PostMetaData>({
        source: content,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [
              rehypeUnwrapImages,
              rehypeKatex,
              rehypeHighlight,
              [rehypeImgSize, { dir: "public" }],
            ],
          },
        },
      });
      return { slug: filename.replace(/\.mdx$/, ""), frontmatter };
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
                  className="text-2xl text-blue-600 hover:underline"
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
