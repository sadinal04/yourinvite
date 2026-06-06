"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import {
  fadeLeft, fadeRight, fadeDown, fadeUp, zoomIn,
  SectionLabel, GoldOrnamentDivider, ScrollCue,
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
  const isInView = useInView(ref, { once: true, margin: "-30px 0px" });

  // Split name by comma to separate main name and academic/customary title (gelar)
  const nameParts = person.name.split(",");
  const mainName = nameParts[0].trim();
  const suffix = nameParts.slice(1).join(",").trim();

  // Asymmetric leaf shape border radius values
  const borderRadius = direction === "left" 
    ? {
        borderTopLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        borderTopRightRadius: "12px",
        borderBottomLeftRadius: "12px",
      }
    : {
        borderTopRightRadius: "40px",
        borderBottomLeftRadius: "40px",
        borderTopLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      };

  return (
    <motion.div
      ref={ref}
      className="p-3 text-center relative overflow-hidden max-w-[320px] mx-auto w-full"
      style={{
        ...borderRadius,
        background: "rgba(253, 245, 236, 0.7)",
        border: "1.5px solid rgba(204, 155, 63, 0.25)",
        boxShadow: "0 4px 15px rgba(204, 155, 63, 0.05)",
      }}
      variants={direction === "left" ? fadeLeft : fadeRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay, duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Inner thin decorative border following the leaf shape */}
      <div 
        className="absolute inset-[5px] pointer-events-none"
        style={{
          border: "1px solid rgba(204,155,63,0.12)",
          borderTopLeftRadius: direction === "left" ? "35px" : "8px",
          borderBottomRightRadius: direction === "left" ? "35px" : "8px",
          borderTopRightRadius: direction === "left" ? "8px" : "35px",
          borderBottomLeftRadius: direction === "left" ? "8px" : "35px",
        }}
      />

      {/* Sunflower ornament */}
      <motion.div
        className="flex justify-center mb-0.5"
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 60 60" fill="none">
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
      <p className="tracking-[0.2em] text-[9.5px] uppercase mb-0.5"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B5832A" }}>
        {role}
      </p>

      {/* Script name */}
      <h3 className="leading-tight mb-0 whitespace-nowrap"
        style={{ fontFamily: "'Italianno', cursive", fontSize: "2.7rem", color: "#CC9B3F" }}>
        {mainName}
      </h3>

      {/* Title/Gelar (using same Italianno font, but slightly smaller) */}
      {suffix && (
        <p className="leading-none mt-0 mb-0.5 whitespace-nowrap"
          style={{ fontFamily: "'Italianno', cursive", fontSize: "1.7rem", color: "#CC9B3F" }}>
          {suffix}
        </p>
      )}

      <div className="flex items-center gap-2 justify-center my-1">
        <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, rgba(204, 155, 63, 0.3))" }} />
        <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#CC9B3F", opacity: 0.5 }} />
        <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, rgba(204, 155, 63, 0.3), transparent)" }} />
      </div>

      {/* Parents */}
      <p className="text-[10px] leading-snug"
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
  const isInView = useInView(ref, { once: true, margin: "-30px 0px" });

  return (
    <section
      id="couple"
      className="section-snap section-px py-4 relative flex flex-col justify-center gap-y-2 h-dvh overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #fbecd9 40%, #fdf5ec 100%)" }}
    >
      {/* Corner Floral Ornaments */}
      <div
        className="absolute top-0 left-0 pointer-events-none w-[120px] h-[120px] opacity-[0.14] select-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none w-[120px] h-[120px] opacity-[0.14] select-none"
        style={{ transform: "rotate(0deg)" }}
      >
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Header */}
      <div ref={ref} className="text-center mb-1">
        <SectionLabel text="Mempelai" />

        <motion.h2
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#5a3e28", fontStyle: "italic" }}
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
      <div className="space-y-2">
        <PersonCard
          person={data.groom}
          role="Mempelai Pria"
          direction="left"
          delay={0.4}
          childOfText="Anak Ketiga"
        />

        {/* & connecting */}
        <motion.div
          className="flex items-center justify-center py-0"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px 0px" }}
          transition={{ delay: 1.6, duration: 1.5 }}
        >
          <motion.p
            style={{ fontFamily: "'Italianno', cursive", fontSize: "2rem", color: "#CC9B3F", lineHeight: 1 }}
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
          delay={2.5}
          childOfText="Anak Pertama"
        />
      </div>
      <ScrollCue />
    </section>
  );
}
