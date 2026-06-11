"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Round to 3 decimals so SSR and client render identical SVG attributes */
const r = (n: number) => Math.round(n * 1000) / 1000;

function Rose() {
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none" aria-hidden>
      <path d="M40 46c4 8 2 16-4 22" stroke="#7d9170" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M38 58c-6-2-12 0-15 5 6 2 12 0 15-5ZM39 64c5-1 10 2 12 7-6 1-11-2-12-7Z" fill="#9db48d" />
      <circle cx="40" cy="30" r="17" fill="#eeb7cd" />
      <path d="M40 13c9 0 17 8 17 17 0 10-8 17-17 17-10 0-17-7-17-17h6c0 7 5 11 11 11s11-4 11-11-5-11-11-11c-6 0-10 4-10 9s4 9 9 9c4 0 7-3 7-7s-3-6-6-6c-2 0-4 2-4 4h4"
        stroke="#c66f97" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Chamomile() {
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none" aria-hidden>
      <path d="M40 48c0 10-2 16-6 22" stroke="#7d9170" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M37 60c-5-1-10 1-13 6 5 1 10-1 13-6Z" fill="#9db48d" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const cx = r(40 + Math.cos(a) * 12);
        const cy = r(30 + Math.sin(a) * 12);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5.5"
            ry="3"
            transform={`rotate(${r((a * 180) / Math.PI)} ${cx} ${cy})`}
            fill="#fdfbf4"
            stroke="#e4ddc8"
            strokeWidth="0.6"
          />
        );
      })}
      <circle cx="40" cy="30" r="6.5" fill="#f0c75e" />
      <circle cx="40" cy="30" r="6.5" stroke="#d9a83c" strokeWidth="0.8" />
    </svg>
  );
}

function CitrusBlossom() {
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none" aria-hidden>
      <circle cx="34" cy="40" r="15" fill="#f0a04b" />
      <circle cx="34" cy="40" r="15" stroke="#d97f2a" strokeWidth="1" />
      <circle cx="29" cy="35" r="4" fill="#f7bc77" opacity="0.8" />
      <path d="M34 25c2-6 7-9 13-9 0 6-3 10-9 11" fill="#8fae7c" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const cx = r(55 + Math.cos(a) * 7);
        const cy = r(28 + Math.sin(a) * 7);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="4.5"
            ry="3"
            transform={`rotate(${r((a * 180) / Math.PI + 90)} ${cx} ${cy})`}
            fill="#fdfaf2"
            stroke="#e7dfca"
            strokeWidth="0.6"
          />
        );
      })}
      <circle cx="55" cy="28" r="3" fill="#f0c75e" />
    </svg>
  );
}

function LionsMane() {
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" fill="none" aria-hidden>
      <path d="M24 34c-3-10 5-18 16-18s19 8 16 18c5 8-1 18-8 20-2 4-14 4-16 0-7-2-13-12-8-20Z" fill="#f3e8d3" />
      <path d="M24 34c-3-10 5-18 16-18s19 8 16 18c5 8-1 18-8 20-2 4-14 4-16 0-7-2-13-12-8-20Z" stroke="#dcc9a4" strokeWidth="1" />
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M${26 + i * 3.5} ${46 + (i % 3) * 3}v${8 + (i % 4) * 2}`}
          stroke="#dcc9a4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

const BOTANICALS: { name: string; art: ReactNode }[] = [
  { name: "Rose Extract", art: <Rose /> },
  { name: "Chamomile", art: <Chamomile /> },
  { name: "Citrus Blossom", art: <CitrusBlossom /> },
  { name: "Lion's Mane", art: <LionsMane /> },
];

export default function Botanicals() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".botanical-card", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".botanical-grid", start: "top 80%", once: true },
      });

      // Idle bob — each capsule floats above its shadow on its own beat
      gsap.utils.toArray<HTMLElement>(".botanical-bob").forEach((el, i) => {
        gsap.to(el, {
          y: -10,
          duration: 2.6 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
        gsap.to(el.parentElement!.querySelector(".botanical-shadow"), {
          scaleX: 0.82,
          opacity: 0.5,
          duration: 2.6 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background:
          "linear-gradient(120deg, #e9d3e6 0%, #f3cfdd 30%, #ead0e4 55%, #d8cdec 80%, #e3d6ee 100%)",
      }}
    >
      <Petals count={10} seed={23} className="opacity-70" />

      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
        <SplitReveal className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.06] text-ink">
          Botanicals, Elevated.
        </SplitReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mx-auto mt-4 max-w-md text-[15px] text-ink-soft"
        >
          Every ingredient is chosen for clarity, calm, and gentle uplift.
        </motion.p>

        <div className="botanical-grid mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-8">
          {BOTANICALS.map((b) => (
            <div key={b.name} className="botanical-card">
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="botanical-bob relative mx-auto flex aspect-[3/4.6] w-full max-w-[200px] flex-col items-center justify-center rounded-[110px] border border-white/70 bg-white/45 px-4 shadow-[inset_0_1px_8px_rgba(255,255,255,0.9),0_24px_50px_rgba(140,100,150,0.18)] backdrop-blur-md"
              >
                <div
                  className="absolute inset-0 rounded-[110px]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 32%, rgba(255,255,255,0.85), rgba(255,255,255,0.1) 65%)",
                  }}
                  aria-hidden
                />
                <div className="relative">{b.art}</div>
                <span className="relative mt-5 font-display text-lg text-ink/90">{b.name}</span>
              </motion.div>
              <div className="botanical-shadow mx-auto mt-6 h-3 w-28 rounded-[50%] bg-[#9b7fae]/35 blur-[6px]" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
