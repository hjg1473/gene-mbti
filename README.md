# BODYPRINT — 너 이거 돼?

혀 말기, 숨은 손목 힘줄, 햇빛 재채기, 가루 귀지…
몸이 가진 **12가지 숨은 기능**을 직접 해 보고 답하면, 응답으로 **세상에 하나뿐인 지문(바디프린트)** 을 그려 주는 정적 웹사이트입니다.
결과는 유형이 아니라 "당신은 12가지 특징 중 8가지를 가지고 있어요"처럼 나오고, 기능마다 논문 속 세계 빈도와 유전 근거 수준을 함께 보여 줍니다.

## 핵심 경험

- **직접 해 보는 13문항**: 문항마다 그림 한 장과 "해 보세요" 안내가 붙어 있습니다. 답은 슬라이더를 끌어 연속값으로 표시합니다(키보드 ← → / Enter 지원).
- **살아 있는 지문**:
  - 표지의 지문은 커서나 손가락을 대면 융선이 눌리듯 휘어집니다.
  - 테스트 중에는 답할 때마다 지문이 한 겹씩 그려집니다.
  - 결과 지문의 12개 방향이 12가지 특징에 대응합니다. 항목에 마우스를 올리면 지문에서 해당 영역이 강조됩니다.
- **정직한 희귀도**: "나와 같은 조합" 비율은 빈도 자료가 있는 특징만 곱한 **추정치(특징끼리 독립이라고 가정)** 입니다. 자료가 없거나 반반으로 답한 특징은 따로 표시하고 계산에서 뺍니다. 전 세계 기준과 동아시아 기준을 따로 계산합니다.
- **"너 이거 돼?" 공유 루프**:
  - 결과 카드에 내가 되는 기능과 안 되는 기능이 찍힙니다.
  - 친구가 링크를 열면 내 바디프린트를 보고 바로 따라 해 볼 수 있습니다.
  - 친구가 테스트를 끝내면 **나 vs 친구 비교**(같은 답 개수, 특징별 표)가 나옵니다.
- **공유 채널**: 기기 공유 시트, 카카오톡, 인스타 스토리용 이미지(1080×1920), X, Threads, 페이스북, 카드 이미지 저장(1080×1350), 링크 복사. `/p/N` 공유 링크에는 "12가지 중 N가지" 미리보기 이미지(OG 이미지)가 붙습니다.

## 디자인

에디토리얼(잡지) 톤입니다. 종이는 라일락빛 `#ECE8F1`, 잉크는 지문 인주 남색 `#1A1B5E`, "돼요" 표시는 장미색 `#F2557A`를 씁니다.
제목은 한글 가변 세리프 **Hahmlet**, 본문은 **Pretendard**입니다.

## 구조

```
public/                 정적 사이트 (빌드 없음)
  index.html
  css/style.css
  js/data.js            12가지 특징 · 13문항 · 빈도 · 출처
  js/print.js           응답 → 지문 생성기 (시드 기반, 12방향)
  js/illus.js           문항 그림 (SVG)
  js/app.js             화면 이동 · 테스트 · 결과 · 비교 · 공유 카드
  js/config.js          사이트 주소, 카카오 JS 키
  p/0~12.html           공유 링크용 페이지 (OG 태그 → 결과로 이동)
  og/*.png              OG 이미지 1200×630
scripts/build-share.mjs p/ 와 og/ 를 만드는 스크립트
```

## 로컬 실행 / 배포

```bash
npx serve public          # 로컬
```

Vercel에서 이 레포를 Import한 뒤 Deploy하면 됩니다. 설정은 `vercel.json`에 들어 있습니다.
배포 주소가 `https://gene-mbti.vercel.app`이 아니면 아래 명령을 실행하고, `public/index.html`의 `og:image` 주소도 함께 바꿔 주세요.

```bash
npm i -D playwright && npx playwright install chromium
SITE_URL=https://내주소 node scripts/build-share.mjs
```

카카오톡 공유 카드를 쓰려면 `public/js/config.js`에 카카오 JavaScript 키를 넣으세요. 키가 없으면 휴대폰에서는 기기 공유 시트, PC에서는 링크 복사로 대신 작동합니다.

## 근거 문헌

전체 목록은 사이트의 `#/sources` 페이지에 있습니다. 주요 문헌은 다음과 같습니다.

- Yoshiura 2006 (Nat Genet, 귀지 ABCC11)
- Brooks 2009 (PLoS Med, ALDH2 홍조)
- Storhaug 2017 (Lancet Gastroenterol Hepatol, 유당)
- Yammine 2014 (Clin Anat, 장장근)
- Mauer & El-Sohemy 2012 (Flavour, 고수)
- Markt 2016 (BMJ, 아스파라거스)
- Eriksson 2010 (PLoS Genet, 햇빛 재채기)
- Shaffer 2017 (AJHG, 귓불)
- Hakim 2004 (관절 유연성)
- Kim 2003 (Science, TAS2R38)
- McDonald, *Myths of Human Genetics*

> 이 테스트는 유전자 검사가 아니며 의학적 진단을 대신하지 않습니다.
