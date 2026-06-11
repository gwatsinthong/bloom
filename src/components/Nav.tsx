"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Wordmark from "./Wordmark";

const SHOP_ITEMS = ["Blossom Calm", "Citrus Clarity", "Lavender Lift"];

export default function Nav() {
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className={`fixed inset-x-0 top-0 z-100 transition-colors duration-500 ${
        scrolled ? "bg-cream/70 backdrop-blur-xl shadow-[0_1px_0_rgba(34,28,40,0.06)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        {/* left */}
        <div className="flex items-center gap-8 text-[15px]">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 py-2 text-ink/90 transition-colors hover:text-ink"
              aria-expanded={shopOpen}
            >
              Shop
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform duration-300 ${shopOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {shopOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full w-48 rounded-2xl bg-cream/95 p-2 shadow-[0_20px_50px_rgba(34,28,40,0.12)] ring-1 ring-ink/5 backdrop-blur-xl"
                >
                  {SHOP_ITEMS.map((item) => (
                    <li key={item}>
                      <a
                        href="#choose"
                        className="block rounded-xl px-4 py-2.5 text-sm text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <a href="#contact" className="hidden py-2 text-ink/90 transition-colors hover:text-ink sm:block">
            Contact
          </a>
        </div>

        {/* center logo */}
        <a href="#" className="absolute left-1/2 -translate-x-1/2" aria-label="Bloom home">
          <Wordmark className="h-6 md:h-7" />
        </a>

        {/* right icons */}
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Account" className="text-ink/80 transition-colors hover:text-ink">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="10" cy="6.5" r="3.25" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3.5 17c1-3.2 3.6-4.5 6.5-4.5s5.5 1.3 6.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#" aria-label="Cart" className="text-ink/80 transition-colors hover:text-ink">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 6.5h12l-.9 10a1.5 1.5 0 0 1-1.5 1.4H6.4a1.5 1.5 0 0 1-1.5-1.4L4 6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M7 8.5v-3a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
