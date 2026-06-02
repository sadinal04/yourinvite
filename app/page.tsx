import { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "yourinvite | Undangan Digital Premium Mulai 80 Ribu",
  description:
    "Buat undangan pernikahan digital yang elegan & premium. Animasi cantik, musik romantis, countdown live, dan link personal. Mulai dari Rp 80.000. Hubungi kami via WhatsApp!",
  openGraph: {
    title: "yourinvite — Undangan Digital Premium",
    description: "Undangan digital eksklusif untuk momen sakral Anda. Mulai dari Rp 80.000.",
    type: "website",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
