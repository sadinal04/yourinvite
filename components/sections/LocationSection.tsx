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
      className="section-px py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fbecd9 100%)",
      } as React.CSSProperties}
    >
      {/* Background Floral Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.07] pointer-events-none" style={{ transform: "rotate(180deg) translate(20%, 20%)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-10 right-0 w-72 h-72 opacity-[0.07] pointer-events-none" style={{ transform: "rotate(0deg) translate(20%, 20%)" }}>
        <img src="/desain/goldfloral.png" alt="" className="w-full h-full object-contain" />
      </div>
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
            fontFamily: "'Italianno', cursive",
            fontSize: "3.2rem",
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



      {/* Map iframe wrapped in an Arch frame */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden relative mt-10 p-2"
        style={{
          background: "linear-gradient(145deg, #ffffff, #fdf5ec)",
          border: "2px solid rgba(204,155,63,0.6)",
          boxShadow: "0 15px 45px rgba(204,155,63,0.2), inset 0 2px 10px rgba(255,255,255,1)",
          borderRadius: "50% 50% 16px 16px / 70px 70px 16px 16px",
          paddingTop: "2.5rem"
        }}
      >
        <div 
          className="absolute inset-[6px] pointer-events-none z-20" 
          style={{ 
            borderRadius: "50% 50% 10px 10px / 65px 65px 10px 10px",
            border: "1px solid rgba(204,155,63,0.3)" 
          }} 
        />

        <div className="overflow-hidden relative z-10" style={{ 
          borderRadius: "50% 50% 12px 12px / 60px 60px 12px 12px",
          border: "1px solid rgba(204,155,63,0.25)" 
        }}>
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ boxShadow: "inset 0 0 20px rgba(204,155,63,0.4)" }} />
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent("Krueng Juli Timu, Kuala, Bireuen, Aceh")}&output=embed&z=15`}
            width="100%"
            height="260"
            style={{ border: 0, display: "block", filter: "contrast(1.1) sepia(0.2) hue-rotate(-5deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Utama"
          />
        </div>
      </motion.div>

      {/* Main Maps button */}
      {mapsUrl && (
        <motion.a
          variants={itemVariants}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full text-center py-4 rounded-[2rem] mt-6 relative overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #DFB976 0%, #B5832A 100%)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.15em",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(181,131,42,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
            textTransform: "uppercase"
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 12px 28px rgba(181,131,42,0.5), inset 0 2px 4px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition-opacity" />
          <Navigation size={18} strokeWidth={2.5} />
          Buka Google Maps
        </motion.a>
      )}
      <div className="h-28" /> {/* Extra bottom spacing */}
    </SectionWrapper>
    </section>
  );
}
