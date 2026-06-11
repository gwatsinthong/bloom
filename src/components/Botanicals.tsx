"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";
import rose from "../../resources/rose.png";
import chamomile from "../../resources/chamomile.png";
import citrusBlossom from "../../resources/citrus.png";
import lionsMane from "../../resources/lions man.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BOTANICALS: { name: string; img: StaticImageData }[] = [
  { name: "Rose Extract", img: rose },
  { name: "Chamomile", img: chamomile },
  { name: "Citrus Blossom", img: citrusBlossom },
  { name: "Lion's Mane", img: lionsMane },
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
    <section ref={ref} data-bg="#eed7e7" className="relative overflow-hidden py-28 md:py-36">
      {/* soft-edged color accents that melt into the morphing canvas */}
      <div
        className="pointer-events-none absolute -left-[12%] top-[8%] h-[80%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(243,196,219,0.55) 0%, rgba(243,196,219,0) 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[12%] top-[16%] h-[80%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(205,190,235,0.5) 0%, rgba(205,190,235,0) 70%)" }}
        aria-hidden
      />
      <Petals count={10} seed={23} className="opacity-70" />

      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
        <SplitReveal className="font-display text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.06] text-ink">
          Botanicals, Elevated.
        </SplitReveal>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mx-auto mt-5 max-w-lg text-[16px] text-ink/70 md:text-[17px]"
        >
          Every ingredient is chosen for clarity, calm, and gentle uplift.
        </motion.p>

        <div className="botanical-grid mt-20 grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4 md:gap-x-12">
          {BOTANICALS.map((b) => (
            <div key={b.name} className="botanical-card">
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="botanical-bob relative mx-auto w-full max-w-[300px]"
              >
                <Image
                  src={b.img}
                  alt=""
                  sizes="300px"
                  className="w-full drop-shadow-[0_24px_50px_rgba(140,100,150,0.25)]"
                />
                {/* the glass spans 13%–88% of the artwork; this sits in its lower third */}
                <h3 className="absolute inset-x-[12%] bottom-[24%] font-display text-[clamp(1.05rem,1.4vw,1.4rem)] leading-snug text-ink/90">
                  {b.name}
                </h3>
              </motion.div>
              <div className="botanical-shadow mx-auto mt-2 h-4 w-32 rounded-[50%] bg-[#5d4a66]/35 blur-[7px]" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
