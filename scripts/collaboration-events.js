// =========================================================
//       CLIENTS & COLLABORATIONS - Event Wiring
// =========================================================

function initCollaborationEvents() {
  const viewport = document.querySelector(".clients-carousel");
  const track = document.getElementById("clientsTrack");
  if (!viewport || !track) return;

  function openMyDocument(btn) {
    if (!window.DocumentModal) return;
    window.DocumentModal.open({
      title: btn.dataset.docTitle,
      subtitle: btn.dataset.docSubtitle,
      imgSrc: btn.dataset.docImg,
    });
  }

  function collapseRevealedTiles() {
    track
      .querySelectorAll(".collab-tile.is-revealed")
      .forEach((t) => t.classList.remove("is-revealed"));
  }

  track.addEventListener("click", (e) => {
    const myBtn = e.target.closest('[data-doc-mode="local"]');
    if (myBtn) {
      e.preventDefault();
      openMyDocument(myBtn);
      return;
    }

    // Any other action button (external <a>) is left to native
    // browser handling - nothing to intercept.
    if (e.target.closest(".collab-action-btn")) return;

    // Tapping the tile body (not a button) toggles the reveal
    // state, which mirrors :hover/:focus-within on touch devices.
    const tile = e.target.closest(".collab-tile");
    if (!tile) return;

    const wasRevealed = tile.classList.contains("is-revealed");
    collapseRevealedTiles();
    tile.classList.toggle("is-revealed", !wasRevealed);
  });

  // Tapping anywhere outside the carousel collapses any revealed tile.
  document.addEventListener("click", (e) => {
    if (viewport.contains(e.target)) return;
    collapseRevealedTiles();
  });
}
