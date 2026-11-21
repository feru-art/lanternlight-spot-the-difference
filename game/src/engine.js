// Lanternlight — the game itself: state, clicks, timer, hints and scoring.
// One clear job: decide what happens. Drawing lives in render.js, sounds in
// audio.js. Nothing here touches the DOM except through the canvas the caller
// passes in.

import {
  LANTERNLIGHT_BOTTOM_BAR_Y,
  LANTERNLIGHT_COMBO_BONUS,
  LANTERNLIGHT_FIND_POINTS,
  LANTERNLIGHT_FIND_RADIUS,
  LANTERNLIGHT_HINT_COOLDOWN_MS,
  LANTERNLIGHT_HINT_SHOW_MS,
  LANTERNLIGHT_HINTS_PER_SCENE,
  LANTERNLIGHT_LEFT_PANEL_X,
  LANTERNLIGHT_PANEL_HEIGHT,
  LANTERNLIGHT_PANEL_WIDTH,
  LANTERNLIGHT_PANEL_Y,
  LANTERNLIGHT_RIGHT_PANEL_X,
  LANTERNLIGHT_WRONG_FLASH_MS,
} from './config.js';
import { lanternlightDifferencePoints } from './scenes.js';
import { lanternlightHudButtons } from './render.js';

// A fresh game: title screen, first scene loaded, nothing found yet.
export function createLanternlightState(scenes) {
  return {
    scenes,
    sceneIndex: 0,
    scene: scenes[0],
    found: scenes[0].differences.map(() => false),
    latestFound: -1,
    phase: 'title',
    timeLeftMs: scenes[0].parSeconds * 1000,
    strikes: 0,
    totalStrikes: 0,
    hintsLeft: LANTERNLIGHT_HINTS_PER_SCENE,
    hintPoint: null,
    hintUntil: 0,
    hintReadyAt: 0,
    wrongPoint: null,
    wrongUntil: 0,
    wrongSide: 'left',
    score: 0,
    sceneScore: 0,
    combo: 0,
    overlayButtons: [],
  };
}

export function startLanternlightScene(state, index) {
  const scene = state.scenes[index];
  state.sceneIndex = index;
  state.scene = scene;
  state.found = scene.differences.map(() => false);
  state.latestFound = -1;
  state.timeLeftMs = scene.parSeconds * 1000;
  state.strikes = 0;
  state.hintsLeft = LANTERNLIGHT_HINTS_PER_SCENE;
  state.hintPoint = null;
  state.wrongPoint = null;
  state.sceneScore = 0;
  state.combo = 0;
  state.phase = 'play';
}

function panelPointFromCanvas(state, x, y) {
  if (y < LANTERNLIGHT_PANEL_Y || y > LANTERNLIGHT_PANEL_Y + LANTERNLIGHT_PANEL_HEIGHT) return null;
  if (x >= LANTERNLIGHT_LEFT_PANEL_X && x <= LANTERNLIGHT_LEFT_PANEL_X + LANTERNLIGHT_PANEL_WIDTH) {
    return { side: 'left', x: x - LANTERNLIGHT_LEFT_PANEL_X, y: y - LANTERNLIGHT_PANEL_Y };
  }
  if (x >= LANTERNLIGHT_RIGHT_PANEL_X && x <= LANTERNLIGHT_RIGHT_PANEL_X + LANTERNLIGHT_PANEL_WIDTH) {
    return { side: 'right', x: x - LANTERNLIGHT_RIGHT_PANEL_X, y: y - LANTERNLIGHT_PANEL_Y };
  }
  return null;
}

function pointInRect(x, y, r) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

function useLanternlightHint(state, now) {
  if (state.phase !== 'play') return;
  if (state.hintsLeft <= 0 || now < state.hintReadyAt) return;
  const remaining = state.found.map((f, i) => (f ? -1 : i)).filter((i) => i >= 0);
  if (remaining.length === 0) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  const point = lanternlightDifferencePoints(state.scene)[pick];
  state.hintPoint = point;
  state.hintUntil = now + LANTERNLIGHT_HINT_SHOW_MS;
  state.hintReadyAt = now + LANTERNLIGHT_HINT_COOLDOWN_MS;
  state.hintsLeft -= 1;
}

