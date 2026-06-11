"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

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

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 text-[#efe7f2] md:py-44"
      style={{
        background:
          "linear-gradient(180deg, #241c2e 0%, #2e2238 35%, #43304c 70%, #5d4360 100%)",
      }}
    >
      {/* dark dunes */}
      <div
        className="test-dune-l pointer-events-none absolute -left-[10%] bottom-[-20%] h-[70%] w-[70%] rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(120,80,120,0.5), transparent 70%)" }}
        aria-hidden
      />
      <div
        className="test-dune-r pointer-events-none absolute -right-[10%] bottom-[-25%] h-[75%] w-[75%] rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(150,100,130,0.45), transparent 70%)" }}
        aria-hidden
      />

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
    </section>
  );
}
