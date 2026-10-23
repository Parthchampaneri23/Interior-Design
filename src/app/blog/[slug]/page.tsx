import { permanentRedirect } from "next/navigation";
import { BLOG_POSTS } from "@/data/siteData";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/blogs/${slug}`);
}
