import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { prefersReducedMotion } from "../utils/motion.js";

// =========================================================
//                       useCarousel
// ---------------------------------------------------------
// Shared logic for every horizontal-scroll carousel on the
// site: arrow enable/disable state, scroll-by-one-card
// (arrows, and exposed for keyboard handling), and an optional
// auto-advance timer that pauses on hover/touch/focus and
// loops back to the start at the end.
//
//   itemSelector  - CSS selector for one card, used to measure
//                    step width (default assumes a data attribute
//                    so this isn't accidentally coupled to any
//                    one section's markup, e.g. <article> vs <button>)
//   gap           - px gap between cards (must match the track's
//                    actual gap-* class)
//   autoAdvanceMs - if set, auto-advances on this interval;
//                    omit entirely for carousels that shouldn't
//                    auto-play (e.g. read-heavy testimonials)
//
// Auto-advance is skipped entirely when the user prefers
// reduced motion - unrequested, looping horizontal movement is
// exactly the kind of motion that preference exists to suppress.
// =========================================================
export default function useCarousel({
  itemSelector = "[data-carousel-item]",
  gap = 24,
  autoAdvanceMs = 0,
} = {}) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const updateArrowState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scrollByDir = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;
      const item = el.querySelector(itemSelector);
      const width = item ? item.getBoundingClientRect().width : 280;
      el.scrollBy({
        left: direction * (width + gap),
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [itemSelector, gap],
  );

  const scrollPrev = useCallback(() => scrollByDir(-1), [scrollByDir]);
  const scrollNext = useCallback(() => scrollByDir(1), [scrollByDir]);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    }
  }

  // Keep arrow enabled/disabled state in sync with actual scroll position.
  // useLayoutEffect (not useEffect) so the very first measurement happens
  // before the browser paints - otherwise there's a brief flash of both
  // arrows showing "disabled" (the initial state) even when there's more
  // to scroll to.
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    updateArrowState();
    el.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);

    // A plain window-resize listener misses content-driven size changes -
    // most commonly, webfonts finishing loading and reflowing card text
    // after the initial measurement already ran, which can leave canNext
    // stuck reflecting a scrollWidth that's since changed. ResizeObserver
    // catches any actual size change to the track's content, not just the
    // viewport.
    const resizeObserver = new ResizeObserver(updateArrowState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
      resizeObserver.disconnect();
    };
  }, [updateArrowState]);

  // Auto-advance, opt-in only.
  useEffect(() => {
    if (!autoAdvanceMs || prefersReducedMotion()) return undefined;
    const el = trackRef.current;
    if (!el) return undefined;

    function tick() {
      if (pausedRef.current) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
      if (atEnd) {
        if (typeof el.scrollTo === "function") {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollLeft = 0;
        }
      } else {
        scrollByDir(1);
      }
    }

    const intervalId = setInterval(tick, autoAdvanceMs);

    function pause() {
      pausedRef.current = true;
      clearTimeout(resumeTimeoutRef.current);
    }
    function resume() {
      pausedRef.current = false;
    }
    // Touch devices don't fire mouseleave, so give a grace period
    // after the last touch before auto-advance picks back up -
    // otherwise one swipe on mobile would pause it forever.
    function pauseThenResumeLater() {
      pause();
      resumeTimeoutRef.current = setTimeout(resume, 4000);
    }

    el.addEventListener("pointerdown", pause);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("touchstart", pauseThenResumeLater, { passive: true });

    return () => {
      clearInterval(intervalId);
      clearTimeout(resumeTimeoutRef.current);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("touchstart", pauseThenResumeLater);
    };
  }, [autoAdvanceMs, scrollByDir]);

  return { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown };
}
