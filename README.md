# jun-codex

Codex용 개인 global instructions/skills/settings 설치 CLI입니다. 공통 `AGENTS.md`, Git 관리 skill과 Claude Code command를 옮긴 task skill을 `~/.codex`에 설치합니다.

## 설치 대상

`jun-codex`는 다음 우선순위로 Codex home을 찾습니다.

1. `$CODEX_HOME`
2. `~/.codex`

설치 후 구조:

```text
~/.codex/
├── AGENTS.md
├── .jun-codex-installed.json
└── skills/
    ├── Backend/
    ├── Coding/
    ├── ContextHandoff/
    ├── Director/
    ├── Documentation/
    ├── Git/
    │   ├── SKILL.md
    │   └── references/
    │       ├── commit.md
    │       ├── pr-create.md
    │       ├── pr-review.md
    │       └── pr-apply.md
    ├── Planning/
    ├── PromptStructuring/
    ├── React/
    ├── Reporting/
    ├── SessionWrap/
    ├── TaskPlan/
    ├── TaskCodeWrite/
    ├── TaskCodeReview/
    ├── TaskExplainDiff/
    ├── TaskPrReviewApplyPlan/
    ├── TaskReviewPlan/
    ├── TypeORM/
    ├── web-styling/
    └── worktree/
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
| `jun-codex` | `templates/global`의 `AGENTS.md`와 Codex skill을 `$CODEX_HOME` 또는 `~/.codex`에 설치 |
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
$TaskExplainDiff PR 123을 코드 안 읽고 이해할 수 있게 HTML로 설명해줘
$TaskPrReviewApplyPlan PR 리뷰 코멘트 반영 계획 작성해줘
$TaskReviewPlan 구현 전에 plan을 검토해줘
$worktree feature/coupon에서 pull 받고 TASK 5 작업 준비해줘
$React 폼 컴포넌트 구현 패턴 확인해줘
$Backend NestJS 서비스 테스트 작성해줘
$SessionWrap 현재 브랜치 작업 정리해줘
```

## 포함 Skills

| Skill | 설명 |
|------|------|
| `Backend` | NestJS 레이어 책임, DTO/Entity 변환, BDD 테스트 |
| `Coding` | 공통 설계 원칙, 결합도/응집도, 가독성 규칙 |
| `ContextHandoff` | 긴 작업 인수인계용 HANDOFF.md 작성 |
| `Director` | 프로젝트 스펙 문서와 충돌 검증 |
| `Documentation` | Codex 문서와 skill 작성 규칙 |
| `Git` | 커밋, 브랜치, PR 생성, PR 리뷰, 리뷰 피드백 반영 |
| `Planning` | `.codex/plan/` 기본 문서 4종 작성 템플릿 |
| `PromptStructuring` | skill/프롬프트 구조화, frontmatter, 출력 최적화 |
| `React` | React 컴포넌트, hook, router, form, styling 패턴 |
| `Reporting` | 작업 결과 보고 형식 |
| `SessionWrap` | 브랜치 diff 기반 세션 정리와 후속 작업 도출 |
| `TaskPlan` | `.codex/plan/` 기본 문서 4종 작성 |
| `TaskCodeWrite` | plan/checklist 기반 구현과 task 단위 검증 |
| `TaskCodeReview` | plan과 구현 diff 기반 코드 리뷰 |
| `TaskExplainDiff` | PR 코드를 대신 읽고 인터랙티브 HTML 학습 자료 생성 |
| `TaskPrReviewApplyPlan` | PR 리뷰 반영 여부와 수정 방향을 `.codex/plan/pr-review-apply-plan.md`로 계획 |
| `TaskReviewPlan` | 구현 전 plan 문서 리뷰 |
| `TypeORM` | TypeORM 쿼리 선택 기준과 migration 규칙 |
| `web-styling` | 반응형 HTML/CSS 레이아웃과 유연한 크기 지정 규칙 |
| `worktree` | TASK 작업용 worktree 생성과 `.codex`/`.env` 설정 복사 |

## 포함/제외 범위

포함:

- 모든 workspace에 적용하는 global `AGENTS.md`
- `Git` skill
- `Backend`, `Coding`, `Documentation`, `React`, `TypeORM` 등 Claude Code global skill을 Codex용으로 변환한 skill
- `TaskPlan`, `TaskCodeWrite`, `TaskCodeReview`, `TaskExplainDiff`, `TaskPrReviewApplyPlan`, `TaskReviewPlan` skill
- 반응형 웹 UI 크기 규칙을 적용하는 `web-styling` skill
- TASK 작업용 worktree와 로컬 `.codex`/`.env` 설정을 준비하는 `worktree` skill
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
