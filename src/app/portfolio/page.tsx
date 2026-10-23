"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Filter } from "lucide-react";
import { PROJECTS } from "@/data/siteData";

import PageBanner from "@/components/PageBanner";
import PortfolioHeroShowcase from "@/components/PortfolioHeroShowcase";

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Penthouse"] as const;

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#1A1D1A] text-[#F7F5F0] pb-24 min-h-screen">
      {/* Page Banner with banner.jpg & Breadcrumb */}
      <PageBanner
        title="Curated Portfolio"
        subtitle="Explore our completed residential estates, private retail salons, coastal pavilions, and high-altitude penthouses."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
      />

      {/* Showcase Section: DESIGN THAT SPEAKS LUXURY */}
      <PortfolioHeroShowcase />

      {/* Portfolio Filter Toolbar */}
      <section className="bg-[#1A1D1A] text-[#F7F5F0] pt-14 pb-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#B79A70]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
                Archive of Commissions ({filteredProjects.length})
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-mono uppercase text-[#E9E2D7]/60 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-[#B79A70] text-[#1A1D1A] border-[#B79A70] font-semibold"
                      : "bg-white/5 text-[#E9E2D7]/80 border-white/10 hover:border-[#B79A70] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid: 2-Column Asymmetric Staggered Editorial Layout matching reference UI */}
      <section className="relative bg-[#1A1D1A] text-[#F7F5F0] py-14 sm:py-20 px-6 md:px-12 overflow-hidden">
        {/* Ambient champagne lighting glows */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#B79A70]/12 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/3 -left-20 w-[500px] h-[500px] bg-[#B79A70]/10 rounded-full blur-[160px] pointer-events-none" />

        {/* 1. Fine Technical Architectural Blueprint / Grid SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="arch-blueprint-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                {/* Secondary subdivision grid */}
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 40 0 L 40 80 M 0 40 L 80 40"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.3"
                  strokeDasharray="2 4"
                  strokeOpacity="0.25"
                />
                {/* Intersection coordinate crosshair */}
                <path
                  d="M 75 80 L 85 80 M 80 75 L 80 85"
                  stroke="#B79A70"
                  strokeWidth="0.8"
                  opacity="0.8"
                />
                <circle cx="80" cy="80" r="1.5" fill="#B79A70" opacity="0.9" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arch-blueprint-grid)" />
          </svg>
        </div>
        {/* 2. Bottom-Right Golden Ratio Fibonacci Spiral Curve */}
        <div className="absolute -bottom-16 -right-16 w-[450px] h-[450px] pointer-events-none opacity-20 select-none">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#B79A70]">
            {/* Golden spiral arcs */}
            <path d="M 500 0 A 500 500 0 0 1 0 500" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 500 191 A 309 309 0 0 1 191 500" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
            <path d="M 500 309 A 191 191 0 0 1 309 500" stroke="currentColor" strokeWidth="1" />
            <path d="M 500 382 A 118 118 0 0 1 382 500" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
            <path d="M 500 427 A 73 73 0 0 1 427 500" stroke="currentColor" strokeWidth="1" />
            {/* Geometric tangent boxes */}
            <rect x="0" y="0" width="500" height="500" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="309" y1="0" x2="309" y2="500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="309" y1="309" x2="500" y2="309" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <text x="320" y="490" fill="currentColor" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">φ = 1.618 // GOLDEN RATIO</text>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Column 1 (Left): Tall top, short second, tall third */}
            <div className="space-y-12 sm:space-y-16">
              {filteredProjects
                .filter((_, idx) => idx % 2 === 0)
                .map((project, itemIdx) => {
                  const aspectClass = itemIdx % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]";
                  return (
                    <div key={project.id} className="group">
                      <Link href={`/portfolio/${project.slug}`} className="block">
                        {/* Dynamic Aspect Ratio Image */}
                        <div
                          className={`relative w-full ${aspectClass} overflow-hidden rounded-none bg-[#20231F] shadow-2xl`}
                        >
                          <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500" />

                          {/* Subtle Category Tag in top-left */}
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#F7F5F0] border border-white/10">
                            {project.category} // {project.year}
                          </div>

                          {/* Floating Hover Arrow */}
                          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#B79A70] text-[#1A1D1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Content below image: Title and Description */}
                        <div className="mt-5 space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-[#B79A70] transition-colors leading-snug">
                            <span className="group-hover:underline underline-offset-4 decoration-[#B79A70]/60 decoration-1">
                              {project.title} — {project.subtitle}
                            </span>
                          </h2>
                          <p className="text-sm sm:text-[13px] text-[#A0A09B] font-light leading-relaxed line-clamp-3 pt-1">
                            {project.challenge || project.solution}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>

            {/* Column 2 (Right): Short top, tall second, short third */}
            <div className="space-y-12 sm:space-y-16">
              {filteredProjects
                .filter((_, idx) => idx % 2 !== 0)
                .map((project, itemIdx) => {
                  const aspectClass = itemIdx % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]";
                  return (
                    <div key={project.id} className="group">
                      <Link href={`/portfolio/${project.slug}`} className="block">
                        {/* Dynamic Aspect Ratio Image */}
                        <div
                          className={`relative w-full ${aspectClass} overflow-hidden rounded-none bg-[#20231F] shadow-2xl`}
                        >
                          <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500" />

                          {/* Subtle Category Tag in top-left */}
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#F7F5F0] border border-white/10">
                            {project.category} // {project.year}
                          </div>

                          {/* Floating Hover Arrow */}
                          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#B79A70] text-[#1A1D1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Content below image: Title and Description */}
                        <div className="mt-5 space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-[#B79A70] transition-colors leading-snug">
                            <span className="group-hover:underline underline-offset-4 decoration-[#B79A70]/60 decoration-1">
                              {project.title} — {project.subtitle}
                            </span>
                          </h2>
                          <p className="text-sm sm:text-[13px] text-[#A0A09B] font-light leading-relaxed line-clamp-3 pt-1">
                            {project.challenge || project.solution}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Commission banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="p-12 md:p-16 bg-[#20231F] text-[#F7F5F0] rounded-sm flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div>
            <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70]">
              Custom Spatial Commission
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#F7F5F0] mt-2">
              Have an architectural project in mind?
            </h3>
            <p className="text-sm text-[#E9E2D7]/75 font-mono mt-1">
              We provide turnkey design services worldwide.
            </p>
          </div>
          <Link
            href="/consultation"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-8 py-3.5 bg-[#B79A70] text-[#20231F] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-md group shrink-0"
          >
            <span>Book Private Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
