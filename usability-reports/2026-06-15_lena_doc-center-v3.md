# Usability Report — Lena / DigitalQA Doc Center V3
**Date:** 2026-06-15
**Prototype URL or file:** `doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html`
**Primary task tested:** Scan the document list, identify everything that needs action, and understand what to do next — without reading every document entry in detail.
**Tester:** Lena — Lead-Hungry Closer persona

---

## Task completion
- [ ] Completed / [x] Partial / [ ] Failed
- **Time feel:** acceptable — I can get through the triage, but the layout doesn't make it effortless. I'm doing work the screen should do for me.

---

## In-session narration (full stream of consciousness)

**Step 1 — First impression**

Okay, the page loads. Full-screen layout — header at the top, left sidebar, main viewer panel, narrow page-thumbnail rail on the right. My eye goes to the header first: "Dokumente für Melissa Mustermann." Good, I know whose file this is. Below the name there's a progress line — "5/25 Dokumente genehmigt" and a thin teal bar that is maybe 20% filled. This case is nowhere near done. That registers immediately. I like it.

The sidebar is all collapsed on load. Three card-like rows with expand arrows and counter chips. I see nothing actionable yet — no individual documents, no warning icons. It's just three closed boxes. Before I've clicked anything, the screen is inert. I want a reason to act, and right now I'm just looking at three folder handles.

I notice "Persönliche Dokumente" has a teal "2 Neue" chip and a "0/5" counter. That chip is the first thing after the header that tells me something is waiting for me. I click it to expand the group.

**Step 2 — Scanning the document groups**

Okay, Persönliche Dokumente is open. I also open Immobilienunterlagen. Both open at the same time on screen because I scrolled down.

The group icons — folder, person, home — give me the context split without any reading. Person = personal docs, home = property docs, folder = uncategorized junk pile I'll deal with last. Good. I didn't have to read the labels to understand the grouping.

The "2 Neue" chip on Persönliche Dokumente catches my eye correctly. But the 0/5 counter next to it is... telling me what's done, not what's broken. I want to know how many need my attention. "0 approved out of 5" gives me the same information as "5 not approved" but framed the wrong way. I'm a triage machine, I want the negative count visible.

One frustration immediately: clicking a group header not only expands it but also auto-selects the first document inside and loads it into the viewer panel. I didn't ask for that. I wanted to see the list first, then choose what to open. Auto-selecting the first document forces me to react to something I didn't choose. Feels like the screen is trying to be helpful but just jumps ahead of me.

**Step 3 — Finding documents with a warning status**

Now I'm scanning the rows. I'm looking for colored icons — I know from tools like Immoscout that orange usually means warning.

Status icons sit on the LEFT of the document name: gray hourglass = pending, green check = ok, red circle-X = rejected. Warning triangle icons sit on the RIGHT of the document name. That's two completely different scan zones. To get the full status picture of any row, I have to check both ends. That extra eye movement adds up across 14 documents.

I spot orange triangles (warning badges) on the right side of these rows:
- Gehaltsabrechnung Juli
- Beidseitige Ausweiskopie
- Aufenthaltstitel
- Wohnflächenberechnung

Four warning documents. I found them in roughly 8–10 seconds once both groups were expanded. Not bad — the orange triangle is visually distinctive enough. But I needed both groups to already be open, and I found them by scanning the right column only. Anyone who scans left-to-right (reading names first) will hit the pending icon on the left and never make it to the warning icon on the right before mentally moving to the next row. The warning badge is the most important signal on the row and it's buried at the end.

**Step 4 — Clicking / hovering the first warning**

I hover over the orange triangle on Gehaltsabrechnung Juli. After about 200ms a tooltip pops up. It's clean: amber header "1 Hinweis," one bullet, "IBAN nicht gefunden." Specific, useful, instant. Good.

Now I click the warning triangle. Nothing happens. The click is blocked — the triangle fires stopPropagation but doesn't do anything itself. That's a dead end. I hover to learn what the warning is, but I can't click to do anything about it from there. I expected the click to either open the document or show me the action buttons inline. Instead I have to separately click the document row itself to open it in the viewer, then find the action buttons in the Prüfungen panel. That's two steps where I expected one.

The hover delay of 200ms is appropriate — I don't mind it. But the tooltip disappears the instant I move off the icon, which means if I'm reading a longer warning message and my mouse drifts even slightly, it's gone. I have to re-hover. That's minor but it happens more than once during a real triage session.

**Step 5 — Finding rejected documents (Exposé, Energieausweis)**

Exposé and Energieausweis are in Immobilienunterlagen. Both have a red filled circle-X icon on the LEFT of their names. Found them in about 3 seconds — the red is visually loud.

