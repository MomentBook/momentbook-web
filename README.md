# MomentBook (모멘트북)

**SNS가 아닌, 나의 순간을 ‘여정(Journey)’ 단위로 보관하고 회상하는 디지털 아카이브.** :contentReference[oaicite:0]{index=0}

MomentBook은 노출과 경쟁을 위한 소셜 미디어가 아니라, 시간의 흐름이 담긴 ‘여정’ 단위로 개인의 경험을 기록하고 **온전히 나를 위해 보존**하는 기록 아카이브 앱입니다. 필요할 때만 **소중한 사람에게 여정 링크를 공유**할 수 있습니다. :contentReference[oaicite:1]{index=1}

---

## 한 문장 정의

MomentBook은 **개인의 순간을 여정(Journey) 단위로 보관하고 회상하는 기록 아카이브 앱**입니다. :contentReference[oaicite:2]{index=2}

## 세 문장 소개

- MomentBook은 SNS가 아닙니다. :contentReference[oaicite:3]{index=3}
- 경험을 사진/글의 조각이 아니라 **시간과 공간의 흐름을 가진 ‘여정’**으로 보존합니다. :contentReference[oaicite:4]{index=4}
- 기본은 비공개이며, 공유가 필요할 때만 여정의 **고유 URL**을 만들어 원하는 사람에게 전달합니다. :contentReference[oaicite:5]{index=5}

---

## 왜 필요한가 (문제 정의)

사용자는 기존 기록 방식에서 이런 피로감/한계를 겪습니다. :contentReference[oaicite:6]{index=6}

- **기록의 파편화**: 여행/프로젝트의 맥락이 여러 SNS/갤러리에 흩어짐 :contentReference[oaicite:7]{index=7}
- **과시적 기록의 압박**: 좋아요/시선에 맞춘 편집, 사소하지만 의미 있는 순간이 사라짐 :contentReference[oaicite:8]{index=8}
- **휘발되는 기억**: 피드/스토리 구조로 내 기록조차 다시 찾기 어려움 :contentReference[oaicite:9]{index=9}
- **맥락의 상실**: 이동 경로, 시간 흐름, 과정의 감정이 삭제되고 결과(사진)만 남음 :contentReference[oaicite:10]{index=10}
- **원치 않는 노출/관계 피로**: 공개가 기본인 환경에서 기록이 평가 대상이 됨 :contentReference[oaicite:11]{index=11}
- **경험 방해**: “어떻게 보여줄까” 고민이 현재의 순간을 방해 :contentReference[oaicite:12]{index=12}
- **정리의 부담**: 쌓일수록 분류/정리가 부담되어 결국 방치 :contentReference[oaicite:13]{index=13}

---

## 어떻게 다른가 (해결 방식)

MomentBook은 위 문제를 이렇게 해결합니다. :contentReference[oaicite:14]{index=14}

- **여정(Journey) 단위 기록**: 시작과 끝이 있는 경험을 하나로 묶어 입체적으로 보존 :contentReference[oaicite:15]{index=15}
- **비교 구조 배제**: 좋아요/팔로워/랭킹/추천 피드 없음 → ‘보여주기’가 아닌 ‘간직하기’ :contentReference[oaicite:16]{index=16}
- **영구적 아카이브**: 휘발되지 않고 언제든 꺼내볼 수 있는 개인 공간 :contentReference[oaicite:17]{index=17}
- **과정의 시각화**: 이동 경로/머문 장소/시간 순서가 여정에 담겨 맥락을 회상 :contentReference[oaicite:18]{index=18}
- **비공개 우선 + 선택적 공유**: 기본 비공개, 필요 시 특정 여정 URL로 ‘초대’ 방식 공유 :contentReference[oaicite:19]{index=19}
- **기록에 집중하는 UX**: 기록 마찰 최소화, 기록 후에는 앱에 머무르지 않고 일상으로 :contentReference[oaicite:20]{index=20}
- **AI 기반 정리 보조**: 제목/요약/장소명 정리 등 ‘정리 부담’만 덜어주는 조력자 :contentReference[oaicite:21]{index=21}

---

## 핵심 개념

### Journey (여정)

MomentBook의 기본 기록 단위입니다. “사진 포스팅”이 아니라, **시작과 끝이 있는 이야기(3박 4일 여행, 주말 산책, 퇴근길 단상 등)**를 담는 그릇입니다. :contentReference[oaicite:22]{index=22}

### 3가지 경로 표현 모드 (자동 결정)

경로 표현은 사용자가 수동으로 고르는 설정이 아니라, **수집된 GPS 데이터 상태**에 따라 시스템이 자동 적용합니다. :contentReference[oaicite:23]{index=23}

- **ROUTE_STRONG**: GPS 데이터가 풍부/정밀 → 선명하고 상세한 경로 :contentReference[oaicite:24]{index=24}
- **ROUTE_WEAK**: GPS가 간헐적/정밀도 낮음 → 흐름만 파악되는 느슨한 경로 :contentReference[oaicite:25]{index=25}
- **ROUTE_NONE**: 권한 미허용 또는 GPS 수집 0 → 경로 없이 기록된 장소만 표시 :contentReference[oaicite:26]{index=26}

