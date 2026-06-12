"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { fadeDown, fadeUp, zoomIn, staggerContainer, ScrollCue } from "@/components/ui/Animations";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { Sparkles } from "lucide-react";

interface ClosingSectionProps {
  data: InvitationData;
  guestName: string;
}

const CLOSING_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  width: ((i * 5 + 2) % 2.5 + 0.5).toFixed(1),
  left: ((i * 3.2 + 1.5) % 99).toFixed(1),
  top: ((i * 5.7 + 3) % 98).toFixed(1),
  duration: 2 + (i % 4) * 0.8,
  delay: (i * 0.4) % 4,
}));

const SunflowerGold = () => (
  <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
    {Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 360) / 16;
      return (
        <ellipse key={i}
          cx={50 + 30 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 30 * Math.sin((angle * Math.PI) / 180)}
          rx={6} ry={14} fill="#CC9B3F"
          transform={`rotate(${angle + 90}, ${50 + 30 * Math.cos((angle * Math.PI) / 180)}, ${50 + 30 * Math.sin((angle * Math.PI) / 180)})`}
          opacity={0.7}
        />
      );
    })}
    {Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 360) / 16 + 11.25;
      return (
        <ellipse key={`2-${i}`}
          cx={50 + 22 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 22 * Math.sin((angle * Math.PI) / 180)}
          rx={4} ry={10} fill="#E0B96A"
          transform={`rotate(${angle + 90}, ${50 + 22 * Math.cos((angle * Math.PI) / 180)}, ${50 + 22 * Math.sin((angle * Math.PI) / 180)})`}
          opacity={0.5}
        />
      );
    })}
    <circle cx="50" cy="50" r="14" fill="#B5832A" opacity={0.9} />
    <circle cx="50" cy="50" r="9" fill="#8a6020" opacity={0.7} />
    {Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 360) / 8;
      return (
        <circle key={`s-${i}`}
          cx={50 + 4 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 4 * Math.sin((angle * Math.PI) / 180)}
          r={1.2} fill="#5a3a10" opacity={0.5}
        />
      );
    })}
  </svg>
);

export default function ClosingSection({ data, guestName }: ClosingSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      id="closing"
      className="section-snap section-px py-8 relative overflow-hidden flex flex-col justify-center"
      style={{ background: "linear-gradient(160deg, #2a1a0a 0%, #1a0f05 50%, #2a1a0a 100%)" }}
    >
      <AmbientBackground type="leaves" variant="dark" opacity={0.15} />

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {CLOSING_PARTICLES.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full"
            style={{ width: `${p.width}px`, height: `${p.width}px`, left: `${p.left}%`, top: `${p.top}%`, background: "#CC9B3F" }}
            animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* Corner floral ornaments */}
      <div className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: "120px", height: "120px", opacity: 0.18, transform: "rotate(180deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none select-none"
        style={{ width: "120px", height: "120px", opacity: 0.18, transform: "rotate(270deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{ width: "120px", height: "120px", opacity: 0.18, transform: "rotate(90deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{ width: "120px", height: "120px", opacity: 0.18, transform: "rotate(0deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Border */}
      <div className="absolute inset-3 pointer-events-none"
        style={{ border: "1px solid rgba(204,155,63,0.12)", borderRadius: "2px" }} />

      <div className="relative z-10 text-center flex flex-col gap-y-3 justify-center">

        {/* Rotating sunflower */}
        <motion.div className="flex justify-center"
          variants={zoomIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <SunflowerGold />
          </motion.div>
        </motion.div>

        {/* Guest greeting */}
        <motion.div
          variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}>
          <motion.p variants={fadeDown} className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.6)" }}>
            Kepada yang terhormat
          </motion.p>
          <motion.p variants={zoomIn}
            style={{ fontFamily: "'Italianno', cursive", fontSize: "2.4rem", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.3)", lineHeight: 1.1 }}>
            {guestName}
          </motion.p>
        </motion.div>

        {/* Gold divider */}
        <motion.div className="flex items-center gap-3 justify-center"
          variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.35 }}>
          <motion.div variants={fadeDown}
            style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
          <motion.svg variants={zoomIn} width="10" height="10" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" opacity="0.7" />
          </motion.svg>
          <motion.div variants={fadeDown}
            style={{ height: "1px", width: "50px", background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
        </motion.div>

        {/* Message */}
        <motion.p className="text-xs leading-relaxed mx-1"
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.45 }}
          style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.7)", fontStyle: "italic", whiteSpace: "pre-line" }}>
          {data.closing?.message ||
            "Dalam perjalanan hidup, Bapak/Ibu/Saudara/i adalah bagian dari orang-orang yang berarti bagi kami."}
        </motion.p>

        {/* Couple signature */}
        <motion.div
          variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.55 }}>
          <motion.p variants={fadeDown} className="tracking-[0.2em] text-xs uppercase mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.6)" }}>
            Hormat Kami
          </motion.p>
          <motion.p variants={zoomIn}
            style={{ fontFamily: "'Italianno', cursive", fontSize: "3rem", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.3)", lineHeight: 1.2 }}>
            Haris &amp; Icut
          </motion.p>
        </motion.div>

        {/* Dua card */}
        <motion.div className="rounded-2xl px-4 py-3"
          variants={zoomIn} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.65 }}
          style={{ background: "rgba(204,155,63,0.07)", border: "1px solid rgba(204,155,63,0.2)" }}>
          <p className="text-sm mb-1" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.9)" }}>
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="text-[10px]" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.55)", fontStyle: "italic" }}>
            &ldquo;Semoga Allah memberkahi kalian berdua, menurunkan berkah atas kalian, dan mengumpulkan kalian dalam kebaikan.&rdquo;
          </p>
        </motion.div>

        {/* Bottom label */}
        <motion.div className="flex flex-col items-center justify-center gap-1 mt-2"
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.75 }}>
          <p className="flex items-center justify-center gap-2 text-[11px]"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.35)", letterSpacing: "0.15em" }}>
            <Sparkles size={10} color="rgba(204,155,63,0.35)" />
            Undangan Digital Premium
            <Sparkles size={10} color="rgba(204,155,63,0.35)" />
          </p>
          <a href="https://yourinvite.site" target="_blank" rel="noopener noreferrer" 
            className="text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#CC9B3F]"
            style={{ fontFamily: "'Lora', serif", color: "rgba(204,155,63,0.25)", textDecoration: "none" }}>
            made by <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textTransform: "lowercase", fontSize: "11px" }}>yourinvite.site</span>
          </a>
        </motion.div>

      </div>
      <ScrollCue />
    </section>
  );
}
