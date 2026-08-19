# Start here — prototypes workspace

## One-time setup

```bash
git clone https://github.com/krarin/UX-Prototypes.git
cd UX-Prototypes
git config core.hooksPath .githooks
```

That third line matters. It turns on the check that stops you committing a
broken index. Git does not copy it automatically, so you must run it once.

Check it worked:

```bash
node check-index.js
```

You should see `✅ Alles in Ordnung`. If `node` is missing, install Node.js from
nodejs.org first.

---

## How the workspace is organised

```
Alle Teams  →  Team  →  Project  →  Versions
               Advisors   Mein Tag    Mein Tag V1, V2, V3, V4
```

Open `index.html` by double-clicking it. No server needed.

- **Team** — one of our 8 teams. Never changes.
- **Project** — one topic or flow. Rarely added.
- **Version** — one prototype file. This is what you add.

---

## Making a new prototype — 5 steps

**1. Copy the template** into the right folder

```bash
cp design-system/_template.html to-do/mein-tag-v5.html
```

**2. Name it** `project-name-v[number].html`

- lowercase only, hyphens instead of spaces
- no umlauts (ä ö ü ß), no names of people
- always ends with `-v` and a number
- never `final`, `new`, `neu`, `copy`, `updated`, `test`

**3. Set the `<title>`** inside the file to match, e.g. `Mein Tag V5`.

**4. Add one block to `data/prototypes.js`.** This is the only file you edit for
the index. Never edit `index.html`, `team.html` or `project.html`.

```js
{ id:"mein-tag-v5", project:"mein-tag", version:5, title:"Mein Tag V5",
  file:"to-do/mein-tag-v5.html", status:"aktuell",
  changes:"Compared to V4: …" },
```

Then set the previous version from `status:"aktuell"` to `status:"abgeloest"`.
Only one version per project may be `aktuell`.

**5. Check, then commit**

```bash
node check-index.js
git add -A
git commit -m "Mein Tag V5"
git push
```

If the check fails, it tells you exactly what is wrong. Fix it and run again.

---

## The `changes` field

This is the field people will actually read in three months. Write what is
different, not that something changed.

- ✅ "Compared to V6: validation is its own tab instead of a modal."
- ❌ "Improved version with various changes."

---

## Never do this

- Overwrite an existing prototype. A new iteration is a new file.
- Reuse a version number inside a project.
- Move a prototype into another folder. Folders stay as they are.
- Edit `index.html`, `team.html` or `project.html` by hand.
- Edit a file ending in `-handover-…` or `-usability-…`. Those are frozen
  copies. Change the original and freeze again.

---

## Handover and usability tests

These are not fields on a prototype. They are curated lists per team, and adding
one makes a frozen copy of the file:

```bash
node freeze.js handover mein-tag-v5
node freeze.js testing mein-tag-v5 "Test with Lena"
```

The script prints a block. Paste it into the team's `handover:` or `testing:`
list in `data/prototypes.js`. Test reports go in `usability-reports/` and are
named `YYYY-MM-DD_persona_prototype-id.md`.

---

## If you get stuck

- Full rules: `NAMING-CONVENTION.md`
- How the automatic checks work: `SETUP-GUARDRAILS.md`
- Anything unclear about which team or project something belongs to: ask Karin.
