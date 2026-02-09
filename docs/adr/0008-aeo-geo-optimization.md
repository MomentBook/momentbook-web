# ADR 0008: AEO/GEO Optimization (Answer Engine & Generative Engine Optimization)

## Status
Accepted

## Date
2026-02-09

## Context

MomentBook 웹은 전통적 SEO(hreflang, 사이트맵, JSON-LD)는 우수하나, AI 시대 발견 최적화가 부족했다. Google AI Overviews, ChatGPT Search, Perplexity, Claude 등 생성형 AI 엔진의 인용(citation)을 받기 위한 구조가 필요하다.

**문제점**:
- AI 엔진은 추출 가능한(extractable), 구조화된 콘텐츠를 선호
- 현재 페이지는 "답변 준비 블록"(answer-ready blocks) 부족
- 연구 결과 callout 박스/강조 섹션은 인용 확률 2.3배 증가
- LLM 탐색 시간 단축을 위한 llms.txt 미존재

**현재 상태**:
- ✅ 강력한 JSON-LD 기반 (7 페이지, 6 스키마 타입)
- ✅ 깨끗한 시맨틱 구조 (H1→H2→H3)
- ✅ 9개 언어 지원 (en/ko/ja/zh/es/pt/fr/th/vi)
- ❌ 루트 Organization/WebSite 스키마 없음
- ❌ 답변 준비 블록(TL;DR, Key Facts) 없음
- ❌ llms.txt 없음
- ❌ 주요 페이지 간 내부 링크 약함

**연구 근거**:
- Callout 박스 → 인용률 2.3배 증가
- FAQ 스키마 + 직접 Q&A → 최고 추출 성공률
- llms.txt → LLM 탐색 시간 40-60% 감소
- Schema.org + 가시적 콘텐츠 일치 필수 (Google 요구사항)
- 내부 링킹 → AI "쿼리 팬아웃"(관련 질문 추적) 지원

## Decision

### P0: 즉각적인 인용/추출 개선

#### 1. 답변 준비 콘텐츠 블록 추가
4개 핵심 페이지에 TL;DR/Key Facts/Quick Start 섹션 추가:
- **패턴**: H2 질문 + 1-2문장 직접 답변 + 불릿 포인트
- **Home 페이지**: TL;DR 섹션 (질문: "What is MomentBook?", 답변 + 4 불릿)
- **About 페이지**: Key Facts 섹션 (4개 핵심 사실 불릿 리스트)
- **Download 페이지**: Quick Start 섹션 (시작 방법 Q&A + 3단계)
- **FAQ 페이지**: 이미 최적 (답변 첫 문장 독립 완결성 검증만)
- **모든 9개 언어 지원**

#### 2. JSON-LD 스키마 완성
- **Home 페이지**: Organization + WebSite 스키마 추가 (사이트 정체성 확립)
- **About 페이지**: BreadcrumbList 스키마 추가 (사이트 계층 이해)
- **Download 페이지**: SoftwareApplication 스키마 강화 (screenshot, softwareRequirements, offers 추가)

#### 3. 내부 링킹 강화
AI "쿼리 팬아웃"을 위한 문맥적 링크:
- Home → FAQ (최종 섹션에 FAQ 버튼)
- About → FAQ (essentials 섹션에 FAQ 링크)
- Download → FAQ (지원 노트에 FAQ 링크)
- FAQ → About/Download (2-3개 답변에 문맥적 링크)

### P1: LLM 탐색 비용 절감 + 신뢰 신호

#### 4. /public/llms.txt 생성
- llmstxt.org 표준 준수
- 마크다운 형식, 절대 URL 사용
- 사이트 요약, 주요 섹션, 제품 원칙, 기술 정보, 정책, 비목표(non-goals)
- **목적**: LLM 탐색 시간 40-60% 감소

#### 5. 편집 신뢰 신호
- **Last Updated**: FAQ 페이지에 "업데이트: 2026년 2월 9일" 추가
- **About This Site**: 푸터에 운영 주체(Reflecta Lab) + 연락처 섹션 추가

