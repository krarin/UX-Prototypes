# FinLink Design System — AI Reference

> **How to use this document:** This is the machine-readable source of truth for the FinLink
> design system. When building prototypes, use ONLY the components, tokens, and rules defined
> here. Do not invent new colors, sizes, or component variants. Where a value is marked
> `TODO`, ask before guessing.
>
> Component names and props follow Material-style semantic naming and match our codebase.
> When generating code, emit these component names and props directly.

---

## 1. Design tokens

### 1.1 Color — semantic tokens

Use semantic tokens, never raw hex, in generated code and prototypes.

| Token | Value | Usage |
|---|---|---|
| `color.action.primary` | `#00957F` *(approx — TODO exact)* | Filled button bg, links, brand actions |
| `color.action.primary-hover` | `#007E6C` *(approx — TODO)* | Hover state of primary actions |
| `color.action.primary-pressed` | `#005E54` *(approx — TODO)* | Pressed state |
| `color.action.destructive` | `#F45B4E` *(approx — TODO)* | Destructive icon buttons, reject actions |
| `color.action.positive` | `#2E9E5B` *(approx — TODO)* | Approve/confirm actions |
| `color.action.disabled-bg` | `#F1F3F4` *(approx — TODO)* | Disabled fill |
| `color.action.disabled-fg` | `#B9BEC3` *(approx — TODO)* | Disabled text/icons |
| `color.border.default` | `#DADCE0` *(approx — TODO)* | Outlined button border, dividers |
| `color.text.primary` | `#202124` *(approx — TODO)* | Default text |
| `color.text.secondary` | `#5F6368` *(approx — TODO)* | Subtle text, subtle links |
| `color.surface.default` | `#FFFFFF` | Backgrounds |
| `color.surface.subtle` | `#F5F6F7` *(approx — TODO)* | Secondary button hover bg |

### 1.2 Typography

`TODO: font family, sizes, weights, line heights`

### 1.3 Spacing & radius

- Spacing scale: `TODO (assume 4px base grid until specified)`
- Button corner radius: `4px` *(approx — TODO)*
- Circle buttons / FAB: fully round (`radius: 50%`)

### 1.4 Layout — Breite und Ränder auf großen Schirmen

Prototypen werden auf 1440–1920px beurteilt. Inhalt, der über die ganze Breite läuft, ist nicht
„responsive", sondern unlesbar. Diese Regel gilt ohne Nachfrage für jeden neuen Prototyp.

1. Jede Seite hat einen Seitenrand von `--page-gutter`. Kein Inhalt klebt am Fensterrand.
2. **Dichte Datentabellen** dürfen fluid über die volle Breite laufen — sie brauchen ihre Spalten.
3. **Alles andere** bekommt ein `max-width` und steht zentriert: Charts und Karten-Vergleiche auf
   `--measure-content`, Formulare auf `--measure-form`, Fließtext auf `--measure-text`.
4. Ein Chart, der auf 1920px 1800px breit ist, ist ein Fehler — keine Geschmacksfrage.

| Token | Wert | Wofür |
|---|---|---|
| `--page-gutter` | `clamp(16px, 3vw, 48px)` | Seitenrand, nie darunter |
| `--measure-text` | `700px` | Fließtext, Detailinhalte |
| `--measure-form` | `900px` | Formulare, 2-Spalten-Vergleiche |
| `--measure-content` | `1100px` | Charts, Karten-Vergleiche |
| `--measure-wide` | `1600px` | Arbeitsflächen mit Seitenleiste |

Die Werte stammen aus `doc-center/width-comparison-v1.html` — dort ist der Modus
„Tabelle fluid, Text begrenzt" als empfohlen markiert. Diese Regel schreibt nur auf, was dort
schon entschieden wurde. Beispielumsetzung: `mortgage-hub/offer-comparison-table/offer-comparison-table-v2.html`.

---

---

## 2. Components — Actions

### 2.1 Button

The single component for all labeled actions. Maps to the Material-style `Button` in code.

**Props**

| Prop | Values | Default | Notes |
|---|---|---|---|
| `variant` | `filled` \| `outlined` \| `text` \| `text-subtle` | `filled` | filled = primary action, outlined = secondary, text = link-style, text-subtle = low-emphasis gray link |
| `size` | `sm` (32px) \| `md` (40px) \| `lg` (48px) | `md` | *(heights approx — TODO)* |
| `tone` | `default` \| `destructive` | `default` | destructive only valid with `text` and `outlined` variants |
| `state` | `default` \| `hover` \| `pressed` \| `disabled` \| `loading` | `default` | in code, hover/pressed are CSS states; `loading` replaces label with spinner and disables interaction |
| `iconLeading` | icon name or none | none | e.g. the "Edit" link uses a leading pencil icon |
| `iconTrailing` | icon name or none | none | |
| `label` | string | — | Sentence case. Verb-first ("Save changes", not "Changes") |

