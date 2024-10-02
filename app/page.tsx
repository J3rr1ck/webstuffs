import DangerAILanding from "@/components/danger-ai-landing";
import { getBlogPosts } from "@/components/lib-get-blog-posts";

export default async function Page() {
  const posts = await getBlogPosts();
  return <DangerAILanding posts={posts} />;
}