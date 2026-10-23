import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/siteData";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Blog Post Not Found | Decorex Studio" };
  }
  return {
    title: `${post.title} | Decorex Studio Blogs`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts: filter out current and take other posts
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <BlogDetailClient
      post={post}
      relatedPosts={relatedPosts}
      allPosts={BLOG_POSTS}
    />
  );
}
