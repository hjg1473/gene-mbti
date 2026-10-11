// 공유용 페이지(/p/0~12.html)와 OG 이미지(/og/*.png)를 생성합니다.
//   SITE_URL=https://내도메인 node scripts/build-share.mjs
// OG 이미지 생성에는 Playwright(Chromium)가 필요합니다: npm i -D playwright && npx playwright install chromium
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEATURES } from '../public/js/data.js';
import { makePrint, segsToPath, PRINT_W, PRINT_H } from '../public/js/print.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SITE_URL = (process.env.SITE_URL || 'https://gene-mbti.vercel.app').replace(/\/$/, '');
const N = FEATURES.length;

for (const d of ['p', 'og']) { if (existsSync(join(ROOT, d))) rmSync(join(ROOT, d), { recursive: true }); mkdirSync(join(ROOT, d)); }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (let n = 0; n <= N; n++) {
  const title = `나는 12가지 중 ${n}가지 돼. 너 이거 돼?`;
  const desc = '혀 말기, 숨은 손목 힘줄, 햇빛 재채기, 가루 귀지… 몸의 숨은 기능 12가지를 직접 해 보고 내 바디프린트를 만들어 보세요.';
  writeFileSync(join(ROOT, 'p', `${n}.html`), `<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · BODYPRINT</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="BODYPRINT">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE_URL}/og/${n}.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${SITE_URL}/p/${n}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE_URL}/og/${n}.png">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<script>var q=location.search&&location.search.length>1?location.search:'';location.replace('/'+q+(q?'#/result':'#/'));</script>
</head><body style="font-family:sans-serif;background:#ECE8F1;color:#1A1B5E;text-align:center;padding:60px 20px">
<p>바디프린트로 이동 중… <a href="/">BODYPRINT 바로가기</a></p></body></html>`);
}
console.log(`share pages: ${N + 1}`);
if (process.argv.includes('--pages-only')) process.exit(0);

const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const chromium = pw.chromium || pw.default.chromium;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const SERIF = `Hahmlet, 'Noto Serif KR', 'Noto Serif CJK KR', serif`;
const SANS = `'Pretendard Variable', Pretendard, 'Noto Sans CJK KR', sans-serif`;

const printSvg = (seed, vals) => {
  const { segs } = makePrint(vals, seed);
  return `<svg viewBox="0 0 ${PRINT_W} ${PRINT_H}" style="height:560px"><path d="${segsToPath(segs)}" fill="none" stroke="#1A1B5E" stroke-width="1.7" stroke-linecap="round"/></svg>`;
};
const card = (headline, sub, n) => `<html><body style="margin:0">
<div style="width:1200px;height:630px;background:#ECE8F1;position:relative;overflow:hidden;font-family:${SANS};color:#1A1B5E">
  <div style="position:absolute;right:40px;top:35px">${printSvg('og' + n, FEATURES.map((_, i) => (i < (n ?? 6) ? 0.85 : 0.2)))}</div>
  <div style="position:absolute;left:72px;top:58px;font-family:${SERIF};font-weight:900;font-size:40px;letter-spacing:-1px">BODYPRINT</div>
  <div style="position:absolute;left:72px;top:150px;width:700px;font-family:${SERIF};line-height:1.02;letter-spacing:-4px">${headline}</div>
  <div style="position:absolute;left:72px;bottom:58px;font-size:26px;color:#4B4D86">${sub}</div>
</div></body></html>`;

for (let n = 0; n <= N; n++) {
  await page.setContent(card(`<div style="font-weight:300;font-size:58px;letter-spacing:-2px">12가지 중</div><div style="font-weight:800;font-size:230px;color:#F2557A;line-height:.92">${n}<span style="font-weight:300;font-size:58px;color:#1A1B5E;letter-spacing:-2px">가지 돼</span></div>`, '너 이거 돼? 내 몸의 숨은 기능 12가지 찾기', n), { waitUntil: 'load' });
  await page.screenshot({ path: join(ROOT, 'og', `${n}.png`) });
}
await page.setContent(card(`<div style="font-weight:800;font-size:150px">너 이거<br>돼?</div>`, '혀 말기부터 햇빛 재채기까지, 몸의 숨은 기능 12가지', null), { waitUntil: 'load' });
await page.screenshot({ path: join(ROOT, 'og', 'default.png') });
await browser.close();
console.log(`og images: ${N + 2}`);
