---
name: Documentation
description: Codex용 .codex 문서, context, skill, 계획 문서를 작성하거나 정리할 때 frontmatter, 파일 분리, 템플릿, 검색 가능성 규칙을 적용한다.
---

# Documentation

Codex가 재사용할 문서는 짧고 검색 가능하며 단독으로 이해 가능해야 한다.

## 핵심 원칙

| 원칙 | 적용 |
|------|------|
| 컨텍스트 압축 | 핵심 사실과 절차만 남긴다 |
| 검색 가능성 | 파일명, 제목, description에 주요 키워드를 넣는다 |
| 독립성 | 각 문서는 단독으로 읽어도 의미가 통한다 |
| 참조 명시 | 관련 문서와 소스 경로를 항상 연결한다 |

## 권장 구조

```text
.codex/
├── instructions.md
├── plan/
│   ├── plan.md
│   ├── context.md
│   └── checklist.md
└── skills/
    └── SkillName/
        ├── SKILL.md
        └── references/
            └── detail.md
```

## 파일 유형

| 유형 | 목적 | 위치 |
|------|------|------|
| Context | 사실/배경 정보 | `.codex/context/` 또는 계획의 `context.md` |
| Skill | 반복 절차와 작업 규칙 | `.codex/skills/SkillName/SKILL.md` |
| Plan | 작업 목표, 설계, 체크리스트 | `.codex/plan/` |
| Reference | skill의 세부 자료 | `SkillName/references/` |

## Skill frontmatter

Codex skill에는 최소한 아래 필드를 둔다.

```yaml
---
name: SkillName
description: 어떤 요청에서 이 스킬을 사용해야 하는지 한 문장으로 설명한다.
---
```

## Skill 템플릿

```markdown
---
name: SkillName
description: 사용 시점과 제공하는 절차를 설명한다.
---

# SkillName

## 핵심 역할

- 역할 1
- 역할 2

## 작업 절차

1. 맥락을 수집한다.
2. 기존 패턴을 확인한다.
3. 필요한 최소 범위로 수정한다.
4. 검증 결과를 보고한다.

## 규칙

| 규칙 | 설명 |
|------|------|
| 범위 제한 | 요청과 관련된 파일만 수정 |
| 검증 우선 | 가능한 테스트와 빌드를 실행 |

## 참고 문서

| 문서 | 설명 |
|------|------|
| `references/detail.md` | 세부 규칙 |
```

## Context 템플릿

```markdown
# 제목

## 핵심 정보

| 항목 | 값 |
|------|-----|
| 목적 | ... |

## 제약 사항

- 제약 1
- 제약 2

## 관련 파일

- `src/module/file.ts` - 관련 이유
```

## 분리 기준

| 상태 | 기준 | 조치 |
|------|------|------|
| 권장 | 500줄 이하 | 단일 파일 유지 |
| 주의 | 500~1000줄 | 참조 파일 분리 검토 |
| 분리 | 1000줄 초과 | `references/` 또는 세부 문서로 분리 |

## 체크리스트

- [ ] frontmatter의 `name`, `description`이 있는가?
- [ ] description만 보고 사용 시점을 알 수 있는가?
- [ ] 한 파일에 하나의 주제만 담았는가?
- [ ] 관련 문서와 코드 경로가 명시되어 있는가?
- [ ] 장황한 배경보다 실행 가능한 절차가 중심인가?
