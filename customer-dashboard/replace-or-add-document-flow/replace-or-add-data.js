/* ============================================================
   REPLACE OR ADD DOCUMENT FLOW — DATENMODELL

   Eigene Datei, bewusst nicht dashboard-data-v3.js: das
   Customer Dashboard V3 bleibt unangetastet, und dieser Flow
   braucht zwei Dinge, die es dort nicht gibt.

   1) EINE ANFORDERUNG HAELT MEHRERE DATEIEN.
      In V3 ist eine Zeile eine Datei ('file' als String). Genau
      daran scheitert die Frage „hinzufuegen oder ersetzen?" —
      wo nur eine Datei Platz hat, ist jeder Upload ein Ersetzen.
      Hier traegt jede Zeile `files: []`. Damit gibt es einen
      Zwischenzustand, den V3 nicht kennt: teilweise da.

   2) ERSETZEN LOESCHT NICHT.
      Die alte Datei wandert nach `history` und bleibt ansehbar,
      markiert mit dem Datum. Sie zaehlt nur nicht mehr mit.
      Das nimmt der Entscheidung die Angst — der Kunde kann sich
      nicht „aus Versehen wegwerfen", was er schon geliefert hat.

   STATUS:  'todo'     -> der Kunde ist dran
            'erhalten' -> vollstaendig bei uns (KEIN Bank-Urteil)
            Eine Zeile mit Dateien kann trotzdem 'todo' sein:
            zwei von vier Fotos sind eben noch nicht alle Fotos.

   DRINGLICHKEIT (`urgency`) — die Rangfolge der Notiz-Box oben:
            'blocker'     -> ohne das steht der Antrag still
            'frist'       -> es haengt ein Datum dran
            'nachgefragt' -> wir haben schon einmal gefragt
            'normal'      -> gebraucht, aber nichts haengt daran
            Nur diese vier Stufen, keine Punktzahl: die Box soll
            im Test erklaerbar bleiben („warum diese drei?").

   ZUORDNUNGS-VORSCHLAG (`suggest`) — was wir vorschlagen, wenn
   die Zeile schon Dateien hat:
            'add'     -> mehrteilige Unterlage, es fehlt noch was
            'replace' -> genau eine Datei erwartet, die da ist
                         nicht brauchbar oder veraltet
   ============================================================ */
