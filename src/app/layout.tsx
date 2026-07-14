import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://above-almaty-concept.vercel.app"),
  title: "The Ritz-Carlton, Almaty — Independent Concept",
  description:
    "A cinematic 3D portfolio concept inspired by a stay above Almaty. Not an official booking website.",
  applicationName: "Above Almaty Concept",
  openGraph: {
    title: "The Ritz-Carlton, Almaty — Independent Concept",
    description: "A cinematic journey from the city to the Sky Lobby.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Above Almaty — Independent Hotel Concept",
    description: "A scroll-driven 3D portfolio experience.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111413",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
