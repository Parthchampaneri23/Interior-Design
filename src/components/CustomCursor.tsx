"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (typeof window === "undefined") return;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant inner dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          "a, button, input, textarea, select, [role='button'], label, .cursor-pointer"
        );
        const viewEl = target.closest(
          "[data-cursor='view'], article, .group\\/card, .project-card"
        );

        if (interactiveEl) {
          setIsHovered(true);
          setCursorText(null);
        } else if (viewEl && !interactiveEl) {
          setIsHovered(true);
          setCursorText("VIEW");
        } else {
          setIsHovered(false);
          setCursorText(null);
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth Lerp animation loop for the outer architectural reticle
    const render = () => {
      // Lerp factor (0.16 = smooth, silky luxury fluid glide)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Precision Center Dot (Locked to exact mouse point) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] will-change-transform pointer-events-none"
      >
        <div
          className={`w-2 h-2 rounded-full bg-[#B79A70] shadow-[0_0_8px_rgba(183,154,112,0.8)] transition-transform duration-200 ease-out ${
            isClicked
              ? "scale-150 bg-white shadow-[0_0_12px_#B79A70]"
              : isHovered
              ? "scale-75 opacity-90"
              : "scale-100"
          }`}
        />
      </div>

      {/* 2. Architectural Caliper Reticle Ring (Silky fluid follower) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none"
      >
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
            isClicked
              ? "w-8 h-8 border border-[#B79A70] bg-[#B79A70]/25 scale-90"
              : isHovered
              ? cursorText
                ? "w-16 h-16 border border-[#B79A70] bg-[#242522]/85 backdrop-blur-[2px] shadow-[0_0_20px_rgba(183,154,112,0.4)]"
                : "w-13 h-13 border border-[#B79A70]/90 bg-[#B79A70]/15 backdrop-blur-[1px] shadow-[0_0_16px_rgba(183,154,112,0.3)] scale-110"
              : "w-9 h-9 border border-[#B79A70]/50 bg-transparent shadow-[0_0_10px_rgba(183,154,112,0.15)]"
          }`}
        >
          {/* Architectural Cardinal Tick Marks (Blueprint Calipers) */}
          <span
            className={`absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 transition-all duration-300 ${
              isHovered ? "bg-[#B79A70]" : "bg-[#B79A70]/60"
            }`}
          />
          <span
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 transition-all duration-300 ${
              isHovered ? "bg-[#B79A70]" : "bg-[#B79A70]/60"
            }`}
          />
          <span
            className={`absolute -left-1 top-1/2 -translate-y-1/2 h-[1px] w-1.5 transition-all duration-300 ${
              isHovered ? "bg-[#B79A70]" : "bg-[#B79A70]/60"
            }`}
          />
          <span
            className={`absolute -right-1 top-1/2 -translate-y-1/2 h-[1px] w-1.5 transition-all duration-300 ${
              isHovered ? "bg-[#B79A70]" : "bg-[#B79A70]/60"
            }`}
          />

          {/* Optional Micro "VIEW" or "EXPLORE" tag */}
          {cursorText && (
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#B79A70] uppercase font-bold select-none animate-fade-in pl-0.5">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
