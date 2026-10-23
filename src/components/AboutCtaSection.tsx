"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Calendar, Compass, ShieldCheck, Sparkles } from "lucide-react";
import WaveText from "@/components/WaveText";

export default function AboutCtaSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".cta-anim-item");
      if (items && items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
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
      id="about-cta"
      className="relative z-10 py-24 sm:py-32 bg-[#20231F] text-[#F7F5F0] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-[#B79A70]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-[#41483B]/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#242823] via-[#1E211E] to-[#171916] border border-[#B79A70]/30 shadow-2xl p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#F7F5F0 1px, transparent 1px), linear-gradient(90deg, #F7F5F0 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-4xl relative z-10">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#B79A70]/15 border border-[#B79A70]/30 text-sm font-mono uppercase tracking-wider text-[#B79A70] mb-8 cta-anim-item">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Begin Your Architectural Commission</span>
            </div>

            {/* Headline */}
            <div className="mb-6 cta-anim-item">
              <WaveText
                text="Ready to sculpt a residential sanctuary that endures for generations?"
                tag="h2"
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight block"
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-[#E9E2D7]/80 font-light leading-relaxed mb-10 max-w-3xl cta-anim-item">
              Our studio takes on a deliberately capped volume of global commissions annually to preserve uncompromising attention to detail, material provenance, and chartered architectural leadership.
            </p>

            {/* Value Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 pb-10 border-t border-white/10 mb-10 cta-anim-item">
              <div className="flex items-start space-x-3 text-sm text-[#E9E2D7]/85 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                <span>Single-Point Turnkey Accountability</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-[#E9E2D7]/85 font-mono">
                <Compass className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                <span>Bespoke Digital Twin &amp; Quarry Sourcing</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-[#E9E2D7]/85 font-mono">
                <Calendar className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                <span>Fixed-Price Schedule &amp; Budget Governance</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 cta-anim-item">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-[#B79A70] text-[#1A1D1A] font-title text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-xl group"
              >
                <span>Schedule Confidential Briefing</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 font-title text-sm font-semibold uppercase tracking-widest transition-all duration-300"
              >
                <span>Explore Built Portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
