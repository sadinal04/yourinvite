"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InvitationData } from "@/types/invitation";
import { CalendarDays, Clock, MapPin, Navigation, Heart, Gem } from "lucide-react";
import { fadeLeft, fadeRight, fadeDown, zoomIn, staggerContainer, SectionLabel, GoldOrnamentDivider } from "@/components/ui/Animations";

interface EventSectionProps {
  data: InvitationData;
}

const EventCard = ({
  type, event, direction, delay,
}: {
  type: "akad" | "resepsi";
  event: { date: string; time: string; venue: string; address: string; mapsUrl?: string };
  direction: "left" | "right";
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const isAkad = type === "akad";

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 relative overflow-hidden"
      variants={direction === "left" ? fadeLeft : fadeRight}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: delay ?? 0 }}
    >
      {/* Animated top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: isAkad ? "linear-gradient(90deg, transparent, #CC9B3F 30%, #CC9B3F 70%, transparent)" : "linear-gradient(90deg, transparent, #65081F 30%, #65081F 70%, transparent)", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: (delay ?? 0) + 0.3 }}
      />

      {/* Faded corner sunflower */}
      <div className="absolute bottom-0 right-0 opacity-[0.06]">
        <svg width="90" height="90" viewBox="0 0 60 60" fill="none">
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i * 360) / 10;
            return (
              <ellipse key={i}
                cx={30 + 17 * Math.cos((angle * Math.PI) / 180)}
                cy={30 + 17 * Math.sin((angle * Math.PI) / 180)}
                rx={3.5} ry={8} fill="#CC9B3F"
                transform={`rotate(${angle + 90}, ${30 + 17 * Math.cos((angle * Math.PI) / 180)}, ${30 + 17 * Math.sin((angle * Math.PI) / 180)})`}
              />
            );
          })}
          <circle cx="30" cy="30" r="12" fill="#CC9B3F" />
        </svg>
      </div>

      {/* Badge */}
      <motion.div variants={zoomIn} className="inline-block mb-4">
          <div className="rounded-full px-4 py-1.5" style={{ background: isAkad ? "linear-gradient(135deg, #CC9B3F, #B5832A)" : "linear-gradient(135deg, #65081F, #8a1530)" }}>
            <p className="text-xs tracking-[0.2em] uppercase text-white flex items-center justify-center gap-1.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {isAkad ? (
                <><Gem size={12} /> Akad Nikah</>
              ) : (
                <><Heart size={12} /> Resepsi</>
              )}
            </p>
          </div>
      </motion.div>

      {/* Details */}
      <div className="space-y-4 mb-4">
        {[
          { Icon: CalendarDays, label: "Tanggal", value: event.date },
          { Icon: Clock, label: "Waktu", value: `${event.time} – Selesai` },
          { Icon: MapPin, label: "Tempat", value: event.venue, sub: event.address },
        ].map(({ Icon, label, value, sub }, i) => (
          <motion.div key={i} className="flex items-start gap-3"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: (delay ?? 0) + 0.15 * i + 0.2 }}>
            {/* Icon circle */}
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "rgba(204,155,63,0.1)",
              border: "1px solid rgba(204,155,63,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={14} style={{ color: "#CC9B3F" }} />
            </div>
            <div style={{ paddingTop: 2 }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#B5832A",
                marginBottom: "0.2rem",
                opacity: 0.8,
              }}>
                {label}
              </p>
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#2a1a0a",
                lineHeight: 1.35,
              }}>
                {value}
              </p>
              {sub && (
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "0.78rem",
                  color: "#6a4e30",
                  marginTop: "0.15rem",
                  lineHeight: 1.4,
                }}>
                  {sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Maps button */}
      {event.mapsUrl && (
        <motion.a
          href={event.mapsUrl} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-xl mt-1 flex items-center justify-center gap-2"
          style={{ border: "1px solid rgba(204,155,63,0.35)", background: "rgba(204,155,63,0.05)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.875rem", color: "#B5832A", letterSpacing: "0.1em", textDecoration: "none" }}
          whileHover={{ scale: 1.02, background: "rgba(204,155,63,0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          <Navigation size={14} />
          Buka Google Maps
        </motion.a>
      )}
    </motion.div>
  );
};

export default function EventSection({ data }: EventSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="event" className="section-snap-tall section-px py-14 relative"
      style={{ background: "linear-gradient(180deg, #fdf5ec 0%, #ffffff 100%)" }}>

      <div ref={ref} className="text-center mb-8">
        <SectionLabel text="Jadwal Acara" />
        <motion.h2
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3rem", color: "#CC9B3F" }}
          variants={fadeDown}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          Waktu & Tempat
        </motion.h2>
        <GoldOrnamentDivider icon="star" delay={0.3} />
      </div>

      <div className="space-y-4">
        <EventCard type="akad" event={data.event.akad} direction="left" delay={0.1} />
        <EventCard type="resepsi" event={data.event.resepsi} direction="right" delay={0.1} />
      </div>
    </section>
  );
}
