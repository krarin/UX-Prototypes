/* ============================================================
   ANTRAGSDOKUMENTE — DATENMODELL

   Aufbau wie im heutigen Produkt: Abschnitte („Darlehensantrag",
   „Antragsteller …") mit je einer Liste von Anforderungen.

   ZWEI ENTSCHEIDUNGEN, auf denen alles andere aufbaut:

   1) EINE KARTE IST EINE ANFORDERUNG, KEINE DATEI.
      `files` ist eine Liste und `soll` sagt, wie viele Dateien die
      Anforderung braucht. Ohne das gaebe es die Frage „ersetzen
      oder hinzufuegen?" gar nicht — wo nur eine Datei Platz hat,
      ist jeder Upload ein Ersetzen. Und es gaebe den Zustand
      „2 von 4" nicht, der im Produkt heute fehlt.

   2) ERSETZEN LOESCHT NICHT.
      Die alte Datei wandert nach `history`, bleibt sichtbar und
      laesst sich zurueckholen. Das nimmt der Entscheidung die
      Angst — der Kunde kann nicht wegwerfen, was er geliefert hat.

   STATUS — die vier Woerter, die im Produkt rechts an der Karte
   stehen. Bewusst keine fuenfte Vokabel fuer „teilweise da": das
   sagt der Zaehler „2 von 4" im Titel.
     'angefordert'  wir warten auf Sie
     'pruefung'     vollstaendig eingegangen, wird geprueft
     'abgelehnt'    Pruefung nicht bestanden, mit Grund
     'angenommen'   durch — steht an der Karte als „Genehmigt“

   RANGFOLGE der Hinweisbox (`urgency`) — drei Stufen, kein Score.
   Im Test muss die Antwort auf „warum diese drei?" ein Satz sein,
   keine Formel.
     'abgelehnt' -> Sie haben geliefert, es hat nicht gereicht
     'frist'     -> es haengt ein Datum dran
     'offen'     -> wird gebraucht, nichts haengt daran
   ============================================================ */
