"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award, Medal, Star, Sparkles, ExternalLink } from "lucide-react";
import WaveText from "@/components/WaveText";

interface AwardItem {
  id: string;
  year: string;
  organization: string;
  title: string;
  category: string;
  project: string;
  location: string;
  description: string;
  image: string;
}

const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    year: "2025",
    organization: "International Architecture & Design Awards",
    title: "Best Private Residential Architecture (Global)",
    category: "Architecture Grand Prix",
    project: "Villa Solarium",
    location: "Lake Como, Italy",
    description:
      "Celebrated for its seamless biophilic integration into vertical cliffside terrain, combining subterranean daylight shafts and monumental Roman travertine walls.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "award-2",
    year: "2024",
    organization: "Architectural Digest AD100",
    title: "Atelier of the Year: Spatial Restraint",
    category: "Global Atelier Honors",
    project: "Studio Portfolio",
    location: "Milan, London, Zurich",
    description:
      "Awarded for exceptional mastery of monolithic Italian materiality, tactile silence, and bespoke zero-defect joinery across private luxury estates.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "award-3",
    year: "2024",
    organization: "Prix Versailles (UNESCO)",
    title: "Special Prize for Sustainable Interior Architecture",
    category: "World Architecture & Interiors",
    project: "The Haute Atelier",
    location: "Paris, France",
    description:
      "Recognized by UNESCO jury for regenerative thermal acoustics, FSC 100% fumed oak joinery, and non-toxic natural mineral wall finishes.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "award-4",
    year: "2023",
    organization: "World Architecture Festival (WAF)",
    title: "Interior Design of the Year: High-End Living",
    category: "Residential Interiors",
    project: "Residence Nocturne",
    location: "Zurich, Switzerland",
    description:
      "Honored for dramatic chiaroscuro lighting choreography, cantilevered Nero Marquina fireplace, and hidden circadian acoustic envelope.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "award-5",
    year: "2022",
    organization: "Dezeen Design Awards",
    title: "Best Residential Interior Renovation",
    category: "Heritage & Modern Architecture",
    project: "Palazzo di Pietra",
    location: "Florence, Italy",
    description:
      "Restoration of a 17th-century Florentine palazzo, weaving monumental contemporary stone volumes seamlessly into historic vaulted frescoes.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "award-6",
    year: "2021",
    organization: "European Design & Heritage Society",
    title: "Lifetime Excellence in Craftsmanship & Materiality",
    category: "Artisanal Heritage Honor",
    project: "Atelier Decorex",
    location: "Milan, Italy",
    description:
      "Conferred upon Principal Aurelia Vance for lifelong patronage and preservation of traditional Italian stone masonry and joinery guilds.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
];

const PRESS_LOGOS = [
  { name: "ARCHITECTURAL DIGEST", note: "AD100 Atelier" },
  { name: "ELLE DECORATION", note: "Best Living Concept" },
  { name: "WALLPAPER*", note: "Design Awards Finalist" },
  { name: "DEZEEN", note: "Studio of the Year" },
  { name: "THE NEW YORK TIMES STYLE", note: "Architectural Feature" },
];

