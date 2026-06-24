# React Hook Form + Zod

폼은 Zod 스키마를 별도 파일에 두고 `zodResolver`로 검증한다.

## 파일 구조

```text
src/features/auth/
├── components/
│   └── LoginForm.tsx
├── schemas/
│   └── loginFormSchema.ts
└── hooks/
    └── useLoginMutation.ts
```

## 규칙

| 규칙 | 적용 |
|------|------|
| 스키마 분리 | `*FormSchema.ts` |
| 타입 추론 | `z.infer<typeof schema>` |
| 에러 표시 | `formState.errors` |
| 서버 에러 | `setError` |
| 로딩 상태 | mutation의 `isPending` |

## 스키마

```typescript
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요').min(8, '비밀번호는 8자 이상이어야 합니다'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
```

조건부 검증:

```typescript
export const registerFormSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});
```

## 폼 컴포넌트

```typescript
const {
  register,
  handleSubmit,
  setError,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginFormSchema),
  defaultValues: { email: '', password: '' },
});

const onSubmit = (data: LoginFormData) => {
  loginMutation.mutate(data);
};
```

## 체크리스트

- [ ] 스키마가 별도 파일에 있는가?
- [ ] `z.infer`로 타입을 추론하는가?
- [ ] `zodResolver`를 사용하는가?
- [ ] `defaultValues`가 있는가?
- [ ] 서버 에러를 필요한 경우 `setError`로 매핑하는가?
- [ ] 로딩 상태는 mutation 상태를 사용하는가?
