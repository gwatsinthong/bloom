"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A little blossom pinned bottom-right that spins with scroll progress
 * and unfurls its petals as you near the end. Click to drift back to top.
 */
export default function ScrollBloom() {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".bloom-spinner",
        { rotation: 0 },
        {
          rotation: 540,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.6 },
        }
      );
      gsap.fromTo(
        ".bloom-petal-prog",
        { scale: 0.45, transformOrigin: "center 90%" },
        {
          scale: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { start: 0, end: "max", scrub: 0.6 },
        }
      );
      gsap.from(ref.current, {
        opacity: 0,
        scale: 0,
        delay: 2,
        duration: 0.7,
        ease: "back.out(2)",
      });
    },
    { scope: ref }
  );

  const toTop = () => {
    const lenis = (window as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      ref={ref}
      onClick={toTop}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-150 hidden h-12 w-12 items-center justify-center rounded-full bg-cream/60 shadow-[0_8px_30px_rgba(120,90,150,0.25)] backdrop-blur-md md:flex"
      aria-label="Back to top"
    >
      <svg viewBox="0 0 48 48" className="bloom-spinner h-8 w-8" fill="none" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            className="bloom-petal-prog"
            cx="24"
            cy="14"
            rx="5"
            ry="10"
            transform={`rotate(${i * 60} 24 24)`}
            fill={i % 2 ? "#cfc3ec" : "#f3c6da"}
            opacity="0.9"
          />
        ))}
        <circle cx="24" cy="24" r="4" fill="#d8f26e" />
      </svg>
    </motion.button>
  );
}
