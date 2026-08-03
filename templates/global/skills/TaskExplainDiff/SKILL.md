---
name: TaskExplainDiff
description: 코드 변경, diff, 브랜치, PR을 배경부터 구현 흐름까지 깊이 설명하고 HTML 또는 Notion 형식의 학습 자료로 만들 때 사용한다.
---

# TaskExplainDiff

<role>

지정된 코드 변경을 처음 접하는 사람도 이해할 수 있는 설명 자료로 만든다. 변경 줄만 나열하지 않고 주변 코드와 기존 동작을 조사해 변화의 이유와 실행 흐름을 연결한다.

</role>

<instructions>

1. 현재 checkout, diff, 브랜치, PR 또는 사용자가 지정한 파일에서 설명할 변경 범위를 정한다.
2. 관련 코드, 호출부, 테스트, 설정, 데이터 모델을 살펴 기존 시스템과 변경 이후의 흐름을 파악한다.
3. 아래 순서로 설명을 구성한다.
   - **배경**: 초보자를 위한 넓은 맥락에서 시작해 변경에 직접 관련된 기존 구조와 동작으로 좁힌다.
   - **직관**: 세부 구현보다 핵심 아이디어를 먼저 설명한다. 작은 예시 데이터와 전후 비교를 사용한다.
   - **코드**: 파일 순서가 아니라 실행 또는 의존 흐름에 따라 변경을 묶어 높은 수준에서 안내한다.
   - **퀴즈**: 변경의 동작, 원인, 계약, 예외 상황을 실제로 이해해야 풀 수 있는 중간 난도 객관식 문제 5개를 만든다. 각 선택에 정답 여부와 이유를 제공한다.
4. 핵심 개념, 정의, 중요한 예외는 callout으로 강조한다. Flow, 구조, 컴포넌트 관계, 데이터 이동을 설명할 때는 줄글보다 Mermaid 다이어그램을 우선하고 예시 값을 포함한다.
5. 사용자가 출력 형식을 지정하지 않으면 HTML로 만든다.
   - **HTML**: CSS와 JavaScript를 포함한 단일 self-contained HTML 파일을 만든다. 목차가 있는 긴 한 페이지로 구성하고 모바일에서도 읽기 좋게 만든다.
   - **Notion**: 사용자가 명시적으로 요청한 경우에만 Notion 도구로 새 페이지를 만들고 URL을 반환한다. 퀴즈 선택지는 toggle 블록으로 구성해 펼쳤을 때 정답 여부와 설명이 보이게 한다.

</instructions>

<html_template>

HTML 결과물을 만들 때 이 Skill 디렉터리의 `assets/explain-diff-template.html`을 시작점으로 사용한다.

1. template을 최종 파일명 규칙에 맞는 경로로 복사한다.
2. 원본의 색상, typography, 좌측 목차, hero, card, callout, table, diagram, step, details, quiz 스타일과 반응형 동작을 유지한다.
3. `{{TABLE_OF_CONTENTS}}`와 `{{DOCUMENT_SECTIONS}}`는 실제 변경 내용에 맞춰 새로 구성한다. 예시 문서의 섹션 이름, 개수, 순서, 세부 구조를 그대로 따르지 않는다.
4. 배경, 직관, 코드, 퀴즈를 포함하되, 그 밖의 섹션은 변경의 성격과 독자의 이해 흐름에 따라 추가·통합·재배열한다.
5. 목차 항목은 실제 section과 1:1로 맞추고, 표시 순서와 번호를 본문 순서에 맞춘다.
6. 사용하지 않는 component와 빈 영역을 제거하고 모든 `{{TOKEN}}`을 실제 내용으로 치환한다.
7. Mermaid는 최종 HTML에 inline SVG로 렌더링해 외부 runtime 없이 표시한다.

</html_template>

<change_comparison>

변경 후 동작이나 구조를 설명할 때는 변경 전 상태와 함께 비교한다.

1. 상세 설명보다 먼저 아래 형식의 비교표를 배치해 핵심 변화를 한눈에 보여준다.

| 대상 | 변경 전 | 변경 후 | 상태 | 영향 |
|------|---------|---------|------|------|
| `<기능·구조·흐름>` | `<기존 동작>` | `<새 동작>` | `유지·변경·추가` | `<사용자·시스템 영향>` |

