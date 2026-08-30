---
name: React
description: React 컴포넌트, hooks, 상태, props, 렌더링 최적화, TanStack Router, React Hook Form, tailwind-styled-components 구현 시 적용한다.
---

# React

React 코드는 컴포넌트 책임, 상태 위치, hook 의존성, 렌더링 비용을 명확히 관리한다.

## 컴포넌트 구조

```text
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── index.ts
├── features/
│   └── auth/
│       ├── components/
│       ├── hooks/
│       └── utils/
├── hooks/
├── utils/
└── types/
```

## 컴포넌트 유형

| 유형 | 책임 |
|------|------|
| Presentational | UI 렌더링, props로 데이터 수신 |
| Container | 상태 관리, API 호출 |
| Layout | 페이지 레이아웃 |
| Page | 라우트에 매핑되는 화면 |

## 필수 규칙

| 영역 | 규칙 |
|------|------|
| 컴포넌트 | 함수형 컴포넌트와 명시적 Props 타입 사용 |
| 상태 | 파생 가능한 값은 state로 두지 않는다 |
| 상태 위치 | 필요한 가장 가까운 공통 조상에 둔다 |
| 불변성 | 객체/배열 업데이트 시 새 값을 만든다 |
| Hooks | 최상위에서만 호출하고 deps를 정확히 적는다 |
| 커스텀 Hook | 재사용 로직은 `use` 접두사의 hook으로 분리한다 |

## 최적화 기준

| 상황 | 적용 |
|------|------|
| 리스트 렌더링 | 안정적인 `key` 사용 |
| 잦은 리렌더링 | 측정 후 `React.memo` 검토 |
| 비용 큰 계산 | `useMemo` |
| 자식에게 전달하는 콜백 | `useCallback` |

memo 계열은 측정하거나 병목이 명확할 때만 적용한다.

## useEffect

```typescript
useEffect(() => {
  const controller = new AbortController();
  fetchData(controller.signal);
  return () => controller.abort();
}, [dependency]);
```

피할 패턴:

| 안티패턴 | 대안 |
|----------|------|
| props를 state로 복사 | props 직접 사용 또는 memo 계산 |
| 렌더링 중 state 업데이트 | 이벤트 핸들러 또는 effect로 이동 |
| 불필요한 effect | 이벤트 핸들러나 계산 값으로 처리 |

## 참고 문서

| 주제 | 문서 |
|------|------|
| TanStack Router | [references/tanstack-router.md](references/tanstack-router.md) |
| React Hook Form + Zod | [references/react-hook-form.md](references/react-hook-form.md) |
| tailwind-styled-components | [references/tailwind-styled.md](references/tailwind-styled.md) |

## 체크리스트

- [ ] Props 타입이 명시되어 있는가?
- [ ] 컴포넌트 책임이 하나인가?
- [ ] 상태가 최소화되어 있는가?
- [ ] hook 의존성 배열이 정확한가?
- [ ] 필요한 cleanup이 있는가?
- [ ] 리스트 key가 안정적인가?
- [ ] 불필요한 memo를 추가하지 않았는가?
