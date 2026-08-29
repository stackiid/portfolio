import experience from "../../data/experience.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

function TimelineItem({ item, delay }) {
  const ref = useScrollReveal({ delay });

  return (
    <div ref={ref} className="relative pl-10 opacity-0 sm:pl-12">
      <span
        className={`absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-cream ${
          item.current ? "bg-mango" : "bg-teal"
        }`}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
        {item.period}
      </p>
      <h3 className="mt-1 font-display text-lg font-bold text-ink">
        {item.title}
      </h3>
      <p className="text-sm font-semibold text-teal">{item.company}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
        {item.description}
      </p>
    </div>
  );
}

// =========================================================
//                        Experience
// ---------------------------------------------------------
export default function Experience() {
  return (
    <section id="experience" className="section-y">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="A timeline of roles, internships, and the academic path that started it all."
        />

        <div className="relative mt-12 flex flex-col gap-10 border-l border-ink/10 sm:gap-12">
          {experience.map((item, i) => (
            <TimelineItem key={item.title + item.period} item={item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
