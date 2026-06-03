"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Heart, Sparkles, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui/Animations";

// ─── Story data ────────────────────────────────────────────────────────────
const LOVE_STORIES = [
  { img: "1.jpg",  title: "Awal Pertemuan",      date: "2024"          },
  { img: "2.jpg",  title: "Saling Mengenal",      date: "2024"          },
  { img: "3.jpg",  title: "Kedekatan Tumbuh",     date: "2024"          },
  { img: "4.jpg",  title: "Momen Kebersamaan",    date: "Awal 2025"     },
  { img: "5.jpg",  title: "Cerita Kita",          date: "Februari 2025" },
  { img: "6.jpg",  title: "Hari-Hari Indah",      date: "Maret 2025"    },
  { img: "7.jpg",  title: "Tawa & Canda",         date: "April 2025"    },
  { img: "8.jpg",  title: "Semakin Dekat",        date: "Mei 2025"      },
  { img: "9.jpg",  title: "Jalan Bersama",        date: "Juni 2025"     },
  { img: "10.jpg", title: "Kenangan Manis",       date: "Juli 2025"     },
  { img: "11.jpg", title: "Masa Indah",           date: "Agustus 2025"  },
  { img: "12.jpg", title: "Siap Melangkah",       date: "Oktober 2025"  },
  { img: "13.jpg", title: "Lamaran",              date: "November 2025" },
  { img: "14.jpg", title: "Menuju Pelaminan",     date: "2026"          },
] as const;

// ─── Gold particles ─────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: ((i * 6.2 + 3) % 96).toFixed(1),
  top:  ((i * 7.1 + 2) % 94).toFixed(1),
  size: (0.8 + (i % 3) * 0.5).toFixed(1),
  dur:  2.2 + (i % 4) * 0.7,
  delay: (i * 0.4) % 4,
}));

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Individual story card ───────────────────────────────────────────────────
function StoryCard({
  item,
  index,
}: {
  item: (typeof LOVE_STORIES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className="w-full flex flex-col items-center">
      {/* Connector Line from previous card */}
      {index > 0 && (
        <div className="w-px h-10 relative overflow-hidden mb-2.5" style={{ background: "rgba(204,155,63,0.12)" }}>
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{
              width: "100%",
              background: "linear-gradient(to bottom, #CC9B3F, #E0B96A)",
            }}
          />
        </div>
      )}

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: index > 0 ? 0.45 : 0.1 }}
        style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "linear-gradient(135deg, #CC9B3F, #E0B96A)",
          boxShadow: "0 0 12px rgba(204,155,63,0.7)",
          marginBottom: 10,
        }}
      />

      {/* Story title */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index > 0 ? 0.55 : 0.2, ease: EASE }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          fontWeight: 600,
          fontStyle: "italic",
          color: "#E0B96A",
          textAlign: "center",
          letterSpacing: "0.04em",
          marginBottom: "0.75rem",
        }}
      >
        {item.title}
      </motion.p>

      {/* Photo card — simple clean border */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: index > 0 ? 0.65 : 0.3, ease: EASE }}
        className="w-full"
        style={{
          borderRadius: "0.875rem",
          overflow: "hidden",
          border: "1px solid rgba(204,155,63,0.3)",
          background: "#0d0804",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(204,155,63,0.08) inset",
        }}
      >
        {/* Photo — full landscape 16:9, no crop */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#080503" }}>
          <Image
            src={`/Love Story/${item.img}`}
            alt={item.title}
            fill
            sizes="(max-width: 480px) 100vw, 420px"
            style={{ objectFit: "contain", objectPosition: "center" }}
            loading={index < 3 ? "eager" : "lazy"}
          />
        </div>

        {/* Card footer */}
        <div style={{
          padding: "0.5rem 0.875rem",
          borderTop: "1px solid rgba(204,155,63,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "rgba(204,155,63,0.4)",
            textTransform: "uppercase",
          }}>
            {String(index + 1).padStart(2, "0")} / 14
          </span>
          <Heart size={10} color="rgba(204,155,63,0.35)" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function LoveStorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section
      ref={ref}
      id="love-story"
      className="section-snap-tall section-px py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0f05 0%, #0d0804 40%, #1a0f05 80%, #2a1a0a 100%)" }}
    >
      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`, height: `${p.size}px`,
              left: `${p.left}%`, top: `${p.top}%`,
              background: "#CC9B3F",
            }}
            animate={{ opacity: [0.04, 0.45, 0.04], scale: [0.8, 1.5, 0.8] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 30% at 50% 0%, rgba(204,155,63,0.05) 0%, transparent 70%)",
      }} />

      {/* ─── Header ─── */}
      <div className="relative z-10 text-center mb-10">
        <SectionLabel text="Our Journey" color="rgba(204,155,63,0.55)" />

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.4rem)",
            fontWeight: 600,
            fontStyle: "italic",
            color: "#E0B96A",
            letterSpacing: "0.04em",
            lineHeight: 1.2,
          }}
        >
          Love Story
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <div style={{ height: 1, width: 44, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
          <Sparkles size={12} color="rgba(204,155,63,0.6)" />
          <div style={{ height: 1, width: 44, background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.78rem",
            color: "rgba(224,185,106,0.4)",
            fontStyle: "italic",
            marginTop: "0.6rem",
          }}
        >
          Setiap momen adalah hadiah terindah dari-Nya
        </motion.p>
      </div>

      {/* ─── Timeline ─── */}
      <div className="relative z-10">
        {/* Story cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", paddingBottom: "2rem" }}>
          {LOVE_STORIES.map((item, index) => (
            <StoryCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* ─── Closing line ─── */}
      <motion.div
        className="relative z-10 text-center mt-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div style={{ height: 1, width: 32, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.4))" }} />
          <Heart size={14} color="rgba(204,155,63,0.5)" />
          <div style={{ height: 1, width: 32, background: "linear-gradient(90deg, rgba(204,155,63,0.4), transparent)" }} />
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.05rem",
          fontStyle: "italic",
          color: "rgba(224,185,106,0.55)",
          letterSpacing: "0.04em",
        }}>
          Dan kini, saatnya menjadi satu…
        </p>
      </motion.div>
      <div className="h-28" /> {/* Extra bottom spacing */}
    </section>
  );
}
