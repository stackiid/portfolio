import { useEffect } from "react";

// =========================================================
//                  useLockBodyScroll
// ---------------------------------------------------------
// Locks page scroll while `locked` is true (used by the
// mobile menu and modals). Restores the previous overflow
// value on cleanup so nested usage never fights itself.
// =========================================================
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
