// 공유용 페이지(/t/XXXX.html)와 OG 이미지(/og/XXXX.png)를 생성합니다.
//   SITE_URL=https://내도메인 node scripts/build-share.mjs
// OG 이미지 생성에는 Playwright(Chromium)가 필요합니다: npm i -D playwright && npx playwright install chromium
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TYPES, AXES } from '../public/js/data.js';
import { typeEmblem } from '../public/js/illus.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SITE_URL = (process.env.SITE_URL || 'https://gene-mbti.vercel.app').replace(/\/$/, '');
const SKIP_IMAGES = process.argv.includes('--pages-only');

mkdirSync(join(ROOT, 't'), { recursive: true });
mkdirSync(join(ROOT, 'og'), { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// ---------- 공유 페이지 ----------
for (const [code, t] of Object.entries(TYPES)) {
  const letters = code.split('').map((l, i) => (AXES[i].a.letter === l ? AXES[i].a.name : AXES[i].b.name).split(' ')[0]).join(' · ');
  const title = `나의 유전자 MBTI는 ${code} "${t.name}"`;
  const desc = `${letters} — 내 몸의 숨겨진 특징을 발견하는 테스트. 나와 같은 몸을 가진 사람은 전 세계 몇 %일까?`;
  const html = `<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · 유전자 MBTI</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="유전자 MBTI">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE_URL}/og/${code}.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${SITE_URL}/t/${code}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE_URL}/og/${code}.png">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<script>
  var q = location.search && location.search.length > 1 ? location.search : '';
  location.replace('/' + q + (q ? '#/result' : '#/'));
</script>
</head><body style="font-family:sans-serif;text-align:center;padding:60px 20px">
<p>결과로 이동 중… <a href="/">유전자 MBTI 바로가기</a></p>
</body></html>`;
  writeFileSync(join(ROOT, 't', `${code}.html`), html);
}
console.log('share pages: 16');

if (SKIP_IMAGES) process.exit(0);

// ---------- OG 이미지 ----------
const pw = await import(process.env.PLAYWRIGHT_PATH || 'playwright');
const chromium = pw.chromium || pw.default.chromium;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const FONT = `'Pretendard Variable', Pretendard, 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif`;

const shade = (hex, pct) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (pct / 100) * 255)));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map((c) => c.toString(16).padStart(2, '0')).join('');
};

const card = (code, t) => `
<html><body style="margin:0;width:1200px;height:630px;font-family:${FONT};overflow:hidden">
<div style="position:relative;width:1200px;height:630px;background:linear-gradient(135deg,${t.hue},${shade(t.hue, -20)});color:#fff;display:flex;align-items:center;padding:0 80px;box-sizing:border-box">
  <div style="position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:rgba(255,255,255,.1)"></div>
  <div style="flex:1;position:relative">
    <div style="font-size:30px;font-weight:700;opacity:.92">🧬 나의 유전자 MBTI</div>
    <div style="font-size:178px;font-weight:900;line-height:1;margin:14px 0 10px;letter-spacing:4px">${code}</div>
    <div style="font-size:56px;font-weight:800;letter-spacing:-1px">${t.name}</div>
    <div style="margin-top:28px;font-size:26px;font-weight:600;opacity:.9">내 몸의 숨겨진 특징을 발견하는 테스트</div>
  </div>
  <div style="width:380px;height:380px;border-radius:50%;background:#fff;padding:22px;box-sizing:border-box;position:relative;box-shadow:0 30px 60px rgba(0,0,0,.2)">${typeEmblem(code, t.hue)}</div>
</div></body></html>`;

const defaultCard = `
<html><body style="margin:0;width:1200px;height:630px;font-family:${FONT};overflow:hidden">
<div style="width:1200px;height:630px;background:#F4F5F7;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative">
  <div style="position:absolute;inset:auto 0 0 0;height:300px;background:#fff;clip-path:polygon(0 34%,22% 62%,52% 26%,78% 54%,100% 30%,100% 100%,0 100%)"></div>
  <div style="position:relative;display:flex;gap:18px;margin-bottom:26px">
    ${['#4298B4', '#E4AE3A', '#33A474', '#88619A'].map((c) => `<div style="width:56px;height:56px;border-radius:50%;background:${c}"></div>`).join('')}
  </div>
  <div style="position:relative;font-size:96px;font-weight:900;color:#343C4B;letter-spacing:-3px">유전자 MBTI</div>
  <div style="position:relative;font-size:38px;font-weight:700;color:#576071;margin-top:10px">내 몸의 숨겨진 특징을 발견하는 테스트</div>
  <div style="position:relative;margin-top:34px;font-size:26px;font-weight:700;color:#fff;background:#88619A;padding:14px 34px;border-radius:999px">직접 해 보는 16문항 · 논문 근거 21편</div>
</div></body></html>`;

for (const [code, t] of Object.entries(TYPES)) {
  await page.setContent(card(code, t), { waitUntil: 'load' });
  await page.screenshot({ path: join(ROOT, 'og', `${code}.png`) });
}
await page.setContent(defaultCard, { waitUntil: 'load' });
await page.screenshot({ path: join(ROOT, 'og', 'default.png') });
await browser.close();
console.log('og images: 17');
