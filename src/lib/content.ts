import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta, BlogPost } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllBlogPosts(): BlogPostMeta[] {
  const blogDir = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const posts: BlogPostMeta[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      date: data.date || "Unknown",
      tags: data.tags || [],
      description: data.description || "",
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "Unknown",
    tags: data.tags || [],
    description: data.description || "",
    content,
  };
}
