"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RouteScrollTriggerCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Prevent browser from restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Temporarily override CSS smooth scroll so jump to top is immediate and reliable
    const root = document.documentElement;
    const prevScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    // 3. Immediate instant scroll reset across window, documentElement, and body
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    root.scrollTop = 0;
    document.body.scrollTop = 0;

    // 4. Verify on subsequent animation frames as Next.js updates and mounts the new route
    const raf1 = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    const raf2 = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      root.scrollTop = 0;
      document.body.scrollTop = 0;
      // Re-enable smooth scroll for in-page anchors
      root.style.scrollBehavior = prevScrollBehavior || "smooth";
    });

    // 5. Reset and refresh GSAP ScrollTrigger so animations trigger fresh from top-0
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.clearScrollMemory();

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      ScrollTrigger.refresh();
    }, 60);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
