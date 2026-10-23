"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function TypewriterWord({
  word,
  id,
  className = "",
  charClassName = "",
}: {
  word: string;
  id?: string;
  className?: string;
  charClassName?: string;
}) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {word.split("").map((char, idx) => (
        <span
          key={idx}
          className={`typewriter-char ${id ? `typewriter-${id}` : ""} inline-block will-change-transform ${charClassName}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function PortfolioHeroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Mobile Typewriter Setup
      const mobileDesign = el.querySelectorAll(".typewriter-m-design");
      const mobileThat = el.querySelectorAll(".typewriter-m-that");
      const mobileSpeaks = el.querySelectorAll(".typewriter-m-speaks");
      const mobileLuxury = el.querySelectorAll(".typewriter-m-luxury");
      const allMobile = el.querySelectorAll(".mobile-typewriter .typewriter-char");

      // 2. Desktop Typewriter Setup
      const deskDesign = el.querySelectorAll(".typewriter-d-design");
      const deskThat = el.querySelectorAll(".typewriter-d-that");
      const deskSpeaks = el.querySelectorAll(".typewriter-d-speaks");
      const deskLuxury = el.querySelectorAll(".typewriter-d-luxury");
      const allDesktop = el.querySelectorAll(".desktop-typewriter .typewriter-char");

      // Set initial hidden state
      gsap.set([allMobile, allDesktop], {
        opacity: 0,
        visibility: "hidden",
      });

      // Desktop Timeline (Slower, relaxed typewriter pace)
      const deskTl = gsap.timeline({ paused: true });
      deskTl
        .to(deskDesign, {
          opacity: 1,
          visibility: "visible",
          duration: 0.01,
          stagger: 0.12,
          ease: "none",
        })
        .to(
          deskThat,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.2"
        )
        .to(
          deskSpeaks,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.28"
        )
        .to(
          deskLuxury,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.2"
        );

      // Mobile Timeline (Slower, relaxed typewriter pace)
      const mobTl = gsap.timeline({ paused: true });
      mobTl
        .to(mobileDesign, {
          opacity: 1,
          visibility: "visible",
          duration: 0.01,
          stagger: 0.12,
          ease: "none",
        })
        .to(
          mobileThat,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.2"
        )
        .to(
          mobileSpeaks,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.28"
        )
        .to(
          mobileLuxury,
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.01,
            stagger: 0.12,
            ease: "none",
          },
          "+=0.2"
        );

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          deskTl.restart();
          mobTl.restart();
        },
        onLeaveBack: () => {
          deskTl.pause(0);
          mobTl.pause(0);
          gsap.set([allMobile, allDesktop], {
            opacity: 0,
            visibility: "hidden",
          });
        },
        onEnterBack: () => {
          deskTl.restart();
          mobTl.restart();
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#111111] overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 border-b border-[#EAEAE6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* MOBILE / TABLET VIEW (< 1024px) */}
        <div className="block lg:hidden mobile-typewriter">
          {/* Headline with Typewriter Animation */}
          <div className="mb-6">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-black leading-[1.12] tracking-[0.05em] uppercase">
              <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
                <TypewriterWord word="DESIGN" id="m-design" />
                <TypewriterWord word="THAT" id="m-that" />
              </div>
              <div className="mt-2.5 flex items-center flex-wrap gap-2.5 sm:gap-3.5">
                <TypewriterWord word="SPEAKS" id="m-speaks" />
                <span className="bg-[#242522] text-white px-3 sm:px-4 py-1 text-2xl sm:text-4xl md:text-5xl font-bold inline-flex items-center">
                  <TypewriterWord word="LUXURY" id="m-luxury" charClassName="text-white" />
                  <span className="inline-block w-[2.5px] h-[0.8em] bg-[#E59A30] ml-1.5 animate-pulse" />
                </span>
              </div>
            </h1>
          </div>

          {/* Living Room Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-sm overflow-hidden mb-8 shadow-lg">
            <Image
              src="/portfolio-hero.jpg"
              alt="Design That Speaks Luxury"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Content & CTA */}
          <div className="space-y-6 mb-10">
            <p className="text-sm sm:text-base text-[#555] font-light leading-relaxed max-w-xl font-sans">
              Transform your space with custom interiors that blend sophistication, comfort, and style. Designed for modern living, curated for timeless appeal.
            </p>

            {/* CTA & Stamp */}
            <div className="flex items-center space-x-6 sm:space-x-8 pt-2">
              <Link
                href="/consultation"
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E59A30] hover:bg-[#d48b25] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300 font-sans"
              >
                Get Started Today
              </Link>

              {/* Circular Badge */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_20s_linear_infinite]"
                >
                  <defs>
                    <path
                      id="circlePathMobile"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text className="text-[9px] font-mono uppercase tracking-[0.22em] fill-[#333] font-bold">
                    <textPath href="#circlePathMobile" startOffset="0%">
                      AWARD WINNING INTERIOR • SINCE 2002 •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E59A30">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#F4F4F2] px-6 sm:px-8 py-6 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-light text-black tracking-tight">
                150
              </div>
              <div className="text-sm text-[#666] font-sans font-light mt-1">
                Happy client
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-light text-black tracking-tight">
                200+
              </div>
              <div className="text-sm text-[#666] font-sans font-light mt-1">
                Successful project
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-light text-black tracking-tight">
                10+
              </div>
              <div className="text-sm text-[#666] font-sans font-light mt-1">
                Years of experience
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW (>= 1024px) - Styled with Typewriter Animation */}
        <div className="hidden lg:flex items-stretch min-h-[660px] xl:min-h-[720px] desktop-typewriter">
          {/* Left Column: Stable comfortable width */}
          <div className="w-[370px] lg:w-[420px] xl:w-[480px] shrink-0 flex flex-col justify-between pr-4 xl:pr-6">
            {/* Top Typography: DESIGN & SPEAKS with Typewriter Animation */}
            <div className="pt-2">
              <div className="font-serif font-bold text-black leading-none text-[76px] lg:text-[86px] xl:text-[104px] tracking-[0.05em] uppercase whitespace-nowrap">
                <TypewriterWord word="DESIGN" id="d-design" />
              </div>
              <div className="font-serif font-bold text-black leading-none text-[76px] lg:text-[86px] xl:text-[104px] tracking-[0.05em] uppercase whitespace-nowrap mt-3 xl:mt-4 py-2.5 xl:py-3.5">
                <TypewriterWord word="SPEAKS" id="d-speaks" />
              </div>
            </div>

            {/* Middle Section: Description & CTA with Circular Badge */}
            <div className="space-y-7 my-auto pt-4 pb-8">
              <p className="text-[14px] xl:text-[16px] text-[#555] font-light leading-relaxed max-w-[370px] xl:max-w-[420px] font-sans">
                Transform your space with custom interiors that blend sophistication, comfort, and style. Designed for modern living, curated for timeless appeal.
              </p>

              <div className="flex items-center space-x-6 xl:space-x-8">
                <Link
                  href="/consultation"
                  className="px-7 xl:px-9 py-3.5 xl:py-4 rounded-full bg-[#E59A30] hover:bg-[#d48b25] text-white font-medium text-sm xl:text-base shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap font-sans"
                >
                  Get Started Today
                </Link>

                {/* Circular Stamp Badge */}
                <div className="relative w-20 h-20 xl:w-22 xl:h-22 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full animate-[spin_20s_linear_infinite]"
                  >
                    <defs>
                      <path
                        id="circlePathDesktop"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text className="text-[9px] font-mono uppercase tracking-[0.22em] fill-[#333] font-bold">
                      <textPath href="#circlePathDesktop" startOffset="0%">
                        AWARD WINNING INTERIOR • SINCE 2002 •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E59A30">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="bg-[#F4F4F2] px-6 xl:px-7 py-6 grid grid-cols-3 gap-3 xl:gap-5">
              <div>
                <div className="text-2xl xl:text-3xl font-serif font-light text-black tracking-tight">
                  150
                </div>
                <div className="text-sm xl:text-base text-[#666] font-sans font-light mt-1 leading-tight">
                  Happy client
                </div>
              </div>
              <div>
                <div className="text-2xl xl:text-3xl font-serif font-light text-black tracking-tight">
                  200+
                </div>
                <div className="text-sm xl:text-base text-[#666] font-sans font-light mt-1 leading-tight">
                  Successful project
                </div>
              </div>
              <div>
                <div className="text-2xl xl:text-3xl font-serif font-light text-black tracking-tight">
                  10+
                </div>
                <div className="text-sm xl:text-base text-[#666] font-sans font-light mt-1 leading-tight">
                  Years of experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image with Typewriter Animated Overlayed Typography */}
          <div className="flex-1 relative h-full min-h-[580px] xl:min-h-[660px]">
            {/* The Image */}
            <Image
              src="/portfolio-hero.jpg"
              alt="Design That Speaks Luxury Living Room"
              fill
              priority
              sizes="55vw"
              className="object-cover object-center"
            />

            {/* Overlayed Typography: THAT & LUXURY with Typewriter Animation */}
            <div className="relative z-10 pt-2 h-full flex flex-col justify-start pointer-events-none -translate-x-5 lg:-translate-x-8 xl:-translate-x-12">
              {/* THAT in black over top wall */}
              <div className="font-serif font-bold text-black leading-none text-[76px] lg:text-[86px] xl:text-[104px] tracking-[0.05em] uppercase pl-2 select-none whitespace-nowrap">
                <TypewriterWord word="THAT" id="d-that" />
              </div>

              {/* Tinted Dark Strip with LUXURY in pure white */}
              <div className="bg-black/35 backdrop-blur-[2px] w-[calc(100%+3rem)] py-2.5 xl:py-3.5 pl-2 mt-3 xl:mt-4">
                <span className="font-serif font-bold text-white leading-none text-[76px] lg:text-[86px] xl:text-[104px] tracking-[0.05em] uppercase select-none whitespace-nowrap inline-flex items-center">
                  <TypewriterWord word="LUXURY" id="d-luxury" charClassName="text-white" />
                  <span className="inline-block w-[3px] h-[0.78em] bg-[#E59A30] ml-2 animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
