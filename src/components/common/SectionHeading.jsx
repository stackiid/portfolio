import useScrollReveal from "../../hooks/useScrollReveal.js";

// =========================================================
//                    SectionHeading
// ---------------------------------------------------------
// Consistent eyebrow + heading + optional description used
// at the top of every homepage section.
// =========================================================
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const ref = useScrollReveal();
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div ref={ref} className={`max-w-2xl opacity-0 ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-ink-soft text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
