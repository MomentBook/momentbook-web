# Brand Marketing Audit

Date: 2026-03-31
Repository: `momentbook-web`
Audit basis: code review + external research review

## 0. Scope and method

이 문서는 2026-03-31 시점 `momentbook-web`의 브랜드 마케팅 구조를 점검한 보고서다.
이후 코드 변경으로 일부 경로/파일 참조는 현재 구현과 일치하지 않을 수 있으며, 현재 동작 기준은 `docs/PRODUCT.md`와 ADR 문서를 따른다.

- 목적: 현재 웹이 브랜드 인지, 신뢰 형성, 검색 발견성, 설치 전환 관점에서 얼마나 잘 설계되어 있는지 판단
- 전제: 이 웹은 네이티브 앱을 설명하는 공개 읽기 전용 웹이며, 분석과 권고도 이 범위를 벗어나지 않는다
- 관찰 기준:
  - 실제 코드에서 확인 가능한 현재 구조
  - 공식 문서, 연구 자료, 신뢰 가능한 참고 자료
- 제외 범위:
  - 실사용 트래픽 데이터
  - 실측 Core Web Vitals field data
  - 브라우저 실기기 시각 QA

중요: 아래 결론은 제품 경계와 현재 코드 구현을 존중하는 방향으로 작성했다. 과장형 마케팅, 소셜 피드화, 웹 기능 확장은 권고하지 않는다.

## 1. Executive summary

결론부터 말하면, 현재 웹은 "조용한 브랜드 톤 + 공개 아카이브 기반 SEO/발견성" 측면에서는 잘 설계되어 있다. 특히 다국어 SEO 구조, public archive surface, FAQ structured data, install landing의 acquisition 대응은 강점이다.

반면, 메인 홈의 첫 화면은 제품의 핵심 차별점인 "여행 사진 일괄 업로드 -> 시간/장소 기준 타임라인 정리 -> 드라이브 동기화"를 설치 랜딩보다 약하게 전달한다. 또한 홈 상단에는 신뢰 신호가 상대적으로 적고, FAQ에 있는 핵심 objection handling이 첫 결정 구간으로 끌어올려져 있지 않다.

즉, 현재 구조는 기본 골격이 좋다. 다만 브랜드 마케팅 관점에서는 "첫 화면 메시지 명료화", "신뢰 근거의 상단 배치", "기존 FAQ/설치 랜딩에서 이미 가진 강한 설명 요소의 홈 재배치", "측정 체계 보강"이 필요하다.

## 2. Overall verdict

정성 평가다. 실측 데이터가 아니라 구조/카피/정보 설계 기준 점수다.

| 항목 | 평가 | 메모 |
|---|---:|---|
| 브랜드 톤 일관성 | 8.5/10 | 과장 없이 차분하고 제품 정체성과 잘 맞음 |
| 정보 구조 | 8/10 | 홈 순서와 public archive 연결이 좋음 |
| 핵심 메시지 명료성 | 6/10 | 홈 hero가 install landing보다 추상적임 |
| 신뢰 형성 장치 | 6.5/10 | footer/FAQ/install에는 있으나 home top section은 약함 |
| SEO/발견성 | 8.5/10 | hreflang, sitemap, schema, robots 설계가 강함 |
| 전환 측정 가능성 | 4/10 | page_view 중심, home CTA 수준의 이벤트 근거가 약함 |

## 3. Research basis

아래 자료를 2026-03-31 UTC 기준으로 확인했다.

- `R1` Google Search Central, *Creating helpful, reliable, people-first content*  
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- `R2` Google Search Central, *Influencing your title links in search results*  
  https://developers.google.com/search/docs/appearance/title-link
- `R3` Google Search Central, *Tell Google about localized versions of your page*  
  https://developers.google.com/search/docs/specialty/international/localized-versions
- `R4` web.dev, *Web Vitals*  
  https://web.dev/articles/vitals
- `R5` web.dev, *Core Web Vitals workflows with Google tools*  
  https://web.dev/articles/vitals-tools
- `R6` web.dev, *How improving Fotocasa's INP contributed to 27% growth in key metrics*  
  https://web.dev/case-studies/fotocasa-cwv
- `R7` Stanford Persuasive Technology Lab, *Stanford Guidelines for Web Credibility*  
  https://credibility.stanford.edu/guidelines/index.html
