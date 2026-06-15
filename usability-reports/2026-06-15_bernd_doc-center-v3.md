# Usability Report — Bernd / DigitalQA Doc Center V3
**Date:** 2026-06-15
**Prototype file:** `doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html`
**Primary task tested:** Review the document list for a client's mortgage application and understand the status of each document — specifically what "pending", "warning", and "rejected" mean, and what action is required for problem documents.
**Tester:** Bernd — Veteran Methodist persona

---

## Task completion
- [x] Partial
- **Confidence level:** Hesitant but succeeded — Bernd was able to locate problem documents and read the Prüfungen details, but carried unresolved doubts about what certain statuses mean and whether his actions were being saved.

---

## What gave Bernd confidence

- The page heading "Dokumente für Melissa Mustermann" immediately confirmed he was in the right client's file. Clear client ownership is the single most important trust anchor for Bernd.
- The "5/25 Dokumente genehmigt" counter with the green progress bar gave him an at-a-glance sense of how much work remained. He understood it as a completion indicator, similar to a checklist.
- The group labels "Persönliche Dokumente" and "Immobilienunterlagen" matched the mental categories he uses in daily practice. "Immobilienunterlagen" in particular is exact language he uses himself.
- The Prüfungen table inside the document viewer (once a document was opened) was the single most reassuring element on the page. It showed the problem in plain German text — "IBAN nicht gefunden" — with labelled action buttons ("Kontoauszug anfordern", "Manuell freigeben"). Bernd could read this without any hovering or guessing.
- Action buttons in the Prüfungen table carry word labels, not just icons. Bernd read them and understood what they would do (at least for "Kontoauszug anfordern").
- The "Abbrechen" link in modals (mentioned in code review) matches his expectation that every confirm action has an exit. He would check for this before clicking any confirm button.

---

## Confusion and hesitation points

| # | Where | What caused the pause | Severity |
|---|-------|----------------------|----------|
| 1 | Sidebar — status icons on every document row | The grey hourglass, green checkmark, and red X have no accompanying text label. Bernd had to infer meaning from icon shape and colour alone. He knew the green check was good and the red X was bad, but he was uncertain what the grey hourglass meant — "is it processing? waiting for me? waiting for the client?" In Europace there is always a text status label next to every item. | 2 |
| 2 | Sidebar — "Abgelehnt" status on Exposé and Energieausweis | Bernd reads "Abgelehnt" (rejected) as meaning the bank has formally turned down the document — a serious, final decision. Here it means the automated QA has flagged the document as failing checks. These are very different things in his mental model. He hesitated and re-read. He felt uncertain about the severity. | 3 |
| 3 | Sidebar — orange warning triangle alongside a green checkmark (e.g. Wohnflächenberechnung) | Bernd saw a document showing a green check (approved) AND an orange warning triangle at the same time. This is contradictory to him. "If it's approved, why is there a warning? Should I be doing something about this or not?" He would not know whether to act on this document or leave it. | 3 |
| 4 | Sidebar — orange warning triangle: no visible affordance to hover | The warning triangle in the sidebar is the only place where the specific warning text ("IBAN fehlt auf der Gehaltsabrechnung") lives at the list level. But there is no visual cue inviting hover — no dashed underline, no "?" badge, no cursor hint. Bernd is not a hover-explorer. He might never discover the tooltip in the sidebar. He would rely entirely on opening the document to read the Prüfungen table. | 2 |
| 5 | Document viewer header — two unlabelled circular buttons (checkmark circle, X circle) | At the top of the document viewer, there are two small circular outline buttons. One has a checkmark and one has an X. These have no visible text label — only a hover tooltip. Bernd looked at them and could not immediately determine what they do. "Is the X for rejecting the document? Or for closing this view? Or does clicking it send something to the client?" He would not click either until he understood them, and he might never hover to find the tooltip. | 2 |
| 6 | Sidebar status vs. Prüfungen status mismatch for Exposé | The Exposé in the sidebar shows a red X (Abgelehnt). But when opened in the viewer, the Prüfungen checks show "angefordert" — meaning the advisor has already acted. The sidebar status did not update to reflect this resolved state. Bernd would see a contradiction: "I thought someone already dealt with this, but it still says rejected. Did my action not go through?" This could cause him to repeat work or distrust the system's record-keeping. | 3 |
| 7 | "Manuell freigeben" button in Prüfungen table | Next to "Kontoauszug anfordern" sits "Manuell freigeben." Bernd would read this as: override the QA check and mark it as passed without evidence. He is cautious with irreversible-sounding actions. He finds no help text or tooltip explaining when this is appropriate. He would not click it without understanding the consequences, and there is nothing on the screen to help him understand them. | 2 |
| 8 | No visible Save button anywhere on the page | Bernd looked for a Save button before doing anything. He did not find one. There is no autosave indicator (e.g. "Alle Änderungen gespeichert" in the header). Every action he takes — approving a document, adding a note, requesting a document — appears to take effect immediately via toast notifications, but there is no persistent "this session's work is saved" indicator. He would feel anxious about whether his actions persisted. | 2 |
| 9 | Footer version string in the sidebar | At the very bottom of the sidebar, visible to any user, is the text "FE: main@c297573658 | BE: main@c297573658." Bernd read this and did not know what it was. It looks like a developer debug line. It would make him feel the software is unfinished, and he would be uncomfortable using it with a real client's file. | 1 |
| 10 | "Sichtbar" toggle button in the sidebar source bar | Just below the "FinLink" dropdown, there is a green pill button labelled "Sichtbar" with a visibility icon. Bernd would read this as: this controls what the client can see. But he does not know what "this" refers to — is it the whole document list, or the selected document, or some other setting? He would not click it until he understood, and there is no tooltip or help text visible. | 2 |

