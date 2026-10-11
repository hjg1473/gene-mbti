// =============================================================
//  BODYPRINT — 데이터 (특징 · 문항 · 출처)
//  모든 빈도 수치는 아래 SOURCES에 적힌 문헌에서 가져왔습니다.
//  수치가 없는 경우 null 로 두고 화면에 "데이터 부족"으로 표시합니다.
// =============================================================

export const SOURCES = {
  sturtevant1940: {
    short: 'Sturtevant, 1940',
    full: 'Sturtevant AH. A new inherited character in man. PNAS 26(2):100–102 (1940).',
    url: 'https://doi.org/10.1073/pnas.26.2.100',
  },
  martin1975: {
    short: 'Martin, 1975',
    full: 'Martin NG. No evidence for a genetic basis of tongue rolling or hand clasping. Journal of Heredity 66(3):179–180 (1975).',
    url: 'https://doi.org/10.1093/oxfordjournals.jhered.a108607',
  },
  mcdonald2011: {
    short: 'McDonald, Myths of Human Genetics',
    full: 'McDonald JH. Myths of Human Genetics. Sparky House Publishing (2011). 델라웨어대 생물학과 공개 자료.',
    url: 'https://udel.edu/~mcdonald/mythintro.html',
  },
  yammine2014: {
    short: 'Yammine, 2014 (메타분석)',
    full: 'Yammine K. Clinical prevalence of palmaris longus agenesis: a systematic review and meta-analysis. Clinical Anatomy 27(4) (2014). 26개 연구 · 22,408명.',
    url: 'https://doi.org/10.1002/ca.22289',
  },
  beighton1973: {
    short: 'Beighton et al., 1973',
    full: 'Beighton P, Solomon L, Soskolne CL. Articular mobility in an African population. Annals of the Rheumatic Diseases 32(5):413–418 (1973). — 베이턴 점수(9점 척도)의 원전.',
    url: 'https://doi.org/10.1136/ard.32.5.413',
  },
  hakim2004: {
    short: 'Hakim et al., 2004 (쌍둥이 연구)',
    full: 'Hakim AJ, Cherkas LF, Grahame R, Spector TD, MacGregor AJ. The genetic epidemiology of joint hypermobility: a population study of female twins. Arthritis & Rheumatism 50(8):2640–2644 (2004).',
    url: 'https://doi.org/10.1002/art.20376',
  },
  glass1953: {
    short: 'Glass & Kistler, 1953',
    full: 'Glass B, Kistler JC. Distal hyperextensibility of the thumbs. Acta Genetica et Statistica Medica 4:192–206 (1953).',
    url: 'https://udel.edu/~mcdonald/mythhitchhiker.html',
  },
  shaffer2017: {
    short: 'Shaffer et al., 2017 (GWAS)',
    full: 'Shaffer JR, et al. Multiethnic GWAS reveals polygenic architecture of earlobe attachment. American Journal of Human Genetics 101(6):913–924 (2017).',
    url: 'https://doi.org/10.1016/j.ajhg.2017.10.001',
  },
  yoshiura2006: {
    short: 'Yoshiura et al., 2006',
    full: 'Yoshiura K, et al. A SNP in the ABCC11 gene is the determinant of human earwax type. Nature Genetics 38:324–330 (2006).',
    url: 'https://doi.org/10.1038/ng1733',
  },
  eriksson2010: {
    short: 'Eriksson et al., 2010 (23andMe GWAS)',
    full: 'Eriksson N, et al. Web-based, participant-driven studies yield novel genetic associations for common traits. PLoS Genetics 6(6):e1000993 (2010).',
    url: 'https://doi.org/10.1371/journal.pgen.1000993',
  },
  mauer2012: {
    short: 'Mauer & El-Sohemy, 2012',
    full: 'Mauer L, El-Sohemy A. Prevalence of cilantro (Coriandrum sativum) disliking among different ethnocultural groups. Flavour 1:8 (2012).',
    url: 'https://doi.org/10.1186/2044-7248-1-8',
  },
  eriksson2012: {
    short: 'Eriksson et al., 2012',
    full: 'Eriksson N, et al. A genetic variant near olfactory receptor genes influences cilantro preference. Flavour 1:22 (2012).',
    url: 'https://doi.org/10.1186/2044-7248-1-22',
  },
  kim2003: {
    short: 'Kim et al., 2003 (Science)',
    full: 'Kim U, et al. Positional cloning of the human quantitative trait locus underlying taste sensitivity to phenylthiocarbamide. Science 299:1221–1225 (2003).',
    url: 'https://doi.org/10.1126/science.1080190',
  },
  nidcd: {
    short: 'NIH 국립난청·의사소통장애연구소(NIDCD)',
    full: 'NIDCD (미국 국립보건원). Global variation in sensitivity to bitter-tasting substances (PTC or PROP).',
    url: 'https://www.nidcd.nih.gov/health/statistics/global-variation-sensitivity-bitter-tasting-substances-ptc-or-prop',
  },
  markt2016: {
    short: 'Markt et al., 2016 (BMJ)',
    full: 'Markt SC, et al. Sniffing out significant "Pee values": genome wide association study of asparagus anosmia. BMJ 355:i6071 (2016). 유럽계 미국인 6,909명.',
    url: 'https://doi.org/10.1136/bmj.i6071',
  },
  brooks2009: {
    short: 'Brooks et al., 2009 (PLoS Med)',
    full: 'Brooks PJ, Enoch MA, Goldman D, Li TK, Yokoyama A. The alcohol flushing response: an unrecognized risk factor for esophageal cancer from alcohol consumption. PLoS Medicine 6(3):e1000050 (2009).',
    url: 'https://doi.org/10.1371/journal.pmed.1000050',
  },
  storhaug2017: {
    short: 'Storhaug et al., 2017 (메타분석)',
    full: 'Storhaug CL, Fosse SK, Fadnes LT. Country, regional, and global estimates for lactose malabsorption in adults: a systematic review and meta-analysis. Lancet Gastroenterology & Hepatology 2(10):738–746 (2017).',
    url: 'https://doi.org/10.1016/S2468-1253(17)30154-1',
  },
  enattah2002: {
    short: 'Enattah et al., 2002',
    full: 'Enattah NS, et al. Identification of a variant associated with adult-type hypolactasia. Nature Genetics 30:233–237 (2002).',
    url: 'https://doi.org/10.1038/ng826',
  },
};