function finishLanternlightScene(state, now) {
  const timeBonus = Math.ceil(state.timeLeftMs / 1000) * 5;
  state.sceneScore += timeBonus;
  state.score += timeBonus;
  state.phase = 'scene-complete';
}

function clickLanternlightDifference(state, point, now, audio) {
  const points = lanternlightDifferencePoints(state.scene);
  for (let i = 0; i < points.length; i += 1) {
    if (state.found[i]) continue;
    const dx = points[i].x - point.x;
    const dy = points[i].y - point.y;
    if (dx * dx + dy * dy <= LANTERNLIGHT_FIND_RADIUS * LANTERNLIGHT_FIND_RADIUS) {
      state.found[i] = true;
      state.latestFound = i;
      state.combo += 1;
      const gained = LANTERNLIGHT_FIND_POINTS + (state.combo - 1) * LANTERNLIGHT_COMBO_BONUS;
      state.score += gained;
      state.sceneScore += gained;
      audio.playFoundChime();
      if (state.found.every(Boolean)) {
        audio.playSceneCompleteArpeggio();
        finishLanternlightScene(state, now);
      }
      return true;
    }
  }
  return false;
}

// One click, in canvas coordinates. Returns nothing; the state is the result.
export function handleLanternlightClick(state, x, y, now, audio) {
  for (const b of state.overlayButtons) {
    if (pointInRect(x, y, b)) {
      if (b.id === 'start') {
        startLanternlightScene(state, 0);
      } else if (b.id === 'next') {
        startLanternlightScene(state, state.sceneIndex + 1);
      } else if (b.id === 'finish') {
        state.phase = 'victory';
      } else if (b.id === 'again') {
        state.score = 0;
        state.totalStrikes = 0;
        startLanternlightScene(state, 0);
      } else if (b.id === 'retry') {
        startLanternlightScene(state, state.sceneIndex);
      } else if (b.id === 'resume') {
        state.phase = 'play';
      }
      return;
    }
  }
  if (state.phase === 'play') {
    for (const b of lanternlightHudButtons(state)) {
      if (!b.disabled && pointInRect(x, y, b)) {
        if (b.id === 'hint') useLanternlightHint(state, now);
        if (b.id === 'pause') state.phase = 'paused';
        return;
      }
    }
    const panelPoint = panelPointFromCanvas(state, x, y);
    if (!panelPoint) return;
    const hit = clickLanternlightDifference(state, panelPoint, now, audio);
    if (!hit) {
      state.strikes += 1;
      state.totalStrikes += 1;
      state.combo = 0;
      state.wrongPoint = { x: panelPoint.x, y: panelPoint.y };
      state.wrongSide = panelPoint.side;
      state.wrongUntil = now + LANTERNLIGHT_WRONG_FLASH_MS;
      audio.playWrongThud();
    }
  } else if (state.phase === 'paused') {
    for (const b of lanternlightHudButtons(state)) {
      if (!b.disabled && pointInRect(x, y, b) && b.id === 'pause') {
        state.phase = 'play';
      }
    }
  }
}

// One key press. Returns nothing; the state is the result.
export function handleLanternlightKey(state, key, now) {
  const k = key.toLowerCase();
  if (k === 'h') {
    useLanternlightHint(state, now);
  } else if (k === 'p') {
    if (state.phase === 'play') state.phase = 'paused';
    else if (state.phase === 'paused') state.phase = 'play';
  } else if (k === 'r') {
    if (state.phase === 'play' || state.phase === 'time-up' || state.phase === 'paused') {
      startLanternlightScene(state, state.sceneIndex);
    }
  } else if (k === '1' || k === '2' || k === '3') {
    const index = Number(k) - 1;
    if (index < state.scenes.length) startLanternlightScene(state, index);
  } else if ((k === 'enter' || k === ' ') && state.phase === 'title') {
    startLanternlightScene(state, 0);
  }
}

// Advance the clock by deltaMs. Only the play phase counts time down.
export function tickLanternlightClock(state, deltaMs) {
  if (state.phase !== 'play') return;
  state.timeLeftMs -= deltaMs;
  if (state.timeLeftMs <= 0) {
    state.timeLeftMs = 0;
    state.phase = 'time-up';
  }
}

export { LANTERNLIGHT_BOTTOM_BAR_Y };
