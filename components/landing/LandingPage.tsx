"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle, Palette, Rocket, Sparkles, Music, Timer,
  MapPin, Smartphone, Link2, Wand2, Mail, CheckCircle, Star,
  ArrowRight, ChevronDown, ShieldCheck, Heart,
} from "lucide-react";

// ─── WA Config ────────────────────────────────────────────────────────────────
const WA_NUMBER = "6285337342258";
const WA_MESSAGE = encodeURIComponent(
  "Halo kak, saya tertarik ingin berkonsultasi mengenai pembuatan undangan digital. Boleh minta info lebih lanjut mengenai paket dan harganya?"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// ─── ease as const tuple so TS is happy with Framer Motion v12 ────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Floating orbs ────────────────────────────────────────────────────────────
const ORBS = [
  { w: 320, h: 320, top: "-10%", left: "-8%", delay: 0 },
  { w: 250, h: 250, top: "60%", right: "-6%", delay: 1.5 },
  { w: 180, h: 180, top: "30%", left: "50%", delay: 3 },
  { w: 140, h: 140, top: "80%", left: "10%", delay: 0.8 },
] as const;

// ─── Particles (deterministic, no window) ─────────────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: (i * 4.16) % 100,
  delay: (i * 0.3) % 5,
  duration: 6 + (i % 4),
  size: 4 + (i % 5),
}));

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    Icon: MessageCircle,
    title: "Hubungi Kami",
    desc: "Chat via WhatsApp, ceritakan detail pernikahan Anda — nama, tanggal, lokasi, dan tema yang diinginkan.",
  },
  {
    Icon: Palette,
    title: "Desain Eksklusif",
    desc: "Tim kami merancang undangan digital premium khusus untuk Anda dalam waktu 1×24 jam.",
  },
  {
    Icon: Rocket,
    title: "Langsung Live",
    desc: "Undangan siap diakses lewat link cantik yang bisa langsung dibagikan ke seluruh tamu.",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: Sparkles, text: "Desain premium eksklusif" },
  { Icon: Music,    text: "Musik latar romantis" },
  { Icon: Timer,    text: "Countdown timer live" },
  { Icon: MapPin,   text: "Integrasi Google Maps" },
  { Icon: Smartphone, text: "Mobile-first & responsif" },
  { Icon: Link2,    text: "Link undangan personal" },
  { Icon: Wand2,    text: "Animasi scroll premium" },
  { Icon: Mail,     text: "Nama tamu personal (?to=)" },
];

