"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Carbonation: little glassy bubbles that rise out of the water,
 * wobble, and pop into nothing. Each loops on its own randomized beat.
 */
export default function Bubbles({ count = 12, className = "" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".bubble", ref.current).forEach((b) => {
        const rise = () => {
          const duration = gsap.utils.random(4, 8);
          gsap.fromTo(
            b,
            {
              y: 0,
              x: 0,
              opacity: 0,
              scale: gsap.utils.random(0.5, 1.1),
            },
            {
              y: -gsap.utils.random(180, 420),
              opacity: 0.85,
              duration,
              ease: "none",
              onComplete: () => {
                gsap.to(b, { opacity: 0, scale: 1.4, duration: 0.3, onComplete: rise });
              },
            }
          );
          gsap.to(b, {
            x: gsap.utils.random(-24, 24),
            duration: duration / 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          });
        };
        gsap.delayedCall(gsap.utils.random(0, 5), rise);
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`pointer-events-none absolute ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="bubble absolute bottom-0 rounded-full border border-white/70 bg-white/20 opacity-0 shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.8)]"
          style={{
            left: `${8 + ((i * 83) % 88)}%`,
            width: 5 + ((i * 7) % 9),
            height: 5 + ((i * 7) % 9),
          }}
        />
      ))}
    </div>
  );
}
