import { QUESTIONS, TRAITS, TYPES, AXES, SOURCES, EVIDENCE, SCALE } from './data.js';
import { ILLUS, typeEmblem } from './illus.js';
import { SITE_URL, KAKAO_JS_KEY } from './config.js';

const PER_PAGE = 4;
const STORE_KEY = 'gene-mbti:v1';
const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');

// -------------------------------------------------------------
//  상태 / 저장
// -------------------------------------------------------------
const state = { answers: Array(QUESTIONS.length).fill(null), page: 0 };
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* 저장 불가 환경 */ } }
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (s && Array.isArray(s.answers) && s.answers.length === QUESTIONS.length) Object.assign(state, s);
  } catch (e) { /* noop */ }
}

// answers: 값 = SCALE 인덱스(0~6) | 'skip' | null
const encode = (ans) => ans.map((a) => (a === 'skip' || a === null ? 'x' : String(a))).join('');
function decode(str) {
  if (!str || str.length !== QUESTIONS.length || !/^[0-6x]+$/.test(str)) return null;
  return str.split('').map((c) => (c === 'x' ? 'skip' : Number(c)));
}

// -------------------------------------------------------------
//  채점
// -------------------------------------------------------------
function analyze(answers) {
  const val = (i) => (typeof answers[i] === 'number' ? SCALE[answers[i]] : null); // +3 ~ -3
  // 축
  const axes = AXES.map((ax) => {
    const vs = QUESTIONS.map((q, i) => (q.axis === ax.id && val(i) !== null ? val(i) * q.dir : null)).filter((v) => v !== null);
    if (!vs.length) return { ...ax, pct: 50, letter: ax.a.letter, side: 'a', n: 0 };
    const mean = vs.reduce((s, v) => s + v, 0) / vs.length;
    const pct = Math.round(((mean + 3) / 6) * 100);
    const side = pct >= 50 ? 'a' : 'b';
    return { ...ax, pct, side, letter: ax[side].letter, n: vs.length };
  });
  const code = axes.map((a) => a.letter).join('');

  // 형질
  const traits = Object.entries(TRAITS).map(([id, t]) => {
    const vs = QUESTIONS.map((q, i) => (q.trait === id && val(i) !== null ? val(i) : null)).filter((v) => v !== null);
    // 크로노타입: night 문항은 방향 반대
    let score = null;
    if (vs.length) {
      const oriented = QUESTIONS.map((q, i) => (q.trait === id && val(i) !== null ? val(i) * q.dir : null)).filter((v) => v !== null);
      score = oriented.reduce((s, v) => s + v, 0) / oriented.length;
    }
    let outcome = null;
    if (score !== null) outcome = score >= 1 ? 'pos' : score <= -1 ? 'neg' : 'mid';
    return { id, ...t, score, outcome };
  });
  return { axes, code, traits };
}

const mid = (v) => (Array.isArray(v) ? (v[0] + v[1]) / 2 : v);
const lo = (v) => (Array.isArray(v) ? v[0] : v);
const hi = (v) => (Array.isArray(v) ? v[1] : v);
const fmtPct = (v) => (Array.isArray(v) ? `${v[0]}~${v[1]}%` : `${+v.toFixed(2)}%`);

function combo(traits, region) {
  const used = []; const excluded = [];
  for (const t of traits) {
    if (!t.outcome) { excluded.push({ t, why: '응답 없음' }); continue; }
    if (t.outcome === 'mid') { excluded.push({ t, why: '중간 응답' }); continue; }
    const f = t[t.outcome].freq[region];
    if (f === undefined || f === null) {
      const any = Object.keys(t[t.outcome].freq).length > 0;
      excluded.push({ t, why: any ? (region === 'world' ? '세계 수치 없음' : '동아시아 수치 없음') : '데이터 부족' }); continue;
    }
    used.push({ t, f });
  }
  if (!used.length) return { used, excluded, p: null };
  const p = used.reduce((s, u) => s * mid(u.f) / 100, 1);
  const pLo = used.reduce((s, u) => s * lo(u.f) / 100, 1);
  const pHi = used.reduce((s, u) => s * hi(u.f) / 100, 1);
  return { used, excluded, p, pLo, pHi };
}

const sig = (x) => {
  if (x >= 10) return x.toFixed(0);
  if (x >= 1) return x.toFixed(1);
  return x.toPrecision(2);
};
const oneIn = (p) => {
  const n = 1 / p;
  if (n < 10) return n.toFixed(1);
  const mag = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1);
  return (Math.round(n / mag) * mag).toLocaleString('ko-KR');
};

function rarest(traits) {
  const list = [];
  for (const t of traits) {
    if (!t.outcome || t.outcome === 'mid') continue;
    const f = t[t.outcome].freq;
    const cands = [];
    if (f.world !== undefined) cands.push({ where: '전 세계', v: f.world });
    if (f.eastAsia !== undefined) cands.push({ where: '동아시아', v: f.eastAsia });
    // 참고 집단(ref)은 내가 속한 집단이 아닐 수 있어 희귀도 순위에서는 제외
    if (!cands.length) continue;
    const best = cands.sort((a, b) => mid(a.v) - mid(b.v))[0];
    list.push({ t, ...best });
  }
  return list.sort((a, b) => mid(a.v) - mid(b.v)).slice(0, 3);
}

