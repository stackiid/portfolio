# ACCESSIBILITY.md

This document covers every accessibility pattern implemented across the portfolio - ARIA roles,
keyboard navigation contracts, focus management, and screen reader conventions. Every interactive
element in this codebase has an explicit accessibility contract. Follow it when adding new
components.

---

## 1. ARIA Roles and Attributes

### 1.1 Landmark Roles

Every page uses semantic HTML5 landmarks. Do not replace these with generic `<div>` elements.

| Element     | Role          | Used For                                  |
| ----------- | ------------- | ----------------------------------------- |
| `<header>`  | `banner`      | Site navigation and logo                  |
| `<nav>`     | `navigation`  | Desktop nav bar and mobile menu           |
| `<footer>`  | `contentinfo` | Footer links, social row, copyright       |
| `<section>` | `region`      | Each named section with `aria-labelledby` |

**Gap:** no page currently wraps its primary content in a `<main>` element. Screen reader users
lose the "skip to main content" landmark shortcut as a result. Recommended fix: wrap each page's
content (between the header and footer) in `<main id="main-content">` - this also gives the
skip-link recommendation in section 2.3 something to target.

All `<section>` elements with visible headings use `aria-labelledby` pointing to the heading's
`id`. Example:

```html
<section id="skills" aria-labelledby="skills-title">
  <h2 id="skills-title" class="section-title">Skills</h2>
</section>
```

---

### 1.2 Interactive Components

#### Modals (`#testimonialModal`, `#certModal`)

| Attribute         | Value                             | Purpose                               |
| ----------------- | --------------------------------- | ------------------------------------- |
| `role`            | `"dialog"`                        | Identifies the overlay as a dialog    |
| `aria-modal`      | `"true"`                          | Tells screen readers focus is trapped |
| `aria-labelledby` | ID of the modal's heading element | Names the dialog for screen readers   |

On open: focus is moved to the modal container or the first focusable element inside it.
On close: focus is returned to the element that triggered the open.

#### Testimonial Carousel (`#testimonialCarousel`)

| Attribute              | Value                       | Purpose                                      |
| ---------------------- | ---------------------------- | ----------------------------------------------- |
| `role`                 | `"region"`                  | Identifies the widget as a landmark region   |
| `aria-label`           | `"Client testimonials"`     | Names the region for screen readers          |
| `aria-roledescription` | `"carousel"`                | Describes the region's interaction pattern   |

Each slide (`.carousel-slide`) carries `role="group"`, `aria-roledescription="slide"`, an
`aria-label` of `"Slide X of Y: <name>"`, and `aria-hidden`/`tabindex` toggled based on whether
it's the active slide.

Previous / next buttons carry `aria-label="Previous testimonial"` and
`aria-label="Next testimonial"`. Dot buttons carry `aria-label="Go to testimonial {n}"` and
`aria-pressed="true"` on the active dot.

#### Certification Cards (`.cert-card`)

```html
role="button" tabindex="0" aria-label="View {Certificate Name} certificate"
```

These are `<div>` elements acting as buttons. The `role="button"` and `tabindex="0"` pair
makes them keyboard-accessible. `certification-modal-logic.js` binds both `click` and
`keydown` (Enter and Space) events, opening the shared `window.DocumentModal`.

#### Clients & Collaborations Cards (`.collab-tile`)

```html
<div class="collab-tile" role="listitem" aria-label="{Company name} collaboration">
```

The card itself carries no `role="button"`/`tabindex` and is never clickable - only the two
real `<button>`/`<a>` elements inside it are, so they're reachable via normal Tab order without
any custom keyboard wiring. `#clientsTrack` carries `role="list"` to pair correctly with each
card's `role="listitem"`.

The idle face (logo/initial + name) and the two-button action face are pure CSS, toggled by
`:hover` **and** `:focus-within` together - tabbing to either button reveals the face it's in
before the button itself receives visible focus, so keyboard users never focus something
invisible. Touch devices (no real `:hover`) get a `collaboration-events.js`-driven tap-to-reveal
fallback that adds/removes an `.is-revealed` class, mirrored by the same CSS rules.

`collaboration-slider.js` pauses the auto-scrolling marquee on `mouseenter`, `focusin` (so
tabbing into a card's buttons doesn't drag them out from under the pointer/keyboard focus), and
while a card is `.is-revealed` on touch; it respects `prefers-reduced-motion` by not animating
at all.

#### Mobile Menu (`#mobileMenu`)

| Attribute    | Value                      |
| ------------ | -------------------------- |
| `role`       | `"dialog"`                 |
| `aria-modal` | `"true"`                   |
| `aria-label` | `"Mobile navigation menu"` |

`#mobileMenuBtn` carries `aria-expanded="false"` at rest, toggled to `"true"` when the
overlay is open. Updated by `initMobileMenu()` in `app.js`.

#### Theme Toggle (`#themeToggle`)

Carries `aria-label` updated dynamically: `"Switch to light mode"` in dark mode,
`"Switch to dark mode"` in light mode.

---

## 2. Keyboard Navigation

### 2.1 Global Keyboard Contracts

