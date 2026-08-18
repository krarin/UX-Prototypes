# Prototypen anlegen — die Regeln

Diese Seite ist alles, was du brauchst, um einen neuen Prototyp anzulegen.
Lesezeit: 5 Minuten. Halte dich daran, dann bleibt der Index für alle sauber.

---

## Wie der Index aufgebaut ist

```
Alle Teams   →   Team          →   Projekt            →   Versionen
                 Mortgage Hub      Offer Submission       Angebotssuche V1
                                                          Angebotssuche V2
                                                          Angebotssuche V3
```

**Team** = eines der 8 FinLink-Teams. Ändert sich nie.
**Projekt** = ein Thema / ein Flow, an dem wir arbeiten. Kommt selten dazu.
**Version** = ein Prototyp. Kommt ständig dazu — das ist deine Arbeit.

Jede Team-Seite hat drei Abschnitte:

| Abschnitt | Was drin steht |
|---|---|
| **Prototypes** | alle Projekte des Teams — hier navigierst du zu den Versionen |
| **For Development Handover** | eingefrorene Kopien, die an die Entwicklung gegangen sind |
| **For Usability Testing** | eingefrorene Kopien, mit denen getestet wurde |

Die letzten zwei füllen wir **von Hand** — siehe Regel 5.

Du startest immer auf `index.html`. Doppelklick genügt, kein Server nötig.

---

## Regel 1 — Wie die Datei heißt

```
[projekt]-[variante]-v[N].html
```

- **nur Kleinbuchstaben**
- **Bindestriche** statt Leerzeichen
- **keine Umlaute** (ä ö ü ß) und keine Sonderzeichen
- **keine Personennamen**
- **immer** mit `-v` und einer Zahl am Ende

Der `[variante]`-Teil ist optional — nimm ihn nur, wenn es innerhalb eines Projekts
zwei parallele Richtungen gibt.

| ✅ Richtig | ❌ Falsch | Warum falsch |
|---|---|---|
| `application-form-v8.html` | `prototype4.html` | sagt nicht, worum es geht |
| `mein-tag-v4.html` | `mein-tag-final.html` | „final" ist kein Versionsstand |
| `important-fields-v7.html` | `Important-Fields-V7.html` | Großbuchstaben |
| `coba-important-fields-v4.html` | `coba-wichtige-felder-v4.html` | Umlaut-Risiko, deutsche/englische Mischung |
| `offer-submission-v5.html` | `christian-v1.html` | Personenname |
| `doc-center-skeleton-v2.html` | `docCenterSkeleton2.html` | camelCase, keine `-v`-Nummer |

**Parallele Varianten derselben Version** bekommen einen Buchstaben:
`digital-qa-doc-center-v6-a.html`, `…-v6-b.html`, `…-v6-d.html`
Das heißt: drei gleichwertige Ideen für V6, keine Reihenfolge.

---

## Regel 2 — Jede Version ist eine neue Datei

Du **überschreibst nie** einen bestehenden Prototyp.
Neue Iteration = neue Datei mit der nächsten Nummer.

Verbotene Wörter im Dateinamen: `final`, `neu`, `new`, `updated`, `copy`, `kopie`,
`alt`, `old`, `test`, `fertig`.
Wenn du das Bedürfnis hast, „final" zu schreiben → das trägst du stattdessen als
**Handover-Datum** ein (siehe Regel 5).

---

## Regel 3 — Nummern laufen weiter, nie zurück

Innerhalb eines Projekts zählst du einfach hoch: V1 → V2 → V3 → …
Auch wenn eine Version verworfen wird, wird ihre Nummer **nicht** neu vergeben.

Wenn du an etwas grundsätzlich anderem arbeitest, ist es **ein neues Projekt** —
kein V1 innerhalb des alten. Frage im Zweifel Karin.

Fehlt eine Nummer (z. B. es gibt V2 und V4, aber kein V3), ist das in Ordnung —
Lücken sind ehrlicher als Umnummerieren. Schreib in die Beschreibung, warum.

---

## Regel 4 — Die Datei im Index eintragen

Öffne **`data/prototypes.js`**. Das ist die **einzige** Datei, die du für den Index
bearbeitest. `index.html`, `team.html` und `project.html` fasst du nie an.

Suche den Block deines Projekts und kopiere den letzten Eintrag darunter:

```js
{ id:"application-form-v8", project:"application-form", version:8,
  title:"Application Form V8",
  file:"data-validation/application-form/application-form-v8.html",
  status:"aktuell",
  changes:"Gegenüber V7: …" },
```

Die 7 Felder:

| Feld | Was rein muss |
|---|---|
| `id` | Dateiname ohne `.html`. Muss einmalig sein. |
| `project` | die `id` des Projekts (steht weiter oben in der Datei) |
| `version` | die Zahl, als Zahl ohne `v` |
| `title` | Was auf der Karte steht, z. B. `Application Form V8` |
| `file` | Pfad ab dem Hauptordner |
| `status` | `aktuell` · `abgeloest` · `archiv` |
| `changes` | **Wichtigstes Feld.** Ein Satz: *Gegenüber V7 …* — was ist anders? |

Übergabe und Test stehen **nicht** hier — siehe Regel 5.

