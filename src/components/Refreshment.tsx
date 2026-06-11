"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import canStudio from "../../resources/can.png";
import iconExtracts from "../../resources/extracts.svg";
import iconZero from "../../resources/zero.svg";
import iconBlends from "../../resources/blends.png";
import iconCrafted from "../../resources/crafted.svg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES: { title: string; icon: StaticImageData }[] = [
  { title: "Botanical extracts", icon: iconExtracts },
  { title: "Zero sugar", icon: iconZero },
  { title: "Functional blends", icon: iconBlends },
  { title: "Small batch crafted", icon: iconCrafted },
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
    <section ref={ref} data-bg="#f4f2f3" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        {/* can */}
        <div className="relative mx-auto w-80 md:w-[30rem]">
          <div
            className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(232,200,225,0.5), rgba(232,200,225,0))" }}
            aria-hidden
          />
          <div className="refresh-can relative">
            <Image
              src={canStudio}
              alt="Bloom botanical sparkling water can"
              sizes="(min-width: 768px) 30rem, 20rem"
              className="w-full drop-shadow-[0_40px_70px_rgba(120,90,150,0.28)]"
            />
          </div>
        </div>

        {/* copy */}
        <div>
          <SplitReveal className="font-display text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.04] text-ink">
            Refreshment, Reimagined.
          </SplitReveal>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink/75 md:text-[19px]"
          >
            In a world overstimulated by caffeine and sugar, Bloom offers a softer clarity. Floral
            notes. Sparkling lift. A ritual designed for presence.
          </motion.p>

          <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-12">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
                className="flex flex-col items-start gap-4"
              >
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 0.75, opacity: 0 }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)", scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.12 }}
                >
                  <Image src={f.icon} alt="" aria-hidden className="h-16 w-16 object-contain md:h-20 md:w-20" />
                </motion.div>
                <span className="text-[15px] text-ink md:text-base">{f.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
