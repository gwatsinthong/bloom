"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft cursor companion: a quick dot and a lagging ring that blooms
 * open over links and buttons. Hides the native cursor while active.
 * Skipped entirely on touch devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 24, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      setHovering(!!(e.target as Element).closest?.("a, button"));
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-250 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/70"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-250 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/25"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.7 : 1,
          backgroundColor: hovering ? "rgba(216,242,110,0.25)" : "rgba(216,242,110,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden
      />
    </>
  );
}
