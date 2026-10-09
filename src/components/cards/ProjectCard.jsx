import { useEffect, useRef, useState } from "react";
import LazyImage from "../common/LazyImage.jsx";

// =========================================================
//                       ProjectCard
// =========================================================

function ProjectLink({
  enabled,
  href,
  label,
  disabledLabel,
  className,
  iconClass,
}) {
  const base =
    "flex h-9 w-9 min-[420px]:h-10 min-[420px]:w-10 items-center justify-center rounded-full transition-all duration-300";
  const isActive =
    Boolean(enabled) && typeof href === "string" && href.trim() !== "";

  if (!isActive) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={disabledLabel}
        title={disabledLabel}
        className={`${base} cursor-not-allowed border border-teal/15 text-teal/35`}
      >
        <i className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${base} ${className}`}
    >
      <i className={iconClass} aria-hidden="true" />
    </a>
  );
}

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("mouse");
  const cardRef = useRef(null);

  // Touch: tapping anywhere outside this card flips it back. Listening only
  // while flipped keeps idle cards free of document-level handlers. Tapping
  // another card also lands here, so only one card stays open at a time.
  useEffect(() => {
    if (!flipped) return undefined;
    function handleOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setFlipped(false);
      }
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [flipped]);

  function handleClick(e) {
    if (e.target.closest("a, [aria-disabled='true']")) return;
    // Mouse users flip via hover; toggling on click would fight it.
    if (pointerType.current === "mouse" && e.detail !== 0) return;
    setFlipped((value) => !value);
  }

  return (
    <article className="w-full flex-shrink-0 snap-start md:w-[calc((100%_-_1.5rem)/2)] xl:w-[calc((100%_-_3rem)/3)]">
      <div
        ref={cardRef}
        className={`flip-card aspect-[1000/658] ${flipped ? "is-flipped" : ""}`}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onClick={handleClick}
      >
        <div className="flip-card__inner">
          <div className="flip-card__face overflow-hidden bg-cream-deep shadow-soft">
            <LazyImage
              src={project.image}
              alt={`Screenshot of the ${project.title} project`}
              width={1000}
              height={658}
              showTimer
              className="h-full w-full"
              imgClassName="object-contain"
            />
          </div>

          <div className="flip-card__face flip-card__back flex flex-col overflow-y-auto border border-teal/15 bg-cream p-[4.5cqw] shadow-soft no-scrollbar">
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-display text-[clamp(1rem,4.6cqw,1.25rem)] font-bold leading-tight text-ink">
                {project.title}
              </h3>
              <div className="flex flex-shrink-0 gap-2">
                <ProjectLink
                  enabled={project.liveEnabled}
                  href={project.liveUrl}
                  label={`Open ${project.title} live site`}
                  disabledLabel={`${project.title} live site is not available`}
                  className="bg-teal text-cream hover:bg-teal-dark"
                  iconClass="fa-solid fa-arrow-up-right-from-square text-sm"
                />
                <ProjectLink
                  enabled={project.repoEnabled}
                  href={project.repoUrl}
                  label={`Open ${project.title} GitHub repository`}
                  disabledLabel={`${project.title} repository is private`}
                  className="border border-teal/25 text-teal hover:bg-teal hover:text-cream"
                  iconClass="fa-brands fa-github text-base"
                />
              </div>
            </div>

            <p className="mt-[1.5cqw] text-[clamp(11px,3.3cqw,14px)] leading-snug text-ink-soft">
              {project.description}
            </p>

            <ul className="mt-auto flex flex-wrap gap-1 pt-[2cqw]">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-teal-light px-2 py-[3px] text-[clamp(9.5px,2.9cqw,11px)] font-semibold text-teal-dark"
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
