import { QUESTIONS, FEATURES, SOURCES, EVIDENCE, LEVELS } from './data.js';
import { ILLUS } from './illus.js';
import { makePrint, segsToPath, sectorPath, hashStr, drawPrintCanvas, PRINT_W, PRINT_H } from './print.js';
import { SITE_URL, KAKAO_JS_KEY } from './config.js';

const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');
const KEY = 'bodyprint:v1';
const FKEY = 'bodyprint:friend';
const N = FEATURES.length;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// -------------------------------------------------------------
//  상태 & 저장
// -------------------------------------------------------------
const state = { answers: Array(QUESTIONS.length).fill(null), idx: 0 };
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 저장 불가 */ } },
};
const save = () => store.set(KEY, state);
(() => { const s = store.get(KEY); if (s && Array.isArray(s.answers) && s.answers.length === QUESTIONS.length) Object.assign(state, s); })();

// 응답 → 링크용 문자열 (문항당 한 글자: 0~9, 건너뜀 x)
const encode = (ans) => ans.map((a) => (a === 'skip' || a === null ? 'x' : String(Math.round((a / 100) * 9)))).join('');
const decode = (s) => (s && s.length === QUESTIONS.length && /^[0-9x]+$/.test(s) ? s.split('').map((c) => (c === 'x' ? 'skip' : (Number(c) / 9) * 100)) : null);
const complete = (ans) => ans.every((a) => a !== null);

// -------------------------------------------------------------
//  분석
// -------------------------------------------------------------
function analyze(answers) {
  const feats = FEATURES.map((f, i) => {
    const vs = QUESTIONS.map((q, k) => (q.f === f.id && typeof answers[k] === 'number' ? answers[k] : null)).filter((v) => v !== null);
    const v = vs.length ? vs.reduce((a, b) => a + b, 0) / vs.length / 100 : null;
    const status = v === null ? 'unknown' : v >= 0.6 ? 'have' : v <= 0.4 ? 'not' : 'half';
    return { ...f, i, v, status };
  });
  const code = encode(answers);
  return {
    feats, code,
    have: feats.filter((f) => f.status === 'have').length,
    half: feats.filter((f) => f.status === 'half').length,
    unknown: feats.filter((f) => f.status === 'unknown').length,
    id: hashStr(code).toString(36).toUpperCase().slice(-4).padStart(4, '0'),
    print: makePrint(feats.map((f) => f.v), code),
  };
}

const mid = (v) => (Array.isArray(v) ? (v[0] + v[1]) / 2 : v);
const fmtPct = (v) => (Array.isArray(v) ? `${v[0]}~${v[1]}%` : `${+v.toFixed(2)}%`);
const sig = (x) => (x >= 10 ? x.toFixed(0) : x >= 1 ? x.toFixed(1) : x.toPrecision(2));
const oneIn = (p) => { const n = 1 / p; if (n < 10) return n.toFixed(1); const m = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1); return (Math.round(n / m) * m).toLocaleString('ko-KR'); };
const sideOf = (f) => (f.status === 'have' ? f.have : f.status === 'not' ? f.not : null);

function combo(feats, region) {
  const used = []; const out = [];
  for (const f of feats) {
    if (f.status === 'unknown') { out.push([f, '건너뜀']); continue; }
    if (f.status === 'half') { out.push([f, '반반 응답']); continue; }
    const side = sideOf(f); const v = side.freq[region];
    if (v === undefined) { out.push([f, Object.keys(side.freq).length ? (region === 'world' ? '세계 수치 없음' : '동아시아 수치 없음') : '데이터 부족']); continue; }
    used.push([f, side, v]);
  }
  if (!used.length) return { used, out, p: null };
  const prod = (pick) => used.reduce((s, [, , v]) => s * pick(v) / 100, 1);
  return { used, out, p: prod(mid), lo: prod((v) => (Array.isArray(v) ? v[0] : v)), hi: prod((v) => (Array.isArray(v) ? v[1] : v)) };
}

// -------------------------------------------------------------
//  공통 틀
// -------------------------------------------------------------
function shell(html, active = '') {
  app.innerHTML = `
  <header class="mast"><div class="page">
    <a class="wordmark" href="#/">BODYPRINT<span>바디프린트</span></a>
    <nav><a href="#/test" ${active === 'test' ? 'aria-current="page"' : ''}>테스트</a><a href="#/sources" ${active === 'sources' ? 'aria-current="page"' : ''}>근거 문헌</a></nav>
  </div></header>
  <main>${html}</main>
  <footer class="foot"><div class="page">
    <div><a class="wordmark" href="#/">BODYPRINT</a><div style="margin-top:6px">내 몸의 숨겨진 특징을 발견하는 테스트</div></div>
    <div>이 테스트는 유전자 검사가 아니에요. 직접 해 본 동작과 기억을 바탕으로 한 자가 관찰이고, 의학적 진단을 대신하지 않아요. 특징별 빈도는 논문에서 가져왔고, 근거가 부족한 값은 "데이터 부족"으로 표시해요. 응답은 서버로 보내지 않고 이 브라우저와 공유 링크에만 담겨요. <a href="#/sources">근거 문헌 ${Object.keys(SOURCES).length}편 보기</a></div>
  </div></footer>`;
}

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2400);
}