- `R8` Gitte Lindgaard et al., *Attention web designers: You have 50 milliseconds to make a good first impression!*  
  https://www.researchgate.net/publication/220208334_Attention_web_designers_You_have_50_milliseconds_to_make_a_good_first_impression_Behaviour_and_Information_Technology_252_115-126
- `R9` Australian Government Style Manual, *How people read*  
  https://www.stylemanual.gov.au/accessible-and-inclusive-content/how-people-read
- `R10` Australian Government Style Manual, *Inverted pyramid structure*  
  https://www.stylemanual.gov.au/structuring-content/types-structure/inverted-pyramid-structure

### 3.1 What these sources imply

- `R8`: 사용자는 웹의 시각적 첫인상을 매우 짧은 시간 안에 형성한다. 첫 화면의 구조와 명료성은 거의 즉시 평가된다.
- `R9`, `R10`: 사용자는 읽기보다 스캔에 가깝게 행동한다. 첫 헤드라인과 첫 몇 줄이 머무를지 떠날지를 좌우한다.
- `R2`: 검색 결과의 title link는 클릭 판단의 핵심 정보다. `<title>`과 메인 시각 제목은 descriptive 하고 서로 충돌하지 않아야 한다.
- `R1`: 메인 heading/page title은 내용을 유용하게 요약해야 하고, 과장되거나 자극적이어서는 안 된다. 신뢰를 높이려면 출처, 사이트 배경, About 성격 정보가 중요하다.
- `R7`: 웹 신뢰는 "실재하는 조직", "전문성", "연락 가능성", "정확성 검증 가능성", "절제된 프로모션", "전문적이고 목적에 맞는 디자인"에서 강화된다.
- `R3`: 다국어 사이트는 localized variants를 명시적으로 연결해야 검색에서 적절한 버전이 노출된다.
- `R4`, `R5`, `R6`: Core Web Vitals는 UX 품질의 핵심 지표이고, field data 중심으로 봐야 한다. 성능 개선은 실제 비즈니스 지표에 연결될 수 있으며, 측정과 회귀 방지가 중요하다.

## 4. Current site assessment

## 4.1 What is already strong

### A. 제품 경계와 브랜드 톤이 잘 지켜져 있다

- 홈과 install landing 모두 "정리", "기억", "되돌아보기" 중심 톤을 유지한다.
- 과장된 생산성/경쟁/성과 프레이밍이 없다.
- 이는 MomentBook의 제품 정체성과 잘 맞고, `R1`, `R7`에서 말하는 "명확하고 sincere한 설명"과도 어긋나지 않는다.

코드 근거:

- 홈 메타/hero copy: `app/(localized)/[lang]/(chrome)/home.copy.ts:32-114`
- install landing tone: `lib/install-landing.ts:279-557`

### B. 홈의 큰 정보 순서는 기본적으로 좋다

현재 홈은 아래 순서다.

1. Hero
2. How it gets organized
3. Recent public journeys
4. Download

이 순서는 `R10`의 inverted pyramid 원칙에 상당 부분 부합한다. 먼저 메인 제안을 보여주고, 다음에 작동 원리와 결과 예시, 마지막에 install action으로 내려간다.

코드 근거:

- 홈 구성 순서: `app/(localized)/[lang]/(chrome)/page.tsx:121-132`
- story/value section: `app/(localized)/[lang]/(chrome)/HomeMarketingStory.tsx:104-173`
- featured journeys: `app/(localized)/[lang]/(chrome)/HomeFeaturedJourneys.tsx`

### C. public archive를 브랜드 proof surface로 활용하는 구조가 좋다

홈이 최근 공개 여정 3개를 가져와 카드로 노출하는 방식은 단순한 "설명형 랜딩"보다 낫다. 실제 공개 결과물을 바로 연결해 주기 때문이다.

이는 다음 두 장점을 만든다.

- 제품이 어떤 결과를 만드는지 설명이 아니라 artifact로 보여준다
- brand search 이외의 content discovery entry를 만든다

코드 근거:

- 최근 공개 여정 fetch: `app/(localized)/[lang]/(chrome)/page.tsx:68-84`
- 홈 featured journeys section: `app/(localized)/[lang]/(chrome)/HomeFeaturedJourneys.tsx:24-63`

