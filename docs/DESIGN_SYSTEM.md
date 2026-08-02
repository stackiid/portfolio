# DESIGN_SYSTEM.md

This is the design reference for the Ubaid Ahmad portfolio: the real CSS custom properties,
component classes, and animation patterns as they exist in `styles/style.css`,
`styles/about.css`, and the render logic in `scripts/app.js`. Every value below was verified
directly against the codebase - if you see a class or variable elsewhere that isn't listed here,
treat that as the error to fix, not this document.

Build new UI using the patterns in this file wherever one already fits. Where no token exists for
something (spacing, radius, timing), the codebase currently uses hardcoded literal values chosen
per-component rather than a shared scale - match the nearest existing value rather than inventing
a new one.

---

## 1. Design Tokens

### 1.1 Color Tokens (`:root` in `style.css`)

| Variable         | Dark (default) | Light (`[data-theme="light"]`) | Role                          |
| ----------------- | --------------------------- | ------------------------------------ | ------------------------------ |
| `--bg-dark`       | `#1a1a1a`                   | `#f5f0e8`                            | Page background                |
| `--text-dark`     | `#e8e8e8`                   | `#1a1a1a`                            | Body text                      |
| `--accent-dark`   | `#d4af37`                   | `#d4af37` (unchanged)                | Primary gold accent            |
| `--accent-light`  | `#f0d896`                   | `#f0d896` (unchanged)                | Lighter gold, gradient pairing |
| `--accent-rgb`    | `212, 175, 55`               | `212, 175, 55` (unchanged)           | Raw RGB triplet for `rgba()`   |
| `--glass-dark`    | `rgba(255,255,255,0.05)`    | `rgba(255,255,255,0.65)`             | Glass-card fill                |
| `--border-dark`   | `rgba(212,175,55,0.2)`      | `rgba(var(--accent-rgb), 0.3)`       | Card/button borders            |
| `--shadow-color`  | `rgba(212,175,55,0.5)`      | `rgba(var(--accent-rgb), 0.35)`      | Glow shadows                   |
| `--spring`        | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | same in both themes | Default spring easing          |

Changing `--accent-dark` propagates across borders, glows, hovers, and gradients. Always update
`--accent-rgb` to the matching raw triplet - it's used directly inside `rgba()` calls and does
not derive automatically from the hex value.

There is only one theme pair (dark/light of the same gold palette) - there is no multi-palette
switcher in this codebase.

> Note: `[data-theme="light"]` is declared twice in `style.css` (once early, once later in the
> file). The later block wins the cascade for `--glass-dark`, `--border-dark`, and
> `--shadow-color`; the values above are the effective (winning) ones. Worth consolidating into a
> single block next time `style.css` is touched, but it doesn't currently cause a visible bug.

### 1.2 Typography

No `--font-*` custom properties exist. Typography is hardcoded per-rule:

- **Font family:** `"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  (set once on `body`, inherited everywhere). Loaded via Google Fonts, weights 300/400/500/600/700.
- **Font weights in use:** `500`, `600`, `700`, `800`, `900` as literal values - no named scale.
  `600` is the most common (buttons, nav links); `800`/`900` are reserved for headings and stat
  numbers.
- No monospace font is loaded or used anywhere in the project.

### 1.3 Spacing

No `--space-*` tokens exist. Spacing is written directly in `rem`/`px` per rule, informally
following multiples of `4px`/`8px` (`0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem` are the most common
values). When adding spacing, match the surrounding rule's scale rather than picking an arbitrary
number.

### 1.4 Border Radius

No `--radius-*` tokens exist. Common literal values in use, by role:

| Value          | Used for                                             |
| -------------- | ----------------------------------------------------- |
| `50%`          | Circular elements (coin container, client-initial pill) |
| `50px`         | Pill-shaped buttons (`.cta-button`)                  |
| `20px`         | Cards and the header (`.glass-card`, `.glass-header`) |
| `16px`         | Smaller cards (`.skill-card`)                        |
| `2px`–`12px`   | Small UI details (badges, inputs, icon wraps)         |

### 1.5 Animation Tokens

| Value                                      | Role                                                  |
| ------------------------------------------- | ------------------------------------------------------ |
| `--spring` (see 1.1)                       | Default spring easing for hover/transition effects   |
| `--coin-size` (scoped to `.profile-coin-container`) | `180px` desktop, `140px` at ≤480px - coin diameter |
| `--coin-border` (scoped, `4px`)            | Coin ring thickness                                   |

No `--duration-*` or `--ease-*` tokens exist; transition durations (`0.3s`–`0.9s`) and easing
functions (`ease`, `ease-in-out`, `var(--spring)`, or explicit `cubic-bezier(...)`) are written
per-rule.

---

## 2. Component Classes

### 2.1 Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  transition: all 0.5s var(--spring);
}
```

