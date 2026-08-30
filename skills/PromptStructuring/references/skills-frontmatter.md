# Codex Skill Frontmatter

Codex skill은 `SKILL.md`의 YAML frontmatter 중 `name`과 `description`을 사용해 스킬 사용 시점을 판단한다.

## 필수 형식

```yaml
---
name: SkillName
description: 사용자가 어떤 요청을 했을 때 이 스킬을 써야 하는지 명확히 설명한다.
---
```

## `name`

- 디렉터리 이름과 맞춘다.
- 짧고 고유하게 작성한다.
- 공백보다 PascalCase 또는 kebab-case를 사용한다.

## `description`

좋은 description은 다음 정보를 포함한다.

| 요소 | 설명 |
|------|------|
| 트리거 | 어떤 작업/요청에서 사용하는가 |
| 범위 | 어떤 파일, 도구, 도메인을 다루는가 |
| 핵심 가치 | 어떤 절차나 제약을 제공하는가 |

예시:

```yaml
description: React 컴포넌트, hook, form, 라우팅 구현 시 기존 패턴을 따르고 상태/props/렌더링 최적화 규칙을 적용한다.
```

## 본문 구성

- `SKILL.md`에는 핵심 워크플로우와 참조 문서 목록만 둔다.
- 긴 세부 규칙은 `references/` 아래로 분리한다.
- 참조 링크는 `references/file.md` 형식으로 작성해 검증 가능하게 한다.
- 보조 파일은 README보다 실제 작업에 필요한 이름으로 둔다.

## 설치 템플릿 구조

```text
skills/SkillName/
├── SKILL.md
└── references/
    └── detail.md
```

## 피해야 할 것

- Codex가 사용하지 않는 Claude 전용 필드에 의존
- `description`이 너무 짧아 트리거를 판단하기 어려운 경우
- 하나의 `SKILL.md`에 모든 세부 규칙을 넣는 경우
- 실제 작업과 무관한 README, CHANGELOG, INSTALL 문서 추가