### P2: 측정 및 피드백 루프 (권장사항)
- Google Search Console 추적 (노출, CTR, 순위, 리치 결과)
- LLM 인용 테스트 (8개 테스트 프롬프트, ChatGPT/Perplexity/Gemini)
- Analytics 커스텀 이벤트 (`aeo_tldr_view`, `aeo_internal_link_click`)

## Rationale

### 답변 준비 블록 (2.3배 인용률 증가)
AI 엔진은 콜아웃 박스, 강조 섹션에서 답변을 추출하기 쉽다. 직접 답변 패턴(H2 질문 + 명확한 답변)은 Featured Snippets, AI Overviews 추출 패턴과 일치한다.

### llms.txt 표준
LLM이 사이트 구조와 철학을 빠르게 이해하도록 돕는다. 연구에 따르면 탐색 시간을 40-60% 줄인다. 단순한 마크다운 파일로 낮은 유지 비용.

### Schema.org + 가시적 콘텐츠
Google은 구조화 데이터가 페이지 콘텐츠와 일치해야 한다고 요구한다. 답변 준비 블록은 Schema.org 데이터의 가시적 대응물이다.

### 내부 링킹
AI는 링크를 따라가며 포괄적인 답변을 구축한다. 주요 페이지 간 링크 강화는 "쿼리 팬아웃"(관련 질문 추적)을 지원한다.

### 신뢰 신호
최신성(Last Updated), 저자 정보(About This Site), 연락처는 AI 엔진이 콘텐츠 신뢰도를 평가하는 요소다.

## Consequences

### Positive
- ✅ AI 엔진 인용 확률 2.3배 증가 (연구 기반)
- ✅ LLM 탐색 시간 40-60% 감소 (llms.txt)
- ✅ Featured Snippets, AI Overviews 추출 가능성 증가
- ✅ 전통적 SEO와 충돌 없음 (기존 구조 유지)
- ✅ 사용자 경험 개선 (빠른 답변 제공)
- ✅ FAQ 페이지 발견 가능성 향상 (내부 링크)

### Negative
- ⚠️ 번역 오버헤드 (9개 언어 × 모든 콘텐츠 블록)
- ⚠️ 콘텐츠 유지 관리 비용 증가 (Last Updated 관리)
- ⚠️ 답변 준비 블록이 콘텐츠 중복으로 느껴질 위험 (→ 뚜렷한 프레임 사용으로 완화)
- ⚠️ llms.txt 정기 업데이트 필요 (분기별 권장)

### Neutral
- 📝 측정은 수동 단계 포함 (Google Rich Results Test, LLM 인용 테스트)
- 📝 3개월 후 효과 측정 가능 (노출 +20%, CTR +10%, 인용 ≥5/8 프롬프트)
- 📝 콘텐츠-스키마 일치 검증 필수 (배포 전 체크리스트)

## Alternatives Considered

### 1. JSON-LD만 추가 (가시적 콘텐츠 없음)
**Rejected**: Google은 구조화 데이터가 페이지 콘텐츠와 일치해야 한다고 명시. JSON-LD만으로는 AI 추출 확률 낮음.

### 2. AI 전용 페이지 생성 (/ai-info, /for-llms 등)
**Rejected**: 중복 콘텐츠 위험, 사용자 혼란, SEO 페널티 가능성. 기존 페이지 강화가 더 효과적.

### 3. 모든 페이지에 TL;DR 추가
**Rejected**: 과도한 중복, 모든 페이지가 답변 준비 블록 필요한 것 아님. 4개 핵심 페이지(Home/About/Download/FAQ)만 선택.

### 4. AI 엔진별 별도 최적화 (ChatGPT 전용, Perplexity 전용 등)
**Rejected**: 유지 비용 과다, 기술 변화 빠름. 범용 패턴(callout 박스, 직접 답변, llms.txt)이 모든 AI에 효과적.

## Implementation Files

### 수정된 파일 (TypeScript/TSX)
- `app/[lang]/page.tsx` — Home TL;DR + Organization/WebSite schemas + FAQ link
- `app/[lang]/(marketing)/about/page.tsx` — Key Facts + BreadcrumbList schema + FAQ link
- `app/[lang]/(marketing)/download/page.tsx` — Quick Start + SoftwareApplication schema 강화 + FAQ link
- `app/[lang]/(content)/faq/page.tsx` — Last Updated 추가
- `app/[lang]/layout.tsx` — About This Site 푸터 섹션

