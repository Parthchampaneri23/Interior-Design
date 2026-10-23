"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PROCESS_STAGES } from "@/data/siteData";
import WaveText from "@/components/WaveText";

export default function ProcessTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header and Subtitle Smooth Reveal
      if (headerRef.current) {
        const subtitle = headerRef.current.querySelector(".process-subtitle");
        const actionBtn = headerRef.current.querySelector(".process-action");
        const targets = [subtitle, actionBtn].filter(Boolean);

        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // Smooth Cards Entrance and Reveal
      const stageItems = stagesRef.current?.querySelectorAll(".timeline-stage");

      stageItems?.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 60,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#20231F] text-[#F7F5F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header styled with smooth scroll reveal */}
        <div ref={headerRef} className="mb-16 sm:mb-24">
          <div className="border-b border-[#41483B]/40 pb-6 sm:pb-10">
            <WaveText
              tag="h2"
              text="PROCESS"
              className="font-title text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-[#b58c57] font-bold tracking-tight leading-[0.9] uppercase select-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 sm:pt-8">
              <div className="process-subtitle space-y-2 max-w-lg">
                <p className="text-sm font-semibold tracking-wider uppercase text-[#b38f58] font-mono">
                  Methodology &amp; Architectural Discipline
                </p>
                <p className="text-sm sm:text-[13px] text-[#E9E2D7]/75 leading-relaxed font-light">
                  A calibrated 7-stage architectural journey from master concept to turn-key turnkey delivery.
                </p>
              </div>

              <div className="process-action">
                <Link
                  href="/process"
                  className="inline-flex items-center space-x-2 text-sm font-title font-bold uppercase tracking-wider text-[#F7F5F0] hover:text-[#b38f58] transition-colors group shrink-0"
                >
                  <span>EXPLORE COMPLETE PROCESS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Sequence with Smooth Animated Cards */}
        <div ref={stagesRef} className="space-y-8 sm:space-y-10">
          {PROCESS_STAGES.slice(0, 5).map((stage, idx) => (
            <div
              key={stage.step}
              className="timeline-stage grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-7 sm:p-9 bg-[#242522]/80 backdrop-blur-md border border-[#41483B]/40 rounded-2xl hover:border-[#b38f58]/60 hover:bg-[#282c26]/90 transition-all duration-500 shadow-xl"
            >
              {/* Step indicator */}
              <div className="lg:col-span-2 flex flex-col">
                <span className="font-mono text-4xl lg:text-5xl text-[#b38f58] font-light">
                  {stage.step}
                </span>
                <span className="text-sm font-mono text-[#77766F] uppercase tracking-wider mt-1">
                  {stage.duration}
                </span>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-6 space-y-2">
                <h3 className="font-serif text-2xl lg:text-3xl text-[#F7F5F0] font-light">
                  {stage.title}
                </h3>
                <p className="text-sm font-mono uppercase tracking-wider text-[#b38f58]">
                  {stage.subtitle}
                </p>
                <p className="text-sm text-[#E9E2D7]/80 font-light leading-relaxed pt-2">
                  {stage.description}
                </p>
              </div>

              {/* Image Preview & Deliverables */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#20231F] border border-[#41483B]/40 shadow-lg group">
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stage.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#20231F] text-[#E9E2D7]/80 border border-[#41483B]/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all 7 stages teaser */}
        <div className="mt-14 text-center">
          <Link
            href="/process"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#b38f58] text-[#20231F] text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            <span>See Remaining Stages &amp; Zero-Defect Handover</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
