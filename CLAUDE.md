# Prototypes — Design System Reference

This file is read automatically by Claude Code at the start of every session.
It is the single source of truth for how this workspace is structured and how to build new prototypes.

---

## Workspace overview

This workspace contains HTML/CSS prototypes for internal banking application flows.
All projects share one global design system so that colours, typography, spacing and components
are always consistent. Changes to the design-system files propagate to every prototype instantly.

**Projects:**
- `mortgage-hub/` — Mortgage Hub & Offer Submission flows
- `data-validation/` — Data Validation flows (Application Form, Important Fields)

---

## Folder structure

```
Prototypes/
  CLAUDE.md                              ← this file
  index.html                             ← master launcher
  design-system/
    tokens.css                           ← all design tokens (colours, type, spacing, radius, shadows)
    styles.css                           ← base reset + typography utility classes
    layout.css                           ← app shell (sidebar, topbar, page-header, tabs, buttons)
    components.css                       ← reusable UI components (badges, status chips, etc.)
    _template.html                       ← starting point for every new prototype

  mortgage-hub/
    index.html
    offer-submission/

  data-validation/
    index.html
    application-form/
      prototype1.html
      prototype2.html
    important-fields/
      prototypeCv1.html
```

---

## How to create a new prototype

1. Copy `design-system/_template.html` to the correct project subfolder
2. Rename it: `[project]-[description]-v[N].html` e.g. `offer-submission-drawer-v1.html`
3. Update the CSS path prefix at the top of the file based on folder depth:
   - Two folders deep (e.g. `data-validation/application-form/`) → `../../design-system/`
   - One folder deep (e.g. `mortgage-hub/offer-submission/`) → `../../design-system/`
4. Update `<title>`, page header title, info bar fields, and tabs for this prototype
5. Build your content inside `<!-- PROTOTYPE CONTENT STARTS HERE -->`
6. Add a card for it in the project's `index.html`

---

## CSS file roles

| File | Contains | When to edit |
|---|---|---|
| `tokens.css` | All design tokens as CSS custom properties | When adding new token values from Figma |
| `styles.css` | CSS reset, `h1–h6`, body utility classes, links | Rarely — only for global base style changes |
| `layout.css` | `.app`, `.sidebar`, `.topbar`, `.page-header`, `.tab-nav`, `.content`, `.btn` | When updating shared chrome or adding a new button variant |
| `components.css` | `.badge`, `.status-chip`, `.info-bar`, `.nav-item` | When adding a new reusable component |

**Rule: never use hardcoded colour values or pixel sizes in prototype files.
Always use CSS custom properties from `tokens.css`.**

---

## Design token quick reference

### Colours
```
Primary:   --color-primary-500 (#009688)  --color-primary-600 (#00877A)  --color-primary-100 (#E6F5F3)
Neutrals:  --color-neutral-dark-900       --color-neutral-dark-400       --color-neutral-light-000
Error:     --color-error-500              --color-error-100
Success:   --color-success                --color-success-light
Warning:   --color-warning-high           --color-warning-high-light
```

### Spacing
```
--space-xs: 4px   --space-s: 8px   --space-m: 16px
--space-l: 24px   --space-xl: 40px  --space-xxl: 64px
```

### Border radius
```
--radius-xs: 2px   --radius-s: 4px   --radius-m: 8px   --radius-l: 12px   --radius-full: 9999px
```

### Shadows
```
--shadow-xs   --shadow-s   --shadow-m   --shadow-l
```

### Z-index
```
--z-base: 0   --z-raised: 10   --z-overlay: 100   --z-modal: 200   --z-toast: 300
```

### Transitions
```
--transition-fast: 0.1s ease   --transition-base: 0.15s ease   --transition-slow: 0.25s ease
```

### Typography
```
Headings:   h1–h6 elements (styled automatically), or use --h1-size / --h1-weight etc.
Body:       .body-regular  .body-regular-highlighted  .body-small  .body-small-highlighted
Microcopy:  .microcopy
```

---

## Component class reference

