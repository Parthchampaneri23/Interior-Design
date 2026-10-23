"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import WaveText from "@/components/WaveText";

export default function AboutShowcaseSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const smallImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Large Image initial state: Zoom-in-up (scaled down, shifted down, transparent)
      gsap.set(mainImageRef.current, {
        opacity: 0,
        y: 90,
        scale: 0.78,
        transformOrigin: "center bottom",
      });

      // 2. Small Image initial state: Right-to-left (shifted right, transparent)
      gsap.set(smallImageRef.current, {
        opacity: 0,
        x: 100,
      });

      // 3. Supporting text descriptions
      gsap.set(textContentRef.current, {
        opacity: 0,
        y: 35,
      });

      // Trigger animations as the About Us section begins overlapping the hero
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 95%",
        onEnter: () => {
          // Large image zoom-in-up: smooth rise & zoom
          gsap.to(mainImageRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
          });

          // Small image comes from right to left smoothly
          gsap.to(smallImageRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.3,
            delay: 0.15,
            ease: "power3.out",
            overwrite: "auto",
          });

          // Supporting text fades up
          gsap.to(textContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(mainImageRef.current, {
            opacity: 0,
            y: 90,
            scale: 0.78,
            duration: 0.5,
            overwrite: "auto",
          });
          gsap.to(smallImageRef.current, {
            opacity: 0,
            x: 100,
            duration: 0.45,
            overwrite: "auto",
          });
          gsap.to(textContentRef.current, {
            opacity: 0,
            y: 35,
            duration: 0.4,
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="second-section"
      ref={containerRef}
      className="relative z-20 mt-[2400px] py-20 md:py-28 bg-[#FFFFFF] text-[#111111] shadow-[0_-30px_70px_rgba(0,0,0,0.45)]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Main Editorial Grid: Left/Center visual composition + Right philosophy column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left + Center Area (Span 8 cols): Giant "ABOUT" on top, with "US" + Text beside Center Image below */}
          <div className="lg:col-span-8 flex flex-col">

            {/* Top row: "ABOUT" in wave form */}
            <div className="w-full">
              <WaveText
                text="ABOUT"
                tag="h2"
                delay={0.05}
                className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-[88px] xl:text-[96px] text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
              />
            </div>

            {/* Bottom row: "US" in wave form + Descriptions on the left, Center Living Room Image on the right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start mt-4 sm:mt-6">

              {/* Left sub-column (US + text) */}
              <div className="md:col-span-4 flex flex-col justify-between pt-1">
                <WaveText
                  text="US"
                  tag="h2"
                  delay={0.15}
                  className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-[88px] xl:text-[96px] text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
                />

                <div ref={textContentRef} className="mt-8 sm:mt-12 space-y-4 max-w-[240px]">
                  <p className="text-[12px] sm:text-[13px] font-semibold tracking-wide text-neutral-900 leading-snug">
                    Luxurious Interior and Industrial Design
                  </p>

                  <p className="text-sm sm:text-[12.5px] text-neutral-600 font-normal leading-relaxed">
                    Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials.
                  </p>
                </div>
              </div>

              {/* Center sub-column: Large Architectural Living Room Image (Zoom-in-up animation) */}
              <div ref={mainImageRef} className="md:col-span-8 will-change-transform">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] bg-[#F5F5F3] shadow-md hover:shadow-xl transition-shadow duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
                    alt="Luxurious Interior Living Room with curved couches in neutral tones"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Span 4 cols): Secondary Pill Image (Right to Left) + "Our Philosophy" Wave Heading & Text */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-6 lg:pt-16">
            {/* Pill-shaped / rounded image (Right-to-left animation) */}
            <div
              ref={smallImageRef}
              className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-[2.2rem] bg-[#F5F5F3] shadow-sm hover:shadow-lg transition-shadow duration-500 will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85"
                alt="Architectural chair and lounge view through partition"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* "Our Philosophy" Heading in wave form */}
            <div className="space-y-3 pt-2 max-w-sm">
              <WaveText
                text="Our Philosophy"
                tag="h3"
                delay={0.25}
                className="font-title text-2xl sm:text-3xl text-black font-extrabold tracking-tight leading-tight block"
              />

              <p className="text-sm sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                At Decorex, we believe in creating luxurious, personalized environments that reflect our clients&apos; tastes and lifestyles.
              </p>

              <div className="pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center space-x-2 text-sm font-title font-bold uppercase tracking-wider text-black hover:text-[#B79A70] transition-colors"
                >
                  <span>DISCOVER MORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
