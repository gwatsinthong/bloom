/**
 * Letter-roll hover: the label slides up out of a mask while a twin
 * copy rolls in from below. Pure CSS via group-hover — wrap the
 * trigger element with the `group` class.
 */
export default function RollText({ children }: { children: string }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="block transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}
