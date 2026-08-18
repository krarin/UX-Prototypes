/* =====================================================================
   LAUNCHER — renders the index from data/prototypes.js
   Used by index.html (teams), team.html (projects), project.html (versions).
   No build step, no framework: open any page by double-clicking it.
   ===================================================================== */
(function () {
  var DATA = window.PROTOTYPES;
  if (!DATA) { document.body.innerHTML = '<p style="padding:40px">data/prototypes.js wurde nicht geladen.</p>'; return; }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  // ISO 2026-05-14 → 14.05.2026
  function deDate(iso) {
    if (!iso) return '';
    var p = String(iso).split('-');
    return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : iso;
  }
  function team(id)    { return DATA.teams.find(function (t) { return t.id === id; }); }
  function project(id) { return DATA.projects.find(function (p) { return p.id === id; }); }
  function projectsOf(teamId)    { return DATA.projects.filter(function (p) { return p.team === teamId; }); }
  function prototypesOf(projId)  { return DATA.prototypes.filter(function (p) { return p.project === projId; }); }
  // Reihenfolge der Linie, wie im Projekt deklariert (-1 = keine Linie → unverändert)
  function lineRank(p) {
    var pr = project(p.project);
    if (!pr || !pr.lines || !p.line) return -1;
    return pr.lines.indexOf(p.line);
  }
  // newest first; archive always last. Projekte mit `lines` werden zuerst nach Linie gruppiert.
  function bySeq(a, b) {
    if ((a.status === 'archiv') !== (b.status === 'archiv')) return a.status === 'archiv' ? 1 : -1;
    var la = lineRank(a), lb = lineRank(b);
    if (la !== lb) return la - lb;
    if (b.version !== a.version) return b.version - a.version;
    return String(a.variant || '').localeCompare(String(b.variant || ''));
  }
  function counts(teamId) {
    var pr = projectsOf(teamId), n = 0;
    pr.forEach(function (p) { n += prototypesOf(p.id).length; });
    return { projects: pr.length, prototypes: n };
  }
  function statusChip(s) {
    var label = { aktuell: 'Aktuell', abgeloest: 'Abgelöst', archiv: 'Archiv' }[s] || s;
    return '<span class="chip chip--' + esc(s) + '">' + label + '</span>';
  }

  /* ---------- validation: surfaces the mistakes that broke the old index ---------- */
  function validate() {
    var seen = {}, problems = [];
    DATA.prototypes.forEach(function (p) {
      if (seen[p.id]) problems.push('Doppelte id: ' + p.id);
      seen[p.id] = 1;
      if (!project(p.project)) problems.push(p.id + ' verweist auf unbekanntes Projekt "' + p.project + '"');
      if (!p.file) problems.push(p.id + ' hat keine Datei');
    });
    DATA.projects.forEach(function (pr) {
      if (!team(pr.team)) problems.push('Projekt ' + pr.id + ' verweist auf unbekanntes Team "' + pr.team + '"');
    });
    // kuratierte Team-Sektionen: jeder Eintrag muss auf eine echte Version zeigen
    DATA.teams.forEach(function (t) {
      ['handover', 'testing'].forEach(function (key) {
        (t[key] || []).forEach(function (e) {
          if (!e.file) problems.push(t.name + ' → ' + key + ': Eintrag ohne Datei');
          if (!e.date) problems.push(t.name + ' → ' + key + ': Eintrag ohne Datum (' + (e.title || e.prototype) + ')');
          if (e.prototype && !seen[e.prototype]) {
            problems.push(t.name + ' → ' + key + ': unbekannte Prototyp-id "' + e.prototype + '"');
          }
        });
      });
    });
    if (problems.length) console.error('[prototypes.js] ' + problems.length + ' Problem(e):\n· ' + problems.join('\n· '));
    return problems;
  }

  /* ---------- 1. homepage: all teams ---------- */
  function renderTeams(el) {
    document.title = 'Alle Teams — Prototypes';
    el.innerHTML =
      '<div class="launcher-head">' +
        '<p class="launcher-eyebrow">FinLink Prototypes</p>' +
        '<h1 class="launcher-heading">Alle Teams</h1>' +
        '<p class="launcher-sub">Prototypen nach Team geordnet. Jedes Team hat Projekte, jedes Projekt hat Versionen. ' +
        'Die aktuelle Version ist immer als erste markiert.</p>' +
      '</div>' +
      '<div class="card-grid">' +
        DATA.teams.map(function (t) {
          var c = counts(t.id);
          return '<a class="tile" href="team.html?team=' + encodeURIComponent(t.id) + '">' +
            '<span class="tile-title">' + esc(t.name) + '</span>' +
            '<span class="tile-desc">' + esc(t.desc) + '</span>' +
            '<span class="tile-meta">' +
              '<span class="pill-count">' + c.projects + (c.projects === 1 ? ' Projekt' : ' Projekte') + '</span>' +
              '<span class="pill-count">' + c.prototypes + (c.prototypes === 1 ? ' Prototyp' : ' Prototypen') + '</span>' +
            '</span></a>';
        }).join('') +
      '</div>';
  }

  /* ---------- 2. team page: its projects ---------- */
  function renderTeam(el) {
    var t = team(param('team'));
    if (!t) { notFound(el, 'Team nicht gefunden.'); return; }
    document.title = t.name + ' — Prototypes';
    var pr = projectsOf(t.id);

    el.innerHTML =
      '<nav class="breadcrumb"><a href="index.html">Alle Teams</a><span class="sep">›</span><span>' + esc(t.name) + '</span></nav>' +
      '<div class="launcher-head">' +
        '<p class="launcher-eyebrow">Team</p>' +
        '<h1 class="launcher-heading">' + esc(t.name) + '</h1>' +
        '<p class="launcher-sub">' + esc(t.desc) + '</p>' +
      '</div>' +

      // 1. alle Projekte des Teams — die eigentliche Navigation
      groupHead('Prototypes') +
      (pr.length
        ? '<div class="card-grid">' + pr.map(function (p) {
            var list = prototypesOf(p.id).sort(bySeq);
            var current = list.filter(function (x) { return x.status === 'aktuell'; })[0];
            var multi = p.lines && p.lines.length > 1;
            return '<a class="tile" href="project.html?project=' + encodeURIComponent(p.id) + '">' +
              '<span class="tile-title">' + esc(p.name) + '</span>' +
              '<span class="tile-desc">' + esc(p.flow) + '</span>' +
              '<span class="tile-meta">' +
                '<span class="pill-count">' + list.length + ' Version' + (list.length === 1 ? '' : 'en') + '</span>' +
                // Mehr-Linien-Projekt: je Linie eine aktuelle Version — die Kachel nennt
                // die Linien, die konkreten Stände stehen auf der Projektseite.
                (multi
                  ? '<span class="pill-count">' + p.lines.length + ' Linien</span>'
                  : (current ? '<span class="chip chip--aktuell">Aktuell: ' + esc(current.title) + '</span>' : '')) +
              '</span></a>';
          }).join('') + '</div>'
        : emptyBox('Noch keine Prototypen',
            'Für dieses Team ist noch nichts angelegt. Neue Prototypen werden in <code>data/prototypes.js</code> eingetragen.')) +

      // 2. + 3. kuratierte Sammlungen — eingefrorene Kopien, von Hand ausgewählt
      frozenSection('For Development Handover', t.handover,
        'Noch nichts an die Entwicklung übergeben.') +
      frozenSection('For Usability Testing', t.testing,
        'Noch nichts für einen Test eingefroren.');
  }

  /* ---------- kuratierte Team-Sektionen ---------- */
  function groupHead(title) {
    return '<div class="group-head"><span class="group-title">' + esc(title) + '</span></div>';
  }
  function emptyBox(title, desc) {
    return '<div class="empty"><p class="empty-title">' + esc(title) + '</p>' +
      '<p class="empty-desc">' + desc + '</p></div>';
  }
  // Eine eingefrorene Kopie pro Karte: welche Version, wann eingefroren, Link auf die Kopie.
  function frozenSection(title, entries, emptyText) {
    entries = (entries || []).slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    return groupHead(title) + (entries.length
      ? '<div class="card-grid">' + entries.map(function (e) {
          return '<a class="tile" href="' + e.file + '">' +
            '<span class="tile-title">' + esc(e.title || e.prototype) + '</span>' +
            (e.note ? '<span class="tile-desc">' + esc(e.note) + '</span>' : '<span class="tile-desc"></span>') +
            '<span class="tile-meta">' +
              '<span class="sect-date">' + deDate(e.date) + '</span>' +
              '<span class="chip chip--frozen">eingefrorene Kopie</span>' +
            '</span></a>';
        }).join('') + '</div>'
      : emptyBox(emptyText,
          'Designer entscheiden bewusst, was hier landet: <code>node freeze.js ' +
          (title.indexOf('Handover') > -1 ? 'handover' : 'testing') +
          ' &lt;prototyp-id&gt;</code> ausführen und den ausgegebenen Block in <code>data/prototypes.js</code> einfügen.'));
  }

  /* ---------- 3. project page: the versions ---------- */
  function renderProject(el) {
    var p = project(param('project'));
    if (!p) { notFound(el, 'Projekt nicht gefunden.'); return; }
    var t = team(p.team);
    document.title = p.name + ' — Prototypes';
    var list = prototypesOf(p.id).sort(bySeq);

    el.innerHTML =
      '<nav class="breadcrumb"><a href="index.html">Alle Teams</a><span class="sep">›</span>' +
        '<a href="team.html?team=' + encodeURIComponent(t.id) + '">' + esc(t.name) + '</a>' +
        '<span class="sep">›</span><span>' + esc(p.name) + '</span></nav>' +
      '<div class="launcher-head">' +
        '<p class="launcher-eyebrow">Projekt</p>' +
        '<h1 class="launcher-heading">' + esc(p.name) + '</h1>' +
        '<p class="launcher-sub"><b>Hauptflow:</b> ' + esc(p.flow) + '</p>' +
      '</div>' +
      // Ohne `lines` ein Raster; mit `lines` je Linie eine Untersektion,
      // damit parallele Bankvarianten nicht ineinander laufen.
      (p.lines && p.lines.length > 1
        ? p.lines.map(function (ln) {
            var group = list.filter(function (x) { return x.line === ln; });
            if (!group.length) return '';
            return groupHead(ln) + protoGrid(group);
          }).join('') +
          (function () {
            var rest = list.filter(function (x) { return !x.line; });
            return rest.length ? groupHead('Weitere') + protoGrid(rest) : '';
          })()
        : protoGrid(list));
  }
  function protoGrid(list) {
    return '<div class="proto-list">' + list.map(function (x) {
      return '<article class="proto" data-status="' + esc(x.status) + '">' +
        '<div class="proto-head">' +
          '<span class="proto-name">' + esc(x.title) + '</span>' + statusChip(x.status) +
        '</div>' +
        '<p class="proto-changes">' + esc(x.changes) + '</p>' +
        '<a class="open-btn" href="' + x.file + '">Prototyp öffnen →</a>' +
      '</article>';
    }).join('') + '</div>';
  }

  function notFound(el, msg) {
    el.innerHTML = '<nav class="breadcrumb"><a href="index.html">Alle Teams</a></nav>' +
      '<div class="empty"><p class="empty-title">' + esc(msg) + '</p>' +
      '<p class="empty-desc">Zurück zur <a href="index.html">Übersicht</a>.</p></div>';
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    validate();
    var el = document.getElementById('app');
    var mode = el.dataset.view;
    if (mode === 'teams') renderTeams(el);
    else if (mode === 'team') renderTeam(el);
    else if (mode === 'project') renderProject(el);
  });
})();
