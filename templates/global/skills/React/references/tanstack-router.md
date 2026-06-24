# TanStack Router

파일 기반 라우팅과 타입 안전한 navigation을 사용한다.

## 파일 구조

```text
src/routes/
├── __root.tsx
├── index.tsx
├── _layout.tsx
├── _layout/
│   ├── dashboard.tsx
│   └── settings.tsx
├── products/
│   ├── index.tsx
│   └── $productId.tsx
└── auth/
    ├── login.tsx
    └── register.tsx
```

## 규칙

| 대상 | 규칙 |
|------|------|
| 동적 라우트 | `$slug.tsx`, `$productId.tsx` |
| 레이아웃 라우트 | `_layout.tsx` |
| 루트 라우트 | `__root.tsx` |
| 네비게이션 | route 객체의 `Route.useNavigate()` 우선 |

## 기본 라우트

```typescript
export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});
```

## 동적 라우트

```typescript
export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  return <div>Product: {productId}</div>;
}
```

## 인증 Guard

```typescript
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: location.href },
      });
    }
  },
  component: AuthenticatedLayout,
});
```

## 체크리스트

- [ ] 동적 파라미터에 `$`를 사용했는가?
- [ ] 레이아웃 라우트에 `_`를 사용했는가?
- [ ] 루트 파일이 `__root.tsx`인가?
- [ ] params를 타입 안전하게 전달하는가?
- [ ] 인증은 `beforeLoad`와 `redirect`로 처리하는가?
