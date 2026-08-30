---
name: PromptStructuring
description: Codex용 SKILL.md, agent 지침, 프롬프트 문서를 작성하거나 개선할 때 구조화, 긍정 표현, 출력 최적화, frontmatter 규칙을 적용한다.
---

# PromptStructuring

Codex가 읽는 지침 문서를 작게, 명확하게, 검색 가능하게 작성한다.

## 핵심 원칙

| 원칙 | 요약 | 상세 |
|------|------|------|
| 의미 블록 | `<role>`, `<instructions>`, `<rules>` 등으로 역할 구분 | [references/xml-tags.md](references/xml-tags.md) |
| 긍정 표현 | 금지 나열보다 수행할 행동을 직접 지시 | [references/positive-phrasing.md](references/positive-phrasing.md) |
| 흐름 표기 | 단계/전환은 `수집 -> 판단 -> 실행 -> 검증`처럼 표시 | - |
| 출력 최적화 | 반복 제거, 표 우선, 핵심만 유지 | [references/output-optimization.md](references/output-optimization.md) |
| Skill frontmatter | Codex가 읽는 `name`, `description`을 정확히 작성 | [references/skills-frontmatter.md](references/skills-frontmatter.md) |
| 고급 모드 | 복잡한 기획/조율 프롬프트는 별도 패턴 사용 | [references/advanced-modes.md](references/advanced-modes.md) |

## 적용 시점

| 상황 | 읽을 문서 |
|------|----------|
| 새 `SKILL.md` 작성 | `skills-frontmatter.md`, `xml-tags.md` |
| 기존 skill 개선 | `positive-phrasing.md`, `output-optimization.md` |
| 긴 지침 분리 | `skills-frontmatter.md`의 progressive disclosure 규칙 |
| 자동화/후크 출력 설계 | `output-optimization.md` |
| 복잡한 계획 프롬프트 설계 | `advanced-modes.md` |

## 기본 체크리스트

- [ ] `SKILL.md` frontmatter에 `name`, `description`이 있는가?
- [ ] `description`만 보고 사용 시점을 판단할 수 있는가?
- [ ] 본문은 핵심 절차 중심이고, 세부 자료는 `references/`로 분리했는가?
- [ ] 부정 지시보다 실행 지시가 우선인가?
- [ ] 같은 규칙을 반복하지 않았는가?
