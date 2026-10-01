import { useState } from "react";
import certifications from "../../data/certifications.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import DocumentModal from "../../components/common/DocumentModal.jsx";
import CarouselArrows from "../../components/common/CarouselArrows.jsx";
import useCarousel from "../../hooks/useCarousel.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import { prefersReducedMotion } from "../../utils/motion.js";

// Desktop carousel: four cards are visible, and each arrow press /
// arrow key moves a full page, so four new certificates replace the four shown.

const DESKTOP_GAP = 16;
const DESKTOP_PAGE_SIZE = 4;

function CertCard({ cert, delay, onOpen, carousel, desktopCarousel }) {
  const ref = useScrollReveal({ delay });

  return (
    <button
      ref={ref}
      data-carousel-item
      onClick={() => onOpen(cert)}
      className={`flex flex-col items-start gap-3 rounded-2xl border border-ink/8 bg-white/70 p-5 text-left opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${
        carousel ? "w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center" : ""
      } ${
        // Four equal cards per viewport: (track width - 3 gaps) / 4.
        // Derived from the track so it adapts to the container width.
        desktopCarousel
          ? "w-[calc((100%_-_3_*_1rem)_/_4)] flex-shrink-0 snap-start"
          : ""
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-light text-teal">
        <i className="fa-solid fa-certificate" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-sm font-bold leading-snug text-ink">
          {cert.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-teal">{cert.institute}</p>
        <p className="text-xs text-ink-faint">{cert.date}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-mango-dark">
        {cert.image ? (
          <>
            View credential
            <i
              className="fa-solid fa-up-right-from-square text-[10px]"
              aria-hidden="true"
            />
          </>
        ) : (
          "Coming soon"
        )}
      </span>
    </button>
  );
}

// =========================================================
//                      Certifications
// ---------------------------------------------------------
// Small screens: horizontal auto-advancing carousel (keeps the
// section from becoming excessively tall as certifications are
// added). sm up to below xl: original grid - unaffected.
// xl (1280px) and up: single-row carousel showing four cards at
// once, advancing four cards per arrow press.
// =========================================================

export default function Certifications() {
  const [activeDoc, setActiveDoc] = useState(null);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown } =
    useCarousel({
      itemSelector: "[data-carousel-item]",
      // Desktop track uses gap-4 (16px); the hook's step must match it.
      gap: isDesktop ? DESKTOP_GAP : 24,
      autoAdvanceMs: isMobile ? 5000 : 0,
    });

  // Desktop paging: snap to the nearest card, then move one page of cards, clamped
  // to the start/end of the track. Computing from the nearest card index
  // (not the raw scroll position) keeps rapid clicks from drifting.
  function scrollDesktopPage(direction) {
    const el = trackRef.current;
    const item = el?.querySelector("[data-carousel-item]");
    if (!el || !item) return;
    const step = item.getBoundingClientRect().width + DESKTOP_GAP;
    const index = Math.round(el.scrollLeft / step);
    const maxLeft = el.scrollWidth - el.clientWidth;
    const left = Math.min(
      Math.max((index + direction * DESKTOP_PAGE_SIZE) * step, 0),
      maxLeft,
    );
    el.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function handleDesktopKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollDesktopPage(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollDesktopPage(-1);
    }
  }

  function openCert(cert) {
    setActiveDoc({
      title: cert.name,
      subtitle: [cert.institute, cert.date].filter(Boolean).join(" · "),
      imgSrc: cert.image,
    });
  }

  return (
    <section id="certifications" className="section-y">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Certifications"
          title="Verified Credentials"
          description="Real, issued certificates - click any card to view the document."
        />

        {isMobile ? (
          <div className="relative mt-10">
            <div
              ref={trackRef}
              role="region"
              aria-label="Certifications, scrollable"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            >
              {certifications.map((cert) => (
                <CertCard
                  key={cert.name}
                  cert={cert}
                  onOpen={openCert}
                  carousel
                />
              ))}
            </div>
            <CarouselArrows
              canPrev={canPrev}
              canNext={canNext}
              onPrev={scrollPrev}
              onNext={scrollNext}
              label="certification"
            />
          </div>
        ) : isDesktop ? (
          <div className="relative mt-10">
            <div
              ref={trackRef}
              role="region"
              aria-label="Certifications, scrollable"
              tabIndex={0}
              onKeyDown={handleDesktopKeyDown}
              className="no-scrollbar flex items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3"
            >
              {certifications.map((cert) => (
                <CertCard
                  key={cert.name}
                  cert={cert}
                  onOpen={openCert}
                  desktopCarousel
                />
              ))}
            </div>
            <CarouselArrows
              canPrev={canPrev}
              canNext={canNext}
              onPrev={() => scrollDesktopPage(-1)}
              onNext={() => scrollDesktopPage(1)}
              label="certification"
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.name}
                cert={cert}
                delay={(i % 3) * 100}
                onOpen={openCert}
              />
            ))}
          </div>
        )}
      </div>

      <DocumentModal document={activeDoc} onClose={() => setActiveDoc(null)} />
    </section>
  );
}
