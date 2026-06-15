# Test Brief — DigitalQA Doc Center V3 / Bernd

**File:** `doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html`
**Persona:** bernd-veteran-methodist
**Date:** 2026-06-15

---

## Primary task

Bernd needs to review the document list for a client's mortgage application and understand the status of each document — specifically what "pending", "warning", and "rejected" mean, and what he is expected to do about them.

---

## Steps (follow in this exact order)

1. Open the prototype. Read the page carefully before doing anything. What is your understanding of what this screen is for?
2. Look at the document groups (Unkategorisiert, Persönliche Dokumente, Immobilienunterlagen). Read the labels. Do they match concepts you know from your existing workflow?
3. Find the document "Gehaltsabrechnung Juli". What is its status, and what does that status mean to you?
4. Try to find out why it has a warning. Look for any tooltip, note, or help text. Describe what you find and whether it reassures you.
5. Find the document "Exposé" in Immobilienunterlagen. Read its status. What does "rejected" mean in your mental model — is this something you caused, or something the system decided?
6. Look for a way to take action on a rejected document. Is there a button, link, or instruction telling you what to do next? Can you find it?
7. Summarise: do you feel confident you understand what this screen is telling you, and what your next step is?

---

## Checklist (rate each 1–5 after completing the task)

Rate: 1 = broken or absent · 3 = works but causes hesitation · 5 = clear and effortless

| # | Item | Rating |
|---|------|--------|
| 1 | Status labels ("pending", "warning", "rejected") match terminology Bernd knows from his workflow | |
| 2 | Warning details are discoverable — Bernd finds the tooltip or note without being told it exists | |
| 3 | "Rejected" vs "pending" vs "warning" are clearly distinguished with words, not just colour | |
| 4 | There is a visible next action after reading a problem document | |
| 5 | Document names are fully readable — none are truncated without access to the full text | |
| 6 | The grouped structure feels familiar and mirrors how Bernd organises a file folder | |

---

## Focus areas

- Trust in status labels: does Bernd feel he understands what the system has decided, or does it feel opaque?
- Help text discoverability: does he find the warning tooltip, or does he miss it?
- Terminology: watch for any label that Bernd translates into his own words — that's a signal the label isn't landing.

---

## Out of scope

- Uploading or replacing documents
- Navigation to other sections of the application
- Mobile layout

---

## Report

Save to: `usability-reports/2026-06-15_bernd_doc-center-v3.md`
