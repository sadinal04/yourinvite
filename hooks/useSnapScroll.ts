"use client";

// ── MIGRATED TO NATIVE CSS SCROLL SNAPPING ──
// The custom JS scroll snapping logic has been completely disabled and removed.
// We now rely purely on CSS `scroll-snap-type: y mandatory` in globals.css.
// This guarantees absolutely 0 jitter, perfect 1:1 mobile native touch physics,
// and completely prevents the user from resting on a boundary.

export function useSnapScroll(_enabled: boolean) {
  return;
}
