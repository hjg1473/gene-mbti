// =============================================================
//  유전자 MBTI — 데이터 (문항 · 형질 · 유형 · 출처)
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
  cornelis2011: {
    short: 'Cornelis et al., 2011 (GWAS)',
    full: 'Cornelis MC, et al. Genome-wide meta-analysis identifies regions on 7p21 (AHR) and 15q24 (CYP1A2) as determinants of habitual caffeine consumption. PLoS Genetics 7(4):e1002033 (2011).',
    url: 'https://doi.org/10.1371/journal.pgen.1002033',
  },
  jones2019: {
    short: 'Jones et al., 2019 (Nature Comm.)',
    full: 'Jones SE, et al. Genome-wide association analyses of chronotype in 697,828 individuals provides insights into circadian rhythms. Nature Communications 10:343 (2019).',
    url: 'https://doi.org/10.1038/s41467-018-08259-7',
  },
  horne1976: {
    short: 'Horne & Östberg, 1976 (MEQ)',
    full: 'Horne JA, Östberg O. A self-assessment questionnaire to determine morningness–eveningness in human circadian rhythms. International Journal of Chronobiology 4:97–110 (1976).',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1027738/',
  },
};

// 유전 근거 수준
export const EVIDENCE = {
  strong: { label: '유전 근거 강함', desc: '원인 유전자·변이가 확인됨', color: 'green' },
  moderate: { label: '유전 근거 중간', desc: '유전율 또는 다수의 연관 유전자가 보고됨', color: 'yellow' },
  weak: { label: '유전 근거 약함', desc: '단순 유전이 아님 · 환경/학습 영향이 큼', color: 'purple' },
};

// -------------------------------------------------------------
//  4개 축 → 4글자 코드
// -------------------------------------------------------------
export const AXES = [
  {
    id: 'sense', name: '감각', en: 'Sense', color: 'var(--c-blue)',
    a: { letter: 'K', name: '예민 (Keen)', desc: '쓴맛·냄새·빛 자극을 남들보다 크게 받아들이는 편' },
    b: { letter: 'M', name: '무던 (Mellow)', desc: '맛과 냄새, 빛 자극에 덜 흔들리는 편' },
  },
  {
    id: 'body', name: '구조', en: 'Body', color: 'var(--c-yellow)',
    a: { letter: 'F', name: '유연 (Flex)', desc: '관절과 혀가 잘 휘고 접히는 편' },
    b: { letter: 'S', name: '단단 (Sturdy)', desc: '관절 가동 범위가 표준적이고 단단한 편' },
  },
  {
    id: 'chem', name: '체질', en: 'Chemistry', color: 'var(--c-green)',
    a: { letter: 'R', name: '민감 (Reactive)', desc: '알코올·유당·카페인에 몸이 빠르게 반응하는 편' },
    b: { letter: 'T', name: '내성 (Tolerant)', desc: '알코올·유당·카페인을 비교적 잘 받아들이는 편' },
  },
  {
    id: 'rhythm', name: '리듬', en: 'Rhythm', color: 'var(--c-purple)',
    a: { letter: 'D', name: '아침형 (Dawn)', desc: '이른 시간에 몸과 머리가 깨어나는 편' },
    b: { letter: 'N', name: '저녁형 (Night)', desc: '해가 진 뒤에 컨디션이 올라오는 편' },
  },
];

