# Ubaid Ahmad - Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4)
![Anime.js](https://img.shields.io/badge/Anime.js-4-ED4E50)
![License](https://img.shields.io/badge/license-All%20rights%20reserved-lightgrey)

The personal portfolio website of Ubaid Ahmad, a full-stack MERN developer and UI/UX designer. It is a single-page React site with ten sections, scroll-aware navigation, project and certificate carousels, a downloadable resume, and a contact form with two submit paths. All page content lives in plain data files, so updating the site never means editing components.

## Live Demo

[https://stackiid.github.io/portfolio/](https://stackiid.github.io/portfolio/)

## Table of Contents

- [Features](#features)
- [Page Sections](#page-sections)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Updating Content](#updating-content)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Deployment](#deployment)
- [Performance Considerations](#performance-considerations)
- [Known Limitations](#known-limitations)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Ten-section single-page layout with smooth scrolling and a fixed navigation bar with a mobile menu
- Scroll-position dots on large screens that show the current section and jump to any section
- Active-section tracking built on `IntersectionObserver`, with no scroll-percentage calculations
- Scroll-reveal entrance animations powered by Anime.js
- Branded loading screen that stays for at least half a second
- Tabbed skills browser with arrow-key navigation
- Horizontal carousels for projects, certifications, collaborations, and testimonials, with previous and next arrows
- Auto-advance on the certifications and collaboration carousels on mobile only, paused while the user is interacting
- Project cards with a screenshot, description, technology tags, a live link, and a repository link
- Document viewer modal for certificates and the internship completion certificate
- Resume dialog that offers a download or an in-page view
- Testimonial cards with star ratings, and a hero rating badge whose average is computed from the testimonial data
- Contact form with an email path (posted to Formspree) and a WhatsApp path (opens a pre-filled `wa.me` link), each with its own validation
- Social links in the hero, the mobile menu, and the footer
- Respect for `prefers-reduced-motion` in the stylesheet, the reveal animations, and the carousels

## Page Sections

| Order | Section | Content |
| --- | --- | --- |
| 1 | Hero | Greeting, role titles, tagline, social links, profile image, experience badge, and rating card |
| 2 | About | Short biography, three working principles, and a resume button |
| 3 | Skills | Five tabbed categories: Design, Frontend, Backend, Logic and CS, and Tools |
| 4 | Experience | Three entries covering an internship, freelance work, and university study |
| 5 | Education | Three entries from secondary school to university |
| 6 | Projects | Ten projects in a carousel |
| 7 | Certifications | Ten certificates, each openable in a viewer |
| 8 | Collaboration | Internship completion certificate with company logo and link |
| 9 | Testimonials | Four testimonials from colleagues and clients |
| 10 | Contact | Email and WhatsApp contact form |

## Tech Stack

| Category | Technology |
| --- | --- |
| UI library | React 19 (JavaScript with JSX) |
| Build tool | Vite 8 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3 with PostCSS and Autoprefixer, using a custom theme |
| Animation | Anime.js 4 |
| Icons | Font Awesome 6.5.2, loaded from cdnjs with a Subresource Integrity hash |
| Fonts | Google Fonts: Space Grotesk (display), Plus Jakarta Sans (body), and Caveat (script accents) |
| Forms | Formspree (external endpoint) and a WhatsApp deep link |
| Linting | oxlint |
| Hosting | GitHub Pages through GitHub Actions |
| Backend | None |

## Project Structure

```text
portfolio/
|-- .github/workflows/
|   `-- deploy.yml                  # Build and deploy to GitHub Pages
|-- public/
|   |-- assets/
|   |   |-- images/                 # Profile, avatars, project screenshots, credentials, logos
|   |   `-- resume/                 # Resume PDF
|   |-- favicon/                    # SVG and PNG icons
|   |-- robots.txt
|   |-- sitemap.xml
|   `-- site.webmanifest
|-- src/
|   |-- components/
|   |   |-- cards/                  # ProjectCard
|   |   |-- common/                 # Loader, Footer, modals, section heading, carousel arrows, social links
|   |   |-- navigation/             # Navbar, MobileMenu, ScrollDots
|   |   `-- ui/                     # Button
|   |-- data/                       # All site content (see Updating Content)
|   |-- hooks/                      # useActiveSection, useScrollReveal, useCarousel, useMediaQuery, useLockBodyScroll
|   |-- sections/                   # One folder per page section
|   |-- utils/
|   |   `-- motion.js               # Reduced-motion helper
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- postcss.config.js
|-- tailwind.config.js
|-- vite.config.js
|-- .oxlintrc.json
|-- package.json
|-- LICENSE
`-- README.md
```

## Prerequisites

- Node.js 20 or later (the GitHub Actions workflow uses Node 20)
- npm
- An internet connection for Google Fonts and Font Awesome

## Getting Started

Clone the repository, install dependencies, and start the development server:

```bash
git clone https://github.com/stackiid/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the local URL that Vite prints. Because the build uses the base path `/portfolio/`, the site is served at `http://localhost:5173/portfolio/`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Builds the production bundle to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs oxlint |

## Updating Content

Each section reads from a file in `src/data/`, so content changes do not touch component code.

| File | Controls |
| --- | --- |
| `profile.js` | Name, role titles, tagline, biography, working principles, profile image, and resume path |
| `skills.js` | Skill categories and the skills inside each |
| `experience.js` | Experience entries, including which one is marked current |
| `education.js` | Education entries |
| `projects.js` | Project cards: title, description, screenshot, live link, repository link, and technology tags |
| `certifications.js` | Certificate names, issuers, dates, and images |
| `collaborations.js` | Collaboration entries with logo, document image, and link |
| `testimonials.js` | Testimonials, avatars, and star ratings |
| `counters.js` | Numbers shown in the hero badge |
| `contact.js` | Formspree endpoint, WhatsApp number, and location |
| `socialLinks.js` | Social profile links |

Images go in `public/assets/images/`, and the resume PDF goes in `public/assets/resume/`.

## Architecture

- **Single page:** `App.jsx` stacks the section components inside a `<main>` element, with the loader, navigation, scroll dots, footer, and resume dialog around it. There is no router; navigation uses in-page anchors such as `#about` and `#projects`
- **Data-driven sections:** each section imports its data file and renders cards or lists from it
- **Shared carousel logic:** `useCarousel` handles scrolling by one item, previous and next availability, and optional auto-advance, and is reused by projects, certifications, collaborations, and testimonials
- **Reveal and tracking hooks:** `useScrollReveal` plays an Anime.js entrance animation once an element enters the viewport, and `useActiveSection` reports which section is in view
- **Reduced motion:** `prefersReducedMotion()` in `utils/motion.js` is checked by the reveal and carousel code, and the stylesheet has a matching media query
- **Scroll offset:** a global `scroll-margin-top` keeps section headings clear of the fixed navigation bar after an anchor jump

## Design System

Design tokens are defined in `tailwind.config.js`.

| Group | Details |
| --- | --- |
| Colors | `cream` (warm background), `teal` (developer and trust), `mango` (designer and energy), and `ink` (warm near-black for text) |
| Typography | `font-display` (Space Grotesk), `font-body` (Plus Jakarta Sans), `font-script` (Caveat) |
| Shape and depth | A custom `xl2` radius and two shadows, `card` and `soft` |
| Animation | A `bounce-dot` keyframe used by the loader |

## Accessibility

Implemented practices visible in the code:

- `lang="en"` on the root element
- `aria-label` on icon-only controls, and `aria-hidden` on decorative icons
- `role="dialog"` and `aria-modal` on the modals, with Escape to close, scroll lock while open, and focus returned to the previously focused element
- A real tab pattern in the skills browser (`role="tablist"`, `role="tab"`, `role="tabpanel"`) with arrow-key support
- `aria-invalid` and `aria-describedby` linking contact form fields to their error messages
- `role="status"` on the loader and form feedback
- Labeled regions for the carousels, and keyboard-reachable carousel arrows
- Visible `:focus-visible` styles
- A `prefers-reduced-motion` media query that shortens animations and disables smooth scrolling

No accessibility audit or WCAG conformance level is claimed.

## SEO

`index.html` includes a title, meta description, author, robots tag, canonical URL, Open Graph and Twitter Card tags (using the profile photo as the image), a `schema.org` `Person` JSON-LD block, favicon and touch icons, and a web app manifest. The `public` folder also contains `robots.txt` and `sitemap.xml`.

## Deployment

`.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages on every push to `main`. It installs with `npm ci`, runs `npm run build`, and publishes `dist/` with the official Pages actions. The workflow does not run the linter.

One-time setup: in the repository, open Settings, then Pages, and set the source to GitHub Actions.

`vite.config.js` sets `base: "/portfolio/"`, which matches serving the site from the `portfolio` repository path. If the repository is renamed, update this value.

## Performance Considerations

- Project screenshots are WebP files
- Fonts use `preconnect` hints and `display=swap`, and the Font Awesome stylesheet carries an integrity hash
- The reveal and active-section code uses `IntersectionObserver` instead of scroll listeners
- Carousel auto-advance is limited to mobile and is skipped when reduced motion is requested
- The whole site ships as one JavaScript bundle, with no code splitting
- Certificate images are loaded at full size

## Known Limitations

- The SEO files assume the site lives at `https://stackiid.github.io/` (canonical URL, sitemap, `robots.txt`, structured data, and manifest `start_url`), while the build base path is `/portfolio/`. The sitemap and `robots.txt` are published under `/portfolio/`, but crawlers look for `robots.txt` at the domain root
- Image paths are joined inconsistently: the project screenshots and resume use `BASE_URL` without an extra slash, while other images add one, which produces a double slash in the URL
- `src/data/counters.js` defines `projectsShipped` and `happyClients`, but only `yearsExperience` is shown on the page
- Project descriptions are written by hand and can drift from the projects themselves; for example, the Study Station card lists 13 courses and 5 video channels, while that project's data files hold 10 courses and 82 channels
- Form submissions depend on the external Formspree endpoint, and the WhatsApp path only opens a link
- The site needs an internet connection to load fonts and icons
- There is no dark mode, no per-section page titles, and no automated tests
- The Open Graph image is the profile photo rather than a dedicated social card

## License

This repository is **not** open source. The [LICENSE](./LICENSE) file is an all-rights-reserved license: the code may be viewed and studied for personal learning and reference, but copying, modifying, redistributing, using it in commercial or client-facing products, or republishing it under another name requires prior written permission from the author. Contact details for permission requests are in the license file.

Copyright 2026 Ubaid Ahmad

## Acknowledgements

- Animation library: [Anime.js](https://animejs.com)
- Styling utilities from [Tailwind CSS](https://tailwindcss.com)
- Typefaces from [Google Fonts](https://fonts.google.com): Space Grotesk, Plus Jakarta Sans, and Caveat
- Icons from [Font Awesome](https://fontawesome.com)
- Contact form handling by [Formspree](https://formspree.io)
- Everyone who contributed testimonials and collaborated on projects
