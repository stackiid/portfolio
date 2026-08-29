// =========================================================
//               SKILLS - Categorized Tabbed
// ---------------------------------------------------------
// Edit this file to add, remove, or rename skill categories
// and the skills within them.
// Each object must have:
//   category: string        - the tab label
//   icon:     string        - Font Awesome class for the tab
//   skills:   Array<{ name: string }>
// =========================================================

const skillCategories = [
  {
    category: "Design",
    icon: "fa-solid fa-pen-ruler",
    skills: [
      { name: "Figma" },
      { name: "UI/UX Design" },
      { name: "User-Centric Design" },
      { name: "Product Development" },
      { name: "Prototyping" },
    ],
  },
  {
    category: "Frontend",
    icon: "fa-solid fa-display",
    skills: [
      { name: "React.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Responsive Web Design" },
      { name: "HTML5 & CSS3" },
      { name: "JavaScript (ES6+)" },
    ],
  },
  {
    category: "Backend",
    icon: "fa-solid fa-server",
    skills: [
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "MERN Stack" },
      { name: "RESTful APIs" },
    ],
  },
  {
    category: "Logic & CS",
    icon: "fa-solid fa-diagram-project",
    skills: [
      { name: "Problem Solving" },
      { name: "Python" },
      { name: "C++" },
      { name: "Data Structures" },
      { name: "Algorithms" },
    ],
  },
  {
    category: "Tools",
    icon: "fa-solid fa-toolbox",
    skills: [
      { name: "Linux" },
      { name: "Git / GitHub" },
      { name: "Scalable Architecture" },
      { name: "Team Management" },
    ],
  },
];

export default skillCategories;
