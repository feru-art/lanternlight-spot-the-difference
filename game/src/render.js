// Lanternlight — everything the player sees: the flat-vector scene objects, the
// two side-by-side panels with their found markers, the HUD and the overlays.
// The judge reads the game mostly through its screenshots, so every number
// that matters (how many to find, how many found, the time left, the hints)
// is drawn big enough to read when the screenshot is shrunk.

import {
  LANTERNLIGHT_BOTTOM_BAR_Y,
  LANTERNLIGHT_COLORS,
  LANTERNLIGHT_HUD_HEIGHT,
  LANTERNLIGHT_LEFT_PANEL_X,
  LANTERNLIGHT_PANEL_HEIGHT,
  LANTERNLIGHT_PANEL_WIDTH,
  LANTERNLIGHT_PANEL_Y,
  LANTERNLIGHT_RIGHT_PANEL_X,
} from './config.js';
import { lanternlightDifferencePoints, lanternlightPanelObjects } from './scenes.js';

const C = LANTERNLIGHT_COLORS;

function drawLanternlightSun(ctx, o) {
  ctx.save();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = o.c;
  ctx.lineWidth = 4;
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(o.x + Math.cos(a) * (o.r + 6), o.y + Math.sin(a) * (o.r + 6));
    ctx.lineTo(o.x + Math.cos(a) * (o.r + 16), o.y + Math.sin(a) * (o.r + 16));
    ctx.stroke();
  }
  ctx.restore();
}