### D. 다국어 SEO 및 discovery foundation이 매우 탄탄하다

현재 웹은 brand marketing에서 종종 빠지는 다국어 canonical/hreflang/sitemap 구조를 이미 잘 갖추고 있다.

- localized layout default noindex -> route-level public override
- 9개 언어 alternates + `x-default`
- segmented sitemap index
- FAQ/Collection/Profile/ImageObject structured data

이 부분은 brand discovery infrastructure로서 강점이다.

코드 근거:

- localized layout default robots: `app/(localized)/[lang]/layout.tsx:70-84`
- alternates + `x-default`: `lib/i18n/metadata.ts:16-59`
- sitemap index: `app/sitemap.xml/route.ts:7-21`
- static sitemap pages: `app/sitemap-static.xml/route.ts:19-46`
- FAQ JSON-LD: `app/(localized)/[lang]/(chrome)/(content)/faq/page.tsx:71-113`

### E. install landing은 acquisition page로서 home보다 더 선명하다

install landing은 mobile-first CTA, sample trip, trust row, step rail, store badges, QR handoff를 갖춘다. short-form traffic용 acquisition landing으로 설계 의도가 명확하다.

코드 근거:

- noindex install landing metadata: `app/(localized)/[lang]/install/page.tsx:75-100`
- install landing sections: `app/(localized)/[lang]/install/InstallLanding.tsx:153-197`
- trust row + sample trip link + store CTA: `app/(localized)/[lang]/install/InstallLandingHero.tsx:48-86`
- install trust items copy: `lib/install-landing.ts:402-424`

## 4.2 Where the current brand marketing structure is weak

### Issue 1. 메인 홈 hero가 제품의 핵심 차별점을 충분히 직접적으로 말하지 않는다

이 프로젝트에서 가장 중요한 문제다.

현재 home metadata는 매우 구체적이다.

- `Upload once, organized all the way to your drive`
- `한 번 올리면, 드라이브까지 정리됩니다`

하지만 실제 hero title은 더 추상적이다.

- `Your trip stays in a shape you can revisit`
- `당신의 여행을 기억하세요`

즉, 검색 결과나 메타 레벨에서는 명확한데, landing의 첫 시야에서는 상대적으로 덜 명확하다.

`R1`, `R2`, `R9`, `R10` 기준에서 이것은 손실이다.

- 사용자는 메인 heading과 첫 문장에서 무엇을 하는 서비스인지 즉시 이해해야 한다
- title link와 main visual title의 메시지 축이 어긋나면 클릭 이후 확신이 약해질 수 있다

현재 install landing의 subheadline은 오히려 더 직접적이다.

- `Upload your trip and get a clean travel timeline from the photos you already took.`

즉, "brand home < install landing" 역전 현상이 있다.

코드 근거:

- home meta/hero mismatch: `app/(localized)/[lang]/(chrome)/home.copy.ts:34-49`
- home hero rendering: `app/(localized)/[lang]/(chrome)/HomeHero.tsx:29-45`
- install landing concrete subheadline: `lib/install-landing.ts:290-310`

판단:

- 구조는 맞다
- 첫 문장 압축이 약하다
- 현재 사이트는 "좋은 브랜드 톤"은 갖췄지만, "첫 3초 안의 제품 명확성"은 덜 강하다

### Issue 2. 홈 상단의 trust layer가 install landing보다 약하다

홈에는 신뢰 신호가 전혀 없는 것은 아니다. 그러나 위치가 아래로 밀려 있다.

현재 확인되는 trust signal:

- footer support email
- footer legal links
- footer social channels
- home recent public journeys
- home structured data

하지만 hero 근처에는 다음 요소가 없다.

- store availability proof
- privacy/public scope 요약
- real organization/about signal
- concise proof strip

심지어 코드상 `heroFootnote`는 빈 문자열이다.

코드 근거:

- `heroFootnote: ""`: `app/(localized)/[lang]/(chrome)/home.copy.ts:712-723`
- hero render path: `app/(localized)/[lang]/(chrome)/HomeHero.tsx:48-50`
- footer trust/contact/legal: `app/(localized)/[lang]/(chrome)/ChromeFooter.tsx:67-130`
- install trust row: `app/(localized)/[lang]/install/InstallLandingHero.tsx:80-86`

