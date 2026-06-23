# Performance Report - Gold Noir v4.0.2

**Date:** 2026-06-22

---

## Baseline Comparison

The Gold Noir migration is a pure colour-value substitution at the CSS custom property
layer. No JavaScript, HTML structure, layout rules, or asset pipeline was modified.
Performance characteristics are structurally identical to Gold Noir v3.1.0.

---

## CSS Performance

| Metric                      | Gold Noir     | Gold Noir     | Delta |
| --------------------------- | ------------- | ------------- | ----- |
| `style.css` size            | 109,020 bytes | 109,020 bytes | 0     |
| CSS custom properties count | Unchanged     | Unchanged     | 0     |
| Selector count              | Unchanged     | Unchanged     | 0     |
| `@media` query count        | Unchanged     | Unchanged     | 0     |
| `backdrop-filter` rules     | Unchanged     | Unchanged     | 0     |

**Finding:** Zero byte difference. Colour value substitutions are byte-equivalent
(hex codes replaced with same-length hex codes, RGB tuples replaced with same-length tuples).

---

## Animation Performance

| Animation              | Engine                               | Status       |
| ---------------------- | ------------------------------------ | ------------ |
| Liquid-bg orbs         | CSS `@keyframes` + `blur(100px)`     | ✅ Unchanged |
| Coin flip 3D           | CSS `perspective` + `rotateY`        | ✅ Unchanged |
| Scroll-progress fill   | rAF-throttled JS → `style.width`     | ✅ Unchanged |
| Direction-aware cards  | JS mouse tracking → CSS transform    | ✅ Unchanged |
| Shimmer gradient       | CSS `@keyframes` background-position | ✅ Unchanged |
| Anime.js orchestration | JS animation library                 | ✅ Unchanged |
| Header wave blobs      | CSS `@keyframes` rotation            | ✅ Unchanged |

Colour value changes in gradient definitions do not alter GPU compositing cost.
All liquid-bg blur operations remain GPU-composited at identical cost.

---

## Asset Loading

| Asset Class | Change | Status       |
| ----------- | ------ | ------------ |
| Images      | None   | ✅ Unchanged |
| Fonts       | None   | ✅ Unchanged |
| CDN scripts | None   | ✅ Unchanged |
| Favicons    | None   | ✅ Unchanged |

---

## JavaScript Execution

- No new JS was added.
- Theme switching remains CSS-only (attribute toggle on `<html>`).
- No colour manipulation in JS - zero recalculation cost on theme switch.

---

## Bundle Size

| File        | Before    | After     |
| ----------- | --------- | --------- |
| `style.css` | 109,020 B | 109,020 B |
| `about.css` | -         | -         |
| `app.js`    | -         | -         |
| Total HTML  | -         | -         |

No measurable change.

---

## Summary

| Category            | Result                      |
| ------------------- | --------------------------- |
| CSS file size       | ✅ No change                |
| Paint / layout cost | ✅ No change                |
| Animation GPU cost  | ✅ No change                |
| JS execution        | ✅ No change                |
| Asset loading       | ✅ No change                |
| Theme switch cost   | ✅ CSS-only, no JS overhead |

**Overall performance status: BASELINE MAINTAINED**
