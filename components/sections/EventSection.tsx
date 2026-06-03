"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { InvitationData } from "@/types/invitation";
import { CalendarDays, Clock, MapPin, Navigation } from "lucide-react";

interface EventSectionProps {
  data: InvitationData;
}

// ── Gold Ornament Divider ───────────────────────────────────────────────────────────
function GoldOrnamentDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0.8rem auto",
        position: "relative",
        zIndex: 2,
        width: "100%",
        gap: "0.5rem"
      }}
    >
      <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, rgba(204, 155, 63, 0.6))" }} />
      <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#CC9B3F", opacity: 0.6 }} />
      <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, rgba(204, 155, 63, 0.6), transparent)" }} />
    </motion.div>
  );
}

// ── Arch Card ─────────────────────────────────────────────────────────────────
// akad  → arch on TOP, flat bottom
// resepsi → flat top, arch on BOTTOM
const ArchCard = ({
  type,
  event,
  delay,
}: {
  type: "akad" | "resepsi";
  event: { date: string; time: string; venue: string; address: string; mapsUrl?: string };
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const isAkad = type === "akad";
  const label = isAkad ? "Akad Nikah" : "Resepsi";

  // Akad: rounded top (arch), flat bottom
  // Resepsi: flat top, rounded bottom (inverted arch)
  const borderRadius = isAkad
    ? "50% 50% 14px 14px / 80px 80px 14px 14px"
    : "14px 14px 50% 50% / 14px 14px 80px 80px";

  const paddingTop = isAkad ? "3.2rem" : "2rem";
  const paddingBottom = isAkad ? "2rem" : "3.2rem";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isAkad ? -40 : 40, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: delay ?? 0, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", width: "100%" }}
    >
      {/* Outer glow halo */}
      <div style={{
        position: "absolute", inset: -4, borderRadius,
        background: "transparent",
        border: "1px solid rgba(204,155,63,0.22)",
        boxShadow: "0 0 24px rgba(204,155,63,0.12)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        position: "relative",
        background: "linear-gradient(160deg, #fffdf8 0%, #fff9f0 100%)",
        border: "2px solid rgba(204,155,63,0.65)",
        borderRadius,
        paddingTop,
        paddingBottom,
        paddingLeft: "1.9rem",
        paddingRight: "1.9rem",
        textAlign: "center",
        boxShadow: "0 12px 48px rgba(204,155,63,0.18), 0 4px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
        overflow: "hidden",
      }}>
        {/* Animated gold shimmer bar — top (akad) or bottom (resepsi) */}
        {isAkad ? (
          <motion.div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
            background: "linear-gradient(90deg, transparent, #CC9B3F, #E8D09A, #CC9B3F, transparent)",
            transformOrigin: "center",
          }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: (delay ?? 0) + 0.4 }}
          />
        ) : (
          <motion.div style={{
            position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2,
            background: "linear-gradient(90deg, transparent, #CC9B3F, #E8D09A, #CC9B3F, transparent)",
            transformOrigin: "center",
          }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: (delay ?? 0) + 0.4 }}
          />
        )}

        {/* Faint watermark sunflower */}
        <div style={{
          position: "absolute",
          ...(isAkad ? { bottom: -20, right: -20 } : { top: -20, left: -20 }),
          opacity: 0.035, pointerEvents: "none",
        }}>
          <svg width="110" height="110" viewBox="0 0 200 200">
            {Array.from({ length: 14 }, (_, i) => {
              const angle = (i * 360) / 14;
              return (
                <ellipse key={i}
                  cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
                  cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
                  rx={11} ry={26} fill="#CC9B3F"
                  transform={`rotate(${angle + 90}, ${100 + 60 * Math.cos((angle * Math.PI) / 180)}, ${100 + 60 * Math.sin((angle * Math.PI) / 180)})`}
                />
              );
            })}
            <circle cx="100" cy="100" r="24" fill="#CC9B3F" />
          </svg>
        </div>

        {/* Type label in script */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: (delay ?? 0) + 0.2 }}
          style={{
            fontFamily: "'Italianno', cursive",
            fontSize: "3.2rem",
            color: "#CC9B3F",
            lineHeight: 1.1,
            marginBottom: "1.2rem",
            textShadow: "0 2px 14px rgba(204,155,63,0.16)",
          }}
        >
          {label}
        </motion.p>

        {/* Details grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {/* Date */}
          <Detail
            Icon={CalendarDays}
            label="Hari & Tanggal"
            value={event.date}
            inView={isInView}
            delay={(delay ?? 0) + 0.3}
            direction={isAkad ? "left" : "right"}
          />
          <GoldSeparator />
          {/* Time */}
          <Detail
            Icon={Clock}
            label="Waktu"
            value={`${event.time} – Selesai`}
            inView={isInView}
            delay={(delay ?? 0) + 0.4}
            direction={isAkad ? "left" : "right"}
          />
          <GoldSeparator />
          {/* Location */}
          <Detail
            Icon={MapPin}
            label="Tempat"
            value={event.venue}
            sub={event.address}
            inView={isInView}
            delay={(delay ?? 0) + 0.5}
            direction={isAkad ? "left" : "right"}
          />
        </div>

        {/* Maps button */}
        {event.mapsUrl && (
          <motion.a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (delay ?? 0) + 0.62 }}
            whileHover={{ scale: 1.03, background: "rgba(204,155,63,0.1)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              marginTop: "1.3rem",
              padding: "0.55rem 1.5rem",
              border: "1px solid rgba(204,155,63,0.42)",
              borderRadius: "2rem",
              background: "transparent",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.78rem",
              color: "#B5832A",
              letterSpacing: "0.14em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            <Navigation size={11} />
            Buka Maps
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

// ── Detail row ────────────────────────────────────────────────────────────────
function Detail({
  Icon, label, value, sub, inView, delay, direction,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  inView: boolean;
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -12 : 12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: "rgba(204,155,63,0.08)",
        border: "1px solid rgba(204,155,63,0.28)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={14} style={{ color: "#CC9B3F" }} />
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.6rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "#B5832A",
        opacity: 0.78,
      }}>{label}</p>
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: "0.93rem",
        fontWeight: 700,
        color: "#2a1a0a",
        lineHeight: 1.35,
      }}>{value}</p>
      {sub && (
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: "0.75rem",
          color: "#6a4e30",
          lineHeight: 1.5,
          marginTop: "0.05rem",
        }}>{sub}</p>
      )}
    </motion.div>
  );
}

