# Ubaid Ahmad - Full-Stack MERN Developer & UI/UX Designer

A high-performance, multi-page developer portfolio built on a **data-driven vanilla JavaScript
architecture**. Engineered for speed, structured for long-term scalability, and designed without a
single build dependency. It features a premium 3D interaction layer, direction-aware
scroll animations, smart pagination, a universal shimmer-gradient design system, a full
certifications section, and a dual-mode contact form - all written in pure HTML, CSS, and
JavaScript.

---

## Live Preview

**[stackiid.github.io](https://stackiid.github.io/portfolio)**

---

## What is This Project?

This is a personal developer portfolio for **Ubaid Ahmad**, a Full-Stack MERN developer and UI/UX
designer. The portfolio is not a template or a theme - it is a custom, production-grade static site
engineered to communicate technical depth, design sensibility, and professional credibility to
prospective clients and collaborators.

Every design decision in this codebase serves a purpose. The Gold Noir glassmorphism system was
chosen for its technology-forward, authoritative aesthetic. The 3D coin-toss profile card was engineered to demonstrate front-end
physics knowledge before a single line of copy is read. The data-driven rendering architecture was
chosen so that adding a new project, experience entry, or testimonial requires zero HTML changes.

The portfolio is fully static. No server, no database, no build step. One `index.html` file opened
in a browser is a running site.

---

## Tech Stack

### Core

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

### MERN Stack (Projects Showcased)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

### Design & Tooling

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)

### CDN Dependencies (No npm Required)

| Dependency        | Source       | Purpose                             |
| ----------------- | ------------ | ----------------------------------- |
| Tailwind CSS      | CDN          | Utility classes and responsive grid |
| Font Awesome 6.5  | CDN          | Icon library (all icons site-wide)  |
| Plus Jakarta Sans | Google Fonts | Primary typeface                    |

---

## File Structure

