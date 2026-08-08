# JavaScript Architecture Reference

**Project:** Ubaid Ahmad Portfolio
**Scope:** All 12 files in `scripts/`
**Purpose of this document:** a single-read reference so any of the 12 files can be understood and safely edited without re-reading long in-file comments. The files themselves now carry only short, factual header comments — the full "why" lives here.

---

## 1. Quick Reference Table

| # | File | Role | Defines (globals) | Depends on (globals) |
|---|------|------|--------------------|------------------------|
| 1 | `projects-data.js` | Data | `window.projects` | — |
| 2 | `skills-data.js` | Data | `skillCategories` | — |
| 3 | `experience-data.js` | Data | `experience` | — |
| 4 | `testimonials-data.js` | Data | `testimonials` | — |
| 5 | `collaboration-config.js` | Data | `MY_ICONS`, `MY_ICON_LABELS`, `CLIENT_ICONS`, `CLIENT_ICON_LABELS`, `CLIENT_ICON_PRIORITY`, `collaborations` | — |
| 6 | `collaboration-render.js` | Render | `renderCollaborations()` | `collaborations`, `MY_ICONS`, `MY_ICON_LABELS`, `CLIENT_ICONS`, `CLIENT_ICON_LABELS`, `CLIENT_ICON_PRIORITY` |
| 7 | `collaboration-slider.js` | Behaviour | `initCollaborationSlider()` | (DOM only — reads what #6 rendered) |
| 8 | `collaboration-events.js` | Behaviour | `initCollaborationEvents()` | `window.DocumentModal` (from #9) |
| 9 | `document-modal.js` | Shared UI | `window.DocumentModal.open()` / `.close()` | (DOM only) |
| 10 | `certification-modal-logic.js` | Behaviour | (none — IIFE) | `window.DocumentModal` (from #9) |
| 11 | `contact-form-validation.js` | Behaviour | (none — IIFE) | (DOM only) |
| 12 | `app.js` | Core orchestrator | ~25 functions (§7) + module state | `skillCategories`, `experience`, `testimonials`, `window.projects`, `renderCollaborations`, `initCollaborationSlider`, `initCollaborationEvents` |

**Reading order if you're new to this codebase:** `app.js` §7 first (it's the spine of the site), then the Clients & Collaborations trio (§4), then the shared modal (§5), then the data files (§3) as needed.

---

## 2. Load Order (per page)

All three pages load scripts as plain, synchronous, non-module `<script>` tags in this exact order. Order matters because later files call functions/read data defined by earlier ones inside `DOMContentLoaded` (by which point every script has already run top-to-bottom).

```
projects-data.js
skills-data.js
experience-data.js
collaboration-config.js
testimonials-data.js
document-modal.js            ← index.html + about.html only (services.html has no modal to open)
collaboration-render.js
collaboration-slider.js
collaboration-events.js
app.js
contact-form-validation.js   ← index.html only
certification-modal-logic.js ← about.html only
```

Every render/init function defined outside `app.js` (`renderCollaborations`, `initCollaborationSlider`, `initCollaborationEvents`) is still **called unconditionally** from inside `app.js`'s `DOMContentLoaded` handler on every page — see §7.11. Each one starts with a DOM-existence guard (`if (!track) return;`), so calling them on a page that doesn't have the relevant section is always safe and a no-op.

---

## 3. Data Files

Five files. No DOM access, no functions (except `collaboration-config.js`, which also holds icon lookup tables — still pure data, zero rendering logic). Safe to edit without touching any other file.

### 3.1 `projects-data.js`

Defines `window.projects` (explicit `window.` prefix, unlike the other data files — this lets `renderProjects()` in `app.js` treat a missing array as `[]` via `window.projects || []`). One object per project card shown in the homepage projects carousel.

| Field | Type | Meaning |
|---|---|---|
| `id` | number | Used as `data-project-id`; increment by 1 for each new entry |
| `title` | string | Card title + image `alt` text |
| `type` | string[] | Must include `"featured"` to appear in the homepage carousel |
| `image` | string | Screenshot path, relative to repo root |
| `demo` | string | URL for the "Visit" button |
| `visitEnabled` | boolean | `false` → button renders greyed-out/disabled instead of a link |

### 3.2 `skills-data.js`

Defines `skillCategories`, an array of `{ category: string, skills: [{ name: string }] }`. Drives the tabbed skills grid — `category` becomes a clickable tab label, `skills` populates the grid when that tab is active. Read by `renderSkills()` in `app.js`.

### 3.3 `experience-data.js`

Defines `experience`, an array of `{ title, company, period, description }` (all strings). Renders as the accordion timeline on the About page, top-to-bottom in array order. Read by `renderExperience()` / `loadMoreExperience()` / `showLessExperience()` in `app.js`.

### 3.4 `testimonials-data.js`

Defines `testimonials`, an array of `{ name, role, avatar, text, stars }` (`stars` is 1–5). Drives the single-card testimonial carousel and its modal. Read by `renderTestimonials()` / `openTestimonialModal()` in `app.js`.

### 3.5 `collaboration-config.js`

The data + lookup-table source for the entire Clients & Collaborations feature. Nothing in this file touches the DOM.

**`MY_ICONS`** — object map, key → FontAwesome `<i>` HTML string. Keys: `certificate`, `experience`, `internship`, `recommendation`, `offerLetter`, `nda`, `legal`, `appreciation`, `document`. This is the **left** button on a card (something *I*, Ubaid, hold about the collaboration).

**`MY_ICON_LABELS`** — same keys, human-readable string (e.g. `internship` → `"Internship Certificate"`). Used for both the `title` tooltip and the `aria-label` on the button — one source of truth for both.

**`CLIENT_ICONS`** — object map, key → FontAwesome `<i>` HTML string. Keys: `website`, `linkedin`, `facebook`, `instagram`, `x`, `github`, `behance`, `dribbble`, `fiverr`, `upwork`. This is the **right** button on a card (the company/platform link).

**`CLIENT_ICON_LABELS`** — same keys, human-readable string (e.g. `website` → `"Official Website"`).

**`CLIENT_ICON_PRIORITY`** — ordered array of the `CLIENT_ICONS` keys. `collaboration-render.js` walks this array and shows the **first** platform a card actually has a link for. This is what makes "if no website, fall back to LinkedIn, then Facebook…" work automatically.

**`collaborations`** — the array that actually renders as cards. One object per company/collaboration:

| Field | Type | Meaning |
|---|---|---|
| `companyName` | string | Shown under the logo/pill; also source of the initial-pill fallback letter |
| `companyLogo` | string (optional) | Path to a logo image. Omit entirely → falls back to a gold initial-pill |
| `showMyIcon` | boolean | Show/hide the left button |
| `showClientIcon` | boolean | Show/hide the right button |
| `myIcon` | string | A key from `MY_ICONS` |
| `documentAvailable` | boolean | `true` → `documentPath` opens in the shared modal. `false` → `documentLink` opens in a new tab |
| `documentPath` | string | Local asset path (used when `documentAvailable: true`) |
| `documentLink` | string | External URL (used when `documentAvailable: false`) |
| `clientLinks` | object | Any subset of `CLIENT_ICONS` keys → URL, e.g. `{ website: "...", linkedin: "..." }` |

Adding a new collaboration = copy the first (HerDev) object and edit fields. Adding a new icon type = add one key to `MY_ICONS`/`CLIENT_ICONS` (+ matching label) — no other file needs to change.

---

## 4. Clients & Collaborations Feature

Three files, one responsibility each: **render** the cards → **animate** the carousel → **wire up** clicks. This split means the carousel/marquee logic never needs to know what a card looks like, and the render logic never needs to know how the cards move.

### 4.1 `collaboration-render.js`

**Purpose:** builds the actual card markup from `collaborations` + the icon maps, and writes it into `#clientsTrack`. Renders **exactly one copy** of each real card — no duplication. (Duplication for the infinite-scroll illusion is `collaboration-slider.js`'s job, and only when it's actually needed — see §4.2.)

**DOM it writes to:** `#clientsTrack` (its entire `innerHTML`).
**Reads:** `collaborations`, `MY_ICONS`, `MY_ICON_LABELS`, `CLIENT_ICONS`, `CLIENT_ICON_LABELS`, `CLIENT_ICON_PRIORITY`.

| Function | Scope | Purpose |
|---|---|---|
| `renderCollaborations()` | global | Entry point. Guards on `#clientsTrack` existing and `collaborations` being non-empty, then maps every card through `buildCard()` and writes the joined HTML into the track. |
| `escapeHtml(value)` | private | Escapes `& < > " '` before interpolating any user-editable string (company name, etc.) into HTML, so a stray `<` or `"` in the config can't break markup. |
| `resolveClientIcon(card)` | private | Walks `CLIENT_ICON_PRIORITY`; returns the first `{ type, url, label }` the card actually has a link for in `clientLinks`, or `null`. |
| `buildIdleFace(card)` | private | Builds the **default-state** face: logo (wrapped in `.collab-logo-frame`) or initial-pill, **and always** the company name underneath. |
| `buildMyIconButton(card)` | private | Builds the left button. Returns `""` (renders nothing) if `showMyIcon` is false, the icon key isn't in `MY_ICONS`, or the relevant path/link field is empty. Local mode → `<button data-doc-mode="local" data-doc-title data-doc-subtitle data-doc-img>`. External mode → `<a target="_blank">`. Both get `title` + `aria-label` from `MY_ICON_LABELS`. |
| `buildClientIconButton(card)` | private | Builds the right button via `resolveClientIcon()`. Returns `""` if disabled or nothing resolves. Always an `<a target="_blank">` with `title` + `aria-label` from `CLIENT_ICON_LABELS`. |
| `buildCard(card)` | private | Assembles one `.collab-tile` (`role="listitem"`) containing the idle face + an actions face (`.collab-face--actions`) holding the two buttons in fixed left-then-right order. |

**Card structure produced:**
```html
<div class="collab-tile" role="listitem" aria-label="{name} collaboration">
  <div class="collab-face collab-face--idle">…logo/pill + name…</div>
  <div class="collab-face collab-face--actions">
    <button class="collab-action-btn collab-action-btn--me" …>…</button>
    <a class="collab-action-btn collab-action-btn--client" …>…</a>
  </div>
</div>
```
Which face is visible is pure CSS (`:hover` / `:focus-within` / `.is-revealed`), not JS.

### 4.2 `collaboration-slider.js`

**Purpose:** decides whether the real cards need to scroll at all, and if so, drives a seamless `requestAnimationFrame` marquee.

**Core design decision (why it exists in this shape):** if there are only 1–4 real cards, cloning them to fill space would just repeat the *same* card over and over, which reads as fake content. So this file measures the real, un-cloned content width on load **and on every resize**, and only switches into "looping" mode if that content genuinely doesn't fit in the carousel.

| Function | Scope | Purpose |
|---|---|---|
| `initCollaborationSlider()` | global | Entry point, called once from `app.js`. Sets up everything below, then starts a permanent RAF loop (`step`). |
| `setPaused(next)` | private | Sets the `paused` flag; resets `lastTime` to `null` on un-pause so the next frame doesn't compute a huge time delta. |
| `getGap()` | private | Reads the computed `gap`/`column-gap` on `#clientsTrack`. |
| `measureContentWidth()` | private | True width of the real cards only (card widths + gaps **between** them, no trailing gap). Used to decide STATIC vs LOOPING. |
| `measureSetWidth()` | private | Width of one full card set **including** a trailing gap — this is the distance to translate before the loop wraps (the trailing gap accounts for the automatic flex-gap before the first clone). |
| `clearClones()` | private | Removes every element with `dataset.collabClone === "true"` from the track. |
| `fillClones()` | private | Clones the real card set enough times to cover `>= 2×` the viewport width, appends them, marks each clone `aria-hidden="true"` and `tabindex="-1"` on its interactive children (so screen readers/keyboard users never land on a duplicate). |
| `evaluateLayout()` | private | **The mode switch.** Compares `measureContentWidth()` to the viewport width. If it fits (or `prefers-reduced-motion` is on) → STATIC (`clearClones()`, zero transform, add `.is-static` to both track and viewport). Otherwise → LOOPING (`fillClones()`, remove `.is-static`). Uses `looping = null` initially (not `false`) specifically so the very first call always applies one branch or the other, even if the computed mode happens to match the default. |
| `step(timestamp)` | private | The RAF loop body. Runs forever regardless of mode; only actually moves `track.style.transform` when `looping && !paused && setWidth`. Delta-time is clamped to `MAX_DELTA_SEC` (0.1s) so a tab that's been backgrounded for a while resumes at normal speed instead of jumping to "catch up". |

**Constants:** `SPEED_PX_PER_SEC = 42` (constant regardless of card count — adding cards never changes perceived speed), `MAX_DELTA_SEC = 0.1`.

**Events wired:** `mouseenter`/`mouseleave` on `.clients-carousel` → the *only* pause condition. `resize` on `window` (200ms debounced) → re-runs `evaluateLayout()`, preserving scroll position as a ratio if still looping.

**Deliberately does NOT listen for:** click, focus/blur, or visibility-change events — a past bug had focus-tracking pause the marquee and never reliably resume after a user clicked an icon or returned via browser back. Fixed by removing focus-based pausing entirely; see the file's header comment for the one-line summary.

### 4.3 `collaboration-events.js`

**Purpose:** all click handling for the cards, via a single delegated listener (not one per card) so it keeps working for every clone the slider injects/removes without re-attaching anything.

| Function | Scope | Purpose |
|---|---|---|
| `initCollaborationEvents()` | global | Entry point, called once from `app.js`. Attaches two delegated `click` listeners (see below). |
| `openMyDocument(btn)` | private | Reads `data-doc-title` / `data-doc-subtitle` / `data-doc-img` off the clicked button and calls `window.DocumentModal.open()`. |
| `collapseRevealedTiles()` | private | Removes `.is-revealed` from every tile — used both when toggling a new tile open and when tapping outside the carousel. |

**Delegated listener #1** (`track`, `click`): if the click landed on `[data-doc-mode="local"]` → `preventDefault()` + `openMyDocument()`. If it landed on any other `.collab-action-btn` (an external `<a>`) → do nothing, let the browser navigate natively. Otherwise, if it landed on a `.collab-tile` body (not a button) → toggle `.is-revealed` on that tile (collapsing any other revealed tile first). This is the touch-device fallback for `:hover`.

**Delegated listener #2** (`document`, `click`): if the click was outside `.clients-carousel` entirely → collapse any revealed tile.

**Important:** this file intentionally has zero communication with `collaboration-slider.js`. Toggling `.is-revealed` is purely visual (mirrors `:hover`/`:focus-within` in CSS) — it does not pause or otherwise affect the marquee.

---

## 5. Shared Modal System

### 5.1 `document-modal.js`

**Purpose:** the single implementation of the `#certModal` dialog, reused by two unrelated features (About-page certification cards, and the Clients & Collaborations "My Document" button) so there is exactly one place that owns open/close/overlay/keyboard/focus behaviour.

**IIFE — nothing here is a bare global function.** Exposes exactly one thing: `window.DocumentModal = { open, close }`.

**DOM it depends on** (all by ID, must exist on the page for this file to do anything — it no-ops safely if `#certModal` is missing): `#certModal`, `#certModalTitle`, `#certModalSub`, `#certModalBody`, `#closeCertModal`.

| Function | Scope | Purpose |
|---|---|---|
| `open({ title, subtitle, imgSrc })` | `window.DocumentModal.open` | Records `document.activeElement` (for focus return later), sets title/subtitle text, sets the body to an `<img>` if `imgSrc` is given or a "coming soon" placeholder if not, shows the modal (`.active` + `body.modal-open`), moves focus to the close button. |
| `close()` | `window.DocumentModal.close` | Hides the modal, delays removing `body.modal-open` by 500ms (matches the CSS close transition), returns focus to whatever element was focused before `open()` was called. |

**Events wired internally:** close button click, click on the overlay itself (`e.target === modal`), and a document-level `Escape` keydown (only acts if the modal is currently `.active`).

### 5.2 `certification-modal-logic.js`

**Purpose:** the *only* thing this file does is map `.cert-card` clicks (About page) to `window.DocumentModal.open()`. All actual modal behaviour lives in §5.1 — this file has zero animation/overlay/keyboard logic of its own, by design (no duplicate modal implementation).

**IIFE**, no globals defined.

| Function | Scope | Purpose |
|---|---|---|
| `openFromCard(card)` | private | Reads `data-cert-name` / `data-cert-institute` / `data-cert-date` / `data-cert-img` off the card and calls `window.DocumentModal.open({ title, subtitle, imgSrc })` (subtitle = institute + date joined with `·`). |

**Events wired:** for every `.cert-card` on the page — `click`, and `keydown` for `Enter`/`Space` (since these cards are keyboard-focusable but aren't native buttons).

---

## 6. Forms

### 6.1 `contact-form-validation.js`

**Purpose:** the entire contact form — a dual-mode form (Email via Formspree, or WhatsApp deep-link) with live validation, per-mode state preservation, and a toast notification system. Entirely self-contained; no other file touches `#contactForm`.

**IIFE**, no globals defined. Guards on `#contactForm` existing.

**Module-level state:**
- `mode` — `"mail"` or `"whatsapp"`, which tab is active.
- `switching` — guards against re-triggering the tab-switch animation mid-transition.
- `state` — `{ mail: {...}, whatsapp: {...} }`, each mode's field values are kept independently so switching tabs never loses what's typed in the other.

| Function | Purpose |
|---|---|
| `saveState()` / `restoreState(newMode)` / `clearState(clearedMode)` | Persist/restore/reset the per-mode field values described above. |
| `showToast(type, msg)` / `hideToast()` | Slide-in notification at the bottom; auto-hides after 5s (`type` is `"success"` or `"error"`, controls the icon). |
| `switchTo(newMode)` | The tab-switch orchestrator: saves current state, flips all the visual tab/pill/field classes, clears errors, restores the target mode's saved values, resets the submit button. |
| `setFieldError(input, msgEl, message, shake = true)` / `clearFieldError(input, msgEl)` / `clearAllErrors()` | Inline error display helpers. `shake` triggers a CSS shake animation (used on submit, not on every keystroke). |
| `validateFullName(raw)` | Requires ≥ 2 words, each matching `NAME_WORD_RE` (letters, optional internal `'`/`-`, e.g. `O'Brien`). |
| `validateEmail(raw)` | Regex match against `EMAIL_RE`; specific message depending on whether `@` or the domain part is what's missing. |
| `validateWhatsApp(raw)` | Non-empty, ≥ 7 chars, digits + optional leading `+` only (`WA_VALID_RE`). |
| `validateSubject(raw)` / `validateMessage(raw)` | Simple non-empty checks. |
| `isFormValid()` | Full-form gate for the submit button: name + message always required, plus (email + subject) in mail mode or (WhatsApp number) in WhatsApp mode. |
| `updateSubmitState()` | Sets `submitBtn.disabled = !isFormValid()` — called after every relevant keystroke. |
| `validate()` | Submit-time version of the same checks, but calls `setFieldError()` (with shake) for every failing field instead of just gating the button. |
| `resetBtn()` / `setBtnLoading()` / `setBtnSuccess()` | Submit button visual states (idle / spinner+"Sending…" / check+"Sent!"). |

**`input` listeners** on `nameInput`, `emailInput`, `contactInput` do live per-keystroke validation + error display (contact input also **strips** invalid characters in real time). A generic delegated `input` listener on the whole form clears errors for any other field once it has content and keeps the submit button in sync.

**`submit` listener:** prevents default, runs `validate()`. WhatsApp mode → builds a pre-filled `wa.me` URL and opens it in a new tab. Mail mode → `POST`s a `FormData` to Formspree (`https://formspree.io/f/maqagzyg`), shows a loading state for a minimum of 3 seconds regardless of actual response time (so the loading state never flashes), then success or error toast accordingly.

---

## 7. `app.js` — Core Orchestrator

By far the largest file (~1280 lines). Holds all render functions for sections that don't have their own dedicated file (Skills, Experience, Projects, Testimonials), plus every cross-cutting site behaviour (mobile menu, theme toggle, scroll animations, smooth scroll, active-nav highlighting, page loader) and the master `DOMContentLoaded` init sequence that starts everything, on every page.

### 7.1 Module-level state (top of file)

| Name | Purpose |
|---|---|
| `currentSkillCategory` | Which skills tab is active; initialised to `skillCategories[0].category`. |
| `carouselIndex`, `carouselTimer`, `carouselAnimating`, `TC_INTERVAL` (120,000ms) | Testimonial carousel state — current slide, auto-advance interval handle, mid-transition guard, 2-minute auto-advance period. |
| `_lastScrollY`, `_currentScrollY` | Updated by a passive `scroll` listener; lets the scroll-animation observer (§7.3) know which direction the user is scrolling. |
| `INITIAL_EXP_COUNT` (2), `EXP_BATCH_SIZE` (3) | Experience pagination — cards shown initially, cards revealed per "Load More" click. |
| `scrollObserver` | The shared `IntersectionObserver` instance for scroll-reveal animations, created lazily on first use so it's reusable by `loadMoreExperience()`. |

### 7.2 Scroll & Header

| Function | DOM | Purpose |
|---|---|---|
| `initHeaderScrollProgress()` | `.header-progress-fill` (all matches) | rAF-throttled scroll listener that sets each fill element's `width` to the page's scroll progress as a percentage. Recalculates on resize too. |

### 7.3 Scroll-Triggered Animations

| Function | DOM | Purpose |
|---|---|---|
| `initScrollAnimations(elements = null)` | `.animate-on-scroll` (or a passed-in NodeList/array) | Creates (once) a bi-directional `IntersectionObserver`: scrolling down → element gets `.from-below` before `.visible`; scrolling up → `.from-above`. On exit, all three classes are cleared so re-entry re-animates correctly. Call with no argument to (re-)register every `.animate-on-scroll` element on the page, or pass specific newly-created elements (e.g. after `loadMoreExperience()`). |
| `animateCounter(element, target, duration = 1500)` | any element | Generic rAF count-up from 0 to `target` over `duration`ms, writing to `element.textContent`. Used by `initCounters()`. |

### 7.4 Mobile Menu

| Function | DOM | Purpose |
|---|---|---|
| `initMobileMenu()` | `#mobileMenuBtn`, `#mobileMenu`, `#closeMobileMenu`, `.mobile-nav-group`, `.mobile-subnav a` | Opens/closes the overlay (button, close button, or backdrop click). Wires an accordion: tapping a group's parent link expands its sub-nav and collapses any other open group (only intercepts the click — i.e. `preventDefault()`s — if that link actually has a sub-nav; plain links navigate normally). Any sub-link tap also closes the whole overlay. |

### 7.5 Skills

| Function | DOM | Purpose |
|---|---|---|
| `renderSkills()` | `#skillsCategoryBar`, `#skillsDisplayGrid` | Renders one tab button per `skillCategories` entry (marks the active one via `currentSkillCategory`), wires each tab's click to re-set `currentSkillCategory` and re-render, then renders the skill-card grid for the active category with a staggered `animation-delay`. Re-registers new cards with `initScrollAnimations()`. |

### 7.6 Experience

| Function | DOM | Purpose |
|---|---|---|
| `renderExperience()` | `#experienceTimeline` | Renders every `experience` entry as an accordion card; entries beyond `INITIAL_EXP_COUNT` start with `.hidden`. Wires a **delegated** click listener for the expand/collapse toggle (handles current *and future* cards automatically — important since `loadMoreExperience()` reveals more later) plus a document-level "click outside collapses any open card" listener. Calls `updateExperienceButtons()` at the end. Contains a private helper `collapseExpCard(cardEl)` shared by both the accordion logic and the outside-click handler. |
| `updateExperienceButtons()` | `#loadMoreExperience`, `#showLessExperience` | Shows/hides the two buttons based on how many cards are currently visible vs. total, and updates the "Load More" button's label to show exactly how many more will appear on the next click. |
| `loadMoreExperience()` | `.experience-item.hidden` | Un-hides up to `EXP_BATCH_SIZE` hidden cards, registers each with `initScrollAnimations()` so they animate in, then calls `updateExperienceButtons()`. |
| `showLessExperience()` | `.experience-item`, `#experience` | Re-hides everything past `INITIAL_EXP_COUNT`, updates the buttons, then smooth-scrolls back to the top of the Experience section (accounting for the fixed header's height). |

### 7.7 Projects Carousel

| Function | DOM | Purpose |
|---|---|---|
| `renderProjects()` | `#pcTrack`, `#pcDots`, `#pcPrev`, `#pcNext` | The most self-contained render function — builds the "featured" project cards, then sets up an entire scroll-preview + carousel system **inline** (all the helpers below are private closures inside this one function, not separate global functions). |

Private helpers inside `renderProjects()` (for reference — none of these are callable from outside):

- **Scroll-preview effect** (per `.pc-preview`): on `mouseenter`, animates the screenshot upward to reveal its full height at a duration proportional to how much needs to scroll; `mouseleave` resets it.
- `getCardsPerView()` — responsive card count: 3 (>1100px), 2 (681–1100px), 1 (≤680px).
- `updateNavVisibility()` — shows/hides arrows+dots based on whether there's anywhere to navigate to.
- `goTo(raw)` — clamps to a valid page index, translates the track, syncs dot active-states and arrow disabled/opacity states.
- `rebuildDots()` — regenerates dot buttons for the current `getCardsPerView()` result (changes on resize).
- Touch/mouse drag-to-swipe: `onTouchStart/Move/End` and `onMouseDown/Move/Up`. The mouse version specifically guards with `isMouseDownOnTrack` so clicking an arrow button never triggers drag-end navigation logic, and `isDragging` is only set true past a `SWIPE_THRESHOLD` (50px) of movement, so a plain click never accidentally calls `goTo()`.
- A debounced `resize` listener that re-clamps the current index, rebuilds dots, and re-runs `goTo()`.

### 7.8 Testimonials Carousel + Modal

| Function | DOM | Purpose |
|---|---|---|
| `renderTestimonials()` | `#testimonialsGrid` | Builds the entire carousel markup (track, slides, prev/next buttons, dot tablist) from `testimonials`, measures the tallest slide to fix the track height (slides are `position: absolute` for the slide transition), positions slide 0 visible and the rest off-screen right, then wires: click/Enter/Space on a slide → `openTestimonialModal()`; prev/next buttons; dot buttons; `ArrowLeft`/`ArrowRight` keydown on the carousel; pause-on-hover and pause-on-focus (`mouseenter`/`focusin` → `tcPause()`, `mouseleave`/`focusout` → `tcResume()` unless focus moved to something still inside the carousel). Finally calls `tcStart()`. |
| `tcNavigate(direction)` | — | Computes the next index (wrapping) for `"next"`/`"prev"` and calls `tcGoTo()`. |
| `tcGoTo(newIndex, direction)` | `#tcTrack .carousel-slide` | The actual slide transition: snaps the incoming slide off-screen (no transition), forces a reflow, then on the next frame animates the incoming slide to center while the outgoing slide animates off the opposite side. After 520ms (transition duration + buffer), parks the exited slide back off-screen without animation (ready for future re-entry from that side), updates ARIA `aria-hidden`/`tabindex`, calls `tcUpdateDots()`, and updates `carouselIndex`. Guarded by `carouselAnimating` so clicks mid-transition are ignored. |
| `tcUpdateDots(activeIndex)` | `#tcDots .carousel-dot` | Syncs the active dot's class + `aria-selected`. |
| `tcStart()` / `tcPause()` / `tcResume()` / `tcResetTimer()` | — | Auto-advance timer management. `tcStart()` only sets the interval if one isn't already running (idempotent). `tcResetTimer()` is called after any *manual* navigation so the full 2-minute countdown restarts rather than continuing from where it was. |
| `openTestimonialModal(index)` | `#testimonialModal`, `#testimonialModalContent` | Builds the modal content for `testimonials[index]` and shows it (this is a **separate, older modal implementation** from `document-modal.js` — it does not use `window.DocumentModal`). |
| `closeTestimonialModal()` | `#testimonialModal` | Hides the modal; delays removing `body.modal-open` by 500ms to match the CSS transition. |

> **Note:** the testimonial modal is intentionally its own thing, separate from the shared `window.DocumentModal` used by certifications/collaborations — it shows structured testimonial content (avatar, stars, quote), not a document/image, so reusing the document modal's markup wouldn't fit.

### 7.9 Stat Counters

| Function | DOM | Purpose |
|---|---|---|
| `initCounters()` | `.stats-bar`, `#projectsCount`, `#clientsCount`, `#techCount` | Hardcoded target totals (`totalProjects = 7`, `totalClients = 3`, `totalTech = 15` — update these by hand when they change) animated via `animateCounter()` the first time `.stats-bar` scrolls into view (uses a one-shot `IntersectionObserver` that unobserves itself after firing). |

### 7.10 Page Loader

| Function | DOM | Purpose |
|---|---|---|
| `hideLoader()` | `#page-loader` | Adds `.hidden` (CSS fade-out), then removes the element from the DOM entirely after 600ms. |

### 7.11 Init Sequence (`DOMContentLoaded`)

The single entry point for the whole site. Structure: one big `try { … } catch (err) { console.error(...) } finally { setTimeout(hideLoader, 400); }` — the `finally` guarantees the loader is always dismissed even if something above throws, so the page can never get stuck on the loading screen.

Order of operations inside the `try` block:

1. **Render every dynamic section** — `renderSkills()`, `renderExperience()`, `renderProjects()`, `renderCollaborations()`, `initCollaborationSlider()`, `initCollaborationEvents()`, `renderTestimonials()`. Each guards itself on its target element, so this is safe to call unconditionally on every page.
2. Mark `#testimonialCarousel` (if present) with `.animate-on-scroll.slide-up` classes (actual observer registration happens later, in step 6).
3. `initMobileMenu()`.
4. `initHeaderScrollProgress()`.
5. Wire `#loadMoreExperience` / `#showLessExperience` click listeners, wire the testimonial modal's close button + backdrop-click + a document-level `Escape` listener.
6. **Smooth-scroll system** (self-invoking IIFE, all private): disables native CSS `scroll-behavior` so it doesn't fight the custom animation; every `a[href^="#"]` gets a click handler that computes the target's offset (accounting for the fixed header height) and animates `window.scrollTo` over exactly 1500ms with a cubic in-out ease via `requestAnimationFrame`. User-initiated scrolling (wheel/touch/keyboard) is left completely native — nothing here intercepts it.
7. After a 300ms `setTimeout` (lets rendered HTML settle before the observer measures positions): `initScrollAnimations()` (registers everything) + `initCounters()`.
8. `initThemeToggle()`, `initActiveNav()`.

### 7.12 Theme Toggle

| Function | DOM | Purpose |
|---|---|---|
| `initThemeToggle()` | `#themeToggle` (+ `.theme-icon-dark` / `.theme-icon-light` inside it) | Reads `localStorage.getItem("theme")` (defaults to `"dark"`), applies it via `data-theme="light"` on `<html>` (or removes the attribute for dark), swaps which icon is visible. Click toggles between the two and persists the choice to `localStorage`. |

### 7.13 Active Nav Highlighting

| Function | DOM | Purpose |
|---|---|---|
| `initActiveNav()` | `section[id]` (all), `.desktop-nav a` | An `IntersectionObserver` (40% threshold) that adds `.nav-active` to whichever desktop nav link's `href="#{id}"` matches the section currently most in view, removing it from all others. |

---

## 8. Common Patterns Used Throughout

- **Guard-and-return:** almost every function that touches specific DOM elements starts with `if (!el) return;` (or similar) so it's always safe to call unconditionally on a page that doesn't have that section. This is *the* reason `app.js`'s init sequence can call every render function on every page without conditionals.
- **Event delegation over per-element listeners:** experience cards, collaboration cards, and the outside-click-to-collapse patterns all attach one listener to a stable parent rather than one per item — this means dynamically added/cloned elements (new experience cards, slider clones) work automatically with zero extra wiring.
- **rAF for anything continuous:** header scroll-progress, scroll-triggered animations, counters, smooth-scroll, and the collaboration slider all drive per-frame work through `requestAnimationFrame` rather than `setInterval`/CSS-only, for smoother/GPU-friendlier motion and easier pausing.
- **IIFEs for single-purpose files:** `document-modal.js`, `certification-modal-logic.js`, and `contact-form-validation.js` are each wrapped in `(function () { … })()` because nothing in them needs to be called from another file (except the one thing `document-modal.js` deliberately exposes on `window`). This keeps the global namespace clean.
- **`window.X` vs bare `const X`:** `window.projects` and `window.DocumentModal` are the only two globals exposed via explicit `window.` assignment — both are accessed from a *different file* than the one that defines them, so this is a deliberate, minimal, intentional public API rather than an oversight.

---

## 9. Quick "I want to…" Guide

| I want to… | Edit this file only |
|---|---|
| Add/remove a project | `projects-data.js` |
| Add/remove a skill or category | `skills-data.js` |
| Add/edit a job/education entry | `experience-data.js` |
| Add/edit a testimonial | `testimonials-data.js` |
| Add a new client/collaboration card | `collaboration-config.js` (copy the HerDev entry) |
| Add a new "My Document" or "Client" icon type | `collaboration-config.js` (add one key to `MY_ICONS`/`CLIENT_ICONS` + its label) |
| Change how many experience cards show initially / per "Load More" | `app.js` → `INITIAL_EXP_COUNT` / `EXP_BATCH_SIZE` constants (§7.1) |
| Change the testimonial auto-advance interval | `app.js` → `TC_INTERVAL` constant (§7.1) |
| Change the collaboration marquee speed | `collaboration-slider.js` → `SPEED_PX_PER_SEC` constant |
| Change the stats-bar totals (projects/clients/tech counts) | `app.js` → `initCounters()` (§7.9) |
| Change Formspree endpoint or WhatsApp number | `contact-form-validation.js` → the `submit` listener |
