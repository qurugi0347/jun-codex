---
name: SessionWrap
description: 현재 브랜치 diff를 분석해 반복 패턴, 학습 포인트, 후속 작업, 새 skill/context 후보를 정리할 때 사용한다.
---

# SessionWrap

현재 브랜치 변경사항을 정리해 다음 작업에 쓸 수 있는 학습 포인트와 후속 작업을 뽑는다.

## 실행 흐름

1. base branch를 찾는다.

```bash
BASE=$(git merge-base HEAD main 2>/dev/null || git merge-base HEAD master)
```

2. 변경 통계를 수집한다.

```bash
git diff --stat "$BASE"..HEAD
git diff --name-only "$BASE"..HEAD
git log --oneline "$BASE"..HEAD
```

3. diff를 수집한다.

```bash
git diff "$BASE"..HEAD
```

diff가 5000줄을 넘으면 전체 diff 대신 stat, name-only, 핵심 파일 일부만 사용한다.

4. 아래 3개 관점으로 분석한다.

| 관점 | 질문 | 출력 |
|------|------|------|
| 반복 패턴 | 앞으로 자동화하거나 skill화할 규칙이 있는가? | Skill 후보 |
| 학습 포인트 | 프로젝트 규칙 또는 맥락으로 남길 것이 있는가? | Context/규칙 후보 |
| 후속 작업 | 미완성, 리스크, 추가 검증이 있는가? | 우선순위별 작업 |

5. 결과를 통합한다.

```markdown
# Session Wrap 분석 결과

## 1. Skill 후보
- ...

## 2. 학습 포인트
- ...

## 3. 후속 작업
- ...
```

## 규칙

- 분석 결과를 자동 적용하지 않는다.
- 적용할 항목은 사용자에게 제안하고 확인 후 실행한다.
- 빈 결과는 `해당 없음`으로 표시한다.
- 후속 작업은 우선순위와 이유를 같이 적는다.
