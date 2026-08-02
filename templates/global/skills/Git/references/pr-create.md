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

## PR Review Helper inline comment

GitHub remote에서 PR을 생성할 때 리뷰어가 중요한 변경을 diff 안에서 바로 이해할 수 있도록 Review Helper inline comment를 기본으로 남긴다. 사용자가 inline comment를 남기지 말라고 명시한 경우에만 생략한다.

### 중요 포인트 선택

- 변경의 진입점, 핵심 분기, 데이터 흐름이나 계약 변경, 오류 처리, 호환성·보안·성능 영향, 비직관적인 설계 선택을 우선한다.
- 파일마다 의무적으로 남기지 않고 독립적으로 이해할 가치가 있는 포인트마다 하나씩 남긴다.
- 같은 내용을 반복하는 변경은 가장 대표적인 diff line 하나에 묶는다.
- 이름 변경, 포맷 변경, 생성 코드처럼 코드만 읽어도 자명한 내용에는 남기지 않는다.
- comment는 PR diff에 포함된 정확한 line에 연결한다. 추가·수정 line은 `RIGHT`, 삭제 자체가 핵심인 경우에만 `LEFT`를 사용한다.

### Comment 내용

모든 comment는 첫 줄에 정확히 `**[PR Review Helper]**`를 쓰고 줄바꿈한 뒤 본문을 작성한다.

```markdown
**[PR Review Helper]**

**동작**
이 지점에서 무엇을 입력받아 어떤 흐름으로 처리하고 결과가 어디로 전달되는지 설명합니다.

**고민과 선택**
확인된 요구사항, 제약, 대안과 현재 방식을 선택한 이유를 설명합니다.

**리뷰 포인트**
리뷰어가 특히 확인하면 좋은 영향 범위나 edge case를 짧게 적습니다.
```

- 코드, plan, commit, 테스트에서 확인되는 사실만 사용한다. 실제 근거가 없는 논의나 대안을 지어내지 않는다.
- 구현을 그대로 번역하기보다 전체 흐름에서 이 line이 담당하는 역할을 설명한다.
- secret, 내부 credential, 개인정보처럼 PR에 노출하면 안 되는 내용은 포함하지 않는다.
- 결함 지적이나 승인 판단이 아니라 PR 작성자가 리뷰 이해를 돕는 설명으로 작성한다.

### GitHub 게시 절차

1. `gh pr diff`로 모든 대상 path와 line이 현재 PR diff에 존재하는지 확인한다.
2. 기존 PR comment를 조회해 같은 head commit, path, line에 `**[PR Review Helper]**` comment가 있으면 중복 게시하지 않는다.
3. `path`, `line`, `side`, `body`를 포함한 comment 목록을 하나의 review payload로 만들고 GitHub CLI로 `COMMENT` review를 게시한다.

```json
{
  "event": "COMMENT",
  "comments": [
    {
      "path": "src/example.ts",
      "line": 42,
      "side": "RIGHT",
      "body": "**[PR Review Helper]**\n\n**동작**\n...\n\n**고민과 선택**\n...\n\n**리뷰 포인트**\n..."
    }
  ]
}
```

```bash
gh api --method POST \
  "repos/{owner}/{repo}/pulls/{pr-number}/reviews" \
  --input "{review-payload-file}"
```

4. 게시 후 `gh api "repos/{owner}/{repo}/pulls/{pr-number}/comments" --paginate`로 실제 comment와 URL을 확인한다.
5. 일부 line이 유효하지 않아 review 게시가 실패하면 PR diff를 다시 읽고 anchor를 수정한 뒤 재시도한다.

## PR 본문 템플릿

프로젝트 PR template이 있으면 아래 기본 템플릿보다 우선한다.

```bash
find . -maxdepth 1 -iname 'pull_request_template.md' -type f
for dir in .github docs; do
  if [ -d "$dir" ]; then
    find "$dir" -maxdepth 3 \
      \( -iname 'pull_request_template.md' -o -ipath '*/PULL_REQUEST_TEMPLATE/*.md' \) \
      -type f
  fi
done
```

- PR template의 제목, 섹션 순서, 체크리스트를 보존한다.
- template의 기존 섹션에 요약, 의도, 문제, 해결 방법, 주요 변경사항, 사이드 이펙트, 호환성 깨짐 여부를 자연스럽게 채운다.
- 기존 `Overview`가 있으면 Review Helper comment 기반 내용을 그 섹션에 채운다. 없으면 요약 다음에 `Overview`를 최소로 추가한다.
- 대응되는 섹션이 없으면 가장 가까운 섹션에 짧게 녹이고, 중요한 항목이 빠질 때만 새 섹션을 최소로 추가한다.
- 프로젝트 PR template이 없을 때만 아래 기본 템플릿을 사용한다.

```markdown
## 요약

1-2줄로 문제와 접근 방식을 요약합니다.

## Overview

| 중요 포인트 | 동작 | 고민과 선택 | 상세 설명 |
|------------|------|-------------|-----------|
| 포인트 제목 | 전체 흐름에서의 역할 | 선택한 방식과 근거 | [Inline comment](게시된-comment-URL) |

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

`Overview`는 게시된 Review Helper comment와 1:1로 대응시킨다.

- comment마다 중요 포인트, 동작, 고민과 선택을 한 줄씩 요약한다.
- `상세 설명`에는 해당 inline comment URL을 연결한다.
- 게시에 실패하거나 생략한 comment는 Overview에 있는 것처럼 작성하지 않는다.
- Overview와 주요 변경사항이 같은 문장을 반복하지 않도록 Overview는 탐색용 요약으로 유지한다.

## PR 생성과 Review Helper 연결

```bash
git push -u origin feature/branch-name
gh pr create --base main --title "간결한 제목" --body "$(cat <<'EOF'
## 요약
...
EOF
)"
```

1. PR을 생성하고 PR 번호와 head commit을 확인한다.
2. 준비한 Review Helper inline comment를 게시한다.
3. 게시된 comment URL을 수집한다.
4. 프로젝트 template 구조를 보존한 최종 PR body의 `Overview`에 URL을 연결한다.
5. `gh pr edit <pr-number> --body-file <body-file>`로 최종 body를 반영하고 다시 읽어 확인한다.

## PR 완료 체크리스트

- 사용 가능한 경우 `lint`가 통과한다.
- 사용 가능한 경우 `build`가 통과한다.
- PR 본문에 의도, 문제, 해결 방법이 포함된다.
- 중요 포인트마다 Review Helper comment가 있고 첫 줄이 `**[PR Review Helper]**`인지 확인한다.
- 모든 Review Helper comment가 유효한 diff line에 연결됐는지 확인한다.
- PR body의 Overview가 게시된 comment와 1:1로 대응하고 실제 URL을 포함하는지 확인한다.
- 영향 범위 분석이 완료된다.
- 호환성 깨짐 여부가 명시된다.
