# Bloom — Sparkling Botanicals for Modern Clarity

An award-style marketing site for Bloom botanical sparkling water, built with
Next.js (App Router), GSAP, Motion, and Lenis smooth scrolling. All artwork —
the holographic can, drifting petals, botanical illustrations, and dreamscape
backdrops — is rendered in pure SVG and CSS, no image assets.

## Stack

- **Next.js 16** + React 19 + TypeScript, Tailwind CSS v4
- **GSAP** (ScrollTrigger + SplitText) for scroll choreography and masked
  line reveals
- **Motion** for micro-interactions: magnetic CTAs, hover springs, nav
  dropdown, viewport-staggered reveals
- **Lenis** for smooth scrolling, driven by GSAP's ticker

## Highlights

- Curtain preloader in the brand palette — letter-staggered wordmark,
  000→100 counter, petal drift, curved-hem lift that gates every
  entrance animation
- Custom cursor (quick dot + lagging ring that blooms over links),
  scroll-velocity-reactive serif marquee, rising carbonation bubbles,
  3D pointer-tilt product cards, letter-roll link hovers, hide-on-scroll
  nav, and a scroll-progress blossom that unfurls as you near the end

- Hero with pointer-parallax can, breathing sun glow, twinkling stars,
  drifting mist, and scroll-scrubbed exit
- Deterministic petal fields (seeded PRNG, SSR-safe) that idle-float and
  parallax at per-petal depth
- Word-by-word scrubbed testimonial reveal, sheen-sweep product cards,
  bobbing glass botanical capsules
- Film-grain overlay, `prefers-reduced-motion` respected throughout

## Run

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```
