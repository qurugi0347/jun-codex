---
name: Git
description: Git 커밋, 브랜치, PR 작성, PR 리뷰, 리뷰 피드백 반영 작업에 사용한다. 한글 커밋/PR 규칙, 영향 분석, 안전한 Git 작업 절차와 PR Review Helper inline comment 및 Overview 작성 규칙을 포함한다.
---

# Git

커밋 메시지 작성, 브랜치 이름 결정, PR 작성, PR 리뷰, 리뷰 피드백 반영 시 이 스킬을 사용한다.

## 빠른 규칙

| 주제 | 규칙 |
|------|------|
| 커밋 prefix | `FEAT`, `FIX`, `REFACTOR`, `CHORE`, `DOCS`, `STYLE`, `TEST` |
| 커밋 요약 | 한글, 현재형, 가능하면 50자 이내 |
| 커밋 단위 | 한 커밋은 한 가지 목적만 포함 |
| PR 제목 | prefix 없이 간결한 한글 제목 |
| PR 본문 | 항상 TaskExplainDiff의 배경·직관·코드 흐름·변경 전후 비교와 퀴즈를 Markdown 본문에 사용한다. `Overview`는 Review Helper comment와 연결 |
| PR Review Helper | 중요 포인트의 대표 diff line에 `**[PR Review Helper]**`로 시작하는 inline comment를 남겨 동작과 고민을 설명 |
| Git 안전 규칙 | 파일을 명시해서 add하고, 광범위 staging과 파괴적 명령을 피함 |

## 참고 문서

작업에 필요한 참고 문서만 읽는다.

| 작업 | 참고 문서 |
|------|-----------|
| 커밋, 브랜치 작업 | [references/commit.md](references/commit.md) |
| PR 생성 | [references/pr-create.md](references/pr-create.md) |
| PR/MR 코드 리뷰 | [references/pr-review.md](references/pr-review.md) |
| 리뷰 피드백 반영 | [references/pr-apply.md](references/pr-apply.md) |

## Codex 사용 예시

- `$Git 커밋 메시지 작성하고 필요한 파일만 add해서 커밋해줘`
- `$Git 현재 브랜치 변경사항 기준으로 PR 본문 작성해줘`
- `$Git PR 123 리뷰해줘`
- `$Git PR 리뷰 피드백 확인하고 반영해줘`

## 기본 안전 규칙

- staging 또는 commit 전에 `git status`를 확인한다.
- 요청된 변경에 속한 파일만 staging한다.
- 사용자가 명시적으로 요청하지 않은 파괴적 Git 명령은 실행하지 않는다.
- 원격 이력 재작성 필요성이 명확할 때도 `git push --force`보다 `git push --force-with-lease`를 우선한다.
