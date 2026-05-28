# PR 생성 참고 문서

## PR 작성 전 확인

변경사항을 확인한다.

```bash
git status
git diff main...HEAD
git log main..HEAD --oneline
```

영향 범위를 분석한다.

| 변경 유형 | 확인 사항 |
|-------------|-------|
| API 출력 | 프론트엔드 호출부와 응답 파싱 |
| API 입력 | mutation/query 호출부 |
| 공유 타입 | 해당 타입을 import하는 모든 패키지 |
| 엔티티/스키마 | Repository, service, migration, seed data |
| 컴포넌트 props | import하는 모든 컴포넌트와 페이지 |
| 유틸 함수 시그니처 | 모든 호출부 |
| 환경 변수 | 예시 env 파일과 배포 설정 |

코드 흐름을 추적한다.

```text
changed function/component -> caller -> caller's caller -> user-facing path
```

호환성 깨짐 여부를 명시한다.

```markdown
## 호환성 깨짐: 없음 / 있음

### 있음인 경우
- 무엇이 바뀌었는가:
- 영향받는 코드:
- 필요한 마이그레이션:
```

## PR 본문 템플릿

```markdown
## 요약

1-2줄로 문제와 접근 방식을 요약합니다.

## 의도

변경이 필요한 배경과 동기를 3줄 이내로 씁니다.

## 문제

해결하려는 구체적 문제나 증상을 3줄 이내로 씁니다.

## 해결 방법

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

## PR 생성

```bash
git push -u origin feature/branch-name
gh pr create --base main --title "간결한 제목" --body "$(cat <<'EOF'
## 요약
...
EOF
)"
```

## PR 생성 전 체크리스트

- 사용 가능한 경우 `lint`가 통과한다.
- 사용 가능한 경우 `build`가 통과한다.
- PR 본문에 의도, 문제, 해결 방법이 포함된다.
- 영향 범위 분석이 완료된다.
- 호환성 깨짐 여부가 명시된다.
