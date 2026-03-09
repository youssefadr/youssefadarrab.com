import Nav from "@/components/Nav";
import { getAllBlogPosts } from "@/lib/content";
import Link from "next/link";

export default function ArticlesPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <Nav />
      <main className="page-container" style={{ maxWidth: "720px" }}>
        <div className="page-header">
          <h1 className="page-title">Articles</h1>
          <p className="page-desc">
            Technical deep dives on ML systems, infrastructure, and research.
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <section className="section">
            <div className="articles-grid">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="article-card"
                >
                  <p className="article-card-date">{post.date}</p>
                  <h3 className="article-card-title">{post.title}</h3>
                  <p className="article-card-desc">{post.description}</p>
                  <div className="article-card-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="article-tag">{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="coming-soon">
          <div className="coming-soon-icon">&#9998;</div>
          <div>More articles coming soon.</div>
        </div>

        <footer className="site-footer">
          &copy; {new Date().getFullYear()} Youssef Adarrab
        </footer>
      </main>
    </>
  );
}
