"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import MagneticButton from "./MagneticButton";
import SplitReveal from "./SplitReveal";
import Petals from "./Petals";
import RollText from "./RollText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const PRESS = [
  <span key="vogue" className="font-display text-2xl tracking-[0.32em] md:text-3xl">
    VOGUE
  </span>,
  <span key="wb" className="font-display text-xl tracking-wide md:text-2xl">
    Well+Being
  </span>,
  <span key="tbr" className="text-center font-display text-sm leading-tight tracking-wide md:text-base">
    The
    <br />
    Botanical
    <br />
    Review
  </span>,
];

const LINKS = ["Shop", "About", "Contact", "Instagram"];

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Quote brightens word by word as it scrolls through the viewport
      const split = SplitText.create(".quote", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.18, filter: "blur(2px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".quote",
            start: "top 80%",
            end: "top 35%",
            scrub: 0.6,
          },
        }
      );

      // The dark card rises and settles over the light section above it
      gsap.from(ref.current, {
        y: 110,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 96%",
          end: "top 45%",
          scrub: 1,
        },
      });

      // Dunes drift upward at different depths as the section passes
      gsap.to(".test-dune-l", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".test-dune-r", {
        yPercent: -34,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Dawn glow swells as the CTA scrolls into view
      gsap.fromTo(
        ".dawn-glow",
        { scale: 0.85, opacity: 0.35 },
        {
          scale: 1,
          opacity: 0.85,
          ease: "none",
          scrollTrigger: { trigger: ".cta-block", start: "top bottom", end: "center center", scrub: 1 },
        }
      );

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 -mt-10 flex flex-col overflow-hidden rounded-t-[3rem] pt-32 text-[#efe7f2] md:rounded-t-[4.5rem] md:pt-44"
      style={{
        background:
          "linear-gradient(180deg, #241c2e 0%, #2e2238 30%, #43304c 60%, #5d4360 100%)",
      }}
    >
      {/* dark dunes */}
      <div
        className="test-dune-l pointer-events-none absolute -left-[10%] top-[10%] h-[70%] w-[70%] rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(120,80,120,0.5), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="test-dune-r pointer-events-none absolute -right-[10%] top-[6%] h-[75%] w-[75%] rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(150,100,130,0.45), transparent 70%)" }}
        aria-hidden
      />

      {/* dawn glow rising behind the final CTA */}
      <div
        className="dawn-glow pointer-events-none absolute bottom-[6%] left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,224,196,0.45) 0%, rgba(214,162,178,0.25) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      <Petals count={10} seed={67} falling className="opacity-40" />

      {/* testimonial */}
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <blockquote className="quote font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.15]">
          &ldquo;A ritual I didn&rsquo;t know I needed.&rdquo;
        </blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-sm tracking-wide text-[#bfb0c8]"
        >
          — Wellness Editor, Modern Living
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="mt-20 flex items-center justify-center gap-12 md:gap-20"
        >
          {PRESS.map((logo, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 0.85, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="transition-opacity hover:opacity-100"
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* final CTA — brought up from the old footer section */}
      <div className="cta-block relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-40 text-center md:pt-52">
        <SplitReveal as="h2" className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.12]">
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
          className="mt-7 text-[17px] text-[#efe7f2]/75 md:text-[20px]"
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
            className="flex flex-wrap items-center justify-center gap-x-3 text-[16px] text-[#efe7f2]/80"
          >
            {LINKS.map((link, i) => (
              <span key={link} className="flex items-center gap-3">
                <a href="#" className="group px-1 py-1 transition-colors hover:text-[#efe7f2]">
                  <RollText>{link}</RollText>
                </a>
                {i < LINKS.length - 1 && <span className="text-[#efe7f2]/40">·</span>}
              </span>
            ))}
          </motion.nav>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-[14px] text-[#efe7f2]/55"
          >
            Copyright © 2026 Bloom
          </motion.p>
        </div>
      </footer>
    </section>
  );
}
