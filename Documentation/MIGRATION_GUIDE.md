# Gold Noir → Gold Noir Migration Guide

**Migration Date:** 2026-06-22  
**From:** Gold Noir v3.x  
**To:** Gold Noir v4.0.2  
**Migration Type:** Design system rebrand - zero breaking changes

---

## What Changed

The migration replaced every Gold Noir colour value with a Gold Noir equivalent.
No HTML structure, JavaScript logic, animation, layout, spacing, routing, or content was altered.

### Token Mapping

| Old Token Value                        | New Token Value                        | Semantic Meaning |
| -------------------------------------- | -------------------------------------- | ---------------- |
| `--bg-dark: #1a1a1a`                   | `--bg-dark: #1A1A1A`                   | Page background  |
| `--text-dark: #e8e8e8`                 | `--text-dark: #E8E8E8`                 | Body text        |
| `--accent-dark: #d4af37`               | `--accent-dark: #D4AF37`               | Brand accent     |
| `--accent-light: #f0d896`              | `--accent-light: #F0D896`              | Light accent     |
| `--accent-rgb: 212, 175, 55`           | `--accent-rgb: 212, 175, 55`           | RGB channels     |
| `--border-dark: rgba(212,175,55,0.2)`  | `--border-dark: rgba(153,204,51,0.2)`  | Border           |
| `--shadow-color: rgba(212,175,55,0.5)` | `--shadow-color: rgba(153,204,51,0.5)` | Glow             |

### Hardcoded Values Replaced

| Old Value                  | New Value | Location                        |
| -------------------------- | --------- | ------------------------------- |
| `#d4af37`                  | `#D4AF37` | Liquid-bg orb, duplicate vars   |
| `#c49a3a`                  | `#C49A1A` | Liquid-bg orb gradient end      |
| `#8b7355`                  | `#003333` | Liquid-bg orb gradient start    |
| `#1f1c12`                  | `#1A1A1A` | Coin-back gradient start        |
| `#1a1a1a` (text on accent) | `#1A1A1A` | Dark text on soft blue elements |
| `#1a1a2e`                  | `#1A1A1A` | Exp toggle hover text           |
| `#111`                     | `#0D0D0D` | Project preview box bg          |

### Light Mode Changes

| Context         | Old       | New       |
| --------------- | --------- | --------- |
| Background      | `#f5f5f0` | `#F5F0E8` |
| Accent (WCAG)   | `#d4af37` | `#D4AF37` |
| Text            | `#1a1a1a` | `#1A1A1A` |
| edu-institution | `#8b6914` | `#D4AF37` |
| edu-badge text  | `#7a5c00` | `#D4AF37` |

---

## Files Modified

| File                            | Change Type              | Risk    |
| ------------------------------- | ------------------------ | ------- |
| `styles/style.css`              | Colour token replacement | Low     |
| `styles/about.css`              | Light mode accent fixes  | Low     |
| `index.html`                    | theme-color meta tag     | Minimal |
| `scripts/app.js`                | Comment update only      | None    |
| `README.md`                     | Documentation update     | None    |
| `docs/DESIGN_SYSTEM.md`         | Documentation update     | None    |
| `docs/ACCESSIBILITY.md`         | Documentation update     | None    |
| `docs/PROJECT_EDITING_GUIDE.md` | Documentation update     | None    |
| `CHANGELOG.md`                  | Documentation update     | None    |

---

## Rollback Procedure

To revert to Gold Noir, replace the `:root` block in `styles/style.css` with:

```css
:root {
  --bg-dark: #1a1a1a;
  --text-dark: #e8e8e8;
  --accent-dark: #d4af37;
  --accent-light: #f0d896;
  --accent-rgb: 212, 175, 55;
  --glass-dark: rgba(255, 255, 255, 0.05);
  --border-dark: rgba(212, 175, 55, 0.2);
  --shadow-color: rgba(212, 175, 55, 0.5);
  --spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

Then restore the `styles/about.css` light mode values and the liquid-bg gradient colours.
Full rollback is achievable in under 10 minutes from this guide.

---

## Validation Checklist

After applying the migration, verify:

- [ ] Home page renders with deep noir black background
- [ ] Accent elements (borders, icons, glows) appear lime-green
- [ ] Liquid-bg orbs show green gradient blobs
- [ ] Coin-back face shows deep noir gradient (not warm gold)
- [ ] Light mode toggle switches to warm ivory surfaces
- [ ] Light mode accent text is dark green (not warm gold - accessibility)
- [ ] Certifications modal accent is green
- [ ] Skills category buttons show green active state
- [ ] Navigation active state underline is green
- [ ] Contact form focus rings are green
- [ ] Testimonial cards have green-tinted borders
- [ ] Footer social icons respond with green glow
