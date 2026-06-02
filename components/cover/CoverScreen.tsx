"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InvitationData } from "@/types/invitation";

interface CoverScreenProps {
  data: InvitationData;
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

// Gold ornamental border SVG
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

// Pre-computed ellipse positions to avoid floating-point server/client mismatch
// angle = i * 60 deg, r = 8, cx_base = 12, cy_base = 12
const CORNER_ELLIPSES = [
  { angle: 0,   cx: 20,    cy: 12,    transform: "rotate(90, 20, 12)" },
  { angle: 60,  cx: 16,    cy: 18.93, transform: "rotate(150, 16, 18.93)" },
  { angle: 120, cx: 8,     cy: 18.93, transform: "rotate(210, 8, 18.93)" },
  { angle: 180, cx: 4,     cy: 12,    transform: "rotate(270, 4, 12)" },
  { angle: 240, cx: 8,     cy: 5.07,  transform: "rotate(330, 8, 5.07)" },
  { angle: 300, cx: 16,    cy: 5.07,  transform: "rotate(30, 16, 5.07)" },
];

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 5 Q20 5 20 20" stroke="#CC9B3F" strokeWidth="1.5" fill="none" />
    <path d="M5 5 Q5 20 20 20" stroke="#CC9B3F" strokeWidth="1.5" fill="none" />
    {CORNER_ELLIPSES.map((e, i) => (
      <ellipse
        key={i}
        cx={e.cx}
        cy={e.cy}
        rx={2.5}
        ry={5}
        fill="#CC9B3F"
        transform={e.transform}
        opacity={0.5}
      />
    ))}
    <circle cx="12" cy="12" r="5" fill="#B5832A" opacity="0.6" />
    <path d="M25 5 Q35 5 35 5" stroke="#CC9B3F" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M5 25 Q5 35 5 35" stroke="#CC9B3F" strokeWidth="1" fill="none" opacity="0.4" />
  </svg>
);

// Deterministic petal sizes — no Math.random() in render
const COVER_PETALS = [
  { id: 0, x: 10, size: 10, delay: 0,   duration: 9  },
  { id: 1, x: 22, size: 13, delay: 0.8, duration: 11 },
  { id: 2, x: 34, size: 9,  delay: 1.6, duration: 10 },
  { id: 3, x: 46, size: 14, delay: 2.4, duration: 12 },
  { id: 4, x: 58, size: 11, delay: 3.2, duration: 9.5},
  { id: 5, x: 70, size: 8,  delay: 4.0, duration: 11 },
  { id: 6, x: 82, size: 12, delay: 4.8, duration: 10 },
  { id: 7, x: 94, size: 10, delay: 5.6, duration: 9  },
];

const FloatingPetalsCover = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {COVER_PETALS.map((p) => (
      <motion.div
        key={p.id}
        className="absolute"
        style={{ left: `${p.x}%`, top: "-5%" }}
        animate={{
          y: ["0vh", "105vh"],
          x: [0, 20, -10, 15, 0],
          rotate: [0, 180, 360],
          opacity: [0, 0.6, 0.4, 0.2, 0],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width={p.size}
          height={p.size * 1.6}
          viewBox="0 0 20 32"
          fill="none"
        >
          <path
            d="M10 2 C15 8, 18 16, 10 30 C2 16, 5 8, 10 2Z"
            fill="#CC9B3F"
            opacity={0.6}
          />
        </svg>
      </motion.div>
    ))}
  </div>
);

export default function CoverScreen({
  data,
  guestName,
  isOpen,
  onOpen,
}: CoverScreenProps) {
  // Parse date server-safe — no locale-dependent formatting on server
  const akadDate = new Date(data.event.akad.dateISO);
  const day = akadDate.toLocaleDateString("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" });
  const dateStr = `${akadDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  })}`;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #fff9f0 0%, #fbecd9 30%, #fff5e4 60%, #fdf0d8 100%)",
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          <FloatingPetalsCover />

          {/* Corner ornaments */}
          <CornerOrnament className="absolute top-4 left-4 w-16 h-16" />
          <div className="absolute top-4 right-4 w-16 h-16" style={{ transform: "scaleX(-1)" }}>
            <CornerOrnament />
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16" style={{ transform: "scaleY(-1)" }}>
            <CornerOrnament />
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16" style={{ transform: "scale(-1)" }}>
            <CornerOrnament />
          </div>

          {/* Side border lines */}
          <div
            className="absolute inset-4 pointer-events-none"
            style={{ border: "1px solid rgba(204,155,63,0.25)", borderRadius: "2px" }}
          />
          <div
            className="absolute inset-6 pointer-events-none"
            style={{ border: "1px solid rgba(204,155,63,0.12)", borderRadius: "2px" }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm w-full">
            {/* Bismillah */}
            <motion.p
              className="animate-bismillah mb-4 text-xl leading-relaxed"
              style={{
                fontFamily: "'Lora', serif",
                color: "#CC9B3F",
                textShadow: "0 0 15px rgba(204,155,63,0.3)",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </motion.p>

            <GoldOrnament className="w-40 mb-5 opacity-60" />

            {/* THE WEDDING OF */}
            <motion.p
              className="tracking-[0.3em] text-xs uppercase mb-1"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#8a6a4a",
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
              className="leading-tight mb-1"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "3rem",
                color: "#CC9B3F",
                textShadow: "0 2px 8px rgba(204,155,63,0.3)",
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
                color: "#B5832A",
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
                fontSize: "3rem",
                color: "#CC9B3F",
                textShadow: "0 2px 8px rgba(204,155,63,0.3)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.75, type: "spring", stiffness: 80 }}
            >
              {data.bride.name.split(",")[0]}
            </motion.h2>

            <GoldOrnament className="w-40 mt-5 mb-5 opacity-60" />

            {/* Date */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                  color: "#8a6a4a",
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
                background: "rgba(204,155,63,0.06)",
                border: "1px solid rgba(204,155,63,0.2)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.8rem",
                  color: "#8a6a4a",
                  letterSpacing: "0.1em",
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
                  color: "#5a3e28",
                  letterSpacing: "0.05em",
                }}
              >
                {guestName}
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.button
              className="btn-gold flex items-center gap-2"
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Buka Undangan</span>
              <ChevronDown size={16} />
            </motion.button>

            <motion.p
              className="mt-4 text-xs"
              style={{ color: "#b5a090", fontFamily: "'Lora', serif", fontStyle: "italic" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              ✦ Tap untuk membuka undangan ✦
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