// ── Thin gold separator ────────────────────────────────────────────────────────
function GoldSeparator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
      <div style={{ height: 1, width: 28, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.38))" }} />
      <svg width="5" height="5" viewBox="0 0 5 5">
        <circle cx="2.5" cy="2.5" r="2" fill="#CC9B3F" opacity="0.45" />
      </svg>
      <div style={{ height: 1, width: 28, background: "linear-gradient(90deg, rgba(204,155,63,0.38), transparent)" }} />
    </div>
  );
}



// ── Main Section ───────────────────────────────────────────────────────────────
export default function EventSection({ data }: EventSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px 0px" });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-40px 0px" });

  return (
    <section
      id="event"
      className="section-snap-tall section-px py-14 relative"
      style={{ background: "linear-gradient(180deg, #fffdf9 0%, #fdf5ec 40%, #ffffff 100%)" }}
    >
      {/* Background sunflower watermarks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 left-0 opacity-[0.022] w-52 h-52" viewBox="0 0 200 200">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 360) / 12;
            return <ellipse key={i} cx={100 + 55 * Math.cos((a * Math.PI) / 180)} cy={100 + 55 * Math.sin((a * Math.PI) / 180)} rx={12} ry={28} fill="#CC9B3F" transform={`rotate(${a + 90}, ${100 + 55 * Math.cos((a * Math.PI) / 180)}, ${100 + 55 * Math.sin((a * Math.PI) / 180)})`} />;
          })}
          <circle cx="100" cy="100" r="25" fill="#CC9B3F" />
        </svg>
        <svg className="absolute bottom-24 right-0 opacity-[0.022] w-52 h-52" viewBox="0 0 200 200">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 360) / 12;
            return <ellipse key={i} cx={100 + 55 * Math.cos((a * Math.PI) / 180)} cy={100 + 55 * Math.sin((a * Math.PI) / 180)} rx={12} ry={28} fill="#CC9B3F" transform={`rotate(${a + 90}, ${100 + 55 * Math.cos((a * Math.PI) / 180)}, ${100 + 55 * Math.sin((a * Math.PI) / 180)})`} />;
          })}
          <circle cx="100" cy="100" r="25" fill="#CC9B3F" />
        </svg>
      </div>

      {/* ─── Save The Date Header ────────────────────────────────────────────── */}
      <div ref={headerRef} className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.62rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "#B5832A",
            marginBottom: "0.3rem",
          }}
        >
          Jadwal Acara
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.9rem",
            fontWeight: 700,
            color: "#2a1a0a",
            letterSpacing: "0.18em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}>SAVE</p>
          <p style={{
            fontFamily: "'Italianno', cursive",
            fontSize: "3.5rem",
            color: "#CC9B3F",
            lineHeight: 1,
            marginTop: "0.1rem",
          }}>The Date</p>
        </motion.div>

        {/* Gold ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", marginTop: "0.9rem" }}
        >
          <div style={{ height: 1, width: 55, background: "linear-gradient(90deg, transparent, #CC9B3F)" }} />
          <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" opacity="0.75" />
          </svg>
          <div style={{ height: 1, width: 55, background: "linear-gradient(90deg, #CC9B3F, transparent)" }} />
        </motion.div>
      </div>

      {/* ─── Akad card (arch top) → Floral → Resepsi card (arch bottom) ──────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
        <ArchCard type="akad" event={data.event.akad} delay={0.1} />
        <GoldOrnamentDivider />
        <ArchCard type="resepsi" event={data.event.resepsi} delay={0.15} />
      </div>

      {/* ─── Merged Location / Petunjuk Arah ────────────────────────────────── */}
      <div ref={mapRef} style={{ marginTop: "3rem" }}>
        {/* Location header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#B5832A",
            marginBottom: "0.3rem",
          }}>Petunjuk Arah</p>
          <p style={{
            fontFamily: "'Italianno', cursive",
            fontSize: "2.8rem",
            color: "#CC9B3F",
            lineHeight: 1,
          }}>Lokasi</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.65rem" }}>
            <div style={{ height: 1, width: 45, background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.6))" }} />
            <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3" fill="#CC9B3F" opacity="0.6" /></svg>
            <div style={{ height: 1, width: 45, background: "linear-gradient(90deg, rgba(204,155,63,0.6), transparent)" }} />
          </div>
        </motion.div>

        {/* Mini location cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "1.2rem" }}>
          {[
            { type: "Akad Nikah", color: "#CC9B3F", ...data.event.akad },
            { type: "Resepsi",    color: "#65081F", ...data.event.resepsi },
          ].map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -18 : 18 }}
              animate={mapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.58, delay: 0.1 * i + 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "1px solid rgba(204,155,63,0.2)",
                borderRadius: "0.875rem",
                padding: "0.9rem 1rem",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${loc.color} 30%, ${loc.color} 70%, transparent)`,
              }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.58rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: loc.color,
                marginBottom: "0.28rem",
                opacity: 0.85,
              }}>{loc.type}</p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", fontWeight: 700, color: "#2a1a0a", marginBottom: "0.18rem" }}>{loc.venue}</p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "0.74rem", color: "#6a4e30", lineHeight: 1.5, marginBottom: "0.55rem" }}>{loc.address}</p>
              {loc.mapsUrl && (
                <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.38rem 0.85rem", borderRadius: "2rem",
                  border: "1px solid rgba(204,155,63,0.32)", background: "rgba(204,155,63,0.06)",
                  color: "#B5832A", fontSize: "0.68rem",
                  fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.08em", textDecoration: "none",
                }}>
                  <Navigation size={10} />
                  Lihat di Google Maps
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32 }}
          style={{
            borderRadius: "1rem", overflow: "hidden",
            border: "1px solid rgba(204,155,63,0.28)",
            boxShadow: "0 4px 24px rgba(204,155,63,0.1)",
            position: "relative",
          }}
        >
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent("Krueng Juli Timu, Kuala, Bireuen, Aceh")}&output=embed&z=15`}
            width="100%" height="200"
            style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Resepsi"
          />
        </motion.div>

        {/* CTA Button */}
        {data.event.resepsi.mapsUrl && (
          <motion.a
            href={data.event.resepsi.mapsUrl} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, delay: 0.48 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(204,155,63,0.42)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.5rem", width: "100%", padding: "0.95rem",
              borderRadius: "1rem", marginTop: "1rem",
              background: "linear-gradient(135deg, #CC9B3F, #B5832A)",
              color: "#ffffff",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", letterSpacing: "0.1em", textDecoration: "none",
              boxShadow: "0 4px 18px rgba(204,155,63,0.32)",
            }}
          >
            <Navigation size={16} />
            Buka Google Maps
          </motion.a>
        )}
      </div>

      <div style={{ height: "7rem" }} />
    </section>
  );
}
