// =========================================================
//       CLIENTS & COLLABORATIONS - Configuration
// ---------------------------------------------------------
// Pure data. No rendering, no DOM, no event logic lives here -
// see collaboration-render.js / collaboration-events.js /
// collaboration-slider.js for that.
//
// Adding a new icon (either list) or a new card never requires
// touching any other file.
// =========================================================

// ---------------------------------------------------------
// MY_ICONS - documents that represent something *I* (Ubaid)
// hold about the collaboration: certificates, letters, NDAs, etc.
// Shown as the LEFT circular button on hover. Add a new office
// document type by adding one key here (+ MY_ICON_LABELS below).
// ---------------------------------------------------------
const MY_ICONS = {
  certificate: '<i class="fa-solid fa-certificate"></i>',
  experience: '<i class="fa-solid fa-briefcase"></i>',
  internship: '<i class="fa-solid fa-graduation-cap"></i>',
  recommendation: '<i class="fa-solid fa-thumbs-up"></i>',
  offerLetter: '<i class="fa-solid fa-file-signature"></i>',
  nda: '<i class="fa-solid fa-file-shield"></i>',
  legal: '<i class="fa-solid fa-scale-balanced"></i>',
  appreciation: '<i class="fa-solid fa-award"></i>',
  document: '<i class="fa-solid fa-file-lines"></i>',
};

// Human-readable labels for MY_ICONS, used to build accessible
// aria-labels (e.g. "View my Internship Certificate for HerDev").
const MY_ICON_LABELS = {
  certificate: "Certificate",
  experience: "Experience Letter",
  internship: "Internship Certificate",
  recommendation: "Recommendation Letter",
  offerLetter: "Offer Letter",
  nda: "NDA",
  legal: "Legal Document",
  appreciation: "Appreciation Letter",
  document: "Office Document",
};

// ---------------------------------------------------------
// CLIENT_ICONS - platforms that represent the CLIENT / company.
// Shown as the RIGHT circular button on hover. Add a new platform
// by adding one key here (+ label below + priority position).
// ---------------------------------------------------------
const CLIENT_ICONS = {
  website: '<i class="fa-solid fa-globe"></i>',
  linkedin: '<i class="fa-brands fa-linkedin"></i>',
  facebook: '<i class="fa-brands fa-facebook-f"></i>',
  instagram: '<i class="fa-brands fa-instagram"></i>',
  x: '<i class="fa-brands fa-x-twitter"></i>',
  github: '<i class="fa-brands fa-github"></i>',
  behance: '<i class="fa-brands fa-behance"></i>',
  dribbble: '<i class="fa-brands fa-dribbble"></i>',
  fiverr: '<i class="fa-brands fa-fiverr"></i>',
  upwork: '<i class="fa-brands fa-upwork"></i>',
};

const CLIENT_ICON_LABELS = {
  website: "Official Website",
  linkedin: "LinkedIn Profile",
  facebook: "Facebook Page",
  instagram: "Instagram",
  x: "X (Twitter)",
  github: "GitHub",
  behance: "Behance",
  dribbble: "Dribbble",
  fiverr: "Fiverr",
  upwork: "Upwork",
};

// Fallback order used to auto-pick which client link to surface:
// Website > LinkedIn > Facebook > Instagram > X > GitHub > Behance
// > Dribbble > Fiverr > Upwork. A card can define any subset of
// these in `clientLinks`; the first one present, in this order,
// becomes the visible Client Icon.
const CLIENT_ICON_PRIORITY = [
  "website",
  "linkedin",
  "facebook",
  "instagram",
  "x",
  "github",
  "behance",
  "dribbble",
  "fiverr",
  "upwork",
];

// ---------------------------------------------------------
// COLLABORATIONS - one entry per card.
//
//   companyName      Display name (also used for the initial-pill
//                     fallback when companyLogo is omitted).
//   companyLogo      Optional path to a logo image.
//   showMyIcon       Show/hide the left (My Document) button.
//   showClientIcon   Show/hide the right (Client) button.
//   myIcon           Key into MY_ICONS - which document type.
//   documentAvailable
//        true  -> documentPath is a local asset; clicking opens
//                 the shared certificate/document modal.
//        false -> documentLink is an external URL; clicking opens
//                 it in a new tab.
//   documentPath     Local asset path (documentAvailable: true).
//   documentLink     External URL (documentAvailable: false).
//   clientLinks      Any subset of CLIENT_ICONS keys -> URL. The
//                     icon shown is auto-resolved via
//                     CLIENT_ICON_PRIORITY above.
// ---------------------------------------------------------
const collaborations = [
  {
    companyName: "HerDev",
    companyLogo: "./assets/collaboration-logos/herdev.png",
    showMyIcon: true,
    showClientIcon: true,
    myIcon: "offerLetter",
    documentAvailable: true,
    documentPath: "./assets/collaboration-credentials/herdev-offer-letter.png",
    documentLink: "",
    clientLinks: {
      linkedin:
        "https://www.linkedin.com/company/https-www.linkedin.com-company-her-dev/",
    },
  },
];
