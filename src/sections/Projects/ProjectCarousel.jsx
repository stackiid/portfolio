import projects from "../../data/projects.js";
import ProjectCard from "../../components/cards/ProjectCard.jsx";
import CarouselArrows from "../../components/common/CarouselArrows.jsx";
import useCarousel from "../../hooks/useCarousel.js";

// =========================================================
//                     ProjectCarousel
// ---------------------------------------------------------
// Horizontal, interactive project rail (not a grid, per spec).
// Supports arrow buttons, mouse wheel/trackpad, native touch
// swipe, and keyboard (Left/Right when the rail has focus).
// Carousel mechanics (scroll math, arrow state, keyboard) live
// in useCarousel - shared with Certifications/Collaboration
// (mobile) and Testimonials rather than reimplemented here.
// =========================================================
export default function ProjectCarousel() {
  const { trackRef, canPrev, canNext, scrollPrev, scrollNext, handleKeyDown } =
    useCarousel({ itemSelector: "article" });

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Featured projects, scrollable"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <CarouselArrows
        canPrev={canPrev}
        canNext={canNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        label="project"
      />
    </div>
  );
}