// -------------------------------------------------------------
//  공통 UI
// -------------------------------------------------------------
const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
  ${[[20, 4, 2.2, '#4298B4'], [29, 7, 2, '#33A474'], [35, 14, 2, '#E4AE3A'], [36, 24, 2, '#E4AE3A'], [31, 32, 2, '#88619A'], [22, 36, 2.2, '#88619A'], [12, 34, 2, '#33A474'], [5, 27, 2, '#4298B4'], [4, 17, 2, '#88619A'], [10, 8, 2, '#E4AE3A']].map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}
  <circle cx="20" cy="14" r="5" fill="#4298B4"/><circle cx="27" cy="21" r="5" fill="#E4AE3A"/><circle cx="20" cy="28" r="5" fill="#33A474"/><circle cx="13" cy="21" r="5" fill="#88619A"/>
</svg>`;

function shell(content) {
  app.innerHTML = `
  <header class="hdr"><div class="wrap">
    <a class="logo" href="#/">${LOGO}<span>유전자 MBTI<small>Body Trait Explorer</small></span></a>
    <nav class="nav"><a href="#/test">테스트</a><a href="#/" data-scroll="types">4가지 축</a><a href="#/" data-scroll="myths">유전 상식</a><a href="#/sources">근거 문헌</a></nav>
    <a class="hdr-cta" href="#/test">테스트 시작</a>
  </div></header>
  <main>${content}</main>
  <footer class="ftr"><div class="wrap">
    <div><b>유전자 MBTI</b> · 내 몸의 숨겨진 특징을 발견하는 테스트</div>
    <div>이 테스트는 유전자 검사가 아닙니다. 직접 해 본 동작과 기억을 바탕으로 한 자가 관찰 결과이며, 의학적 진단을 대신하지 않습니다. 4글자 유형 코드는 재미로 붙인 이름이고 성격과는 관련이 없습니다. 각 형질의 빈도는 논문에서 가져왔고, 근거가 부족한 값은 "데이터 부족"으로 표시합니다.</div>
    <div><a href="#/sources">근거 문헌 ${Object.keys(SOURCES).length}편 보기</a></div>
  </div></footer>`;
  app.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const go = () => document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    if (location.hash.replace('#', '') !== '/' && location.hash !== '') { location.hash = '#/'; setTimeout(go, 60); } else go();
  }));
}

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200);
}

// -------------------------------------------------------------
//  홈
// -------------------------------------------------------------
const STEP_ART = {
  s1: `<svg viewBox="0 0 160 110" width="170"><rect x="40" y="18" width="80" height="80" rx="10" fill="#4298B4"/><rect x="48" y="26" width="64" height="64" rx="6" fill="#fff"/>${[38, 54, 70].map((y) => `<circle cx="60" cy="${y}" r="5" fill="none" stroke="#4298B4" stroke-width="3"/><rect x="72" y="${y - 3}" width="32" height="6" rx="3" fill="#CFE8F1"/>`).join('')}<path d="M56 54 l4 4 l7 -8" stroke="#33A474" stroke-width="3" fill="none"/><path d="M118 30 c 18 -6 26 8 20 22 c -4 10 -16 6 -20 0" fill="#F5CBA7"/></svg>`,
  s2: `<svg viewBox="0 0 160 110" width="170"><rect x="30" y="20" width="100" height="74" rx="8" fill="#33A474"/><rect x="38" y="28" width="84" height="58" rx="5" fill="#fff"/><rect x="48" y="62" width="10" height="16" fill="#4298B4"/><rect x="64" y="50" width="10" height="28" fill="#E4AE3A"/><rect x="80" y="40" width="10" height="38" fill="#33A474"/><rect x="96" y="54" width="10" height="24" fill="#88619A"/><circle cx="122" cy="26" r="16" fill="#fff" stroke="#33A474" stroke-width="4"/><path d="M134 38 l12 12" stroke="#33A474" stroke-width="6" stroke-linecap="round"/></svg>`,
  s3: `<svg viewBox="0 0 160 110" width="170"><circle cx="50" cy="56" r="16" fill="#88619A"/><circle cx="112" cy="28" r="14" fill="#E4AE3A"/><circle cx="114" cy="84" r="14" fill="#4298B4"/><path d="M64 50 L 99 33 M64 62 L 101 79" stroke="#88619A" stroke-width="4"/><path d="M44 56 l4 4 l8 -9" stroke="#fff" stroke-width="3" fill="none"/></svg>`,
};

function viewHome() {
  const nSrc = Object.keys(SOURCES).length;
  shell(`
  <section class="hero">
    <div class="wrap">
      <div class="hero-mark">${LOGO.replace('class="logo-mark"', 'width="64" height="64"')}</div>
      <span class="eyebrow">무료 · 회원가입 없음 · 약 4분</span>
      <h1><span class="accent">유전자 MBTI</span><br>내 몸의 숨은 특징 찾기</h1>
      <p class="sub">혀 말기부터 손목 힘줄, 귀지 타입, 햇빛 재채기까지. 직접 해 보고 답하면 논문과 통계를 근거로 내 몸의 특징을 분석해 드려요.</p>
      <div class="steps">
        <div class="step s1"><div class="art">${STEP_ART.s1}</div><div class="body"><span class="pill">1단계</span><h3>직접 해 보기</h3><p>사진처럼 혀를 말고, 손목을 굽히고, 엄지를 젖혀 보세요. 답은 7단계 스펙트럼으로 골라요.</p></div></div>
        <div class="step s2"><div class="art">${STEP_ART.s2}</div><div class="body"><span class="pill">2단계</span><h3>근거로 분석</h3><p>각 특징의 세계 빈도와 유전 근거 수준을 문헌 ${nSrc}편에서 가져와 함께 보여드려요.</p></div></div>
        <div class="step s3"><div class="art">${STEP_ART.s3}</div><div class="body"><span class="pill">3단계</span><h3>친구와 비교</h3><p>4글자 유전자 MBTI 카드를 친구에게 보내고, 누가 더 희귀한 몸인지 비교해 보세요.</p></div></div>
      </div>
    </div>
  </section>
  <section class="start wrap">
    <div class="meta"><div><b>${QUESTIONS.length}</b>직접 해 보는 문항</div><div><b>${Object.keys(TRAITS).length}</b>신체 형질</div><div><b>${nSrc}</b>근거 논문·자료</div><div><b>16</b>유전자 MBTI 유형</div></div>
    <a class="btn btn-primary" href="#/test">테스트 시작하기 →</a>
    <p class="disclaimer">유전자 검사가 아닌 자가 관찰 테스트예요. 응답은 내 브라우저에만 저장돼요.</p>
  </section>
  <section class="section soft" id="myths">
    <div class="wrap">
      <h2>옛날 유전 테스트, 다시 썼어요</h2>
      <p class="lead">교과서에 실렸던 "우성/열성" 설명 중에는 최신 연구로 뒤집힌 것이 많아요. 이 테스트는 지금까지 확인된 근거 수준을 형질마다 표시해요.</p>
      <div class="myths">
        <div class="myth"><div class="old">혀 말기 = 우성 유전</div><h3>👅 쌍둥이도 서로 달라요</h3><p>일란성 쌍둥이 중 한 명만 혀를 마는 경우가 흔하고, 연습으로 되는 사람도 있어요. 1940년 처음 "유전 형질"로 소개된 지 수십 년 만에 단순 유전이 아니라는 결론이 났어요.</p><div class="src">Martin, 1975 · McDonald, 2011</div></div>
        <div class="myth"><div class="old">붙은 귓불 = 열성 유전</div><h3>👂 49개 유전자가 함께 정해요</h3><p>7만여 명을 분석한 다민족 GWAS에서 49개 유전자 위치가 귓불 모양에 관여했어요. 귓불 모양은 둘 중 하나로 나뉘지 않고 붙음부터 떨어짐까지 이어지는 스펙트럼이에요.</p><div class="src">Shaffer et al., 2017</div></div>
        <div class="myth"><div class="old">귀지 타입은 위생 문제</div><h3>🦻 진짜 단일 유전자 형질</h3><p>ABCC11 유전자의 염기 하나가 귀지를 건성 또는 습성으로 정해요. 한국인은 대부분 건성인데, 유럽·아프리카계에서 건성은 3% 미만이에요.</p><div class="src">Yoshiura et al., 2006 (Nature Genetics)</div></div>
      </div>
    </div>
  </section>
  <section class="section" id="types">
    <div class="wrap">
      <h2>4가지 축 · 16가지 유형</h2>
      <p class="lead">관찰한 특징을 4개 축으로 묶어 4글자 코드를 만들어요. 코드는 재미로 붙인 이름이고, 진짜 핵심은 결과 화면의 형질별 근거 리포트예요.</p>
      <div class="axes">${AXES.map((a) => `
        <div class="axis-card"><div class="ax-top" style="color:${a.color}">${a.name} · ${a.en}</div>
        <div class="letters" style="color:${a.color}">${a.a.letter}<span>vs</span>${a.b.letter}</div>
        <p><b>${a.a.name}</b> ${a.a.desc}<br><b>${a.b.name}</b> ${a.b.desc}</p></div>`).join('')}
      </div>
    </div>
  </section>
  <section class="section soft">
    <div class="wrap">
      <h2>자주 묻는 질문</h2>
      <div class="faq">
        <details><summary>진짜 유전자 검사인가요?</summary><p>아니요. 침이나 혈액을 분석하지 않아요. 유전 연구에서 실제로 쓰인 관찰 항목을 직접 해 보고 답하면, 그 형질에 대해 논문이 밝혀낸 빈도와 유전 근거를 알려드리는 "자가 관찰 테스트"예요.</p></details>
        <details><summary>"나와 같은 조합은 전 세계 몇 %"는 어떻게 계산하나요?</summary><p>논문에 집단 빈도가 있는 형질만 골라, 형질끼리 서로 독립이라고 가정하고 곱한 <b>추정치</b>예요. 빈도 자료가 없는 형질이나 애매하게 답한 형질은 계산에서 빼고 "데이터 부족" 또는 "중간 응답"으로 따로 보여드려요. 임의로 만든 "상위 0.03%" 같은 숫자는 쓰지 않아요.</p></details>
        <details><summary>왜 Yes/No가 아니라 7단계인가요?</summary><p>귓불 모양이나 엄지가 젖혀지는 정도처럼 대부분의 신체 형질은 "된다/안 된다"로 딱 나뉘지 않아요. 이어진 스펙트럼으로 답해야 실제와 더 가까워요.</p></details>
        <details><summary>내 응답은 어디에 저장되나요?</summary><p>서버로 보내지 않아요. 내 브라우저에만 저장되고, 공유 링크를 만들 때만 응답이 링크 주소 안에 들어가요.</p></details>
      </div>
    </div>
  </section>`);
}

// -------------------------------------------------------------
//  테스트
// -------------------------------------------------------------
function viewTest() {
  const pages = Math.ceil(QUESTIONS.length / PER_PAGE);
  state.page = Math.min(state.page, pages - 1);
  const start = state.page * PER_PAGE;
  const qs = QUESTIONS.slice(start, start + PER_PAGE);

  shell(`
  <div class="progress-bar"><div class="wrap narrow">
    <div class="progress-track"><div class="progress-fill"></div></div>
    <div class="progress-label"></div>
  </div></div>
  <div class="test-head"><div class="wrap narrow">
    <h2>${['몸 구조 살펴보기', '손과 귀 관찰하기', '감각 떠올리기', '체질과 리듬 떠올리기'][state.page] || '테스트'}</h2>
    <p>${state.page + 1} / ${pages} 페이지 · 그림을 보며 직접 해 보고 가장 가까운 정도를 골라 주세요</p>
  </div></div>
  <div class="wrap narrow" id="qs">
    ${qs.map((q, k) => qHTML(q, start + k)).join('')}
  </div>
  <div class="test-nav wrap narrow">
    ${state.page > 0 ? '<button class="btn btn-ghost" id="prev">← 이전</button>' : ''}
    <button class="btn btn-primary" id="next">${state.page === pages - 1 ? '결과 보기 →' : '다음 →'}</button>
  </div>`);

  updateProgress();
  bindQs(start, qs.length);
  $('#prev')?.addEventListener('click', () => { state.page--; save(); viewTest(); window.scrollTo(0, 0); });
  $('#next').addEventListener('click', () => {
    const firstEmpty = qs.findIndex((_, k) => state.answers[start + k] === null);
    if (firstEmpty >= 0) {
      toast('아직 답하지 않은 문항이 있어요');
      $(`#q${start + firstEmpty}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (state.page === pages - 1) { save(); location.href = `${location.pathname}?a=${encode(state.answers)}#/result`; return; }
    state.page++; save(); viewTest(); window.scrollTo(0, 0);
  });
}

