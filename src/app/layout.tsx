import type { Metadata } from "next";
import { Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";

const hedvig = Hedvig_Letters_Serif({
  variable: "--font-hedvig",
  weight: "400",
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
    <html lang="en" className={`${hedvig.variable} antialiased`}>
      <body className="grain">{children}</body>
    </html>
  );
}
