---
name: TypeORM
description: TypeORM 쿼리와 migration 작성 시 find, QueryBuilder, raw query 선택 기준과 migration 생성 절차를 적용한다.
---

# TypeORM

쿼리는 가독성을 최우선으로 선택한다.

## 선택 우선순위

| 우선순위 | 방식 | 사용 조건 |
|----------|------|----------|
| 1 | `find` 메서드 | 기본 CRUD, 단순 조건, relations |
| 2 | `QueryBuilder` | groupBy, 집계, 커스텀 JOIN 등 find로 표현이 어려운 경우 |
| 3 | Raw Query | QueryBuilder가 서브쿼리/CTE로 과도하게 복잡해지는 경우 |

## find 메서드

```typescript
const user = await this.userRepository.findOneBy({ id });

const users = await this.userRepository.find({
  where: { status: 'active' },
  relations: ['orders'],
  order: { createdAt: 'DESC' },
  take: 10,
});
```

단순 조회에 불필요한 QueryBuilder를 쓰지 않는다.

## QueryBuilder

가독성이 유지되는 집계, groupBy, 커스텀 JOIN에 사용한다.

```typescript
const stats = await this.orderRepository
  .createQueryBuilder('order')
  .select('order.status', 'status')
  .addSelect('COUNT(*)', 'count')
  .groupBy('order.status')
  .getRawMany();
```

## Raw Query

복잡한 서브쿼리 중첩, CTE, DB 특화 문법이 필요하면 raw query가 더 낫다.

```typescript
const result = await this.orderRepository.query(
  `SELECT o.*
   FROM orders o
   WHERE o.id IN (
     SELECT oi.order_id
     FROM order_items oi
     WHERE oi.product_id IN (
       SELECT p.id FROM products p WHERE p.category = $1
     )
   )`,
  ['electronics'],
);
```

## Migration

Migration 파일은 직접 만들지 않고 CLI로 생성한 뒤 내용을 수정한다.

```bash
yarn migration:create src/migrations/MigrationName
```

또는 프로젝트 스크립트가 없으면:

```bash
yarn run typeorm migration:create src/migrations/MigrationName
```

절차:

1. CLI로 빈 migration을 생성한다.
2. `up()`과 `down()`을 작성한다.
3. `yarn migration:run` 등 프로젝트 명령으로 적용을 확인한다.

## 체크리스트

- [ ] 단순 조회에 `find`를 우선 사용했는가?
- [ ] QueryBuilder는 `find`로 불가능하거나 부자연스러운 경우에만 썼는가?
- [ ] QueryBuilder가 읽기 어렵다면 raw query로 전환했는가?
- [ ] migration 파일은 CLI로 생성했는가?
