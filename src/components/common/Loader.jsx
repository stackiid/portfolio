// =========================================================
//                          Loader
// ---------------------------------------------------------
// Initial loading screen. Intentionally minimal per spec:
// three bouncing dots, no text, no logo, no percentage.
// Unmounted by App once the app is ready - see App.jsx.
// =========================================================
export default function Loader({ visible }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="h-3.5 w-3.5 rounded-full bg-teal animate-bounce-dot" style={{ animationDelay: "0ms" }} />
        <span className="h-3.5 w-3.5 rounded-full bg-mango animate-bounce-dot" style={{ animationDelay: "150ms" }} />
        <span className="h-3.5 w-3.5 rounded-full bg-teal animate-bounce-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
