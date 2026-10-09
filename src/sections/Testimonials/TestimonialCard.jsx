import useScrollReveal from "../../hooks/useScrollReveal.js";
import LazyImage from "../../components/common/LazyImage.jsx";

// =========================================================
//                     TestimonialCard
// =========================================================

export default function TestimonialCard({ testimonial, delay }) {
  const ref = useScrollReveal({ delay });

  return (
    <figure
      ref={ref}
      data-carousel-item
      className="flex w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center flex-col gap-4 self-stretch rounded-2xl border border-ink/8 bg-white/70 p-6 opacity-0 sm:w-[300px]"
    >
      <div
        className="flex gap-0.5 text-mango"
        aria-label={`${testimonial.stars} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={
              i < testimonial.stars ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-ink/8 pt-4">
        <LazyImage
          src={testimonial.avatar}
          alt=""
          width={160}
          height={160}
          className="h-10 w-10 flex-shrink-0 rounded-full"
        />
        <div>
          <p className="text-sm font-bold text-ink">{testimonial.name}</p>
          <p className="text-xs text-ink-faint">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
