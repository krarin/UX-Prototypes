#!/usr/bin/env node
/* Prüft data/prototypes.js gegen die Dateien auf der Festplatte.
   Aufruf:  node check-index.js          */
const fs = require('fs'), path = require('path');
global.window = {};
require('./data/prototypes.js');
const D = global.window.PROTOTYPES;
const problems = [];

const LAUNCHERS = ['index.html','team.html','project.html',
  'mortgage-hub/index.html','data-validation/index.html','to-do/index.html','advisor-dashboard/index.html'];

// 1. every manifest entry points at a real file
const listed = new Set();
for (const p of D.prototypes) {
  const rel = decodeURIComponent(p.file);
  listed.add(rel);
  if (!fs.existsSync(rel)) problems.push(`FEHLENDE DATEI  ${p.id} → ${rel}`);
  // mehrere Öffnen-Buttons an einer Card (z. B. Web + Mobile) — jede verlinkte Datei zählt mit
  for (const l of (p.links || [])) {
    if (!l.file) { problems.push(`LINK OHNE DATEI  ${p.id} → "${l.label || '?'}"`); continue; }
    const lrel = decodeURIComponent(l.file);
    listed.add(lrel);
    if (!fs.existsSync(lrel)) problems.push(`FEHLENDE DATEI  ${p.id} (Link "${l.label}") → ${lrel}`);
  }
}
// eingefrorene Kopien in den kuratierten Team-Sektionen
const protoIds = new Set(D.prototypes.map(p => p.id));
for (const t of D.teams) {
  for (const key of ['handover', 'testing']) {
    if (!Array.isArray(t[key])) { problems.push(`LISTE FEHLT  ${t.name} → ${key}`); continue; }
    for (const e of t[key]) {
      const label = `${t.name} → ${key}: ${e.title || e.prototype || '?'}`;
      if (!e.file) { problems.push(`EINTRAG OHNE DATEI  ${label}`); continue; }
      const rel = decodeURIComponent(e.file);
      listed.add(rel);
      if (!fs.existsSync(rel)) problems.push(`EINGEFRORENE KOPIE FEHLT  ${label} → ${rel}`);
      if (!e.date) problems.push(`EINTRAG OHNE DATUM  ${label}`);
      else if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) problems.push(`DATUM NICHT JJJJ-MM-TT  ${label} → ${e.date}`);
      if (e.prototype && !protoIds.has(e.prototype)) problems.push(`UNBEKANNTE PROTOTYP-ID  ${label} → ${e.prototype}`);
    }
  }
}

