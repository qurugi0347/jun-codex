---
name: Coding
description: 코드 작성과 리팩터링 시 SRP, 낮은 결합도, 높은 응집도, 폴더 구조, Promise 처리, 삼항연산자, 주석 작성 규칙을 적용한다.
---

# Coding

모든 코드 변경은 책임을 작게 유지하고, 변경 영향이 명확하게 드러나도록 작성한다.

## 단일 책임 원칙

| 영역 | 책임 |
|------|------|
| Entity | 데이터 구조 정의 |
| Repository | 데이터 접근 |
| Service | 비즈니스 로직 |
| Controller | 요청/응답 처리 |
| DTO/Schema | 데이터 전송 구조 |
| Page | 레이아웃과 데이터 fetch |
| Container | 상태 관리와 API 호출 |
| Presentational | props 기반 UI 렌더링 |
| Hook | 재사용 로직 캡슐화 |

## 결합도 낮추기

| 규칙 | 설명 |
|------|------|
| 단방향 의존 | 순환 의존을 만들지 않는다 |
| shared 독립성 | shared는 도메인 모듈에 의존하지 않는다 |
| 추상화 의존 | 가능한 경우 구체 클래스보다 인터페이스/토큰에 의존한다 |
| 공개 API | 모듈 외부 접근은 `index.ts` export를 우선한다 |

```typescript
@Inject(PRODUCT_REPOSITORY)
private readonly repository: IProductRepository;
```

## 응집도 높이기

관련 있는 코드를 가까이 둔다.

```text
src/
├── product/
│   ├── product.controller.ts
│   ├── product.service.ts
│   ├── product.dto.ts
│   └── product.module.ts
└── shared/
```

```text
src/
├── components/
│   ├── product/
│   └── common/
├── hooks/
├── store/
└── shared/
```

## Promise 처리

프로젝트 규칙이 별도로 없고 Promise 체인이 더 읽기 쉬운 경우 `then().catch()`를 사용한다.

```typescript
function fetchUser(id: string) {
  return userService.findById(id).catch(() => {
    throw new NotFoundException('User not found');
  });
}
```

단, 여러 `await`와 분기/트랜잭션이 필요한 경우 기존 코드 스타일을 우선한다.

## 삼항연산자

삼항연산자는 단순 값 선택에 사용한다.

```typescript
const label = isKorean ? '홍길동' : 'John';
```

인자가 2개 이상인 함수 호출이나 복잡한 분기는 변수 또는 `if`로 분리한다.

```typescript
const processor = isAdmin ? processAdminData : processUserData;
const result = processor(data, options);
```

## 주석

주석은 `WHY` 중심으로 작성한다.

```typescript
// VIP 고객은 결제 실패 시에도 즉시 차단하지 않는다 (CS 정책)
if (user.tier === 'VIP' && payment.failed) {
  return scheduleRetry(payment);
}
```

규칙:

- naming만으로 의도가 드러나는 코드는 주석을 생략한다.
- 분기/블록 같은 로직 단위 위에 쓴다.
- 2줄 이내를 기본으로 하고, 필요한 경우만 3줄까지 쓴다.
- `TODO/FIXME/NOTE`에는 다음 행동을 명시한다.

## 체크리스트

- [ ] 파일 또는 컴포넌트 책임이 하나인가?
- [ ] 불필요한 모듈 의존을 만들지 않았는가?
- [ ] 관련 파일이 가까운 폴더에 있는가?
- [ ] 단방향 의존이 유지되는가?
- [ ] 공개 API를 통해 접근하는가?
- [ ] 복잡한 삼항연산자를 분리했는가?
- [ ] 주석이 WHY 중심인가?
