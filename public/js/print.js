// =============================================================
//  지문 생성기 — 응답값으로 세상에 하나뿐인 지문 무늬를 그립니다.
//  12개 특징 = 지문의 12개 방향(30°씩). 값이 클수록 그 방향 융선이 바깥으로 부풀고,
//  응답 문자열로 만든 시드가 소용돌이 중심·흔들림·끊긴 융선(특징점) 위치를 정합니다.
// =============================================================
export const PRINT_W = 220;
export const PRINT_H = 280;
const CX = PRINT_W / 2;
const CY = PRINT_H / 2 + 6;
const RX = 96; // 손가락 끝 윤곽 (타원)
const RY = 128;

export function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed || 1;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/**
 * @param {Array<number|null>} values 12개, 0~1 (null = 응답 없음 → 0.5)
 * @param {string} seedStr
 * @param {{rings?: number, upto?: number}} opt  upto: 앞에서부터 몇 개의 특징까지 반영할지(진행 중 미리보기)
 * @returns {{segs: Array<Array<[number,number]>>, core:[number,number]}}
 */
export function makePrint(values, seedStr = 'bodyprint', opt = {}) {
  const R = opt.rings ?? 27;
  const r = rng(hashStr(seedStr));
  const n = 12;
  const v = values.map((x) => (x === null || x === undefined ? 0.5 : x));
  const cx = CX + (r() - 0.5) * 22;
  const cy = CY - 14 + (r() - 0.5) * 22;
  const harm = [2, 3, 4, 5].map((m) => ({ m, a: 0.012 + r() * 0.03, p: r() * Math.PI * 2 }));
  const tilt = (r() - 0.5) * 0.5;
  const whorl = 0.12 + r() * 0.22; // 소용돌이 정도

  // 각도별 특징 가중치 (섹터 중심 사이를 코사인 보간)
  const bumpAt = (th) => {
    const t = ((th / (Math.PI * 2)) * n + n) % n;
    const i = Math.floor(t); const f = t - i;
    const a = v[i % n]; const b = v[(i + 1) % n];
    const w = (1 - Math.cos(f * Math.PI)) / 2;
    return a * (1 - w) + b * w - 0.5;
  };

  // 아래쪽 경계: 이 선 아래는 아치형 융선이 채움 (델타 근처)
  const base = (x) => CY + RY * 0.52 - 16 * Math.exp(-(((x - cx) / 64) ** 2));
  const inside = (x, y) => ((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 <= 1;
  const segs = [];
  const STEP = 0.035;
  for (let k = 0; k < R; k++) {
    const t = k / (R - 1);
    const r0 = 5 + k * 5.1;
    // 끊긴 융선(특징점) 1~3곳
    const gaps = Array.from({ length: 1 + Math.floor(r() * 3) }, () => ({ at: r() * Math.PI * 2, w: 0.05 + r() * 0.16 }));
    let cur = [];
    for (let th = 0; th <= Math.PI * 2 + 1e-6; th += STEP) {
      const gap = gaps.some((g) => { const d = Math.abs(((th - g.at + Math.PI * 3) % (Math.PI * 2)) - Math.PI); return d < g.w / 2; });
      let wob = 0; for (const h of harm) wob += h.a * Math.sin(h.m * th + h.p + k * 0.07);
      const bump = bumpAt(th) * 0.2 * (0.2 + t);
      const swirl = th + whorl * t * Math.sin(th * 1 + tilt);
      let rr = r0 * (1 + wob + bump);
      let x = cx + rr * Math.cos(swirl + tilt) * 0.86;
      let y = cy + rr * Math.sin(swirl + tilt) * 1.12;
      if (!gap && inside(x, y) && y < base(x)) cur.push([x, y]);
      else if (cur.length) { if (cur.length > 2) segs.push(cur); cur = []; }
    }
    if (cur.length > 2) segs.push(cur);
  }
  // 손가락 아래쪽을 채우는 아치형 융선
  for (let k = 0; k < 9; k++) {
    let cur = [];
    for (let x = CX - RX; x <= CX + RX; x += 3) {
      const y = base(x) + 3 + k * 5.4 + 16 * Math.exp(-(((x - cx) / 64) ** 2)) * (k / 12) + Math.sin(x * 0.045 + k * 0.6) * 0.8;
      if (inside(x, y)) cur.push([x, y]); else if (cur.length) { if (cur.length > 2) segs.push(cur); cur = []; }
    }
    if (cur.length > 2) segs.push(cur);
  }
  return { segs, core: [cx, cy] };
}

export const segsToPath = (segs) => segs.map((s) => 'M' + s.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')).join('');

// 12개 섹터 쐐기 (결과 화면에서 특징을 가리킬 때 사용)
export function sectorPath(i, core) {
  const [cx, cy] = core;
  const a0 = (i / 12) * Math.PI * 2; const a1 = ((i + 1) / 12) * Math.PI * 2;
  const L = 200;
  return `M${cx} ${cy}L${cx + Math.cos(a0) * L} ${cy + Math.sin(a0) * L * 1.3}L${cx + Math.cos(a1) * L} ${cy + Math.sin(a1) * L * 1.3}Z`;
}

export const OUTLINE = `M${CX} ${CY - RY}a${RX} ${RY} 0 1 0 0.01 0`;
export const FINGER = { CX, CY, RX, RY };

export function drawPrintCanvas(g, segs, x, y, scale, color, width = 1.6) {
  g.save(); g.translate(x, y); g.scale(scale, scale);
  g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round';
  for (const s of segs) { g.beginPath(); g.moveTo(s[0][0], s[0][1]); for (let i = 1; i < s.length; i++) g.lineTo(s[i][0], s[i][1]); g.stroke(); }
  g.restore();
}