const freqLine = (f) => {
  const w = f.have.freq.world ?? f.have.freq.eastAsia;
  if (w !== undefined) return `${f.have.freq.world !== undefined ? '전 세계' : '동아시아'} ${fmtPct(w)}가 가능`;
  if (f.have.freq.ref) return `${f.have.freq.ref.pop} ${fmtPct(f.have.freq.ref.v)}`;
  return '세계 빈도 데이터 부족';
};

// -------------------------------------------------------------
//  HOME
// -------------------------------------------------------------
function viewHome() {
  shell(`
  <section class="page cover">
    <span class="issue">2026년 가을, 제1호</span>
    <h1>너 이거<span class="l2">돼?</span></h1>
    <div class="print-stage" id="stage"><canvas id="cv" aria-label="손가락을 갖다 대면 휘어지는 지문 그림"></canvas><div class="hint">지문 위에서 커서나 손가락을 움직여 보세요</div></div>
    <div class="intro">
      <p>혀 말기, 숨은 손목 힘줄, 햇빛 재채기, 가루 귀지. 몸이 가진 12가지 숨은 기능을 직접 해 보고 답하면, 세상에 하나뿐인 내 <b>바디프린트</b>가 그려져요. 기능마다 논문 속 세계 빈도도 함께 알려 드려요.</p>
      <a class="btn" href="#/test">내 바디프린트 만들기</a>
    </div>
  </section>

  <section class="sec"><div class="page">
    <div class="sec-head"><h2>이번 호의 12가지 도전</h2><p>거울 하나, 4분이면 충분해요. 각 도전은 실제 연구에서 쓰인 관찰 방법이고, 오른쪽 숫자는 그 기능을 가진 사람의 비율이에요.</p></div>
    <ol class="toc">${FEATURES.map((f, i) => {
      const q = QUESTIONS.findIndex((x) => x.f === f.id);
      return `<li><a href="#/test" data-q="${q}" data-illus="${QUESTIONS[q].illus}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="ask">${f.ask}</span><span class="fq">${freqLine(f)}</span></a></li>`;
    }).join('')}</ol>
  </div></section>

  <section class="sec"><div class="page essay">
    <blockquote>“혀를 말 수 있으면 우성”이라고 배웠다면, 그 교과서는 반세기 전에 틀렸어요.<cite>Martin, 1975 · McDonald, <i>Myths of Human Genetics</i>, 2011</cite></blockquote>
    <div class="cols">
      <p><b>혀 말기</b>는 1940년 유전 형질로 처음 소개됐지만, 일란성 쌍둥이 중 한 명만 혀를 마는 경우가 흔하다는 연구가 나오면서 단순 유전이 아닌 것으로 정리됐어요. 연습해서 되는 사람도 있어요.</p>
      <p><b>귓불</b>은 붙었냐 떨어졌냐 둘 중 하나가 아니에요. 7만여 명을 분석한 연구에서 49개 유전자 위치가 함께 귓불 모양을 정한다는 게 밝혀졌어요.</p>
      <p>반대로 <b>귀지</b>는 진짜로 유전자 하나가 정해요. ABCC11의 염기 하나 차이로 건성과 습성이 갈리고, 한국인은 대부분 건성이에요.</p>
      <p>그래서 바디프린트는 기능마다 유전 근거가 <b>강한지, 중간인지, 약한지</b>를 따로 표시해요.</p>
    </div>
  </div></section>

  <section class="sec"><div class="page method">
    <div class="big">“상위 0.03%” 같은 숫자는 <em>지어내지 않아요.</em></div>
    <p>나와 같은 조합을 가진 사람의 비율은 논문에 빈도가 나온 기능만 곱해서 구한 추정치예요. 자료가 없는 기능은 "데이터 부족"으로 빼고, 전 세계 기준과 동아시아 기준을 나눠서 보여 드려요.</p>
  </div></section>

  <section class="page closing">
    <h2>12개 중에<br>몇 개 될까?</h2>
    <a class="btn" href="#/test">지금 해 보기</a>
  </section>
  <div class="peek" id="peek" aria-hidden="true"></div>`);

  heroPrint();
  // 목차: 문항으로 바로 이동 + 그림 미리보기
  const peek = $('#peek');
  app.querySelectorAll('.toc a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      if (!complete(state.answers) || state.answers.every((x) => x === null)) state.idx = Number(a.dataset.q);
      save(); location.hash = '#/test';
    });
    a.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; peek.innerHTML = ILLUS[a.dataset.illus](); peek.classList.add('on'); });
    a.addEventListener('pointerleave', () => peek.classList.remove('on'));
    a.addEventListener('pointermove', (e) => { peek.style.left = e.clientX + 'px'; peek.style.top = e.clientY + 'px'; });
  });
}

// 표지 지문: 포인터를 대면 융선이 눌리듯 밀려나요
let heroRAF = 0;
function heroPrint() {
  cancelAnimationFrame(heroRAF);
  const stage = $('#stage'); const cv = $('#cv'); if (!cv) return;
  const g = cv.getContext('2d');
  const own = complete(state.answers) ? analyze(state.answers) : null;
  const { segs } = own ? own.print : makePrint([0.8, 0.3, 0.6, 0.2, 0.7, 0.9, 0.4, 0.1, 0.65, 0.35, 0.5, 0.75], 'cover-2026');
  let W = 0; let H = 0; let s = 1;
  const resize = () => {
    const r = stage.getBoundingClientRect(); const dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; s = W / PRINT_W; g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  const ptr = { x: -999, y: -999, tx: -999, ty: -999, p: 0, tp: 0 };
  const move = (e) => { const r = cv.getBoundingClientRect(); ptr.tx = (e.clientX - r.left) / s; ptr.ty = (e.clientY - r.top) / s; ptr.tp = 1; if (ptr.x < -900) { ptr.x = ptr.tx; ptr.y = ptr.ty; } };
  stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerdown', move);
  stage.addEventListener('pointerleave', () => { ptr.tp = 0; });
  addEventListener('resize', resize);
  const RAD = 46;
  const frame = () => {
    if (!document.body.contains(cv)) { removeEventListener('resize', resize); return; }
    ptr.x += (ptr.tx - ptr.x) * 0.18; ptr.y += (ptr.ty - ptr.y) * 0.18; ptr.p += (ptr.tp - ptr.p) * 0.08;
    g.clearRect(0, 0, W, H);
    g.save(); g.scale(s, s); g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = 1.55;
    for (const seg of segs) {
      g.beginPath();
      let near = false;
      for (let i = 0; i < seg.length; i++) {
        let [x, y] = seg[i];
        const dx = x - ptr.x; const dy = y - ptr.y; const d = Math.hypot(dx, dy);
        if (d < RAD && ptr.p > 0.01) { const k = (1 - d / RAD) ** 2 * 16 * ptr.p; x += (dx / (d || 1)) * k; y += (dy / (d || 1)) * k; near = near || d < RAD * 0.7; }
        i ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = near && ptr.p > 0.3 ? '#F2557A' : '#1A1B5E';
      g.stroke();
    }
    g.restore();
    if (!reduced || ptr.p > 0.01) heroRAF = requestAnimationFrame(frame);
  };
  frame();
  if (reduced) stage.addEventListener('pointermove', () => { cancelAnimationFrame(heroRAF); heroRAF = requestAnimationFrame(frame); });
}

// -------------------------------------------------------------
//  TEST — 한 화면에 한 문항, 슬라이더로 정도를 표시
// -------------------------------------------------------------
const THUMB = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="#ECE8F1" stroke-width="1.6" stroke-linecap="round"><path d="M12 30c-2-4-3-8-1-13 2-5 7-7 11-6 5 1 8 6 7 11"/><path d="M16 31c-2-4-2-8 0-12 2-3 6-3 8 0 2 3 2 6 1 9"/><path d="M20 32c-1-3-1-7 0-10"/></svg>')}")`;

