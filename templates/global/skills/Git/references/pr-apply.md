# PR Feedback Apply Reference

Use this when applying review feedback from a pull request or merge request.

## Workflow

1. Read feedback and diff.

```bash
gh pr view <PR-number> --comments
gh pr diff <PR-number>
```

2. Classify feedback.

| Type | Response |
|------|----------|
| Critical | Apply unless technically impossible, then explain blocker |
| Suggestion | Apply when it improves the change; otherwise explain tradeoff |
| Question | Answer directly, with code changes if needed |

3. Edit code.

- Keep each fix scoped to the review comment.
- Preserve unrelated user changes.
- Add or update tests when feedback changes behavior or fixes a bug.

4. Commit review fixes.

```bash
git status
git add path/to/changed-file
git commit -m "$(cat <<'EOF'
FIX: PR 리뷰 피드백 반영

- [Critical] 반영 내용
- [Suggestion] 반영 내용
EOF
)"
```

5. Push and notify.

```bash
git push
gh pr comment <PR-number> --body "리뷰 피드백 반영 완료했습니다. 재확인 부탁드립니다."
```

## Response Rules

- If accepting feedback, update code and mention what changed.
- If disagreeing, explain the reason and propose an alternative.
- If a question reveals missing context, add a concise code comment or PR comment.
- If feedback is out of scope, call that out and suggest a follow-up.

## Checklist

- [ ] All Critical feedback is resolved.
- [ ] Suggestions are applied or answered.
- [ ] Questions are answered.
- [ ] Tests/build/lint pass where available.
- [ ] The PR has a clear update comment if needed.
