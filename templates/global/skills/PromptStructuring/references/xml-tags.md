# XML 태그 구조화

## 표준 태그

| 태그 | 용도 |
|------|------|
| `<role>` | 역할과 책임 |
| `<instructions>` | 단계별 절차 |
| `<rules>` | 반드시 지킬 규칙 |
| `<constraints>` | 제약 조건 |
| `<checklist>` | 검증 항목 |
| `<examples>` | 예시 |
| `<reference>` | 참고 문서와 경로 |
| `<output_format>` | 출력 형식 |

## 작성 규칙

- 마크다운 제목은 시각적 구분, XML 태그는 의미 구분에 사용한다.
- 태그 중첩은 2단계 이내로 유지한다.
- `name` 속성이 필요한 경우 `<phase name="계획">`처럼 쓴다.
- 태그 안에서도 Markdown 표, 목록, 코드 블록을 그대로 사용한다.

## 예시

```markdown
<instructions>

1. 관련 파일을 찾는다.
2. 기존 패턴을 확인한다.
3. 최소 범위로 수정한다.

</instructions>

<rules>

- 사용자 변경을 되돌리지 않는다.
- 검증 가능한 경우 테스트를 실행한다.

</rules>
```
