"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTION_IDS = [
  "opening", "couple", "countdown", "event",
  "location", "quran", "family", "love-story", "closing",
];

const SCROLL_COOLDOWN = 900; // ms between snaps

export function useSnapScroll(enabled: boolean) {
  const cooldown = useRef(false);
  const touchStartY = useRef(0);

  const getWrapper = () =>
    document.querySelector(".invitation-wrapper") as HTMLElement | null;

  const getSections = () =>
    SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

  /**
   * Find which section is currently "in view" based on scroll position.
   * Returns the index of the section whose top is closest to (but ≤) the
   * wrapper's scroll top.
   */
  const getCurrentIndex = useCallback(() => {
    const wrapper = getWrapper();
    if (!wrapper) return 0;
    const sections = getSections();
    const scrollTop = wrapper.scrollTop;

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollTop + 4) idx = i;
    }
    return idx;
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const wrapper = getWrapper();
    const sections = getSections();
    if (!wrapper || !sections[index]) return;

    cooldown.current = true;
    wrapper.scrollTo({ top: sections[index].offsetTop, behavior: "smooth" });
    setTimeout(() => {
      cooldown.current = false;
    }, SCROLL_COOLDOWN);
  }, []);

  /**
   * Decide whether to navigate based on direction.
   *  - At the END of a tall section → go to next
   *  - At the TOP of a tall section → go to prev
   *  - At any short (full-screen) section → always navigate
   * Returns true if a snap navigation was triggered or is in progress (should prevent default),
   * false if we should let the default scroll happen.
   */
  const navigate = useCallback(
    (direction: 1 | -1): boolean => {
      if (cooldown.current) return true;
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

      // How far into the section we are
      const scrolledIntoSection = scrollTop - sectionTop;
      const remainingInSection = sectionBottom - (scrollTop + viewportHeight);

      const isTall = sectionH > viewportHeight + 10;

      if (direction === 1) {
        // Scrolling down
        if (isTall && remainingInSection > 20) {
          // Still content below in this section — let CSS/natural scroll handle it
          return false;
        }
        // At bottom of section (or full-screen section) → snap to next
        if (currentIdx < sections.length - 1) {
          scrollToIndex(currentIdx + 1);
          return true;
        }
      } else {
        // Scrolling up
        if (isTall && scrolledIntoSection > 20) {
          // Still content above in this section — let CSS/natural scroll handle it
          return false;
        }
        // At top of section → snap to prev
        if (currentIdx > 0) {
          scrollToIndex(currentIdx - 1);
          return true;
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
      navigate(dy > 0 ? 1 : -1);
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, navigate]);
}