```
Ubaid Ahmad/
|
|- index.html                          # Home page - layout shell, SEO metadata, contact form
|
|- assets/
|   |- hero-profile-portrait.png       # Profile photo (coin card front face)
|   |- favicon.png                     # Favicon
|   |- avatars/                        # Testimonial reviewer headshots
|   |   |- muhammad-dawood-devops-engineer-avatar.jpg
|   |   |- umair-amjad-software-engineer-avatar.jpg
|   |   |- wajeeha-sultan-frontend-developer-avatar.jpg
|   |   `- zaheer-abbas-fullstack-dev-avatar.jpg
|   |- credentials/                    # Certificate images for About page modal
|   |   |- Designing User Interfaces and Experiences (UIUX).jpg
|   |   |- Introduction to Jupyter.jpg
|   |   |- JavaScript.png
|   |   |- Legacy Responsive Web Design V8.png
|   |   `- Responsive Web Design.png
|   `- work/                           # Project screenshot thumbnails
|       |- hadaf-immigration.jpeg
|       |- portfolio-landing-page.png
|       `- study-station.jpeg
|
|- pages/
|   |- about.html                      # About / Story page (bio, timeline, certifications, philosophy)
|   `- services.html                   # Services / Hire Me (3 tiers, 5-step process)
|
|- scripts/
|   |- projects-data.js                # window.projects - all project objects
|   |- skills-data.js                  # skillCategories - tabbed skills grid
|   |- experience-data.js              # experience - paginated timeline
|   |- collaboration-config.js         # collaborations + CLIENT_ICONS/MY_ICONS maps (pure data)
|   |- collaboration-render.js         # Builds the two-face hover card markup
|   |- collaboration-slider.js         # Seamless RAF-driven infinite carousel
|   |- collaboration-events.js         # My-Document / tap-to-reveal click wiring
|   |- testimonials-data.js            # testimonials - carousel + modal
|   |- app.js                          # All render functions, state, animations, theme toggle,
|   |                                  #   mobile menu, testimonial carousel
|   |- document-modal.js               # Shared modal controller (certs + collab documents)
|   |- certification-modal-logic.js    # Cert card → document-modal.js wiring (about.html)
|   `- contact-form-validation.js      # Dual-mode contact form logic (index.html only)
|
|- styles/
|   |- style.css                       # Design system, animation engine, responsive rules
|   `- about.css                       # About / certifications page-specific styles
|
|- docs/
|   |- PROJECT_EDITING_GUIDE.md        # How to safely extend and maintain the codebase
|   |- DESIGN_SYSTEM.md                # Design token and component reference
|   |- ACCESSIBILITY.md                # ARIA, keyboard nav, and focus management reference
|   `- PERFORMANCE.md                  # Performance budget and optimisation reference
|
|- README.md
`- LICENSE
```

The project enforces strict separation of concerns:

- **HTML** handles structure, static metadata, and modal scaffold containers only.
- **CSS** owns every presentational rule, animation keyframe, and responsive breakpoint.
- **JavaScript** owns all data arrays, render logic, state management, and DOM output.
- **Data files** (`*-data.js`, `collaboration-config.js`) are the single source of truth for
  all content - edit these to add, remove, or update entries with zero HTML changes.

### Script Load Order

All HTML pages load scripts in this sequence:

```html
<script src="./scripts/projects-data.js"></script>
<script src="./scripts/skills-data.js"></script>
<script src="./scripts/experience-data.js"></script>
<script src="./scripts/collaboration-config.js"></script>
<script src="./scripts/testimonials-data.js"></script>
<script src="./scripts/document-modal.js"></script>
<!-- index.html + about.html only - services.html has no document to open -->
<script src="./scripts/collaboration-render.js"></script>
<script src="./scripts/collaboration-slider.js"></script>
<script src="./scripts/collaboration-events.js"></script>
<script src="./scripts/app.js"></script>
<!-- page-specific scripts after app.js -->
<script src="./scripts/contact-form-validation.js"></script>
<!-- index.html only -->
<script src="./scripts/certification-modal-logic.js"></script>
<!-- about.html only -->
```

`app.js`'s `DOMContentLoaded` handler calls `renderCollaborations()` unconditionally (same
pattern as `renderSkills()`, `renderExperience()`, etc.), so
`collaboration-render.js`/`-slider.js`/`-events.js` must be present on every page that loads
`app.js` even if that page has no `#clientsTrack` - each one early-returns safely when its
target element is missing, exactly like the other render functions already do.

`app.js` reads from the data variables set by the preceding files, so load order is mandatory.

---

## Pages

| Page     | File                  | Status | Description                                                      |
| -------- | --------------------- | ------ | ---------------------------------------------------------------- |
| Home     | `index.html`          | Live   | Hero, stats, skills, experience, projects, testimonials, contact |
| About    | `pages/about.html`    | Live   | Bio, career timeline, certifications, tech philosophy, currently |
| Services | `pages/services.html` | Live   | 3 service tiers, 5-step process, mailto CTAs only                |

---

## Features

### Liquid Scroll-Progress Header

The floating header (`.glass-header`) doubles as a page scroll indicator. A
`.header-progress-fill` layer grows left-to-right in sync with scroll position - 0% at the top of
the page, 100% at the bottom - driven by `initHeaderScrollProgress()` in `scripts/app.js`. Two
rotating, low-opacity gold blobs (`.header-progress-wave`, `.header-progress-wave--b`) sit at the
fill's leading edge and continuously animate via CSS `@keyframes`, producing a subtle liquid
ripple that keeps moving even once scrolling stops. Scroll updates are rAF-throttled and only
touch `width` on a small absolutely-positioned layer (no layout thrash), and the wave animation
is disabled under `prefers-reduced-motion: reduce`.

### Dual-Mode Contact Form

