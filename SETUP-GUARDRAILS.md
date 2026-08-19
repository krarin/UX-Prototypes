# Automatische Erinnerung an die Namenskonvention

Damit niemand mehr an die Regeln denken muss: drei Sicherheitsnetze, die sich
gegenseitig auffangen. Netz 1 und 2 sind **eingerichtet**, Netz 3 wird beim
nächsten Push aktiv.

| Wann | Netz | Wo | Status |
|---|---|---|---|
| Sofort beim Anlegen | Claude-Code-Hook | dein Rechner | ✅ läuft |
| Beim Committen | Git-Hook | dein Rechner | ✅ läuft |
| Beim Pushen zu GitHub | GitHub Action | GitHub | ⏳ nach dem ersten Push |

Alle drei rufen dasselbe Skript auf: **`node check-index.js`**.
Eine Regel ändern heißt also: nur `check-index.js` anpassen.

---

## Netz 1 — Claude erinnert dich sofort

**Was passiert:** Sobald Claude eine neue `.html`-Datei im Workspace schreibt,
prüft ein Hook den Dateinamen. Passt er nicht, oder fehlt der Eintrag im
Manifest, erscheint eine Warnung — und Claude bekommt den Hinweis direkt in den
Kontext, korrigiert also meist von selbst.

**Ist schon eingerichtet.** Die Dateien:
- `.claude/settings.json` — meldet den Hook an
- `hooks/prototype-guard.js` — die eigentliche Prüfung

**Selbst ausprobieren:**
```bash
node hooks/prototype-guard.js to-do/mein-tag-v4.html
```

**Hook ansehen oder abschalten:** Tippe `/hooks` in Claude Code.

> ⚠️ Der Ordner `.claude/` steht in `.gitignore`. Dieses Netz gilt also nur auf
> deinem Rechner. Dein Werkstudent bekommt es nicht automatisch — für ihn zählen
> Netz 2 und 3. Wenn du es teilen willst, nimm `.claude/settings.json` aus der
> `.gitignore` heraus (aber lass `.claude/settings.local.json` drin, da stehen
> persönliche Rechte).

---

## Netz 2 — Git blockiert einen falschen Commit

**Was passiert:** Vor jedem `git commit` läuft `check-index.js`. Stimmt etwas
nicht, wird der Commit abgebrochen und du siehst genau, was fehlt.

**Ist schon eingerichtet.** So sah der Test aus:

```
→ Prototypen-Index prüfen…
   NAME OHNE VERSION  Kaputt-FINAL.html (muss auf -v[N] enden)
   VERBOTENES WORT IM NAMEN  Kaputt-FINAL.html ("final")

❌ Commit abgebrochen: der Prototypen-Index ist nicht in Ordnung.
```

**Was ich dafür getan habe** (nur zur Information, du musst nichts tun):

1. Den Hook als versionierte Datei angelegt: `.githooks/pre-commit`
   *(nicht in `.git/hooks/` — dieser Ordner wird von Git nie mitgeliefert)*
2. Git gesagt, dass er dort suchen soll:
   ```bash
   git config core.hooksPath .githooks
   ```

**Das muss jeder im Team einmal selbst ausführen** — Git-Einstellungen
werden nicht mitgepusht. Also sag deinem Werkstudenten: nach dem `git clone`
einmal diesen einen Befehl.

**Im Notfall überspringen:**
```bash
git commit --no-verify -m "…"
```
Nur benutzen, wenn du weißt, was du tust — Netz 3 greift trotzdem.

---

## Netz 3 — GitHub prüft beim Push

**Was passiert:** Bei jedem Push nach `main` und bei jedem Pull Request läuft die
Prüfung auf GitHub. Das ist das Netz, das **niemand überspringen kann** und das
auch für deinen Werkstudenten und für Nicole gilt.

**Die Datei liegt schon da:** `.github/workflows/check-index.yml`

**Was du tun musst — einmal:**

1. **Committen und pushen:**
   ```bash
   git add .github/workflows/check-index.yml
   git commit -m "Index-Prüfung als GitHub Action"
   git push
   ```

2. **Auf GitHub nachsehen:** Gehe zu
   `https://github.com/krarin/UX-Prototypes` → Reiter **Actions**.
   Dort steht jetzt ein Lauf „Prototypen-Index". Grüner Haken = alles gut,
   rotes X = draufklicken, dort steht genau was fehlt.

3. **Fertig.** Ab jetzt läuft das bei jedem Push automatisch.

**Optional, aber empfohlen — den Branch schützen**, damit nichts Kaputtes in
`main` landen kann:

1. Auf GitHub: **Settings** → **Branches** → **Add branch protection rule**
2. Bei „Branch name pattern" `main` eintragen
3. Häkchen bei **Require status checks to pass before merging**
4. In der Suche `check-index` auswählen
5. **Create** klicken

Danach lässt GitHub einen Pull Request nur noch mergen, wenn die Prüfung grün ist.

---

## Was geprüft wird

`check-index.js` meldet sich bei:

- Dateiname nicht klein-kebab (Großbuchstaben, Leerzeichen, Umlaute)
- Dateiname endet nicht auf `-v[N]`
- verbotene Wörter im Namen: `final`, `neu`, `new`, `updated`, `copy`, `alt`, `old`, `test`, …
- Datei liegt auf der Platte, steht aber in keinem Index
- Manifest verweist auf eine Datei, die es nicht gibt
- doppelte `id`
- mehr als eine aktuelle Version pro Projekt (bzw. pro Linie)
- eingefrorene Kopie oder Testbericht fehlt
- Datum nicht im Format `JJJJ-MM-TT`

Die GitHub Action prüft zusätzlich auf **liegengebliebene Merge-Konfliktmarker**
(`<<<<<<<` im Code) — genau der Fehler, der heute in `to-do/index.html` steckte.

---

## Wenn eine Prüfung meckert

Lies die Meldung — sie sagt Datei und Grund. Dann entweder:

- **Name falsch** → Datei umbenennen: `git mv alt.html neu-v1.html`,
  danach den Pfad in `data/prototypes.js` anpassen
- **Nicht im Index** → Block in `data/prototypes.js` ergänzen (siehe `NAMING-CONVENTION.md`)
- **Datei gehört gar nicht dazu** → löschen, oder als `status:"archiv"` eintragen

Und immer zum Schluss:
```bash
node check-index.js
```
