import { getPostContent } from "@/lib/markdown";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  console.log(post);

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-8">
        {slug}
        {/* <h1 className="text-4xl font-bold mb-2">{post.title}</h1> */}
        {/* <p className="text-gray-500">{post.date}</p> */}
      </header>

      {/* Render the HTML string provided by Unified */}
      <div
        className="prose lg:prose-xl dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
