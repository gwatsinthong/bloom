"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import TiltCard from "./TiltCard";
import blossomCalm from "../../resources/blossom.png";
import citrusClarity from "../../resources/citruss.png";
import lavenderLift from "../../resources/lavendar.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRODUCTS: { name: string; tagline: string; img: StaticImageData }[] = [
  { name: "Blossom Calm", tagline: "Floral serenity.", img: blossomCalm },
  { name: "Citrus Clarity", tagline: "Bright focus.", img: citrusClarity },
  { name: "Lavender Lift", tagline: "Gentle elevation.", img: lavenderLift },
];

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
    <section id="choose" ref={ref} data-bg="#fbf9f7" className="relative py-28 md:py-36">
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
              <TiltCard className="relative aspect-[1600/1888] overflow-hidden rounded-3xl shadow-[0_30px_60px_rgba(120,90,150,0.16)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_rgba(120,90,150,0.28)]">
                <Image
                  src={p.img}
                  alt={`${p.name} — ${p.tagline}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                {/* sheen sweep on hover */}
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
              </TiltCard>
              <h3 className="font-display mt-5 text-2xl text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
