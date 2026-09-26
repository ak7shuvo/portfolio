/**
 * Build-time terrain.
 *
 * Generates topographic contour lines — an abstract nod to the Sylhet hills —
 * with deterministic noise and marching squares. It runs in a server
 * component during the static export, so the browser receives plain SVG paths
 * and does no per-frame drawing. The 3D feel comes from CSS perspective on
 * that static SVG, which costs one composited layer.
 */

export type ContourLevel = { d: string; level: number; major: boolean };

const W = 64; // grid columns
const H = 44; // grid rows
const LEVELS = 11;

function hash(x: number, y: number, seed: number): number {
  let h = x * 374761393 + y * 668265263 + seed * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = smooth(x - x0);
  const fy = smooth(y - y0);
  const a = hash(x0, y0, seed);
  const b = hash(x0 + 1, y0, seed);
  const c = hash(x0, y0 + 1, seed);
  const d = hash(x0 + 1, y0 + 1, seed);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

function elevation(x: number, y: number): number {
  const nx = x / W;
  const ny = y / H;
  let e = 0;
  let amp = 1;
  let freq = 3.2;
  for (let o = 0; o < 4; o++) {
    e += amp * valueNoise(nx * freq, ny * freq, 17 + o);
    amp *= 0.5;
    freq *= 2;
  }
  // Two ridges and a river valley give the field a readable landscape.
  const ridgeA = Math.exp(-((nx - 0.3) ** 2 / 0.02 + (ny - 0.36) ** 2 / 0.05));
  const ridgeB = Math.exp(-((nx - 0.72) ** 2 / 0.03 + (ny - 0.6) ** 2 / 0.03));
  const valley = Math.exp(-((ny - (0.78 - nx * 0.35)) ** 2) / 0.006);
  return e * 0.62 + ridgeA * 0.55 + ridgeB * 0.45 - valley * 0.35;
}

type Pt = [number, number];

export function buildContours(width = 1000, height = 690): ContourLevel[] {
  const grid: number[][] = [];
  let min = Infinity;
  let max = -Infinity;
  for (let y = 0; y <= H; y++) {
    const row: number[] = [];
    for (let x = 0; x <= W; x++) {
      const v = elevation(x, y);
      row.push(v);
      if (v < min) min = v;
      if (v > max) max = v;
    }
    grid.push(row);
  }

  const sx = width / W;
  const sy = height / H;
  const levels: ContourLevel[] = [];

  for (let l = 1; l <= LEVELS; l++) {
    const t = min + ((max - min) * l) / (LEVELS + 1);
    const segs: [Pt, Pt][] = [];

    const lerp = (a: number, b: number) => (t - a) / (b - a);

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const tl = grid[y][x];
        const tr = grid[y][x + 1];
        const br = grid[y + 1][x + 1];
        const bl = grid[y + 1][x];
        const idx = (tl > t ? 8 : 0) | (tr > t ? 4 : 0) | (br > t ? 2 : 0) | (bl > t ? 1 : 0);
        if (idx === 0 || idx === 15) continue;

        const top: Pt = [x + lerp(tl, tr), y];
        const right: Pt = [x + 1, y + lerp(tr, br)];
        const bottom: Pt = [x + lerp(bl, br), y + 1];
        const left: Pt = [x, y + lerp(tl, bl)];

        switch (idx) {
          case 1: case 14: segs.push([left, bottom]); break;
          case 2: case 13: segs.push([bottom, right]); break;
          case 3: case 12: segs.push([left, right]); break;
          case 4: case 11: segs.push([top, right]); break;
          case 6: case 9: segs.push([top, bottom]); break;
          case 7: case 8: segs.push([left, top]); break;
          case 5: segs.push([left, top], [bottom, right]); break;
          case 10: segs.push([top, right], [left, bottom]); break;
        }
      }
    }

    // Chain segments into polylines so the SVG stays small.
    const key = (p: Pt) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
    const byPoint = new Map<string, number[]>();
    segs.forEach((s, i) => {
      for (const p of s) {
        const k = key(p);
        const list = byPoint.get(k);
        if (list) list.push(i);
        else byPoint.set(k, [i]);
      }
    });
    const used = new Uint8Array(segs.length);
    const lines: Pt[][] = [];

    const extend = (line: Pt[], atEnd: boolean) => {
      for (;;) {
        const tip = atEnd ? line[line.length - 1] : line[0];
        const next = (byPoint.get(key(tip)) ?? []).find((i) => !used[i]);
        if (next === undefined) return;
        used[next] = 1;
        const [a, b] = segs[next];
        const other = key(a) === key(tip) ? b : a;
        if (atEnd) line.push(other);
        else line.unshift(other);
      }
    };

    segs.forEach((s, i) => {
      if (used[i]) return;
      used[i] = 1;
      const line: Pt[] = [s[0], s[1]];
      extend(line, true);
      extend(line, false);
      if (line.length > 3) lines.push(line);
    });

    const d = lines
      .map(
        (line) =>
          "M" +
          line.map(([px, py]) => `${Math.round(px * sx)} ${Math.round(py * sy)}`).join("L"),
      )
      .join("");

    levels.push({ d, level: l, major: l % 4 === 0 });
  }

  return levels;
}
