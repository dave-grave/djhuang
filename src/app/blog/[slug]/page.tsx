import Footer from "@/components/Footer";
import { getPostContent } from "@/lib/markdown";

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getPostContent(slug);

  return {
    title: data.frontmatter.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getPostContent(slug);

  return (
    <article className="mx-auto max-w-3xl py-10 px-4">
      <header
        className="mb-8 border-b-2 pb-4"
        style={{ borderColor: "var(--border)" }}
      >
        <h1 className="text-4xl! font-bold! mb-2! py-2! italic!">
          {data.frontmatter.title}
        </h1>
        <p className="meta-text-description text-sm!">
          {data.frontmatter.description}
        </p>
        <p className="meta-text-date italic! text-sm!">
          {data.frontmatter.date}
        </p>
      </header>
      {data.content}
      <Footer prevPage="blog" href="/blog" />
    </article>
  );
}
