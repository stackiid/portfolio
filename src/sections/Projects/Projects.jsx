import SectionHeading from "../../components/common/SectionHeading.jsx";
import ProjectCarousel from "./ProjectCarousel.jsx";

// =========================================================
//                         Projects
// ---------------------------------------------------------
export default function Projects() {
  return (
    <section id="projects" className="section-y bg-cream-soft/60">
      <div className="container-custom">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Work"
            description="Hover or tap a card to flip it for details. Drag, scroll, or use the arrows to browse."
          />
        </div>

        <div className="mt-10">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
