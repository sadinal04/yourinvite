"use client";

import { motion } from "framer-motion";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";
import { InvitationData } from "@/types/invitation";
import { Navigation } from "lucide-react";

interface LocationSectionProps {
  data: InvitationData;
}

export default function LocationSection({ data }: LocationSectionProps) {
  const mapsUrl = data.event.resepsi.mapsUrl || data.event.akad.mapsUrl;

  // Extract Google Maps embed URL from share URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    // Convert from maps.app.goo.gl to an embed
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.123!2d96.7!3d5.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTAnNDguMCJOIDk2wrA0MicwMC4wIkU!5e0!3m2!1sid!2sid!4v1000000000000`;
  };

  return (
    <section id="location" className="section-snap-tall">
    <SectionWrapper
      className="section-px py-14 relative"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbecd9 100%)",
      } as React.CSSProperties}
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <p
          className="tracking-[0.3em] text-xs uppercase mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#B5832A",
          }}
        >
          Petunjuk Arah
        </p>
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2.8rem",
            color: "#CC9B3F",
          }}
        >
          Lokasi
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, #CC9B3F)" }} />
          <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#CC9B3F" />
          </svg>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, #CC9B3F, transparent)" }} />
        </div>
      </motion.div>

      {/* Location cards */}
      <div className="space-y-4 mb-6">
        {[
          { type: "Akad Nikah", ...data.event.akad },
          { type: "Resepsi", ...data.event.resepsi },
        ].map((loc, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card p-5 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background:
                  i === 0
                     ? "linear-gradient(90deg, transparent, #CC9B3F 30%, #CC9B3F 70%, transparent)"
                    : "linear-gradient(90deg, transparent, #65081F 30%, #65081F 70%, transparent)",
              }}
            />
            {/* Type label */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: i === 0 ? "#B5832A" : "#65081F",
              marginBottom: "0.5rem",
              opacity: 0.85,
            }}>
              {loc.type}
            </p>
            {/* Venue name */}
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#2a1a0a",
              lineHeight: 1.3,
              marginBottom: "0.35rem",
            }}>
              {loc.venue}
            </p>
            {/* Address */}
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: "0.78rem",
              color: "#6a4e30",
              lineHeight: 1.5,
            }}>
              {loc.address}
            </p>
            {loc.mapsUrl && (
              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 py-1.5 px-3 rounded-full text-xs transition-all"
                style={{
                  background: "rgba(204,155,63,0.1)",
                  border: "1px solid rgba(204,155,63,0.3)",
                  color: "#B5832A",
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                }}
              >
                <Navigation size={11} />
                Lihat di Google Maps
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Map iframe */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl overflow-hidden relative"
        style={{
          border: "1px solid rgba(204,155,63,0.3)",
          boxShadow: "0 4px 24px rgba(204,155,63,0.15)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: "1rem",
            border: "2px solid rgba(204,155,63,0.2)",
          }}
        />
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent("Krueng Juli Timu, Kuala, Bireuen, Aceh")}&output=embed&z=15`}
          width="100%"
          height="220"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Utama"
        />
      </motion.div>

      {/* Main Maps button */}
      {mapsUrl && (
        <motion.a
          variants={itemVariants}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full text-center py-3.5 rounded-2xl mt-5 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #CC9B3F, #B5832A)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            color: "#ffffff",
            letterSpacing: "0.1em",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(204,155,63,0.35)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Navigation size={16} />
          Buka Google Maps
        </motion.a>
      )}
    </SectionWrapper>
    </section>
  );
}
