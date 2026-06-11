"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Deterministic PRNG so server and client render identical petals */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = [
  ["#f3c6da", "#e8a8c8"],
  ["#cfc3ec", "#b3a2e0"],
  ["#e8d8f0", "#cdb8e4"],
  ["#f6dde6", "#ecc1d4"],
];

type PetalsProps = {
  count?: number;
  seed?: number;
  className?: string;
};

/**
 * A drifting field of translucent flower petals. Each petal idles on a
 * slow float loop and parallaxes at its own depth as the page scrolls.
 */
export default function Petals({ count = 14, seed = 7, className = "" }: PetalsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rand = mulberry32(seed);

  const petals = Array.from({ length: count }, (_, i) => {
    const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
    return {
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 24 + rand() * 64,
      rotate: rand() * 360,
      blur: rand() > 0.65 ? 3 + rand() * 4 : 0,
      depth: 0.3 + rand() * 1.4,
      duration: 5 + rand() * 6,
      palette,
    };
  });

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>(".petal", ref.current);

      nodes.forEach((node) => {
        const depth = Number(node.dataset.depth);
        const drift = gsap.utils.random(14, 34);

        gsap.to(node, {
          y: `-=${drift}`,
          x: `+=${gsap.utils.random(-18, 18)}`,
          rotation: `+=${gsap.utils.random(-25, 25)}`,
          duration: Number(node.dataset.duration),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 3),
        });

        gsap.to(node, {
          yPercent: -120 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {petals.map((p) => (
        <svg
          key={p.id}
          className="petal absolute"
          data-depth={p.depth}
          data-duration={p.duration}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 1.4,
            transform: `rotate(${p.rotate}deg)`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
          }}
          viewBox="0 0 40 56"
          fill="none"
        >
          <defs>
            <linearGradient id={`pg-${seed}-${p.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={p.palette[0]} stopOpacity="0.95" />
              <stop offset="1" stopColor={p.palette[1]} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M20 1 C33 11 36 33 20 54 C4 33 7 11 20 1 Z"
            fill={`url(#pg-${seed}-${p.id})`}
          />
          <path
            d="M20 1 C33 11 36 33 20 54 C4 33 7 11 20 1 Z"
            fill="#ffffff"
            opacity="0.18"
          />
        </svg>
      ))}
    </div>
  );
}
