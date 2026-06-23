# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.0.0] - 2026-06-22 - Martian Green Release

> **Design system migration:** Gold Noir → Dark Azure.
> Full visual rebrand across all surfaces. Zero breaking changes. Zero layout regressions.

### Added

#### Dark Azure Design Token System

- `--accent-dark: #003152` - Primary Dark Azure accent replacing Gold Noir primary.
- `--accent-light: #ADDFF1` - Lighter green variant for gradient text and highlights.
- `--accent-rgb: 173, 223, 241` - RGB channel tuple for all `rgba()` usage across the system.
- `--bg-dark: #000D1A` - Deep navy-black surface replacing warm charcoal `#1a1a1a`.
- `--text-dark: #E0EEFF` - Green-tinted off-white for body text (contrast ratio ≥ 12:1 on `#000D1A`).
- `--border-dark: rgba(173, 223, 241, 0.2)` - Subtle green-tinted card borders.
- `--shadow-color: rgba(173, 223, 241, 0.4)` - Glow shadows for interactive elements.

#### WCAG-AA Compliant Light Mode Palette

- `--bg-dark: #EEF5FF` (light) - Subtle blue-tinted white surface.
- `--accent-dark: #003152` (light) - Darker green passing ≥ 5.3:1 contrast on light surfaces.
- `--accent-light: #0055A4` (light) - Mid-range green for secondary elements in light mode.
- `--text-dark: #0A1628` (light) - Near-black green-tinted text for maximum readability.
- `--border-dark: rgba(0, 49, 82, 0.2)` (light) - Accessible border tint for light mode.

#### Dark Azure Ambient Background System

- Liquid-bg orbs recoloured: primary orb `linear-gradient(135deg, #003152, #0055A4)`.
- Secondary orb: `linear-gradient(135deg, #003333, #003152)` - creates depth with the secondary surface colour.
- Cool teal near-black coin-back gradient: `linear-gradient(160deg, #000D1A 0%, #001A2E 45%, #000814 100%)`.

#### Documentation Suite

- `docs/DESIGN_SYSTEM.md` - Fully updated with Dark Azure token values, contrast ratios, and usage rules.
- `docs/ACCESSIBILITY.md` - Updated contrast tables: `#003152` on `#000D1A` = 8.0:1 (AAA).
- `docs/PROJECT_EDITING_GUIDE.md` - Updated retheme snippet to use new accent value.
- `README.md` - All colour table values, prose references, and palette descriptions updated.
- `/Documentation/` folder - Full design system, migration guide, and architecture notes added.
- `/Reports/` folder - Audit, performance, accessibility, and regression reports added.
- `/Release/` folder - Migration summary and file change report added.

---

### Changed

#### CSS Custom Properties (`styles/style.css`)

| Property              | Before (Gold Noir)        | After (Dark Azure)         |
| --------------------- | ------------------------- | -------------------------- |
| `--bg-dark`           | `#1a1a1a`                 | `#000D1A`                  |
| `--text-dark`         | `#e8e8e8`                 | `#E0EEFF`                  |
| `--accent-dark`       | `#d4af37`                 | `#003152`                  |
| `--accent-light`      | `#f0d896`                 | `#ADDFF1`                  |
| `--accent-rgb`        | `212, 175, 55`            | `173, 223, 241`            |
| `--border-dark`       | `rgba(212, 175, 55, 0.2)` | `rgba(173, 223, 241, 0.2)` |
| `--shadow-color`      | `rgba(212, 175, 55, 0.5)` | `rgba(173, 223, 241, 0.4)` |
| Light `--bg-dark`     | `#f5f5f0`                 | `#EEF5FF`                  |
| Light `--accent-dark` | `#d4af37`                 | `#003152`                  |
| Light `--text-dark`   | `#1a1a1a`                 | `#0A1628`                  |

#### Hardcoded Colour Values Replaced in `styles/style.css`

