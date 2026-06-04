"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Pointer } from "lucide-react";
import { InvitationData } from "@/types/invitation";
import Image from "next/image";
import dynamic from "next/dynamic";
import butterflyAnimation from "@/public/lottie/butterfly.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface CoverScreenProps {
  data: InvitationData;
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

// Gold minimalist arch ornament (U shape, curved top, flat bottom)
const GoldArchOrnament = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer arch */}
    <path
      d="M25 60 V32 C25 21.5 31.7 15 40 15 C48.3 15 55 21.5 55 32 V60 H25 Z"
      stroke="#CC9B3F"
      strokeWidth="1.2"
      fill="none"
      opacity="0.75"
    />
    {/* Inner dashed arch */}
    <path
      d="M30 60 V32 C30 25 34.5 20 40 20 C45.5 20 50 25 50 32 V60"
      stroke="#CC9B3F"
      strokeWidth="0.8"
      strokeDasharray="2 2"
      fill="none"
      opacity="0.5"
    />
    {/* Center hanging lantern / dot */}
    <line x1="40" y1="20" x2="40" y2="30" stroke="#CC9B3F" strokeWidth="0.8" opacity="0.5" />
    <circle cx="40" cy="30" r="2.2" fill="#CC9B3F" opacity="0.85" />
    
    {/* Small decorative side lines extending left and right at the bottom */}
    <line x1="12" y1="60" x2="25" y2="60" stroke="#CC9B3F" strokeWidth="1" opacity="0.45" />
    <line x1="55" y1="60" x2="68" y2="60" stroke="#CC9B3F" strokeWidth="1" opacity="0.45" />
    
    {/* Tiny dots on the outer sides */}
    <circle cx="15" cy="60" r="1.5" fill="#CC9B3F" opacity="0.55" />
    <circle cx="65" cy="60" r="1.5" fill="#CC9B3F" opacity="0.55" />
  </svg>
);

const LottieButterflies = () => {
  const [mounted, setMounted] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowSecond(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* First butterfly: bottom-left to top-left */}
      <div 
        className="absolute w-full h-full max-w-[700px] aspect-[700/1000]"
        style={{ filter: "brightness(0) invert(69%) sepia(21%) saturate(1512%) hue-rotate(3deg) brightness(97%) contrast(92%) opacity(0.35)" }}
      >
        <Lottie
          animationData={butterflyAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Second butterfly: mirrored, delayed, bottom-right to top-right */}
      {showSecond && (
        <div 
          className="absolute w-full h-full max-w-[700px] aspect-[700/1000]" 
          style={{ transform: "scaleX(-1)", filter: "brightness(0) invert(69%) sepia(21%) saturate(1512%) hue-rotate(3deg) brightness(97%) contrast(92%) opacity(0.35)" }}
        >
          <Lottie
            animationData={butterflyAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

// ── Falling leaf ──────────────────────────────────────────────────────────────
const LEAVES = [
  { id: 0, x: 12, delay: 0,   size: 22, duration: 12, drift: 55,  rotate: 200 },
  { id: 1, x: 35, delay: 4,   size: 16, duration: 16, drift: -40, rotate: -160 },
  { id: 2, x: 58, delay: 8,   size: 20, duration: 14, drift: 70,  rotate: 240 },
  { id: 3, x: 76, delay: 2,   size: 14, duration: 18, drift: -55, rotate: -200 },
  { id: 4, x: 22, delay: 11,  size: 18, duration: 13, drift: 45,  rotate: 180 },
  { id: 5, x: 88, delay: 6,   size: 15, duration: 15, drift: -35, rotate: -150 },
];

const FallingLeaf = ({ x, delay, size, duration, drift, rotate }: {
  x: number; delay: number; size: number;
  duration: number; drift: number; rotate: number;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: "-40px" }}
    animate={{
      y: ["0px", "110vh"],
      x: [0, drift * 0.4, drift * 0.8, drift * 0.5, drift],
      rotate: [0, rotate * 0.3, rotate * 0.65, rotate],
      opacity: [0, 0.22, 0.22, 0.16, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
      x:      { duration, ease: "easeInOut" },
      rotate: { duration, ease: "easeInOut" },
      opacity: { duration, times: [0, 0.08, 0.8, 0.95, 1] },
    }}
  >
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none">
      {/* Leaf body */}
      <path
        d="M12 2 C20 5 23 13 18 22 C15 27 9 27 6 22 C1 13 4 5 12 2Z"
        fill="#8a7550"
        opacity={0.3}
      />
      {/* Midrib */}
      <path d="M12 4 Q11 14 10 30" stroke="#6e5d3d" strokeWidth="0.9" fill="none" opacity={0.25} />
      {/* Side veins */}
      <path d="M11.5 10 Q8 12 6 15" stroke="#6e5d3d" strokeWidth="0.55" fill="none" opacity={0.2} />
      <path d="M11 16 Q8 18 7 21" stroke="#6e5d3d" strokeWidth="0.55" fill="none" opacity={0.18} />
      <path d="M12 10 Q15 12 17 15" stroke="#6e5d3d" strokeWidth="0.55" fill="none" opacity={0.2} />
      <path d="M11.5 16 Q14 18 16 21" stroke="#6e5d3d" strokeWidth="0.55" fill="none" opacity={0.18} />
      {/* Stem */}
      <path d="M10 30 Q11 33 12 34" stroke="#6e5d3d" strokeWidth="1" fill="none" opacity={0.22} />
    </svg>
  </motion.div>
);

// ── Cover ambient layer (butterflies + leaves, only shown on cover) ────────────
const CoverAmbient = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Falling leaves */}
    {LEAVES.map((l) => <FallingLeaf key={l.id} {...l} />)}
    {/* Horizontal butterflies — rendered on top of leaves */}
    <LottieButterflies />
  </div>
);



// Shimmer gold particles
const SHIMMER_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: ((i * 4.7 + 2) % 95).toFixed(1),
  top: ((i * 6.3 + 5) % 90).toFixed(1),
  size: (1 + (i % 3) * 0.8).toFixed(1),
  dur: 2.5 + (i % 5) * 0.6,
  delay: (i * 0.35) % 4,
}));

