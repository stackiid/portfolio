// =========================================================
//                     CERTIFICATIONS
// ---------------------------------------------------------
// Clicking a card opens the shared DocumentModal with the real
// credential image. Set image to null (not "") for certs that
// don't have an issued document yet - the modal shows a
// "Document coming soon" state instead of a broken image.
// =========================================================

const certifications = [
  {
    name: "Designing User Interfaces and Experiences (UI/UX)",
    institute: "IBM",
    date: "July 4, 2026",
    image: "/assets/images/credentials/ibm-uiux.jpg",
  },
  {
    name: "JavaScript Programming",
    institute: "freeCodeCamp",
    date: "August 1, 2026",
    image: "/assets/images/credentials/javascript-programming.png",
  },
  {
    name: "Responsive Web Design",
    institute: "freeCodeCamp",
    date: "June 14, 2026",
    image: "/assets/images/credentials/responsive-web-design.png",
  },
  {
    name: "Legacy Responsive Web Design V8",
    institute: "freeCodeCamp",
    date: "April 6, 2026",
    image: "/assets/images/credentials/legacy-responsive-web-design-v8.png",
  },
  {
    name: "Introduction to Jupyter",
    institute: "365 DataScience",
    date: "November 4, 2024",
    image: "/assets/images/credentials/introduction-to-jupyter.jpg",
  },
  {
    name: "Front-End Development Libraries",
    institute: "freeCodeCamp",
    date: "Coming Soon",
    image: null,
  },
];

export default certifications;
