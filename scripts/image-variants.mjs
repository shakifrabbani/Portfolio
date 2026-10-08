/**
 * Builds smaller copies of the project posters for responsive images.
 *
 * The static export cannot resize images on request, so for every poster in public/projects this writes
 * `<name>-w640.webp`, `-w960.webp` and `-w1280.webp` (only widths smaller than the original) and records
 * them in lib/image-variants.json, which lib/image-loader.ts reads to fill each <img> srcset.
 * Runs before `next dev` and `next build`; up-to-date copies are skipped, so it is fast after the first run.
 */
import { existsSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public", "projects");
const MANIFEST = path.join(ROOT, "lib", "image-variants.json");
const WIDTHS = [640, 960, 1280];
const VARIANT = /-w\d+\.webp$/;

const sources = readdirSync(DIR).filter((f) => f.endsWith(".webp") && !VARIANT.test(f));
const manifest = {};
let written = 0;

for (const file of sources) {
  const src = path.join(DIR, file);
  const { width } = await sharp(src).metadata();
  const widths = WIDTHS.filter((w) => w < width);
  for (const w of widths) {
    const out = path.join(DIR, file.replace(/\.webp$/, `-w${w}.webp`));
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
    await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 6 }).toFile(out);
    written++;
  }
  manifest[`/projects/${file}`] = widths;
}

// Remove copies whose poster no longer exists.
for (const file of readdirSync(DIR).filter((f) => VARIANT.test(f))) {
  if (!sources.includes(file.replace(VARIANT, ".webp"))) rmSync(path.join(DIR, file));
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`[image-variants] ${sources.length} poster(s), ${written} new cop${written === 1 ? "y" : "ies"}.`);
