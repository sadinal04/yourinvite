"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import CoverScreen from "@/components/cover/CoverScreen";
import FloatingParticles from "@/components/ui/FloatingParticles";
import FloatingFlowers from "@/components/ui/FloatingFlowers";
import MusicController from "@/components/ui/MusicController";
import OpeningSection from "@/components/sections/OpeningSection";
import CoupleSection from "@/components/sections/CoupleSection";
import CountdownSection from "@/components/sections/CountdownSection";
import EventSection from "@/components/sections/EventSection";
import QuranSection from "@/components/sections/QuranSection";
import LoveStorySection from "@/components/sections/LoveStorySection";
import ClosingSection from "@/components/sections/ClosingSection";
import WishesSection from "@/components/sections/WishesSection";
import GiftSection from "@/components/sections/GiftSection";
import { useAudio } from "@/hooks/useAudio";
import { useSnapScroll } from "@/hooks/useSnapScroll";

interface InvitationClientProps {
  data: InvitationData;
  guestName: string;
}

// Animatic section wrapper — slides up and covers the previous section
function SectionSlide({
  children,
  index,
  id,
}: {
  children: React.ReactNode;
  index: number;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-5% 0px -5% 0px",
  });

  return (
    <div
      id={id}
      ref={ref}
      style={{
        position: "relative",
        zIndex: 10 + index,
      }}
    >
      <motion.div
        style={{
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function InvitationClient({
  data,
  guestName,
}: InvitationClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mountedSections, setMountedSections] = useState(0); // 0 means completely empty background
  const { isPlaying, isAvailable, play, toggle } = useAudio(
    data.music || "/audio/background.mp3"
  );

  // Progressive mounting to guarantee buttery smooth door animation
  useEffect(() => {
    if (isOpen) {
      // 1. Let the doors slide in an empty vacuum for 1.0s, then gracefully bloom the OpeningSection while doors are still sliding!
      const timer1 = setTimeout(() => {
        setMountedSections(1);
      }, 1000);
      
      // 2. Silently mount all remaining heavy sections after the OpeningSection animation has settled
      const timer2 = setTimeout(() => {
        setMountedSections(99);
      }, 4500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  // Lock scroll when cover is showing
  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen]);

  // Apply invitation theme to body
  useEffect(() => {
    document.body.classList.add("theme-invitation");
    return () => {
      document.body.classList.remove("theme-invitation");
    };
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    play();
  }, [play]);

  // Activate JS snap-scroll once invitation is opened
  useSnapScroll(isOpen);

  // Section definitions with IDs matching snap-scroll hook
  const sections = [
    { id: "opening",    content: <OpeningSection data={data} /> },
    { id: "couple",     content: <CoupleSection data={data} /> },
    { id: "countdown",  content: <CountdownSection data={data} /> },
    { id: "event",      content: <EventSection data={data} /> },
    { id: "quran",      content: <QuranSection data={data} /> },
    { id: "closing",    content: <ClosingSection data={data} guestName={guestName} /> },
    { id: "love-story", content: <LoveStorySection /> },
    { id: "wishes",     content: <WishesSection slug={data.slug} guestName={guestName} /> },
    { id: "gift",       content: <GiftSection /> },
  ];

  return (
    <div className="invitation-wrapper">
      {/* Background particles — deferred to save GPU during door split */}
      {mountedSections > 0 && (
        <>
          <FloatingParticles />
          <FloatingFlowers />
        </>
      )}

      {/* Cover Screen */}
      <CoverScreen
        data={data}
        guestName={guestName}
        isOpen={isOpen}
        onOpen={handleOpen}
      />

      {/* Main Content — revealed after open */}
      <AnimatePresence>
        {isOpen && (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {sections.slice(0, mountedSections).map((s, i) => (
              <SectionSlide key={s.id} index={i} id={s.id}>
                {s.content}
              </SectionSlide>
            ))}

            {/* ── Promotional Footer (Only show when all sections mounted) ── */}
            {mountedSections > 1 && (
              <footer
              style={{
                background: "linear-gradient(180deg, #1a0f05 0%, #0d0804 100%)",
                borderTop: "1px solid rgba(204,155,63,0.15)",
                padding: "2rem 1.5rem 2.5rem",
                textAlign: "center",
                position: "relative",
                zIndex: 200,
              }}
            >
              {/* Thin gold top accent line */}
              <div style={{
                width: "48px", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(204,155,63,0.5), transparent)",
                margin: "0 auto 1.25rem",
              }} />

              {/* Made by label */}
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(204,155,63,0.4)",
                marginBottom: "0.35rem",
              }}>
                Dibuat oleh
              </p>

              {/* Brand name */}
              <a
                href="https://yourinvite.site"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#CC9B3F",
                  letterSpacing: "0.06em",
                  marginBottom: "0.1rem",
                  textDecoration: "none",
                }}
              >
                yourinvite.site
              </a>
              <a
                href="https://cobabantu.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  fontFamily: "'Lora', serif",
                  fontSize: "0.65rem",
                  color: "rgba(204,155,63,0.5)",
                  marginBottom: "1rem",
                  textDecoration: "none",
                }}
              >
                by cobabantu.com
              </a>

              {/* Divider dot */}
              <div style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: "rgba(204,155,63,0.3)",
                margin: "0 auto 1rem",
              }} />

              {/* Price info */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.8rem",
                color: "rgba(224,185,106,0.65)",
                fontStyle: "italic",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}>
                Undangan digital mulai dari{" "}
                <span style={{ fontWeight: 700, color: "#CC9B3F", fontStyle: "normal" }}>80 ribuan</span>
                <br />
                Mau bikin undangan serupa?
              </p>

              {/* WhatsApp CTA Button */}
              <a
                href={`https://wa.me/6285337342258?text=${encodeURIComponent("Halo, saya mau konsultasi terkait undangan digital")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)",
                  color: "white",
                  padding: "0.55rem 1.35rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
                  marginBottom: "0.85rem",
                }}
              >
                {/* WhatsApp icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi Kami via WhatsApp
              </a>

              {/* Social links */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}>
                <a
                  href="https://www.instagram.com/cobabantu_com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                    fontFamily: "'Lora', serif",
                    fontSize: "0.62rem",
                    color: "rgba(204,155,63,0.5)",
                  }}
                >
                  {/* Instagram icon */}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(204,155,63,0.5)" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="rgba(204,155,63,0.5)" stroke="none"/>
                  </svg>
                  @cobabantu.com
                </a>
                <span style={{ color: "rgba(204,155,63,0.2)", fontSize: "0.5rem" }}>◆</span>
                <a
                  href={`https://wa.me/6285337342258`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    fontFamily: "'Lora', serif",
                    fontSize: "0.62rem",
                    color: "rgba(204,155,63,0.5)",
                  }}
                >
                  085337342258
                </a>
              </div>

              {/* Bottom copyright */}
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: "0.55rem",
                color: "rgba(204,155,63,0.2)",
                letterSpacing: "0.1em",
              }}>
                © 2025{" "}
                <a href="https://yourinvite.site" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(204,155,63,0.35)", textDecoration: "none" }}>
                  yourinvite.site
                </a>
                {" · "}
                <a href="https://cobabantu.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(204,155,63,0.35)", textDecoration: "none" }}>
                  cobabantu.com
                </a>
              </p>
            </footer>
            )}
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Music Controller */}
      {isOpen && isAvailable && (
        <MusicController isPlaying={isPlaying} onToggle={toggle} />
      )}
    </div>
  );
}
