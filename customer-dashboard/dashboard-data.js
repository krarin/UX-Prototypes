/* ============================================================
   CUSTOMER DASHBOARD — SHARED DATA MODEL
   Used by customer-dashboard-v2.html (desktop) and
   customer-dashboard-mobile-v2.html so the four card layouts
   (Variante A/B x zwei Viewports) never drift apart.

   Statuses:  'offen'    -> noch hochzuladen
              'erhalten' -> eingegangen (KEIN Bank-Urteil, nur Empfang)

   Es gibt bewusst KEINEN dritten Status "Aktion erforderlich": aus Kundensicht
   ist das dasselbe wie offen — beides heisst "da muss ich noch ran". Was der
   Berater nach Sichtung konkret nachfordert, traegt stattdessen ein `reason`
   und wird oben in der Aktionszone herausgehoben. Ein Zustand, zwei Orte.

   Labels sind bewusst kurz. Alles Präzisierende steht im
   `qualifier` als Sekundärzeile — die Doc-Center-Langnamen
   sind Berater-Sprache und brauchen auf 390px drei Zeilen.
   ============================================================ */
(function (global) {

  var GROUPS = [
    { id: 'iva',       label: 'Iva Petrova',    kind: 'person'   },
    { id: 'michael',   label: 'Michael Petrov', kind: 'person'   },
    { id: 'immobilie', label: 'Immobilie',      kind: 'property',
      hint: 'Lindenstraße 14, 50674 Köln' }
  ];

  /* status: offen | aktion | erhalten
     isNew:  später angefordert -> Badge "NEU ANGEFORDERT"
     reason: Klartext, warum diese Unterlage gebraucht wird     */
  var DOCS = [
    /* ---- Iva Petrova ---- */
    { id:'iva-gehalt-07', group:'iva', label:'Gehaltsabrechnung Juli',
      status:'erhalten', file:'IMG_4821.jpg',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'Juli', mm:'07' } },
    { id:'iva-gehalt-08', group:'iva', label:'Gehaltsabrechnung August',
      status:'erhalten', file:'IMG_4822.jpg',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'August', mm:'08' } },
    { id:'iva-gehalt-09', group:'iva', label:'Gehaltsabrechnung September',
      status:'offen',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'September', mm:'09' } },
    { id:'iva-ausweis', group:'iva', label:'Ausweiskopie',
      qualifier:'Beidseitig, Personalausweis oder Reisepass',
      status:'erhalten', file:'ausweis-iva.pdf',
      preview:'ausweis', previewOpts:{ person:'Iva Petrova', geb:'03.05.1990', ort:'Plovdiv' } },
    { id:'iva-kontoauszug', group:'iva', label:'Kontoauszug',
      qualifier:'Aktuell, mit sichtbarer IBAN',
      status:'offen', isNew:true,
      reason:'Auf Ihrer Gehaltsabrechnung ist keine IBAN ersichtlich. Bitte laden Sie einen aktuellen Kontoauszug hoch, damit wir die IBAN bestätigen können.',
      preview:'kontoauszug', previewOpts:{ person:'Iva Petrova' } },

    /* ---- Michael Petrov ---- */
    { id:'mic-gehalt-07', group:'michael', label:'Gehaltsabrechnung Juli',
      status:'erhalten', file:'scan_071.pdf',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'Juli', mm:'07', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-gehalt-08', group:'michael', label:'Gehaltsabrechnung August',
      status:'offen',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'August', mm:'08', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-gehalt-09', group:'michael', label:'Gehaltsabrechnung September',
      status:'offen',
      preview:'gehalt', previewOpts:{ person:'Michael Petrov', monat:'September', mm:'09', job:'Softwareentwickler', stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90', iban:'DE44 3705 0198 0087 6543 21' } },
    { id:'mic-ausweis', group:'michael', label:'Ausweiskopie',
      qualifier:'Beidseitig, Personalausweis oder Reisepass',
      status:'erhalten', file:'ausweis-michael.pdf',
      preview:'ausweis', previewOpts:{ person:'Michael Petrov', geb:'21.11.1988', ort:'Varna', nr:'L92K44R18', bis:'02.03.2029' } },
    { id:'mic-aufenthalt', group:'michael', label:'Aufenthaltstitel',
      status:'erhalten', file:'aufenthaltstitel.pdf',
      preview:'aufenthalt', previewOpts:{ bis:'14.02.2027' } },
    { id:'mic-aufenthalt-neu', group:'michael', label:'Verlängerung Aufenthaltstitel',
      status:'offen', isNew:true,
      reason:'Der eingereichte Aufenthaltstitel läuft in weniger als 6 Monaten ab. Bitte reichen Sie die Verlängerung nach.',
      preview:'schreiben', previewOpts:{ neu:'14.02.2031' } },

    /* ---- Immobilie ---- */
    { id:'obj-expose', group:'immobilie', label:'Exposé',
      status:'erhalten', file:'expose.pdf',
      preview:'expose' },
    { id:'obj-expose-neu', group:'immobilie', label:'Exposé — neue Fassung',
      status:'offen', isNew:true,
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
      status:'offen',
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
      status:'offen',
      preview:'fotos' },
    { id:'obj-energie', group:'immobilie', label:'Energieausweis',
      status:'erhalten', file:'energieausweis.pdf', preview:'energie' }
  ];

  /* Dateien, die der Bulk-Upload NICHT sicher zuordnen konnte.
     Nur diese werden dem Kunden zur Bestaetigung vorgelegt. */
  var UNSURE = [
    { id:'u1', file:'IMG_4832.jpg',  size:'2,1 MB' },
    { id:'u2', file:'scan_2.pdf',    size:'840 KB' }
  ];

  /* ------------------------------------------------------------------
     AUTOMATISCHE PRUEFUNG beim Upload.
     Deterministisch, nicht zufaellig: dieselbe Datei -> dieselbe Antwort,
     damit Demo und Usability-Test reproduzierbar sind.
     Eintrag hier = der erste Upload scheitert, der zweite geht durch.
     So laesst sich die Korrekturschleife ueberhaupt vorfuehren.
     Nur Sofort-Checks (siehe Entscheidung: menschliche Pruefung bleibt
     fuer den Kunden unsichtbar).
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
      hint:   'Bitte laden Sie die aktuelle Verlängerung hoch, nicht den abgelaufenen Titel.' }
  };

  var ATTEMPTS = {};

  var STATUS_LABEL = {
    offen:    'Offen',
    erhalten: 'Erhalten'
  };

  global.DashboardData = {
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
      var c = { offen:0, erhalten:0 };
      DOCS.forEach(function (d) { c[d.status]++; });
      return c;
    },
    byGroup: function (groupId) {
      return DOCS.filter(function (d) { return d.group === groupId; });
    },
    /* Aktionszone: offene Unterlagen, zu denen es eine konkrete Ansage gibt —
       vom Berater nachgefordert oder von der Sofortpruefung beanstandet. */
    actionItems: function () {
      return DOCS.filter(function (d) { return d.status === 'offen' && d.reason; });
    },
    /* Upload + Sofortpruefung. Gibt das Ergebnis zurueck und setzt den
       Status. Ein Fehlschlag macht 'offen' -> 'aktion'; 'erhalten' wird
       dabei nie kleiner, der Fortschritt laeuft also nie rueckwaerts. */
    upload: function (docId, filename) {
      var d = DOCS.filter(function (x) { return x.id === docId; })[0];
      if (!d) return null;
      ATTEMPTS[docId] = (ATTEMPTS[docId] || 0) + 1;
      var chk = CHECKS[docId];
      d.file = filename;
      /* Anforderungsgrund dauerhaft merken — er ueberlebt Upload und Loeschung */
      if (d.reason !== undefined && d._origReason === undefined) d._origReason = d.reason;
      if (chk && ATTEMPTS[docId] === 1) {
        d.status = 'offen';                     // kein eigener Fehlerstatus
        d.reason = chk.reason + ' ' + chk.hint;
        return { ok: false, reason: chk.reason, hint: chk.hint };
      }
      d.status = 'erhalten';
      delete d.reason;
      delete d.isNew;
      return { ok: true };
    },
    /* Hochgeladene Datei entfernen. Die ANFORDERUNG bleibt bestehen —
       geloescht wird die Datei, nicht die Zeile.
       War es eine vom Berater nachgeforderte Unterlage, kehrt ihre urspruengliche
       Begruendung zurueck, sie steht also wieder in der Aktionszone. Der Versuchszaehler wird NICHT zurueckgesetzt: was einmal
       durchgegangen ist, geht nach erneutem Hochladen wieder durch. */
    remove: function (docId) {
      var d = DOCS.filter(function (x) { return x.id === docId; })[0];
      if (!d) return null;
      delete d.file;
      d.status = 'offen';
      if (d._origReason !== undefined) {
        d.reason = d._origReason;   // nachgefordert: die Ansage besteht weiter
      } else {
        delete d.reason;
      }
      return d;
    },
    attempts: function (docId) { return ATTEMPTS[docId] || 0; },
    doc: function (docId) {
      return DOCS.filter(function (x) { return x.id === docId; })[0];
    },

    groupCount: function (groupId, status) {
      return DOCS.filter(function (d) {
        return d.group === groupId && d.status === status;
      }).length;
    }
  };

})(window);
