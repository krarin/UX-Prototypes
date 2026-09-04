# Replace or Add document flow

Der Kunde lädt Unterlagen hoch und erfährt, was daraus geworden ist: was
zugeordnet wurde, was die Prüfung nicht bestanden hat — und ob er die abgelehnte
Datei ersetzen oder das Fehlende hinzufügen will. Die Frage entscheidet er, nicht
das System.

---

## Was hier drin liegt

| Datei | Wofür |
|---|---|
| `replace-or-add-document-flow-v3.html` | **aktuell** — Doppelklick genügt, kein Server nötig |
| `documents-data-v3.js` | Anforderungen, Dateien, Prüfung, Zuordnung |
| `customer-skin.css` | die Formensprache des heutigen Kundendashboards (von allen Versionen genutzt) |
| `replace-or-add-document-flow-v2.html` + `documents-data.js` | abgelöst — Top-3-Box, Auswahlkarten mit Radios, „frühere Fassungen“ |
| `replace-or-add-document-flow-v1.html` + `replace-or-add-data.js` | abgelöst — erster Versuch auf dem Design-System (türkis) |

### Zum Design

`customer-skin.css` lädt `design-system/tokens.css` **bewusst nicht**. Das
Design-System ist türkis und Berater-Chrome, das Kundenprodukt ist blau und hat
eine eigene Formensprache. Zwei Primärfarben würden gegeneinander laufen.

> **Die Hexwerte sind aus den Produkt-Screenshots abgeleitet, nicht aus einer
> Token-Datei.** Sie stehen alle oben in `customer-skin.css`. Sobald die echten
> Werte vorliegen, gehören sie dorthin — alles Weitere stimmt dann von selbst.
> Ebenso die Schrift: Plus Jakarta Sans ist ein Google-Fonts-Ersatz für die
> Produktschrift.

---

## Die Grundentscheidungen

**Eine Karte ist eine Anforderung, keine Datei.** `files` ist eine Liste, `soll`
sagt, wie viele Dateien die Anforderung braucht. Dadurch gibt es den Zustand
*2 von 4* und überhaupt etwas zu ersetzen.

**Ersetzen löscht wirklich.** Es gibt keine „früheren Fassungen“ mehr und kein
Zurückholen. Genau deshalb wird vor dem Upload gefragt statt danach beruhigt:
die Warnung steht vor der Handlung, weil es hinterher keine gibt.

**Die Frage beantwortet der Kunde, nicht das System.** Früher entschied
`decide()` mit: Ablehnung → ersetzen. Das ist im Kernfall dieses Prototyps
falsch. `Docs-Reisepass.jpg` fällt durch, *weil die Rückseite fehlt* — dort ist
**Hinzufügen** richtig, und die Automatik hätte die Vorderseite gelöscht. Was in
der Datei steht, weiß nur der Kunde. `decide()` ist deshalb ganz verschwunden:
gefragt wird, sobald `files` nicht leer ist, und was die beiden Antworten
anrichten, sagen die Zeilen des Dialogs selbst.

**Es gibt eine Prüfung.** Eine Anforderung fällt beim ersten vollständigen
Upload durch und besteht beim zweiten — deterministisch, damit Demo und
Usability-Test vergleichbar bleiben. Geprüft wird erst bei Vollständigkeit: zwei
von vier Fotos kann niemand beurteilen.

---

## Flow 1 · Sammel-Upload mit Rückmeldung

Heute ist dieser Weg stumm. Der Kunde legt Dateien ab, etwas passiert, und wenn
eine Datei die Prüfung nicht besteht, erfährt er es nirgends — die Ablehnung
liegt rot, aber unbemerkt, zwischen fünfzehn Karten.

**Phase 1 — die Dateien sind sichtbar, während sie hochladen.**
Pro Datei sofort eine graue Zeile im Fuß der Box: Icon nach Dateityp (Kamera für
Bilder, Dokument für PDF), Dateiname, „Hochladen“ und Spinner. Der volle Name
steht im Tooltip, auch wenn die Zeile ihn abschneidet.

**Phase 2 — gestaffeltes Auflösen, eine Zeile alle 450 ms.**
Jede Zeile zeigt einzeln ihr Ergebnis: *Zugeordnet* · *Abgelehnt* · *Nicht
zugeordnet*. Erst wenn alle stehen, räumt sich die Liste ab. Ohne die Staffelung
springt alles auf einmal um und niemand sieht, dass etwas passiert ist.

**Phase 3 — die Meldung, direkt unter der Box.**

