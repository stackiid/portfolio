import testimonials from "../../data/testimonials.js";

// =========================================================
//                       RatingCard
// ---------------------------------------------------------
// Floating social-proof card in the hero. Every number here
// is computed live from src/data/testimonials.js - add a
// testimonial there and this card updates on its own instead
// of quietly going stale like a hardcoded "4.9" would.
// =========================================================
export default function RatingCard() {
  const count = testimonials.length;
  const average =
    count === 0
      ? null
      : (testimonials.reduce((sum, t) => sum + t.stars, 0) / count).toFixed(1);

  if (!average) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card">
      <div className="flex -space-x-3">
        {testimonials.slice(0, 3).map((t) => (
          <img
            key={t.name}
            src={t.avatar}
            alt=""
            width="32"
            height="32"
            loading="lazy"
            className="h-8 w-8 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-ink-soft">
          Rated by collaborators
        </p>
        <div className="flex items-center gap-1">
          <span className="font-display text-lg font-bold text-ink">
            {average}
          </span>
          <i className="fa-solid fa-star text-mango text-xs" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
