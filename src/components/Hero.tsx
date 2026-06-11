"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Petals from "./Petals";
import Bubbles from "./Bubbles";
import MagneticButton from "./MagneticButton";
import SplitReveal from "./SplitReveal";
import { preloaderDone } from "@/lib/loader";
import heroBg from "../../resources/hero.png";
import heroCan from "../../resources/hero-can.png";

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
    (_, contextSafe) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Can entrance + perpetual hover, beginning the moment the curtain lifts
      // (the art is pre-tilted, so no base rotate)
      preloaderDone.then(
        contextSafe!(() => {
          gsap.fromTo(
            ".hero-can",
            { y: 60, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: "power3.out", delay: 0.15 }
          );
          gsap.to(".hero-can-float", {
            y: -18,
            rotation: 3,
            duration: 3.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.7,
          });
        })
      );

      // Sun glow breathing
      gsap.to(".hero-glow", {
        scale: 1.12,
        opacity: 0.9,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Pointer parallax — can and backdrop drift toward the cursor at different depths
      const canX = gsap.quickTo(".hero-can", "x", { duration: 0.8, ease: "power3" });
      const canY = gsap.quickTo(".hero-can", "y", { duration: 0.8, ease: "power3" });
      const bgX = gsap.quickTo(".hero-bg", "x", { duration: 1.2, ease: "power3" });
      const petalsX = gsap.quickTo(".hero-petals", "x", { duration: 1.0, ease: "power3" });
      const petalsY = gsap.quickTo(".hero-petals", "y", { duration: 1.0, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        canX(nx * 26);
        canY(ny * 18);
        bgX(nx * -14);
        petalsX(nx * 46);
        petalsY(ny * 28);
      };
      window.addEventListener("mousemove", onMove);

      // Scroll choreography — the dunes linger while the copy lifts away
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
        .to(".hero-bg", { yPercent: 6, ease: "none" }, 0);

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden bg-[#cbb3dd]">
      {/* dunes backdrop, slightly oversized so parallax never reveals edges */}
      <div className="hero-bg absolute -inset-[3%]" aria-hidden>
        <Image
          src={heroBg}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </div>

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
            "radial-gradient(circle, rgba(255,250,235,0.85) 0%, rgba(255,236,225,0.4) 38%, rgba(255,236,225,0) 70%)",
        }}
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

      <Petals count={20} seed={11} falling className="hero-petals" />
      <Bubbles count={14} className="inset-x-[8%] bottom-[6%] h-[34%]" />

      {/* can + its reflection */}
      <div className="hero-can-scroll pointer-events-none absolute left-1/2 top-[14%] z-10 -translate-x-1/2">
        <div className="hero-can opacity-0">
          <div className="hero-can-float">
            <Image
              src={heroCan}
              alt="Bloom botanical sparkling water can"
              preload
              className="w-52 drop-shadow-[0_30px_60px_rgba(120,90,150,0.35)] md:w-64"
            />
            <Image
              src={heroCan}
              alt=""
              aria-hidden
              className="w-52 -scale-y-100 opacity-15 blur-[2px] md:w-64 [mask-image:linear-gradient(180deg,transparent_30%,black_100%)]"
            />
          </div>
        </div>
      </div>

      {/* copy */}
      <div className="hero-copy relative z-20 mt-auto flex flex-col items-center px-6 pb-[9vh] pt-[58vh] text-center md:pb-[11vh]">
        <SplitReveal
          as="h1"
          immediate
          delay={0.35}
          className="font-display w-full text-balance text-[clamp(2rem,4vw,4.2rem)] leading-[1.08] tracking-[-0.01em] text-ink"
        >
          Sparkling Botanicals for Modern Clarity
        </SplitReveal>
        <SplitReveal
          as="p"
          immediate
          delay={0.75}
          className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink/85 md:text-[21px]"
        >
          Crafted with floral extracts and micro-botanical blends to elevate calm, focus, and
          refreshment.
        </SplitReveal>
        <div className="mt-9">
          <MagneticButton href="#choose">Taste the Bloom</MagneticButton>
        </div>
      </div>

      {/* fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f4f2f3]" aria-hidden />
    </section>
  );
}
