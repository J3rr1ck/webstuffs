import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: any; // Adjusted type to match MDXRemoteSerializeResult
  headerImage?: string;
  authorImage?: string;
}

export async function getBlogPosts(): Promise<Post[]> {
  const blogDir = path.join(process.cwd(), 'blog');
  let posts: Post[] = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    posts = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const mdxSource = await serialize(content);
        return {
          slug: filename.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          author: data.author,
          content: mdxSource,
          headerImage: data.headerImage || '',
          authorImage: data.authorImage || '',
        };
      })
    );
  }

  // Sort posts by date, newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}