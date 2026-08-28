# Testing Notes — Customer Dashboard V2, Upload-Flow

**Prototyp:** `customer-dashboard/customer-dashboard-v2.html` (Desktop)
`customer-dashboard/customer-dashboard-mobile-v2.html` (Mobile, 390px)
**Gemeinsame Daten:** `customer-dashboard/dashboard-data.js`
**Gemeinsame Vorschauen:** `customer-dashboard/dashboard-previews.js`
**Stand:** 2026-08-24
**Gilt für:** Facilitator-Vorbereitung — vor einer Session lesen, nicht während

> Diese Datei beschreibt, **wie sich der Prototyp verhält**, nicht was ein Tester gesagt hat.
> Session-Ergebnisse gehören nach `usability-reports/YYYY-MM-DD_[persona]_[prototyp].md`.

---

## Was sich geändert hat

- **`data-up` öffnete vorher das Bulk-Zuordnungs-Modal** — das war der Bug. Bulk
  („Unterlagen hinzufügen") und Einzeldokument-Upload sind jetzt getrennte Flows.
- **Echtes `<input type="file">`**, es wird also eine echte Datei gewählt und ihr Name
  läuft durch den ganzen Flow. Mobil zusätzlich **Foto aufnehmen**
  (`capture="environment"`) neben **Datei wählen**.
- **Prüfregeln liegen in `dashboard-data.js`**, gemeinsam für beide Viewports —
  Desktop und Mobile können sich also nicht darüber uneinig sein, ob eine Datei
  durchgegangen ist.

---

## Fehlschläge sind deterministisch, nicht zufällig

Dasselbe Dokument liefert **immer** dasselbe Ergebnis. Eine Demo oder Testsession
lässt sich damit exakt wiederholen — bei Zufall wäre kein Vergleich zwischen zwei
Teilnehmenden möglich.

**Vier Dokumente scheitern beim ersten Upload und gehen beim zweiten durch.**
Genau das macht die Korrekturschleife überhaupt vorführbar:

| Dokument | Ergebnis beim ersten Versuch |
|---|---|
| Gehaltsabrechnung September (Iva) | Foto unscharf — Beträge nicht lesbar |
| Gehaltsabrechnung August (Michael) | Nur die erste Seite erkannt |
| Objektfotos | Nur eine Aufnahme erkannt |
| Verlängerung Aufenthaltstitel | Gültigkeitsdatum liegt in der Vergangenheit |

**Alle anderen Dokumente gehen sofort durch.**

Jeder Fehlschlag nennt den Grund **und** einen Hinweis zur Behebung
(z. B. „Legen Sie die Abrechnung flach hin, sorgen Sie für gutes Licht") und
bietet **Erneut versuchen** an.

---

## Dokument-Vorschau

Jedes hochgeladene Dokument lässt sich über **Ansehen** öffnen — in der Zeile und
im Upload-Dialog direkt nach erfolgreichem Upload. Der Viewer zeigt Dokumentname,
Dateiname und bei Problemfällen die Begründung über dem Blatt.

**Alle 21 Dokumente haben eine Vorschau**, verteilt auf **14 gemockte Dokumenttypen**:

| Typ | Beispiel |
|---|---|
| `gehalt` | Entgeltabrechnung mit Bezügen, Abzügen, Nettoentgelt, IBAN |
| `ausweis` | Personalausweis Vorder-/Rückseite inkl. MRZ-Zeilen |
| `aufenthalt` | Aufenthaltstitel (Blaue Karte EU) mit Gültigkeitsdatum |
| `schreiben` | Behördenschreiben zur Verlängerung |
| `kontoauszug` | Kontoauszug mit Buchungen und Saldo |
| `grundbuch` | Grundbuchauszug, Abteilungen I–III |
| `wohnflaeche` | Raumtabelle mit Länge/Breite/Faktor, Summe 78,45 m² |
| `flurkarte` | Liegenschaftskarte als SVG, mit Nordpfeil und Maßstab |
| `bauplan` | Grundriss als SVG, bemaßt |
| `baubeschreibung` | Sechs Abschnitte Konstruktion bis Bodenbeläge |
| `kaufvertrag` | Vertragsentwurf §§ 1–5 mit ENTWURF-Stempel |
| `expose` | Objekt-Exposé mit Bildband und Eckdaten |
| `fotos` | Objektfotos als Kachelraster |
| `energie` | Energieausweis mit Farbskala A+ bis H, Marker auf C |

Alles ist Markup und Inline-SVG — **kein Bildmaterial**, die Dateien bleiben also
eigenständig teilbar. Papierformat fest 420 × 594 px (A4-Verhältnis), die Aufrufer
skalieren nur (mobil ca. 0,85).

**Wichtig für die Session:** die Inhalte sind erfunden, aber konsistent zur Persona —
Iva Petrova und Michael Petrov, Lindenstraße 14 in Köln, Kaufpreis 210.000 €,
78,4 m². Wer im Test die Zahlen quer liest, findet keine Widersprüche.

---

## Verifiziert (0 Console-Fehler, Index ✅ bei 49 Prototypen)

| Viewport | Ablauf | Ringe |
|---|---|---|
| Desktop | Fehlschlag → Wiederholung → Erfolg | 5/3/13 → 4/4/13 → 4/3/14 |
| Mobile | Erfolg (Kontoauszug), dann Fehlschlag → Wiederholung (Objektfotos) | 5/3/13 → 5/2/14 → 4/2/15 |

*(Ringe gelesen als Offen / Erhalten — Stand vor der Zusammenlegung, siehe unten)*

**„Erhalten" ist ausschließlich gestiegen — 13 → 14 → 15.** Ein fehlgeschlagener
Upload verschiebt ein Dokument von *Offen* nach *Aktion erforderlich* und legt es
mit seiner Begründung in die Aktionszone, nimmt aber nie etwas zurück, das bereits
gezählt wurde. Damit hält die Regel „kein Rückwärtslaufen" auch unter echter
Interaktion, nicht nur im Startzustand.

---

## Nur noch zwei Zustände: Offen · Erhalten

Aus Kundensicht war „Offen" und „Aktion erforderlich" dasselbe — beides heißt
„da muss ich noch ran". Es gibt deshalb **keinen dritten Status** mehr.

- **Ringe:** nur `Offen` und `Erhalten`.
- **Die Aktionszone oben bleibt.** Sie zeigt, was der Berater nach Sichtung
  konkret nachfordert — technisch: alle offenen Unterlagen, die ein `reason`
  tragen. Ein Zustand, zwei Orte: in der Zone steht das *Warum*, in der Gruppe
  steht die Zeile.
- Ein fehlgeschlagener Upload erzeugt also keinen Fehlerstatus, sondern lässt die
  Unterlage offen und hängt ihr eine Begründung an — womit sie in der Zone landet.

---

## Löschen und erneut hochladen

Im Viewer stehen **Ersetzen** und **Löschen**. Löschen fragt vorher nach.

- Gelöscht wird **die Datei, nicht die Anforderung** — die Zeile bleibt in der
  Liste und steht wieder auf `Offen`.
- War die Unterlage **vom Berater nachgefordert**, kehrt ihre ursprüngliche
  Begründung zurück und sie steht wieder in der Aktionszone. Die Ansage des
  Beraters überlebt Upload und Löschung.
- Der **Versuchszähler wird nicht zurückgesetzt**: was einmal durchgegangen ist,
  geht nach erneutem Hochladen wieder durch. Niemand wird fürs Aufräumen bestraft.
- `Erhalten` **sinkt** beim Löschen (13 → 12). Das ist beabsichtigt und etwas
  anderes als die Regel „kein Rückwärtslaufen": die verbietet, dass das *System*
  etwas wegnimmt, das die Kundin erledigt hat. Nimmt sie ihre eigene Datei zurück,
  ist das ihre Entscheidung.

Verifiziert auf beiden Viewports: Abbrechen kehrt zum selben Dokument zurück,
Löschen schließt den Viewer und aktualisiert Ringe und Liste, erneutes Hochladen
führt zurück auf `Erhalten`.

---

## Zwei bewusste Entscheidungen

Beide sind absichtlich so — falls sie andersherum gewollt sind, hier nachziehen:

1. **Die Erfolgsmeldung sagt „Wir haben Ihre Unterlage erhalten"**, behauptet also
   keine Freigabe. Der Screen kennt nur das Ergebnis der automatischen Prüfung,
   nicht das Urteil eines Menschen.
2. **Ein gescheitertes Dokument behält seinen hochgeladenen Dateinamen**, damit
   erkennbar bleibt, *welche* Datei abgelehnt wurde.

---

## Worauf in der Session achten

- Wird die **Aktionszone oben** überhaupt gelesen, oder wird direkt in den Gruppen
  gescrollt? (Auf Mobile füllt sie bei drei Einträgen fast den ganzen Screen.)
- Ist nach einem Fehlschlag klar, **was konkret zu tun ist** — reicht der Hinweis,
  oder wird nach einem Beispiel gesucht?
- Wird **„Erhalten"** als „durch" verstanden oder als „die Bank hat zugestimmt"?
  Das ist die Formulierung mit dem größten Risiko.
- Fällt auf, dass **„Exposé" grün bleibt**, während „Exposé — neue Fassung"
  als neue Anforderung erscheint? Oder wirkt das wie ein Widerspruch?
- Auf Mobile: wird **Foto aufnehmen** oder **Datei wählen** gegriffen?
- Wird **Ansehen** überhaupt gefunden und benutzt?
- Ist beim Löschen klar, dass **die Anforderung bestehen bleibt** und nur die Datei
  verschwindet? Das ist die Stelle mit dem größten Missverständnispotenzial.
- Wird die **Aktionszone** als etwas anderes gelesen als die offenen Zeilen darunter,
  oder wirkt sie wie eine Dopplung?

---

## Zurücksetzen zwischen zwei Teilnehmenden

Der Zustand liegt nur im Speicher — **Seite neu laden** setzt alles zurück
(5 Offen / 3 Aktion erforderlich / 13 Erhalten). Auch die Zähler für die
Erst-Versuche werden dabei zurückgesetzt, die vier Dokumente oben scheitern
also wieder wie beim ersten Mal.