### 수정된 파일 (SCSS)
- `app/[lang]/page.module.scss` — TL;DR 섹션 스타일
- `app/[lang]/(marketing)/about/about.module.scss` — Key Facts 섹션 스타일
- `app/[lang]/(marketing)/download/download.module.scss` — Quick Start 섹션 스타일
- `app/[lang]/(content)/faq/faq.module.scss` — Last Updated 스타일 (기존 스타일 재사용)
- `app/[lang]/layout.module.scss` — About This Site 푸터 스타일

### 수정된 파일 (i18n)
- `lib/i18n/dictionaries/en.ts` — 영어 콘텐츠 + Dictionary 타입 정의
- `lib/i18n/dictionaries/ko.ts` — 한국어 콘텐츠
- `lib/i18n/dictionaries/ja.ts` — 일본어 콘텐츠
- `lib/i18n/dictionaries/zh.ts` — 중국어 콘텐츠
- `lib/i18n/dictionaries/es.ts` — 스페인어 콘텐츠
- `lib/i18n/dictionaries/pt.ts` — 포르투갈어 콘텐츠
- `lib/i18n/dictionaries/fr.ts` — 프랑스어 콘텐츠
- `lib/i18n/dictionaries/th.ts` — 태국어 콘텐츠
- `lib/i18n/dictionaries/vi.ts` — 베트남어 콘텐츠

### 새로운 파일
- `public/llms.txt` — LLM 탐색 가이드 (llmstxt.org 표준)

## Verification Checklist

**배포 전**:
- [x] TypeScript 컴파일 통과 (`npx tsc --noEmit`)
- [x] Lint 통과 (`yarn lint`, 기존 25 에러는 OK)
- [x] 모든 9개 언어 번역 완료
- [ ] Google Rich Results Test 통과 (7개 스키마)
- [ ] Schema.org Validator 통과
- [ ] 구조화 데이터 ↔ 가시적 콘텐츠 일치 검증
- [ ] 내부 링크 동작 확인 (수동)
- [ ] llms.txt 접근 가능 (`/llms.txt`)
- [ ] Lighthouse 점수 (Performance ≥90, SEO ≥95)
- [ ] 시각적 회귀 체크 (스크린샷)

**배포 후**:
- [ ] GSC 베이스라인 캡처
- [ ] LLM 베이스라인 테스트 실행 (8개 프롬프트)
- [ ] Analytics 이벤트 발화 확인
- [ ] 모니터링 일정 설정 (주 1, 2, 4, 8, 12)

## Success Metrics (3개월 후)

**주요 지표**:
- 노출(Impressions): 타겟 쿼리 +20%
- CTR: 핵심 페이지 +10%
- 리치 결과(Rich Results): FAQ 스니펫 ≥3개 쿼리
- LLM 인용: ChatGPT ≥5/8 프롬프트, Perplexity ≥4/8 프롬프트
- 인용 정확도: 평균 ≥4/5

**부차 지표**:
- 스키마 검증: 100% 통과율
- Lighthouse: Performance ≥90, Accessibility ≥95, SEO ≥95
- 다운로드 전환: 감소 없음 (이상적으로 +5-10%)

## Related Decisions

- [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md) — 9개 언어 지원
- [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md) — SSG/ISR 구조
- [ADR 0006: Segmented Sitemaps](./0006-segmented-sitemaps.md) — 사이트맵 구조
- [ADR 0007: Firebase Analytics Integration](./0007-firebase-analytics-integration.md) — 분석 도구

## References

- [AEO 2026 Guide](https://eminence.ch/en/aeo-answer-engine-optimization-2026/)
- [Google AI Features Guide](https://developers.google.com/search/docs/appearance/ai-features)
- [llms.txt Standard](https://llmstxt.org/)
- [AI Citation Patterns Study](https://medium.com/@shuimuzhisou/how-ai-engines-cite-sources-patterns-across-chatgpt-claude-perplexity-and-sge-8c317777c71d)
