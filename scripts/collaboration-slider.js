// =========================================================
//       CLIENTS & COLLABORATIONS - Infinite Slider
// =========================================================

function initCollaborationSlider() {
  const viewport = document.querySelector(".clients-carousel");
  const track = document.getElementById("clientsTrack");
  if (!viewport || !track || !track.children.length) return;

  const SPEED_PX_PER_SEC = 42;
  const MAX_DELTA_SEC = 0.1; // clamp so a backgrounded tab never "catches up" with a jump
  const originalCards = Array.from(track.children);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let setWidth = 0; // one looped set's width, including the trailing gap before its clone
  let offset = 0;
  let looping = null; // null = not yet evaluated, so the first call always applies setup
  let paused = false;
  let lastTime = null;
  let resizeTimer = null;

  function setPaused(next) {
    paused = next;
    if (!paused) lastTime = null; // avoid a large delta jump on resume
  }

  function getGap() {
    const styles = getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap) || 0;
  }

  // True rendered width of the real, un-cloned cards (no trailing gap).
  function measureContentWidth() {
    const gap = getGap();
    let width = 0;
    originalCards.forEach((card, i) => {
      width += card.getBoundingClientRect().width;
      if (i < originalCards.length - 1) width += gap;
    });
    return width;
  }

  // Width of one looped set including the gap before its clone -
  // this is the distance to translate before wrapping seamlessly.
  function measureSetWidth() {
    const gap = getGap();
    let width = 0;
    originalCards.forEach((card) => {
      width += card.getBoundingClientRect().width + gap;
    });
    return width;
  }

  function clearClones() {
    Array.from(track.children).forEach((el) => {
      if (el.dataset.collabClone === "true") track.removeChild(el);
    });
  }

  function fillClones() {
    clearClones();
    setWidth = measureSetWidth();
    if (!setWidth) return;

    const needed = Math.ceil((viewport.clientWidth * 2) / setWidth) + 1;

    for (let i = 0; i < needed; i++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.dataset.collabClone = "true";
        clone.setAttribute("aria-hidden", "true");
        clone
          .querySelectorAll("a, button")
          .forEach((el) => el.setAttribute("tabindex", "-1"));
        track.appendChild(clone);
      });
    }
  }

  // Decides STATIC vs LOOPING based on whether the real cards alone
  // already fit within the carousel - re-run on init and on resize
  // so e.g. shrinking the window to mobile width can switch a
  // previously-static row into a looping marquee, and vice versa.
  function evaluateLayout() {
    const contentWidth = measureContentWidth();
    const fits = contentWidth <= viewport.clientWidth;
    const shouldLoop = !reduceMotion && !fits;

    if (shouldLoop === looping) {
      if (looping) fillClones(); // still looping - just re-measure/re-clone for the new size
      return;
    }

    looping = shouldLoop;

    if (looping) {
      track.classList.remove("is-static");
      viewport.classList.remove("is-static");
      fillClones();
    } else {
      clearClones();
      setWidth = 0;
      offset = 0;
      track.style.transform = "translate3d(0, 0, 0)";
      track.classList.add("is-static");
      viewport.classList.add("is-static");
    }
  }

  function step(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const delta = Math.min((timestamp - lastTime) / 1000, MAX_DELTA_SEC);
    lastTime = timestamp;

    if (looping && !paused && setWidth) {
      offset += SPEED_PX_PER_SEC * delta;
      if (offset >= setWidth) offset -= setWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    requestAnimationFrame(step);
  }

  // Mouse hover over the carousel is the only pause condition
  // (only meaningful while actually looping).
  viewport.addEventListener("mouseenter", () => setPaused(true));
  viewport.addEventListener("mouseleave", () => setPaused(false));

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasLooping = looping;
      const ratio = wasLooping && setWidth ? offset / setWidth : 0;
      evaluateLayout();
      offset = looping ? ratio * setWidth : 0;
    }, 200);
  });

  track.style.willChange = "transform";
  evaluateLayout();

  requestAnimationFrame(step);
}
