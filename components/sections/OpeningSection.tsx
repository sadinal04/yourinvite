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

const MagicalOpeningAnimation = ({ isInView }: { isInView: boolean }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Rotating Golden Frame that settles into place */}
      <motion.div
        initial={{ scale: 0.85, rotate: 4, opacity: 0 }}
        animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.85, rotate: 4, opacity: 0 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[20px]"
        style={{
          border: "1px solid rgba(204,155,63,0.4)",
          borderRadius: "24px",
          boxShadow: "inset 0 0 40px rgba(204,155,63,0.05)",
        }}
      >
        {/* Inner delicate line */}
        <div className="absolute inset-[6px]" style={{ border: "1px solid rgba(204,155,63,0.15)", borderRadius: "18px" }} />
      </motion.div>

      {/* 2. Blooming Corner Floral Ornaments */}
      {/* Top Left */}
      <motion.div
        initial={{ x: -30, y: -30, scale: 0.6, opacity: 0, rotate: 165 }}
        animate={isInView ? { x: -20, y: -20, scale: 1, opacity: 0.22, rotate: 180 } : { x: -30, y: -30, scale: 0.6, opacity: 0, rotate: 165 }}
        transition={{ duration: 2.2, delay: 0.4, ease: "easeOut" }}
        className="absolute top-0 left-0 w-[150px] h-[150px]"
      >
        <img src="/desain/goldfloral.png" className="w-full h-full object-contain drop-shadow-md" alt="" />
      </motion.div>
      
      {/* Bottom Right */}
      <motion.div
        initial={{ x: 30, y: 30, scale: 0.6, opacity: 0, rotate: -15 }}
        animate={isInView ? { x: 20, y: 20, scale: 1, opacity: 0.22, rotate: 0 } : { x: 30, y: 30, scale: 0.6, opacity: 0, rotate: -15 }}
        transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-[150px] h-[150px]"
      >
        <img src="/desain/goldfloral.png" className="w-full h-full object-contain drop-shadow-md" alt="" />
      </motion.div>

      {/* 3. Magical Center Light Burst (Portal effect) */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={isInView ? { scale: 4, opacity: 0 } : { scale: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -ml-[100px] -mt-[100px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(204,155,63,0.3) 0%, rgba(204,155,63,0.1) 40%, transparent 70%)",
        }}
      />
    </div>
  );
};


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
      {/* ── Magical Opening Effect ── */}
      <MagicalOpeningAnimation isInView={isInView} />

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

      {/* Bismillah — zoomIn */}
      <motion.p
        className="text-2xl leading-relaxed mb-1"
        style={{ fontFamily: "'Lora', serif", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.4)" }}
        variants={zoomIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.1 }}
      >
        {data.opening?.title || "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم"}
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
