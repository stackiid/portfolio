import socialLinks from "../../data/socialLinks.js";

// =========================================================
//                      SocialLinks
// ---------------------------------------------------------
// Renders the icon row from src/data/socialLinks.js. Add or
// remove a platform there - this component never changes.
// =========================================================
export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-teal/20 text-teal transition-all duration-300 hover:-translate-y-1 hover:bg-teal hover:text-cream hover:border-teal"
          >
            <i className={link.icon} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