---

## Missing trust signals

- **Text status labels alongside status icons in the sidebar.** Bernd expects to read a word, not just interpret a colour and shape. "Ausstehend", "Genehmigt", "Abgelehnt" as visible microcopy next to each document row would immediately communicate status without relying on icon literacy.
- **A persistent "changes saved" indicator.** Bernd looks for this before and after every action. A small "Zuletzt gespeichert um 14:32" or "Alle Änderungen gespeichert" in the header would substantially reduce his anxiety.
- **Explanation of what "Abgelehnt" means in this context.** A brief note — either inline, or in a tooltip on the status icon — clarifying that "Abgelehnt" means the automated QA check has flagged this document, not the bank, would prevent the misread Bernd experienced.
- **Help text for "Manuell freigeben."** Even a short description ("Nur verwenden, wenn Sie den Prüffehler manuell bestätigen können") would help Bernd decide whether this button is appropriate for him to use.
- **Resolution of the sidebar vs. viewer status mismatch.** When checks have been actioned ("angefordert" / "manuell freigegeben"), the sidebar icon should reflect that resolved state, not continue to show the original rejected icon.
- **An affordance on the warning triangle.** A dashed underline, a subtle "i" indicator, or even the word "Details" next to the triangle would signal to Bernd that more information is available without requiring him to discover hover behaviour independently.

---

## In-character quotes

> "Dokumente für Melissa Mustermann — gut, das ist die richtige Kundin. Aber 5 von 25 genehmigt? Da haben wir noch einiges vor uns."

> "Hier sehe ich ein graues Kreis-Symbol mit einem Sanduhr-Icon. Was bedeutet das genau? Liegt das Dokument noch beim Kunden, oder prüft das System noch, oder wartet es auf mich? Das steht nirgends."

> "Abgelehnt — das ist ein ernstes Wort. Bei Europace bedeutet das, die Bank hat Nein gesagt. Ist das hier dasselbe? Oder hat nur das System intern etwas nicht gefunden? Das müsste irgendwo erklärt werden."

> "Ich sehe hier bei der Wohnflächenberechnung ein grünes Häkchen und gleichzeitig ein orangenes Dreieck. Das passt für mich nicht zusammen. Entweder ist das Dokument in Ordnung, oder es ist es nicht. Beides gleichzeitig verunsichert mich."

> "Kontoauszug anfordern — das verstehe ich. Aber was ist 'Manuell freigeben'? Soll ich damit den Fehler einfach wegklicken? Das würde ich nicht machen, ohne zu wissen was das bedeutet."

> "Wo ist der Speichern-Button? Ich klicke hier irgendwas und es passiert sofort etwas. Hat das jetzt gespeichert? Werde ich irgendwo bestätigt, dass meine Aktion durchgegangen ist?"

