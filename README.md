# 🧬 유전자 MBTI — 내 몸의 숨겨진 특징을 발견하는 테스트

혀 말기, 손목 힘줄(장장근), 관절 유연성, 귀지 타입, 햇빛 재채기, 고수 비누맛, 알코올 홍조…
직접 해 보는 16개 문항에 **7단계 스펙트럼**으로 답하면, 14개 신체 형질을 **논문·통계 근거**와 함께 분석해 주는 정적 웹사이트입니다.

## 특징

- **능동형 문항** — 문항마다 예시 일러스트와 "지금 해 보세요" 미션이 있습니다.
- **스펙트럼 응답** — 16Personalities 스타일의 7단계 원형 버튼. "잘 모르겠어요 / 먹어본 적 없어요"로 건너뛸 수 있습니다.
- **4글자 유전자 MBTI** — 감각(K/M) · 구조(F/S) · 체질(R/T) · 리듬(D/N), 총 16유형. 코드는 재미용이라고 화면에 밝혀 둡니다.
- **근거 리포트** — 형질마다 유전 근거 수준(강함/중간/약함), 전 세계·동아시아·참고 집단 빈도, 출처 링크를 보여 줍니다.
- **정직한 희귀도** — "나와 같은 조합" 확률은 빈도 자료가 있는 형질만 곱한 **추정치(독립 가정)** 이고, 자료가 없거나 중간으로 답한 형질은 "데이터 부족 / 중간 응답"으로 따로 표시합니다. 전 세계 기준과 동아시아 기준을 따로 계산합니다.
- **SNS 공유** — 기기 공유 시트, 카카오톡, 인스타 스토리용 이미지(1080×1920), X, Threads, 페이스북, 결과 이미지 저장, 링크 복사. 공유 링크(`/t/KFRD?a=…`)에는 유형별 OG 이미지가 붙습니다.
- **개인정보 없음** — 서버로 전송하지 않습니다. 응답은 브라우저 localStorage와 공유 링크에만 담깁니다.

## 구조

```
public/            ← Vercel이 그대로 배포하는 정적 사이트 (빌드 없음)
  index.html
  css/style.css
  js/data.js       ← 문항 · 형질 · 빈도 · 유형 · 출처 (수치 수정은 여기서)
  js/illus.js      ← 문항별 SVG 일러스트, 유형 엠블럼
  js/app.js        ← 라우팅 · 채점 · 결과 · 공유 · 이미지 생성
  js/config.js     ← 사이트 주소, 카카오 JS 키
  t/XXXX.html      ← 유형별 공유 페이지 (OG 태그 → 결과로 리다이렉트)
  og/XXXX.png      ← 유형별 OG 이미지 1200×630
scripts/build-share.mjs  ← t/ 와 og/ 생성 스크립트
```

## 로컬 실행

```bash
npx serve public
```

## 배포 (Vercel)

1. vercel.com/new → 이 레포 Import → **Deploy** (설정은 `vercel.json`에 있어 그대로 두면 됩니다)
2. 배포 주소가 `https://gene-mbti.vercel.app`이 아니면, OG 이미지 절대경로를 갱신하세요:
   ```bash
   npm i -D playwright && npx playwright install chromium
   SITE_URL=https://내주소.vercel.app node scripts/build-share.mjs
   ```
   그리고 `public/index.html`의 `og:image` 주소도 같이 바꿔 주세요.

## 카카오톡 공유 켜기 (선택)

1. https://developers.kakao.com → 애플리케이션 추가 → **JavaScript 키** 복사
2. 플랫폼 → Web → 배포 도메인 등록
3. `public/js/config.js`의 `KAKAO_JS_KEY`에 붙여넣기

키가 없으면 모바일에서는 기기 공유 시트(카카오톡 포함), PC에서는 링크 복사로 대체됩니다.

## 근거 문헌

전체 목록은 사이트의 `/#/sources` 페이지와 `public/js/data.js`의 `SOURCES`에 있습니다. 주요 문헌:
Yoshiura 2006 (Nat Genet, 귀지 ABCC11) · Brooks 2009 (PLoS Med, ALDH2 홍조) · Storhaug 2017 (Lancet Gastro Hepatol, 유당) · Yammine 2014 (Clin Anat, 장장근 메타분석) · Mauer & El-Sohemy 2012 (Flavour, 고수) · Markt 2016 (BMJ, 아스파라거스) · Eriksson 2010 (PLoS Genet) · Jones 2019 (Nat Commun, 크로노타입) · Shaffer 2017 (AJHG, 귓불) · Hakim 2004 (쌍둥이 관절 유연성) · Kim 2003 (Science, TAS2R38) · McDonald, *Myths of Human Genetics*

> ⚠️ 이 테스트는 유전자 검사가 아니며 의학적 진단을 대신하지 않습니다.
