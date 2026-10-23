"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TypewriterTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  speed?: number;
}

export default function TypewriterText({
  text,
  className = "",
  tag = "h2",
  delay = 0.2,
  speed = 0.045,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".typewriter-char");
      if (!chars.length) return;

      // 1. Initial hidden state: smooth gentle fade and tiny lift
      gsap.set(chars, {
        opacity: 0,
        y: 6,
      });

      // 2. Smooth, graceful typewriter animation on scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.12,
            stagger: speed,
            ease: "power2.out",
            delay,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            opacity: 0,
            y: 6,
            duration: 0.25,
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: speed * 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [text, delay, speed]);

  const Tag = tag as any;
  const lines = text.split("\n");
  const fontClass = className.includes("font-") ? "" : "font-serif";

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
                  className="typewriter-char inline-block will-change-transform transform-gpu"
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
