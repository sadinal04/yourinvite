"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";

interface MusicControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

// Custom Vinyl Record SVG Component
const VinylRecord = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    {/* Vinyl Body */}
    <circle cx="12" cy="12" r="11" fill="#1a1a1a" stroke="#CC9B3F" strokeWidth="0.5" />
    {/* Grooves */}
    <circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    {/* Center Label (Gold) */}
    <circle cx="12" cy="12" r="3" fill="#CC9B3F" />
    {/* Center Hole */}
    <circle cx="12" cy="12" r="0.8" fill="#1a1a1a" />
  </svg>
);

// Floating music notes animation when playing
const FloatingNotes = () => {
  const notes = ["♫", "♪", "♬", "♩"];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(4)].map((_, i) => {
        const randomNote = notes[i % notes.length];
        const delay = i * 0.7;
        const duration = 2.2 + Math.random() * 0.8;
        const xOffset = -15 + Math.random() * 30;

        return (
          <motion.span
            key={i}
            className="absolute text-xs"
            style={{
              left: "40%",
              bottom: "100%",
              color: "#CC9B3F",
              fontWeight: "bold",
              textShadow: "0 0 6px rgba(204,155,63,0.5)",
            }}
            initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: [-5, -60],
              x: [0, xOffset, xOffset * 1.2],
              opacity: [0, 0.85, 0],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {randomNote}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function MusicController({
  isPlaying,
  onToggle,
}: MusicControllerProps) {
  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-[100] flex items-center justify-center">
        {/* Floating notes rising above the button */}
        {isPlaying && <FloatingNotes />}

        <motion.button
          className="music-btn !static"
          onClick={onToggle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
          style={{
            background: isPlaying 
              ? "linear-gradient(135deg, #1a1a1a 0%, #111111 100%)" 
              : "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)",
            border: isPlaying ? "1px solid rgba(204,155,63,0.4)" : "none",
            boxShadow: isPlaying 
              ? "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(204,155,63,0.2)" 
              : "0 4px 15px rgba(204, 155, 63, 0.4)",
          }}
        >
          {/* Rotating ring when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "rgba(204,155,63,0.3)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Pulsing outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: isPlaying
                ? "radial-gradient(circle, rgba(204,155,63,0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(204,155,63,0.4) 0%, transparent 70%)",
            }}
            animate={
              isPlaying
                ? { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }
                : { scale: 1, opacity: 0.2 }
            }
            transition={
              isPlaying
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : {}
            }
          />

          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 4, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
            className="flex items-center justify-center z-10"
          >
            {isPlaying ? (
              <VinylRecord />
            ) : (
              <Music size={18} color="white" strokeWidth={2} />
            )}
          </motion.div>
        </motion.button>
      </div>
    </AnimatePresence>
  );
}
