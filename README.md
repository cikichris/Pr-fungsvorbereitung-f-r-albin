# Prüfungsvorbereitung E-Commerce

Lern-App für die Abschlussprüfung **Kaufmann/Kauffrau im E-Commerce** (Umschulung). Grundlage sind Altklausuren mit Musterlösungen. Die App ist fürs Handy gebaut und läuft komplett im Browser.

## Inhalt

| Fach | Stand |
|---|---|
| Geschäftsprozesse im E-Commerce | 13 Klausuren (Sommer 2020 bis Sommer 2026), 378 Fragen mit Musterlösung, Formelblatt |
| Kundenkommunikation im E-Commerce | 13 Klausuren (Sommer 2020 bis Sommer 2026), 216 Fragen mit Musterlösung |
| Wirtschafts- und Sozialkunde | folgt |

Jede Frage ist einem Thema (16 in Geschäftsprozesse, 12 in Kundenkommunikation) und einer Aufgabenart zugeordnet (Rechenaufgabe, Auswahlaufgabe, Begriff erklären, fallbezogen anwenden).

## Funktionen

- **Start:** Stand auf einen Blick, die Fächer, Countdown zur Prüfung, falsche Fragen wiederholen, letzte Ergebnisse.
- **Fach:** gemischt üben, Zufallsprüfung mit 20 Fragen, Klausuren nach Jahren, Themen des Fachs.
- **Klausuren:** eine Altklausur komplett durchgehen,
  - zum **Üben**: Frage lesen, selbst überlegen, Musterlösung aufdecken und einschätzen,
  - als **Prüfung**: alle Fragen am Stück, Antworten notieren, erst am Ende mit den Musterlösungen vergleichen, optional mit Zeitlimit.
- **Themen:** Fragen aus allen Klausuren nach Thema üben (alle, nur neue, nur falsche) oder mit Musterlösung durchblättern.
- **Formeln:** Formelblatt Geschäftsprozesse und die Formeln aus den Musterlösungen Kundenkommunikation, nach Thema, mit Suche und Abfragemodus (Formel erst beim Antippen sichtbar).
- **Wiederholen:** Jede Frage, die zuletzt nicht oder nur teilweise gewusst war, landet hier, bis sie einmal voll gewusst ist.
- **Analyse:** Welche Themen und Aufgabenarten kommen wie oft vor und in wie vielen Klausuren.
- **Daten:** Prüfungstermin, Sicherung herunterladen und einlesen, Lernstand löschen.

**Bewertung:** Die Musterlösungen nennen keine Punkte. Deshalb schätzt man sich nach jeder Frage selbst ein: gewusst, teilweise oder nicht gewusst. Ergebnis und Note sind damit ein Richtwert, jede Frage zählt gleich viel. Für später eingepflegte Aufgaben mit festen Antworten (Multiple Choice, Zuordnung, Reihenfolge, Ergebnisfeld) wertet die App automatisch aus, wie bei der IHK ganz oder gar nicht.

## Wo liegt was?

| Teil | Ort |
|---|---|
| App und Klausuren (`content/`) | dieses Repository |
| Webseite | GitHub Pages, aus dem Zweig `main` |
| Lernstand | nur im Browser (localStorage) des jeweiligen Geräts |
| Original-PDFs | nicht im Repository (`*.pdf` steht in `.gitignore`) |

Es gibt keinen Server und keine Anmeldung. Der Lernstand lässt sich unter **Daten** als JSON-Datei sichern und auf demselben oder einem anderen Gerät wieder einlesen. Beim Einlesen wird standardmäßig zusammengeführt, es geht also nichts verloren. Die Startseite erinnert an eine Sicherung, wenn die letzte älter als eine Woche ist.

Wichtig fürs iPhone: Safari löscht Daten von Webseiten, die sieben Tage nicht geöffnet wurden. Deshalb die Seite über **Teilen → Zum Home-Bildschirm** hinzufügen und von dort öffnen.

## Suchmaschinen

Jede Seite enthält `<meta name="robots" content="noindex, nofollow, …">`. Suchmaschinen, die sich daran halten, nehmen die Seite nicht auf. Die `robots.txt` hilft zusätzlich nur, wenn die Seite unter einer eigenen Domain läuft. Bei `https://<name>.github.io/<repo>/` liest der Crawler nur die `robots.txt` der Hauptdomain.