function viewTest() {
  const i = Math.max(0, Math.min(state.idx, QUESTIONS.length - 1));
  state.idx = i;
  const q = QUESTIONS[i];
  const f = FEATURES.find((x) => x.id === q.f);
  const a = state.answers[i];
  const touched = typeof a === 'number';
  const sliderVal = touched ? 100 - a : 50; // 왼쪽 끝 = "그렇다"(100)

  shell(`
  <div class="page">
    <div class="test-top">
      <div class="ticks" aria-hidden="true">${QUESTIONS.map((_, k) => `<i class="${k === i ? 'cur' : state.answers[k] === 'skip' ? 'skip' : state.answers[k] !== null ? 'done' : ''}"></i>`).join('')}</div>
      <div class="count">${i + 1} / ${QUESTIONS.length}</div>
    </div>
    <article class="spread enter">
      <div class="left head">
        <div class="qno">${String(i + 1).padStart(2, '0')}<small>${f.short}</small></div>
        <h1 class="qtitle">${q.q}</h1>
        <p class="qmission">${q.mission}</p>
        ${q.tip ? `<p class="qtip">${q.tip}</p>` : ''}
      </div>
      <div class="right">
        <figure class="plate">${ILLUS[q.illus]()}<figcaption>그림 ${i + 1}. ${f.short}</figcaption></figure>
        <div class="growing" aria-hidden="true">${growingPrint()}<span>답할 때마다 내 바디프린트가<br>한 겹씩 그려지고 있어요</span></div>
      </div>
      <div class="left dialwrap">
        <div class="dial ${touched ? '' : 'idle'}" id="dial">
          <div class="dial-read ${touched ? '' : 'idle'}" id="read" aria-live="polite">${touched ? LEVELS[lvl(a)] : '직접 해 보고, 동그라미를 끌어 표시해요'}</div>
          <input type="range" id="rng" min="0" max="100" step="1" value="${sliderVal}" aria-label="${q.q} — 왼쪽: ${q.left}, 오른쪽: ${q.right}" aria-valuetext="${touched ? LEVELS[lvl(a)] : '아직 선택 안 함'}">
          <div class="dial-scale" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
          <div class="dial-ends"><span>${q.left}</span><span>${q.right}</span></div>
        </div>
      </div>
    </article>
    <div class="test-actions">
      <div class="lhs">
        ${i > 0 ? '<button class="btn line" id="prev">이전</button>' : ''}
        <button class="linkish ${a === 'skip' ? 'on' : ''}" id="skip">${q.skip || '잘 모르겠어요 / 해 볼 수 없어요'}</button>
      </div>
      <div class="lhs"><span class="kbd">← → 로 조절, Enter로 다음</span><button class="btn" id="next" ${a === null ? 'disabled' : ''}>${i === QUESTIONS.length - 1 ? '내 바디프린트 보기' : '다음'}</button></div>
    </div>
  </div>`, 'test');

  const rng = $('#rng'); const dial = $('#dial'); const read = $('#read');
  rng.style.setProperty('--thumb', THUMB);
  const paint = () => rng.style.setProperty('--fill', rng.value + '%');
  paint();
  const commit = () => {
    const v = 100 - Number(rng.value);
    state.answers[i] = v; save();
    dial.classList.remove('idle'); read.classList.remove('idle');
    read.textContent = LEVELS[lvl(v)];
    rng.setAttribute('aria-valuetext', LEVELS[lvl(v)]);
    $('#next').disabled = false; $('#skip').classList.remove('on');
    paint(); refreshGrowing();
  };
  rng.addEventListener('input', commit);
  rng.addEventListener('pointerdown', () => { if (!touched && state.answers[i] === null) commit(); });
  $('#skip').addEventListener('click', () => { state.answers[i] = 'skip'; save(); go(1); });
  $('#prev')?.addEventListener('click', () => go(-1));
  $('#next').addEventListener('click', () => go(1));
  document.onkeydown = (e) => {
    if (!location.hash.startsWith('#/test')) { document.onkeydown = null; return; }
    if (e.key === 'Enter' && state.answers[i] !== null) { e.preventDefault(); go(1); }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && document.activeElement !== rng) { rng.focus(); }
  };
}
const lvl = (v) => Math.round((v / 100) * 6);

