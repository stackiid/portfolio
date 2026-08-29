import { useEffect, useState } from "react";

// =========================================================
//                     useActiveSection
// ---------------------------------------------------------
// Given a list of section ids, tracks which one is currently
// "active" (most representative of what's in view) via
// IntersectionObserver - no scroll-percentage hacks, no
// hardcoded pixel thresholds.
//
// Shared by the primary nav AND the scroll-dot indicator so
// both use the exact same active-section algorithm instead of
// two separate, potentially-diverging implementations.
//
// Multiple sections can be inside the trigger band at once
// (e.g. a short section followed immediately by another).
// Rather than reacting to whichever entry the observer
// callback happens to process last - which depends on
// browser/DOM order, not scroll position - this tracks the
// live set of intersecting ids and deterministically picks the
// last one in `ids` order, i.e. the one closest to "what
// you've actually scrolled to."
// =========================================================
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  // A joined string, not the array itself, is the effect dependency below -
  // callers commonly pass an inline array literal (a new reference every
  // render), which would otherwise re-run this effect (tear down and
  // recreate the IntersectionObserver) on every single render for no
  // reason. The effect closes over `ids` directly and only reruns when the
  // actual section list changes, so that closure is always current.
  const idsKey = ids.join(",");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const intersecting = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        const current = [...ids].reverse().find((id) => intersecting.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // Depending on idsKey (stable joined string) instead of `ids` (a new
    // array reference every render for inline-literal callers) is
    // intentional - see comment on idsKey above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
}
