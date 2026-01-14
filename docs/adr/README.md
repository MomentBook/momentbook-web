# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records for the MomentBook web project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## Format

Each ADR follows this structure:
- **Title**: Short descriptive title
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Date**: When the decision was made
- **Context**: The issue motivating this decision
- **Decision**: The change being proposed or has been approved
- **Consequences**: The resulting context, positive/negative/neutral outcomes
- **Alternatives Considered**: Other options that were evaluated

## Index

### Current ADRs

1. [ADR 0001: Multilingual Routing Architecture](./0001-multilingual-routing-architecture.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Custom multilingual routing using Next.js dynamic segments with language-prefixed URLs

2. [ADR 0002: Legal Document Internationalization](./0002-legal-document-internationalization.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Component-based architecture for multilingual legal documents (Terms, Privacy, Community Guidelines)

3. [ADR 0003: Static Site Generation Strategy](./0003-static-site-generation-strategy.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Full static site generation with Next.js for optimal performance and SEO

4. [ADR 0004: Footer Navigation Structure](./0004-footer-navigation-structure.md)
   - **Date**: 2025-01-04
   - **Status**: Accepted
   - **Summary**: Simple, consistent footer with Privacy, Terms, Community Guidelines, and Support links

## Creating New ADRs

When creating a new ADR:

1. **Number**: Use the next sequential number (0005, 0006, etc.)
2. **Filename**: `XXXX-descriptive-title.md` (lowercase, hyphenated)
3. **Template**: Follow the structure of existing ADRs
4. **Update Index**: Add entry to this README

### ADR Template

```markdown
# ADR XXXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYYY]

## Date
YYYY-MM-DD

## Context
[What is the issue that we're seeing that is motivating this decision or change?]

## Decision
[What is the change that we're proposing and/or doing?]

## Consequences
### Positive
- ✅ [Positive outcome]

### Negative
- ⚠️ [Negative outcome]

### Neutral
- 📝 [Neutral outcome]

## Alternatives Considered
### 1. [Alternative Name]
**Rejected**: [Reason]

## Related Decisions
- [ADR YYYY: Related Decision](#YYYY)

## References
- [External link]
```

## Decision Status Definitions

- **Proposed**: Decision is under discussion
- **Accepted**: Decision has been approved and implemented
- **Deprecated**: Decision is no longer relevant but kept for historical context
- **Superseded**: Replaced by a newer decision (link to the new ADR)

## Key Architectural Themes

### 1. Simplicity
- Minimal dependencies
- Clear, maintainable code
- Avoid over-engineering

### 2. Performance
- Static site generation
- Optimized bundle sizes
- Fast page loads

### 3. Internationalization
- First-class multilingual support
- SEO-friendly language routing
- Type-safe translations

### 4. User Experience
- Fast, responsive pages
- Clear navigation
- Professional presentation

### 5. Maintainability
- Well-documented decisions
- Clear code structure
- Easy to onboard new developers

## Related Documentation

- [CLAUDE.md](../../CLAUDE.md) - Project purpose and AI usage guidelines
- [README.md](../../README.md) - Project overview and setup
- [Technical Stack](../../docs/technical-stack.md) - Technology choices (if exists)

## Questions?

If you have questions about any architectural decision:
1. Read the full ADR document
2. Check related ADRs
3. Review implementation files referenced
4. Ask the team for clarification

## Contributing

When making significant architectural changes:
1. Create a new ADR documenting the decision
2. Update related ADRs if needed
3. Mark superseded ADRs appropriately
4. Keep this index up to date
