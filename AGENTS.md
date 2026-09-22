# AGENTS.md — FinLink UI Prototyping

## Source of truth for UI work

Before building, changing, or reviewing any UI component or pattern, read these files:

- **`docs/styleguide.md`** — component & pattern rules: purpose, when to use, variants,
  props/API, do's, don'ts, states, accessibility, code examples.
- **`docs/design-tokens.md`** — what each color/typography/spacing token means and when
  to use it (human-readable reference, with Light/Dark rationale).
- **`docs/tokens.css`** — the same tokens as real CSS custom properties. Import this
  directly into prototypes rather than retyping values.
- **`docs/styleguide-audit.md`** / **`docs/styleguide-audit-summary.md`** — where the
  documented rules were checked against the real production code (loanlink-web) and
  found to differ. `styleguide.md` has already been corrected based on this, but the
  audit is useful background if something still looks contradictory.
- **`docs/engineering-findings.md`** — known code inconsistencies (parallel component
  implementations, outdated internal demo pages, reference examples that violate their
  own documented rules). These are NOT patterns to copy — treat them as things to be
  aware of, not to imitate.

## Rules when building or modifying UI

1. Read the relevant `## ` section(s) in `docs/styleguide.md` in full before writing
   any UI code for that component.
2. Never invent a variant, prop, color, or behavior that isn't documented there. If
   something is unclear, missing, or explicitly flagged as "confirm with design" or
   "not yet implemented," ask instead of guessing.
3. Use the CSS custom properties from `tokens.css` for all colors, spacing, and
   typography. Don't hardcode a hex value or pixel number that already has a token.
4. Some components have multiple parallel implementations in the real codebase (see
   the Props/API notes on Select, Input, and Tags in `docs/styleguide.md`, and the
   detail in `docs/engineering-findings.md`). Don't assume there's only one — check
   which implementation a task is actually extending before adding to it.
5. Where a styleguide rule references an informal Zeroheight color name (e.g. "Light
   neutral/200") that isn't in `design-tokens.md`, treat it as approximate — pick the
   closest matching token and say so, rather than inventing a hex value.
6. Never start building when the request is ambiguous about which component 
   is meant. STOP and ask first. Example: 'Dropdown' alone is always ambiguous 
   in this project — it could mean Dropdown button, Dropdown menu, or Select, 
   all documented separately in styleguide.md with different purposes, variants 
   and rules. One question, one answer, then build.
7. If a task needs a component or pattern that isn't in `docs/styleguide.md` at all,
   say so and propose how it should be documented, rather than quietly inventing a
   convention.

## Prototyping workflow

1. Identify which component(s) / pattern(s) the task needs.
2. Read their sections in `docs/styleguide.md`.
3. Reference `docs/tokens.css` for the actual values to use.
4. Build the component matching the documented variants, props, and states.
5. Call out any gaps, conflicts, or assumptions made along the way rather than
   silently resolving them.

## Project specifics

_Fill in as they're confirmed — not yet audited beyond the UI styleguide:_

- Framework / monorepo structure: (Angular-based; components live under
  `libs/client/*/ui-*` and `apps/client/*` per the styleguide audit — confirm exact
  conventions before relying on this.)
- Package manager, build, lint, and test commands: _TODO_
- Any other repo-wide conventions (naming, folder structure, commit style): _TODO_
