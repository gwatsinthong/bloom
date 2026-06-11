"use client";

import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";

const STEPS = [
  {
    title: "Chill.",
    copy: "Let it cool. Let yourself slow.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden>
        <rect x="16" y="10" width="16" height="30" rx="5" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="24" cy="10" rx="8" ry="2.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 16l3 2M8 24h4M9 32l3-2M39 16l-3 2M40 24h-4M39 32l-3-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sip.",
    copy: "Notice the lift. The floral clarity.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden>
        <path d="M10 14l4-8 4 8M14 6v22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 22h16l-1.6 17a2 2 0 0 1-2 1.8h-8.8a2 2 0 0 1-2-1.8L22 22Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M23 28h14" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="28" cy="33" r="1" fill="currentColor" />
        <circle cx="32" cy="36" r="1" fill="currentColor" />
        <circle cx="30" cy="25" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Slow Down.",
    copy: "Stay present. Stay blooming.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden>
        <circle cx="24" cy="26" r="8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M24 10v4M35.3 14.7l-2.8 2.8M12.7 14.7l2.8 2.8M40 26h-4M8 26h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 38h32M14 42h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Ritual() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 35%, #f1d9e8 0%, #e7d6ee 45%, #fbf9f7 100%)",
        }}
        aria-hidden
      />
      <Petals count={6} seed={41} className="opacity-60" />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <SplitReveal className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
          The Ritual.
        </SplitReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-4 text-[15px] text-ink-soft"
        >
          A softer way to refresh.
        </motion.p>

        <div className="mt-16 grid gap-14 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="flex flex-col items-center text-ink/80"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                {s.icon}
              </motion.div>
              <h3 className="font-display mt-5 text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-ink-soft">{s.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
