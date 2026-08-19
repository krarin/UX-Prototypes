# How our prototype naming works

Repo: https://github.com/krarin/UX-Prototypes
Current state: 8 teams · 13 projects · 47 prototypes

## The structure

Everything is organised the way our teams are organised:

**All teams → Team → Project → Version**

| Level | What it is | Example |
|---|---|---|
| Team | One of our 8 teams | Advisors |
| Project | One topic or flow | Mein Tag |
| Version | One prototype file | Mein Tag V4 |

The 8 teams: Advisors · Mavericks · Document Center · Customer Dashboard ·
Mortgage Hub · Lender Integration · Product Design · Design System.

To browse, open `index.html` — no server, no install. Three clicks to any
prototype.

## How files are named

```
project-name-v[number].html
```

Examples: `mein-tag-v4.html`, `application-form-v7.html`, `important-fields-finlink-v2.html`

Rules:

- lowercase, hyphens instead of spaces
- no umlauts, no personal names
- always ends with `-v` and a number
- never `final`, `new`, `copy`, `updated`, `test` — the version is the number
- two ideas for the same version get a letter: `-v6-a`, `-v6-b`

## Each version is a new file

We never overwrite a prototype and never reuse a number. That means the whole
history of a flow stays openable, and "which one is current?" has one answer:
exactly one version per project is marked `aktuell`.

Every version also carries a one-line description of **what changed compared to
the previous version**. That is the field that makes an old prototype
understandable months later.

## One place holds the index

All the structure lives in a single file, `data/prototypes.js`. Adding a
prototype means adding one block there. The three index pages are generated from
it, so nobody edits HTML to update the index and the pages can never disagree
with each other.

## Handover and usability testing

Each team page has three sections:

| Section | What's in it |
|---|---|
| Prototypes | all the team's projects |
| For Development Handover | versions handed to development |
| For Usability Testing | versions used in a test |

The last two are filled in **on purpose, by a designer** — not automatically.
When a version goes into one of them, a **frozen copy** of the file is made with
the date in its name. Development gets a version that cannot change under them
while we keep iterating on the original. Both sections always show a date.

## It checks itself

One command validates everything:

```
node check-index.js
```

It catches wrong filenames, prototypes missing from the index, files listed but
not on disk, duplicate IDs, more than one current version, and missing dates.

This runs automatically at three points: when a prototype is created, before a
commit, and on GitHub for every push and pull request. So a prototype that
breaks the convention cannot quietly reach `main`.

**One-time setup after cloning:** `git config core.hooksPath .githooks`

## Why we changed this

The old index had grown ad hoc. It had a card linking to a file that no longer
existed, four prototypes reachable from no index at all, and filename, card
label and page title disagreeing about version numbers so often that searching
for "V5" returned five unrelated prototypes. All of that is now checked
automatically instead of remembered.

## Where things are

| File | What it's for |
|---|---|
| `index.html` | start here |
| `data/prototypes.js` | the index — the only file you edit |
| `NAMING-CONVENTION.md` | full rules (German) |
| `ONBOARDING-WORKING-STUDENT.md` | first-day instructions |
| `SETUP-GUARDRAILS.md` | how the automatic checks work |
| `check-index.js` | the validator |
| `freeze.js` | makes a frozen handover / test copy |