function qHTML(q, i) {
  const a = state.answers[i];
  return `
  <div class="q ${a !== null ? 'dim' : ''}" id="q${i}" data-i="${i}">
    <div class="q-mission">
      <div class="q-illus">${ILLUS[q.illus]()}</div>
      <div>
        <div class="q-num">Q${i + 1}</div>
        <div class="q-do">✋ 지금 해 보세요</div>
        <p class="q-mission-text">${q.mission}</p>
        <p class="q-statement">${q.q}</p>
        ${q.tip ? `<div class="q-tip">💡 ${q.tip}</div>` : ''}
      </div>
    </div>
    <div class="scale" role="radiogroup" aria-label="${q.q}">
      <span class="lbl l">${q.left}</span>
      <div class="dots">${SCALE.map((_, d) => `<button class="dot d${d} ${a === d ? 'on' : ''}" data-d="${d}" role="radio" aria-checked="${a === d}" aria-label="${['매우 그렇다', '그렇다', '약간 그렇다', '중간', '약간 아니다', '아니다', '전혀 아니다'][d]}"></button>`).join('')}</div>
      <span class="lbl r">${q.right}</span>
    </div>
    <div class="scale-foot"><span class="l">${q.left}</span><span class="r">${q.right}</span></div>
    <div class="skip-row"><button class="skip ${a === 'skip' ? 'on' : ''}">${q.skip || '잘 모르겠어요 / 해볼 수 없어요'}</button></div>
  </div>`;
}