| Key          | Scope                | Behaviour                             |
| ------------ | -------------------- | ------------------------------------- |
| `Tab`        | Entire page          | Cycles through all focusable elements |
| `Shift+Tab`  | Entire page          | Reverse tab order                     |
| `Enter`      | Any `role="button"`  | Activates the element                 |
| `Space`      | Any `role="button"`  | Activates the element                 |
| `Escape`     | Open modal or panel  | Closes the modal / panel              |
| `ArrowLeft`  | Testimonial carousel | Navigates to the previous slide       |
| `ArrowRight` | Testimonial carousel | Navigates to the next slide           |

### 2.2 Focus Trap - Modals

When any modal opens, focus must not be allowed to leave the modal container. `app.js` and
`certification-modal-logic.js` implement a basic focus trap: `Escape` closes the modal and
returns focus to the trigger element. When implementing new modals, follow the same pattern:

```js
// On open
modal.focus();
// On Escape keydown inside modal
modal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
// On close
triggerElement.focus();
```

### 2.3 Skip Navigation

**Not currently implemented.** The site does not have a "Skip to main content" link. This is a
recommended addition: a visually hidden link, first in the DOM on every page, that becomes
visible only on focus and lets keyboard/screen-reader users jump past the header navigation
straight to the main content. Suggested pattern:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--accent-dark);
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 1rem;
}
```

Would also require adding `id="main-content"` to each page's primary content wrapper.

---

## 3. Colour and Contrast

### 3.1 Contrast Ratios

| Pairing                            | Ratio  | WCAG Level |
| ---------------------------------- | ------ | ---------- |
| `--text-dark` on `--bg-dark`       | 12.5:1 | AAA        |
| Gold `#D4AF37` on `--bg-dark`      | 8.0:1  | AAA        |
| `#1A1A1A` on gold `#D4AF37`        | 8.0:1  | AAA        |

> These ratios apply to the site's dark theme. Secondary/muted text is produced by applying
> `opacity` (commonly 0.7-0.9) to `--text-dark` rather than a separate colour token - verify
> contrast at the specific opacity used before relying on it for essential information.

### 3.2 Focus Indicators

Never remove the browser default focus ring with `outline: none` without replacing it. The
portfolio replaces default outlines with a gold ring:

```css
:focus-visible {
  outline: 2px solid var(--accent-dark);
  outline-offset: 3px;
}
```

Use `:focus-visible` rather than `:focus` so the ring only appears for keyboard navigation,
not mouse clicks.

---

## 4. Images and Media

### 4.1 `alt` Text Rules

| Image context                  | `alt` rule                                           |
| ------------------------------ | ---------------------------------------------------- |
| Profile photo (coin front)     | `"Ubaid Ahmad"` - identifies the person              |
| Project screenshots            | Brief description of what the screenshot shows       |
| Client / collaboration logos    | `"{Company name} logo"`                              |
| Testimonial avatars            | `"{Reviewer name} photo"`                            |
| Certificate images in modal    | `"{Certificate name} credential"`                    |
| Decorative blobs / backgrounds | `alt=""` with `role="presentation"` or `aria-hidden` |

Never use the filename as alt text. Never leave `alt` undefined.

### 4.2 `aria-hidden` on Decorative Icons

All purely decorative Font Awesome icons carry `aria-hidden="true"`. For icons that convey
meaning as a group (e.g. the star rating in testimonials), the actual pattern used in this
codebase is a single `aria-label` on the *container*, rather than a visually-hidden label per
icon (there is no `.sr-only` utility class defined):

```html
<div class="testimonial-stars" aria-label="5 out of 5 stars">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
</div>
```

---

## 5. Forms

### 5.1 Contact Form (`#contactForm`)

Every input in the dual-mode contact form is associated with its label via `for` / `id` pairing.
Inline error spans carry `aria-live="polite"` so screen readers announce validation failures as
they appear:

```html
<label for="cf-name">Name</label>
<input id="cf-name" type="text" autocomplete="name" />
<span id="cf-name-error" class="cf-field-error" aria-live="polite"></span>
```

The form element itself carries `novalidate` to suppress browser-native validation bubbles -
all validation is handled by `contact-form-validation.js` with accessible error messaging.

`#cfSubmitBtn` uses the native `disabled` attribute (toggled by `updateSubmitState()`), which is
exposed to assistive technology automatically - no additional `aria-disabled` is needed. Screen
readers announce the button as unavailable until all required fields for the active mode pass
validation.

### 5.2 Toast Notification (`#cfToast`)

The toast uses `role="alert"` and `aria-live="polite"` so screen readers announce the
confirmation message after a successful send without interrupting other announcements.

---

## 6. Checklist for New Components

Before shipping any new interactive component, verify all of the following:

- [ ] Is the element a native interactive element (`<button>`, `<a>`)? If not, does it carry
      `role` and `tabindex="0"`?
- [ ] Does it respond to `Enter` and `Space` if it acts as a button?
- [ ] Does it have a visible and programmatic label (`aria-label` or `aria-labelledby`)?
- [ ] Is focus returned to the trigger element after any modal or overlay it opens is closed?
- [ ] Are decorative icons marked `aria-hidden="true"`?
- [ ] Is the colour contrast ratio at least 4.5:1 for normal text, 3:1 for large text?
- [ ] Does the element use `:focus-visible` for its focus ring, not `outline: none`?
- [ ] If it contains images, is `alt` text provided and accurate?
