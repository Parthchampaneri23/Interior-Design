"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import WaveText from "@/components/WaveText";

interface TransformationProject {
  id: string;
  title: string;
  location: string;
  beforeTag: string;
  afterTag: string;
  beforeImage: string;
  afterImage: string;
}

const TRANSFORMATION_PROJECTS: TransformationProject[] = [
  {
    id: "trans-1",
    title: "Lake Como Villa Restoration",
    location: "Lake Como, Italy",
    beforeTag: "Raw Stone & Framework",
    afterTag: "Decorex Minimalist Sanctuary",
    beforeImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2200&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: "trans-2",
    title: "Mayfair Georgian Townhouse",
    location: "London, UK",
    beforeTag: "Outdated Partitioned Shell",
    afterTag: "Sculpted Haute Living",
    beforeImage:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=2200&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: "trans-3",
    title: "Manhattan Central Park Penthouse",
    location: "New York, USA",
    beforeTag: "Pre-Renovation Raw Concrete",
    afterTag: "Nocturne Marble & Oak Suite",
    beforeImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2200&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: "trans-4",
    title: "Kyoto Meditative Pavilion",
    location: "Kyoto, Japan",
    beforeTag: "Weathered Cedar Framework",
    afterTag: "Biophilic Light Courtyard",
    beforeImage:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2200&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85",
  },
];

export default function BeforeAfterSection() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentProject = TRANSFORMATION_PROJECTS[activeProjectIdx];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const position = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(position);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Fallback window listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX);
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, updatePosition]);

  return (
    <section className="py-20 md:py-28 bg-[#F7F5F0] text-[#242522] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with concise title and WaveText (Line removed) */}
        <div className="mb-10 sm:mb-14">
          <div className="pb-4">
            <WaveText
              tag="h2"
              text="BEFORE & AFTER"
              className="font-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3f4636] font-bold tracking-tight leading-[0.9] uppercase select-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 sm:pt-6">
              <div className="space-y-1.5 max-w-xl">
                <p className="text-sm font-semibold tracking-wider uppercase text-[#b38f58] font-mono">
                  Bespoke Architectural Evolution
                </p>
                <p className="text-sm sm:text-[13px] text-[#242522]/70 leading-relaxed font-light">
                  Drag the tactile brass divider horizontally to examine the structural and interior evolution. Navigate projects using the controls below.
                </p>
              </div>

              <span className="text-sm uppercase tracking-widest text-[#b38f58] font-mono font-medium">
                Case 0{activeProjectIdx + 1} // 0{TRANSFORMATION_PROJECTS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Slider */}
        <div
          ref={containerRef}
          className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden select-none rounded-2xl shadow-2xl bg-[#20231F] touch-none"
          role="region"
          aria-label="Before and after transformation comparison slider"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              key={`after-${currentProject.id}`}
              src={currentProject.afterImage}
              alt={`After Transformation - ${currentProject.title}`}
              fill
              sizes="100vw"
              className="object-cover transition-opacity duration-700 ease-out"
              priority
            />
            {/* After Tag (Top-Right) */}
            <div className="absolute top-5 right-5 bg-[#20231F]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#b38f58]/40 text-[11px] font-mono uppercase tracking-[0.2em] text-[#b38f58] shadow-lg">
              After // {currentProject.afterTag}
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay via polygon) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            }}
          >
            <Image
              key={`before-${currentProject.id}`}
              src={currentProject.beforeImage}
              alt={`Before Renovation - ${currentProject.title}`}
              fill
              sizes="100vw"
              className="object-cover filter grayscale contrast-125 brightness-90 transition-opacity duration-700 ease-out"
            />
            {/* Before Tag (Top-Left) */}
            <div className="absolute top-5 left-5 bg-[#20231F]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#41483B] text-[11px] font-mono uppercase tracking-[0.2em] text-[#E9E2D7] shadow-lg">
              Before // {currentProject.beforeTag}
            </div>
          </div>

          {/* Draggable Divider Line & Custom Handle (Dragging ONLY active on this element) */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute top-0 bottom-0 w-8 -ml-4 z-20 flex items-center justify-center cursor-ew-resize touch-none ${
              isDragging ? "cursor-grabbing" : "cursor-ew-resize"
            }`}
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Visible 2px Divider Line */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-[#b38f58] shadow-[0_0_15px_rgba(179,143,88,0.9)] pointer-events-none" />

            {/* Center Drag Button */}
            <div
              className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#20231F]/95 backdrop-blur-md border-2 border-[#b38f58] flex items-center justify-center shadow-2xl transition-transform duration-150 ${
                isDragging ? "scale-110 shadow-[#b38f58]/50 ring-2 ring-[#b38f58]" : "hover:scale-105"
              }`}
            >
              <div className="flex items-center space-x-1.5 text-[#b38f58] text-sm font-bold">
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
          </div>

          {/* Left & Right Arrow Navigation Buttons Positioned Directly on the Image (Bottom-Right) */}
          <div className="absolute bottom-5 right-5 z-30 flex items-center space-x-2.5 pointer-events-auto">
            {/* Prev Button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setActiveProjectIdx((prev) =>
                  prev === 0 ? TRANSFORMATION_PROJECTS.length - 1 : prev - 1
                );
                setSliderPosition(50);
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#20231F]/90 backdrop-blur-md border border-[#b38f58]/40 text-[#F7F5F0] hover:bg-[#b38f58] hover:text-black flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous Project"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setActiveProjectIdx((prev) =>
                  prev === TRANSFORMATION_PROJECTS.length - 1 ? 0 : prev + 1
                );
                setSliderPosition(50);
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#20231F]/90 backdrop-blur-md border border-[#b38f58]/40 text-[#F7F5F0] hover:bg-[#b38f58] hover:text-black flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Next Project"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
}
