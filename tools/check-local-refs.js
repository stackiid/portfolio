#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const HTML_FILES = ["index.html", "pages/about.html", "pages/services.html"];
const CSS_FILES = ["styles/style.css", "styles/about.css"];
const JS_FILES = [
  "scripts/app.js",
  "scripts/projects-data.js",
  "scripts/skills-data.js",
  "scripts/experience-data.js",
  "scripts/collaboration-config.js",
  "scripts/collaboration-render.js",
  "scripts/collaboration-slider.js",
  "scripts/collaboration-events.js",
  "scripts/testimonials-data.js",
  "scripts/certification-modal-logic.js",
  "scripts/document-modal.js",
  "scripts/contact-form-validation.js",
];

let errors = 0;
let checked = 0;

function isExternalOrSkippable(ref) {
  if (!ref) return true;
  return (
    ref.startsWith("http://") ||
    ref.startsWith("https://") ||
    ref.startsWith("//") ||
    ref.startsWith("mailto:") ||
    ref.startsWith("tel:") ||
    ref.startsWith("data:") ||
    ref.startsWith("#") ||
    ref.startsWith("javascript:")
  );
}

function resolveRef(fromFile, ref, baseDir) {
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean) return null;
  const dir = baseDir || path.dirname(path.join(ROOT, fromFile));
  return path.resolve(dir, clean);
}

function checkRef(fromFile, ref, context, baseDir) {
  if (isExternalOrSkippable(ref)) return;
  checked++;
  const resolved = resolveRef(fromFile, ref, baseDir);
  if (!resolved || !fs.existsSync(resolved)) {
    errors++;
    console.error(`  BROKEN: ${fromFile} -> "${ref}" (${context})`);
    console.error(`          resolved to: ${resolved}`);
  }
}

function scanHtml(file) {
  const full = path.join(ROOT, file);
  const text = fs.readFileSync(full, "utf-8");
  const attrPattern = /(?:src|href)\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = attrPattern.exec(text))) {
    checkRef(file, m[1], "html attribute");
  }
}

function scanCss(file) {
  const full = path.join(ROOT, file);
  const text = fs.readFileSync(full, "utf-8");
  const urlPattern = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
  let m;
  while ((m = urlPattern.exec(text))) {
    checkRef(file, m[1], "css url()");
  }
}

function scanJs(file) {
  const full = path.join(ROOT, file);
  const text = fs.readFileSync(full, "utf-8");
  const pathPattern = /["'](\.{1,2}\/[^"'`]+|assets\/[^"'`]+)["']/g;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("//")) return;
    const codePart = line.split(/\s\/\/(?!\d)/)[0];
    let m;
    const localPattern = new RegExp(pathPattern.source, "g");
    while ((m = localPattern.exec(codePart))) {
      const ref = m[1];
      if (ref.includes("${")) continue;
      checkRef(file, ref, `js string literal (line ${i + 1})`, ROOT);
    }
  });
}

console.log("Checking local file references...\n");

for (const f of HTML_FILES) scanHtml(f);
for (const f of CSS_FILES) scanCss(f);
for (const f of JS_FILES) scanJs(f);

console.log(
  `Checked ${checked} local references across ${HTML_FILES.length + CSS_FILES.length + JS_FILES.length} files.`,
);

if (errors > 0) {
  console.error(`\n${errors} broken reference(s) found.`);
  process.exit(1);
} else {
  console.log("All local references resolve correctly.");
  process.exit(0);
}