```
✓  3 Dokumente erfolgreich kategorisiert.                       ×
   2 Dokumente brauchen Ihre Aufmerksamkeit.
──────────────────────────────────────────────────────────────────
⚠  Abgelehnt          Docs-Reisepass.jpg        Zum Dokument  →
     • Es wurde nur eine Seite erkannt — die Rückseite fehlt.
     • Das maschinenlesbare Feld (MRZ) war nicht auswertbar.
     • Teile des Ausweises liegen außerhalb des Bildes.
?  Nicht zugeordnet   scan0007.pdf              Zuordnen      →
```

Dieselben Punkte stehen an der Karte selbst — `topGruende(d, 3)` rendert an
beiden Stellen, damit sich eine Ablehnung überall gleich liest. Der vollständige
Maschinentext liegt dort hinter „Mehr sehen“.

**Die Ablehnung nennt ihre Gründe an Ort und Stelle — höchstens drei.**
`Abgelehnt` allein ist eine Diagnose ohne Befund: wer nicht weiß, was kaputt
ist, lädt dieselbe Datei noch einmal hoch. Die Prüfung meldet oft fünf oder
mehr Befunde (Ivas Juli-Abrechnung: fünf); die späteren sind meist Folgefehler
der ersten und in einer Meldung liest sie niemand. Deshalb `gruende` als Liste
im Datenmodell und `topGruende(d, 3)` davor. Der vollständige Maschinentext
bleibt an der Karte, wo Platz dafür ist.

Als Panel, nicht als Dialog: ein Modal klickt man weg und findet es nie wieder.
Jeder offene Fall hat einen Weg dorthin — „Zum Dokument“ springt an die Karte
und lässt sie aufblitzen, „Zuordnen“ springt in den Fuß der Box und fokussiert
die Auswahl. Ohne diese Wege wäre die Meldung nur eine zweite Stelle, an der
etwas Rotes steht.

Schließen möglich; ein neuer Upload ersetzt die Meldung.

---

## Flow 2 · Ersetzen oder hinzufügen

