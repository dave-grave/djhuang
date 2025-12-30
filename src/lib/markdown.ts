import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPostContent(slug: string) {
  console.log("Blog page mounted");

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const document = await fs.readFile(fullPath, "utf-8");

  const { data, content } = matter(document);

  const file = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = file.toString();

  return { slug, contentHtml, title: data.title, date: data.date, ...data };
}

export async function getMdxPostContent(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  const document = await fs.readFile(fullPath, "utf-8");

  const { data, content } = matter(document);

  // const mdxSource = await serialize(content, {
  //   mdxOptions: {
  //     remarkPlugins: [remarkMath],
  //     rehypePlugins: [rehypeKatex, rehypeHighlight],
  //     format: "mdx",
  //   },
  //   scope: data,
  // });

  return {
    slug,
    content,
    frontmatter: data,
  };
}

export async function getAllPosts() {}