**Nicht vergessen:** die vorher aktuelle Version von `"aktuell"` auf `"abgeloest"` setzen.
Pro Projekt darf es nur **eine** aktuelle Version geben.

`changes` ist das Feld, das in drei Monaten den Unterschied macht. Schreib nicht
„Verbesserungen", sondern was konkret anders ist:

> ✅ „Gegenüber V6: Validierung als eigener Reiter statt als Modal."
> ❌ „Überarbeitete Version mit Verbesserungen."

---

## Regel 5 — Übergabe und Test: einfrieren

Übergabe und Usability-Test sind **keine Felder am Prototyp**, sondern zwei
kuratierte Sammlungen **pro Team**. Du entscheidest bewusst, was dort landet.

Wenn etwas dort landet, wird eine **eingefrorene Kopie** der Datei angelegt.
Der Grund: die Entwicklung (oder eine Testperson) bekommt einen Stand, der sich
nicht mehr ändert — auch wenn du am Original weiterarbeitest.

**So geht's — zwei Schritte:**

```bash
# 1. Kopie anlegen
node freeze.js handover application-form-v7
#    oder
node freeze.js testing application-form-v7 "Testlauf mit Lena"
```

Das Skript legt die Kopie an und gibt dir einen fertigen Block aus. Diesen

```bash
# 2. in data/prototypes.js beim richtigen Team einfügen —
#    in die Liste `handover:` bzw. `testing:`
```

Danach `node check-index.js`.

**Die Kopie liegt bewusst im selben Ordner wie das Original.** Prototypen verlinken
das Design-System relativ (`../design-system/` oder `../../design-system/`) und manchmal
Nachbardateien. Im selben Ordner bleiben all diese Pfade gültig. Verschiebe eingefrorene
Kopien also nicht.

**Namensschema der Kopien** — die eine erlaubte Ausnahme von „endet immer auf `-v[N]`":

```
application-form-v7-handover-2026-08-18.html
mein-tag-v3-usability-2026-08-18.html
```

Also: `[originalname]-handover-[JJJJ-MM-TT].html` bzw. `-usability-[JJJJ-MM-TT].html`.
Das Datum macht jede Kopie eindeutig — du kannst dieselbe Version später erneut einfrieren.

**Eingefrorene Kopien bearbeitest du nie.** Oben in der Datei steht ein Kommentar, der
daran erinnert. Änderungen gehören ins Original; danach frierst du neu ein.

---

## Regel 6 — Testberichte

Der Bericht zu einem Usability-Test gehört in den Ordner `usability-reports/` und heißt:

```
JJJJ-MM-TT_persona_prototyp-id.md
```

Beispiel: `2026-08-18_lena_application-form-v7.md`

Du kannst ihn im `testing`-Eintrag verlinken, indem du das Feld `report:` ergänzt:

```js
{ prototype:"application-form-v7",
  title:"Application Form V7",
  file:"data-validation/application-form/application-form-v7-usability-2026-08-18.html",
  date:"2026-08-18",
  note:"Testlauf mit Lena",
  report:"usability-reports/2026-08-18_lena_application-form-v7.md" },
```

Vorlagen für die Testbriefings liegen in `test-briefs/_template.md` und
`interactive-briefs/_template.md`.

---

## Regel 7 — Vor dem Committen prüfen

Führe im Terminal aus:

```bash
node check-index.js
```

Das Skript prüft automatisch:
- verweist jeder Eintrag auf eine Datei, die es wirklich gibt?
- taucht jede Datei auf der Festplatte auch im Index auf?
- hat jedes Projekt genau eine aktuelle Version?
- hat jedes Projekt höchstens ein finales Handover?
- existiert jeder verlinkte Testbericht?

Kommt `✅ Alles in Ordnung`, kannst du committen.
Kommt eine Fehlermeldung, steht genau da, was fehlt.

---

## Deine Checkliste

- [ ] Datei heißt `[projekt]-[variante]-v[N].html`, klein, mit Bindestrichen
- [ ] Nichts überschrieben — neue Datei für die neue Version
- [ ] `<title>` in der HTML-Datei ist derselbe Text wie `title` im Index
- [ ] Eintrag in `data/prototypes.js` ergänzt
- [ ] `changes` sagt konkret, was gegenüber der Vorversion anders ist
- [ ] Vorherige Version auf `"abgeloest"` gesetzt
- [ ] Bei Übergabe: `node freeze.js handover <id>` + Block beim Team eingefügt
- [ ] Nach einem Test: `node freeze.js testing <id>` + Block eingefügt + Bericht in `usability-reports/`
- [ ] `node check-index.js` läuft sauber durch

---

## Wenn du unsicher bist

- **Neues Projekt oder neue Version?** → Ist der Hauptflow derselbe? Dann neue Version.
- **Welches Team?** → Wer arbeitet fachlich daran? Im Zweifel Karin fragen.
- **Zwei Ideen parallel?** → `-v6-a` und `-v6-b`, nicht V6 und V7.
- **Alter Prototyp, den keiner mehr braucht?** → nicht löschen, `status:"archiv"`.
- **Prototyp geändert, nachdem er übergeben war?** → Original ändern, neue Version
  anlegen, danach neu einfrieren. Die alte Kopie bleibt als Beleg liegen.