function bindQs(start, n) {
  for (let k = 0; k < n; k++) {
    const i = start + k;
    const el = $(`#q${i}`);
    const set = (v) => {
      state.answers[i] = v; save();
      el.querySelectorAll('.dot').forEach((b) => { const on = Number(b.dataset.d) === v; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
      el.querySelector('.skip').classList.toggle('on', v === 'skip');
      el.classList.add('dim');
      updateProgress();
      const nextEl = $(`#q${i + 1}`);
      if (nextEl && k < n - 1) setTimeout(() => nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 180);
      else if (k === n - 1) setTimeout(() => $('#next').scrollIntoView({ behavior: 'smooth', block: 'center' }), 180);
    };
    el.querySelectorAll('.dot').forEach((b) => b.addEventListener('click', () => set(Number(b.dataset.d))));
    el.querySelector('.skip').addEventListener('click', () => set('skip'));
    el.addEventListener('mouseenter', () => el.classList.remove('dim'));
    el.addEventListener('mouseleave', () => { if (state.answers[i] !== null) el.classList.add('dim'); });
  }
}

function updateProgress() {
  const done = state.answers.filter((a) => a !== null).length;
  const pct = Math.round((done / QUESTIONS.length) * 100);
  const f = $('.progress-fill'); const l = $('.progress-label');
  if (f) f.style.width = pct + '%';
  if (l) l.textContent = `${pct}%`;
}

// -------------------------------------------------------------
//  결과
// -------------------------------------------------------------
let comboRegion = 'world';

function viewResult() {
  const params = new URLSearchParams(location.search);
  const fromUrl = decode(params.get('a'));
  const answers = fromUrl || (state.answers.every((a) => a !== null) ? state.answers : null);
  if (!answers) { location.hash = '#/test'; return; }
  const isFriend = fromUrl && encode(fromUrl) !== encode(state.answers);

  const r = analyze(answers);
  const type = TYPES[r.code];
  const hue = type.hue;
  const shareUrl = `${SITE_URL}/t/${r.code}?a=${encode(answers)}`;
  const rare = rarest(r.traits);

  document.title = `${r.code} ${type.name} · 유전자 MBTI`;

  shell(`
  ${isFriend ? `<div class="friend-banner">친구가 공유한 결과예요 👀 <a href="#/test" id="mine">나도 테스트하기 →</a></div>` : ''}
  <section class="r-hero" style="background:linear-gradient(135deg, ${hue}, ${shade(hue, -18)})">
    <div class="wrap">
      <div>
        <div class="r-kicker">${isFriend ? '친구의' : '나의'} 유전자 MBTI</div>
        <div class="r-code">${r.code}</div>
        <h1 class="r-name">${type.name}</h1>
        <p class="r-blurb">${type.blurb}</p>
        <span class="r-chip">ⓘ 유형 코드는 재미용이에요 · 근거는 아래 형질 리포트에 있어요</span>
      </div>
      <div class="emblem">${typeEmblem(r.code, hue)}</div>
    </div>
  </section>

  <section class="r-section"><div class="wrap narrow">
    <h2>4가지 축</h2>
    <p class="lead">답한 정도를 평균해서 어느 쪽에 더 가까운지 계산했어요.</p>
    <div class="bars">${r.axes.map((a) => {
      const pct = a.side === 'a' ? a.pct : 100 - a.pct;
      const word = a.side === 'a' ? a.a : a.b;
      return `<div class="bar-row">
        <div class="bar-top"><span style="color:${a.color}">${a.name} · ${pct}% ${word.name}</span><span class="pct" style="color:var(--ink-3)">${a.a.letter} ↔ ${a.b.letter}</span></div>
        <div class="bar"><div class="fill" style="background:${a.color};opacity:.25;left:0;width:100%"></div><div class="knob" style="left:${100 - a.pct}%;border-color:${a.color}"></div></div>
        <div class="bar-top" style="font-weight:600;color:var(--ink-3);font-size:12.5px;margin:6px 0 0"><span>${a.a.name}</span><span>${a.b.name}</span></div>
        <div class="bar-desc">${a.n ? word.desc : '<span class="na">이 축의 문항을 모두 건너뛰어 판단할 수 없어요 (데이터 부족).</span>'}</div>
      </div>`;
    }).join('')}</div>
  </div></section>

  ${rare.length ? `<section class="r-section"><div class="wrap narrow">
    <h2>가장 희귀한 내 특징 Top ${rare.length}</h2>
    <p class="lead">전 세계 또는 동아시아 빈도가 나온 형질 중에서 나와 같은 사람이 가장 적은 순서예요.</p>
    <div class="rare">${rare.map((x, k) => `
      <div class="rare-card"><div class="rank">#${k + 1} 희귀</div><div class="emo">${x.t.emoji}</div>
      <h3>${x.t[x.t.outcome].label}</h3><div class="val">${fmtPct(x.v)}<small>${x.where}</small></div></div>`).join('')}
    </div>
  </div></section>` : ''}

  <section class="r-section"><div class="wrap narrow">
    <h2>나와 같은 조합을 가진 사람은?</h2>
    <p class="lead">논문에 빈도가 나온 형질만 모아 계산했어요. 근거가 없는 형질은 따로 표시하고 계산에서 뺐어요.</p>
    <div class="combo" id="combo"></div>
  </div></section>

  <section class="r-section"><div class="wrap">
    <h2 style="text-align:center">형질별 리포트</h2>
    <p class="lead" style="text-align:center">형질마다 유전 근거 수준, 집단별 빈도, 출처를 함께 보여드려요.</p>
    <div class="traits">${r.traits.map(traitCard).join('')}</div>
  </div></section>

  <section class="r-section share" id="share"><div class="wrap narrow">
    <h2>결과 공유하기</h2>
    <p class="lead">친구도 해 보게 하고, 누가 더 희귀한 몸인지 비교해 보세요.</p>
    <div class="share-grid">
      ${sbtn('native', '공유하기', '#343C4B', ICON.share)}
      ${sbtn('kakao', '카카오톡', '#FEE500', ICON.kakao, '#191919')}
      ${sbtn('insta', '인스타 스토리', 'linear-gradient(45deg,#F9CE34,#EE2A7B,#6228D7)', ICON.insta)}
      ${sbtn('x', 'X', '#000', ICON.x)}
      ${sbtn('threads', 'Threads', '#000', ICON.threads)}
      ${sbtn('facebook', '페이스북', '#1877F2', ICON.fb)}
      ${sbtn('image', '이미지 저장', '#33A474', ICON.down)}
    </div>
    <div class="share-url"><input id="shareUrl" readonly value="${shareUrl}"><button id="copy">복사</button></div>
    <div style="margin-top:36px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn-ghost" href="#/test" id="retake">다시 테스트하기</a>
      <a class="btn btn-ghost" href="#/sources">근거 문헌 보기</a>
    </div>
  </div></section>`);

  renderCombo(r);
  bindShare(r, type, shareUrl);
  $('#retake')?.addEventListener('click', (e) => { e.preventDefault(); resetAndTest(); });
  $('#mine')?.addEventListener('click', (e) => { e.preventDefault(); resetAndTest(); });
}

function resetAndTest() {
  state.answers = Array(QUESTIONS.length).fill(null); state.page = 0; save();
  location.href = `${location.pathname}#/test`;
}

function renderCombo(r) {
  const c = combo(r.traits, comboRegion);
  const box = $('#combo');
  const regionName = comboRegion === 'world' ? '전 세계' : '동아시아인';
  box.innerHTML = `
    <div class="combo-tabs"><button data-r="world" class="${comboRegion === 'world' ? 'on' : ''}">전 세계 기준</button><button data-r="eastAsia" class="${comboRegion === 'eastAsia' ? 'on' : ''}">동아시아 기준</button></div>
    ${c.p === null ? `<div class="combo-big">데이터 부족</div><div class="combo-sub">이 기준으로 계산할 수 있는 형질이 없어요.</div>` : `
      <div class="combo-tag">⚠️ 추정치 · 형질 간 독립 가정 · ${c.used.length}개 형질 기준</div>
      <div class="combo-big">약 ${sig(c.p * 100)}%</div>
      <div class="combo-sub">${regionName} 약 <b>${oneIn(c.p)}명 중 1명</b>이 아래 ${c.used.length}가지를 모두 나와 같이 가졌을 것으로 추정돼요.${c.pLo !== c.pHi ? `<br><span style="font-size:13.5px">논문 범위를 반영하면 ${sig(c.pLo * 100)}% ~ ${sig(c.pHi * 100)}%</span>` : ''}</div>`}
    <div class="combo-list">
      <div><h4>✅ 계산에 포함 (${c.used.length})</h4><ul>${c.used.map((u) => `<li><span>${u.t.emoji} ${u.t[u.t.outcome].label}${u.t.proxy ? ' <span class="badge gray">간접</span>' : ''}</span><span class="x">${fmtPct(u.f)}</span></li>`).join('') || '<li><span class="x">없음</span></li>'}</ul></div>
      <div><h4>➖ 계산에서 제외 (${c.excluded.length})</h4><ul>${c.excluded.map((e) => `<li><span>${e.t.emoji} ${e.t.name}</span><span class="x">${e.why}</span></li>`).join('')}</ul></div>
    </div>
    <p class="combo-note">실제 형질끼리는 서로 연관될 수 있어서(예: 같은 집단 안의 유전적 배경) 단순 곱셈은 대략적인 추정이에요. ${comboRegion === 'world' ? '귀지·고수처럼 집단 차이가 큰 형질은 전 세계 평균이 의미가 없어 "동아시아 기준"에서만 계산해요.' : '동아시아 빈도가 보고된 형질만 사용했어요.'}</p>`;
  box.querySelectorAll('[data-r]').forEach((b) => b.addEventListener('click', () => { comboRegion = b.dataset.r; renderCombo(r); }));
}

function traitCard(t) {
  const ev = EVIDENCE[t.evidence];
  const res = t.outcome ? t[t.outcome] : null;
  const f = res && t.outcome !== 'mid' ? res.freq : t.pos.freq;
  const rows = [];
  const color = { strong: 'var(--c-green)', moderate: 'var(--c-yellow)', weak: 'var(--c-purple)' }[t.evidence];
  const row = (name, v) => {
    if (v === undefined || v === null) return `<div class="freq na"><span>${name}</span><div class="fb"></div><span class="fv">데이터 부족</span></div>`;
    const range = Array.isArray(v);
    return `<div class="freq"><span>${name}</span><div class="fb">${range ? `<i class="range" style="width:${v[1]}%;background:${color}"></i><i style="width:${v[0]}%;background:${color}"></i>` : `<i style="width:${v}%;background:${color}"></i>`}</div><span class="fv">${fmtPct(v)}</span></div>`;
  };
  if (f.world === undefined && f.eastAsia === undefined && !f.ref) rows.push(row('집단 빈도', undefined));
  else {
    rows.push(row('전 세계', f.world));
    rows.push(row('동아시아', f.eastAsia));
    if (f.ref) rows.push(row(f.ref.pop, f.ref.v));
  }
  const freqTitle = res && t.outcome !== 'mid' ? `"${res.label}" 인 사람의 비율` : `"${t.pos.label}" 인 사람의 비율 (참고)`;
  return `
  <article class="trait ${!t.outcome ? 'skipped' : ''}">
    <div class="trait-head"><div class="emo">${t.emoji}</div><div>
      <h3>${t.name}</h3>
      <div class="trait-result">${res ? res.label : '응답 없음'}</div>
    </div></div>
    <div class="badges"><span class="badge ${ev.color}" title="${ev.desc}">${ev.label}</span>${t.proxy ? '<span class="badge gray">간접 추정</span>' : ''}</div>
    <div style="font-size:12.5px;font-weight:700;color:var(--ink-3)">${freqTitle}</div>
    <div class="freqs">${rows.join('')}</div>
    <p>${t.fact}</p>
    <div class="myth-line">${t.myth}</div>
    <div class="srcs">출처: ${t.sources.map((s) => `<a href="${SOURCES[s].url}" target="_blank" rel="noopener" title="${SOURCES[s].full}">${SOURCES[s].short}</a>`).join('')}</div>
  </article>`;
}

function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (pct / 100) * 255)));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map((c) => c.toString(16).padStart(2, '0')).join('');
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
};
const sbtn = (id, label, bg, icon) => `<button class="sbtn" data-share="${id}"><span class="ic" style="background:${bg}">${icon}</span>${label}</button>`;