// 2. every prototype on disk appears in the manifest
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}
for (const f of walk('.').map(x => x.replace(/^\.\//, ''))) {
  if (LAUNCHERS.includes(f) || f.includes('_template')) continue;
  if (!listed.has(f)) problems.push(`NICHT IM INDEX  ${f}`);
}

// 3. referenzen und regeln
const projIds = new Set(D.projects.map(p => p.id));
const teamIds = new Set(D.teams.map(t => t.id));
for (const p of D.projects) if (!teamIds.has(p.team)) problems.push(`UNBEKANNTES TEAM  ${p.id} → ${p.team}`);
for (const p of D.prototypes) if (!projIds.has(p.project)) problems.push(`UNBEKANNTES PROJEKT  ${p.id} → ${p.project}`);

const ids = new Set();
for (const p of D.prototypes) { if (ids.has(p.id)) problems.push(`DOPPELTE ID  ${p.id}`); ids.add(p.id); }

// Genau eine aktuelle Version pro Linie. Projekte ohne `lines` haben genau eine Linie ('').
for (const pr of D.projects) {
  const own = D.prototypes.filter(p => p.project === pr.id);
  for (const p of own) {
    if (pr.lines && pr.lines.length) {
      if (!p.line) problems.push(`LINIE FEHLT  ${p.id} (Projekt "${pr.name}" hat Linien)`);
      else if (!pr.lines.includes(p.line)) problems.push(`UNBEKANNTE LINIE  ${p.id} → "${p.line}"`);
    } else if (p.line) {
      problems.push(`LINIE OHNE DEKLARATION  ${p.id} → "${p.line}" (Projekt "${pr.name}" hat kein lines)`);
    }
  }
  for (const line of (pr.lines && pr.lines.length ? pr.lines : [''])) {
    const inLine = own.filter(p => (p.line || '') === line);
    const label = line ? `${pr.name} → ${line}` : pr.name;
    const aktuell = inLine.filter(p => p.status === 'aktuell');
    if (aktuell.length > 1) problems.push(`MEHRERE AKTUELLE VERSIONEN  ${label}: ${aktuell.map(f => f.id).join(', ')}`);
    const lebend = inLine.filter(p => p.status !== 'archiv');
    if (lebend.length && aktuell.length === 0) problems.push(`KEINE AKTUELLE VERSION  ${label}`);
  }
}

// 4. verlinkte Usability-Berichte existieren
for (const t of D.teams) for (const e of (t.testing || []))
  if (e.report && !fs.existsSync(e.report)) problems.push(`BERICHT FEHLT  ${t.name} → ${e.report}`);

const frozen = D.teams.reduce((n, t) => n + (t.handover || []).length + (t.testing || []).length, 0);
// 5. NAMENSKONVENTION der Dateinamen (NAMING-CONVENTION.md, Regel 1-3)
const NAME_KEBAB  = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;      // nur klein, Bindestriche
const NAME_VER    = /-v\d+(?:-[a-z])?\.html$/;               // endet auf -v7 bzw. -v6-a
const NAME_FROZEN = /-(?:handover|usability)-\d{4}-\d{2}-\d{2}\.html$/;
const FORBIDDEN   = ['final','neu','new','updated','copy','kopie','alt','old','test','fertig'];
// keine Altlasten mehr — alle Ordner sind klein-kebab (siehe RENAME-MAP.md)
const FOLDER_EXCEPTIONS = [];
const warnings = [];

function checkName(rel, label) {
  const file = path.basename(rel), dir = path.dirname(rel);
  if (!NAME_KEBAB.test(file)) problems.push(`NAME NICHT KLEIN-KEBAB  ${label} → ${file}`);
  if (!NAME_VER.test(file) && !NAME_FROZEN.test(file)) {
    problems.push(`NAME OHNE VERSION  ${label} → ${file} (muss auf -v[N] enden)`);
  }
  const hit = file.replace(/\.html$/, '').toLowerCase().split('-').filter(seg => FORBIDDEN.includes(seg));
  if (hit.length) problems.push(`VERBOTENES WORT IM NAMEN  ${label} → ${file} ("${hit.join('", "')}")`);
  if (/[A-Z ]/.test(dir) && !FOLDER_EXCEPTIONS.includes(dir)) {
    problems.push(`ORDNER MIT GROSSBUCHSTABE/LEERZEICHEN  ${label} → ${dir}/`);
  } else if (FOLDER_EXCEPTIONS.includes(dir)) {
    warnings.push(`Ordner "${dir}/" hat Grossbuchstaben und ein Leerzeichen — bewusste Altlast, nicht umbenennen ohne die Pfade im Manifest anzupassen.`);
  }
}
for (const p of D.prototypes) {
  checkName(decodeURIComponent(p.file), p.id);
  for (const l of (p.links || [])) if (l.file) checkName(decodeURIComponent(l.file), `${p.id} (Link "${l.label}")`);
}
for (const t of D.teams) for (const key of ['handover', 'testing'])
  for (const e of (t[key] || [])) if (e.file) checkName(decodeURIComponent(e.file), `${t.name}/${key}`);

console.log(`${D.teams.length} Teams · ${D.projects.length} Projekte · ${D.prototypes.length} Prototypen · ${frozen} eingefrorene Kopien`);
if (warnings.length) { console.log(''); [...new Set(warnings)].forEach(w => console.log('⚠️  ' + w)); }
if (problems.length) { console.error(`\n❌ ${problems.length} Problem(e):`); problems.forEach(p => console.error('   ' + p)); process.exit(1); }
console.log('✅ Alles in Ordnung — jede Datei ist indexiert, jeder Eintrag existiert.');