`R7` 기준에서 신뢰 형성은 "실재 조직", "전문성", "연락 가능성", "검증 가능성"을 더 앞쪽에서 보여줄수록 유리하다. 현재 홈은 tone은 좋지만 신뢰 근거의 배치가 다소 늦다.

### Issue 3. FAQ의 objection-handling이 좋지만 첫 결정 구간에 연결되지 않는다

FAQ는 내용도 좋고 SEO도 좋다.

- batch upload
- auto organize
- manual correction
- private by default
- optional publish
- public web archive

문제는 이 정보가 `/{lang}/faq`에 별도 페이지로만 존재한다는 점이다. 사용자가 홈 첫 화면에서 가장 많이 궁금해할 질문이 이미 존재하지만, landing path 중간에서 재사용되지 않고 있다.

코드 근거:

- FAQ indexed metadata + FAQPage schema: `app/(localized)/[lang]/(chrome)/(content)/faq/page.tsx:32-113`
- FAQ content topics: `lib/marketing/faq-content.ts:18-103`

`R9`, `R10` 기준에서는 사용자가 스캔하면서 떠나는 지점을 줄이려면 가장 중요한 의문을 메인 path 안에서 해결해야 한다. 지금은 FAQ의 질은 좋지만 위치가 늦다.

### Issue 4. 브랜드/회사 실체를 설명하는 surface가 약하다

현재 코드 기준으로는 별도 About/company/team route가 보이지 않는다. footer에도 회사의 "왜"나 배경을 설명하는 링크는 없다.

이 프로젝트의 제품 경계를 고려하면 과한 corporate page가 꼭 필요한 것은 아니다. 하지만 brand marketing 관점에서는 최소한 아래 둘 중 하나는 필요성이 크다.

- About/Why MomentBook route
- 혹은 footer/home 내의 compact brand rationale block

현재 사이트는 support/legal/contact는 있지만, "누가 이 서비스를 만들고 어떤 관점으로 운영하는가"를 사용자가 빠르게 확인할 경로가 약하다.

코드 근거:

- header nav: `app/(localized)/[lang]/(chrome)/ChromeHeader.tsx:37-49`
- mobile menu links: `components/MobileMenu.tsx:105-113`
- footer columns: `app/(localized)/[lang]/(chrome)/ChromeFooter.tsx:59-88`

`R1`과 `R7`은 사이트 배경과 organization signal이 신뢰 형성에 중요하다고 본다. 특히 앱 설치를 유도하는 사이트라면 "실재하는 주체"가 더 쉽게 확인되어야 한다.

### Issue 5. 측정 체계가 home marketing 개선을 검증하기엔 부족하다

현재 production에서는 GA와 route-level `page_view` tracking이 있다. install landing은 개별 CTA analytics가 비교적 잘 들어가 있다. 반면 home CTA는 `DownloadActionButton` 안에서 플랫폼 분기와 QR/modal/store launch는 수행하지만, 명시적인 event tracking은 확인되지 않았다.

즉, 다음 질문에 답하기 어렵다.

- hero primary CTA 클릭률
- secondary CTA인 `See the flow` 클릭률
- recent public journeys card 클릭률
- footer support / legal / social interaction률
- home copy 변경 전후 효과

코드 근거:

- GA injection + route tracking: `app/RootDocument.tsx:91-96`
- route page_view only: `app/components/GaRouteTracker.tsx:21-29`
- home download button behavior without explicit analytics call: `components/DownloadActionButton.tsx:33-79`
- install landing detailed event tracking exists: `app/(localized)/[lang]/install/InstallLanding.tsx:84-143`

`R5`가 강조하듯 개선은 측정-디버깅-모니터링 루프가 있어야 한다. 현재는 install landing에 비해 home은 measurement blind spot이 있다.

### Issue 6. 홈은 rich media를 쓰지만 field performance discipline은 코드상 보이지 않는다

홈은 4개의 landing video asset을 사용한다. 현재 구현은 poster-first/lazy 성격을 어느 정도 고려한 방향이지만, repository 안에서는 Web Vitals 수집이나 performance monitoring 체계가 보이지 않는다.

코드 근거:

- home video assets: `app/(localized)/[lang]/(chrome)/HomeMarketingStory.tsx:17-40`
- repo 내 web-vitals/CWV instrumentation 부재 확인

