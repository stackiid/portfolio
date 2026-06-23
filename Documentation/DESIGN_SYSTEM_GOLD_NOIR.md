# Gold Noir Design System

**Version:** 4.0.0  
**Status:** Production  
**Replaces:** Gold Noir

---

## Philosophy

Gold Noir is a technology-forward, premium design system built around a primary
gold accent (`#D4AF37`) on a deep noir black surface (`#1A1A1A`). It communicates
precision, modernity, and technical authority - distinct from Gold Noir's warmth and
status-signalling without sacrificing premium feel.

---

## Core Colour Tokens

### Dark Mode (Default)

| Token             | Value                     | Role                                         |
| ----------------- | ------------------------- | -------------------------------------------- |
| `--bg-dark`       | `#1A1A1A`                 | Page background - deep noir black            |
| `--text-dark`     | `#E8E8E8`                 | Body text - gold-tinted off-white            |
| `--accent-dark`   | `#D4AF37`                 | Primary brand accent                         |
| `--accent-light`  | `#F0D896`                 | Lighter variant for gradients and highlights |
| `--accent-rgb`    | `212, 175, 55`            | RGB channels for `rgba()` composition        |
| `--accent-hover`  | `#C49A1A`                 | Darker hover state for interactive elements  |
| `--glass-dark`    | `rgba(255,255,255,0.05)`  | Glassmorphism card fill                      |
| `--border-dark`   | `rgba(212, 175, 55, 0.2)` | Subtle green-tinted borders                  |
| `--shadow-color`  | `rgba(212, 175, 55, 0.4)` | Glow shadow for focus and active states      |
| Secondary surface | `#003333`                 | Dark teal for secondary areas and orb bg     |
| Deep dark         | `#0D0D0D`                 | Deepest surface for coin-back gradient end   |
| Mid dark          | `#1A1A1A`                 | Mid-gradient teal                            |

### Light Mode Overrides

| Token            | Value                     | Role                                                   |
| ---------------- | ------------------------- | ------------------------------------------------------ |
| `--bg-dark`      | `#F5F0E8`                 | Page background - warm ivory                           |
| `--text-dark`    | `#1A1A1A`                 | Body text - near-black green                           |
| `--accent-dark`  | `#D4AF37`                 | WCAG-AA accent for light surfaces (5.3:1 on `#F5F0E8`) |
| `--accent-light` | `#C49A1A`                 | Secondary accent for light mode                        |
| `--glass-dark`   | `rgba(255,255,255,0.6)`   | Glass fill on light surface                            |
| `--border-dark`  | `rgba(212, 175, 55, 0.2)` | Accessible border on light                             |
| `--shadow-color` | `rgba(212, 175, 55, 0.5)` | Muted shadow for light mode                            |

---

## Colour Scale

### Primary Green Scale

| Name      | Hex       | Usage                         |
| --------- | --------- | ----------------------------- |
| Green 900 | `#1A1A1A` | Background / darkest surface  |
| Green 800 | `#1A1A1A` | Mid gradient                  |
| Green 700 | `#003333` | Secondary surface, orbs       |
| Green 600 | `#D4AF37` | Light mode accent text        |
| Green 500 | `#C49A1A` | Light mode secondary          |
| Green 400 | `#C49A1A` | Dark mode hover state         |
| Green 300 | `#D4AF37` | ⭐ Primary accent             |
| Green 200 | `#F0D896` | Light variant / gradient high |
| Green 100 | `#E8E8E8` | Body text on dark             |
| Green 50  | `#F5F0E8` | Light mode background         |

---

## Contrast Ratios (WCAG Verified)

| Foreground | Background | Ratio      | Level  |
| ---------- | ---------- | ---------- | ------ |
| `#D4AF37`  | `#1A1A1A`  | **8.0:1**  | AAA ✅ |
| `#E8E8E8`  | `#1A1A1A`  | **12.7:1** | AAA ✅ |
| `#1A1A1A`  | `#D4AF37`  | **8.0:1**  | AAA ✅ |
| `#D4AF37`  | `#F5F0E8`  | **5.3:1**  | AA ✅  |
| `#1A1A1A`  | `#F5F0E8`  | **≥15:1**  | AAA ✅ |
| `#1A1A1A`  | `#F0D896`  | **≥8:1**   | AAA ✅ |

---

## Semantic Colour Map

| Semantic Role  | Dark Mode                | Light Mode              |
| -------------- | ------------------------ | ----------------------- |
| Background     | `#1A1A1A`                | `#F5F0E8`               |
| Surface (card) | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.6)` |
| Border         | `rgba(153,204,51,0.2)`   | `rgba(61,107,10,0.2)`   |
| Primary text   | `#E8E8E8`                | `#1A1A1A`               |
| Accent         | `#D4AF37`                | `#D4AF37`               |
| Glow / shadow  | `rgba(153,204,51,0.5)`   | `rgba(61,107,10,0.3)`   |
| Error          | `#e53935`                | `#c62828`               |
| Success        | `#43a047`                | `#2e7d32`               |

---

## Implementation

All values are CSS custom properties set on `:root`. No hardcoded hex values should
appear outside the `:root` and `:root[data-theme="light"]` blocks. Every interactive
element, card, border, shadow, and glow derives its colour from these tokens.

```css
/* Access pattern */
color: var(--accent-dark);
border: 1px solid var(--border-dark);
box-shadow: 0 0 20px var(--shadow-color);
background: rgba(var(--accent-rgb), 0.12);
```

---

## Usage Rules

1. **`#D4AF37` is for emphasis only** - icon fills, borders, glows, CTA strokes, shimmer.
   Do not use it as a large fill background; it will overwhelm the dark surface.
2. **Text on green surfaces** (buttons, coin, badges) must use `#1A1A1A` - never white.
3. **Light mode accent** must be `#D4AF37` - using `#D4AF37` on `#F5F0E8` fails WCAG (1.9:1).
4. **All colour references must use CSS custom properties.** Hardcoded hex values break
   the token system and will not respond to theme switching.
5. **Secondary surface `#003333`** is appropriate for ambient background elements (orbs,
   gradients) but not for card surfaces or interactive containers.
