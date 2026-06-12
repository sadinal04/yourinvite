"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import {
  fadeUp, fadeDown, zoomIn, zoomInUp, staggerContainer,
  SectionLabel, GoldOrnamentDivider, ScrollCue,
} from "@/components/ui/Animations";

interface QuranSectionProps {
  data: InvitationData;
}

// ── Deterministic floating leaves ────────────────────────────────────────────
const LEAVES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: ((i * 8.3 + 4) % 94).toFixed(1),
  size: 14 + (i % 4) * 5,
  dur: 6 + (i % 5) * 1.4,
  delay: (i * 0.85) % 6,
  rotate: (i * 47) % 360,
  rotateDelta: i % 2 === 0 ? 30 : -30,
  opacity: 0.12 + (i % 3) * 0.06,
}));

// SVG leaf shape
function Leaf({ size, color = "#CC9B3F" }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 2 C28 2, 38 10, 38 20 C38 32, 28 38, 20 38 C12 38, 2 30, 2 20 C2 10, 12 2, 20 2 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M20 2 C20 20, 20 38, 20 38"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M20 10 C25 14, 30 14, 33 18"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M20 18 C15 22, 10 22, 7 18"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

// Golden tones for leaves to match the theme
const LEAF_COLORS = ["#CC9B3F", "#E0B96A", "#B5832A", "#D4A373", "#C28E46"];

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
      className="section-snap section-px py-20 text-center relative overflow-hidden flex flex-col justify-center gap-y-7"
      style={{ background: "linear-gradient(160deg, #fdf5ec 0%, #fbecd9 50%, #fdf5ec 100%)" }}
    >
      {/* ── Floating animated leaves ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {LEAVES.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            style={{
              left: `${leaf.left}%`,
              bottom: "-40px",
              opacity: leaf.opacity,
              willChange: "transform",
            }}
            animate={{
              y: ["0px", "-110dvh"],
              rotate: [leaf.rotate, leaf.rotate + leaf.rotateDelta, leaf.rotate - leaf.rotateDelta, leaf.rotate],
              x: [0, 12, -8, 4, 0],
            }}
            transition={{
              duration: leaf.dur,
              repeat: Infinity,
              delay: leaf.delay,
              ease: "linear",
              x: { duration: leaf.dur, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: leaf.dur * 0.7, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Leaf size={leaf.size} color={LEAF_COLORS[leaf.id % LEAF_COLORS.length]} />
          </motion.div>
        ))}
      </div>

      {/* ── Corner goldfloral ornaments ── */}
      <div className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: "100px", height: "100px", opacity: 0.15, transform: "rotate(180deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none select-none"
        style={{ width: "100px", height: "100px", opacity: 0.15, transform: "rotate(270deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{ width: "100px", height: "100px", opacity: 0.15, transform: "rotate(90deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{ width: "100px", height: "100px", opacity: 0.15, transform: "rotate(0deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* ── Watermark mandala ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ opacity: 0.035 }}
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

      {/* ── Header ── */}
      <SectionLabel text="Ayat Al-Qur'an" />

      {/* ── Quran card ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
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
          {[
            { pos: "top-3 left-3", t: undefined },
            { pos: "top-3 right-3", t: "scaleX(-1)" },
            { pos: "bottom-3 left-3", t: "scaleY(-1)" },
            { pos: "bottom-3 right-3", t: "scale(-1)" },
          ].map(({ pos, t }, idx) => (
            <div key={idx} className={`absolute ${pos} w-5 h-5 opacity-25`} style={{ transform: t }}>
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M2 2 Q10 2 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none" />
                <path d="M2 2 Q2 10 10 10" stroke="#CC9B3F" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          ))}

          {/* Arabic */}
          <motion.p
            variants={fadeDown}
            dir="rtl"
            className="text-base leading-loose mb-5 pt-2"
            style={{ fontFamily: "'Lora', serif", color: "#5a3e28", lineHeight: 2.4 }}
          >
            {verse.arabic}
          </motion.p>

          {/* Divider */}
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

      {/* ── Scroll cue ── */}
      <ScrollCue />
    </section>
  );
}
