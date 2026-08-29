import education from "../../data/education.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

function EducationRow({ item, delay }) {
  const ref = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 rounded-2xl border border-ink/8 bg-white/70 p-5 opacity-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mango-light text-mango-dark">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-ink">
            {item.degree}
          </h3>
          <p className="text-sm text-ink-soft">
            {item.institution} &middot; {item.location}
          </p>
        </div>
      </div>
      <div className="pl-14 text-left sm:pl-0 sm:text-right">
        <p className="text-sm font-semibold text-teal">{item.period}</p>
        <p className="text-xs text-ink-faint">{item.score}</p>
      </div>
    </div>
  );
}

// =========================================================
//                         Education
// ---------------------------------------------------------
export default function Education() {
  return (
    <section id="education" className="section-y bg-cream-soft/60">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
        />

        <div className="mt-10 flex flex-col gap-4">
          {education.map((item, i) => (
            <EducationRow key={item.degree} item={item} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
