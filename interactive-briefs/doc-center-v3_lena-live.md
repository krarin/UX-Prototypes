# Interactive Brief — DigitalQA Doc Center V3 / Lena (Live)

**File:** `file:///Users/karinhoffmann/Desktop/Prototypes/doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html`
**Agent:** lena-lead-hungry-closer-live
**Date:** 2026-06-15

---

## Primary task

Lena needs to triage the document list in under 60 seconds: spot everything with a warning or rejection, understand what's wrong, and find the action button to move forward — without reading every row.

---

## Steps (follow in this exact order)

1. **Navigate** to the file. `browser_snapshot`. First impression — what draws the eye immediately? React in character.

2. **Scan the sidebar groups** without clicking anything yet. `browser_snapshot`. How many groups? Do the labels tell you what's inside without expanding? React.

3. **Click "Persönliche Dokumente"** to expand the group. `browser_click`. `browser_snapshot`. React to what appears — how many docs, what statuses are visible at a glance?

4. **Hover over the warning triangle** next to "Gehaltsabrechnung Juli". `browser_hover`. `browser_snapshot`. What appears? Is the content useful? React in character.

5. **Click the warning triangle** on "Gehaltsabrechnung Juli". `browser_snapshot`. Does anything happen? React — a clickable-looking element that does nothing is friction.

6. **Click "Gehaltsabrechnung Juli"** to open it in the viewer. `browser_snapshot`. How quickly can you find the action button? React to the Prüfungen panel.

7. **Click "Immobilienunterlagen"** to expand it. `browser_snapshot`. Find "Exposé" and "Energieausweis". React — is "rejected" immediately distinct from "warning" without reading?

8. **Snapshot the full page** one final time. Summarise: how long did triage feel? What would you do next, and is that action obvious?

---

## Checklist (rate each 1–5 after completing the task)

| # | Item | Rating |
|---|------|--------|
| 1 | At-a-glance: I can tell how many items need my attention without reading every row | |
| 2 | Warning tooltip appears correctly on hover and content is immediately useful | |
| 3 | Warning triangle click either triggers an action OR is clearly non-interactive | |
| 4 | Warning vs. rejected is visually distinct — no risk of confusing them | |
| 5 | Action button in the document viewer is found within 3 seconds of opening | |
| 6 | Progress counter (5/25) communicates urgency, not just completion | |

---

## Interactive states to verify

- [ ] Warning tooltip appears on hover (Gehaltsabrechnung Juli, Beidseitige Ausweiskopie, Aufenthaltstitel, Wohnflächenberechnung)
- [ ] Clicking a warning triangle — does it navigate, open a panel, or do nothing?
- [ ] Document viewer loads and shows Prüfungen panel when a doc is clicked
- [ ] "Neue" chip is visible on the group header before expanding
- [ ] Sidebar group expand/collapse works correctly

---

## Out of scope

- Uploading or replacing documents
- The "Manuell freigeben" flow
- Navigation away from the doc center
- Mobile layout

---

## Report

Save to: `usability-reports/2026-06-15_lena-live_doc-center-v3.md`
