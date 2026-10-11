// 배포 주소가 바뀌면 이 값과 scripts/build-share.mjs 의 SITE_URL 을 함께 바꿔 주세요.
export const SITE_URL = (typeof location !== 'undefined' && location.origin.startsWith('http'))
  ? location.origin
  : 'https://gene-mbti.vercel.app';

// 카카오톡 공유 버튼을 쓰려면 https://developers.kakao.com 에서 앱을 만들고
// [앱 키 > JavaScript 키]를 아래에 넣은 뒤, [플랫폼 > Web]에 배포 도메인을 등록하세요.
// 비워 두면 모바일에서는 기기 공유 시트(카카오톡 포함), PC에서는 링크 복사로 대체됩니다.
export const KAKAO_JS_KEY = '';
