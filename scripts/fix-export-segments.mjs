/**
 * Works around a Next.js 16 static-export bug on Windows.
 *
 * The exporter names segment prefetch files with segmentPath.replace(/\//g, "."), but on Windows the
 * collected paths use backslashes, so files land in nested folders (__next.projects/$d$slug/__PAGE__.txt)
 * while the client requests the flat name (__next.projects.$d$slug.__PAGE__.txt) and gets a 404.
 * Linux and macOS builds (including the GitHub Pages workflow) are unaffected, so this is a no-op there.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
let moved = 0;

async function collect(dir, prefix, files) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await collect(full, name, files);
    else files.push({ from: full, name });
  }
  return files;
}

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      const files = await collect(full, entry.name, []);
      for (const file of files) await fs.copyFile(file.from, path.join(dir, file.name));
      await fs.rm(full, { recursive: true, force: true });
      moved += files.length;
    } else {
      await walk(full);
    }
  }
}

try {
  await walk(outDir);
  if (moved) console.log(`[fix-export-segments] Flattened ${moved} segment file(s).`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
