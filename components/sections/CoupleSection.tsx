"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import {
  fadeLeft, fadeRight, fadeDown, fadeUp, zoomIn, zoomInUp,
  staggerContainer, SectionLabel, GoldOrnamentDivider,
} from "@/components/ui/Animations";

interface CoupleSectionProps {
  data: InvitationData;
}

const PersonCard = ({
  person,
  role,
  direction,
  delay,
  childOfText,
}: {
  person: { name: string; father: string; mother: string };
  role: string;
  direction: "left" | "right";
  delay: number;
  childOfText: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const nameParts = person.name.split(",");
  const mainName = nameParts[0].trim();
  const suffix = nameParts.slice(1).join(",").trim();

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 text-center relative overflow-hidden"
      variants={direction === "left" ? fadeLeft : fadeRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, #CC9B3F 30%, #CC9B3F 70%, transparent)" }} />

      {/* Sunflower ornament */}
      <motion.div
        className="flex justify-center mb-3"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="54" height="54" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" fill="rgba(204,155,63,0.06)" />
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i * 360) / 10;
            return (
              <ellipse key={i}
                cx={30 + 17 * Math.cos((angle * Math.PI) / 180)}
                cy={30 + 17 * Math.sin((angle * Math.PI) / 180)}
                rx={3.5} ry={7} fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${30 + 17 * Math.cos((angle * Math.PI) / 180)}, ${30 + 17 * Math.sin((angle * Math.PI) / 180)})`}
                opacity={0.55}
              />
            );
          })}
          <circle cx="30" cy="30" r="9" fill="#B5832A" opacity="0.7" />
          <circle cx="30" cy="30" r="5" fill="#8a6020" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Role */}
      <p className="tracking-[0.2em] text-xs uppercase mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B5832A" }}>
        {role}
      </p>

      {/* Script name */}
      <h3 className="leading-tight mb-1"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.4rem", color: "#CC9B3F" }}>
        {mainName}
      </h3>

      {suffix && (
        <p className="text-xs mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#8a6a4a", fontStyle: "italic" }}>
          {suffix}
        </p>
      )}

      <div className="flex items-center gap-2 justify-center my-3">
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.4))" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#CC9B3F", opacity: 0.6 }} />
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(204,155,63,0.4), transparent)" }} />
      </div>

      {/* Parents */}
      <p className="text-xs leading-relaxed"
        style={{ fontFamily: "'Lora', serif", color: "#6a4e30", fontStyle: "italic" }}>
        {childOfText} dari<br />
        Bapak {person.father}<br />
        dan Ibu {person.mother}
      </p>
    </motion.div>
  );
};

export default function CoupleSection({ data }: CoupleSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="couple"
      className="section-snap-tall section-px py-14 relative"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #fbecd9 40%, #fdf5ec 100%)" }}
    >
      {/* Header */}
      <div ref={ref} className="text-center mb-8">
        <SectionLabel text="Mempelai" />

        <motion.h2
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600, color: "#5a3e28", fontStyle: "italic" }}
          variants={fadeDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          Pengantin
        </motion.h2>

        <GoldOrnamentDivider icon="flower" delay={0.3} />
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <PersonCard
          person={data.groom}
          role="Mempelai Pria"
          direction="left"
          delay={0}
          childOfText="Anak Ketiga"
        />

        {/* & connecting */}
        <motion.div
          className="flex items-center justify-center py-1"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px 0px" }}
        >
          <motion.p
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.8rem", color: "#CC9B3F", lineHeight: 1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &
          </motion.p>
        </motion.div>

        <PersonCard
          person={data.bride}
          role="Mempelai Wanita"
          direction="right"
          delay={0}
          childOfText="Anak Pertama"
        />
      </div>
    </section>
  );
}
