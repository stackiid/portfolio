// =========================================================
//                     CarouselArrows
// ---------------------------------------------------------
// Shared prev/next arrow pair for every horizontal carousel.
// Pass the state/handlers returned by useCarousel directly.
// =========================================================
export default function CarouselArrows({
  canPrev,
  canNext,
  onPrev,
  onNext,
  label,
}) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        aria-label={`Previous ${label}`}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/25 text-teal transition-all duration-300 hover:bg-teal hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal"
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true" />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        aria-label={`Next ${label}`}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/25 text-teal transition-all duration-300 hover:bg-teal hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal"
      >
        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </button>
    </div>
  );
}
