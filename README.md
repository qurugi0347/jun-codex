# jun-codex

Codex용 개인 skills/settings 설치 CLI입니다. 현재 1차 범위는 Git 관리 skill과 `~/.codex` 설치/update/validate 기능입니다.

## 설치 대상

`jun-codex`는 다음 우선순위로 Codex home을 찾습니다.

1. `$CODEX_HOME`
2. `~/.codex`

설치 후 구조:

```text
~/.codex/
├── .jun-codex-installed.json
└── skills/
    └── Git/
        ├── SKILL.md
        └── references/
            ├── git.md
            ├── pr-review.md
            └── pr-apply.md
```

## 사용법

```bash
npm run build
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
```

## 포함/제외 범위

포함:

- `Git` skill
- commit/branch/PR 작성 규칙
- PR review/reference 문서
- PR feedback apply/reference 문서
- `~/.codex` 설치 CLI
- metadata 기반 update
- 템플릿 validate

제외:

- Claude 전용 `commands/`
- Claude 전용 `agents/`
- Claude 전용 `hooks/`
- statusline 설정
- GitHub Project/context 자동화
- 프로젝트 로컬 `.codex` 설치

## 개발

```bash
npm install
npm test
```
