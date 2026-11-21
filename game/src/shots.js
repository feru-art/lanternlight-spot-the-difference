// Lanternlight — screenshot presets: ?shot=cover|market|garden|win|start pins the
// game to one exact, deterministic state, so the maker's screenshots are real
// renders of the game's own code and identical every time they are taken.
// These presets exist only for screenshots; normal play never uses them.

import { startLanternlightScene } from './engine.js';

const LANTERNLIGHT_SHOT_PRESETS = {
  // The cover: scene 1 mid-hunt — three differences found (gold rings on both
  // panels), three still hiding, counter and timer big and readable.
  cover: { scene: 0, found: [0, 1, 2], secondsLeft: 58, phase: 'play', score: 320 },
  // Scene 2 mid-hunt, three found.
  market: { scene: 1, found: [0, 1, 2], secondsLeft: 95, phase: 'play', score: 310 },
  // Scene 3 nearly done, six found, clock running low.
  garden: { scene: 2, found: [0, 1, 2, 3, 4, 5], secondsLeft: 48, phase: 'play', score: 650 },
  // The victory card after all three scenes.
  win: { scene: 2, found: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], secondsLeft: 41, phase: 'victory', score: 2450 },
  // The title screen.
  start: { scene: 0, found: [], secondsLeft: 90, phase: 'title', score: 0 },
};

// Apply one preset to a fresh state. Returns the frozen animation time the
// renderer must use, so the shot is byte-stable across runs.
export function applyLanternlightShot(state, name) {
  const preset = LANTERNLIGHT_SHOT_PRESETS[name];
  if (!preset) return null;
  startLanternlightScene(state, preset.scene);
  state.found = state.scene.differences.map((_, i) => preset.found.includes(i));
  state.latestFound = preset.found.length ? preset.found[preset.found.length - 1] : -1;
  state.timeLeftMs = preset.secondsLeft * 1000;
  state.score = preset.score;
  state.sceneScore = preset.score;
  state.phase = preset.phase;
  return 1000;
}

export function lanternlightShotNames() {
  return Object.keys(LANTERNLIGHT_SHOT_PRESETS);
}
