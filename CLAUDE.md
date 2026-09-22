# FinLink Prototypes — Arbeitsregeln

@AGENTS.md

## Claude Code specifics

- When building a new UI mockup, screen, or design from scratch (not just implementing
  an already-fully-specified component), consider using the frontend-design guidance
  available in this environment for layout/visual-design decisions — the styleguide
  covers component rules and tokens, not general composition or page layout.
- When asked to "check the styleguide against the code" again in the future, treat it
  as a full re-audit request, not a one-off: read every `## ` section in
  `docs/styleguide.md`, find the matching implementation in the repo, and report
  ✅ / ⚠️ / ❌ / ❓ per point — the same method used to produce `styleguide-audit.md`.
  Don't change `docs/styleguide.md` or the code during that pass; report first.

Kurz und verbindlich. Die ausführlichen Fassungen stehen in den verlinkten Dateien.

## Design

**Breite und Ränder — gilt für jeden Prototyp, ohne Nachfrage.**
Prototypen werden auf 1440–1920px beurteilt. Inhalt, der über die ganze Breite läuft, ist nicht
„responsive", sondern unlesbar.

1. Jede Seite hat einen Seitenrand von `--page-gutter`.
2. **Dichte Datentabellen** laufen fluid über die volle Breite — sie brauchen ihre Spalten.
3. **Alles andere** bekommt ein `max-width` und steht zentriert: Charts und Karten-Vergleiche auf
   `--measure-content` (1100px), Formulare auf `--measure-form` (900px), Fließtext auf
   `--measure-text` (700px).
4. Ein Chart, der auf 1920px 1800px breit ist, ist ein Fehler — keine Geschmacksfrage.

Tokens in `design-system/tokens.css`, Regel und Begründung in
[design-system/DESIGN-SYSTEM.md](design-system/DESIGN-SYSTEM.md), Abschnitt 1.4.
Referenzumsetzung: `mortgage-hub/offer-comparison-table/offer-comparison-table-v2.html`.

**Farbe.** Keine rohen Hex-Werte erfinden. Tokens aus `design-system/tokens.css` benutzen; fehlt
einer, nachfragen statt raten. Farbe darf nie der einzige Träger einer Information sein — immer
zusätzlich Text, Symbol oder Position. Statusfarben (Erfolg, Warnung, Fehler) niemals für Identität
verwenden: ein Angebot in Warnorange liest sich als Warnung.

**Dichte Experten-Oberflächen.** Berater-, CRM- und Antragsscreens sind mehrspaltige, dichte
Arbeitsflächen für tägliche Nutzung — keine kundenfreundlichen Wizards. Dafür gibt es die Skill
`.claude/skills/power-user-form-design/`; bei Formularen und Eingabescreens zuerst laden.

## Prototypen anlegen

`[projekt]-[variante]-v[N].html`, nur Kleinbuchstaben, keine Umlaute, immer mit Versionsnummer.
**Bestehende Versionen werden nie überschrieben** — neue Iteration = neue Datei mit der nächsten
Nummer, alte Version im Manifest auf `status:"abgeloest"`.

Jede Datei muss in `data/prototypes.js` eingetragen werden, sonst erscheint sie in keinem Index.
Das Feld `changes` ist das wichtigste: was ist gegenüber der Vorversion anders, und warum.

Alle Regeln: [NAMING-CONVENTION.md](NAMING-CONVENTION.md).

## Prüfen

Prototypen sind eigenständige HTML-Dateien ohne Build. Zum Prüfen im Browser rendern und
anschauen — bei Breitenfragen **auf 1920px und 1440px**, nicht nur auf einer Größe.
Rechnet der Prototyp etwas, die Rechenlogik aus der Datei ziehen und unter `node` gegen
Zusicherungen laufen lassen, bevor Pixel begutachtet werden.
