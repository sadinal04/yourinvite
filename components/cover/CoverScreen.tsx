"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { InvitationData } from "@/types/invitation";
import Image from "next/image";

interface CoverScreenProps {
  data: InvitationData;
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

// Gold wavy ornament divider
const GoldOrnament = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20 Q25 5 50 20 Q75 35 100 20 Q125 5 150 20 Q175 35 200 20"
      stroke="#CC9B3F"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <circle cx="100" cy="20" r="3" fill="#CC9B3F" opacity="0.8" />
    <circle cx="50" cy="20" r="2" fill="#CC9B3F" opacity="0.5" />
    <circle cx="150" cy="20" r="2" fill="#CC9B3F" opacity="0.5" />
    <circle cx="0" cy="20" r="1.5" fill="#CC9B3F" opacity="0.3" />
    <circle cx="200" cy="20" r="1.5" fill="#CC9B3F" opacity="0.3" />
  </svg>
);

// Multiple butterflies at different positions and sizes
const BUTTERFLY_INSTANCES = [
  { id: 0, size: 90,  delay: 0,   startX: "15%",  duration: 14 },
  { id: 1, size: 65,  delay: 3,   startX: "65%",  duration: 18 },
  { id: 2, size: 75,  delay: 7,   startX: "40%",  duration: 16 },
  { id: 3, size: 55,  delay: 11,  startX: "80%",  duration: 13 },
  { id: 4, size: 80,  delay: 5,   startX: "5%",   duration: 17 },
];

// Butterfly component using CSS-animated SVG (no 3D, works on all browsers)
const ButterflyItem = ({
  size,
  delay,
  startX,
  duration,
}: {
  size: number;
  delay: number;
  startX: string;
  duration: number;
}) => {
  const wingColor = "#CC9B3F";
  const wingHighlight = "#E8C060";

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: startX, bottom: "-80px" }}
      animate={{
        y: [0, -1100],
        x: [0, 30, -20, 40, -10, 25, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Butterfly SVG with wing-flap animation via CSS */}
      <div style={{ width: size, height: size * 0.7 }}>
        <svg
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Left wings */}
          <g style={{ transformOrigin: "60px 40px" }}>
            <motion.g
              animate={{ scaleX: [1, 0.15, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "60px 40px" }}
            >
              {/* Left upper wing */}
              <path
                d="M60 40 C55 20 20 5 5 25 C-5 42 20 58 55 44 Z"
                fill={wingColor}
                opacity={0.85}
              />
              <path
                d="M60 40 C52 22 28 10 12 28 C5 38 28 52 55 44 Z"
                fill={wingHighlight}
                opacity={0.35}
              />
              {/* Left lower wing */}
              <path
                d="M60 42 C50 55 15 65 8 52 C2 42 25 32 58 42 Z"
                fill={wingColor}
                opacity={0.75}
              />
            </motion.g>
          </g>

          {/* Right wings */}
          <g style={{ transformOrigin: "60px 40px" }}>
            <motion.g
              animate={{ scaleX: [1, 0.15, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "60px 40px" }}
            >
              {/* Right upper wing */}
              <path
                d="M60 40 C65 20 100 5 115 25 C125 42 100 58 65 44 Z"
                fill={wingColor}
                opacity={0.85}
              />
              <path
                d="M60 40 C68 22 92 10 108 28 C115 38 92 52 65 44 Z"
                fill={wingHighlight}
                opacity={0.35}
              />
              {/* Right lower wing */}
              <path
                d="M60 42 C70 55 105 65 112 52 C118 42 95 32 62 42 Z"
                fill={wingColor}
                opacity={0.75}
              />
            </motion.g>
          </g>

          {/* Body */}
          <ellipse cx="60" cy="40" rx="3" ry="14" fill="#8a5a10" opacity={0.9} />
          <ellipse cx="60" cy="28" rx="4" ry="5" fill="#6b4410" opacity={0.8} />
          {/* Antennae */}
          <path d="M58 24 C54 16 50 10 48 6" stroke="#8a5a10" strokeWidth="1" fill="none" opacity={0.7} />
          <path d="M62 24 C66 16 70 10 72 6" stroke="#8a5a10" strokeWidth="1" fill="none" opacity={0.7} />
          <circle cx="48" cy="6" r="2" fill="#CC9B3F" opacity={0.8} />
          <circle cx="72" cy="6" r="2" fill="#CC9B3F" opacity={0.8} />
        </svg>
      </div>
    </motion.div>
  );
};

// Floating butterflies layer
const FloatingButterflies = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {BUTTERFLY_INSTANCES.map((b) => (
      <ButterflyItem
        key={b.id}
        size={b.size}
        delay={b.delay}
        startX={b.startX}
        duration={b.duration}
      />
    ))}
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

          {/* Floating butterflies */}
          <FloatingButterflies />

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
              className="mb-3 text-xl leading-relaxed"
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

            <GoldOrnament className="w-44 mb-5 opacity-70" />

            {/* THE WEDDING OF */}
            <motion.p
              className="tracking-[0.3em] text-xs uppercase mb-1"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(224,185,106,0.65)",
                letterSpacing: "0.35em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              THE WEDDING OF
            </motion.p>

            {/* Groom Name */}
            <motion.h1
              className="leading-tight mb-0"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.6rem, 8vw, 3.2rem)",
                color: "#E0B96A",
                textShadow: "0 2px 16px rgba(204,155,63,0.5), 0 0 40px rgba(204,155,63,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.55, type: "spring", stiffness: 80 }}
            >
              {data.groom.name.split(",")[0]}
            </motion.h1>

            {/* Ampersand */}
            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                color: "#CC9B3F",
                lineHeight: 1,
                margin: "0.1rem 0",
                fontStyle: "italic",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              &
            </motion.p>

            {/* Bride Name */}
            <motion.h2
              className="leading-tight"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.6rem, 8vw, 3.2rem)",
                color: "#E0B96A",
                textShadow: "0 2px 16px rgba(204,155,63,0.5), 0 0 40px rgba(204,155,63,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.75, type: "spring", stiffness: 80 }}
            >
              {data.bride.name.split(",")[0]}
            </motion.h2>

            <GoldOrnament className="w-44 mt-5 mb-5 opacity-70" />

            {/* Date */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                  color: "rgba(224,185,106,0.7)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {day}, {dateStr}
              </p>
            </motion.div>

            {/* Guest Card */}
            <motion.div
              className="w-full rounded-xl p-4 mb-6"
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
                  fontSize: "0.75rem",
                  color: "rgba(204,155,63,0.55)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Kepada Yth.
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#E8C878",
                  letterSpacing: "0.04em",
                  textShadow: "0 0 12px rgba(204,155,63,0.3)",
                }}
              >
                {guestName}
              </p>
            </motion.div>

            {/* Open button */}
            <motion.button
              className="btn-gold flex items-center gap-2"
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(204,155,63,0.45)" }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Buka Undangan</span>
              <ChevronDown size={16} />
            </motion.button>

            <motion.p
              className="mt-4 text-xs flex items-center justify-center gap-2"
              style={{
                color: "rgba(204,155,63,0.4)",
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Sparkles size={10} color="rgba(204,155,63,0.35)" />
              Tap untuk membuka undangan
              <Sparkles size={10} color="rgba(204,155,63,0.35)" />
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
