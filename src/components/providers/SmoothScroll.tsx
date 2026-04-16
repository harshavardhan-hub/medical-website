"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Singleton RAF id so we never double-register the loop
let globalRafId: number | null = null;
let globalLenis: Lenis | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Destroy any previous instance (HMR safety)
    if (globalLenis) {
      globalLenis.destroy();
      globalLenis = null;
    }
    if (globalRafId !== null) {
      cancelAnimationFrame(globalRafId);
      globalRafId = null;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Prevent Lenis from fighting Framer Motion scroll
      syncTouch: false,
    });

    globalLenis = lenis;

    // Expose lenis on window so Framer Motion useScroll can co-exist
    (window as unknown as Record<string, unknown>).__lenis__ = lenis;

    function raf(time: number) {
      lenis.raf(time);
      globalRafId = requestAnimationFrame(raf);
    }

    globalRafId = requestAnimationFrame(raf);

    return () => {
      if (globalRafId !== null) {
        cancelAnimationFrame(globalRafId);
        globalRafId = null;
      }
      lenis.destroy();
      globalLenis = null;
      delete (window as unknown as Record<string, unknown>).__lenis__;
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
