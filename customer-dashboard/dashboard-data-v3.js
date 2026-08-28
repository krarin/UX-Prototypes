/* ============================================================
   CUSTOMER DASHBOARD V3 — SHARED DATA MODEL
   Eigene Datei, nicht dashboard-data.js: V2 (Desktop + Mobile)
   bleibt unangetastet, damit die vorhandenen Testing-Notes
   weiter gelten.

   UNTERSCHIED ZU V2 — zwei Statuswerte statt drei:
       'todo'     -> der Kunde ist dran
       'erhalten' -> bei uns eingegangen (KEIN Bank-Urteil)

   'offen' und 'aktion erforderlich' waren derselbe Sachverhalt
   ("Sie sind dran"), nur zweimal gezaehlt. Was sie unterschied,
   war nicht der Status, sondern ob wir eine Begruendung
   schulden — das steckt jetzt in `reason` und ist damit eine
   Eigenschaft der Zeile, nicht ein eigener Ring.

   Nebenwirkung, bewusst in Kauf genommen: ein fehlgeschlagener
   Upload bewegt keine Zahl mehr (todo bleibt todo). Die
   Rueckmeldung kommt komplett aus dem Dialog und aus `failed`
   auf der Zeile.

   NEU — Formulare (`kind:'form'`): Unterlagen, die WIR dem
   Kunden zuerst schulden. Sie tragen eine `template` und
   werden, solange 'todo', in der Karte oben gebuendelt statt in
   ihrer Gruppe gezeigt. Nach dem Upload wandern sie in ihre
   Gruppe (Iva / Michael / Immobilie / Allgemein).
   `group` ist immer gesetzt — 'allgemein' fuer alles, was zu
   keiner Person gehoert; nur dann faellt der Chip weg.
   ============================================================ */
