# Architecture Overview - Gold Noir Era

**Version:** 4.0.0  
**Updated:** 2026-06-22

---

## Project Type

Pure static site - HTML, CSS, and vanilla JavaScript.  
No build step. No framework. No package manager. One `index.html` opened in a browser is a running site.

---

## File Architecture

```
Ubaid Ahmad/
├── index.html                     # Home page shell + SEO + contact form
├── pages/
│   ├── about.html                 # About + education + certifications
│   └── services.html              # Services + process flow
├── styles/
│   ├── style.css                  # Primary stylesheet (4,633 lines)
│   │                              # Contains: design tokens, layout, components,
│   │                              # animations, responsive rules, light/dark modes
│   └── about.css                  # About/certifications supplemental styles
├── scripts/
│   ├── app.js                     # Core JS (45KB) - all UI logic
│   ├── clients-data.js            # Client/testimonial data objects
│   ├── experience-data.js         # Work history data objects
│   ├── projects-data.js           # Portfolio project data objects
│   ├── skills-data.js             # Skills grid data objects
│   ├── testimonials-data.js       # Testimonials data objects
│   ├── certification-modal-logic.js # Cert modal open/close
│   └── contact-form-validation.js  # Contact form validation
└── assets/
    ├── favicon.png
    ├── hero-profile-portrait.png
    ├── avatars/                   # Testimonial headshots
    ├── credentials/               # Certification images
    └── work/                      # Project screenshots
```

---

## Design Token Architecture

All colours are CSS custom properties on `:root`. Components never use hardcoded hex values.
Theme switching is accomplished by overriding `:root[data-theme="light"]` - zero JavaScript
colour manipulation required.

```
:root                    → Gold Noir dark mode tokens
:root[data-theme="light"] → Gold Noir light mode tokens (WCAG-AA compliant)
```

The `--accent-rgb` token enables `rgba()` opacity composition without string manipulation:

```css
background: rgba(var(--accent-rgb), 0.12); /* → rgba(212, 175, 55, 0.12) */
```

---

## JavaScript Architecture

`app.js` is a single self-contained module with named init functions:

| Function                     | Responsibility                      |
| ---------------------------- | ----------------------------------- |
| `initHeaderScrollProgress()` | rAF scroll-progress fill            |
| `initSmoothScroll()`         | Custom eased scroll                 |
| `initMobileMenu()`           | Mobile nav toggle                   |
| `initThemeToggle()`          | Dark/light mode switching           |
| `initProjectsSection()`      | Data-driven project rendering       |
| `initSkillsSection()`        | Skills grid with category filtering |
| `initTestimonialsSection()`  | Testimonial carousel                |
| `initExperienceTimeline()`   | Accordion timeline                  |
| `initContactForm()`          | Form validation + submission        |
| `initAnimeAnimations()`      | Anime.js orchestration              |

Data is stored in `window.*` namespaced objects populated by the data scripts before `app.js` runs.

---

## CDN Dependencies

| Library           | Version   | Purpose              |
| ----------------- | --------- | -------------------- |
| Tailwind CSS      | Latest    | Utility classes      |
| Font Awesome      | 6.5.1     | Icon library         |
| Plus Jakarta Sans | Variable  | Typeface             |
| Anime.js          | (via CDN) | JS animation library |

---

## Performance Characteristics

- **No build step** - zero compilation overhead, instant dev iteration.
- **CSS custom property theming** - theme switch costs zero JS colour recalculation.
- **Data-driven rendering** - adding projects/experience requires only data file edits.
- **rAF-throttled scroll listeners** - all scroll effects are passive and frame-budget-aware.
- **Asset loading** - images are lazy-loaded where applicable.
