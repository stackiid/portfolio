import { useEffect, useRef, useState } from "react";
import profile from "../../data/profile.js";
import Button from "../ui/Button.jsx";
import MobileMenu from "./MobileMenu.jsx";
import useActiveSection from "../../hooks/useActiveSection.js";

// =========================================================
//                         Navbar
// ---------------------------------------------------------
// Desktop nav stays a condensed set of links (avoids crowding
// a floating pill header); the mobile menu gets the FULL
// section list separately - see MOBILE_NAV_ITEMS below and
// MobileMenu.jsx.
// =========================================================
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// The mobile menu is the only nav surface reachable on small screens (the
// scroll-dot indicator is desktop-only), so it carries every real section -
// including the ones the condensed desktop nav leaves out.
const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Clients & Collaboration", href: "#collaboration" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);
  const activeSectionId = useActiveSection(SECTION_IDS);
  const activeHash = `#${activeSectionId}`;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Outer shell: full-width positioning context only, no visible
          styling - keeps the fixed-positioning math simple. The floating
          look (inset margins, rounded corners, background) lives on the
          inner bar below. */}
      <div className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8 lg:pt-5">
        <header
          className={`mx-auto max-w-[1240px] rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-cream/90 backdrop-blur-md shadow-soft border border-ink/5"
              : "bg-cream/50 backdrop-blur-sm border border-ink/5"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6">
            <a
              href="#hero"
              className="font-display text-2xl font-bold text-teal tracking-tight"
            >
              {profile.firstName}
              <span className="text-mango">.</span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full bg-white/50 px-2 py-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeHash === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "bg-teal text-cream"
                            : "text-ink hover:text-teal"
                        }`}
                      >
                        {isActive ? `( ${item.label} )` : item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                href={profile.resumeFile}
                download
                variant="primary"
                icon="fa-solid fa-download"
                className="hidden sm:inline-flex"
              >
                Download CV
              </Button>

              <button
                ref={triggerRef}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/20 text-teal lg:hidden"
              >
                <i className="fa-solid fa-bars" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Sibling of the header shell, not nested inside it - backdrop-filter
          on the header creates a containing block for position:fixed
          descendants, which would otherwise trap this overlay inside the
          header's own small box instead of the viewport. */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={MOBILE_NAV_ITEMS}
        triggerRef={triggerRef}
      />
    </>
  );
}