(function (global) {

  var GROUPS = [
    { id: 'iva',       label: 'Iva Petrova',    kind: 'person'   },
    { id: 'michael',   label: 'Michael Petrov', kind: 'person'   },
    { id: 'immobilie', label: 'Immobilie',      kind: 'property',
      hint: 'Lindenstraße 14, 50674 Köln' },
    { id: 'allgemein', label: 'Allgemeine Unterlagen', kind: 'general',
      hint: 'Gilt für beide Antragsteller' }
  ];

  /* status: todo | erhalten
     kind:   'form' -> Formular, das wir bereitstellen
     isNew:  spaeter angefordert -> Badge "NEU ANGEFORDERT"
     reason: Klartext, warum diese Unterlage (noch) gebraucht wird
     failed: letzter Upload ist durch die Pruefung gefallen        */
  var DOCS = [

    /* ============ FORMULARE ============
       Reihenfolge hier = Reihenfolge in der Karte oben. */
    { id:'form-selbstauskunft', group:'allgemein', kind:'form',
      label:'Selbstauskunft zur Finanzierung',
      qualifier:'Beide Antragsteller, unterschrieben',
      status:'todo',
      reason:'Wir brauchen Ihre Angaben zu Einnahmen, Ausgaben und Vermögen in einem Stück.',
      template:{ file:'selbstauskunft-formular.pdf', size:'214 KB', seiten:2 },
      preview:'formular',
      previewOpts:{ nr:'F-201', titel:'Selbstauskunft zur Finanzierung',
        intro:'Bitte tragen Sie Ihre monatlichen Einnahmen und Ausgaben sowie Ihr vorhandenes Vermögen ein. Die Angaben werden ausschließlich zur Prüfung Ihrer Finanzierungsanfrage verwendet.',
        felder:[ ['Antragsteller 1','Iva Petrova'], ['Antragsteller 2','Michael Petrov'],
                 ['Nettoeinkommen','6.740,12 EUR'], ['Miete / Wohnkosten','1.180,00 EUR'],
                 ['Eigenkapital','84.000,00 EUR'], ['Bestehende Kredite','keine'] ],
        boxen:[ 'Ich bestätige, dass die Angaben vollständig und richtig sind.',
                'Mir ist bekannt, dass unvollständige Angaben die Prüfung verzögern.' ] } },

    { id:'form-schufa-iva', group:'iva', kind:'form',
      label:'SCHUFA-Einwilligung',
      qualifier:'Unterschrieben, Seite 2',
      status:'todo',
      reason:'Ohne Ihre Einwilligung dürfen wir keine Bonitätsauskunft einholen.',
      template:{ file:'schufa-einwilligung.pdf', size:'96 KB', seiten:2 },
      preview:'formular',
      previewOpts:{ nr:'F-118', titel:'SCHUFA-Einwilligungserklärung',
        intro:'Ich willige ein, dass die Bank der SCHUFA Holding AG Daten über die Beantragung dieses Kredits übermittelt und Auskünfte über mich einholt.',
        felder:[ ['Name, Vorname','Petrova, Iva'], ['Geburtsdatum','03.05.1990'],
                 ['Anschrift','Lindenstraße 14, 50674 Köln'] ],
        boxen:[ 'Ich willige in die Datenübermittlung an die SCHUFA ein.',
                'Ich habe das Informationsblatt zur Datenverarbeitung erhalten.' ] } },

    { id:'form-schufa-mic', group:'michael', kind:'form',
      label:'SCHUFA-Einwilligung',
      qualifier:'Unterschrieben, Seite 2',
      status:'todo',
      reason:'Ohne Ihre Einwilligung dürfen wir keine Bonitätsauskunft einholen.',
      template:{ file:'schufa-einwilligung.pdf', size:'96 KB', seiten:2 },
      preview:'formular',
      previewOpts:{ nr:'F-118', titel:'SCHUFA-Einwilligungserklärung',
        intro:'Ich willige ein, dass die Bank der SCHUFA Holding AG Daten über die Beantragung dieses Kredits übermittelt und Auskünfte über mich einholt.',
        felder:[ ['Name, Vorname','Petrov, Michael'], ['Geburtsdatum','21.11.1988'],
                 ['Anschrift','Lindenstraße 14, 50674 Köln'] ],
        boxen:[ 'Ich willige in die Datenübermittlung an die SCHUFA ein.',
                'Ich habe das Informationsblatt zur Datenverarbeitung erhalten.' ] } },

    /* ============ IVA PETROVA ============ */
    { id:'iva-gehalt-07', group:'iva', label:'Gehaltsabrechnung Juli',
      status:'erhalten', file:'IMG_4821.jpg',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'Juli', mm:'07' } },
    { id:'iva-gehalt-08', group:'iva', label:'Gehaltsabrechnung August',
      status:'erhalten', file:'IMG_4822.jpg',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'August', mm:'08' } },
    { id:'iva-gehalt-09', group:'iva', label:'Gehaltsabrechnung September',
      status:'todo',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'September', mm:'09' } },
    { id:'iva-ausweis', group:'iva', label:'Ausweiskopie',
      qualifier:'Beidseitig, Personalausweis oder Reisepass',
      status:'erhalten', file:'ausweis-iva.pdf',
      preview:'ausweis', previewOpts:{ person:'Iva Petrova', geb:'03.05.1990', ort:'Plovdiv' } },
    { id:'iva-kontoauszug', group:'iva', label:'Kontoauszug',
      qualifier:'Aktuell, mit sichtbarer IBAN',
      status:'todo', isNew:true,
      reason:'Auf Ihrer Gehaltsabrechnung ist keine IBAN ersichtlich. Bitte laden Sie einen aktuellen Kontoauszug hoch, damit wir die IBAN bestätigen können.',
      preview:'kontoauszug', previewOpts:{ person:'Iva Petrova' } },

    /* ============ MICHAEL PETROV ============ */
    { id:'mic-gehalt-07', group:'michael', label:'Gehaltsabrechnung Juli',
      status:'erhalten', file:'scan_071.pdf',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'Juli', mm:'07', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-gehalt-08', group:'michael', label:'Gehaltsabrechnung August',
      status:'todo',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'August', mm:'08', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-gehalt-09', group:'michael', label:'Gehaltsabrechnung September',
      status:'todo',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'September', mm:'09', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-ausweis', group:'michael', label:'Ausweiskopie',
      qualifier:'Beidseitig, Personalausweis oder Reisepass',
      status:'erhalten', file:'ausweis-michael.pdf',
      preview:'ausweis', previewOpts:{ person:'Michael Petrov', geb:'21.11.1988', ort:'Varna', nr:'L92K44R18', bis:'02.03.2029' } },
    { id:'mic-aufenthalt', group:'michael', label:'Aufenthaltstitel',
      status:'erhalten', file:'aufenthaltstitel.pdf',
      preview:'aufenthalt', previewOpts:{ bis:'14.02.2027' } },
    { id:'mic-aufenthalt-neu', group:'michael', label:'Verlängerung Aufenthaltstitel',
      status:'todo', isNew:true,
      reason:'Der eingereichte Aufenthaltstitel läuft in weniger als 6 Monaten ab. Bitte reichen Sie die Verlängerung nach.',
      preview:'schreiben', previewOpts:{ neu:'14.02.2031' } },

    /* ============ IMMOBILIE ============ */
    { id:'obj-expose', group:'immobilie', label:'Exposé',
      status:'erhalten', file:'expose.pdf',
      preview:'expose' },
    { id:'obj-expose-neu', group:'immobilie', label:'Exposé — neue Fassung',
      status:'todo', isNew:true,
      reason:'Die eingereichte Fassung ist unleserlich. Bitte scannen Sie das Exposé erneut ein oder fotografieren Sie es bei besserem Licht.',
      preview:'expose' },
    { id:'obj-grundbuch', group:'immobilie', label:'Grundbuchauszug',
      qualifier:'Vollständig, max. 3 Monate alt',
      status:'erhalten', file:'grundbuch.pdf',
      preview:'grundbuch' },
    { id:'obj-wohnflaeche', group:'immobilie', label:'Wohnflächenberechnung',
      qualifier:'Mit Länge und Breite je Raum',
      status:'erhalten', file:'wohnflaeche.pdf',
      preview:'wohnflaeche' },
    { id:'obj-flurkarte', group:'immobilie', label:'Flurkarte / Lageplan',
      status:'erhalten', file:'flurkarte.pdf',
      preview:'flurkarte' },
    { id:'obj-baubeschreibung', group:'immobilie', label:'Baubeschreibung',
      status:'todo',
      preview:'baubeschreibung' },
    { id:'obj-kaufvertrag', group:'immobilie', label:'Kaufvertragsentwurf',
      status:'erhalten', file:'kaufvertrag-entwurf.pdf',
      preview:'kaufvertrag' },
    { id:'obj-bauplaene', group:'immobilie', label:'Baupläne',
      qualifier:'Bemaßt, fehlende Maßangaben bitte ergänzen',
      status:'erhalten', file:'bauplaene.pdf',
      preview:'bauplan' },
    { id:'obj-fotos', group:'immobilie', label:'Objektfotos',
      qualifier:'Innen und außen, je mind. 2, in Farbe',
      status:'todo',
      preview:'fotos' },
    { id:'obj-energie', group:'immobilie', label:'Energieausweis',
      status:'erhalten', file:'energieausweis.pdf', preview:'energie' }
  ];

  /* Dateien, die der Bulk-Upload NICHT sicher zuordnen konnte. */
  var UNSURE = [
    { id:'u1', file:'IMG_4832.jpg',  size:'2,1 MB' },
    { id:'u2', file:'scan_2.pdf',    size:'840 KB' }
  ];

  /* ------------------------------------------------------------------
     AUTOMATISCHE PRUEFUNG beim Upload.
     Deterministisch, nicht zufaellig: dieselbe Datei -> dieselbe
     Antwort, damit Demo und Usability-Test reproduzierbar sind.
     Eintrag hier = der erste Upload scheitert, der zweite geht durch.
     `form-schufa-iva` ist absichtlich dabei: nur so laesst sich der
     Formular-Kreislauf inklusive Fehlschlag vorfuehren.
  ------------------------------------------------------------------ */
  var CHECKS = {
    'iva-gehalt-09': {
      reason: 'Das Foto ist unscharf — wir können die Beträge nicht lesen.',
      hint:   'Legen Sie die Abrechnung flach hin, sorgen Sie für gutes Licht und halten Sie die Kamera parallel.' },
    'mic-gehalt-08': {
      reason: 'Wir konnten nur die erste Seite erkennen.',
      hint:   'Bitte laden Sie alle Seiten der Abrechnung hoch — auch die Rückseite.' },
    'obj-fotos': {
      reason: 'Wir haben nur eine Aufnahme erkannt.',
      hint:   'Bitte mindestens zwei Fotos von innen und zwei von außen, in Farbe.' },
    'mic-aufenthalt-neu': {
      reason: 'Das erkannte Gültigkeitsdatum liegt in der Vergangenheit.',
      hint:   'Bitte laden Sie die aktuelle Verlängerung hoch, nicht den abgelaufenen Titel.' },
    'form-schufa-iva': {
      reason: 'Auf Seite 2 fehlt die Unterschrift.',
      hint:   'Bitte unterschreiben Sie unten auf Seite 2 und laden Sie das Formular erneut hoch.' }
  };

  var ATTEMPTS = {};
  /* Nur fuer die Betonung der Buttons: wurde das Formular in dieser
     Sitzung schon einmal geoeffnet/geladen? Das ist KEIN Status und
     erscheint nirgends als Text — der Screen behauptet also nie,
     Herunterladen sei ein Fortschritt. */
  var TOUCHED = {};

  var STATUS_LABEL = { todo: 'Zu erledigen', erhalten: 'Erhalten' };

  function find(docId) {
    return DOCS.filter(function (x) { return x.id === docId; })[0];
  }

  global.DashboardDataV3 = {
    customer: { anrede:'Frau', vorname:'Iva', nachname:'Petrova' },
    advisor:  { name:'Demo', role:'Finanzierungsexperte',
                address:'Schönhauser Allee 149, 10435 Berlin',
                phone:'+49 (0) 30 5683 7522',
                email:'k.hoffmann+demo@finlink.de' },
    groups: GROUPS,
    docs: DOCS,
    unsure: UNSURE,
    statusLabel: STATUS_LABEL,

    /* ---- abgeleitete Werte ---- */
    counts: function () {
      var c = { todo:0, erhalten:0 };
      DOCS.forEach(function (d) { c[d.status]++; });
      return c;
    },
    byGroup: function (groupId) {
      return DOCS.filter(function (d) { return d.group === groupId; });
    },
    group: function (groupId) {
      return GROUPS.filter(function (g) { return g.id === groupId; })[0];
    },

    /* Formulare, die noch offen sind — Inhalt der Karte oben. */
    formItems: function () {
      return DOCS.filter(function (d) { return d.kind === 'form' && d.status === 'todo'; });
    },
    /* Wieviele Formulare dieser Gruppe stehen oben statt hier? Nur damit
       der Gruppenkopf nicht luegen muss. */
    hoistedForms: function (groupId) {
      return DOCS.filter(function (d) {
        return d.group === groupId && d.kind === 'form' && d.status === 'todo';
      });
    },
    /* Zeilen, die IN der Gruppe stehen: alles ausser offenen Formularen. */
    rowsInGroup: function (groupId) {
      return DOCS.filter(function (d) {
        return d.group === groupId && !(d.kind === 'form' && d.status === 'todo');
      });
    },
    groupCount: function (groupId, status) {
      return DOCS.filter(function (d) {
        return d.group === groupId && d.status === status;
      }).length;
    },

    /* Upload + Sofortpruefung. Ein Fehlschlag laesst den Status auf
       'todo' — es wandert also nichts zurueck, weil nichts vorwaerts
       gegangen war. Rueckmeldung ueber das Ergebnis und `failed`. */
    upload: function (docId, filename) {
      var d = find(docId);
      if (!d) return null;
      ATTEMPTS[docId] = (ATTEMPTS[docId] || 0) + 1;
      var chk = CHECKS[docId];
      d.file = filename;
      if (chk && ATTEMPTS[docId] === 1) {
        d.status = 'todo';
        d.failed = true;
        d.reason = chk.reason + ' ' + chk.hint;
        return { ok:false, reason:chk.reason, hint:chk.hint };
      }
      d.status = 'erhalten';
      delete d.failed;
      delete d.reason;
      delete d.isNew;
      if (d.kind === 'form') {
        d.previewOpts = d.previewOpts || {};
        d.previewOpts.ausgefuellt = true;      // Vorschau zeigt jetzt das gefuellte Blatt
      }
      return { ok:true };
    },

    /* Loeschen: die Anforderung bleibt, nur die Datei geht. */
    remove: function (docId) {
      var d = find(docId);
      if (!d) return;
      delete d.file;
      delete d.failed;
      d.status = 'todo';
      if (d.kind === 'form' && d.previewOpts) delete d.previewOpts.ausgefuellt;
    },

    attempts: function (docId) { return ATTEMPTS[docId] || 0; },
    doc: find,

    touch:     function (docId) { TOUCHED[docId] = true; },
    isTouched: function (docId) { return !!TOUCHED[docId]; }
  };

})(window);
