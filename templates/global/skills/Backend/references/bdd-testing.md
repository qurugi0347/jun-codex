# BDD 테스트 작성 규칙

NestJS + Jest 테스트는 읽는 사람이 조건과 결과를 바로 파악할 수 있게 작성한다.

## describe 구조

`Service 클래스명 -> 메서드명 -> 조건 그룹` 순서로 중첩한다.

```typescript
describe('UserService', () => {
  describe('create', () => {
    it('should create user when valid dto given', async () => {});
    it('should throw ConflictException when email duplicated', async () => {});
  });
});
```

3레벨 조건 그룹은 분기가 많을 때만 사용한다.

## it 문구

```text
should [결과] when [조건]
```

예시:

- `should create user when valid dto given`
- `should throw NotFoundException when id not found`

## Given/When/Then

```typescript
it('should create user when valid dto given', async () => {
  // Given
  const dto: CreateUserDto = { name: 'John', email: 'john@test.com' };
  jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
  jest.spyOn(userRepository, 'save').mockResolvedValue({ id: 1, ...dto } as User);

  // When
  const result = await service.create(dto);

  // Then
  expect(result.name).toBe('John');
  expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({ name: 'John' }));
});
```

## Testing Module

```typescript
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: getRepositoryToken(User),
        useValue: {
          find: jest.fn(),
          findOneBy: jest.fn(),
          save: jest.fn(),
          delete: jest.fn(),
        },
      },
    ],
  }).compile();

  service = module.get<UserService>(UserService);
  userRepository = module.get<Repository<User>>(getRepositoryToken(User));
});
```

## Mock 규칙

| 패턴 | 용도 |
|------|------|
| `useValue` + `jest.fn()` | Repository mock 주입 |
| `jest.spyOn` | 테스트별 반환값 지정 |
| `jest.mocked` | 이미 mock된 함수 타입 캐스팅 |

모듈 레벨 `jest.mock()`은 외부 라이브러리에만 사용한다.

## Assertion

- 구체적인 값을 검증한다.
- 예외는 `await expect(...).rejects.toThrow(Exception)`로 검증한다.
- `toBeDefined`, `toBeTruthy`만 있는 의미 없는 assertion은 피한다.

## 체크리스트

- [ ] `describe`가 Service -> Method -> Scenario 구조인가?
- [ ] `it` 문구가 `should ... when ...` 형식인가?
- [ ] 각 테스트에 `// Given`, `// When`, `// Then`이 있는가?
- [ ] Repository mock을 `useValue` + `jest.fn()`으로 주입했는가?
- [ ] assertion이 구체적인 값을 검증하는가?
- [ ] 예외 테스트에 `rejects.toThrow`를 사용하는가?
