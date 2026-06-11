"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { preloaderDone } from "@/lib/loader";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate as soon as the preloader lifts instead of on scroll-into-view */
  immediate?: boolean;
  delay?: number;
};

/**
 * Splits its text into lines and reveals each from behind a mask —
 * after the preloader for hero copy, or on scroll-into-view elsewhere.
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
    (_, contextSafe) => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line-inner",
      });

      // Unwrap the masks once the reveal lands so tight leading never
      // clips descenders at rest.
      let reverted = false;
      const finish = () => {
        if (!reverted) {
          reverted = true;
          split.revert();
        }
      };

      if (immediate) {
        gsap.set(split.lines, { yPercent: 110 });
        const play = contextSafe!(() => {
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.09,
            delay,
            onComplete: finish,
          });
        });
        preloaderDone.then(play);
      } else {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          delay,
          onComplete: finish,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      return finish;
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
