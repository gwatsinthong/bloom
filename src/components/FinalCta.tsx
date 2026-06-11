"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import MagneticButton from "./MagneticButton";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";
import RollText from "./RollText";
import footerBg from "../../resources/footer.png";

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
        { yPercent: 30, opacity: 0.3 },
        {
          yPercent: 0,
          opacity: 0.8,
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
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#b78a9b]"
    >
      <Image
        src={footerBg}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
        aria-hidden
      />

      {/* blend down from the dark testimonial section */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22%]"
        style={{ background: "linear-gradient(180deg, #5d4360 0%, rgba(93,67,96,0) 100%)" }}
        aria-hidden
      />

      {/* rising sun accent over the baked-in glow */}
      <div
        className="dawn-glow pointer-events-none absolute left-1/2 top-[42%] h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,214,0.7) 0%, rgba(255,214,190,0.3) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      <Petals count={8} seed={67} falling className="opacity-50" />

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
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-7 text-[17px] text-ink/75 md:text-[20px]"
        >
          Bloom isn&rsquo;t just a drink. It&rsquo;s a shift in pace.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
          className="mt-10"
        >
          <MagneticButton href="#choose">Experience It</MagneticButton>
        </motion.div>
      </div>

      {/* footer */}
      <footer className="relative z-10 pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6">
          <motion.nav
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-3 text-[16px] text-ink/80"
          >
            {LINKS.map((link, i) => (
              <span key={link} className="flex items-center gap-3">
                <a href="#" className="group px-1 py-1 transition-colors hover:text-ink">
                  <RollText>{link}</RollText>
                </a>
                {i < LINKS.length - 1 && <span className="text-ink/40">·</span>}
              </span>
            ))}
          </motion.nav>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-[14px] text-ink/55"
          >
            Copyright © 2026 Bloom
          </motion.p>
        </div>
      </footer>
    </section>
  );
}
