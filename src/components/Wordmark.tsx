/**
 * The BLOOM wordmark — serif caps with the two O's interlocked,
 * echoing the can label.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display inline-flex items-baseline leading-none select-none ${className}`}
      aria-label="Bloom"
    >
      <span>BL</span>
      <span>O</span>
      <span className="-ml-[0.34em]">O</span>
      <span>M</span>
    </span>
  );
}
