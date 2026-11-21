// Lanternlight — Spot the Difference (make.fun entry program).
// Node 22, standard library only. This program hands the game in: it copies the
// static game/ folder and the maker screenshots/ beside it into the output
// directory, then writes dossier.json there with the kit's vendored library.
// The grader runs it twice; both runs must write identical bytes, so every
// step below is a plain deterministic copy — no timestamps, no randomness.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

// Where the repository lives on disk, and where the entry goes.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate's caps, as the kit's reference states them: the dossier text is
// capped, screenshots are at most four files of 256 KiB, and game/ stays
// under 993 entries and 48 MiB. Enforcing them here keeps a bad build from
// ever reaching the scorer.
const DOSSIER_TEXT_MAX_BYTES = 163840;
const SCREENSHOT_MAX_FILES = 4;
const SCREENSHOT_MAX_BYTES = 262144;
const GAME_MAX_FILES = 993;
const GAME_MAX_BYTES = 50331648;
const GAME_PATH_MAX_BYTES = 1000;

function countEntries(dir) {
  let total = 0;
  for (const name of readdirSync(dir)) {
    total += 1;
    const child = join(dir, name);
    if (statSync(child).isDirectory()) total += countEntries(child);
  }
  return total;
}

function totalBytes(dir) {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const child = join(dir, name);
    const info = statSync(child);
    total += info.isDirectory() ? totalBytes(child) : info.size;
  }
  return total;
}

function checkGameTree(gameDir) {
  if (countEntries(gameDir) > GAME_MAX_FILES) throw new Error('game/ holds too many files');
  if (totalBytes(gameDir) > GAME_MAX_BYTES) throw new Error('game/ is too large');
}

function checkScreenshots(shotsDir) {
  if (!existsSync(shotsDir)) return;
  const files = readdirSync(shotsDir).filter((n) => !n.startsWith('.'));
  if (files.length > SCREENSHOT_MAX_FILES) throw new Error('too many screenshots');
  for (const name of files) {
    if (statSync(join(shotsDir, name)).size > SCREENSHOT_MAX_BYTES) {
      throw new Error(`screenshot too large: ${name}`);
    }
  }
}

mkdirSync(outputDir, { recursive: true });

const gameDir = join(repoRoot, 'game');
checkGameTree(gameDir);
cpSync(gameDir, join(outputDir, 'game'), { recursive: true });

const shotsDir = join(repoRoot, 'screenshots');
checkScreenshots(shotsDir);
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: DOSSIER_TEXT_MAX_BYTES,
    screenshots: { max: SCREENSHOT_MAX_FILES, max_bytes: SCREENSHOT_MAX_BYTES },
    game_max_files: GAME_MAX_FILES,
    game_max_bytes: GAME_MAX_BYTES,
    game_path_max_bytes: GAME_PATH_MAX_BYTES,
  }),
);

console.log(`Lanternlight handed in to ${outputDir}`);
