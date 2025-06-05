# 🛠️ 성능 개선 사후 보고서 (PWA 제외)

## ✅ 개선 이유

기존 프로젝트는 HTML, CSS, JS가 분리되어 있음에도 다음과 같은 문제점으로 인해 성능 지표가 낮게 나타났습니다:

- 불필요한 리소스 로딩 (이미지, 스크립트)
- 비최적화된 애니메이션과 이벤트 처리
- 명시되지 않은 이미지 크기로 인한 CLS 상승
- 렌더링 차단 리소스로 인한 초기 지연

---

## 🔧 주요 개선 항목

### 1. 📷 이미지 리소스 최적화

- 모든 `<img>` 태그에 `width`, `height` 명시 → CLS 감소
- WebP 포맷 사용 (예: `Hero_Desktop.webp`, `vr1.webp` 등)
- `<source srcset>` 및 `media` 속성 추가 → 반응형 이미지 지원
- `preload`, `fetchpriority="high"` 사용하여 주요 이미지 우선 로딩

### 2. ⚙️ JS, CSS 로딩 최적화

- `<script defer>` 적용으로 렌더링 차단 방지
- 사용하지 않는 Slick 슬라이더 관련 CSS/JS 제거 (주석 처리)
- Vercel 배포 시 불필요한 JS 코드 번들 제거 및 축소 고려

### 3. 🔁 이벤트 관리 개선

- `DOMContentLoaded`가 아닌 `load` 이벤트 이후에 service worker 등록 → 안정성 확보
- 쿠키 설정 스크립트는 defer로 분리하여 렌더링 차단 방지

### 4. 🌀 애니메이션 최적화

- 배너 이미지 전환 및 슬라이더 부분에서 `loading="lazy"` 속성 적용 → 스크롤 도중 이미지 로드
- 가시 영역 우선 콘텐츠 로딩으로 Speed Index 개선

### 5. 💡 기타 작업

- `meta description`, `viewport`, `theme-color` 추가로 SEO와 웹표준 개선
- `<link rel="preconnect">` 적용: Google Fonts 로딩 최적화
- 레이아웃 구조 정비 (container, flex 구조 명확화)

---

## 📈 Lighthouse 점수 개선 전후 비교

| 항목                    | 개선 전 | 개선 후 |
| ----------------------- | ------- | ------- |
| Performance             | 68%     | 86%     |
| Accessibility           | 89%     | 95%     |
| Best Practices          | 60%     | 71%     |
| SEO                     | 70%     | 91%     |
| CLS (Cumulative Layout) | 0.12    | 0.011   |
| LCP (Largest Paint)     | 5.2s    | 3.68s   |

> ⚠️ 측정 기준: Lighthouse CI, `localhost:8080` 기준 테스트

---

## 📝 참고

- 테스트 중 발견된 주요 경고:
  - 이미지 크기 누락 (`unsized-images`)
  - 응답형 이미지 미사용 (`uses-responsive-images`)
  - 콘솔 에러 및 heading 순서 문제
  - 미압축 CSS, JS

---

> 작성자: 예솔 김  
> 작성일: 2025년 6월 5일
