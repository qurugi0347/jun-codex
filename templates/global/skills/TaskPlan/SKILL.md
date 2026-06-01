---
name: TaskPlan
description: 요청 내용을 바탕으로 코드베이스 context를 수집하고 .codex/plan/ 아래 plan.md, context.md, checklist.md 3종 계획 문서를 작성할 때 사용한다.
---

# TaskPlan

사용자 요청을 구현 가능한 작업 계획으로 바꾸고 `.codex/plan/` 하위에 계획 문서 3종을 작성할 때 사용한다.

## 사용 예시

- `$TaskPlan 결제 완료 후 주문 저장 기능 구현 계획 작성해줘`
- `$TaskPlan 기존 Claude command 내용을 Codex skill로 옮기는 계획 작성해줘`

## 실행 절차

### 1. 기존 Plan 처리

기존 `.codex/plan/` 파일이 있다면 아래 기준으로 처리한다.

| 상황 | 처리 |
|------|------|
| 현재 요청과 무관한 이전 plan | 새 계획으로 교체 |
| 현재 요청에 도움이 되는 plan | 내용 활용 후 보강 |
| plan 없음 | 새로 작성 |

### 2. 요구사항 명확화

아래 3가지를 `context.md`에 기록한다.

- 목적: 이 작업을 왜 하는가?
- 문제: 어떤 문제를 해결하는가?
- 방법: 어떻게 해결할 것인가?

불명확한 부분은 코드와 문서에서 먼저 확인하고, 그래도 결정할 수 없으면 사용자에게 질문한다.

### 3. Context 수집

- `rg`, `rg --files`, `git log`, 기존 문서 등을 우선 사용한다.
- 관련 파일 위치, 기존 패턴, 테스트 방식, 배포/설정 영향 여부를 확인한다.
- 탐색한 파일과 결정 근거를 `context.md`에 남긴다.

### 4. Plan 문서 3종 작성

| 파일 | 역할 |
|------|------|
| `.codex/plan/plan.md` | 전체 설계, 범위, 설계 결정, TaskList |
| `.codex/plan/context.md` | 사용자 요청 원문, 배경, 탐색한 코드, 결정 사항 |
| `.codex/plan/checklist.md` | Phase별, Task별 실행 체크리스트 |

`plan.md`의 frontmatter status는 처음에 `draft`로 둔다.

### 5. 설계 결정 작성

중요한 결정마다 아래 항목을 포함한다.

- 선택
- 이유
- 차선책
- 차선책 미채택 이유
- tradeoff

### 6. TaskList 작성

- 독립적으로 실행 가능한 단위로 나눈다.
- 각 task에 변경 대상, 검증 방법, 의존성을 적는다.
- 해당 없는 DB/API/FE 섹션은 생략한다.

### 7. 사용자 확인

계획 요약을 제시하고 승인을 요청한다. 사용자가 구현을 요청하기 전에는 코드 변경을 시작하지 않는다.
