"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import {
  fadeDown, fadeUp, fadeLeft, fadeRight, zoomIn, zoomInUp,
  staggerContainer, itemVariants, SectionLabel, GoldOrnamentDivider, AnimatedWords,
} from "@/components/ui/Animations";

interface OpeningSectionProps {
  data: InvitationData;
}



export default function OpeningSection({ data }: OpeningSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      id="opening-content"
      className="section-snap section-px py-20 text-center relative overflow-hidden flex flex-col justify-center gap-y-7"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #FFFFFF 100%)" }}
    >
      {/* ── Static golden border frame ── */}
      <div className="absolute pointer-events-none"
        style={{ inset: "20px", border: "1px solid rgba(204,155,63,0.35)", borderRadius: "20px", boxShadow: "inset 0 0 30px rgba(204,155,63,0.04)" }}>
        <div className="absolute inset-[6px]" style={{ border: "1px solid rgba(204,155,63,0.13)", borderRadius: "14px" }} />
      </div>

      {/* ── Static corner ornaments ── */}
      <div className="absolute top-0 left-0 pointer-events-none select-none w-[130px] h-[130px]"
        style={{ opacity: 0.18, transform: "translate(-18px,-18px) rotate(180deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none select-none w-[130px] h-[130px]"
        style={{ opacity: 0.18, transform: "translate(18px,18px) rotate(0deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Decorative bg sunflowers (z-0 behind everything) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 right-0 opacity-[0.04] w-56 h-56" viewBox="0 0 200 200">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 360) / 12;
            return (
              <ellipse key={i}
                cx={100 + 55 * Math.cos((angle * Math.PI) / 180)}
                cy={100 + 55 * Math.sin((angle * Math.PI) / 180)}
                rx={12} ry={28} fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${100 + 55 * Math.cos((angle * Math.PI) / 180)}, ${100 + 55 * Math.sin((angle * Math.PI) / 180)})`}
              />
            );
          })}
          <circle cx="100" cy="100" r="25" fill="#CC9B3F" />
        </svg>
        <svg className="absolute bottom-0 left-0 opacity-[0.04] w-56 h-56" viewBox="0 0 200 200">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 360) / 12;
            return (
              <ellipse key={i}
                cx={100 + 55 * Math.cos((angle * Math.PI) / 180)}
                cy={100 + 55 * Math.sin((angle * Math.PI) / 180)}
                rx={12} ry={28} fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${100 + 55 * Math.cos((angle * Math.PI) / 180)}, ${100 + 55 * Math.sin((angle * Math.PI) / 180)})`}
              />
            );
          })}
          <circle cx="100" cy="100" r="25" fill="#CC9B3F" />
        </svg>
      </div>

      {/* Assalamualaikum Arabic — zoomIn */}
      <motion.p
        className="text-2xl leading-relaxed mb-1"
        style={{ fontFamily: "'Lora', serif", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.4)" }}
        variants={zoomIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.1 }}
      >
        السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
      </motion.p>

      <GoldOrnamentDivider icon="flower" delay={0.25} />

      {/* Assalamualaikum — fadeDown */}
      <motion.p
        className="text-xs tracking-[0.3em] uppercase mb-5"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B5832A" }}
        variants={fadeDown}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.4 }}
      >
        Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
      </motion.p>

      {/* Body text — word by word */}
      <div className="max-w-xs mx-auto mb-6">
        <motion.p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "'Lora', serif", color: "#5a3e28", fontStyle: "italic" }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.55 }}
        >
          {data.opening?.subtitle ||
            "Dengan memohon rahmat dan ridha Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami."}
        </motion.p>
      </div>

      {/* Animated divider lines */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-4"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.65 }}
      >
        <motion.div variants={itemVariants} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, transparent, #CC9B3F)", transformOrigin: "right" }} />
        <motion.div variants={zoomIn}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="3" fill="#CC9B3F" opacity="0.7" />
          </svg>
        </motion.div>
        <motion.div variants={itemVariants} style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, #CC9B3F, transparent)", transformOrigin: "left" }} />
      </motion.div>

    </section>
  );
}
