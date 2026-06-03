"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { fadeUp, fadeDown, zoomIn, zoomInUp, staggerContainer, SectionLabel, GoldOrnamentDivider } from "@/components/ui/Animations";

interface QuranSectionProps {
  data: InvitationData;
}

export default function QuranSection({ data }: QuranSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const verse = data.quranVerse || {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  };

  return (
    <section
      ref={ref}
      id="quran"
      className="section-snap section-px py-14 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fdf5ec 0%, #fbecd9 50%, #fdf5ec 100%)" }}
    >
      {/* Decorative watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ opacity: 0.04 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg width="280" height="280" viewBox="0 0 200 200">
            {Array.from({ length: 20 }, (_, i) => {
              const angle = (i * 360) / 20;
              return (
                <ellipse key={i}
                  cx={100 + 70 * Math.cos((angle * Math.PI) / 180)}
                  cy={100 + 70 * Math.sin((angle * Math.PI) / 180)}
                  rx={10} ry={28} fill="#CC9B3F"
                  transform={`rotate(${angle + 90}, ${100 + 70 * Math.cos((angle * Math.PI) / 180)}, ${100 + 70 * Math.sin((angle * Math.PI) / 180)})`}
                />
              );
            })}
            <circle cx="100" cy="100" r="28" fill="#CC9B3F" />
          </svg>
        </motion.div>
      </div>

      {/* Header */}
      <SectionLabel text="Ayat Al-Qur'an" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Quran card */}
        <motion.div
          variants={zoomInUp}
          className="rounded-2xl p-6 mx-auto mt-4 relative"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(253,245,236,0.9))",
            border: "1px solid rgba(204,155,63,0.3)",
            boxShadow: "0 8px 40px rgba(204,155,63,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Corner ornaments inside card */}
          <div className="absolute top-3 left-3 w-5 h-5 opacity-30">
            <svg viewBox="0 0 20 20" fill="none"><path d="M2 2 Q10 2 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/><path d="M2 2 Q2 10 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <div className="absolute top-3 right-3 w-5 h-5 opacity-30" style={{ transform: "scaleX(-1)" }}>
            <svg viewBox="0 0 20 20" fill="none"><path d="M2 2 Q10 2 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/><path d="M2 2 Q2 10 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <div className="absolute bottom-3 left-3 w-5 h-5 opacity-30" style={{ transform: "scaleY(-1)" }}>
            <svg viewBox="0 0 20 20" fill="none"><path d="M2 2 Q10 2 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/><path d="M2 2 Q2 10 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/></svg>
          </div>
          <div className="absolute bottom-3 right-3 w-5 h-5 opacity-30" style={{ transform: "scale(-1)" }}>
            <svg viewBox="0 0 20 20" fill="none"><path d="M2 2 Q10 2 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/><path d="M2 2 Q2 10 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/></svg>
          </div>

          {/* Arabic */}
          <motion.p
            variants={fadeDown}
            dir="rtl"
            className="text-base leading-loose mb-5 pt-2"
            style={{ fontFamily: "'Lora', serif", color: "#5a3e28", lineHeight: 2.4 }}
          >
            {verse.arabic}
          </motion.p>

          {/* Gold line */}
          <GoldOrnamentDivider icon="diamond" delay={0} />

          {/* Translation */}
          <motion.p
            variants={fadeUp}
            className="text-sm leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "#6a4e30", fontStyle: "italic" }}
          >
            &ldquo;{verse.translation}&rdquo;
          </motion.p>

          {/* Source */}
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B5832A", textTransform: "uppercase" }}
          >
            — {verse.source} —
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
