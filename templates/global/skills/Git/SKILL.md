---
name: Git
description: Use when managing git commits, branches, pull requests, PR reviews, or applying review feedback. Includes Korean commit and PR conventions, impact analysis, and safe git workflow guidance.
---

# Git

Use this skill for commit messages, branch naming, PR creation, PR review, and applying review feedback.

## Quick Rules

| Topic | Rule |
|------|------|
| Commit prefix | `FEAT`, `FIX`, `REFACTOR`, `CHORE`, `DOCS`, `STYLE`, `TEST` |
| Commit summary | Korean, present tense, under 50 characters when practical |
| Commit scope | One purpose per commit |
| PR title | Concise Korean title without prefix |
| PR body | Include Summary, Why, What, How, main changes, and side effects |
| Git safety | Add explicit files; avoid broad staging and destructive commands |

## References

Load the relevant reference only when the task needs it:

| Task | Reference |
|------|-----------|
| Commit, branch, or PR creation | [references/git.md](references/git.md) |
| PR/MR code review | [references/pr-review.md](references/pr-review.md) |
| Applying review feedback | [references/pr-apply.md](references/pr-apply.md) |

## Codex Usage Examples

- `$Git 커밋 메시지 작성하고 필요한 파일만 add해서 커밋해줘`
- `$Git 현재 브랜치 변경사항 기준으로 PR 본문 작성해줘`
- `$Git PR 123 리뷰해줘`
- `$Git PR 리뷰 피드백 확인하고 반영해줘`

## Safety Defaults

- Inspect `git status` before staging or committing.
- Stage only files that belong to the requested change.
- Do not run destructive git commands unless the user explicitly requested them.
- Prefer `git push --force-with-lease` over `git push --force` when rewriting remote history is explicitly needed.
