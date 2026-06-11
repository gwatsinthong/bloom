"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { markPreloaderDone } from "@/lib/loader";

gsap.registerPlugin(useGSAP);

const LETTERS = ["B", "L", "O", "O", "M"];

/**
 * Full-screen curtain in the hero's palette: the wordmark staggers up
 * from behind masks while a counter runs to 100, petals drift, then the
 * curtain lifts with a curved hem and hands off to the hero entrance.
 */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const lenis = (window as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      document.body.style.overflow = "hidden";
      lenis?.stop();

      const release = () => {
        document.body.style.overflow = "";
        lenis?.start();
        markPreloaderDone();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        release();
        setGone(true);
        return;
      }

      const counter = { v: 0 };
      const counterEl = ref.current!.querySelector(".pre-counter") as HTMLElement;

      const tl = gsap.timeline({
        onComplete: () => setGone(true),
      });

      tl.from(".pre-letter", {
        yPercent: 120,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.07,
        delay: 0.2,
      })
        .from(".pre-tag", { opacity: 0, y: 12, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              counterEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.3
        )
        .to(".pre-petal", {
          y: -40,
          opacity: 0.9,
          duration: 1.4,
          ease: "sine.out",
          stagger: 0.12,
        }, 0.5)
        // hold a beat, then lift the curtain
        .add(release, "+=0.15")
        .to(".pre-letter", { yPercent: -120, duration: 0.6, ease: "power3.in", stagger: 0.04 }, "lift")
        .to(".pre-tag, .pre-counter", { opacity: 0, duration: 0.4 }, "lift")
        .to(".pre-curve", { height: 0, duration: 0.9, ease: "power4.inOut" }, "lift+=0.25")
        .to(".pre-panel", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "lift+=0.25");
    },
    { scope: ref }
  );

  if (gone) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-300" aria-hidden>
      {/* main panel */}
      <div
        className="pre-panel absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #b4a8d8 0%, #d3bce0 35%, #eccada 65%, #d8cdec 100%)",
        }}
      >
        {/* drifting petals */}
        {[18, 32, 64, 79, 48].map((x, i) => (
          <svg
            key={i}
            className="pre-petal absolute opacity-0"
            style={{ left: `${x}%`, top: `${30 + (i % 3) * 22}%`, width: 22 + i * 5 }}
            viewBox="0 0 40 56"
            fill="none"
          >
            <path
              d="M20 1 C33 11 36 33 20 54 C4 33 7 11 20 1 Z"
              fill={i % 2 ? "#cfc3ec" : "#f3c6da"}
              opacity="0.85"
            />
          </svg>
        ))}

        {/* wordmark */}
        <div className="font-display flex items-baseline overflow-hidden text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-[0.06em] text-ink">
          {LETTERS.map((l, i) => (
            <span key={i} className={`pre-letter inline-block ${i === 3 ? "-ml-[0.34em]" : ""}`}>
              {l}
            </span>
          ))}
        </div>
        <p className="pre-tag mt-4 text-[13px] tracking-[0.25em] text-ink/60 uppercase">
          Botanical sparkling water
        </p>

        {/* counter */}
        <span className="pre-counter absolute bottom-8 right-8 font-display text-2xl text-ink/50 tabular-nums md:bottom-10 md:right-12 md:text-3xl">
          000
        </span>
      </div>

      {/* curved hem that flattens as the curtain lifts */}
      <div
        className="pre-curve absolute inset-x-0 top-full h-[14vh] -translate-y-px rounded-b-[100%]"
        style={{ background: "#d8cdec" }}
      />
    </div>
  );
}
