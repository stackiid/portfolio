// =========================================================
//                CLIENT & COLLABORATION
// ---------------------------------------------------------
// One entry per collaboration. `document` opens in the shared
// DocumentModal (real asset); `clientLink` opens in a new tab.
// =========================================================

const collaborations = [
  {
    companyName: "HerDev",
    companyLogo: `${import.meta.env.BASE_URL}/assets/images/collaboration-logos/herdev.png`,
    documentType: "Offer Letter",
    documentImage: `${import.meta.env.BASE_URL}/assets/images/collaboration-credentials/herdev-offer-letter.png`,
    clientLink: {
      label: "LinkedIn",
      icon: "fa-brands fa-linkedin",
      url: "https://www.linkedin.com/company/https-www.linkedin.com-company-her-dev/",
    },
  },
];

export default collaborations;
