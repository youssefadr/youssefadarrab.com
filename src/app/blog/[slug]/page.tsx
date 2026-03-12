import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { renderMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — Youssef Adarrab`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <>
        <Nav />
        <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--color-bright)" }}>404</h1>
          <p style={{ color: "var(--color-dim)" }}>Post not found.</p>
          <Link href="/articles/" style={{ marginTop: "1rem", display: "inline-block" }}>
            &larr; Back to articles
          </Link>
        </div>
      </>
    );
  }

  const html = await renderMarkdown(post.content);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="post-head">
          <Link href="/articles/" className="post-head-back">
            &larr; back to articles
          </Link>
          <p className="post-head-date">
            {post.date} &middot; {post.tags.join(", ")}
          </p>
          <h1>{post.title}</h1>
          <p className="post-head-desc">{post.description}</p>
        </div>

        <article
          className="prose"
          style={{ paddingBottom: "3rem" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="footer">&copy; {new Date().getFullYear()} Youssef Adarrab</div>
      </div>
    </>
  );
}
