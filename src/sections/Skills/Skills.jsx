import { useState, useRef } from "react";
import skillCategories from "../../data/skills.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

// =========================================================
//                          Skills
// ---------------------------------------------------------
// Accessible tabbed skill browser. Data comes entirely from
// src/data/skills.js - add a category or a skill there and it
// appears here automatically.
// =========================================================
export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const panelRef = useScrollReveal();
  const active = skillCategories[activeIndex];

  function handleKeyDown(e) {
    const last = skillCategories.length - 1;
    if (e.key === "ArrowRight") {
      const next = activeIndex === last ? 0 : activeIndex + 1;
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = activeIndex === 0 ? last : activeIndex - 1;
      setActiveIndex(prev);
      tabRefs.current[prev]?.focus();
    }
  }

  return (
    <section id="skills" className="section-y">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Skills"
          title="Core Skills & Technologies"
          description="The tools and disciplines I reach for daily, grouped by how I actually use them - design, build, and everything underneath."
          align="left"
        />

        <div
          role="tablist"
          aria-label="Skill categories"
          onKeyDown={handleKeyDown}
          className="mt-10 flex flex-wrap gap-2"
        >
          {skillCategories.map((cat, i) => (
            <button
              key={cat.category}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`skills-tab-${i}`}
              aria-selected={activeIndex === i}
              aria-controls={`skills-panel-${i}`}
              tabIndex={activeIndex === i ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeIndex === i
                  ? "bg-teal text-cream shadow-soft"
                  : "bg-white/70 text-ink-soft hover:text-teal"
              }`}
            >
              <i className={cat.icon} aria-hidden="true" />
              {cat.category}
            </button>
          ))}
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`skills-panel-${activeIndex}`}
          aria-labelledby={`skills-tab-${activeIndex}`}
          key={activeIndex}
          className="mt-8 grid grid-cols-2 gap-3 opacity-0 sm:grid-cols-3 lg:grid-cols-4"
        >
          {active.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-3 rounded-xl border border-ink/8 bg-white/70 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-mango/40 hover:shadow-soft"
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-mango" />
              <span className="text-sm font-medium text-ink">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
