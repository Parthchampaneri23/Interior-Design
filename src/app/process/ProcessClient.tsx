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
  ShieldCheck,
  Clock,
  Compass,
  FileText,
  UserCheck,
  Lightbulb,
  ArrowRight,
  Maximize2,
  CalendarCheck,
  Check,
  Award,
  Zap,
} from "lucide-react";
import type { ProcessStage } from "@/data/siteData";
import PageBanner from "@/components/PageBanner";

interface ProcessClientProps {
  stages: ProcessStage[];
}

export default function ProcessClient({ stages }: ProcessClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"timeline" | "workbench">("timeline");
  const [expandedStage, setExpandedStage] = useState<Record<string, boolean>>({
    "01": true,
    "02": false,
    "03": false,
    "04": false,
    "05": false,
    "06": false,
    "07": false,
  });

  const toggleDeliverables = (step: string) => {
    setExpandedStage((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const scrollToStage = (index: number) => {
    setActiveStageIdx(index);
    if (viewMode === "timeline") {
      const el = document.getElementById(`process-milestone-${index}`);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Timeline spine & waypoint animations
      const milestones = containerRef.current?.querySelectorAll(".timeline-milestone");
      if (milestones && milestones.length > 0) {
        milestones.forEach((el, idx) => {
          const card = el.querySelector(".milestone-card");
          const imgWrap = el.querySelector(".milestone-image-wrap");
          const waypoint = el.querySelector(".milestone-waypoint");

          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 45 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { scale: 0.94, opacity: 0.8 },
              {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (waypoint) {
            ScrollTrigger.create({
              trigger: el,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setActiveStageIdx(idx),
              onEnterBack: () => setActiveStageIdx(idx),
            });
          }
        });
      }

      // 2. Animate guarantee cards
      const guaranteeCards = containerRef.current?.querySelectorAll(".guarantee-card");
      if (guaranteeCards && guaranteeCards.length > 0) {
        gsap.fromTo(
          guaranteeCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".guarantee-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [viewMode]);

  const activeStage = stages[activeStageIdx] || stages[0];

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#F7F5F0] text-[#242522] pb-24 min-h-screen relative selection:bg-[#B79A70] selection:text-white"
    >
      {/* 1. Page Banner with Standard Breadcrumb */}
      <PageBanner
        title="7-Stage Architectural Process"
        subtitle="A transparent, meticulously engineered pathway from lifestyle discovery and 3D modeling to civil craftsmanship and ceremonial turnkey handover."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Process" },
        ]}
      />

      {/* 2. Interactive Mode Switcher & Progress HUD */}
      <section className="sticky top-20 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#242522]/10 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick Stage Stepper Radar */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto">
            {stages.map((stg, idx) => {
              const isActive = activeStageIdx === idx;
              const isPast = idx < activeStageIdx;
              return (
                <button
                  key={stg.step}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  className={`group flex items-center space-x-2 px-3 py-1.5 text-sm font-mono uppercase tracking-wider transition-all border rounded-none whitespace-nowrap ${
                    isActive
                      ? "bg-[#B79A70] text-white border-[#B79A70] font-semibold shadow-sm"
                      : isPast
                      ? "bg-white text-[#242522] border-[#B79A70]/40 hover:border-[#B79A70]"
                      : "bg-white/80 text-[#77766F] border-[#242522]/10 hover:border-[#B79A70]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isActive
                        ? "bg-white text-[#B79A70] font-bold"
                        : isPast
                        ? "bg-[#B79A70]/20 text-[#B79A70]"
                        : "bg-[#242522]/5 text-[#77766F]"
                    }`}
                  >
                    {isPast ? <Check className="w-2.5 h-2.5" /> : stg.step}
                  </span>
                  <span className="hidden lg:inline">{stg.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#77766F] hidden sm:inline">
              Layout Mode:
            </span>
            <div className="flex items-center bg-white border border-[#242522]/15 p-1">
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1 text-sm font-mono uppercase tracking-wider transition-all ${
                  viewMode === "timeline"
                    ? "bg-[#242522] text-white font-semibold"
                    : "text-[#77766F] hover:text-[#242522]"
                }`}
              >
                Storyboard
              </button>
              <button
                type="button"
                onClick={() => setViewMode("workbench")}
                className={`px-3 py-1 text-sm font-mono uppercase tracking-wider transition-all ${
                  viewMode === "workbench"
                    ? "bg-[#242522] text-white font-semibold"
                    : "text-[#77766F] hover:text-[#242522]"
                }`}
              >
                Workbench
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Overview Metrics Ribbon */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-[#242522]/10 shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>Turnkey Duration</span>
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#242522]">6 – 12 Months</p>
            <span className="text-[11px] text-[#77766F]">Fixed milestone schedule</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F] flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>Structured Stages</span>
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#242522]">7 Key Milestones</p>
            <span className="text-[11px] text-[#77766F]">From concept to key handover</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F] flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>BOQ Transparency</span>
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#242522]">Fixed Price Sum</p>
            <span className="text-[11px] text-[#77766F]">Zero hidden cost escalations</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F] flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-[#B79A70]" />
              <span>Warranty Care</span>
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#242522]">2-Year Concierge</p>
            <span className="text-[11px] text-[#77766F]">Dedicated studio assistance</span>
          </div>
        </div>
      </section>

      {/* 4. MAIN PROCESS PRESENTATION */}
      {viewMode === "timeline" ? (
        /* MODE A: STORYBOARD TIMELINE (Continuous vertical spine with glowing waypoints & parallax) */
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative">
          {/* Vertical Golden Connecting Spine (Desktop center, Mobile left) */}
          <div className="hidden lg:block absolute left-1/2 top-20 bottom-36 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#B79A70] via-[#B79A70]/40 to-[#B79A70]/10 pointer-events-none" />

          <div className="space-y-24 sm:space-y-36">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 1;
              const isExpanded = !!expandedStage[stage.step];

              return (
                <div
                  key={stage.step}
                  id={`process-milestone-${idx}`}
                  className="timeline-milestone relative scroll-mt-36"
                >
                  {/* Central Glowing Waypoint (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center">
                    <div
                      className={`milestone-waypoint w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-md ${
                        activeStageIdx === idx
                          ? "bg-[#B79A70] text-white border-white ring-4 ring-[#B79A70]/30 scale-110"
                          : "bg-white text-[#B79A70] border-[#B79A70]/50"
                      }`}
                    >
                      {stage.step}
                    </div>
                  </div>

                  {/* 2-Column Grid */}
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Column 1: Image Showcase with Interactive Hover & Glass Tag */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {/* Architectural Header directly above image */}
                      <div className="flex items-end justify-between mb-3 pb-2 border-b border-[#242522]/10">
                        <div className="flex items-baseline space-x-3">
                          <span className="font-serif text-3xl sm:text-4xl text-[#B79A70] font-normal leading-none">
                            Stage {stage.step}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#77766F]">
                            {stage.duration}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#B79A70] bg-white border border-[#B79A70]/30 px-3 py-1 shadow-sm font-semibold">
                          {stage.phaseTag || `Milestone 0${idx + 1}`}
                        </span>
                      </div>

                      <div className="milestone-image-wrap relative aspect-[16/10] overflow-hidden bg-[#E9E2D7] border border-[#242522]/10 shadow-xl group">
                        <Image
                          src={stage.image}
                          alt={stage.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                        {/* Top Left Stage Tag */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-sm font-mono uppercase tracking-widest text-[#242522] border border-[#242522]/10 shadow-sm font-semibold">
                          Stage {stage.step} // 07
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm font-mono uppercase tracking-wider backdrop-blur-md bg-black/40 px-3.5 py-2 border border-white/10">
                          <span className="truncate">{stage.subtitle}</span>
                          <span className="text-[#B79A70] font-bold shrink-0 ml-2">{stage.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Architectural Details & Deliverables */}
                    <div
                      className={`milestone-card lg:col-span-6 space-y-6 ${
                        isEven ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
                      }`}
                    >
                      {/* Stage Title */}
                      <div className="space-y-1.5">
                        <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{stage.subtitle}</span>
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#242522] font-normal leading-tight">
                          {stage.title}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-[#5A5952] font-light text-base leading-relaxed">
                        {stage.description}
                      </p>

                      {/* Studio Architectural Insight Callout Box */}
                      {stage.studioInsight && (
                        <div className="p-4 bg-white border-l-2 border-[#B79A70] border-y border-r border-[#242522]/10 shadow-sm space-y-1">
                          <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Decorex Studio Insight:</span>
                          </div>
                          <p className="text-sm text-[#5A5952] leading-relaxed italic">
                            &ldquo;{stage.studioInsight}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Client Role & Highlights */}
                      {stage.clientRole && (
                        <div className="flex items-start space-x-2.5 text-sm text-[#3A3935] pt-1">
                          <UserCheck className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                          <span>
                            <strong className="font-mono uppercase tracking-wider text-[#242522]">
                              Client Collaboration:{" "}
                            </strong>
                            {stage.clientRole}
                          </span>
                        </div>
                      )}

                      {/* Interactive Milestone Deliverables Drawer */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => toggleDeliverables(stage.step)}
                          className="w-full flex items-center justify-between p-3.5 bg-white border border-[#242522]/10 hover:border-[#B79A70] text-sm font-mono uppercase tracking-wider text-[#242522] transition-all shadow-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="w-3.5 h-3.5 text-[#B79A70]" />
                            <span>Milestone Deliverables ({stage.deliverables.length})</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-[#77766F] transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-[#B79A70]" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-white/70 border-x border-b border-[#242522]/10 space-y-2.5">
                            {stage.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start space-x-2.5 text-sm text-[#3A3935]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* MODE B: INTERACTIVE STAGE WORKBENCH (Single dashboard with live stage switcher) */
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#242522]/10 shadow-xl p-8 sm:p-12">
            {/* Left 4-Columns: Stage Navigation Rail */}
            <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-[#242522]/10 pb-8 lg:pb-0 lg:pr-8">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#77766F] block mb-4">
                Select Stage to Inspect:
              </span>

              <div className="space-y-2">
                {stages.map((stg, idx) => {
                  const isSelected = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.step}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={`w-full text-left p-3.5 transition-all border flex items-center justify-between ${
                        isSelected
                          ? "bg-[#242522] text-white border-[#242522] shadow-md"
                          : "bg-[#F7F5F0]/60 text-[#242522] border-transparent hover:border-[#B79A70]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`font-mono text-sm font-bold ${
                            isSelected ? "text-[#B79A70]" : "text-[#77766F]"
                          }`}
                        >
                          {stg.step}
                        </span>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide leading-tight">
                            {stg.title}
                          </p>
                          <span
                            className={`text-[10px] font-mono ${
                              isSelected ? "text-[#E9E2D7]/70" : "text-[#77766F]"
                            }`}
                          >
                            {stg.duration}
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? "text-[#B79A70] translate-x-1" : "text-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 8-Columns: Detailed Stage Workbench Showcase */}
            <div className="lg:col-span-8 space-y-8 lg:pl-4">
              {/* Image & Header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#242522] border border-[#242522]/10 shadow-lg group">
                <Image
                  src={activeStage.image}
                  alt={activeStage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-sm font-mono uppercase tracking-widest text-[#242522] border border-[#242522]/10 font-bold shadow-md">
                  Stage {activeStage.step} // 07
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] block">
                    {activeStage.duration}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              {/* Stage Description & Subtitle */}
              <div className="space-y-3">
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#B79A70] font-semibold">
                  {activeStage.subtitle}
                </span>
                <p className="text-base text-[#5A5952] leading-relaxed font-light">
                  {activeStage.description}
                </p>
              </div>

              {/* Studio Insight Box */}
              {activeStage.studioInsight && (
                <div className="p-5 bg-[#F7F5F0] border-l-2 border-[#B79A70] border border-[#242522]/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-sm font-mono uppercase tracking-widest text-[#B79A70] font-semibold">
                    <Lightbulb className="w-4 h-4" />
                    <span>Studio Engineering Insight:</span>
                  </div>
                  <p className="text-sm text-[#41483B] italic leading-relaxed">
                    &ldquo;{activeStage.studioInsight}&rdquo;
                  </p>
                </div>
              )}

              {/* Deliverables Checklist Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-mono uppercase tracking-widest text-[#242522] font-semibold flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-[#B79A70]" />
                  <span>Certified Stage Deliverables:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStage.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 bg-white border border-[#242522]/10 flex items-start space-x-2.5 text-sm text-[#242522]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B79A70] shrink-0 mt-0.5" />
                      <span className="font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Switcher Footer Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#242522]/10">
                <button
                  type="button"
                  disabled={activeStageIdx === 0}
                  onClick={() => setActiveStageIdx((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 text-sm font-mono uppercase tracking-wider text-[#242522] border border-[#242522]/20 hover:border-[#B79A70] disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  &larr; Previous Stage
                </button>

                <button
                  type="button"
                  disabled={activeStageIdx === stages.length - 1}
                  onClick={() => setActiveStageIdx((p) => Math.min(stages.length - 1, p + 1))}
                  className="px-4 py-2 text-sm font-mono uppercase tracking-wider bg-[#242522] text-white hover:bg-[#B79A70] disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. ARCHITECTURAL COMMITMENTS & GUARANTEES GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="space-y-3 text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-mono uppercase tracking-[0.25em] text-[#B79A70] font-semibold flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Decorex Studio Commitments</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242522] font-normal">
            Four Pillars of Zero-Defect Execution
          </h2>
          <p className="text-sm text-[#77766F] font-light">
            Every turnkey commission is backed by contractual deliverables and transparent benchmarks.
          </p>
        </div>

        <div className="guarantee-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="guarantee-card p-6 bg-white border border-[#242522]/10 shadow-sm space-y-3 hover:border-[#B79A70] transition-colors">
            <span className="w-10 h-10 rounded-full bg-[#B79A70]/10 text-[#B79A70] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-lg text-[#242522]">Fixed-Sum BOQ</h3>
            <p className="text-sm text-[#77766F] leading-relaxed">
              Transparent, itemized pricing guaranteed prior to construction. No surprise costs or hidden escalations.
            </p>
          </div>

          <div className="guarantee-card p-6 bg-white border border-[#242522]/10 shadow-sm space-y-3 hover:border-[#B79A70] transition-colors">
            <span className="w-10 h-10 rounded-full bg-[#B79A70]/10 text-[#B79A70] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-lg text-[#242522]">Handover Milestones</h3>
            <p className="text-sm text-[#77766F] leading-relaxed">
              Enforceable contractor penalty timeline clauses ensuring disciplined completion within the agreed window.
            </p>
          </div>

          <div className="guarantee-card p-6 bg-white border border-[#242522]/10 shadow-sm space-y-3 hover:border-[#B79A70] transition-colors">
            <span className="w-10 h-10 rounded-full bg-[#B79A70]/10 text-[#B79A70] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-lg text-[#242522]">Genuine Materials</h3>
            <p className="text-sm text-[#77766F] leading-relaxed">
              Strictly IS:710 Marine Ply, Blum &amp; Hafele hardware, premium Italian marbles, and certified flame-retardant wiring.
            </p>
          </div>

          <div className="guarantee-card p-6 bg-white border border-[#242522]/10 shadow-sm space-y-3 hover:border-[#B79A70] transition-colors">
            <span className="w-10 h-10 rounded-full bg-[#B79A70]/10 text-[#B79A70] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="font-serif text-lg text-[#242522]">2-Year Concierge</h3>
            <p className="text-sm text-[#77766F] leading-relaxed">
              Dedicated post-handover studio support with complimentary 6-month &amp; 12-month proactive warranty inspections.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="p-10 sm:p-16 bg-[#242522] border border-[#B79A70]/40 text-[#F7F5F0] rounded-none flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute -top-12 -left-12 w-60 h-60 bg-[#B79A70]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-xl space-y-2">
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#B79A70] flex items-center space-x-2 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Stage 01 Awaits</span>
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Ready to initiate your spatial discovery?
            </h3>
            <p className="text-sm text-[#A0A09B] font-light leading-relaxed">
              Schedule a dedicated consultation with our principal architects to explore your architectural vision, budget matrix, and feasibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/consultation"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#B79A70] text-[#242522] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl group"
            >
              <span>Schedule Discovery Session</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="px-6 py-4 border border-white/20 text-sm font-mono uppercase tracking-widest text-[#E9E2D7] hover:border-[#B79A70] hover:text-[#B79A70] transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
