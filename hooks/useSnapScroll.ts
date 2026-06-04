"use client";

import { useEffect, useRef, useCallback } from "react";

const SECTION_IDS = [
  "opening", "couple", "countdown", "event",
  "quran", "love-story", "wishes", "gift", "closing",
];

const SCROLL_COOLDOWN = 500; // ms between snaps

export function useSnapScroll(enabled: boolean) {
  const cooldown = useRef(false);
  const touchStartY = useRef(0);
  const scrollAnimRef = useRef<number | null>(null);

  const getWrapper = () =>
    document.querySelector(".invitation-wrapper") as HTMLElement | null;

  const getSections = () =>
    SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

  const cleanupScroll = useCallback(() => {
    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
  }, []);

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

  const animateScroll = useCallback((
    element: HTMLElement,
    targetPosition: number,
    duration: number,
    onComplete?: () => void
  ) => {
    cleanupScroll();

    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Kunci overflow agar momentum scroll bawaan (scroll bocor) mati saat JS mengambil alih
    element.style.overflowY = "hidden";

    // Easing yang lebih lembut (Quintic) untuk menghindari patah-patah
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutQuint(progress);

      element.scrollTop = startPosition + distance * easedProgress;

      if (timeElapsed < duration) {
        scrollAnimRef.current = requestAnimationFrame(animation);
      } else {
        scrollAnimRef.current = null;
        element.style.overflowY = "scroll"; // Kembalikan scroll native setelah animasi selesai
        if (onComplete) onComplete();
      }
    };

    scrollAnimRef.current = requestAnimationFrame(animation);
  }, [cleanupScroll]);

  const scrollToIndex = useCallback((index: number) => {
    const wrapper = getWrapper();
    const sections = getSections();
    if (!wrapper || !sections[index]) return;

    const currentIndex = getCurrentIndex();
    const isScrollingUp = index < currentIndex;
    const targetSection = sections[index];
    const viewportHeight = wrapper.clientHeight;
    const sectionHeight = targetSection.offsetHeight;
    const isTall = sectionHeight > viewportHeight + 10;

    let targetScrollTop = targetSection.offsetTop;

    // Jika scroll ke atas masuk ke section yang tinggi (tall),
    // daratkan user di bagian bawah section tersebut agar transisi mulus.
    if (isScrollingUp && isTall) {
      targetScrollTop = targetSection.offsetTop + sectionHeight - viewportHeight;
    }

    cooldown.current = true;
    animateScroll(wrapper, targetScrollTop, 800, () => {
      setTimeout(() => {
        cooldown.current = false;
      }, 200); // Ekstra jeda 200ms setelah animasi untuk mencegah scroll beruntun
    });
  }, [animateScroll, getCurrentIndex]);

  /**
   * Decide whether to navigate based on direction.
   *  - At the END of a tall section → go to next
   *  - At the TOP of a tall section → go to prev
   *  - At any short (full-screen) section → always navigate
   * Returns true if a snap navigation was triggered or is in progress (should prevent default),
   * false if we should let the default scroll happen.
   */
  const navigate = useCallback(
    (direction: 1 | -1, source: "wheel" | "touch"): boolean => {
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

      // How far into the section we are
      const scrolledIntoSection = scrollTop - sectionTop;
      const remainingInSection = sectionBottom - (scrollTop + viewportHeight);

      const isTall = sectionH > viewportHeight + 10;

      if (direction === 1) {
        // Scrolling down
        if (isTall && remainingInSection > 20) {
          if (source === "wheel") {
            // Smooth custom sub-scroll inside tall section for desktop mouse wheel
            cooldown.current = true;
            const target = Math.min(
              scrollTop + 220,
              sectionBottom - viewportHeight
            );
            animateScroll(wrapper, target, 280, () => {
              cooldown.current = false;
            });
            return true;
          }
          // For touch, let natural scroll happen
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
          if (source === "wheel") {
            // Smooth custom sub-scroll inside tall section for desktop mouse wheel
            cooldown.current = true;
            const target = Math.max(scrollTop - 300, sectionTop);
            animateScroll(wrapper, target, 400, () => {
              cooldown.current = false;
            });
            return true;
          }
          // For touch, let natural scroll happen
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
    [getCurrentIndex, scrollToIndex, animateScroll]
  );

  useEffect(() => {
    if (!enabled) return;
    const wrapper = getWrapper();
    if (!wrapper) return;

    // ── Wheel (desktop) ─────────────────────────────────────────────────────
    const handleWheel = (e: WheelEvent) => {
      const snapped = navigate(e.deltaY > 0 ? 1 : -1, "wheel");
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
      navigate(dy > 0 ? 1 : -1, "touch");
    };

    // Mencegah gerakan swipe bawaan bentrok dengan animasi scroll halaman
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
      cleanupScroll();
    };
  }, [enabled, navigate, cleanupScroll]);
}
