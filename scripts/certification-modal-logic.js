// =========================================================
//        CERTIFICATION CARDS -> DOCUMENT MODAL WIRING
// =========================================================
(function () {
  function openFromCard(card) {
    if (!window.DocumentModal) return;

    const name = card.dataset.certName;
    const institute = card.dataset.certInstitute;
    const date = card.dataset.certDate;
    const imgSrc = card.dataset.certImg;

    window.DocumentModal.open({
      title: name,
      subtitle: [institute, date].filter(Boolean).join(" \u00b7 "),
      imgSrc: imgSrc,
    });
  }

  document.querySelectorAll(".cert-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openFromCard(card);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFromCard(card);
      }
    });
  });
})();
