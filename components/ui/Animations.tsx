"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// ─── Variant presets ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut" } },
};

export const zoomInUp: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Clip-path reveal (from bottom, like a curtain pulling up)
export const revealUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

// Line expand (for decorative lines)
export const lineExpand: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

// Default item (used by SectionWrapper children)
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

// ─── Animated text (word by word) ───────────────────────────────────────────

interface AnimatedWordsProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "zoomIn";
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

export function AnimatedWords({
  text,
  className,
  style,
  delay = 0,
}: AnimatedWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.3em", ...style }}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Animated line reveal ────────────────────────────────────────────────────

interface AnimatedLineProps {
  delay?: number;
  color?: string;
  width?: string | number;
  className?: string;
}

export function AnimatedLine({
  delay = 0,
  color = "#CC9B3F",
  width = "60px",
  className,
}: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        height: "1px",
        width,
        background: color,
        transformOrigin: "left center",
      }}
      variants={lineExpand}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    />
  );
}

// ─── Section label (small uppercase with animated line) ──────────────────────

interface SectionLabelProps {
  text: string;
  color?: string;
  delay?: number;
}

export function SectionLabel({ text, color = "#B5832A", delay = 0 }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-3 mb-2"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      <motion.div
        variants={lineExpand}
        style={{
          height: "1px",
          width: "30px",
          background: `linear-gradient(90deg, transparent, ${color})`,
          transformOrigin: "right center",
        }}
      />
      <motion.p
        variants={fadeDown}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.7rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color,
        }}
      >
        {text}
      </motion.p>
      <motion.div
        variants={lineExpand}
        style={{
          height: "1px",
          width: "30px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
          transformOrigin: "left center",
        }}
      />
    </motion.div>
  );
}

// ─── Gold ornament divider ───────────────────────────────────────────────────

interface GoldDividerProps {
  delay?: number;
  icon?: "star" | "flower" | "diamond";
}

const DIVIDER_ICONS = {
  star: "M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z",
  flower: "M10 4 C12 7, 16 8, 16 10 C16 12, 12 13, 10 16 C8 13, 4 12, 4 10 C4 8, 8 7, 10 4Z",
  diamond: "M10 0 L20 10 L10 20 L0 10 Z",
};

export function GoldOrnamentDivider({ delay = 0, icon = "star" }: GoldDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-3 my-5"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      <motion.div
        variants={lineExpand}
        style={{
          height: "1px",
          width: "50px",
          background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.7))",
          transformOrigin: "right center",
        }}
      />
      <motion.div variants={zoomIn}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d={DIVIDER_ICONS[icon]} fill="#CC9B3F" opacity="0.8" />
        </svg>
      </motion.div>
      <motion.div
        variants={lineExpand}
        style={{
          height: "1px",
          width: "50px",
          background: "linear-gradient(90deg, rgba(204,155,63,0.7), transparent)",
          transformOrigin: "left center",
        }}
      />
    </motion.div>
  );
}
