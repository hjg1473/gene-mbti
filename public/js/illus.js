// =============================================================
//  문항별 예시 일러스트 (인라인 SVG, 플랫 스타일)
// =============================================================
const SKIN = '#F5CBA7';
const SKIN_D = '#E3A47E';
const INK = '#1A1B5E';
const BLUE = '#3A3FB8';
const YEL = '#F2557A';
const GRN = '#3A3FB8';
const PUR = '#1A1B5E';
const PINK = '#E9837F';

const wrap = (bg, inner, label = '') => `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <path d="M30 120 C 20 50, 110 18, 175 28 C 250 38, 305 70, 296 130 C 288 190, 210 205, 150 200 C 80 196, 38 170, 30 120 Z" fill="${bg}" opacity=".55"/>
  <circle cx="44" cy="44" r="5" fill="${bg}"/><circle cx="286" cy="186" r="7" fill="${bg}"/><circle cx="270" cy="34" r="3.5" fill="${bg}"/>
  ${inner}
</svg>`;

const tag = (x, y, text, color) => `
  <g font-family="Pretendard, sans-serif" font-size="12" font-weight="700">
    <rect x="${x}" y="${y}" rx="11" height="22" width="${text.length * 12 + 18}" fill="#fff" stroke="${color}" stroke-width="1.5"/>
    <text x="${x + 9}" y="${y + 15.5}" fill="${color}">${text}</text>
  </g>`;

