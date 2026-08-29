import useScrollReveal from "../../hooks/useScrollReveal.js";

// =========================================================
//                     PhilosophyCard
// ---------------------------------------------------------
export default function PhilosophyCard({ icon, title, description, delay }) {
  const ref = useScrollReveal({ delay });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-ink/8 bg-white/70 p-6 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-teal-light text-teal">
        <i className={icon} aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {description}
      </p>
    </div>
  );
}
