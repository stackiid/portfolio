import useActiveSection from "../../hooks/useActiveSection.js";

// =========================================================
//                        ScrollDots
// ---------------------------------------------------------
// Replaces the default browser scrollbar as the primary visual
// wayfinding element: a minimal vertical dot per major section,
// fixed to the right edge. The active dot reflects real section
// visibility via useActiveSection (IntersectionObserver-based,
// not a hardcoded scrollY threshold), animates between states
// with a simple CSS transition (respects prefers-reduced-motion
// through the same global rule the rest of the site uses - see
// index.css), and each dot is a real, labeled, clickable button.
//
// Desktop/large-screen only. The browser's default scrollbar is hidden
// site-wide (index.css) and this replaces it there - but on small screens
// it's hidden entirely; the hamburger menu already covers navigation, and
// there isn't room for a second wayfinding column without crowding
// content.
//
// Native scrolling (wheel/trackpad/touch/keyboard) is completely
// untouched - this is a pure navigation affordance layered on
// top, not a scroll-hijacking replacement.
// =========================================================
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "collaboration", label: "Collaboration" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function ScrollDots() {
  const activeId = useActiveSection(SECTION_IDS);

  function goTo(id) {
    // scroll-margin-top on section elements (index.css) accounts for the
    // fixed/floating header - no manual offset math needed here, and the
    // same rule benefits every other anchor link on the site too.
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            onClick={() => goTo(section.id)}
            aria-label={`Go to ${section.label} section`}
            aria-current={isActive ? "true" : undefined}
            className="group flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? "h-2.5 w-2.5 bg-teal"
                  : "h-1.5 w-1.5 bg-ink/25 group-hover:bg-teal/50"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
