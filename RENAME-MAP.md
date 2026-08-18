# Rename Map — 2026-08-18

Alle Umbenennungen der Index-Umstellung. Ordner wurden **nicht** verschoben.
Jede Umbenennung per `git mv`, die Historie bleibt also erhalten.

| Alt | Neu |
|---|---|
| `to-do/mein-tag-final.html` | `mein-tag-v3.html` |
| `advisor-dashboard/loan-application/termin-scheduling-flow-v2-nylas.html` | `termin-scheduling-flow-v2.html` |
| `Customer Dashboard/selfdisclosure/V1-Prototype.html` | `selbstauskunft-v1.html` |
| `mortgage-hub/offer-submission/index.html` | `offer-submission-v1.html` |
| `doc-center/doc-center-skeleton/docCenterSkeleton.html` | `doc-center-skeleton-v1.html` |
| `doc-center/doc-center-skeleton/digital-qa-doc-center-v7-upload-additional-doc-flow.html` | `digital-qa-doc-center-v7.html` |
| `doc-center/width-comparison-mock.html` | `width-comparison-v1.html` |
| `data-validation/application-form/prototype1.html` | `application-form-v1.html` |
| `data-validation/application-form/prototype2.html` | `application-form-v2.html` |
| `data-validation/application-form/prototype3.html` | `application-form-v3.html` |
| `data-validation/application-form/table-validation-v2-usability-testing.html` | `application-form-v4.html` |
| `data-validation/application-form/table-validation-v5.html` | `application-form-v5.html` |
| `data-validation/application-form/table-validation-v6.html` | `application-form-v6.html` |
| `data-validation/application-form/table-validation-v7.html` | `application-form-v7.html` |
| `data-validation/application-form/table-validation-devready-v1.html` | `data-validation-table-v1.html` |
| `data-validation/application-form/table-validation-devready-v2.html` | `data-validation-table-v2.html` |
| `data-validation/application-form/christian-v1.html` | `data-validation-beta-v1.html` |
| `data-validation/important-fields/prototypeCv1.html` | `important-fields-v1.html` |
| `data-validation/important-fields/highlighting-important-fields-v1.html` | `important-fields-v2.html` |
| `data-validation/important-fields/highlighting-important-fields-v3.html` | `important-fields-v4.html` |
| `data-validation/important-fields/highlighting-important-fields-v5.html` | `important-fields-v5.html` |
| `data-validation/important-fields/highlighting-important-fields-v6.html` | `important-fields-v6.html` |
| `data-validation/important-fields/highlighting-important-fields-finlink-v1.html` | `important-fields-finlink-v1.html` |
| `data-validation/important-fields/highlighting-important-fields-v4.html` | `important-fields-finlink-v2.html` |
| `data-validation/important-fields/highlighting-important-fields-finlink-v3.html` | `important-fields-finlink-v3.html` |
| `data-validation/important-fields/highlighting-important-fields-finlink-v4.html` | `important-fields-finlink-v4.html` |
| `data-validation/coba/data-validation-coba.html` | `coba-data-validation-v1.html` |
| `data-validation/important-fields/highlighting-important-fields-coba-V1.html` | `coba-important-fields-v2.html` |
| `data-validation/important-fields/highlighting-important-fields-coba-V2.html` | `coba-important-fields-v3.html` |

## Besonderheiten

- **`mortgage-hub/offer-submission/index.html` → `offer-submission-v1.html`**
  Die Datei war nie ein Launcher, sondern ein 46-KB-Prototyp mit irreführendem Namen.

- **`highlighting-important-fields-v2.html` fehlt.**
  Der alte Index verlinkte diese Datei, sie existiert nicht auf der Festplatte
  (der Link lief ins Leere). Die Version wurde ersatzlos gestrichen; die Nummerierung
  von Important Fields hat deshalb eine Lücke bei V3 — das ist ehrlicher als umnummerieren.

- **Nummern folgen jetzt den Karten-Labels, nicht den alten Dateinamen.**
  Beispiel: `highlighting-important-fields-v1.html` hieß im Index schon immer „V2"
  und heißt jetzt auch so — `important-fields-v2.html`.

- **`Customer Dashboard/` behält Großbuchstaben und Leerzeichen.**
  Ordner umzubenennen war ausgeschlossen; das Manifest trägt den Pfad `%20`-kodiert.

- **Titel angeglichen.** Alle 46 `<title>`-Tags entsprechen jetzt dem Dateinamen
  und dem Index-Eintrag. Vorher hießen z. B. drei verschiedene Doc-Center-Dateien
  alle „DigitalQA Doc Center V5".