Apply `.glass-card` to any new container that needs the glassmorphism treatment. Note the fill,
border, and shadow here are hardcoded rgba values, not `var(--glass-dark)` / `var(--border-dark)`
- those tokens are used elsewhere (buttons, form fields) but not on the base `.glass-card` rule
itself.

### 2.2 Glass Header

```css
.glass-header {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  overflow: hidden; /* clips the liquid progress fill to the rounded shape */
}
```

The header also hosts `.header-progress-fill` (see 3.1) and the desktop/mobile nav.

### 2.3 CTA Button

```css
.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 50px;
  border: 1px solid var(--border-dark);
  background: var(--glass-dark);
  color: var(--text-dark);
  min-height: 44px;
  transition: all 0.5s var(--spring);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 15px rgba(var(--accent-rgb), 0.25);
}
```

This is a glass-style button (uses `--glass-dark`/`--text-dark`), not a solid gold-filled button.

### 2.4 Section Layout

```css
.section {
  padding: 5rem 0;
  position: relative;
}

.container-custom {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--accent-dark), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  width: 100%;
}
```

`.section-title` uses a gradient text-fill effect, not an underline. Every top-level page section
follows the `.section > .container-custom > .section-title` nesting pattern.

### 2.5 Navigation

Desktop nav links are plain `<a>` tags inside `.desktop-nav` (no dedicated link class); the
current-page link gets `.nav-active`:

```css
.desktop-nav a {
  color: inherit;
  font-weight: 600;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: all 0.5s ease;
}

.nav-active {
  color: var(--accent-dark);
  border-bottom: 2px solid var(--accent-dark);
  padding-bottom: 2px;
}
```

Mobile nav is a separate structure - see `docs/PROJECT_EDITING_GUIDE.md` section 18 for the full
`.mobile-nav-group` / `.mobile-nav-link` / `.mobile-subnav` accordion hierarchy.

### 2.6 Load More / Category Buttons

- `.load-more-btn` - used for the experience section's "Load More" / "Show Less" toggle
  (`.load-less-btn` is added as a second class on the "Show Less" variant).
- `.category-btn` - skill-category tab buttons rendered by `renderSkills()`; the active tab gets
  an additional `active` class.

### 2.7 Skill Card

```css
.skill-card {
  min-height: 80px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  transition: all 0.5s var(--spring);
}
```

### 2.8 Client Logo Card

```css
.client-initial-pill {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.12);
  border: 2px solid var(--accent-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: var(--accent-dark);
}
```

Rendered instead of a logo `<img>` when a client entry in `clients-data.js` has no `logo` field -
shows the company's initial letter.

### 2.9 Certification Card (`about.css`, About page only)

Real classes: `.cert-grid`, `.cert-card`, `.cert-icon-wrap`, `.cert-name`, `.cert-institute`,
`.cert-date-badge`, `.cert-view-hint`. Clicking a `.cert-card` opens `#certModal`, which uses
`.cert-modal-header`, `.cert-modal-title`, `.cert-modal-sub`, `.cert-modal-img-wrap`, and falls
back to `.cert-modal-placeholder` when no certificate image is set. Wired by
`scripts/certification-modal-logic.js`.

