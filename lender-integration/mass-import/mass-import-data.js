/* =====================================================================
   MASS IMPORT — DATEN
   Getrennt vom Prototyp, damit Inhalte ohne HTML-Kenntnisse
   geändert werden können.

   Status-Semantik (aus der Figma-Annotation):
     warteschlange  — Import läuft noch oder wartet auf einen freien Slot
     abgeschlossen  — Lauf beendet, kein Fall fehlgeschlagen
     teilweise      — Lauf beendet, einzelne Fälle konnten nicht angelegt werden
     fehlgeschlagen — Verbindung zur Plattform kam gar nicht zustande
                      (API/Zugangsdaten) → kein einziger Fall importiert
   ===================================================================== */

window.MASS_IMPORT = {

  /* ---------------------------------------------------------------
     QUELLEN — die Auswahl im Massenimport-Dialog
     `aktive` / `abgeschlossene` sind die Trefferzahlen, die der
     Dialog nach „Fälle suchen" anzeigt.
     --------------------------------------------------------------- */
  quellen: [
    { id: "europace-haupt", name: "Europace (Hauptkonto)",   kurz: "Europace · Hauptkonto",   aktive: 124, abgeschlossene: 38 },
    { id: "europace-nord",  name: "Europace (Team Nord)",    kurz: "Europace · Team Nord",    aktive: 87,  abgeschlossene: 21 },
    { id: "ehyp-home",      name: "eHyp Home (Hauptzugang)", kurz: "eHyp Home · Hauptzugang", aktive: 203, abgeschlossene: 64 },
    { id: "ehyp-alt",       name: "eHyp (Altbestand)",       kurz: "eHyp · Altbestand",       aktive: 56,  abgeschlossene: 12 }
  ],

  /* ---------------------------------------------------------------
     ZEITRÄUME — Auswahl „Zeitraum" im Dialog.
     `von` / `bis` füllen die beiden Datumsfelder vor.
     `frei: true` = Nutzer trägt selbst ein.
     --------------------------------------------------------------- */
  zeitraeume: [
    { id: "30t",   label: "Letzte 30 Tage",     von: "27.05.2026", bis: "26.06.2026" },
    { id: "90t",   label: "Letzte 90 Tage",     von: "28.03.2026", bis: "26.06.2026" },
    { id: "12m",   label: "Letzte 12 Monate",   von: "26.06.2025", bis: "26.06.2026" },
    { id: "alles", label: "Gesamter Bestand",   von: "01.01.2018", bis: "26.06.2026" },
    { id: "frei",  label: "Benutzerdefiniert",  von: "",           bis: "", frei: true }
  ],

  /* ---------------------------------------------------------------
     MEIN UNTERNEHMEN — die Seite hinter dem Benutzermenü.
     `profilAufgaben` sind die Verweise in der Profilkarte,
     `unternehmenNav` die Abschnittsnavigation darunter
     (`aktiv` = der gezeigte Abschnitt, `klappbar` = mit Pfeil),
     `plattformen` die Zugänge dieser Organisation.
     --------------------------------------------------------------- */
  profilAufgaben: [
    "Kunden einladen",
    "Bestandskunden importieren",
    "Lead-Quellen verbinden",
    "Homepage Einbindungen",
    "Homepage Einbindungen für Quellen"
  ],

  unternehmenNav: [
    { label: "Unternehmensdetails" },
    { label: "Berater-Profile" },
    { label: "Plattformen", aktiv: true },
    { label: "Zuteilungsregeln",       klappbar: true },
    { label: "Benutzerdefinierte Tags", klappbar: true },
    { label: "Kundenbereich",          klappbar: true },
    { label: "Widget-Einbindungen",    klappbar: true },
    { label: "Kundenkommunikation" }
  ],

  plattformen: [
    { name: "eHyp Home Org Connection", aktiv: true, plattform: "Ehyp Home Organization", erstellt: "14:04 - 26.02.2026" }
  ],

  /* ---------------------------------------------------------------
     KONFLIKTE — die Fälle, die ein Lauf nicht anlegen konnte.
     Werden im Dialog-Ergebnis und auf der Detailseite gezeigt.
     --------------------------------------------------------------- */
  konflikte: [
    { fall: "Familie Berger",  nr: "#2024-0912", grund: "Konflikt: Antrag mit gleicher E-Mail existiert bereits — Zuordnung erforderlich" },
    { fall: "M. Albrecht",     nr: "#2025-0044", grund: "Pflichtangabe fehlt: Summe Vorlasten konnte nicht gelesen werden" },
    { fall: "Familie Demir",   nr: "#2024-0788", grund: "Grundbuchdaten unvollständig — Quelle lieferte kein gültiges Format" },
    { fall: "J. Neumann",      nr: "#2025-0210", grund: "Quelle vorübergehend nicht erreichbar (Timeout) — erneut versuchbar" },
    { fall: "Familie Özdemir", nr: "#2025-0331", grund: "Konflikt: Antrag mit gleicher E-Mail existiert bereits — Zuordnung erforderlich" },
    { fall: "K. Lindner",      nr: "#2024-0655", grund: "Objektadresse konnte nicht validiert werden — Postleitzahl unbekannt" }
  ],

  /* ---------------------------------------------------------------
     VERLAUF — die Liste unter Mein Unternehmen → Plattformen.
     Neueste zuerst. Ein neuer Lauf wird oben eingefügt.
     `datum` steht in der Spalte „Datum", `datum` + `zeit` im Kopf
     des Dialogs.
     `grund` erscheint nur bei `fehlgeschlagen` — in klarem Deutsch,
     denn im Dialog steht er direkt über dem nächsten Schritt.
     --------------------------------------------------------------- */
  verlauf: [
    { id: "imp-9", quelle: "europace-haupt", von: "01.01.2026", bis: "26.06.2026", status: "teilweise",
      gesamt: 279, importiert: 255, uebersprungen: 20, fehlgeschlagen: 4, prolongationen: 8,
      gestartet: "Jan Joisten",     datum: "26.06.2026", zeit: "09:14" },

    { id: "imp-8", quelle: "ehyp-home", von: "26.12.2025", bis: "26.06.2026", status: "warteschlange",
      gesamt: 120, importiert: 89, uebersprungen: 0, fehlgeschlagen: 0, prolongationen: 0,
      gestartet: "Gernot Schusser", datum: "26.06.2026", zeit: "08:52" },

    { id: "imp-7", quelle: "europace-nord", von: "27.05.2026", bis: "26.06.2026", status: "teilweise",
      gesamt: 450, importiert: 412, uebersprungen: 32, fehlgeschlagen: 6, prolongationen: 14,
      gestartet: "Jan Joisten",     datum: "25.06.2026", zeit: "17:03" },

    { id: "imp-6", quelle: "ehyp-alt", von: "01.01.2025", bis: "31.12.2025", status: "fehlgeschlagen",
      gesamt: 34, importiert: 0, uebersprungen: 0, fehlgeschlagen: 0, prolongationen: 0,
      grund: "Die Zugangsdaten für eHyp (Altbestand) wurden von der Plattform abgelehnt. Deshalb kam keine Verbindung zustande.",
      gestartet: "Gernot Schusser", datum: "25.06.2026", zeit: "14:40" },

    { id: "imp-5", quelle: "ehyp-home", von: "26.12.2025", bis: "26.06.2026", status: "abgeschlossen",
      gesamt: 203, importiert: 178, uebersprungen: 25, fehlgeschlagen: 0, prolongationen: 11,
      gestartet: "Gernot Schusser", datum: "24.06.2026", zeit: "11:20" },

    { id: "imp-4", quelle: "europace-haupt", von: "26.03.2026", bis: "26.06.2026", status: "abgeschlossen",
      gesamt: 95, importiert: 67, uebersprungen: 28, fehlgeschlagen: 0, prolongationen: 5,
      gestartet: "Gernot Schusser", datum: "23.06.2026", zeit: "16:07" },

    { id: "imp-3", quelle: "ehyp-home", von: "19.06.2026", bis: "26.06.2026", status: "warteschlange",
      gesamt: 561, importiert: 523, uebersprungen: 0, fehlgeschlagen: 0, prolongationen: 0,
      gestartet: "Jan Joisten",     datum: "23.06.2026", zeit: "09:31" },

    { id: "imp-2", quelle: "europace-nord", von: "15.04.2026", bis: "26.06.2026", status: "fehlgeschlagen",
      gesamt: 42, importiert: 0, uebersprungen: 0, fehlgeschlagen: 0, prolongationen: 0,
      grund: "Europace (Team Nord) hat auf die Anfrage nicht geantwortet. Deshalb kam keine Verbindung zustande.",
      gestartet: "Gernot Schusser", datum: "22.06.2026", zeit: "13:55" },

    { id: "imp-1", quelle: "ehyp-alt", von: "01.02.2026", bis: "26.06.2026", status: "teilweise",
      gesamt: 310, importiert: 302, uebersprungen: 5, fehlgeschlagen: 3, prolongationen: 6,
      gestartet: "Jan Joisten",     datum: "21.06.2026", zeit: "10:12" }
  ],

  /* ---------------------------------------------------------------
     ANTRÄGE — die Tabelle auf der Startseite des Flows.
     Nur so viel, dass die Seite echt wirkt.
     --------------------------------------------------------------- */
  antraege: [
    { name: "Silvia Moreno",     tag: "New",     haus: true,  volumen: "400.000 €", stadt: "Berlin",    status: "Finanzierung angefragt",     berater: "Gernot Schusser", aktiv: "vor 1 Stunde",  quelle: "Immobilienscout24", todo: "",           tagText: ">100% BLA",          tagFarbe: "grau" },
    { name: "Frederick Pask",    tag: "New",     haus: true,  volumen: "480.000 €", stadt: "Hamburg",   status: "Selbstauskunft vollständig", berater: "Jan Joisten",     aktiv: "vor 5 Stunden", quelle: "Immobilienscout24", todo: "client",     tagText: "Active",             tagFarbe: "gruen" },
    { name: "Sebastian Stanjek", tag: "New",     haus: false, volumen: "320.000 €", stadt: "Frankfurt", status: "Selbstauskunft vollständig", berater: "Gernot Schusser", aktiv: "vor 2 Tagen",   quelle: "Max Mustermann",    todo: "",           tagText: "",                   tagFarbe: "" },
    { name: "Silvia Moreno",     tag: "Claimed", haus: false, volumen: "200.000 €", stadt: "Berlin",    status: "Selbstauskunft vollständig", berater: "Gernot Schusser", aktiv: "vor 1 Stunde",  quelle: "Max Mustermann",    todo: "",           tagText: "Uploaded documents", tagFarbe: "tuerkis" },
    { name: "Frederick Pask",    tag: "",        haus: true,  volumen: "290.000 €", stadt: "Hamburg",   status: "Finanzierung angefragt",     berater: "Jan Joisten",     aktiv: "vor 5 Stunden", quelle: "Immobilienscout24", todo: "client",     tagText: "",                   tagFarbe: "" },
    { name: "Sebastian Stanjek", tag: "",        haus: false, volumen: "230.000 €", stadt: "Bamberg",   status: "Selbstauskunft vollständig", berater: "Gernot Schusser", aktiv: "vor 1 Tag",     quelle: "Max Mustermann",    todo: "due",        tagText: "",                   tagFarbe: "" },
    { name: "Silvia Moreno",     tag: "Claimed", haus: true,  volumen: "370.000 €", stadt: "Rüdnitz",   status: "Selbstauskunft vollständig", berater: "Gernot Schusser", aktiv: "vor 4 Stunden", quelle: "Max Mustermann",    todo: "overdue",    tagText: "Important client",   tagFarbe: "orange" },
    { name: "Frederick Pask",    tag: "",        haus: false, volumen: "410.000 €", stadt: "Bernau",    status: "Finanzierung angefragt",     berater: "Jan Joisten",     aktiv: "vor 2 Tagen",   quelle: "Immobilienscout24", todo: "",           tagText: "",                   tagFarbe: "" },
    { name: "Sebastian Stanjek", tag: "",        haus: false, volumen: "550.000 €", stadt: "Potsdam",   status: "Finanzierung angefragt",     berater: "Gernot Schusser", aktiv: "vor 2 Stunden", quelle: "Max Mustermann",    todo: "",           tagText: "",                   tagFarbe: "" },
    { name: "Silvia Moreno",     tag: "",        haus: false, volumen: "210.000 €", stadt: "Hamburg",   status: "Selbstauskunft vollständig", berater: "Gernot Schusser", aktiv: "vor 5 Stunden", quelle: "Max Mustermann",    todo: "",           tagText: "",                   tagFarbe: "" },
    { name: "Frederick Pask",    tag: "",        haus: true,  volumen: "355.000 €", stadt: "Bonn",      status: "Selbstauskunft vollständig", berater: "Jan Joisten",     aktiv: "vor 3 Stunden", quelle: "Immobilienscout24", todo: "client",     tagText: "Custom tag",         tagFarbe: "lila" },
    { name: "Sebastian Stanjek", tag: "",        haus: true,  volumen: "420.000 €", stadt: "München",   status: "Finanzierung angefragt",     berater: "Jan Joisten",     aktiv: "vor 3 Tagen",   quelle: "Immobilienscout24", todo: "",           tagText: "",                   tagFarbe: "" }
  ]
};
