"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowUpRight } from "lucide-react";
import { Testimonial } from "@/data/siteData";
import WaveText from "@/components/WaveText";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsCarouselSection({ testimonials }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamically update items per page based on viewport size:
  // Mobile (< 640px): 1 item per view
  // Tablet (640px - 1023px): 2 items per view
  // Desktop (>= 1024px): 3 items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / itemsPerPage));

  // Ensure current page doesn't exceed totalPages on viewport resize
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Automated sliding every 2.5 seconds
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  // Scroll entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".testimonial-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#F7F5F0] text-[#242522] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header styled with WaveText */}
        <div className="mb-14 sm:mb-20">
          <div className="border-b border-[#41483B]/15 pb-6 sm:pb-10">
            <WaveText
              tag="h2"
              text="TESTIMONIALS"
              className="font-title text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 sm:pt-8">
              <div className="space-y-2 max-w-lg">
                <p className="text-sm font-semibold tracking-wider uppercase text-[#b38f58] font-mono">
                  Client Testimonials &amp; Endorsements
                </p>
                <p className="text-sm sm:text-[13px] text-[#242522]/70 leading-relaxed font-light">
                  Unvarnished reflections from visionary private collectors, estate patrons, and developers across the globe.
                </p>
              </div>

              {/* Header Action & Carousel Nav Arrows */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/testimonials"
                  className="hidden sm:inline-flex items-center space-x-2 text-sm font-title font-bold uppercase tracking-wider text-[#242522] hover:text-[#b38f58] transition-colors group shrink-0 mr-2"
                >
                  <span>READ ALL</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {/* Left & Right Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white border border-[#E9E2D7] text-[#242522] hover:bg-[#b38f58] hover:text-white hover:border-[#b38f58] flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 focus:outline-none"
                    aria-label="Previous Testimonials Slide"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white border border-[#E9E2D7] text-[#242522] hover:bg-[#b38f58] hover:text-white hover:border-[#b38f58] flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 focus:outline-none"
                    aria-label="Next Testimonials Slide"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth Automated Carousel Slider (Pauses on Hover) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden select-none py-2"
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {/* Generate carousel slides grouped by itemsPerPage */}
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const pageItems = testimonials.slice(
                pageIdx * itemsPerPage,
                pageIdx * itemsPerPage + itemsPerPage
              );

              return (
                <div
                  key={pageIdx}
                  className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-1"
                >
                  {pageItems.map((item, itemIdx) => {
                    const globalIdx = pageIdx * itemsPerPage + itemIdx;
                    return (
                      <div
                        key={item.id}
                        className="testimonial-card flex flex-col justify-between p-8 md:p-10 bg-white border border-[#E9E2D7] shadow-lg rounded-2xl hover:border-[#b38f58]/60 transition-all duration-500 w-full hover:shadow-2xl"
                      >
                        <div className="space-y-6">
                          {/* Star Rating & Index Badge */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-[#b38f58]">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                              {String(globalIdx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Editorial Quote */}
                          <blockquote className="font-serif text-lg md:text-xl text-[#242522] italic leading-relaxed font-normal min-h-[110px]">
                            &ldquo;{item.quote}&rdquo;
                          </blockquote>
                        </div>

                        {/* Author Attribution */}
                        <div className="pt-6 mt-6 border-t border-[#E9E2D7] flex items-center space-x-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#E9E2D7] border border-[#b38f58]/40 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.author}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-title text-sm sm:text-base text-[#242522] font-bold truncate">
                              {item.author}
                            </h4>
                            <p className="text-sm text-[#77766F] font-mono truncate max-w-[200px]">
                              {item.role}
                            </p>
                            <p className="text-[11px] text-[#b38f58] font-mono mt-0.5 truncate">
                              {item.project} • {item.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Carousel Bottom Indicators (1 indicator per slide/page) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-10">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                className="py-2 focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    currentPage === idx
                      ? "w-8 h-2 bg-[#b38f58] shadow-sm"
                      : "w-2 h-2 bg-neutral-300 hover:bg-[#b38f58]/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
