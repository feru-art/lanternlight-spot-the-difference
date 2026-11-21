// Lanternlight — scene data: three original scenes, each drawn from flat-vector
// objects, plus exactly eight fair differences per scene. A difference is one
// small change to one object (recolour, move, hide, resize) or one added
// object, and each carries the point where its marker ring is drawn. The left
// panel shows the scene as listed; the right panel shows it with every
// difference applied. Coordinates are panel-local (608 x 472).

export const LANTERNLIGHT_SCENES = [
  {
    name: 'Harbour at Noon',
    parSeconds: 75,
    sky: ['#7ec8f7', '#cfeeff'],
    groundY: 360,
    ground: '#f7e3b0',
    water: { y: 290, h: 70, color: '#2a9db5' },
    objects: [
      { k: 'sun', x: 520, y: 70, r: 36, c: '#ffdf6b' },
      { k: 'cloud', x: 110, y: 62, s: 1.0, c: '#fff6e8' },
      { k: 'cloud', x: 330, y: 46, s: 0.8, c: '#fff6e8' },
      { k: 'bird', x: 200, y: 112, s: 1.0, c: '#4a2c2a' },
      { k: 'bird', x: 282, y: 92, s: 0.8, c: '#4a2c2a' },
      { k: 'lighthouse', x: 64, y: 290, s: 1.0, stripe: '#d64545' },
      { k: 'house', x: 150, y: 420, s: 1.0, wall: '#fff3d6', roof: '#c96f4a' },
      { k: 'house', x: 252, y: 426, s: 0.9, wall: '#dbeafe', roof: '#4a6fa5' },
      { k: 'house', x: 352, y: 420, s: 1.0, wall: '#fef3c7', roof: '#7c5cbf' },
      { k: 'boat', x: 432, y: 322, s: 1.0, hull: '#d64545', sail: '#ffffff' },
      { k: 'boat', x: 118, y: 338, s: 0.7, hull: '#2e7f9e', sail: '#ffd76a' },
      { k: 'fish', x: 200, y: 318, s: 1.0, c: '#38bdf8' },
      { k: 'fish', x: 302, y: 338, s: 0.8, c: '#fb923c' },
      { k: 'crate', x: 92, y: 440, s: 1.0, c: '#9a6b3f' },
      { k: 'rock', x: 540, y: 448, s: 1.0, c: '#8d8578' },
      { k: 'rock', x: 470, y: 452, s: 0.7, c: '#a39a8a' },
      { k: 'fish', x: 380, y: 308, s: 0.7, c: '#f472b6' },
      { k: 'boat', x: 300, y: 308, s: 0.45, hull: '#7c5cbf', sail: '#ffe9a8' },
      { k: 'cloud', x: 480, y: 150, s: 0.6, c: '#ffe9c4' },
      { k: 'star', x: 560, y: 455, r: 7, c: '#ff9d76' },
    ],
    differences: [
      { x: 520, y: 70, obj: 0, change: { r: 48 } },
      { x: 330, y: 46, obj: 2, change: { hide: true } },
      { x: 322, y: 110, obj: 4, change: { x: 322, y: 110 } },
      { x: 64, y: 235, obj: 5, change: { stripe: '#2e7f9e' } },
      { x: 252, y: 390, obj: 7, change: { roof: '#e07856' } },
      { x: 302, y: 338, obj: 12, change: { hide: true } },
    ],
  },
  {
    name: 'Lantern Festival',
    parSeconds: 100,
    sky: ['#3d0c1e', '#7a1f3d'],
    groundY: 380,
    ground: '#2a0e1e',
    water: null,
    objects: [
      { k: 'moon', x: 530, y: 62, r: 30, c: '#f4ead8' },
      { k: 'star', x: 120, y: 52, r: 7, c: '#ffe9a8' },
      { k: 'star', x: 250, y: 40, r: 6, c: '#ffe9a8' },
      { k: 'star', x: 420, y: 92, r: 6, c: '#ffe9a8' },
      { k: 'lantern', x: 150, y: 86, s: 1.0, c: '#ff5a5a' },
      { k: 'lantern', x: 300, y: 74, s: 0.9, c: '#ffb020' },
      { k: 'lantern', x: 452, y: 90, s: 1.0, c: '#ff5a5a' },
      { k: 'stall', x: 96, y: 396, s: 1.0, awning: '#e05252', wall: '#7a4a21' },
      { k: 'stall', x: 286, y: 396, s: 1.0, awning: '#3f9e4d', wall: '#5b3a1e' },
      { k: 'stall', x: 468, y: 396, s: 0.9, awning: '#e0a030', wall: '#6b4423' },
      { k: 'cat', x: 200, y: 432, s: 1.0, c: '#20242e' },
      { k: 'crate', x: 548, y: 428, s: 1.0, c: '#9a6b3f' },
      { k: 'crate', x: 58, y: 428, s: 0.8, c: '#8a5a2b' },
      { k: 'flower', x: 382, y: 428, s: 1.1, petal: '#ff7ab8', center: '#ffd76a' },
      { k: 'firefly', x: 180, y: 150, s: 1.0, c: '#d9f99d' },
      { k: 'firefly', x: 360, y: 120, s: 0.8, c: '#d9f99d' },
      { k: 'star', x: 180, y: 70, r: 5, c: '#ffe9a8' },
      { k: 'star', x: 340, y: 60, r: 5, c: '#ffe9a8' },
      { k: 'lantern', x: 380, y: 96, s: 0.8, c: '#4ade80' },
    ],
    differences: [
      { x: 530, y: 62, obj: 0, change: { c: '#ffd76a' } },
      { x: 250, y: 40, obj: 2, change: { hide: true } },
      { x: 300, y: 74, obj: 5, change: { c: '#4ade80' } },
      { x: 286, y: 366, obj: 8, change: { awning: '#e05252' } },
      { x: 200, y: 432, obj: 10, change: { hide: true } },
      { x: 372, y: 430, add: { k: 'crate', x: 372, y: 430, s: 0.9, c: '#9a6b3f' } },
      { x: 220, y: 180, obj: 14, change: { x: 220, y: 180 } },
      { x: 382, y: 400, obj: 13, change: { petal: '#ffd76a' } },
    ],
  },
  {
    name: 'Autumn Garden',
    parSeconds: 130,
    sky: ['#ffe0b3', '#ffd0a0'],
    groundY: 300,
    ground: '#c98f3d',
    water: null,
    pond: { x: 304, y: 392, rx: 220, ry: 58, color: '#5aa8d8' },
    objects: [
      { k: 'sun', x: 90, y: 66, r: 34, c: '#ffdf6b' },
      { k: 'cloud', x: 280, y: 56, s: 0.9, c: '#ffffff' },
      { k: 'cloud', x: 470, y: 44, s: 0.7, c: '#ffffff' },
      { k: 'bird', x: 200, y: 96, s: 1.0, c: '#3a2e2a' },
      { k: 'bird', x: 350, y: 120, s: 0.8, c: '#3a2e2a' },
      { k: 'tree', x: 80, y: 300, s: 1.1, trunk: '#7a4a21', leaf: '#3f9e4d' },
      { k: 'tree', x: 540, y: 300, s: 0.8, trunk: '#7a4a21', leaf: '#57b25e' },
      { k: 'flower', x: 150, y: 420, s: 1.0, petal: '#ff7ab8', center: '#ffd76a' },
      { k: 'flower', x: 250, y: 436, s: 0.9, petal: '#ffffff', center: '#ff9d76' },
      { k: 'flower', x: 420, y: 428, s: 1.0, petal: '#c084fc', center: '#ffd76a' },
      { k: 'flower', x: 500, y: 442, s: 0.8, petal: '#ff7ab8', center: '#ffffff' },
      { k: 'butterfly', x: 330, y: 200, s: 1.0, c: '#f472b6' },
      { k: 'butterfly', x: 180, y: 180, s: 0.8, c: '#38bdf8' },
      { k: 'frog', x: 280, y: 372, s: 1.0, c: '#4ade80' },
      { k: 'rock', x: 120, y: 380, s: 0.9, c: '#9aa0a6' },
      { k: 'rock', x: 480, y: 386, s: 1.0, c: '#9aa0a6' },
      { k: 'bridge', x: 304, y: 330, s: 1.0, c: '#a16207' },
      { k: 'flower', x: 90, y: 448, s: 0.9, petal: '#ffd76a', center: '#ff9d76' },
      { k: 'flower', x: 560, y: 420, s: 0.9, petal: '#ff7ab8', center: '#ffffff' },
      { k: 'butterfly', x: 120, y: 240, s: 0.7, c: '#c084fc' },
    ],
    differences: [
      { x: 90, y: 66, obj: 0, change: { r: 46 } },
      { x: 470, y: 44, obj: 2, change: { hide: true } },
      { x: 330, y: 200, obj: 11, change: { c: '#38bdf8' } },
      { x: 420, y: 428, obj: 9, change: { hide: true } },
      { x: 340, y: 382, obj: 13, change: { x: 340, y: 382 } },
      { x: 540, y: 250, obj: 6, change: { leaf: '#e07856' } },
      { x: 450, y: 170, add: { k: 'butterfly', x: 450, y: 170, s: 0.9, c: '#ffd76a' } },
      { x: 304, y: 330, obj: 16, change: { c: '#7c3f16' } },
      { x: 120, y: 380, obj: 14, change: { c: '#7c6a55' } },
      { x: 390, y: 140, obj: 4, change: { x: 390, y: 140 } },
    ],
  },
];

// The objects of one panel: 'left' is the scene as listed, 'right' is the same
// scene with every difference applied.
export function lanternlightPanelObjects(scene, side) {
  const objects = scene.objects.map((o) => ({ ...o }));
  if (side !== 'right') return objects;
  for (const diff of scene.differences) {
    if (diff.add) {
      objects.push({ ...diff.add });
    } else if (diff.obj !== undefined) {
      Object.assign(objects[diff.obj], diff.change);
    }
  }
  return objects;
}

// The marker points of a scene's differences, in panel coordinates.
export function lanternlightDifferencePoints(scene) {
  return scene.differences.map((d) => ({ x: d.x, y: d.y }));
}
