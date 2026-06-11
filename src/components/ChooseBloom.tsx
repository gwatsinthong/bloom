"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Can from "./Can";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRODUCTS = [
  {
    name: "Blossom Calm",
    tagline: "Floral serenity.",
    bg: "linear-gradient(165deg, #f6d3e0 0%, #efbcd2 55%, #e8aac6 100%)",
    glow: "rgba(255,255,255,0.55)",
    tint: { from: "#f9c7da", to: "#e795bb" },
    flower: "#d77ba6",
  },
  {
    name: "Citrus Clarity",
    tagline: "Bright focus.",
    bg: "linear-gradient(165deg, #eef2c1 0%, #dfeb9a 55%, #d3e57f 100%)",
    glow: "rgba(255,255,255,0.6)",
    tint: { from: "#eff2b4", to: "#c9dd6a" },
    flower: "#a4b84e",
  },
  {
    name: "Lavender Lift",
    tagline: "Gentle elevation.",
    bg: "linear-gradient(165deg, #dcd4f0 0%, #c4b6e6 55%, #ab99d9 100%)",
    glow: "rgba(255,255,255,0.5)",
    tint: { from: "#d6c9f2", to: "#9d86d4" },
    flower: "#8a72c4",
  },
];

/** Faint botanical watermark scattered behind the can */
function FlowerPattern({ color }: { color: string }) {
  const blooms = [
    { x: 18, y: 16, s: 60, r: 15 },
    { x: 82, y: 28, s: 44, r: -20 },
    { x: 12, y: 72, s: 38, r: 40 },
    { x: 86, y: 78, s: 56, r: -10 },
    { x: 50, y: 94, s: 34, r: 25 },
  ];
  return (
    <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {blooms.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.r}) scale(${b.s / 100})`}>
          {Array.from({ length: 6 }).map((_, j) => {
            const a = (j / 6) * 360;
            return (
              <ellipse
                key={j}
                cx="0"
                cy="-7"
                rx="3.4"
                ry="7"
                transform={`rotate(${a})`}
                fill="none"
                stroke={color}
                strokeWidth="0.7"
              />
            );
          })}
          <circle r="2.2" fill="none" stroke={color} strokeWidth="0.7" />
        </g>
      ))}
    </svg>
  );
}

export default function ChooseBloom() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".product-card", {
        y: 110,
        opacity: 0,
        rotate: (i) => [-3, 0, 3][i],
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: ".product-grid", start: "top 78%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section id="choose" ref={ref} className="relative bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <SplitReveal className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
          Choose Your Bloom.
        </SplitReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-4 text-[15px] text-ink-soft"
        >
          Three moods. One ritual.
        </motion.p>

        <div className="product-grid mt-16 grid gap-10 text-left md:grid-cols-3 md:gap-8">
          {PRODUCTS.map((p) => (
            <motion.a key={p.name} href="#" className="product-card group block" whileTap={{ scale: 0.98 }}>
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(120,90,150,0.16)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_rgba(120,90,150,0.28)]"
                style={{ background: p.bg }}
              >
                <FlowerPattern color={p.flower} />
                <div
                  className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${p.glow}, transparent 70%)` }}
                  aria-hidden
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ y: -14, rotate: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                >
                  <Can
                    tint={p.tint}
                    subLabel={p.tagline.replace(".", "").toLowerCase()}
                    className="w-[52%] drop-shadow-[0_30px_45px_rgba(80,55,100,0.3)]"
                  />
                </motion.div>
                {/* sheen sweep on hover */}
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
              </div>
              <h3 className="font-display mt-5 text-2xl text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
