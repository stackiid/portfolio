import { useEffect, useState } from "react";

// =========================================================
//                      useMediaQuery
// ---------------------------------------------------------
// Reactive matchMedia check. Used to switch layout (e.g. a
// carousel on small screens vs. a grid on larger ones) rather
// than relying on CSS alone, for the cases where behavior
// (not just layout) needs to change - like whether auto-advance
// should run at all.
// =========================================================
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
