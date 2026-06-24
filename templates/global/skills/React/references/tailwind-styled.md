# tailwind-styled-components

DOM depth를 최소화하고 스타일 전용 wrapper를 줄인다.

## 핵심 원칙

- 하나의 Styled Component는 하나의 DOM 요소를 만든다.
- 불필요한 wrapper div를 제거한다.
- 스타일 목적의 중첩보다 의미 있는 구조를 우선한다.

## 변환 예시

```typescript
const CardContainer = tw.div`
  p-4
  bg-white
  rounded-lg
  shadow
  flex
  flex-col
  gap-4
`;

const Card = () => <CardContainer>{content}</CardContainer>;
```

## 네이밍

| 용도 | 패턴 |
|------|------|
| 컨테이너 | `*Container`, `*Wrapper` |
| 섹션 | `*Section`, `*Area` |
| 아이템 | `*Item`, `*Row` |
| 텍스트 | `Title`, `Label`, `Text` |
| 입력 | `*Input`, `*Field` |
| 버튼 | `*Button` |

## 동적 스타일

```typescript
interface ButtonProps {
  $primary?: boolean;
  $size?: 'sm' | 'md' | 'lg';
}

const Button = tw.button<ButtonProps>`
  rounded-lg
  font-medium
  ${({ $primary }) =>
    $primary
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
`;
```

Transient props는 `$` 접두사를 사용한다.

## 체크리스트

- [ ] 스타일 전용 wrapper div를 제거했는가?
- [ ] 중첩 div를 하나로 합칠 수 없는가?
- [ ] depth가 3 이상이면 리팩터링을 검토했는가?
- [ ] Styled Component 이름이 의미를 드러내는가?
- [ ] 동적 스타일 props에 `$` 접두사를 사용했는가?