Is rejected visually distinct from warning at a glance? Technically yes — different icon, different color. But they live in different columns. Rejected = left column, warning = right column. So "rejected" and "warned" are never visually competing or directly comparable. I don't get a sense at a glance of "this row has a rejected status AND a secondary warning" versus "this row has only a warning." I have to process two separate zones per row to understand the full health state.

Exposé has a child slot below it — "Aktuelles Exposé (neu)" — indented with an amber dashed connector line and a "Angefordert" chip. I notice this without any prompting. Someone already asked for a replacement document. I can see that this item is being handled. That's actually well done — the visual indentation and the dashed line say "this is a child of the row above" without any label.

Energieausweis: the code overrides its status to 'ok' after a manual release was seeded. So in the sidebar it actually shows a green check, not the red circle-X. This confused me initially — I was expecting a rejected document but the list shows it as approved. If I were a new advisor taking over this file, I would see a green check and never know there was previously a rejection issue resolved manually. There's no visible "this was manually released" signal in the sidebar row itself.

**Step 6 — Deciding on next action**

I've triaged the list:
- 4 documents with open warnings
- 1 document rejected with slot already created (Exposé — handled)
- 1 document with override-approved status (Energieausweis — I can't tell from the list alone that this was problematic)

What do I do next? There's no "here are 4 items needing action" summary. The header says "5/25 genehmigt" — that's a state metric, not an action queue. I have to manually count warnings by scanning. I'm counting warning triangles like I'm reading a spreadsheet. This should not be manual.

I click Gehaltsabrechnung Juli to open it. The Prüfungen panel appears at the top of the viewer with the fail check highlighted: red icon, "IBAN nicht gefunden," and two action buttons — "Kontoauszug anfordern" (green, primary) and "Manuell freigeben" (outlined). The right action is obvious and the buttons are clearly labeled. Once I'm in the document view, I know exactly what to do.

But getting here required: expanding groups, scanning both columns, remembering which documents had warnings, clicking the right row, waiting for the viewer to load. That's 4–5 steps for what should be 1–2 taps.

---

## What worked well

- The header progress block ("5/25 Dokumente genehmigt" + progress bar) gives me an immediate macro view of how far along the case is. I didn't need to read anything to understand it.
- Group icons (person, home, folder) give semantic meaning without requiring label reading. I understood the split instantly.
- The "2 Neue" teal chip on Persönliche Dokumente drew my attention correctly before I'd done anything else.
- Hover tooltip on the warning triangle is specific and fast — "IBAN nicht gefunden" is exactly the information I need to qualify the severity of the issue.
- Supporting document slot indentation with amber dashed connector is visually clear. I understood the parent-child relationship without any label or explanation.
- Action buttons inside the Prüfungen panel (once in the document view) are well-labeled, primary/secondary hierarchy is clear, and there's no ambiguity about what clicking them does.
- Approved-count format in the group header (e.g. "0/5") gives a quick density read for each category.

---

## Friction points

| # | Where | What happened | Severity (1–3) |
|---|-------|--------------|----------------|
| 1 | Sidebar — group headers (all groups collapsed on load) | All groups start collapsed. I can't scan any document status without first expanding every group. The screen opens in a state that shows me nothing actionable. If I had 5 groups, I'd be clicking expand 5 times before I could even start triage. | 2 |
| 2 | Sidebar — group header click behavior | Clicking a group header to expand it auto-selects and loads the first document in the viewer panel. I didn't ask to open a document — I wanted to see the list. This forced a document into focus before I chose one. The expand and the selection should be decoupled. | 2 |
| 3 | Sidebar — warning badge position (far right, split from doc status icon on far left) | Rejected/ok/pending status is shown on the LEFT of the row. Warning badge is on the RIGHT. To understand the full health of any document row, I have to scan both ends. High-urgency warning signal should not be the furthest element from my starting read position. | 2 |
| 4 | Sidebar — warning triangle is not clickable | Hovering the warning triangle shows the warning reason (good). Clicking it does nothing — the event is stopped. I expected a click to either open the document or surface an action inline. A dead click on an interactive-looking icon is disorienting. | 2 |
| 5 | Sidebar — no "needs action" counter or filtered view | There's no at-a-glance count of documents that require my intervention. "5/25 genehmigt" tells me how many are done. But I want to know: how many have open warnings, how many are rejected and not yet handled. Without this, I'm manually scanning and counting. | 3 |
| 6 | Sidebar — Energieausweis shows green check (status override) with no visual hint of prior rejection | After a manual release was applied, Energieausweis shows as "Genehmigt" in the sidebar. There is no indicator in the row that this approval required a manual override. A new advisor reviewing this file would see a green check and assume everything is fine, with no way to know a human judgment call was made. | 2 |
| 7 | Tooltip dismiss on mouse leave | Warning tooltip disappears the instant the cursor leaves the icon area. When reading a multi-word warning reason, any small mouse drift kills the tooltip and requires re-hovering. For long warning texts this becomes repeated extra work. | 1 |
| 8 | No action available from the list level | To act on a warning or rejection, I must: expand group, identify the row, click to open in viewer, read Prüfungen panel, click action button. I cannot trigger any action from the document list itself. The list is read-only. For a high-frequency triage workflow, surfacing even one primary action at the list level (e.g. "request document" inline button on hover) would save multiple clicks per document. | 3 |

---

## In-character quotes

> "Why are all the groups closed when I open this? I have to click three expand arrows before I can even see if anything's broken. That's three clicks I didn't need to waste."

> "Okay I see the orange triangles — but they're at the far right end of the row. The reject icon is at the far left. I'm scanning both sides of every single row like a ping-pong match."

> "I hover the warning, I get the message, fine. Now I click it — nothing. Why does it look clickable if clicking it does nothing? Don't make me think a button is a button if it isn't."

> "Five out of twenty-five documents approved. I can see that in the header. What I cannot see anywhere is: four documents have open warnings. That number should be screaming at me from the top of the page."

> "Once I'm inside the document, the action buttons are great. 'Kontoauszug anfordern' — obvious, green, right there. I click it. Done. But I had to drill three levels to get here when the warning was already visible in the list."

> "Energieausweis is green in the sidebar. I almost moved on. I only know it was rejected and manually released because I was paying close attention. Another advisor would just skip it."

---

## Checklist ratings

| # | Item | Rating |
|---|------|--------|
| 1 | At-a-glance: I can tell how many items need my attention without reading every row | 2 — I have to scan every row in every expanded group and count warning triangles manually. No summary count of actionable items exists. |
| 2 | Warning vs. rejected is visually distinct — no risk of confusing them | 3 — They are different icons and different colors, so confusion is low. But they live in different columns (rejected left, warning right), which means I process them in separate visual passes rather than in a single glance at one status zone. |
| 3 | Warning detail (tooltip or expanded state) appears fast and without friction | 4 — Tooltip fires at 200ms, content is specific and useful. Deducted one point because the tooltip dismisses on any mouse movement, requiring re-hover to re-read, and because clicking the warning icon does nothing. |
| 4 | Document names are scannable — long names don't break the layout | 3 — Most names fit, but "Beidseitige Ausweiskopie (gültiger EU-Personalausweis oder Reisepass)" and "Wohnflächenberechnung (mit Angabe von Länge und Breite je Raum)" are very long and truncation is not applied — they wrap to multiple lines and push the warning badge down or away, disrupting the row rhythm during fast scanning. |
| 5 | Clear next action after understanding the document status | 3 — Inside the document viewer the next action is clear and well-executed. But arriving there requires multiple steps, and there is no path to action from the list level itself. |
| 6 | Group labels and icons add value — I don't ignore them | 4 — The icons (person, home, folder) provide real meaning and I used them to mentally categorize without reading. The "Neue" chip adds urgency signal. The 0/N counter is present but framed as "approved" rather than "needs action," which slightly misdirects attention. |

---

## Top 3 recommendations

1. **Add an "action needed" summary counter to the header or sidebar top.** A single line like "4 Dokumente mit offenem Hinweis · 1 Dokument abgelehnt" at the top of the sidebar (or in the header next to the progress bar) would let me triage in under 2 seconds. Right now that number exists only in my head after I've scanned the entire list.

2. **Unify the status signal zone — move the warning badge to sit immediately next to the doc-status icon, not at the far right.** The left column already carries pending/ok/rejected icons. Put the warning triangle right next to them (e.g. immediately to the right of the doc-status icon, before the document name). One glance at the left cluster gives me the full status picture: green check = clean, gray hourglass = waiting, red circle-X = rejected, orange triangle = warned. Currently I'm scanning left AND right on every row.

3. **Make the warning badge clickable with a direct action.** Hovering to learn is good. But clicking the warning triangle should open the document and scroll directly to the Prüfungen panel, or — even better — show a small inline action chip (e.g. "Anfordern" or "Freigeben") on the row itself, visible on hover. Right now the warning icon is informational-only and clicking it is dead. In a triage workflow, every high-signal element should be a launch point for the next action, not just a label.

---

## Lena's overall verdict

There's a good skeleton here — the group structure makes sense, the Prüfungen panel in the document view has exactly the right action buttons, and the supporting-slot concept for requested documents is genuinely clever. But as a triage tool? It makes me do too much manual searching before I can act. I land on a screen full of collapsed groups with no action queue, I have to expand everything, count warning icons across two different columns, then drill into each document individually just to reach the "fix it" button. If I'm working through a stack of cases, that friction compounds fast. Fix the action count in the header, consolidate the status zone into one column, and make the warning icon clickable — then this earns a permanent spot in my workflow.
