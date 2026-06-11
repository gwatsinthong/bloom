import Image from "next/image";
import wordmark from "../../resources/bloom.png";

/** The BLOOM wordmark — serif caps with the two O's interlocked. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={wordmark}
      alt="Bloom"
      className={`w-auto select-none ${className}`}
    />
  );
}
