# Usability Report — Bernd (Live Browser) / DigitalQA Doc Center V3
**Date:** 2026-06-15
**Prototype URL:** http://localhost:7654/doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html
**Primary task tested:** Understand the status of each document — specifically what "pending", "warning", and "rejected" mean — and find what action is required, before touching anything.
**Tester:** Bernd — Veteran Methodist persona (Playwright MCP)

---

## Task completion
- [x] Partial
- **Confidence level:** Frequently unsure — Bernd successfully navigated to the documents and read the Prüfungen panel, but could not confidently interpret the hourglass icon, the "!" warning triangle, or "Abgelehnt" as a concept, and found no Save button or undo signal before acting.

---

## What gave Bernd confidence
- The page heading "Dokumente für Melissa Mustermann" and the progress counter "5/25 Dokumente genehmigt" immediately orient him to the client and overall status. Clear and familiar.
- The group labels "Persönliche Dokumente" and "Immobilienunterlagen" match the folder categories Bernd knows from daily work.
- "IBAN nicht gefunden" in the Prüfungen panel is specific and plain German — Bernd understood the problem immediately.
- "Dokument unleserlich – bitte erneut scannen" and "Exposé veraltet (älter als 3 Monate)" as rejection reasons are written in clear, direct language. No ambiguity in the reason text itself.
- "Aktuelles Exposé (neu)" appearing below "Exposé" with the label "Angefordert" shows that an action was already taken — that text label gave Bernd meaningful context.
- "Notiz für Kunde" as a teal underlined link inside the rejection reason is a visible, conventional affordance that Bernd recognised as clickable.

---

## Confusion and hesitation points

| # | Where | What caused the pause | Severity |
|---|-------|----------------------|----------|
| 1 | Left panel — document list | The `hourglass_empty` icon appears on "Gehaltsabrechnung Juli", "Gehaltsabrechnung August", "Baubeschreibung", "Aufenthaltstitel" with no text label. Bernd cannot tell whether this means "system is processing", "awaiting client action", or "awaiting bank review." These are three very different situations. | 3 |
| 2 | Left panel — document list | The orange warning triangle is rendered as a bare `!` image with no text label and no tooltip affordance (no underline, no "?" icon, no other visual signal). Bernd did not hover and received no information about what the warning means. Affects: Gehaltsabrechnung Juli, Beidseitige Ausweiskopie, Aufenthaltstitel, Wohnflächenberechnung. | 3 |
| 3 | Group heading — "Unkategorisiert" | The label "Unkategorisiert" with icon "folder_open" and count "0/1" gives no indication of who is responsible for the uncategorised document — Bernd, the client, or the system. Bernd does not know whether he must act or wait. | 2 |
| 4 | Group row — click behaviour | Clicking the group heading row ("Persönliche Dokumente") immediately loaded the first document in the main panel without expanding a visible document list first. Bernd expected the group to expand to show a list, then he would choose which document to open. The auto-selection felt like the system acting without his instruction. | 2 |
| 5 | Main panel — "Dokument genehmigen" button | On "Gehaltsabrechnung Juli," the "Dokument genehmigen" button was visibly disabled (grey). No tooltip or label explained why it was disabled. Bernd could not tell if it was disabled because of the failed Prüfung, because of a permission issue, or for another reason. | 2 |
| 6 | Prüfungen panel — "Manuell freigeben" button | The button "Manuell freigeben" appears next to "Kontoauszug anfordern" without any explanatory text about consequences. Bernd does not know: Does this override all checks? Does it notify the bank? Can it be undone? He would not click this without more information. | 3 |
| 7 | Prüfungen panel — "Exposé" rejection items | Both rejection items for Exposé are shown with green checkmarks, suggesting they are resolved. But the document title bar still shows a red X (rejected). The mismatch between green checks on individual items and the overall red-rejected status on the document is confusing — Bernd is unsure whether the document is still rejected or now resolved. | 2 |
| 8 | Prüfungen panel — "Zurücksetzen" buttons | The "Zurücksetzen" button appears next to each resolved rejection item on the Exposé document. Bernd does not know what "reset" means in this context — does it un-request the new document? Does it reopen the failed check? There is no explanation and no confirmation step. | 2 |
| 9 | Entire screen — no "Abgelehnt" label | The status "Abgelehnt" (rejected) is never shown as a text label anywhere. Only the red cancel icon. Bernd cannot distinguish between an automated QA system rejection and a formal bank rejection — two situations that have very different consequences for his workflow. | 3 |
| 10 | PDF filename vs. document title | The PDF viewer showed the filename "gehaltsabrechnung-august.pdf" while the document title in the header read "Gehaltsabrechnung Juli." Bernd noticed this discrepancy and was briefly uncertain whether he was looking at the right document. | 1 |

---

## Interactive states discovered

- **Group expand/collapse:** Clicking the chevron arrow on a group row toggles collapse. When expanded, document rows appear as a list below the group heading. However, clicking the same chevron also triggers auto-selection of the first document in the main panel — expand and select are coupled, which Bernd found surprising.
- **Prüfungen panel — loaded correctly:** When "Gehaltsabrechnung Juli" was opened, the Prüfungen panel appeared with the failed check ("IBAN nicht gefunden") and two action buttons. This state loaded without error.
- **Rejection reasons for Exposé — fully readable:** Both rejection reasons ("Dokument unleserlich" and "Exposé veraltet") loaded and were readable. Each had a "Zurücksetzen" button and a "Notiz für Kunde" link.
- **Bestandene Prüfungen (3) — collapsed, not expanded:** Bernd did not expand this section. It was visible as a collapsed button but not opened during the session.
- **Warning tooltip on orange triangle — NOT triggered:** No affordance (underline, "?" icon, cursor-change signal) was visible on the orange warning triangle. Bernd did not hover. The tooltip state, if it exists, was never reached.
- **Blue "i" info icon on Exposé and Energieausweis:** This icon is a conventional tooltip affordance. It was noticed but not hovered during this session (outside step scope). It represents a discoverable state that Bernd might try in real use.
- **Save/confirmation state after panel action:** No save state was observed because Bernd did not click any action buttons. No auto-save indicator was visible at any point during the session.
- **Sidebar status icon updates:** Not observed — no document was actioned during the session.
- **"Dokument genehmigen" disabled state:** Correctly visible as disabled (greyed out) on the Gehaltsabrechnung Juli document. No tooltip explaining why.

