import { useEffect, useRef } from "react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll.js";

// =========================================================
//                      DocumentModal
// ---------------------------------------------------------
// Single shared dialog for viewing a real credential/document
// image. Used by Certifications and Client Collaboration.
// Pass `document={null}` (or leave unset) to keep it closed.
//
//   document: { title, subtitle, imgSrc } | null
// =========================================================
export default function DocumentModal({ document: doc, onClose }) {
  const closeBtnRef = useRef(null);
  const lastFocused = useRef(null);
  const open = Boolean(doc);
  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      lastFocused.current = window.document.activeElement;
      closeBtnRef.current?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.document.addEventListener("keydown", handleKeyDown);
    return () => window.document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc?.title || "Document"}
      className={`fixed inset-0 z-[95] flex items-center justify-center p-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <div
        className={`relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-cream shadow-card transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-bold text-ink">
              {doc?.title}
            </h3>
            {doc?.subtitle && (
              <p className="mt-0.5 text-sm text-ink-soft">{doc.subtitle}</p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close document"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-ink hover:bg-ink/5"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="styled-scrollbar overflow-y-auto p-5">
          {doc?.imgSrc ? (
            <img
              src={doc.imgSrc}
              alt={doc.title}
              loading="lazy"
              className="w-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 py-14 text-ink-soft">
              <i
                className="fa-solid fa-file-circle-question text-3xl"
                aria-hidden="true"
              />
              <p className="text-sm">Document coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
