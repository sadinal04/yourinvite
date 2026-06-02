"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { fadeDown, fadeUp, zoomIn, zoomInUp, staggerContainer, SectionLabel } from "@/components/ui/Animations";

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
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
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
  const groomFirst = data.groom.name.split(",")[0].split(" ")[0];
  const brideFirst = data.bride.name.split(",")[0].split(" ")[0];

  return (
    <section
      ref={ref}
      id="closing"
      className="section-px py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2a1a0a 0%, #1a0f05 50%, #2a1a0a 100%)" }}
    >
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

      {/* Corner ornaments */}
      {[
        "absolute top-4 left-4 opacity-20",
        "absolute top-4 right-4 opacity-20",
        "absolute bottom-4 left-4 opacity-20",
        "absolute bottom-4 right-4 opacity-20",
      ].map((cls, i) => (
        <div key={i} className={cls} style={{
          transform: i === 1 ? "scaleX(-1)" : i === 2 ? "scaleY(-1)" : i === 3 ? "scale(-1)" : undefined,
        }}>
          <svg width="44" height="44" viewBox="0 0 50 50" fill="none">
            <path d="M5 5 Q15 5 15 15" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/>
            <path d="M5 5 Q5 15 15 15" stroke="#CC9B3F" strokeWidth="1.5" fill="none"/>
            <circle cx="5" cy="5" r="2" fill="#CC9B3F"/>
          </svg>
        </div>
      ))}

      {/* Border */}
      <div className="absolute inset-3 pointer-events-none" style={{ border: "1px solid rgba(204,155,63,0.12)", borderRadius: "2px" }} />

      <div className="relative z-10 text-center">
        {/* Rotating sunflower */}
        <motion.div className="flex justify-center mb-6" variants={zoomIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            <SunflowerGold />
          </motion.div>
        </motion.div>

        {/* Guest greeting */}
        <motion.div className="mb-5" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.2 }}>
          <motion.p variants={fadeDown} className="text-xs tracking-[0.25em] uppercase mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.6)" }}>
            Kepada yang terhormat
          </motion.p>
          <motion.p variants={zoomIn}
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.3)" }}>
            {guestName}
          </motion.p>
        </motion.div>

        {/* Gold divider */}
        <motion.div className="flex items-center gap-3 justify-center mb-6"
          variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.35 }}>
          <motion.div variants={fadeDown} style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
          <motion.svg variants={zoomIn} width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" opacity="0.7" />
          </motion.svg>
          <motion.div variants={fadeDown} style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
        </motion.div>

        {/* Message */}
        <motion.p className="text-sm leading-relaxed mb-6 mx-1"
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.45 }}
          style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.7)", fontStyle: "italic" }}>
          {data.closing?.message ||
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu."}
        </motion.p>

        {/* Couple signature */}
        <motion.div className="mb-7"
          variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.55 }}>
          <motion.p variants={fadeDown} className="tracking-[0.2em] text-xs uppercase mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.6)" }}>
            Hormat Kami
          </motion.p>
          <motion.p variants={zoomIn}
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.8rem", color: "#CC9B3F", textShadow: "0 0 20px rgba(204,155,63,0.3)", lineHeight: 1.3 }}>
            {data.closing?.signature || `${groomFirst} & ${brideFirst}`}
          </motion.p>
        </motion.div>

        {/* Dua card */}
        <motion.div className="rounded-2xl p-5"
          variants={zoomIn} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.65 }}
          style={{ background: "rgba(204,155,63,0.07)", border: "1px solid rgba(204,155,63,0.2)" }}>
          <p className="text-base mb-2" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.9)" }}>
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="text-xs" style={{ fontFamily: "'Lora', serif", color: "rgba(224,185,106,0.55)", fontStyle: "italic" }}>
            &ldquo;Semoga Allah memberkahi kalian berdua, menurunkan berkah atas kalian, dan mengumpulkan kalian dalam kebaikan.&rdquo;
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p className="text-xs mt-8"
          variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.75 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(204,155,63,0.3)", letterSpacing: "0.15em" }}>
          ✦ Undangan Digital Premium ✦
        </motion.p>
      </div>
    </section>
  );
}
