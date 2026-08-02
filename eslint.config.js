// Flat config (ESLint 9+). This project ships plain <script> tags with no
// bundler/module system, so files run in a shared global browser scope -
// configured accordingly below (no "module" sourceType, browser globals on).

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
        // These four are declared with top-level `const` in their own data
        // files and read here in app.js - valid at runtime because
        // non-module <script> tags share one global scope.
        skillCategories: "readonly",
        experience: "readonly",
        clients: "readonly",
        testimonials: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        // `_` is this codebase's convention for an intentionally discarded
        // catch binding (see contact-form-validation.js) - don't flag it.
        { caughtErrorsIgnorePattern: "^_$", argsIgnorePattern: "^_$" },
      ],
      "no-undef": "error",
      "no-console": "off",
      "no-var": "warn",
      eqeqeq: ["warn", "smart"],
    },
  },
  {
    // These four files declare a single top-level `const` that app.js reads
    // as a global in a later <script> tag (non-module scripts share one
    // global scope) - that's a real cross-file usage, not dead code, so
    // no-unused-vars would only produce false positives here.
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