// 유전 근거 수준
export const EVIDENCE = {
  strong: { label: '유전 근거 강함', desc: '원인 유전자·변이가 확인됨', color: 'green' },
  moderate: { label: '유전 근거 중간', desc: '유전율 또는 다수의 연관 유전자가 보고됨', color: 'yellow' },
  weak: { label: '유전 근거 약함', desc: '단순 유전이 아님 · 환경/학습 영향이 큼', color: 'purple' },
};

// -------------------------------------------------------------
//  12가지 특징 (= 바디프린트의 12개 영역)
//  have: "이거 돼/있어" 쪽, not: 반대쪽
//  freq: { world, eastAsia, ref } — 숫자 또는 [최소, 최대]. 없으면 "데이터 부족"
// -------------------------------------------------------------
export const FEATURES = [
  {
    id: 'tongue', short: '혀 말기', ask: '혀를 U자로 말 수 있어?', emoji: '👅', evidence: 'weak', proxy: false,
    have: { label: '혀 말기 가능', freq: { world: [65, 81] } },
    not: { label: '혀 말기 불가', freq: { world: [19, 35] } },
    fact: '1940년 "우성 유전" 형질로 처음 소개돼 교과서에 오래 실렸지만, 일란성 쌍둥이끼리도 서로 다른 경우가 많고 연습으로 되는 사람도 있다는 연구가 이어지면서 단순 유전이 아닌 것으로 정리됐어요. 인구 집단별로 65~81%가 할 수 있다고 보고됩니다.',
    myth: '교과서 속 "우성 유전"은 오해예요. 단일 유전자로 설명되지 않아요.',
    sources: ['sturtevant1940', 'martin1975', 'mcdonald2011'],
  },
  {
    id: 'palmaris', short: '숨은 손목 힘줄', ask: '손목에 숨은 힘줄이 있어?', emoji: '✋', evidence: 'weak', proxy: false,
    have: { label: '장장근 있음', freq: { world: 79.75, eastAsia: 95.5 } },
    not: { label: '장장근 없음', freq: { world: 20.25, eastAsia: 4.5 } },
    fact: '장장근은 진화 과정에서 쓰임이 줄어든 "흔적 근육"이에요. 없어도 악력에는 거의 차이가 없어서 성형외과에서는 힘줄 이식 재료로 쓰기도 해요. 22,408명을 묶은 메타분석에서 전체 약 20%가 없었고, 한국·중국 등 동아시아인은 4.5%만 없었어요.',
    myth: '집안 내 경향은 보고되지만 정확한 유전 방식은 아직 확정되지 않았어요.',
    sources: ['yammine2014'],
  },
  {
    id: 'flex', short: '고무 관절', ask: '새끼손가락이 90° 넘게 젖혀져?', emoji: '🤸', evidence: 'moderate', proxy: true,
    have: { label: '유연한 관절', freq: {} },
    not: { label: '표준 관절', freq: {} },
    fact: '새끼손가락 90° 젖히기와 엄지-팔뚝 닿기는 관절 과가동성을 재는 "베이턴 점수"(9점 척도)의 실제 항목이에요. 여성 쌍둥이 연구에서 관절 유연성의 약 70%가 유전으로 설명됐어요. 여기선 9개 중 2개 항목만 봤기 때문에 진단이 아니고, 인구 빈도도 기준마다 달라 조합 계산에서 뺐어요.',
    myth: '유연성은 나이·성별·운동 습관에 따라서도 크게 달라져요.',
    sources: ['beighton1973', 'hakim2004'],
  },
  {
    id: 'hitchhiker', short: '히치하이커 엄지', ask: '엄지 끝마디가 뒤로 꺾여?', emoji: '👍', evidence: 'weak', proxy: false,
    have: { label: '히치하이커 엄지', freq: { ref: { pop: '1953년 미국 표본', v: 24.7 } } },
    not: { label: '곧은 엄지', freq: { ref: { pop: '1953년 미국 표본', v: 75.3 } } },
    fact: '엄지가 젖혀지는 각도는 "된다/안 된다"로 딱 나뉘지 않고 사람마다 조금씩 달라요. 1953년 미국 연구에서 24.7%가 뚜렷한 히치하이커 엄지였지만, 단일 유전자로 설명된다는 근거는 부족해요.',
    myth: '"열성 유전"이라는 설명은 근거가 약해요. 휜 정도가 연속적으로 달라요.',
    sources: ['glass1953', 'mcdonald2011'],
  },
  {
    id: 'earlobe', short: '떨어진 귓불', ask: '귓불이 얼굴에서 떨어져 있어?', emoji: '👂', evidence: 'moderate', proxy: false,
    have: { label: '분리형 귓불', freq: {} },
    not: { label: '부착형 귓불', freq: {} },
    fact: '7만 명 이상을 분석한 다민족 GWAS에서 49개 유전자 위치가 귓불 모양에 관여했어요. 귓불은 붙음부터 떨어짐까지 이어진 스펙트럼이라 기준마다 빈도가 달라서, 빈도는 "데이터 부족"으로 표시했어요.',
    myth: '"붙은 귓불 = 열성 유전"은 틀린 설명이에요.',
    sources: ['shaffer2017', 'mcdonald2011'],
  },
  {
    id: 'earwax', short: '가루 귀지', ask: '귀지가 바삭한 가루야?', emoji: '🦻', evidence: 'strong', proxy: false,
    have: { label: '건성(가루) 귀지', freq: { eastAsia: [80, 95], ref: { pop: '유럽·아프리카계', v: [0, 3] } } },
    not: { label: '습성(끈적) 귀지', freq: { eastAsia: [5, 20], ref: { pop: '유럽·아프리카계', v: [97, 100] } } },
    fact: 'ABCC11 유전자의 염기 하나(rs17822931)로 거의 결정되는, 보기 드문 단일 유전자 형질이에요. 이 변이는 겨드랑이 땀 냄새가 적은 것과도 연결돼 있어요. 동아시아인은 80~95% 이상이 건성이고 특히 한국·북중국에서 가장 높아요. 반면 유럽·아프리카계에서 건성은 0~3%예요.',
    myth: '집단 간 차이가 너무 커서 "세계 평균"은 의미가 없어요.',
    sources: ['yoshiura2006'],
  },
  {
    id: 'sneeze', short: '햇빛 재채기', ask: '햇빛 보면 재채기 나와?', emoji: '🤧', evidence: 'moderate', proxy: false,
    have: { label: '햇빛 재채기 있음', freq: { world: [18, 35] } },
    not: { label: '햇빛 재채기 없음', freq: { world: [65, 82] } },
    fact: '밝은 빛을 보면 재채기가 나오는 "광반사 재채기"는 인구의 18~35%로 추정돼요. 23andMe 참여자를 분석한 연구에서 ZEB2 유전자 근처 변이와의 연관이 보고됐어요. 시신경 자극이 근처 삼차신경까지 번진다는 가설이 유력해요.',
    myth: '정확한 메커니즘은 아직 연구 중이에요.',
    sources: ['eriksson2010'],
  },
  {
    id: 'cilantro', short: '고수 = 비누', ask: '고수에서 비누 맛 나?', emoji: '🌿', evidence: 'moderate', proxy: false,
    have: { label: '고수에서 비누 맛', freq: { eastAsia: 21 } },
    not: { label: '고수는 그냥 풀 맛', freq: { eastAsia: 79 } },
    fact: '후각 수용체 유전자 OR6A2 근처 변이가 고수의 알데하이드 냄새를 "비누 맛"으로 느끼게 하는 데 관여해요. 고수를 싫어하는 비율은 동아시아인 21%, 백인 17%, 아프리카계 14%, 남아시아계 7%, 히스패닉 4%, 중동계 3%였어요.',
    myth: '유전 영향은 일부예요. 자주 먹으면 익숙해지기도 해요.',
    sources: ['mauer2012', 'eriksson2012'],
  },
  {
    id: 'bitter', short: '쓴맛 감지기', ask: '브로콜리가 유난히 써?', emoji: '🥦', evidence: 'strong', proxy: true,
    have: { label: '쓴맛 예민 (테이스터)', freq: { eastAsia: [84, 90] } },
    not: { label: '쓴맛 둔감 (논테이스터)', freq: { eastAsia: [10, 16], ref: { pop: '유럽계', v: [27, 28] } } },
    fact: 'TAS2R38 쓴맛 수용체 유전자의 변이가 쓴맛 물질(PTC/PROP)을 느끼는 능력을 크게 좌우해요. 이 쓴맛을 못 느끼는 "논테이스터"는 아시아·아프리카계 약 10~16%, 유럽계 약 27~28%예요. 여기선 시약 대신 채소의 쓴맛으로 간접 추정했어요.',
    myth: '실제 시약 검사가 아닌 간접 추정이에요.',
    sources: ['kim2003', 'nidcd'],
  },
  {
    id: 'asparagus', short: '아스파라거스 코', ask: '아스파라거스 먹은 뒤 냄새 맡아져?', emoji: '🥬', evidence: 'moderate', proxy: false,
    have: { label: '냄새 감지 가능', freq: { ref: { pop: '유럽계 미국인', v: 40 } } },
    not: { label: '냄새 감지 불가', freq: { ref: { pop: '유럽계 미국인', v: 60 } } },
    fact: '아스파라거스를 먹으면 소변에 황 화합물이 섞여 나오는데, 이 냄새를 못 맡는 사람이 많아요. 유럽계 미국인 6,909명을 조사한 BMJ 연구에서 남성 58%, 여성 61.5%가 냄새를 못 맡았고, 후각 수용체 유전자 근처 변이 871개와의 연관이 확인됐어요.',
    myth: '아시아인 데이터는 아직 부족해요.',
    sources: ['markt2016', 'eriksson2010'],
  },
  {
    id: 'flush', short: '빨개지는 얼굴', ask: '술 한 잔에 얼굴 빨개져?', emoji: '🍷', evidence: 'strong', proxy: false,
    have: { label: '알코올 홍조 있음', freq: { world: 8, eastAsia: 36 } },
    not: { label: '알코올 홍조 없음', freq: { world: 92, eastAsia: 64 } },
    fact: 'ALDH2 유전자 변이(rs671)가 있으면 독성 물질 아세트알데하이드가 잘 분해되지 않아 얼굴이 빨개져요. 전 세계 약 5억 4천만 명(약 8%)이 이 변이를 갖고 있고, 동아시아인의 약 36%가 홍조 반응을 보여요. 이 변이가 있는 사람이 술을 자주 마시면 식도암 위험이 크게 높아진다는 연구가 있어요.',
    myth: '"마시다 보면 는다"는 속설과 달리 분해 능력 자체는 바뀌지 않아요.',
    sources: ['brooks2009'],
  },
  {
    id: 'lactose', short: '우유 부글', ask: '우유 마시면 배가 부글거려?', emoji: '🥛', evidence: 'strong', proxy: true,
    have: { label: '유당 불내 경향', freq: { world: 68 } },
    not: { label: '유당 소화 양호', freq: { world: 32 } },
    fact: '어른이 돼서도 우유를 잘 소화하는 "락타아제 지속성"은 인류 역사에서 비교적 최근에 퍼진 변이예요(LCT 유전자 근처). 메타분석에 따르면 전 세계 성인의 약 68%는 유당을 잘 흡수하지 못해요. 우유가 안 맞는 쪽이 인류의 기본값인 셈이에요.',
    myth: '증상 자가 보고는 실제 흡수 장애와 완전히 같지는 않아요.',
    sources: ['storhaug2017', 'enattah2002'],
  },
];

