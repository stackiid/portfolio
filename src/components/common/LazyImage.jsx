import { useEffect, useRef, useState } from "react";
import { whenImageReady } from "../../utils/image.js";

// =========================================================
//                        LazyImage
// ---------------------------------------------------------
// Non-hero images. Space is reserved from width/height, the
// browser lazy-loads the file, and a placeholder stays up
// until the image has actually loaded and decoded. The
// elapsed-seconds label is real time since the image came
// near the viewport; remaining time is unknowable, so it is
// never estimated.
// =========================================================

const LABEL_AFTER_SECONDS = 1;

function LazyImageInner({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  loading = "lazy",
  className = "",
  imgClassName = "object-cover",
  showTimer = false,
}) {
  const [status, setStatus] = useState("loading");
  const [seconds, setSeconds] = useState(0);
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const decorative = alt === "";

  useEffect(() => {
    let cancelled = false;
    whenImageReady(imgRef.current).then(
      () => !cancelled && setStatus("ready"),
      () => !cancelled && setStatus("error"),
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showTimer || status !== "loading") return undefined;
    const wrap = wrapRef.current;
    let intervalId = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || intervalId !== null) return;
        const startedAt = performance.now();
        intervalId = setInterval(() => {
          setSeconds(Math.floor((performance.now() - startedAt) / 1000));
        }, 1000);
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, [showTimer, status]);

  const loadingState = status === "loading";
  const compact = !showTimer;

  return (
    <div
      ref={wrapRef}
      aria-busy={loadingState}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      className={`relative overflow-hidden bg-cream-deep ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={status === "error" ? "" : alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ease-out ${imgClassName} ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role={decorative ? undefined : "status"}
        aria-hidden={decorative ? true : undefined}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1 text-ink-soft transition-opacity duration-300 ${
          status === "ready" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {status === "error" ? (
          <>
            <i
              className={`fa-regular fa-image ${compact ? "text-xs" : "text-xl"}`}
              aria-hidden="true"
            />
            {!compact && <span className="text-[11px]">Image unavailable</span>}
            <span className="sr-only">Image unavailable</span>
          </>
        ) : (
          <>
            <i
              className={`fa-solid fa-hourglass-half ${
                loadingState ? "lazy-hourglass" : ""
              } ${compact ? "text-xs" : "text-xl"}`}
              style={{ color: "rgb(0, 0, 0)" }}
              aria-hidden="true"
            />
            {showTimer && seconds >= LABEL_AFTER_SECONDS && (
              <span className="text-[11px] tabular-nums" aria-hidden="true">
                Loading {seconds}s
              </span>
            )}
            <span className="sr-only">Loading image</span>
          </>
        )}
      </div>
    </div>
  );
}

// Keyed by src so a swapped image (document modal) starts a fresh lifecycle.
export default function LazyImage(props) {
  return <LazyImageInner key={props.src} {...props} />;
}
