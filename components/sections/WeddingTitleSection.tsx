"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { InvitationData } from "@/types/invitation";
import { ScrollCue } from "@/components/ui/Animations";

interface WeddingTitleSectionProps {
  data: InvitationData;
}

// Rising gold sparkle stars
const SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: ((i * 6.7 + 2.3) % 94),
  startY: 20 + ((i * 5.3 + 1) % 70),
  size: 2 + (i % 3) * 1.5,
  dur: 5 + (i % 6) * 1.2,
  delay: (i * 0.45) % 7,
}));

export default function WeddingTitleSection({ data }: WeddingTitleSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  // Separate controls: mandala & content
  const mandalaControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    const sequence = async () => {
      // Phase 1: mandala spin cepat dari 0, opacity naik
      await mandalaControls.start({
        rotate: 720,          // 2 putaran penuh
        opacity: 0.18,        // lebih terlihat saat berputar cepat
        scale: 1.15,
        transition: {
          rotate: { duration: 0.8, ease: [0.2, 0, 0.4, 1] },
          opacity: { duration: 0.3, ease: "easeOut" },
          scale:   { duration: 0.8, ease: [0.2, 0, 0.4, 1] },
        },
      });

      // Phase 2: melambat & mengecil ke posisi normal, opacity turun ke subtle
      await mandalaControls.start({
        rotate: 1080,         // 1 putaran lagi tapi lambat
        opacity: 0.06,
        scale: 1,
        transition: {
          rotate: { duration: 1.2, ease: [0.6, 0, 0.8, 1] },
          opacity: { duration: 0.6, ease: "easeOut" },
          scale:   { duration: 0.8, ease: [0.6, 0, 0.8, 1] },
        },
      });

      // Phase 3: terus berputar lambat selamanya
      mandalaControls.start({
        rotate: [1080, 1080 + 360],
        transition: {
          duration: 90,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      });

      // Mulai tampilkan konten — sedikit overlap dengan akhir phase 2
      contentControls.start("visible");
    };

    sequence();
  }, [isInView, mandalaControls, contentControls]);

  const akadDate = new Date(data.event.akad.dateISO);
  const day = akadDate.toLocaleDateString("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" });
  const dateStr = akadDate.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta",
  });

  // Stagger variants for each text element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textVariants: any = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: i * 0.22, ease: "easeOut" },
    }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineVariants: any = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.22, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      id="opening"
      className="section-snap section-px text-center relative overflow-hidden flex flex-col justify-center"
      style={{
        background: "linear-gradient(175deg, #fffdf8 0%, #fdf5ec 45%, #fbecd9 100%)",
      }}
    >
      {/* ── Rising gold sparkles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {SPARKLES.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full sparkle-rise"
            style={{
              left: `${s.x}%`,
              top: `${s.startY}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: `radial-gradient(circle, #E0B96A 0%, rgba(204,155,63,0.4) 60%, transparent 100%)`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              opacity: 0,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Mandala watermark — spin fast then slow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          animate={mandalaControls}
          initial={{ rotate: 0, opacity: 0, scale: 1.3 }}
        >
          <svg width="320" height="320" viewBox="0 0 200 200">
            {Array.from({ length: 18 }, (_, i) => {
              const angle = (i * 360) / 18;
              return (
                <ellipse key={i}
                  cx={100 + 72 * Math.cos((angle * Math.PI) / 180)}
                  cy={100 + 72 * Math.sin((angle * Math.PI) / 180)}
                  rx={9} ry={26} fill="#B5832A"
                  transform={`rotate(${angle + 90}, ${100 + 72 * Math.cos((angle * Math.PI) / 180)}, ${100 + 72 * Math.sin((angle * Math.PI) / 180)})`}
                />
              );
            })}
            <circle cx="100" cy="100" r="26" fill="#B5832A" />
          </svg>
        </motion.div>
      </div>

      {/* ── Corner floral ornaments ── */}
      <div className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14, transform: "rotate(180deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14, transform: "rotate(270deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14, transform: "rotate(90deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none select-none"
        style={{ width: "110px", height: "110px", opacity: 0.14, transform: "rotate(0deg)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* ── Single thin border frame ── */}
      <div className="absolute pointer-events-none"
        style={{ inset: "18px", border: "1px solid rgba(204,155,63,0.15)" }} />

      {/* ── Main content — appears after mandala settles ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full gap-y-0">

        {/* THE WEDDING OF */}
        <motion.p
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.62rem",
            letterSpacing: "0.45em",
            color: "#B5832A",
            textTransform: "uppercase",
          }}
        >
          The Wedding of
        </motion.p>

        {/* Top separator */}
        <motion.div
          custom={1}
          variants={lineVariants}
          initial="hidden"
          animate={contentControls}
          className="my-3"
          style={{
            height: "1px", width: "60px",
            background: "linear-gradient(90deg, transparent, #CC9B3F, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Groom Name */}
        <motion.h1
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          className="leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Italianno', cursive",
            fontSize: "clamp(3.2rem, 10vw, 4rem)",
            color: "#5a3e28",
            textShadow: "0 1px 8px rgba(101, 65, 20, 0.15)",
            marginBottom: "-0.2rem",
          }}
        >
          {data.groom.name.split(",")[0]}
        </motion.h1>

        {/* Ampersand row */}
        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          className="flex items-center gap-3 my-2"
        >
          <div style={{ height: "1px", width: "36px", background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5))" }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="1.5" fill="#CC9B3F" opacity="0.6" />
            <circle cx="5" cy="5" r="4" stroke="#CC9B3F" strokeWidth="0.5" fill="none" opacity="0.25" />
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#CC9B3F", fontStyle: "italic", lineHeight: 1 }}>&</span>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="1.5" fill="#CC9B3F" opacity="0.6" />
            <circle cx="5" cy="5" r="4" stroke="#CC9B3F" strokeWidth="0.5" fill="none" opacity="0.25" />
          </svg>
          <div style={{ height: "1px", width: "36px", background: "linear-gradient(90deg, rgba(204,155,63,0.5), transparent)" }} />
        </motion.div>

        {/* Bride Name */}
        <motion.h2
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          className="leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Italianno', cursive",
            fontSize: "clamp(3.2rem, 10vw, 4rem)",
            color: "#5a3e28",
            textShadow: "0 1px 8px rgba(101, 65, 20, 0.15)",
            marginTop: "-0.2rem",
          }}
        >
          {data.bride.name.split(",")[0]}
        </motion.h2>

        {/* Bottom separator */}
        <motion.div
          custom={5}
          variants={lineVariants}
          initial="hidden"
          animate={contentControls}
          className="my-3"
          style={{
            height: "1px", width: "80px",
            background: "linear-gradient(90deg, transparent, #CC9B3F, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Date */}
        <motion.p
          custom={6}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "0.78rem",
            color: "#8a6a4a",
            letterSpacing: "0.06em",
            fontStyle: "italic",
          }}
        >
          {day}, {dateStr}
        </motion.p>

        {/* Bismillah */}
        <motion.p
          custom={7}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          className="mt-3 text-lg"
          style={{ fontFamily: "'Lora', serif", color: "rgba(180,130,60,0.6)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        {/* Scroll untuk lanjut */}
        <motion.p
          custom={8}
          variants={textVariants}
          initial="hidden"
          animate={contentControls}
          className="mt-4 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(180,130,60,0.45)" }}
        >
          Scroll untuk lanjut
        </motion.p>
      </div>

      <ScrollCue />
    </section>
  );
}
