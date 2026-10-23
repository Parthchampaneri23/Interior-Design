"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  ShieldCheck,
  Gem,
  Compass,
  ArrowUpRight,
  Maximize2,
  Sparkles,
} from "lucide-react";
import WaveText from "@/components/WaveText";

interface Capability {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  standards: string[];
  image: string;
  statBadge: string;
  dimensionCode: string;
  accentMetric: {
    value: string;
    label: string;
  };
}

const CAPABILITIES: Capability[] = [
  {
    id: "cap-1",
    number: "01",
    category: "Spatial Architecture & Flow",
    title: "Bespoke Spatial Planning & Circulation",
    tagline: "Golden-ratio proportions, sightline framing & intuitive living flow",
    description:
      "We orchestrate interior volumes to achieve perfect equilibrium between expansive grandeur and intimate comfort. Every furniture cluster, daylight path, and transitional gallery is calculated to foster effortless movement and emotional serenity.",
    specs: [
      "Golden-Ratio Spatial Zoning & Volumetric Balance",
      "Concealed Built-in Niches & Flush Architectural Portals",
      "Framed Sightlines to Exterior Landscapes & Natural Light",
      "Ergonomic Circulation Pathways & Dimension Calibration",
    ],
    standards: [
      "Universal Ergonomic Living Standards",
      "Spatial Harmony & Sightline Geometry Protocol",
      "DIN 4109 Interior Acoustic Decoupling",
    ],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    statBadge: "BESPOKE SPATIAL FLOW",
    dimensionCode: "SEC // 01 · φ 1.618",
    accentMetric: {
      value: "1 : 1.618",
      label: "Golden Ratio",
    },
  },
  {
    id: "cap-2",
    number: "02",
    category: "Noble Materiality & Joinery",
    title: "Noble Material Alchemy & Artisan Cabinetry",
    tagline: "Bookmatched natural stone, quarter-sawn hardwoods & patinated metals",
    description:
      "Every material tells a provenance story. We source rare slabs directly from private Tuscan quarries, pair them with European fumed oak, and detail custom millwork with concealed soft-damped reveals, dovetail drawers, and hand-rubbed organic waxes that age gracefully with time.",
    specs: [
      "Continuous Bookmatched Calacatta Viola & Travertine Veining",
      "Solid Quarter-Sawn Fumed European Oak Millwork",
      "Hand-Patinated Unlacquered Gunmetal & Bronze Details",
      "Concealed Flush Pivot Hinges & Soft-Damped Reveals",
    ],
    standards: [
      "FSC® 100% Certified Heritage Hardwoods",
      "UNI EN 1341 Natural Stone Geological Purity",
      "Zero-VOC Eco-Friendly Plant Wax & Oil Finishes",
    ],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    statBadge: "± 0.5MM TOLERANCE",
    dimensionCode: "TOL // 02 · ±0.5MM",
    accentMetric: {
      value: "± 0.5 mm",
      label: "Joinery Tolerance",
    },
  },
  {
    id: "cap-3",
    number: "03",
    category: "Atmosphere & Lighting",
    title: "Atmospheric Lighting & Acoustic Softness",
    tagline: "Museum-grade 98+ CRI illumination & concealed acoustic serenity",
    description:
      "True luxury is felt in silence and gentle illumination. We conceal micro-perforated acoustic absorbers behind seamless textured plaster and choreograph automated circadian lighting that seamlessly transitions from energizing morning clarity to warm evening candle-glow.",
    specs: [
      "98+ CRI Museum-Grade Glare-Shielded Architectural Downlights",
      "Circadian 2700K to 1800K Sunset Warm-Dimming Choreography",
      "Concealed Micro-Perforated Acoustic Wall & Ceiling Absorbers",
      "Flush Plaster-in Micro-Linear Slot Diffusers & Smart KNX Scenes",
    ],
    standards: [
      "WELL Building Standard v2 Light & Sound Platinum",
      "IEEE 1789 Zero-Flicker Visual Comfort",
      "ISO 3382 Interior Reverberation Class A (< 25 dB)",
    ],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    statBadge: "98+ CRI LIGHTING",
    dimensionCode: "LUM // 03 · 98+ CRI",
    accentMetric: {
      value: "98+ CRI",
      label: "Colour Fidelity",
    },
  },
  {
    id: "cap-4",
    number: "04",
    category: "Curation & Turnkey Styling",
    title: "Haute Couture Furnishings & Turnkey Curation",
    tagline: "Custom upholstery, collectible art procurement & white-glove staging",
    description:
      "Complete interior refinement delivered to the final decorative detail. We commission custom furniture from northern Italian ateliers, procure collectible art, curate bespoke Belgian linens and hand-knotted wool rugs, and stage the residence for immediate, breathtaking handover.",
    specs: [
      "Bespoke Italian Full-Grain Aniline Leather & Heavy Linen Upholstery",
      "Hand-Knotted Tibetan Wool & Mulberry Silk Area Rugs",
      "Curated Contemporary Fine Art, Sculptures & Ceramics",
      "White-Glove Turnkey Staging Down to Scent & Accessories",
    ],
    standards: [
      "Martindale Rub Count > 50,000 (Severe Domestic Durability)",
      "OEKO-TEX® Standard 100 Non-Toxic Textile Purity",
      "100% White-Glove Handover & Latent Warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    statBadge: "WHITE-GLOVE TURNKEY",
    dimensionCode: "WRN // 04 · 10YR GNT",
    accentMetric: {
      value: "100%",
      label: "Turnkey Styling",
    },
  },
];

const QUALITY_BENCHMARKS = [
  {
    icon: Gem,
    index: "01",
    label: "Material Purity",
    title: "Noble Material Provenance",
    value: "100%",
    description: "Quarry-selected Calacatta marble, solid heritage hardwoods, and unlacquered hand-burnished metals.",
  },
  {
    icon: Compass,
    index: "02",
    label: "Artisan Joinery",
    title: "Custom Millwork Precision",
    value: "± 0.5 mm",
    description: "Concealed pivot systems, bookmatched veneer alignment, and micro-calibrated architectural shadow reveals.",
  },
  {
    icon: Sparkles,
    index: "03",
    label: "Atmospheric Optics",
    title: "True-Colour Lighting",
    value: "98+ CRI",
    description: "Museum-grade chromatic fidelity, glare-free indirect coves, and circadian 2700K–1800K warm dimming.",
  },
  {
    icon: ShieldCheck,
    index: "04",
    label: "Textile Endurance",
    title: "Heirloom Furnishings",
    value: "50K+",
    description: "Belgian linen, full-grain Italian aniline leathers, and hand-knotted silk rugs tested for generational resilience.",
  },
];

/**
 * Animated Theme SVGs for Luxury Architectural Interior Design
 */
function ArchitecturalGoldenSpiralSvg() {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-16 text-[#B79A70] opacity-80"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="99" height="99" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
      <rect x="99.5" y="0.5" width="60" height="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
      <rect x="99.5" y="60.5" width="39" height="39" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
      <rect x="138.5" y="60.5" width="21" height="21" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
      <path
        d="M 0.5 99.5 A 99 99 0 0 1 99.5 0.5 A 60 60 0 0 1 159.5 60.5 A 39 39 0 0 1 120.5 99.5 A 21 21 0 0 1 99.5 78.5"
        stroke="#B79A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-all duration-700"
      />
      <circle cx="120.5" cy="78.5" r="2" fill="#B79A70" />
      <text x="4" y="14" fill="#B79A70" fontSize="7" fontFamily="monospace" letterSpacing="0.2em">
        φ 1.618
      </text>
    </svg>
  );
}

function BlueprintCompassSvg() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-[#B79A70]"
      aria-hidden="true"
    >
      {/* Compass Pivot Head */}
      <circle cx="40" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="14" r="1.5" fill="currentColor" />
      <line x1="40" y1="5" x2="40" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Compass Caliper Legs */}
      <path d="M 37 18 L 18 68" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 43 18 L 62 68" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

      {/* Measurement Arc */}
      <path d="M 27 44 A 20 20 0 0 1 53 44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Needle Tips */}
      <circle cx="18" cy="68" r="1.2" fill="currentColor" />
      <circle cx="62" cy="68" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CADFloorplanDimensionSvg() {
  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-56 h-9 text-[#B79A70]/80"
      aria-hidden="true"
    >
      {/* Dimension Line with Architectural End Ticks */}
      <line x1="10" y1="20" x2="230" y2="20" stroke="currentColor" strokeWidth="0.75" />
      <line x1="10" y1="12" x2="10" y2="28" stroke="currentColor" strokeWidth="1.2" />
      <line x1="10" y1="24" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="120" y1="14" x2="120" y2="26" stroke="currentColor" strokeWidth="0.75" />
      <line x1="230" y1="12" x2="230" y2="28" stroke="currentColor" strokeWidth="1.2" />
      <line x1="224" y1="24" x2="230" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Architectural Coordinates Text */}
      <text x="50" y="15" fill="#77766F" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">
        AXIS A·01 // 6.40 M
      </text>
      <text x="145" y="15" fill="#77766F" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">
        AXIS B·02 // 4.80 M
      </text>
    </svg>
  );
}

