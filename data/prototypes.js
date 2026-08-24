/* =====================================================================
   PROTOTYPES — MANIFEST  (single source of truth for the whole index)

   This is the ONLY file you edit when you add a prototype.
   Never edit index.html, team.html or project.html by hand.

   Why .js and not .json?
   Prototypes are opened by double-clicking (file://). Browsers block
   fetch() of a .json file from file:// for security. A .js file loads
   via <script src> and works everywhere. The content is plain JSON.

   How to add a prototype → see NAMING-CONVENTION.md
   ===================================================================== */

window.PROTOTYPES = {

  /* ---------------------------------------------------------------
     TEAMS — the FinLink team hierarchy. Order = order on the homepage.
     --------------------------------------------------------------- */
  teams: [
    { id: "advisors",          name: "Advisors",
      desc: "Arbeitsfläche des Beraters — Tagesplanung, To-do's und Termine.",
      handover: [], testing: [] },
    { id: "mavericks",         name: "Mavericks",
      desc: "Antragsstrecke und Datenvalidierung — Application Form, wichtige Felder, Bankvarianten.",
      handover: [], testing: [] },
    { id: "document-center",   name: "Document Center",
      desc: "Dokumentenverwaltung und digitale Qualitätsprüfung.",
      handover: [], testing: [] },
    { id: "customer-dashboard",name: "Customer Dashboard",
      desc: "Die Kundensicht — Dashboard mit Status, Aufgaben und Dokumenten sowie die Selbstauskunft.",
      handover: [], testing: [] },
    { id: "mortgage-hub",      name: "Mortgage Hub",
      desc: "Angebotsstrecke und Kreditantrag — Angebotssuche und Einreichung.",
      handover: [], testing: [] },
    { id: "lender-integration",name: "Lender Integration",
      desc: "Anbindung der Kreditgeber — Schnittstellen und bankspezifische Flows.",
      handover: [], testing: [] },
    { id: "product-design",    name: "Product Design",
      desc: "Research- und Discovery-Werkzeuge des Design-Teams.",
      handover: [], testing: [] },
    { id: "design-system",     name: "Design System",
      desc: "Gemeinsame Komponenten, Tokens und Layout-Referenzen.",
      handover: [], testing: [] }
  ],

  /* ---------------------------------------------------------------
     PROJECTS — a topic inside a team. Holds the versions.
     `flow` = what the user does in this flow, in one sentence.
     --------------------------------------------------------------- */
  projects: [
    { id: "mein-tag", team: "advisors", name: "Mein Tag",
      flow: "Der Berater startet in seinen Tag: offene To-do's sichten, priorisieren, abhaken und neue anlegen." },
    { id: "todo-sortierung", team: "advisors", name: "ToDo-Sortierung",
      flow: "Der Berater sortiert die Anträge-Liste nach Fälligkeit der zugehörigen To-do's und wechselt bei Bedarf in die Pipeline-Ansicht." },
    { id: "termin-scheduling", team: "advisors", name: "Termin-Scheduling",
      flow: "Der Berater plant, bestätigt, verschiebt oder sagt einen Kundentermin ab — direkt aus dem Antrag heraus." },
    { id: "antrags-uebersicht", team: "advisors", name: "Antrags Übersicht",
      flow: "Der Berater sieht innerhalb eines Antrags die zugehörigen To-do's auf einen Blick — inklusive Fälligkeit, Inline-Bearbeitung und Kontextmenü." },

    { id: "application-form", team: "mavericks", name: "Application Form",
      flow: "Der Berater prüft die vom Kunden gelieferten Angaben gegen die ausgelesenen Systemwerte und bestätigt oder korrigiert jedes Feld." },
    { id: "data-validation-table", team: "mavericks", name: "Data Validation Table (Dev Ready)",
      flow: "Bereinigte Übergabeversion der Validierungstabelle für die Entwicklung — ohne experimentelle UI-Elemente." },
    /* Ein Projekt, drei parallele Linien: die Basisfassung und je eine bankspezifische
       Variante. `lines` legt Reihenfolge und Gruppierung auf der Projektseite fest;
       jede Linie hat ihre eigene aktuelle Version. */
    { id: "important-fields-antrag", team: "advisors", name: "Important Fields Highlighting in Antrag",
      flow: "Der Berater sieht im Antrag auf einen Blick, welche Felder für die aktuelle Prozessphase relevant sind und noch fehlen — als Basisfassung und in bankspezifischen Varianten.",
      lines: ["Important Fields", "FinLink", "Coba"] },

    { id: "doc-center-skeleton", team: "document-center", name: "Doc Center Skeleton",
      flow: "Grundgerüst der Dokumentenverwaltung: Liste, Viewer und Seitenvorschau nebeneinander." },
    { id: "digital-qa", team: "document-center", name: "DigitalQA Doc Center",
      flow: "Der Prüfer geht die Kundendokumente durch, markiert Probleme, sammelt Rückfragen und sendet sie gebündelt an den Kunden." },
    { id: "doc-center-user-flow", team: "document-center", name: "User Flow",
      flow: "Logische Übersicht der Prüfungs- und Freigabeentscheidungen im Doc Center." },

    { id: "selbstauskunft", team: "customer-dashboard", name: "Selbstauskunft",
      flow: "Erfassung von Objekt- und Finanzierungsdaten — dichte, power-user-optimierte Übernahme statt Kunden-Wizard." },

    { id: "customer-dashboard", team: "customer-dashboard", name: "Customer Dashboard",
      flow: "Das gesamte Kundendashboard in einem Prototyp: Finanzierungsstatus, offene Aufgaben, Dokumenten-Upload und die Navigation, die alles zusammenhält." },

    { id: "offer-submission", team: "mortgage-hub", name: "Offer Submission",
      flow: "Der Berater sucht Angebote, vergleicht Konditionen und reicht die Finanzierung beim Kreditgeber ein." },

    { id: "jtbd-mapper", team: "product-design", name: "JTBD Mapper",
      flow: "42 Advisor-Jobs nach Wichtigkeit und Zufriedenheit bewerten und die größten Chancen in einer Opportunity-Matrix sichtbar machen." },

    { id: "layout-referenz", team: "design-system", name: "Layout-Referenz",
      flow: "Vergleich von Layoutbreiten als Entscheidungsgrundlage für maximale Lesebreiten." }
  ],

  /* ---------------------------------------------------------------
     PROTOTYPES — one block per version.

     status:   "aktuell"   → newest version of the project
               "abgeloest" → superseded by a newer version
               "archiv"    → experiment, not part of the line

     Übergabe und Usability-Test stehen NICHT hier, sondern als kuratierte
     Liste am Team (teams[].handover / teams[].testing). Dort landet eine
     eingefrorene Kopie — angelegt mit `node freeze.js`. Siehe NAMING-CONVENTION.md.
     --------------------------------------------------------------- */
  prototypes: [

    /* ---- Advisors · Mein Tag ---- */
    { id:"mein-tag-v1", project:"mein-tag", version:1, title:"Mein Tag V1",
      file:"to-do/mein-tag-v1.html", status:"abgeloest",
      changes:"Erste Fassung: dichte To-do-Tabelle mit Status-Stripe, Sortierung, Filtern, Suche, Abhaken mit Undo, Anlege-Panel und simuliertem System-Auslöser." },
    { id:"mein-tag-v2", project:"mein-tag", version:2, title:"Mein Tag V2",
      file:"to-do/mein-tag-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: Wochenkalender im Splitscreen, Panes einzeln ein-/ausklappbar, Wochennavigation. Arbeitslast-Karten mit Tacho-Grafik; „Heute fällig“ schließt jetzt Überfällige mit ein." },
    { id:"mein-tag-v3", project:"mein-tag", version:3, title:"Mein Tag V3",
      file:"to-do/mein-tag-v3.html", status:"abgeloest",
      changes:"Gegenüber V2: Status-Spalte entfallen — ihre Aussage steckt jetzt als Label (Überfällig / Heute / Morgen / Erledigt) direkt in der Spalte „Fälligkeit“. Neuer Filter „Fälligkeit“. Stand nach dem Usability-Test." },

    { id:"mein-tag-v4", project:"mein-tag", version:4, title:"Mein Tag V4",
      file:"to-do/mein-tag-v4.html", status:"aktuell",
      links: [
        { label:"Web Prototyp öffnen", file:"to-do/mein-tag-v4.html" },
        { label:"Mobile Prototyp öffnen", file:"to-do/mein-tag-mobile-v4.html" }
      ],
      changes:"Gegenüber V3: Schnellfilter-Tabs mit Gruppierung im Filter „Alle“, Kalender-Splitscreen mit Rand-Handle zum Ein-/Ausklappen statt Header-Button, Geburtstage im Kalender statt in der Liste. Läuft ohne das Design-System-Stylesheet, ist also eigenständig teilbar. Zusätzlich eigene Mobile-Fassung mit anderer Informationsarchitektur (Segmented Control To-dos/Kalender statt Split-View)." },

    /* ---- Advisors · ToDo-Sortierung ---- */
    { id:"todo-sortierung-v1", project:"todo-sortierung", version:1, title:"ToDo-Sortierung V1",
      file:"to-do/todo-sorting-v1.html", status:"aktuell",
      changes:"Erste Fassung: Anträge-Liste mit sortierbaren Spalten, ToDo-Spalte nach Fälligkeit sortierbar, umschaltbar auf Pipeline-Ansicht mit Drag & Drop." },

    /* ---- Advisors · Termin-Scheduling ---- */
    { id:"termin-scheduling-v1", project:"termin-scheduling", version:1, title:"Termin-Scheduling V1",
      file:"advisor-dashboard/loan-application/termin-scheduling-flow-v1.html", status:"abgeloest",
      changes:"Erste Fassung: eine Drawer für planen, akzeptieren, absagen, verschieben — umschaltbar zwischen eingebettetem Calendly und Outlook-Bookings-iframe." },
    { id:"termin-scheduling-v2", project:"termin-scheduling", version:2, title:"Termin-Scheduling V2",
      file:"advisor-dashboard/loan-application/termin-scheduling-flow-v2.html", status:"aktuell",
      changes:"Gegenüber V1: kein iframe mehr — native Verfügbarkeit und Buchung über Nylas, RSVP auf eingehende Einladungen, Two-Way-Sync und „Technik einblenden“-Schalter." },

    /* ---- Advisors · Antrags Übersicht ---- */
    { id:"todo-v1", project:"antrags-uebersicht", version:1, title:"ToDo V1",
      file:"application-overview/todo-v1.html", status:"aktuell",
      changes:"Erste Fassung: To-do-Liste im Antrag mit farbigem Status-Streifen pro Zeile, Fälligkeit, Inline-Bearbeitung und Kontextmenü (Bearbeiten, Neu zuordnen, Löschen)." },
    { id:"todo-v2", project:"antrags-uebersicht", version:2, title:"ToDo V2",
      file:"application-overview/todo-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: Gruppierung nach Fälligkeit (Überfällig/Heute/Morgen/…) mit farbiger Pill im Gruppenkopf statt Status-Streifen pro Zeile — 1:1 aus mein-tag-v4 übernommen; Gruppen einzeln auf- und zuklappbar." },

    /* ---- Mavericks · Application Form ---- */
    { id:"application-form-v1", project:"application-form", version:1, title:"Application Form V1",
      file:"data-validation/application-form/application-form-v1.html", status:"abgeloest",
      changes:"Erste Fassung: Validierungsfelder als strukturierte Tabelle mit Statusfilter und Detaildrawer zur Einzelfeldprüfung." },
    { id:"application-form-v2", project:"application-form", version:2, title:"Application Form V2",
      file:"data-validation/application-form/application-form-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: kein Drawer mehr — Validierung als schwebendes Panel über dem Formular, Felder inline bearbeit- und bestätigbar." },
    { id:"application-form-v3", project:"application-form", version:3, title:"Application Form V3",
      file:"data-validation/application-form/application-form-v3.html", status:"abgeloest",
      changes:"Gegenüber V2: Entscheidungen direkt in der Tabelle — Kundenwert, Systemwert oder manueller Wert pro Zeile, ohne Drawer und ohne Modal." },
    { id:"application-form-v4", project:"application-form", version:4, title:"Application Form V4",
      file:"data-validation/application-form/application-form-v4.html", status:"abgeloest",
      changes:"Gegenüber V3: Szenario-Switcher (Standard, Standard 2, Fall 1–3), Bestätigungslogik, manuelles Werteingabefeld und integrierte Lohnzettel-Vorschau. Diese Fassung wurde im Usability-Test verwendet." },
    { id:"application-form-v5", project:"application-form", version:5, title:"Application Form V5",
      file:"data-validation/application-form/application-form-v5.html", status:"abgeloest",
      changes:"Gegenüber V4, auf Basis der Testergebnisse: automatisch bestätigte Felder sind vorausgewählt, Filter-Chips aktualisiert, Mismatch-Highlighting eingeführt." },
    { id:"application-form-v6", project:"application-form", version:6, title:"Application Form V6",
      file:"data-validation/application-form/application-form-v6.html", status:"abgeloest",
      changes:"Gegenüber V5: Vereinfachung — alle Felder ungefiltert in der vollständigen Tabelle, keine Filter-Chips, kein aktiver Filterzustand." },
    { id:"application-form-v7", project:"application-form", version:7, title:"Application Form V7",
      file:"data-validation/application-form/application-form-v7.html", status:"aktuell",
      changes:"Gegenüber V6: Validierung nicht mehr als Modal, sondern als eigener Reiter „Antragsvalidierung“ neben „Antrag“ — die Tabelle liegt direkt auf der Seite." },
    { id:"data-validation-beta-v1", project:"application-form", version:1, title:"Data Validation Beta V1",
      file:"data-validation/application-form/data-validation-beta-v1.html", status:"archiv",
      changes:"Früher Beta-Stand, nicht Teil der V1–V7-Linie. Zur Referenz aufbewahrt." },

    /* ---- Mavericks · Data Validation Table (Dev Ready) ---- */
    { id:"data-validation-table-v1", project:"data-validation-table", version:1, title:"Data Validation Table V1",
      file:"data-validation/application-form/data-validation-table-v1.html", status:"abgeloest",
      changes:"Bereinigte Tabellenansicht zur Übergabe: Status-Badges, Bestätigungslogik, manueller Wert und Quellen — ohne experimentelle UI-Elemente." },
    { id:"data-validation-table-v2", project:"data-validation-table", version:2, title:"Data Validation Table V2",
      file:"data-validation/application-form/data-validation-table-v2.html", status:"aktuell",
      changes:"Gegenüber V1: aufklappbare Unterzeilen für Felder mit mehreren Quellwerten; die Systemwert-Zelle zeigt Niedrigst- oder Durchschnittswert per Toggle." },

    /* ---- Mavericks · Important Fields ---- */
    { id:"important-fields-v1", project:"important-fields-antrag", version:1, line:"Important Fields", title:"Important Fields V1",
      file:"data-validation/important-fields/important-fields-v1.html", status:"abgeloest",
      changes:"Erste Fassung: reine Tabelle mit Status, Feld, Kundeneingabe, ausgelesenem Wert und Quelle — ohne Modal, ohne Drawer." },
    { id:"important-fields-v2", project:"important-fields-antrag", version:2, line:"Important Fields", title:"Important Fields V2",
      file:"data-validation/important-fields/important-fields-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: Antragsformular mit Validierungsansicht — wichtige Felder werden per Phasen-Chip ausgewählt und in Seitennavigation und Formular farblich markiert." },
    { id:"important-fields-v4", project:"important-fields-antrag", version:4, line:"Important Fields", title:"Important Fields V4",
      file:"data-validation/important-fields/important-fields-v4.html", status:"abgeloest",
      changes:"Gegenüber V2: Filter-Drawer und Teal-Rahmen zur Feldmarkierung, ohne Label-Tags an den Feldern. (V3 existiert nicht mehr — die Datei ging verloren.)" },
    { id:"important-fields-v5", project:"important-fields-antrag", version:5, line:"Important Fields", title:"Important Fields V5",
      file:"data-validation/important-fields/important-fields-v5.html", status:"abgeloest",
      changes:"Gegenüber V4: bankspezifische Pflichtfelder — je nach gewähltem Kreditgeber werden zusätzliche Felder hervorgehoben." },
    { id:"important-fields-v6", project:"important-fields-antrag", version:6, line:"Important Fields", title:"Important Fields V6",
      file:"data-validation/important-fields/important-fields-v6.html", status:"aktuell",
      changes:"Gegenüber V5: Sticky Progress Bar mit vier Phasen und Kreditgeber-Mehrfachauswahl als Dropdown mit Tags; fehlende Pflichtfelder werden orange markiert." },

    /* ---- Mavericks · Important Fields FinLink ---- */
    { id:"important-fields-finlink-v1", project:"important-fields-antrag", version:1, line:"FinLink", title:"Important Fields FinLink V1",
      file:"data-validation/important-fields/important-fields-finlink-v1.html", status:"abgeloest",
      changes:"Erste Fassung: vier Phasen-Chips (Basisdaten, Zinsindikation, Kreditentscheidung, Finanzierung bestätigt) und Teal-Rahmen-Hervorhebung für eine Bank." },
    { id:"important-fields-finlink-v2", project:"important-fields-antrag", version:2, line:"FinLink", title:"Important Fields FinLink V2",
      file:"data-validation/important-fields/important-fields-finlink-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: Banktabs mit Prozessschritt-Karten, Fortschrittsbalken pro Phase und Feldhervorhebung nach Ausfüllstatus." },
    { id:"important-fields-finlink-v3", project:"important-fields-antrag", version:3, line:"FinLink", title:"Important Fields FinLink V3",
      file:"data-validation/important-fields/important-fields-finlink-v3.html", status:"abgeloest",
      changes:"Zurück auf die Struktur von V1 als Ausgangsbasis für weitere Iterationen — vier Phasen-Chips, Teal-Rahmen." },
    { id:"important-fields-finlink-v4", project:"important-fields-antrag", version:4, line:"FinLink", title:"Important Fields FinLink V4",
      file:"data-validation/important-fields/important-fields-finlink-v4.html", status:"aktuell",
      changes:"Weiterentwicklung von V3 als Ausgangspunkt für neue Designrichtungen und Funktionserweiterungen." },

    /* ---- Mavericks · Coba ---- */
    { id:"coba-v1", project:"important-fields-antrag", version:1, line:"Coba", title:"Coba Data Validation V1",
      file:"data-validation/coba/coba-data-validation-v1.html", status:"abgeloest",
      changes:"Erste Fassung: vereinfachte Validierung auf Basis von Fall 1 — reduzierte Felder, automatisch gesetzte Status, Konfidenz-Score und PSD2-Kontodaten als Quelle." },
    { id:"coba-v2", project:"important-fields-antrag", version:2, line:"Coba", title:"Coba Important Fields V2",
      file:"data-validation/important-fields/coba-important-fields-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: Feldhervorhebung über gegenseitig exklusive Phasen-Chips (Basisdaten, Angebotssuche, Kreditentscheidung) — ohne Validierungsbanner." },
    { id:"coba-v3", project:"important-fields-antrag", version:3, line:"Coba", title:"Coba Important Fields V3",
      file:"data-validation/important-fields/coba-important-fields-v3.html", status:"aktuell",
      changes:"Gegenüber V2: zusätzlicher Toggle „Wichtige Felder hervorheben“ — die Phasen-Chips erscheinen erst nach Aktivierung, nicht mehr standardmäßig." },

    /* ---- Document Center · Skeleton ---- */
    { id:"doc-center-skeleton-v1", project:"doc-center-skeleton", version:1, title:"Doc Center Skeleton V1",
      file:"doc-center/doc-center-skeleton/doc-center-skeleton-v1.html", status:"aktuell",
      changes:"Grundgerüst: Dokumentenliste, Viewer und Seitenvorschau nebeneinander." },

    /* ---- Document Center · DigitalQA ---- */
    { id:"digital-qa-v1", project:"digital-qa", version:1, title:"DigitalQA Doc Center V1",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v1.html", status:"abgeloest",
      changes:"Erster Prototyp für die Usability-Tests des DigitalQA Doc Centers." },
    { id:"digital-qa-v2", project:"digital-qa", version:2, title:"DigitalQA Doc Center V2",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: überarbeitete Tabellenansicht der Dokumentenliste." },
    { id:"digital-qa-v3", project:"digital-qa", version:3, title:"DigitalQA Doc Center V3",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v3.html", status:"abgeloest",
      changes:"Gegenüber V2: Notiz-System und weitere Verbesserungen. Diese Fassung wurde mit beiden Personas getestet." },
    { id:"digital-qa-v4", project:"digital-qa", version:4, title:"DigitalQA Doc Center V4",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v4.html", status:"abgeloest",
      changes:"Gegenüber V3: Notizen werden als Entwürfe gesammelt und gebündelt an den Kunden gesendet." },
    { id:"digital-qa-v5", project:"digital-qa", version:5, title:"DigitalQA Doc Center V5",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v5.html", status:"abgeloest",
      changes:"Gegenüber V4: strukturierte Prüfungstabelle mit den Spalten Problem, Aktion, Status und Notiz." },
    { id:"digital-qa-v6a", project:"digital-qa", version:6, variant:"A", title:"DigitalQA Doc Center V6-A",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v6-a.html", status:"abgeloest",
      changes:"Variante A von V6: alle offenen Prüfungsfehler dokumentübergreifend als eine Liste — direkt bearbeitbar, mit Dokumentvorschau daneben." },
    { id:"digital-qa-v6b", project:"digital-qa", version:6, variant:"B", title:"DigitalQA Doc Center V6-B",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v6-b.html", status:"abgeloest",
      changes:"Variante B von V6: Aufgaben nach Kategorie und Dokument gruppiert — aufklappbare Zeilen, Vorschau im Splitscreen." },
    { id:"digital-qa-v6d", project:"digital-qa", version:6, variant:"D", title:"DigitalQA Doc Center V6-D",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v6-d.html", status:"abgeloest",
      changes:"Variante D von V6: Kanban-Board nach Schweregrad (Kritisch · Warnungen · Erledigt); Aktionen verschieben Karten Richtung „Erledigt“." },
    { id:"digital-qa-v7", project:"digital-qa", version:7, title:"DigitalQA Doc Center V7",
      file:"doc-center/doc-center-skeleton/digital-qa-doc-center-v7.html", status:"aktuell",
      changes:"Gegenüber V6: zwei UX-Muster für Ersatz-Uploads — versionierter Slot mit Zeitverlauf gegen Ersetzen mit explizitem Bestätigungsschritt." },

    /* ---- Document Center · User Flow ---- */
    { id:"doc-center-user-flow-v1", project:"doc-center-user-flow", version:1, title:"Doc Center User Flow V1",
      file:"doc-center/doc-center-skeleton/user-flow-v1.html", status:"aktuell",
      changes:"Logische Übersicht der Prüfungs- und Freigabeentscheidungen — kein UI-Prototyp, sondern Flussdiagramm." },

    /* ---- Customer Dashboard · Selbstauskunft ---- */
    { id:"selbstauskunft-v1", project:"selbstauskunft", version:1, title:"Selbstauskunft V1",
      file:"customer-dashboard/selfdisclosure/selbstauskunft-v1.html", status:"aktuell",
      changes:"Erste Fassung: berater-facing Selbstauskunft zu Objekt und Finanzierung — dichte, power-user-optimierte Datenübernahme statt Kunden-Wizard." },

    /* ---- Customer Dashboard · Customer Dashboard ---- */
    { id:"customer-dashboard-v1", project:"customer-dashboard", version:1, title:"Customer Dashboard V1",
      file:"customer-dashboard/customer-dashboard-v1.html", status:"aktuell",
      changes:"Erste Fassung: das gesamte Kundendashboard als ein Screen — Status, Aufgaben, Dokumente und Navigation zusammen, um den Gesamtzusammenhang zu prüfen." },

    /* ---- Mortgage Hub · Offer Submission ---- */
    { id:"offer-submission-v1", project:"offer-submission", version:1, title:"Angebotssuche V1",
      file:"mortgage-hub/offer-submission/offer-submission-v1.html", status:"abgeloest",
      changes:"Erste Fassung der Angebotssuche mit Schritt-Navigation." },
    { id:"offer-submission-v2", project:"offer-submission", version:2, title:"Angebotssuche V2",
      file:"mortgage-hub/offer-submission/offer-submission-v2.html", status:"abgeloest",
      changes:"Gegenüber V1: horizontale Suchleiste oben, vertikale Step-Navigation links." },
    { id:"offer-submission-v3", project:"offer-submission", version:3, title:"Angebotssuche V3",
      file:"mortgage-hub/offer-submission/offer-submission-v3.html", status:"abgeloest",
      changes:"Weiterentwicklung von V2. Beschreibung ergänzen." },
    { id:"offer-submission-v4", project:"offer-submission", version:4, title:"Angebotssuche V4",
      file:"mortgage-hub/offer-submission/offer-submission-v4.html", status:"aktuell",
      changes:"Weiterentwicklung von V3. Beschreibung ergänzen." },

    /* ---- Product Design · JTBD Mapper ---- */
    { id:"jtbd-mapper-v1", project:"jtbd-mapper", version:1, title:"JTBD Mapper V1",
      file:"mortgage-hub/jtbd-mapper/jtbd-mapper-v1.html", status:"aktuell",
      changes:"Erste Fassung: 42 Advisor-Jobs nach Wichtigkeit und Zufriedenheit bewerten, Ergebnis als Opportunity-Matrix." },

    /* ---- Design System · Layout-Referenz ---- */
    { id:"layout-referenz-v1", project:"layout-referenz", version:1, title:"Breiten-Vergleich V1",
      file:"doc-center/width-comparison-v1.html", status:"aktuell",
      changes:"Vergleich verschiedener Layoutbreiten für die Angebotsansicht — Entscheidungsgrundlage, kein Produktflow." }
  ]
};
