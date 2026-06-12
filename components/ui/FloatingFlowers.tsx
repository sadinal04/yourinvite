"use client";

import { useEffect, useState, useRef } from "react";

interface FloralItem {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  type: "sunflower" | "petal" | "leaf" | "sparkle";
}

// SVG paths for ornaments
const SunflowerSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    style={{ opacity }}
  >
    {/* Petals */}
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 360) / 12;
      return (
        <ellipse
          key={i}
          cx={30 + 16 * Math.cos((angle * Math.PI) / 180)}
          cy={30 + 16 * Math.sin((angle * Math.PI) / 180)}
          rx={4}
          ry={8}
          fill="#CC9B3F"
          transform={`rotate(${angle + 90}, ${30 + 16 * Math.cos((angle * Math.PI) / 180)}, ${30 + 16 * Math.sin((angle * Math.PI) / 180)})`}
          opacity={0.7}
        />
      );
    })}
    {/* Center */}
    <circle cx={30} cy={30} r={9} fill="#B5832A" opacity={0.8} />
    <circle cx={30} cy={30} r={6} fill="#8a6020" opacity={0.6} />
  </svg>
);

const PetalSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 20 32" fill="none" style={{ opacity }}>
    <path
      d="M10 2 C15 8, 18 16, 10 30 C2 16, 5 8, 10 2Z"
      fill="#CC9B3F"
      opacity={0.6}
    />
    <path
      d="M10 6 C12 12, 13 20, 10 28 C7 20, 8 12, 10 6Z"
      fill="#E0B96A"
      opacity={0.4}
    />
  </svg>
);

const SparkleSmall = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ opacity }}>
    <path
      d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
      fill="#CC9B3F"
    />
  </svg>
);

const LeafSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 24 28" fill="none" style={{ opacity }}>
    <path
      d="M12 2 C20 6, 22 14, 14 24 C12 26, 10 26, 8 24 C2 16, 2 6, 12 2Z"
      fill="#CC9B3F"
      opacity={0.5}
    />
    <path
      d="M12 4 L12 24"
      stroke="#B5832A"
      strokeWidth={0.8}
      opacity={0.4}
    />
  </svg>
);

export default function FloatingFlowers() {
  const [florals, setFlorals] = useState<FloralItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        // Logic for using width/height if needed
      }
    };
    
    window.addEventListener("resize", resize);
    resize();

    const types: FloralItem["type"][] = [
      "sunflower", "petal", "petal", "leaf", "leaf",
      "sparkle", "sparkle", "sparkle", "petal", "sunflower",
    ];

    const items: FloralItem[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: types[i % types.length] === "sunflower"
        ? Math.random() * 18 + 14
        : Math.random() * 14 + 8,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 10,
      drift: (Math.random() - 0.5) * 80,
      opacity: Math.random() * 0.4 + 0.3,
      type: types[i % types.length],
    }));
    setFlorals(items);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 bottom-0 frame-bound pointer-events-none z-[1]" aria-hidden="true">
      {florals.map((f) => (
        <div
          key={f.id}
          className="absolute"
          style={{ 
            left: `${f.x}%`, 
            top: "-5%",
            // Custom CSS variables for the keyframes
            "--tx": `${f.drift}px`,
            "--tr": `360deg`,
            animation: `leaf-fall ${f.duration}s linear ${f.delay}s infinite`,
            opacity: 0, // Starts hidden until keyframe takes over
          } as React.CSSProperties}
        >
          {f.type === "sunflower" && (
            <SunflowerSVG size={f.size} opacity={f.opacity} />
          )}
          {f.type === "petal" && (
            <PetalSVG size={f.size} opacity={f.opacity} />
          )}
          {f.type === "sparkle" && (
            <SparkleSmall size={f.size} opacity={f.opacity} />
          )}
          {f.type === "leaf" && (
            <LeafSVG size={f.size} opacity={f.opacity} />
          )}
        </div>
      ))}
    </div>
  );
}
