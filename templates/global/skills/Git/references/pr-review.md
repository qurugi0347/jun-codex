# PR Review Reference

Use a code-review stance: lead with bugs, risks, behavioral regressions, and missing tests. Keep summaries secondary.

## Review Workflow

1. Collect context.

```bash
gh pr view <PR-number>
gh pr diff <PR-number>
```

2. Build a review plan.

```markdown
## PR Review Plan

- [ ] PR scope
  - Purpose:
  - Expected behavior change:
- [ ] File-by-file review
  - [ ] `file1.ts` - reason to inspect
  - [ ] `file2.tsx` - reason to inspect
- [ ] Implementation quality
  - [ ] Correctness
  - [ ] Error handling
  - [ ] Edge cases
  - [ ] Type safety
- [ ] Integration
  - [ ] Breaking changes
  - [ ] API contracts
  - [ ] Tests
```

3. Review the diff.

- Verify behavior, not only style.
- Trace changed data and control flow.
- Check whether tests cover the changed behavior.
- Check whether user-facing failures have clear handling.

4. Report findings first.

```markdown
## Findings

- [severity] `path/file.ts:line` - Issue summary.
  Explain the concrete risk and when it happens.

## Open Questions

- ...

## Summary

Brief change summary only after findings.
```

## Focus By PR Type

| Type | Focus |
|------|-------|
| Feature | Correctness, tests, docs, user flow |
| Bugfix | Root cause, regression coverage |
| Refactor | Behavior preservation, compatibility |
| Config | Security, environment compatibility |
| Dependency | Breaking changes, vulnerabilities |

## Severity

| Severity | Meaning |
|----------|---------|
| Critical | Must fix before merge; data loss, security, major breakage |
| Warning | Should fix; likely bug or maintainability risk |
| Suggestion | Optional improvement |
| Question | Needs clarification before confident approval |