### App shell
```html
<div class="app">                        <!-- full viewport flex container -->
  <aside class="sidebar">...</aside>     <!-- left nav, 72px wide, dark -->
  <div class="main">                     <!-- flex column, fills remaining space -->
    <header class="topbar">...</header>
    <div class="page-header">...</div>
    <div class="info-bar">...</div>      <!-- contextual data strip -->
    <nav class="tab-nav">...</nav>
    <div class="content">
      <div class="content-inner">...</div>
    </div>
  </div>
</div>
```

### Buttons
```html
<button class="btn btn-primary">Label</button>
<button class="btn btn-secondary">Label</button>
<button class="btn btn-ghost">Label</button>
```

### Badges
```html
<span class="badge badge-error">Error</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-ok">OK</span>
```

### Info bar
```html
<div class="info-bar">
  <div class="info-item">
    <span class="info-label">Label</span>
    <span class="info-value">Value</span>
  </div>
  <div class="info-divider"></div>
  <!-- repeat info-item + info-divider -->
</div>
```

### Sidebar item
```html
<a href="#" class="sidebar-item active">
  <span class="sidebar-icon material-symbols-outlined">icon_name</span>
  <span class="sidebar-label">Label</span>
</a>
```

### Tab navigation
```html
<nav class="tab-nav">
  <div class="tab-bar">
    <button class="tab active">Tab One</button>
    <button class="tab">Tab Two</button>
  </div>
</nav>
```

---

## Naming conventions

**Files:** `[project]-[description]-v[N].html` — all lowercase, kebab-case
Examples: `offer-submission-drawer-v1.html`, `data-validation-table-v2.html`

**CSS classes:** BEM-lite — block + modifier with `--`, e.g. `.badge--large`, `.nav-item--step`

**No inline styles** in prototype files except for one-off layout fixes that don't belong in shared CSS.

---

## Figma connection

Design tokens and component specs come from the Figma design system file.
MCP is configured to read the file directly — share the Figma URL in chat to extract tokens or component specs.

Figma component naming convention:
```
Button / Variant / State / Size
Nav/Container
Nav/Section
Nav/Item
Nav/Item/Step
Nav/StepIndicator
Badge / Type
```
## Frontend Design Skill

When building any web UI, component, page, or application:

### Design Thinking (do this before coding)
- **Purpose**: Understand who uses it and what problem it solves
- **Tone**: Commit to a bold aesthetic direction — brutally minimal, maximalist, retro-futuristic, editorial, brutalist, luxury, etc.
- **Differentiation**: What makes this UNFORGETTABLE?

### Code Standards
- Production-grade, functional, and accessible
- Use CSS variables for theming consistency
- Prefer CSS-only animations; use Motion library in React when available

### Aesthetics Rules
- **Typography**: Use distinctive, characterful fonts — avoid Inter, Roboto, Arial, system fonts
- **Color**: Dominant palette with sharp accents; avoid timid evenly-distributed colors
- **Motion**: One well-orchestrated page load > scattered micro-interactions
- **Layout**: Use asymmetry, overlap, diagonal flow, and grid-breaking elements
- **Backgrounds**: Gradient meshes, noise textures, layered transparencies — never flat solid colors

### Never do this
- Purple gradients on white backgrounds
- Generic "AI slop" aesthetics
- Cookie-cutter component patterns
- Reusing the same fonts across different designs

## Design Fidelity
When given a Figma screenshot, replicate it pixel-for-pixel. 
Do not improvise or "improve" the design — match it exactly.
Use values from Figma Dev Mode when provided.

## Figma Source of Truth
When referencing Figma designs, ONLY use these files:
- UI Kit: https://www.figma.com/design/zwAes6GChfT8JUPOgY3NBt/MCP---Style-Guide?m=auto&t=SdShI8ywSQO4NbrA-6
- Styles: https://www.figma.com/design/G8BJKjAkRkqKBkLxW6xbX5/MCP-UI-Kit--Copy-?m=auto&t=SdShI8ywSQO4NbrA-6
- These are our approved design files without branding.
- Do NOT reference any other Figma files or components outside these files.