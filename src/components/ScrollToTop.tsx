"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollTop > 260) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circular progress dimensions (r = 21, circumference = 2 * PI * 21 ~= 131.95)
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-400 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#1A1D1A]/90 hover:bg-[#20231F] backdrop-blur-md border border-[#B79A70]/30 hover:border-[#B79A70] text-[#F7F5F0] hover:text-[#B79A70] shadow-[0_12px_28px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(183,154,112,0.35)] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        {/* SVG Scroll Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 52 52"
        >
          {/* Track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
          {/* Animated Gold Fill */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="#B79A70"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Upward Arrow Icon with micro-hover bounce */}
        <span className="relative z-10 flex flex-col items-center justify-center">
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
        </span>

        {/* Architectural Hover Tooltip */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1A1D1A] text-[#B79A70] text-[10px] font-mono tracking-widest uppercase border border-[#B79A70]/40 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
          Top
        </span>
      </button>
    </div>
  );
}
