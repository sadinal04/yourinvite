"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

interface MusicControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicController({
  isPlaying,
  onToggle,
}: MusicControllerProps) {
  return (
    <AnimatePresence>
      <motion.button
        className="music-btn"
        onClick={onToggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Rotating ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Pulsing outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(204,155,63,0.4) 0%, transparent 70%)",
          }}
          animate={
            isPlaying
              ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }
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
        >
          {isPlaying ? (
            <Pause size={18} color="white" strokeWidth={2} />
          ) : (
            <Music size={18} color="white" strokeWidth={2} />
          )}
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
