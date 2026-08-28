/* ============================================================
   CUSTOMER DASHBOARD — DOKUMENT-VORSCHAUEN (Mock)
   Rendert je Dokumenttyp eine gefakte "Seite". Kein Bildmaterial,
   alles Markup/SVG — damit die Datei eigenstaendig teilbar bleibt
   und in beiden Viewports identisch aussieht.

   Papierformat: feste 420 x 594 px (A4-Verhaeltnis). Die Aufrufer
   skalieren ueber --pv-scale, statt das Layout neu zu bauen.
   ============================================================ */
(function (global) {

  /* ---------- gemeinsame Styles, einmalig injiziert ---------- */
  var STYLE = '' +
  '.pv-wrap{display:flex;justify-content:center}' +
  '.pv-scaler{transform:scale(var(--pv-scale,1));transform-origin:top center}' +
  '.pv-paper{width:420px;height:594px;background:#fff;color:#1b2529;' +
    'font-family:var(--font-family);font-size:9px;line-height:1.5;padding:26px 28px;' +
    'box-shadow:0 6px 24px rgba(0,0,0,.18);overflow:hidden;position:relative}' +
  '.pv-hd{display:flex;justify-content:space-between;align-items:flex-start;' +
    'border-bottom:1.5px solid #1b2529;padding-bottom:7px;margin-bottom:12px}' +
  '.pv-org{font-size:11px;font-weight:700;letter-spacing:.3px}' +
  '.pv-meta{font-size:8px;color:#6b7a80;text-align:right;line-height:1.5}' +
  '.pv-h{font-size:13px;font-weight:700;margin:0 0 10px}' +
  '.pv-sub{font-size:8px;color:#6b7a80;text-transform:uppercase;letter-spacing:.8px;' +
    'font-weight:700;margin:14px 0 5px}' +
  '.pv-t{width:100%;border-collapse:collapse;font-size:9px}' +
  '.pv-t td,.pv-t th{padding:3.5px 0;text-align:left;border-bottom:1px solid #e6ebed}' +
  '.pv-t th{font-size:8px;color:#6b7a80;text-transform:uppercase;letter-spacing:.5px}' +
  '.pv-t .n{text-align:right;font-variant-numeric:tabular-nums}' +
  '.pv-t .tot td{font-weight:700;border-bottom:0;border-top:1.5px solid #1b2529;padding-top:5px}' +
  '.pv-kv{display:grid;grid-template-columns:auto 1fr;gap:2px 12px;font-size:9px}' +
  '.pv-kv span:nth-child(odd){color:#6b7a80}' +
  '.pv-p{font-size:8.5px;color:#3d4c52;margin:0 0 7px;text-align:justify}' +
  '.pv-foot{position:absolute;left:28px;right:28px;bottom:20px;font-size:7px;color:#93a1a7;' +
    'border-top:1px solid #e6ebed;padding-top:6px;display:flex;justify-content:space-between}' +
  '.pv-stamp{position:absolute;right:26px;top:120px;border:2px solid #b23;color:#b23;' +
    'font-size:8px;font-weight:700;letter-spacing:1px;padding:5px 9px;transform:rotate(-11deg);' +
    'opacity:.62;border-radius:3px;text-align:center;line-height:1.35}' +
  /* Ausweis */
  '.pv-card{border:1px solid #c9d3d7;border-radius:7px;padding:10px;margin-bottom:9px;' +
    'background:linear-gradient(135deg,#eef4f6 0%,#e2edf0 55%,#dbe9ec 100%);display:flex;gap:10px}' +
  '.pv-photo{width:56px;height:72px;border-radius:3px;background:#c4d0d5;flex-shrink:0;' +
    'display:grid;place-items:center;color:#84969d}' +
  '.pv-mrz{font-family:ui-monospace,Menlo,monospace;font-size:8px;letter-spacing:.9px;' +
    'background:#f4f7f8;padding:5px 6px;border-radius:3px;margin-top:6px;color:#3d4c52;word-break:break-all}' +
  /* Fotos */
  '.pv-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
  '.pv-ph{aspect-ratio:4/3;border-radius:4px;display:grid;place-items:center;' +
    'color:#fff;font-size:8px;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.35)}' +
  /* Energieausweis */
  '.pv-scale{display:flex;flex-direction:column;gap:2px;margin-top:6px}' +
  '.pv-band{height:15px;border-radius:2px;display:flex;align-items:center;padding:0 6px;' +
    'color:#fff;font-size:8px;font-weight:700}' +
  /* Formular zum Ausfuellen (V3) — leere Zeilen bzw. handschriftliche Werte */
  '.pv-fld{display:grid;grid-template-columns:122px 1fr;gap:7px 12px;align-items:end;font-size:9px}' +
  '.pv-fld i{font-style:normal;color:#6b7a80}' +
  '.pv-line{border-bottom:1px solid #9fb0b6;height:14px}' +
  '.pv-ink{border-bottom:1px solid #9fb0b6;height:14px;color:#1f3d8a;font-size:10px;' +
    'font-style:italic;line-height:15px;white-space:nowrap;overflow:hidden}' +
  '.pv-box{width:10px;height:10px;border:1px solid #6b7a80;border-radius:2px;flex-shrink:0;' +
    'display:inline-grid;place-items:center;font-size:9px;color:#1f3d8a;line-height:1;' +
    'margin-right:6px;vertical-align:-1px}' +
  '.pv-chk{font-size:8.5px;color:#3d4c52;margin-bottom:6px;display:flex;align-items:flex-start}' +
  '.pv-sig{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:16px}' +
  '.pv-sig-ink{height:28px;display:flex;align-items:flex-end;padding-bottom:2px;' +
    'color:#1f3d8a;font-style:italic;font-size:11px}' +
  '.pv-sig-cap{border-top:1px solid #1b2529;padding-top:3px;font-size:7.5px;color:#6b7a80}' +
  '.pv-blank{position:absolute;right:26px;top:112px;border:1.5px dashed #6b7a80;color:#6b7a80;' +
    'font-size:7.5px;font-weight:700;letter-spacing:.8px;padding:4px 8px;border-radius:3px;' +
    'text-align:center;line-height:1.35}';

  var injected = false;
  function injectStyles() {
    if (injected) return;
    var el = document.createElement('style');
    el.textContent = STYLE;
    document.head.appendChild(el);
    injected = true;
  }

  function head(org, right) {
    return '<div class="pv-hd"><div class="pv-org">' + org + '</div>' +
           '<div class="pv-meta">' + right + '</div></div>';
  }
  function foot(l, r) {
    return '<div class="pv-foot"><span>' + l + '</span><span>' + (r || 'Seite 1 von 1') + '</span></div>';
  }

  /* ---------- Vorlagen je Dokumenttyp ---------- */
  var T = {

    /* Formular, das die Bank bereitstellt (V3).
       Dieselbe Vorlage zeigt beide Zustaende:
         o.ausgefuellt === false -> leeres Blatt zum Herunterladen
         o.ausgefuellt === true  -> das Blatt, wie der Kunde es
                                    zurueckgeschickt hat
       So sieht der Kunde nach dem Upload, was bei uns liegt. */
    formular: function (o) {
      var filled = !!o.ausgefuellt;
      var felder = o.felder || [];
      var boxen  = o.boxen  || [];

      function val(v) {
        return filled && v ? '<span class="pv-ink">' + v + '</span>'
                           : '<span class="pv-line"></span>';
      }
      var sig = '<svg width="86" height="24" viewBox="0 0 86 24" fill="none">' +
        '<path d="M2 18C8 6 11 4 13 9c2 5-2 11 1 11 4 0 6-14 10-14 3 0 1 10 4 10 ' +
        '4 0 7-12 11-12 3 0 2 9 5 9 5 0 9-13 14-13 4 0 3 8 6 8 4 0 8-5 14-8" ' +
        'stroke="#1f3d8a" stroke-width="1.5" stroke-linecap="round"/></svg>';

      return head(o.org || 'FINLINK FINANZIERUNGEN GmbH',
                  'Formular ' + (o.nr || 'F-000') + '<br>' +
                  (filled ? 'Vom Kunden zurückgesandt' : 'Bitte ausfüllen und zurücksenden')) +
        '<h1 class="pv-h">' + (o.titel || 'Formular') + '</h1>' +
        (filled ? '' : '<div class="pv-blank">LEERES<br>FORMULAR</div>') +
        (o.intro ? '<p class="pv-p">' + o.intro + '</p>' : '') +
        '<div class="pv-sub">Angaben</div>' +
        '<div class="pv-fld">' + felder.map(function (f) {
          return '<i>' + f[0] + '</i>' + val(f[1]);
        }).join('') + '</div>' +
        (boxen.length
          ? '<div class="pv-sub">Erklärung</div>' + boxen.map(function (b) {
              return '<div class="pv-chk"><span class="pv-box">' +
                     (filled ? '✓' : '') + '</span><span>' + b + '</span></div>';
            }).join('')
          : '') +
        '<div class="pv-sig">' +
          '<div><div class="pv-sig-ink">' + (filled ? 'Köln, 24.08.2026' : '') + '</div>' +
            '<div class="pv-sig-cap">Ort, Datum</div></div>' +
          '<div><div class="pv-sig-ink">' + (filled ? sig : '') + '</div>' +
            '<div class="pv-sig-cap">Unterschrift</div></div>' +
        '</div>' +
        foot(filled ? 'Eingegangen — noch nicht geprüft'
                    : 'Leeres Formular · herunterladen, ausfüllen, wieder hochladen',
             'Seite 1 von ' + (o.seiten || 2));
    },

    gehalt: function (o) {
      var p = o.person || 'Iva Petrova';
      return head('KAUFHOF LOGISTIK GmbH', 'Personalnummer 44-2019<br>Steuerklasse ' + (o.stkl || 'IV') + ' · Kirchensteuer nein') +
        '<h1 class="pv-h">Entgeltabrechnung ' + (o.monat || 'September') + ' 2026</h1>' +
        '<div class="pv-kv"><span>Arbeitnehmer/in</span><span>' + p + '</span>' +
          '<span>Eintritt</span><span>01.03.2019</span>' +
          '<span>Tätigkeit</span><span>' + (o.job || 'Disponentin') + '</span></div>' +
        '<div class="pv-sub">Bezüge</div>' +
        '<table class="pv-t"><tr><th>Bezeichnung</th><th class="n">Betrag</th></tr>' +
          '<tr><td>Grundgehalt</td><td class="n">' + (o.brutto || '4.850,00') + '</td></tr>' +
          '<tr><td>Funktionszulage</td><td class="n">320,00</td></tr>' +
          '<tr><td>Fahrtkostenzuschuss</td><td class="n">58,00</td></tr>' +
          '<tr class="tot"><td>Gesamtbrutto</td><td class="n">' + (o.gesamt || '5.228,00') + '</td></tr></table>' +
        '<div class="pv-sub">Abzüge</div>' +
        '<table class="pv-t">' +
          '<tr><td>Lohnsteuer</td><td class="n">−968,41</td></tr>' +
          '<tr><td>Solidaritätszuschlag</td><td class="n">−0,00</td></tr>' +
          '<tr><td>Krankenversicherung</td><td class="n">−424,77</td></tr>' +
          '<tr><td>Rentenversicherung</td><td class="n">−486,20</td></tr>' +
          '<tr><td>Arbeitslosenversicherung</td><td class="n">−68,00</td></tr>' +
          '<tr><td>Pflegeversicherung</td><td class="n">−89,40</td></tr>' +
          '<tr class="tot"><td>Nettoentgelt</td><td class="n">' + (o.netto || '3.191,22') + '</td></tr></table>' +
        '<div class="pv-sub">Auszahlung</div>' +
        '<div class="pv-kv"><span>IBAN</span><span>' + (o.iban || 'DE21 3705 0198 0012 3456 78') + '</span>' +
          '<span>Wertstellung</span><span>28.' + (o.mm || '09') + '.2026</span></div>' +
        foot('Erstellt maschinell, ohne Unterschrift gültig');
    },

    ausweis: function (o) {
      var p = (o.person || 'Iva Petrova').split(' ');
      return head('BUNDESREPUBLIK DEUTSCHLAND', 'Personalausweis<br>Beidseitige Kopie') +
        '<h1 class="pv-h">Ausweiskopie</h1>' +
        '<div class="pv-card"><div class="pv-photo">Foto</div><div style="flex:1">' +
          '<div style="font-size:7px;color:#5b6c72;letter-spacing:1px">PERSONALAUSWEIS</div>' +
          '<div class="pv-kv" style="margin-top:5px">' +
            '<span>Name</span><span><b>' + p[1] + '</b></span>' +
            '<span>Vornamen</span><span>' + p[0] + '</span>' +
            '<span>Geburtsdatum</span><span>' + (o.geb || '03.05.1990') + '</span>' +
            '<span>Geburtsort</span><span>' + (o.ort || 'Plovdiv') + '</span>' +
            '<span>Gültig bis</span><span>' + (o.bis || '19.08.2031') + '</span></div>' +
        '</div></div>' +
        '<div style="font-size:7px;color:#6b7a80;margin:-3px 0 7px">Vorderseite</div>' +
        '<div class="pv-card" style="display:block">' +
          '<div class="pv-kv"><span>Ausweisnummer</span><span>' + (o.nr || 'L01X00T47') + '</span>' +
            '<span>Behörde</span><span>Stadt Köln</span>' +
            '<span>Anschrift</span><span>Lindenstraße 14, 50674 Köln</span></div>' +
          '<div class="pv-mrz">IDD&lt;&lt;' + (o.nr || 'L01X00T47') + '2&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>' +
            (o.geb2 || '9005037') + '&lt;2' + (o.bis2 || '3108194') + 'D&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;4<br>' +
            p[1].toUpperCase() + '&lt;&lt;' + p[0].toUpperCase() + '&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>' +
        '</div>' +
        '<div style="font-size:7px;color:#6b7a80;margin-top:-3px">Rückseite</div>' +
        foot('Kopie — nur zur Vorlage bei der Finanzierung');
    },

    aufenthalt: function (o) {
      return head('AUSLÄNDERBEHÖRDE KÖLN', 'Aufenthaltstitel<br>§ 18b AufenthG') +
        '<h1 class="pv-h">Aufenthaltstitel</h1>' +
        '<div class="pv-card"><div class="pv-photo">Foto</div><div style="flex:1">' +
          '<div style="font-size:7px;color:#5b6c72;letter-spacing:1px">AUFENTHALTSTITEL</div>' +
          '<div class="pv-kv" style="margin-top:5px">' +
            '<span>Name</span><span><b>Petrov, Michael</b></span>' +
            '<span>Geburtsdatum</span><span>21.11.1988</span>' +
            '<span>Staatsangehörigkeit</span><span>Bulgarien</span>' +
            '<span>Titel</span><span>Blaue Karte EU</span>' +
            '<span>Gültig bis</span><span><b>' + (o.bis || '14.02.2027') + '</b></span></div>' +
        '</div></div>' +
        (o.abgelaufen ? '<div class="pv-stamp">ABGELAUFEN<br>' + (o.bis || '') + '</div>' : '') +
        '<div class="pv-sub">Nebenbestimmungen</div>' +
        '<p class="pv-p">Erwerbstätigkeit gestattet. Beschäftigung nur mit Zustimmung der ' +
          'Bundesagentur für Arbeit, sofern nicht nach § 18b Abs. 2 AufenthG entbehrlich.</p>' +
        foot('Ausländerbehörde Köln · Az. 2019/4471-B');
    },

    schreiben: function (o) {
      return head('AUSLÄNDERBEHÖRDE KÖLN', 'Willy-Brandt-Platz 2<br>50679 Köln<br>' + (o.datum || '02.08.2026')) +
        '<div style="font-size:9px;margin-bottom:14px">Michael Petrov<br>Lindenstraße 14<br>50674 Köln</div>' +
        '<h1 class="pv-h">Verlängerung des Aufenthaltstitels</h1>' +
        '<p class="pv-p">Sehr geehrter Herr Petrov,</p>' +
        '<p class="pv-p">auf Ihren Antrag vom 12.07.2026 wird Ihr Aufenthaltstitel (Blaue Karte EU) ' +
          'gemäß § 18b AufenthG verlängert. Der neue Titel ist gültig bis zum ' +
          '<b>' + (o.neu || '14.02.2031') + '</b>.</p>' +
        '<p class="pv-p">Die Erwerbstätigkeit bleibt uneingeschränkt gestattet. Der ausgestellte ' +
          'elektronische Aufenthaltstitel kann ab dem 20.08.2026 in Zimmer 314 abgeholt werden. ' +
          'Bitte bringen Sie diesen Bescheid sowie Ihren Reisepass mit.</p>' +
        '<p class="pv-p">Mit freundlichen Grüßen</p>' +
        '<div style="font-size:9px;margin-top:16px">i. A. Kowalski<br>' +
          '<span style="font-size:8px;color:#6b7a80">Sachbearbeitung</span></div>' +
        foot('Az. 2019/4471-B · Ausländerbehörde Köln');
    },

    kontoauszug: function (o) {
      return head('SPARKASSE KÖLNBONN', 'Kontoauszug 09/2026<br>Blatt 1') +
        '<h1 class="pv-h">Kontoauszug</h1>' +
        '<div class="pv-kv"><span>Kontoinhaber/in</span><span>' + (o.person || 'Iva Petrova') + '</span>' +
          '<span>IBAN</span><span><b>' + (o.iban || 'DE21 3705 0198 0012 3456 78') + '</b></span>' +
          '<span>BIC</span><span>COLSDE33XXX</span>' +
          '<span>Zeitraum</span><span>01.09.2026 – 30.09.2026</span></div>' +
        '<div class="pv-sub">Buchungen</div>' +
        '<table class="pv-t"><tr><th>Datum</th><th>Vorgang</th><th class="n">Betrag</th></tr>' +
          '<tr><td>01.09.</td><td>Miete Lindenstraße</td><td class="n">−1.180,00</td></tr>' +
          '<tr><td>03.09.</td><td>Stadtwerke Köln</td><td class="n">−96,40</td></tr>' +
          '<tr><td>08.09.</td><td>Lastschrift Versicherung</td><td class="n">−212,55</td></tr>' +
          '<tr><td>15.09.</td><td>Kartenzahlung REWE</td><td class="n">−87,32</td></tr>' +
          '<tr><td>22.09.</td><td>Überweisung M. Petrov</td><td class="n">+400,00</td></tr>' +
          '<tr><td>28.09.</td><td>Gehalt Kaufhof Logistik</td><td class="n">+3.191,22</td></tr>' +
          '<tr class="tot"><td colspan="2">Saldo zum 30.09.2026</td><td class="n">+8.412,66</td></tr></table>' +
        foot('Sparkasse KölnBonn · Erstellt am 01.10.2026');
    },

    grundbuch: function () {
      return head('AMTSGERICHT KÖLN', 'Grundbuch von Neustadt-Süd<br>Blatt 4182<br>Abruf 12.08.2026') +
        '<h1 class="pv-h">Grundbuchauszug</h1>' +
        '<div class="pv-sub">Bestandsverzeichnis</div>' +
        '<table class="pv-t"><tr><th>Lfd.</th><th>Gemarkung / Flur / Flurstück</th><th class="n">Größe</th></tr>' +
          '<tr><td>1</td><td>Neustadt-Süd, Flur 12, Flurstück 244/3</td><td class="n">412 m²</td></tr></table>' +
        '<p class="pv-p" style="margin-top:6px">Wohnungs- und Teileigentum: 78,4/1000 Miteigentumsanteil, ' +
          'verbunden mit dem Sondereigentum an der Wohnung Nr. 7 im 2. Obergeschoss, ' +
          'Lindenstraße 14, 50674 Köln.</p>' +
        '<div class="pv-sub">Abteilung I — Eigentümer</div>' +
        '<table class="pv-t"><tr><td>1</td><td>Hartmann, Beate Christine, geb. 1961</td>' +
          '<td class="n">Auflassung 04.11.2016</td></tr></table>' +
        '<div class="pv-sub">Abteilung II — Lasten und Beschränkungen</div>' +
        '<table class="pv-t"><tr><td>1</td><td>Geh- und Fahrtrecht für Flurstück 244/4</td>' +
          '<td class="n">eingetr. 1998</td></tr></table>' +
        '<div class="pv-sub">Abteilung III — Grundpfandrechte</div>' +
        '<table class="pv-t"><tr><td>1</td><td>Grundschuld ohne Brief, Sparkasse KölnBonn</td>' +
          '<td class="n">120.000,00 €</td></tr></table>' +
        foot('Beglaubigter Ausdruck · Amtsgericht Köln');
    },

    wohnflaeche: function () {
      return head('ARCHITEKTURBÜRO LENZ & PARTNER', 'Aufmaß vom 22.07.2026<br>Lindenstraße 14, Whg. 7') +
        '<h1 class="pv-h">Wohnflächenberechnung</h1>' +
        '<p class="pv-p">Berechnung nach Wohnflächenverordnung (WoFlV) vom 25.11.2003.</p>' +
        '<table class="pv-t"><tr><th>Raum</th><th class="n">Länge</th><th class="n">Breite</th>' +
          '<th class="n">Faktor</th><th class="n">Fläche</th></tr>' +
          '<tr><td>Wohnen / Essen</td><td class="n">5,80 m</td><td class="n">4,35 m</td><td class="n">1,00</td><td class="n">25,23 m²</td></tr>' +
          '<tr><td>Küche</td><td class="n">3,20 m</td><td class="n">2,80 m</td><td class="n">1,00</td><td class="n">8,96 m²</td></tr>' +
          '<tr><td>Schlafen</td><td class="n">4,10 m</td><td class="n">3,55 m</td><td class="n">1,00</td><td class="n">14,56 m²</td></tr>' +
          '<tr><td>Kind</td><td class="n">3,60 m</td><td class="n">3,10 m</td><td class="n">1,00</td><td class="n">11,16 m²</td></tr>' +
          '<tr><td>Bad</td><td class="n">2,90 m</td><td class="n">2,25 m</td><td class="n">1,00</td><td class="n">6,53 m²</td></tr>' +
          '<tr><td>Diele</td><td class="n">4,40 m</td><td class="n">1,60 m</td><td class="n">1,00</td><td class="n">7,04 m²</td></tr>' +
          '<tr><td>Abstellraum</td><td class="n">1,80 m</td><td class="n">1,35 m</td><td class="n">1,00</td><td class="n">2,43 m²</td></tr>' +
          '<tr><td>Balkon</td><td class="n">3,50 m</td><td class="n">1,45 m</td><td class="n">0,50</td><td class="n">2,54 m²</td></tr>' +
          '<tr class="tot"><td colspan="4">Wohnfläche gesamt</td><td class="n">78,45 m²</td></tr></table>' +
        '<div class="pv-sub">Bestätigung</div>' +
        '<p class="pv-p">Die Maße wurden am Objekt aufgenommen. Alle Räume weisen eine lichte ' +
          'Höhe von mindestens 2,40 m auf.</p>' +
        '<div style="font-size:9px;margin-top:10px">Dipl.-Ing. M. Lenz<br>' +
          '<span style="font-size:8px;color:#6b7a80">Architekt AKNW Nr. 21884</span></div>' +
        foot('Architekturbüro Lenz & Partner, Köln');
    },

    flurkarte: function () {
      return head('KATASTERAMT KÖLN', 'Liegenschaftskarte<br>Maßstab 1:500<br>Stand 08/2026') +
        '<h1 class="pv-h">Flurkarte / Lageplan</h1>' +
        '<svg viewBox="0 0 360 300" style="width:100%;height:auto;background:#f7faf8;border:1px solid #dde5e7;border-radius:3px">' +
          '<rect x="30" y="40" width="140" height="110" fill="#d8e6dd" stroke="#6d8a78" stroke-width="1.5"/>' +
          '<rect x="62" y="72" width="76" height="52" fill="#b9cdc0" stroke="#4d6b58" stroke-width="1.5"/>' +
          '<text x="86" y="102" font-size="9" fill="#2f4438" font-family="sans-serif">Haus 14</text>' +
          '<text x="36" y="54" font-size="8" fill="#4d6b58" font-family="sans-serif">244/3 · 412 m²</text>' +
          '<rect x="185" y="40" width="120" height="110" fill="#eef2f0" stroke="#9fb0a6" stroke-width="1"/>' +
          '<text x="191" y="54" font-size="8" fill="#7d8f85" font-family="sans-serif">244/4</text>' +
          '<rect x="30" y="165" width="275" height="26" fill="#e9eef0" stroke="#b8c6cb" stroke-width="1"/>' +
          '<text x="120" y="182" font-size="9" fill="#5c6f77" font-family="sans-serif">Lindenstraße</text>' +
          '<line x1="30" y1="210" x2="110" y2="210" stroke="#5c6f77" stroke-width="1.5"/>' +
          '<text x="30" y="224" font-size="7" fill="#5c6f77" font-family="sans-serif">0        20 m</text>' +
          '<path d="M320 60 l7 20 -7 -6 -7 6 z" fill="#5c6f77"/>' +
          '<text x="314" y="52" font-size="8" fill="#5c6f77" font-family="sans-serif">N</text>' +
        '</svg>' +
        '<p class="pv-p" style="margin-top:8px">Gemarkung Neustadt-Süd, Flur 12. Auszug aus dem ' +
          'Liegenschaftskataster, erstellt am 09.08.2026.</p>' +
        foot('Katasteramt Köln · Amtlicher Auszug');
    },

    bauplan: function () {
      return head('ARCHITEKTURBÜRO LENZ & PARTNER', 'Grundriss 2. OG<br>Maßstab 1:100<br>Bemaßt') +
        '<h1 class="pv-h">Baupläne — Grundriss</h1>' +
        '<svg viewBox="0 0 360 320" style="width:100%;height:auto;background:#fcfdfd;border:1px solid #dde5e7;border-radius:3px">' +
          '<g stroke="#2b3a40" fill="none" stroke-width="3">' +
            '<rect x="35" y="35" width="290" height="215"/>' +
            '<line x1="185" y1="35" x2="185" y2="150"/>' +
            '<line x1="35" y1="150" x2="325" y2="150"/>' +
            '<line x1="255" y1="150" x2="255" y2="250"/>' +
            '<line x1="115" y1="150" x2="115" y2="250"/>' +
          '</g>' +
          '<g font-family="sans-serif" font-size="8" fill="#3d4c52">' +
            '<text x="72" y="95">Wohnen / Essen</text><text x="80" y="107">25,23 m²</text>' +
            '<text x="220" y="95">Schlafen</text><text x="220" y="107">14,56 m²</text>' +
            '<text x="52" y="200">Bad</text><text x="46" y="212">6,53 m²</text>' +
            '<text x="150" y="200">Küche</text><text x="146" y="212">8,96 m²</text>' +
            '<text x="272" y="200">Kind</text><text x="268" y="212">11,16 m²</text>' +
          '</g>' +
          '<g stroke="#7d8f95" stroke-width=".9" font-family="sans-serif" font-size="7" fill="#7d8f95">' +
            '<line x1="35" y1="275" x2="325" y2="275"/>' +
            '<line x1="35" y1="270" x2="35" y2="280"/><line x1="325" y1="270" x2="325" y2="280"/>' +
            '<text x="168" y="288">11,60 m</text>' +
            '<line x1="345" y1="35" x2="345" y2="250"/>' +
            '<line x1="340" y1="35" x2="350" y2="35"/><line x1="340" y1="250" x2="350" y2="250"/>' +
            '<text x="330" y="148" transform="rotate(-90 330 148)">8,60 m</text>' +
          '</g>' +
        '</svg>' +
        foot('Dipl.-Ing. M. Lenz · Plan-Nr. 4182-G2');
    },

    baubeschreibung: function () {
      return head('HARTMANN IMMOBILIEN', 'Objekt Lindenstraße 14<br>Wohnung Nr. 7') +
        '<h1 class="pv-h">Baubeschreibung</h1>' +
        '<div class="pv-sub">1 · Konstruktion</div>' +
        '<p class="pv-p">Massivbauweise, Außenwände 36,5 cm Hochlochziegel mit Wärmedämmverbundsystem ' +
          '(WLG 035, 14 cm). Geschossdecken als Stahlbetondecken, 20 cm. Baujahr 2016.</p>' +
        '<div class="pv-sub">2 · Dach</div>' +
        '<p class="pv-p">Satteldach, Neigung 38°, Eindeckung mit Tondachziegeln. Dämmung der obersten ' +
          'Geschossdecke 24 cm Mineralwolle.</p>' +
        '<div class="pv-sub">3 · Fenster und Türen</div>' +
        '<p class="pv-p">Kunststofffenster mit Dreifachverglasung, Ug = 0,7 W/m²K. Wohnungseingangstür ' +
          'als Sicherheitstür RC2 mit Mehrfachverriegelung.</p>' +
        '<div class="pv-sub">4 · Heizung und Warmwasser</div>' +
        '<p class="pv-p">Zentrale Gas-Brennwerttherme mit Solarunterstützung, Fußbodenheizung in allen ' +
          'Wohnräumen. Warmwasserbereitung zentral über Pufferspeicher.</p>' +
        '<div class="pv-sub">5 · Sanitär</div>' +
        '<p class="pv-p">Bad mit bodengleicher Dusche, Badewanne und Doppelwaschtisch. ' +
          'Sanitärobjekte Villeroy &amp; Boch, Armaturen Grohe.</p>' +
        '<div class="pv-sub">6 · Bodenbeläge</div>' +
        '<p class="pv-p">Eichenparkett in Wohn- und Schlafräumen, Feinsteinzeug in Bad, Küche und Diele.</p>' +
        foot('Hartmann Immobilien GmbH · Stand 07/2026');
    },

    kaufvertrag: function () {
      return head('NOTAR DR. A. SCHÜTTE', 'Urkundenrolle Nr. 1184/2026<br>E N T W U R F') +
        '<h1 class="pv-h">Kaufvertrag — Entwurf</h1>' +
        '<div class="pv-stamp">ENTWURF<br>nicht beurkundet</div>' +
        '<div class="pv-sub">§ 1 Kaufgegenstand</div>' +
        '<p class="pv-p">Gegenstand des Vertrages ist der im Grundbuch von Neustadt-Süd, Blatt 4182, ' +
          'eingetragene Miteigentumsanteil von 78,4/1000, verbunden mit dem Sondereigentum an der ' +
          'Wohnung Nr. 7, Lindenstraße 14, 50674 Köln.</p>' +
        '<div class="pv-sub">§ 2 Kaufpreis</div>' +
        '<p class="pv-p">Der Kaufpreis beträgt <b>210.000,00 €</b> (in Worten: zweihundertzehntausend Euro). ' +
          'Er ist binnen 14 Tagen nach Vorliegen der Fälligkeitsmitteilung des Notars zu zahlen.</p>' +
        '<div class="pv-sub">§ 3 Besitzübergang</div>' +
        '<p class="pv-p">Besitz, Nutzen, Lasten und die Gefahr des zufälligen Untergangs gehen mit ' +
          'vollständiger Kaufpreiszahlung auf die Käuferseite über.</p>' +
        '<div class="pv-sub">§ 4 Sachmängel</div>' +
        '<p class="pv-p">Der Verkauf erfolgt unter Ausschluss der Haftung für Sachmängel. Der Ausschluss ' +
          'gilt nicht bei Arglist oder für garantierte Beschaffenheiten.</p>' +
        '<div class="pv-sub">§ 5 Auflassung</div>' +
        '<p class="pv-p">Die Beteiligten sind sich über den Eigentumsübergang einig und bewilligen die ' +
          'Eintragung im Grundbuch.</p>' +
        foot('Notariat Dr. Schütte, Köln · Entwurfsstand 05.08.2026');
    },

    expose: function () {
      return head('HARTMANN IMMOBILIEN', 'Objekt-Nr. 4182-7<br>Stand 08/2026') +
        '<h1 class="pv-h">Eigentumswohnung · Köln-Neustadt</h1>' +
        '<div class="pv-grid" style="margin-bottom:9px">' +
          '<div class="pv-ph" style="background:linear-gradient(145deg,#8fa8b5,#5f7c8c)">Außenansicht</div>' +
          '<div class="pv-ph" style="background:linear-gradient(145deg,#c3b39c,#9a8770)">Wohnzimmer</div>' +
        '</div>' +
        '<div class="pv-kv"><span>Adresse</span><span>Lindenstraße 14, 50674 Köln</span>' +
          '<span>Wohnfläche</span><span>78,4 m²</span>' +
          '<span>Zimmer</span><span>3</span>' +
          '<span>Etage</span><span>2. OG von 4</span>' +
          '<span>Baujahr</span><span>2016</span>' +
          '<span>Kaufpreis</span><span><b>210.000 €</b></span>' +
          '<span>Hausgeld</span><span>245 €/Monat</span>' +
          '<span>Provision</span><span>3,57 % inkl. MwSt.</span></div>' +
        '<div class="pv-sub">Objektbeschreibung</div>' +
        '<p class="pv-p">Helle 3-Zimmer-Wohnung in ruhiger Seitenstraße, nur wenige Gehminuten vom ' +
          'Volksgarten entfernt. Die Wohnung wurde 2016 fertiggestellt und ist durchgehend gepflegt. ' +
          'Bodengleiche Dusche, Fußbodenheizung, Balkon nach Südwesten.</p>' +
        '<p class="pv-p">Sehr gute Anbindung: Haltestelle Eifelplatz in 300 m, Anschluss an die ' +
          'Ringe in 5 Fahrminuten. Kindergarten und Grundschule fußläufig.</p>' +
        foot('Hartmann Immobilien GmbH · Angaben ohne Gewähr');
    },

    fotos: function (o) {
      var pics = [
        ['Außenansicht Straße', 'linear-gradient(145deg,#8fa8b5,#5f7c8c)'],
        ['Außenansicht Hof', 'linear-gradient(145deg,#9db09a,#6b8570)'],
        ['Wohnzimmer', 'linear-gradient(145deg,#c9b8a2,#9e8a70)'],
        ['Küche', 'linear-gradient(145deg,#b9c2c8,#8b979e)'],
        ['Bad', 'linear-gradient(145deg,#a9c0c9,#7c9aa5)'],
        ['Schlafzimmer', 'linear-gradient(145deg,#c2b2b8,#94808a)']
      ];
      if (o.nurEins) pics = pics.slice(0, 1);
      return head('OBJEKTFOTOS', 'Lindenstraße 14, Whg. 7<br>' + pics.length + ' Aufnahme' + (pics.length === 1 ? '' : 'n')) +
        '<h1 class="pv-h">Objektfotos</h1>' +
        '<div class="pv-grid">' + pics.map(function (p) {
          return '<div class="pv-ph" style="background:' + p[1] + '">' + p[0] + '</div>';
        }).join('') + '</div>' +
        (o.nurEins
          ? '<p class="pv-p" style="margin-top:10px;color:#b23">Hinweis: Es wurde nur eine Aufnahme ' +
            'übermittelt. Benötigt werden mindestens zwei Aufnahmen von innen und zwei von außen.</p>'
          : '<p class="pv-p" style="margin-top:10px">Aufnahmen in Farbe, innen und außen, ' +
            'aufgenommen am 12.08.2026.</p>') +
        foot('Objektdokumentation');
    },

    energie: function (o) {
      var bands = [['A+','#1a9850'],['A','#4bab4a'],['B','#8cc65a'],['C','#d5e04a'],
                   ['D','#fee08b'],['E','#fdae61'],['F','#f46d43'],['G','#d73027'],['H','#a50026']];
      return head('ENERGIEAUSWEIS', 'für Wohngebäude<br>gemäß §§ 79 ff. GEG<br>Ausstellung ' + (o.datum || '18.03.2017')) +
        '<h1 class="pv-h">Energieausweis — Verbrauchsausweis</h1>' +
        '<div class="pv-kv"><span>Gebäude</span><span>Lindenstraße 14, 50674 Köln</span>' +
          '<span>Baujahr Gebäude</span><span>2016</span>' +
          '<span>Baujahr Anlagentechnik</span><span>2016</span>' +
          '<span>Wesentlicher Energieträger</span><span>Erdgas</span>' +
          '<span>Gültig bis</span><span><b>' + (o.bis || '17.03.2027') + '</b></span></div>' +
        '<div class="pv-sub">Endenergiebedarf</div>' +
        '<div style="font-size:12px;font-weight:700;margin-bottom:4px">78,4 kWh/(m²·a) — Klasse C</div>' +
        '<div class="pv-scale">' + bands.map(function (b) {
          var w = 30 + bands.indexOf(b) * 7;
          return '<div class="pv-band" style="background:' + b[1] + ';width:' + w + '%">' + b[0] +
                 (b[0] === 'C' ? '<span style="margin-left:auto;font-size:7px">◀ dieses Gebäude</span>' : '') +
                 '</div>';
        }).join('') + '</div>' +
        foot('Aussteller: EnergieCheck Rheinland GmbH');
    }
  };

  /* ---------- oeffentliche API ---------- */
  global.DashboardPreviews = {
    injectStyles: injectStyles,

    /* Gibt es fuer dieses Dokument etwas anzuzeigen? */
    has: function (doc) { return !!(doc && doc.file && doc.preview && T[doc.preview]); },

    /* Papier-Markup fuer ein Dokument */
    render: function (doc) {
      injectStyles();
      var fn = T[doc.preview];
      if (!fn) return '<div class="pv-paper"><h1 class="pv-h">Keine Vorschau verfügbar</h1></div>';
      return '<div class="pv-paper">' + fn(doc.previewOpts || {}) + '</div>';
    },

    /* Skalierung fuer eine gegebene verfuegbare Breite */
    scaleFor: function (availableWidth) {
      return Math.min(1, availableWidth / 420);
    },
    PAPER_W: 420,
    PAPER_H: 594
  };

})(window);
