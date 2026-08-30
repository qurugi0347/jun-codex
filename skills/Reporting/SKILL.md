---
name: Reporting
description: Codex가 탐색, 수정, 검증, 관리 작업 결과를 Discoveries, Changes, Reasoning 3축으로 간결하게 보고할 때 사용한다.
---

# Reporting

작업 결과를 역할에 맞게 구조화해 사용자가 바로 판단할 수 있게 보고한다.

## 보고 3축

| 축 | 의미 | 포함 내용 |
|----|------|----------|
| `Discoveries` | 발견한 것 | 탐색 결과, 기존 패턴, 참고 코드, 문제 지점 |
| `Changes` | 변경한 것 | 생성/수정/삭제 파일과 변경 요약 |
| `Reasoning` | 판단 근거 | 결정 이유, 대안, 트레이드오프 |

## 작업 유형별 초점

| 유형 | 초점 |
|------|------|
| 탐색 | `Discoveries` 중심 |
| 구현 | `Changes` + `Reasoning` 중심 |
| 리뷰/검증 | `Discoveries` + `Reasoning` 중심 |
| Git/정리 | `Changes` 중심 |

## 작성 원칙

- 핵심 사실만 쓰고 서사를 줄인다.
- 파일 경로는 프로젝트 루트 기준 상대 경로로 쓴다.
- 코드 변경은 before/after 또는 diff 요약을 포함한다.
- 판단이 필요한 결정은 대안과 기각 이유를 같이 적는다.
- 해당 없는 축은 `해당 없음`으로 명시한다.

## 출력 템플릿

탐색형:

```markdown
## Discoveries
- [발견]: 설명

## Changes
해당 없음

## Reasoning
- [판단]: 근거
```

수정형:

```markdown
## Discoveries
- 참고한 기존 패턴: `path/to/reference.ts`

## Changes
| 파일 | 변경 유형 | 요약 |
|------|----------|------|
| `path/to/file.ts` | 수정 | 변경 요약 |

## Reasoning
- [결정]: 근거와 대안
```

검증형:

```markdown
## Discoveries
- [심각도] `path/to/file.ts:12` - 이슈 요약

## Changes
해당 없음

## Reasoning
- 문제 원인과 권장 수정 방향
```
