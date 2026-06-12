"use client";

import React, { memo } from "react";

interface AmbientBackgroundProps {
  type?: "leaves" | "bubbles" | "sparkles" | "fireflies" | "sparkles-large";
  opacity?: number;
  variant?: "light" | "dark";
}

// ── Deterministic configs so SSR matches CSR ──
const LEAVES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: ((i * 18.3 + 12) % 94).toFixed(1),
  size: 16 + (i % 3) * 6,
  dur: 12 + (i % 4) * 3,
  delay: (i * 1.5) % 8,
  drift: 30 + (i % 2 === 0 ? 30 : -30),
  rotate: 150 + (i * 45) % 90,
}));

const FIREFLIES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: ((i * 7.3 + 5) % 92).toFixed(1),
  size: 3 + (i % 3) * 2, // very small
  dur: 10 + (i % 5) * 4,
  delay: (i * 1.5) % 8,
  opacity: 0.05 + (i % 4) * 0.05, // very faint (0.05 to 0.2)
}));

const SPARKLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: ((i * 6.7 + 2.3) % 94).toFixed(1),
  top: 20 + ((i * 5.3 + 1) % 70),
  size: 2 + (i % 3) * 1.5,
  dur: 5 + (i % 6) * 1.2,
  delay: (i * 0.45) % 7,
}));

const SPARKLES_LARGE = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: ((i * 5.7 + 1.3) % 94).toFixed(1),
  top: 10 + ((i * 7.3 + 2) % 80),
  size: 3.5 + (i % 3) * 2.5, // 3.5 to 8.5px
  dur: 4 + (i % 5) * 1.5,
  delay: (i * 0.35) % 6,
}));

// SVG shapes
function LeafShape({ size, variant = "light" }: { size: number, variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const fill = isDark ? "#CC9B3F" : "#8a7550";
  const stroke = isDark ? "#E0B96A" : "#6e5d3d";
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none">
      <path d="M12 2 C20 5 23 13 18 22 C15 27 9 27 6 22 C1 13 4 5 12 2Z" fill={fill} opacity={isDark ? 0.35 : 0.25} />
      <path d="M12 4 Q11 14 10 30" stroke={stroke} strokeWidth="0.9" fill="none" opacity={isDark ? 0.4 : 0.2} />
      <path d="M11.5 10 Q8 12 6 15" stroke={stroke} strokeWidth="0.55" fill="none" opacity={isDark ? 0.3 : 0.15} />
      <path d="M12 10 Q15 12 17 15" stroke={stroke} strokeWidth="0.55" fill="none" opacity={isDark ? 0.3 : 0.15} />
      <path d="M10 30 Q11 33 12 34" stroke={stroke} strokeWidth="1" fill="none" opacity={isDark ? 0.4 : 0.2} />
    </svg>
  );
}

function FireflyShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="3" fill="#E8C878" opacity="0.6" />
      <circle cx="5" cy="5" r="5" fill="#CC9B3F" opacity="0.2" />
    </svg>
  );
}

const AmbientBackground = memo(({ type = "leaves", opacity = 1, variant = "light" }: AmbientBackgroundProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true" style={{ opacity }}>
      {type === "leaves" && LEAVES.map((l) => (
        <div
          key={l.id}
          className="absolute cover-falling-leaf"
          style={{
            left: `${l.x}%`,
            top: "-40px",
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            "--drift": `${l.drift}px`,
            "--rotate": `${l.rotate}deg`,
          } as React.CSSProperties}
        >
          <LeafShape size={l.size} variant={variant} />
        </div>
      ))}

      {type === "fireflies" && FIREFLIES.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            opacity: h.opacity,
            animationName: "float-particle",
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          } as React.CSSProperties}
        >
          <FireflyShape size={h.size} />
        </div>
      ))}

      {type === "sparkles" && SPARKLES.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full sparkle-rise"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, #E0B96A 0%, rgba(204,155,63,0.4) 60%, transparent 100%)`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}

      {type === "sparkles-large" && SPARKLES_LARGE.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full sparkle-rise"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, #E0B96A 0%, rgba(204,155,63,0.5) 50%, transparent 100%)`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

AmbientBackground.displayName = "AmbientBackground";
export default AmbientBackground;