// ─── Single testimonial ───────────────────────────────────────────────────────
const TESTIMONIAL = {
  name: "Haris & Cut Chairunnisa",
  text: "Sangat puas! Undangannya premium banget, animasinya smooth dan musik latarnya bikin hati adem. Link langsung bisa dibagikan ke grup WhatsApp dan tamu-tamu pun bisa lihat semua info lengkap. Terima kasih yourinvite!",
  loc: "Bireuen, Aceh",
  link: "/haris-icut",
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── WhatsApp Icon SVG ────────────────────────────────────────────────────────
function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Helper: Reveal section ───────────────────────────────────────────────────
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Leaf SVG ────────────────────────────────────────────────────────────────
const Leaf = ({ size = 20, opacity = 0.3, rotate = 0 }: { size?: number; opacity?: number; rotate?: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <path d="M10 2 C16 8 18 18 10 26 C2 18 4 8 10 2Z" fill="#10b981" />
    <path d="M10 6 C13 11 14 19 10 24 C6 19 7 11 10 6Z" fill="#6ee7b7" opacity={0.6} />
  </svg>
);

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div variants={fadeRight} className="relative mx-auto" style={{ width: 240, perspective: "1000px" }}>
      <motion.div
        animate={{ rotateY: [-4, 4, -4], rotateX: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Phone frame */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            width: 240, height: 490, background: "#064e3b",
            boxShadow: "0 40px 80px rgba(6,78,59,0.5), 0 0 0 2px #10b981, inset 0 0 0 1px rgba(110,231,183,0.3)",
          }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10" style={{ background: "#064e3b" }} />
          <div className="absolute inset-0 m-1 rounded-[2.2rem] overflow-hidden" style={{ background: "#0d0804" }}>
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-5"
              style={{ background: "linear-gradient(180deg, #1a0f05 0%, #0d0804 100%)" }}>
              
              {/* Corner Ornaments */}
              <div className="absolute top-1 left-1 w-24 h-24 opacity-80" style={{ transform: "rotate(180deg)" }}>
                <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="absolute top-1 right-1 w-24 h-24 opacity-80" style={{ transform: "rotate(270deg)" }}>
                <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="absolute bottom-1 left-1 w-24 h-24 opacity-80" style={{ transform: "rotate(90deg)" }}>
                <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="absolute bottom-1 right-1 w-24 h-24 opacity-80" style={{ transform: "rotate(0deg)" }}>
                <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
              </div>

              {/* Thin Border Frame */}
              <div className="absolute inset-2 border border-[rgba(204,155,63,0.25)] pointer-events-none rounded-[1.8rem]" />

              {/* Content Container (pt-8 clears the notch) */}
              <div className="relative z-10 w-full flex flex-col items-center pt-8 pb-3">
                {/* Bismillah */}
                <p className="text-[12px] mb-4 text-center" style={{ color: "#CC9B3F", fontFamily: "serif" }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
                
                {/* Arch Container */}
                <div className="relative w-[90%] border border-[rgba(204,155,63,0.3)] border-b-0 rounded-t-[100px] flex flex-col items-center pt-6 pb-5 px-2" style={{ background: "rgba(204,155,63,0.02)" }}>
                  <p className="text-[7px] mb-2 tracking-[0.2em] text-center" style={{ color: "#B5832A", fontFamily: "serif" }}>THE WEDDING OF</p>
                  
                  <p className="font-bold text-[32px] text-center" style={{ color: "#CC9B3F", fontFamily: "'Italianno', cursive", lineHeight: 0.9 }}>Haris Akbar</p>
                  <p style={{ color: "#E0B96A", fontSize: 18, fontFamily: "'Italianno', cursive", margin: "2px 0" }}>&</p>
                  <p className="font-bold text-[32px] text-center" style={{ color: "#CC9B3F", fontFamily: "'Italianno', cursive", lineHeight: 0.9 }}>Cut Chairunnisa</p>
                  
                  <p className="mt-6 font-bold text-center" style={{ color: "#E0B96A", fontSize: 10, letterSpacing: "0.05em", fontFamily: "serif" }}>Kamis, 2 Juli 2026</p>
                </div>
                
                {/* Tamu Box */}
                <div className="w-[90%] mt-4 py-2.5 border border-[rgba(204,155,63,0.2)] rounded-xl flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                   <p className="text-[7px] tracking-[0.2em] mb-1 opacity-70 text-center" style={{ color: "#CC9B3F", fontFamily: "serif" }}>KEPADA YTH.</p>
                   <p className="font-bold text-[12px] text-center" style={{ color: "#E0B96A", fontFamily: "serif" }}>Tamu Undangan</p>
                </div>
                
                {/* Button */}
                <div className="mt-4 w-[80%] py-2.5 rounded-full text-white font-bold flex items-center justify-center gap-1.5"
                  style={{ background: "linear-gradient(135deg, #CC9B3F, #996e23)", fontSize: 10, letterSpacing: "0.05em", boxShadow: "0 0 20px rgba(204,155,63,0.3)", color: "#fff" }}>
                  Buka Undangan <ChevronDown size={12} />
                </div>
                
                <p className="mt-3 text-[8px] italic opacity-60 text-center" style={{ color: "#CC9B3F", fontFamily: "serif" }}>Tap untuk membuka undangan</p>
              </div>
            </div>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 -z-10 rounded-full"
          style={{ filter: "blur(40px)", background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)", transform: "scale(1.2) translateY(10%)" }} />
      </motion.div>

      {/* Floating leaves */}
      <motion.div className="absolute -top-4 -left-6" animate={{ y: [-6, 6, -6], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <Leaf size={28} opacity={0.6} rotate={-30} />
      </motion.div>
      <motion.div className="absolute -bottom-2 -right-4" animate={{ y: [6, -6, 6], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <Leaf size={22} opacity={0.5} rotate={40} />
      </motion.div>
      <motion.div className="absolute top-1/2 -right-8" animate={{ y: [-4, 4, -4], rotate: [10, -5, 10] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <Leaf size={18} opacity={0.4} rotate={60} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // ping dot animation state
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", overflowX: "hidden" }}>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3"
        style={{ background: "rgba(6,78,59,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(110,231,183,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <Image src="/icon/icon.png" alt="yourinvite" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ color: "#d1fae5", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", fontFamily: "sans-serif" }}>
            yourinvite
          </span>
        </div>
        <motion.a href={WA_URL} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold"
          style={{ background: "linear-gradient(135deg, #10b981, #064e3b)", color: "#d1fae5", fontSize: 13, fontFamily: "sans-serif" }}>
          <WaIcon size={15} />
          Konsultasi Gratis
        </motion.a>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)" }}>
        {/* BG orbs */}
        {ORBS.map((orb, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: orb.w, height: orb.h, top: orb.top,
              left: "left" in orb ? orb.left : undefined,
              right: "right" in orb ? orb.right : undefined }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}>
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />
          </motion.div>
        ))}

        {/* Particles */}
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute rounded-full pointer-events-none"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: -20, background: "rgba(110,231,183,0.6)" }}
            animate={{ y: [0, -900, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
        ))}

        {/* Content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-6xl mx-auto px-5 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm"
              style={{ background: "rgba(110,231,183,0.15)", border: "1px solid rgba(110,231,183,0.3)", color: "#6ee7b7", fontFamily: "sans-serif" }}>
              {mounted && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "#34d399" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#34d399" }} />
                </span>
              )}
              Buka Pesanan Sekarang
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
              className="font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", color: "#d1fae5", letterSpacing: "-0.03em" }}>
              Undangan Digital
              <br />
              <span style={{
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(135deg, #6ee7b7, #d1fae5, #34d399)",
                backgroundClip: "text",
              }}>
                Premium & Elegan
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(209,250,229,0.75)", maxWidth: 420 }}>
              Rayakan momen sakral pernikahan Anda dengan undangan digital berkelas — animasi premium, musik romantis, dan link personal yang siap dibagikan ke seluruh tamu.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4">
              <motion.a href={WA_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(16,185,129,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-base"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", boxShadow: "0 8px 24px rgba(16,185,129,0.4)", fontFamily: "sans-serif" }}>
                <WaIcon size={20} />
                Pesan via WhatsApp
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/haris-icut"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-base"
                  style={{ border: "1.5px solid rgba(110,231,183,0.4)", color: "#6ee7b7", background: "rgba(110,231,183,0.05)", fontFamily: "sans-serif" }}>
                  Lihat Contoh <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-6 flex items-center gap-2">
              <CheckCircle size={16} color="#10b981" />
              <span style={{ color: "rgba(209,250,229,0.65)", fontSize: 14, fontFamily: "sans-serif" }}>
                Mulai dari <strong style={{ color: "#6ee7b7" }}>Rp 80.000</strong> — tanpa biaya tersembunyi
              </span>
            </motion.div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <PhoneMockup />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <span style={{ color: "rgba(209,250,229,0.4)", fontSize: 11, letterSpacing: "0.15em", fontFamily: "sans-serif" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(110,231,183,0.5), transparent)" }} />
          <ChevronDown size={14} color="rgba(209,250,229,0.3)" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: "#064e3b", borderTop: "1px solid rgba(110,231,183,0.1)", borderBottom: "1px solid rgba(110,231,183,0.1)" }}>
        <RevealSection className="max-w-4xl mx-auto px-5 py-10 grid grid-cols-3 gap-8 text-center">
          {[
            { num: "80k", label: "Mulai Dari" },
            { num: "24 Jam", label: "Waktu Pengerjaan" },
            { num: "5.0 ★", label: "Rating Kepuasan" },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <p className="font-bold text-2xl md:text-3xl" style={{ color: "#6ee7b7", fontFamily: "sans-serif" }}>{s.num}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(209,250,229,0.55)", letterSpacing: "0.05em", fontFamily: "sans-serif" }}>{s.label}</p>
            </motion.div>
          ))}
        </RevealSection>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#f0fdf4", padding: "6rem 1.25rem" }}>
        <RevealSection className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: "#d1fae5", color: "#065f46", fontFamily: "sans-serif" }}>Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#064e3b" }}>
              Mudah dalam 3 Langkah
            </h2>
            <p className="mt-3 text-base" style={{ color: "#6b7280", maxWidth: 400, margin: "0.75rem auto 0" }}>
              Dari konsultasi hingga link undangan live — cukup dalam 24 jam.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl p-7"
                style={{ background: "#fff", border: "1.5px solid rgba(110,231,183,0.3)" }}>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#10b981", color: "#fff", fontFamily: "sans-serif" }}>
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}>
                  <step.Icon size={24} color="#065f46" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#064e3b", fontFamily: "sans-serif" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)", padding: "6rem 1.25rem" }}>
        <RevealSection className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: "rgba(110,231,183,0.15)", color: "#6ee7b7", border: "1px solid rgba(110,231,183,0.3)", fontFamily: "sans-serif" }}>
              Contoh Nyata
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#d1fae5" }}>
              Lihat Hasilnya Sendiri
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(209,250,229,0.65)", maxWidth: 400, margin: "0.75rem auto 0" }}>
              Ini adalah contoh undangan digital yang sudah kami buat — premium, elegan, dan penuh animasi.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(110,231,183,0.2)", padding: "2rem 1.5rem" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                  <span style={{ color: "#6ee7b7", fontSize: 13, fontFamily: "sans-serif" }}>Live Preview</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#d1fae5" }}>
                  Haris & Cut Chairunnisa
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(209,250,229,0.65)", lineHeight: 1.8 }}>
                  Undangan pernikahan tema <strong style={{ color: "#6ee7b7" }}>Sunflower Gold Luxury</strong> dengan countdown live, musik latar, peta lokasi, dan animasi scroll yang memukau.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: <Sparkles size={12} />, text: "Sunflower Theme" },
                    { icon: <Music size={12} />, text: "Musik Latar" },
                    { icon: <Timer size={12} />, text: "Countdown Live" },
                    { icon: <MapPin size={12} />, text: "Peta Lokasi" },
                  ].map((f, i) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                      style={{ background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.25)", color: "#6ee7b7", fontFamily: "sans-serif" }}>
                      {f.icon} {f.text}
                    </span>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/haris-icut" target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", boxShadow: "0 8px 20px rgba(16,185,129,0.3)", fontFamily: "sans-serif" }}>
                    Buka Contoh Undangan
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* URL bar */}
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(110,231,183,0.2)" }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
                  <div className="flex-1 mx-3 px-3 py-1 rounded text-xs"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(209,250,229,0.5)", fontFamily: "monospace" }}>
                    yourinvite.site/haris-icut
                  </div>
                </div>
                <div className="p-6 text-center" style={{ background: "rgba(209,250,229,0.03)" }}>
                  <div className="flex items-center gap-1.5" style={{ color: "rgba(209,250,229,0.4)", fontSize: 13, marginBottom: 12, fontFamily: "sans-serif" }}>
                    <ShieldCheck size={13} /> Undangan aman &amp; personal
                  </div>
                  <div className="text-lg font-bold mb-1" style={{ color: "#d1fae5", fontFamily: "monospace" }}>yourinvite.site</div>
                  <div className="text-xl font-bold" style={{ color: "#6ee7b7", fontFamily: "monospace" }}>/haris-icut</div>
                  <div className="mt-3 text-xs" style={{ color: "rgba(209,250,229,0.4)", fontFamily: "sans-serif" }}>
                    Tambah nama tamu: <span style={{ color: "#6ee7b7", fontFamily: "monospace" }}>?to=NamaTamu</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </RevealSection>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: "#f0fdf4", padding: "6rem 1.25rem" }}>
        <RevealSection className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: "#d1fae5", color: "#065f46", fontFamily: "sans-serif" }}>Harga Terjangkau</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#064e3b" }}>
              Investasi Terbaik untuk
              <br />Momen Sekali Seumur Hidup
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #064e3b, #047857)", boxShadow: "0 40px 80px rgba(6,78,59,0.3)" }}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />
            </div>

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-widest mb-2"
                style={{ color: "rgba(209,250,229,0.6)", fontFamily: "sans-serif" }}>Mulai dari</p>
              <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <span className="font-bold" style={{ fontSize: "clamp(3rem, 10vw, 5rem)", color: "#d1fae5", letterSpacing: "-0.04em" }}>
                  Rp 80K
                </span>
              </motion.div>
              <p className="mt-2 mb-8" style={{ color: "rgba(209,250,229,0.65)", fontFamily: "sans-serif" }}>
                Pembayaran sekali, undangan aktif selama acara berlangsung
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {FEATURES.map((f, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                    style={{ background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.2)", color: "#d1fae5", fontFamily: "sans-serif" }}>
                    <f.Icon size={14} color="#6ee7b7" />
                    <span style={{ fontSize: 12 }}>{f.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a href={WA_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(110,231,183,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base"
                style={{ background: "linear-gradient(135deg, #6ee7b7, #10b981)", color: "#064e3b", boxShadow: "0 8px 30px rgba(110,231,183,0.3)", fontFamily: "sans-serif" }}>
                <WaIcon size={20} />
                Pesan Sekarang — Gratis Konsultasi
              </motion.a>

              <p className="mt-4 text-xs" style={{ color: "rgba(209,250,229,0.4)", fontFamily: "sans-serif" }}>
                Tidak ada kontrak. Tidak ada biaya tersembunyi. Bayar setelah puas dengan desain.
              </p>
            </div>
          </motion.div>
        </RevealSection>
      </section>

      {/* ── TESTIMONIAL (single) ── */}
      <section style={{ background: "#ecfdf5", padding: "5rem 1.25rem" }}>
        <RevealSection className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: "#d1fae5", color: "#065f46", fontFamily: "sans-serif" }}>Testimoni</span>
            <h2 className="text-3xl font-bold" style={{ color: "#064e3b" }}>Kata Mereka</h2>
          </motion.div>

          <motion.div variants={fadeUp}
            className="rounded-2xl p-8 text-left"
            style={{ background: "#fff", border: "1.5px solid rgba(110,231,183,0.3)", boxShadow: "0 10px 30px rgba(6,78,59,0.08)" }}>
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#10b981" color="#10b981" />)}
            </div>
            <p className="text-base italic mb-6" style={{ color: "#374151", lineHeight: 1.9 }}>
              &ldquo;{TESTIMONIAL.text}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #10b981, #064e3b)", color: "#fff", fontFamily: "sans-serif" }}>
                  H
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#064e3b", fontFamily: "sans-serif" }}>{TESTIMONIAL.name}</p>
                  <p className="text-xs" style={{ color: "#9ca3af", fontFamily: "sans-serif" }}>{TESTIMONIAL.loc}</p>
                </div>
              </div>
              <Link href={TESTIMONIAL.link} target="_blank"
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: "#10b981", fontFamily: "sans-serif" }}>
                Lihat undangan <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </RevealSection>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #064e3b, #022c22)", padding: "6rem 1.25rem", textAlign: "center" }}>
        <RevealSection className="max-w-2xl mx-auto">
          <motion.div variants={fadeUp} className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(110,231,183,0.15)", border: "1px solid rgba(110,231,183,0.3)" }}>
                <Sparkles size={32} color="#6ee7b7" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#d1fae5" }}>
              Siap Membuat Undangan<br />Impian Anda?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(209,250,229,0.6)", fontFamily: "sans-serif" }}>
              Hubungi kami sekarang dan dapatkan konsultasi gratis. Tim kami siap membantu mewujudkan undangan digital yang berkesan.
            </p>
            <motion.a href={WA_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(16,185,129,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", boxShadow: "0 8px 30px rgba(16,185,129,0.4)", fontFamily: "sans-serif" }}>
              <WaIcon size={22} />
              Chat WhatsApp Sekarang
            </motion.a>
            <p className="mt-4 text-sm" style={{ color: "rgba(209,250,229,0.35)", fontFamily: "sans-serif" }}>
              085337342258 · Senin – Minggu · 08.00 – 22.00 WIB
            </p>
          </motion.div>
        </RevealSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#021a12", borderTop: "1px solid rgba(110,231,183,0.08)", padding: "2rem 1.25rem" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Image src="/icon/icon.png" alt="yourinvite" width={24} height={24} style={{ borderRadius: 6, opacity: 0.7 }} />
            <span style={{ color: "rgba(209,250,229,0.5)", fontFamily: "sans-serif" }}>yourinvite — Undangan Digital Premium</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "rgba(209,250,229,0.35)", fontSize: 13, fontFamily: "sans-serif" }}>
            <span>Powered by</span>
            <a href="https://cobabantu.com" target="_blank" rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: "#6ee7b7", marginLeft: 4 }}>
              cobabantu.com
            </a>
          </div>
          <div style={{ color: "rgba(209,250,229,0.25)", fontSize: 12, fontFamily: "sans-serif" }}>
            © {new Date().getFullYear()} yourinvite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
