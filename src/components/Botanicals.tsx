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
                className="botanical-bob relative mx-auto w-full max-w-[210px]"
              >
                <Image
                  src={b.img}
                  alt={b.name}
                  sizes="210px"
                  className="w-full drop-shadow-[0_24px_50px_rgba(140,100,150,0.25)]"
                />
                <span className="absolute inset-x-0 bottom-[13%] font-display text-lg text-ink/90">
                  {b.name}
                </span>
              </motion.div>
              <div className="botanical-shadow mx-auto mt-4 h-3 w-28 rounded-[50%] bg-[#9b7fae]/35 blur-[6px]" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
