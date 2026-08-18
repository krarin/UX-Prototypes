#!/usr/bin/env node
/* =====================================================================
   freeze.js — friert einen Prototyp als Kopie ein.

     node freeze.js handover application-form-v7
     node freeze.js testing  application-form-v7

   Warum eine Kopie? Damit die Entwicklung (bzw. ein Usability-Test) einen
   Stand bekommt, der sich nicht mehr ändert, auch wenn am Original
   weitergearbeitet wird.

   Warum liegt die Kopie im SELBEN Ordner? Prototypen verlinken das
   Design-System relativ (../design-system/ bzw. ../../design-system/) und
   teilweise Geschwisterdateien. Im selben Ordner bleiben alle diese Pfade
   gültig, ohne dass am Inhalt etwas geändert werden muss.

   Das Skript schreibt NICHT ins Manifest — es gibt den Block aus, den du
   in data/prototypes.js einfügst. So bleiben die Kommentare dort erhalten
   und die Auswahl bleibt eine bewusste Entscheidung.
   ===================================================================== */
const fs = require('fs'), path = require('path');

const KINDS = {
  handover: { suffix: 'handover',  list: 'handover', label: 'Development Handover' },
  testing:  { suffix: 'usability', list: 'testing',  label: 'Usability Testing' }
};

const [kindArg, protoId, ...rest] = process.argv.slice(2);
const kind = KINDS[kindArg];

if (!kind || !protoId) {
  console.error('Aufruf:  node freeze.js <handover|testing> <prototyp-id> ["Notiz"]\n');
  console.error('Beispiel: node freeze.js handover application-form-v7 "An Entwicklung übergeben."');
  process.exit(1);
}

global.window = {};
require('./data/prototypes.js');
const D = global.window.PROTOTYPES;

const proto = D.prototypes.find(p => p.id === protoId);
if (!proto) {
  console.error(`Unbekannte Prototyp-id "${protoId}".`);
  const near = D.prototypes.filter(p => p.id.includes(protoId.split('-v')[0])).map(p => p.id);
  if (near.length) console.error('Gemeint war vielleicht:\n   ' + near.join('\n   '));
  process.exit(1);
}
const project = D.projects.find(p => p.id === proto.project);
const team = D.teams.find(t => t.id === project.team);

// heutiges Datum als JJJJ-MM-TT
const d = new Date();
const stamp = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

const src = decodeURIComponent(proto.file);
if (!fs.existsSync(src)) { console.error(`Quelldatei fehlt: ${src}`); process.exit(1); }

const dir = path.dirname(src);
const base = path.basename(src, '.html');
const outName = `${base}-${kind.suffix}-${stamp}.html`;
const out = path.join(dir, outName);

if (fs.existsSync(out)) {
  console.error(`Diese Kopie gibt es schon: ${out}`);
  console.error('Pro Version und Tag eine Kopie — lösche die alte oder warte auf morgen.');
  process.exit(1);
}

// Banner als Kommentar: keine sichtbare Änderung an der Seite, damit
// Testpersonen genau das sehen, was die Berater später sehen.
const banner = `<!-- ============================================================
     EINGEFRORENE KOPIE — NICHT BEARBEITEN
     Zweck:    ${kind.label}
     Original: ${src}
     Version:  ${proto.title} (${proto.id})
     Kopiert:  ${stamp}
     Änderungen gehören ins Original, danach neu einfrieren.
     ============================================================ -->
`;
const html = fs.readFileSync(src, 'utf8');
fs.writeFileSync(out, html.startsWith('<!DOCTYPE') ? banner + html : banner + html);

const note = rest.join(' ') || (kindArg === 'handover' ? 'An Entwicklung übergeben.' : 'Für Usability-Test eingefroren.');

console.log(`✅ Kopie erstellt: ${out}\n`);
console.log(`Jetzt in data/prototypes.js beim Team "${team.name}" in die Liste \`${kind.list}\` einfügen:\n`);
console.log(`      { prototype:"${proto.id}",`);
console.log(`        title:"${proto.title}",`);
console.log(`        file:"${out.split(path.sep).join('/').replace(/ /g, '%20')}",`);
console.log(`        date:"${stamp}",`);
console.log(`        note:"${note}" },\n`);
console.log('Danach:  node check-index.js');
