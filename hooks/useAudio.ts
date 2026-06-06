"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  // Track if user had it playing before tab switch
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio();
    // Disable native loop, we will handle it manually to loop from 10s
    audio.loop = false;
    audio.volume = 0.5;
    audio.preload = "none";

    // Handle custom looping from 10 seconds
    const handleEnded = () => {
      audio.currentTime = 10;
      audio.play().catch(() => {});
    };
    audio.addEventListener("ended", handleEnded);

    const checkAvailability = async () => {
      try {
        const res = await fetch(src, { method: "HEAD" });
        if (res.ok) {
          audio.src = src;
          setIsAvailable(true);
        }
      } catch {
        // silently skip
      }
    };
    checkAvailability();
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  // Page Visibility API — pause saat tab tersembunyi, resume saat kembali
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        if (!audioRef.current.paused) {
          wasPlayingRef.current = true;
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              wasPlayingRef.current = false;
            })
            .catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const play = useCallback(() => {
    if (audioRef.current && isAvailable) {
      audioRef.current
        .play()
        .then(() => {
          // If it's starting from the beginning, jump to 10 seconds
          if (audioRef.current && audioRef.current.currentTime < 10) {
            audioRef.current.currentTime = 10;
          }
          setIsPlaying(true);
          wasPlayingRef.current = true;
        })
        .catch(() => {});
    }
  }, [isAvailable]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      wasPlayingRef.current = false;
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, isAvailable, play, pause, toggle };
}