function go(d) {
  const n = state.idx + d;
  if (n >= QUESTIONS.length) {
    const firstEmpty = state.answers.findIndex((x) => x === null);
    if (firstEmpty >= 0) { state.idx = firstEmpty; save(); viewTest(); toast('아직 답하지 않은 문항이 있어요'); return; }
    save(); document.onkeydown = null;
    location.href = `${location.pathname}?a=${encode(state.answers)}#/result`;
    return;
  }
  state.idx = Math.max(0, n); save(); viewTest(); scrollTo(0, 0);
}

function growingPrint() {
  const r = analyze(state.answers.map((a) => a));
  const done = state.answers.filter((a) => a !== null).length;
  const rings = 4 + Math.round((done / QUESTIONS.length) * 23);
  const { segs } = makePrint(r.feats.map((f) => f.v), 'grow', { rings });
  return `<svg viewBox="0 0 ${PRINT_W} ${PRINT_H}"><path d="${segsToPath(segs)}" fill="none" stroke="#1A1B5E" stroke-width="2" stroke-linecap="round"/></svg>`;
}
function refreshGrowing() { const el = $('.growing'); if (el) el.firstElementChild.outerHTML = growingPrint(); }

// -------------------------------------------------------------
//  RESULT
// -------------------------------------------------------------
let region = 'world';

function printSVG(r, { big = false, labels = false } = {}) {
  const { segs, core } = r.print;
  const ridges = segs.map((s) => `<path class="ridge" pathLength="1" d="${segsToPath([s])}"/>`).join('');
  const sectors = labels ? FEATURES.map((_, i) => `<clipPath id="sc${i}"><path d="${sectorPath(i, core)}"/></clipPath><g class="hl" data-s="${i}" clip-path="url(#sc${i})"><path d="${segsToPath(segs)}"/></g>`).join('') : '';
  return `<svg class="${big ? 'print-big' : ''}" viewBox="0 0 ${PRINT_W} ${PRINT_H}" role="img" aria-label="응답으로 그린 지문">${ridges}${sectors}</svg>`;
}