// -------------------------------------------------------------
//  문항 (16개) — 직접 해보는 행동 + 7단계 스펙트럼
//  axis: 4글자 코드에 반영되는 축 (null = 리포트에만 표시)
//  dir: +1 이면 "그렇다"가 축의 a 글자 쪽
// -------------------------------------------------------------
export const QUESTIONS = [
  {
    id: 'tongue', trait: 'tongue', axis: 'body', dir: 1, illus: 'tongue',
    mission: '거울 앞에서 혀를 내밀고, 양쪽 가장자리를 위로 들어 올려 보세요.',
    q: '혀를 U자(빨대 모양)로 말 수 있다.',
    left: '완벽히 된다', right: '전혀 안 된다',
  },
  {
    id: 'palmaris', trait: 'palmaris', axis: null, dir: 1, illus: 'palmaris',
    mission: '엄지와 새끼손가락 끝을 맞대고, 손목을 살짝 안쪽으로 굽혀 보세요.',
    q: '손목 한가운데에 가느다란 힘줄이 하나 더 솟아오른다.',
    left: '뚜렷이 보인다', right: '전혀 없다',
    tip: '양손 모두 확인해 보세요. 한쪽만 없는 사람도 꽤 많아요.',
  },
  {
    id: 'pinky', trait: 'hyper', axis: 'body', dir: 1, illus: 'pinky',
    mission: '손바닥을 책상에 대고, 다른 손으로 새끼손가락을 천천히 뒤로 젖혀 보세요.',
    q: '새끼손가락이 손등 쪽으로 90도 넘게 젖혀진다.',
    left: '90도 훌쩍 넘는다', right: '거의 안 젖혀진다',
    tip: '통증이 느껴지면 바로 멈추세요. 억지로 할 필요 없어요.',
  },
  {
    id: 'thumb', trait: 'hyper', axis: 'body', dir: 1, illus: 'thumb',
    mission: '팔을 앞으로 뻗고, 반대 손으로 엄지를 손목 안쪽으로 살살 눌러 보세요.',
    q: '엄지가 팔뚝 안쪽에 닿는다.',
    left: '딱 붙는다', right: '한참 멀다',
    tip: '베이턴 점수(관절 유연성 검사)의 실제 항목이에요.',
  },
  {
    id: 'hitchhiker', trait: 'hitchhiker', axis: 'body', dir: 1, illus: 'hitchhiker',
    mission: '"좋아요" 하듯 엄지를 세우고, 끝마디를 최대한 뒤로 젖혀 보세요.',
    q: '엄지 끝마디가 뒤로 확 꺾인다 (히치하이커 엄지).',
    left: '활처럼 휜다', right: '일자로 곧다',
  },
  {
    id: 'earlobe', trait: 'earlobe', axis: null, dir: 1, illus: 'earlobe',
    mission: '거울이나 셀카 모드로 귓불이 얼굴 옆선과 만나는 부분을 보세요.',
    q: '귓불이 얼굴과 떨어져 아래로 동그랗게 늘어져 있다.',
    left: '완전히 떨어짐', right: '완전히 붙음',
  },
  {
    id: 'earwax', trait: 'earwax', axis: null, dir: 1, illus: 'earwax',
    mission: '면봉으로 귀를 팠을 때 나오던 귀지를 떠올려 보세요.',
    q: '내 귀지는 마르고 바스러지는 가루 형태다.',
    left: '바삭한 가루', right: '끈적한 갈색',
    skip: '잘 모르겠어요',
  },
  {
    id: 'sneeze', trait: 'sneeze', axis: 'sense', dir: 1, illus: 'sneeze',
    mission: '어두운 지하주차장·터널에서 나와 햇빛을 정면으로 봤던 순간을 떠올려 보세요.',
    q: '갑자기 밝은 빛을 보면 재채기가 나온다.',
    left: '거의 항상', right: '한 번도 없다',
  },
  {
    id: 'cilantro', trait: 'cilantro', axis: 'sense', dir: 1, illus: 'cilantro',
    mission: '쌀국수나 타코에 들어간 고수(실란트로)의 맛을 떠올려 보세요.',
    q: '고수에서 비누·세제 같은 맛이 난다.',
    left: '완전 비누 맛', right: '그냥 향긋한 풀',
    skip: '먹어본 적 없어요',
  },
  {
    id: 'bitter', trait: 'bitter', axis: 'sense', dir: 1, illus: 'bitter',
    mission: '브로콜리·케일·자몽·다크초콜릿을 먹을 때를 떠올려 보세요.',
    q: '이런 음식이 다른 사람들보다 유난히 쓰게 느껴진다.',
    left: '참기 힘들 만큼 쓰다', right: '전혀 안 쓰다',
  },
  {
    id: 'asparagus', trait: 'asparagus', axis: 'sense', dir: 1, illus: 'asparagus',
    mission: '아스파라거스를 먹고 몇 시간 뒤 화장실에 갔을 때를 떠올려 보세요.',
    q: '소변에서 유황 같은 독특한 냄새를 맡은 적이 있다.',
    left: '확실히 난다', right: '전혀 못 맡았다',
    skip: '먹어본 적 없어요',
  },
  {
    id: 'flush', trait: 'flush', axis: 'chem', dir: 1, illus: 'flush',
    mission: '술을 한두 잔 마셨을 때 거울 속 내 얼굴을 떠올려 보세요.',
    q: '한두 잔만 마셔도 얼굴이 빨개지고 심장이 두근거린다.',
    left: '바로 빨개진다', right: '전혀 안 변한다',
    skip: '술을 마시지 않아요',
  },
  {
    id: 'lactose', trait: 'lactose', axis: 'chem', dir: 1, illus: 'lactose',
    mission: '빈속에 차가운 우유 한 잔(약 200ml)을 마셨을 때를 떠올려 보세요.',
    q: '배가 부글거리거나 더부룩해진다.',
    left: '거의 항상', right: '전혀 괜찮다',
  },
  {
    id: 'caffeine', trait: 'caffeine', axis: 'chem', dir: 1, illus: 'caffeine',
    mission: '오후 3시 이후에 커피 한 잔을 마신 날 밤을 떠올려 보세요.',
    q: '그날 밤엔 잠들기가 확실히 어렵다.',
    left: '밤새 말똥말똥', right: '바로 잘 잔다',
    skip: '커피를 안 마셔요',
  },
  {
    id: 'morning', trait: 'chrono', axis: 'rhythm', dir: 1, illus: 'morning',
    mission: '아무 일정 없는 휴일 아침을 상상해 보세요.',
    q: '알람 없이도 이른 아침에 개운하게 눈이 떠진다.',
    left: '늘 그렇다', right: '절대 아니다',
  },
  {
    id: 'night', trait: 'chrono', axis: 'rhythm', dir: -1, illus: 'night',
    mission: '하루 중 집중이 가장 잘 됐던 시간을 떠올려 보세요.',
    q: '머리가 가장 맑은 시간은 밤 10시 이후다.',
    left: '완전 그렇다', right: '전혀 아니다',
  },
];