> "Hier unten in der Liste steht: 'FE: main@c297573658'. Was ist das? Das sieht aus wie ein Programmierfehler. Das würde ich einem Kollegen zeigen und fragen, ob das System richtig installiert ist."

---

## Checklist ratings

| # | Item | Rating |
|---|------|--------|
| 1 | Status labels ("pending", "warning", "rejected") match terminology Bernd knows from his workflow | 2 — "Ausstehend" and "Genehmigt" are recognisable German terms; "Abgelehnt" triggers a serious misread because in Bernd's workflow "rejected" means bank refusal, not QA failure. The labels exist only in tooltips or inside the viewer, not as visible sidebar text. |
| 2 | Warning details are discoverable — Bernd finds the tooltip or note without being told it exists | 3 — Once a document is clicked and the viewer opens, the Prüfungen table shows the warning text clearly without any hover. This path works. The sidebar tooltip on the orange triangle is not naturally discovered without hover behaviour that Bernd does not initiate by default. |
| 3 | "Rejected" vs "pending" vs "warning" are clearly distinguished with words, not just colour | 2 — In the sidebar, distinction is icon-only (red X, grey hourglass, orange triangle). No text label is visible per row without hovering. The Prüfungen table in the viewer uses coloured badges with text labels (Bestanden, Nicht erfüllt, Warnung), which is better — but only visible after selecting a document. |
| 4 | There is a visible next action after reading a problem document | 4 — The Prüfungen table provides clearly labelled action buttons per failing check. This is the strongest part of the interaction for Bernd. The slight deduction is for "Manuell freigeben" lacking explanation, and for the document-level buttons at the top of the viewer being unlabelled. |
| 5 | Document names are fully readable — none are truncated without access to the full text | 3 — Most short names ("Exposé", "Baubeschreibung") are fully readable. Long names ("Beidseitige Ausweiskopie (gültiger EU-Personalausweis oder Reisepass)", "Bemaßte Baupläne (evtl. fehlende Maßangaben bitte zwingend ergänzen)") are clipped in the sidebar list column. Bernd cannot read the full name without clicking into the document, where it appears in the viewer header — but even there it uses a "truncate" CSS class. |
| 6 | The grouped structure feels familiar and mirrors how Bernd organises a file folder | 4 — "Persönliche Dokumente" and "Immobilienunterlagen" are close enough to Bernd's own folder naming that he recognised them immediately. The collapsible accordion structure with counts is readable. The only friction is "Unkategorisiert" which has no equivalent in his mental model and raises the question of who is responsible for it. |

---

## Top 3 recommendations

1. **Add visible text status labels to every sidebar document row.** Bernd reads text before he interprets icons. A microcopy label ("Ausstehend", "Genehmigt", "Abgelehnt") visible directly next to the status icon — without requiring hover — would eliminate the single largest source of hesitation in the session. Given the density of the sidebar, even a 10px label in neutral-500 would be sufficient. This also resolves the "Abgelehnt"-misread risk by making the label contextually clarifiable (e.g. "Abgelehnt von System" vs "Abgelehnt von Bank").

2. **Synchronise the sidebar document status icon with the outcome of advisor actions.** When a Prüfungen check has been actioned ("angefordert" or "manuell freigegeben"), the sidebar icon should move away from the red X state and show something that signals work-in-progress resolution — for example, an "Angefordert" badge or a changed icon colour. Bernd trusts a paper trail. If he acts on something and the status does not visibly change, he will either assume his action failed or repeat it.

3. **Add a persistent save or sync confirmation indicator to the header.** Bernd's greatest background anxiety throughout the session was: "Is this saving?" A small, non-intrusive line in the header ("Zuletzt gespeichert: heute, 14:32") or a brief autosave indicator after each action would close this loop. The existing toast notifications help, but they disappear after 8 seconds. Bernd needs to be able to look at the screen at any time and verify that his session state is persisted — not just right after an action.

---

## Bernd's overall verdict

> "Ich verstehe ungefähr, was dieses System macht, und ich kann die Dokumente finden und die Fehler lesen — das ist gut. Aber ich wäre nicht bereit, das mit echten Kundendaten zu nutzen, bevor ich weiß was 'Abgelehnt' wirklich bedeutet, ob meine Aktionen wirklich gespeichert werden, und was passiert wenn ich auf 'Manuell freigeben' klicke. Das sind für mich keine kleinen Details, das sind Grundvoraussetzungen."