**Micro button:** `variant=text, size=xs` — used for inline clear/reset actions ("Clear"),
optionally with a leading `close` (×) icon. Only use inside form fields and filters.

**Visual spec**

- `filled`: bg `color.action.primary`, white label. Hover → `primary-hover`, pressed → `primary-pressed`, disabled → `disabled-bg` + `disabled-fg`.
- `outlined`: white bg, `color.border.default` 1px border, `color.text.primary` label. Hover → `surface.subtle` bg. Border darkens slightly on hover/pressed *(TODO exact)*.
- `text`: `color.action.primary` label, no bg. Hover/pressed → underline.
- `text-subtle`: `color.text.secondary` label. Hover/pressed → underline.

**Usage rules**

- Max ONE `filled` button per view/section. Everything else is `outlined` or `text`.
- Destructive confirmation dialogs: `outlined tone=destructive` for the destructive action, `text` for cancel.
- Never use `disabled` state for buttons the user could fix — prefer enabled + validation message.
- Always use `loading` state after submit; never leave a clickable button during async work.

### 2.2 IconButton

Icon-only actions. Maps to Material-style `IconButton`.

**Props**

| Prop | Values | Default | Notes |
|---|---|---|---|
| `variant` | `ghost` \| `filled` \| `outlined` | `ghost` | ghost = no bg until hover (the back/next arrows); filled = solid color circle/square |
| `shape` | `circle` \| `square` | `circle` | |
| `tone` | `primary` \| `neutral` \| `destructive` \| `positive` | `neutral` | filled+primary = teal, filled+destructive = red |
| `size` | `md` (40px) | `md` | single size — 36px was retired |
| `state` | `default` \| `hover` \| `pressed` \| `disabled` | `default` | |
| `icon` | icon name | — | required |
| `tooltip` | string | — | REQUIRED — icon-only buttons must always have a tooltip label |

**Usage rules**

- Every IconButton needs an accessible label (tooltip + `aria-label` with the same text).
- Use `ghost` for inline/toolbar actions (back, next, edit). Use `filled` sparingly, as a compact stand-in for a primary action.

### 2.3 Fab (Floating Action Button)

**Props:** `variant: primary | secondary`, `icon` (usually `add`).

- Fixed position, bottom-right. ONE per screen maximum.
- `primary`: teal filled circle, white icon. `secondary`: white circle, outlined, dark icon.
- Use only for the screen's single dominant "create" action.

### 2.4 AddTile (card button)

Full-width dashed-border tile with `+ Add` label. Used inside card lists/grids to append an item.

- Border: 1px dashed `color.border.default`. Label: `color.text.primary` with leading `add` icon.
- Hover: `TODO`. Always the last item in the list it extends.

### 2.5 ApprovalButtons (approve / reject pair)

A paired control for document/item review. Composite of two `IconButton shape=circle variant=outlined`:
check (approve) and × (reject).

**States (mutually exclusive):**

| State | Approve button | Reject button |
|---|---|---|
| `unselected` | neutral outline, gray check | neutral outline, gray × |
| `approved` | `tone=positive` selected (green) | neutral |
| `rejected` | neutral | `tone=destructive` selected (red) |
| `disabled` | disabled | disabled |

- Tooltips: approve = "Approve document", reject = "Request a new version of this document".
- Selecting one deselects the other. Both are toggleable (clicking the selected one returns to `unselected`).

---

## 3. Components — Inputs & Forms

`TODO — next section to document`

## 4. Components — Navigation

`TODO`

## 5. Components — Feedback

`TODO`

## 6. Components — Data Display

`TODO`

---

## Prototyping instructions for Claude

When asked to build a prototype:

1. Use React + the token values above as CSS variables (`--color-action-primary` etc.) defined once at `:root`.
2. Build the components in section 2 as small reusable functions matching the prop tables exactly, then compose screens from them.
3. If a needed component isn't documented here yet, say so and propose one following these conventions rather than silently inventing it.
4. Follow the usage rules — they are constraints, not suggestions (one filled button per view, tooltips on all icon buttons, loading states on submits).
5. Apply section 1.4 (Layout — Breite und Ränder) to every screen, without being asked. Dense data
   tables run fluid; charts, card comparisons, forms and prose get a `max-width` and sit centred.
   A full-bleed chart on a 1920px monitor is a defect, not a style choice.
