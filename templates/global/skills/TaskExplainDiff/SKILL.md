---
name: TaskExplainDiff
description: PR, branch, commit, diff 등 코드 변경을 개발자가 원문 코드를 직접 읽지 않고 학습할 수 있도록 배경, 직관, 코드 흐름, 퀴즈를 포함한 self-contained HTML 설명서로 생성할 때 사용한다. PR 학습 자료는 저장소의 `.codex/explain-diff/`에 PR 번호별로 저장한다.
---

# TaskExplainDiff

지정된 코드 변경을 대신 읽고, 사용자가 생성된 문서만으로 변경의 맥락과 동작을 학습할 수 있는 풍부한 인터랙티브 HTML 설명서를 만든다.

이 skill은 코드 리뷰나 결함 탐지가 아니라 변경 이해와 학습을 목적으로 한다. GitHub review comment를 게시하거나 코드를 수정하지 않는다.

## 사용 예시

- `$TaskExplainDiff PR 123을 코드 안 읽고 이해할 수 있게 HTML로 설명해줘`
- `$TaskExplainDiff 현재 branch 변경사항을 학습 자료로 만들어줘`

## 분석 대상 수집

- 사용자가 PR URL이나 번호를 지정하면 PR 제목, 본문, base/head branch, commit, 변경 파일과 diff를 읽는다.
- remote가 GitHub이면 `gh pr view`와 `gh pr diff`를 읽기 전용으로 사용한다.
- branch, commit, diff가 대상이면 적절한 base와 head를 확인하고 local Git diff를 읽는다.
- diff만 보지 않고 관련 모듈, 호출 흐름, 문서, 테스트와 주변 코드를 폭넓게 탐색해 기존 시스템을 이해한다.
- 사용자가 원문 코드를 다시 열어보지 않아도 되도록 설명 안에 필요한 맥락을 포함한다.
- 대상을 특정할 수 없고 선택에 따라 결과가 달라질 때만 사용자에게 확인한다.

## 필수 섹션

### 1. 배경

- 변경과 관련된 기존 시스템의 동작을 설명한다.
- 처음 보는 개발자도 이해할 수 있는 넓은 배경부터 시작하고, 이번 변경에 직접 필요한 좁은 맥락으로 이어간다.
- 이미 시스템을 아는 사용자가 건너뛸 수 있도록 깊은 배경은 명확한 하위 구획으로 분리한다.

### 2. 직관

- 전체 세부사항보다 변경의 핵심 아이디어와 본질을 설명한다.
- 작은 예제 데이터와 구체적인 상황을 사용한다.
- 변경 전과 변경 후의 차이를 그림과 diagram으로 보여준다.

### 3. 코드

- 변경 파일 순서가 아니라 이해하기 쉬운 논리적 단위와 실행 흐름으로 묶어 설명한다.
- 각 변경이 전체 동작에서 담당하는 역할과 다른 구성요소에 미치는 영향을 연결한다.
- 원문 코드를 읽지 않아도 이해할 수 있는 high-level walkthrough를 제공한다.
- 코드 조각은 개념 이해에 꼭 필요한 최소 범위만 사용한다.

### 4. 퀴즈

- PR의 핵심 내용을 실제로 이해해야 풀 수 있는 중간 난이도 객관식 문제 5개를 만든다.
- 함정 문제보다 핵심 개념, 데이터 흐름, 변경 이유와 영향 범위를 확인하는 문제를 사용한다.
- 사용자가 선택지를 클릭하면 정답 여부와 구체적인 feedback을 바로 보여준다.
- 각 오답에는 왜 틀렸는지, 정답에는 왜 맞는지 설명한다.

## HTML 출력 형식

- CSS와 JavaScript를 파일 안에 포함한 단일 self-contained HTML 파일을 생성한다.
- 전체 내용을 section header와 목차가 있는 하나의 긴 page로 구성한다. 최상위 구조에 tab을 사용하지 않는다.
- PR URL이나 번호가 대상이면 저장소 root의 `.codex/explain-diff/`를 만들고 결과 HTML을 저장한다. 이 경로는 Git에서 추적하지 않는다.
- PR 대상 파일명은 `pr-<번호>.html`로 고정한다. 예를 들어 PR 123의 결과는 `.codex/explain-diff/pr-123.html`이다.
- PR 번호를 확인할 수 없는 branch, commit, local diff는 기존처럼 저장소 밖 전역 임시 경로에 저장한다.

```text
<repository-root>/.codex/explain-diff/pr-<number>.html
/tmp/YYYY-MM-DD-explanation-<slug>.html
```

- 사용자가 다른 언어를 요청하지 않으면 본문과 퀴즈를 한글로 작성한다.
- 명료하고 논리적이며 흥미롭게 읽히는 고전적 기술 문체를 사용하고 section 사이의 전환을 자연스럽게 구성한다.
- 핵심 개념, 정의, 중요한 edge case에는 callout을 사용한다.
- [`web-styling`](../web-styling/SKILL.md)을 적용해 mobile에서도 읽을 수 있는 반응형 layout과 접근성을 제공한다.

## Diagram 규칙

- 설명 전체에서 재사용할 수 있는 소수의 diagram 유형을 선택해 일관성을 유지한다.
- UI 변경은 사용자가 실제로 보는 화면을 단순화한 HTML mockup으로 설명한다.
- 시스템 변경은 구성요소 사이의 통신과 data flow를 보여주는 diagram으로 설명한다.
- data flow에는 구체적인 예제 데이터를 포함한다.
- ASCII diagram 대신 HTML 요소와 CSS로 구성한 시각적 diagram을 사용한다.
- 항목 목록은 HTML list로 표현한다.

## 코드 블록 규칙

- 코드 블록은 `<pre>`를 사용한다.
- custom element로 코드 블록을 구성해야 하면 CSS에 `white-space: pre-wrap`을 지정한다.
- 저장 전에 모든 코드 블록을 확인해 `white-space: pre` 또는 `pre-wrap`이 적용됐는지 검증한다.

## 완료 검증

- 배경, 직관, 코드, 퀴즈 4개 필수 section과 목차가 모두 있는지 확인한다.
- HTML 안에 필요한 CSS와 JavaScript가 포함되어 외부 asset 없이 열리는지 확인한다.
- 객관식 5문제가 클릭과 keyboard로 동작하고 각 선택지에 feedback이 표시되는지 확인한다.
- diagram이 ASCII가 아닌 HTML/CSS로 구성됐는지 확인한다.
- 코드 블록의 줄바꿈이 유지되는지 확인한다.
- 좁은 viewport에서 가로 scroll, 잘림, 겹침 없이 읽을 수 있는지 확인한다.
- PR 대상 결과 파일이 `.codex/explain-diff/pr-<번호>.html`에 있는지 확인한다. PR 번호가 없는 대상은 기존 `YYYY-MM-DD-` 파일명 규칙을 확인한다.
- 최종 응답에 생성한 HTML의 절대 경로를 clickable link로 제공한다.

## 참고

- 원형: [Geoffrey Litt의 explain-diff-html](https://gist.github.com/geoffreylitt/a29df1b5f9865506e8952488eac3d524)
