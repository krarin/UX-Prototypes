/* ============================================================
   ANTRAGSDOKUMENTE — DATENMODELL V3

   Eigene Datei, nicht documents-data.js: V2 rendert noch seine
   Top-3-Box und braucht dafuer die Rangfolge-Funktionen, die hier
   herausfallen. Vorbild ist dashboard-data-v3.js im Ordner
   customer-dashboard — eine Version, eine Datendatei.

   DREI ENTSCHEIDUNGEN, auf denen alles andere aufbaut:

   1) EINE KARTE IST EINE ANFORDERUNG, KEINE DATEI.
      `files` ist eine Liste und `soll` sagt, wie viele Dateien die
      Anforderung braucht. Ohne das gaebe es die Frage „ersetzen
      oder hinzufuegen?" gar nicht — wo nur eine Datei Platz hat,
      ist jeder Upload ein Ersetzen. Und es gaebe den Zustand
      „2 von 4" nicht.

   2) ERSETZEN LOESCHT NICHT.
      Die alte Datei wandert nach `history`, bleibt sichtbar und
      laesst sich zurueckholen.

   3) NEU IN V3: ES GIBT EINE PRUEFUNG.
      V2 konnte gar keine Ablehnung erzeugen — jeder Upload landete
      auf 'pruefung'. Damit war der Kernfall des Produkts, die
      abgelehnte Datei, nur als Startzustand vorhanden und nie als
      Ergebnis einer Handlung. Hier laeuft `pruefen()` bei jedem
      vollstaendigen Upload: deterministisch, dieselbe Anforderung
      faellt beim ERSTEN Versuch durch und besteht beim zweiten.
      Dieselbe Datei, dieselbe Antwort — damit Demo und Usability-
      Test reproduzierbar sind.

      Geprueft wird erst, wenn die Anforderung vollstaendig ist:
      zwei von vier Fotos kann niemand beurteilen.

   STATUS — die vier Woerter, die im Produkt rechts an der Karte
   stehen. Bewusst keine fuenfte Vokabel fuer „teilweise da": das
   sagt der Zaehler „2 von 4" im Titel.
     'angefordert'  wir warten auf Sie
     'pruefung'     vollstaendig eingegangen, wird geprueft
     'abgelehnt'    Pruefung nicht bestanden, mit Grund
     'angenommen'   durch
   ============================================================ */
