// =========================================================
//                    MOTION UTILITIES
// ---------------------------------------------------------
// Shared helpers so every component checks reduced-motion
// preference the same way instead of re-implementing it.
// =========================================================

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