### 2.10 Modal

```css
.modal-content {
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  transform: scale(0.8);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
}
```

Scales/fades in on open (state toggled via JS, not a CSS class swap). `.modal-content` is
deliberately excluded from the shimmer hover effect (see 3.4) via `:not(.modal-content)`.

### 2.11 Project Card (Featured Carousel)

Real classes: `.pc-card`, `.pc-preview`, `.pc-title`, `.pc-visit-btn`, `.pc-dot` (carousel dot
indicator, active state via `.is-active`). There is no `.type-tag` or badge class - projects
render as plain cards with a screenshot, title, and a "Visit" button (disabled/greyed via
`visitEnabled: false` in the data object).

### 2.12 Footer Availability

The footer includes a static `.footer-availability` line ("Currently accepting new projects" or
similar) - this is a plain inline element in the footer layout, not a floating/fixed badge.

### 2.13 Contact Form

Real structure: `#contactForm.cf-form`, `.cf-pair-row`, `.cf-field` (each input + floating
`<label>` + `.cf-field-error` span), `.cf-tab-pill` (Mail/WhatsApp tab selector), `#cfSubmitBtn`,
and a `.cf-toast` / `#cfToast` notification. Field IDs: `cf-name`, `cf-email`, `cf-contact` (tel,
used in WhatsApp mode), `cf-subject`, `cf-message`. Submits to Formspree
(`https://formspree.io/f/...`) in Mail mode or builds a `https://wa.me/` link in WhatsApp mode.
Logic lives entirely in `scripts/contact-form-validation.js`.

---

## 3. Animation System

### 3.1 Header Scroll Progress

`.header-progress-fill` grows `width` in sync with scroll position, driven by
`initHeaderScrollProgress()`. Two low-opacity blobs (`.header-progress-wave`,
`.header-progress-wave--b`) sit at the fill's leading edge and continuously rotate via the
`header-wave-spin` / `header-wave-spin-reverse` keyframes. Disabled under
`prefers-reduced-motion: reduce`.

### 3.2 Scroll-Triggered Animations

Add `animate-on-scroll` plus exactly one modifier class to any element:

| Modifier   | Effect                                              |
| ---------- | ----------------------------------------------------- |
| `slide-up` | Slides in from +/-40px on the Y axis                 |
| `zoom-in`  | Scales from 0.88 to 1.0                              |
| `fade-in`  | Fades in with a smaller +/-12px Y offset              |

A shared `IntersectionObserver`, combined with a passive `scroll` listener tracking
`_lastScrollY`/`_currentScrollY`, stamps `from-below` or `from-above` on the element depending on
scroll direction before adding `visible` to trigger the transition. Don't wrap the hero section
in `animate-on-scroll` - it uses its own `heroFadeUp` keyframe instead.

### 3.3 Real Keyframes (`style.css`)

| Keyframe                     | Used for                                        |
| ------------------------------ | -------------------------------------------------- |
| `heroFadeUp`                 | Hero section entrance                           |
| `coinGlow`                   | Profile coin idle ring pulse                    |
| `liquidFloat`                | Decorative background blob movement             |
| `header-wave-spin` / `-reverse` | Header progress-fill wave blobs              |
| `clientsScroll`              | Infinite client-logo carousel auto-scroll       |
| `skillPop`                   | Skill card entrance                             |
| `pulse-dot`                  | Small pulsing-dot indicators                    |
| `cf-shake`                   | Contact form field shake on validation error    |
| `spin`                       | Generic loading-spinner rotation                |

There is no `bounce`, `carouselSlide`, or `fadeInScale` keyframe in the codebase.

### 3.4 Dynamic 3D Coin-Toss Profile Card

```css
.profile-coin-container {
  --coin-size: 180px;
  --coin-border: 4px;
  width: var(--coin-size);
  height: var(--coin-size);
  border-radius: 50%;
  perspective: 1500px;
  animation: coinGlow 3s ease-in-out infinite;
}
```

