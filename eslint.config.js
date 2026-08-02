module.exports = [
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        getComputedStyle: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        skillCategories: "readonly",
        experience: "readonly",
        clients: "readonly",
        testimonials: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        { caughtErrorsIgnorePattern: "^_$", argsIgnorePattern: "^_$" },
      ],
      "no-undef": "error",
      "no-console": "off",
      "no-var": "warn",
      eqeqeq: ["warn", "smart"],
    },
  },
  {
    files: [
      "scripts/skills-data.js",
      "scripts/experience-data.js",
      "scripts/clients-data.js",
      "scripts/testimonials-data.js",
    ],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
