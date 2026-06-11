"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHRASES = ["Sip Slow", "Stay Blooming", "Zero Sugar", "Floral Lift", "Botanical Sparkling"];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {PHRASES.map((p) => (
        <span key={p} className="flex items-center">
          <span className="font-display whitespace-nowrap px-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-none text-ink/12">
            {p}
          </span>
          <svg viewBox="0 0 40 56" className="h-7 w-5 shrink-0 opacity-30" fill="none" aria-hidden>
            <path d="M20 1 C33 11 36 33 20 54 C4 33 7 11 20 1 Z" fill="#c98bb0" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite serif marquee that surges with scroll velocity and eases
 * back to a stroll when the page settles.
 */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const loop = gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 250);
          gsap.to(loop, {
            timeScale: 1 + boost,
            duration: 0.4,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: 1, duration: 1.2 });
            },
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="overflow-hidden bg-cream py-10 md:py-14" aria-hidden>
      <div className="marquee-track flex w-max">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
