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
        testimonials: "readonly",
        collaborations: "readonly",
        CLIENT_ICONS: "readonly",
        CLIENT_ICON_LABELS: "readonly",
        CLIENT_ICON_PRIORITY: "readonly",
        MY_ICONS: "readonly",
        MY_ICON_LABELS: "readonly",
        renderCollaborations: "readonly",
        initCollaborationSlider: "readonly",
        initCollaborationEvents: "readonly",
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
      "scripts/collaboration-config.js",
      "scripts/testimonials-data.js",
    ],
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    // These modules define global init functions that app.js calls
    // from a different file (see the shared `globals` list above) -
    // ESLint lints file-by-file so it can't see that cross-file call.
    files: [
      "scripts/collaboration-render.js",
      "scripts/collaboration-slider.js",
      "scripts/collaboration-events.js",
    ],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
