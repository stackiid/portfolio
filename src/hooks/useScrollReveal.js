import { useCallback, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../utils/motion.js";

// =========================================================
//                    useScrollReveal
// ---------------------------------------------------------
// Attaches an IntersectionObserver to the returned ref and
// plays a fade-in + zoom-in reveal (the baseline animation
// language used across the whole site) the first time the
// element enters the viewport. Respects prefers-reduced-motion
// by skipping straight to the final visible state.
//
// Implemented as a CALLBACK ref rather than a plain ref +
// useEffect. A plain ref's effect only runs once per component
// instance, so if the element it's attached to is ever
// replaced (e.g. a child keyed by state, like a tab panel that
// remounts on selection change), the observer keeps watching
// the old, now-detached node - the new node's "opacity-0"
// starting class is never lifted and the content stays
// invisible forever. A callback ref is invoked by React on
// every attach/detach, so the observer is correctly torn down
// and re-created any time the underlying node changes, not
// just on first mount.
//
// Usage:
//   const ref = useScrollReveal({ delay: 120 });
//   <div ref={ref} className="opacity-0">...</div>
// =========================================================
export default function useScrollReveal({ delay = 0, translateY = 24 } = {}) {
  const cleanupRef = useRef(null);

  const setRef = useCallback(
    (node) => {
      // Tear down whatever observer was watching the previous node
      // (covers both unmount and "this ref moved to a new node").
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (!node) return;

      if (prefersReducedMotion()) {
        node.style.opacity = 1;
        node.style.transform = "none";
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(node, {
                opacity: [0, 1],
                scale: [0.94, 1],
                translateY: [translateY, 0],
                duration: 700,
                delay,
                ease: "outQuint",
              });
              observer.unobserve(node);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
      );

      observer.observe(node);
      cleanupRef.current = () => observer.disconnect();
    },
    [delay, translateY],
  );

  return setRef;
}
