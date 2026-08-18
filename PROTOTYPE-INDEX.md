# Prototype Index — Full Overview

> **⚠️ HISTORISCHER STAND — abgelöst am 18.08.2026.**
> Dieses Dokument beschreibt den Zustand *vor* der Index-Umstellung und diente als
> Analysegrundlage dafür. Die hier gelisteten Probleme (toter Link, 4 verwaiste Dateien,
> widersprüchliche Versionsnummern) sind behoben. Aktueller Stand: `index.html`,
> Regeln: `NAMING-CONVENTION.md`, Umbenennungen: `RENAME-MAP.md`.


Snapshot of every HTML prototype in this workspace, how the launcher indexes are wired,
and where the indexing currently breaks down.

Generated 2026-08-18 · 53 HTML files · 5 real launchers · 7 projects

---

## 1. How indexing works today

Three tiers, but only partly applied:

```
index.html  (root launcher, "Projekt 1–7")
├── mortgage-hub/index.html        → 3 prototypes
├── data-validation/index.html     → 22 prototypes  (largest, 4 sections)
├── advisor-dashboard/index.html   → 2 prototypes
├── to-do/index.html               → 4 prototypes
├── Customer Dashboard/…           → NO index — root links the prototype directly
└── doc-center/…                   → NO index — root links all 11 files directly
```

Card anatomy is identical on every launcher:

```html
<div class="project-card">
  <span class="project-tag">V5</span>            <!-- version / project number -->
  <span class="project-title">Short name</span>
  <p class="project-desc">1–2 sentences on what changed vs. the previous version.</p>
  <a href="…" class="project-link">Öffnen →</a>
</div>
```

`data-validation/index.html` additionally groups cards under section headers
(Application Form · Data Validation Table · Important Fields · Coba), the root index uses
`.project-section-header` for the DigitalQA block. There is no status, owner, date, or
"is this current" field anywhere.

---

## 2. Full inventory

Legend — **DS**: uses shared `design-system/tokens.css` · **Card**: label shown on the launcher

### Root launcher
| File | Title | DS | Last commit |
|---|---|---|---|
| `index.html` | Prototypes | ✓ | 2026-08-06 |

### Projekt 1 — Mortgage Hub (`mortgage-hub/`)
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `index.html` | — | Mortgage Hub – Prototypes | ✓ | 2026-06-15 |
| `offer-submission/index.html` | (linked, unlabelled) | Mortgage Hub – Angebotssuche | ✓ | 2026-04-16 |
| `offer-submission/offer-submission-v2.html` | Prototype 2 · Angebotssuche V2 | …V2 | ✓ | 2026-04-27 |
| `offer-submission/offer-submission-v3.html` | **— orphan —** | …V3 | ✓ | 2026-04-27 |
| `offer-submission/offer-submission-v4.html` | **— orphan —** | …V2 ⚠ | ✓ | 2026-04-27 |
| `offer-submission/_template.html` | — | Prototype – [Title] | ✓ | 2026-04-16 |
| `jtbd-mapper/jtbd-mapper-v1.html` | Tool V1 · JTBD Mapper | JTBD Mapper | ✓ | 2026-06-15 |

### Projekt 2 — Data Validation (`data-validation/`)
**Application Form**
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `application-form/prototype1.html` | V1 · Tabellenansicht mit Drawer | Data Validation – Anträge | ✓ | 2026-04-16 |
| `application-form/prototype2.html` | V2 · Floating Widget | Prototype 2 – Floating Widget | ✓ | 2026-04-16 |
| `application-form/prototype3.html` | V3 · Inline Tabellenansicht | Prototype 3 – Inline Tabellenansicht | ✓ | 2026-04-16 |
| `application-form/table-validation-v2-usability-testing.html` | V4 · Usability Testing | …– V2 Usability Testing ⚠ | ✗ | 2026-05-11 |
| `application-form/table-validation-v5.html` | V5 · nach Usability Testing | Data Validation – V5 | ✗ | 2026-05-11 |
| `application-form/table-validation-v6.html` | V6 · ohne Filter-Chips | Data Validation – V6 | ✗ | 2026-05-11 |
| `application-form/table-validation-v7.html` | V7 · Antragsvalidierung als Tab | Data Validation – V7 | ✗ | 2026-07-01 |
| `application-form/christian-v1.html` | **— orphan —** | Data Validation (beta) | ✗ | 2026-04-29 |

**Data Validation Table (dev-ready)**
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `application-form/table-validation-devready-v1.html` | V1 · Dev Ready | Data Validation – V5 ⚠ | ✗ | 2026-05-14 |
| `application-form/table-validation-devready-v2.html` | V2 · Multiple Sources | Data Validation – V5 ⚠ | ✗ | 2026-05-14 |

