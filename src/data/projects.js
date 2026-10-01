// =========================================================
//                        PROJECTS
// ---------------------------------------------------------
// Each entry renders as one flip card: image on the front,
// details on the back. Descriptions and tech stacks were
// written from the actual repository source, not just READMEs.
//   id, title, description, image, liveUrl, repoUrl, tags
// To add a project: copy an entry, give it the next id, and
// drop a 3:2 image into public/assets/images/projects/.
// Keep tags to 6 or fewer so the back face never overflows.
// =========================================================

const img = (name) =>
  `${import.meta.env.BASE_URL}assets/images/projects/${name}`;

const projects = [
  {
    id: 1,
    title: "Study Station",
    description:
      "A searchable front end for 13 courses, 65 resources and 5 video channels across 8 categories, with scored global search and saved recent searches.",
    image: img("study-station.webp"),
    liveUrl: "https://stackiid.github.io/study-station/",
    repoUrl: "https://github.com/stackiid/study-station",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "GSAP"],
  },
  {
    id: 2,
    title: "StudentHub",
    description:
      "An academic dashboard with per-student profiles, a full CRUD roster and Chart.js analytics. Every metric is derived from raw records and persists in localStorage.",
    image: img("studenthub.webp"),
    liveUrl: "https://stackiid.github.io/studenthub/",
    repoUrl: "https://github.com/stackiid/studenthub",
    tags: ["React", "Vite", "Tailwind CSS", "Chart.js", "GSAP", "Context API"],
  },
  {
    id: 3,
    title: "Zaheer Abbas Portfolio",
    description:
      "A personal portfolio for a full-stack developer, with a diagonal-split hero, boxed section headings and a validated contact form. All content is data-driven.",
    image: img("zaheer-abbas-portfolio.webp"),
    liveUrl: "https://stackiid.github.io/zaheer-abbas-portfolio/",
    repoUrl: "https://github.com/stackiid/zaheer-abbas-portfolio",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "Formspree"],
  },
  {
    id: 4,
    title: "Muhammad Dawood Portfolio",
    description:
      "A DevOps engineer's portfolio styled like an ML model card, with YAML-style metadata and key-value section labels. Deployed through a lint, build and publish pipeline.",
    image: img("muhammad-dawood-portfolio.webp"),
    liveUrl: "https://idavidkhan.github.io/DevOps/",
    repoUrl: "https://github.com/stackiid/devops",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Formspree", "GitHub Actions"],
  },
  {
    id: 5,
    title: "Ludo Royale",
    description:
      "A complete Ludo game with the full international rules, AI opponents, an animated 3D dice, synthesized sound and autosave. Runs entirely in the browser.",
    image: img("ludo-royale.webp"),
    liveUrl: "https://stackiid.github.io/ludo-royale/",
    repoUrl: "https://github.com/stackiid/ludo-royale",
    tags: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Anime.js", "Web Audio"],
  },
  {
    id: 6,
    title: "Cashew",
    description:
      "A calm personal expense tracker with onboarding, 25 currencies, budget status, filtering and spending charts. Data never leaves the browser.",
    image: img("cashew.webp"),
    liveUrl: "https://stackiid.github.io/cashew/",
    repoUrl: "https://github.com/stackiid/cashew",
    tags: ["JavaScript", "HTML5", "CSS3", "Chart.js", "Anime.js", "Local Storage"],
  },
  {
    id: 7,
    title: "Transport Logistic",
    description:
      "A multi-page freight company site covering services, pricing, projects, FAQ and contact, with GSAP scroll reveals, a route animation and a pricing toggle.",
    image: img("transport-logistic.webp"),
    liveUrl: "https://stackiid.github.io/transport-logistic/",
    repoUrl: "https://github.com/stackiid/transport-logistic",
    tags: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "GSAP"],
  },
  {
    id: 8,
    title: "Wildflour Bakehouse",
    description:
      "A landing page for an artisan bakery with a hero, offers, a Today's Special menu and testimonials. The mobile menu is CSS-only, with no JavaScript.",
    image: img("wildflour-bakehouse.webp"),
    liveUrl: "https://stackiid.github.io/wildflour-bakehouse/",
    repoUrl: "https://github.com/stackiid/wildflour-bakehouse",
    tags: ["HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: 9,
    title: "Greenova",
    description:
      "A marketing landing page for a renewable energy company covering solar, wind, storage and consulting. Built with plain HTML and CSS, including the mobile menu.",
    image: img("greenova.webp"),
    liveUrl: "https://stackiid.github.io/greenova/",
    repoUrl: "https://github.com/stackiid/greenova",
    tags: ["HTML5", "CSS3"],
  },
  {
    id: 10,
    title: "Insight Magazine",
    description:
      "An editorial homepage for a technology magazine with a cover-story hero, a mixed featured grid, a looping news ticker and a sidebar. Static HTML and CSS.",
    image: img("insight-magazine.webp"),
    liveUrl: "https://stackiid.github.io/insight-magazine/",
    repoUrl: "https://github.com/stackiid/insight-magazine",
    tags: ["HTML5", "CSS3"],
  },
];

export default projects;