On hover, `.coin-inner` performs a 720-degree Y-axis rotation over `0.9s` using
`cubic-bezier(0.34, 1.56, 0.64, 1)`. Both faces use `backface-visibility: hidden` for correct
depth. The reverse face shows a gold-gradient **"VERIFIED DEVELOPER"** badge.

### 3.5 Testimonial Carousel

The carousel is **not** driven by CSS animation classes. `tcGoTo()` in `app.js` directly sets
inline `transform: translateX()` and `opacity` styles on `#tcTrack .carousel-slide` elements,
sequenced with `requestAnimationFrame` and a `520ms` `setTimeout` cleanup step. Dot navigation
uses `.carousel-dot` with the active dot marked via `.tc-dot-active`. Auto-advances every 2
minutes (`TC_INTERVAL`) and pauses on hover/focus.

### 3.6 Universal Shimmer-Gradient Hover

Applied via `::after` pseudo-element to exactly four selectors:

```
.glass-card:not(.modal-content)
.cta-button
.load-more-btn
.category-btn
```

To add the shimmer to a new element type, append its selector to the shimmer rule blocks in
`style.css`.

---

## 4. Responsive Breakpoints

Primary breakpoints used throughout `style.css`:

| Breakpoint         | Usage                                    |
| -------------------- | ------------------------------------------- |
| `max-width: 768px`  | Tablet / mobile nav switch                |
| `min-width: 641px`  | Desktop-only overrides                    |
| `max-width: 640px`  | Small tablet adjustments                  |
| `max-width: 480px`  | Phone-specific sizing (e.g. `--coin-size`) |

A small number of one-off breakpoints (`680px`, `1100px`) exist for specific components - check
the surrounding rule before assuming a value applies globally.

---

## 5. Icon System

**Font Awesome 6.5 only**, loaded via CDN and used with `fas`/`fab` classes site-wide
(`fas fa-envelope`, `fab fa-github`, etc.). There is no second icon library - don't introduce one
for a new icon; find or request the closest Font Awesome equivalent instead.

---

## 6. Colour Usage Rules

- `--accent-dark` (`#d4af37`, gold) is the only accent color - don't introduce a second accent
  hue without updating this document and auditing every `rgba(var(--accent-rgb), ...)` usage.
- Secondary/muted text is produced by applying `opacity` (commonly `0.7`–`0.9`) to `--text-dark`,
  not a separate muted-color token.
- Always keep `--accent-rgb` as the literal `R, G, B` triplet matching `--accent-dark` - it feeds
  every `rgba(var(--accent-rgb), ...)` call directly.

---

## 7. Do / Don't

**Do:**
- Reuse `.glass-card`, `.cta-button`, `.section`/`.container-custom`/`.section-title` for any new
  UI that fits an existing pattern.
- Match the nearest existing literal value for spacing/radius/duration rather than inventing a
  new one (see section 1.3–1.5).
- Use Font Awesome for any new icon.

**Don't:**
- Don't add a new CSS custom property scale (spacing, radius, duration) without updating this
  document - the codebase currently has none beyond the color/animation tokens in section 1.1/1.5.
- Don't add a second icon library.
- Don't rename `animate-on-scroll`, `glass-card`, or `skill-card-anim` classes - they're relied on
  by the scroll-animation observer and by inline references elsewhere.

---

## 8. Adding a New Page

1. Copy the `<head>` block from an existing page (Tailwind CDN, Font Awesome CDN, Google Fonts,
   meta tags) and update the title/description/OG tags.
2. Include the data scripts + `app.js` in the standard load order (see
   `docs/PROJECT_EDITING_GUIDE.md` section on script load order), plus any page-specific script.
3. Reuse `.glass-header` for the nav and `.section`/`.container-custom` for content blocks.
4. Add the new page's link to both the desktop nav and the mobile nav (`.mobile-nav-group` or a
   standalone `.mobile-nav-link`).
5. Test in both dark and light theme, and at the 768px/480px breakpoints.