// -------------------------------------------------------------
//  형질 (14개)
//  outcome: pos(=그렇다 쪽) / neg / mid
//  freq: { world, eastAsia, ref } — 각 값은 숫자 또는 [최소, 최대] 범위
//        world/eastAsia 가 없으면 조합 계산에서 제외 (데이터 부족)
// -------------------------------------------------------------
export const TRAITS = {
  tongue: {
    name: '혀 말기', emoji: '👅', evidence: 'weak', proxy: false,
    pos: { label: '혀 말기 가능', freq: { world: [65, 81] } },
    neg: { label: '혀 말기 불가', freq: { world: [19, 35] } },
    mid: { label: '반쯤 말림' },
    fact: '1940년 "우성 유전" 형질로 처음 소개돼 교과서에 오래 실렸지만, 일란성 쌍둥이끼리도 서로 다른 경우가 많고 연습으로 되는 사람도 있다는 연구가 이어지면서 단순 유전이 아닌 것으로 정리됐어요. 인구 집단별로 65~81%가 할 수 있다고 보고됩니다.',
    myth: '옛날 테스트: "혀를 말 수 있으면 우성 유전자!" → 지금: 단일 유전자로 설명되지 않음',
    sources: ['sturtevant1940', 'martin1975', 'mcdonald2011'],
  },
  palmaris: {
    name: '장장근 (손목 힘줄)', emoji: '✋', evidence: 'weak', proxy: false,
    pos: { label: '장장근 있음', freq: { world: 79.75, eastAsia: 95.5 } },
    neg: { label: '장장근 없음', freq: { world: 20.25, eastAsia: 4.5 } },
    mid: { label: '희미하게 있음' },
    fact: '장장근은 진화 과정에서 쓰임이 줄어든 "흔적 근육"이에요. 없어도 악력에는 거의 차이가 없어서, 성형외과에서는 힘줄 이식 재료로 쓰기도 해요. 22,408명을 묶은 메타분석에서 전체 약 20%가 없었고, 한국·중국 등 동아시아인은 4.5%만 없어서 동아시아에서는 꽤 드문 특징이에요.',
    myth: '집안 내 경향은 보고되지만 정확한 유전 방식은 아직 확정되지 않았어요.',
    sources: ['yammine2014'],
  },
  hyper: {
    name: '관절 유연성', emoji: '🤸', evidence: 'moderate', proxy: true,
    pos: { label: '유연 관절 (2/2 항목)', freq: {} },
    neg: { label: '표준 관절', freq: {} },
    mid: { label: '약간 유연' },
    fact: '새끼손가락 90° 젖히기와 엄지-팔뚝 닿기는 관절 과가동성을 재는 "베이턴 점수"(9점 척도)의 실제 항목이에요. 여성 쌍둥이 연구에서 관절 유연성의 약 70%가 유전으로 설명됐어요. 다만 여기선 9개 중 2개 항목만 봤기 때문에 진단이 아니고, 인구 빈도도 기준마다 달라 조합 계산에서는 빼 두었어요.',
    myth: '유연성은 나이·성별·운동 습관에 따라서도 크게 달라져요.',
    sources: ['beighton1973', 'hakim2004'],
  },
  hitchhiker: {
    name: '히치하이커 엄지', emoji: '👍', evidence: 'weak', proxy: false,
    pos: { label: '히치하이커 엄지', freq: { ref: { pop: '미국 백인 표본', v: 24.7 } } },
    neg: { label: '곧은 엄지', freq: { ref: { pop: '미국 백인 표본', v: 75.3 } } },
    mid: { label: '살짝 휨' },
    fact: '엄지가 젖혀지는 각도는 "된다/안 된다"로 딱 나뉘지 않고 사람마다 조금씩 달라요. 1953년 미국 연구에서 24.7%가 뚜렷한 히치하이커 엄지였지만, 단일 유전자로 설명된다는 근거는 부족해요. 전 세계 대표 수치가 없어서 조합 계산에서는 뺐어요.',
    myth: '옛날 테스트: "열성 유전 형질" → 지금: 휜 정도가 사람마다 조금씩 다른 연속 형질',
    sources: ['glass1953', 'mcdonald2011'],
  },
  earlobe: {
    name: '귓불 모양', emoji: '👂', evidence: 'moderate', proxy: false,
    pos: { label: '분리형 귓불', freq: {} },
    neg: { label: '부착형 귓불', freq: {} },
    mid: { label: '중간형 귓불' },
    fact: '"붙은 귓불은 열성 유전"이라는 설명은 틀린 것으로 밝혀졌어요. 7만 명 이상을 분석한 다민족 GWAS에서 49개 유전자 위치가 귓불 모양에 관여했어요. 귓불 모양은 붙음부터 떨어짐까지 이어진 스펙트럼이라 기준마다 빈도가 달라요. 그래서 빈도는 "데이터 부족"으로 표시했어요.',
    myth: '옛날 테스트: "붙은 귓불 = 열성" → 지금: 49개 이상의 유전자가 관여하는 다유전자 형질',
    sources: ['shaffer2017', 'mcdonald2011'],
  },
  earwax: {
    name: '귀지 타입', emoji: '🦻', evidence: 'strong', proxy: false,
    pos: { label: '건성(가루) 귀지', freq: { eastAsia: [80, 95], ref: { pop: '유럽·아프리카계', v: [0, 3] } } },
    neg: { label: '습성(끈적) 귀지', freq: { eastAsia: [5, 20], ref: { pop: '유럽·아프리카계', v: [97, 100] } } },
    mid: { label: '중간 타입' },
    fact: '보기 드물게 유전자 하나로 거의 결정되는 형질이에요. ABCC11 유전자의 염기 하나(rs17822931)만 달라도 귀지가 건성이 돼요. 이 변이는 겨드랑이 땀 냄새가 적은 것과도 연결돼 있어요. 동아시아인은 80~95% 이상이 건성이고, 특히 한국과 북중국에서 비율이 가장 높아요. 반면 유럽·아프리카계에서 건성은 0~3%뿐이라, 지역 차이가 가장 극적인 형질 중 하나예요.',
    myth: '세계 평균은 집단 간 차이가 너무 커서 의미가 없으므로 "전 세계 수치"는 비워 두었어요.',
    sources: ['yoshiura2006'],
  },
  sneeze: {
    name: '햇빛 재채기 (ACHOO)', emoji: '🤧', evidence: 'moderate', proxy: false,
    pos: { label: '햇빛 재채기 있음', freq: { world: [18, 35] } },
    neg: { label: '햇빛 재채기 없음', freq: { world: [65, 82] } },
    mid: { label: '가끔 있음' },
    fact: '밝은 빛을 보면 재채기가 나오는 "광반사 재채기"는 의학 문헌에서 인구의 18~35%로 추정돼요. 23andMe 참여자 수만 명을 분석한 연구에서 ZEB2 유전자 근처 변이와의 연관이 보고됐어요. 시신경 자극이 근처 삼차신경까지 번져서 생긴다는 가설이 유력해요.',
    myth: '정확한 메커니즘은 아직 연구 중이에요.',
    sources: ['eriksson2010'],
  },
  cilantro: {
    name: '고수 비누맛', emoji: '🌿', evidence: 'moderate', proxy: false,
    pos: { label: '고수 = 비누 맛', freq: { eastAsia: 21 } },
    neg: { label: '고수 = 향긋한 풀', freq: { eastAsia: 79 } },
    mid: { label: '애매한 맛' },
    fact: '후각 수용체 유전자 OR6A2 근처의 변이가 고수의 알데하이드 냄새를 "비누 맛"으로 느끼게 하는 데 관여해요. 6개 인종·문화 집단을 비교한 연구에서 고수를 싫어하는 비율은 동아시아인 21%, 백인 17%, 아프리카계 14%, 남아시아계 7%, 히스패닉 4%, 중동계 3%였어요.',
    myth: '유전 영향은 일부이고, 자주 먹으면서 익숙해지는 효과도 커요.',
    sources: ['mauer2012', 'eriksson2012'],
  },
  bitter: {
    name: '쓴맛 민감도 (TAS2R38)', emoji: '🥦', evidence: 'strong', proxy: true,
    pos: { label: '쓴맛 예민 (테이스터)', freq: { eastAsia: [84, 90] } },
    neg: { label: '쓴맛 둔감 (논테이스터)', freq: { eastAsia: [10, 16], ref: { pop: '유럽계', v: [27, 28] } } },
    mid: { label: '보통 민감' },
    fact: 'TAS2R38 쓴맛 수용체 유전자의 변이가 PTC/PROP 같은 쓴맛 물질을 느끼는 능력을 크게 좌우해요(2003년 Science). 이 물질의 쓴맛을 못 느끼는 "논테이스터"는 아시아·아프리카계 약 10~16%, 유럽계 약 27~28%예요. ※ 이 테스트는 실제 시약 대신 채소의 쓴맛으로 간접 추정한 결과예요.',
    myth: '간접 추정이라서 결과에 "간접" 표시를 붙였어요.',
    sources: ['kim2003', 'nidcd'],
  },
  asparagus: {
    name: '아스파라거스 냄새 감지', emoji: '🥬', evidence: 'moderate', proxy: false,
    pos: { label: '냄새 감지 가능', freq: { ref: { pop: '유럽계 미국인', v: 40 } } },
    neg: { label: '냄새 감지 불가', freq: { ref: { pop: '유럽계 미국인', v: 60 } } },
    mid: { label: '어렴풋이 감지' },
    fact: '아스파라거스를 먹으면 소변에 황 화합물이 섞여 나오는데, 이 냄새를 못 맡는 "아스파라거스 무후각증"이 있어요. 유럽계 미국인 6,909명을 조사한 BMJ 연구에서 남성 58%, 여성 61.5%가 냄새를 못 맡았고, 후각 수용체 유전자 근처 변이 871개와의 연관이 확인됐어요.',
    myth: '아시아인 데이터는 아직 부족해요.',
    sources: ['markt2016', 'eriksson2010'],
  },
  flush: {
    name: '알코올 홍조 (ALDH2)', emoji: '🍷', evidence: 'strong', proxy: false,
    pos: { label: '알코올 홍조 있음', freq: { world: 8, eastAsia: 36 } },
    neg: { label: '알코올 홍조 없음', freq: { world: 92, eastAsia: 64 } },
    mid: { label: '약간 붉어짐' },
    fact: 'ALDH2 유전자 변이(rs671)가 있으면 알코올 분해 중간 산물인 아세트알데하이드가 잘 분해되지 않아 얼굴이 빨개져요. 전 세계 약 5억 4천만 명(약 8%)이 이 변이를 갖고 있고, 동아시아인의 약 36%가 홍조 반응을 보여요. ⚠️ 이 변이가 있는 사람이 술을 자주 마시면 식도암 위험이 크게 높아진다는 연구가 있으니, "빨개지는 체질"은 몸이 보내는 경고로 받아들이세요.',
    myth: '"마시다 보면 는다"는 속설과 달리, 유전적 분해 능력 자체는 바뀌지 않아요.',
    sources: ['brooks2009'],
  },
  lactose: {
    name: '유당 소화', emoji: '🥛', evidence: 'strong', proxy: true,
    pos: { label: '유당 불내 경향', freq: { world: 68 } },
    neg: { label: '유당 소화 양호', freq: { world: 32 } },
    mid: { label: '가끔 불편' },
    fact: '어른이 돼서도 우유를 잘 소화하는 "락타아제 지속성"은 사실 인류 역사에서 비교적 최근에 퍼진 변이(LCT 유전자 근처)예요. 메타분석에 따르면 전 세계 성인의 약 68%는 유당을 잘 흡수하지 못해요. 그러니까 우유가 안 맞는 쪽이 인류의 "기본값"인 셈이에요. ※ 증상 자가 보고는 실제 흡수 장애와 완전히 같지는 않아요.',
    myth: '증상 기반 간접 추정이라서 "간접" 표시를 붙였어요.',
    sources: ['storhaug2017', 'enattah2002'],
  },
  caffeine: {
    name: '카페인 민감도', emoji: '☕', evidence: 'moderate', proxy: true,
    pos: { label: '카페인 민감', freq: {} },
    neg: { label: '카페인 둔감', freq: {} },
    mid: { label: '보통' },
    fact: '대규모 GWAS 메타분석에서 카페인을 분해하는 효소 유전자 CYP1A2와 이를 조절하는 AHR 유전자가 커피 섭취량과 관련 있는 것으로 확인됐어요. 하지만 "카페인 민감형" 비율에 대한 전 세계 대표 통계는 없어서 "데이터 부족"으로 표시했어요.',
    myth: '수면 습관, 스트레스, 복용 약에 따라서도 크게 달라져요.',
    sources: ['cornelis2011'],
  },
  chrono: {
    name: '아침형·저녁형 (크로노타입)', emoji: '🌗', evidence: 'moderate', proxy: false,
    pos: { label: '아침형', freq: { ref: { pop: '영국 바이오뱅크 (유럽계)', v: 62.6 } } },
    neg: { label: '저녁형', freq: { ref: { pop: '영국 바이오뱅크 (유럽계)', v: 37.4 } } },
    mid: { label: '중간형' },
    fact: '약 70만 명을 분석한 2019년 연구에서 아침형·저녁형과 연관된 유전자 위치 351곳이 발견됐어요. 생체시계 핵심 유전자(PER2, RGS16 등)도 포함돼 있어요. 영국 바이오뱅크 참여자를 아침형/저녁형 둘로 나누면 약 63:37이었어요. 다만 나이가 들수록 아침형으로 바뀌는 경향이 있어요. 문항은 아침형·저녁형 설문(MEQ)의 질문 방식을 참고했어요.',
    myth: '전 세계 대표 수치가 없어서 조합 계산에서는 뺐어요.',
    sources: ['jones2019', 'horne1976'],
  },
};