The contact form on `index.html` (`#contactForm`) is a dual-mode widget. A tab selector switches
between **Mail** mode (builds a `mailto:` submission via Formspree) and **WhatsApp** mode (builds
a `https://wa.me/` deep-link). Fields show/hide conditionally per mode and each field keeps its
own independent state so switching tabs never loses what's already typed. **Full Name** requires
a first and last name (apostrophes/hyphens allowed for names like `O'Brien` or `Anne-Marie`);
**Email**, **WhatsApp Number**, **Subject**, and **Message** have their own real-time validators.
The **Send Message** button stays disabled until every required field for the active mode passes
validation. A toast notification confirms send or reports errors. All logic lives in
`scripts/contact-form-validation.js`.

### Testimonial Carousel

A single-card carousel (`id="testimonialCarousel"`) built on `#tcTrack .carousel-slide` elements.
Slide transitions animate via inline `transform: translateX()` / `opacity` (not CSS keyframes),
managed by `tcGoTo()` in `app.js`. Features dot navigation (`.carousel-dot`, active state via
`.tc-dot-active`), previous/next controls, auto-advance every 2 minutes (`TC_INTERVAL`), and a
`carouselAnimating` guard that prevents stacked transitions on rapid input. Clicking a slide opens
the full testimonial modal (`openTestimonialModal()`).

### Certifications Section

`pages/about.html` includes a `.cert-grid` section with credential cards. Each card carries
`data-cert-*` attributes and opens a full-screen `#certModal` displaying the certificate image,
falling back to a placeholder icon when no image is set. The modal itself lives in
`scripts/document-modal.js` (`window.DocumentModal.open/close`) and is shared with the Clients
& Collaborations "My Document" icon on `index.html` - see below. `certification-modal-logic.js`
just wires `.cert-card` clicks to that shared API (loaded on `about.html` only).

### Homepage Sections

- `#collaboration` - a CTA block positioned after the projects carousel.
- `#social` - a social-icon grid (`.social-icon.glass-card.glow-hover`) linking to GitHub,
  LinkedIn, Instagram, Facebook, Threads, and Discord.
- `#clients` - an infinite-scroll Clients & Collaborations carousel driven by
  `scripts/collaboration-config.js`. Its nav-bar link is commented out in `index.html` pending
  more real client logos, but the section itself renders live on the homepage.

### Dynamic 3D Coin-Toss Profile Card

The hero profile image is an interactive 3D flip card. On hover, `.coin-inner` performs a
**720-degree rotation** (two full Y-axis turns) in `0.9s` using a springy
`cubic-bezier(0.34, 1.56, 0.64, 1)` easing. A gold-gradient **"VERIFIED DEVELOPER"** badge
renders on the reverse face. `perspective: 1500px` and `backface-visibility: hidden` on both
faces produce the depth effect, and the `coinGlow` keyframe pulses the outer ring at idle. The
`--coin-size` custom property controls diameter (`180px` desktop, `140px` at 480px).

### Direction-Aware Scroll Animations

A passive `scroll` event listener continuously tracks `_lastScrollY` vs `_currentScrollY`. The
shared `IntersectionObserver` reads this delta at the exact moment an element enters the viewport,
then stamps either a `from-below` class (scrolling down) or `from-above` class (scrolling up)
before firing the `visible` transition. A `requestAnimationFrame` wrapper prevents the
"flash then animate" artifact.

### Smart Experience Pagination

`INITIAL_EXP_COUNT = 2` controls the initial render; `EXP_BATCH_SIZE = 3` controls how many cards
are revealed per "Load More" click. `updateExperienceButtons()` syncs both **Load More** and
**Show Less** buttons on every state change. The system is array-length-agnostic - it works with
any number of experience entries.

### Featured Projects Carousel

Projects tagged `type: ["featured"]` in `scripts/projects-data.js` render into a swipeable
carousel (`.pc-card`, `.pc-preview`, `.pc-visit-btn`) with responsive cards-per-view (3 / 2 / 1),
dot navigation, and a hover scroll-preview effect on each screenshot.

### Universal Shimmer-Gradient Hover

`.glass-card` (excluding `.modal-content`), `.cta-button`, `.load-more-btn`, and `.category-btn`
elements carry a `::after` pseudo-element diagonal shimmer stripe that sweeps on hover.

