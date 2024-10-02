import { GetStaticPaths, GetStaticProps } from 'next';
import { getBlogPosts, Post } from '@/components/lib-get-blog-posts';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date} | {post.author}</p>
      <MDXRemote {...post.content} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};