function viewResult() {
  const urlAns = decode(new URLSearchParams(location.search).get('a'));
  const ownDone = complete(state.answers);
  const ownCode = ownDone ? encode(state.answers) : null;
  const answers = urlAns || (ownDone ? state.answers : null);
  if (!answers) { location.hash = '#/test'; return; }
  const isFriend = !!urlAns && encode(urlAns) !== ownCode;
  if (isFriend) store.set(FKEY, encode(urlAns));

  const r = analyze(answers);
  const me = isFriend ? (ownDone ? analyze(state.answers) : null) : r;
  const friendCode = isFriend ? r.code : store.get(FKEY);
  const friend = friendCode && friendCode !== (me && me.code) ? analyze(decode(friendCode)) : null;
  const shareUrl = `${SITE_URL}/p/${r.have}?a=${r.code}`;
  document.title = `${isFriend ? '친구의' : '나의'} 바디프린트 · 12가지 중 ${r.have}가지 · BODYPRINT`;

  const whoSays = isFriend ? '친구는' : '당신은';
  shell(`
  ${isFriend ? `<div class="friend-strip"><div class="page"><span>친구가 보낸 바디프린트예요. 친구는 12가지 중 <b>${r.have}가지</b>가 된대요.</span>${ownDone ? '<a href="#/me" id="mine">내 결과와 비교 아래에서 보기</a>' : '<a href="#/test" id="start">나도 해 보기</a>'}</div></div>` : ''}
  <section class="page res">
    <div class="stick"><div class="stick-in">
      ${printSVG(r, { big: true, labels: true }).replace('class="print-big"', `class="print-big ${reduced ? '' : 'draw'}"`)}
      <div class="print-cap">바디프린트 <b>No. ${r.id}</b> · 응답 ${QUESTIONS.length}개로 그린 하나뿐인 무늬</div>
    </div></div>
    <div class="flow">
      <h1 class="score">${whoSays} 12가지 특징 중 <span class="num">${r.have}</span>가지를 가지고 있어요.</h1>
      <p class="score-sub">${[r.half ? `반쯤 되는 특징 ${r.half}가지` : '', r.unknown ? `모르는 특징 ${r.unknown}가지` : ''].filter(Boolean).join(', ').replace(/(.+)/, '$1.') || '모든 특징에 답했어요.'} 항목을 누르면 근거와 세계 빈도가 펼쳐지고, 지문에서 그 특징이 그려진 영역이 표시돼요.</p>
      <div class="res-actions">
        ${isFriend ? `<a class="btn" href="#/test" id="start2">${ownDone ? '다시 해 보기' : '나도 해 보기'}</a>` : '<button class="btn" id="toShare">친구에게 "너 이거 돼?" 보내기</button><a class="btn line" href="#/test" id="retake">다시 하기</a>'}
      </div>
      <ol class="flist">${r.feats.map(featureRow).join('')}</ol>
    </div>
  </section>

  ${friend && me ? compareHTML(me, friend) : ''}

  <section class="page rare" id="rare"></section>

  ${!isFriend ? `<section class="page share" id="share">
    <div class="card"><img id="cardImg" alt="공유용 바디프린트 카드 미리보기"></div>
    <div class="side">
      <h2>너 이거 돼?</h2>
      <p>내가 되는 것과 안 되는 것이 찍힌 카드를 보내 보세요. 받은 친구는 바로 자기 몸으로 따라 해 보고, 둘의 바디프린트를 나란히 비교할 수 있어요.</p>
      <div class="sns">
        ${sbtn('native', '공유하기', 'var(--ink)', ICON.share)}
        ${sbtn('kakao', '카카오톡', '#FEE500', ICON.kakao)}
        ${sbtn('insta', '인스타 스토리', 'linear-gradient(45deg,#F9CE34,#EE2A7B,#6228D7)', ICON.insta)}
        ${sbtn('x', 'X', '#000', ICON.x)}
        ${sbtn('threads', 'Threads', '#000', ICON.threads)}
        ${sbtn('facebook', '페이스북', '#1877F2', ICON.fb)}
        ${sbtn('image', '이미지 저장', 'var(--rose)', ICON.down)}
        ${sbtn('copy', '링크 복사', 'var(--ink-2)', ICON.link)}
      </div>
      <div class="copyline"><input id="shareUrl" readonly value="${shareUrl}" aria-label="공유 링크"><button id="copy">복사</button></div>
    </div>
  </section>` : ''}`);

  // 상호작용: 항목 펼치기 + 지문 영역 강조
  const hl = (i, on) => app.querySelector(`.print-big .hl[data-s="${i}"]`)?.classList.toggle('on', on);
  app.querySelectorAll('.flist > li').forEach((li) => {
    const i = Number(li.dataset.i); const btn = li.querySelector('.frow');
    btn.addEventListener('click', () => { const open = li.classList.toggle('open'); btn.setAttribute('aria-expanded', open); hl(i, open); });
    li.addEventListener('pointerenter', () => hl(i, true));
    li.addEventListener('pointerleave', () => hl(i, li.classList.contains('open')));
  });
  renderRare(r);
  const reset = (e) => { e.preventDefault(); state.answers = Array(QUESTIONS.length).fill(null); state.idx = 0; save(); location.href = `${location.pathname}#/test`; };
  ['#retake', '#start', '#start2'].forEach((s) => $(s)?.addEventListener('click', reset));
  $('#toShare')?.addEventListener('click', () => $('#share').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
  $('#mine')?.addEventListener('click', (e) => { e.preventDefault(); $('#vs')?.scrollIntoView({ behavior: 'smooth' }); });
  if (!isFriend) { bindShare(r, shareUrl); makeCard(r, 'post').then((b) => { const img = $('#cardImg'); if (img && b) img.src = URL.createObjectURL(b); }); }
}

function featureRow(f) {
  const side = sideOf(f);
  const stampTxt = { have: '돼요', half: '반쯤', not: '안 돼요', unknown: '모름' }[f.status];
  const ref = side || f.have;
  const fq = ref.freq;
  const meter = (name, v) => (v === undefined
    ? `<div class="meter na"><span>${name}</span><div class="bar"></div><b>데이터 부족</b></div>`
    : `<div class="meter"><span>${name}</span><div class="bar">${Array.isArray(v) ? `<i class="r" style="width:${v[1]}%"></i><i style="width:${v[0]}%"></i>` : `<i style="width:${v}%"></i>`}</div><b>${fmtPct(v)}</b></div>`);
  const meters = (fq.world === undefined && fq.eastAsia === undefined && !fq.ref)
    ? meter('집단 빈도', undefined)
    : [meter('전 세계', fq.world), meter('동아시아', fq.eastAsia), fq.ref ? meter(fq.ref.pop, fq.ref.v) : ''].join('');
  const ev = EVIDENCE[f.evidence];
  return `<li data-i="${f.i}">
    <button class="frow" aria-expanded="false"><span class="no">${String(f.i + 1).padStart(2, '0')}</span>
      <span class="t">${f.ask}<small>${side ? side.label : f.status === 'half' ? `${f.have.label}와 ${f.not.label} 사이` : '응답하지 않음'}</small></span>
      <span class="stamp ${f.status}">${stampTxt}</span></button>
    <div class="fdetail">
      <p style="font-weight:700;color:var(--ink);margin-bottom:6px">"${ref.label}"인 사람의 비율${side ? '' : ' (참고)'}</p>
      ${meters}
      <div class="ev"><span class="${f.evidence === 'strong' ? 'strong' : ''}">${ev.label}: ${ev.desc}</span>${f.proxy ? '<span>간접 추정</span>' : ''}</div>
      <p>${f.fact}</p>
      <p class="myth">${f.myth}</p>
      <div class="srcs">출처 ${f.sources.map((s) => `<a href="${SOURCES[s].url}" target="_blank" rel="noopener" title="${SOURCES[s].full}">${SOURCES[s].short}</a>`).join('')}</div>
    </div>
  </li>`;
}

function renderRare(r) {
  const c = combo(r.feats, region);
  const name = region === 'world' ? '전 세계' : '동아시아';
  $('#rare').innerHTML = `
    <div class="toggle" role="group" aria-label="비교 기준"><button data-r="world" aria-pressed="${region === 'world'}">전 세계 기준</button><button data-r="eastAsia" aria-pressed="${region === 'eastAsia'}">동아시아 기준</button></div>
    ${c.p === null
      ? `<p class="rare-line">이 기준으로는 <b>데이터가 부족해요.</b></p><p class="rare-note">계산에 쓸 수 있는 빈도 자료가 있는 특징이 없어요. 다른 기준을 눌러 보세요.</p>`
      : `<p class="rare-line">${name}에서 아래 ${c.used.length}가지가 나와 똑같은 사람은 <b>약 ${oneIn(c.p)}명 중 1명</b>이에요.</p>
         <p class="rare-note">약 ${sig(c.p * 100)}%${c.lo !== c.hi ? ` (논문 범위를 반영하면 ${sig(c.lo * 100)}~${sig(c.hi * 100)}%)` : ''}. 특징끼리 서로 관계가 없다고 가정하고 곱한 추정치예요. 실제로는 같은 집단 안에서 특징끼리 연관될 수 있어서 대략적인 값으로 봐 주세요.${region === 'world' ? ' 귀지·고수처럼 집단 차이가 큰 특징은 세계 평균이 의미가 없어서 동아시아 기준에서만 계산해요.' : ''}</p>`}
    <div class="rare-cols">
      <div><h3>계산에 쓴 특징 ${c.used.length}개</h3><ul>${c.used.map(([f, side, v]) => `<li><span>${side.label}${f.proxy ? ' (간접)' : ''}</span><span>${fmtPct(v)}</span></li>`).join('') || '<li><span>없음</span></li>'}</ul></div>
      <div><h3>뺀 특징 ${c.out.length}개</h3><ul>${c.out.map(([f, why]) => `<li><span>${f.short}</span><span>${why}</span></li>`).join('')}</ul></div>
    </div>`;
  $('#rare').querySelectorAll('[data-r]').forEach((b) => b.addEventListener('click', () => { region = b.dataset.r; renderRare(r); }));
}

function compareHTML(me, fr) {
  const same = me.feats.filter((f, i) => f.status === fr.feats[i].status && f.status !== 'unknown').length;
  const both = me.feats.filter((f, i) => f.status === 'have' && fr.feats[i].status === 'have').map((f) => f.short);
  return `<section class="page vs" id="vs">
    <div class="sec-head"><h2>나 vs 친구</h2><p>${both.length ? `둘 다 되는 것: ${both.join(', ')}.` : '둘 다 되는 특징은 하나도 없어요.'} 같은 답이 많을수록 지문 무늬도 닮아 보여요.</p></div>
    <div class="vs-prints">
      <div>${printSVG(me)}<div class="who"><b>${me.have}/12</b>나</div></div>
      <div class="vs-mid">${same}<small>12개 중 같은 답</small></div>
      <div>${printSVG(fr)}<div class="who"><b>${fr.have}/12</b>친구</div></div>
    </div>
    <table class="vs-table"><thead><tr><th>특징</th><th>나</th><th>친구</th></tr></thead><tbody>
      ${me.feats.map((f, i) => `<tr class="${f.status === fr.feats[i].status && f.status === 'have' ? 'same' : ''}"><td>${f.short}</td><td><span class="dot ${f.status}" title="${f.status}"></span></td><td><span class="dot ${fr.feats[i].status}"></span></td></tr>`).join('')}
    </tbody></table>
    <p style="text-align:center;font-size:13px;color:var(--ink-3);margin-top:14px"><span class="dot have"></span> 돼요 &nbsp; <span class="dot half"></span> 반쯤 &nbsp; <span class="dot not"></span> 안 돼요 &nbsp; <span class="dot unknown"></span> 모름</p>
  </section>`;
}

// -------------------------------------------------------------
//  공유
// -------------------------------------------------------------
const ICON = {
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/></svg>',
  kakao: '<svg viewBox="0 0 24 24"><path fill="#191919" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.5.1 1 .1 1.5.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg>',
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
  threads: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M17 8.5C16 5.5 13.8 4 11.8 4 7.5 4 5 7.2 5 12s2.5 8 6.8 8c3.7 0 6.2-2.2 6.2-5.2 0-2.7-2.2-4.3-5.4-4.3-2.3 0-3.8 1.2-3.8 2.8 0 1.5 1.3 2.5 3 2.5 2.6 0 3.9-2 3.7-5.6"/></svg>',
  fb: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>',
};
const sbtn = (id, label, bg, icon) => `<button data-share="${id}"><span class="ic" style="background:${bg}">${icon}</span>${label}</button>`;

function bindShare(r, url) {
  const haves = r.feats.filter((f) => f.status === 'have').map((f) => f.short);
  const text = `나는 몸의 숨은 기능 12가지 중 ${r.have}가지 돼${haves.length ? ` (${haves.slice(0, 3).join(', ')}${haves.length > 3 ? ' …' : ''})` : ''}. 너 이거 돼? #바디프린트`;
  const copy = async (msg = '링크를 복사했어요') => {
    try { await navigator.clipboard.writeText(url); } catch (e) { const i = $('#shareUrl'); i.select(); document.execCommand('copy'); }
    toast(msg);
  };
  $('#copy').addEventListener('click', () => copy());
  const open = (u) => window.open(u, '_blank', 'noopener,width=600,height=640');
  const native = async () => { if (navigator.share) { try { await navigator.share({ title: 'BODYPRINT', text, url }); } catch (e) { /* 취소 */ } } else copy(); };
  const actions = {
    native,
    copy: () => copy(),
    kakao: async () => {
      if (KAKAO_JS_KEY) {
        try {
          await loadKakao();
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: `12가지 중 ${r.have}가지 돼. 너 이거 돼?`, description: '혀 말기, 숨은 손목 힘줄, 햇빛 재채기… 내 몸의 숨은 기능 찾기', imageUrl: `${SITE_URL}/og/${r.have}.png`, link: { mobileWebUrl: url, webUrl: url } },
            buttons: [{ title: '나도 해 보기', link: { mobileWebUrl: url, webUrl: url } }],
          });
          return;
        } catch (e) { /* 키 오류 → 대체 */ }
      }
      if (navigator.share) native(); else copy('링크를 복사했어요. 카카오톡 대화창에 붙여넣어 주세요');
    },
    insta: async () => {
      const blob = await makeCard(r, 'story');
      const file = new File([blob], `bodyprint-${r.id}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); return; } catch (e) { /* noop */ } }
      download(blob, file.name); toast('스토리용 이미지를 저장했어요');
    },
    x: () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`),
    threads: () => open(`https://www.threads.net/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`),
    facebook: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    image: async () => { download(await makeCard(r, 'post'), `bodyprint-${r.id}.png`); toast('카드 이미지를 저장했어요'); },
  };
  app.querySelectorAll('[data-share]').forEach((b) => b.addEventListener('click', () => actions[b.dataset.share]()));
}