### Clients & Collaborations Carousel

A seamless, GPU-accelerated infinite carousel (`scripts/collaboration-slider.js`) driven by
`requestAnimationFrame` rather than a fixed-duration CSS `@keyframes` loop, so its speed stays
constant no matter how many cards are configured. Each card (`scripts/collaboration-render.js`)
is a non-clickable tile with two faces: an idle face (logo, or a gold initial pill + name when
no `companyLogo` is set) that fades/blurs away on hover to reveal two circular action buttons -
**My Document** (left, opens the shared certificate modal or an external link) and **Client**
(right, opens the highest-priority configured platform link). Both icon sets and the fallback
priority order live in `scripts/collaboration-config.js`, fully decoupled from rendering.
Hovering, keyboard-focusing a button, or tapping a card (for touch devices with no `:hover`)
all pause the marquee and reveal the buttons; `prefers-reduced-motion` disables the motion
entirely.

### Light / Dark Mode Toggle

A persistent theme toggle backed by `localStorage("theme")` lets visitors switch between dark and
light modes. Light mode is applied via `data-theme="light"` on the `<html>` element and persists
across page loads.

### Mobile Menu Sub-Navigation

The mobile hamburger menu supports an accordion sub-navigation system. Tapping a top-level link
with a `.mobile-subnav` block expands it while collapsing any previously open group.

---

## Data-Driven Rendering

All dynamic content lives in dedicated data files under `scripts/`:

| Array              | Renders Into                      | File                               |
| ------------------- | ---------------------------------- | ------------------------------------ |
| `window.projects`  | Featured projects carousel        | `scripts/projects-data.js`         |
| `skillCategories`  | Tabbed skills grid                | `scripts/skills-data.js`           |
| `experience`       | Paginated timeline                | `scripts/experience-data.js`       |
| `collaborations`   | Clients & Collaborations carousel | `scripts/collaboration-config.js`  |
| `testimonials`     | Single-card carousel              | `scripts/testimonials-data.js`     |

To add content, append a correctly structured object to the relevant array. No HTML editing
required. For the full object shape of each array, see `docs/PROJECT_EDITING_GUIDE.md`.

---

## Design System

### Color Tokens (`styles/style.css`)

| Variable         | Value                                     | Role                                 |
| ---------------- | ----------------------------------------- | ------------------------------------ |
| `--bg-dark`      | `#1A1A1A`                                 | Page background (deep noir black)    |
| `--text-dark`    | `#e8e8e8`                                 | Body text                            |
| `--accent-dark`  | `#D4AF37`                                 | Primary Gold Noir accent             |
| `--accent-light` | `#F0D896`                                 | Light green for gradient highlights  |
| `--accent-rgb`   | `212,175,55`                              | Raw RGB triplet for rgba() calls     |
| `--glass-dark`   | `rgba(255,255,255,0.05)`                  | Card fill                            |
| `--border-dark`  | `rgba(212,175,55,0.2)`                    | Card borders                         |
| `--shadow-color` | `rgba(212,175,55,0.5)`                    | Glow shadows                         |
| `--spring`       | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Default spring easing                |
| `--coin-size`    | `180px` (desktop), `140px` (480px)        | Profile coin diameter (CSS variable) |

Changing `--accent-dark` in `:root` propagates the new colour across every border, glow, hover
effect, and gradient instance simultaneously. Always update `--accent-rgb` to match.

### Glass Cards

Apply `.glass-card` to any new container to inherit the full glassmorphism treatment:
`backdrop-filter: blur(15px)`, semi-transparent fill, green border, and depth shadow. See
`docs/DESIGN_SYSTEM.md` for the complete component reference.

### Scroll Animations

Add `animate-on-scroll` to any element, then pair it with one of three modifier classes:

