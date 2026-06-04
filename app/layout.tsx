import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Lora,
  Italianno,
} from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#CC9B3F",
};

export const metadata: Metadata = {
  title: {
    default: "yourinvite | buat undangan digital",
    template: "%s | yourinvite",
  },
  description: "Undangan Pernikahan Digital — Sunflower Gold Luxury",
  icons: {
    icon: "/icon/icon.png",
    shortcut: "/icon/icon.png",
    apple: "/icon/icon.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${lora.variable} ${italianno.variable} bg-[#110a06] flex justify-center min-h-[100dvh]`}
      >
        <div 
          className="relative w-full max-w-[480px] min-h-[100dvh] bg-white shadow-2xl overflow-x-hidden"
          style={{ 
            // This CSS trick forces fixed-position children (like CoverScreen and MusicController)
            // to be constrained within this max-w container instead of the whole viewport.
            transform: "translateZ(0)" 
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
