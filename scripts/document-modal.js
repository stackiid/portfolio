// =========================================================
//              SHARED DOCUMENT / CERTIFICATE MODAL
// ---------------------------------------------------------
// Single source of truth for the "#certModal" dialog. Reused by:
//   - About > Certifications  → scripts/certification-modal-logic.js
//   - Clients & Collaborations "My Document" icon
// =========================================================
(function () {
  const modal = document.getElementById("certModal");
  if (!modal) return;

  const titleEl = document.getElementById("certModalTitle");
  const subEl = document.getElementById("certModalSub");
  const bodyEl = document.getElementById("certModalBody");
  const closeBtn = document.getElementById("closeCertModal");

  let lastFocusedEl = null;
  let closeTimer = null;

  function open(doc) {
    const { title, subtitle, imgSrc } = doc || {};

    lastFocusedEl = document.activeElement;

    if (titleEl) titleEl.textContent = title || "Document";
    if (subEl) subEl.textContent = subtitle || "";

    if (bodyEl) {
      bodyEl.innerHTML = imgSrc
        ? `<img src="${imgSrc}" alt="${title || "Document"}" loading="lazy" />`
        : '<div class="cert-modal-placeholder">' +
          '<i class="fas fa-file-circle-question"></i>' +
          '<p style="font-size:0.9rem">Document coming soon.</p>' +
          "</div>";
    }

    clearTimeout(closeTimer);
    modal.classList.add("active");
    document.body.classList.add("modal-open");

    // Move focus into the dialog for keyboard/screen-reader users.
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.classList.remove("active");
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      document.body.classList.remove("modal-open");
    }, 500);

    // Return focus to whatever triggered the modal.
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
    lastFocusedEl = null;
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      close();
    }
  });

  window.DocumentModal = { open: open, close: close };
})();