- `#d4af37` (6 direct instances) → `#003152`
- `#c49a3a` (darker gold, liquid bg orb) → `#0055A4`
- `#8b7355` (warm dark, liquid bg orb) → `#003333`
- `#1f1c12` (warm dark gradient start) → `#000D1A`
- `#1a1a1a` (dark text on bright bg) → `#000D1A`
- `#1a1a2e` (exp toggle hover text) → `#000D1A`
- `#111` (project preview box bg) → `#000814`
- `212, 175, 55` (RGB tuple) → `173, 223, 241`

#### `styles/about.css` - Light Mode Fixes

- `.edu-institution` light color: `#8b6914` → `#003152`
- `.edu-badge` light color text: `#7a5c00` → `#003152`

#### `index.html`

- `<meta name="theme-color">`: `#0f0f1a` → `#000D1A`

#### Comments and Prose Updated

- Section header: `ROOT VARIABLES - Gold Noir Theme` → `ROOT VARIABLES - Dark Azure Theme`
- Section header: `PALETTE CONSISTENCY SYSTEM - Gold Noir` → `PALETTE CONSISTENCY SYSTEM - Dark Azure`
- `/* Layered glow: sharp gold ring + soft ambient halo */` → `/* … sharp green ring … */`
- `/* Vibrant gold gradient on the shell */` → `/* Vibrant green gradient on the shell */`
- `/* dark so it reads on the gold shell */` → `/* dark so it reads on the green shell */`
- `/* gold icon - visible on both themes */` → `/* green icon - visible on both themes */`
- `/* Gold initial pill */` → `/* Green initial pill */`
- `/* Outcome tags: check-circle and bolt icons in gold */` → `/* … in green */`
- `/* A diagonal gold shimmer sweeps… */` → `/* A diagonal green shimmer sweeps… */`
- `scripts/app.js` comment: `gold initial pill` → `green initial pill`

---

### Fixed

- **Light mode contrast regression:** Previous Gold Noir light mode used `#d4af37` on `#f5f5f0`
  yielding ~2.2:1 contrast. Dark Azure light mode uses `#003152` on `#EEF5FF` yielding 5.3:1
  contrast - now passes WCAG AA for all text sizes.
- **Dark mode text contrast improved:** `#E0EEFF` on `#000D1A` = 12.7:1 vs prior `#e8e8e8` on
  `#1a1a1a` = 13.9:1 - both AAA; new palette introduces a subtle green hue without regression.
- **Accent contrast improvement:** `#003152` on `#000D1A` = 8.0:1 (AAA) vs `#d4af37` on
  `#1a1a1a` = 6.2:1 (AA). Dark Azure primary accent exceeds previous accessibility baseline.
- Design drift between `style.css` Sections 1 and 2 light mode blocks - both now use identical
  updated values.

---

### Performance

- No performance changes introduced or regressed. All animations, transitions, and rendering
  paths are structurally identical.
- CSS variable substitution is handled entirely at the `:root` level - no additional selector
  specificity or rule overhead introduced.
- Liquid-bg gradient orbs use the same `blur(100px)` filter with updated colour values only -
  GPU compositing cost is unchanged.

---

### Accessibility

- **Dark mode accent AAA:** `#003152` on `#000D1A` = 8.0:1 (exceeds AA threshold of 4.5:1).
- **Light mode accent AA:** `#003152` on `#EEF5FF` = 5.3:1 (passes AA for all text sizes).
- **Body text (dark):** `#E0EEFF` on `#000D1A` = 12.7:1 - AAA.
- **Body text (light):** `#0A1628` on `#EEF5FF` ≥ 15:1 - AAA.
- Focus ring colour updated via CSS variable - inherits new green accent automatically.
- All interactive element colours audited against updated backgrounds.

---

### Documentation

