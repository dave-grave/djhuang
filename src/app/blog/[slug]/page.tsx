import { getMdxPostContent } from "@/lib/markdown";
import MDXComponents from "@/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";

import Footer from "@/components/Footer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { content, frontmatter } = await getMdxPostContent(slug);

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-8 border-b-2 border-gray-200/50 pb-4">
        <h1 className="text-4xl font-bold mb-2 italic">{frontmatter.title}</h1>
        <p className="text-gray-500 italic">{frontmatter.date}</p>
      </header>

      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [
              rehypeUnwrapImages,
              rehypeKatex,
              rehypeHighlight,
              [rehypeImgSize, { dir: "public" }],
            ],
          },
        }}
      />

      <Footer prevPage="blog" href="/blog" />
    </article>
  );
}
