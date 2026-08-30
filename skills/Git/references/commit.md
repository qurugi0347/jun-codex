# 커밋 참고 문서

## 커밋 메시지

아래 형식을 사용한다.

```text
<PREFIX>: <간결한 한글 요약>

<본문: 선택>
```

허용 prefix:

| Prefix | 용도 |
|--------|-----|
| `FEAT` | 새로운 기능 |
| `FIX` | 버그 수정 |
| `REFACTOR` | 의도한 동작 변경 없는 리팩토링 |
| `CHORE` | 빌드, 도구, 설정, 유지보수 |
| `DOCS` | 문서 |
| `STYLE` | 포맷팅만 변경 |
| `TEST` | 테스트 |

작성 규칙:

- 요약은 한글로 작성한다.
- `추가`, `수정`, `정리`처럼 현재형을 사용한다.
- 요약은 간결하게 작성하고, 가능하면 50자 이내로 유지한다.
- 변경 이유가 자명하지 않으면 본문에 왜 필요한지 설명한다.
- 한 커밋은 한 가지 목적에 집중한다.

## 브랜치 이름

```text
feature/{feature-name}
fix/{bug-name}
refactor/{target}
chore/{task-name}
docs/{topic}
```

## 안전한 커밋 절차

1. 상태를 확인한다.

```bash
git status
git diff
```

2. 요청된 변경에 속한 파일만 staging한다.

```bash
git add path/to/file1 path/to/file2
```

3. 커밋한다.

```bash
git commit -m "$(cat <<'EOF'
FEAT: 기능 요약

필요한 경우 변경 이유를 적습니다.
EOF
)"
```

## 안전 규칙

| 피할 것 | 우선할 것 |
|-------|--------|
| `git add -A`, `git add .` | `git add path/to/file` |
| `git reset --hard` | 먼저 확인하거나 비파괴적 복구 사용 |
| `--no-verify` | hook 실패 원인 수정 |

커밋 전 확인:

- 사용 가능한 경우 `lint`가 통과한다.
- 사용 가능한 경우 `build`가 통과한다.
- 커밋 메시지가 prefix 규칙을 따른다.
- 커밋 범위가 한 가지 목적에 집중되어 있다.
