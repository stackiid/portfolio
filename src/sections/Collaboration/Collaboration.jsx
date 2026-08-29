import { useState } from "react";
import collaborations from "../../data/collaborations.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import DocumentModal from "../../components/common/DocumentModal.jsx";
import CarouselArrows from "../../components/common/CarouselArrows.jsx";
import useCarousel from "../../hooks/useCarousel.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import useScrollReveal from "../../hooks/useScrollReveal.js";

function CollaborationCard({ item, delay, onOpenDocument, carousel }) {
  const ref = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      data-carousel-item
      className={`flex flex-col items-center gap-4 rounded-2xl border border-ink/8 bg-white/70 p-6 text-center opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:flex-row sm:text-left ${
        carousel ? "w-[calc(100vw_-_3rem)] flex-shrink-0 snap-center" : ""
      }`}
    >
      <img
        src={item.companyLogo}
        alt={`${item.companyName} logo`}
        loading="lazy"
        className="h-16 w-16 flex-shrink-0 rounded-xl object-contain"
      />

      <div className="flex-1">
        <h3 className="font-display text-lg font-bold text-ink">
          {item.companyName}
        </h3>
        <p className="text-sm text-ink-soft">Collaboration &amp; documentation on file</p>
      </div>

      <div className="flex items-center gap-2">
        {item.documentImage && (
          <button
            onClick={() =>
              onOpenDocument({
                title: item.documentType,
                subtitle: item.companyName,
                imgSrc: item.documentImage,
              })
            }
            aria-label={`View ${item.documentType} for ${item.companyName}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-light text-teal transition-all duration-300 hover:bg-teal hover:text-cream"
          >
            <i className="fa-solid fa-file-signature" aria-hidden="true" />
          </button>
        )}
        {item.clientLink && (
          <a
            href={item.clientLink.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.companyName} on ${item.clientLink.label}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-mango-light text-mango-dark transition-all duration-300 hover:bg-mango hover:text-cream"
          >
            <i className={item.clientLink.icon} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

// =========================================================
//                       Collaboration
// ---------------------------------------------------------
// Small screens: horizontal auto-advancing carousel, same
// pattern as Certifications - keeps the section compact as
// more collaborations are added. sm and up: original stacked
// layout, unaffected. With only one entry today, the arrows
// simply stay disabled and auto-advance has nothing to do -
// the architecture is just ready for more without changes.
// =========================================================
export default function Collaboration() {
  const [activeDoc, setActiveDoc] = useState(null);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown } =
    useCarousel({ itemSelector: "[data-carousel-item]", autoAdvanceMs: isMobile ? 5000 : 0 });

  return (
    <section id="collaboration" className="section-y bg-cream-soft/60">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Clients &amp; Collaboration"
          title="Companies I've Worked With"
          description="The document icon opens real, on-file paperwork - not a decoration."
        />

        {isMobile ? (
          <div className="relative mt-10">
            <div
              ref={trackRef}
              role="region"
              aria-label="Collaborations, scrollable"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            >
              {collaborations.map((item) => (
                <CollaborationCard
                  key={item.companyName}
                  item={item}
                  onOpenDocument={setActiveDoc}
                  carousel
                />
              ))}
            </div>
            {collaborations.length > 1 && (
              <CarouselArrows
                canPrev={canPrev}
                canNext={canNext}
                onPrev={scrollPrev}
                onNext={scrollNext}
                label="collaboration"
              />
            )}
          </div>
        ) : (
          <div
            className={`mt-10 grid gap-5 ${
              collaborations.length > 1
                ? "mx-auto max-w-3xl grid-cols-1 sm:grid-cols-2"
                : "mx-auto max-w-md grid-cols-1"
            }`}
          >
            {collaborations.map((item, i) => (
              <CollaborationCard
                key={item.companyName}
                item={item}
                delay={i * 100}
                onOpenDocument={setActiveDoc}
              />
            ))}
          </div>
        )}
      </div>

      <DocumentModal document={activeDoc} onClose={() => setActiveDoc(null)} />
    </section>
  );
}
