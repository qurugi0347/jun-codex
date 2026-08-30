---
name: Backend
description: NestJS 백엔드 개발 시 Controller, Service, Repository 책임 분리와 DTO/Entity/Response 변환 규칙, BDD 테스트 작성 규칙을 적용한다.
---

# Backend

NestJS 백엔드 코드는 레이어 책임을 분리하고 객체 변환 위치를 명확히 한다.

## 레이어별 책임

| 레이어 | 입력 | 출력 | 변환 책임 |
|--------|------|------|----------|
| Controller | Request DTO | Response DTO/Schema | Entity/Object -> Response |
| Service | DTO 또는 primitive | Entity 또는 일반 객체 | 필요 시 DTO -> Entity |
| Repository | Entity/조건 | Entity | 변환 없음 |

## Controller -> Service

Controller는 Request DTO를 그대로 Service에 전달한다.

```typescript
@Post()
async create(@Body() dto: CreateUserDto) {
  return this.userService.create(dto);
}
```

Controller에서 Entity를 미리 만들지 않는다. Entity 생성은 영속화가 필요한 Service 시점에서 수행한다.

## Service 내부

```typescript
async create(dto: CreateUserDto) {
  const user = new User();
  user.name = dto.name;
  user.email = dto.email;

  return this.userRepository.save(user);
}
```

## Service -> Controller

Service는 Entity 또는 일반 객체를 반환하고, Controller가 응답 스키마로 변환한다.

```typescript
@Get(':id')
async findOne(@Param('id') id: number) {
  const user = await this.userService.findById(id);
  return UserResponseDto.from(user);
}
```

## 테스트

NestJS + Jest BDD 스타일 테스트는 [references/bdd-testing.md](references/bdd-testing.md)를 따른다.

## 체크리스트

- [ ] Controller가 DTO를 그대로 Service에 전달하는가?
- [ ] Entity 변환은 Service에서 필요한 시점에 하는가?
- [ ] Service 반환값은 Entity 또는 일반 객체인가?
- [ ] Controller가 Response DTO/Schema로 변환하는가?
- [ ] 테스트가 Given/When/Then 구조를 따르는가?
