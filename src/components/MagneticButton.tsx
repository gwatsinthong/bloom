"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

/**
 * Pill CTA that leans toward the cursor and springs back on leave,
 * with an arrow that nudges forward on hover.
 */
export default function MagneticButton({
  children,
  href = "#",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onPointerMove = (e: PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.45);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex items-center gap-3 rounded-full bg-lime px-7 py-3.5 text-[15px] font-medium text-ink shadow-[0_8px_30px_rgba(216,242,110,0.45)] transition-shadow hover:shadow-[0_10px_40px_rgba(216,242,110,0.7)] ${className}`}
    >
      <span>{children}</span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        aria-hidden
      >
        <path
          d="M1 5h19M16 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}
