"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { Project } from "@/data/siteData";
import WaveText from "@/components/WaveText";

interface Props {
  projects: Project[];
}

export default function FeaturedProjectsSection({ projects }: Props) {
  // Show 5 projects
  const displayProjects = projects.slice(0, 5);

  // Default expanded item to middle project (index 2) just like the reference design
  const [activeId, setActiveId] = useState<string>(
    displayProjects[2]?.id || displayProjects[0]?.id || ""
  );

  return (
    <section
      id="portfolio-section"
      className="relative z-20 py-20 md:py-28 bg-[#1A1D1A] text-[#F7F5F0] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#B79A70]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-[#41483B]/20 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#F7F5F0]/15">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#B79A70]" />
            <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
              Curated Works // Selection
            </span>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-sm uppercase tracking-[0.22em] font-semibold text-[#F7F5F0] hover:text-[#b38f58] transition-colors mt-4 md:mt-0 group"
          >
            <span>View All Works</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Poster Showcase Container: Giant Title Behind Staggered Vertical Pill Bars */}
        <div className="relative w-full pt-10 pb-16 sm:pb-20 flex flex-col items-center">
          <div className="absolute -top-10 sm:-top-16 md:-top-16 left-0 right-0 flex items-center justify-left pointer-events-none select-none z-0 overflow-hidden">
            <WaveText
              tag="h2"
              text="PORTFOLIO"
              className="font-title text-[76px] sm:text-[115px] md:text-[155px] lg:text-[185px] xl:text-[190px] font-black tracking-tighter text-[#b58c57] leading-none uppercase whitespace-nowrap"
            />
          </div>

          {/* Staggered Vertical Pill Bars that Expand on Hover like last layout */}
          <div className="relative z-10 mt-12 w-full flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 h-auto lg:h-[580px] xl:h-[620px] items-stretch pt-4 sm:pt-8">
            {displayProjects.map((project, idx) => {
              const isActive = activeId === project.id;
              // Stagger vertical offsets: 2nd and 4th cards shifted further bottom side
              const staggerOffsets = [
                "lg:translate-y-0",
                "lg:translate-y-14 md:translate-y-12 sm:translate-y-6",
                "lg:translate-y-3",
                "lg:translate-y-20 md:translate-y-16 sm:translate-y-8",
                "lg:translate-y-4",
              ];
              const staggerClass = staggerOffsets[idx % 5];

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                  className={`group relative overflow-hidden rounded-[2.2rem] sm:rounded-[2.8rem] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none ${staggerClass} ${
                    isActive
                      ? "lg:flex-[4] xl:flex-[4.2] ring-2 ring-[#b38f58] shadow-2xl"
                      : "lg:flex-[1] hover:lg:flex-[1.25] opacity-85 hover:opacity-100 ring-1 ring-white/10"
                  } h-[380px] sm:h-[440px] lg:h-full bg-[#1e211e]`}
                >
                  {/* Background Full Cover Image */}
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-1000 ease-out ${
                      isActive
                        ? "scale-105 filter grayscale-0"
                        : "scale-100 group-hover:scale-105 filter grayscale contrast-125"
                    }`}
                  />

                  {/* Dark Scrim / Vignette */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive
                        ? "bg-gradient-to-t from-black/90 via-black/40 to-black/30"
                        : "bg-black/60 group-hover:bg-black/45"
                    }`}
                  />

                  {/* Top Pill Header: Category Tag & Number Badge with #b38f58 */}
                  <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-20">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  {/* Collapsed State: Bold Vertical Japanese/Architectural Stacked Letters like Reference Image */}
                  <div
                    className={`hidden lg:flex absolute inset-0 flex-col items-center justify-center pointer-events-none transition-opacity duration-500 z-10 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="font-title text-base xl:text-lg tracking-[0.25em] uppercase text-white/90 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
                      {project.title}
                    </span>
                  </div>

                  {/* Expanded Active State: Full Details Opened Smoothly (Same as last layout) */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10 transition-all duration-700 z-20 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 lg:opacity-0 translate-y-6 pointer-events-none"
                    }`}
                  >
                    <div className="mb-2">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#F7F5F0] text-[11px] font-mono uppercase tracking-wider">
                        <Compass className="w-3 h-3 text-[#b38f58]" />
                        <span>{project.location}</span>
                      </span>
                    </div>

                    <h3 className="font-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#F7F5F0]/85 font-light max-w-xl mb-4 line-clamp-2">
                      {project.subtitle} • {project.challenge || project.solution}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <div className="flex items-center space-x-4 text-sm font-mono text-[#b38f58]">
                        <span>{project.area}</span>
                        <span>//</span>
                        <span>{project.year}</span>
                      </div>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#b38f58] text-white font-title text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors shadow-xl"
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
