"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TOTAL_FRAMES = 240;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames immediately on mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Prioritize frame 1 for instant display
    const firstImg = new Image();
    firstImg.src = "/frames/frame_0001.jpg";
    firstImg.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d", { alpha: false });
        if (ctx) {
          const cW = canvasRef.current.width;
          const cH = canvasRef.current.height;
          const iW = firstImg.naturalWidth || 1600;
          const iH = firstImg.naturalHeight || 1200;
          const ratio = Math.max(cW / iW, cH / iH);
          ctx.drawImage(
            firstImg,
            0,
            0,
            iW,
            iH,
            (cW - iW * ratio) * 0.5,
            (cH - iH * ratio) * 0.5,
            iW * ratio,
            iH * ratio
          );
        }
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, "0");
      img.src = `/frames/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount >= TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Canvas drawing & GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let currentFrame = 0;
    let targetFrame = 0;
    let animFrameId: number;
    let lastDrawnIdx = -1;

    const render = (frameIdxFloat: number) => {
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIdxFloat)));
      if (idx === lastDrawnIdx) return;

      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const iWidth = img.naturalWidth || 1600;
      const iHeight = img.naturalHeight || 1200;

      // Cover scaling calculation
      const hRatio = cWidth / iWidth;
      const vRatio = cHeight / iHeight;
      const ratio = Math.max(hRatio, vRatio);

      const shiftX = (cWidth - iWidth * ratio) * 0.5;
      const shiftY = (cHeight - iHeight * ratio) * 0.5;

      ctx.drawImage(
        img,
        0,
        0,
        iWidth,
        iHeight,
        shiftX,
        shiftY,
        iWidth * ratio,
        iHeight * ratio
      );

      lastDrawnIdx = idx;
    };

    // Smooth physics-based render loop
    const loop = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.002) {
        currentFrame += diff * 0.085;
        render(currentFrame);
      }
      animFrameId = requestAnimationFrame(loop);
    };

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastDrawnIdx = -1;
      render(currentFrame);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animFrameId = requestAnimationFrame(loop);

    const overlay = overlayRef.current;

    const animCtx = gsap.context(() => {
      // Initialize overlay state: hidden, shifted downwards
      if (overlay) {
        gsap.set(overlay, {
          opacity: 0,
          y: 35,
          pointerEvents: "none",
        });
      }

      const triggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinTargetRef.current,
        start: "top top",
        end: "+=3600",
        pinSpacing: false,
        scrub: 0.5,
        onUpdate: (self) => {
          // Play all 240 frames across the first 2400px (progress 0 -> 2400/3600 = 0.666)
          const frameProgress = Math.min(1, self.progress * 1.5);
          targetFrame = frameProgress * (TOTAL_FRAMES - 1);

          // Show title, description, and CTA on the last 25 frames (frame >= 215 out of 240)
          // Frame 215/239 corresponds to frameProgress approx 0.90 (scroll ~2150px+)
          if (overlay) {
            if (targetFrame >= 214) {
              // Fade in and lift up over the final 25 frames
              const revealFactor = Math.min(1, (targetFrame - 214) / 14);
              gsap.to(overlay, {
                opacity: revealFactor,
                y: (1 - revealFactor) * 35,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
                pointerEvents: revealFactor > 0.4 ? "auto" : "none",
              });
            } else {
              // Fade out before the last 25 frames
              gsap.to(overlay, {
                opacity: 0,
                y: 35,
                duration: 0.25,
                ease: "power2.in",
                overwrite: "auto",
                pointerEvents: "none",
              });
            }
          }
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    // Initial draw
    render(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      animCtx.revert();
    };
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        ref={pinTargetRef}
        className="relative w-full h-screen overflow-hidden bg-[#20231F]"
      >
      {/* Loading Bar (Fades out when frames ready) */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#20231F] transition-opacity duration-700 pointer-events-none ${
          imagesLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="font-serif text-3xl tracking-[0.2em] uppercase font-light text-[#F7F5F0] mb-4">
          DECOR<span className="text-[#B79A70]">EX</span>
        </div>
        <div className="w-56 h-[2px] bg-[#41483B] overflow-hidden rounded-full mb-3">
          <div
            className="h-full bg-[#B79A70] transition-all duration-150 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#E9E2D7]/70">
          Loading Visual Frames // {loadProgress}%
        </span>
      </div>

      {/* High-Resolution Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Hero Content Overlay: Shown during last 10 frames (Interior Design Title, Description, CTA) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center bg-gradient-to-t from-[#141613]/85 via-[#141613]/40 to-transparent pointer-events-none"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Studio Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/10 backdrop-blur-md border border-[#FFFFFF]/15 mb-6">
           
          </div>

          {/* Hero Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F7F5F0] font-light tracking-tight leading-[1.05] mb-5">
            Crafting Spaces of <span className="italic font-normal text-[#B79A70]">Quiet Luxury</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#E9E2D7] font-light leading-relaxed mb-8">
            Bespoke residential architecture and tailored interior sanctuaries sculpted with natural stone, warm timber, and timeless European minimalism.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-full bg-[#B79A70] text-[#141613] font-sans font-medium text-sm tracking-wider uppercase hover:bg-[#c9ad84] transition-all duration-300 shadow-xl hover:shadow-[#B79A70]/30 hover:scale-105"
            >
              <span>Book A Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5F0] backdrop-blur-md border border-white/20 font-sans font-medium text-sm tracking-wider uppercase transition-all duration-300"
            >
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle bottom vignette to blend seamlessly into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#20231F]/70 to-transparent pointer-events-none z-10" />

      {/* 360-Degree Rotating Circular "Explore More" CTA Button shifted 10% lower to bottom right side */}
      <div className="absolute top-[80%] right-6 sm:right-10 md:right-16 lg:right-20 -translate-y-1/2 z-20 pointer-events-auto">
        <Link
          href="#second-section"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("second-section");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollBy({ top: window.innerHeight * 1.2, behavior: "smooth" });
            }
          }}
          className="group relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95"
          aria-label="Explore More"
        >
          {/* 360-Degree Continuously Rotating Curved Circular Text */}
          <div className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full p-1">
              <path
                id="heroExploreCirclePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text
                className="fill-white text-[10px] font-sans font-bold uppercase"
              >
                <textPath
                  href="#heroExploreCirclePath"
                  startOffset="0%"
                  textLength="232"
                  lengthAdjust="spacing"
                >
                  Explore More • Explore More •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Centered Arrow Icon (Stationary, rotated 120 degrees from right side, enlarged) */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              className="w-11 h-11 sm:w-12 sm:h-12 text-white drop-shadow-md transition-transform duration-300"
              style={{ transform: "rotate(240deg)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="3" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  </div>
  );
}
