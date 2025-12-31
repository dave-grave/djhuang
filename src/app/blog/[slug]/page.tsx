import fs from "fs/promises";
import path from "path";
import MDXComponents from "@/components/MDXComponents";
import { compileMDX } from "next-mdx-remote/rsc";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";

import Footer from "@/components/Footer";
import { PostMetaData } from "@/types/types";

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fullPath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);

  const document = await fs.readFile(fullPath, "utf-8");

  const { frontmatter } = await compileMDX<PostMetaData>({
    source: document,
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
  console.log("Frontmatter:", frontmatter);
  return {
    title: frontmatter.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fullPath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);

  // Get raw MDX content from file system
  const document = await fs.readFile(fullPath, "utf-8");

  // Compile MDX content to React components
  const data = await compileMDX<PostMetaData>({
    source: document,
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
    components: MDXComponents,
  });

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-8 border-b-2 border-gray-200/50 pb-4">
        <h1 className="text-4xl! font-bold! mb-2! py-2! italic!">
          {data.frontmatter.title}
        </h1>
        <p className="text-white/60! text-sm!">
          {data.frontmatter.description}
        </p>
        <p className="text-white/60! italic! text-sm!">
          {data.frontmatter.date}
        </p>
      </header>
      {data.content}
      <Footer prevPage="blog" href="/blog" />
    </article>
  );
}
