"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INITIAL = "#f4f2f3";

/**
 * Fixed canvas behind the page whose color crossfades as sections with a
 * `data-bg` attribute cross the viewport's middle — so light sections
 * melt into each other instead of cutting.
 */
export default function BgMorph() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(ref.current, {
              backgroundColor: section.dataset.bg,
              duration: 0.9,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });
    });
  });

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: INITIAL }}
      aria-hidden
    />
  );
}
