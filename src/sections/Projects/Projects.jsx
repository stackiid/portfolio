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
            description="A mix of full-stack builds and UI/UX-first projects - drag, scroll, or use the arrows."
          />
        </div>

        <div className="mt-10">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