// -------------------------------------------------------------
//  문항 (13개) — 직접 해보는 행동 + 연속 슬라이더
//  슬라이더 값 100 = left(그렇다) 끝, 0 = right 끝
// -------------------------------------------------------------
export const QUESTIONS = [
  { id: 'tongue', f: 'tongue', illus: 'tongue', q: '혀를 U자(빨대 모양)로 말 수 있다.',
    mission: '거울 앞에서 혀를 내밀고, 양쪽 가장자리를 위로 들어 올려 보세요.', left: '완벽히 된다', right: '전혀 안 된다' },
  { id: 'palmaris', f: 'palmaris', illus: 'palmaris', q: '손목 한가운데에 가느다란 힘줄이 하나 더 솟아오른다.',
    mission: '엄지와 새끼손가락 끝을 맞대고, 손목을 살짝 안쪽으로 굽혀 보세요.', left: '뚜렷이 보인다', right: '전혀 없다',
    tip: '양손 모두 확인해 보세요. 한쪽만 없는 사람도 꽤 많아요.' },
  { id: 'pinky', f: 'flex', illus: 'pinky', q: '새끼손가락이 손등 쪽으로 90도 넘게 젖혀진다.',
    mission: '손바닥을 책상에 대고, 다른 손으로 새끼손가락을 천천히 뒤로 젖혀 보세요.', left: '90도 훌쩍 넘는다', right: '거의 안 젖혀진다',
    tip: '통증이 느껴지면 바로 멈추세요.' },
  { id: 'thumb', f: 'flex', illus: 'thumb', q: '엄지를 손목 쪽으로 굽히면 팔뚝 안쪽에 닿는다.',
    mission: '팔을 앞으로 뻗고, 반대 손으로 엄지를 손목 안쪽으로 살살 눌러 보세요.', left: '딱 붙는다', right: '한참 멀다' },
  { id: 'hitchhiker', f: 'hitchhiker', illus: 'hitchhiker', q: '엄지를 세우면 끝마디가 뒤로 확 꺾인다.',
    mission: '"좋아요" 하듯 엄지를 세우고, 끝마디를 최대한 뒤로 젖혀 보세요.', left: '활처럼 휜다', right: '일자로 곧다' },
  { id: 'earlobe', f: 'earlobe', illus: 'earlobe', q: '귓불이 얼굴과 떨어져 아래로 동그랗게 늘어져 있다.',
    mission: '셀카 모드로 귓불이 얼굴 옆선과 만나는 부분을 보세요.', left: '완전히 떨어짐', right: '완전히 붙음' },
  { id: 'earwax', f: 'earwax', illus: 'earwax', q: '내 귀지는 마르고 바스러지는 가루 형태다.',
    mission: '면봉으로 귀를 팠을 때 나오던 귀지를 떠올려 보세요.', left: '바삭한 가루', right: '끈적한 갈색', skip: '잘 모르겠어요' },
  { id: 'sneeze', f: 'sneeze', illus: 'sneeze', q: '갑자기 밝은 빛을 보면 재채기가 나온다.',
    mission: '어두운 터널이나 지하주차장에서 나와 햇빛을 정면으로 봤던 순간을 떠올려 보세요.', left: '거의 항상', right: '한 번도 없다' },
  { id: 'cilantro', f: 'cilantro', illus: 'cilantro', q: '고수(실란트로)에서 비누나 세제 같은 맛이 난다.',
    mission: '쌀국수나 타코에 들어간 고수의 맛을 떠올려 보세요.', left: '완전 비누 맛', right: '그냥 향긋한 풀', skip: '먹어본 적 없어요' },
  { id: 'bitter', f: 'bitter', illus: 'bitter', q: '브로콜리·케일·자몽이 남들보다 유난히 쓰게 느껴진다.',
    mission: '이런 음식을 친구들과 같이 먹었을 때 반응을 떠올려 보세요.', left: '참기 힘들 만큼', right: '전혀 안 쓰다' },
  { id: 'asparagus', f: 'asparagus', illus: 'asparagus', q: '아스파라거스를 먹은 뒤 소변에서 유황 같은 냄새를 맡은 적이 있다.',
    mission: '아스파라거스를 먹고 몇 시간 뒤 화장실에 갔을 때를 떠올려 보세요.', left: '확실히 난다', right: '전혀 못 맡았다', skip: '먹어본 적 없어요' },
  { id: 'flush', f: 'flush', illus: 'flush', q: '술을 한두 잔만 마셔도 얼굴이 빨개지고 심장이 두근거린다.',
    mission: '술을 마셨을 때 거울 속 내 얼굴을 떠올려 보세요.', left: '바로 빨개진다', right: '전혀 안 변한다', skip: '술을 마시지 않아요' },
  { id: 'lactose', f: 'lactose', illus: 'lactose', q: '우유 한 잔(약 200ml)을 마시면 배가 부글거리거나 더부룩해진다.',
    mission: '빈속에 차가운 우유를 마셨을 때를 떠올려 보세요.', left: '거의 항상', right: '전혀 괜찮다' },
];

// 슬라이더 위치를 말로 읽어 주는 7단계
export const LEVELS = ['전혀 아니에요', '거의 아니에요', '조금 아니에요', '반반이에요', '조금 그래요', '꽤 그래요', '완전 그래요'];
