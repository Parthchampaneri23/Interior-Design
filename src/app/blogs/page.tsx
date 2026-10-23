"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, Clock, Calendar, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/data/siteData";
import PageBanner from "@/components/PageBanner";
import TypewriterTitle from "@/components/TypewriterTitle";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Design Philosophy", "Art & Curation", "Materiality"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="w-full bg-[#F7F5F0] text-[#242522] pb-24 min-h-screen selection:bg-[#B79A70] selection:text-white">
      {/* 1. Page Banner with Standard Breadcrumb */}
      <PageBanner
        title="Interior Design Blogs"
        subtitle="Curated essays, architectural theory, material trend analysis, and behind-the-scenes spatial chronicles from Decorex Studio."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs" },
        ]}
      />

      {/* 2. Blog Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-6 border-b border-[#242522]/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider border transition-all ${
                  selectedCategory === cat
                    ? "bg-[#242522] text-white border-[#242522] font-semibold shadow-sm"
                    : "bg-white text-[#77766F] border-[#242522]/10 hover:border-[#B79A70] hover:text-[#242522]"
                }`}
              >
                {cat}+
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#77766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search interior blogs & essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold bg-white border border-[#242522]/15 text-[#242522] placeholder:text-[#77766F] focus:outline-none focus:border-[#B79A70] shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 3. Featured Article Card (When Available) */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-6">
          <div className="p-8 md:p-12 bg-white border border-[#242522]/10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group">
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] shadow-md">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#242522]/90 backdrop-blur-md px-3.5 py-1 text-sm font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                Featured Editorial
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center space-x-3 text-sm font-mono uppercase tracking-wider text-[#77766F]">
                <span className="text-[#B79A70] font-semibold">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242522] group-hover:text-[#B79A70] transition-colors leading-snug">
                <Link href={`/blogs/${featuredPost.slug}`}>
                  <TypewriterTitle text={featuredPost.title} />
                </Link>
              </h2>

              <p className="text-sm text-[#5A5952] font-light leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 border-t border-[#242522]/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#E9E2D7]">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#242522]">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-[#77766F] font-mono">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-mono uppercase tracking-widest text-[#B79A70] hover:text-[#242522] font-semibold group/btn"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Blog Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {(regularPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-white border border-[#242522]/10 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#B79A70]/50 transition-all duration-500"
            >
              <div>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] mb-6 shadow-sm"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#B79A70] font-semibold border border-[#242522]/10">
                    {post.category}
                  </div>
                </Link>

                <div className="text-[11px] font-mono uppercase tracking-widest text-[#77766F] mb-2 flex items-center space-x-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#242522] font-normal group-hover:text-[#B79A70] transition-colors leading-snug">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-[#5A5952] font-light leading-relaxed mt-3 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#242522]/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#E9E2D7]">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-[#242522] font-mono">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-sm font-mono uppercase tracking-widest text-[#B79A70] flex items-center space-x-1 group-hover:underline font-semibold"
                >
                  <span>Read</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
