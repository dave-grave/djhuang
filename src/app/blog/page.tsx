import { getPostContent } from "@/lib/markdown";
import Link from "next/link";

export default async function BlogPage() {
  const file = await getPostContent("example");
  console.log("fetched post content", file);

  return (
    <div>
      Blog Page
      {/* TODO: replace with array.map */}
      <ul>
        <li>
          <Link href="/blog/example">Post 1</Link>
        </li>
        <li>
          <Link href="blog/test-post">Post 2</Link>
        </li>
        <li>Post </li>
        <li>Post </li>
      </ul>
    </div>
  );
}