---

## Missing trust signals

- **No text label on status icons.** Every status in the document list is communicated by icon alone: `hourglass_empty`, `check_circle`, `cancel`, orange triangle (`!`). Bernd needs at minimum a short text label — "In Prüfung", "Genehmigt", "Abgelehnt", "Warnung" — either inline or in an accessible tooltip with a conventional trigger.
- **No label "Abgelehnt" anywhere.** The concept of rejection is communicated entirely by a red X icon. In a legally significant workflow, the status must be named in text.
- **No Save button and no auto-save signal.** After clicking "Manuell freigeben" or "Kontoauszug anfordern," does the system save immediately? Permanently? Is there an undo? There is no visual confirmation of any kind. Bernd would not feel safe clicking those buttons.
- **No explanation of "Manuell freigeben" consequences.** A short inline note — "Setzt die automatische Prüfung außer Kraft und genehmigt das Dokument" — would give Bernd enough information to act. Without it, he stops.
- **No explanation of "Zurücksetzen" consequences.** Same problem. What does reset mean for the downstream workflow?
- **No actor/timestamp on resolved Prüfungen items.** The green checks on Exposé's rejection items show that actions were taken, but not by whom or when. "Dokument erneut angefordert" — by me? By the system? Yesterday or three weeks ago?
- **No explanation of "Unkategorisiert" responsibility.** A short subheading or tooltip — "Vom Kunden hochgeladen, noch nicht zugeordnet" — would immediately clarify who must act.
- **"Dokument genehmigen" disabled with no explanation.** Bernd looked for a reason. A tooltip on the disabled button saying "Nicht möglich: Offene Prüfung ausstehend" would resolve his confusion instantly.

---

## In-character quotes

> "Gehaltsabrechnung Juli — there's a grey hourglass. Does that mean the system is still checking it? Or does it mean the client hasn't done something? These are very different things and I need to know which one it is."

> "There's a warning triangle with an exclamation mark. I see it on three documents. But what is the warning? I'm not going to hover over it just to find out — there's nothing there that tells me something will happen if I do."

> "IBAN nicht gefunden — alright, I understand that. The system expected to find an IBAN and didn't. But now 'Manuell freigeben' — if I click that, does that override everything? Does the bank then see this as approved? I cannot press that without knowing what it commits me to."

> "Where is the Save button? I'm used to pressing Save. Here I don't see one. Does clicking 'Manuell freigeben' save automatically? Or do I need to do something else first?"

> "Exposé — red X. Rejected. But rejected by whom? The system? The bank? If this is a bank rejection, the client needs to know. If it's just an automated check, maybe I can fix it myself. I cannot tell from this screen which it is."

> "The Prüfungen for Exposé show green checkmarks — but the document is still marked with a red X. Does that mean it's still rejected even though I apparently already took action? I'm lost."

---

## Checklist ratings

| # | Item | Rating (1–5) |
|---|------|----------|
| 1 | Status icons have text labels — I don't have to guess from icons alone | 2 |
| 2 | Warning tooltip is discoverable without prior knowledge that hover reveals it | 1 |
| 3 | "Abgelehnt" is clearly distinguished from a formal bank rejection | 1 |
| 4 | Action buttons in Prüfungen panel tell me enough to act confidently | 3 |
| 5 | Auto-save is clearly signalled — or there is an explicit Save button | 1 |
| 6 | "Unkategorisiert" group makes clear who is responsible for those documents | 1 |

---

## Top 3 recommendations

1. **Add text labels to all status icons in the document list.** Every document row must show a short status label alongside its icon: "In Prüfung", "Genehmigt", "Abgelehnt", "Warnung". Icon-only status communication fails for advisors who need to form a mental model of the whole list before clicking anything. The label can be visually small (microcopy) but must be present.

2. **Explain action button consequences inline before the click — especially "Manuell freigeben" and "Zurücksetzen".** Both buttons carry significant consequences in a compliance-relevant workflow. Add a single sentence of helper text below each button: what it does, whether it is reversible, and who will be notified. If the consequence is irreversible, add a confirmation dialog.

3. **Give the "Unkategorisiert" group an owner statement, and clarify the hourglass semantics system-wide.** "Unkategorisiert" needs a subtitle or tooltip stating who is responsible (e.g. "Vom Kunden hochgeladen — bitte zuordnen"). The hourglass icon must be labelled to distinguish between "System prüft" (no action needed), "Warte auf Kunden" (client must act), and "Warte auf Bank" (advisor must follow up). These are three states that drive completely different next actions.

---

## Bernd's overall verdict

This screen has a solid information architecture — the right categories, the right groupings, the right level of detail in the Prüfungen panel. But I would not use it with real client data in its current state. Every time I need to decide whether to act, I am missing either the label that explains what I'm looking at or the confirmation that tells me what I'm about to do. In my work, a mistake in document status can delay a mortgage approval by weeks. I need to be certain before I click anything here — and right now, I am not.
