"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";
import iconChill from "../../resources/chill.svg";
import iconSip from "../../resources/sip.svg";
import iconSlowDown from "../../resources/slow down.svg";

const STEPS: { title: string; copy: string; icon: StaticImageData }[] = [
  { title: "Chill.", copy: "Let it cool. Let yourself slow.", icon: iconChill },
  { title: "Sip.", copy: "Notice the lift. The floral clarity.", icon: iconSip },
  { title: "Slow Down.", copy: "Stay present. Stay blooming.", icon: iconSlowDown },
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
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                <Image src={s.icon} alt="" aria-hidden className="h-16 w-16 object-contain" />
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
