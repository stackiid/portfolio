import profile from "../../data/profile.js";
import contact from "../../data/contact.js";
import SocialLinks from "./SocialLinks.jsx";

const SITEMAP = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Collaboration", href: "#collaboration" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// =========================================================
//                          Footer
// ---------------------------------------------------------
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-soft/60">
      <div className="container-custom grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <a href="#hero" className="font-display text-xl font-bold text-teal">
            {profile.firstName}
            <span className="text-mango">.</span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {profile.titles.join(" & ")}. Based in {contact.location}.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <p className="eyebrow mb-3">Sitemap</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {SITEMAP.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-ink-soft transition-colors hover:text-teal"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Get in touch</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-dark"
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            Start a conversation
          </a>
          <p className="mt-3 text-sm text-ink-soft">
            <i
              className="fa-solid fa-location-dot mr-2 text-mango"
              aria-hidden="true"
            />
            {contact.location}
          </p>
        </div>
      </div>

      <div className="border-t border-ink/10 py-6">
        <div className="container-custom flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {year} {profile.name}. Custom-coded for maximum impact.
          </p>
          <a
            href="#hero"
            className="text-xs font-semibold text-teal hover:text-teal-dark"
          >
            Back to top{" "}
            <i className="fa-solid fa-arrow-up ml-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
