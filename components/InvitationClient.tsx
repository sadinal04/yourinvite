"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationData } from "@/types/invitation";
import CoverScreen from "@/components/cover/CoverScreen";
import FloatingParticles from "@/components/ui/FloatingParticles";
import FloatingFlowers from "@/components/ui/FloatingFlowers";
import MusicController from "@/components/ui/MusicController";
import OpeningSection from "@/components/sections/OpeningSection";
import CoupleSection from "@/components/sections/CoupleSection";
import CountdownSection from "@/components/sections/CountdownSection";
import EventSection from "@/components/sections/EventSection";
import LocationSection from "@/components/sections/LocationSection";
import QuranSection from "@/components/sections/QuranSection";
import FamilySection from "@/components/sections/FamilySection";
import LoveStorySection from "@/components/sections/LoveStorySection";
import ClosingSection from "@/components/sections/ClosingSection";
import { useAudio } from "@/hooks/useAudio";
import { useSnapScroll } from "@/hooks/useSnapScroll";

interface InvitationClientProps {
  data: InvitationData;
  guestName: string;
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
    play(); // silently skips if audio unavailable
  }, [play]);

  // Activate JS snap-scroll once invitation is opened
  useSnapScroll(isOpen);

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
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <OpeningSection data={data} />
            <CoupleSection data={data} />
            <CountdownSection data={data} />
            <EventSection data={data} />
            <LocationSection data={data} />
            <QuranSection data={data} />
            <FamilySection data={data} />
            <LoveStorySection />
            <ClosingSection data={data} guestName={guestName} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Music Controller — only shown when audio file is available */}
      {isOpen && isAvailable && (
        <MusicController isPlaying={isPlaying} onToggle={toggle} />
      )}
    </div>
  );
}
