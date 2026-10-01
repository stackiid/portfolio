import { useRef, useState } from "react";

// =========================================================
//                       ProjectCard
// ---------------------------------------------------------
// One true-3D flip card: image on the front, details on the
// back, both occupying the exact same box (no layout shift).
//
// - Mouse: hover flips (pure CSS, see .flip-card in index.css).
// - Touch: tap toggles; a second tap flips back. Taps on the
//   Live/Repo links are ignored so they navigate normally, and
//   a swipe never fires a click, so carousel scrolling is safe.
// - Keyboard: tabbing onto a back-face link flips the card
//   (CSS :has), so nothing is hover-only.
// - Reduced motion: handled globally in index.css (transitions
//   collapse to ~0ms), so the flip becomes an instant swap.
// =========================================================
export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("mouse");

  function handleClick(e) {
    if (e.target.closest("a")) return;
    // Mouse users flip via hover; toggling on click would fight it.
    if (pointerType.current === "mouse" && e.detail !== 0) return;
    setFlipped((value) => !value);
  }

  return (
    <article className="w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center sm:w-[400px]">
      <div
        className={`flip-card aspect-[4/3] sm:aspect-[3/2] ${flipped ? "is-flipped" : ""}`}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onClick={handleClick}
      >
        <div className="flip-card__inner">
          <div className="flip-card__face overflow-hidden bg-cream-deep shadow-soft">
            <img
              src={project.image}
              alt={`Screenshot of the ${project.title} project`}
              loading="lazy"
              width="1000"
              height="658"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flip-card__face flip-card__back flex flex-col overflow-y-auto border border-teal/15 bg-cream p-5 shadow-soft no-scrollbar">
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-display text-lg font-bold leading-tight text-ink">
                {project.title}
              </h3>
              <div className="flex flex-shrink-0 gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live site`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-cream transition-colors duration-300 hover:bg-teal-dark"
                >
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-sm"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-teal/25 text-teal transition-all duration-300 hover:bg-teal hover:text-cream"
                >
                  <i className="fa-brands fa-github text-base" aria-hidden="true" />
                </a>
              </div>
            </div>

            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {project.description}
            </p>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-teal-light px-2.5 py-1 text-[11px] font-semibold text-teal-dark"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