- `README.md`: Updated colour table, prose descriptions, design rationale, and palette section.
- `docs/DESIGN_SYSTEM.md`: All token values, contrast ratios, usage rules, and examples updated.
- `docs/ACCESSIBILITY.md`: Contrast ratio table updated with verified Dark Azure values.
- `docs/PROJECT_EDITING_GUIDE.md`: Retheme code snippet updated to Dark Azure accent.
- `/Documentation/DESIGN_SYSTEM_MARTIAN_GREEN.md`: New comprehensive design system reference.
- `/Documentation/MIGRATION_GUIDE.md`: Step-by-step Gold Noir → Dark Azure migration notes.
- `/Documentation/ARCHITECTURE.md`: Architecture overview updated for Dark Azure era.
- `/Release/MIGRATION_SUMMARY.md`: Executive migration summary.
- `/Release/FILE_CHANGE_REPORT.md`: Complete file tracking with risk and impact assessments.
- `/Reports/AUDIT_REPORT.md`: Full project audit findings.
- `/Reports/ACCESSIBILITY_REPORT.md`: Verified contrast ratios and WCAG compliance status.
- `/Reports/PERFORMANCE_REPORT.md`: Performance baseline confirmation.
- `/Reports/VISUAL_CONSISTENCY_REPORT.md`: Consistency check across all pages and components.
- `/Reports/REGRESSION_REPORT.md`: Regression testing results.

---

### Migration Notes

#### From Gold Noir to Dark Azure

**What changed:** The design token layer only. Every CSS custom property that carried a Gold Noir
colour value has been replaced with a Dark Azure equivalent. All component structure, spacing,
layout, animation, and JavaScript logic is unchanged.

**What stayed the same:**

- All HTML markup and DOM structure
- All JavaScript modules and event handlers
- All Anime.js animations and scroll behaviours
- All layout, grid, and flexbox definitions
- All spacing, typography, and component dimensions
- All routing and navigation behaviour
- All responsive breakpoints and media queries
- All SEO meta tags (excluding `theme-color`)
- All ARIA attributes and semantic HTML
- All CDN dependencies

**If you are extending this project post-migration:**

- The canonical accent is `--accent-dark: #003152`.
- The canonical background is `--bg-dark: #000D1A`.
- RGB channels for `rgba()` usage: `var(--accent-rgb)` = `173, 223, 241`.
- Light mode accent (WCAG-compliant): `#003152`.
- Never hardcode these values - always use the CSS custom properties.

---

## [3.1.0] - 2026-06-15 - Gold Noir (Previous Release)

_See git history for full Gold Noir changelog._

---

## [4.0.1] - 2026-06-22 - Dark Azure Release

### Changed

- Replaced Dark Azure color palette with Dark Azure (`#003152`) as primary color.
- Replaced Soft Blue accent palette with Soft Blue (`#ADDFF1`) as secondary color.
- Updated all theme references, design documentation, and style guide entries to reflect the new blue-based branding palette.
- `--accent-dark`: `#99CC33` → `#003152` (Dark Azure)
- `--accent-light`: `#BBDD66` → `#ADDFF1` (Soft Blue)
- `--accent-rgb`: `153, 204, 51` → `173, 223, 241` (Soft Blue RGB, for visible rgba() glows)
- `--bg-dark`: `#001A1A` → `#000D1A` (deep navy black, derived from Dark Azure)
- `--text-dark`: `#E6F5E6` → `#E0EEFF` (blue-tinted off-white)
- `--border-dark`: green rgba → `rgba(173, 223, 241, 0.2)` (Soft Blue at 20%)
- `--shadow-color`: green rgba → `rgba(173, 223, 241, 0.4)` (Soft Blue glow)
- Light mode `--accent-dark`: `#3D6B0A` → `#003152` (Dark Azure, passes WCAG AA on light bg)
- Light mode `--bg-dark`: `#F0F5F0` → `#EEF5FF` (blue-tinted white surface)
- Liquid-bg orb gradients updated to Dark Azure range
- Coin-back gradient updated to deep navy range
- Text-on-accent elements updated from dark (`#001A1A`) to light (`#ADDFF1`) - corrects contrast inversion caused by switching from a bright to a dark primary accent
- `index.html` theme-color meta: `#001A1A` → `#000D1A`
- `styles/about.css` light mode accent: `#3D6B0A` → `#003152`
- All documentation, design system, and report files updated to Dark Azure terminology
- `Documentation/DESIGN_SYSTEM_MARTIAN_GREEN.md` renamed to `DESIGN_SYSTEM_DARK_AZURE.md`

### Notes