function bindShare(r, type, url) {
  const text = `나의 유전자 MBTI는 ${r.code} "${type.name}" 🧬 내 몸의 숨겨진 특징, 너도 찾아봐!`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); toast('링크를 복사했어요'); }
    catch (e) { const i = $('#shareUrl'); i.select(); document.execCommand('copy'); toast('링크를 복사했어요'); }
  };
  $('#copy').addEventListener('click', copy);
  const open = (u) => window.open(u, '_blank', 'noopener,width=600,height=640');
  const actions = {
    native: async () => {
      if (navigator.share) { try { await navigator.share({ title: '유전자 MBTI', text, url }); } catch (e) { /* 취소 */ } } else copy();
    },
    kakao: async () => {
      if (KAKAO_JS_KEY) {
        try {
          await loadKakao();
          window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: `나의 유전자 MBTI: ${r.code} ${type.name}`, description: '내 몸의 숨겨진 특징을 발견하는 테스트', imageUrl: `${SITE_URL}/og/${r.code}.png`, link: { mobileWebUrl: url, webUrl: url } },
            buttons: [{ title: '결과 보기', link: { mobileWebUrl: url, webUrl: url } }, { title: '나도 테스트', link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL } }],
          });
          return;
        } catch (e) { /* 키 오류 → 대체 */ }
      }
      if (navigator.share) { try { await navigator.share({ title: '유전자 MBTI', text, url }); } catch (e) { /* noop */ } }
      else { await copy(); toast('링크를 복사했어요. 카카오톡 대화창에 붙여넣어 주세요'); }
    },
    insta: async () => {
      const blob = await makeImage(r, type, 'story');
      const file = new File([blob], `gene-mbti-${r.code}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: '유전자 MBTI', text }); return; } catch (e) { /* noop */ }
      }
      downloadBlob(blob, file.name); toast('이미지를 저장했어요. 인스타 스토리에 올려 보세요!');
    },
    x: () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`),
    threads: () => open(`https://www.threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`),
    facebook: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    image: async () => { const blob = await makeImage(r, type, 'post'); downloadBlob(blob, `gene-mbti-${r.code}.png`); toast('결과 이미지를 저장했어요'); },
  };
  app.querySelectorAll('[data-share]').forEach((b) => b.addEventListener('click', () => actions[b.dataset.share]()));
}