Zwei Grenzen: Ein öffentliches Repository ist auf GitHub selbst sichtbar und kann dort gefunden werden. Und `noindex` verhindert nur die Aufnahme in Suchergebnisse, nicht den Aufruf. Wer die Adresse kennt, kann die Seite öffnen.

## Einrichten

1. Den Zweig mit der App per Pull Request nach `main` übernehmen.
2. Im Repository **Settings → Pages** öffnen.
3. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, dann **Save**.
4. Nach etwa einer Minute ist die App unter `https://cikichris.github.io/Pr-fungsvorbereitung-f-r-albin/` erreichbar.

## Neue Klausur einpflegen

1. PDF im Chat hochladen (nicht ins Repository).
2. Claude legt `content/klausuren/<id>.js` an und trägt die Datei in `content/index.js` ein.
3. Prüfen: `node tools/check-content.mjs`
4. Pull Request nach `main` mergen.

Die `id` einer Frage darf danach nicht mehr geändert werden. An ihr hängt der gespeicherte Lernstand.

### Musterlösungen aus PDF umwandeln

Die Musterlösungen wurden mit den Skripten in [`tools/import/`](tools/import/) übernommen:

- `parse_pdf.py` liest Fragen, Absätze, Aufzählungen, Tabellen und Fettdruck aus der PDF (`python3 parse_pdf.py <pdf> <json>`, braucht `pdfplumber`).
- `gen.py <gp|kk> <json-ordner> <repo>` erzeugt daraus die Klausurdateien. Was in der Lösung unter „Gegeben:“ oder „Situation:“ steht, wandert in die Frage.
- `themes.py` und `themes_kk.py` ordnen Themen über Stichwörter zu, `themes.py` erkennt auch die Aufgabenart. `overrides.py` enthält die Korrekturen von Hand und die Abschriften der Formelbilder.
- `gen_formeln.py` erzeugt `content/formeln.js` aus dem Formelblatt.

### Aufbau einer Klausurdatei


```js
export default {
  id: 'gp-2024-sommer',          // a-z, 0-9, -
  titel: 'Sommer 2024',
  bereich: 'gp',                 // Fach, siehe content/themen.js
  sortierung: 2024.0,            // Sommer = Jahr, Winter = Jahr + 0,5
  quelle: 'Musterlösung',        // optional
  dauer: 150,                    // Minuten, Vorschlag fürs Zeitlimit (optional)
  situation: '…',                // Ausgangssituation der ganzen Prüfung (optional)
  anlagen: [{ titel: 'Anlage 1', text: '…' }],   // optional
  aufgaben: [
    {
      nr: '1', titel: '…', situation: '…',       // Situation der Aufgabe (optional)
      fragen: [ /* siehe unten */ ],
    },
  ],
};
```

Jede Frage hat `id` (beginnt mit der Klausur-id), `nr`, `typ`, `thema` (eine id oder eine Liste), `art` (`rechnen`, `auswahl`, `erklaeren`, `anwenden`), `frage` und optional `punkte` und `erklaerung`. Ohne `punkte` bewertet man sich mit gewusst / teilweise / nicht gewusst. Dazu je nach Typ:

| typ | Felder | Auswertung |
|---|---|---|
| `mc` | `optionen: [...]`, `richtig: [1]` (Zählung ab 0, mehrere möglich) | automatisch |
| `zuordnung` | `optionen: [...]`, `aussagen: [{ text, richtig: 2 }]` | automatisch |
| `reihenfolge` | `schritte: [{ text, pos: 3 }]` in der Reihenfolge der Prüfung | automatisch |
| `zahl` | `ergebnis: 184.8`, `einheit: '€'`, `toleranz: 0.01` | automatisch |
| `offen` | `loesung: '…'` (Musterlösung) | Selbstbewertung |

Texte können Absätze, Listen (`- `), Tabellen mit `|`, Rechenblöcke (`> `) sowie `**fett**` enthalten.

Fächer, Themen und Aufgabenarten stehen in [`content/themen.js`](content/themen.js). Neue Themen dort ergänzen.

## Entwicklung

Kein Build-Schritt. Zum lokalen Ansehen genügt ein einfacher Webserver:

```
python3 -m http.server 8000
```

Prüfungen:

```
node tools/check-content.mjs    # Klausurdateien
node --test tools/test.mjs      # Auswertung, Analyse, Sicherung
```
