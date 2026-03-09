import { getAllBlogPosts } from "@/lib/content";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Nav />
      <main className="page-container" style={{ maxWidth: "720px" }}>
        <section style={{ padding: "2.5rem 0" }}>
          <div className="section-header">
            <span className="section-icon">&#9632;</span>
            <h1 className="section-title">Writing</h1>
          </div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="blog-entry"
            >
              <p className="blog-date">{post.date}</p>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-desc">{post.description}</p>
            </Link>
          ))}
        </section>
        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
