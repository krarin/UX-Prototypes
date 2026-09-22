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
      handover: [
        { prototype:"mein-tag-v5e",
          title:"Mein Tag V5-E",
          file:"to-do/mein-tag-v5-e-handover-2026-09-09.html",
          date:"2026-09-09",
          note:"Übergabestand für die Entwicklung: ohne die reinen Prototyp-Vergleichs-Schalter (\"Neues Layout\", \"Fälligkeit als Dropdown\", Ausklapp-Panel-Auswahl) — das Ausklapp-Panel ist fest auf \"Ausklappen v1\"." }
      ],
      testing: [
        { prototype:"mein-tag-v5e",
          title:"Mein Tag V5-E",
          file:"to-do/mein-tag-v5-e-usability-2026-09-15.html",
          date:"2026-09-15",
          note:"Teststand: exakte Kopie des Übergabestands vom 2026-09-09." }
      ] },
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
    { id: "pipeline-view", team: "advisors", name: "Anträge/Pipeline-View",
      flow: "Der Berater sieht alle Anträge als Kanban-Board über die Bearbeitungsschritte hinweg, verschiebt Karten per Drag & Drop zwischen den Spalten und sortiert sie nach Fälligkeit." },

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

    { id: "replace-or-add-document-flow", team: "customer-dashboard", name: "Replace or Add document flow",
      flow: "Der Kunde lädt Unterlagen hoch und erfährt, was daraus geworden ist: was zugeordnet wurde, was die Prüfung nicht bestanden hat — und wie er eine abgelehnte Datei ersetzt, ohne die alte zu verlieren." },

    { id: "offer-submission", team: "mortgage-hub", name: "Offer Submission",
      flow: "Der Berater sucht Angebote, vergleicht Konditionen und reicht die Finanzierung beim Kreditgeber ein." },

    { id: "offer-comparison-table", team: "mortgage-hub", name: "Offer Comparison Table",
      flow: "Der Berater merkt sich aus der Angebotsliste die aussichtsreichen Treffer vor und stellt bis zu drei davon auf einer eigenen Seite nebeneinander — Restschuld-Verlauf, Vergleichsmatrix und Sondertilgung/Tilgungssatzwechsel, gemeinsam mit dem Kunden am Schirm." },

    { id: "mass-import", team: "lender-integration", name: "Massenimport",
      flow: "Der Berater holt seinen Altbestand von einer Plattform in FinLink: er startet den Massenimport aus den Anträgen, wählt Quelle und Zeitraum, sieht was übernommen wurde — und findet jeden Lauf später unter Mein Unternehmen → Plattformen im Massenimport-Verlauf wieder." },

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
     Die Projektseite zeigt daraus automatisch die Einträge, die auf ihre eigenen
     Versionen zeigen (`prototype`) — der Eintrag wird nur einmal gepflegt.
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
      file:"to-do/mein-tag-v4.html", status:"abgeloest",
      links: [
        { label:"Web Prototyp öffnen", file:"to-do/mein-tag-v4.html" },
        { label:"Mobile Prototyp öffnen", file:"to-do/mein-tag-mobile-v1.html" }
      ],
      changes:"Gegenüber V3: Schnellfilter-Tabs mit Gruppierung im Filter „Alle“, Kalender-Splitscreen mit Rand-Handle zum Ein-/Ausklappen statt Header-Button, Geburtstage im Kalender statt in der Liste. Läuft ohne das Design-System-Stylesheet, ist also eigenständig teilbar. Zusätzlich eigene Mobile-Fassung mit anderer Informationsarchitektur (Segmented Control To-dos/Kalender statt Split-View)." },
    { id:"mein-tag-v5a", project:"mein-tag", version:5, variant:"A", title:"Mein Tag V5-A",
      file:"to-do/mein-tag-v5-a.html", status:"archiv",
      changes:"Gegenüber V4: Kalender-Termine jetzt farbcodiert nach Online/Vor Ort/Privat (mit Legende); Schnellfilter-Tabs + Berater-/Zeitraum-Filter mit Filter-Chips; aufklappbare Suche; Inline-Editing von Titel/Fälligkeit direkt in der Zeile; Antragsteller-Dropdown und Quickaction-Pills (Email/Anruf/Link) beim Anlegen, inkl. Icon neben dem Titel; Gruppentitel nur noch bei Schnellfilter „Alle“ sichtbar. Vormals „mein-tag-v5-trial.html“." },
    { id:"mein-tag-v5b", project:"mein-tag", version:5, variant:"B", title:"Mein Tag V5-B",
      file:"to-do/mein-tag-v5-b.html", status:"archiv",
      changes:"Gegenüber V5-A (vormals „mein-tag-v5-c.html“): Suche in die Filterzeile verschoben; Spalte „Letzte Aktivität“ entfernt; Berater-Spalte neben Fälligkeit, inkl. eigenem Dropdown im Anlege-Formular; Radiobuttons statt Pills für „Art des ToDos“; Anlege-Formular schließt sich beim Wegklicken automatisch, wenn nichts eingegeben wurde. Klick auf Titel/Fälligkeit öffnet jetzt die ganze Zeile als Formular statt nur ein Einzelfeld, committet automatisch beim Verlassen. Echtes „Gruppierung“-Dropdown (Anruf/Email/Link, ausgewählter Typ zuerst) sowie Rückmeldungs-Toasts bei jeder ToDo-Änderung." },
    { id:"mein-tag-v5c", project:"mein-tag", version:5, variant:"C", title:"Mein Tag V5-C",
      file:"to-do/mein-tag-v5-c.html", status:"archiv",
      changes:"Gegenüber V5-B: Spalten-Filter zum Ein-/Ausblenden von Antragsteller*in/Fälligkeit/Berater; neuer Finanzierungswunsch-Button pro Zeile (Icon + Popover) mit Kv-Details. Enthält außerdem zwei reine Vergleichs-Umschalter, die kein Produkt-Feature sind: einen Finanzierungswunsch-Varianten-Switcher (Drawer/Ausklappen/Icon+Popover) und einen Layout-Switch „Neues Layout“." },
    { id:"mein-tag-v5d", project:"mein-tag", version:5, variant:"D", title:"Mein Tag V5-D",
      file:"to-do/mein-tag-v5-d.html", status:"archiv",
      changes:"Gegenüber V5-C: Radiobuttons „Art des ToDos“ beim Anlegen und Inline-Bearbeiten wieder direkt unter dem Titel-Input statt weit darunter; ToDo-Titel, Antragsteller, Fälligkeit und Berater jetzt in einer Zeile auf gleicher Höhe, Uhrzeit einfach unter dem Datum. Neu: Titel-Autocomplete — schon ab den ersten 3 passenden Buchstaben (z. B. „bes“) wird „Besichtigungstermin erfolgt?“ vorgeschlagen; Auswahl übernimmt den Text und wählt automatisch die Anruf-Quickaction aus." },
    { id:"mein-tag-v5e", project:"mein-tag", version:5, variant:"E", title:"Mein Tag V5-E",
      file:"to-do/mein-tag-v5-e.html", status:"archiv",
      changes:"Gegenüber V5-D: Schnellfilter als einzelne Karten-Buttons statt zusammenhängender Segmented-Leiste — 4px Abstand, farbiges Rechteck links in der Kategoriefarbe (immer sichtbar, statt Unterstreichung nur im ausgewählten Zustand), Anzahl als Heading/Md ohne Zähler-Pille und in Primärtextfarbe wenn ausgewählt bzw. Sekundärtextfarbe im Standard. Ausgewählter Filter trägt den Rahmen in der Kategoriefarbe statt einer grauen Füllung; Buttonhöhe 36px unverändert. Der reine Vergleichs-Umschalter „Neues Layout“ behält bewusst die bisherige Tab-Optik." },

    { id:"mein-tag-v8", project:"mein-tag", version:8, title:"Mein Tag V8",
      file:"to-do/mein-tag-v8.html", status:"aktuell",
      links: [
        { label:"Web Prototyp öffnen", file:"to-do/mein-tag-v8.html" },
        { label:"Mobile Prototyp öffnen", file:"to-do/mein-tag-mobile-v2.html" }
      ],
      changes:"Inhaltlich identisch mit V5-E — geändert hat sich ausschließlich die Token-Ebene. V5-E war eine harte Abspaltung von design-system/tokens.css (der Block war handkopiert und abgedriftet: --color-neutral-dark-400 trug #78909C statt #607D8B, --color-neutral-light-400 war mit 49 Verwendungen der meistbenutzte Token und existierte nirgends sonst). V8 konsumiert stattdessen die Finlink-Core-Tokens aus der Figma-Library „AI Design System Foundations“ (Collections Finlink Core Primitives · Semantics · Field · Typography Tokens). 581 Farb- und Maßreferenzen wurden property-abhängig neu gebunden — dieselbe Ausgangsfarbe wird je nach background/text/border/icon zu einem anderen Token —, 192 Typografie- und 350 Spacing-Deklarationen auf die Skala gesetzt, und die JS-Konstante TERMIN_TYP ist jetzt vollständig token-getrieben. Sichtbare Folgen der reinen Token-Bindung: Zeilentext 13px → 12px und Mikro-Labels 11px → 12px (die Skala kennt weder 13 noch 11), Hierarchie trägt daher Gewicht und Farbe statt Größe; Spacing 6/10/14px auf 4/8/12px gerundet, Zeilenrhythmus damit 1–2px enger; Feldhöhe 36px → 32px über --ds-field-height; Fließtext #37474F → #263238; Kalender-Termin „Privat“ wird heller und rosaner, weil --ds-color-accent-purple das einzige öffentliche Purple im Semantik-Layer ist. Orange („Heute“) und Cyan („Ausgelöst vom Kunden“) laufen bewusst über den Legacy-Namensraum feedback.*, weil die kanonische Grammatik dafür keine Entsprechung hat. Lücken und Abweichungen stehen NICHT im Design, sondern im Token-Panel (Datenbank-Icon in der Topbar): 14 Einträge, darunter drei Blocker — es gibt im gesamten Finlink-Set keinerlei Schatten-Tokens (N-1), background hat keine inverse-Stufe und damit ist die dunkle App-Schiene nicht bindbar (N-2), und Radius/Border-Width/Sizing haben keine öffentliche Semantik (G-03). Die bekannten Kontrastfehler A1/A7/A8 bleiben bewusst unbehoben, weil token-pur die Werte erhält. Nachträglich auf Wunsch: kompaktere Zeilen — Zeilen-Padding 12px → 8px und Zeilenabstand 8px → 4px (beides echte Skalenstufen), Zeilenraster damit 84px → 76px. Feldhöhe jetzt tatsächlich an --ds-field-height gebunden (32px) — gilt nur für Input, Select und Autocomplete; Buttons bleiben auf 36px, weil es für Steuerelement-Höhen kein Token gibt (neue Lücke N-8). Das vertikale Zeilen-Padding ist jetzt symmetrisch (je 4px statt 0 oben / 8px unten): die Spalten strecken sich über die Content-Box der Zeile, lag das Padding komplett unten, sass ihr zentrierter Inhalt 4px über der optischen Zeilenmitte — sichtbar vor allem beim Stapel aus Fälligkeits-Tag und Datum. Die Gesamthöhe bleibt dadurch unverändert. Der farbige Ton-Balken links an der Tabelle bleibt wie in V5-E erhalten. Der Ausklapp-Panel-Umschalter startet jetzt auf „Ausklappen v1“ (vorher v5) — <body> trägt dafür expand-variant-old statt expand-variant-v21/-v5; der Umschalter selbst bleibt für den Varianten-Vergleich erhalten. Der Berater-Filter zeigt in der Aktive-Filter-Zeile jetzt eine eigene Pille pro ausgewähltem Namen statt einer Sammel-Pille mit Komma-Liste — jede mit eigenem „x“, damit sich einzelne Berater*innen abwählen lassen, ohne den ganzen Filter zu verlieren und im Dropdown neu zusammenzuklicken. Status „archiv“, weil V7 die offenen Stakeholder-Anforderungen trägt und aktuell bleibt — V8 ist die technische Token-Linie auf Basis von V5-E." },

    { id:"mein-tag-v7", project:"mein-tag", version:7, title:"Mein Tag V7",
      file:"to-do/mein-tag-v7.html", status:"abgeloest",
      changes:"Kopie von V3 als Ausgangspunkt. Nach dem Stakeholder-Feedback sind neue Anforderungen dazugekommen — sie sind unten vollständig aufgeführt und noch nicht umgesetzt.",
      details:[
        { group:"For each To do on the My Day page, show", items:[
          "assigned advisor",
          "assigned loan application link + name(s)",
          "applicant name(s) for all applicants",
          "employment type(s) for all applicants",
          "financing wish details",
          "finance type",
          "property type",
          "property usage",
          "property zip code + city" ] },
        { group:"Title", items:[
          "Page name \"My Day\"" ] },
        { group:"Appointments", items:[
          "Change colour coding to 3 colours for online, in-person and private appointments" ] },
        { group:"Filter", items:[
          "Add time range filter",
          "Move search bar into filter line",
          "Make search bar an icon / small component which expands on focus if needed",
          "Add \"Add To Do\" button to the filter line" ] },
        { group:"Grouping", items:[
          "Show grouping option",
          "Add options to group by priority, day + overdue, or quick action" ] },
        { group:"Add To Do", items:[
          "The user writes the description or selects from (custom) templates",
          "The user optionally selects quick actions (e.g. email, phone, link, none)",
          "The system detects certain keywords and pre-selects the matching quick action (e.g. „Rückruf“ or „anrufen“ → phone)",
          "Add option to save a custom template for a to-do description, with a title" ] },
        { group:"Inline add To Do", items:[
          "Add quick actions" ] },
        { group:"Loan applications without To do's", items:[
          "Show two options for validation: a) as To Do  b) as tile" ] }
      ] },

    /* ---- Advisors · ToDo-Sortierung ---- */
    { id:"todo-sortierung-v1", project:"todo-sortierung", version:1, title:"ToDo-Sortierung V1",
      file:"to-do/todo-sorting-v1.html", status:"aktuell",
      changes:"Erste Fassung: Anträge-Liste mit sortierbaren Spalten, ToDo-Spalte nach Fälligkeit sortierbar, umschaltbar auf Pipeline-Ansicht mit Drag & Drop." },

    /* ---- Advisors · Anträge/Pipeline-View ---- */
    { id:"pipeline-v1", project:"pipeline-view", version:1, title:"Pipeline-View V1",
      file:"applications/pipeline/pipeline-v1.html", status:"aktuell",
      changes:"Erste Fassung: 1:1-Umsetzung des Figma-Boards „Applications List Board view“ (node 8162-42958) — Kanban-Board mit farbigem Fälligkeits-Balken (Warnung/Überfällig/Info), Status-/Bank-Tags (On hold, New, Claimed), Home-Icon für Bestandsimmobilie, ToDo-Zeilen mit farbcodierter Fälligkeit (Datum/Uhrzeit statt Label, Farbe folgt der Dringlichkeit des ToDo) und Klick-Popover mit vollständiger Checkliste inkl. „… mehr“ bei langen Texten; Kopf- und Filterzeile mit entfernbaren Filter-Chips und „Filter (n)“-Zähler; Karten per Drag & Drop zwischen Spalten verschiebbar." },

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
      file:"customer-dashboard/customer-dashboard-v1.html", status:"abgeloest",
      changes:"Erste Fassung: das gesamte Kundendashboard als ein Screen — Status, Aufgaben, Dokumente und Navigation zusammen, um den Gesamtzusammenhang zu prüfen." },

    { id:"customer-dashboard-v2", project:"customer-dashboard", version:2,
      title:"Customer Dashboard V2 — Meine Dokumente",
      file:"customer-dashboard/customer-dashboard-v2.html", status:"abgeloest",
      links: [
        { label:"Web Prototyp öffnen", file:"customer-dashboard/customer-dashboard-v2.html" },
        { label:"Mobile Prototyp öffnen", file:"customer-dashboard/customer-dashboard-mobile-v2.html" }
      ],
      changes:"Gegenüber V1: „Meine Dokumente“ ausgebaut, restliche Navigation bleibt Mock (Chrome nach Produkt-Screenshot: 5-Schritt-Stepper, Meine Dokumente / Finanzierungs-Assistent / Ablauf verstehen). Gruppierung nach Antragsteller statt nach Dokumentkategorie (Iva Petrova · Michael Petrov · Immobilie). Drei Bucket-Ringe ohne Nenner (Offen · Aktion erforderlich · Erhalten), zugleich Filter — kein Fortschrittsbalken, der bei neuen Anforderungen zurückläuft. „Erhalten“ statt „Angenommen“: der Screen behauptet nur den Eingang, keine Freigabe. Späte Rückmeldungen erscheinen als Zusatz-Anforderung, nie als Rücknahme einer erledigten Zeile. Aktionszone erscheint nur, wenn es etwas zu tun gibt. Bulk-Upload mit Auto-Zuordnung, Rückfrage nur bei unsicheren Dateien. Zwei Kartenvarianten per Schalter: A gruppiert, B flache Liste. Eigener Kundenskin (Plus Jakarta Sans, nur tokens.css + styles.css, kein Berater-Chrome); Daten in dashboard-data.js, gemeinsam mit der Mobile-Fassung." },

    { id:"customer-dashboard-v3", project:"customer-dashboard", version:3,
      title:"Customer Dashboard V3 — Meine Dokumente",
      file:"customer-dashboard/customer-dashboard-v3.html", status:"aktuell",
      changes:"Gegenüber V2: „Offen“ und „Aktion erforderlich“ zu einem Bucket „Zu erledigen“ zusammengelegt — beides hieß dasselbe („Sie sind dran“) und wurde doppelt gezählt; was sie unterschied, war nur, ob wir eine Begründung schulden, und die steht jetzt als Zeile am Dokument statt als eigener Ring. Damit zwei Ringe statt drei, weiterhin ohne Nenner und weiterhin als Filter. Ein fehlgeschlagener Upload bewegt dafür keine Zahl mehr; die Rückmeldung kommt aus dem Dialog und aus der Warn-Zeile. Neu: Karte „Formulare zum Ausfüllen“ oben, quer zu den Gruppen — für Unterlagen, die die Bank dem Kunden zuerst schuldet (Selbstauskunft, SCHUFA-Einwilligung). Diese Karte sieht aus wie die Gruppenkarten (gleiche Kopfzeile, gleiche Zeilen, gleiche Statusikonen) und ist wie sie auf- und zuklappbar — nur ihr Platz ist besonders, nicht ihr Look. Darin eine Drei-Schritt-Erklärung (Herunterladen · Ausfüllen · Hochladen). Die Zuordnung steht im Zeilentitel („SCHUFA-Einwilligung — Iva Petrova“) statt in einem Chip, weil hier Zeilen verschiedener Personen nebeneinander stehen; nicht personenbezogene Formulare gehören zur neuen Gruppe „Allgemeine Unterlagen“. Nach dem Upload verlässt das Formular die Karte und erscheint unter seiner Person bzw. der Immobilie. Der Gruppenkopf zählt die oben stehenden Formulare mit und zeigt statt einer Dublette eine Zeiger-Zeile nach oben, damit nie „Alles erhalten“ neben einem offenen Formular steht. Eigene Datendatei dashboard-data-v3.js, damit V2 (Desktop + Mobile) unverändert bleibt; Formular-Vorschau (leeres und ausgefülltes Blatt) additiv in dashboard-previews.js. Mobile-Fassung noch offen." },

    /* ---- Customer Dashboard · Replace or Add document flow ---- */
    { id:"replace-or-add-document-flow-v1", project:"replace-or-add-document-flow", version:1,
      title:"Replace or Add Document Flow V1",
      file:"customer-dashboard/replace-or-add-document-flow/replace-or-add-document-flow-v1.html",
      status:"abgeloest",
      changes:"Erste Fassung, zwei Fragen in einem Screen. (1) Notiz-Box oben: höchstens drei offene Punkte, jeder mit dem Grund im Klartext und einem Dringlichkeits-Tag; sortiert nach Folgen (hält den Antrag auf · Frist · schon einmal nachgefragt · Übriges), nicht nach Eingangsdatum. Was nicht in die drei passt, wird im Fuß gezählt und steht unten in der Liste — die Box wählt aus, sie verschweigt nichts. „Warum diese drei?“ klappt die Regel auf. Ist nichts Wichtiges offen, wird die Box still statt zu verschwinden. (2) Hinzufügen oder ersetzen: eine Zeile ist hier ein Bedarf und hält mehrere Dateien, dadurch gibt es den Zustand „teilweise da“ (1 von 3 Kontoauszügen, 2 von 4 Objektfotos) und überhaupt etwas zu ersetzen. Ersetzen löscht nie — die alte Datei wandert in „frühere Fassungen“, bleibt ansehbar und lässt sich zurückholen. Der Zeilen-Button bleibt neutral („Datei hochladen“), damit die Entscheidung erst dort fällt, wo ihre Folgen stehen. Zwei Varianten per Schalter: A fragt vor dem Upload mit zwei Karten, jede mit dem Satz „Danach: …“ und einer Empfehlung, wenn wir sicher sind; B entscheidet still und sagt hinterher, was passiert ist, mit einem gleichrangigen Umkehrschalter — und markiert das Ergebnis als „geraten“, wenn es nicht ableitbar war. Dritter Fall im Datensatz: Verlängerung Aufenthaltstitel als eigene Zeile, weil hier die Anforderung ergänzt und nicht ersetzt wird. Papiervorschauen aus dashboard-previews.js mitbenutzt, Daten in replace-or-add-data.js." },

    { id:"replace-or-add-document-flow-v2", project:"replace-or-add-document-flow", version:2,
      title:"Replace or Add Document Flow V2",
      file:"customer-dashboard/replace-or-add-document-flow/replace-or-add-document-flow-v2.html",
      status:"abgeloest",
      changes:"Gegenüber V1: Neuanfang auf der Formensprache des heutigen Kundendashboards statt auf dem Design-System, und auf drei Flows eingekürzt. V1 sah aus wie Berater-Chrome (türkis, kompakte Zeilen, Ringe als Filter); V2 ist nach den Produkt-Screenshots gebaut — blaue Primärfarbe, große leichte Überschriften statt fetter, gestrichelte Karten mit kleinem Radius, Statuswort rechts an der Karte, „Datei hochladen“ als blauer Text mit Icon statt als Button, Sammel-Dropzone mit „Unkategorisierte Seiten“ am Fuß, Vertrauenszeile. Die Formensprache liegt in customer-skin.css und lädt tokens.css bewusst nicht mit — zwei Primärfarben würden gegeneinander laufen; die Hexwerte sind aus den Screenshots abgeleitet und gehören ersetzt, sobald die echten vorliegen. Vier Kartenzustände (angefordert · In Prüfung · Abgelehnt mit Grund · Angenommen), Ablehnung nach dem echten Maschinen-Text aus dem Screenshot. Eine Karte ist eine Anforderung und hält mehrere Dateien (`soll`), dadurch gibt es den Zähler „2 von 4“ und überhaupt etwas zu ersetzen. — FOKUSHILFE: die Hinweisbox an ihrer alten Stelle zeigt statt eines Danks höchstens drei offene Punkte, jeden mit dem Grund in einem Satz und einem Tag (Zurückgewiesen · Mit Frist · Wird gebraucht); sortiert nach Folgen, nicht nach Eingangsdatum. Der Rest wird im Fuß gezählt, „Warum diese drei?“ klappt die Regel auf; ist nichts offen, wird die Box still statt zu verschwinden. Der lange Maschinentext bleibt an der Karte — in der Box steht die Kurzfassung. — FLOW 1 (Abgelehntes ersetzen): der Ablehnungsgrund steht im Dialog VOR der Dateiwahl, mit der Prüfmeldung als aufklappbarem Detail; die neue Fassung ersetzt, die alte wandert in „frühere Fassungen“ und lässt sich zurückholen. — FLOW 2 (Hinzufügen): mehrteilige Anforderungen (drei Kontoauszüge, vier Objektfotos) nehmen Dateien dazu. Die Frage „ersetzen oder hinzufügen?“ wird nur gestellt, wenn wir sie nicht beantworten können: bei Ablehnung ist es ein Ersetzen, bei unvollständig mehrteilig ein Hinzufügen — beides sagen wir statt zu fragen. Nur wenn die Unterlage vollständig ist und trotzdem etwas kommt, gibt es zwei Karten, ohne Empfehlung, jede mit dem Satz „Danach: …“. Danach ein gleichrangiger Umkehrschalter. Der Knopf an der Karte trägt die Folge im Namen („Neue Fassung hochladen“ / „Datei hinzufügen“) und bleibt neutral, wo sie offen ist. — FLOW 3 (Sammel-Upload): Dateien in die Dropzone, automatische Zuordnung über das längste passende Wortstück im Dateinamen (nicht das erste — sonst landet „grundbuchauszug.pdf“ bei den Kontoauszügen), Ergebnisdialog mit Zuordnungsliste. Was nicht erkannt wird, liegt unten unter „Unkategorisierte Seiten“ und wird dort per Auswahl zugeordnet. Die Automatik überschreibt nie: vollständige und zurückgewiesene Anforderungen nimmt sie nicht an — deshalb landet eine neue Fassung für ein abgelehntes Dokument in den unkategorisierten Seiten und geht von dort durch die Ersetzen-Frage. Knopf „Beispieldateien verwenden“, damit ein Test nicht daran hängt, welche Dateien gerade auf dem Rechner liegen. Daten in documents-data.js." },

    { id:"replace-or-add-document-flow-v3", project:"replace-or-add-document-flow", version:3,
      title:"Replace or Add Document Flow V3",
      file:"customer-dashboard/replace-or-add-document-flow/replace-or-add-document-flow-v3.html",
      status:"aktuell",
      changes:"Gegenüber V2: die Top-3-Box am Seitenkopf ist weg, und der Prototyp konzentriert sich auf zwei ineinandergreifende Flows. Die Box wollte Aufmerksamkeit oben stiften, wo gerade nichts passiert; sie sitzt jetzt dort, wo gehandelt wird — direkt unter der Upload-Box, unmittelbar nach dem Upload. Die Stelle am Seitenkopf bleibt leer, damit nichts mit der neuen Meldung konkurriert. — FLOW 1, Sammel-Upload mit Rückmeldung: heute ist dieser Weg stumm; scheitert eine Datei an der Prüfung, erfährt der Kunde es nirgends, die Ablehnung liegt rot aber unbemerkt zwischen fünfzehn Karten. Jetzt drei Phasen. (1) Jede Datei erscheint sofort als graue Zeile mit Dateityp-Icon (Kamera für Bilder, Dokument für PDF), Namen und Spinner, Name vollständig im Tooltip — nichts läuft im Verborgenen. (2) Die Zeilen lösen gestaffelt auf, eine alle 450 ms, und zeigen einzeln ihr Ergebnis (Zugeordnet · Abgelehnt · Nicht zugeordnet); erst danach räumt sich die Liste ab. (3) Direkt unter der Box steht die Meldung: „3 Dokumente erfolgreich kategorisiert. 2 Dokumente brauchen Ihre Aufmerksamkeit.“ und darunter jeder offene Fall mit Statusikone, Marke und einem Weg dorthin — abgelehnt → „Zum Dokument“ (springt an die Karte und lässt sie aufblitzen), nicht erkannt → „Zuordnen“ (springt in den Fuß der Box und fokussiert die Auswahl). Als Panel, nicht als Dialog: ein Modal klickt man weg und findet es nie wieder. Schließen möglich, ein neuer Upload ersetzt es. — FLOW 2, abgelehnte Datei ersetzen: Eingang aus der Meldung oder von der Karte. Der Ablehnungsgrund steht im Dialog vor der Dateiwahl, die vollständige Prüfmeldung als aufklappbares Detail; Ersetzen löscht nicht, die alte Fassung bleibt einsehbar und lässt sich zurückholen. — NEU IM MODELL: es gibt überhaupt eine Prüfung. V2 konnte keine Ablehnung erzeugen, jeder Upload landete auf „In Prüfung“ — damit war der Kernfall des Produkts nur Startzustand und nie Ergebnis einer Handlung. Jetzt fällt eine Anforderung beim ersten vollständigen Upload durch und besteht beim zweiten, deterministisch, damit Demo und Usability-Test vergleichbar bleiben. Geprüft wird erst bei Vollständigkeit: zwei von vier Fotos kann niemand beurteilen. Der Beispiellauf trifft genau die Zahlen der Meldung — Kontoauszug, Grundbuch und Innenfoto gehen durch, „Docs-Reisepass.jpg“ wird abgelehnt, „scan0007.pdf“ ist nicht erkennbar. Eigene Datendatei documents-data-v3.js, damit V2 mit seiner Box unverändert läuft; customer-skin.css bleibt gemeinsam und wächst nur um Klassen, der Fokusbox-Block ist als „nur noch von V2“ markiert." },

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

    /* ---- Mortgage Hub · Offer Comparison Table ---- */
    { id:"offer-comparison-table-v1", project:"offer-comparison-table", version:1, title:"Angebotsvergleich V1",
      file:"mortgage-hub/offer-comparison-table/offer-comparison-table-v1.html", status:"abgeloest",
      changes:"Erste Fassung, bewusst als Graukasten-Wireframe fuer den Usability-Test — Verhalten hoch aufgeloest, Optik niedrig. Zwei Schirme in einer Datei. Schirm 1 ist die bekannte Angebotstabelle, aber der Tabellenkoerper hat jetzt zwei Gruppen: die gemerkten Angebote oben mit eigener Kopfzeile, die Vergleichsaktion sitzt in dieser Kopfzeile. Merken heisst damit „fuer den Vergleich vormerken“ — kein zweites Control je Zeile. Die Aktion haengt an der Anzahl: 0 gemerkt keine Gruppe, 1 sichtbar aber inaktiv mit Hinweis „mind. 2 Angebote merken“, 2–3 „Diese n vergleichen“, ab 4 „Vergleichen (max. 3)“ mit den ersten drei vorausgewaehlt. Schirm 2 ist die Vergleichsseite: Auswahlliste aller 25 Angebote zum Tauschen ohne Rueckweg in die Tabelle (Grenze 3, gesperrte Zeilen nennen den Grund), ein gemeinsamer Restschuld-Chart als Inline-SVG mit festen Achsen, und die Vergleichsmatrix mit Angeboten als Spalten. Optionen je Angebot (Sondertilgung, Tilgungssatzwechsel ab Jahr 5) rechnen Laufzeit, Gesamtaufwand und eine gestrichelte Kurve neu. Bester Wert je Zeile mit Dreieck und Haarlinie statt Farbe. Nummerierte Anmerkungen und Legende sind zuschaltbar, damit der Prototyp ohne Erzaehlung durch ein Stakeholder-Review laeuft." },

    { id:"offer-comparison-table-v2", project:"offer-comparison-table", version:2, title:"Angebotsvergleich V2",
      file:"mortgage-hub/offer-comparison-table/offer-comparison-table-v2.html", status:"aktuell",
      changes:"Gegenueber V1: die Vergleichsmatrix ist in drei eigenstaendige Karten zerlegt. In V1 standen die Angebote als Spalten einer durchgehenden Tabelle — drei Angebote lasen sich als ein Block Zahlen statt als drei Dinge, zwischen denen man waehlt. Jede Karte hat jetzt einen eigenen Kopf mit farbigem Rahmen (nur der Bankname; der Produktname ist eine Zeile in der Karte), die Optionen sitzen als eigene Karte darin, und jede Karte endet auf ihrem eigenen \"Angebot erstellen\". Die Abschnittsueberschriften KONDITIONEN und FLEXIBILITAET sind weg — die Kartengrenze leistet die Gruppierung. Alle Betraege fett. — NEUE KENNZAHLEN: Darlehenssumme, Kosten und Gesamtaufwand stehen als drei Zeilen untereinander, damit die Rechnung auf der Karte aufgeht (Kosten wird aus dem gerundeten Gesamtaufwand abgeleitet, nie separat gerundet, sonst stimmt die Spalte auf dem Schirm nicht). Dazu Zinsbindung je Angebot (10/15/20 Jahre, beim Volltilger 22) und Restschuld am Ende der Zinsbindung. Die Restschuld wird am exakten Monatssaldo abgelesen, nicht an den 3-Monats-Stuetzstellen der Kurve — ueber eine Sondertilgung interpoliert verfehlt man bis zu 16.000 Euro. Der Ablesemonat wird durch den Kalibrierungsfaktor geteilt, nicht multipliziert; nur so treffen Nullpunkt, Laufzeit-Zahl und Chart-Kurve zusammen (beim DKB Volltilger liefert jede andere Konvention eine fuenfstellige Restschuld auf einem Produkt, dessen Verkaufsargument genau deren Abwesenheit ist). Der Tilgungssatzwechsel mit Gebuehr kostet jetzt auch wirklich etwas — in V1 war er centgleich mit der kostenlosen Variante, waehrend die Zeile daneben \"0,25 % Gebuehr\" behauptete. — BREITE: erste Umsetzung der Gutter-Regel (DESIGN-SYSTEM.md 1.4). Die dichte Angebotstabelle laeuft weiter fluid, der Vergleich steht auf 1100px zentriert; vorher zog sich beides auf 1920px ueber die volle Breite. — FARBE: die drei Angebotsfarben kommen aus --color-compare-* statt aus fest verdrahteten Hex-Werten; die Werte sind 1:1 aus loanlink-web uebernommen und als provisorisch markiert. Sie sind fast gleich hell (1,08:1 zwischen zweien) und fallen in Graustufen zusammen, deshalb traegt jede Chart-Linie ihren Namen direkt auf der Kurve statt nur in der Legende. Bestwert-Markierung unterbleibt bei der Darlehenssumme (ueberall gleich) und bei der Restschuld, solange sich die Zinsbindungen unterscheiden — 273.149 Euro nach 10 Jahren und 135.346 Euro nach 20 Jahren sind keine vergleichbaren Groessen. Eine Fussnote nennt die Annahme, die die Zinsbindung sichtbar macht: Laufzeit und Gesamtaufwand unterstellen einen unveraenderten Sollzins nach deren Ablauf." },

    /* ---- Lender Integration · Massenimport ---- */
    { id:"mass-import-v1", project:"mass-import", version:1, title:"Massenimport V1",
      file:"lender-integration/mass-import/mass-import-v1.html", status:"aktuell",
      changes:"Erste Fassung, aus Figma umgesetzt: beide Flows in einem Prototyp — der vierstufige Massenimport-Dialog aus den Anträgen heraus und der Massenimport-Verlauf unter Mein Unternehmen → Plattformen, aus dem sich jeder Lauf im selben Dialog öffnet (abgeschlossen, teilweise, fehlgeschlagen, in Warteschlange). Ein abgeschlossener Lauf wandert live in den Verlauf." },

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
