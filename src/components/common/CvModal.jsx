import { useCallback, useEffect, useRef, useState } from "react";
import profile from "../../data/profile.js";
import Button from "../ui/Button.jsx";
import useLockBodyScroll from "../../hooks/useLockBodyScroll.js";

// =========================================================
//                         CvModal
// =========================================================
export default function CvModal({ open, onClose }) {
  const [step, setStep] = useState("action"); // "action" | "viewer"
  const actionCloseRef = useRef(null);
  const viewerCloseRef = useRef(null);
  const lastFocused = useRef(null);

  useLockBodyScroll(open);

  const closeModal = useCallback(() => {
    onClose();
    setStep("action");
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    if (!lastFocused.current) lastFocused.current = document.activeElement;
    const target = step === "viewer" ? viewerCloseRef : actionCloseRef;
    target.current?.focus();
  }, [open, step]);

  useEffect(() => {
    if (open) return;
    lastFocused.current?.focus?.();
    lastFocused.current = null;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  function handleDownload() {
    const link = document.createElement("a");
    link.href = profile.resumeFile;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
    closeModal();
  }

  const showAction = open && step === "action";
  const showViewer = open && step === "viewer";

  return (
    <>
      {/* CV ACTION MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="CV options"
        className={`fixed inset-0 z-[96] flex items-center justify-center p-4 transition-opacity duration-300 ${
          showAction ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          onClick={closeModal}
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        />

        <div
          className={`relative w-full max-w-sm rounded-2xl bg-cream p-6 shadow-card transition-transform duration-300 ${
            showAction ? "scale-100" : "scale-95"
          }`}
        >
          <button
            ref={actionCloseRef}
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-ink/5"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <i className="fa-solid fa-file-lines text-xl" aria-hidden="true" />
          </div>

          <h3 className="mt-4 font-display text-lg font-bold text-ink">
            What would you like to do?
          </h3>
          <p className="mt-1.5 text-sm text-ink-soft">
            Download the CV to keep a copy, or view it here first.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={handleDownload}
              variant="primary"
              icon="fa-solid fa-download"
              className="w-full justify-center"
            >
              Download the CV
            </Button>
            <Button
              onClick={() => setStep("viewer")}
              variant="secondary"
              icon="fa-solid fa-eye"
              className="w-full justify-center"
            >
              View the CV
            </Button>
          </div>
        </div>
      </div>

      {/* CV VIEWER MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="CV viewer"
        className={`fixed inset-0 z-[96] flex items-center justify-center p-3 transition-opacity duration-300 sm:p-4 ${
          showViewer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          onClick={closeModal}
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        />

        <div
          className={`relative flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-cream shadow-card transition-transform duration-300 sm:h-[85vh] ${
            showViewer ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-5 py-4">
            <h3 className="font-display text-base font-bold text-ink">
              {profile.name} &middot; CV
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handleDownload}
                aria-label="Download CV"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              >
                <i className="fa-solid fa-download" aria-hidden="true" />
              </button>
              <button
                ref={viewerCloseRef}
                onClick={closeModal}
                aria-label="Close CV viewer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-ink/5">
            {showViewer && (
              <iframe
                src={profile.resumeFile}
                title={`${profile.name} CV`}
                className="h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
