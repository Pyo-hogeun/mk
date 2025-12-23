# Industry Insight Cards Component

## Overview
This component displays industry insight cards in a horizontally scrollable container for mobile devices.

## Files Created/Modified

### 1. HTML Component
- **File**: `pages/COMPONENTS/industry_insight_cards.html`
- **Description**: Standalone component showcasing the industry insight cards

### 2. Mobile SCSS
- **File**: `assets/style/scss/partial/_trend.mobile.scss`
- **Description**: Mobile-specific styles with horizontal scroll functionality

### 3. Integration Example
- **File**: `pages/NEWS/news_trend.html`
- **Description**: Full page example showing the component in context

## Component Structure

### Container
```html
<div class="industry-insights-scroll">
  <!-- Cards go here -->
</div>
```

The container uses:
- `overflow-x: auto` for horizontal scrolling
- Full viewport width with negative margins to break out of padding
- Hides scrollbars for a cleaner look

### Card Types

#### 1. Standard Insight Card
```html
<article class="insight-card">
  <div class="insight-card__content">
    <div class="insight-card__badges">
      <span class="status-badge status-badge--normal">NORMAL</span>
    </div>
    <div class="category-badge category-badge--economy">경제</div>
    <h3 class="insight-card__title">#외환수급 안정</h3>
    <div class="insight-card__tags">
      <span class="hashtag">#쿠팡 개인정보 노출</span>
      <span class="hashtag">#쿠팡 개인정보 유출</span>
    </div>
  </div>
  <div class="insight-card__icon">
    <!-- SVG icon -->
  </div>
</article>
```

#### 2. Add Card
```html
<article class="insight-card insight-card--add">
  <div class="insight-card__add-content">
    <div class="add-icon-wrapper">
      <!-- Plus icon SVGs -->
    </div>
    <p class="add-label">관심 섹션 추가</p>
  </div>
</article>
```

## Styling Features

### Horizontal Scroll
- **Width calculation**: `width: calc(100% + $mobilePadSide * 2)`
- **Negative margin**: Breaks out of container padding
- **Scrollbar hiding**: Works in all major browsers

### Card Dimensions
- **Width**: `212px` (fixed)
- **Min-height**: `163px`
- **Gap**: `12px` between cards

### Status Badges
- **NORMAL**: Dark background (#1D1D1D) with light text
- **HOT**: Orange background (#FF7A00) with white text

### Category Badges
- Pill-shaped (border-radius: 100px)
- Orange background (#E55204)
- White text

### Design System Variables Used
- `--radius-md`: 8px (border radius)
- `--border-default`: #464646 (card borders)
- `--bg-subtle`: #2F2F2F (card background)
- `--bg-default`: #1D1D1D (normal badge background)
- `--text-primary`: #F0F0F0 (primary text color)
- `--text-disabled`: #A8A8A8 (hashtag color)
- `--orange-100`: #FF7A00 (hot badge)
- `--orange-200`: #E55204 (category badge)
- `--white`: #FFFFFF

## Responsive Behavior

### Mobile Only (max-width: 480px)
All styles are wrapped in:
```scss
@media screen and (max-width: $mobile) {
  // Component styles
}
```

### Scroll Behavior
- Touch-friendly horizontal scrolling
- Momentum scrolling on iOS
- Hidden scrollbars for cleaner appearance
- Cards snap naturally to viewport edges

## Usage

### Basic Implementation
1. Add the HTML structure to your page
2. Ensure the containing element has the class `trend__wrapper`
3. The component will automatically be horizontally scrollable on mobile devices

### Customization
- Modify card width by changing `.insight-card { width: 212px; }`
- Adjust gap between cards with `.industry-insights-scroll { gap: 12px; }`
- Change card colors using CSS variables

## Browser Support
- Chrome/Edge (WebKit scrollbar hiding)
- Firefox (scrollbar-width property)
- Safari (WebKit scrollbar hiding)
- Mobile browsers (touch scrolling)

## Notes
- The component is only active on mobile viewports (≤480px)
- Card icons are absolutely positioned to overflow the card boundaries
- All text uses the Pretendard font family with fallbacks
- Box shadow creates an inset effect for visual depth