Eingang aus der Meldung („Zum Dokument"), von der Karte selbst oder aus einer
nicht zugeordneten Seite. Der Knopf heißt überall nur noch **Hochladen** — ein
Wort, ein Knopf. Vorher hieß er je nach Lage „Neue Fassung hochladen" oder
„Datei hinzufügen" und nahm damit eine Entscheidung vorweg, die er nicht treffen
darf. Die Folge steht jetzt im Dialog, nicht auf dem Knopf.

Der Ablauf ist der aus Figma, in drei Dialogen:

```
Hochladen ─► „Datei hochladen"  ─► Auswahlfenster ─► die Frage ─► „Hinzugefügt"
             (Dropzone)            des Rechners       (s. u.)      (Bestätigung)
```

**Gefragt wird, sobald an der Unterlage eine Datei liegt** — ob angenommen oder
abgelehnt, spielt keine Rolle. Auch eine angenommene Datei kann falsch sein, und
ein stilles Ersetzen wäre dort genauso ein Verlust. Ist die Unterlage leer, gibt
es nichts zu ersetzen und damit keine Frage: Dropzone, Datei, fertig. Ein Dialog
mit nur einer möglichen Antwort ist eine Klickbremse, kein Schutz.

**Die Frage kommt nach der Dateiwahl.** Früher stand hier ein Schalter, der
beide Reihenfolgen zum Vergleich anbot (A: erst fragen, dann die Datei; B: erst
die Datei, dann fragen). Entschieden ist jetzt B, und zwar aus einem Grund, den
man erst am Dialog sieht: mit der Datei in der Hand kann die Zeile *beide* Namen
nennen — den alten, der gelöscht würde, und den neuen, der ankommt. Ohne
Dateinamen bleibt von „Ersetzen" nur eine abstrakte Folge.

```
┌─ Vollständige Gehaltsabrechnung Juli ──────────────────────────┐
│  Antragsteller Iva Petrova · 1 Datei vorhanden                  │
│                                                                 │
│  ┌─ BLAU, sobald markiert ─────────────────────────────────┐   │
│  │ ◉  Beide Dateien behalten                                │   │
│  │    Passend, wenn Sie z. B. Vorder- und Rückseite vom     │   │
│  │    Ausweis hochladen.                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ○  Vorhandene Datei ersetzen                              │   │
│  │    „gehaltsabrechnung_datev.pdf" wird gelöscht und kann   │   │
│  │    nicht wiederhergestellt werden.                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  📄 Gehaltsabrechnung_IVA_Juli.pdf        ← die neue Datei      │
│                                                                 │
│                          [Abbrechen]  [Weiter]                  │
│                                       blau, inaktiv bis markiert│
└─────────────────────────────────────────────────────────────────┘
```

**Die neue Datei steht im Dialog.** Entschieden wird über sie, nicht über „eine
Datei" — deshalb die blau hinterlegte Zeile unter der Frage.

**Bei einer Ablehnung sagt der Dialog nichts über die Ablehnung.** Der Hinweis
„Diese Unterlage haben wir zurückgewiesen …" stand vorher zwischen dem Kunden
und der Frage — als dritte Wiederholung derselben Nachricht, nach der roten
Karte und den Gründen in der Meldung. Der Grund steht an der Karte, von der der
Kunde gerade kommt.

**Markieren und bestätigen sind zwei Schritte.** Vorher war jede Zeile selbst
eine Schaltfläche und der Fuß trug zwei Knöpfe mit denselben Namen — dieselbe
Wahl zweimal, und ein Klick daneben löschte eine Datei. Jetzt: ein Radio je
Zeile, ein einziger Knopf **Weiter**, inaktiv bis etwas markiert ist.

**Beide Zeilen sehen gleich aus, bis der Kunde antwortet.** Keine rote Fläche
neben einer weißen: das läse sich als Empfehlung für die weiße, und empfohlen
ist hier nichts, weil das System nicht weiß, was in der Datei steht. Die einzige
Warnfarbe im Block sind die zwei Wörter **wird gelöscht** im Satz selbst; die
einzige Auszeichnung ist die Markierung, und die ist blau.

**Die Bestätigung ist der dritte Dialog.** Grüner Streifen, ein Wort —
*Hinzugefügt* bzw. *Ersetzt* —, darunter der Stand danach, und ein Knopf
**Fertig**. Kommt die neue Datei nicht durch die Prüfung, steht an derselben
Stelle *Wieder nicht durchgekommen* in Rot: eine Ersetzung geht nicht
automatisch durch, sonst sähe jeder Upload erfolgreich aus und der Kernfall des
Produkts wäre nur Startzustand, nie Ergebnis einer Handlung.

> **Bewusste Folge:** ein Fehlklick auf „Ersetzen" ist unwiderruflich. Der
> Warnsatz im Dialog ist das einzige Netz — den Umkehrknopf „Doch beide
> behalten" gibt es nicht mehr, weil er nur in einer Richtung funktionieren
> könnte. Im Usability-Test gezielt darauf achten.

### Zur Vorlage

Die drei Dialoge kommen 1:1 aus der Figma-Datei *Upload page prototype — Client
dashboard* (`File Upload Dialog`, `Document Replace Dialog`, `Radio Option
Card`). Sie tragen deshalb **nicht** die kantige Formensprache der Seite: Figma
zeichnet sie runder (12/8/6 px statt 4 px) und in einem dunkleren Blau
(`#003EB4` statt `#1B4DE0`). Diese Werte stehen als eigener `--fig-*`-Block oben
in der Dialog-Sektion von `customer-skin.css`. Bis die Seite nachzieht, gilt für
die Dialoge Figma — sonst wäre die Vorlage nach dem ersten Angleichen nicht mehr
wiederzuerkennen.

Zwei Stellen weichen bewusst ab, weil Figma nur den Einer-Fall zeigt:
Liegen mehrere Dateien an der Unterlage, heißen die Zeilen „**Alle** Dateien
behalten" und „Vorhandene **Dateien** ersetzen" und der Satz zählt mit. Und die
Bestätigung sagt nach einem Ersetzen *Ersetzt*, nicht *Hinzugefügt*.

---

## Beispiellauf

Der Knopf **Beispieldateien verwenden** macht den Test unabhängig davon, welche
Dateien gerade auf dem Rechner liegen. Er trifft genau die Zahlen der Meldung:

| Datei | Landet | Ergebnis |
|---|---|---|
| `kontoauszug-august.pdf` | Kontoauszüge | bestanden (2 von 3) |
| `grundbuchauszug.pdf` | Grundbuchauszug | bestanden |
| `innen-wohnzimmer.jpg` | Objektfotos | bestanden (3 von 4) |
| `Docs-Reisepass.jpg` | Ausweiskopie Michael | **abgelehnt** |
| `scan0007.pdf` | — | **nicht zugeordnet** |

Die Zuordnung nimmt das **längste** passende Wortstück im Dateinamen, nicht das
erste — sonst landet `grundbuchauszug.pdf` bei den Kontoauszügen.

**Die Automatik überschreibt nie.** Vollständige und zurückgewiesene
Anforderungen nimmt sie nicht an. Ivas Juli-Abrechnung ist von Anfang an
abgelehnt und damit ein zweiter Eingang in Flow 2, ohne dass man erst selbst
einen Upload durchfallen lassen muss.
