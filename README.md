# jun-codex

Codex용 개인 skills/settings 설치 CLI입니다. Git 관리 skill과 Claude Code command를 옮긴 task skill을 `~/.codex`에 설치합니다.

## 설치 대상

`jun-codex`는 다음 우선순위로 Codex home을 찾습니다.

1. `$CODEX_HOME`
2. `~/.codex`

설치 후 구조:

```text
~/.codex/
├── .jun-codex-installed.json
└── skills/
    ├── Git/
    │   ├── SKILL.md
    │   └── references/
    │       ├── commit.md
    │       ├── pr-create.md
    │       ├── pr-review.md
    │       └── pr-apply.md
    ├── TaskPlan/
    ├── TaskCodeWrite/
    ├── TaskCodeReview/
    └── TaskReviewPlan/
```

## 사용법

```bash
pnpm build
node dist/cli.js --dry-run
node dist/cli.js --force
```

패키지 bin으로 실행할 때:

```bash
jun-codex
jun-codex --dry-run
jun-codex --force
jun-codex update --dry-run
jun-codex update
jun-codex validate
```

## 명령

| 명령 | 설명 |
|------|------|
| `jun-codex` | `templates/global`의 Codex skill을 `$CODEX_HOME` 또는 `~/.codex`에 설치 |
| `jun-codex --dry-run` | 설치될 파일과 상태만 확인 |
| `jun-codex --force` | 기존 사용자 수정 파일까지 덮어쓰기 |
| `jun-codex update` | metadata 기준으로 새 템플릿 반영 |
| `jun-codex update --dry-run` | update 상태만 확인 |
| `jun-codex update --force` | 사용자 수정 파일까지 덮어쓰기 |
| `jun-codex validate` | 템플릿 구조와 skill frontmatter 검증 |

## Codex Skill 사용

Claude Code의 slash command는 Codex에 설치하지 않습니다. task 성격의 요청은 skill을 멘션해서 사용합니다.

예시:

```text
$Git 현재 변경사항을 보고 커밋 메시지 작성해줘
$Git 필요한 파일만 add해서 커밋해줘
$Git PR 본문 작성해줘
$Git PR 123 리뷰해줘
$Git PR 리뷰 피드백 반영해줘
$TaskPlan 요청 내용 기준으로 계획 문서 작성해줘
$TaskCodeWrite plan 기준으로 구현해줘
$TaskCodeReview 현재 구현을 plan 기준으로 리뷰해줘
$TaskReviewPlan 구현 전에 plan을 검토해줘
```

## 포함 Skills

| Skill | 설명 |
|------|------|
| `Git` | 커밋, 브랜치, PR 생성, PR 리뷰, 리뷰 피드백 반영 |
| `TaskPlan` | `.codex/plan/` 문서 3종 작성 |
| `TaskCodeWrite` | plan/checklist 기반 구현과 task 단위 검증 |
| `TaskCodeReview` | plan과 구현 diff 기반 코드 리뷰 |
| `TaskReviewPlan` | 구현 전 plan 문서 리뷰 |

## 포함/제외 범위

포함:

- `Git` skill
- `TaskPlan`, `TaskCodeWrite`, `TaskCodeReview`, `TaskReviewPlan` skill
- commit/branch/PR 작성 규칙
- PR review/reference 문서
- PR feedback apply/reference 문서
- `~/.codex` 설치 CLI
- metadata 기반 update
- 템플릿 validate

제외:

- Claude 전용 `commands/` 파일 자체
- Claude 전용 `agents/`
- Claude 전용 `hooks/`
- statusline 설정
- GitHub Project/context 자동화
- 프로젝트 로컬 `.codex` 설치

## 개발

```bash
pnpm install
pnpm test
```
