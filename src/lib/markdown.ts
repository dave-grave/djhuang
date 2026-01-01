import path from "path";
import fs from "fs/promises";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";

import MDXComponents from "@/components/MDXComponents";
import { PostMetaData } from "@/types/types";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Deprecated function
// export async function getPostContent(slug: string) {
//   console.log("Blog page mounted");

//   const fullPath = path.join(postsDirectory, `${slug}.md`);

//   const document = await fs.readFile(fullPath, "utf-8");

//   const { data, content } = matter(document);

//   const file = await unified()
//     .use(remarkParse)
//     .use(remarkMath)
//     .use(remarkRehype)
//     .use(rehypeKatex)
//     .use(rehypeHighlight)
//     .use(rehypeStringify)
//     .process(content);

//   const contentHtml = file.toString();

//   return { slug, contentHtml, title: data.title, date: data.date, ...data };
// }

// Get raw MDX post content from file system
export async function getPostContent(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

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

  return data;
}

export async function getAllPosts() {}
