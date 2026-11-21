// Lanternlight — shared constants: canvas size, panel geometry, timings, colours.
// One clear job: every number the game and the renderer agree on lives here.

export const LANTERNLIGHT_CANVAS_WIDTH = 1280;
export const LANTERNLIGHT_CANVAS_HEIGHT = 720;

export const LANTERNLIGHT_HUD_HEIGHT = 76;
export const LANTERNLIGHT_PANEL_Y = 88;
export const LANTERNLIGHT_PANEL_HEIGHT = 472;
export const LANTERNLIGHT_PANEL_WIDTH = 608;
export const LANTERNLIGHT_LEFT_PANEL_X = 16;
export const LANTERNLIGHT_RIGHT_PANEL_X = 656;
export const LANTERNLIGHT_BOTTOM_BAR_Y = 572;

export const LANTERNLIGHT_FIND_RADIUS = 30;
export const LANTERNLIGHT_FIND_POINTS = 100;
export const LANTERNLIGHT_COMBO_BONUS = 10;
export const LANTERNLIGHT_MAX_STRIKES = 3;
export const LANTERNLIGHT_HINTS_PER_SCENE = 3;
export const LANTERNLIGHT_HINT_COOLDOWN_MS = 5000;
export const LANTERNLIGHT_HINT_SHOW_MS = 2500;
export const LANTERNLIGHT_WRONG_FLASH_MS = 450;

export const LANTERNLIGHT_COLORS = {
  page: '#141021',
  hud: '#1d1830',
  hudLine: '#3a2f5e',
  panelFrame: '#f4e3b2',
  panelGap: '#241d3d',
  title: '#ffd76a',
  text: '#f7f2e7',
  muted: '#b9b0d6',
  foundRing: '#ffc93c',
  latestRing: '#4ade80',
  wrongMark: '#ff5a5a',
  hintRing: '#7dd3fc',
  button: '#f5a623',
  buttonText: '#241708',
  timerGood: '#4ade80',
  timerLow: '#ff5a5a',
};
