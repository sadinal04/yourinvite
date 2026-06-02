"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { useCountdown } from "@/hooks/useCountdown";
import { fadeDown, fadeUp, zoomIn, zoomInUp, staggerContainer, SectionLabel } from "@/components/ui/Animations";
import { useMemo } from "react";

interface CountdownSectionProps {
  data: InvitationData;
}

const SHIMMER_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  width: (((i * 7 + 3) % 3) + 1).toFixed(1),
  left: ((i * 4.7 + 2) % 98).toFixed(1),
  top: ((i * 6.1 + 5) % 95).toFixed(1),
  duration: 2 + (i % 3) * 0.7,
  delay: (i * 0.3) % 3,
}));

const CountdownBox = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="countdown-box flex-1"
    variants={zoomInUp}
    whileHover={{ scale: 1.06, y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.p
      key={value}
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "2.4rem",
        fontWeight: 700,
        color: "#CC9B3F",
        lineHeight: 1,
        textShadow: "0 0 12px rgba(204,155,63,0.4)",
      }}
    >
      {String(value).padStart(2, "0")}
    </motion.p>
    <p className="text-xs mt-1"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(224,185,106,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
      {label}
    </p>
  </motion.div>
);

const Colon = () => (
  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#CC9B3F", alignSelf: "flex-start", paddingTop: "0.2rem", opacity: 0.6 }}>:</div>
);

export default function CountdownSection({ data }: CountdownSectionProps) {
  const countdown = useCountdown(data.event.akad.dateISO);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const formatted = useMemo(() => {
    const d = new Date(data.event.akad.dateISO);
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  }, [data.event.akad.dateISO]);

  return (
    <section
      ref={ref}
      id="countdown"
      className="section-px py-14 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #5a3e28 0%, #3a2510 50%, #2a1a0a 100%)" }}
    >
      {/* Shimmer particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {SHIMMER_PARTICLES.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full"
            style={{ width: `${p.width}px`, height: `${p.width}px`, left: `${p.left}%`, top: `${p.top}%`, background: "#CC9B3F" }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* Big faded sunflower */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]" aria-hidden="true">
        <svg width="340" height="340" viewBox="0 0 200 200">
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * 360) / 16;
            return (
              <ellipse key={i}
                cx={100 + 65 * Math.cos((angle * Math.PI) / 180)}
                cy={100 + 65 * Math.sin((angle * Math.PI) / 180)}
                rx={12} ry={30} fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${100 + 65 * Math.cos((angle * Math.PI) / 180)}, ${100 + 65 * Math.sin((angle * Math.PI) / 180)})`}
              />
            );
          })}
          <circle cx="100" cy="100" r="30" fill="#CC9B3F" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.p variants={fadeDown}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.35em", color: "rgba(204,155,63,0.8)", textTransform: "uppercase" }}>
          ✦ Menuju Hari Bahagia ✦
        </motion.p>

        <motion.h2 variants={zoomIn} className="mt-2 mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#E0B96A", fontStyle: "italic" }}>
          Hitung Mundur
        </motion.h2>

        <motion.p variants={fadeUp} className="text-xs mb-8"
          style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.65)" }}>
          {formatted}
        </motion.p>
      </motion.div>

      {/* Countdown boxes */}
      {countdown.isPast ? (
        <motion.div className="text-center relative z-10" variants={zoomIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.8rem", color: "#CC9B3F" }}>Alhamdulillah</p>
          <p className="text-sm mt-2" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.8)", fontStyle: "italic" }}>
            Semoga menjadi keluarga sakinah mawaddah warahmah
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="flex gap-2 justify-center relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <CountdownBox value={countdown.days} label="Hari" />
          <Colon />
          <CountdownBox value={countdown.hours} label="Jam" />
          <Colon />
          <CountdownBox value={countdown.minutes} label="Menit" />
          <Colon />
          <CountdownBox value={countdown.seconds} label="Detik" />
        </motion.div>
      )}

      {/* Bottom sparkle divider */}
      <motion.div className="flex items-center justify-center gap-3 mt-8 relative z-10"
        variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.5 }}>
        <motion.div variants={fadeDown} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
        <motion.svg variants={zoomIn} width="12" height="12" viewBox="0 0 20 20" fill="none">
          <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" opacity="0.7" />
        </motion.svg>
        <motion.div variants={fadeDown} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
      </motion.div>
    </section>
  );
}
