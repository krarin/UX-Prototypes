# Design Tokens
Source: Figma design tokens (Finlink Core Primitives, Light, Dark, Default/Compact density, and typography modes). This is the single source of truth for colors, typography, and spacing — referenced by name from styleguide.md rather than repeated there. Grid and tone of voice are not yet defined in the provided tokens, so they're omitted rather than invented.

A machine-usable version of every token below (as CSS custom properties, ready to import into a prototype) lives in `tokens.css` in the same folder. Use `tokens.css` for actual code; use this file to understand what each token means and when to use it.

## Color

### Primitive palette
Raw color scales that the semantic tokens below are built from. Reference these only when a semantic token doesn't fit; prefer semantic tokens in actual UI code.

| Family | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grey (also has `0` = #FFFFFF) | #F9FAFC | #F5F7F8 | #ECEFF1 | #CFD8DC | #B0BEC5 | #78909C | #607D8B | #4B5961 | #37474F | #263238 | #161719 |
| Teal (brand) | #F2FBFA | #E6F5F3 | #CCEAE7 | #99D5CF | #33ABA0 | #009688 | #00877A | #00796B | #006658 | #004D43 | #00332D |
| Red | #FFF5F5 | #FFEEEE | #FFCACA | #FFA3A3 | #FF7D7D | #FF5656 | #E64D4D | #CC4545 | #B33B3B | #992F2F | #661F1F |
| Blue | #F4F7FB | #EBF0FB | #E6EEFB | #9BAEE4 | #4B7BEC | #0857C3 | #0750B3 | #0649A4 | #054295 | #043B85 | #033476 |
| Yellow | #FDF5E4 | #FBECC9 | #F9E0A8 | #F7D78F | #F6D184 | #F5CD79 | #E0B85F | #C29D4C | #9E7F3C | #755D2C | #43351A |
| Green | #E9FCF2 | #D0F7E1 | #A3EFC4 | #6FE3A3 | #42D283 | #20BF6B | #1BA85E | #178F50 | #137341 | #0D5230 | #0B3F25 |
| Orange | #FFF5E8 | #FFE9CC | #FFD699 | #FFC266 | #FFB040 | #FF9F1A | #E68C13 | #CC7A0F | #A3610C | #7A4809 | #512F06 |
| Purple | #FDF4FE | #FAE6FD | #F3C9F9 | #EDAEF6 | #E9A1F5 | #E693F4 | #CF7DDB | #B066BD | #8C5197 | #663A6E | #3A2140 |
| Cyan | #ECF9FB | #D3F1F5 | #A9E5EC | #7ED7E2 | #58CCD9 | #3DC1D3 | #2EA7B8 | #268A98 | #1F6F7A | #17535B | #113C43 |

### Semantic tokens
Use these CSS custom properties in code rather than hardcoded hex values, so the UI adapts automatically between Light and Dark mode. Hex values below are shown for reference (Light mode is the default; Dark mode value shown only where it differs).

**Background**

| Token | Light | Dark |
|---|---|---|
| `--ds-color-background-page` | #F9FAFC | #161719 |
| `--ds-color-background-surface` | #FFFFFF | #263238 |
| `--ds-color-background-raised` | #FFFFFF | #37474F |
| `--ds-color-background-hover` | #F5F7F8 | #4B5961 |
| `--ds-color-background-active` | #ECEFF1 | #607D8B |
| `--ds-color-background-selected` | #E6F5F3 | #00332D |
| `--ds-color-background-disabled` | #ECEFF1 | #37474F |
| `--ds-color-background-overlay` | #000000 (50% alpha) | same |

Background also has nested neutral/brand/info/success/warning/danger variants at `subtlest`/`subtle`/`bold` weight × `default`/`hovered`/`pressed`/`disabled` state (no dedicated CSS var — reference by path, e.g. `background.brand.bold.hovered` = #00877A). Ask if you need the full nested table.

**Text**

| Token | Light | Dark |
|---|---|---|
| `--ds-color-text-primary` | #263238 | #F9FAFC |
| `--ds-color-text-secondary` | #4B5961 | #B0BEC5 |
| `--ds-color-text-disabled` | #B0BEC5 | #78909C |
| `--ds-color-text-placeholder` | #607D8B | #78909C |
| `--ds-color-text-link` | #009688 | #9BAEE4 |
| `--ds-color-text-link-hover` | #00877A | #E6EEFB |
| `--ds-color-text-link-visited` | #00796B | #EDAEF6 |
| `--ds-color-text-link-disabled` | #B0BEC5 | #78909C |

**Border**

| Token | Light | Dark |
|---|---|---|
| `--ds-color-border-default` | #CFD8DC | #4B5961 |
| `--ds-color-border-hover` | #B0BEC5 | #607D8B |
| `--ds-color-border-focus` | #009688 | #33ABA0 |
| `--ds-color-border-error` | #FF5656 | same |
| `--ds-color-border-disabled` | #ECEFF1 | #37474F |

**Icon** — no dedicated top-level CSS var; reference by path, e.g. `icon.brand.bold.default` = #009688, `icon.danger.bold.default` = #FF5656, `icon.neutral.bold.default` = #37474F.

**On-color text** (text/icon color to use on top of a filled action color)

| Token | Light | Dark |
|---|---|---|
| `--ds-color-on-primary` | #FFFFFF | #161719 |
| `--ds-color-on-secondary` | #263238 | #161719 |
| `--ds-color-on-danger` | #FFFFFF | #161719 |
| `--ds-color-on-success` | #FFFFFF | #161719 |
| `--ds-color-on-warning` | #FFFFFF | #161719 |
| `--ds-color-on-info` | #FFFFFF | #161719 |
| `--ds-color-on-notification` | #FFFFFF | #161719 |
| `--ds-color-on-accent-purple` | #FFFFFF | #161719 |
| `--ds-color-on-disabled` | #607D8B | #B0BEC5 |

**Action** (buttons and interactive controls)

| Token | Light | Dark |
|---|---|---|
| `--ds-color-action-primary` | #009688 | #33ABA0 |
| `--ds-color-action-primary-hover` | #00877A | #99D5CF |
| `--ds-color-action-primary-active` | #00796B | #CCEAE7 |
| `--ds-color-action-primary-subtle` | #E6F5F3 | #00332D |
| `--ds-color-action-primary-muted` | #CCEAE7 | #004D43 |
| `--ds-color-action-secondary` | #F5F7F8 | #B0BEC5 |
| `--ds-color-action-secondary-hover` | #ECEFF1 | #CFD8DC |
| `--ds-color-action-secondary-active` | #CFD8DC | #ECEFF1 |
| `--ds-color-action-danger` | #FF5656 | #FF7D7D |
| `--ds-color-action-danger-hover` | #E64D4D | #FFA3A3 |
| `--ds-color-action-danger-active` | #CC4545 | #FFCACA |

**Feedback** (status/message colors)

| Token | Light | Dark |
|---|---|---|
| `--ds-color-feedback-success` | #20BF6B | #42D283 |
| `--ds-color-feedback-success-subtle` | #E9FCF2 | #0B3F25 |
| `--ds-color-feedback-success-strong` | #137341 | #42D283 |
| `--ds-color-feedback-warning` | #FF9F1A | #FFB040 |
| `--ds-color-feedback-warning-subtle` | #FFF5E8 | #512F06 |
| `--ds-color-feedback-warning-strong` | #7A4809 | #FFB040 |
| `--ds-color-feedback-warning-low` | #F5CD79 | #F6D184 |
| `--ds-color-feedback-warning-low-subtle` | #FDF5E4 | #43351A |
| `--ds-color-feedback-warning-low-strong` | #755D2C | #F6D184 |
| `--ds-color-feedback-error` | #FF5656 | same |
| `--ds-color-feedback-error-subtle` | #FFEEEE | #661F1F |
| `--ds-color-feedback-error-strong` | #B33B3B | #FF7D7D |
| `--ds-color-feedback-info` | #4B7BEC | same |
| `--ds-color-feedback-info-subtle` | #EBF0FB | #033476 |
| `--ds-color-feedback-info-strong` | #0857C3 | #9BAEE4 |
| `--ds-color-feedback-notification` | #3DC1D3 | #58CCD9 |
| `--ds-color-feedback-notification-subtle` | #ECF9FB | #113C43 |
| `--ds-color-feedback-notification-strong` | #1F6F7A | #58CCD9 |

**Accent:** `--ds-color-accent-purple` = #E693F4 (Light) / #E9A1F5 (Dark).

**Focus ring:** `--ds-color-focus-ring` = #009688 (Light) / #33ABA0 (Dark).

**Note on informal Zeroheight color names:** Several component sections in styleguide.md reference informal names like "Light neutral/200" or "Dark neutral/800" (e.g. in Dropdown, Empty states, Side Navigation, Tags). These come from an older Zeroheight color system and predate the token set above — they do **not** reliably map to the current primitive/semantic tokens, so don't assume "Light neutral/200" = grey.200 or similar. Treat those older references as approximate/legacy and, when implementing, use the current semantic tokens above and pick the closest visual match, or confirm the intended color with design directly.

## Typography

**Font family:** Sans (default) = `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Mono = `"Courier New", Courier, monospace`.

**Font weights:** Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700.

**Type scale:**

| Style | Size | Line height | Letter spacing | Weight |
|---|---|---|---|---|
| Heading XL | 30 | 36 | 0 | Medium |
| Heading LG | 26 | 28 | 0 | Medium |
| Heading MD | 20 | 22 | 0 | Medium |
| Heading SM | 16 | 20 | 0 | Medium |
| Heading XS | 12 | 16 | 0 | Medium |
| Body LG — Strong | 16 | 22 | 0.25 | SemiBold |
| Body LG — Medium | 16 | 22 | 0.25 | Medium |
| Body LG — Default | 16 | 22 | 0.25 | Regular |
| Body MD — Strong | 14 | 20 | 0.25 | SemiBold |
| Body MD — Medium | 14 | 20 | 0.25 | Medium |
| Body MD — Default | 14 | 20 | 0.25 | Regular |
| Body SM — Strong | 12 | 16 | 0.25 | SemiBold |
| Body SM — Medium | 12 | 16 | 0.25 | Medium |
| Body SM — Default | 12 | 16 | 0.25 | Regular |

All sizes/line-heights in px, letter-spacing in px.

## Spacing
Spacing scale (px): 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 — exposed as `--ds-spacing-0` through `--ds-spacing-96`, named by their pixel value (not by index).

## Sizing scale
A separate, smaller scale used for icon/avatar/control sizing (px): 8, 12, 16, 20, 24, 32, 40, 48, 64.

## Border radius
None = 0, SM = 2, MD = 4, LG = 8, XL = 12, 2XL = 16, Full = 9999.

## Border width
0, 1, 2, 4 (px).

## Opacity
0%, 25%, 50%, 75%, 100%.

## Density modes
Field-level sizing (input, select, autocomplete) changes under `[data-density="compact"]`:

| Token | Default | Compact |
|---|---|---|
| Field height | 36px | 32px |
| Field font size | 16px | 16px |
| Gap between fields on a row | 16px | 16px |
| Gap between stacked fields | 20px | 12px |
| Gap between a field and its label | 4px | 4px |
