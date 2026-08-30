---
name: web-styling
description: HTML과 CSS로 웹 UI, 레이아웃, 컴포넌트 스타일을 작성하거나 리뷰할 때 반응형 디자인, 유연한 width/height, clamp() 기반 유동 크기, 터치 영역과 접근성, viewport 검증 규칙을 적용한다. Vanilla CSS, Tailwind CSS, CSS Modules, CSS-in-JS 스타일 작업에 사용한다.
---

# Web Styling

웹 UI는 다양한 viewport와 콘텐츠 크기에 자연스럽게 대응하도록 작성한다.

## 반응형 디자인

- 모든 웹 UI에서 반응형 디자인을 기본으로 적용한다.
- 화면 너비와 콘텐츠 길이가 달라져도 레이아웃이 유지되도록 구성한다.
- 고정된 화면 크기를 전제로 컴포넌트 크기를 결정하지 않는다.

### 관리자 화면 예외

- backoffice, admin처럼 desktop 전용으로 정의된 화면은 프로젝트 요구사항과 지원 viewport를 먼저 확인한다.
- mobile과 tablet을 지원하지 않는 화면은 `1024px` 이하에서만 발생하는 레이아웃 깨짐을 결함으로 보고하지 않는다.
- desktop 지원 범위에서는 반응형 레이아웃, 접근성, 콘텐츠 길이 변화에 대한 검증을 계속 적용한다.
- 지원 범위가 명확하지 않으면 일반 반응형 기준을 적용하고 확인이 필요한 사항으로 남긴다.

## Width와 Height

- 레이아웃과 컴포넌트는 콘텐츠와 부모 영역에 맞춰 유연하게 늘어나거나 줄어들도록 한다.
- 고정 `width`와 `height` 대신 `min-width`, `max-width`, `min-height`, `max-height`를 우선 사용한다.
- 필요한 경우 `width: 100%`, `height: auto`, flex, grid 등 유연한 레이아웃 속성을 사용한다.
- 고정 `width`와 `height`는 명시적인 크기가 필요한 icon 요소에만 사용한다.

## Clamp

- viewport에 따라 자연스럽게 변해야 하는 글자 크기, 여백, gap에는 `clamp(최솟값, 선호값, 최댓값)` 사용을 우선 고려한다.
- 최솟값은 작은 화면에서도 가독성과 사용성을 유지하고, 최댓값은 큰 화면에서 과도하게 커지지 않도록 정한다.
- 선호값에는 `rem`, `vw`, container query 단위처럼 유동적인 값을 조합한다.
- 일정한 크기를 유지해야 하는 icon에는 불필요하게 `clamp()`를 적용하지 않는다.

```css
.title {
  font-size: clamp(1.25rem, 1rem + 1vw, 2rem);
}

.section {
  padding: clamp(1rem, 0.75rem + 1vw, 2rem);
}
```

## Icon Wrapper

- icon 자체에는 필요한 `width`와 `height`를 지정할 수 있다.
- icon을 감싸는 `div`, button, wrapper는 고정 `width`와 `height` 대신 `padding`으로 크기를 맞춘다.
- wrapper 내부 icon은 flex 또는 grid 정렬로 가운데에 배치한다.

## 터치 영역과 접근성

- 별도 프로젝트 기준이 없으면 interactive 요소의 조작 영역은 최소 `44 × 44` CSS px를 목표로 한다.
- 조작 영역은 고정 `width`와 `height`보다 `min-width`, `min-height`, `padding`으로 확보한다.
- icon wrapper는 `padding`으로 조작 여백을 만들고 `min-width`, `min-height`로 최소 조작 영역을 보장한다.
- icon-only control은 `div` 대신 `button` 같은 semantic HTML을 사용한다.
- icon-only button에는 보이는 label 또는 `aria-label`로 accessible name을 제공한다.
- 모든 interactive 요소는 keyboard로 조작할 수 있어야 하며 `:focus-visible` 상태를 명확하게 표시한다.
- 인접한 터치 영역이 겹치거나 오조작을 유발하지 않도록 충분한 간격을 둔다.

## Viewport별 검증 체크리스트

- 프로젝트가 지원 viewport를 정의했다면 해당 기준을 사용하고, 별도 기준이 없으면 `320px`, `768px`, `1024px`, `1440px` 너비를 기본 검증값으로 사용한다.
- desktop 전용 관리자 화면은 `1024px` 이하를 검증 대상에서 제외하고 지원되는 desktop viewport만 확인한다.
- [ ] 지원하는 가장 좁은 viewport에서 가로 scroll, 잘림, 겹침이 없는가?
- [ ] 대표 mobile, tablet, desktop, wide desktop 너비에서 레이아웃을 확인했는가?
- [ ] 각 breakpoint의 직전과 직후에서 요소가 갑자기 깨지거나 불필요하게 튀지 않는가?
- [ ] portrait와 landscape 전환이 필요한 UI에서 콘텐츠와 조작 영역이 유지되는가?
- [ ] 긴 제목, 긴 번역문, 빈 상태처럼 콘텐츠 길이가 달라져도 레이아웃이 유지되는가?
- [ ] browser zoom `200%`에서도 콘텐츠 접근과 keyboard focus 이동이 가능한가?
- [ ] 각 viewport에서 터치 영역, focus 표시, accessible name을 확인했는가?

## 체크리스트

- [ ] 다양한 화면 너비를 고려했는가?
- [ ] 레이아웃 요소에 불필요한 고정 `width` 또는 `height`가 없는가?
- [ ] 크기 제약은 `min-*` 또는 `max-*`로 표현했는가?
- [ ] 고정 `width`와 `height`는 icon 자체에만 사용했는가?
- [ ] icon wrapper의 크기는 `padding`으로 구성했는가?
- [ ] 유동적으로 변해야 하는 크기에 `clamp()`가 필요한지 검토하고, 적용했다면 최솟값과 최댓값을 지정했는가?
- [ ] interactive 요소의 터치 영역과 keyboard 접근성을 확보했는가?
- [ ] viewport별 검증 체크리스트를 완료했는가?
