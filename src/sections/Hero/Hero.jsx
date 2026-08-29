import profile from "../../data/profile.js";
import counters from "../../data/counters.js";
import SocialLinks from "../../components/common/SocialLinks.jsx";
import RatingCard from "./RatingCard.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

// =========================================================
//                           Hero
// ---------------------------------------------------------
// Primary visual reference: the supplied hero screenshot.
// Composition preserved (nav-adjacent greeting, centered
// circular portrait, decorative arc, floating proof card,
// left experience stat, right supporting statement, bottom
// tagline) - content and identity are Ubaid's own.
// =========================================================
export default function Hero() {
  const leftRef = useScrollReveal({ delay: 0 });
  const imageRef = useScrollReveal({ delay: 150 });
  const rightRef = useScrollReveal({ delay: 300 });

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-10 pt-[8.5rem] sm:pb-14 sm:pt-[9.5rem] lg:pt-[10.5rem]"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-mango-light/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-teal-light/60 blur-3xl"
      />

      <div className="container-custom relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Left column: identity + stat + social */}
          <div
            ref={leftRef}
            className="order-2 flex flex-col items-center gap-8 text-center opacity-0 lg:order-1 lg:col-span-4 lg:items-start lg:text-left"
          >
            <div>
              <p className="font-script text-3xl text-mango-dark">
                {profile.greeting}
              </p>
              <h1
                id="hero-title"
                className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl"
              >
                {profile.firstName}
                <br />
                {profile.lastName}
                <span className="text-mango">.</span>
              </h1>
              <p className="mt-3 text-base font-semibold text-teal sm:text-lg">
                {profile.titles.join(" & ")}
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-ink/10 pt-6">
              <span className="font-display text-4xl font-bold text-teal">
                {counters.yearsExperience}
              </span>
              <span className="max-w-[7rem] text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Years Experience
              </span>
            </div>

            <SocialLinks />
          </div>

          {/* Center column: portrait */}
          <div
            ref={imageRef}
            className="order-1 flex justify-center opacity-0 lg:order-2 lg:col-span-4"
          >
            <div className="relative">


              <div className="h-64 w-64 rounded-full bg-gradient-to-b from-teal-light via-cream-soft to-mango-light p-2 shadow-card sm:h-80 sm:w-80">
                <div className="h-full w-full overflow-hidden rounded-full bg-cream-soft">
                  <img
                    src={profile.profileImage}
                    alt={`Portrait of ${profile.name}`}
                    width="320"
                    height="320"
                    loading="eager"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-cream shadow-soft">
                <i className="fa-solid fa-code text-mango" aria-hidden="true" />
                Developer
              </span>

              <span className="absolute right-[-2.5rem] top-[62%] inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-mango px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ink shadow-soft">
                <i className="fa-solid fa-compass-drafting text-teal-dark" aria-hidden="true" />
                Designer
              </span>
            </div>
          </div>

          {/* Right column: supporting statement + tagline */}
          <div
            ref={rightRef}
            className="order-3 flex flex-col items-center gap-10 text-center opacity-0 lg:col-span-4 lg:items-end lg:text-right"
          >
            <p className="max-w-xs text-base leading-relaxed text-ink-soft sm:text-lg">
              {profile.heroDescription}
            </p>

            <div className="hidden lg:block">
              <p className="font-script text-3xl leading-none text-mango-dark">
                {profile.tagline}
              </p>
              <p className="font-display text-2xl font-bold text-teal">
                {profile.taglineAccent}
              </p>
            </div>

            <div className="hidden animate-pill-bounce lg:block">
              <RatingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
