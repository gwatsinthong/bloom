/**
 * Single point of coordination between the preloader and entrance
 * animations: hero copy, nav, etc. wait on this promise so they begin
 * the moment the curtain lifts.
 */
let resolveDone: () => void = () => {};

export const preloaderDone = new Promise<void>((resolve) => {
  resolveDone = resolve;
});

export function markPreloaderDone() {
  resolveDone();
}
