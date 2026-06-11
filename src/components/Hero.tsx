"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Can from "./Can";
import Petals from "./Petals";
import MagneticButton from "./MagneticButton";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STARS = [
  { x: 12, y: 14, s: 3, d: 3.2 }, { x: 22, y: 32, s: 2, d: 4.4 },
  { x: 31, y: 9, s: 2.5, d: 3.8 }, { x: 44, y: 20, s: 2, d: 5.1 },
  { x: 58, y: 7, s: 3, d: 4.0 }, { x: 67, y: 26, s: 2, d: 3.4 },
  { x: 76, y: 12, s: 2.5, d: 4.8 }, { x: 86, y: 30, s: 2, d: 3.6 },
  { x: 92, y: 10, s: 3, d: 4.2 }, { x: 50, y: 38, s: 2, d: 5.4 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Can entrance + perpetual hover
      gsap.fromTo(
        ".hero-can",
        { y: 60, opacity: 0, rotate: -2, scale: 0.92 },
        { y: 0, opacity: 1, rotate: -12, scale: 1, duration: 1.6, ease: "power3.out", delay: 0.25 }
      );
      gsap.to(".hero-can-float", {
        y: -18,
        rotation: 2,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });

      // Sun glow breathing
      gsap.to(".hero-glow", {
        scale: 1.12,
        opacity: 0.9,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Pointer parallax — can and hills drift toward the cursor at different depths
      const canX = gsap.quickTo(".hero-can", "x", { duration: 0.8, ease: "power3" });
      const canY = gsap.quickTo(".hero-can", "y", { duration: 0.8, ease: "power3" });
      const hillsX = gsap.quickTo(".hero-hills", "x", { duration: 1.2, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        canX(nx * 26);
        canY(ny * 18);
        hillsX(nx * -14);
      };
      window.addEventListener("mousemove", onMove);

      // Scroll choreography — sky lingers while the copy lifts away
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      tl.to(".hero-can-scroll", { yPercent: 36, scale: 0.92, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: -40, opacity: 0, ease: "none" }, 0)
        .to(".hero-hills", { yPercent: 12, ease: "none" }, 0);

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #aa9ed4 0%, #cbb3dd 26%, #ecc8da 48%, #e3c4dd 62%, #c8bce4 82%, #d4cdec 100%)",
      }}
    >
      {/* stars */}
      <div aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white/90"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              boxShadow: "0 0 6px rgba(255,255,255,0.9)",
              ["--twinkle-duration" as string]: `${s.d}s`,
            }}
          />
        ))}
      </div>

      {/* sun glow behind the can */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[34%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,250,235,0.95) 0%, rgba(255,236,225,0.5) 38%, rgba(255,236,225,0) 70%)",
        }}
        aria-hidden
      />

      {/* dunes / hills */}
      <div className="hero-hills pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-[12%] top-[30%] h-[55%] w-[75%] rounded-[50%] blur-2xl"
          style={{ background: "linear-gradient(160deg, #f0b9d2 0%, #e2a9cc 60%, rgba(226,169,204,0) 100%)", opacity: 0.85 }}
        />
        <div
          className="absolute -right-[15%] top-[26%] h-[58%] w-[80%] rounded-[50%] blur-2xl"
          style={{ background: "linear-gradient(200deg, #eec2dc 0%, #dfa9cf 55%, rgba(223,169,207,0) 100%)", opacity: 0.9 }}
        />
        <div
          className="absolute left-[10%] top-[48%] h-[40%] w-[85%] rounded-[50%] blur-3xl"
          style={{ background: "linear-gradient(180deg, #f5cede 0%, rgba(245,206,222,0) 100%)", opacity: 0.7 }}
        />
      </div>

      {/* water */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(214,202,236,0) 0%, rgba(214,202,236,0.75) 18%, #cfc6e9 55%, #d8d2ee 100%)",
        }}
        aria-hidden
      />
      {/* reflection shimmer */}
      <div
        className="mist pointer-events-none absolute bottom-[18%] left-1/2 h-24 w-[60%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(255,248,240,0.65), rgba(255,248,240,0))" }}
        aria-hidden
      />
      {/* drifting mist bands */}
      <div
        className="mist pointer-events-none absolute bottom-[8%] left-[-10%] h-16 w-[70%] rounded-[50%] blur-3xl bg-white/40"
        aria-hidden
      />
      <div
        className="mist pointer-events-none absolute bottom-[14%] right-[-10%] h-14 w-[60%] rounded-[50%] blur-3xl bg-white/30"
        style={{ animationDelay: "-7s" }}
        aria-hidden
      />

      <Petals count={16} seed={11} />

      {/* can + its reflection */}
      <div className="hero-can-scroll pointer-events-none absolute left-1/2 top-[10%] z-10 -translate-x-1/2">
        <div className="hero-can opacity-0">
          <div className="hero-can-float">
            <Can className="w-44 drop-shadow-[0_30px_60px_rgba(120,90,150,0.35)] md:w-56" />
            <Can
              className="w-44 -scale-y-100 opacity-15 blur-[2px] md:w-56 [mask-image:linear-gradient(180deg,transparent_30%,black_100%)]"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* copy */}
      <div className="hero-copy relative z-20 mt-auto flex flex-col items-center px-6 pb-[9vh] pt-[58vh] text-center md:pb-[11vh]">
        <SplitReveal
          as="h1"
          immediate
          delay={0.55}
          className="font-display w-full text-[clamp(2.6rem,5.4vw,5.6rem)] leading-[1.04] tracking-[-0.01em] text-ink"
        >
          Sparkling Botanicals for Modern Clarity
        </SplitReveal>
        <SplitReveal
          as="p"
          immediate
          delay={0.95}
          className="mt-6 max-w-md text-[17px] leading-relaxed text-ink/80 md:text-lg"
        >
          Crafted with floral extracts and micro-botanical blends to elevate calm, focus, and
          refreshment.
        </SplitReveal>
        <div className="mt-9">
          <MagneticButton href="#choose">Taste the Bloom</MagneticButton>
        </div>
      </div>

      {/* fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" aria-hidden />
    </section>
  );
}
