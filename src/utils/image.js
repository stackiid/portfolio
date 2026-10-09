// Resolves once the image has loaded and decoded, rejects if it failed.
// Safe for cached images: checks `complete` before waiting for events.
export async function whenImageReady(img) {
  if (!img.complete) {
    await new Promise((resolve, reject) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", () => reject(new Error("load failed")), {
        once: true,
      });
    });
  }
  if (img.naturalWidth === 0) throw new Error("load failed");
  if (typeof img.decode === "function") {
    try {
      await img.decode();
    } catch {
      // The bytes loaded; a rejected decode() is only fatal if nothing rendered.
      if (img.naturalWidth === 0) throw new Error("decode failed");
    }
  }
}
