# Interactive Brief — DigitalQA Doc Center V3 / Bernd (Live)

**File:** `file:///Users/karinhoffmann/Desktop/Prototypes/doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html`
**Agent:** bernd-veteran-methodist-live
**Date:** 2026-06-15

---

## Primary task

Bernd needs to understand the status of each document in the list — specifically what "pending", "warning", and "rejected" mean — and find what he is supposed to do about them, before touching anything.

---

## Steps (follow in this exact order)

1. **Navigate** to the file. `browser_snapshot`. Read the page carefully before doing anything. What is your understanding of what this screen is for? Do the labels match what you know from your daily work?

2. **Read the three group headings** without clicking. `browser_snapshot`. Do "Unkategorisiert", "Persönliche Dokumente", "Immobilienunterlagen" match concepts from your workflow? Who is responsible for "Unkategorisiert"?

3. **Click "Persönliche Dokumente"** to expand it. `browser_click`. `browser_snapshot`. Read every document name and its status icon. What does the grey hourglass mean? What does the orange triangle mean? Are these labels or just icons?

4. **Look for a tooltip affordance** on the orange warning triangle next to "Gehaltsabrechnung Juli". Do you see any signal that hovering would reveal information (underline, "?" icon, cursor change)? If yes, `browser_hover`. If no, narrate that you did not try.

5. **Click "Gehaltsabrechnung Juli"** to open it in the viewer. `browser_snapshot`. Read the Prüfungen panel carefully. Is the language ("IBAN nicht gefunden") clear? Do the action buttons ("Kontoauszug anfordern", "Manuell freigeben") tell you enough to use them confidently?

6. **Look for a Save button** anywhere on the screen. `browser_snapshot`. React — is auto-save signalled anywhere, or is the absence of a Save button unexplained?

7. **Click "Immobilienunterlagen"** to expand it. `browser_click`. `browser_snapshot`. Find "Exposé". Read its status. What does "Abgelehnt" mean to you — a formal bank rejection, or an automated QA check?

8. **Read the rejection details for Exposé** in the viewer. `browser_snapshot`. Are the rejection reasons in plain German? Is there a clear instruction for what to do next?

9. **Final snapshot.** Summarise: do you feel confident enough to use this screen with real client data? What is still unclear?

---

## Checklist (rate each 1–5 after completing the task)

| # | Item | Rating |
|---|------|--------|
| 1 | Status icons have text labels — I don't have to guess from icons alone | |
| 2 | Warning tooltip is discoverable without prior knowledge that hover reveals it | |
| 3 | "Abgelehnt" is clearly distinguished from a formal bank rejection | |
| 4 | Action buttons in Prüfungen panel tell me enough to act confidently | |
| 5 | Auto-save is clearly signalled — or there is an explicit Save button | |
| 6 | "Unkategorisiert" group makes clear who is responsible for those documents | |

---

## Interactive states to verify

- [ ] Warning tooltip on hover — is there a visual affordance before hovering?
- [ ] Prüfungen panel loads correctly when a document is clicked
- [ ] Rejection reasons for Exposé and Energieausweis are fully readable
- [ ] Any save/confirmation state after a panel action
- [ ] Sidebar status icon updates after a document is actioned (if applicable)

---

## Out of scope

- Uploading documents
- Navigation away from the doc center
- Mobile layout

---

## Report

Save to: `usability-reports/2026-06-15_bernd-live_doc-center-v3.md`
