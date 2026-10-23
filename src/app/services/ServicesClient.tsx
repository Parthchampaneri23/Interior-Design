"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { Service } from "@/data/siteData";
import PageBanner from "@/components/PageBanner";

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedDeliverables, setExpandedDeliverables] = useState<Record<string, boolean>>({});

  const toggleDeliverables = (id: string) => {
    setExpandedDeliverables((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Service rows entrance and parallax animations
      services.forEach((_, idx) => {
        const row = document.getElementById(`service-section-${idx}`);
        if (!row) return;

        const imageWrapper = row.querySelector(".service-image-wrapper");
        const parallaxImg = row.querySelector(".service-parallax-img");
        const textElements = row.querySelectorAll(".service-text-reveal");
        const scopeItems = row.querySelectorAll(".service-scope-item");

        // Parallax depth on image
        if (parallaxImg && imageWrapper) {
          gsap.fromTo(
            parallaxImg,
            { yPercent: -12, scale: 1.15 },
            {
              yPercent: 12,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // Staggered text & scope entrance
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (scopeItems.length > 0) {
          gsap.fromTo(
            scopeItems,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // 2. Animate Bottom CTA Card
      const ctaCard = document.querySelector(".services-cta-banner");
      if (ctaCard) {
        gsap.fromTo(
          ctaCard,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaCard,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#F7F5F0] text-[#242522] pb-24 min-h-screen relative selection:bg-[#B79A70] selection:text-white"
    >
      {/* Page Banner with Standard Breadcrumb */}
      <PageBanner
        title="Interior Design Services"
        subtitle="A comprehensive spectrum of turnkey residential interiors, bespoke modular kitchens, custom millwork, architectural lighting, and commercial environments across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {/* SERVICES BREAKDOWN EDITORIAL GRID WITH SMOOTH GSAP SCROLL ANIMATIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-36">
        {services.map((service, idx) => {
          const isReversed = idx % 2 === 1;
          const isDeliverablesOpen = !!expandedDeliverables[service.id];

          return (
            <div
              key={service.id}
              id={`service-section-${idx}`}
              className="relative pt-6 scroll-mt-32"
            >
              {/* Main 2-Column Editorial Grid */}
              <div
                className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* 1. Image Container with GSAP Smooth Parallax */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Clean, visible Architectural Number Header directly above service image */}
                  <div className="flex items-end justify-between mb-3.5 pb-2.5 border-b border-[#242522]/10">
                    <div className="flex items-baseline space-x-3">
                      <span className="font-serif text-4xl sm:text-5xl font-normal text-[#B79A70] leading-none">
                        {service.number}
                      </span>
                      <span className="text-sm font-mono uppercase tracking-[0.22em] text-[#77766F] font-medium">
                        Interior Specialization
                      </span>
                    </div>
                    <span className="text-sm font-mono uppercase tracking-widest text-[#B79A70] bg-white border border-[#B79A70]/30 px-3 py-1 shadow-sm font-semibold">
                      Service {service.number}
                    </span>
                  </div>

                  <div className="service-image-wrapper relative aspect-[4/3] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-2xl group">
                    <div className="service-parallax-img absolute inset-0 w-full h-[120%] -top-[10%]">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                    {/* Top Left Number Badge */}
                    <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-sm font-mono uppercase tracking-widest text-[#242522] border border-[#242522]/10 shadow-sm font-medium">
                      Service {service.number}
                    </div>

                    {/* Bottom Right Explore Tag */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="absolute bottom-5 right-5 bg-white/95 hover:bg-[#B79A70] hover:text-white text-[#242522] px-4 py-2 text-sm font-mono uppercase tracking-widest flex items-center space-x-2 transition-all shadow-md backdrop-blur-md"
                    >
                      <span>Explore Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 2. Text Content with GSAP Staggered Reveal */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"
                  }`}
                >
                  {/* Tagline Badge */}
                  <div className="service-text-reveal flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#B79A70]" />
                    <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold">
                      {service.number} // {service.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="service-text-reveal font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#242522] leading-[1.12]">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="service-text-reveal text-[#5A5952] font-light text-base sm:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Scope List with Staggered Entrance */}
                  <div className="service-text-reveal pt-2 space-y-3">
                    <span className="text-sm font-mono uppercase tracking-widest text-[#242522] font-semibold flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B79A70]" />
                      <span>Scope of Interior Works:</span>
                    </span>

                    <ul className="space-y-2.5">
                      {service.scope.map((item, sIdx) => (
                        <li
                          key={sIdx}
                          className="service-scope-item flex items-start space-x-3 text-sm text-[#3A3935] font-normal"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Deliverables Accordion Drawer */}
                  <div className="service-text-reveal pt-3">
                    <button
                      type="button"
                      onClick={() => toggleDeliverables(service.id)}
                      className="w-full flex items-center justify-between p-3.5 bg-white border border-[#242522]/10 hover:border-[#B79A70] text-sm font-mono uppercase tracking-wider text-[#242522] transition-all shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-[#B79A70]" />
                        <span>Project Deliverables &amp; Specifications ({service.deliverables.length})</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#77766F] transition-transform duration-300 ${
                          isDeliverablesOpen ? "rotate-180 text-[#B79A70]" : ""
                        }`}
                      />
                    </button>

                    {isDeliverablesOpen && (
                      <div className="p-4 bg-white/70 border-x border-b border-[#242522]/10 space-y-2.5 animate-fade-in">
                        {service.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-center space-x-2.5 text-sm text-[#5A5952]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70] shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="service-text-reveal pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center space-x-2 px-5 py-3 bg-[#242522] hover:bg-[#B79A70] text-white text-sm uppercase tracking-[0.2em] font-semibold transition-all shadow-md group"
                    >
                      <span>Full Specifications</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <Link
                      href="/consultation"
                      className="inline-flex items-center space-x-2 px-5 py-3 border border-[#242522]/20 hover:border-[#B79A70] text-[#242522] hover:text-[#B79A70] text-sm uppercase tracking-[0.2em] font-mono transition-all"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* PROCESS / EXECUTION FRAMEWORK CTA CARD (ANIMATED WITH GSAP) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="services-cta-banner p-10 sm:p-16 bg-[#242522] border border-[#B79A70]/40 text-[#F7F5F0] rounded-none flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute -top-12 -left-12 w-60 h-60 bg-[#B79A70]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-xl space-y-2">
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#B79A70] flex items-center space-x-2 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Turnkey Interior Execution</span>
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Ready to transform your home or workspace?
            </h3>
            <p className="text-sm text-[#A0A09B] font-light leading-relaxed">
              Explore our structured 7-stage interior methodology from Vastu layout planning and 3D visualization to turnkey civil contracting and white-glove handover.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/process"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B79A70] text-[#242522] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl group"
            >
              <span>Explore 7-Stage Process</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/consultation"
              className="px-6 py-4 border border-white/20 text-sm font-mono uppercase tracking-widest text-[#E9E2D7] hover:border-[#B79A70] hover:text-[#B79A70] transition-all"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
