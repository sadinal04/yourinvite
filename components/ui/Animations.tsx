"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// ─── Premium easing ─────────────────────────────────────────────────────────
const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Variant presets ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, rotateX: 10 },
  visible: { 
    opacity: 1, y: 0, scale: 1, rotateX: 0, 
    transition: { duration: 1.2, ease: SMOOTH_EASE } 
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40, scale: 0.98 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { duration: 1.1, ease: SMOOTH_EASE } 
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60, scale: 0.98 },
  visible: { 
    opacity: 1, x: 0, scale: 1, 
    transition: { duration: 1.1, ease: SMOOTH_EASE } 
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.98 },
  visible: { 
    opacity: 1, x: 0, scale: 1, 
    transition: { duration: 1.1, ease: SMOOTH_EASE } 
  },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { 
    opacity: 1, scale: 1, 
    transition: { duration: 1.2, ease: SMOOTH_EASE } 
  },
};

export const zoomInUp: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 40, rotateX: 15, filter: "blur(6px)" },
  visible: { 
    opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)", 
    transition: { duration: 1.3, ease: SMOOTH_EASE } 
  },
};

// Clip-path reveal (from bottom, like a curtain pulling up)
export const revealUp: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
};

// Line expand (for decorative lines)
export const lineExpand: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 1.0, ease: SMOOTH_EASE } },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.15 },
  },
};

// Default item (used by SectionWrapper children)
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96, rotateX: 12, filter: "blur(5px)" },
  visible: { 
    opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", 
    transition: { duration: 1.1, ease: SMOOTH_EASE } 
  },
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
  hidden: { opacity: 0, y: 20, scale: 0.95, rotateX: 10, filter: "blur(5px)" },
  visible: { 
    opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", 
    transition: { duration: 0.7, ease: SMOOTH_EASE } 
  },
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
// ─── Scroll cue (animated arrow at bottom of sections) ──────────────────────

export function ScrollCue({ color = "#CC9B3F" }: { color?: string }) {
  return (
    <div
      className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Three stacked chevrons fading in sequence */}
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          animate={{ opacity: [0, 0.55, 0], y: [0, 4, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.22,
            ease: "easeInOut",
          }}
        >
          <path
            d="M2 2 L9 8 L16 2"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
