"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { useCountdown } from "@/hooks/useCountdown";
import {
  fadeDown, fadeUp, fadeLeft, fadeRight, zoomIn, zoomInUp,
  staggerContainer, SectionLabel, ScrollCue
} from "@/components/ui/Animations";
import { useMemo } from "react";
import { Sparkles, Calendar } from "lucide-react";

interface CountdownSectionProps {
  data: InvitationData;
}

const CALENDAR_URL = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Haris+%26+Cut&dates=20260702T010000Z/20260702T060000Z&details=Pernikahan+Haris+%26+Cut.%0AAkad+Nikah:+08.00+WIB+di+Masjid+Agung+Sultan+Jeumpa+Bireuen.%0AResepsi:+10.00+WIB+di+Kediaman+Mempelai+Pria.&location=Kediaman+Mempelai+Pria,+Krueng+Juli+Timu,+Kuala,+Bireuen,+Aceh";

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
        fontFamily: "'Times New Roman', Times, serif",
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
      className="section-snap section-px py-20 text-center relative overflow-hidden flex flex-col justify-center"
      style={{ background: "linear-gradient(160deg, #5a3e28 0%, #3a2510 50%, #2a1a0a 100%)" }}
    >
      {/* Corner Floral Ornaments */}
      <div
        className="absolute top-0 left-0 pointer-events-none w-[120px] h-[120px] opacity-[0.2] select-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none w-[120px] h-[120px] opacity-[0.2] select-none"
        style={{ transform: "rotate(0deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Shimmer particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {SHIMMER_PARTICLES.map((p) => (
          <div key={p.id} className="absolute rounded-full countdown-shimmer"
            style={{
              width: `${p.width}px`, height: `${p.width}px`,
              left: `${p.left}%`, top: `${p.top}%`,
              background: "#CC9B3F",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
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

      {/* Main staggered animation container */}
      <motion.div
        className="relative z-10 flex flex-col gap-y-8"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <div>
          <motion.p variants={fadeDown}
            className="flex items-center justify-center gap-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.35em", color: "rgba(204,155,63,0.8)", textTransform: "uppercase" }}>
            <Sparkles size={10} color="rgba(204,155,63,0.7)" />
            Menuju Hari Bahagia
            <Sparkles size={10} color="rgba(204,155,63,0.7)" />
          </motion.p>

          <motion.h2 variants={zoomIn} className="mt-2.5 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#E0B96A", fontStyle: "italic" }}>
            Hitung Mundur
          </motion.h2>

          <motion.p variants={fadeUp} className="text-xs"
            style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.65)" }}>
            {formatted}
          </motion.p>
        </div>

        {/* Countdown boxes and Calendar button */}
        {countdown.isPast ? (
          <motion.div className="text-center" variants={zoomIn}>
            <p style={{ fontFamily: "'Italianno', cursive", fontSize: "3.5rem", color: "#CC9B3F" }}>Alhamdulillah</p>
            <p className="text-sm mt-2" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.8)", fontStyle: "italic" }}>
              Semoga menjadi keluarga sakinah mawaddah warahmah
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-y-7">
            {/* Box container */}
            <div className="flex gap-2 justify-center">
              <CountdownBox value={countdown.days} label="Hari" />
              <Colon />
              <CountdownBox value={countdown.hours} label="Jam" />
              <Colon />
              <CountdownBox value={countdown.minutes} label="Menit" />
              <Colon />
              <CountdownBox value={countdown.seconds} label="Detik" />
            </div>

            {/* Simpan Tanggal Button */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <motion.a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full text-xs transition-all duration-300"
                style={{
                  background: "rgba(204,155,63,0.15)",
                  border: "1px solid rgba(204,155,63,0.4)",
                  color: "#E0B96A",
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                whileHover={{ scale: 1.05, background: "rgba(204,155,63,0.25)", borderColor: "#E0B96A", boxShadow: "0 6px 20px rgba(204,155,63,0.2)" }}
                whileTap={{ scale: 0.96 }}
              >
                <Calendar size={13} color="#E0B96A" />
                Simpan Tanggal
              </motion.a>
            </motion.div>
          </div>
        )}

        {/* Bottom sparkle divider */}
        <div className="flex items-center justify-center gap-3">
          <motion.div variants={fadeLeft} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
          <motion.svg variants={zoomIn} width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" opacity="0.7" />
          </motion.svg>
          <motion.div variants={fadeRight} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
        </div>
      </motion.div>
      <ScrollCue />
    </section>
  );
}
