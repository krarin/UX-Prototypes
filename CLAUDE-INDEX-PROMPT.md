# Prompt: Prototypen-Index pflegen

Kopiere den Block unten in Claude Code, wenn du einen Prototyp hinzufügst,
eine Übergabe dokumentierst oder einen Testtermin einträgst.
Er beschreibt Claude das System, damit nichts an der falschen Stelle landet.

---

## Der Prompt (ab hier kopieren)

> Du arbeitest im Prototypen-Workspace `Desktop/Prototypes`.
> Der Index ist **manifest-getrieben**. Halte dich strikt an diese Regeln:
>
> **Struktur:** Alle Teams → Team → Projekt → Version.
> Es gibt 8 Teams (Advisors, Mavericks, Document Center, Customer Dashboard,
> Mortgage Hub, Lender Integration, Product Design, Design System).
> Ein Projekt ist ein Flow/Thema, eine Version ist ein Prototyp.
>
> **Einzige Quelle der Wahrheit ist `data/prototypes.js`.**
> Die Seiten `index.html`, `team.html` und `project.html` rendern ausschließlich
> aus diesem Manifest. Bearbeite diese drei Dateien **niemals** von Hand, um Inhalte
> hinzuzufügen — trage stattdessen einen Eintrag ins Manifest ein.
>
> **Warum `.js` und nicht `.json`:** Die Prototypen werden per Doppelklick über
> `file://` geöffnet. Browser blockieren dort `fetch()` auf `.json`. Das Manifest
> ist deshalb eine `.js`-Datei mit `window.PROTOTYPES = { … }`. Ändere das nicht.
>
> **Dateinamen:** `[projekt]-[variante]-v[N].html` — nur Kleinbuchstaben,
> Bindestriche, keine Umlaute, keine Personennamen, immer mit `-v[N]` am Ende.
> Verboten: `final`, `neu`, `new`, `updated`, `copy`, `alt`, `test` im Dateinamen.
> Parallele Varianten derselben Version: `-v6-a`, `-v6-b`.
>
> **Ordner bleiben, wo sie sind.** Prototypen werden nicht zwischen Ordnern
> verschoben; das Manifest verbindet Ordnerstruktur und Teamstruktur.
>
> **Team-Seiten haben drei Abschnitte:** „Prototypes" (alle Projekte des Teams),
> „For Development Handover" und „For Usability Testing". Die letzten zwei sind
> **kuratierte Sammlungen** — Designer entscheiden von Hand, was dort landet.
> Prototyp-Karten selbst tragen **keine** Handover- oder Test-Angaben.
>
> **Beim Anlegen einer neuen Version:**
> 1. Datei nach Konvention benennen, `<title>` = `title` im Manifest
> 2. Eintrag in `data/prototypes.js` ergänzen (id, project, version, title, file,
>    status, changes) — **keine** handover/tests-Felder am Prototyp
> 3. `changes` konkret formulieren: *„Gegenüber V7: …"* — was ist anders?
> 4. Die vorher aktuelle Version auf `status:"abgeloest"` setzen.
>    **Pro Projekt genau eine** Version mit `status:"aktuell"`.
> 5. `node check-index.js` ausführen — muss `✅` melden
>
> **Übergabe oder Test = einfrieren.** Nie ein Feld setzen, sondern:
> `node freeze.js handover <prototyp-id>` bzw. `node freeze.js testing <prototyp-id>`.
> Das Skript legt eine eingefrorene Kopie **im selben Ordner** an (relative CSS- und
> Geschwisterpfade bleiben so gültig) und gibt den Manifest-Block aus, der beim
> passenden Team in `handover:` bzw. `testing:` eingefügt wird. Eingefrorene Kopien
> werden nie bearbeitet und nie verschoben.
>
> **Testberichte:** `usability-reports/JJJJ-MM-TT_persona_prototyp-id.md`, optional
> im `testing`-Eintrag als `report:` verlinkt.
>
> **Immer zum Schluss:** `node check-index.js` ausführen und das Ergebnis berichten.
> Das Skript prüft fehlende Dateien, nicht indexierte Dateien, doppelte IDs,
> mehrfache „aktuell"-Versionen, mehrfache finale Handovers und fehlende Berichte.
>
> Die vollständigen Regeln stehen in `NAMING-CONVENTION.md`.

---

## Wofür welche Datei da ist

| Datei | Rolle | Von Hand bearbeiten? |
|---|---|---|
| `data/prototypes.js` | Manifest — Teams, Projekte, Versionen, Daten | **Ja, nur hier** |
| `index.html` | Seite „Alle Teams" | Nein |
| `team.html` | Team → seine Projekte | Nein |
| `project.html` | Projekt → seine Versionen | Nein |
| `design-system/launcher.js` | rendert alle drei Seiten | Nur bei Layout-Änderungen |
| `design-system/launcher.css` | Styling aller drei Seiten | Nur bei Layout-Änderungen |
| `freeze.js` | legt eingefrorene Kopien an | Nein — nur ausführen |
| `check-index.js` | Prüfskript | Nur bei neuen Regeln |
| `NAMING-CONVENTION.md` | Anleitung fürs Team | Bei Regeländerungen |

## Häufige Aufgaben

**Neuen Prototyp anlegen**
> Lege im Team <TEAM>, Projekt <PROJEKT>, die nächste Version an.
> Datei: <PFAD>. Was sich geändert hat: <BESCHREIBUNG>.
> Trage sie ins Manifest ein, setze die Vorversion auf abgeloest und prüfe mit check-index.js.

**Übergabe dokumentieren**
> Friere <PROTOTYP-ID> für die Entwicklung ein: `node freeze.js handover <PROTOTYP-ID>`,
> dann den ausgegebenen Block beim richtigen Team in die `handover`-Liste einfügen
> und check-index.js laufen lassen.

**Für einen Test einfrieren**
> Friere <PROTOTYP-ID> für einen Usability-Test ein: `node freeze.js testing <PROTOTYP-ID>
> "<NOTIZ>"`, Block in die `testing`-Liste des Teams einfügen, Bericht später als
> `report:` ergänzen.

**Neues Projekt oder Team**
> Ergänze in data/prototypes.js ein Projekt <NAME> im Team <TEAM>
> mit einer flow-Beschreibung in einem Satz.
