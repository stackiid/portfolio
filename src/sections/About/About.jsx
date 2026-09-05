import profile from "../../data/profile.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import Button from "../../components/ui/Button.jsx";
import PhilosophyCard from "./PhilosophyCard.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const LEARNING_DIRECTION = [
  "MERN Stack",
  "UI/UX Design",
  "AI Integration",
  "System Design",
  "Secure Coding",
];

// =========================================================
//                          About
// ---------------------------------------------------------
export default function About({ onDownloadCv }) {
  const textRef = useScrollReveal();

  return (
    <section id="about" className="section-y bg-cream-soft/60">
      <div className="container-custom">
        <SectionHeading
          eyebrow="About"
          title={profile.aboutHeading}
          align="left"
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div ref={textRef} className="opacity-0 lg:col-span-7">
            {profile.aboutParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mb-5 text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8">
              <p className="eyebrow mb-3">Currently learning toward</p>
              <ul className="flex flex-wrap gap-2">
                {LEARNING_DIRECTION.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-teal/25 bg-white/70 px-4 py-1.5 text-sm font-medium text-teal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              <Button
                onClick={onDownloadCv}
                variant="secondary"
                icon="fa-solid fa-download"
              >
                Download CV
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-5 lg:content-start">
            {profile.philosophy.map((item, i) => (
              <PhilosophyCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
