# Responsive Layout Implementation

## Overview

This document describes the responsive layout improvements made to the Header and Footer components to ensure optimal display across mobile, tablet, and desktop devices.

## Problems Addressed

### Original Issues
1. **Header overcrowding**: 6 items (4 nav links + language switcher + theme toggle) caused horizontal overflow on mobile
2. **Language switcher space**: Displayed all 4 languages inline, consuming excessive horizontal space
3. **No mobile menu**: Users on narrow screens had difficulty accessing navigation
4. **Footer density**: 5 legal document links became cramped on mobile devices

## Solution Architecture

### 1. Mobile-First Header Design

#### Components

**Desktop (≥768px)**:
```
[Logo] [About] [How It Works] [FAQ] [Download] [Language ▼] [Theme] [≡ Hidden]
```

**Mobile (<768px)**:
```
[Logo] [Language Icon ▼] [Theme Icon] [≡]
```

#### Implementation

##### Header Structure (`app/[lang]/layout.tsx`)
- **Logo**: Always visible, flex-shrink: 0
- **Desktop Navigation**: Hidden on mobile, visible on desktop
- **Controls**: Always visible, contains Language + Theme + Mobile Menu

##### Mobile Menu Component (`components/MobileMenu.tsx`)
- **Features**:
  - Hamburger button (3 lines → X animation)
  - Slide-in drawer from right
  - Backdrop overlay with blur
  - Auto-close on navigation
  - Prevents body scroll when open
  - Hidden on desktop (≥768px)

##### Language Dropdown (`components/LanguageDropdown.tsx`)
**Improvements**:
- **Icon-based trigger** on mobile (globe icon only)
- **Full label** on desktop (icon + language name + chevron)
- **Dropdown menu** instead of inline links
- **Better UX**: Shows native name + English name for clarity
- **Accessibility**: Keyboard navigation (Escape to close), proper ARIA attributes

**Mobile**:
```
[🌐 ▼] → Dropdown:
  ✓ English (English)
    한국어 (Korean)
    中文 (Chinese)
    日本語 (Japanese)
```

**Desktop**:
```
[🌐 English ▼] → Same dropdown
```

##### Theme Toggle (`components/ThemeToggle.tsx`)
**Improvements**:
- **Icon-based** on mobile (sun/moon only)
- **Icon + Label** on desktop (sun/moon + "Light"/"Dark")
- **SVG icons** instead of text for better visual communication
- **Hover animation**: Icon rotates 20deg

### 2. Responsive Footer

#### Mobile (<768px)
- **Vertical stacking**: Links wrap naturally with reduced gap
- **Smaller font**: 0.9375rem for link text
- **Footer text**: Stacked below links with top margin

#### Desktop (≥768px)
- **Horizontal layout**: Links and text side-by-side
- **Larger font**: 1rem for link text
- **Text alignment**: Right-aligned footer text

### 3. CSS Architecture

#### Breakpoints
```scss
// Mobile-first approach
.element {
  // Mobile styles (default)

  @media (min-width: 768px) {
    // Desktop styles
  }
}
```

#### Key Techniques
1. **Flexbox**: For responsive alignment and distribution
2. **flex-shrink: 0**: Prevents logo and controls from shrinking
3. **display: none/@media**: Show/hide elements at breakpoints
4. **white-space: nowrap**: Prevents link text wrapping
5. **gap**: Consistent spacing that adapts to screen size

## Component Files

### New Components
- `/components/MobileMenu.tsx` - Hamburger menu for mobile navigation
- `/components/MobileMenu.module.scss` - Styles with slide-in animation
- `/components/LanguageDropdown.tsx` - Dropdown-based language selector
- `/components/LanguageDropdown.module.scss` - Dropdown positioning and animations

### Modified Components
- `/components/ThemeToggle.tsx` - Added icon-based design
- `/components/ThemeToggle.module.scss` - Icon/label responsive display
- `/app/[lang]/layout.tsx` - New header structure with mobile menu
- `/app/[lang]/layout.module.scss` - Responsive layout styles