(function (global) {

  var GROUPS = [
    { id: 'iva',       label: 'Iva Petrova',    kind: 'person'   },
    { id: 'michael',   label: 'Michael Petrov', kind: 'person'   },
    { id: 'immobilie', label: 'Immobilie',      kind: 'property',
      hint: 'Lindenstraße 14, 50674 Köln' }
  ];

  /* Datei-Objekt:  { name, datum, preview, previewOpts }
     History-Eintrag zusaetzlich: { ersetztAm, grund }          */
  var DOCS = [

    /* ============ IVA PETROVA ============ */

    /* Blocker ohne jede Datei — Rang 1 der Notiz-Box.
       Hier gibt es die Add/Replace-Frage noch gar nicht; die
       Zeile zeigt, wie der normale Erstupload aussieht. */
    { id:'iva-schufa', group:'iva',
      label:'SCHUFA-Einwilligung',
      qualifier:'Unterschrieben, Seite 2',
      status:'todo', urgency:'blocker', multi:false,
      reason:'Ohne Ihre Unterschrift darf die Bank keine Bonitätsauskunft einholen. Solange sie fehlt, ruht Ihr Antrag.',
      form:{ file:'schufa-einwilligung.pdf', size:'96 KB', seiten:2 },
      preview:'formular',
      previewOpts:{ nr:'F-118', titel:'SCHUFA-Einwilligungserklärung',
        intro:'Ich willige ein, dass die Bank der SCHUFA Holding AG Daten über die Beantragung dieses Kredits übermittelt und Auskünfte über mich einholt.',
        felder:[ ['Name, Vorname','Petrova, Iva'], ['Geburtsdatum','03.05.1990'],
                 ['Anschrift','Lindenstraße 14, 50674 Köln'] ],
        boxen:[ 'Ich willige in die Datenübermittlung an die SCHUFA ein.',
                'Ich habe das Informationsblatt zur Datenverarbeitung erhalten.' ] },
      files:[], history:[] },

    /* DER ADD-FALL, mit Frist.
       Eine Datei liegt schon da, sie ist auch richtig — es
       fehlen nur zwei weitere Monate. Wer hier ersetzt,
       verliert Juli. Genau deshalb muss der Screen die Frage
       stellen, statt still zu entscheiden. */
    { id:'iva-kontoauszug', group:'iva',
      label:'Kontoauszüge',
      qualifier:'Drei zusammenhängende Monate, mit sichtbarer IBAN',
      status:'todo', urgency:'frist', frist:'Fr, 04.09.', multi:true, soll:3,
      suggest:'add',
      reason:'Juli liegt uns vor. Für die Prüfung brauchen wir zusätzlich August und September — zusammenhängend, sonst zählt die Reihe nicht.',
      preview:'kontoauszug', previewOpts:{ person:'Iva Petrova' },
      files:[
        { name:'kontoauszug-juli.pdf', datum:'12.08.2026',
          preview:'kontoauszug', previewOpts:{ person:'Iva Petrova', monat:'Juli' } }
      ],
      history:[] },

    /* DER REPLACE-FALL.
       Auch hier liegt eine Datei — aber eine unbrauchbare. Die
       neue tritt an ihre Stelle; die alte bleibt als frühere
       Fassung sichtbar, damit „ersetzen" nicht wie „loeschen"
       wirkt. */
    { id:'iva-gehalt-09', group:'iva',
      label:'Gehaltsabrechnung September',
      qualifier:'Alle Seiten, Beträge lesbar',
      status:'todo', urgency:'nachgefragt', multi:false,
      suggest:'replace',
      reason:'Ihr Upload vom 26.08. ist unscharf — wir können die Beträge nicht lesen. Bitte fotografieren Sie die Abrechnung noch einmal bei besserem Licht.',
      preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'September', mm:'09' },
      files:[
        { name:'IMG_4831.jpg', datum:'26.08.2026', unscharf:true,
          preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'September', mm:'09' } }
      ],
      history:[] },

    { id:'iva-gehalt-08', group:'iva',
      label:'Gehaltsabrechnung August',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'IMG_4822.jpg', datum:'12.08.2026',
          preview:'gehalt', previewOpts:{ person:'Iva Petrova', monat:'August', mm:'08' } }
      ],
      history:[] },

    /* Fertige Zeile, an der sich der Zweifelsfall vorfuehren
       laesst: die Unterlage ist da und vollstaendig. Laedt der
       Kunde hier trotzdem etwas hoch, koennen wir nicht raten —
       dann fragt der Screen ohne Empfehlung. */
    { id:'iva-ausweis', group:'iva',
      label:'Ausweiskopie',
      qualifier:'Vorder- und Rückseite',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'ausweis-iva.pdf', datum:'02.08.2026',
          preview:'ausweis', previewOpts:{ person:'Iva Petrova', geb:'03.05.1990', ort:'Plovdiv' } }
      ],
      history:[] },

    /* ============ MICHAEL PETROV ============ */

    /* Add oder Replace als Frage der ANFORDERUNG, nicht der
       Datei: die Verlaengerung ersetzt den Aufenthaltstitel
       nicht, sie kommt dazu — beide Dateien bleiben gueltig.
       Deshalb eine eigene Zeile mit `ergaenzt`, kein Upload in
       die alte Zeile hinein. */
    { id:'mic-aufenthalt-neu', group:'michael',
      label:'Verlängerung Aufenthaltstitel',
      status:'todo', urgency:'frist', frist:'Mo, 21.09.', multi:false,
      ergaenzt:'mic-aufenthalt',
      reason:'Ihr Aufenthaltstitel läuft am 14.02.2027 ab — die Bank braucht die Verlängerung, bevor sie zusagt.',
      preview:'schreiben', previewOpts:{ neu:'14.02.2031' },
      files:[], history:[] },

    { id:'mic-aufenthalt', group:'michael',
      label:'Aufenthaltstitel',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'aufenthaltstitel.pdf', datum:'02.08.2026',
          preview:'aufenthalt', previewOpts:{ bis:'14.02.2027' } }
      ],
      history:[] },

    { id:'mic-gehalt-09', group:'michael',
      label:'Gehaltsabrechnung September',
      qualifier:'Alle Seiten',
      status:'todo', urgency:'normal', multi:false,
      preview:'gehalt',
      previewOpts:{ person:'Michael Petrov', monat:'September', mm:'09', job:'Softwareentwickler',
                    stkl:'III', brutto:'5.400,00', gesamt:'5.778,00', netto:'3.548,90',
                    iban:'DE44 3705 0198 0087 6543 21' },
      files:[], history:[] },

    { id:'mic-ausweis', group:'michael',
      label:'Ausweiskopie',
      qualifier:'Vorder- und Rückseite',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'ausweis-michael.pdf', datum:'02.08.2026',
          preview:'ausweis', previewOpts:{ person:'Michael Petrov', geb:'21.11.1988',
                                           ort:'Varna', nr:'L92K44R18', bis:'02.03.2029' } }
      ],
      history:[] },

    /* ============ IMMOBILIE ============ */

    /* Zweiter Add-Fall, diesmal ohne Frist und ohne Nachfrage —
       er steht deshalb NICHT in der Notiz-Box, obwohl er offen
       ist. Das ist der Beleg, dass die Box wirklich auswaehlt. */
    { id:'obj-fotos', group:'immobilie',
      label:'Objektfotos',
      qualifier:'Mindestens 2 innen und 2 außen, in Farbe',
      status:'todo', urgency:'normal', multi:true, soll:4,
      suggest:'add',
      reason:'Zwei Außenaufnahmen liegen vor. Es fehlen noch zwei Innenaufnahmen.',
      preview:'fotos', previewOpts:{},
      files:[
        { name:'aussen-strasse.jpg', datum:'18.08.2026', preview:'fotos', previewOpts:{} },
        { name:'aussen-garten.jpg',  datum:'18.08.2026', preview:'fotos', previewOpts:{} }
      ],
      history:[] },

    /* Zweiter Replace-Fall, schon einmal ersetzt: die History
       ist von Anfang an gefuellt, damit im Test sichtbar ist,
       wie eine frühere Fassung aussieht, ohne dass man erst
       selbst ersetzen muss. */
    { id:'obj-expose', group:'immobilie',
      label:'Exposé',
      status:'todo', urgency:'nachgefragt', multi:false,
      suggest:'replace',
      reason:'Die eingereichte Fassung ist unleserlich. Bitte scannen Sie das Exposé erneut ein oder fotografieren Sie es bei besserem Licht.',
      preview:'expose', previewOpts:{},
      files:[
        { name:'expose-scan-2.pdf', datum:'20.08.2026', preview:'expose', previewOpts:{} }
      ],
      history:[
        { name:'expose-foto.jpg', datum:'14.08.2026', ersetztAm:'20.08.2026',
          grund:'Von Ihnen ersetzt', preview:'expose', previewOpts:{} }
      ] },

    { id:'obj-grundbuch', group:'immobilie',
      label:'Grundbuchauszug',
      qualifier:'Vollständig, max. 3 Monate alt',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'grundbuch.pdf', datum:'11.08.2026', preview:'grundbuch', previewOpts:{} }
      ],
      history:[] },

    { id:'obj-energie', group:'immobilie',
      label:'Energieausweis',
      status:'erhalten', urgency:'normal', multi:false,
      files:[
        { name:'energieausweis.pdf', datum:'11.08.2026', preview:'energie', previewOpts:{} }
      ],
      history:[] },

    { id:'obj-baubeschreibung', group:'immobilie',
      label:'Baubeschreibung',
      status:'todo', urgency:'normal', multi:false,
      preview:'baubeschreibung', previewOpts:{},
      files:[], history:[] }
  ];

  /* Rangfolge der Notiz-Box. Vier Stufen, kein Score:
     im Test muss die Antwort auf „warum diese drei?" ein Satz
     sein, keine Formel. */
  var RANK = { blocker: 3, frist: 2, nachgefragt: 1, normal: 0 };

  var URGENCY_LABEL = {
    blocker:     'Hält den Antrag auf',
    frist:       'Mit Frist',
    nachgefragt: 'Schon einmal nachgefragt',
    normal:      'Wird noch gebraucht'
  };

  /* Warum diese drei? — genau der Text, den die Box aufklappt. */
  var RANK_EXPLAIN = [
    'Zuerst, was den Antrag aufhält.',
    'Dann, woran eine Frist hängt.',
    'Dann, wonach wir schon einmal gefragt haben.',
    'Alles Übrige steht unten in der Liste — es ist nicht vergessen, es eilt nur nicht.'
  ];

  function find(docId) {
    return DOCS.filter(function (x) { return x.id === docId; })[0];
  }

  /* Eine Anforderung ist erfuellt, wenn genug Dateien da sind.
     `soll` gilt nur fuer mehrteilige Zeilen; einteilige sind mit
     einer brauchbaren Datei fertig. */
  function evaluate(d) {
    var need = d.multi ? (d.soll || 2) : 1;
    d.status = d.files.length >= need ? 'erhalten' : 'todo';
    if (d.status === 'erhalten') {
      d.urgency = 'normal';
      delete d.reason;
      delete d.frist;
      delete d.suggest;
    }
    return d.status;
  }

  global.ReplaceOrAddData = {
    customer: { anrede:'Frau', vorname:'Iva', nachname:'Petrova' },
    heute: '28.08.2026',
    groups: GROUPS,
    docs: DOCS,
    urgencyLabel: URGENCY_LABEL,
    rankExplain: RANK_EXPLAIN,

    doc: find,
    group: function (groupId) {
      return GROUPS.filter(function (g) { return g.id === groupId; })[0];
    },
    byGroup: function (groupId) {
      return DOCS.filter(function (d) { return d.group === groupId; });
    },
    open: function () {
      return DOCS.filter(function (d) { return d.status !== 'erhalten'; });
    },
    counts: function () {
      var c = { todo:0, erhalten:0 };
      DOCS.forEach(function (d) { c[d.status]++; });
      return c;
    },

    /* Die Top 3 der Notiz-Box. Stabil sortiert: bei gleicher
       Stufe entscheidet die Reihenfolge in DOCS, nicht der
       Zufall — sonst springt die Box im Test. */
    top: function (n) {
      return DOCS
        .filter(function (d) { return d.status !== 'erhalten'; })
        .map(function (d, i) { return { d:d, i:i }; })
        .sort(function (a, b) {
          var r = RANK[b.d.urgency] - RANK[a.d.urgency];
          return r !== 0 ? r : a.i - b.i;
        })
        .slice(0, n === undefined ? 3 : n)
        .map(function (x) { return x.d; });
    },

    /* Wieviel steht offen, das NICHT in der Box steht? */
    restCount: function (n) {
      var top = this.top(n).length;
      return Math.max(0, this.open().length - top);
    },

    /* ---- Die eigentliche Frage ----
       Was schlagen wir vor, wenn eine Zeile schon Dateien hat?
       Rueckgabe:
         null                       -> keine Frage, die Zeile ist leer
         { mode, sicher, warum }    -> Vorschlag; `sicher:false` heisst:
                                       wir raten nicht, wir fragen ohne
                                       Empfehlung.                     */
    decide: function (docId) {
      var d = find(docId);
      if (!d || !d.files.length) return null;

      if (d.multi && d.files.length < (d.soll || 2)) {
        return { mode:'add', sicher:true,
          warum:'Diese Unterlage besteht aus mehreren Dateien und ist noch nicht vollständig — ' +
                'die neue Datei kommt zu ' + (d.files.length === 1
                  ? 'der vorhandenen dazu.'
                  : 'den ' + d.files.length + ' vorhandenen dazu.') };
      }
      if (!d.multi && d.suggest === 'replace') {
        return { mode:'replace', sicher:true,
          warum:'Wir haben genau diese Unterlage bei Ihnen noch einmal angefragt — ' +
                'die neue Datei tritt an die Stelle der alten.' };
      }
      if (!d.multi && d.status === 'erhalten') {
        return { mode:'replace', sicher:false,
          warum:'Diese Unterlage ist bei uns vollständig eingegangen. Wir wissen nicht, ' +
                'ob Ihre neue Datei die alte ersetzen oder ergänzen soll.' };
      }
      return { mode:'add', sicher:false,
        warum:'Es liegt schon eine Datei vor. Wir wissen nicht, ob die neue dazukommen ' +
              'oder die alte ersetzen soll.' };
    },

    /* ---- Datei annehmen ----
       mode 'add'     -> anhaengen
       mode 'replace' -> alle bisherigen nach history, neue allein
       Ersetzen loescht nie: was ersetzt wurde, bleibt lesbar. */
    accept: function (docId, filename, mode) {
      var d = find(docId);
      if (!d) return null;

      var neu = { name: filename, datum: this.heute,
                  preview: d.preview, previewOpts: d.previewOpts || {} };

      if (mode === 'replace') {
        d.files.forEach(function (f) {
          f.ersetztAm = this.heute;
          f.grund = 'Von Ihnen ersetzt';
          d.history.unshift(f);
        }, this);
        d.files = [neu];
      } else {
        d.files.push(neu);
      }

      evaluate(d);
      return { mode: mode, status: d.status,
               fehlt: d.multi ? Math.max(0, (d.soll || 2) - d.files.length) : 0 };
    },

    /* Rueckgaengig direkt nach dem Upload — nur fuer Variante B,
       wo das System still entscheidet. Dreht genau den letzten
       Schritt um, nicht mehr. */
    flip: function (docId, warMode) {
      var d = find(docId);
      if (!d) return null;

      if (warMode === 'replace') {                 // ersetzt -> doch dazulegen
        var neu = d.files[0];
        var zurueck = d.history.filter(function (f) { return f.ersetztAm === this.heute; }, this);
        zurueck.forEach(function (f) { delete f.ersetztAm; delete f.grund; });
        d.history = d.history.filter(function (f) { return zurueck.indexOf(f) === -1; });
        d.files = zurueck.concat(neu ? [neu] : []);
      } else {                                     // dazugelegt -> doch ersetzen
        var letzte = d.files[d.files.length - 1];
        d.files.slice(0, -1).forEach(function (f) {
          f.ersetztAm = this.heute;
          f.grund = 'Von Ihnen ersetzt';
          d.history.unshift(f);
        }, this);
        d.files = letzte ? [letzte] : [];
      }

      evaluate(d);
      return warMode === 'replace' ? 'add' : 'replace';
    },

    /* Eine einzelne Datei zuruecknehmen. Die Anforderung bleibt
       bestehen — nur die Datei geht. */
    removeFile: function (docId, name) {
      var d = find(docId);
      if (!d) return;
      d.files = d.files.filter(function (f) { return f.name !== name; });
      evaluate(d);
    },

    /* Eine frühere Fassung zurueckholen — das Gegenstueck zum
       Ersetzen. Ohne diesen Weg waere „ersetzen" doch endgueltig. */
    restore: function (docId, name) {
      var d = find(docId);
      if (!d) return;
      var f = d.history.filter(function (x) { return x.name === name; })[0];
      if (!f) return;
      d.history = d.history.filter(function (x) { return x !== f; });
      delete f.ersetztAm;
      delete f.grund;

      if (d.multi) {
        d.files.push(f);
      } else {
        /* In einen einteiligen Platz zurueckholen IST ein Ersetzen —
           also gilt dieselbe Regel wie dort: die aktuelle Datei geht
           nach history, sie verschwindet nicht. Ohne diesen Zweig
           wuerde ausgerechnet der Weg, der vor Verlust schuetzen
           soll, selbst etwas verlieren. */
        d.files.forEach(function (cur) {
          cur.ersetztAm = this.heute;
          cur.grund = 'Durch eine frühere Fassung ersetzt';
          d.history.unshift(cur);
        }, this);
        d.files = [f];
      }
      evaluate(d);
    }
  };

})(window);