const face = (cx, cy, r = 52, { cheeks = false, eyes = 'open' } = {}) => {
  const ey = cy - r * 0.15;
  const eyeSvg = eyes === 'open'
    ? `<circle cx="${cx - r * 0.35}" cy="${ey}" r="4.5" fill="${INK}"/><circle cx="${cx + r * 0.35}" cy="${ey}" r="4.5" fill="${INK}"/>`
    : `<path d="M${cx - r * 0.47} ${ey} q 7 6 14 0 M${cx + r * 0.23} ${ey} q 7 6 14 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `
  <ellipse cx="${cx - r + 4}" cy="${cy + 2}" rx="9" ry="13" fill="${SKIN_D}"/>
  <ellipse cx="${cx + r - 4}" cy="${cy + 2}" rx="9" ry="13" fill="${SKIN_D}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${SKIN}"/>
  <path d="M${cx - r} ${cy - 8} C ${cx - r} ${cy - r - 22}, ${cx + r} ${cy - r - 22}, ${cx + r} ${cy - 8} C ${cx + r - 10} ${cy - r + 4}, ${cx - 10} ${cy - r + 14}, ${cx - r} ${cy - 8} Z" fill="${INK}"/>
  ${eyeSvg}
  ${cheeks ? `<ellipse cx="${cx - r * 0.55}" cy="${cy + r * 0.2}" rx="12" ry="8" fill="#E5534B" opacity=".75"/><ellipse cx="${cx + r * 0.55}" cy="${cy + r * 0.2}" rx="12" ry="8" fill="#E5534B" opacity=".75"/>` : ''}`;
};

export const ILLUS = {
  tongue: () => wrap('#DCDDF4', `
    ${face(120, 112, 58)}
    <ellipse cx="120" cy="140" rx="22" ry="17" fill="#7B2D3A"/>
    <path d="M100 140 C 100 175, 140 175, 140 140 C 136 150, 128 147, 120 152 C 112 147, 104 150, 100 140 Z" fill="${PINK}"/>
    <path d="M120 152 L120 166" stroke="#C9605D" stroke-width="2" stroke-linecap="round"/>
    <g transform="translate(232 108)">
      <circle r="40" fill="#fff"/>
      <path d="M-24 -6 C -26 26, 26 26, 24 -6 C 20 -10, 14 -4, 12 6 C 8 16, -8 16, -12 6 C -14 -4, -20 -10, -24 -6 Z" fill="${PINK}"/>
      <path d="M-12 6 C -8 16, 8 16, 12 6" stroke="#B9504F" stroke-width="2.5" fill="none"/>
      <text y="-20" text-anchor="middle" font-family="Pretendard Variable,Pretendard,sans-serif" font-size="11" font-weight="700" fill="${BLUE}">정면에서 보면 U자</text>
    </g>
    <path d="M150 150 Q 180 150 196 128" stroke="${BLUE}" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
  `, '혀를 U자로 만 모습'),

  palmaris: () => wrap('#DCDDF4', `
    <g transform="translate(70 0)">
      <path d="M70 215 L 70 140 C 70 130, 130 130, 130 140 L 130 215 Z" fill="${SKIN}"/>
      <path d="M62 140 C 52 100, 58 66, 74 58 L 128 58 C 142 66, 146 100, 138 140 Z" fill="${SKIN}"/>
      <rect x="66" y="22" width="15" height="46" rx="7.5" fill="${SKIN}"/>
      <rect x="84" y="12" width="15" height="52" rx="7.5" fill="${SKIN}"/>
      <rect x="102" y="16" width="15" height="50" rx="7.5" fill="${SKIN}"/>
      <path d="M126 70 C 134 50, 124 36, 112 46" stroke="${SKIN}" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M58 104 C 40 84, 60 50, 104 48" stroke="${SKIN}" stroke-width="16" stroke-linecap="round" fill="none"/>
      <circle cx="108" cy="47" r="10" fill="none" stroke="${GRN}" stroke-width="3"/>
      <path d="M100 210 L 100 150 C 100 140, 99 130, 98 118" stroke="${GRN}" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M100 210 L 100 150 C 100 140, 99 130, 98 118" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".7"/>
    </g>
    <path d="M176 172 L 222 172" stroke="${GRN}" stroke-width="2" stroke-dasharray="4 4"/>
    ${tag(222, 161, '장장근 힘줄', GRN)}
    ${tag(196, 34, '엄지+새끼 맞대기', GRN)}
  `, '엄지와 새끼손가락을 맞대 손목 힘줄을 확인하는 모습'),

  pinky: () => wrap('#F9DCE3', `
    <rect x="30" y="160" width="260" height="14" rx="7" fill="#C8A57A"/>
    <path d="M60 160 C 60 128, 100 118, 150 118 L 200 120 C 214 122, 214 160, 214 160 Z" fill="${SKIN}"/>
    <rect x="92" y="96" width="62" height="16" rx="8" fill="${SKIN}" transform="rotate(-8 92 104)"/>
    <path d="M200 140 L 236 140" stroke="${SKIN}" stroke-width="16" stroke-linecap="round"/>
    <path d="M212 132 L 212 70" stroke="${SKIN_D}" stroke-width="16" stroke-linecap="round"/>
    <path d="M206 128 C 200 96, 196 80, 186 66" stroke="${SKIN}" stroke-width="16" stroke-linecap="round" fill="none"/>
    <path d="M240 140 A 40 40 0 0 0 204 100" stroke="${YEL}" stroke-width="3" fill="none"/>
    <path d="M232 112 L 252 92" stroke="${YEL}" stroke-width="2" stroke-dasharray="3 4"/>
    <text x="254" y="88" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="800" font-size="20" fill="${YEL}">90°+</text>
    ${tag(40, 40, '새끼손가락 뒤로 젖히기', '#C23A5E')}
  `, '새끼손가락을 90도 넘게 젖히는 모습'),

  thumb: () => wrap('#F9DCE3', `
    <path d="M30 120 L 180 112 L 186 150 L 30 156 Z" fill="${SKIN}"/>
    <path d="M176 108 C 214 104, 236 128, 232 170 C 230 194, 196 198, 184 176 C 176 160, 170 140, 176 108 Z" fill="${SKIN}"/>
    <path d="M196 168 C 180 168, 160 160, 150 152" stroke="${SKIN_D}" stroke-width="15" stroke-linecap="round" fill="none"/>
    <circle cx="150" cy="152" r="13" fill="none" stroke="${YEL}" stroke-width="3"/>
    <path d="M266 92 C 262 130, 246 156, 214 178" stroke="${INK}" stroke-width="2.5" fill="none" marker-end="url(#ar)"/>
    <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker></defs>
    <text x="304" y="80" text-anchor="end" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="700" font-size="12" fill="${INK}">반대 손으로 살짝 누르기</text>
    ${tag(40, 40, '엄지 → 팔뚝 닿기', '#C23A5E')}
  `, '엄지를 팔뚝 안쪽에 닿게 하는 모습'),

  hitchhiker: () => wrap('#F9DCE3', `
    <g transform="translate(66 34)">
      <rect x="0" y="80" width="64" height="70" rx="20" fill="${SKIN}"/>
      <rect x="22" y="10" width="20" height="80" rx="10" fill="${SKIN}"/>
      <rect x="25" y="12" width="14" height="10" rx="4" fill="#FBE4D2"/>
    </g>
    <g transform="translate(190 34)">
      <rect x="0" y="80" width="64" height="70" rx="20" fill="${SKIN}"/>
      <path d="M32 90 L 32 52 C 32 34, 22 22, 8 14" stroke="${SKIN}" stroke-width="20" stroke-linecap="round" fill="none"/>
      <path d="M44 56 A 22 22 0 0 0 26 30" stroke="${YEL}" stroke-width="3" fill="none"/>
    </g>
    ${tag(58, 192, '곧은 엄지', INK)}
    ${tag(166, 192, '히치하이커 엄지', '#C23A5E')}
  `, '곧은 엄지와 뒤로 꺾이는 히치하이커 엄지 비교'),

  earlobe: () => wrap('#E6E1EE', `
    <g transform="translate(60 26)">
      <path d="M40 10 C 80 4, 96 40, 88 76 C 84 96, 74 104, 70 120 C 66 140, 44 146, 34 132 C 26 120, 30 110, 34 102" fill="${SKIN}"/>
      <path d="M50 30 C 72 28, 78 52, 70 70 C 64 82, 56 82, 54 94" stroke="${SKIN_D}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M10 0 L 34 102 L 0 160" stroke="${INK}" stroke-width="0" fill="none"/>
      <path d="M34 102 L 22 160" stroke="${SKIN_D}" stroke-width="3" stroke-dasharray="3 4"/>
      <circle cx="50" cy="128" r="16" fill="none" stroke="${PUR}" stroke-width="3"/>
    </g>
    <g transform="translate(180 26)">
      <path d="M40 10 C 80 4, 96 40, 88 76 C 84 96, 74 104, 62 118 C 52 128, 40 126, 34 112" fill="${SKIN}"/>
      <path d="M50 30 C 72 28, 78 52, 70 70 C 64 82, 56 82, 54 94" stroke="${SKIN_D}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M34 112 L 26 160" stroke="${SKIN_D}" stroke-width="3" stroke-dasharray="3 4"/>
      <circle cx="44" cy="116" r="16" fill="none" stroke="${PUR}" stroke-width="3"/>
    </g>
    ${tag(70, 188, '분리형', PUR)}
    ${tag(190, 188, '부착형', PUR)}
  `, '분리형 귓불과 부착형 귓불 비교'),

  earwax: () => wrap('#E6E1EE', `
    <g transform="translate(46 50)">
      <rect width="100" height="100" rx="22" fill="#fff"/>
      <g fill="#E8D3A2">
        <path d="M20 40 l12 -6 l6 10 l-10 6 z"/><path d="M50 28 l14 2 l-2 12 l-12 -4 z"/>
        <path d="M36 62 l10 -4 l8 8 l-12 6 z"/><path d="M66 54 l12 4 l-4 12 l-10 -6 z"/>
        <circle cx="30" cy="80" r="4"/><circle cx="74" cy="80" r="3"/><circle cx="58" cy="44" r="3"/>
      </g>
    </g>
    <g transform="translate(174 50)">
      <rect width="100" height="100" rx="22" fill="#fff"/>
      <path d="M50 22 C 70 46, 80 60, 78 72 C 76 88, 62 94, 50 94 C 38 94, 24 88, 22 72 C 20 60, 30 46, 50 22 Z" fill="#B8742E"/>
      <ellipse cx="40" cy="64" rx="7" ry="11" fill="#fff" opacity=".45"/>
    </g>
    <rect x="140" y="20" width="40" height="6" rx="3" fill="#CFD8DC" transform="rotate(20 160 23)"/>
    <ellipse cx="139" cy="17" rx="9" ry="6" fill="#fff" stroke="#CFD8DC" stroke-width="2" transform="rotate(20 139 17)"/>
    ${tag(56, 164, '건성 (가루)', PUR)}
    ${tag(184, 164, '습성 (끈적)', PUR)}
  `, '건성 귀지와 습성 귀지 비교'),

  sneeze: () => wrap('#DCDDF4', `
    <g transform="translate(246 60)">
      <circle r="26" fill="${YEL}"/>
      ${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<line x1="${Math.cos(a) * 34}" y1="${Math.sin(a) * 34}" x2="${Math.cos(a) * 46}" y2="${Math.sin(a) * 46}" stroke="${YEL}" stroke-width="4" stroke-linecap="round"/>`; }).join('')}
    </g>
    <path d="M220 74 L 168 104" stroke="${YEL}" stroke-width="3" stroke-dasharray="6 6"/>
    ${face(112, 124, 54, { eyes: 'closed' })}
    <ellipse cx="112" cy="152" rx="12" ry="9" fill="#7B2D3A"/>
    <g font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="900">
      <path d="M150 168 C 180 160, 230 160, 262 172 C 280 182, 262 204, 230 202 C 200 206, 168 198, 158 186 Z" fill="#fff"/>
      <text x="176" y="192" font-size="22" fill="${BLUE}">에취!!</text>
    </g>
  `, '햇빛을 보고 재채기하는 모습'),

  cilantro: () => wrap('#DCDDF4', `
    <g transform="translate(90 40)">
      <path d="M40 150 C 40 110, 36 80, 30 50" stroke="#3A3FB8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M38 100 C 60 90, 70 70, 76 50" stroke="#3A3FB8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M36 120 C 18 110, 6 96, 2 80" stroke="#3A3FB8" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${[[30, 40], [76, 42], [2, 72], [14, 30], [52, 24], [90, 60], [-8, 56]].map(([x, y]) => `<path d="M${x} ${y} c -12 -6 -14 -22 -2 -26 c 4 -10 18 -10 20 2 c 12 0 12 16 2 20 c -2 10 -14 12 -20 4 z" fill="${GRN}"/>`).join('')}
    </g>
    ${[[220, 70, 22], [252, 116, 14], [214, 140, 18], [256, 166, 9], [192, 104, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".7" stroke="${BLUE}" stroke-width="2"/><ellipse cx="${x - r * 0.35}" cy="${y - r * 0.35}" rx="${r * 0.25}" ry="${r * 0.15}" fill="#fff"/>`).join('')}
    ${tag(196, 188, '비누 맛?', BLUE)}
  `, '고수 잎과 비누 거품'),

  bitter: () => wrap('#DCDDF4', `
    <g transform="translate(56 50)">
      <rect x="34" y="70" width="22" height="70" rx="8" fill="#7E83D6"/>
      ${[[20, 50, 28], [50, 34, 32], [76, 56, 26], [36, 70, 22], [66, 76, 20]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${GRN}"/>`).join('')}
      ${[[16, 44], [46, 28], [70, 50], [56, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#23277E"/>`).join('')}
    </g>
    <g transform="translate(220 120)">
      <circle r="48" fill="#F6A37E"/><circle r="40" fill="#FBD3C0"/>
      ${Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return `<path d="M0 0 L ${Math.cos(a) * 36} ${Math.sin(a) * 36} A 36 36 0 0 1 ${Math.cos(a + 0.785) * 36} ${Math.sin(a + 0.785) * 36} Z" fill="#F07F6E" stroke="#FBD3C0" stroke-width="3"/>`; }).join('')}
      <circle r="5" fill="#FBD3C0"/>
    </g>
    ${tag(176, 30, 'TAS2R38 쓴맛 수용체', GRN)}
  `, '브로콜리와 자몽'),

  asparagus: () => wrap('#DCDDF4', `
    <g transform="translate(70 30)">
      ${[0, 18, 36, 54].map((dx, i) => `<g transform="translate(${dx} ${i % 2 ? 10 : 0}) rotate(${(i - 1.5) * 4} 10 160)">
        <rect x="2" y="30" width="16" height="140" rx="8" fill="#6E73D0"/>
        <path d="M10 0 C 22 12, 22 30, 10 40 C -2 30, -2 12, 10 0 Z" fill="#3A3FB8"/>
        <path d="M4 70 l 6 -8 l 6 8 M4 110 l 6 -8 l 6 8" stroke="#3A3FB8" stroke-width="3" fill="none"/>
      </g>`).join('')}
      <rect x="-4" y="120" width="86" height="14" rx="4" fill="${PUR}"/>
    </g>
    ${[0, 1, 2].map((i) => `<path d="M${190 + i * 26} 160 c -12 -16 12 -24 0 -40 c -12 -16 12 -24 0 -40" stroke="${YEL}" stroke-width="4" fill="none" stroke-linecap="round" opacity="${1 - i * 0.2}"/>`).join('')}
    <text x="252" y="70" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="900" font-size="34" fill="${INK}">?</text>
  `, '아스파라거스와 냄새'),

  flush: () => wrap('#F9DCE3', `
    ${face(118, 116, 58, { cheeks: true })}
    <path d="M100 148 q 18 10 36 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g transform="translate(220 64)">
      <path d="M0 0 L 50 0 C 50 34, 40 48, 25 48 C 10 48, 0 34, 0 0 Z" fill="#fff" stroke="#D7DDE3" stroke-width="2"/>
      <path d="M3 18 L 47 18 C 46 36, 38 45, 25 45 C 12 45, 4 36, 3 18 Z" fill="#B8344A"/>
      <rect x="23" y="48" width="4" height="40" fill="#D7DDE3"/><rect x="8" y="86" width="34" height="6" rx="3" fill="#D7DDE3"/>
    </g>
    <path d="M190 182 l 14 0 l 6 -14 l 8 26 l 8 -20 l 6 8 l 20 0" stroke="#E5534B" stroke-width="3" fill="none" stroke-linejoin="round"/>
    ${tag(24, 26, 'ALDH2 홍조', '#C23A5E')}
  `, '술을 마시고 얼굴이 빨개진 모습'),

  lactose: () => wrap('#DCDDF4', `
    <g transform="translate(60 40)">
      <path d="M10 40 L 30 10 L 70 10 L 90 40 L 90 150 L 10 150 Z" fill="#fff" stroke="#D7DDE3" stroke-width="2"/>
      <path d="M30 10 L 50 40 L 90 40" stroke="#D7DDE3" stroke-width="2" fill="none"/>
      <rect x="10" y="70" width="80" height="40" fill="${BLUE}"/>
      <text x="50" y="97" text-anchor="middle" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="800" font-size="18" fill="#fff">MILK</text>
    </g>
    <g transform="translate(196 70)">
      <path d="M10 10 C -10 40, 0 90, 40 96 C 80 100, 96 60, 80 30 C 66 6, 40 20, 30 6 C 24 -2, 16 0, 10 10 Z" fill="#F4B7B2"/>
      <path d="M26 46 c 10 -10 20 10 30 0 M30 66 c 10 -10 20 10 30 0" stroke="#C4554F" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <text x="246" y="62" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="900" font-size="16" fill="${INK}">부글부글</text>
  `, '우유와 불편한 배'),

  caffeine: () => wrap('#F9DCE3', `
    <g transform="translate(50 80)">
      <path d="M0 10 L 80 10 L 72 100 C 70 112, 10 112, 8 100 Z" fill="#fff" stroke="#D7DDE3" stroke-width="2"/>
      <path d="M80 30 C 104 30, 104 70, 76 72" stroke="#D7DDE3" stroke-width="8" fill="none"/>
      <ellipse cx="40" cy="14" rx="38" ry="7" fill="#6B4226"/>
      <path d="M26 -8 c -6 -10 6 -14 0 -24 M46 -8 c -6 -10 6 -14 0 -24" stroke="#B9A08A" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <g transform="translate(232 108)">
      <circle r="56" fill="#2F3B66"/>
      <path d="M-6 -36 A 30 30 0 1 0 30 6 A 24 24 0 1 1 -6 -36 Z" fill="${YEL}"/>
      <circle cx="-22" cy="20" r="9" fill="#fff"/><circle cx="2" cy="20" r="9" fill="#fff"/>
      <circle cx="-20" cy="20" r="4" fill="${INK}"/><circle cx="4" cy="20" r="4" fill="${INK}"/>
      <circle cx="-34" cy="-20" r="2" fill="#fff"/><circle cx="34" cy="-30" r="1.6" fill="#fff"/>
    </g>
    ${tag(40, 30, '오후 3시의 커피', '#C23A5E')}
  `, '커피와 잠 못 드는 밤'),

  morning: () => wrap('#F9DCE3', `
    <circle cx="160" cy="150" r="56" fill="${YEL}"/>
    ${Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i / 6) * Math.PI; return `<line x1="${160 + Math.cos(a) * 66}" y1="${150 + Math.sin(a) * 66}" x2="${160 + Math.cos(a) * 82}" y2="${150 + Math.sin(a) * 82}" stroke="${YEL}" stroke-width="5" stroke-linecap="round"/>`; }).join('')}
    <path d="M30 170 C 80 140, 120 160, 160 168 C 210 176, 250 140, 296 160 L 296 200 L 30 200 Z" fill="${GRN}"/>
    <path d="M30 186 C 90 170, 150 190, 200 184 C 240 180, 270 176, 296 182 L 296 200 L 30 200 Z" fill="#23277E"/>
    <g transform="translate(64 66)">
      <circle r="24" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <path d="M0 -14 L 0 0 L 10 6" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="-30" y="44" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="800" font-size="13" fill="${INK}">AM 6:00</text>
    </g>
  `, '일출과 이른 아침'),

  night: () => wrap('#E6E1EE', `
    <rect x="40" y="30" width="240" height="160" rx="30" fill="#2F3B66"/>
    <path d="M232 52 A 26 26 0 1 0 262 92 A 20 20 0 1 1 232 52 Z" fill="${YEL}"/>
    ${[[70, 54], [110, 70], [160, 46], [200, 82], [90, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#fff"/>`).join('')}
    <rect x="96" y="120" width="104" height="62" rx="6" fill="#A8D8EA"/>
    <rect x="84" y="182" width="128" height="8" rx="4" fill="#D7DDE3"/>
    <path d="M110 140 h 50 M110 154 h 70 M110 168 h 40" stroke="#2F3B66" stroke-width="4" stroke-linecap="round"/>
    <path d="M232 190 L 232 140 L 250 118" stroke="#D7DDE3" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M238 110 L 268 104 L 262 132 Z" fill="${YEL}"/>
    <text x="196" y="112" font-family="Pretendard Variable,Pretendard,sans-serif" font-weight="800" font-size="13" fill="#fff">PM 11:30</text>
  `, '밤에 집중하는 모습'),
};

