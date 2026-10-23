"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/data/siteData";
import WaveText from "@/components/WaveText";

interface Props {
  services: Service[];
}

export default function ServicesEditorialSection({ services }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".service-row");

      if (items && items.length > 0) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.fromTo(
              items,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                overwrite: "auto",
              }
            );
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  const activeService = services[activeTab];

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#FFFFFF] text-[#111111] overflow-visible relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="border-b border-neutral-200 pb-8 sm:pb-10">
            <WaveText
              tag="h2"
              text="SERVICES"
              className="font-title text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[115px] text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 sm:pt-8">
              <div className="space-y-1.5 max-w-lg">
                <p className="text-sm font-semibold tracking-wider uppercase text-[#B79A70] font-mono">
                  Expertise &amp; Architectural Disciplines
                </p>
                <p className="text-sm sm:text-[13px] text-neutral-600 leading-relaxed font-light">
                  Hover over any discipline to explore scope and reveal its corresponding architectural visual.
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center space-x-2 text-sm font-title font-bold uppercase tracking-wider text-black hover:text-[#B79A70] transition-colors group shrink-0"
              >
                <span>EXPLORE ALL SERVICES</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Split Layout: Left side scrolls, Right side remains sticky */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Scrollable Left Side: Only this scrolls */}
          <div className="lg:col-span-6 space-y-6 pb-24">
            {services.map((service, idx) => {
              const isActive = activeTab === idx;

              return (
                <div
                  key={service.id}
                  onMouseEnter={(e) => {
                    setActiveTab(idx);

                    // Check if card bounding box is cut off by top navbar (90px) or bottom window
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const topThreshold = 100; // Account for floating header
                    const bottomThreshold = window.innerHeight - 30;

                    if (rect.top < topThreshold) {
                      // If cut off at the top under navbar, scroll down slightly
                      window.scrollBy({
                        top: rect.top - topThreshold - 10,
                        behavior: "smooth",
                      });
                    } else if (rect.bottom > bottomThreshold) {
                      // If cut off at bottom, bring fully into view
                      window.scrollBy({
                        top: rect.bottom - bottomThreshold + 20,
                        behavior: "smooth",
                      });
                    }
                  }}
                  onClick={() => setActiveTab(idx)}
                  className={`service-row transition-all duration-300 border cursor-pointer rounded-2xl overflow-hidden ${
                    isActive
                      ? "bg-[#F7F5F0] border-l-4 border-l-[#B79A70] border-[#B79A70]/60 shadow-xl"
                      : "bg-[#FAFAFA] border-neutral-200 hover:bg-[#F5F5F3] hover:border-neutral-300"
                  }`}
                >
                  {/* Card Header (Always Visible) */}
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <span
                        className={`font-mono text-base font-semibold transition-colors ${
                          isActive ? "text-[#B79A70]" : "text-neutral-400"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3
                          className={`font-serif text-2xl md:text-3xl font-light transition-colors ${
                            isActive ? "text-black font-normal" : "text-neutral-800"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm text-neutral-500 font-mono tracking-wider mt-1">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-all duration-300 shrink-0 ${
                        isActive
                          ? "rotate-45 text-[#B79A70] scale-110"
                          : "text-neutral-400"
                      }`}
                    />
                  </div>

                  {/* Smooth Accordion Body (CSS grid 0fr -> 1fr animation) */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-neutral-200/80 space-y-4">
                        <p className="text-sm text-neutral-700 font-light leading-relaxed">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {service.scope.slice(0, 4).map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 text-sm text-neutral-600 font-mono"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B79A70] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center space-x-2 text-sm uppercase tracking-[0.2em] font-semibold text-[#B79A70] hover:text-black transition-colors"
                          >
                            <span>Explore Service In-Depth</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Right Side: Stays sticky top-28 until the left side finishes, h-[75vh] */}
          <div className="lg:col-span-6 sticky top-28 self-start hidden lg:block">
            <div className="relative w-full h-[75vh]">
              {/* Messy tilted backdrop box */}
              <div className="absolute -inset-3 border border-[#B79A70]/40 -rotate-2 rounded-sm pointer-events-none" />

              {/* 75vh Pure Image Container - Clean without overlaid text */}
              <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#242522] border border-[#41483B]/50 shadow-2xl messy-hover">
                <Image
                  key={activeService.id}
                  src={activeService.heroImage}
                  alt={activeService.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