function AwardCardItem({ award }: { award: AwardItem }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = () => {
    if (!imgRef.current) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }
    gsap.killTweensOf(imgRef.current);

    // Initial state: centered horizontally, shifted slightly below vertical center
    gsap.set(imgRef.current, {
      left: "50%",
      xPercent: -50,
      yPercent: -75,
      scale: 1,
      opacity: 0,
    });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Smoothly reveal at center
    tl.to(imgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    })
      // 2. Smoothly glide to the right side and dock at the right end
      .to(imgRef.current, {
        left: "calc(100% - 24px)",
        xPercent: -100,
        yPercent: -53,
        duration: 0.65,
        ease: "power3.inOut",
      }, "+=0.08");
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }
    gsap.killTweensOf(imgRef.current);

    // Smoothly dissolve wherever it currently is
    gsap.to(imgRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        if (imgRef.current) {
          gsap.set(imgRef.current, {
            left: "50%",
            xPercent: -50,
            yPercent: -45,
            opacity: 0,
          });
        }
      },
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="award-row group relative p-6 sm:p-8 rounded-2xl bg-[#20231F] border border-white/10 hover:border-[#B79A70] hover:bg-[#252824] transition-all duration-300 z-10 hover:z-30"
    >
      {/* Increased size preview image: shows on top of the card with z-40, shifted slightly below side, moves from center to right end */}
      <div
        ref={imgRef}
        className="hidden sm:block absolute top-[52%] z-40 pointer-events-none w-[24%] min-w-[240px] max-w-[340px] aspect-[16/10] rounded-xl overflow-hidden border-2 border-[#B79A70] shadow-[0_16px_45px_rgba(0,0,0,0.85)] bg-[#1A1D1A] opacity-0"
        style={{ left: "50%" }}
      >
        <Image
          src={award.image}
          alt={award.project}
          fill
          sizes="(max-width: 768px) 240px, 340px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#B79A70]/50 text-[10px] font-mono text-[#B79A70] uppercase tracking-wider flex items-center space-x-1">
          <Medal className="w-2.5 h-2.5 text-[#B79A70]" />
          <span>Laureate</span>
        </div>
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/95 z-10">
          <span className="truncate text-[#E9E2D7] font-serif text-sm font-normal">
            {award.project}
          </span>
          <span className="text-[#B79A70] flex items-center gap-1 shrink-0 ml-2 text-[10px] uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5" />
            {award.year}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Year & Trophy */}
        <div className="lg:col-span-2 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#B79A70]/15 border border-[#B79A70]/30 flex items-center justify-center text-[#B79A70] group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-3xl font-light text-white block">
              {award.year}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B79A70]">
              {award.category}
            </span>
          </div>
        </div>

        {/* Award Title & Org */}
        <div className="lg:col-span-5 space-y-1">
          <span className="text-sm font-mono uppercase tracking-wider text-[#E9E2D7]/60">
            {award.organization}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-light text-white group-hover:text-[#B79A70] transition-colors">
            {award.title}
          </h3>
          <p className="text-sm text-[#E9E2D7]/75 font-light leading-relaxed pt-1">
            {award.description}
          </p>
        </div>

        {/* Project & Location */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70]">
            Project Commission
          </span>
          <p className="font-serif text-lg text-white font-normal mt-0.5">
            {award.project}
          </p>
          <p className="text-sm text-[#E9E2D7]/60 font-mono">
            {award.location}
          </p>
        </div>

        {/* Status Badge - smoothly hides on hover when image docks at right end */}
        <div className="lg:col-span-2 flex lg:justify-end items-center">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-mono text-white/90 group-hover:border-[#B79A70] group-hover:text-[#B79A70] group-hover:opacity-0 transition-all duration-300">
            <Medal className="w-3.5 h-3.5" />
            <span>Gold Laureate</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AboutAwardsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll(".award-row");
      if (rows && rows.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
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
      id="awards-section"
      className="relative z-10 pt-12 sm:pt-16 pb-20 sm:pb-28 bg-[#1A1D1A] text-[#F7F5F0] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#B79A70]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-16 pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B79A70]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
                International Recognition
              </span>
            </div>
            <WaveText
              text="Awards & Peer Accolades"
              tag="h2"
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F7F5F0] leading-[1.12]"
            />
          </div>

          <p className="text-sm text-[#E9E2D7]/75 font-light max-w-md font-sans">
            Independent validation from the world&apos;s most prestigious architectural juries, preservation institutes, and design monographs.
          </p>
        </div>

        {/* Press Badges Bar */}
        <div className="mb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PRESS_LOGOS.map((press, pIdx) => (
            <div
              key={pIdx}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#B79A70]/50 transition-colors"
            >
              <span className="font-serif text-sm font-semibold tracking-wider text-white">
                {press.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B79A70] mt-1">
                {press.note}
              </span>
            </div>
          ))}
        </div>

        {/* Awards Chronological Table / Cards */}
        <div className="space-y-4">
          {AWARDS.map((award) => (
            <AwardCardItem key={award.id} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}
