// Lanternlight — bootstrap: size the canvas, run the frame loop, and wire
// mouse, touch and keyboard to the engine. One clear job: connect the game
// to the browser and nothing else.

import { createLanternlightAudio } from './audio.js';
import {
  LANTERNLIGHT_CANVAS_HEIGHT,
  LANTERNLIGHT_CANVAS_WIDTH,
} from './config.js';
import {
  createLanternlightState,
  handleLanternlightClick,
  handleLanternlightKey,
  tickLanternlightClock,
} from './engine.js';
import {
  drawLanternlightBottomBar,
  drawLanternlightHud,
  drawLanternlightOverlay,
  drawLanternlightScenePanel,
} from './render.js';
import { LANTERNLIGHT_SCENES } from './scenes.js';
import { applyLanternlightShot } from './shots.js';

const canvas = document.getElementById('game');
const statusLine = document.getElementById('status');
const ctx = canvas.getContext('2d');
canvas.width = LANTERNLIGHT_CANVAS_WIDTH;
canvas.height = LANTERNLIGHT_CANVAS_HEIGHT;

const audio = createLanternlightAudio();
const state = createLanternlightState(LANTERNLIGHT_SCENES);

const shotName = new URLSearchParams(window.location.search).get('shot');
const frozenTime = shotName ? applyLanternlightShot(state, shotName) : null;

function canvasPointFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = LANTERNLIGHT_CANVAS_WIDTH / rect.width;
  const scaleY = LANTERNLIGHT_CANVAS_HEIGHT / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function announceLanternlightStatus() {
  const foundCount = state.found.filter(Boolean).length;
  statusLine.textContent =
    `${state.scene.name}: ${foundCount} of ${state.scene.differences.length} differences found. ` +
    `Score ${state.score}. ${state.phase}.`;
}

canvas.addEventListener('pointerdown', (event) => {
  audio.unlockOnFirstGesture();
  const point = canvasPointFromEvent(event);
  handleLanternlightClick(state, point.x, point.y, performance.now(), audio);
  announceLanternlightStatus();
});

window.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key.startsWith('Arrow')) event.preventDefault();
  handleLanternlightKey(state, event.key, performance.now());
  announceLanternlightStatus();
});

let lastFrameAt = performance.now();

function drawLanternlightFrame(now) {
  const deltaMs = Math.min(100, now - lastFrameAt);
  lastFrameAt = now;
  if (frozenTime === null) tickLanternlightClock(state, deltaMs);
  const renderNow = frozenTime ?? now;

  ctx.clearRect(0, 0, LANTERNLIGHT_CANVAS_WIDTH, LANTERNLIGHT_CANVAS_HEIGHT);
  ctx.fillStyle = '#141021';
  ctx.fillRect(0, 0, LANTERNLIGHT_CANVAS_WIDTH, LANTERNLIGHT_CANVAS_HEIGHT);
  drawLanternlightHud(ctx, state);
  const panelOpts = {
    latestFound: state.latestFound,
    hintPoint: state.hintPoint,
    hintUntil: frozenTime === null ? state.hintUntil : Number.POSITIVE_INFINITY,
    wrongPoint: state.wrongPoint,
    wrongUntil: frozenTime === null ? state.wrongUntil : 0,
    frozenTime: renderNow,
  };
  // In a frozen shot the hint ring would hide a difference; never show it.
  if (frozenTime !== null) panelOpts.hintPoint = null;
  drawLanternlightScenePanel(ctx, state.scene, 'left', state.found, panelOpts);
  drawLanternlightScenePanel(ctx, state.scene, 'right', state.found, panelOpts);
  drawLanternlightBottomBar(ctx, state);
  state.overlayButtons = drawLanternlightOverlay(ctx, state);
  if (frozenTime === null) requestAnimationFrame(drawLanternlightFrame);
}

announceLanternlightStatus();
if (frozenTime !== null) {
  drawLanternlightFrame(1000);
} else {
  requestAnimationFrame(drawLanternlightFrame);
}
