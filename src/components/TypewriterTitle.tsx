"use client";

import { useEffect, useState, useRef, useMemo } from "react";

interface TypewriterTitleProps {
  text: string;
  className?: string;
  speed?: number; // ms per character (higher = slower, more relaxed)
  delay?: number; // initial delay before typing starts in ms
  cursorColor?: string;
  pauseOnPunctuation?: boolean;
}

export default function TypewriterTitle({
  text,
  className = "",
  speed = 65,
  delay = 280,
  cursorColor = "#B79A70",
  pauseOnPunctuation = true,
}: TypewriterTitleProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-parse text into words and characters with absolute indices.
  // Keeping words as whitespace-nowrap spans completely eliminates line-jumping/word wrapping glitches.
  const { parsedWords, totalLength } = useMemo(() => {
    let globalIndex = 0;
    const words = text.split(" ");
    const parsed = words.map((word, wIdx) => {
      const chars = word.split("").map((char) => {
        const idx = globalIndex++;
        return { char, index: idx };
      });
      const hasSpace = wIdx < words.length - 1;
      const spaceIndex = hasSpace ? globalIndex++ : -1;
      return { word, chars, hasSpace, spaceIndex };
    });
    return { parsedWords: parsed, totalLength: globalIndex };
  }, [text]);

  // Viewport trigger via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setDisplayedCount(0);
    setIsTyping(false);
    setShowCursor(true);
    setHasTriggered(false);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text]);

  // Smooth, relaxed typing loop
  useEffect(() => {
    if (!hasTriggered) return;

    setIsTyping(true);
    setShowCursor(true);

    const scheduleNextChar = (currentIdx: number, waitTime: number) => {
      timeoutRef.current = setTimeout(() => {
        const nextIndex = currentIdx + 1;
        setDisplayedCount(nextIndex);

        if (nextIndex < totalLength) {
          const char = text[nextIndex] || "";
          let nextWait = speed;
          if (
            pauseOnPunctuation &&
            (char === ":" || char === "&" || char === "," || char === "." || char === "—" || char === "-")
          ) {
            nextWait = speed + 110;
          } else if (char === " ") {
            nextWait = speed + 25;
          }
          scheduleNextChar(nextIndex, nextWait);
        } else {
          // Finished typing: keep cursor blinking gently for 2.5s then fade out
          setIsTyping(false);
          timeoutRef.current = setTimeout(() => {
            setShowCursor(false);
          }, 2500);
        }
      }, waitTime);
    };

    timeoutRef.current = setTimeout(() => {
      scheduleNextChar(0, speed);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasTriggered, totalLength, text, speed, delay, pauseOnPunctuation]);

  const isCompleted = displayedCount >= totalLength;

  return (
    <span
      ref={containerRef}
      className={`relative inline-block w-full ${className}`}
      aria-label={text}
    >
      <style>{`
        @keyframes smoothCaretBlink {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.15; transform: scaleY(0.94); }
        }
        .smooth-typewriter-caret {
          animation: smoothCaretBlink 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {parsedWords.map((w, wIdx) => {
        const isFirstWord = wIdx === 0;

        return (
          <span
            key={wIdx}
            className="inline-block whitespace-nowrap mr-[0.26em]"
          >
            {/* Blinking caret before first character is typed */}
            {showCursor && displayedCount === 0 && isFirstWord && (
              <span
                className="smooth-typewriter-caret inline-block w-[2px] h-[0.85em] align-middle mr-1 rounded-[1px]"
                style={{ backgroundColor: cursorColor }}
                aria-hidden="true"
              />
            )}

            {w.chars.map(({ char, index }) => {
              const isRevealed = index < displayedCount;
              const isCaretHere =
                showCursor &&
                displayedCount > 0 &&
                displayedCount - 1 === index;

              return (
                <span key={index} className="relative inline-block">
                  <span
                    className={`inline-block transition-all duration-200 ease-out will-change-[opacity,transform] ${
                      isRevealed
                        ? "opacity-100 translate-y-0 filter-none"
                        : "opacity-0 translate-y-1 select-none pointer-events-none"
                    }`}
                  >
                    {char}
                  </span>

                  {/* Caret directly following this active character */}
                  {isCaretHere && (
                    <span
                      className="smooth-typewriter-caret inline-block w-[2px] h-[0.85em] align-middle ml-[1.5px] rounded-[1px]"
                      style={{ backgroundColor: cursorColor }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              );
            })}

            {/* Caret when the space after this word was the last typed character */}
            {showCursor &&
              w.hasSpace &&
              displayedCount - 1 === w.spaceIndex && (
                <span
                  className="smooth-typewriter-caret inline-block w-[2px] h-[0.85em] align-middle ml-[1.5px] rounded-[1px]"
                  style={{ backgroundColor: cursorColor }}
                  aria-hidden="true"
                />
              )}
          </span>
        );
      })}
    </span>
  );
}
