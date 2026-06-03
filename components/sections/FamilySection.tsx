"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { fadeLeft, fadeRight, fadeDown, fadeUp, zoomIn, staggerContainer, SectionLabel, GoldOrnamentDivider } from "@/components/ui/Animations";

interface FamilySectionProps {
  data: InvitationData;
}

const FamilyCard = ({
  title, father, mother, direction, delay,
}: {
  title: string; father: string; mother: string;
  direction: "left" | "right"; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="glass-card p-5 text-center relative overflow-hidden"
      variants={direction === "left" ? fadeLeft : fadeRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: delay ?? 0 }}
    >
      {/* Animated top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, #CC9B3F 30%, #CC9B3F 70%, transparent)", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: (delay ?? 0) + 0.25 }}
      />

      <motion.p
        className="tracking-[0.2em] text-xs uppercase mb-4"
        variants={fadeDown}
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#B5832A" }}
      >
        {title}
      </motion.p>

      <div className="space-y-3">
        {[
          { label: "Bapak", name: father },
          { label: "Ibu", name: mother },
        ].map(({ label, name }, i) => (
          <motion.div key={i}
            variants={direction === "left" ? fadeLeft : fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: (delay ?? 0) + 0.1 * i + 0.15 }}
          >
            <p className="text-xs mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#8a6a4a", letterSpacing: "0.1em" }}>
              {label}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: "#5a3e28" }}>
              {name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function FamilySection({ data }: FamilySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="family"
      className="section-snap-tall section-px py-14 relative"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf5ec 100%)" }}
    >
      <div ref={ref} className="text-center mb-8">
        <SectionLabel text="Orang Tua" />

        <motion.h2
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#5a3e28", fontStyle: "italic" }}
          variants={fadeDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          Keluarga yang Berbahagia
        </motion.h2>

        <GoldOrnamentDivider icon="flower" delay={0.3} />
      </div>

      <div className="space-y-4">
        <FamilyCard
          title={`Keluarga Mempelai Pria`}
          father={data.groom.father}
          mother={data.groom.mother}
          direction="left"
          delay={0.1}
        />
        <FamilyCard
          title={`Keluarga Mempelai Wanita`}
          father={data.bride.father}
          mother={data.bride.mother}
          direction="right"
          delay={0.1}
        />
      </div>
    </section>
  );
}
