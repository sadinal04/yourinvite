"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTION_IDS = [
  "opening",
  "couple",
  "countdown",
  "event",
  "quran",
  "closing",
  "love-story",
  "wishes",
  "gift",
];

export function useSnapScroll(enabled: boolean) {
  const cooldown = useRef(false);
  const touchStartY = useRef(0);

  const getWrapper = () =>
    document.querySelector(".invitation-wrapper") as HTMLElement | null;

  const getSections = () =>
    SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

  const getCurrentIndex = useCallback(() => {
    const wrapper = getWrapper();
    if (!wrapper) return 0;
    const sections = getSections();
    const scrollTop = wrapper.scrollTop;

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollTop + 10) idx = i;
    }
    return idx;
  }, []);

  const scrollToIndex = useCallback((index: number, alignToBottomIfTall: boolean = false) => {
    const wrapper = getWrapper();
    const sections = getSections();
    if (!wrapper || !sections[index]) return;

    const isTall = sections[index].offsetHeight > wrapper.clientHeight + 10;
    const align = (alignToBottomIfTall && isTall) ? "end" : "start";

    cooldown.current = true;
    sections[index].scrollIntoView({ behavior: "smooth", block: align });
    
    // Cooldown duration to let smooth scroll finish
    setTimeout(() => {
      cooldown.current = false;
    }, 800);
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1): boolean => {
      if (cooldown.current) return true;
      if (typeof document !== "undefined" && document.body.classList.contains("modal-open")) {
        return false;
      }
      const wrapper = getWrapper();
      const sections = getSections();
      if (!wrapper) return false;

      const currentIdx = getCurrentIndex();
      const currentSection = sections[currentIdx];
      if (!currentSection) return false;

      const viewportHeight = wrapper.clientHeight;
      const sectionH = currentSection.offsetHeight;
      const scrollTop = wrapper.scrollTop;
      const sectionTop = currentSection.offsetTop;
      const sectionBottom = sectionTop + sectionH;

      const remainingInSection = sectionBottom - (scrollTop + viewportHeight);
      const scrolledIntoSection = scrollTop - sectionTop;

      const isTall = sectionH > viewportHeight + 10;

      if (direction === 1) {
        // Scrolling down
        if (isTall && remainingInSection > 5) {
          // Normal scroll if haven't reached bottom of long section
          return false;
        }
        // Reached bottom of long section OR short section -> Snap to next
        if (currentIdx < sections.length - 1) {
          scrollToIndex(currentIdx + 1);
          return true; // prevent default to avoid jitter
        }
      } else {
        // Scrolling up
        if (isTall && scrolledIntoSection > 5) {
          // Normal scroll if haven't reached top of long section
          return false;
        }
        // Reached top of long section OR short section -> Snap to prev
        if (currentIdx > 0) {
          scrollToIndex(currentIdx - 1, true);
          return true; // prevent default to avoid jitter
        }
      }
      return false;
    },
    [getCurrentIndex, scrollToIndex]
  );

  useEffect(() => {
    if (!enabled) return;
    const wrapper = getWrapper();
    if (!wrapper) return;

    // ── Wheel (desktop) ─────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      const snapped = navigate(e.deltaY > 0 ? 1 : -1);
      if (snapped) {
        e.preventDefault();
      }
    };

    // ── Touch (mobile) ──────────────────────────────────────────────────────
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30) return; // ignore tiny swipes
      const snapped = navigate(dy > 0 ? 1 : -1);
      // We cannot preventDefault on touchend, but navigation has been fired.
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (cooldown.current) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, navigate]);
}
