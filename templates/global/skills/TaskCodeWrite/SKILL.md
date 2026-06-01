---
name: TaskCodeWrite
description: .codex/plan/의 plan.md, context.md, checklist.md를 기반으로 미완료 task를 구현하고 task 단위로 검증/커밋할 때 사용한다.
---

# TaskCodeWrite

`.codex/plan/` 문서 3종을 기준으로 코드를 구현할 때 사용한다.

## 사용 예시

- `$TaskCodeWrite plan 기준으로 구현해줘`
- `$TaskCodeWrite checklist의 미완료 task만 진행해줘`

## 입력 문서

작업 전에 아래 파일을 읽는다.

| 파일 | 확인 내용 |
|------|----------|
| `.codex/plan/plan.md` | 범위, 설계 결정, TaskList |
| `.codex/plan/context.md` | 사용자 요청, 배경, 탐색한 코드, 결정 근거 |
| `.codex/plan/checklist.md` | 완료/미완료 task |

## 실행 절차

### 1. Plan 검토

- TaskList와 checklist를 읽고 구현 순서를 파악한다.
- `[x]` 완료 task는 건너뛴다.
- `[ ]` 미완료 task만 진행한다.
- plan을 벗어나는 변경이 필요하면 먼저 이유를 설명한다.

### 2. 구현 순서 판단

FE/BE/DB가 모두 포함된 기능이면 아래 순서를 우선한다.

```text
FE 구현 -> DB 설계 -> Decision Gate -> API 구현
```

FE-only, BE-only, DB-only 작업은 해당 영역의 기존 프로젝트 패턴을 따른다.

### 3. Task 단위 구현

- 파일 수정 전 관련 파일을 먼저 읽는다.
- 기존 코드 스타일과 helper API를 우선한다.
- 구현 중 빌드 가능한 상태를 유지한다.
- 불필요한 추상화나 범위 밖 리팩토링은 피한다.

권장 순서:

| 영역 | 순서 |
|------|------|
| Backend | Entity -> Service -> Controller -> Test |
| Frontend | 타입 -> 훅 -> 컴포넌트 -> 페이지 -> Test |
| CLI/Tooling | 옵션/타입 -> 핵심 로직 -> 검증/테스트 -> 문서 |

### 4. 검증

- task별로 가능한 가장 가까운 테스트를 실행한다.
- 전체 영향이 있으면 build/test를 실행한다.
- 실행하지 못한 검증은 이유를 기록한다.

### 5. Task 단위 Commit

`$Git` 규칙을 따른다.

- 수정한 파일만 명시적으로 `git add`한다.
- 한 커밋은 한 가지 목적만 포함한다.
- 커밋 메시지는 `FEAT`, `FIX`, `REFACTOR`, `CHORE`, `DOCS`, `STYLE`, `TEST` 중 하나를 사용한다.

### 6. Checklist 갱신

task 완료 후 `.codex/plan/checklist.md`의 해당 항목을 `[x]`로 바꾼다.
