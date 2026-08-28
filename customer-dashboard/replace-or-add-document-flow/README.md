# Replace or Add document flow

Der Kunde lädt Unterlagen hoch und erfährt, was daraus geworden ist: was
zugeordnet wurde, was die Prüfung nicht bestanden hat — und wie er eine
abgelehnte Datei ersetzt, ohne die alte zu verlieren.

---

## Was hier drin liegt

| Datei | Wofür |
|---|---|
| `replace-or-add-document-flow-v3.html` | **aktuell** — Doppelklick genügt, kein Server nötig |
| `documents-data-v3.js` | Anforderungen, Dateien, Prüfung, frühere Fassungen |
| `customer-skin.css` | die Formensprache des heutigen Kundendashboards (von allen Versionen genutzt) |
| `replace-or-add-document-flow-v2.html` + `documents-data.js` | abgelöst — mit Top-3-Box am Seitenkopf |
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

**Ersetzen löscht nie.** Die alte Datei wandert in „frühere Fassungen“, bleibt
sichtbar und lässt sich zurückholen.

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

## Flow 2 · Abgelehnte Datei ersetzen

Eingang aus der Meldung („Zum Dokument“) oder von der Karte selbst („Neue
Fassung hochladen“ — der Knopf trägt die Folge im Namen).

Der Ablehnungsgrund steht im Dialog **vor** der Dateiwahl, die vollständige
Prüfmeldung als aufklappbares Detail. Wer nicht weiß, was kaputt ist, lädt
dieselbe Datei noch einmal hoch.

Die Ersetzung geht nicht automatisch durch — die Prüfung läuft auch auf ihr. Beim
zweiten Versuch besteht sie, der Weg hat also ein Ende.

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
