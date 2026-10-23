"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WaveText({
  text,
  className = "",
  tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".wave-char");
      if (!chars.length) return;

      // 1. Set initial hidden state immediately on mount so first scroll top-to-bottom animates smoothly
      gsap.set(chars, {
        opacity: 0,
        y: 32,
        rotateX: -25,
        scale: 0.96,
        transformOrigin: "50% 100%",
      });

      // 2. Trigger animation as soon as the element reaches 88% of viewport
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.95,
            stagger: {
              amount: 0.38,
              ease: "sine.inOut",
            },
            ease: "power3.out",
            delay,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            opacity: 0,
            y: 32,
            rotateX: -25,
            scale: 0.96,
            duration: 0.4,
            stagger: 0.012,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.85,
            stagger: {
              amount: 0.3,
              ease: "sine.inOut",
            },
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [text, delay]);

  const Tag = tag as any;
  const lines = text.split("\n");
  const fontClass = className.includes("font-") ? "" : "font-title";

  return (
    <Tag
      ref={containerRef}
      className={`inline-block perspective-[800px] transform-gpu ${fontClass} ${className}`}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className={lines.length > 1 ? "block" : "inline"}>
          {line.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
              {word.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="wave-char inline-block will-change-transform transform-gpu"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
