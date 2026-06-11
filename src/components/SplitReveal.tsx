"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate immediately on mount instead of when scrolled into view */
  immediate?: boolean;
  delay?: number;
};

/**
 * Splits its text into lines and reveals each from behind a mask —
 * on mount for hero copy, or on scroll-into-view elsewhere.
 */
export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line-inner",
      });

      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            }),
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
