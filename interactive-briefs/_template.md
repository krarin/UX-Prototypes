# Interactive Brief — [Prototype Name]

**File or URL:** [file:///absolute/path or https://...]
**Agent:** [lena-lead-hungry-closer-live / bernd-veteran-methodist-live]
**Date:** YYYY-MM-DD

> Use this brief format when you need the agent to actually click, hover, or trigger JS-driven states.
> For static HTML review, use test-briefs/ instead.

---

## Primary task

[One sentence: what the persona is trying to accomplish.]

---

## Steps (follow in this exact order)

Each step specifies: what to DO (browser action) and what to OBSERVE (narrate in character).

1. **Navigate** to the prototype. `browser_snapshot` — describe first impression in character.
2. **[Action]** — [e.g. "Hover over the warning triangle next to 'Gehaltsabrechnung Juli'."] `browser_hover`. What appears? React in character.
3. **[Action]** — [e.g. "Click 'Persönliche Dokumente' to expand the group."] `browser_click`. What changes? React.
4. **[Action]** — Continue through the flow.
5. **Snapshot final state.** Narrate whether the task felt complete, and what next action (if any) is obvious.

> Specify the exact element name or label from the UI in each step. The more specific, the less probabilistic.

---

## Checklist (rate each 1–5 after completing the task)

Rate: 1 = broken or absent · 3 = works but causes hesitation · 5 = clear and effortless

| # | Item | Rating |
|---|------|--------|
| 1 | [Item] | |
| 2 | [Item] | |
| 3 | [Item] | |
| 4 | [Item] | |
| 5 | [Item] | |

---

## Interactive states to verify

[List the specific JS-driven states you want confirmed as working — tooltips, modals, expanded panels, dynamic counters, etc.]

- [ ] [State 1]
- [ ] [State 2]

---

## Out of scope

[What NOT to test in this session]

---

## Report

Save to: `usability-reports/YYYY-MM-DD_[persona]-live_[prototype-name].md`
