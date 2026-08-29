import { useState } from "react";
import certifications from "../../data/certifications.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import DocumentModal from "../../components/common/DocumentModal.jsx";
import CarouselArrows from "../../components/common/CarouselArrows.jsx";
import useCarousel from "../../hooks/useCarousel.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import useScrollReveal from "../../hooks/useScrollReveal.js";

function CertCard({ cert, delay, onOpen, carousel }) {
  const ref = useScrollReveal({ delay });

  return (
    <button
      ref={ref}
      data-carousel-item
      onClick={() => onOpen(cert)}
      className={`flex flex-col items-start gap-3 rounded-2xl border border-ink/8 bg-white/70 p-5 text-left opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${
        carousel ? "w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center" : ""
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
// added). sm breakpoint and up: original grid - unaffected.
// =========================================================
export default function Certifications() {
  const [activeDoc, setActiveDoc] = useState(null);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown } =
    useCarousel({
      itemSelector: "[data-carousel-item]",
      autoAdvanceMs: isMobile ? 5000 : 0,
    });

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
