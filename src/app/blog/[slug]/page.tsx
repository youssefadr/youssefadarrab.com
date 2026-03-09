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
        <main className="page-container" style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>404</h1>
          <p style={{ color: "var(--color-ink-muted)" }}>Post not found.</p>
          <Link href="/#blog" className="btn" style={{ marginTop: "1rem" }}>
            &larr; Back
          </Link>
        </main>
      </>
    );
  }

  const html = await renderMarkdown(post.content);

  return (
    <>
      <Nav />
      <main className="page-container" style={{ maxWidth: "720px" }}>
        <div className="post-header">
          <Link href="/#blog" className="post-back">
            &larr; back to writing
          </Link>
          <p className="post-date">
            {post.date} &middot; {post.tags.join(", ")}
          </p>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-desc">{post.description}</p>
        </div>

        <article
          className="prose"
          style={{ paddingBottom: "3rem" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
