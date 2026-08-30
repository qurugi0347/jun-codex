---
name: Planning
description: 개발 작업 전에 .codex/plan/의 plan.md, context.md, checklist.md를 작성하며 DB/API/FE 설계, 의사결정 근거, 작업 목록을 정리한다.
---

# Planning

개발 전 `.codex/plan/`에 계획 문서 3종을 작성한다.

## 문서 구성

| 문서 | 역할 | 핵심 내용 |
|------|------|----------|
| `plan.md` | 전체 설계 | 목적, DB/API/FE 설계, 설계 결정, TaskList |
| `context.md` | 맥락 기록 | 사용자 요청, 배경, 탐색한 코드 |
| `checklist.md` | 실행 추적 | Phase별 체크리스트와 세부 작업 |

## 상태

```text
draft -> confirmed -> in-progress -> done
```

| 상태 | 의미 |
|------|------|
| `draft` | 초안 작성 중 |
| `confirmed` | 사용자 승인 완료 |
| `in-progress` | 구현 진행 중 |
| `done` | 모든 작업 완료 |

## `plan.md` 템플릿

```markdown
---
name: [작업명]-plan
description: [작업명] 개발 계획
created: YYYY-MM-DD
status: draft
---

# [작업명] Plan

## 목적
- 목적:
- 문제:
- 방법:

## DB 수정 계획
| 테이블 | 변경 유형 | 컬럼 | 타입 | 설명 |
|--------|----------|------|------|------|

## API 구성
| Method | Path | 설명 | Request | Response |
|--------|------|------|---------|----------|

## FE 페이지 Flow
| 페이지 | 경로 | 설명 |
|--------|------|------|

## 설계 결정 요약
| 영역 | 결정 | 이유 | 차선책 |
|------|------|------|--------|

## TaskList 요약
| Task | 설명 | 의존성 |
|------|------|--------|
```

## `context.md` 템플릿

```markdown
---
name: [작업명]-context
description: [작업명] 작업 맥락
created: YYYY-MM-DD
---

# [작업명] Context

## 사용자 요청 원문
> 원문 그대로 인용

## 비즈니스 배경
- ...

## 기술적 배경
- ...

## 탐색한 코드
| 파일 | 관련 내용 |
|------|----------|

## 결정 사항
| 결정 | 근거 | 일시 |
|------|------|------|
```

## `checklist.md` 템플릿

```markdown
---
name: [작업명]-checklist
description: [작업명] 실행 체크리스트
created: YYYY-MM-DD
---

# [작업명] Checklist

## Phase 1: 계획
- [ ] 목적 확인
- [ ] Context 수집
- [ ] Plan 문서 작성

## Phase 2: 검증
- [ ] Code Flow 분석
- [ ] User Flow 분석
- [ ] Breaking Change 확인

## Phase 3: 구현
### Task 1: [제목]
- [ ] 세부 작업
- [ ] 검증
- [ ] 커밋

## Phase 4: 리뷰
- [ ] 요구사항 충족 확인
- [ ] 엣지 케이스 점검
```

## 설계 결정 규칙

모든 중요한 결정에는 아래 항목을 적는다.

| 항목 | 필수 | 설명 |
|------|------|------|
| 선택 | O | 무엇을 채택했는가 |
| 이유 | O | 왜 이 방식을 선택했는가 |
| 차선책 | O | 어떤 대안을 검토했는가 |
| 차선책 미채택 이유 | O | 왜 대안을 선택하지 않았는가 |
| 트레이드오프 | 권장 | 현재 선택의 단점 |

## 선택 섹션

| 섹션 | 포함 조건 |
|------|----------|
| DB 수정 계획 | DB 변경이 있을 때 |
| API 구성 | API 변경이 있을 때 |
| FE 페이지 Flow | FE 변경이 있을 때 |

## 체크리스트

- [ ] 목적이 명확한가?
- [ ] 각 설계 결정에 이유와 차선책이 있는가?
- [ ] 사용자 요청 원문이 `context.md`에 있는가?
- [ ] Task별 세부 작업이 `checklist.md`에 있는가?
- [ ] 선택 섹션이 작업 범위에 맞게 포함/생략되었는가?