function drawLanternlightMoon(ctx, o) {
  ctx.save();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.arc(o.x - o.r * 0.3, o.y - o.r * 0.2, o.r * 0.22, 0, Math.PI * 2);
  ctx.arc(o.x + o.r * 0.25, o.y + o.r * 0.3, o.r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightCloud(ctx, o) {
  ctx.save();
  ctx.fillStyle = o.c;
  const s = o.s;
  ctx.beginPath();
  ctx.arc(o.x - 26 * s, o.y + 6 * s, 16 * s, 0, Math.PI * 2);
  ctx.arc(o.x, o.y - 6 * s, 20 * s, 0, Math.PI * 2);
  ctx.arc(o.x + 26 * s, o.y + 6 * s, 16 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(o.x - 34 * s, o.y - 2 * s, 68 * s, 14 * s);
  ctx.restore();
}

function drawLanternlightBird(ctx, o) {
  ctx.save();
  ctx.strokeStyle = o.c;
  ctx.lineWidth = 3 * o.s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(o.x - 9 * o.s, o.y, 9 * o.s, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(o.x + 9 * o.s, o.y, 9 * o.s, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.restore();
}

function drawLanternlightStar(ctx, o) {
  ctx.save();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? o.r : o.r * 0.45;
    const px = o.x + Math.cos(a) * r;
    const py = o.y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLanternlightTree(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.trunk;
  ctx.fillRect(o.x - 7 * s, o.y - 46 * s, 14 * s, 46 * s);
  ctx.fillStyle = o.leaf;
  ctx.beginPath();
  ctx.arc(o.x, o.y - 62 * s, 34 * s, 0, Math.PI * 2);
  ctx.arc(o.x - 26 * s, o.y - 42 * s, 22 * s, 0, Math.PI * 2);
  ctx.arc(o.x + 26 * s, o.y - 42 * s, 22 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightHouse(ctx, o) {
  ctx.save();
  const s = o.s;
  const w = 62 * s;
  const h = 48 * s;
  ctx.fillStyle = o.wall;
  ctx.fillRect(o.x - w / 2, o.y - h, w, h);
  ctx.fillStyle = o.roof;
  ctx.beginPath();
  ctx.moveTo(o.x - w / 2 - 6 * s, o.y - h);
  ctx.lineTo(o.x, o.y - h - 26 * s);
  ctx.lineTo(o.x + w / 2 + 6 * s, o.y - h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#5b3a1e';
  ctx.fillRect(o.x - 7 * s, o.y - 22 * s, 14 * s, 22 * s);
  ctx.fillStyle = '#ffd76a';
  ctx.fillRect(o.x - w / 2 + 8 * s, o.y - h + 10 * s, 12 * s, 12 * s);
  ctx.fillRect(o.x + w / 2 - 20 * s, o.y - h + 10 * s, 12 * s, 12 * s);
  ctx.restore();
}

function drawLanternlightBoat(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.hull;
  ctx.beginPath();
  ctx.moveTo(o.x - 34 * s, o.y);
  ctx.lineTo(o.x + 34 * s, o.y);
  ctx.lineTo(o.x + 24 * s, o.y + 14 * s);
  ctx.lineTo(o.x - 24 * s, o.y + 14 * s);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  ctx.moveTo(o.x, o.y);
  ctx.lineTo(o.x, o.y - 42 * s);
  ctx.stroke();
  ctx.fillStyle = o.sail;
  ctx.beginPath();
  ctx.moveTo(o.x, o.y - 42 * s);
  ctx.lineTo(o.x, o.y - 4 * s);
  ctx.lineTo(o.x + 26 * s, o.y - 4 * s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLanternlightFish(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y, 14 * s, 8 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(o.x - 12 * s, o.y);
  ctx.lineTo(o.x - 22 * s, o.y - 8 * s);
  ctx.lineTo(o.x - 22 * s, o.y + 8 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#141021';
  ctx.beginPath();
  ctx.arc(o.x + 6 * s, o.y - 2 * s, 2 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightFlower(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.strokeStyle = '#2f7a33';
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  ctx.moveTo(o.x, o.y);
  ctx.lineTo(o.x, o.y - 22 * s);
  ctx.stroke();
  ctx.fillStyle = o.petal;
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(o.x + Math.cos(a) * 8 * s, o.y - 26 * s + Math.sin(a) * 8 * s, 6 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = o.center;
  ctx.beginPath();
  ctx.arc(o.x, o.y - 26 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightRock(ctx, o) {
  ctx.save();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y, 18 * o.s, 11 * o.s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath();
  ctx.ellipse(o.x - 5 * o.s, o.y - 4 * o.s, 8 * o.s, 4 * o.s, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightLantern(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.strokeStyle = 'rgba(20,16,33,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(o.x, 0);
  ctx.lineTo(o.x, o.y - 18 * s);
  ctx.stroke();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y, 14 * s, 18 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(o.x - 4 * s, o.y - 5 * s, 4 * s, 7 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd76a';
  ctx.fillRect(o.x - 5 * s, o.y - 22 * s, 10 * s, 4 * s);
  ctx.fillRect(o.x - 5 * s, o.y + 18 * s, 10 * s, 4 * s);
  ctx.restore();
}

function drawLanternlightLighthouse(ctx, o) {
  ctx.save();
  const s = o.s;
  const top = o.y - 104 * s;
  ctx.fillStyle = '#f7f2e7';
  ctx.beginPath();
  ctx.moveTo(o.x - 14 * s, o.y);
  ctx.lineTo(o.x - 9 * s, top);
  ctx.lineTo(o.x + 9 * s, top);
  ctx.lineTo(o.x + 14 * s, o.y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = o.stripe;
  ctx.fillRect(o.x - 12 * s, o.y - 30 * s, 24 * s, 14 * s);
  ctx.fillRect(o.x - 10 * s, o.y - 66 * s, 20 * s, 14 * s);
  ctx.fillStyle = '#2b1d4e';
  ctx.fillRect(o.x - 12 * s, top - 14 * s, 24 * s, 14 * s);
  ctx.fillStyle = '#ffd76a';
  ctx.beginPath();
  ctx.arc(o.x, top - 14 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightCrate(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.c;
  ctx.fillRect(o.x - 16 * s, o.y - 16 * s, 32 * s, 32 * s);
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(o.x - 16 * s, o.y - 16 * s, 32 * s, 32 * s);
  ctx.beginPath();
  ctx.moveTo(o.x - 16 * s, o.y - 16 * s);
  ctx.lineTo(o.x + 16 * s, o.y + 16 * s);
  ctx.moveTo(o.x + 16 * s, o.y - 16 * s);
  ctx.lineTo(o.x - 16 * s, o.y + 16 * s);
  ctx.stroke();
  ctx.restore();
}

function drawLanternlightCat(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y - 10 * s, 16 * s, 14 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(o.x + 4 * s, o.y - 30 * s, 11 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(o.x - 4 * s, o.y - 38 * s);
  ctx.lineTo(o.x - 1 * s, o.y - 48 * s);
  ctx.lineTo(o.x + 3 * s, o.y - 38 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(o.x + 8 * s, o.y - 38 * s);
  ctx.lineTo(o.x + 12 * s, o.y - 48 * s);
  ctx.lineTo(o.x + 15 * s, o.y - 38 * s);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = o.c;
  ctx.lineWidth = 4 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(o.x + 14 * s, o.y - 4 * s);
  ctx.quadraticCurveTo(o.x + 26 * s, o.y - 6 * s, o.x + 24 * s, o.y - 20 * s);
  ctx.stroke();
  ctx.restore();
}

function drawLanternlightStall(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.wall;
  ctx.fillRect(o.x - 46 * s, o.y - 30 * s, 92 * s, 62 * s);
  ctx.fillStyle = o.awning;
  ctx.beginPath();
  ctx.moveTo(o.x - 52 * s, o.y - 30 * s);
  ctx.lineTo(o.x + 52 * s, o.y - 30 * s);
  ctx.lineTo(o.x + 52 * s, o.y - 52 * s);
  ctx.lineTo(o.x - 52 * s, o.y - 52 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = -2; i <= 2; i += 2) {
    ctx.fillRect(o.x + i * 20 * s - 10 * s, o.y - 52 * s, 20 * s, 22 * s);
  }
  ctx.fillStyle = '#ffd76a';
  ctx.fillRect(o.x - 30 * s, o.y - 18 * s, 18 * s, 12 * s);
  ctx.fillRect(o.x - 4 * s, o.y - 18 * s, 18 * s, 12 * s);
  ctx.fillStyle = '#ff7ab8';
  ctx.beginPath();
  ctx.arc(o.x + 28 * s, o.y - 10 * s, 8 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightFirefly(ctx, o, now) {
  ctx.save();
  const glow = 0.55 + 0.45 * Math.sin(now / 300 + o.x);
  ctx.fillStyle = o.c;
  ctx.globalAlpha = glow;
  ctx.beginPath();
  ctx.arc(o.x, o.y, 5 * o.s, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = glow * 0.3;
  ctx.beginPath();
  ctx.arc(o.x, o.y, 11 * o.s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightButterfly(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x - 9 * s, o.y - 4 * s, 10 * s, 13 * s, -0.5, 0, Math.PI * 2);
  ctx.ellipse(o.x + 9 * s, o.y - 4 * s, 10 * s, 13 * s, 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.arc(o.x - 8 * s, o.y - 8 * s, 3 * s, 0, Math.PI * 2);
  ctx.arc(o.x + 8 * s, o.y - 8 * s, 3 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b1d4e';
  ctx.fillRect(o.x - 2 * s, o.y - 12 * s, 4 * s, 22 * s);
  ctx.restore();
}

function drawLanternlightFrog(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.fillStyle = '#3f9e4d';
  ctx.beginPath();
  ctx.ellipse(o.x, o.y + 8 * s, 26 * s, 8 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = o.c;
  ctx.beginPath();
  ctx.ellipse(o.x, o.y, 16 * s, 12 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(o.x - 8 * s, o.y - 12 * s, 6 * s, 0, Math.PI * 2);
  ctx.arc(o.x + 8 * s, o.y - 12 * s, 6 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#141021';
  ctx.beginPath();
  ctx.arc(o.x - 8 * s, o.y - 13 * s, 2.5 * s, 0, Math.PI * 2);
  ctx.arc(o.x + 8 * s, o.y - 13 * s, 2.5 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLanternlightBridge(ctx, o) {
  ctx.save();
  const s = o.s;
  ctx.strokeStyle = o.c;
  ctx.lineWidth = 10 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(o.x - 52 * s, o.y + 14 * s);
  ctx.quadraticCurveTo(o.x, o.y - 34 * s, o.x + 52 * s, o.y + 14 * s);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 2 * s;
  for (let i = -2; i <= 2; i += 1) {
    const t = i / 2;
    const bx = o.x + t * 52 * s;
    const by = o.y + 14 * s - (1 - t * t) * 24 * s;
    ctx.beginPath();
    ctx.moveTo(bx, by - 6 * s);
    ctx.lineTo(bx, by + 6 * s);
    ctx.stroke();
  }
  ctx.restore();
}

const LANTERNLIGHT_OBJECT_DRAWERS = {
  sun: drawLanternlightSun,
  moon: drawLanternlightMoon,
  cloud: drawLanternlightCloud,
  bird: drawLanternlightBird,
  star: drawLanternlightStar,
  tree: drawLanternlightTree,
  house: drawLanternlightHouse,
  boat: drawLanternlightBoat,
  fish: drawLanternlightFish,
  flower: drawLanternlightFlower,
  rock: drawLanternlightRock,
  lantern: drawLanternlightLantern,
  lighthouse: drawLanternlightLighthouse,
  crate: drawLanternlightCrate,
  cat: drawLanternlightCat,
  stall: drawLanternlightStall,
  firefly: drawLanternlightFirefly,
  butterfly: drawLanternlightButterfly,
  frog: drawLanternlightFrog,
  bridge: drawLanternlightBridge,
};

function drawLanternlightObject(ctx, o, now) {
  if (o.hide) return;
  const drawer = LANTERNLIGHT_OBJECT_DRAWERS[o.k];
  if (drawer) drawer(ctx, o, now);
}

function drawLanternlightSceneBackground(ctx, scene, px, py) {
  const grad = ctx.createLinearGradient(0, py, 0, py + LANTERNLIGHT_PANEL_HEIGHT);
  grad.addColorStop(0, scene.sky[0]);
  grad.addColorStop(1, scene.sky[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(px, py, LANTERNLIGHT_PANEL_WIDTH, LANTERNLIGHT_PANEL_HEIGHT);
  if (scene.water) {
    ctx.fillStyle = scene.water.color;
    ctx.fillRect(px, py + scene.water.y, LANTERNLIGHT_PANEL_WIDTH, scene.water.h);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      const wy = py + scene.water.y + 14 + i * 20;
      ctx.beginPath();
      for (let x = 0; x <= LANTERNLIGHT_PANEL_WIDTH; x += 16) {
        const yy = wy + Math.sin((x / 46) + i * 2) * 3;
        if (x === 0) ctx.moveTo(px + x, yy);
        else ctx.lineTo(px + x, yy);
      }
      ctx.stroke();
    }
  }
  ctx.fillStyle = scene.ground;
  ctx.fillRect(px, py + scene.groundY, LANTERNLIGHT_PANEL_WIDTH, LANTERNLIGHT_PANEL_HEIGHT - scene.groundY);
  // The pond sits on the grass, so it is painted after the ground, not under it.
  if (scene.pond) {
    ctx.fillStyle = scene.pond.color;
    ctx.beginPath();
    ctx.ellipse(px + scene.pond.x, py + scene.pond.y, scene.pond.rx, scene.pond.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(px + scene.pond.x - 40, py + scene.pond.y - 8, 60, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawLanternlightFoundMarker(ctx, x, y, latest, now) {
  ctx.save();
  const pulse = latest ? 1 + 0.12 * Math.sin(now / 220) : 1;
  ctx.strokeStyle = latest ? C.latestRing : C.foundRing;
  ctx.lineWidth = latest ? 6 : 5;
  ctx.beginPath();
  ctx.arc(x, y, 26 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 30 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = latest ? C.latestRing : C.foundRing;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 9, y + 1);
  ctx.lineTo(x - 2, y + 8);
  ctx.lineTo(x + 10, y - 7);
  ctx.stroke();
  ctx.restore();
}

// One panel of the game: background, objects, found markers, hint shimmer.
export function drawLanternlightScenePanel(ctx, scene, side, found, opts) {
  const px = side === 'left' ? LANTERNLIGHT_LEFT_PANEL_X : LANTERNLIGHT_RIGHT_PANEL_X;
  const py = LANTERNLIGHT_PANEL_Y;
  const now = opts.frozenTime ?? performance.now();
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, LANTERNLIGHT_PANEL_WIDTH, LANTERNLIGHT_PANEL_HEIGHT);
  ctx.clip();
  ctx.translate(px, py);
  drawLanternlightSceneBackground(ctx, scene, 0, 0);
  const objects = lanternlightPanelObjects(scene, side);
  for (const o of objects) drawLanternlightObject(ctx, o, now);
  const points = lanternlightDifferencePoints(scene);
  found.forEach((isFound, i) => {
    if (!isFound) return;
    const p = points[i];
    drawLanternlightFoundMarker(ctx, p.x, p.y, i === opts.latestFound, now);
  });
  if (opts.hintPoint && opts.hintUntil > now) {
    ctx.save();
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = C.hintRing;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(opts.hintPoint.x, opts.hintPoint.y, 34 + 4 * Math.sin(now / 180), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  if (opts.wrongPoint && opts.wrongUntil > now) {
    ctx.save();
    ctx.strokeStyle = C.wrongMark;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    const { x, y } = opts.wrongPoint;
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 12);
    ctx.lineTo(x + 12, y + 12);
    ctx.moveTo(x + 12, y - 12);
    ctx.lineTo(x - 12, y + 12);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = C.panelFrame;
  ctx.lineWidth = 3;
  ctx.strokeRect(px, py, LANTERNLIGHT_PANEL_WIDTH, LANTERNLIGHT_PANEL_HEIGHT);
  ctx.fillStyle = 'rgba(20,16,33,0.85)';
  ctx.font = 'bold 15px Trebuchet MS, Verdana, sans-serif';
  ctx.textAlign = 'center';
  const label = side === 'left' ? 'LEFT — original' : 'RIGHT — spot the changes';
  const labelW = ctx.measureText(label).width + 24;
  ctx.fillRect(px + (LANTERNLIGHT_PANEL_WIDTH - labelW) / 2, py - 2, labelW, 24);
  ctx.fillStyle = '#f7f2e7';
  ctx.fillText(label, px + LANTERNLIGHT_PANEL_WIDTH / 2, py + 15);
  ctx.restore();
}

// The HUD: title and scene on the left, the big "N to find" in the middle,
// timer, strikes and buttons on the right.
export function drawLanternlightHud(ctx, state) {
  const scene = state.scene;
  const foundCount = state.found.filter(Boolean).length;
  const remaining = scene.differences.length - foundCount;
  ctx.save();
  ctx.fillStyle = C.hud;
  ctx.fillRect(0, 0, 1280, LANTERNLIGHT_HUD_HEIGHT);
  ctx.fillStyle = C.hudLine;
  ctx.fillRect(0, LANTERNLIGHT_HUD_HEIGHT - 2, 1280, 2);

  ctx.textAlign = 'left';
  ctx.fillStyle = C.title;
  ctx.font = 'bold 26px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText('Lanternlight', 20, 32);
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(`${scene.name} · Scene ${state.sceneIndex + 1} of 3 · Par ${formatLanternlightTime(scene.parSeconds)}`, 20, 56);

  ctx.textAlign = 'center';
  ctx.fillStyle = remaining === 0 ? C.latestRing : C.title;
  ctx.font = 'bold 34px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(remaining === 0 ? 'All found!' : `${remaining} to find`, 640, 40);
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(`Found ${foundCount}/${scene.differences.length}`, 640, 62);

  const secondsLeft = Math.max(0, Math.ceil(state.timeLeftMs / 1000));
  const low = secondsLeft <= 15;
  ctx.textAlign = 'right';
  ctx.fillStyle = low ? C.timerLow : C.text;
  ctx.font = 'bold 26px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(`⏱ ${formatLanternlightTime(secondsLeft)}`, 1000, 32);
  ctx.fillStyle = low ? C.timerLow : C.timerGood;
  const barW = 150;
  const frac = Math.max(0, state.timeLeftMs / (scene.parSeconds * 1000));
  ctx.fillRect(1000 - barW, 42, barW * frac, 8);
  ctx.strokeStyle = C.muted;
  ctx.lineWidth = 1;
  ctx.strokeRect(1000 - barW, 42, barW, 8);
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(`Strikes: ${state.strikes}`, 1000, 66);

  for (const b of lanternlightHudButtons(state)) {
    ctx.fillStyle = b.disabled ? '#4a4360' : C.button;
    roundLanternlightRect(ctx, b.x, b.y, b.w, b.h, 9);
    ctx.fill();
    ctx.fillStyle = b.disabled ? '#9a93b5' : C.buttonText;
    ctx.font = 'bold 16px Trebuchet MS, Verdana, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.label, b.x + b.w / 2, b.y + 22);
  }
  ctx.restore();
}

export function lanternlightHudButtons(state) {
  return [
    { id: 'hint', label: `Hint (${state.hintsLeft})`, x: 1030, y: 14, w: 104, h: 34, disabled: state.hintsLeft <= 0 || state.phase !== 'play' },
    { id: 'pause', label: state.phase === 'paused' ? 'Resume' : 'Pause', x: 1146, y: 14, w: 104, h: 34, disabled: state.phase === 'title' || state.phase === 'victory' },
  ];
}

function formatLanternlightTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function roundLanternlightRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// The bottom bar: the row of found dots, the score and the controls reminder.
export function drawLanternlightBottomBar(ctx, state) {
  const scene = state.scene;
  ctx.save();
  ctx.fillStyle = C.hud;
  ctx.fillRect(0, LANTERNLIGHT_BOTTOM_BAR_Y, 1280, 148);
  ctx.fillStyle = C.hudLine;
  ctx.fillRect(0, LANTERNLIGHT_BOTTOM_BAR_Y, 1280, 2);
  ctx.textAlign = 'left';
  ctx.fillStyle = C.text;
  ctx.font = 'bold 20px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(`Score ${state.score}`, 20, LANTERNLIGHT_BOTTOM_BAR_Y + 34);
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(state.combo >= 2 ? `Combo ×${state.combo}` : 'Find them all before time runs out', 20, LANTERNLIGHT_BOTTOM_BAR_Y + 58);

  ctx.textAlign = 'center';
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText('Found:', 640, LANTERNLIGHT_BOTTOM_BAR_Y + 30);
  scene.differences.forEach((_, i) => {
    const cx = 640 - (scene.differences.length - 1) * 18 + i * 36;
    const cy = LANTERNLIGHT_BOTTOM_BAR_Y + 56;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fillStyle = state.found[i] ? C.latestRing : '#3a3355';
    ctx.fill();
    ctx.strokeStyle = '#6b6390';
    ctx.lineWidth = 2;
    ctx.stroke();
    if (state.found[i]) {
      ctx.strokeStyle = '#141021';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy);
      ctx.lineTo(cx - 1, cy + 4);
      ctx.lineTo(cx + 6, cy - 5);
      ctx.stroke();
    }
  });
  ctx.fillStyle = C.muted;
  ctx.font = '15px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText('Click a difference in either picture  ·  H hint  ·  P pause  ·  R restart  ·  1/2/3 scenes', 640, LANTERNLIGHT_BOTTOM_BAR_Y + 96);
  ctx.restore();
}

function drawLanternlightCard(ctx, title, lines, buttons) {
  ctx.save();
  ctx.fillStyle = 'rgba(10,7,20,0.72)';
  ctx.fillRect(0, 0, 1280, 720);
  const cw = 620;
  const ch = 150 + lines.length * 34 + (buttons.length ? 66 : 0);
  const cx = (1280 - cw) / 2;
  const cy = (720 - ch) / 2;
  ctx.fillStyle = '#221c3a';
  roundLanternlightRect(ctx, cx, cy, cw, ch, 16);
  ctx.fill();
  ctx.strokeStyle = C.panelFrame;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillStyle = C.title;
  ctx.font = 'bold 34px Trebuchet MS, Verdana, sans-serif';
  ctx.fillText(title, 640, cy + 56);
  ctx.fillStyle = C.text;
  ctx.font = '19px Trebuchet MS, Verdana, sans-serif';
  lines.forEach((line, i) => ctx.fillText(line, 640, cy + 102 + i * 34));
  buttons.forEach((b, i) => {
    const bw = 200;
    const bx = 640 - (buttons.length * (bw + 16)) / 2 + 8 + i * (bw + 16);
    const by = cy + ch - 56;
    ctx.fillStyle = C.button;
    roundLanternlightRect(ctx, bx, by, bw, 40, 10);
    ctx.fill();
    ctx.fillStyle = C.buttonText;
    ctx.font = 'bold 18px Trebuchet MS, Verdana, sans-serif';
    ctx.fillText(b.label, bx + bw / 2, by + 27);
    b.x = bx;
    b.y = by;
    b.w = bw;
    b.h = 40;
  });
  ctx.restore();
  return buttons;
}

// Overlays for the title screen, scene complete, victory, time up and pause.
// Returns the buttons drawn, so the engine can hit-test them.
export function drawLanternlightOverlay(ctx, state) {
  const scene = state.scene;
  if (state.phase === 'title') {
    return drawLanternlightCard(ctx, 'Lanternlight', [
      'Spot the difference — two pictures, changes hiding in the right one.',
      'Click a change in either picture. Find them all before time runs out.',
      'Three scenes, rising difficulty: Harbour at Noon, Lantern Festival, Autumn Garden.',
    ], [{ id: 'start', label: '▶  Start playing' }]);
  }
  if (state.phase === 'scene-complete') {
    const stars = state.strikes === 0 && state.timeLeftMs > 30000 ? '★★★' : state.strikes <= 1 ? '★★' : '★';
    return drawLanternlightCard(ctx, 'Scene complete!', [
      `${scene.name} — all ${scene.differences.length} differences found.  ${stars}`,
      `Scene score ${state.sceneScore}  ·  Total score ${state.score}`,
      state.sceneIndex < 2 ? 'A harder scene is waiting.' : 'That was the last scene!',
    ], state.sceneIndex < 2
      ? [{ id: 'next', label: 'Next scene  →' }]
      : [{ id: 'finish', label: 'See my results' }]);
  }
  if (state.phase === 'victory') {
    const total = state.scenes.reduce((n, s) => n + s.differences.length, 0);
    return drawLanternlightCard(ctx, 'You found them all!', [
      `All 3 scenes complete — ${total} differences found.  ★★★`,
      `Total score ${state.score}  ·  Strikes ${state.strikes}`,
      'Thanks for playing Lanternlight.',
    ], [{ id: 'again', label: '↻  Play again' }]);
  }
  if (state.phase === 'time-up') {
    return drawLanternlightCard(ctx, "Time's up!", [
      `${scene.name} — you found ${state.found.filter(Boolean).length} of ${scene.differences.length} differences.`,
      'The changes are still hiding in the right picture.',
    ], [{ id: 'retry', label: '↻  Try this scene again' }]);
  }
  if (state.phase === 'paused') {
    return drawLanternlightCard(ctx, 'Paused', [
      'Take a breath. The lanterns will wait.',
    ], [{ id: 'resume', label: 'Resume' }]);
  }
  return [];
}