function loadKakao() {
  return new Promise((res, rej) => {
    if (window.Kakao) { if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_JS_KEY); res(); return; }
    const s = document.createElement('script'); s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'; s.crossOrigin = 'anonymous';
    s.onload = () => { window.Kakao.init(KAKAO_JS_KEY); res(); }; s.onerror = rej; document.head.appendChild(s);
  });
}
function download(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }

// 공유 카드: 1080×1350(게시물) / 1080×1920(스토리)
async function makeCard(r, mode) {
  const W = 1080; const H = mode === 'story' ? 1920 : 1350;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const SERIF = "Hahmlet, 'Noto Serif KR', serif"; const SANS = "'Pretendard Variable', Pretendard, sans-serif";
  try { await Promise.all([document.fonts.load(`800 80px Hahmlet`), document.fonts.load(`300 80px Hahmlet`), document.fonts.load(`600 30px 'Pretendard Variable'`)]); } catch (e) { /* noop */ }
  g.fillStyle = '#ECE8F1'; g.fillRect(0, 0, W, H);
  const top = mode === 'story' ? 150 : 70;
  g.fillStyle = '#1A1B5E'; g.textBaseline = 'alphabetic';
  g.font = `900 40px ${SERIF}`; g.fillText('BODYPRINT', 72, top + 30);
  g.font = `500 26px ${SANS}`; g.fillStyle = '#8583AC'; g.textAlign = 'right'; g.fillText(`No. ${r.id}`, W - 72, top + 28); g.textAlign = 'left';
  // 지문
  const ps = mode === 'story' ? 2.3 : 2.05; const pw = PRINT_W * ps;
  const px = mode === 'story' ? (W - pw) / 2 : W - pw - 56; const py = top + (mode === 'story' ? 80 : 60);
  drawPrintCanvas(g, r.print.segs, px, py, ps, 'rgba(26,27,94,.9)', 1.5);
  // 큰 문장
  const ty = mode === 'story' ? py + PRINT_H * ps + 100 : top + 250;
  g.fillStyle = '#1A1B5E'; g.font = `300 58px ${SERIF}`; g.fillText('12가지 중', 72, ty);
  g.fillStyle = '#F2557A'; g.font = `800 270px ${SERIF}`; g.fillText(String(r.have), 60, ty + 245);
  const nw = g.measureText(String(r.have)).width;
  g.fillStyle = '#1A1B5E'; g.font = `300 58px ${SERIF}`; g.fillText('가지 돼', 72 + nw + 10, ty + 245);
  // 목록
  const ly = mode === 'story' ? ty + 340 : py + PRINT_H * ps + 70;
  const colW = (W - 144) / 2;
  g.font = `600 30px ${SANS}`;
  r.feats.forEach((f, i) => {
    const x = 72 + (i % 2) * colW; const y = ly + Math.floor(i / 2) * (mode === 'story' ? 50 : 54);
    g.beginPath(); g.arc(x + 12, y - 10, 12, 0, 7);
    if (f.status === 'have') { g.fillStyle = '#F2557A'; g.fill(); } else { g.lineWidth = 2.5; g.strokeStyle = f.status === 'half' ? '#F2557A' : '#8583AC'; g.stroke(); }
    g.fillStyle = f.status === 'have' ? '#1A1B5E' : '#8583AC'; g.fillText(f.short, x + 38, y);
  });
  // 하단
  g.fillStyle = '#1A1B5E'; g.font = `800 ${mode === 'story' ? 92 : 76}px ${SERIF}`;
  g.fillText('너 이거 돼?', 72, H - (mode === 'story' ? 190 : 110));
  g.font = `500 28px ${SANS}`; g.fillStyle = '#4B4D86';
  g.fillText(`${SITE_URL.replace(/^https?:\/\//, '')} 에서 해 보기`, 72, H - (mode === 'story' ? 130 : 60));
  return new Promise((res) => cv.toBlob(res, 'image/png'));
}

