import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

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
export async function getMdxPostContent(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  return await fs.readFile(fullPath, "utf-8");
}

export async function getAllPosts() {}
