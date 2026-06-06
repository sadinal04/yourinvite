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
    const viewportHeight = wrapper.clientHeight;

    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollTop + (viewportHeight * 0.4)) {
        idx = i;
      }
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
    
    setTimeout(() => {
      cooldown.current = false;
    }, 600); // 600ms is enough for fast, snappy presentation feel
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

      // Calculate how far we have to go to reach the boundaries of the CURRENT section
      // We use Math.floor/ceil to ignore fractional pixel rounding issues
      const remainingInSection = Math.floor(sectionBottom - (scrollTop + viewportHeight));
      const scrolledIntoSection = Math.floor(scrollTop - sectionTop);

      const isTall = sectionH > viewportHeight + 10;

      if (direction === 1) {
        // SCROLL DOWN
        if (isTall && remainingInSection > 5) {
          // Inside a tall section: PAGE DOWN by 1 viewport height, or snap exactly to bottom edge
          cooldown.current = true;
          const amountToScroll = Math.min(viewportHeight, remainingInSection);
          wrapper.scrollBy({ top: amountToScroll, behavior: "smooth" });
          setTimeout(() => { cooldown.current = false; }, 600);
          return true;
        }
        
        // Reached bottom of current section -> Snap to NEXT section
        if (currentIdx < sections.length - 1) {
          scrollToIndex(currentIdx + 1);
          return true;
        }
      } else {
        // SCROLL UP
        // Special case: At the footer -> Snap back to the last section (Gift)
        const isAtBottom = scrollTop + viewportHeight >= wrapper.scrollHeight - 10;
        if (isAtBottom && currentIdx === sections.length - 1) {
          scrollToIndex(currentIdx, true);
          return true;
        }

        if (isTall && scrolledIntoSection > 5) {
          // Inside a tall section: PAGE UP by 1 viewport height, or snap exactly to top edge
          cooldown.current = true;
          const amountToScroll = Math.min(viewportHeight, scrolledIntoSection);
          wrapper.scrollBy({ top: -amountToScroll, behavior: "smooth" });
          setTimeout(() => { cooldown.current = false; }, 600);
          return true;
        }
        
        // Reached top of current section -> Snap to PREV section
        if (currentIdx > 0) {
          // We snap to the BOTTOM edge of the previous section if it's tall
          scrollToIndex(currentIdx - 1, true);
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
      // touchend cannot preventDefault, but touchmove handles that
    };

    const handleTouchMove = (e: TouchEvent) => {
      // 100% PREVENT NATIVE SCROLLING ON TOUCH
      // This forces the user to rely purely on our JS "paging" and "snapping"
      // completely eliminating "half-and-half" boundary glitches!
      if (e.cancelable) {
        e.preventDefault();
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
