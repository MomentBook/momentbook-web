# ADR 0004: Footer Navigation Structure

## Status
Accepted

## Date
2025-01-04

## Context
The footer navigation appears on every page and serves as:
- A consistent location for important links
- Access to legal/compliance documents
- Secondary navigation for utility pages
- Trust signals for users

The footer must balance:
- Legal compliance requirements (Privacy, Terms, Community Guidelines)
- User utility (Support/Contact)
- Clean, uncluttered design
- Mobile responsiveness

## Decision

### 1. Footer Link Structure
Primary navigation links in order:
1. **Privacy** - Privacy Policy (`/{lang}/privacy`)
2. **Terms** - Terms of Service (`/{lang}/terms`)
3. **Community Guidelines** - Content Policy (`/{lang}/community-guidelines`)
4. **Support** - Help and Contact (`/{lang}/support`)

### 2. Implementation Pattern

```typescript
// Footer links in layout
<nav className={styles.footerLinks}>
  <Link href={`/${lang}/privacy`}>
    {dict.footer.links.privacy}
  </Link>
  <Link href={`/${lang}/terms`}>
    {dict.footer.links.terms}
  </Link>
  <Link href={`/${lang}/community-guidelines`}>
    {dict.footer.links.communityGuidelines}
  </Link>
  <Link href={`/${lang}/support`}>
    {dict.footer.links.support}
  </Link>
</nav>
```

### 3. Visual Design
- **Horizontal Layout**: Links displayed inline on desktop
- **Responsive**: May stack on mobile if needed
- **Spacing**: Adequate spacing between links for tap targets
- **Styling**: Subtle, non-distracting appearance
- **Footer Text**: "MomentBook is an app that quietly remembers your day."

### 4. Dictionary Organization

```typescript
// In each language dictionary
footer: {
  links: {
    privacy: string;           // "Privacy" / "개인정보 보호"
    terms: string;             // "Terms" / "이용약관"
    communityGuidelines: string; // "Community Guidelines" / "커뮤니티 가이드라인"
    support: string;           // "Support" / "고객 지원"
  },
  copyright: string;
}
```

## Consequences

### Positive
- ✅ **Legal Compliance**: All required legal documents easily accessible
- ✅ **User Trust**: Transparent about policies and guidelines
- ✅ **Consistency**: Same footer on every page, all languages
- ✅ **Accessibility**: Clear, predictable navigation
- ✅ **Mobile Friendly**: Simple structure adapts to small screens
- ✅ **Localized**: All link text properly translated

### Negative
- ⚠️ **Limited Space**: Only 4 links (could add more later)
- ⚠️ **No Social Links**: Keeping it minimal per project philosophy
- ⚠️ **No Newsletter**: Not included (intentional simplicity)

### Neutral
- 📝 **Order Matters**: Privacy first (most commonly accessed)
- 📝 **Copyright Static**: Not localized (universal format)
- 📝 **No Logo**: Footer is text-only

## Link Priority Rationale

### 1. Privacy (First)
- Most frequently accessed legal document
- Required by GDPR, CCPA, and other privacy laws
- Users often look for it before signing up

### 2. Terms (Second)
- Second most accessed legal document
- Required by app stores (iOS, Android)
- Often reviewed together with Privacy Policy

### 3. Community Guidelines (Third)
- Important for user-generated content platforms
- Sets expectations for behavior
- Required for moderation transparency
- New addition (v1.0.0, effective 2025-08-25)

### 4. Support (Last)
- Utility link, not legal requirement
- Still important for user assistance
- Natural ending point for footer navigation

## Translation Considerations

### Link Text by Language

| Language | Privacy | Terms | Community Guidelines | Support |
|----------|---------|-------|---------------------|---------|
| English  | Privacy | Terms | Community Guidelines | Support |
| Korean   | 개인정보 보호 | 이용약관 | 커뮤니티 가이드라인 | 고객 지원 |
| Japanese | プライバシー | 利用規約 | コミュニティガイドライン | サポート |
| Chinese  | 隐私政策 | 服务条款 | 社区准则 | 支持 |

### Length Considerations
- English: Shortest overall
- Japanese: "コミュニティガイドライン" is quite long (14 chars)
- Korean: Good balance of readability
- Chinese: Most concise

## Styling Guidelines

### 1. Visual Hierarchy
```scss
.footerLinks {
  display: flex;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
}

.footerLink {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text-primary);
  }
}
```

### 2. Accessibility
- Sufficient color contrast (WCAG AA minimum)
- Clear hover states
- Keyboard navigable
- Screen reader friendly (semantic HTML)

### 3. Mobile Optimization
- Touch targets at least 44×44px
- Adequate spacing for thumb navigation
- May stack vertically on very small screens

## Alternatives Considered

### 1. Grouped Footer Navigation
**Rejected**: Too complex for our simple needs
```
Legal           Support
- Privacy       - Contact
- Terms         - FAQ
- Guidelines    - Help
```

### 2. Footer Sitemap
**Rejected**: Would duplicate main navigation, add clutter
- All main pages listed
- All legal pages listed
- Would be redundant with header nav

### 3. Minimal Footer (Privacy + Terms Only)
**Rejected**: Community Guidelines is important for UGC platforms
- Missing modern compliance requirement
- Lack of transparency about content moderation

### 4. Footer with Social Links
**Rejected**: Against project philosophy of being quiet/non-promotional
- No Twitter, Instagram, etc.
- Keeps focus on the app itself

### 5. Dynamic Footer (Different per Page)
**Rejected**: Consistency is more valuable
- Users expect same footer everywhere
- Simpler maintenance

## Future Considerations

### Potential Additions
1. **App Store Badges**: If we want download links in footer
2. **Language Switcher**: Could be added to footer instead of/in addition to header
3. **Accessibility Statement**: If we create one
4. **Cookie Policy**: If we add cookies/analytics

### When to Reconsider
- If legal requirements change (new compliance documents)
- If user feedback indicates missing important links
- If we add community features requiring more moderation info
- If we expand to social media presence

## Implementation Files
- `/app/[lang]/layout.tsx` - Footer structure
- `/app/[lang]/layout.module.scss` - Footer styles
- `/lib/i18n/dictionaries/*.ts` - Footer translations

## Related Decisions
- [ADR 0001: Multilingual Routing Architecture](#0001)
- [ADR 0002: Legal Document Internationalization](#0002)

## Compliance Notes
This footer structure satisfies:
- ✅ GDPR requirements (Privacy Policy link)
- ✅ CCPA requirements (Privacy Policy link)
- ✅ App Store requirements (Terms of Service link)
- ✅ Play Store requirements (Privacy Policy link)
- ✅ General transparency best practices (Community Guidelines)
