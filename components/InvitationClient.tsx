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
    once: true,
    margin: "-5% 0px -5% 0px",
  });

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        position: "relative",
        zIndex: 10 + index,
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.97 }
      }
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function InvitationClient({
  data,
  guestName,
}: InvitationClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, isAvailable, play, toggle } = useAudio(
    data.music || "/audio/background.mp3"
  );

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

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    play();
  }, [play]);

  // Activate JS snap-scroll once invitation is opened
  useSnapScroll(isOpen);

  // Section definitions with IDs matching snap-scroll hook
  const sections = [
    { id: "opening",    Component: () => <OpeningSection data={data} /> },
    { id: "couple",     Component: () => <CoupleSection data={data} /> },
    { id: "countdown",  Component: () => <CountdownSection data={data} /> },
    { id: "event",      Component: () => <EventSection data={data} /> },
    { id: "quran",      Component: () => <QuranSection data={data} /> },
    { id: "love-story", Component: () => <LoveStorySection /> },
    { id: "wishes",     Component: () => <WishesSection slug={data.slug} guestName={guestName} /> },
    { id: "closing",    Component: () => <ClosingSection data={data} guestName={guestName} /> },
  ];

  return (
    <div className="invitation-wrapper">
      {/* Background particles — always visible */}
      <FloatingParticles />
      <FloatingFlowers />

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
            {sections.map((s, i) => (
              <SectionSlide key={s.id} index={i} id={s.id}>
                <s.Component />
              </SectionSlide>
            ))}
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
