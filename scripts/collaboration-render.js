// =========================================================
//       CLIENTS & COLLABORATIONS - Card Rendering
// =========================================================

function renderCollaborations() {
  const track = document.getElementById("clientsTrack");
  if (!track) return;
  if (!collaborations || !collaborations.length) return;

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  }

  // Walks CLIENT_ICON_PRIORITY and returns the first configured
  // { type, url, label } for this card, or null if none apply.
  function resolveClientIcon(card) {
    if (!card.clientLinks) return null;
    for (const type of CLIENT_ICON_PRIORITY) {
      const url = card.clientLinks[type];
      if (url) {
        return { type, url, label: CLIENT_ICON_LABELS[type] || type };
      }
    }
    return null;
  }

  function buildIdleFace(card) {
    const name = escapeHtml(card.companyName);

    const visual = card.companyLogo
      ? `<div class="collab-logo-frame">
          <img
            class="collab-logo-img"
            src="${card.companyLogo}"
            alt="${name} logo"
            loading="lazy"
          />
        </div>`
      : `<div class="client-initial-pill" aria-hidden="true">${escapeHtml(
          (card.companyName || "?").charAt(0).toUpperCase(),
        )}</div>`;

    // Company name is always shown beneath the visual, logo or not.
    return `
      <div class="collab-face collab-face--idle">
        ${visual}
        <span class="client-name-label">${name}</span>
      </div>`;
  }

  function buildMyIconButton(card) {
    const iconMarkup = MY_ICONS[card.myIcon];
    if (!card.showMyIcon || !iconMarkup) return "";

    const name = escapeHtml(card.companyName);
    const docLabel = MY_ICON_LABELS[card.myIcon] || "Document";
    const ariaLabel = `View my ${docLabel} for ${name}`;

    if (card.documentAvailable) {
      if (!card.documentPath) return "";
      return `
        <button
          type="button"
          class="collab-action-btn collab-action-btn--me"
          data-doc-mode="local"
          data-doc-title="${escapeHtml(docLabel)}"
          data-doc-subtitle="${name}"
          data-doc-img="${card.documentPath}"
          title="${escapeHtml(docLabel)}"
          aria-label="${escapeHtml(ariaLabel)}"
        >${iconMarkup}</button>`;
    }

    if (!card.documentLink) return "";
    return `
      <a
        class="collab-action-btn collab-action-btn--me"
        href="${card.documentLink}"
        target="_blank"
        rel="noopener noreferrer"
        title="${escapeHtml(docLabel)}"
        aria-label="${escapeHtml(ariaLabel)} (opens externally)"
      >${iconMarkup}</a>`;
  }

  function buildClientIconButton(card) {
    if (!card.showClientIcon) return "";
    const resolved = resolveClientIcon(card);
    if (!resolved) return "";

    const iconMarkup = CLIENT_ICONS[resolved.type];
    if (!iconMarkup) return "";

    const name = escapeHtml(card.companyName);
    const label = escapeHtml(resolved.label);
    return `
      <a
        class="collab-action-btn collab-action-btn--client"
        href="${resolved.url}"
        target="_blank"
        rel="noopener noreferrer"
        title="${label}"
        aria-label="Visit ${name} on ${label}"
      >${iconMarkup}</a>`;
  }

  function buildCard(card) {
    const name = escapeHtml(card.companyName);
    const myBtn = buildMyIconButton(card);
    const clientBtn = buildClientIconButton(card);

    return `
      <div class="collab-tile" role="listitem" aria-label="${name} collaboration">
        ${buildIdleFace(card)}
        <div class="collab-face collab-face--actions">
          ${myBtn}
          ${clientBtn}
        </div>
      </div>`;
  }

  track.innerHTML = collaborations.map(buildCard).join("");
}