### Publish (공개) = 확산이 아닌 ‘초대’

Publish는 SNS 업로드처럼 불특정 다수에게 확산시키는 기능이 아닙니다. 선택한 **해당 여정만의 고유 웹페이지 URL**을 만들고, 사용자가 카카오톡/DM/이메일로 원하는 사람에게 직접 전달합니다. :contentReference[oaicite:27]{index=27}

> 참고: 생성된 URL은 링크를 아는 사람은 접근 가능하며, 검색 엔진에 의해 수집될 수도 있습니다. 앱 내부에서 링크를 노출/확산시키지 않는 “조용한 공유(Quiet Diffusion)”를 지향합니다. :contentReference[oaicite:28]{index=28}

### AI의 역할 (조력자)

AI는 사용자를 대신해 “창작”하지 않습니다. 사진/위치/시간 데이터를 바탕으로 **제목 추천, 긴 글 요약, 장소명 정리** 등 **정리 부담을 줄이는 보조** 역할에 한정됩니다. :contentReference[oaicite:29]{index=29}

---

## MomentBook이 ‘아닌 것’ (오해 방지)

- SNS(친구/피드/좋아요/구독/소통 공간)가 아닙니다. :contentReference[oaicite:30]{index=30}
- 실시간 위치 공유/추적 앱이 아닙니다. :contentReference[oaicite:31]{index=31}
- 타인의 콘텐츠를 소비하는 플랫폼이 아닙니다. :contentReference[oaicite:32]{index=32}
- 단순 사진 갤러리가 아닙니다(맥락 있는 ‘여정’ 구조). :contentReference[oaicite:33]{index=33}
- 바이럴 콘텐츠 제작 도구가 아닙니다. :contentReference[oaicite:34]{index=34}
- 경쟁/순위의 장이 아닙니다. :contentReference[oaicite:35]{index=35}
- “완전 폐쇄형 비밀 공간”을 보장하는 서비스가 아닙니다(Publish URL은 웹페이지). :contentReference[oaicite:36]{index=36}

---

## 타겟 사용자 페르소나 (예시)

- **여행 기록형 (32세 마케터)**: 여행의 전체 동선/감상을 이야기로 엮고, 소수 지인에게만 공유 :contentReference[oaicite:37]{index=37}
- **산책 기록형 (45세 건축가)**: 보여주기 아닌 자신을 위한 산책/단상/계절 변화 기록 :contentReference[oaicite:38]{index=38}
- **조용한 공유형 (28세 대학원생)**: 정리된 기록에서 만족, 정말 좋았던 경험만 링크로 가볍게 공유 :contentReference[oaicite:39]{index=39}

---

## 대표 사용 시나리오 (요약)

1. **3일 여행 기록**: ROUTE_STRONG → 사진/메모 추가 → AI로 소제목 정리 → Publish URL을 부모님께 공유 :contentReference[oaicite:40]{index=40}
2. **노을 사진 1장 일상 기록**: 권한 미허용 → ROUTE_NONE → 한 달 뒤 캘린더 뷰로 쌓인 흐름을 회상 :contentReference[oaicite:41]{index=41}
3. **테마 탐방 기록**: GPS 간헐 → ROUTE_WEAK → 커버 설정 후 Publish → 친구들은 앱 없이 웹에서 열람 :contentReference[oaicite:42]{index=42}

---

## 핵심 메시지 (카피 후보)

- 기록은 노출이 아닌 보존입니다
- 당신의 여정은 당신의 것입니다
- 순간이 모여 여정이 되다
- 비교가 없는 기록의 공간
- 공유는 확산이 아닌 초대입니다
- 지도가 되는 당신의 시간  
  :contentReference[oaicite:43]{index=43}

---

## 금지 문구 (브랜드/사실관계 보호)

아래 표현은 서비스 철학을 왜곡하거나 오해를 만들 수 있어 사용하지 않습니다. :contentReference[oaicite:44]{index=44}

- “완전 비공개 공유”, “우리끼리만 보는 비밀 공유” (URL은 웹페이지로 존재)
- “외부 접근 원천 차단” (사실 아님: 링크를 가진 사람은 접근 가능)
- “우리만의 SNS”, “새로운 소셜 미디어” (SNS가 아니라는 정체성 희석)
- “실시간 위치 추적/공유” (핵심 기능이 아님)
- “최고의 여정”, “인기 여행기” 등 경쟁/랭킹 암시 표현
- “AI가 여행기를 자동으로 만들어 드립니다” (AI는 보조 역할)

---

## 최종 요약

MomentBook은 파편적·과시적·휘발적인 기존 기록 방식에서 벗어나, **경험의 과정과 맥락을 존중**하는 기록 도구를 지향합니다. 기록은 타인의 인정을 위한 수단이 아니라 **나를 위한 회상과 보존**이며, 공유(Publish) 또한 확산이 아닌 **소중한 사람에게 보내는 초대**에 가깝습니다. :contentReference[oaicite:45]{index=45}
