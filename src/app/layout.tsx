import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloom — Sparkling Botanicals for Modern Clarity",
  description:
    "Crafted with floral extracts and micro-botanical blends to elevate calm, focus, and refreshment. Bloom isn't just a drink. It's a shift in pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} antialiased`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
