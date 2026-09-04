# Massenimport

Der Berater holt seinen Altbestand von einer Plattform (Europace, eHyp) nach
FinLink. Zwei Flows, ein Prototyp:

1. **Import starten** — Anträge → *Importieren* → *Plattformimport manuell starten*
   → vierstufiger Dialog bis zum Ergebnis.
2. **Import nachschlagen** — Benutzermenü *Gernot Schusser* → *Mein Unternehmen*
   (Abschnitt *Plattformen*) → Massenimport-Verlauf → ein Lauf → Detailseite mit
   der Zusammenfassung.

Die beiden hängen zusammen: Ein im Dialog abgeschlossener Lauf steht danach oben
im Verlauf und ist dort anklickbar.

---

## Was hier drin liegt

| Datei | Wofür |
|---|---|
| `mass-import-v1.html` | **aktuell** — Doppelklick genügt, kein Server nötig |
| `mass-import-data.js` | Quellen, Zeiträume, Verlauf, Konflikte, Anträge-Tabelle, Plattformen |

Vorlage: [Figma — Lender Integration · Mass import](https://www.figma.com/design/CG7ESGQPt0k4pcPzPDEn33/Lender-Intergration---Mass-import?node-id=0-1)

---

## Die drei Bildschirme

**Anträge** — Einstieg in Flow 1. Der Knopf *Importieren* öffnet ein Menü mit
*Einzelimport*, *Massenimport* und *Plattformimport manuell starten*. Die letzten
beiden führen in denselben Dialog, *Einzelimport* ist nicht verdrahtet.

Darunter steht der Abschnitt **Aktueller Import** — aber nur, solange es einen gibt:

| Zustand | Zeile im Menü |
|---|---|
| Import läuft | drehender Ring · *Import läuft* · Quelle und Prozent, live mitzählend |
| Import fertig | grüner Haken · *Import abgeschlossen* · Quelle und „x von y" |

Ein Klick führt zurück in den Lauf: während er läuft auf den Fortschritt, danach
auf das Ergebnis mit der Tabelle der nicht importierten Fälle. Sobald der Lauf
über *Fertig* im Verlauf abgelegt ist, verschwindet der Abschnitt wieder.

Damit ist der minimierte Import nicht mehr nur an den flüchtigen Hinweis unten
rechts gebunden — er hat einen festen Platz, zu dem man jederzeit zurückfindet.

**Mein Unternehmen** — erreichbar über das Benutzermenü oben rechts und über
*Unternehmen* in der Seitennavigation. Links die Profilkarte und die
Abschnittsnavigation, in der *Plattformen* offen steht; rechts die Plattformzugänge
der Organisation und darunter der **Massenimport-Verlauf** — die Log-Seite mit neun
Läufen in vier Zuständen. Jede Zeile führt über *Import ansehen* auf die
Detailseite. Alles außer *Plattformen* ist Kulisse und meldet sich als solche.

Der Verlauf hing vorher unter *Quellen*; dort ist er nicht mehr zu finden.

**Detailseite** — links der Status als Abschnittsnavigation, rechts die
Zusammenfassung. Was gezeigt wird, hängt am Status:

| Status | Detailseite zeigt |
|---|---|
| Import abgeschlossen | vier Kennzahlen · Prolongations-Hinweis · grüne Bestätigung |
| Teilweise importiert | vier Kennzahlen · Prolongations-Hinweis · rotes Band · Konflikttabelle |
| In Warteschlange | Hinweis „läuft noch" · Fortschritt in Prozent |
| Fehlgeschlagen | roter Grund (Zugangsdaten, Timeout) · *Erneut versuchen* |

---

## Der Dialog

| Schritt | Was passiert |
|---|---|
| 1 · Auswahl | Quelle, Zeitraum, Von/Bis, Schalter für abgeschlossene Fälle |
| 2 · Treffer | aktive und abgeschlossene Fälle als Kacheln, dann bestätigen |
| 3 · Läuft | Fortschritt in Prozent, *Minimieren* legt ihn in den Hintergrund |
| 4 · Ergebnis | Kennzahlen, nicht importierte Fälle, E-Mail-Hinweis |

**Was wirklich funktioniert, nicht nur aussieht:**

- *Fälle suchen* bleibt gesperrt, bis Quelle und Zeitraum stehen. Bei
  *Benutzerdefiniert* zusätzlich, bis beide Datumsfelder gefüllt sind.
- Der Zeitraum füllt Von/Bis vor und sperrt sie; nur *Benutzerdefiniert* öffnet sie.
- Der Schalter *Abgeschlossene Fälle einschließen* rechnet mit: Er ändert die
  zweite Kachel in Schritt 2, die Zahl im Import-Knopf und die Prolongations-To-dos
  im Ergebnis.
- Jede Quelle hat eigene Trefferzahlen — eHyp (Altbestand) liefert andere als
  Europace (Hauptkonto).
- *Minimieren* schließt den Dialog, der Lauf läuft weiter; unten rechts steht ein
  Hinweis, der nach Abschluss zu *Ergebnis ansehen* wechselt.
- *Fertig* und *Weitere Fälle importieren* schreiben den Lauf in den Verlauf.

---

## Wo der Prototyp bewusst von der Figma abweicht

Drei Stellen, an denen die Figma sich selbst widerspricht. Falls die Figma recht
hat und nicht der Prototyp, sind es kleine Änderungen — sie stehen alle in
`mass-import-data.js` bzw. in `detailOeffnen()`.

**1 · „Fehlgeschlagen" mit importierten Fällen.**
Die Figma zeigt in der Verlaufsliste `Fehlgeschlagen · 34 von 34 importiert`. Die
Notiz daneben sagt aber: *„couldn't even connect to platform, api or credentials
etc."* Beides zusammen geht nicht. Der Prototyp folgt der Notiz: fehlgeschlagen
heißt, die Verbindung kam nicht zustande, es wurde kein Fall verändert —
Ergebnisspalte *Nicht gestartet*, Detailseite mit Grund und *Erneut versuchen*.

**2 · „Import abgeschlossen" mit vier fehlgeschlagenen Fällen.**
Der Figma-Frame *Import abgeschlossen* zeigt 4 fehlgeschlagene Fälle und die
Konflikttabelle — dann wäre er von *Teilweise importiert* nicht zu unterscheiden.
Der Prototyp trennt: *abgeschlossen* = kein Fall offen (grüne Bestätigung),
*teilweise* = einzelne Fälle offen (rotes Band + Konflikttabelle). Die
Bildkomposition ist in beiden Fällen die aus der Figma.

**3 · Zahlen im Dialog-Ergebnis.**
Die Figma nennt im grünen Band „47 von 51", in den Kacheln aber 56 / 51 / 2 / 4 —
das summiert sich nicht. Der Prototyp rechnet die vier Kacheln aus der
tatsächlichen Trefferzahl, sodass Gesamt = Importiert + Übersprungen +
Fehlgeschlagen immer aufgeht.

Kleinere Angleichungen: *In Warteschlange* bekommt in der Figma mal einen
*Import ansehen*-Knopf und mal nicht — hier hat jede Zeile einen. Die Oberfläche
ist durchgängig deutsch (Figma mischt „Source name", „Items per page").

---

## Zum Design

Der Prototyp lädt `design-system/tokens.css` und `styles.css`; alles Weitere steht
im `<style>`-Block der Datei. Farben, Abstände und Radien kommen aus den Tokens —
keine gesetzten Hexwerte außer dem FinLink-Logo.
