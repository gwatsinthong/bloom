"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Can from "./Can";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES = [
  {
    title: "Botanical extracts",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M22 38V16M22 24c0-7 4-12 12-13-1 8-5 12-12 13ZM22 30c0-6-3.5-10-10-11 1 7 4.5 10.2 10 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Zero sugar",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M13 17l9-5 9 5v12l-9 5-9-5V17ZM13 17l9 5 9-5M22 22v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9l26 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Functional blends",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M10 20h24c0 7-4 12-12 12s-12-5-12-12ZM22 32v5M15 37h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 8c-5 2-8 6-9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="28.5" cy="7.5" rx="3.5" ry="2" transform="rotate(-20 28.5 7.5)" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Small batch crafted",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-10 w-10" aria-hidden>
        <path d="M18 19c-2-2-2-6 4-6s6 4 4 6c-1.2 1.2-1 3 0 4h-8c1-1 1.2-2.8 0-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M14 23h16v5H14zM10 36c0-3 2.5-5 6-5h12c3.5 0 6 2 6 5v1H10v-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Refreshment() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".refresh-can",
        { y: 70, rotate: -6 },
        {
          y: -50,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        {/* can */}
        <div className="relative mx-auto w-64 md:w-80">
          <div
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(232,200,225,0.55), rgba(232,200,225,0))" }}
            aria-hidden
          />
          <div className="refresh-can relative">
            <Can className="w-full drop-shadow-[0_40px_70px_rgba(120,90,150,0.28)]" />
          </div>
        </div>

        {/* copy */}
        <div>
          <SplitReveal className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
            Refreshment, Reimagined.
          </SplitReveal>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft"
          >
            In a world overstimulated by caffeine and sugar, Bloom offers a softer clarity. Floral
            notes. Sparkling lift. A ritual designed for presence.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
                className="flex flex-col items-start gap-3 text-ink/80"
              >
                {f.icon}
                <span className="text-sm text-ink">{f.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
