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
    name: "Programming with JavaScript",
    institute: "Meta",
    date: "September 29, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/meta-programming-with-javascript.jpg`,
  },
  {
    name: "Version Control",
    institute: "Meta",
    date: "September 24, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/meta-version-control.jpg`,
  },
  {
    name: "React Basics",
    institute: "Meta",
    date: "September 19, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/meta-react-basics.jpg`,
  },
  {
    name: "HTML and CSS in Depth",
    institute: "Meta",
    date: "July 17, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/meta-html-and-css-in-depth.jpg`,
  },
  {
    name: "JavaScript Programming",
    institute: "freeCodeCamp",
    date: "August 1, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/freecodecamp-javascript.png`,
  },
  {
    name: "Foundations of User Experience (UX) Design",
    institute: "Google",
    date: "July 14, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/google-foundations-of-user-experience-ux-design.jpg`,
  },
  {
    name: "Designing User Interfaces and Experiences (UI/UX)",
    institute: "IBM",
    date: "July 4, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/ibm-designing-user-interfaces-and-experiences-ui-ux.jpg`,
  },
  {
    name: "Responsive Web Design",
    institute: "freeCodeCamp",
    date: "June 14, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/freecodecamp-responsive-web-design.png`,
  },
  {
    name: "Legacy Responsive Web Design V8",
    institute: "freeCodeCamp",
    date: "April 6, 2026",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/freecodecamp-legacy-responsive-web-design-v8.png`,
  },
  {
    name: "Introduction to Jupyter",
    institute: "365 DataScience",
    date: "November 4, 2024",
    image: `${import.meta.env.BASE_URL}/assets/images/credentials/365datascience-introduction-to-jupyter.jpg`,
  },
  {
    name: "Front-End Development Libraries",
    institute: "freeCodeCamp",
    date: "Coming Soon",
    image: null,
  },
];

export default certifications;