function loadKakao() {
  return new Promise((res, rej) => {
    if (window.Kakao) { if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_JS_KEY); return res(); }
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    s.crossOrigin = 'anonymous';
    s.onload = () => { window.Kakao.init(KAKAO_JS_KEY); res(); };
    s.onerror = rej; document.head.appendChild(s);
  });
}

function downloadBlob(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

async function makeImage(r, type, mode) {
  const W = 1080; const H = mode === 'story' ? 1920 : 1350;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const F = '"Pretendard Variable", Pretendard, sans-serif';
  try { await document.fonts.load(`900 40px ${F}`); await document.fonts.load(`600 40px ${F}`); } catch (e) { /* noop */ }
  const hue = type.hue;
  const grd = g.createLinearGradient(0, 0, W, H); grd.addColorStop(0, hue); grd.addColorStop(1, shade(hue, -20));
  g.fillStyle = grd; g.fillRect(0, 0, W, H);
  // 장식
  g.globalAlpha = 0.12; g.fillStyle = '#fff';
  g.beginPath(); g.arc(W - 120, 180, 260, 0, 7); g.fill(); g.beginPath(); g.arc(80, H - 160, 220, 0, 7); g.fill();
  g.globalAlpha = 1;
  const top = mode === 'story' ? 260 : 120;
  g.fillStyle = '#fff'; g.textAlign = 'center';
  g.font = `700 40px ${F}`; g.fillText('나의 유전자 MBTI', W / 2, top);
  g.font = `900 220px ${F}`; g.fillText(r.code, W / 2, top + 230);
  g.font = `800 66px ${F}`; g.fillText(type.name, W / 2, top + 330);

  // 축 카드
  const cardY = top + 400; const cardH = 4 * 112 + 60;
  roundRect(g, 80, cardY, W - 160, cardH, 36); g.fillStyle = 'rgba(255,255,255,.96)'; g.fill();
  const axColors = ['#4298B4', '#E4AE3A', '#33A474', '#88619A'];
  r.axes.forEach((a, k) => {
    const y = cardY + 70 + k * 112;
    const pct = a.side === 'a' ? a.pct : 100 - a.pct;
    g.textAlign = 'left'; g.fillStyle = '#343C4B'; g.font = `800 34px ${F}`;
    g.fillText(`${a.name} · ${(a.side === 'a' ? a.a : a.b).name}`, 130, y);
    g.textAlign = 'right'; g.fillStyle = axColors[k]; g.fillText(`${pct}%`, W - 130, y);
    roundRect(g, 130, y + 22, W - 260, 18, 9); g.fillStyle = '#EEF0F3'; g.fill();
    const x = 130 + (W - 260) * (1 - a.pct / 100);
    g.beginPath(); g.arc(x, y + 31, 20, 0, 7); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 9; g.strokeStyle = axColors[k]; g.stroke();
  });

  // 희귀 특징 + 조합
  let y = cardY + cardH + 90;
  g.textAlign = 'center'; g.fillStyle = '#fff';
  const rare = rarest(r.traits);
  if (rare.length) {
    g.font = `700 36px ${F}`; g.fillText('가장 희귀한 내 특징', W / 2, y); y += 66;
    g.font = `800 42px ${F}`;
    rare.slice(0, mode === 'story' ? 3 : 2).forEach((x) => { g.fillText(`${x.t.emoji} ${x.t[x.t.outcome].label} · ${x.where} ${fmtPct(x.v)}`, W / 2, y); y += 64; });
  }
  const c = combo(r.traits, 'world');
  if (c.p !== null && mode === 'story') {
    y += 40; g.font = `700 36px ${F}`; g.fillText(`나와 같은 조합 (${c.used.length}개 형질, 추정치)`, W / 2, y);
    y += 90; g.font = `900 84px ${F}`; g.fillText(`약 ${oneIn(c.p)}명 중 1명`, W / 2, y);
  }
  g.font = `600 32px ${F}`; g.globalAlpha = 0.9;
  g.fillText(`${SITE_URL.replace(/^https?:\/\//, '')} · 유전자 MBTI`, W / 2, H - 80);
  g.globalAlpha = 1;
  return new Promise((res) => cv.toBlob(res, 'image/png'));
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

// -------------------------------------------------------------
//  출처 페이지
// -------------------------------------------------------------
function viewSources() {
  shell(`
  <section class="section"><div class="wrap narrow">
    <h2>근거 문헌</h2>
    <p class="lead">테스트의 모든 빈도와 설명은 아래 문헌에서 가져왔어요. 수치가 없는 형질은 결과에 "데이터 부족"으로 표시해요.</p>
    <ol class="src-list">${Object.values(SOURCES).map((s) => `<li>${s.full}<br><a href="${s.url}" target="_blank" rel="noopener">${s.url}</a></li>`).join('')}</ol>
    <h2 style="margin-top:56px">유전 근거 수준은 이렇게 나눴어요</h2>
    <div class="badges" style="justify-content:center;margin-top:18px">${Object.values(EVIDENCE).map((e) => `<span class="badge ${e.color}" style="font-size:13px;padding:6px 12px">${e.label} · ${e.desc}</span>`).join('')}</div>
    <p class="lead" style="margin-top:20px">"간접 추정"은 실제 검사(쓴맛 시약, 유당 흡수 검사 등) 대신 일상 경험으로 답한 형질이라는 뜻이에요.</p>
  </div></section>`);
}

// -------------------------------------------------------------
//  라우터
// -------------------------------------------------------------
function route() {
  const h = location.hash.replace(/^#/, '') || '/';
  if (h.startsWith('/test')) { document.title = '테스트 · 유전자 MBTI'; viewTest(); }
  else if (h.startsWith('/result')) viewResult();
  else if (h.startsWith('/sources')) { document.title = '근거 문헌 · 유전자 MBTI'; viewSources(); }
  else { document.title = '유전자 MBTI · 내 몸의 숨겨진 특징을 발견하는 테스트'; viewHome(); }
  if (!h.startsWith('/test')) window.scrollTo(0, 0);
}

load();
window.addEventListener('hashchange', route);
window.addEventListener('scroll', () => $('.hdr')?.classList.toggle('scrolled', scrollY > 8), { passive: true });
// 공유 링크로 들어왔는데 해시가 없으면 결과로
if (new URLSearchParams(location.search).get('a') && !location.hash) location.hash = '#/result';
route();