### Removed/Deprecated
- `/components/LanguageSwitcher.tsx` - Replaced by LanguageDropdown
- `/components/LanguageSwitcher.module.scss` - No longer used

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through all interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dropdowns and mobile menu

### ARIA Attributes
```tsx
// Mobile Menu
<button aria-label="Toggle menu" aria-expanded={isOpen}>

// Language Dropdown
<button aria-label="Select language" aria-expanded={isOpen} aria-haspopup="true">
<Link aria-current={isActive ? "page" : undefined}>

// Theme Toggle
<button aria-label="Switch to dark theme">
```

### Visual Feedback
- **Focus states**: Outline on focus-visible
- **Hover states**: Color and background changes
- **Active states**: Transform scale on click
- **Current page**: Visual indicator (checkmark) in dropdowns

## Performance Considerations

### Animations
- **CSS transitions**: Performant GPU-accelerated properties
- **transform**: Used instead of position changes
- **opacity**: Smooth fade effects
- **backdrop-filter**: Only on header for blur effect

### Bundle Size
- **No external libraries**: Pure React + CSS solution
- **SVG icons**: Inline SVGs instead of icon fonts
- **Tree-shaking**: Only used components are included

## Testing Recommendations

### Viewport Sizes to Test
1. **Mobile**: 375px, 414px (iPhone SE, iPhone Pro Max)
2. **Tablet**: 768px, 1024px (iPad, iPad Pro)
3. **Desktop**: 1280px, 1920px (Laptop, Desktop)

### Test Scenarios
1. **Header overflow**: Ensure no horizontal scrolling at any width
2. **Touch targets**: Minimum 44×44px for mobile
3. **Dropdown positioning**: Stays within viewport bounds
4. **Mobile menu**: Smooth animations, proper z-index stacking
5. **Footer wrapping**: Links wrap gracefully without breaking

### Browser Testing
- Chrome/Edge (Chromium)
- Safari (WebKit)
- Firefox (Gecko)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Future Enhancements

### Potential Improvements
1. **Prefetch**: Prefetch pages on hover for faster navigation
2. **Gestures**: Swipe gesture to open/close mobile menu
3. **Search**: Add search functionality in header
4. **Breadcrumbs**: Add breadcrumb navigation for deep pages
5. **Sticky footer**: Keep footer at bottom on short pages

### Known Limitations
1. **No mega menu**: Simple dropdown, no multi-column layouts
2. **Fixed breakpoint**: Single breakpoint at 768px (could add 1024px for tablet-specific styles)
3. **No RTL support**: Layout assumes LTR languages

## Migration Notes

### Breaking Changes
- `LanguageSwitcher` component replaced by `LanguageDropdown`
- Import path changed in `layout.tsx`

### Backward Compatibility
- All existing routes work unchanged
- No changes to data structure or API
- Footer links remain the same

### Deployment Checklist
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify all dropdowns close on navigation
- [ ] Check mobile menu scroll prevention
- [ ] Validate ARIA attributes with screen reader
- [ ] Confirm no console errors
- [ ] Lighthouse accessibility score >95

## Design Decisions

### Why These Choices?

**Mobile Menu Drawer (Right Side)**
- Most users are right-handed
- Common pattern (matches native iOS/Android apps)
- Doesn't cover logo on left

**Dropdown vs Tabs for Language**
- Saves horizontal space
- Scalable (can add more languages)
- Less visual clutter
- Standard pattern for language selection

**Icon-Only on Mobile**
- Maximizes content space
- Icons are universally recognized
- Labels available on hover/focus

**Single Breakpoint (768px)**
- Simplifies maintenance
- Covers 90% of use cases
- Clean separation: mobile vs desktop

## Resources

### Icons Used
- **Language**: Globe icon (Feather Icons)
- **Theme**: Sun/Moon icons (Feather Icons)
- **Chevron**: Down arrow (Feather Icons)
- **Checkmark**: Check icon (Feather Icons)

### Design References
- [Material Design - Responsive Layout](https://m3.material.io/foundations/layout/understanding-layout/overview)
- [Apple HIG - Navigation](https://developer.apple.com/design/human-interface-guidelines/navigation)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