// -------------------------------------------------------------
//  16개 유형
// -------------------------------------------------------------
export const TYPES = {
  KFRD: { name: '새벽의 소믈리에', hue: '#4298B4', blurb: '예민한 감각에 유연한 몸, 몸의 신호에 민감하게 반응하는 아침형. 남들이 못 느끼는 미묘한 차이를 가장 먼저 알아채요.' },
  KFRN: { name: '한밤의 미식 탐정', hue: '#88619A', blurb: '쓴맛과 냄새를 잘 잡아내는 코, 잘 휘는 관절, 밤이 되면 살아나는 감각. 야식 메뉴의 함정은 이 유형이 먼저 찾아내요.' },
  KFTD: { name: '아침의 곡예사', hue: '#E4AE3A', blurb: '자극에는 예민하지만 체질은 튼튼한 아침형. 유연한 몸으로 이른 시간을 누구보다 활기차게 써요.' },
  KFTN: { name: '야행성 퍼포머', hue: '#33A474', blurb: '감각은 섬세하고 몸은 유연한데, 컨디션은 밤에 최고조. 무대 조명이 켜질 때 가장 빛나는 타입이에요.' },
  KSRD: { name: '새벽의 감별사', hue: '#3A7CA5', blurb: '단단한 몸에 날카로운 감각, 자극에 즉각 반응하는 체질. 아침 커피 한 모금으로도 원두를 맞힐 것 같은 타입이에요.' },
  KSRN: { name: '심야의 조향사', hue: '#7A4E8C', blurb: '향과 맛을 섬세하게 구분하는 감각에 민감한 체질을 지닌 밤의 장인. 늦은 밤 오롯이 감각에 집중해요.' },
  KSTD: { name: '아침의 장인', hue: '#C9962A', blurb: '디테일을 놓치지 않는 감각에 단단하고 튼튼한 몸. 아침 루틴으로 하루를 정밀하게 빚어내요.' },
  KSTN: { name: '밤의 전략가', hue: '#2C8A60', blurb: '예민한 감각을 무기로 쓰는 튼튼한 저녁형. 모두 잠든 시간에 가장 날카로워져요.' },
  MFRD: { name: '아침 산책러', hue: '#5BA8C4', blurb: '자극에는 무던하지만 몸의 반응은 솔직한 유연한 아침형. 가벼운 스트레칭으로 하루를 여는 타입이에요.' },
  MFRN: { name: '달빛 유랑자', hue: '#9C77AE', blurb: '느긋한 감각, 부드러운 관절, 섬세한 체질의 저녁형. 밤 산책에서 영감을 얻어요.' },
  MFTD: { name: '햇살 운동가', hue: '#EDBE55', blurb: '무던한 감각과 튼튼한 체질에 유연한 몸까지 갖춘 아침형. 새벽 운동이 체질인 사람이에요.' },
  MFTN: { name: '올빼미 탐험가', hue: '#46B385', blurb: '뭐든 잘 먹고 잘 휘고 잘 버티는 저녁형. 밤늦게까지 이어지는 모험에 최적화된 몸이에요.' },
  MSRD: { name: '고요한 정원사', hue: '#4F8FB0', blurb: '자극에는 담담하고 몸은 단단하지만, 체질 신호에는 솔직한 아침형. 리듬을 지키는 게 이 유형의 힘이에요.' },
  MSRN: { name: '밤의 사색가', hue: '#80609A', blurb: '감각은 느긋하고 몸은 단단한데 체질은 섬세한 저녁형. 조용한 밤에 생각이 가장 깊어져요.' },
  MSTD: { name: '철벽 모험가', hue: '#D4A23C', blurb: '무던한 감각, 단단한 몸, 튼튼한 체질의 아침형. 어떤 환경에서도 흔들리지 않는 안정형 몸이에요.' },
  MSTN: { name: '무쇠 올빼미', hue: '#3A9A6E', blurb: '웬만한 자극에는 꿈쩍도 안 하는 강철 체질의 저녁형. 밤샘 프로젝트의 마지막 생존자예요.' },
};

export const SCALE = [3, 2, 1, 0, -1, -2, -3]; // 왼쪽(그렇다) → 오른쪽(그렇지 않다)