**Important Fields**
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `important-fields/prototypeCv1.html` | V1 · Tabelle ohne Drawer | Prototype C V1 | ✓ | 2026-04-16 |
| `important-fields/highlighting-important-fields-v1.html` | **V2** · Wichtige Felder hervorheben | …V1 ⚠ | ✓ | 2026-05-06 |
| `important-fields/highlighting-important-fields-v2.html` | **V3** · Filter-Drawer + Teal-Rahmen | 🔴 **FILE MISSING** | — | — |
| `important-fields/highlighting-important-fields-v3.html` | **V4** · Teal-Rahmen ohne Label-Tags | …V3 ⚠ | ✓ | 2026-05-21 |
| `important-fields/highlighting-important-fields-v5.html` | V5 · Zusatzdaten für Banken | …V5 | ✓ | 2026-05-06 |
| `important-fields/highlighting-important-fields-v6.html` | V6 · Sticky Progress Bar | …V6 | ✓ | 2026-05-13 |

**Important Fields — FinLink**
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `important-fields/highlighting-important-fields-finlink-v1.html` | V1 · 4 Phasen + 1 Bank | …V3 ⚠ | ✓ | 2026-05-07 |
| `important-fields/highlighting-important-fields-v4.html` | **V2** · Progress Indication | …V4 ⚠ | ✓ | 2026-05-07 |
| `important-fields/highlighting-important-fields-finlink-v3.html` | V3 · Iteration auf V1 | …V3 | ✓ | 2026-05-11 |
| `important-fields/highlighting-important-fields-finlink-v4.html` | V4 · Iteration auf V3 | …FinLink V4 | ✓ | 2026-06-15 |

**Coba**
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `coba/data-validation-coba.html` | V1 · Data Validation | …– V2 Usability Testing ⚠ | ✗ | 2026-05-06 |
| `important-fields/highlighting-important-fields-coba-V1.html` | V2 · Phasen-Chips | …V2 | ✓ | 2026-05-06 |
| `important-fields/highlighting-important-fields-coba-V2.html` | V3 · Toggle | …V2 ⚠ | ✓ | 2026-05-06 |

### Projekt 3 — Doc Center Skeleton & Projekt 4 — DigitalQA (`doc-center/`)
No project-level index; all cards live on the root launcher. **None use the design system.**

| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `doc-center-skeleton/docCenterSkeleton.html` | Projekt 3 · Doc Center – Skeleton | Doc Center – Skeleton | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v1.html` | V1 · Usability Testing | …V1 | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v2.html` | V2 · Updated Table | …V2 | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v3.html` | V3 · Updated Improvements | …V3 | ✗ | 2026-07-01 |
| `doc-center-skeleton/digital-qa-doc-center-v4.html` | V4 · Draft & Send | …V4 | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v5.html` | V5 · Structured Check Table | …V5 | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v6-a.html` | V6-A · Aufgaben-Liste | …V5 ⚠ | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v6-b.html` | V6-B · Dokument-Board | …V5 ⚠ | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v6-d.html` | V6-D · Aufgaben-Board | …V5 ⚠ | ✗ | 2026-06-22 |
| `doc-center-skeleton/digital-qa-doc-center-v7-…-flow.html` | V7 · Upload Additional Doc | …V7 | ✗ | 2026-07-01 |
| `doc-center-skeleton/user-flow-v1.html` | User Flow V1 | …User Flow V1 | ✗ | 2026-06-04 |
| `width-comparison-mock.html` | **— orphan —** | Breiten-Layout Vergleich | ✗ | 2026-06-23 |

*Note: there is no `v6-c`. The gap is intentional but undocumented.*

### Projekt 5 — Advisor Dashboard (`advisor-dashboard/`)
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `index.html` | — | Advisor Dashboard – Prototypes | ✓ | 2026-06-23 |
| `loan-application/termin-scheduling-flow-v1.html` | Termin V1 · Outlook & Calendly | …v1 | ✗ | 2026-06-23 |
| `loan-application/termin-scheduling-flow-v2-nylas.html` | Termin V2 · Outlook nativ via Nylas | …v2 | ✗ | 2026-06-25 |

### Projekt 6 — Selbstauskunft (`Customer Dashboard/`)
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `selfdisclosure/V1-Prototype.html` | Projekt 6 (root card) | Selbstauskunft — Objekt & Finanzierung | ✓ | 2026-07-10 |

### Projekt 7 — To do's (`to-do/`)
| File | Card | Title | DS | Last commit |
|---|---|---|---|---|
| `index.html` | — | To do's – Prototypes | ✓ | 2026-08-17 |
| `mein-tag-v1.html` | Mein Tag · V1 | Mein Tag — To do's | ✓ | 2026-08-06 |
| `mein-tag-v2.html` | Mein Tag · V2 | To do's | ✓ | 2026-08-06 |
| `mein-tag-final.html` | Mein Tag · FINAL | To do's | ✓ | 2026-08-17 |
| `todo-sorting-v1.html` | Prototype 1 · ToDo-Sortierung | Anträge — ToDo-Sortierung | ✓ | 2026-07-27 |

### Shared
| File | Purpose |
|---|---|
| `design-system/tokens.css` | colours, type, spacing, radius, shadows |
| `design-system/styles.css` | reset + typography |
| `design-system/layout.css` | app shell, sidebar, topbar, tabs, buttons |
| `design-system/components.css` | badges, chips, info-bar, nav-item |
| `design-system/shell.js` | shared shell behaviour |
| `design-system/_template.html` | starting point for new prototypes (orphan by design) |

---

## 3. Problems to fix

### 🔴 Broken link
`data-validation/index.html` links `important-fields/highlighting-important-fields-v2.html`
(card "V3 · Filter-Drawer + Teal-Rahmen"). **The file does not exist.** Clicking that card 404s.

### 🟠 Orphans — on disk, unreachable from any launcher
- `data-validation/application-form/christian-v1.html` (120 KB, Apr 2026)
- `doc-center/width-comparison-mock.html`
- `mortgage-hub/offer-submission/offer-submission-v3.html`
- `mortgage-hub/offer-submission/offer-submission-v4.html` (the newest of the three!)
- `design-system/_template.html`, `mortgage-hub/offer-submission/_template.html` (templates — fine)

### 🟠 Three competing version numbers per prototype
Filename, card label, and `<title>` disagree constantly. Worst cases:

| File says | Card says | `<title>` says |
|---|---|---|
| `highlighting-important-fields-v1.html` | V2 | V1 |
| `highlighting-important-fields-v3.html` | V4 | V3 |
| `highlighting-important-fields-v4.html` | V2 (FinLink) | V4 |
| `table-validation-devready-v1.html` | V1 | **V5** |
| `table-validation-devready-v2.html` | V2 | **V5** |
| `digital-qa-doc-center-v6-a/b/d.html` | V6-A/B/D | **V5** (all three) |
| `offer-submission-v4.html` | — | **V2** |
| `data-validation-coba.html` | V1 | V2 Usability Testing |
| `highlighting-important-fields-coba-V2.html` | V3 | V2 |

Searching for "V5" currently returns five unrelated prototypes.

### 🟡 Naming convention drift
`CLAUDE.md` specifies `[project]-[description]-v[N].html`, lowercase kebab-case. Violations:
`prototype1/2/3.html`, `prototypeCv1.html`, `christian-v1.html` (person's name),
`docCenterSkeleton.html` (camelCase), `V1-Prototype.html` (leading capital),
`…-coba-V1.html` / `…-coba-V2.html` (capital V), `mein-tag-final.html` (no version).

Also: the folder `Customer Dashboard/` has a **capital letter and a space**, forcing `%20`
URL-encoding in the root index — the only such link in the workspace.

### 🟡 Structural inconsistency
- **doc-center** has 12 files and no `index.html`; its 11 cards are pasted into the root launcher, which makes the root page 230 lines and mixes two levels of hierarchy.
- **Customer Dashboard** likewise has no index.
- `mortgage-hub/offer-submission/index.html` is **not a launcher** — it's a 46 KB prototype named `index.html`. Anything that treats `index.html` as "the launcher" will mis-file it.
- Root project numbers render out of order: 1, 2, 5, 6, 7, 3, 4.

### 🟡 Design-system split
31 of 53 files use the shared tokens, 22 do not. The gap is not random — entire families
have drifted: **all 12 doc-center files**, **both advisor-dashboard prototypes**, the
**7 table-validation files**, and `coba/data-validation-coba.html`. Edits to
`design-system/*.css` do not reach ~40 % of the workspace.

### 🟡 No status metadata
Nothing distinguishes current from superseded, tested from untested, or dev-ready from
exploratory. `mein-tag-final.html` encodes it in the filename; `table-validation-devready-*`
encodes it in the filename; everything else leaves it implicit.

---

## 4. Suggested indexing scheme

1. **One `index.html` per project folder.** Add `doc-center/index.html` and
   `customer-dashboard/index.html`; the root launcher then holds exactly 7 project cards.
2. **Rename the odd ones out.** `Customer Dashboard/` → `customer-dashboard/`,
   `docCenterSkeleton.html` → `doc-center-skeleton-v1.html`,
   `mortgage-hub/offer-submission/index.html` → `offer-submission-v1.html`.
3. **One version number, three places.** Make filename = card tag = `<title>` suffix.
   Where the sequence has genuinely restarted (Important Fields, FinLink, Coba), give each
   line its own prefix rather than reusing V1–V6.
4. **Add status to every card**, e.g. a `data-status` attribute on `.project-card`
   with `aktuell` / `abgelöst` / `dev-ready` / `archiv`, rendered as a badge — the design
   system already has `.badge` and `.status-chip`.
5. **Add a machine-readable manifest**, e.g. `prototypes.json`, listing path, project,
   version, title, status, date, and design-system usage. Launchers can render from it, and
   an agent can read one file instead of crawling 53. This is the single highest-leverage change.
6. **Fix the broken link and file the 4 real orphans** (delete or index them).
7. **Decide on doc-center's design-system debt** — either migrate the 22 standalone files
   or document them as intentionally frozen.
