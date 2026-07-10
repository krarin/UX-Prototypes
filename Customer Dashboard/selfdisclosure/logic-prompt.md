# Prompt: Selbstauskunft — Finanzierungsvorhaben (logic only)

Paste everything below into a fresh session/tool. It deliberately excludes UI and visual design — those will be specified separately.

---

## Context

Build the **logic and state behavior** for one section of an internal, agent-facing Selbstauskunft (financing self-disclosure) tool. The user is a real estate/finance advisor who already has the client's data open on another screen (notes, an Exposé, a signed ID) and is re-entering it into this CRM. This is a B2B/internal re-entry tool, not a customer-facing intake form — so do not assume first-time-user hand-holding is needed.

This covers exactly one section, "Finanzierungsvorhaben" (financing intent, property, and applicants). It's the first of several planned sections; design the state shape so more sections can be added later without restructuring what already exists.

**Do not make any UI/visual/layout decisions.** No component choices, no colors/typography/spacing, no opinion on single-page vs. multi-step, no chip-vs-dropdown-vs-radio treatment, no navigation chrome. Expose the logic as plain state + functions that any UI layer can bind to. If you need a UI to demonstrate the logic works, use the barest possible unstyled markup — the visual layer will be replaced.

## Fields

Use these as the canonical field keys (a UI layer will bind to them):

| Key | Label | Type | Options | Required? |
|---|---|---|---|---|
| `zweck` | Finanzierungszweck | single-select | `neubau-broker` (Neubau vom Bauträger), `bestehend-kauf` (Kauf einer bestehenden Immobilie), `eigenes-bauvorhaben` (Eigenes Bauvorhaben), `modernisierung` (Modernisierung), `anschlussfinanzierung` (Anschlussfinanzierung), `kapitalbeschaffung` (Kapitalbeschaffung) | Always |
| `objekt` | Objekt bereits gefunden? | single-select | `ja` (Ja), `nein` (Nein) | Always |
| `immobilienart` | Immobilienart | single-select | `eigentumswohnung`, `mehrfamilienhaus`, `doppelhaushaelfte`, `reihenendhaus`, `grundstueck`, `reihenmittelhaus`, `wohn-geschaeftshaus`, `einfamilienhaus`, `zweifamilienhaus` | Only when `objekt === 'ja'` |
| `nutzung` | Nutzung | single-select | `selbst-nutzen` (Selbst nutzen), `vermieten` (Vermieten), `teilweise-vermieten` (Teilweise vermieten) | Always |
| `antragsteller` | Antragsteller | single-select | `allein` (Alleine), `zu-zweit` (Mit einer weiteren Person) | Always |
| `persoenlich.anrede` | Anrede (Antragsteller 1) | select | Herr, Frau, Divers | Always |
| `persoenlich.titel` | Titel (Antragsteller 1) | select | Dr., Prof., Prof. Dr. | Never |
| `persoenlich.vorname` | Vorname (Antragsteller 1) | text | — | Always |
| `persoenlich.nachname` | Nachname (Antragsteller 1) | text | — | Always |
| `mit.anrede` | Anrede (Mitantragsteller) | select | Herr, Frau, Divers | Only when `antragsteller === 'zu-zweit'` |
| `mit.titel` | Titel (Mitantragsteller) | select | Dr., Prof., Prof. Dr. | Never |
| `mit.vorname` | Vorname (Mitantragsteller) | text | — | Only when `antragsteller === 'zu-zweit'` |
| `mit.nachname` | Nachname (Mitantragsteller) | text | — | Only when `antragsteller === 'zu-zweit'` |

## Conditional logic

- `objekt = 'ja'` → `immobilienart` becomes required and relevant.
- `objekt = 'nein'` → `immobilienart` is irrelevant: hide it from validation, and clear any previously entered value (don't carry stale data for a field that's no longer applicable).
- `antragsteller = 'zu-zweit'` → the `mit.*` fields become required and relevant.
- `antragsteller = 'allein'` → `mit.*` fields are irrelevant: clear any previously entered values.
- `zweck` is a known future branch point for additional conditional fields (not yet specified — treat this as a documented open extension point in the logic, not something to guess at or hardcode).

## Validation & completion behavior

- Every field above has a computable state: **complete** or **incomplete**, based on the rules in the table (respecting the conditional relevance rules — an irrelevant field is never "incomplete", it's just not evaluated).
- Validation is **non-blocking**: there is no notion of disabling a save/submit action. The action can always be invoked.
- A `validate()` (or equivalent) function must be able to return, at any time: the full list of currently-relevant fields that are incomplete, keyed the same way as the field table above — so a caller can build a "jump to this field" affordance from it.
- Before the first save/submit attempt, incomplete fields should not be reported as *errors* — only as *not yet complete*. Only surface something as an actual validation error after a save/submit has been attempted at least once (avoid nagging while the user is still mid-entry).
- Text fields (`vorname`, `nachname` for both applicants) should support an on-blur completeness check independent of the global save action, so a caller can surface "this field is empty" as soon as the user leaves it — this is separate from the global validated/error state above.
- No entered data is ever cleared as a side effect of an incomplete/failed save attempt — only the explicit clearing behavior described in "Conditional logic" above (when a field becomes irrelevant) should reset a value.

## Reference/context data

Each field group needs to be able to carry an attached short string of "what's already known" — e.g., a note like "Exposé liegt bereits vor — Lindenstraße 14, 50674 Köln" for the `objekt` field group. This is because the whole point of the tool is transcription from a source the agent already has open, not first-time data collection. Model this as a plain data attribute per field group (e.g. `hint: string`); how/whether it's displayed is a UI decision, not part of this prompt.

Example seed data to use for testing to make sure this concept threads all the way to the state layer:

```
zweck:         "Laut Beratungsnotiz möchte die Kundin eine bestehende Eigentumswohnung kaufen."
objekt:        "Exposé liegt bereits vor — Lindenstraße 14, 50674 Köln."
immobilienart: "Laut Exposé: Eigentumswohnung, Baujahr 2016, 78 m²."
nutzung:       "Kundin zieht selbst ein, keine Vermietungsabsicht."
antragsteller: "Kundin ist verheiratet — Ehemann als Mitantragsteller vorgesehen."
persoenlich:   "Personalausweis liegt vor: Iva Petrova, geb. 03.05.1990."
mit:           "Personalausweis liegt vor: Michael Petrov, geb. 21.11.1988."
```

## Deliverable

- Plain state + pure functions (or equivalent for your stack): field state, conditional-visibility rules, completeness/validation, and the hint data — decoupled enough that a UI layer can be built and rebuilt against it without touching this logic.
- No styling, no layout, no component library opinions.
