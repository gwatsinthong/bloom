"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";
import Wordmark from "./Wordmark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINKS = ["Shop", "About", "Contact", "Instagram"];

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Dawn glow rises as the section scrolls in
      gsap.fromTo(
        ".dawn-glow",
        { yPercent: 30, opacity: 0.4 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #5d4360 0%, #7c5a78 18%, #b78a9b 42%, #e2b3b8 62%, #f2cfc3 78%, #ead4d8 100%)",
      }}
    >
      {/* rising sun */}
      <div
        className="dawn-glow pointer-events-none absolute left-1/2 top-[48%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,214,0.9) 0%, rgba(255,214,190,0.45) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* still water */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(214,180,190,0) 0%, rgba(208,170,185,0.7) 40%, #cdb3c8 100%)",
        }}
        aria-hidden
      />
      <div className="mist pointer-events-none absolute bottom-[16%] left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-[50%] bg-white/30 blur-3xl" aria-hidden />

      <Petals count={8} seed={67} className="opacity-50" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 py-40 text-center">
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.12] text-ink"
        >
          Brighter Colors.
          <br />
          Slower Mornings.
          <br />
          Longer Conversations.
        </SplitReveal>
        <p className="mt-7 text-[15px] text-ink/70 md:text-base">
          Bloom isn&rsquo;t just a drink. It&rsquo;s a shift in pace.
        </p>
        <div className="mt-10">
          <MagneticButton href="#choose">Experience It</MagneticButton>
        </div>
      </div>

      {/* footer */}
      <footer className="relative z-10 pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6">
          <Wordmark className="text-2xl tracking-[0.08em] text-ink/90" />
          <nav className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-ink/75">
            {LINKS.map((link, i) => (
              <span key={link} className="flex items-center gap-2">
                <a href="#" className="px-1 py-1 transition-colors hover:text-ink">
                  {link}
                </a>
                {i < LINKS.length - 1 && <span className="text-ink/30">·</span>}
              </span>
            ))}
          </nav>
          <p className="text-xs text-ink/50">Copyright © 2026 Bloom</p>
        </div>
      </footer>
    </section>
  );
}
