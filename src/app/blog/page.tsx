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
  const filenames = await fs.readdir(path.join(process.cwd(), "content/posts"));

  // const slugs = filenames
  // .filter((file: string) => file.endsWith(".mdx"))
  // .map((file: string) => file.replace(/\.mdx$/, ""));
  // console.log("Slugs:", slugs);
  const posts = await Promise.all(
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

  console.log("Posts:", posts);

  return (
    <>
      {/* {posts ? (
        posts.map(({ slug, frontmatter }) => {
          <div>
            <Link href={`/blog/${slug}`}>{slug}</Link>
          </div>;
          <div>
            <p>hello</p>
          </div>;
        })
      ) : (
        <div>Loading</div>
      )} */}
    </>
  );
}