export default function CoverScreen({
  data,
  guestName,
  isOpen,
  onOpen,
}: CoverScreenProps) {
  const akadDate = new Date(data.event.akad.dateISO);
  const day = akadDate.toLocaleDateString("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" });
  const dateStr = akadDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0d0804 0%, #1a0f05 35%, #150c04 65%, #0a0603 100%)",
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          {/* Radial golden glow center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(204,155,63,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Gold shimmer particles */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {SHIMMER_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: "#CC9B3F",
                }}
                animate={{ opacity: [0.05, 0.55, 0.05], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </div>

          {/* Butterflies (horizontal) + falling leaves */}
          <CoverAmbient />

          {/* ─── Corner Floral Ornaments (goldfloral.png) ─── */}
          {/* Top-left */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width: "min(42vw, 220px)", height: "min(42vw, 220px)", transform: "rotate(180deg)" }}
          >
            <Image
              src="/desain/goldfloral.png"
              alt=""
              fill
              sizes="(max-width: 768px) 42vw, 220px"
              style={{ objectFit: "contain", opacity: 0.75 }}
              priority
            />
          </div>

          {/* Top-right */}
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{ width: "min(42vw, 220px)", height: "min(42vw, 220px)", transform: "rotate(270deg)" }}
          >
            <Image
              src="/desain/goldfloral.png"
              alt=""
              fill
              sizes="(max-width: 768px) 42vw, 220px"
              style={{ objectFit: "contain", opacity: 0.75 }}
            />
          </div>

          {/* Bottom-left */}
          <div
            className="absolute bottom-0 left-0 pointer-events-none"
            style={{ width: "min(42vw, 220px)", height: "min(42vw, 220px)", transform: "rotate(90deg)" }}
          >
            <Image
              src="/desain/goldfloral.png"
              alt=""
              fill
              sizes="(max-width: 768px) 42vw, 220px"
              style={{ objectFit: "contain", opacity: 0.75 }}
            />
          </div>

          {/* Bottom-right */}
          <div
            className="absolute bottom-0 right-0 pointer-events-none"
            style={{ width: "min(42vw, 220px)", height: "min(42vw, 220px)", transform: "rotate(0deg)" }}
          >
            <Image
              src="/desain/goldfloral.png"
              alt=""
              fill
              sizes="(max-width: 768px) 42vw, 220px"
              style={{ objectFit: "contain", opacity: 0.75 }}
            />
          </div>

          {/* Double border frame */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "min(6vw, 28px)",
              border: "1px solid rgba(204,155,63,0.22)",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "min(8.5vw, 40px)",
              border: "1px solid rgba(204,155,63,0.1)",
              borderRadius: "2px",
            }}
          />

          {/* ─── Main content ─── */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm w-full">

            {/* Bismillah */}
            <motion.p
              className="mb-2 text-xl leading-relaxed"
              style={{
                fontFamily: "'Lora', serif",
                color: "#CC9B3F",
                textShadow: "0 0 20px rgba(204,155,63,0.5), 0 0 40px rgba(204,155,63,0.2)",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </motion.p>

            {/* Arched Doorway Card enclosing the names and date */}
            <motion.div
              className="relative w-full max-w-[290px] mt-1.5 mb-4 flex flex-col items-center text-center px-5 pt-10 pb-7"
              style={{
                background: "linear-gradient(180deg, rgba(204,155,63,0.08) 0%, rgba(13,8,4,0.48) 100%)",
                border: "1.5px solid rgba(204,155,63,0.28)",
                borderTopLeftRadius: "145px",
                borderTopRightRadius: "145px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 0 25px rgba(204,155,63,0.04)",
              }}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Inner thin decorative arch border */}
              <div 
                className="absolute inset-[5px] pointer-events-none"
                style={{
                  border: "1px solid rgba(204,155,63,0.12)",
                  borderTopLeftRadius: "140px",
                  borderTopRightRadius: "140px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              />

              {/* THE WEDDING OF */}
              <motion.p
                className="tracking-[0.3em] text-[10px] uppercase mb-1.5 relative z-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(224,185,106,0.65)",
                  letterSpacing: "0.35em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                THE WEDDING OF
              </motion.p>

              {/* Groom Name */}
              <motion.h1
                className="leading-tight mb-0 relative z-10"
                style={{
                  fontFamily: "'Italianno', cursive",
                  fontSize: "clamp(2.7rem, 8.5vw, 3.2rem)",
                  color: "#E0B96A",
                  textShadow: "0 2px 16px rgba(204,155,63,0.4), 0 0 30px rgba(204,155,63,0.15)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.55, type: "spring", stiffness: 80 }}
              >
                {data.groom.name.split(",")[0]}
              </motion.h1>

              {/* Ampersand */}
              <motion.p
                className="relative z-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  color: "#CC9B3F",
                  lineHeight: 1,
                  margin: "0.15rem 0",
                  fontStyle: "italic",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                &
              </motion.p>

              {/* Bride Name */}
              <motion.h2
                className="leading-tight relative z-10"
                style={{
                  fontFamily: "'Italianno', cursive",
                  fontSize: "clamp(2.7rem, 8.5vw, 3.2rem)",
                  color: "#E0B96A",
                  textShadow: "0 2px 16px rgba(204,155,63,0.4), 0 0 30px rgba(204,155,63,0.15)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.75, type: "spring", stiffness: 80 }}
              >
                {data.bride.name.split(",")[0]}
              </motion.h2>

              {/* Simple gold divider line */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#CC9B3F] to-transparent my-4 opacity-40 relative z-10" />

              {/* Date */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.85 }}
              >
                <p
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#E8C878",
                    letterSpacing: "0.05em",
                  }}
                >
                  {day}, {dateStr}
                </p>
              </motion.div>
            </motion.div>

            {/* Guest Card */}
            <motion.div
              className="w-full max-w-[290px] rounded-xl py-2.5 px-4 mb-4"
              style={{
                background: "rgba(204,155,63,0.08)",
                border: "1px solid rgba(204,155,63,0.25)",
                boxShadow: "0 0 20px rgba(204,155,63,0.06) inset",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.7rem",
                  color: "rgba(204,155,63,0.55)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.15rem",
                }}
              >
                Kepada Yth.
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#E8C878",
                  letterSpacing: "0.04em",
                  textShadow: "0 0 12px rgba(204,155,63,0.3)",
                }}
              >
                {guestName}
              </p>
            </motion.div>

            {/* Open button with pointing hand guide */}
            <div className="relative">
              <motion.button
                className="btn-gold flex items-center gap-2 py-2 px-6 text-sm relative z-10"
                onClick={onOpen}
                initial={{ opacity: 0, y: 20, scale: 1 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: [1, 1, 0.95, 1, 1],
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 1.2 },
                  y: { duration: 0.7, delay: 1.2 },
                  scale: {
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    delay: 1.5,
                    ease: "easeInOut",
                  }
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(204,155,63,0.45)" }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Buka Undangan</span>
                <ChevronDown size={14} />
              </motion.button>

              {/* Pointing hand guide animation */}
              <motion.div
                className="absolute pointer-events-none z-20"
                style={{
                  bottom: "-12px",
                  right: "-15px",
                  color: "#E8C878",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1.1, 0.92, 1.1, 0.8],
                  x: [8, 0, -3, 0, 8],
                  y: [8, 0, -3, 0, 8],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                {/* Clicking ripple effect */}
                <motion.div
                  className="absolute rounded-full border border-[#E8C878] pointer-events-none"
                  style={{
                    width: "24px",
                    height: "24px",
                    left: "-2px",
                    top: "-2px",
                    transformOrigin: "center",
                  }}
                  animate={{
                    scale: [0.8, 1.8],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    ease: "easeOut",
                    delay: 2.6, // Trigger right when the hand taps
                  }}
                />
                <Pointer size={22} style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))", transform: "rotate(-10deg)" }} />
              </motion.div>
            </div>

            {/* Tap Instruction */}
            <motion.p
              className="mt-2 text-[11px]"
              style={{
                color: "rgba(204,155,63,0.4)",
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Tap untuk membuka undangan
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