export default function AboutCapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. HUD Benchmark Metric Cards Stagger Entrance
      const benchmarkCards = containerRef.current?.querySelectorAll(".benchmark-card");
      if (benchmarkCards && benchmarkCards.length) {
        gsap.fromTo(
          benchmarkCards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current?.querySelector(".benchmarks-grid"),
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Responsive ScrollTrigger using gsap.matchMedia()
      const mm = gsap.matchMedia();

      // DESKTOP (min-width: 1024px): Horizontal Pinned Scroll
      mm.add("(min-width: 1024px)", () => {
        const pinContainer = pinContainerRef.current;
        const track = horizontalTrackRef.current;
        const progressBar = progressBarRef.current;

        if (pinContainer && track) {
          const calculateDistance = () => {
            return track.scrollWidth - window.innerWidth + 160;
          };

          const horizontalTween = gsap.to(track, {
            x: () => -calculateDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: pinContainer,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${calculateDistance()}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBar) {
                  gsap.set(progressBar, {
                    width: `${Math.round(self.progress * 100)}%`,
                  });
                }
              },
            },
          });

          // Individual Card Parallax & Detail Entrance inside the horizontal track
          const cards = track.querySelectorAll(".capability-horizontal-card");
          cards.forEach((card) => {
            const img = card.querySelector(".card-image-fill");
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.1 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }
          });
        }
      });

      // MOBILE & TABLET (max-width: 1023px): Seamless Vertical Scroll
      mm.add("(max-width: 1023px)", () => {
        const verticalCards = containerRef.current?.querySelectorAll(".capability-horizontal-card");
        verticalCards?.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      // Recalibrate trigger positions after mounting
      ScrollTrigger.refresh();
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);

      return () => clearTimeout(refreshTimer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="capabilities-quality"
      className="relative z-10 pt-16 sm:pt-20 pb-4 sm:pb-8 bg-[#F7F5F0] text-[#242522]"
    >
      {/* Subtle ambient architectural watermark grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#242522 1px, transparent 1px), linear-gradient(90deg, #242522 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header with Animated Architectural SVGs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-6 border-b border-[#242522]/15">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-[1px] bg-[#B79A70]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#B79A70] font-mono">
                Artisanal Craftsmanship &amp; Interior Rigor
              </span>
            </div>
            <WaveText
              text="Capabilities & Quality Standards"
              tag="h2"
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#242522] leading-[1.12]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="hidden sm:block">
              <ArchitecturalGoldenSpiralSvg />
            </div>
            <p className="text-sm text-[#77766F] font-light max-w-sm font-sans leading-relaxed">
              How we translate visionary interior concepts into bespoke, timeless living spaces with artisanal craftsmanship, noble materiality, and uncompromising attention to detail.
            </p>
          </div>
        </div>

        {/* 1. Formal Architectural Quality Benchmarks (HUD Bar) */}
        <div className="benchmarks-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-14">
          {QUALITY_BENCHMARKS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="benchmark-card group relative p-8 rounded-2xl bg-white border border-[#242522]/10 shadow-sm hover:shadow-xl hover:border-[#B79A70] transition-all duration-500 overflow-hidden"
              >
                {/* Hairline gold accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B79A70] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#E9E2D7]/70 border border-[#B79A70]/30 flex items-center justify-center text-[#B79A70] transition-transform duration-500 group-hover:scale-105">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F]/80">
                    // {item.index}
                  </span>
                </div>

                <div className="font-serif text-4xl sm:text-5xl font-light text-[#242522] mb-2 tracking-tight group-hover:text-[#B79A70] transition-colors duration-300">
                  {item.value}
                </div>

                <h3 className="font-serif text-lg font-medium text-[#242522] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#77766F] font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-6 mt-6 border-t border-[#242522]/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#B79A70]">
                  <span>{item.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Horizontal-on-Scroll Capability Cards Section */}
      <div
        ref={pinContainerRef}
        className="relative w-full lg:h-screen flex flex-col justify-center items-center py-0"
      >
        {/* Top Architectural Coordinate Ruler & Dynamic Progress Bar (Desktop only) */}
        <div className="hidden lg:flex max-w-[1560px] w-full mx-auto px-10 mb-4 items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <BlueprintCompassSvg />
            <div className="font-mono text-sm uppercase tracking-widest text-[#77766F]">
              <span className="text-[#B79A70] font-semibold">ATELIER FOLIO REEL</span>
              <span className="mx-2 text-[#242522]/20">|</span>
              <span>HORIZONTAL SCROLL PROTOCOL</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <CADFloorplanDimensionSvg />
            <div className="w-40 h-[2px] bg-[#242522]/10 rounded-full overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="h-full bg-[#B79A70] transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Track Viewport Wrapper */}
        <div className="w-full overflow-hidden py-2">
          {/* The Track: Horizontal on Desktop (lg+), Vertical on Mobile & Tablet */}
          <div
            ref={horizontalTrackRef}
            className="flex flex-col lg:flex-row lg:flex-nowrap gap-10 lg:gap-14 px-6 sm:px-10 lg:px-14 max-w-[1560px] mx-auto lg:max-w-none lg:mx-0 w-full lg:w-max items-center"
          >
            {CAPABILITIES.map((cap, cIdx) => (
              <div
                key={cap.id}
                className="capability-horizontal-card w-full lg:w-[82vw] lg:max-w-[1200px] lg:h-[76vh] lg:max-h-[560px] lg:min-h-[500px] shrink-0 rounded-3xl bg-white border border-[#242522]/15 shadow-none transition-all duration-500 p-6 sm:p-7 lg:p-8 relative group flex flex-col justify-between"
              >
                {/* Corner Architectural Crosshairs */}
                <div className="absolute top-4 left-4 font-mono text-sm text-[#242522]/25 select-none pointer-events-none">
                  +
                </div>
                <div className="absolute top-4 right-4 font-mono text-sm text-[#242522]/25 select-none pointer-events-none">
                  +
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-sm text-[#242522]/25 select-none pointer-events-none">
                  +
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-sm text-[#242522]/25 select-none pointer-events-none">
                  +
                </div>

                {/* Equal 50/50 Balance: Image & Content Height/Width Harmonized */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch h-full">
                  {/* Left Column: Pure Architectural Visual Frame (No text overlays) */}
                  <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-0 h-full w-full rounded-2xl overflow-hidden bg-[#E9E2D7] border border-[#242522]/10">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="card-image-fill object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Right Column: Equal-Weight Content & Precision Specifications */}
                  <div className="flex flex-col justify-between h-full py-1">
                    {/* Top Group: Title, Tagline, Description */}
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-light text-[#242522] leading-[1.18] mb-1.5">
                        {cap.title}
                      </h3>
                      <p className="text-sm sm:text-[13px] font-mono text-[#B79A70] tracking-wide mb-2">
                        // {cap.tagline}
                      </p>
                      <p className="text-sm text-[#5C5C56] font-light leading-relaxed line-clamp-3">
                        {cap.description}
                      </p>
                    </div>

                    {/* Middle Group: Technical Specifications Grid */}
                    <div className="my-2.5 p-3 sm:p-3.5 rounded-xl bg-[#F7F5F0] border border-[#242522]/10 space-y-2">
                      <h4 className="text-sm font-mono uppercase tracking-wider text-[#242522] font-semibold flex items-center space-x-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#B79A70]" />
                        <span>Technical Precision Specifications</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cap.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start space-x-2 text-sm sm:text-[13px] text-[#52524E]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B79A70] shrink-0 mt-0.5" />
                            <span className="leading-snug">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Group: Quality Assurance Standards Badges */}
                    <div className="pt-0.5">
                      <span className="text-sm sm:text-sm font-mono uppercase tracking-widest text-[#77766F] block mb-1.5 font-medium">
                        Certified Quality Standards &amp; Compliance
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cap.standards.map((std, stdIdx) => (
                          <span
                            key={stdIdx}
                            className="text-sm sm:text-[12px] font-mono px-3 py-1 rounded-full bg-[#E9E2D7]/70 text-[#242522] border border-[#B79A70]/30"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
