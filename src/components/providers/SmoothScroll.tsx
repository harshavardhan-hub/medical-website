"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Singleton RAF id so we never double-register the loop
let globalRafId: number | null = null;
let globalLenis: Lenis | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset scroll to top on route change
  useEffect(() => {
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

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

    // Smooth scroll for anchor links with header offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // If it's a hash link on the same page
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement && globalLenis) {
          globalLenis.scrollTo(targetElement as HTMLElement, {
            offset: -100, // Offset for sticky navbar
            duration: 1.2,
          });
        }
      } else if (href && href.includes("#")) {
        // If it's a hash link to another page (e.g., /#appointment)
        // We let normal navigation occur, but if we are already on that page:
        const urlObj = new URL(href, window.location.href);
        if (urlObj.pathname === window.location.pathname) {
          e.preventDefault();
          const hash = urlObj.hash;
          const targetElement = document.querySelector(hash);
          if (targetElement && globalLenis) {
            globalLenis.scrollTo(targetElement as HTMLElement, {
              offset: -100,
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
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
