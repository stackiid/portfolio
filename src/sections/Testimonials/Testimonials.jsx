import testimonials from "../../data/testimonials.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import TestimonialCard from "./TestimonialCard.jsx";
import CarouselArrows from "../../components/common/CarouselArrows.jsx";
import useCarousel from "../../hooks/useCarousel.js";

// =========================================================
//                       Testimonials
// =========================================================

export default function Testimonials() {
  const { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown } =
    useCarousel({ itemSelector: "[data-carousel-item]" });

  const average =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, t) => sum + t.stars, 0) /
          testimonials.length
        ).toFixed(1)
      : null;

  return (
    <section id="testimonials" className="section-y">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Collaborators Say"
            description="Feedback from people I've actually worked with - nothing staged."
          />
          {average && (
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
              <i className="fa-solid fa-star text-mango" aria-hidden="true" />
              <span className="font-display text-lg font-bold text-ink">
                {average}
              </span>
              <span className="text-sm text-ink-soft">
                from {testimonials.length} collaborators
              </span>
            </div>
          )}
        </div>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            role="region"
            aria-label="Testimonials, scrollable"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="no-scrollbar flex items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.name}
                testimonial={t}
                delay={(i % 4) * 90}
              />
            ))}
          </div>

          <CarouselArrows
            canPrev={canPrev}
            canNext={canNext}
            onPrev={scrollPrev}
            onNext={scrollNext}
            label="testimonial"
          />
        </div>
      </div>
    </section>
  );
}