(function (global) {

  var STATUS = {
    angefordert: { wort:'angefordert', ikon:null,           klasse:'' },
    pruefung:    { wort:'In Prüfung',  ikon:'schedule',     klasse:'is-review' },
    abgelehnt:   { wort:'Abgelehnt',   ikon:'error',        klasse:'is-rejected' },
    angenommen:  { wort:'Genehmigt',   ikon:'check_circle', klasse:'is-accepted' }
  };

  /* `match` = Wortstuecke, an denen die automatische Zuordnung eine
     Datei erkennt. Trifft nichts, landet die Datei unter
     „Unkategorisierte Seiten" — das ist kein Fehler, sondern der
     ehrliche Ausgang, wenn die Maschine es nicht weiss. */
  var SECTIONS = [
    {
      id: 'darlehen', titel: 'Darlehensantrag',
      docs: [
        { id:'eigenkapital',
          label:'Eigenkapitalnachweis mit Name, Datum und IBAN, nicht älter als ein Monat',
          hilfe:'Depotauszug, Sparbuch oder Kontoauszug — Name, Datum und IBAN müssen darauf zu sehen sein.',
          status:'angefordert', frist:'Fr, 04.09.',
          grundOffen:'Ohne den Nachweis kann die Bank Ihr Eigenkapital nicht anrechnen — das ändert die Konditionen.',
          match:['eigenkapital','depot','sparbuch'],
          soll:1, files:[], history:[] }
      ]
    },
    {
      id: 'iva', titel: 'Antragsteller Iva Petrova',
      docs: [
        /* Der Fall aus dem Screenshot: abgelehnt mit langem
           Maschinen-Grund. Hier setzt Flow 1 an. */
        { id:'iva-gehalt-juli',
          label:'Vollständige Gehaltsabrechnung Juli',
          hilfe:'Alle Seiten, Beträge lesbar, mit Name und Abrechnungsmonat.',
          status:'abgelehnt',
          grund:'Das Zahlungsdatum der Gehaltsabrechnung liegt nicht in der Vergangenheit. ' +
                'Das Eintrittsdatum deutet darauf hin, dass sich der Antragsteller möglicherweise ' +
                'noch in der Probezeit oder einem befristeten Vertragsverhältnis befindet. ' +
                'Die Sozialversicherungsnummer entspricht nicht dem erwarteten alphanumerischen ' +
                'Format mit 12 Zeichen. Position 9 der Sozialversicherungsnummer ist kein ' +
                'Buchstabe (A–Z). Die ersten zwei Ziffern der Steueridentifikationsnummer sind ' +
                'kein gültiger Bundeslandcode (01–16).',
          /* Derselbe Sachverhalt in einem Satz. Der Maschinentext
             bleibt an der Karte — aber die Hinweisbox oben braucht
             etwas, das man in drei Sekunden versteht. */
          grundKurz:'Auf Ihrer Juli-Abrechnung fehlen mehrere Angaben, die wir prüfen müssen. ' +
                    'Am häufigsten hilft: die Abrechnung noch einmal vollständig und in Farbe einreichen.',
          match:['gehalt','lohn','juli'],
          soll:1,
          files:[ { name:'gehaltsabrechnung_datev.pdf', datum:'26.08.2026' } ],
          history:[] },

        { id:'iva-gehalt-juni', label:'Vollständige Gehaltsabrechnung Juni',
          hilfe:'Alle Seiten, Beträge lesbar, mit Name und Abrechnungsmonat.',
          status:'angefordert', match:['juni'], soll:1, files:[], history:[] },

        { id:'iva-gehalt-mai', label:'Vollständige Gehaltsabrechnung Mai',
          status:'angefordert', match:['mai'], soll:1, files:[], history:[] },

        { id:'iva-gehalt-dez', label:'Gehaltsabrechnung (Dezember, 2025)',
          hilfe:'Die Dezemberabrechnung zeigt Sonderzahlungen des ganzen Jahres.',
          status:'angefordert', match:['dezember','dez'], soll:1, files:[], history:[] },

        { id:'iva-steuer', label:'Einkommensteuerbescheid für 2025',
          hilfe:'Vollständig, alle Seiten des Bescheids.',
          status:'angefordert', match:['steuer','bescheid'], soll:1, files:[], history:[] },

        /* Mehrteilig und angefangen — hier setzt Flow 2 an. Wer hier
           ersetzt, verliert den Juli-Auszug. */
        { id:'iva-kontoauszug', label:'Kontoauszüge der letzten drei Monate',
          hilfe:'Drei zusammenhängende Monate, IBAN muss sichtbar sein.',
          status:'angefordert',
          grundOffen:'Juli liegt uns vor. Für die Prüfung brauchen wir August und September dazu — ' +
                     'zusammenhängend, sonst zählt die Reihe nicht.',
          match:['konto','auszug'],
          soll:3,
          files:[ { name:'kontoauszug-juli.pdf', datum:'12.08.2026' } ],
          history:[] },

        { id:'iva-ausweis', label:'Ausweiskopie',
          hilfe:'Vorder- und Rückseite, Personalausweis oder Reisepass.',
          status:'angenommen', match:['ausweis','perso','pass'], soll:1,
          files:[ { name:'ausweis-iva.pdf', datum:'02.08.2026' } ],
          history:[] }
      ]
    },
    {
      id: 'michael', titel: 'Antragsteller Michael Petrov',
      docs: [
        { id:'mic-gehalt-juli', label:'Vollständige Gehaltsabrechnung Juli',
          status:'angenommen', match:[], soll:1,
          files:[ { name:'scan_071.pdf', datum:'11.08.2026' } ], history:[] },

        { id:'mic-gehalt-juni', label:'Vollständige Gehaltsabrechnung Juni',
          status:'angefordert', match:[], soll:1, files:[], history:[] },

        { id:'mic-aufenthalt', label:'Aufenthaltstitel',
          hilfe:'Beide Seiten, Gültigkeitsdatum muss lesbar sein.',
          status:'angefordert', frist:'Mo, 21.09.',
          grundOffen:'Ihr bisheriger Titel läuft am 14.02.2027 ab — die Bank braucht die Verlängerung, bevor sie zusagt.',
          match:['aufenthalt','titel'], soll:1, files:[], history:[] }
      ]
    },
    {
      id: 'immobilie', titel: 'Immobilie · Lindenstraße 14, 50674 Köln',
      docs: [
        /* Zweiter Fall fuer Flow 2, aber ohne Frist und ohne
           Ablehnung — er steht deshalb NICHT in der Hinweisbox,
           obwohl er offen ist. Das ist der Beleg, dass die Box
           wirklich auswaehlt. */
        { id:'obj-fotos', label:'Objektfotos, mindestens 2 innen und 2 außen, in Farbe',
          hilfe:'Farbaufnahmen, jeder Raum einmal, keine Panoramen.',
          status:'angefordert',
          grundOffen:'Zwei Außenaufnahmen liegen vor. Es fehlen noch zwei Innenaufnahmen.',
          match:['foto','bild','img','aussen','innen'],
          soll:4,
          files:[ { name:'aussen-strasse.jpg', datum:'18.08.2026' },
                  { name:'aussen-garten.jpg',  datum:'18.08.2026' } ],
          history:[] },

        { id:'obj-grundbuch', label:'Grundbuchauszug, vollständig, max. 3 Monate alt',
          status:'angefordert', match:['grundbuch'], soll:1, files:[], history:[] },

        /* Schon einmal ersetzt: die History ist von Anfang an
           gefuellt, damit im Test sichtbar ist, wie eine frühere
           Fassung aussieht, ohne dass man erst selbst ersetzen muss. */
        { id:'obj-expose', label:'Exposé', status:'angenommen',
          match:['expose','exposé'], soll:1,
          files:[ { name:'expose-scan-2.pdf', datum:'20.08.2026' } ],
          history:[ { name:'expose-foto.jpg', datum:'14.08.2026',
                      ersetztAm:'20.08.2026', grund:'Von Ihnen ersetzt' } ] }
      ]
    }
  ];

  /* Dateien aus dem Sammel-Upload, die niemandem zugeordnet werden
     konnten. Liegen im Produkt unten in der Dropzone. */
  var UNKAT = [];
  var laufend = 0;

  var RANK = { abgelehnt: 3, frist: 2, offen: 1, keine: 0 };

  var RANK_EXPLAIN = [
    'Zuerst, was wir zurückweisen mussten — Sie haben geliefert, und es hat nicht gereicht.',
    'Dann, woran eine Frist hängt.',
    'Dann alles Übrige, in der Reihenfolge der Liste.',
    'Was nicht in die drei passt, steht unten — es ist nicht vergessen, es eilt nur nicht.'
  ];

  function alleDocs() {
    return SECTIONS.reduce(function (acc, s) { return acc.concat(s.docs); }, []);
  }
  function find(id) {
    return alleDocs().filter(function (d) { return d.id === id; })[0];
  }

  /* Status neu bestimmen. Eine Anforderung ist erst bei uns, wenn
     genug Dateien da sind — zwei von vier Fotos sind eben noch
     nicht alle Fotos. */
  function reevaluate(d) {
    if (d.grund)             { d.status = 'abgelehnt'; return; }
    if (!d.files.length)     { d.status = 'angefordert'; return; }
    d.status = d.files.length >= (d.soll || 1) ? 'pruefung' : 'angefordert';
  }

  function urgency(d) {
    if (d.status === 'abgelehnt') return 'abgelehnt';
    if (d.status === 'pruefung' || d.status === 'angenommen') return 'keine';
    return d.frist ? 'frist' : 'offen';
  }

  global.AntragsDokumente = {
    kunde: { anrede:'Frau', vorname:'Iva', nachname:'Petrova' },
    heute: '28.08.2026',
    status: STATUS,
    sections: SECTIONS,
    rankExplain: RANK_EXPLAIN,

    urgencyLabel: {
      abgelehnt: 'Zurückgewiesen',
      frist:     'Mit Frist',
      offen:     'Wird gebraucht'
    },

    docs: alleDocs,
    doc: find,
    urgency: urgency,
    unkat: function () { return UNKAT; },

    sectionOf: function (id) {
      return SECTIONS.filter(function (s) {
        return s.docs.some(function (d) { return d.id === id; });
      })[0];
    },
    offen: function () {
      return alleDocs().filter(function (d) {
        return d.status === 'angefordert' || d.status === 'abgelehnt';
      });
    },

    /* ---- Die Hinweisbox: hoechstens drei ----
       Stabil sortiert: bei gleicher Stufe entscheidet die
       Reihenfolge in der Liste, nicht der Zufall — sonst springt
       die Box im Test. */
    top: function (n) {
      return this.offen()
        .map(function (d, i) { return { d:d, i:i }; })
        .sort(function (a, b) {
          var r = RANK[urgency(b.d)] - RANK[urgency(a.d)];
          return r !== 0 ? r : a.i - b.i;
        })
        .slice(0, n === undefined ? 3 : n)
        .map(function (x) { return x.d; });
    },
    restCount: function (n) {
      return Math.max(0, this.offen().length - this.top(n).length);
    },

    /* Ein Satz, der in die Box passt. Der Maschinentext bleibt an
       der Karte — hier stehen 2 Zeilen, nicht 8. */
    kurzgrund: function (d) {
      return d.grundKurz || d.grundOffen || d.hilfe || '';
    },

    /* ---- Die Frage: hinzufuegen oder ersetzen? ----
       Rueckgabe:
         null                    -> die Anforderung ist leer, keine Frage
         { mode, sicher, warum } -> `sicher:false` heisst: wir raten
                                    nicht, wir fragen ohne Empfehlung. */
    decide: function (id) {
      var d = find(id);
      if (!d || !d.files.length) return null;

      if (d.grund) {
        return { mode:'replace', sicher:true,
          warum:'Diese Unterlage haben wir zurückgewiesen. Ihre neue Fassung tritt an die Stelle ' +
                'der alten — die bisherige bleibt als frühere Fassung einsehbar.' };
      }
      if ((d.soll || 1) > 1 && d.files.length < d.soll) {
        return { mode:'add', sicher:true,
          warum:'Diese Unterlage besteht aus ' + d.soll + ' Dateien und ist noch nicht vollständig — ' +
                'die neue kommt zu ' + (d.files.length === 1 ? 'der vorhandenen' :
                'den ' + d.files.length + ' vorhandenen') + ' dazu.' };
      }
      return { mode:null, sicher:false,
        warum:'An dieser Unterlage liegt schon ' +
              (d.files.length === 1 ? 'eine Datei' : d.files.length + ' Dateien') +
              ', und sie ist vollständig. Wir wissen nicht, ob Ihre neue Datei die alte ' +
              'ersetzen oder ergänzen soll.' };
    },

    /* Was auf dem Knopf der Karte steht. Sagt die Folge, wenn wir
       sie kennen — und bleibt neutral, wenn nicht. Sonst waere die
       Frage an der Stelle beantwortet, an der der Kunde die Folgen
       noch nicht sieht. */
    aktionLabel: function (d) {
      if (!d.files.length) return 'Datei hochladen';
      if (d.grund) return 'Neue Fassung hochladen';
      if ((d.soll || 1) > 1 && d.files.length < d.soll) return 'Datei hinzufügen';
      return 'Datei hochladen';
    },

    /* ---- Datei annehmen ---- */
    accept: function (id, dateiname, mode) {
      var d = find(id);
      if (!d) return null;
      var neu = { name: dateiname, datum: this.heute };

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

      delete d.grund;                 /* die Ablehnung ist mit der alten Datei gegangen */
      reevaluate(d);
      return { mode:mode, status:d.status,
               fehlt: Math.max(0, (d.soll || 1) - d.files.length) };
    },

    /* Direkt nach dem Upload umdrehen. Dreht genau den letzten
       Schritt um, nicht mehr. */
    flip: function (id, warMode) {
      var d = find(id);
      if (!d) return null;

      if (warMode === 'replace') {                  // ersetzt -> doch dazulegen
        var neu = d.files[0];
        var zurueck = d.history.filter(function (f) { return f.ersetztAm === this.heute; }, this);
        zurueck.forEach(function (f) { delete f.ersetztAm; delete f.grund; });
        d.history = d.history.filter(function (f) { return zurueck.indexOf(f) === -1; });
        d.files = zurueck.concat(neu ? [neu] : []);
      } else {                                      // dazugelegt -> doch ersetzen
        var letzte = d.files[d.files.length - 1];
        d.files.slice(0, -1).forEach(function (f) {
          f.ersetztAm = this.heute;
          f.grund = 'Von Ihnen ersetzt';
          d.history.unshift(f);
        }, this);
        d.files = letzte ? [letzte] : [];
      }
      reevaluate(d);
      return warMode === 'replace' ? 'add' : 'replace';
    },

    removeFile: function (id, name) {
      var d = find(id);
      if (!d) return;
      d.files = d.files.filter(function (f) { return f.name !== name; });
      reevaluate(d);
    },

    /* Frühere Fassung zurueckholen — das Gegenstueck zum Ersetzen.
       In einen einteiligen Platz zurueckholen IST ein Ersetzen,
       also gilt dieselbe Regel: die aktuelle Datei geht nach
       history, sie verschwindet nicht. Ohne diesen Zweig wuerde
       ausgerechnet der Weg, der vor Verlust schuetzt, selbst etwas
       verlieren. */
    restore: function (id, name) {
      var d = find(id);
      if (!d) return;
      var f = d.history.filter(function (x) { return x.name === name; })[0];
      if (!f) return;
      d.history = d.history.filter(function (x) { return x !== f; });
      delete f.ersetztAm;
      delete f.grund;

      if ((d.soll || 1) > 1) {
        d.files.push(f);
      } else {
        d.files.forEach(function (cur) {
          cur.ersetztAm = this.heute;
          cur.grund = 'Durch eine frühere Fassung ersetzt';
          d.history.unshift(cur);
        }, this);
        d.files = [f];
      }
      reevaluate(d);
    },

    /* ---- Sammel-Upload ----
       Zuordnung ueber Wortstuecke im Dateinamen. Trifft nichts,
       landet die Datei unter „Unkategorisierte Seiten" — der
       ehrliche Ausgang, wenn die Maschine es nicht weiss. Eine
       vollstaendige oder angenommene Anforderung nimmt automatisch
       nichts an: da wuerde die Maschine ungefragt ersetzen. */
    bulk: function (namen) {
      var zugeordnet = [], unklar = [];

      namen.forEach(function (name) {
        var klein = name.toLowerCase();

        /* Das LAENGSTE Wortstueck gewinnt, nicht das erste in der
           Liste. Sonst landet „grundbuchauszug.pdf" bei den
           Kontoauszuegen, weil „auszug" darin vorkommt — und die
           automatische Zuordnung verliert genau da ihr Vertrauen,
           wo sie es am dringendsten braucht. */
        var ziel = null, treffer = 0;
        alleDocs().forEach(function (d) {
          if (d.status === 'angenommen' || d.status === 'pruefung') return;
          if (d.grund) return;                             /* Ablehnung nie still ueberschreiben */
          if (d.files.length >= (d.soll || 1)) return;
          (d.match || []).forEach(function (m) {
            if (klein.indexOf(m) !== -1 && m.length > treffer) { treffer = m.length; ziel = d; }
          });
        });

        if (ziel) {
          ziel.files.push({ name:name, datum:this.heute, auto:true });
          reevaluate(ziel);
          zugeordnet.push({ name:name, docId:ziel.id, label:ziel.label });
        } else {
          var t = { tempId:'u' + (++laufend), name:name };
          UNKAT.push(t);
          unklar.push(t);
        }
      }, this);

      return { zugeordnet:zugeordnet, unklar:unklar };
    },

    /* Eine unkategorisierte Datei zuordnen. Ist die Zielanforderung
       schon voll, ist das ein Ersetzen — dann fragt die UI. */
    assign: function (tempId, docId, mode) {
      var t = UNKAT.filter(function (x) { return x.tempId === tempId; })[0];
      if (!t) return null;
      UNKAT = UNKAT.filter(function (x) { return x !== t; });
      return this.accept(docId, t.name, mode || 'add');
    },
    dropUnkat: function (tempId) {
      UNKAT = UNKAT.filter(function (x) { return x.tempId !== tempId; });
    },

    /* Ziele, die eine unkategorisierte Datei aufnehmen koennen. */
    ziele: function () {
      return alleDocs().filter(function (d) { return d.status !== 'angenommen'; });
    }
  };

})(window);