// -------------------------------------------------------------
//  SOURCES
// -------------------------------------------------------------
function viewSources() {
  shell(`<section class="sec" style="border-top:0"><div class="page">
    <div class="sec-head"><h2>근거 문헌</h2><p>모든 빈도와 설명은 아래 문헌에서 가져왔어요. 수치가 없는 특징은 "데이터 부족"으로 표시해요. "간접 추정"은 실제 검사(쓴맛 시약, 유당 흡수 검사 등) 대신 일상 경험으로 답한 특징이라는 뜻이에요.</p></div>
    <ol class="src-list">${Object.values(SOURCES).map((s) => `<li><div>${s.full}<br><a href="${s.url}" target="_blank" rel="noopener">${s.url}</a></div></li>`).join('')}</ol>
    <div class="ev" style="margin-top:36px">${Object.entries(EVIDENCE).map(([k, e]) => `<span class="${k === 'strong' ? 'strong' : ''}">${e.label}: ${e.desc}</span>`).join('')}</div>
  </div></section>`, 'sources');
}

// -------------------------------------------------------------
//  ROUTER
// -------------------------------------------------------------
function route() {
  const h = location.hash.replace(/^#/, '') || '/';
  document.onkeydown = null;
  if (h.startsWith('/test')) { document.title = '테스트 · BODYPRINT'; viewTest(); }
  else if (h.startsWith('/result')) viewResult();
  else if (h.startsWith('/sources')) { document.title = '근거 문헌 · BODYPRINT'; viewSources(); }
  else if (h.startsWith('/me')) { location.replace(`${location.pathname}?a=${encode(state.answers)}#/result`); return; }
  else { document.title = 'BODYPRINT · 너 이거 돼?'; viewHome(); }
  if (!h.startsWith('/result') || !location.hash.includes('share')) scrollTo(0, 0);
}
addEventListener('hashchange', (e) => { if (location.hash === '#share' || location.hash === '#rare') return; route(); });
if (new URLSearchParams(location.search).get('a') && !location.hash) location.hash = '#/result';
route();