(function (global) {

  var STATUS = {
    angefordert: { wort:'angefordert', ikon:null,           klasse:'' },
    pruefung:    { wort:'In Prüfung',  ikon:'schedule',     klasse:'is-review' },
    abgelehnt:   { wort:'Abgelehnt',   ikon:'error',        klasse:'is-rejected' },
    angenommen:  { wort:'Angenommen',  ikon:'check_circle', klasse:'is-accepted' }
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
          status:'angefordert',
          match:['eigenkapital','depot','sparbuch'],
          soll:1, files:[], history:[] }
      ]
    },
    {
      id: 'iva', titel: 'Antragsteller Iva Petrova',
      docs: [
        /* Der Fall aus dem Screenshot: abgelehnt mit langem
           Maschinen-Grund. Eingang in Flow 2, auch ohne dass man
           erst selbst einen Upload durchfallen lassen muss. */
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
             bleibt an der Karte — der Dialog braucht etwas, das man
             in drei Sekunden versteht. */
          grundKurz:'Auf Ihrer Juli-Abrechnung fehlen mehrere Angaben, die wir prüfen müssen. ' +
                    'Am häufigsten hilft: die Abrechnung noch einmal vollständig und in Farbe einreichen.',
          /* Die Pruefung meldet fuenf Befunde. Drei davon stehen in
             der Meldung — mehr liest niemand, und die restlichen
             zwei sind Folgefehler derselben Ursache. */
          gruende:['Das Zahlungsdatum der Abrechnung liegt nicht in der Vergangenheit.',
                   'Die Sozialversicherungsnummer hat nicht das erwartete Format.',
                   'Die Steueridentifikationsnummer beginnt nicht mit einem gültigen Bundeslandcode.'],
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

        /* Mehrteilig und angefangen: eine Datei liegt da, es fehlen
           zwei. Wer hier ersetzt, verliert den Juli-Auszug. */
        { id:'iva-kontoauszug', label:'Kontoauszüge der letzten drei Monate',
          hilfe:'Drei zusammenhängende Monate, IBAN muss sichtbar sein.',
          status:'angefordert',
          match:['konto','auszug'],
          soll:3,
          files:[ { name:'kontoauszug-juli.pdf', datum:'12.08.2026' } ],
          history:[] },

        { id:'iva-ausweis', label:'Ausweiskopie',
          hilfe:'Vorder- und Rückseite, Personalausweis oder Reisepass.',
          status:'angenommen', match:['ausweis','perso','pass','reisepass'], soll:1,
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

        /* Ziel der Beispieldatei „Docs-Reisepass.jpg". Ivas
           Ausweiskopie ist angenommen und damit von der Automatik
           ausgenommen — die Datei landet also eindeutig hier. Und
           hier faellt sie beim ersten Versuch durch: das ist der
           Fall, fuer den die Rueckmeldung gebaut wird. */
        { id:'mic-ausweis', label:'Ausweiskopie',
          hilfe:'Vorder- und Rückseite, Personalausweis oder Reisepass.',
          status:'angefordert', match:['ausweis','perso','pass','reisepass'],
          soll:1, files:[], history:[] },

        { id:'mic-aufenthalt', label:'Aufenthaltstitel',
          hilfe:'Beide Seiten, Gültigkeitsdatum muss lesbar sein.',
          status:'angefordert', match:['aufenthalt','titel'], soll:1, files:[], history:[] }
      ]
    },
    {
      id: 'immobilie', titel: 'Immobilie · Lindenstraße 14, 50674 Köln',
      docs: [
        { id:'obj-fotos', label:'Objektfotos, mindestens 2 innen und 2 außen, in Farbe',
          hilfe:'Farbaufnahmen, jeder Raum einmal, keine Panoramen.',
          status:'angefordert',
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

  /* ------------------------------------------------------------------
     DIE PRUEFUNG.
     Eintrag hier = diese Anforderung faellt beim ERSTEN vollstaendigen
     Upload durch und besteht beim zweiten. `grund` ist der Maschinen-
     text fuer die Karte, `kurz` der Satz fuer den Dialog.
     Bewusst nicht zufaellig: derselbe Klick fuehrt immer zum selben
     Bild, sonst ist ein Usability-Test nicht vergleichbar.
  ------------------------------------------------------------------ */
  var CHECKS = {
    'mic-ausweis': {
      grund:'Es wurde nur eine Seite des Ausweisdokuments erkannt. Die Rückseite fehlt oder ' +
            'ist nicht lesbar. Das maschinenlesbare Feld (MRZ) konnte nicht ausgewertet werden.',
      kurz:'Wir haben nur eine Seite erkannt. Bitte laden Sie Vorder- und Rückseite hoch — ' +
           'beide Seiten müssen vollständig im Bild sein.',
      gruende:['Es wurde nur eine Seite erkannt — die Rückseite fehlt.',
               'Das maschinenlesbare Feld (MRZ) war nicht auswertbar.',
               'Teile des Ausweises liegen außerhalb des Bildes.'] },
    'iva-gehalt-juni': {
      grund:'Es wurde nur die erste Seite der Abrechnung erkannt. Die Summenzeile am Ende des ' +
            'Dokuments fehlt, die Netto-Auszahlung konnte nicht verifiziert werden.',
      kurz:'Wir konnten nur die erste Seite lesen. Bitte laden Sie alle Seiten der Abrechnung ' +
           'hoch, auch die Rückseite.',
      gruende:['Es wurde nur die erste Seite der Abrechnung erkannt.',
               'Die Summenzeile am Ende des Dokuments fehlt.',
               'Die Netto-Auszahlung ließ sich dadurch nicht bestätigen.'] },
    'iva-gehalt-mai': {
      grund:'Die Bildqualität lässt keine sichere Erkennung der Beträge zu. Kontrastwerte ' +
            'unterhalb des Schwellwerts für die automatische Texterkennung.',
      kurz:'Das Foto ist zu dunkel, wir können die Beträge nicht lesen. Bei Tageslicht und ' +
           'flach aufgelegt wird es meistens gut.',
      gruende:['Das Foto ist zu dunkel, die Beträge sind nicht lesbar.',
               'Der Kontrast liegt unter dem Schwellwert der Texterkennung.',
               'Das Blatt ist verzerrt aufgenommen und nicht flach aufgelegt.'] },
    'obj-grundbuch': null            /* muss im Beispiellauf durchgehen */
  };

  /* Ivas Juli-Abrechnung ist bereits einmal durchgefallen — sonst
     wuerde die Ersetzung im Flow gleich noch einmal abgelehnt und
     der Weg haette kein Ende. */
  var ATTEMPTS = { 'iva-gehalt-juli': 1 };

  /* Dateien aus dem Sammel-Upload, die niemandem zugeordnet werden
     konnten. Liegen im Fuss der Dropzone. */
  var UNKAT = [];
  var laufend = 0;

  function alleDocs() {
    return SECTIONS.reduce(function (acc, s) { return acc.concat(s.docs); }, []);
  }
  function find(id) {
    return alleDocs().filter(function (d) { return d.id === id; })[0];
  }
  function voll(d) {
    return d.files.length >= (d.soll || 1);
  }

  function reevaluate(d) {
    if (d.grund)         { d.status = 'abgelehnt'; return; }
    if (!d.files.length) { d.status = 'angefordert'; return; }
    d.status = voll(d) ? 'pruefung' : 'angefordert';
  }

  /* Laeuft nur auf vollstaendigen Anforderungen. */
  function pruefen(d) {
    ATTEMPTS[d.id] = (ATTEMPTS[d.id] || 0) + 1;
    var chk = CHECKS[d.id];
    if (chk && ATTEMPTS[d.id] === 1) {
      d.grund     = chk.grund;
      d.grundKurz = chk.kurz;
      d.gruende   = chk.gruende;
      return { ok:false, grund:chk.grund, kurz:chk.kurz, gruende:chk.gruende };
    }
    delete d.grund;
    delete d.grundKurz;
    delete d.gruende;
    return { ok:true };
  }

  global.AntragsDokumenteV3 = {
    kunde: { anrede:'Frau', vorname:'Iva', nachname:'Petrova' },
    heute: '28.08.2026',
    status: STATUS,
    sections: SECTIONS,

    docs: alleDocs,
    doc: find,
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

    /* Kurzfassung des Grundes fuer den Dialog. */
    kurzgrund: function (d) {
      return d.grundKurz || d.grund || d.hilfe || '';
    },

    /* Die wichtigsten Gruende, hoechstens drei. Mehr liest in einer
       Meldung niemand — der vollstaendige Maschinentext steht
       weiterhin an der Karte. */
    topGruende: function (d, max) {
      return (d && d.gruende ? d.gruende : []).slice(0, max || 3);
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
       sie kennen — und bleibt neutral, wenn nicht. */
    aktionLabel: function (d) {
      if (!d.files.length) return 'Datei hochladen';
      if (d.grund) return 'Neue Fassung hochladen';
      if ((d.soll || 1) > 1 && d.files.length < d.soll) return 'Datei hinzufügen';
      return 'Datei hochladen';
    },

    /* ---- Datei annehmen, dann pruefen ---- */
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

      /* Die Ablehnung ist mit der alten Datei gegangen. Ob die neue
         besteht, entscheidet die Pruefung — nicht der Upload. */
      delete d.grund;
      delete d.grundKurz;
      delete d.gruende;

      var chk = voll(d) ? pruefen(d) : null;
      reevaluate(d);

      return { mode:mode, status:d.status,
               fehlt: Math.max(0, (d.soll || 1) - d.files.length),
               ok: !chk || chk.ok,
               kurz:    chk && !chk.ok ? chk.kurz    : null,
               gruende: chk && !chk.ok ? chk.gruende : null };
    },

    /* Direkt nach dem Upload umdrehen. Dreht genau den letzten
       Schritt um, nicht mehr — und pruefen laeuft dabei nicht neu,
       sonst wuerde ein Klick auf „doch anders" wie ein neuer
       Einreichungsversuch zaehlen. */
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
       In einen einteiligen Platz zurueckholen IST ein Ersetzen, also
       gilt dieselbe Regel: die aktuelle Datei geht nach history, sie
       verschwindet nicht. Ohne diesen Zweig wuerde ausgerechnet der
       Weg, der vor Verlust schuetzt, selbst etwas verlieren. */
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

    /* ---- Sammel-Upload, Datei fuer Datei ----
       Bewusst KEINE Planung im Voraus: die Zuordnung wird erst in dem
       Moment entschieden, in dem die Datei fertig ist. Wuerde man
       alle fuenf vorab planen, wuerden zwei Fotos in denselben freien
       Platz gerechnet und die Anforderung liefe ueber.

       Rueckgabe je Datei:
         { name, docId, label, ok, kurz }   docId null = unkategorisiert
    ---------------------------------------------------------------- */
    commit: function (name) {
      var klein = name.toLowerCase();

      /* Das LAENGSTE Wortstueck gewinnt, nicht das erste in der
         Liste. Sonst landet „grundbuchauszug.pdf" bei den
         Kontoauszuegen, weil „auszug" darin vorkommt — und die
         automatische Zuordnung verliert genau da ihr Vertrauen, wo
         sie es am dringendsten braucht. */
      var ziel = null, treffer = 0;
      alleDocs().forEach(function (d) {
        if (d.status === 'angenommen' || d.status === 'pruefung') return;
        if (d.grund) return;                    /* Ablehnung nie still ueberschreiben */
        if (voll(d)) return;
        (d.match || []).forEach(function (m) {
          if (klein.indexOf(m) !== -1 && m.length > treffer) { treffer = m.length; ziel = d; }
        });
      });

      if (!ziel) {
        var t = { tempId:'u' + (++laufend), name:name };
        UNKAT.push(t);
        return { name:name, docId:null, label:null, ok:false, tempId:t.tempId };
      }

      var r = this.accept(ziel.id, name, 'add');
      return { name:name, docId:ziel.id, label:ziel.label, ok:r.ok,
               kurz:r.kurz, gruende:r.gruende };
    },

    /* Alles auf einmal — fuer Skripte und Pruefläufe, nicht fuer die UI. */
    bulk: function (namen) {
      return namen.map(function (n) { return this.commit(n); }, this);
    },

    /* Eine unkategorisierte Datei zuordnen. */
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
