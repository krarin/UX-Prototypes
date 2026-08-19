#!/usr/bin/env node
/* =====================================================================
   prototype-guard.js — erinnert an die Namenskonvention.

   Wird von zwei Stellen aufgerufen:
   1. Claude-Code-Hook (PostToolUse) — liest das Hook-JSON von stdin und
      meldet sich, sobald eine neue .html-Datei geschrieben wurde.
   2. Manuell: node hooks/prototype-guard.js <datei>

   Prüft nur den Dateinamen. Die vollständige Index-Prüfung macht
   check-index.js — dieses Skript weist darauf hin.
   ===================================================================== */
const fs = require('fs'), path = require('path');
const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

const NAME_KEBAB  = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;
const NAME_VER    = /-v\d+(?:-[a-z])?\.html$/;
const NAME_FROZEN = /-(?:handover|usability)-\d{4}-\d{2}-\d{2}\.html$/;
const FORBIDDEN   = ['final','neu','new','updated','copy','kopie','alt','old','test','fertig'];
// Launcher und Vorlagen sind keine Prototypen
const IGNORE = ['index.html','team.html','project.html'];

function out(obj) { process.stdout.write(JSON.stringify(obj)); process.exit(0); }

function analyse(rel) {
  const file = path.basename(rel);
  if (IGNORE.includes(file) || file.startsWith('_')) return null;
  if (!rel.endsWith('.html')) return null;

  const problems = [];
  if (!NAME_KEBAB.test(file)) problems.push('Nur Kleinbuchstaben und Bindestriche — keine Grossbuchstaben, Leerzeichen oder Umlaute.');
  if (!NAME_VER.test(file) && !NAME_FROZEN.test(file)) problems.push('Der Name muss auf eine Version enden, z. B. -v1.html (parallele Varianten: -v6-a.html).');
  const hit = file.replace(/\.html$/, '').toLowerCase().split('-').filter(s => FORBIDDEN.includes(s));
  if (hit.length) problems.push(`"${hit.join('", "')}" darf nicht im Dateinamen stehen — die Version steckt in der Nummer, nicht im Wort.`);

  // steht die Datei schon im Manifest?
  let inManifest = false;
  try {
    const manifest = path.join(ROOT, 'data', 'prototypes.js');
    if (fs.existsSync(manifest)) {
      global.window = {};
      delete require.cache[require.resolve(manifest)];
      require(manifest);
      const D = global.window.PROTOTYPES;
      const norm = rel.split(path.sep).join('/');
      inManifest = D.prototypes.some(p => decodeURIComponent(p.file) === norm) ||
        D.teams.some(t => ['handover','testing'].some(k => (t[k] || [])
          .some(e => e.file && decodeURIComponent(e.file) === norm)));
    }
  } catch (e) { /* Manifest kaputt — check-index.js meldet das */ }

  return { file, problems, inManifest };
}

// --- Aufruf als Claude-Code-Hook (JSON auf stdin) ---
if (process.stdin.isTTY === undefined || !process.argv[2]) {
  let raw = '';
  process.stdin.on('data', d => raw += d);
  process.stdin.on('end', () => {
    let fp = '';
    try {
      const j = JSON.parse(raw || '{}');
      fp = (j.tool_response && j.tool_response.filePath) || (j.tool_input && j.tool_input.file_path) || '';
    } catch (e) { process.exit(0); }
    if (!fp) process.exit(0);
    const rel = path.relative(ROOT, fp);
    if (rel.startsWith('..') || path.isAbsolute(rel)) process.exit(0);   // ausserhalb des Workspace
    const r = analyse(rel);
    if (!r) process.exit(0);

    const lines = [];
    if (r.problems.length) {
      lines.push(`Der Dateiname "${r.file}" entspricht nicht der Namenskonvention:`);
      r.problems.forEach(p => lines.push('· ' + p));
    }
    if (!r.inManifest) {
      lines.push(`"${r.file}" steht noch nicht in data/prototypes.js. Ohne Eintrag erscheint der Prototyp in keinem Index.`);
    }
    if (!lines.length) process.exit(0);
    lines.push('Regeln: NAMING-CONVENTION.md · danach `node check-index.js` ausführen.');
    const text = lines.join('\n');
    out({
      systemMessage: '⚠️  Namenskonvention: ' + r.file,
      hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: text }
    });
  });
} else {
  // --- Aufruf von Hand mit Dateipfad ---
  const rel = path.relative(ROOT, path.resolve(process.argv[2]));
  const r = analyse(rel);
  if (!r) { console.log('Keine Prototyp-Datei — nichts zu prüfen.'); process.exit(0); }
  if (!r.problems.length && r.inManifest) { console.log(`✅ ${r.file}: Name ok und im Manifest eingetragen.`); process.exit(0); }
  r.problems.forEach(p => console.error('❌ ' + p));
  if (!r.inManifest) console.error(`❌ ${r.file} steht noch nicht in data/prototypes.js`);
  process.exit(1);
}
