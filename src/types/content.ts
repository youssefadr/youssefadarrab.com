export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
