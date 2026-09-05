import { useEffect, useRef } from "react";
import profile from "../../data/profile.js";
import SocialLinks from "../common/SocialLinks.jsx";
import Button from "../ui/Button.jsx";
import useLockBodyScroll from "../../hooks/useLockBodyScroll.js";

// =========================================================
//                       MobileMenu
// ---------------------------------------------------------
// Slide-in navigation for small screens. Enters from the left,
// exits to the left. Handles Escape-to-close, backdrop click,
// body scroll lock, and returns focus to the trigger on close.
// =========================================================
export default function MobileMenu({
  open,
  onClose,
  navItems,
  triggerRef,
  onDownloadCv,
}) {
  const panelRef = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        triggerRef?.current?.focus();
      }
    }

    const firstLink = panelRef.current?.querySelector("a, button");
    firstLink?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, triggerRef]);

  return (
    <div
      className={`fixed inset-0 z-[90] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel - slides from left */}
      <nav
        ref={panelRef}
        aria-label="Mobile navigation"
        className={`styled-scrollbar absolute left-0 top-0 h-full w-[80%] max-w-xs overflow-y-auto bg-cream shadow-card transition-transform duration-400 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <span className="font-display text-xl font-bold text-teal">
            {profile.firstName}.
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-ink/5"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 py-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-lg font-medium text-ink hover:bg-teal-light hover:text-teal transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 border-t border-ink/10 px-6 py-6">
          <Button
            onClick={() => {
              onClose();
              onDownloadCv?.();
            }}
            variant="primary"
            icon="fa-solid fa-download"
            className="w-full justify-center"
          >
            Download CV
          </Button>
          <SocialLinks className="justify-center" />
        </div>
      </nav>
    </div>
  );
}
