"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Compass, Eye, Target, Sparkles } from "lucide-react";
import WaveText from "@/components/WaveText";

export default function AboutBrandStorySection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".brand-anim-item");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 pt-0 pb-20 md:pb-28 bg-[#F7F5F0] text-[#242522] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#B79A70]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Showcase Composition Flush with Banner (No card box, 40% larger images) */}
        <div className="relative pt-6 sm:pt-10 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Image: about1.jpg (Armchair & Decor) - Shifted 10% upwards */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1 brand-anim-item">
              <div className="relative w-full max-w-[530px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[520px] -translate-y-[10%] group">
                <Image
                  src="/about2.png"
                  alt="Luxurious Interior Armchair and Plant Decor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-md"
                />
              </div>
            </div>

            {/* Center Content: Title, Description, and Theme-Friendly Explore More Button */}
            <div className="lg:col-span-4 flex flex-col items-center text-center order-1 lg:order-2 px-2 sm:px-6 brand-anim-item z-10">
              <WaveText
                text="Unveiling the Art of Luxurious Interior Design"
                tag="h2"
                className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[42px] xl:text-5xl font-light text-[#242522] leading-[1.15] tracking-tight mb-4"
              />

              <p className="text-sm md:text-[15px] text-[#77766F] font-light leading-relaxed max-w-md mb-8">
                Bespoke interiors crafted with the finest materials. Discover luxury living with our tailored designs.
              </p>

              {/* Theme-Friendly Pill CTA Button */}
              <Link
                href="/portfolio"
                className="group inline-flex items-center space-x-3 px-7 sm:px-8 py-3.5 rounded-full bg-[#B79A70] hover:bg-[#a3875f] text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm tracking-wide"
              >
                <span>Explore More</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
            </div>

            {/* Right Image: about2.jpg (Lounge Chairs & Pendant Lighting) - Shifted 10% upwards */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end order-3 brand-anim-item">
              <div className="relative w-full max-w-[530px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[520px] -translate-y-[10%] group">
                <Image
                  src="/about2.png"
                  alt="Modern Curved Lounge Armchairs and Decor"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-md"
                />
              </div>
            </div>

          </div>

          {/* 3 to 4 Line Editorial Description Below Showcase */}
          <div className="max-w-6xl mx-auto text-center brand-anim-item">
            {/* <span className="text-[11px] uppercase tracking-[0.3em] text-[#B79A70] font-mono block mb-3">
              Craftsmanship &amp; Spatial Philosophy
            </span> */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-light text-[#242522] leading-relaxed">
              Every residence we create begins with an intuitive dialogue between monumental raw materials and the choreography of natural light. We honor the quiet honesty of handcrafted joinery, organic stone textures, and architectural stillness that gently transcends transient trends to become an enduring generational sanctuary.
            </p>
          </div>
        </div>

        {/* Mission, Vision & Core Values Cards */}
        <div className="mt-16 sm:mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-16 pb-6 border-b border-[#242522]/15">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="w-8 h-[1px] bg-[#B79A70]" />
                <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
                  Pillars of Practice
                </span>
              </div>
              <WaveText
                text="Mission, Vision & Core Values"
                tag="h2"
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#242522] leading-[1.12]"
              />
            </div>
            <p className="text-sm text-[#77766F] font-light max-w-md font-sans">
              The intellectual blueprint and foundational principles behind every residential sanctuary and commercial atelier we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Mission Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#242522]/10 shadow-sm hover:shadow-xl hover:border-[#B79A70]/60 transition-all duration-300 brand-anim-item flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E9E2D7]/70 border border-[#B79A70]/30 flex items-center justify-center text-[#B79A70] mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70]">
                  Our Mission
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#242522] mt-1 mb-4">
                  Precision Turnkey Realization
                </h3>
                <p className="text-sm text-[#77766F] font-light leading-relaxed">
                  To guide discerning private collectors, entrepreneurs, and families through a seamless architectural journey from the first hand-drawn sketch to bespoke furniture curation and turnkey delivery without compromise.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#242522]/10 text-sm font-mono text-[#B79A70] uppercase tracking-wider">
                Flawless Execution
              </div>
            </div>

            {/* 2. Vision Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#20231F] text-[#F7F5F0] border border-white/10 shadow-xl hover:border-[#B79A70] transition-all duration-300 brand-anim-item flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#41483B]/60 border border-[#B79A70]/40 flex items-center justify-center text-[#B79A70] mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70]">
                  Our Vision
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F7F5F0] mt-1 mb-4">
                  Generational Longevity
                </h3>
                <p className="text-sm text-[#E9E2D7]/75 font-light leading-relaxed">
                  To define the international benchmark for biophilic haute architecture—spaces engineered with regenerative ecological standards, noble materials that age with patina, and soulful art integration that lasts for centuries.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/15 text-sm font-mono text-[#B79A70] uppercase tracking-wider">
                Patina &amp; Permanence
              </div>
            </div>

            {/* 3. Core Values Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#242522]/10 shadow-sm hover:shadow-xl hover:border-[#B79A70]/60 transition-all duration-300 brand-anim-item flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E9E2D7]/70 border border-[#B79A70]/30 flex items-center justify-center text-[#B79A70] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70]">
                  Core Values
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#242522] mt-1 mb-4">
                  Purity, Provenance &amp; Poise
                </h3>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70] mt-2 shrink-0" />
                    <p className="text-sm text-[#77766F] font-light leading-relaxed">
                      <strong className="font-medium text-[#242522]">Spatial Restraint:</strong> Eliminating superficial noise in favor of architectural stillness.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70] mt-2 shrink-0" />
                    <p className="text-sm text-[#77766F] font-light leading-relaxed">
                      <strong className="font-medium text-[#242522]">Material Authenticity:</strong> Uncompromising devotion to raw stone, warm timber, and noble metals.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70] mt-2 shrink-0" />
                    <p className="text-sm text-[#77766F] font-light leading-relaxed">
                      <strong className="font-medium text-[#242522]">Artisanal Honesty:</strong> Celebrating millimeter precision joinery and generational craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#242522]/10 text-sm font-mono text-[#B79A70] uppercase tracking-wider">
                Integrity &amp; Timeless Craft
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
