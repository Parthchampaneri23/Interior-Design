import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/data/siteData";
import WaveText from "@/components/WaveText";

interface Props {
  posts: BlogPost[];
}

export default function JournalPreviewSection({ posts }: Props) {
  return (
    <section className="py-20 md:py-28 bg-[#F7F5F0] text-[#242522] overflow-hidden border-t border-[#41483B]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="border-b border-[#41483B]/15 pb-6 sm:pb-10">
            <WaveText
              tag="h2"
              text="BLOGS"
              className="font-title text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 sm:pt-8">
              <div className="space-y-2 max-w-lg">
                <p className="text-sm font-semibold tracking-wider uppercase text-[#b38f58] font-mono">
                  Studio Blogs &amp; Design Perspectives
                </p>
                <p className="text-sm sm:text-[13px] text-[#242522]/70 leading-relaxed font-light">
                  Expert essays on interior architecture, materiality, Vastu layout planning, and bespoke furniture craft.
                </p>
              </div>

              <Link
                href="/blogs"
                className="inline-flex items-center space-x-2 text-sm font-title font-bold uppercase tracking-wider text-[#242522] hover:text-[#b38f58] transition-colors group shrink-0"
              >
                <span>EXPLORE ALL BLOGS</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-white border border-[#E9E2D7] p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#b38f58]/50 transition-all duration-500"
            >
              <div>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-[#E9E2D7] mb-6 shadow-md"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#b38f58] rounded-full shadow-sm">
                    {post.category}
                  </div>
                </Link>

                <div className="text-[11px] font-mono uppercase tracking-widest text-[#77766F] mb-2 flex items-center space-x-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal group-hover:text-[#b38f58] transition-colors leading-snug">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-[#242522]/70 font-light leading-relaxed mt-3 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E9E2D7] flex items-center justify-between">
                <span className="text-sm text-[#77766F] font-mono">By {post.author.name}</span>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-sm font-mono uppercase tracking-widest text-[#b38f58] flex items-center space-x-1 group-hover:underline"
                >
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