이 자체가 곧 성능 문제가 있다는 뜻은 아니다. 다만 `R4`, `R5`, `R6` 기준에서 video-heavy landing은 field data로 검증해야 하고, 특히 mobile acquisition 페이지가 있는 제품에서는 더욱 그렇다.

판단:

- 성능 문제 "확정" 아님
- 그러나 측정 부재는 브랜드/전환 관점의 운영 리스크임

## 5. Priority recommendations

아래 권고는 현재 제품 경계를 유지하는 선에서만 제안한다.

## P0. 홈 hero를 더 descriptive 하게 정렬하라

목표:

- 검색 결과에서 기대한 내용을 첫 화면에서 바로 확인시키기
- home과 install landing의 message architecture를 맞추기

권고 방향:

- `<title>` / hero `h1` / 첫 문단을 같은 value proposition 축으로 맞춘다
- 차분한 톤은 유지하되, 핵심 기능은 더 직접적으로 적는다
- 최소한 첫 화면 안에서 다음 셋 중 둘 이상은 명시되어야 한다
  - 여행 사진 일괄 업로드
  - 시간/장소 기준 정리
  - 드라이브 동기화 또는 다시 보기 쉬운 타임라인

이유:

- `R1`, `R2`, `R9`, `R10`

현재 근거:

- `app/(localized)/[lang]/(chrome)/home.copy.ts:34-49`
- `app/(localized)/[lang]/(chrome)/HomeHero.tsx:29-45`
- `lib/install-landing.ts:290-310`

## P0. 홈 hero 근처에 calm trust strip을 추가하라

목표:

- 설치 결정을 밀어붙이지 않으면서도 신뢰를 더 빨리 형성하기

권고 방향:

- install landing의 trust row처럼 공격적이지 않은 factual trust items를 home hero 아래 또는 바로 다음 구간에 둔다
- tone을 해치지 않는 범위에서 다음 유형의 정보만 사용한다
  - App Store / Google Play availability
  - Private by default
  - Public publishing is optional
  - Support/contact available

이유:

- `R7`은 신뢰 형성에 contactability, real organization, restraint, verification ease를 강조한다
- 현재 install landing은 이 요소를 갖지만 home은 약하다

현재 근거:

- `app/(localized)/[lang]/(chrome)/home.copy.ts:712-723`
- `app/(localized)/[lang]/install/InstallLandingHero.tsx:80-86`
- `lib/install-landing.ts:402-424`

## P1. FAQ의 핵심 질문을 home path 안으로 끌어와라

목표:

- 사용자가 떠나기 전에 가장 큰 의문을 해소하기

권고 방향:

- 새 기능을 추가하라는 뜻이 아니다
- 이미 있는 FAQ 내용 중 핵심 3~4개를 home 중단에 compact block으로 재배치하는 것이 가장 효율적이다
- 후보 주제:
  - one batch upload
  - private by default
  - manual correction possible
  - what web provides

이유:

- `R9`, `R10`

현재 근거:

- `lib/marketing/faq-content.ts:18-103`
- `app/(localized)/[lang]/(chrome)/(content)/faq/page.tsx:71-113`

## P1. 브랜드 실체를 설명하는 경로를 강화하라

목표:

- 앱 설치 전 단계의 신뢰를 높이기

권고 방향:

- 가장 간단한 방법은 footer/home에 compact brand rationale block을 추가하는 것
- 더 강한 방법은 About/Why MomentBook route를 만드는 것
- 단, 새 route를 추가할 경우 이 저장소 규칙상 `docs/PRODUCT.md` 동기화가 필요하다

이유:

- `R1`, `R7`

현재 근거:

- `app/(localized)/[lang]/(chrome)/ChromeHeader.tsx:37-49`
- `components/MobileMenu.tsx:105-113`
- `app/(localized)/[lang]/(chrome)/ChromeFooter.tsx:59-88`

## P1. home과 install landing의 카피 우선순위를 통합하라

목표:

- 채널이 달라도 같은 브랜드 핵심을 더 일관되게 전달하기

권고 방향:

- install landing이 이미 잘 하고 있는 표현을 home top section에 반영한다
- 특히 "이미 찍은 사진 -> 업로드 -> 정리된 timeline"의 input/output framing은 install landing이 더 좋다