2. 한 행에는 하나의 변화만 적고, 변경 전과 변경 후는 서로 대응하는 짧은 문장으로 작성한다.
3. 구조나 Flow가 달라지면 같은 방향, 이름, 추상화 수준을 사용한 **변경 전**과 **변경 후** Mermaid 다이어그램을 나란히 배치한다. 모바일에서는 위아래로 배치한다.
4. 두 다이어그램에서 같은 상태 색상과 범례를 사용한다.
   - **유지**: 회색, `#E2E8F0` 배경과 `#475569` 테두리
   - **변경**: 주황색, `#FEF3C7` 배경과 `#D97706` 테두리
   - **추가**: 초록색, `#DCFCE7` 배경과 `#15803D` 테두리
5. 색상만으로 상태를 구분하지 않도록 노드 이름에 `[유지]`, `[변경]`, `[추가]`를 표시하고 다이어그램 가까이에 범례를 둔다.

Mermaid에는 아래 class를 일관되게 적용한다.

```mermaid
flowchart LR
classDef maintained fill:#E2E8F0,stroke:#475569,color:#0F172A;
classDef changed fill:#FEF3C7,stroke:#D97706,color:#78350F,stroke-width:3px;
classDef added fill:#DCFCE7,stroke:#15803D,color:#14532D,stroke-width:3px,stroke-dasharray:5 3;
```

</change_comparison>

<file_naming>

HTML 파일명은 현재 날짜의 `YYYY-MM-DD-` 접두사와 아래 규칙을 조합한다.

| 변경 기준 | 저장소 밖에 저장 | 해당 저장소 안에 저장 |
|----------|------------------|------------------------|
| PR | `YYYY-MM-DD-{repositoryName}-{prNumber}.html` | `YYYY-MM-DD-{prNumber}.html` |
| PR 없는 브랜치 | `YYYY-MM-DD-{repositoryName}-{branch}.html` | `YYYY-MM-DD-{branch}.html` |

- 사용자가 저장 위치를 지정하지 않으면 저장소 밖에 저장한다.
- `{repositoryName}`은 저장소 이름만 사용하고 `.git` suffix는 제외한다.
- `{branch}`에 포함된 `/`는 `-`로 바꾼다. 예: `feature/login` -> `feature-login`.
- 사용자가 파일명이나 저장 경로를 명시하면 해당 지시를 우선한다.

</file_naming>

<rules>

- 설명의 문단 사이를 자연스럽게 연결하고, 용어는 처음 등장할 때 풀어 쓴다.
- Flow와 처리 순서는 `flowchart` 또는 `sequenceDiagram`, 시스템과 모듈 구조는 `flowchart` 또는 `classDiagram`, 상태 변화는 `stateDiagram`으로 표현한다.
- Mermaid 다이어그램 앞뒤의 줄글은 다이어그램을 읽는 데 필요한 맥락과 핵심 해석만 간결하게 작성한다.
- UI 변화는 단순화한 화면 모형으로, 컴포넌트 간 통신은 데이터 예시가 포함된 흐름도로 표현한다.
- ASCII 다이어그램 대신 Mermaid를 우선하고, Mermaid로 표현하기 어려운 UI 모형이나 단순 비교에는 HTML 요소, 표, 목록 또는 출력 매체의 기본 블록을 사용한다.
- HTML 결과물에서는 Mermaid가 네트워크 없이 보이도록 다이어그램을 인라인 SVG로 렌더링하거나 필요한 런타임을 파일 안에 포함한다.
- HTML 코드 블록은 `<pre><code>`를 사용하고 `white-space: pre` 또는 `pre-wrap`을 명시한다.
- HTML 퀴즈는 선택 즉시 피드백을 보여 주며 오프라인에서도 동작하게 만든다.
- 조사한 코드가 뒷받침하는 사실과 해석을 구분한다.

</rules>

<reference>

- 원문: https://gist.github.com/geoffreylitt/a29df1b5f9865506e8952488eac3d524
- 원문의 `explain-diff-html.md`와 `explain-diff-notion.md`를 한국어로 통합·정리했다.

</reference>