| Modifier   | Effect                                              |
| ---------- | --------------------------------------------------- |
| `slide-up` | Slides from +/-40px Y depending on scroll direction |
| `zoom-in`  | Scales from 0.88 to 1.0                             |
| `fade-in`  | Fades from +/-12px Y depending on scroll direction  |

---

## Performance

- **IntersectionObserver** - animations fire only when elements enter the viewport.
- **Passive scroll listener** - direction-tracking listener is `{ passive: true }`.
- **Lazy loading** - project images and certificate images use `loading="lazy"`.
- **Event delegation** - modal open/close handled with minimal document-level listeners.
- **Zero build step** - no bundler, no transpiler, no Node.js.
- **CDN-only dependencies** - all third-party libraries load from CDN.

---

## Installation and Local Development

No build process required.

```bash
# Option 1 - Open directly in a browser
open index.html

# Option 2 - Serve locally with npx (recommended for consistent behaviour)
npx serve .

# Option 3 - Python server
python -m http.server 8080
```

Navigate to `http://localhost:8080` (or the port shown in the terminal).

VS Code with the Live Server extension also works and provides hot-reload on file save.

---

## Deployment

This is a fully static site. Push to any static host with no configuration required.

| Platform     | Method                                                  |
| ------------ | ------------------------------------------------------- |
| GitHub Pages | Push to `main`; Pages serves `index.html` automatically |
| Netlify      | Drag-and-drop the project folder or connect via Git     |
| Vercel       | Run `vercel --prod` from the project root               |

The live site is currently deployed at [stackiid.github.io](https://stackiid.github.io/Ubaid-Dev).

---

## Extending the Portfolio

See `docs/PROJECT_EDITING_GUIDE.md` for the complete reference. Quick summary:

- **New project** - Append to `window.projects` in `scripts/projects-data.js`. Include
  `type: ["featured"]` to have it render in the homepage carousel.
- **New skill** - Append to the correct `skillCategories[n].skills` array in `scripts/skills-data.js`.
- **New experience entry** - Append to the `experience` array in `scripts/experience-data.js`.
- **New testimonial** - Append to the `testimonials` array in `scripts/testimonials-data.js`.
- **New client/collaboration** - Copy the HerDev entry in the `collaborations` array
  (`scripts/collaboration-config.js`) and edit `companyName`, `companyLogo`, `myIcon`,
  `documentAvailable`/`documentPath`/`documentLink`, and `clientLinks`. New icon types go in
  `MY_ICONS`/`CLIENT_ICONS` in the same file - no rendering code changes needed.
- **New certification** - Add a `.cert-card` block in `pages/about.html` and drop the image into `assets/credentials/`.
- **New section** - Apply `.section`, `.container-custom`, `.section-wrapper`, and `.animate-on-scroll`.

---

## Engineering Philosophy

This project favors:

- **Simplicity over abstraction** - if vanilla JS solves it cleanly, no library is added.
- **Data-driven rendering** - arrays own all content; functions own all layout logic.
- **Modular data files** - content and logic are always in separate files.
- **Performance over decoration** - every animation serves a UX purpose and costs nothing at idle.
- **Clear structure over framework complexity** - the codebase is readable by any developer in under 10 minutes.

Strong structure signals strong thinking.

---

## Documentation

All extended documentation lives in the `docs/` directory.

| File                            | Purpose                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| `docs/PROJECT_EDITING_GUIDE.md` | Step-by-step instructions for adding and modifying all content |
| `docs/DESIGN_SYSTEM.md`         | Design token reference, component classes, animation patterns  |
| `docs/ACCESSIBILITY.md`         | ARIA, keyboard navigation, and focus management reference      |
| `docs/PERFORMANCE.md`           | Performance budget and optimisation reference                  |

---

## License

All rights reserved. See [LICENSE](./LICENSE) for full terms.

This source code is the proprietary work of Ubaid Ahmad. Viewing for reference is permitted.
Copying, redistribution, modification, and commercial use are strictly prohibited without explicit
written permission from the author.

Copyright 2026 Ubaid Ahmad.
