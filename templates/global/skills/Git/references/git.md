# Git Workflow Reference

## Commit Messages

Use this format:

```text
<PREFIX>: <간결한 한글 요약>

<본문: 선택>
```

Allowed prefixes:

| Prefix | Use |
|--------|-----|
| `FEAT` | New feature |
| `FIX` | Bug fix |
| `REFACTOR` | Refactor without intended behavior change |
| `CHORE` | Build, tooling, configuration, maintenance |
| `DOCS` | Documentation |
| `STYLE` | Formatting only |
| `TEST` | Tests |

Writing rules:

- Write the summary in Korean.
- Use present tense, for example `추가`, `수정`, `정리`.
- Keep the summary concise, preferably under 50 characters.
- Explain why in the body when the change is not obvious.
- Keep one commit focused on one purpose.

## Branch Naming

```text
feature/{feature-name}
fix/{bug-name}
refactor/{target}
chore/{task-name}
docs/{topic}
```

## Before Creating A PR

Inspect the change:

```bash
git status
git diff main...HEAD
git log main..HEAD --oneline
```

Analyze impact:

| Change type | Check |
|-------------|-------|
| API output | Frontend callers and response parsing |
| API input | Mutation/query callers |
| Shared type | All packages importing the type |
| Entity/schema | Repository, service, migration, seed data |
| Component props | All importing components/pages |
| Utility signature | All call sites |
| Environment variable | Example env files and deployment settings |

Trace code flow:

```text
changed function/component -> caller -> caller's caller -> user-facing path
```

State breaking changes explicitly:

```markdown
## Breaking Change: 없음 / 있음

### 있음인 경우
- 무엇이 바뀌었는가:
- 영향받는 코드:
- 필요한 마이그레이션:
```

## PR Body Template

```markdown
## Summary

1-2줄로 문제와 접근 방식을 요약합니다.

## Why (의도)

변경이 필요한 배경과 동기를 3줄 이내로 씁니다.

## What (문제)

해결하려는 구체적 문제나 증상을 3줄 이내로 씁니다.

## How (해결 방법)

접근 방식과 핵심 변경 내용을 3줄 이내로 씁니다.

## 주요 변경사항

### 변경 1: 제목
- 변경 내용을 1-2줄로 설명합니다.

## 사이드 이펙트

다른 영역에 발생할 수 있는 영향을 3줄 이내로 씁니다.

| 영향 받는 영역 | 영향 내용 | 위험도 |
|---------------|----------|--------|
| 없음 | - | - |
```

Create a PR:

```bash
git push -u origin feature/branch-name
gh pr create --base main --title "간결한 제목" --body "$(cat <<'EOF'
## Summary
...
EOF
)"
```

## Safe Git Rules

| Avoid | Prefer |
|-------|--------|
| `git add -A`, `git add .` | `git add path/to/file` |
| `git push --force` | `git push --force-with-lease` when explicitly needed |
| `git reset --hard` | Ask first, or use non-destructive recovery |
| `--no-verify` | Fix the hook failure |

Before committing:

- `lint` passes when available.
- `build` passes when available.
- Commit message follows the prefix rule.
- PR body includes Why, What, and How.
- Impact analysis is complete.
- Breaking changes are stated.