이유:

- install landing이 home보다 더 concrete 하다는 것은, 핵심 메시지가 분산되어 있다는 뜻이다

현재 근거:

- `app/(localized)/[lang]/(chrome)/home.copy.ts:42-49`
- `lib/install-landing.ts:290-310`

## P2. home interaction analytics를 보강하라

목표:

- 카피/구조 변경이 실제로 도움이 되는지 검증하기

권고 방향:

- home hero primary CTA
- home hero secondary CTA
- featured journey card click
- FAQ/support click
- footer download/support click

위 항목을 이벤트로 남기고, install landing analytics와 같은 taxonomy로 맞추는 것이 좋다.

이유:

- `R5`

현재 근거:

- `app/RootDocument.tsx:91-96`
- `app/components/GaRouteTracker.tsx:21-29`
- `components/DownloadActionButton.tsx:33-79`
- `app/(localized)/[lang]/install/InstallLanding.tsx:84-143`

## P2. performance를 추정이 아니라 field data로 관리하라

목표:

- rich media home이 실제로도 빠르고 안정적인지 확인하기

권고 방향:

- 우선 PSI / Search Console / CrUX로 홈과 install landing을 체크
- 가능하면 field Web Vitals를 수집
- 특히 LCP, INP, CLS를 home과 install landing에서 분리해 본다

이유:

- `R4`, `R5`, `R6`

현재 근거:

- home rich media usage: `app/(localized)/[lang]/(chrome)/HomeMarketingStory.tsx:17-40`
- repo에서 CWV 수집 코드 미확인

## 6. Recommended structure changes by page

이 섹션은 "무엇을 바꾸면 구조가 더 좋아지는가"를 페이지별로 정리한 것이다. 구현 지시가 아니라 디자인/콘텐츠 방향이다.

### Home

유지할 것:

- minimal nav
- hero -> process -> public archive -> download 흐름
- calm tone

보강할 것:

- hero headline specificity
- hero 바로 아래 trust strip
- FAQ 핵심 objection 3~4개 inline 배치
- featured journeys를 proof로 더 분명히 label

### Install landing

유지할 것:

- mobile-first CTA
- trust row
- sample trip
- QR + store dual path

보강할 것:

- home과의 copy hierarchy alignment
- home에서도 활용 가능한 strongest phrasing 추출

### Footer

유지할 것:

- support/legal 접근성
- 소셜 링크

보강할 것:

- compact company/background signal
- 사용자가 "이 서비스는 누가 운영하는가"를 더 빨리 파악할 수 있는 연결

## 7. What not to do

이 저장소의 제품 철학과 연구 근거를 함께 놓고 보면, 아래 방향은 피하는 것이 맞다.

- 과장형 conversion copy로 바꾸기
- productivity / habit / ranking / competitive framing 추가
- 소셜 피드/추천/랭킹처럼 제품 경계를 흔드는 메시지 도입
- testimonial wall이나 aggressive trust badge 남발
- SEO만을 위한 길고 비슷한 boilerplate title 양산
- 성능 측정 없이 rich media만 추가 확장

## 8. Final judgment

현재 사이트는 "브랜드 톤"과 "검색/발견성 인프라"는 강하다. 따라서 토대가 나쁜 사이트가 아니다. 오히려 구조의 기본기는 좋은 편이다.

하지만 브랜드 마케팅 관점에서 가장 중요한 첫 3초의 명료성은 메인 홈에서 아직 덜 날카롭다. install landing이 더 선명하고, FAQ가 더 설명력이 좋고, footer가 더 많은 신뢰 신호를 갖고 있다. 즉, 강한 재료는 이미 코드베이스 안에 있는데, 그 재료가 메인 홈 hero 주변에 충분히 재배치되지 않았다는 것이 현재의 핵심 문제다.

가장 큰 효과를 내는 다음 단계는 새 기능 추가가 아니다.

1. home first-screen message 정렬
2. home top-area trust layer 추가
3. FAQ objection 일부의 inline 재배치
4. home analytics / CWV measurement 보강

이 네 가지를 하면, 현재의 조용한 브랜드 정체성을 유지한 채로도 브랜드 인지, 신뢰 형성, 설치 전환까지 한 단계 더 정리된 웹이 될 가능성이 높다.
