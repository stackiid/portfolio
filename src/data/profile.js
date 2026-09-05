// =========================================================
//                        PROFILE
// ---------------------------------------------------------
// Core identity data. Edit this file to update name, titles,
// bio copy, location, or the profile image path.
// =========================================================

const profile = {
  name: "Ubaid Ahmad",
  firstName: "Ubaid",
  lastName: "Ahmad",
  greeting: "Hey, I'm",
  titles: ["Full-Stack MERN Developer", "UI/UX Designer"],
  tagline: "Building &",
  taglineAccent: "Designing.",
  heroDescription:
    "I build full-stack MERN applications and polished UI/UX experiences for clients who need fast, clean digital products - without the enterprise overhead.",
  aboutHeading: "The Developer Behind the Portfolio",
  aboutParagraphs: [
    "I'm Ubaid Ahmad, a Computer Science student at the University of Swabi with a deep passion for web development. My work bridges the gap between code and design, focusing on clean architecture and intuitive interfaces. I prioritize building systems that are both readable and effortless to navigate, driven by a commitment to craft and technical precision.",
    "I dedicate my days to studying and refining my engineering instincts through constant experimentation. I enjoy exploring systems from data structure to final screen rendering, valuing depth over shortcuts. My goal is to grow into a purposeful developer by expanding my design thinking. I believe in progress that compounds and aim to build technology that solves real problems.",
  ],
  philosophy: [
    {
      title: "Code as Craft",
      description:
        "Clean, readable, maintainable - always preferred over clever. Good code is code your future self can still understand.",
      icon: "fa-solid fa-code",
    },
    {
      title: "Design is Not Decoration",
      description:
        "Every visual decision serves user clarity. If it doesn't make the product easier to use, it doesn't belong in the interface.",
      icon: "fa-solid fa-compass-drafting",
    },
    {
      title: "Full-Stack Thinking",
      description:
        "Every layer matters - from database schema to button hover state. Strong products are built by developers who understand the full picture.",
      icon: "fa-solid fa-layer-group",
    },
  ],
  location: "Swabi, Khyber Pakhtunkhwa, Pakistan",
  email: "contact form (see Contact section)",
  profileImage: `${import.meta.env.BASE_URL}/assets/images/profile/ubaid-ahmad-profile.png`,
  resumeFile: `${import.meta.env.BASE_URL}assets/resume/ubaid-ahmad-resume.pdf`,
};

export default profile;