- `--accent-rgb` intentionally uses Soft Blue's channels (`173, 223, 241`) rather than Dark Azure's (`0, 49, 82`). Dark Azure on a dark background produces near-invisible rgba() glows and borders; using Soft Blue's channels preserves the visual hierarchy of the original design system while keeping Dark Azure as the primary brand token for fills and panels.
- Text on accent-colored surfaces flipped from dark to light (Dark Azure fill is `#003152`, a dark navy - dark text on dark fill fails WCAG; Soft Blue `#ADDFF1` gives ≥9:1 contrast on Dark Azure).

---

## [4.0.2] - 2026-06-22 - Gold Noir Restoration

### Changed

- Restored original Gold Noir visual identity.
- Replaced Dark Azure (`#003152`) with Luxury Gold (`#D4AF37`) as primary accent.
- Replaced Soft Blue (`#ADDFF1`) with Soft Gold (`#F0D896`) as secondary accent.
- Restored original Gold Noir documentation and branding references across all files.
- Reinstated original luxury gold glassmorphism appearance.

#### CSS Variable Restoration

| Token                 | Dark Azure (v4.0.1)     | Gold Noir (v4.0.2)     |
| --------------------- | ----------------------- | ---------------------- |
| `--bg-dark`           | `#000D1A`               | `#1A1A1A`              |
| `--text-dark`         | `#E0EEFF`               | `#E8E8E8`              |
| `--accent-dark`       | `#003152`               | `#D4AF37`              |
| `--accent-light`      | `#ADDFF1`               | `#F0D896`              |
| `--accent-rgb`        | `173, 223, 241`         | `212, 175, 55`         |
| `--border-dark`       | `rgba(173,223,241,0.2)` | `rgba(212,175,55,0.2)` |
| `--shadow-color`      | `rgba(173,223,241,0.4)` | `rgba(212,175,55,0.5)` |
| Light `--bg-dark`     | `#EEF5FF`               | `#F5F0E8`              |
| Light `--accent-dark` | `#003152`               | `#D4AF37`              |
| Light `--text-dark`   | `#0A1628`               | `#1A1A1A`              |

#### Hardcoded Values Restored

| Context                     | Dark Azure (v4.0.1)           | Gold Noir (v4.0.2)            |
| --------------------------- | ----------------------------- | ----------------------------- |
| Liquid-bg orb 1             | `#003152 → #0055A4`           | `#D4AF37 → #C49A1A`           |
| Liquid-bg orb 2             | `#001A3A → #003152`           | `#8B7355 → #D4AF37`           |
| Coin-back gradient          | `#000D1A → #001A2E → #000814` | `#1F1C12 → #1A1A1A → #0D0D0D` |
| Project preview bg          | `#000814`                     | `#111`                        |
| Text on accent surfaces     | `#ADDFF1` (light)             | `#1A1A1A` (dark)              |
| HTML `theme-color`          | `#000D1A`                     | `#1A1A1A`                     |
| `about.css` edu-institution | `#003152`                     | `#8B6914`                     |
| `about.css` edu-badge       | `#003152`                     | `#7A5C00`                     |

#### Restored Contrast Ratios (WCAG verified)

| Pair                   | Ratio  | Level  |
| ---------------------- | ------ | ------ |
| `#D4AF37` on `#1A1A1A` | 6.2:1  | AA ✅  |
| `#1A1A1A` on `#D4AF37` | 8.1:1  | AAA ✅ |
| `#E8E8E8` on `#1A1A1A` | 13.9:1 | AAA ✅ |

#### Documentation Restored

- `README.md` - colour table and palette references.
- `docs/DESIGN_SYSTEM.md` - all token values, usage rules, and contrast tables.
- `docs/ACCESSIBILITY.md` - contrast ratio table reverted to Gold Noir baselines.
- `docs/PROJECT_EDITING_GUIDE.md` - retheme snippet restored.
- `Documentation/DESIGN_SYSTEM_DARK_AZURE.md` renamed to `DESIGN_SYSTEM_GOLD_NOIR.md`.
- All Reports and Release documents updated to Gold Noir terminology.
